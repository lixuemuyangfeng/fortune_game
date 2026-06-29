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
    wx.showShareMenu?.({ withShareTicket: true, menus: ["shareAppMessage", "shareTimeline"] });
    wx.shareAppMessage({ title: payload.title, imageUrl: payload.image, query: new URLSearchParams(payload.query).toString() });
    return { shared: true };
  }

  getSocialContext() {
    const options = wx.getLaunchOptionsSync?.() ?? {};
    const query = options.query ?? {};
    return {
      fromShare: Boolean(query.inviter || query.groupId || options.shareTicket),
      shareTicket: options.shareTicket,
      inviterId: query.inviter,
      groupId: query.groupId,
      sceneId: query.scene,
      reward: isShareReward(query.reward) ? query.reward : undefined,
      assistKey: query.assist ?? `${query.inviter ?? options.shareTicket ?? "wechat"}:${query.scene ?? "unknown"}:${query.reward ?? "none"}`
    };
  }

  async openLeaderboard(scope: "friend" | "province"): Promise<void> {
    wx.getOpenDataContext?.().postMessage({ type: "openLeaderboard", scope });
  }

  getLaunchOptions() {
    const options = wx.getLaunchOptionsSync?.() ?? {};
    return { query: options.query ?? {} };
  }

  reportEvent(name: string, params: Record<string, unknown>): void {
    wx.reportEvent?.(name, params);
  }
}

function isShareReward(value: string | undefined): value is "hint" | "revive" | "clear" {
  return value === "hint" || value === "revive" || value === "clear";
}
