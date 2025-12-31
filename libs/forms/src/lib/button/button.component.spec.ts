import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ButtonComponent } from './button.component';

@Component({
  template: `<button variant="primary">Test</button>`,
  standalone: true,
  imports: [ButtonComponent],
})
class TestHostComponent {}

describe('ButtonComponent', () => {
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

  it('should apply semantic-button class', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('semantic-button')).toBe(true);
  });

  it('should apply variant class', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('variant-primary')).toBe(true);
  });

  it('should apply default size class', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('size-md')).toBe(true);
  });
});

describe('ButtonComponent with secondary variant', () => {
  @Component({
    template: `<button variant="secondary">Test</button>`,
    standalone: true,
    imports: [ButtonComponent],
  })
  class SecondaryTestComponent {}

  it('should support secondary variant', async () => {
    await TestBed.configureTestingModule({
      imports: [SecondaryTestComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(SecondaryTestComponent);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('variant-secondary')).toBe(true);
  });
});

describe('ButtonComponent with outline variant', () => {
  @Component({
    template: `<button variant="outline">Test</button>`,
    standalone: true,
    imports: [ButtonComponent],
  })
  class OutlineTestComponent {}

  it('should support outline variant', async () => {
    await TestBed.configureTestingModule({
      imports: [OutlineTestComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(OutlineTestComponent);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('variant-outline')).toBe(true);
  });
});

describe('ButtonComponent with size', () => {
  @Component({
    template: `<button variant="primary" size="sm">Small</button>`,
    standalone: true,
    imports: [ButtonComponent],
  })
  class SmallTestComponent {}

  it('should support sm size', async () => {
    await TestBed.configureTestingModule({
      imports: [SmallTestComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(SmallTestComponent);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('size-sm')).toBe(true);
  });
});
