import type { PlatformAdapter, PlatformLoginResult, RewardedAdResult, SharePayload, ShareResult } from "./adapter";

declare const wx: any;

export class WechatAdapter implements PlatformAdapter {
  async login(): Promise<PlatformLoginResult> {
    const result = await wx.login();
    return { userId: result.code, platform: "wechat" };
  }

  async showRewardedAd(placement: string): Promise<RewardedAdResult> {
    const ad = wx.createRewardedVideoAd({ adUnitId: placement });
    return new Promise((resolve) => {
      ad.onClose((res: { isEnded?: boolean }) => resolve({ completed: Boolean(res?.isEnded), placement }));
      ad.show();
    });
  }

  async share(payload: SharePayload): Promise<ShareResult> {
    wx.shareAppMessage({ title: payload.title, imageUrl: payload.image, query: new URLSearchParams(payload.query).toString() });
    return { shared: true };
  }

  getLaunchOptions() {
    const options = wx.getLaunchOptionsSync?.() ?? {};
    return { query: options.query ?? {} };
  }

  reportEvent(name: string, params: Record<string, unknown>): void {
    wx.reportEvent?.(name, params);
  }
}
