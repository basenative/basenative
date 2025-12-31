import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { FocusTrap } from './focus-trap.directive';

@Component({
  template: `
    <div focusTrap>
      <button id="first">First</button>
      <input id="second" />
      <button id="last">Last</button>
    </div>
  `,
  standalone: true,
  imports: [FocusTrap],
})
class TestHostComponent {}

describe('FocusTrap Directive', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    const trapDiv = fixture.nativeElement.querySelector('[focusTrap]');
    expect(trapDiv).toBeTruthy();
  });

  it('should have focusable elements inside', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(2);
  });

  it('should render the input element', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input).toBeTruthy();
  });
});
