import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ThemeSelectorComponent } from '../theme-selector/theme-selector.component';

@Component({
  selector: 'section[feature-layout]',
  standalone: true,
  imports: [CommonModule, RouterLink, ThemeSelectorComponent],
  templateUrl: './feature-layout.component.html',
  styleUrl: './feature-layout.component.css',
})
export class FeatureLayoutComponent {
  @Input() title = '';
}
