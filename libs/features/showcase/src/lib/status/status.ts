import { Component, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ThemeService } from '@basenative/tokens';
import { IconComponent, FeatureLayoutComponent } from '@basenative/ui-glass';

interface WebBatteryManager {
  level: number;
  charging: boolean;
  addEventListener(type: string, listener: () => void): void;
}

interface WebNetworkInformation {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  addEventListener(type: string, listener: () => void): void;
}

interface BatteryState {
  level: number;
  charging: boolean;
}

interface NetworkState {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
}

interface NavigatorExtended {
  getBattery: () => Promise<WebBatteryManager>;
  connection: WebNetworkInformation;
}

@Component({
  selector: 'section[status-page]',
  standalone: true,
  imports: [CommonModule, IconComponent, FeatureLayoutComponent],
  templateUrl: './status.html',
  styleUrl: './status.css',
})
export class StatusPage {
  battery = signal<BatteryState | null>(null);
  network = signal<NetworkState | null>(null);

  private platformId = inject(PLATFORM_ID);
  private theme = inject(ThemeService);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initBattery();
      this.initNetwork();
    }
  }

  async initBattery() {
    if ('getBattery' in navigator) {
      const bat = await (
        navigator as unknown as NavigatorExtended
      ).getBattery();
      this.updateBattery(bat);

      bat.addEventListener('levelchange', () => this.updateBattery(bat));
      bat.addEventListener('chargingchange', () => this.updateBattery(bat));
    }
  }

  updateBattery(bat: WebBatteryManager) {
    const level = bat.level;
    const isCharging = bat.charging;

    this.battery.set({
      level,
      charging: isCharging,
    });

    // Advanced Logic: Auto Low Power Mode
    if (level < 0.2 && !isCharging) {
      this.theme.enableLowPowerMode(true);
    } else {
      this.theme.enableLowPowerMode(false);
    }
  }

  initNetwork() {
    const conn = (navigator as unknown as NavigatorExtended).connection;
    if (conn) {
      this.updateNetwork(conn);
      conn.addEventListener('change', () => this.updateNetwork(conn));
    }
  }

  updateNetwork(conn: WebNetworkInformation) {
    this.network.set({
      effectiveType: conn.effectiveType,
      downlink: conn.downlink,
      rtt: conn.rtt,
    });
  }
}
