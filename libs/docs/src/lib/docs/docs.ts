import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {
  LogoComponent,
  ThemeSelectorComponent,
  IconComponent,
} from '@basenative/ui/glass';

@Component({
  selector: 'main[docs-layout]',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LogoComponent,
    ThemeSelectorComponent,
    IconComponent,
  ],
  templateUrl: './docs.html',
  styleUrl: './docs.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Docs {}
