import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { Dialog } from './dialog.component';

@Component({
  template: `
    <dialog modal>
      <header><h2>Test Dialog</h2></header>
      <p>Content</p>
      <footer><button>Close</button></footer>
    </dialog>
  `,
  standalone: true,
  imports: [Dialog],
})
class TestHostComponent {}

describe('Dialog Component', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    const dialog = fixture.nativeElement.querySelector('dialog');
    expect(dialog).toBeTruthy();
  });

  it('should project header content', () => {
    const header = fixture.nativeElement.querySelector('header h2');
    expect(header.textContent).toContain('Test Dialog');
  });

  it('should project main content', () => {
    const content = fixture.nativeElement.querySelector('p');
    expect(content.textContent).toContain('Content');
  });

  it('should project footer content', () => {
    const footer = fixture.nativeElement.querySelector('footer button');
    expect(footer.textContent).toContain('Close');
  });
});
