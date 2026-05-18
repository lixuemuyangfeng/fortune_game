import type { GameConfig } from "./types";

export const gameConfig: GameConfig = {
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
    debt_note: {
      id: "debt_note",
      title: "花呗还款便利贴",
      detail: "回本后先还钱，说明它知道回本还没发生。",
      emotion: "breakdown",
      theme: "lottery",
      counterText: "先把今天过完，再安排回本以后。"
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
    },
    gold_receipt: {
      id: "gold_receipt",
      title: "金店小票垫片",
      detail: "嘴上说长期配置，手边的小票已经被折成烟盒垫片。",
      emotion: "stubborn",
      theme: "gold",
      counterText: "小票不会因为被折起来就变成策略。"
    },
    hedge_group: {
      id: "hedge_group",
      title: "稳健避险交流群",
      detail: "每三分钟问一次还拿吗，稳健得像集体失眠。",
      emotion: "breakdown",
      theme: "gold",
      counterText: "越多人嘴硬，越需要先冷却。"
    },
    risk_headline: {
      id: "risk_headline",
      title: "无来源避险快讯",
      detail: "标题很急，来源和时间都已经先下班了。",
      emotion: "pretend",
      theme: "gold",
      counterText: "没有来源的快讯，只负责替焦虑加杠杆。"
    },
    price_alarm: {
      id: "price_alarm",
      title: "跌 0.5% 提醒",
      detail: "说是长期资产，提醒阈值比闹钟还勤快。",
      emotion: "envy",
      theme: "gold",
      counterText: "长期配置不用每五分钟查一次呼吸。"
    },
    rooftop_warning: {
      id: "rooftop_warning",
      title: "敏感行情告示",
      detail: "禁止聚集讨论敏感行情，说明这里已经聚过很多次。",
      emotion: "stubborn",
      theme: "gold",
      counterText: "嘴硬可以，别把嘴硬当风险管理。"
    }
  },
  scenes: [
    {
      id: "office",
      name: "键盘声变轻了",
      theme: "gold",
      description: "字节跳桶下午三点二十七，工位还在，人已经被行情和弹窗偷走了。",
      backgroundImage: "/assets/office-level/office-raster-v2.png",
      hint: "键盘声变轻了",
      enemyName: "踏空噪声",
      enemyDescription: "它专挑你最累的时候弹出：别人都上车了。",
      machineName: "工位还魂机",
      machineEmbedded: true,
      completeText: "不是你效率低，是工位今天被行情附身了。",
      hotspots: [
        { id: "h1", evidenceId: "fund_loss", x: 37, y: 58, hitX: 37, hitY: 58, hitWidth: 27, hitHeight: 19, radius: 8, label: "亏损曲线", found: false, renderMode: "embedded", revealText: "东方财负：亏损不是翻本命令", animationKind: "kline" },
        { id: "h2", evidenceId: "boss_mail", x: 80.5, y: 36.2, hitX: 80.5, hitY: 36.2, hitWidth: 24, hitHeight: 25, radius: 8, label: "owner 意识消息", found: false, renderMode: "embedded", revealText: "主人翁意识已还给主人", animationKind: "chat" },
        { id: "h3", evidenceId: "phone_gold", x: 15.7, y: 47.2, hitX: 15.7, hitY: 47.2, hitWidth: 11.5, hitHeight: 27, radius: 6, label: "金价手机", found: false, renderMode: "embedded", revealText: "半截涨幅不等于整辆车", animationKind: "goldLine" },
        { id: "h4", evidenceId: "debt_note", x: 27, y: 71.8, hitX: 27, hitY: 71.8, hitWidth: 11, hitHeight: 12, radius: 5, label: "花呗便利贴", found: false, renderMode: "embedded", revealText: "回本以后，也得先经过今天", animationKind: "paper" },
        { id: "h5", evidenceId: "lottery_ticket", x: 42.2, y: 88.2, hitX: 42.2, hitY: 88.2, hitWidth: 19, hitHeight: 13, radius: 7, label: "刮刮泪", found: false, renderMode: "embedded", revealText: "差一点不是差一张", animationKind: "scratch" }
      ]
    },
    {
      id: "rooftop",
      name: "黄金大师天台局",
      theme: "gold",
      description: "傍晚天台，刚追完黄金的人都说自己不是短线，只是每三分钟看一次价格。",
      backgroundImage: "/assets/game/rooftop/rooftop-background.png",
      hint: "别急着补仓",
      enemyName: "接盘幻影",
      enemyDescription: "它把追高包装成理性建议：长期配置，越跌越买，你这是避险。",
      machineName: "接盘冷却炉",
      machineImage: "/assets/game/rooftop/machines/cooling-furnace.png",
      completeText: "家庭资产配置已冷冻。嘴硬可以，别拿嘴硬当策略。",
      hotspots: [
        { id: "h1", evidenceId: "gold_receipt", x: 24, y: 72, hitX: 24, hitY: 72, hitWidth: 15, hitHeight: 13, radius: 7, label: "金店小票", found: false, image: "/assets/game/rooftop/clues/folded-receipt.png", imageWidth: 13, anchorX: 50, anchorY: 50, hitScale: 1, revealText: "小票垫不住追高的手", animationKind: "receipt" },
        { id: "h2", evidenceId: "hedge_group", x: 42, y: 61, hitX: 42, hitY: 61, hitWidth: 15, hitHeight: 16, radius: 8, label: "稳健避险交流群", found: false, image: "/assets/game/rooftop/clues/group-chat.png", imageWidth: 12, anchorX: 50, anchorY: 50, hitScale: 1, revealText: "每三分钟问一次，还叫长期", animationKind: "chat" },
        { id: "h3", evidenceId: "risk_headline", x: 69, y: 36, hitX: 69, hitY: 36, hitWidth: 16, hitHeight: 12, radius: 8, label: "避险快讯截图", found: false, image: "/assets/game/rooftop/clues/risk-news.png", imageWidth: 14, anchorX: 50, anchorY: 50, hitScale: 1, revealText: "没有来源的标题，最会替你下单", animationKind: "news" },
        { id: "h4", evidenceId: "price_alarm", x: 58, y: 66, hitX: 58, hitY: 66, hitWidth: 9, hitHeight: 20, radius: 7, label: "跌幅提醒手机", found: false, image: "/assets/game/rooftop/clues/price-alert.png", imageWidth: 7, anchorX: 50, anchorY: 50, hitScale: 1, revealText: "长期资产正在被五分钟一刷审问", animationKind: "alert" },
        { id: "h5", evidenceId: "rooftop_warning", x: 82, y: 58, hitX: 82, hitY: 58, hitWidth: 16, hitHeight: 12, radius: 8, label: "敏感行情告示", found: false, image: "/assets/game/rooftop/clues/warning-sign.png", imageWidth: 15, anchorX: 50, anchorY: 50, hitScale: 1, revealText: "天台门口已经替你写了风险提示", animationKind: "sign" }
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
  ]
};
