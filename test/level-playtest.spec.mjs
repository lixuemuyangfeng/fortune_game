import { expect, test } from "@playwright/test";

const officeHotspots = ["亏损曲线", "owner 意识消息", "金价手机", "花呗便利贴", "刮刮泪"];
const rooftopHotspots = ["金店小票", "稳健避险交流群", "避险快讯截图", "跌幅提醒手机", "踩线告示", "杠杆合同边角"];
const convenienceHotspots = ["中间那张刮花废票", "遮金额中奖合影", "付款码旁加购贴", "西装内袋废票", "柜台这本快了牌", "老板娘指的彩票本", "最高奖金立牌"];
const socialHotspots = [
  "手机里的收益红线",
  "沙发扶手草稿本",
  "小屏上的进群弹窗",
  "电脑置顶评论行",
  "键盘边沙漏",
  "书堆里的彩色书签",
  "照片旁还款钥匙",
  "桌沿逾期红章"
];
const aiLaunchHotspots = [
  "发布会演示表格",
  "待人工处理清单",
  "课程付款倒计时",
  "旧系统令牌",
  "审批人脉笔记",
  "人工盖章表单",
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
        await page.screenshot({ path: "artifacts/playtest-social-mid-progress.png", fullPage: true });
      }
    }

    await expect(page.getByText("比较心已降噪").first()).toBeVisible();
    await expect(page.getByText("证据袋已封口").first()).toBeVisible();
    await page.waitForTimeout(700);
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
