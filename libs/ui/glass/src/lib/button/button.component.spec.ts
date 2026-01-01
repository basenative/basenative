import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply variant attribute', () => {
    fixture.componentRef.setInput('variant', 'secondary');
    fixture.detectChanges();

    const hostElement = fixture.nativeElement as HTMLElement;
    expect(hostElement.getAttribute('variant')).toBe('secondary');
  });

  it('should default to primary variant', () => {
    const hostElement = fixture.nativeElement as HTMLElement;
    expect(hostElement.getAttribute('variant')).toBe('primary');
  });

  it('should apply size attribute', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    const hostElement = fixture.nativeElement as HTMLElement;
    expect(hostElement.getAttribute('size')).toBe('lg');
  });
});
