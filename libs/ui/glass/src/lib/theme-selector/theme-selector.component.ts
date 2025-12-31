import { Component, inject } from '@angular/core';

import { ThemeService } from '@basenative/tokens';

@Component({
  selector: 'menu[theme-selector]',
  standalone: true,
  imports: [],
  templateUrl: './theme-selector.component.html',
  styleUrl: './theme-selector.component.css',
})
export class ThemeSelectorComponent {
  theme = inject(ThemeService);

  toggle() {
    this.theme.setMode(this.theme.isDark() ? 'light' : 'dark');
  }
}
