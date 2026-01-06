import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FeatureLayoutComponent } from '@basenative/ui-glass';
import { of } from 'rxjs';
import { SignalStateVisualizerComponent } from '../visualizer/signal-state-visualizer.component';
import { SignalStoreDemoComponent } from './signal-store-demo.component';

// Mock Prism globally
(global as any).Prism = {
  highlight: jest.fn().mockReturnValue('mocked code'),
  languages: { typescript: {}, json: {} },
};

jest.mock('prismjs/components/prism-json', () => ({}));
jest.mock('prismjs/components/prism-typescript', () => ({}));

import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';

// Mock FeatureLayoutComponent to avoid deep dependencies
@Component({
  selector: 'feature-layout',
  template: '<ng-content></ng-content>',
  standalone: true,
})
class MockFeatureLayoutComponent {}

// Mock the visualizer to avoid PrismJS dependency issues in tests
@Component({
  selector: 'section[signal-state-visualizer]',
  template: '',
  standalone: true,
})
class MockSignalStateVisualizerComponent {
  @Input() state: any;
}

describe('SignalStoreDemoComponent', () => {
  let component: SignalStoreDemoComponent;
  let fixture: ComponentFixture<SignalStoreDemoComponent>;

  beforeEach(async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    await TestBed.configureTestingModule({
      imports: [
        SignalStoreDemoComponent,
        // Mocks are injected via overrideComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
          },
        },
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustHtml: (val: string) => val,
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(SignalStoreDemoComponent, {
        remove: {
          imports: [SignalStateVisualizerComponent, FeatureLayoutComponent],
        },
        add: {
          imports: [
            MockSignalStateVisualizerComponent,
            MockFeatureLayoutComponent,
          ],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(SignalStoreDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial count of 0', () => {
    expect(component.store.count()).toBe(0);
  });

  it('should increment count', () => {
    component.store.increment();
    fixture.detectChanges();
    expect(component.store.count()).toBe(1);
  });

  it('should decrement count', () => {
    component.store.increment(); // 1
    component.store.decrement(); // 0
    fixture.detectChanges();
    expect(component.store.count()).toBe(0);
  });

  it('should calculate double correctly', () => {
    component.store.increment(); // 1
    component.store.increment(); // 2
    fixture.detectChanges();
    expect(component.store.double()).toBe(4);
  });

  it('should update status based on count', () => {
    // Count 0 -> Low
    expect(component.store.status()).toBe('Low Count');

    // Increment to 6 -> High
    for (let i = 0; i < 6; i++) {
      component.store.increment();
    }
    fixture.detectChanges();
    expect(component.store.status()).toBe('High Count!');
  });

  it('should toggle view mode', () => {
    expect(component.viewMode()).toBe('demo');

    component.viewMode.set('code');
    fixture.detectChanges();
    expect(component.viewMode()).toBe('code');

    const codeContainer =
      fixture.nativeElement.querySelector('.code-container');
    expect(codeContainer).toBeTruthy();
  });

  it('should update query', () => {
    component.store.setQuery('test');
    fixture.detectChanges();
    expect(component.store.activeQuery()).toBe('test');
  });
});
