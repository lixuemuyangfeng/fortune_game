import type { GameConfig } from "./types";

export const gameConfig: GameConfig = {
  emotions: {
    envy: "朋友圈暴击",
    stubborn: "嘴硬护盾",
    breakdown: "老板话术",
    fantasy: "幻想燃料",
    pretend: "恐慌噪声"
  },
  themes: {
    gold: "黄金破防日",
    ai: "AI 踏空日",
    lottery: "彩票最后希望日"
  },
  evidences: {
    phone_gold: {
      id: "phone_gold",
      title: "半截金价走势",
      detail: "它只露出上涨那一段，像专门来提醒你昨天没买。",
      emotion: "envy",
      theme: "gold",
      counterText: "不是每辆车都值得上。"
    },
    boss_mail: {
      id: "boss_mail",
      title: "邢总三连弹窗",
      detail: "今晚一版、owner 一点、我骂你是还想带你。",
      emotion: "breakdown",
      theme: "ai",
      counterText: "主人翁意识，已还给主人。"
    },
    fund_loss: {
      id: "fund_loss",
      title: "东方财负角落",
      detail: "亏损曲线缩在表格后面，绿得很稳定。",
      emotion: "stubborn",
      theme: "gold",
      counterText: "亏损不是命令，不必立刻翻本。"
    },
    lottery_ticket: {
      id: "lottery_ticket",
      title: "抽屉里的刮刮泪",
      detail: "谢谢参与还没扔，说明今晚还需要一点缓冲。",
      emotion: "fantasy",
      theme: "lottery",
      counterText: "差一点，不等于差一张。"
    },
    ai_news: {
      id: "ai_news",
      title: "ChatGDP 静音直播",
      detail: "弹幕说白领要没了，但它还不会替你背锅。",
      emotion: "pretend",
      theme: "ai",
      counterText: "先别替代我，先替我写周报。"
    },
    friend_profit: {
      id: "friend_profit",
      title: "朋友圈收益截图",
      detail: "他说只是运气好，你听完更难受。",
      emotion: "breakdown",
      theme: "gold",
      counterText: "别人晒的是收益，你收的是心跳。"
    },
    incense_gold: {
      id: "incense_gold",
      title: "黄金香炉排队上香",
      detail: "每个人都说自己只是看看。",
      emotion: "envy",
      theme: "gold",
      counterText: "香火很旺，仓位仍然虚构。"
    },
    wish_wall: {
      id: "wish_wall",
      title: "财富自由许愿墙",
      detail: "愿望很宏大，预算很克制。",
      emotion: "fantasy",
      theme: "lottery",
      counterText: "愿望可以大，转账先别急。"
    },
    mortgage_bill: {
      id: "mortgage_bill",
      title: "房贷扣款提醒",
      detail: "它不关心市场情绪，只关心每月几号。",
      emotion: "breakdown",
      theme: "gold",
      counterText: "现金流比玄学更需要供奉。"
    },
    ai_layoff_post: {
      id: "ai_layoff_post",
      title: "AI 裁员热帖",
      detail: "标题很吓人，评论区已经开始教你转行。",
      emotion: "pretend",
      theme: "ai",
      counterText: "先学会用工具，再决定要不要恐慌。"
    },
    macro_news: {
      id: "macro_news",
      title: "宏观大棋告示",
      detail: "字越大，越像和你两千块余额有关。",
      emotion: "pretend",
      theme: "gold",
      counterText: "大棋很大，别把自己当棋盘。"
    },
    boss_phone: {
      id: "boss_phone",
      title: "老板来电祈福牌",
      detail: "铃声一响，许愿墙都安静了。",
      emotion: "stubborn",
      theme: "ai",
      counterText: "不是所有召唤都值得立刻响应。"
    }
  },
  scenes: [
    {
      id: "office",
      name: "键盘声变轻了",
      theme: "gold",
      description: "字节跳桶下午三点二十七，工位还在，人已经被行情和弹窗偷走了。",
      backgroundImage: "/assets/scenes/office-noise-bg.png",
      hint: "键盘声变轻了",
      enemyName: "踏空噪声",
      enemyDescription: "它专挑你最累的时候弹出：别人都上车了。",
      machineName: "工位还魂机",
      machineImage: "/assets/machines/workstation-soul-machine.svg",
      completeText: "不是你效率低，是工位今天被行情附身了。",
      hotspots: [
        { id: "h1", evidenceId: "fund_loss", x: 47.6, y: 49.8, hitX: 47.8, hitY: 49.6, radius: 8, label: "亏损窗口", found: false, image: "/assets/office-level/loss-corner.svg", imageWidth: 15, anchorX: 50, anchorY: 50, hitScale: 0.88, revealText: "东方财负：亏损不是翻本命令" },
        { id: "h2", evidenceId: "boss_mail", x: 66.6, y: 24.8, hitX: 66.3, hitY: 25, radius: 8, label: "邢总弹窗", found: false, image: "/assets/office-level/boss-pua-chat.svg", imageWidth: 16, anchorX: 50, anchorY: 50, hitScale: 0.9, revealText: "主人翁意识已还给主人" },
        { id: "h3", evidenceId: "phone_gold", x: 31.5, y: 56.8, hitX: 31.8, hitY: 56.6, radius: 8, label: "金价手机", found: false, image: "/assets/office-level/gold-phone.svg", imageWidth: 8, anchorX: 50, anchorY: 50, hitScale: 1.15, revealText: "半截涨幅不等于整辆车" },
        { id: "h4", evidenceId: "lottery_ticket", x: 39.2, y: 75.8, hitX: 39, hitY: 75.4, radius: 7, label: "刮刮泪", found: false, image: "/assets/office-level/scratch-ticket.svg", imageWidth: 11, anchorX: 50, anchorY: 50, hitScale: 0.95, revealText: "差一点不是差一张" },
        { id: "h5", evidenceId: "ai_news", x: 81.6, y: 45.2, hitX: 81.4, hitY: 45.2, radius: 8, label: "AI直播", found: false, image: "/assets/office-level/ai-tab.svg", imageWidth: 14, anchorX: 50, anchorY: 50, hitScale: 0.9, revealText: "先替我写周报再说" }
      ]
    },
    {
      id: "moments",
      name: "朋友圈炫富现场",
      theme: "gold",
      description: "每一条动态都像在暗示你错过了某个时代，连沉默都像收益率。",
      backgroundImage: "/assets/moments-level/background.svg",
      hint: "别急着点赞",
      enemyName: "社交比较雾",
      enemyDescription: "它把别人的截图放大，把你的正常生活缩小。",
      machineName: "朋友圈退烧机",
      machineImage: "/assets/machines/social-detox-machine.svg",
      completeText: "截图已经降温，今天先把手机倒扣十分钟。",
      character: { x: 74, y: 79, scale: 0.98, source: "mascot" },
      hotspots: [
        { id: "h1", evidenceId: "friend_profit", x: 46.5, y: 28.2, hitX: 46.4, hitY: 28.4, radius: 9, label: "收益截图", found: false, image: "/assets/moments-level/profit-screenshot.svg", imageWidth: 18, anchorX: 50, anchorY: 50, hitScale: 1, revealText: "朋友的运气，不是你的判决书" },
        { id: "h2", evidenceId: "phone_gold", x: 27.4, y: 58.2, hitX: 27.5, hitY: 58.4, radius: 8, label: "金价手机", found: false, image: "/assets/moments-level/gold-price-phone.svg", imageWidth: 11, anchorX: 50, anchorY: 50, hitScale: 1.15, revealText: "半截曲线最会制造整段后悔" },
        { id: "h3", evidenceId: "fund_loss", x: 67.2, y: 70.4, hitX: 67.2, hitY: 70.2, radius: 8, label: "亏损角落", found: false, image: "/assets/moments-level/loss-corner.svg", imageWidth: 14, anchorX: 50, anchorY: 50, hitScale: 1, revealText: "没有晒出来的，才是大多数" },
        { id: "h4", evidenceId: "mortgage_bill", x: 36.8, y: 79.3, hitX: 36.8, hitY: 79, radius: 8, label: "房贷账单", found: false, image: "/assets/moments-level/mortgage-bill.svg", imageWidth: 14, anchorX: 50, anchorY: 50, hitScale: 1, revealText: "账单不会羡慕任何截图" },
        { id: "h5", evidenceId: "ai_layoff_post", x: 76.6, y: 41.8, hitX: 76.4, hitY: 41.6, radius: 9, label: "AI裁员热帖", found: false, image: "/assets/moments-level/ai-layoff-hot-post.svg", imageWidth: 18, anchorX: 50, anchorY: 50, hitScale: 0.95, revealText: "热帖负责吓人，明天还要上班" }
      ]
    },
    {
      id: "temple",
      name: "财神庙",
      theme: "lottery",
      description: "这里处理所有低成本暴富幻想和高浓度嘴硬，香灰里全是没说出口的再来一张。",
      backgroundImage: "/assets/temple-level/background.svg",
      hint: "香火太旺了",
      enemyName: "低成本暴富瘴气",
      enemyDescription: "它会把两块钱的希望吹成年度战略。",
      machineName: "彩票冷却炉",
      machineImage: "/assets/machines/lottery-cooling-furnace.svg",
      completeText: "愿望已经冷却，暴富梦先放进图鉴。",
      character: { x: 73, y: 80, scale: 1, flipX: false, source: "mascot" },
      hotspots: [
        { id: "h1", evidenceId: "incense_gold", x: 49.5, y: 45.8, hitX: 49.5, hitY: 45.5, radius: 10, label: "黄金香炉", found: false, image: "/assets/temple-level/golden-incense-burner.svg", imageWidth: 20, anchorX: 50, anchorY: 50, hitScale: 0.95, revealText: "金色烟雾很浓，理性还能看见" },
        { id: "h2", evidenceId: "wish_wall", x: 74.5, y: 42.6, hitX: 74.3, hitY: 42.8, radius: 10, label: "许愿墙", found: false, image: "/assets/temple-level/wish-wall.svg", imageWidth: 18, anchorX: 50, anchorY: 50, hitScale: 1, revealText: "财富自由先写在墙上" },
        { id: "h3", evidenceId: "lottery_ticket", x: 37.6, y: 72.5, hitX: 37.5, hitY: 72.2, radius: 9, label: "彩票摊", found: false, image: "/assets/temple-level/lottery-stand.svg", imageWidth: 18, anchorX: 50, anchorY: 50, hitScale: 1, revealText: "再来一张，是幻想的回声" },
        { id: "h4", evidenceId: "macro_news", x: 24.2, y: 34.8, hitX: 24, hitY: 35, radius: 8, label: "宏观告示", found: false, image: "/assets/temple-level/geopolitics-news-sign.svg", imageWidth: 16, anchorX: 50, anchorY: 50, hitScale: 0.95, revealText: "世界很大，别让标题替你下注" },
        { id: "h5", evidenceId: "boss_phone", x: 65.2, y: 72.6, hitX: 65.4, hitY: 72.4, radius: 8, label: "老板来电牌", found: false, image: "/assets/temple-level/boss-phone-sign.svg", imageWidth: 14, anchorX: 50, anchorY: 50, hitScale: 1, revealText: "财神不接 KPI 电话" }
      ]
    }
  ],
  facilities: [
    { id: "gold_incense", name: "黄金香炉", description: "把避险新闻加工成眼红值。", emotion: "envy", level: 1, baseOutput: 8 },
    { id: "ai_shrine", name: "AI 神坛", description: "把错过红利加工成假装懂。", emotion: "pretend", level: 1, baseOutput: 7 },
    { id: "lottery_bin", name: "彩票垃圾桶", description: "把两块钱变成一整天的幻想。", emotion: "fantasy", level: 1, baseOutput: 7 },
    { id: "mortgage_crusher", name: "房贷粉碎机", description: "稳定生产破防值。", emotion: "breakdown", level: 1, baseOutput: 6 },
    { id: "screenshot_wall", name: "朋友圈截图墙", description: "把别人的收益截图转成嘴硬值。", emotion: "stubborn", level: 1, baseOutput: 6 }
  ],
  cards: [
    { id: "gold_fomo", title: "黄金财神门外汉", rarity: "rare", theme: "gold", text: "你不是没上车，你是在研究车站结构。" },
    { id: "ai_beach", title: "AI 浪潮岸边观众", rarity: "rare", theme: "ai", text: "你见证了时代，也见证了自己没动。" },
    { id: "lottery_hope", title: "彩票最后希望", rarity: "normal", theme: "lottery", text: "花小钱办大梦。" },
    { id: "perfect_miss", title: "精准踏空", rarity: "epic", theme: "gold", text: "每次都差一点，说明你参与感很强。" },
    { id: "stubborn_wait", title: "嘴硬观望", rarity: "normal", theme: "ai", text: "再等等是你的长期主义。" }
  ],
  personalities: [
    {
      id: "gold_outsider",
      name: "黄金财神门外汉",
      description: "你离暴富很近，近到只隔着昨天的决定。",
      weights: { envy: 4, stubborn: 2 }
    },
    {
      id: "precise_misser",
      name: "精准踏空型打工人",
      description: "你的判断经常正确，除了行动那一步。",
      weights: { breakdown: 4, stubborn: 3 }
    },
    {
      id: "fantasy_holder",
      name: "暴富幻想收藏家",
      description: "现实收益一般，精神仓位很满。",
      weights: { fantasy: 5, pretend: 1 }
    }
  ],
  fortunes: [
    "今日宜观望，尤其适合假装早就知道。",
    "你不是错过了行情，你只是提前布局了情绪稳定。",
    "朋友圈的收益截图会迟到，但不会缺席。",
    "愿望可以很大，仓位必须是虚构的。"
  ]
};
