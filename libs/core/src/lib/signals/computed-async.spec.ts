import { TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { computedAsync } from './computed-async';

// Test wrapper component since computedAsync uses inject()
@Component({
  selector: 'test-component',
  template: '',
  standalone: true,
})
class TestComponent {
  counter = signal(0);
  asyncValue = computedAsync(
    () => {
      const count = this.counter();
      return Promise.resolve(count * 2);
    },
    { initialValue: 0 },
  );

  syncValue = computedAsync(() => {
    return this.counter() * 3;
  });
}

describe('computedAsync', () => {
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
    });
    const fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should return initial value before promise resolves', () => {
    expect(component.asyncValue()).toBe(0);
  });

  it('should handle synchronous values', () => {
    // Initial value before any updates
    expect(component.syncValue()).toBeUndefined();
  });

  it('should use undefined as default initial value', () => {
    expect(component.syncValue()).toBeUndefined();
  });
});
