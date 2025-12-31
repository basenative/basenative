import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ListComponent } from './list.component';

@Component({
  template: `<ul list>
    <li>Item</li>
  </ul>`,
  standalone: true,
  imports: [ListComponent],
})
class TestHostComponent {}

describe('ListComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    const list = fixture.nativeElement.querySelector('ul');
    expect(list).toBeTruthy();
  });

  it('should apply semantic-list class', () => {
    const list = fixture.nativeElement.querySelector('ul');
    expect(list.classList.contains('semantic-list')).toBe(true);
  });

  it('should project content', () => {
    const list = fixture.nativeElement.querySelector('ul');
    expect(list.textContent).toContain('Item');
  });
});

describe('ListComponent with ol', () => {
  @Component({
    template: `<ol list>
      <li>Ordered Item</li>
    </ol>`,
    standalone: true,
    imports: [ListComponent],
  })
  class OlTestComponent {}

  it('should work with ol element', async () => {
    await TestBed.configureTestingModule({
      imports: [OlTestComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(OlTestComponent);
    fixture.detectChanges();

    const list = fixture.nativeElement.querySelector('ol');
    expect(list.classList.contains('semantic-list')).toBe(true);
  });
});
