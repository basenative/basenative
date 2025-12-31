import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LogoComponent, ThemeSelectorComponent } from '@basenative/ui/glass';

@Component({
  selector: 'main[docs-layout]',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LogoComponent,
    ThemeSelectorComponent,
  ],
  templateUrl: './docs.html',
  styleUrl: './docs.css',
})
export class Docs {}
