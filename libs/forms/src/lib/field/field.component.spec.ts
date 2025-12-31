import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FieldComponent } from './field.component';

@Component({
  template: `<fieldset field>Content</fieldset>`,
  standalone: true,
  imports: [FieldComponent],
})
class TestHostComponent {}

describe('FieldComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    const fieldset = fixture.nativeElement.querySelector('fieldset');
    expect(fieldset).toBeTruthy();
  });

  it('should apply semantic-fieldset class', () => {
    const fieldset = fixture.nativeElement.querySelector('fieldset');
    expect(fieldset.classList.contains('semantic-fieldset')).toBe(true);
  });

  it('should project content', () => {
    const fieldset = fixture.nativeElement.querySelector('fieldset');
    expect(fieldset.textContent).toContain('Content');
  });
});
