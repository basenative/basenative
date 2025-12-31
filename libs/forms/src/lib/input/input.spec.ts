import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<label input-wrapper [label]="label" [error]="error">
    <input type="text" />
  </label>`,
  imports: [InputComponent],
})
class TestHostComponent {
  label = 'Test Label';
  error = '';
}

describe('Input', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
  });

  it('should render label', () => {
    fixture.detectChanges();
    const labelEl = fixture.debugElement.query(By.css('.semantic-label-text'));
    expect(labelEl.nativeElement.textContent).toContain('Test Label');
  });

  it('should render error message when provided', async () => {
    hostComponent.error = 'Invalid input';
    fixture.detectChanges();
    const errorEl = fixture.debugElement.query(
      By.css('.semantic-error-message'),
    );
    expect(errorEl).not.toBeNull();
    expect(errorEl.nativeElement.textContent).toContain('Invalid input');
  });

  it('should not render error message when empty', () => {
    fixture.detectChanges();
    const errorEl = fixture.debugElement.query(
      By.css('.semantic-error-message'),
    );
    expect(errorEl).toBeNull();
  });
});
