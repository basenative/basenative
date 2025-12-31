import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ListItemComponent } from './list-item.component';

@Component({
  template: `<li item>List Item</li>`,
  standalone: true,
  imports: [ListItemComponent],
})
class LiTestComponent {}

@Component({
  template: `<a item href="#">Link Item</a>`,
  standalone: true,
  imports: [ListItemComponent],
})
class AnchorTestComponent {}

@Component({
  template: `<button item>Button Item</button>`,
  standalone: true,
  imports: [ListItemComponent],
})
class ButtonTestComponent {}

describe('ListItemComponent with li', () => {
  let fixture: ComponentFixture<LiTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LiTestComponent);
    fixture.detectChanges();
  });

  it('should apply semantic-list-item class', () => {
    const item = fixture.nativeElement.querySelector('li');
    expect(item.classList.contains('semantic-list-item')).toBe(true);
  });
});

describe('ListItemComponent with anchor', () => {
  it('should work with anchor element', async () => {
    await TestBed.configureTestingModule({
      imports: [AnchorTestComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(AnchorTestComponent);
    fixture.detectChanges();

    const item = fixture.nativeElement.querySelector('a');
    expect(item.classList.contains('semantic-list-item')).toBe(true);
  });
});

describe('ListItemComponent with button', () => {
  it('should work with button element', async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonTestComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(ButtonTestComponent);
    fixture.detectChanges();

    const item = fixture.nativeElement.querySelector('button');
    expect(item.classList.contains('semantic-list-item')).toBe(true);
  });
});
