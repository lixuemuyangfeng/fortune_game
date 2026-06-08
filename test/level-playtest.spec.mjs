import { expect, test } from "@playwright/test";

const officeHotspots = ["亏损曲线", "owner 意识消息", "金价手机", "花呗便利贴", "刮刮泪"];
const rooftopHotspots = ["金店小票", "稳健避险交流群", "避险快讯截图", "跌幅提醒手机", "踩线告示", "杠杆合同边角"];
const convenienceHotspots = ["中间那张刮花废票", "遮金额中奖合影", "付款码旁加购贴", "西装内袋废票", "柜台这本快了牌", "老板娘指的彩票本", "最高奖金立牌"];
const socialHotspots = [
  "只截涨幅的手机图",
  "写坏的祝福草稿",
  "小屏上的进群弹窗",
  "高赞补课评论行",
  "课程截止便签",
  "书堆里的彩色书签",
  "新房照旁还款单",
  "桌沿逾期红章"
];
const aiLaunchHotspots = [
  "只跑样例的满分屏",
  "待人工复核清单",
  "平板结账倒计时",
  "旧系统令牌",
  "人情审批流程图",
  "红章兜底流程",
  "连播标签页",
  "替代新闻剪报",
  "未接老板消息"
];
const meetingHotspots = [
  "空着的资源协同格",
  "周启明负责人牌",
  "红叉风险页",
  "行动跟踪表",
  "目标预算剪刀差",
  "人头申请不通过",
  "周五截止日历",
  "机会激光笔",
  "预算锁盒",
  "白板淡掉的风险"
];
const nestHotspots = [
  "碎键盘行情芯",
  "半焦金店小票",
  "连环差一点票卷",
  "高光滤镜碎片",
  "恐慌课程计时器",
  "甩锅管阀",
  "不上车金属牌",
  "裂盾策略牌",
  "止损停牌",
  "可发布画框",
  "恐慌价签",
  "流程封签"
];
const stockHotspots = [
  "榜首荧光行",
  "700%截图卡",
  "三倍截图便签",
  "五倍便签",
  "涨停通知卡",
  "20cm涨停贴",
  "融资买入手机",
  "模拟盘满仓图",
  "荐股群邀请卡",
  "龙虎榜剪报",
  "卖房加仓草算",
  "风险揭示折角",
  "热榜推送手机"
];

const lateLevelDecoyChecks = [
  {
    sceneId: "ai_launch",
    heading: "AI 发布会公开处刑",
    startAction: "开始降噪",
    progress: "0/9",
    nextProgress: "1/9",
    decoys: ["普通视频卡片", "普通浏览器标签", "普通手机消息", "普通便签", "普通剪报"],
    firstHotspot: "只跑样例的满分屏"
  },
  {
    sceneId: "meeting",
    heading: "邢总画饼复盘会",
    startAction: "开始切割",
    progress: "0/10",
    nextProgress: "1/10",
    decoys: ["普通标题区", "普通笔记本电脑", "黑色咖啡杯", "普通文件夹", "普通桌牌"],
    firstHotspot: "空着的资源协同格"
  },
  {
    sceneId: "nest",
    heading: "暴富噪声母巢",
    startAction: "开始粉碎",
    progress: "0/12",
    nextProgress: "1/12",
    decoys: ["旧书架", "机器状态图标", "红色镜片", "银色玩具车", "普通便签堆"],
    firstHotspot: "碎键盘行情芯"
  }
];

async function revealNextHint(page, hotspotName) {
  await page.getByRole("button", { name: "给个提示" }).click();
  await expect(page.getByRole("button", { name: hotspotName })).toHaveClass(/is-hinted/);
  await page.getByRole("button", { name: hotspotName }).click();
  await expect(page.getByText("已找到")).toBeVisible();
}

