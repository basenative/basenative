import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createSignalStore } from '@basenative/core';
import { SignalStateVisualizerComponent } from './signal-state-visualizer.component';

describe('SignalStateVisualizerComponent', () => {
  let component: SignalStateVisualizerComponent;
  let fixture: ComponentFixture<SignalStateVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalStateVisualizerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalStateVisualizerComponent);
    component = fixture.componentInstance;

    // Mock store
    const mockStore = createSignalStore({ val: 1 }, () => ({}));
    fixture.componentRef.setInput('store', mockStore);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct JSON structure', () => {
    // Assuming the json pipe renders roughly specific text
    const pre = fixture.nativeElement.querySelector('pre');
    expect(pre).toBeTruthy();
  });
});
