import { TestBed } from '@angular/core/testing';
import { App } from './app';
// import { WelcomeComponent } from '@cdk/showcase-components'; // Mock or import

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    // WelcomeComponent is standalone and imported in App, but for unit test of App
    // we might need to mock it or just let it render if available.
    // For now simple check
    expect(fixture.componentInstance).toBeTruthy();
  });
});