async function expectCanvasHasSceneImage(page) {
  const stats = await page.locator("canvas").evaluate((canvas) => {
    const context = canvas.getContext("2d");
    if (!context) return { variedSamples: 0, sampled: 0, luminanceRange: 0 };
    const width = canvas.width;
    const height = canvas.height;
    const stepX = Math.max(1, Math.floor(width / 80));
    const stepY = Math.max(1, Math.floor(height / 45));
    let sampled = 0;
    let variedSamples = 0;
    let minLuminance = 255;
    let maxLuminance = 0;
    for (let y = 0; y < height; y += stepY) {
      for (let x = 0; x < width; x += stepX) {
        const [red, green, blue] = context.getImageData(x, y, 1, 1).data;
        const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
        minLuminance = Math.min(minLuminance, luminance);
        maxLuminance = Math.max(maxLuminance, luminance);
        sampled += 1;
        if (Math.abs(red - 16) + Math.abs(green - 25) + Math.abs(blue - 21) > 26) {
          variedSamples += 1;
        }
      }
    }
    return { variedSamples, sampled, luminanceRange: maxLuminance - minLuminance };
  });
  expect(stats.sampled).toBeGreaterThan(1000);
  expect(stats.variedSamples).toBeGreaterThan(stats.sampled * 0.35);
  expect(stats.luminanceRange).toBeGreaterThan(60);
}

