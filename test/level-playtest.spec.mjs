import { expect, test } from "@playwright/test";

const officeHotspots = ["亏损曲线", "owner 意识消息", "金价手机", "花呗便利贴", "刮刮泪"];
const rooftopHotspots = ["金店小票", "稳健避险交流群", "避险快讯截图", "跌幅提醒手机", "敏感行情告示"];

test.describe("phaser level flow", () => {
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

    await expect(page.getByText("接盘已冷却").first()).toBeVisible();
    await expect(page.getByText("证据袋已封口").first()).toBeVisible();
    await expect(page.getByText("好友榜")).toHaveCount(0);
    await expect(page.getByText("资源产出")).toHaveCount(0);
    await expect(page.getByText("设施升级")).toHaveCount(0);
    await page.screenshot({ path: "artifacts/playtest-rooftop-complete.png", fullPage: true });
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
  });
});
