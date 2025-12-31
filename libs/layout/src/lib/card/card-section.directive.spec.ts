import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import {
  CardHeaderDirective,
  CardContentDirective,
  CardFooterDirective,
} from './card-section.directive';

@Component({
  template: `
    <header cardHeader>Header</header>
    <section cardContent>Content</section>
    <footer cardFooter>Footer</footer>
  `,
  standalone: true,
  imports: [CardHeaderDirective, CardContentDirective, CardFooterDirective],
})
class TestHostComponent {}

describe('CardSectionDirectives', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  describe('CardHeaderDirective', () => {
    it('should apply semantic-card-header class', () => {
      const header = fixture.nativeElement.querySelector('header');
      expect(header.classList.contains('semantic-card-header')).toBe(true);
    });
  });

  describe('CardContentDirective', () => {
    it('should apply semantic-card-content class', () => {
      const content = fixture.nativeElement.querySelector('section');
      expect(content.classList.contains('semantic-card-content')).toBe(true);
    });
  });

  describe('CardFooterDirective', () => {
    it('should apply semantic-card-footer class', () => {
      const footer = fixture.nativeElement.querySelector('footer');
      expect(footer.classList.contains('semantic-card-footer')).toBe(true);
    });
  });
});
