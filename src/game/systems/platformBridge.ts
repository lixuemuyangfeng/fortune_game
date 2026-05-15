import type { PlatformAdapter } from "../../platform/adapter";

export class PhaserPlatformBridge {
  constructor(private readonly platform: PlatformAdapter) {}

  reportEvent(name: string, params: Record<string, unknown>): void {
    this.platform.reportEvent(name, params);
  }

  vibrate(duration = 18): void {
    navigator.vibrate?.(duration);
  }
}
