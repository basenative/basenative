import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WizardStepComponent } from './wizard-step';
import { Component } from '@angular/core';

@Component({
  template: `<lib-wizard-step [title]="title">Step Content</lib-wizard-step>`,
  imports: [WizardStepComponent],
})
class TestHostComponent {
  title = 'Step 1';
}

describe('WizardStep', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, WizardStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(hostComponent).toBeTruthy();
  });
});
