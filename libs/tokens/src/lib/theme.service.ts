import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemeMode = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);

  // Signals
  readonly mode = signal<ThemeMode>('system');
  readonly isDark = signal<boolean>(false); // Resolved dark state

  // State
  private mediaQuery: MediaQueryList | null = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initTheme();
    }
  }

  private initTheme() {
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Check local storage
    const stored = localStorage.getItem('theme_mode') as ThemeMode;
    if (stored) {
      this.mode.set(stored);
    }

    // Listen for system changes
    this.mediaQuery.addEventListener('change', () => {
      if (this.mode() === 'system') {
        this.applyTheme();
      }
    });

    // Apply initial theme
    this.applyTheme();

    // Effect to react to mode changes
    effect(() => {
      this.applyTheme();
    });
  }

  setMode(mode: ThemeMode) {
    this.mode.set(mode);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme_mode', mode);
    }
  }

  toggleMode() {
    const next = this.mode() === 'dark' ? 'light' : 'dark';
    this.setMode(next);
  }

  updateToken(tokenName: string, value: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    document.documentElement.style.setProperty(tokenName, value);
  }

  // Power Mode
  readonly lowPowerMode = signal(false);

  enableLowPowerMode(enabled: boolean) {
    this.lowPowerMode.set(enabled);

    if (enabled && isPlatformBrowser(this.platformId)) {
      // Force dark mode to save energy on OLED screens
      if (this.mode() !== 'dark') this.setMode('dark');

      // Disable motion and blurs
      document.documentElement.style.setProperty('--duration-short-1', '0ms');
      document.documentElement.style.setProperty('--duration-short-2', '0ms');
      document.documentElement.style.setProperty('--duration-short-3', '0ms');
      document.documentElement.style.setProperty('--duration-medium-1', '0ms');
      document.documentElement.style.setProperty('--duration-long-1', '0ms');
      document.documentElement.style.setProperty('--blur-glass-sm', '0px');
      document.documentElement.style.setProperty('--blur-glass-md', '0px');
    } else if (isPlatformBrowser(this.platformId)) {
      // Reset styles (reloading tokens would be cleaner, but simple reset for now)
      document.documentElement.style.removeProperty('--duration-short-1');
      document.documentElement.style.removeProperty('--duration-short-2');
      document.documentElement.style.removeProperty('--duration-short-3');
      document.documentElement.style.removeProperty('--duration-medium-1');
      document.documentElement.style.removeProperty('--duration-long-1');
      document.documentElement.style.removeProperty('--blur-glass-sm');
      document.documentElement.style.removeProperty('--blur-glass-md');
    }
  }

  private applyTheme() {
    if (!isPlatformBrowser(this.platformId)) return;

    const currentMode = this.mode();
    let isDark = false;

    if (currentMode === 'system') {
      isDark = this.mediaQuery?.matches ?? false;
    } else {
      isDark = currentMode === 'dark';
    }

    // Low power mode prioritizes dark
    if (this.lowPowerMode()) isDark = true;

    // Update signal
    this.isDark.set(isDark);

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
