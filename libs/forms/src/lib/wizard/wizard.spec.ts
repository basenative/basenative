import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WizardComponent } from './wizard';
import { WizardStepComponent } from './wizard-step/wizard-step';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <section wizard>
      <article wizard-step title="Step 1">Content 1</article>
      <article wizard-step title="Step 2">Content 2</article>
    </section>
  `,
  imports: [WizardComponent, WizardStepComponent],
})
class TestHostComponent {
  @ViewChild(WizardComponent) wizard!: WizardComponent;
}

describe('Wizard', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let wizard: WizardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, WizardComponent, WizardStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
    wizard = hostComponent.wizard;
  });

  it('should create', () => {
    expect(wizard).toBeTruthy();
  });

  it('should activate the first step by default', () => {
    const steps = fixture.debugElement.queryAll(
      By.directive(WizardStepComponent),
    );
    expect(steps[0].componentInstance.isActive()).toBe(true);
    expect(steps[1].componentInstance.isActive()).toBe(false);
  });

  it('should navigate to next step', () => {
    wizard.next();
    fixture.detectChanges();
    const steps = fixture.debugElement.queryAll(
      By.directive(WizardStepComponent),
    );
    expect(steps[0].componentInstance.isActive()).toBe(false);
    expect(steps[1].componentInstance.isActive()).toBe(true);
  });

  it('should not navigate past last step', () => {
    wizard.next(); // to step 2
    wizard.next(); // try step 3 (doesn't exist)
    fixture.detectChanges();
    const steps = fixture.debugElement.queryAll(
      By.directive(WizardStepComponent),
    );
    expect(steps[1].componentInstance.isActive()).toBe(true);
  });

  it('should navigate to prev step', () => {
    wizard.next(); // to step 2
    fixture.detectChanges();
    expect(wizard.currentStepIndex()).toBe(1);

    wizard.prev(); // back to step 1
    fixture.detectChanges();
    expect(wizard.currentStepIndex()).toBe(0);
    const steps = fixture.debugElement.queryAll(
      By.directive(WizardStepComponent),
    );
    expect(steps[0].componentInstance.isActive()).toBe(true);
  });
});
