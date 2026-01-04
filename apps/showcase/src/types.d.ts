// Experimental Web APIs

interface BatteryManager extends EventTarget {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
  addEventListener(
    type:
      | 'chargingchange'
      | 'levelchange'
      | 'chargingtimechange'
      | 'dischargingtimechange',
    listener: (this: this, ev: Event) => void,
  ): void;
}

interface Navigator {
  getBattery?: () => Promise<BatteryManager>;
  connection?: NetworkInformation;
  share?: (data?: ShareData) => Promise<void>;
  canShare?: (data?: ShareData) => boolean;
}

interface NetworkInformation extends EventTarget {
  readonly effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
  readonly rtt: number;
  readonly downlink: number;
  readonly saveData: boolean;
  addEventListener(
    type: 'change',
    listener: (this: this, ev: Event) => void,
  ): void;
}
