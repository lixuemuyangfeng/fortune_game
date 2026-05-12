import { expect, test } from "@playwright/test";

const levels = [
  {
    next: "朋友圈炫富现场",
    hotspots: ["亏损曲线", "owner 意识消息", "金价手机", "花呗便利贴", "刮刮泪"]
  },
  {
    next: "财神庙",
    hotspots: ["收益截图", "金价手机", "亏损角落", "房贷账单", "AI裁员热帖"]
  },
  {
    hotspots: ["黄金香炉", "许愿墙", "彩票摊", "宏观告示", "老板来电牌"]
  }
];

test.describe("three-level playthrough", () => {
  test("player can complete office, moments, and temple with clear completion states", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("http://localhost:5173/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await expect(page.getByRole("heading", { name: "键盘声变轻了" })).toBeVisible();
    await page.screenshot({ path: "artifacts/playtest-desktop-intro.png", fullPage: true });

    for (const [index, level] of levels.entries()) {
      await page.getByRole("button", { name: /启动处理|继续抓噪声/ }).click();

      for (const hotspot of level.hotspots) {
        await page.getByRole("button", { name: hotspot }).first().click();
        await expect(page.getByText("已找到")).toBeVisible();
      }

      await expect(page.getByText("找齐了").first()).toBeVisible();
      await page.screenshot({ path: `artifacts/playtest-desktop-level-${index + 1}.png`, fullPage: true });

      if (level.next) {
        await page.getByRole("button", { name: `下一关：${level.next}` }).click();
        await expect(page.getByRole("heading", { name: level.next })).toBeVisible();
      }
    }
  });

  test("mobile first screen keeps the stage usable", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:5173/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await expect(page.getByRole("heading", { name: "键盘声变轻了" })).toBeVisible();
    await expect(page.getByRole("button", { name: "启动处理" })).toBeVisible();
    await page.screenshot({ path: "artifacts/playtest-mobile-intro.png", fullPage: true });
  });
});
