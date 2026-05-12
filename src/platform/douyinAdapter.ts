import type { PlatformAdapter, PlatformLoginResult, RewardedAdResult, SharePayload, ShareResult } from "./adapter";

declare const tt: any;

export class DouyinAdapter implements PlatformAdapter {
  async login(): Promise<PlatformLoginResult> {
    const result = await tt.login();
    return { userId: result.code, platform: "douyin" };
  }

  async showRewardedAd(placement: string): Promise<RewardedAdResult> {
    const ad = tt.createRewardedVideoAd({ adUnitId: placement });
    return new Promise((resolve) => {
      ad.onClose((res: { isEnded?: boolean }) => resolve({ completed: Boolean(res?.isEnded), placement }));
      ad.show();
    });
  }

  async share(payload: SharePayload): Promise<ShareResult> {
    tt.shareAppMessage({ title: payload.title, imageUrl: payload.image, query: payload.query });
    return { shared: true };
  }

  getLaunchOptions() {
    const options = tt.getLaunchOptionsSync?.() ?? {};
    return { query: options.query ?? {} };
  }

  reportEvent(name: string, params: Record<string, unknown>): void {
    tt.reportAnalytics?.(name, params);
  }
}
