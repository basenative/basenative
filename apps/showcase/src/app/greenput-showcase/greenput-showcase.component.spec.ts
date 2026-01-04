import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GreenputShowcaseComponent } from './greenput-showcase.component';

describe('GreenputShowcaseComponent', () => {
  let component: GreenputShowcaseComponent;
  let fixture: ComponentFixture<GreenputShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreenputShowcaseComponent, RouterTestingModule],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(GreenputShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Greenput Consent Platform',
    );
  });

  it('should initially show consent disclosure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('greenput-disclosure')).toBeTruthy();
  });
});
