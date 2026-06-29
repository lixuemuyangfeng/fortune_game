const canvas = wx.createCanvas();
const ctx = canvas.getContext("2d");
const systemInfo = wx.getSystemInfoSync();
const dpr = systemInfo.pixelRatio || 1;
const width = systemInfo.windowWidth;
const height = systemInfo.windowHeight;

canvas.width = Math.floor(width * dpr);
canvas.height = Math.floor(height * dpr);
ctx.scale(dpr, dpr);

const storageKey = "fortune-game-wechat-preview-v1";
const mistakeLimit = 3;
const dailyGoal = 3;
const baseAttempts = 5;
const sourceImage = { width: 1672, height: 941 };
const sourceAspect = sourceImage.width / sourceImage.height;

const scene = {
  id: "office",
  name: "键盘声变轻了",
  place: "字节跳桶开放办公区",
  time: "周三 15:27",
  completeText: "不是你效率低，是工位今天被行情附身了。",
  hotspots: [
    { id: "h1", label: "亏损曲线", hitX: 37, hitY: 58, hitWidth: 18, hitHeight: 13 },
    { id: "h2", label: "owner 意识消息", hitX: 80.5, hitY: 36.2, hitWidth: 15, hitHeight: 15 },
    { id: "h3", label: "金价手机", hitX: 15.7, hitY: 47.2, hitWidth: 9, hitHeight: 20 },
    { id: "h4", label: "花呗便利贴", hitX: 27, hitY: 71.8, hitWidth: 9, hitHeight: 9 },
    { id: "h5", label: "刮刮泪", hitX: 42.2, hitY: 88.2, hitWidth: 14, hitHeight: 9 }
  ]
};

const image = wx.createImage();
let imageLoaded = false;
image.onload = () => {
  imageLoaded = true;
  render();
};
image.src = "assets/office-raster-v2.png";

let state = loadState();
let toast = applyLaunchAssist();
let buttons = [];
let sceneRect = { x: 12, y: 96, w: width - 24, h: (width - 24) / sourceAspect };
let evidenceRect = { x: 12, y: 0, w: width - 24, h: 72 };
let panelRect = { x: 12, y: 0, w: width - 24, h: 122 };
let buttonStartY = 0;
let topInset = 18;

wx.showShareMenu({ withShareTicket: true, menus: ["shareAppMessage", "shareTimeline"] });
wx.onShareAppMessage(() => ({
  title: `我在暴富幻想所卡在「${scene.name}」，来帮我找一个破绽`,
  imageUrl: "assets/office-raster-v2.png",
  query: createShareQuery("hint")
}));

wx.onTouchStart((event) => {
  const touch = event.touches[0];
  if (!touch) return;
  handleTap(touch.clientX, touch.clientY);
});

render();

function createInitialState() {
  return {
    foundHotspotIds: [],
    challengeActive: false,
    failed: false,
    missCount: 0,
    attemptsUsed: 0,
    extraAttemptsToday: 0,
    clearsToday: 0,
    streak: 0,
    adViews: {},
    hintTicket: 0,
    reviveCard: 0,
    shareCount: 0,
    inviteCount: 0,
    helpedFriends: 0,
    claimedAssistKeys: [],
    date: todayKey()
  };
}

function loadState() {
  const stored = wx.getStorageSync(storageKey);
  const initial = createInitialState();
  if (!stored) return initial;
  return {
    ...initial,
    ...stored,
    foundHotspotIds: stored.foundHotspotIds || [],
    adViews: stored.adViews || {},
    claimedAssistKeys: stored.claimedAssistKeys || []
  };
}

