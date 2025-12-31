import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Anchored } from './anchored.directive';

@Component({
  template: `<div [anchored]="'test-anchor'" position="top">Content</div>`,
  standalone: true,
  imports: [Anchored],
})
class TestHostComponent {}

describe('Anchored Directive', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    const div = fixture.nativeElement.querySelector('div');
    expect(div).toBeTruthy();
  });

  it('should set popover attribute by default', () => {
    const div = fixture.nativeElement.querySelector('div');
    expect(div.getAttribute('popover')).toBe('auto');
  });

  it('should have position-visibility style', () => {
    const div = fixture.nativeElement.querySelector('div');
    // Check style attribute contains the expected value
    expect(div.getAttribute('style')).toContain('anchors-visible');
  });
});
