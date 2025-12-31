import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

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