function saveState() {
  wx.setStorageSync(storageKey, state);
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function dailySnapshot() {
  const sameDate = state.date === todayKey();
  const attemptsUsed = sameDate ? state.attemptsUsed : 0;
  const extraAttemptsToday = sameDate ? state.extraAttemptsToday : 0;
  const attemptsLimit = baseAttempts + state.inviteCount + extraAttemptsToday;
  return {
    attemptsUsed,
    attemptsLimit,
    attemptsRemaining: Math.max(0, attemptsLimit - attemptsUsed),
    clearsToday: sameDate ? state.clearsToday : 0,
    goalComplete: (sameDate ? state.clearsToday : 0) >= dailyGoal
  };
}

function applyLaunchAssist() {
  const options = wx.getLaunchOptionsSync ? wx.getLaunchOptionsSync() : {};
  const query = options.query || {};
  if (!query.reward && !query.assist && !query.inviter) return "抓住偷走注意力的噪声。";
  const assistKey = query.assist || `${query.inviter || "friend"}:${query.scene || scene.id}:${query.reward || "hint"}`;
  if (state.claimedAssistKeys.includes(assistKey)) {
    return "这个助力已经记过了，继续挑战。";
  }
  state.claimedAssistKeys.push(assistKey);
  state.inviteCount += 1;
  state.helpedFriends += 1;
  if (query.reward === "revive") {
    state.reviveCard += 1;
    saveState();
    return "好友助力已到账，复活卡 +1。";
  }
  state.hintTicket += 1;
  saveState();
  return "好友助力已到账，提示券 +1。";
}

function resetRun() {
  state.foundHotspotIds = [];
  state.challengeActive = false;
  state.failed = false;
  state.missCount = 0;
  saveState();
}

function startChallenge() {
  const daily = dailySnapshot();
  if (daily.attemptsRemaining <= 0) {
    toast = "今日体力用完了，可以看广告加一次挑战机会。";
    render();
    return;
  }
  state.challengeActive = true;
  state.failed = false;
  state.missCount = 0;
  state.attemptsUsed += 1;
  state.date = todayKey();
  toast = "开始找出 5 个让工位失魂的诱因。";
  saveState();
  render();
}

function handleTap(x, y) {
  const button = buttons.find((item) => pointInRect(x, y, item));
  if (button) {
    button.action();
    return;
  }

  if (!state.challengeActive || state.failed || isComplete()) return;
  const hotspot = scene.hotspots.find((item) => !state.foundHotspotIds.includes(item.id) && pointInHotspot(x, y, item));
  if (hotspot) {
    state.foundHotspotIds.push(hotspot.id);
    toast = state.foundHotspotIds.length >= scene.hotspots.length ? scene.completeText : `找到：${hotspot.label}`;
    if (isComplete()) {
      state.clearsToday += 1;
      state.streak += 1;
      state.challengeActive = false;
    }
    saveState();
    render();
    return;
  }

  state.missCount += 1;
  if (state.missCount >= mistakeLimit) {
    state.failed = true;
    state.challengeActive = false;
    toast = "错点已满，本局失败。复活能保留已找到的证据。";
  } else {
    toast = `这里暂时只有空响，剩余失误 ${mistakeLimit - state.missCount} 次。`;
  }
  saveState();
  render();
}

function pointInRect(x, y, rect) {
  return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
}

function pointInHotspot(x, y, hotspot) {
  const point = screenToImagePoint(x, y);
  if (!point) return false;
  const rect = hotspotSourceRect(hotspot);
  return pointInRect(point.x, point.y, rect);
}

function screenToImagePoint(x, y) {
  if (!pointInRect(x, y, sceneRect)) return null;
  return {
    x: (x - sceneRect.x) / sceneRect.w * sourceImage.width,
    y: (y - sceneRect.y) / sceneRect.h * sourceImage.height
  };
}

function hotspotSourceRect(hotspot) {
  return {
    x: sourceImage.width * (hotspot.hitX - hotspot.hitWidth / 2) / 100,
    y: sourceImage.height * (hotspot.hitY - hotspot.hitHeight / 2) / 100,
    w: sourceImage.width * hotspot.hitWidth / 100,
    h: sourceImage.height * hotspot.hitHeight / 100
  };
}

function hotspotRect(hotspot) {
  const rect = hotspotSourceRect(hotspot);
  return {
    x: sceneRect.x + sceneRect.w * rect.x / sourceImage.width,
    y: sceneRect.y + sceneRect.h * rect.y / sourceImage.height,
    w: sceneRect.w * rect.w / sourceImage.width,
    h: sceneRect.h * rect.h / sourceImage.height
  };
}

function isComplete() {
  return state.foundHotspotIds.length >= scene.hotspots.length;
}

function watchAd(placement, onComplete) {
  const adUnitId = placement;
  let ad = null;
  try {
    ad = wx.createRewardedVideoAd ? wx.createRewardedVideoAd({ adUnitId }) : null;
  } catch (error) {
    ad = null;
  }
  if (!ad) {
    setTimeout(() => {
      recordAdView(placement);
      onComplete();
    }, 350);
    return;
  }
  ad.offClose && ad.offClose();
  ad.onClose((res) => {
    if (res && res.isEnded === false) return;
    recordAdView(placement);
    onComplete();
  });
  ad.show().catch(() => {
    ad.load().then(() => ad.show()).catch(() => {
      recordAdView(placement);
      onComplete();
    });
  });
}

function recordAdView(placement) {
  state.adViews[placement] = (state.adViews[placement] || 0) + 1;
}

function revealHint() {
  if (!state.challengeActive || state.failed) {
    toast = "先开局或复活后再用提示。";
    render();
    return;
  }
  if (state.hintTicket > 0) {
    state.hintTicket -= 1;
    toast = "提示券已用，未找到的线索会闪一下。";
  } else {
    watchAd("hint", () => {
      toast = "广告提示已到账，未找到的线索会闪一下。";
      saveState();
      render();
    });
    return;
  }
  saveState();
  render();
}

function reviveWithAd() {
  if (!state.failed) return;
  watchAd("revive", () => {
    state.failed = false;
    state.challengeActive = true;
    state.missCount = 0;
    toast = "复活成功，已找到的证据保留。";
    saveState();
    render();
  });
}

function reviveWithCardOrShare() {
  if (!state.failed) return;
  if (state.reviveCard > 0) {
    state.reviveCard -= 1;
    state.failed = false;
    state.challengeActive = true;
    state.missCount = 0;
    toast = "复活卡已使用，继续这局。";
    saveState();
    render();
    return;
  }
  share("revive", "我在暴富幻想所失误满了，拉我一把复活继续找");
  state.reviveCard += 1;
  state.reviveCard -= 1;
  state.failed = false;
  state.challengeActive = true;
  state.missCount = 0;
  toast = "分享助力已发出，本次复活生效。";
  saveState();
  render();
}

function gainExtraAttempt() {
  watchAd("extra_attempt", () => {
    state.extraAttemptsToday += 1;
    toast = "体力 +1，今天还能再开一局。";
    saveState();
    render();
  });
}

function shareReward() {
  share("hint", `我在暴富幻想所卡在「${scene.name}」，来帮我找一个破绽`);
  state.shareCount += 1;
  state.hintTicket += 1;
  toast = "分享已发出，提示券 +1。";
  saveState();
  render();
}

function shareClear() {
  share("clear", `我拆掉了「${scene.name}」5/5 个破绽，来试试你能不能更快`);
  state.shareCount += 1;
  toast = "战报已发到群里，好友榜会刷新你的通关记录。";
  saveState();
  render();
}

function doubleReward() {
  watchAd("double_reward", () => {
    state.hintTicket += 2;
    toast = "翻倍奖励到账，提示券 +2。";
    saveState();
    render();
  });
}

function share(reward, title) {
  wx.shareAppMessage({
    title,
    imageUrl: "assets/office-raster-v2.png",
    query: createShareQuery(reward)
  });
}

function createShareQuery(reward) {
  return `scene=${scene.id}&inviter=local-player&reward=${reward}&assist=${scene.id}-${reward}-${Date.now()}`;
}

function render() {
  buttons = [];
  calculateLayout();
  ctx.clearRect(0, 0, width, height);
  drawBackground();
  drawTop();
  drawScene();
  drawEvidenceStrip();
  drawPanel();
  drawButtons();
}

function calculateLayout() {
  const margin = 12;
  topInset = Math.max(18, systemInfo.safeArea ? systemInfo.safeArea.top : 24);
  const safeBottom = systemInfo.safeArea ? Math.max(10, height - systemInfo.safeArea.bottom + 10) : 12;
  const headerHeight = 92;
  const sceneY = topInset + headerHeight;
  const panelHeight = height < 700 ? 106 : 116;
  const buttonRows = isComplete() && !state.failed ? 2 : 1;
  const buttonHeight = buttonRows === 2 ? 100 : 44;
  const imageWidth = width - margin * 2;
  buttonStartY = height - safeBottom - buttonHeight;
  panelRect = { x: margin, y: buttonStartY - panelHeight - 12, w: imageWidth, h: panelHeight };
  const maxImageHeight = panelRect.y - sceneY - 86;
  const imageHeight = Math.min(imageWidth / sourceAspect, Math.max(160, maxImageHeight));
  sceneRect = { x: margin, y: sceneY, w: imageWidth, h: imageHeight };
  evidenceRect = {
    x: margin,
    y: sceneRect.y + sceneRect.h + 10,
    w: imageWidth,
    h: Math.max(58, panelRect.y - sceneRect.y - sceneRect.h - 20)
  };
}

function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#15251d");
  gradient.addColorStop(1, "#06160f");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function drawTop() {
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 24px sans-serif";
  ctx.fillText("暴富幻想所", 14, topInset + 24);
  ctx.fillStyle = "#f3c45b";
  ctx.font = "bold 12px sans-serif";
  ctx.fillText(scene.place, 14, topInset + 48);
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.textAlign = "right";
  ctx.fillText(scene.time, width - 14, topInset + 48);
  ctx.textAlign = "left";
  ctx.fillStyle = "#fff";
  ctx.font = "bold 22px sans-serif";
  ctx.fillText(scene.name, 14, topInset + 78);
}

function drawScene() {
  ctx.fillStyle = "#0d1e17";
  roundRect(sceneRect.x, sceneRect.y, sceneRect.w, sceneRect.h, 10, true, false);
  if (imageLoaded) {
    ctx.drawImage(image, sceneRect.x, sceneRect.y, sceneRect.w, sceneRect.h);
  }
  ctx.strokeStyle = "rgba(243,196,91,0.45)";
  ctx.lineWidth = 2;
  roundRect(sceneRect.x, sceneRect.y, sceneRect.w, sceneRect.h, 10, false, true);

  scene.hotspots.forEach((hotspot) => {
    if (!state.foundHotspotIds.includes(hotspot.id)) return;
    const rect = hotspotRect(hotspot);
    ctx.fillStyle = "rgba(47,122,73,0.92)";
    ctx.beginPath();
    ctx.arc(rect.x + rect.w / 2, rect.y + rect.h / 2, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 12px sans-serif";
    ctx.fillText("✓", rect.x + rect.w / 2 - 4, rect.y + rect.h / 2 + 4);
  });
}

function drawEvidenceStrip() {
  const foundCount = state.foundHotspotIds.length;
  const slotSize = Math.min(34, (evidenceRect.w - 104) / 5);
  const gap = Math.max(7, slotSize * 0.32);
  const totalWidth = slotSize * 5 + gap * 4;
  const startX = evidenceRect.x + (evidenceRect.w - totalWidth) / 2;
  const slotOffsetY = Math.min(
    Math.max(26, evidenceRect.h / 2 - slotSize / 2 + 10),
    Math.max(22, evidenceRect.h - slotSize - 4)
  );
  const slotY = evidenceRect.y + slotOffsetY;

  ctx.fillStyle = "rgba(255,255,255,0.78)";
  ctx.font = "13px sans-serif";
  wrapText(toast, evidenceRect.x + 8, evidenceRect.y + 20, evidenceRect.w - 16, 18, 1, "center");

  for (let index = 0; index < scene.hotspots.length; index += 1) {
    const x = startX + index * (slotSize + gap);
    const found = index < foundCount;
    ctx.fillStyle = found ? "#f3c45b" : "rgba(255,255,255,0.08)";
    roundRect(x, slotY, slotSize, slotSize, 8, true, false);
    ctx.strokeStyle = found ? "rgba(243,196,91,0.88)" : "rgba(255,255,255,0.2)";
    ctx.lineWidth = 1;
    roundRect(x, slotY, slotSize, slotSize, 8, false, true);
    ctx.fillStyle = found ? "#17261f" : "rgba(255,255,255,0.55)";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(found ? "✓" : String(index + 1), x + slotSize / 2, slotY + slotSize / 2 + 5);
    ctx.textAlign = "left";
  }
}

function drawPanel() {
  const daily = dailySnapshot();
  const panelY = panelRect.y;
  drawCard(panelRect.x, panelY, panelRect.w, panelRect.h);
  ctx.fillStyle = "#f3c45b";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText("今日挑战", panelRect.x + 14, panelY + 25);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 22px sans-serif";
  ctx.fillText(`${state.foundHotspotIds.length}/5`, width - 70, panelY + 31);
  ctx.font = "bold 16px sans-serif";
  ctx.fillText(`通关 ${daily.clearsToday}/${dailyGoal}`, panelRect.x + 14, panelY + 58);
  ctx.fillText(`体力 ${daily.attemptsRemaining}/${daily.attemptsLimit}`, panelRect.x + 14, panelY + 84);
  ctx.fillText(`连胜 ${state.streak}`, width / 2, panelY + 58);
  ctx.fillText(`提示 ${state.hintTicket}  复活 ${state.reviveCard}`, width / 2, panelY + 84);
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = "12px sans-serif";
  ctx.fillText(daily.goalComplete ? "今日目标已达成，继续冲群榜。" : `今日目标还差 ${dailyGoal - daily.clearsToday} 关。`, panelRect.x + 14, panelY + panelRect.h - 18);
}

function drawButtons() {
  const startY = buttonStartY;
  const daily = dailySnapshot();
  if (state.failed && !isComplete()) {
    addButton(12, startY, (width - 36) / 2, 44, "看广告复活", reviveWithAd, true);
    addButton(24 + (width - 36) / 2, startY, (width - 36) / 2, 44, state.reviveCard > 0 ? `用复活卡 ${state.reviveCard}` : "分享拿复活卡", reviveWithCardOrShare, false);
  } else if (isComplete()) {
    addButton(12, startY, (width - 36) / 2, 44, "晒到群里", shareClear, true);
    addButton(24 + (width - 36) / 2, startY, (width - 36) / 2, 44, "广告翻倍", doubleReward, false);
    addButton(12, startY + 56, width - 24, 44, "再来一局", () => {
      resetRun();
      toast = "抓住偷走注意力的噪声。";
      render();
    }, false);
  } else if (daily.attemptsRemaining <= 0 && !state.challengeActive) {
    addButton(12, startY, width - 24, 44, "看广告加体力", gainExtraAttempt, true);
  } else {
    addButton(12, startY, (width - 36) / 2, 44, state.challengeActive ? "继续找茬" : "开始挑战", startChallenge, true);
    addButton(24 + (width - 36) / 2, startY, (width - 36) / 2, 44, state.challengeActive ? "提示" : "分享领提示", state.challengeActive ? revealHint : shareReward, false);
  }
}

function addButton(x, y, w, h, label, action, primary) {
  buttons.push({ x, y, w, h, action });
  ctx.fillStyle = primary ? "#f3c45b" : "#ffffff";
  roundRect(x, y, w, h, 8, true, false);
  ctx.fillStyle = "#17261f";
  ctx.font = "bold 16px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x + w / 2, y + h / 2);
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
}

function drawCard(x, y, w, h) {
  ctx.fillStyle = "rgba(255,255,255,0.07)";
  roundRect(x, y, w, h, 12, true, false);
  ctx.strokeStyle = "rgba(243,196,91,0.3)";
  ctx.lineWidth = 1;
  roundRect(x, y, w, h, 12, false, true);
}

function wrapText(text, x, y, maxWidth, lineHeight, maxLines, align) {
  const chars = String(text).split("");
  let line = "";
  let lines = 1;
  const previousAlign = ctx.textAlign;
  if (align) ctx.textAlign = align;
  const textX = align === "center" ? x + maxWidth / 2 : x;
  for (let index = 0; index < chars.length; index += 1) {
    const testLine = line + chars[index];
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, textX, y);
      if (maxLines && lines >= maxLines) {
        ctx.textAlign = previousAlign;
        return;
      }
      line = chars[index];
      y += lineHeight;
      lines += 1;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, textX, y);
  ctx.textAlign = previousAlign;
}

function roundRect(x, y, w, h, r, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}
