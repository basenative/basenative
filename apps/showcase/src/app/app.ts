import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from '@basenative/tokens';

@Component({
  imports: [RouterModule, CommonModule],
  selector: 'article[root]',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'showcase';
  protected isOffline = signal(false);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    console.log('App component instantiated (SSR Debug)');
    if (isPlatformBrowser(this.platformId)) {
      this.isOffline.set(!navigator.onLine);

      window.addEventListener('offline', () => {
        this.isOffline.set(true);
        document.body.style.filter = 'grayscale(100%)';
      });

      window.addEventListener('online', () => {
        this.isOffline.set(false);
        document.body.style.filter = 'none';
      });
    }
  }
}
