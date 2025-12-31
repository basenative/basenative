import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { LabelDirective } from './label.directive';

@Component({
  template: `<label label for="test">Test Label</label>`,
  standalone: true,
  imports: [LabelDirective],
})
class LabelTestComponent {}

@Component({
  template: `<legend label>Legend Label</legend>`,
  standalone: true,
  imports: [LabelDirective],
})
class LegendTestComponent {}

describe('LabelDirective with label', () => {
  let fixture: ComponentFixture<LabelTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LabelTestComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    const label = fixture.nativeElement.querySelector('label');
    expect(label).toBeTruthy();
  });

  it('should apply semantic-label class', () => {
    const label = fixture.nativeElement.querySelector('label');
    expect(label.classList.contains('semantic-label')).toBe(true);
  });

  it('should preserve for attribute', () => {
    const label = fixture.nativeElement.querySelector('label');
    expect(label.getAttribute('for')).toBe('test');
  });
});

describe('LabelDirective with legend', () => {
  let fixture: ComponentFixture<LegendTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegendTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LegendTestComponent);
    fixture.detectChanges();
  });

  it('should apply semantic-label class to legend', () => {
    const legend = fixture.nativeElement.querySelector('legend');
    expect(legend.classList.contains('semantic-label')).toBe(true);
  });
});