test.describe("phaser level flow", () => {
  test("local dev scene picker can jump to a fixed level", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("http://localhost:5173/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await expect(page.getByLabel("本机临时选关")).toBeVisible();
    await page.getByLabel("本机临时选关").selectOption("convenience");
    await expect(page.getByRole("heading", { name: "刮刮泪便利站" })).toBeVisible();
    await expect(page.getByRole("button", { name: "开始断电" })).toBeVisible();
  });

  test("player can complete the first Phaser level and enter the rooftop level", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("http://localhost:5173/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await expect(page.getByRole("heading", { name: "暴富幻想所" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "键盘声变轻了" })).toBeVisible();
    await expect(page.locator("#phaser-game canvas")).toBeVisible();
    await page.screenshot({ path: "artifacts/playtest-desktop-phaser-intro.png", fullPage: true });

    await page.getByRole("button", { name: "开始还魂" }).click();
    await expect(page.getByLabel("可点击线索")).toBeVisible();

    for (const hotspot of officeHotspots) {
      await page.getByRole("button", { name: hotspot }).click();
      await expect(page.getByText("已找到")).toBeVisible();
    }

    await expect(page.getByText("工位已回魂").first()).toBeVisible();
    await expect(page.getByText("证据袋已封口").first()).toBeVisible();
    await expect(page.getByText("好友榜")).toHaveCount(0);
    await expect(page.getByText("资源产出")).toHaveCount(0);
    await expect(page.getByText("设施升级")).toHaveCount(0);
    await page.screenshot({ path: "artifacts/playtest-desktop-phaser-complete.png", fullPage: true });

    await page.getByRole("button", { name: "下一关入口" }).click();
    await expect(page.getByRole("heading", { name: "黄金大师天台局" })).toBeVisible();
    await expect(page.getByRole("button", { name: "开始冷却" })).toBeVisible();
    await page.screenshot({ path: "artifacts/playtest-rooftop-intro.png", fullPage: true });
  });

  test("player can complete the rooftop Phaser level", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("http://localhost:5173/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await page.getByRole("button", { name: "开始还魂" }).click();
    for (const hotspot of officeHotspots) {
      await page.getByRole("button", { name: hotspot }).click();
    }
    await page.getByRole("button", { name: "下一关入口" }).click();

    await expect(page.getByRole("heading", { name: "黄金大师天台局" })).toBeVisible();
    await page.getByRole("button", { name: "开始冷却" }).click();
    await expect(page.getByLabel("可点击线索")).toBeVisible();

    for (const hotspot of rooftopHotspots) {
      await page.getByRole("button", { name: hotspot }).click();
      await expect(page.getByText("已找到")).toBeVisible();
    }

    await expect(page.getByText("这波先冷下来了").first()).toBeVisible();
    await expect(page.getByText("证据袋已封口").first()).toBeVisible();
    await expect(page.getByText("好友榜")).toHaveCount(0);
    await expect(page.getByText("资源产出")).toHaveCount(0);
    await expect(page.getByText("设施升级")).toHaveCount(0);
    await page.screenshot({ path: "artifacts/playtest-rooftop-complete.png", fullPage: true });
  });

  test("player can enter and complete the convenience Phaser level", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("http://localhost:5173/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await page.getByRole("button", { name: "开始还魂" }).click();
    for (const hotspot of officeHotspots) {
      await page.getByRole("button", { name: hotspot }).click();
    }
    await page.getByRole("button", { name: "下一关入口" }).click();
    await page.getByRole("button", { name: "开始冷却" }).click();
    for (const hotspot of rooftopHotspots) {
      await page.getByRole("button", { name: hotspot }).click();
    }
    await page.getByRole("button", { name: "下一关入口" }).click();

    await expect(page.getByRole("heading", { name: "刮刮泪便利站" })).toBeVisible();
    await page.waitForTimeout(700);
    await page.screenshot({ path: "artifacts/playtest-convenience-intro.png", fullPage: true });
    await page.getByRole("button", { name: "开始断电" }).click();
    await expect(page.getByLabel("可点击线索")).toBeVisible();

    for (const hotspot of convenienceHotspots) {
      await page.getByRole("button", { name: hotspot }).click();
      await expect(page.getByText("已找到")).toBeVisible();
    }

    await expect(page.getByText("幻想已断电").first()).toBeVisible();
    await expect(page.getByText("证据袋已封口").first()).toBeVisible();
    await page.waitForTimeout(700);
    await page.screenshot({ path: "artifacts/playtest-convenience-complete.png", fullPage: true });
  });

  test("player can enter and complete the social comparison Phaser level", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("http://localhost:5173/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await page.getByRole("button", { name: "开始还魂" }).click();
    for (const hotspot of officeHotspots) {
      await page.getByRole("button", { name: hotspot }).click();
    }
    await page.getByRole("button", { name: "下一关入口" }).click();
    await page.getByRole("button", { name: "开始冷却" }).click();
    for (const hotspot of rooftopHotspots) {
      await page.getByRole("button", { name: hotspot }).click();
    }
    await page.getByRole("button", { name: "下一关入口" }).click();
    await page.getByRole("button", { name: "开始断电" }).click();
    for (const hotspot of convenienceHotspots) {
      await page.getByRole("button", { name: hotspot }).click();
    }
    await page.getByRole("button", { name: "下一关入口" }).click();

    await expect(page.getByRole("heading", { name: "小红薯暴击夜" })).toBeVisible();
    await page.waitForTimeout(700);
    await page.screenshot({ path: "artifacts/playtest-social-intro.png", fullPage: true });
    await page.getByRole("button", { name: "开始拆帧" }).click();
    await expect(page.getByLabel("可点击线索")).toBeVisible();

    for (const [index, hotspot] of socialHotspots.entries()) {
      await page.getByRole("button", { name: hotspot }).click();
      await expect(page.getByText("已找到")).toBeVisible();
      if (index === 3) {
        await page.waitForTimeout(700);
        await expectCanvasHasSceneImage(page);
        await page.screenshot({ path: "artifacts/playtest-social-mid-progress.png", fullPage: true });
      }
    }

    await expect(page.getByText("比较心已降噪").first()).toBeVisible();
    await expect(page.getByText("证据袋已封口").first()).toBeVisible();
    await page.waitForTimeout(700);
    await expectCanvasHasSceneImage(page);
    await page.screenshot({ path: "artifacts/playtest-social-complete.png", fullPage: true });
  });

  test("player can enter and complete the AI launch panic Phaser level", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("http://localhost:5173/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await page.getByLabel("本机临时选关").selectOption("ai_launch");
    await expect(page.getByRole("heading", { name: "AI 发布会公开处刑" })).toBeVisible();
    await page.waitForTimeout(700);
    await page.screenshot({ path: "artifacts/playtest-ai-launch-intro.png", fullPage: true });
    await page.getByRole("button", { name: "开始降噪" }).click();
    await expect(page.getByLabel("可点击线索")).toBeVisible();

    for (const [index, hotspot] of aiLaunchHotspots.entries()) {
      await page.getByRole("button", { name: hotspot }).click();
      await expect(page.getByText("已找到")).toBeVisible();
      if (index === 4) {
        await page.waitForTimeout(700);
        await page.screenshot({ path: "artifacts/playtest-ai-launch-mid-progress.png", fullPage: true });
      }
    }

    await expect(page.getByText("替代恐慌已降噪").first()).toBeVisible();
    await expect(page.getByText("证据袋已封口").first()).toBeVisible();
    await page.waitForTimeout(700);
    await page.screenshot({ path: "artifacts/playtest-ai-launch-complete.png", fullPage: true });
  });

  test("hint budget is scoped per level through the ninth AI launch clue", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("http://localhost:5173/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await page.getByLabel("本机临时选关").selectOption("social");
    await page.getByRole("button", { name: "开始拆帧" }).click();
    await expect(page.getByLabel("可点击线索")).toBeVisible();
    for (const hotspot of socialHotspots) {
      await revealNextHint(page, hotspot);
    }

    await page.getByLabel("本机临时选关").selectOption("ai_launch");
    await page.getByRole("button", { name: "开始降噪" }).click();
    await expect(page.getByLabel("可点击线索")).toBeVisible();
    for (const hotspot of aiLaunchHotspots) {
      await revealNextHint(page, hotspot);
    }

    await expect(page.getByText("替代恐慌已降噪").first()).toBeVisible();
  });

  test("player can enter and complete the meeting blame-shift Phaser level", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("http://localhost:5173/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await page.getByLabel("本机临时选关").selectOption("meeting");
    await expect(page.getByRole("heading", { name: "邢总画饼复盘会" })).toBeVisible();
    await page.waitForTimeout(700);
    await page.screenshot({ path: "artifacts/playtest-meeting-intro.png", fullPage: true });
    await page.getByRole("button", { name: "开始切割" }).click();
    await expect(page.getByLabel("可点击线索")).toBeVisible();

    for (const [index, hotspot] of meetingHotspots.entries()) {
      await page.getByRole("button", { name: hotspot }).click();
      await expect(page.getByText("已找到")).toBeVisible();
      if (index === 5) {
        await page.waitForTimeout(700);
        await page.screenshot({ path: "artifacts/playtest-meeting-mid-progress.png", fullPage: true });
      }
    }

    await expect(page.getByText("画饼锅已切开").first()).toBeVisible();
    await expect(page.getByText("证据袋已封口").first()).toBeVisible();
    await page.waitForTimeout(700);
    await page.screenshot({ path: "artifacts/playtest-meeting-complete.png", fullPage: true });

    await page.getByRole("button", { name: "下一关入口" }).click();
    await expect(page.getByRole("heading", { name: "暴富噪声母巢" })).toBeVisible();
    await expect(page.getByRole("button", { name: "开始粉碎" })).toBeVisible();
  });

  test("player can enter and complete the final noise nest Phaser level", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("http://localhost:5173/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await page.getByLabel("本机临时选关").selectOption("nest");
    await expect(page.getByRole("heading", { name: "暴富噪声母巢" })).toBeVisible();
    await page.waitForTimeout(700);
    await page.screenshot({ path: "artifacts/playtest-nest-intro.png", fullPage: true });
    await page.getByRole("button", { name: "开始粉碎" }).click();
    await expect(page.getByLabel("可点击线索")).toBeVisible();

    for (const [index, hotspot] of nestHotspots.entries()) {
      await page.getByRole("button", { name: hotspot }).click();
      await expect(page.getByText("已找到")).toBeVisible();
      if (index === 5) {
        await page.waitForTimeout(700);
        await page.screenshot({ path: "artifacts/playtest-nest-mid-progress.png", fullPage: true });
      }
    }

    await expect(page.getByText("母巢已拆解").first()).toBeVisible();
    await expect(page.getByText("证据袋已封口").first()).toBeVisible();
    await page.waitForTimeout(700);
    await page.screenshot({ path: "artifacts/playtest-nest-complete.png", fullPage: true });
  });

  test("player can enter and complete the stock heatlist Phaser level through the final hint", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("http://localhost:5173/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await page.getByLabel("本机临时选关").selectOption("stock");
    await expect(page.getByRole("heading", { name: "暴涨榜深夜场" })).toBeVisible();
    await page.waitForTimeout(700);
    await expectCanvasHasSceneImage(page);
    await page.screenshot({ path: "artifacts/playtest-stock-intro.png", fullPage: true });
    await page.getByRole("button", { name: "开始降温" }).click();
    await expect(page.getByText("0/13").first()).toBeVisible();

    for (const decoy of ["水电费便签", "旧书脊", "普通走势线"]) {
      await page.getByRole("button", { name: decoy }).click();
      await expect(page.getByText("0/13").first()).toBeVisible();
    }

    for (const [index, hotspot] of stockHotspots.entries()) {
      await revealNextHint(page, hotspot);
      await expect(page.getByText(`${index + 1}/13`).first()).toBeVisible();
      if (index === 5) {
        await page.waitForTimeout(700);
        await expectCanvasHasSceneImage(page);
        await page.screenshot({ path: "artifacts/playtest-stock-mid-progress.png", fullPage: true });
      }
    }

    await expect(page.getByText("热榜已冷却").first()).toBeVisible();
    await expect(page.getByText("证据袋已封口").first()).toBeVisible();
    await page.waitForTimeout(700);
    await expectCanvasHasSceneImage(page);
    await page.screenshot({ path: "artifacts/playtest-stock-complete.png", fullPage: true });
  });

  test("late levels require true clues and do not progress on visual decoys", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("http://localhost:5173/");

    for (const check of lateLevelDecoyChecks) {
      await page.evaluate(() => localStorage.clear());
      await page.reload();
      await page.getByLabel("本机临时选关").selectOption(check.sceneId);
      await expect(page.getByRole("heading", { name: check.heading })).toBeVisible();
      await page.getByRole("button", { name: check.startAction }).click();
      await expect(page.getByLabel("可点击线索")).toBeVisible();
      await expect(page.getByText(check.progress).first()).toBeVisible();

      for (const decoy of check.decoys) {
        await page.getByRole("button", { name: decoy }).click();
        await expect(page.getByText(check.progress).first()).toBeVisible();
        await expect(page.getByText("已找到")).toHaveCount(0);
      }

      await page.getByRole("button", { name: check.firstHotspot }).click();
      await expect(page.getByText(check.nextProgress).first()).toBeVisible();
      await expect(page.getByText("已找到")).toBeVisible();
    }
  });

  test("mobile first screen keeps the Phaser stage and controls usable", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:5173/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await expect(page.getByRole("heading", { name: "键盘声变轻了" })).toBeVisible();
    await expect(page.locator("#phaser-game canvas")).toBeVisible();
    await expect(page.getByRole("button", { name: "开始还魂" })).toBeVisible();
    await page.screenshot({ path: "artifacts/playtest-mobile-phaser-intro.png", fullPage: true });

    await page.getByLabel("本机临时选关").selectOption("social");
    await expect(page.getByRole("heading", { name: "小红薯暴击夜" })).toBeVisible();
    await expect(page.locator("#phaser-game canvas")).toBeVisible();
    await expect(page.getByRole("button", { name: "开始拆帧" })).toBeVisible();
    await page.waitForTimeout(700);
    await page.screenshot({ path: "artifacts/playtest-social-mobile-intro.png", fullPage: true });

    await page.getByLabel("本机临时选关").selectOption("ai_launch");
    await expect(page.getByRole("heading", { name: "AI 发布会公开处刑" })).toBeVisible();
    await expect(page.locator("#phaser-game canvas")).toBeVisible();
    await expect(page.getByRole("button", { name: "开始降噪" })).toBeVisible();
    await page.waitForTimeout(700);
    await page.screenshot({ path: "artifacts/playtest-ai-launch-mobile-intro.png", fullPage: true });

    await page.getByLabel("本机临时选关").selectOption("meeting");
    await expect(page.getByRole("heading", { name: "邢总画饼复盘会" })).toBeVisible();
    await expect(page.locator("#phaser-game canvas")).toBeVisible();
    await expect(page.getByRole("button", { name: "开始切割" })).toBeVisible();
    await page.waitForTimeout(700);
    await page.screenshot({ path: "artifacts/playtest-meeting-mobile-intro.png", fullPage: true });

    await page.getByLabel("本机临时选关").selectOption("nest");
    await expect(page.getByRole("heading", { name: "暴富噪声母巢" })).toBeVisible();
    await expect(page.locator("#phaser-game canvas")).toBeVisible();
    await expect(page.getByRole("button", { name: "开始粉碎" })).toBeVisible();
    await page.waitForTimeout(700);
    await page.screenshot({ path: "artifacts/playtest-nest-mobile-intro.png", fullPage: true });
  });
});
