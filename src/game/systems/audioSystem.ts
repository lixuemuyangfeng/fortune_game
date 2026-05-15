export type HitSoundKind = "kline" | "goldLine" | "chat" | "paper" | "scratch" | "receipt" | "news" | "alert" | "sign" | "miss" | "complete";

let audioContext: AudioContext | undefined;

function getAudioContext(): AudioContext | undefined {
  const AudioContextCtor = window.AudioContext ?? window.webkitAudioContext;
  if (!AudioContextCtor) return undefined;
  audioContext ??= new AudioContextCtor();
  return audioContext;
}

export function playHitSound(kind: HitSoundKind): void {
  const context = getAudioContext();
  if (!context) return;

  if (context.state === "suspended") {
    void context.resume();
  }

  const now = context.currentTime;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();
  const profile = getProfile(kind);

  oscillator.type = profile.type;
  oscillator.frequency.setValueAtTime(profile.startFrequency, now);
  oscillator.frequency.exponentialRampToValueAtTime(profile.endFrequency, now + profile.duration);
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(profile.filterFrequency, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(profile.volume, now + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + profile.duration);

  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + profile.duration + 0.03);
}

function getProfile(kind: HitSoundKind) {
  if (kind === "miss") {
    return { type: "triangle" as OscillatorType, startFrequency: 150, endFrequency: 90, filterFrequency: 380, volume: 0.04, duration: 0.08 };
  }
  if (kind === "complete") {
    return { type: "sawtooth" as OscillatorType, startFrequency: 220, endFrequency: 440, filterFrequency: 720, volume: 0.08, duration: 0.32 };
  }
  if (kind === "chat") {
    return { type: "square" as OscillatorType, startFrequency: 360, endFrequency: 210, filterFrequency: 900, volume: 0.05, duration: 0.12 };
  }
  if (kind === "goldLine") {
    return { type: "sine" as OscillatorType, startFrequency: 520, endFrequency: 840, filterFrequency: 1200, volume: 0.05, duration: 0.16 };
  }
  if (kind === "alert") {
    return { type: "square" as OscillatorType, startFrequency: 680, endFrequency: 330, filterFrequency: 1400, volume: 0.045, duration: 0.11 };
  }
  if (kind === "news" || kind === "sign") {
    return { type: "sawtooth" as OscillatorType, startFrequency: 310, endFrequency: 180, filterFrequency: 860, volume: 0.045, duration: 0.13 };
  }
  if (kind === "paper" || kind === "scratch" || kind === "receipt") {
    return { type: "triangle" as OscillatorType, startFrequency: 280, endFrequency: 150, filterFrequency: 1050, volume: 0.045, duration: 0.14 };
  }
  return { type: "sawtooth" as OscillatorType, startFrequency: 240, endFrequency: 130, filterFrequency: 760, volume: 0.045, duration: 0.13 };
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
