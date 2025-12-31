import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Anchor } from './anchor.directive';

@Component({
  template: `<button [anchor]="'test-anchor'">Trigger</button>`,
  standalone: true,
  imports: [Anchor],
})
class TestHostComponent {}

describe('Anchor Directive', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
  });

  it('should set anchor-name style', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.style.anchorName).toBe('--test-anchor');
  });
});
