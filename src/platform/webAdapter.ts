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

  getSocialContext() {
    const query = Object.fromEntries(new URLSearchParams(window.location.search));
    return {
      fromShare: Boolean(query.inviter || query.shareTicket || query.groupId),
      shareTicket: query.shareTicket,
      inviterId: query.inviter,
      groupId: query.groupId,
      sceneId: query.scene,
      reward: isShareReward(query.reward) ? query.reward : undefined,
      assistKey: query.assist ?? `${query.inviter ?? "web"}:${query.scene ?? "unknown"}:${query.reward ?? "none"}`
    };
  }

  async openLeaderboard(scope: "friend" | "province"): Promise<void> {
    console.info("[leaderboard]", scope);
  }

  getLaunchOptions() {
    return { query: Object.fromEntries(new URLSearchParams(window.location.search)) };
  }

  reportEvent(name: string, params: Record<string, unknown>): void {
    console.info("[event]", name, params);
  }
}

function isShareReward(value: string | undefined): value is "hint" | "revive" | "clear" {
  return value === "hint" || value === "revive" || value === "clear";
}
