import type { PlatformAdapter, PlatformLoginResult, RewardedAdResult, SharePayload, ShareResult } from "./adapter";

export class WebAdapter implements PlatformAdapter {
  async login(): Promise<PlatformLoginResult> {
    const existing = localStorage.getItem("fortune-web-user");
    const userId = existing ?? `web_${crypto.randomUUID()}`;
    localStorage.setItem("fortune-web-user", userId);
    return { userId, platform: "web" };
  }

  async showRewardedAd(placement: string): Promise<RewardedAdResult> {
    await new Promise((resolve) => window.setTimeout(resolve, 450));
    return { completed: true, placement };
  }

  async share(payload: SharePayload): Promise<ShareResult> {
    if (navigator.share) {
      await navigator.share({ title: payload.title, text: payload.title });
      return { shared: true };
    }
    await navigator.clipboard?.writeText(payload.title);
    return { shared: true };
  }

  getLaunchOptions() {
    return { query: Object.fromEntries(new URLSearchParams(window.location.search)) };
  }

  reportEvent(name: string, params: Record<string, unknown>): void {
    console.info("[event]", name, params);
  }
}
