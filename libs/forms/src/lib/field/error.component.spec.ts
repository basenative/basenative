import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ErrorComponent } from './error.component';

@Component({
  template: `<output error>Error message</output>`,
  standalone: true,
  imports: [ErrorComponent],
})
class TestHostComponent {}

describe('ErrorComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    const output = fixture.nativeElement.querySelector('output');
    expect(output).toBeTruthy();
  });

  it('should apply semantic-error class', () => {
    const output = fixture.nativeElement.querySelector('output');
    expect(output.classList.contains('semantic-error')).toBe(true);
  });

  it('should project error message', () => {
    const output = fixture.nativeElement.querySelector('output');
    expect(output.textContent).toContain('Error message');
  });
});
