import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CardComponent } from './card.component';

@Component({
  template: `<article card>Card Content</article>`,
  standalone: true,
  imports: [CardComponent],
})
class TestHostComponent {}

@Component({
  template: `<article card variant="elevated">Elevated</article>`,
  standalone: true,
  imports: [CardComponent],
})
class ElevatedCardComponent {}

describe('CardComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    const card = fixture.nativeElement.querySelector('article');
    expect(card).toBeTruthy();
  });

  it('should apply semantic-card class', () => {
    const card = fixture.nativeElement.querySelector('article');
    expect(card.classList.contains('semantic-card')).toBe(true);
  });

  it('should apply outlined variant by default', () => {
    const card = fixture.nativeElement.querySelector('article');
    expect(card.classList.contains('outlined')).toBe(true);
  });

  it('should project content', () => {
    const card = fixture.nativeElement.querySelector('article');
    expect(card.textContent).toContain('Card Content');
  });
});

describe('CardComponent with elevated variant', () => {
  let fixture: ComponentFixture<ElevatedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElevatedCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ElevatedCardComponent);
    fixture.detectChanges();
  });

  it('should apply elevated class', () => {
    const card = fixture.nativeElement.querySelector('article');
    expect(card.classList.contains('elevated')).toBe(true);
  });
});
