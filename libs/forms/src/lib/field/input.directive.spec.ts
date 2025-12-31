import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { InputDirective } from './input.directive';

@Component({
  template: `<input input placeholder="Test" />`,
  standalone: true,
  imports: [InputDirective],
})
class TestHostComponent {}

describe('InputDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input).toBeTruthy();
  });

  it('should apply semantic-input class', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input.classList.contains('semantic-input')).toBe(true);
  });
});

describe('InputDirective with textarea', () => {
  @Component({
    template: `<textarea input></textarea>`,
    standalone: true,
    imports: [InputDirective],
  })
  class TextareaTestComponent {}

  it('should work with textarea', async () => {
    await TestBed.configureTestingModule({
      imports: [TextareaTestComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(TextareaTestComponent);
    fixture.detectChanges();

    const textarea = fixture.nativeElement.querySelector('textarea');
    expect(textarea.classList.contains('semantic-input')).toBe(true);
  });
});

describe('InputDirective with select', () => {
  @Component({
    template: `<select input>
      <option>Option</option>
    </select>`,
    standalone: true,
    imports: [InputDirective],
  })
  class SelectTestComponent {}

  it('should work with select', async () => {
    await TestBed.configureTestingModule({
      imports: [SelectTestComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(SelectTestComponent);
    fixture.detectChanges();

    const select = fixture.nativeElement.querySelector('select');
    expect(select.classList.contains('semantic-input')).toBe(true);
  });
});
