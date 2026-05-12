export interface PlatformLoginResult {
  userId: string;
  platform: "web" | "wechat" | "douyin";
}

export interface RewardedAdResult {
  completed: boolean;
  placement: string;
}

export interface SharePayload {
  title: string;
  image?: string;
  query?: Record<string, string>;
}

export interface ShareResult {
  shared: boolean;
}

export interface LaunchOptions {
  query: Record<string, string>;
}

export interface PlatformAdapter {
  login(): Promise<PlatformLoginResult>;
  showRewardedAd(placement: string): Promise<RewardedAdResult>;
  showInterstitialAd?(placement: string): Promise<void>;
  share(payload: SharePayload): Promise<ShareResult>;
  getLaunchOptions(): LaunchOptions;
  reportEvent(name: string, params: Record<string, unknown>): void;
}
