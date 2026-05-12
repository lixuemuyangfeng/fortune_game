# 实现说明

当前实现是《暴富幻想所》MVP 的第一版可运行骨架，目标是先验证核心循环：

> 主城经营 -> 热点侦查 -> 情绪分拣 -> 资源增长 -> 设施升级 -> 卡牌/人格分享 -> 激励广告点。

## 运行

```bash
npm install
npm run dev
```

构建：

```bash
npm run build
```

## 当前代码结构

```text
src/
  core/
    config.ts        # MVP 示例配置：场景、热点证据、设施、卡牌、人格
    state.ts         # 共享游戏规则：收菜、找证据、分拣、升级、抽卡、人格计算
    types.ts         # 共享数据结构
  platform/
    adapter.ts       # 微信/抖音/Web 统一平台接口
    webAdapter.ts    # 浏览器原型适配
    wechatAdapter.ts # 微信小游戏适配骨架
    douyinAdapter.ts # 抖音小游戏适配骨架
  main.ts            # MVP Web 原型界面
  styles.css         # 原型样式
```

## 已实现能力

- 暴富幻想所主城。
- 5 个经营设施和资源。
- 3 个热点侦查场景。
- 找茬点位配置化。
- 情绪分拣。
- 离线收益。
- 设施升级。
- 热点卡解锁。
- 今日人格生成。
- Web 端模拟激励广告。
- Web 分享或复制分享文案。
- 微信/抖音平台适配接口骨架。
- 生产构建通过。

## 平台兼容策略

当前前端使用 Web 原型承载交互，核心玩法逻辑与平台 API 解耦。

后续接入微信/抖音小游戏时，优先复用：

- `src/core/types.ts`
- `src/core/config.ts`
- `src/core/state.ts`
- `src/platform/adapter.ts`

需要替换：

- 渲染层：从 DOM/Vite 替换为 Cocos Creator、LayaAir 或平台 Canvas。
- 平台层：使用 `WechatAdapter` / `DouyinAdapter` 绑定真实登录、广告、分享。
- 存档层：从 `localStorage` 替换为服务端存档。

## 下一阶段实现任务

P0：

- 把 Web 原型拆成更清晰的 UI 模块。
- 增加正式新手引导。
- 增加广告点每日次数上限。
- 增加配置版本字段。
- 增加基础服务端 API。
- 增加管理后台最小版，用于编辑场景点位、卡牌、人格和签文。

P1：

- 引入游戏引擎工程，验证微信/抖音小游戏真机包。
- 图片素材替换当前 CSS 占位图。
- 分享图改为 Canvas 生成。
- 增加 A/B 实验配置。
- 增加埋点批量上报。

P2：

- 内容生成流水线。
- CDN 资源分包。
- 排行榜。
- 活动系统。
- 抖音直播互动预研。
