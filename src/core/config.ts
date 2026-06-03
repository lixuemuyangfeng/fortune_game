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
      title: "踩线告示",
      detail: "门口白色告示写着谨防踩线，旁边的人还在把追涨说成稳健。",
      emotion: "stubborn",
      theme: "gold",
      counterText: "嘴硬可以，别把嘴硬当风险管理。"
    },
    leverage_contract: {
      id: "leverage_contract",
      title: "杠杆合同边角",
      detail: "压在工具箱钥匙旁的纸角，说明嘴上长期配置，手上已经开始借力。",
      emotion: "breakdown",
      theme: "gold",
      counterText: "借来的勇气，最先收利息。"
    },
    near_miss_tickets: {
      id: "near_miss_tickets",
      title: "中间那张刮花废票",
      detail: "柜台下那张刮得最狠的废票，被留在最显眼的位置继续劝人补一张。",
      emotion: "fantasy",
      theme: "lottery",
      counterText: "刮得再用力，也不能把没中刮成中了。"
    },
    covered_winner_photo: {
      id: "covered_winner_photo",
      title: "遮金额中奖合影",
      detail: "照片很大，金额被贴住，剩下的部分正好够人脑补。",
      emotion: "envy",
      theme: "lottery",
      counterText: "被遮住的金额，最擅长替你加戏。"
    },
    payment_addon_prompt: {
      id: "payment_addon_prompt",
      title: "付款码旁加购贴",
      detail: "付款码旁边贴着加购提示，把结账动作顺手拐成再买一张。",
      emotion: "pretend",
      theme: "lottery",
      counterText: "最危险的不是想买，是付款时顺手。"
    },
    pocket_losing_ticket: {
      id: "pocket_losing_ticket",
      title: "西装内袋废票",
      detail: "销售把没中的纸片塞进内袋，说留个纪念，其实是舍不得判它死刑。",
      emotion: "stubborn",
      theme: "lottery",
      counterText: "纪念可以留，幻想别续费。"
    },
    almost_due_note: {
      id: "almost_due_note",
      title: "柜台这本快了牌",
      detail: "柜台边的小牌子把概率说成气氛，把气氛说成机会。",
      emotion: "pretend",
      theme: "lottery",
      counterText: "这本快了，通常是钱包快了。"
    },
    lottery_booklet: {
      id: "lottery_booklet",
      title: "老板娘指的彩票本",
      detail: "她指得很熟练，像是在给幻想找一个更顺手的入口。",
      emotion: "fantasy",
      theme: "lottery",
      counterText: "被指中的那本，不等于会指中你。"
    },
    max_prize_stand: {
      id: "max_prize_stand",
      title: "最高奖金立牌",
      detail: "右侧立牌把最大数字放得很大，故意让概率小到看不见。",
      emotion: "envy",
      theme: "lottery",
      counterText: "最大数字很醒目，中奖概率很安静。"
    },
    cropped_profit_screenshot: {
      id: "cropped_profit_screenshot",
      title: "没露本金的收益图",
      detail: "手机里只露涨幅和红线，本金、持仓时间和亏损区间都被裁掉。",
      emotion: "envy",
      theme: "ai",
      counterText: "收益图只晒结果，不替你承担本金。"
    },
    group_invite_popup: {
      id: "group_invite_popup",
      title: "收益帖旁的进群邀请",
      detail: "刚看完收益帖，旁边就弹出同款策略群，放松时间被顺手接走。",
      emotion: "pretend",
      theme: "ai",
      counterText: "真正的分享不会急着把你拉进下一场焦虑。"
    },
    pinned_review_comment: {
      id: "pinned_review_comment",
      title: "置顶复盘评论",
      detail: "评论区把复盘入口置顶，像在提醒你别只羡慕，还要补课。",
      emotion: "pretend",
      theme: "ai",
      counterText: "置顶的位置，不代表它更接近真相。"
    },
    mortgage_debit_notice: {
      id: "mortgage_debit_notice",
      title: "新房照旁的还款单",
      detail: "相册里是装修后的客厅，旁边压着下月扣款和账户余额。",
      emotion: "breakdown",
      theme: "gold",
      counterText: "照片能晒空间，账单才会晒压力。"
    },
    ai_course_deadline: {
      id: "ai_course_deadline",
      title: "裁掉日期的课程截止",
      detail: "电脑把今晚 23:59 放到最醒目，日期和退款条件藏在边缘。",
      emotion: "fantasy",
      theme: "ai",
      counterText: "倒计时是真的，机会未必是真的。"
    },
    side_hustle_bookmark: {
      id: "side_hustle_bookmark",
      title: "副业课程收藏页",
      detail: "侧屏还停在变现课合集，说明这不是第一条让人上头的内容。",
      emotion: "fantasy",
      theme: "ai",
      counterText: "收藏越多，越要分清行动和补偿性焦虑。"
    },
    unsent_reply_draft: {
      id: "unsent_reply_draft",
      title: "没发出去的祝福",
      detail: "输入框里停着那句挺好的，手指一直没按发送。",
      emotion: "stubborn",
      theme: "ai",
      counterText: "看见羡慕，比假装大方更有用。"
    },
    household_overdue_bill: {
      id: "household_overdue_bill",
      title: "电费催缴通知",
      detail: "柜子边的缴费单提醒他，生活成本不会因为刷到高光而暂停。",
      emotion: "breakdown",
      theme: "gold",
      counterText: "别人的高光不替你交今晚的账单。"
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
      backgroundImage: "/assets/game/rooftop/states/rooftop-v9-progress-0.png",
      hint: "别急着补仓",
      enemyName: "接盘幻影",
      enemyDescription: "它把追高包装成理性建议：长期配置，越跌越买，你这是避险。",
      machineName: "接盘冷却炉",
      machineEmbedded: true,
      completeText: "先别再加仓了。今晚能睡着，比嘴硬更重要。",
      hotspots: [
        { id: "h1", evidenceId: "gold_receipt", x: 77.1, y: 83.6, hitX: 77.1, hitY: 83.6, hitWidth: 5.2, hitHeight: 7.2, radius: 7, label: "金店小票", found: false, renderMode: "embedded", revealText: "小票垫不住追高的手", animationKind: "receipt" },
        { id: "h2", evidenceId: "hedge_group", x: 44.1, y: 36.2, hitX: 44.1, hitY: 36.2, hitWidth: 3.6, hitHeight: 7.2, radius: 8, label: "稳健避险交流群", found: false, renderMode: "embedded", revealText: "每三分钟问一次，还叫长期", animationKind: "chat" },
        { id: "h3", evidenceId: "risk_headline", x: 92.7, y: 31.2, hitX: 92.7, hitY: 31.2, hitWidth: 6.8, hitHeight: 11.2, radius: 8, label: "避险快讯截图", found: false, renderMode: "embedded", revealText: "没有来源的标题，最会替你下单", animationKind: "news" },
        { id: "h4", evidenceId: "price_alarm", x: 85.7, y: 71.9, hitX: 85.7, hitY: 71.9, hitWidth: 3.2, hitHeight: 5.2, radius: 7, label: "跌幅提醒手机", found: false, renderMode: "embedded", revealText: "长期资产正在被五分钟一刷审问", animationKind: "alert" },
        { id: "h5", evidenceId: "rooftop_warning", x: 33, y: 32.5, hitX: 33, hitY: 32.5, hitWidth: 4.2, hitHeight: 8.6, radius: 8, label: "踩线告示", found: false, renderMode: "embedded", revealText: "门口白纸提醒别再踩线", animationKind: "sign" },
        { id: "h6", evidenceId: "leverage_contract", x: 96.2, y: 76.4, hitX: 96.2, hitY: 76.4, hitWidth: 5.2, hitHeight: 8.8, radius: 7, label: "杠杆合同边角", found: false, renderMode: "embedded", revealText: "借来的底气压在钥匙旁", animationKind: "contract" }
      ]
    },
    {
      id: "convenience",
      name: "刮刮泪便利站",
      theme: "lottery",
      description: "公司楼下的便利站亮着冷光，周启明本来只想买无糖茶，柜台却把差一点摆成一整排。",
      backgroundImage: "/assets/game/convenience/states/convenience-progress-0.png",
      hint: "别顺手加一张",
      enemyName: "差一点怪圈",
      enemyDescription: "它用差一点、下一张、这本快了，把两块钱的幻想续成一晚上。",
      machineName: "幻想断电闸",
      machineEmbedded: true,
      completeText: "差一点，不等于差一张。今晚先把手从柜台边拿回来。",
      hotspots: [
        { id: "h1", evidenceId: "near_miss_tickets", x: 46.2, y: 82.8, hitX: 46.2, hitY: 82.8, hitWidth: 7.2, hitHeight: 13, radius: 8, label: "中间那张刮花废票", found: false, renderMode: "embedded", revealText: "刮得最狠，也还是没中", animationKind: "scratch" },
        { id: "h2", evidenceId: "covered_winner_photo", x: 81.1, y: 25.9, hitX: 81.1, hitY: 25.9, hitWidth: 10, hitHeight: 8.2, radius: 8, label: "遮金额中奖合影", found: false, renderMode: "embedded", revealText: "金额被遮住，想象开始上班", animationKind: "photo" },
        { id: "h3", evidenceId: "payment_addon_prompt", x: 77.7, y: 68.1, hitX: 77.7, hitY: 68.1, hitWidth: 5.4, hitHeight: 13.8, radius: 7, label: "付款码旁加购贴", found: false, renderMode: "embedded", revealText: "结账时最容易被顺手带走", animationKind: "note" },
        { id: "h4", evidenceId: "pocket_losing_ticket", x: 52.6, y: 34.6, hitX: 52.6, hitY: 34.6, hitWidth: 4.2, hitHeight: 8.2, radius: 7, label: "西装内袋废票", found: false, renderMode: "embedded", revealText: "没中的纸片被收进内袋", animationKind: "ticket" },
        { id: "h5", evidenceId: "almost_due_note", x: 65.6, y: 67.2, hitX: 65.6, hitY: 67.2, hitWidth: 8, hitHeight: 8.8, radius: 7, label: "柜台这本快了牌", found: false, renderMode: "embedded", revealText: "快了两个字最会催人掏钱", animationKind: "note" },
        { id: "h6", evidenceId: "lottery_booklet", x: 49.6, y: 65.1, hitX: 49.6, hitY: 65.1, hitWidth: 18.6, hitHeight: 10.8, radius: 8, label: "老板娘指的彩票本", found: false, renderMode: "embedded", revealText: "被指中的那本，不等于会中你", animationKind: "ticket" },
        { id: "h7", evidenceId: "max_prize_stand", x: 88.3, y: 47, hitX: 88.3, hitY: 47, hitWidth: 11.2, hitHeight: 9.8, radius: 8, label: "最高奖金立牌", found: false, renderMode: "embedded", revealText: "最大数字负责让概率闭嘴", animationKind: "photo" }
      ]
    },
    {
      id: "social",
      name: "小红薯暴击夜",
      theme: "ai",
      description: "凌晨一点半，周启明靠在沙发里想刷手机放松，桌上那些小角落却比首页更诚实。",
      backgroundImage: "/assets/game/social/states/social-progress-0.png",
      hint: "别拿高光照黑眼圈",
      enemyName: "高光滤镜兽",
      enemyDescription: "它把收益、房子、副业和祝福都剪成最亮的一帧，再塞进睡前十分钟。",
      machineName: "高光拆帧机",
      machineEmbedded: true,
      completeText: "别人的高光只负责发亮，不负责替你交账。今晚先把屏幕放低一点。",
      decoys: [
        { id: "window-photo", x: 5.0, y: 18.2, hitWidth: 6.8, hitHeight: 9.2, label: "窗边相框" },
        { id: "blanket-fold", x: 24.8, y: 61.1, hitWidth: 13.0, hitHeight: 18.0, label: "被子褶皱" },
        { id: "alarm-clock", x: 49.0, y: 29.2, hitWidth: 5.8, hitHeight: 6.8, label: "床头闹钟" },
        { id: "laptop-body", x: 63.1, y: 33.6, hitWidth: 13.5, hitHeight: 12.0, label: "电脑机身" },
        { id: "notice-board", x: 67.6, y: 15.6, hitWidth: 16.0, hitHeight: 18.0, label: "普通便签墙" },
        { id: "water-bottle", x: 45.9, y: 58.6, hitWidth: 5.2, hitHeight: 13.0, label: "桌上水瓶" },
        { id: "snack-bag", x: 53.8, y: 52.2, hitWidth: 10.4, hitHeight: 11.2, label: "零食包装" },
        { id: "black-mug", x: 71.5, y: 55.0, hitWidth: 7.0, hitHeight: 9.0, label: "黑色马克杯" },
        { id: "white-mug", x: 67.9, y: 58.7, hitWidth: 6.0, hitHeight: 7.4, label: "白色杯子" },
        { id: "coin-scatter", x: 51.4, y: 69.0, hitWidth: 10.0, hitHeight: 7.8, label: "零钱堆" },
        { id: "table-pen", x: 57.1, y: 77.7, hitWidth: 8.6, hitHeight: 6.2, label: "桌面钢笔" },
        { id: "normal-receipts", x: 45.5, y: 78.1, hitWidth: 13.0, hitHeight: 12.0, label: "普通小票" },
        { id: "remote-control", x: 43.5, y: 76.0, hitWidth: 7.2, hitHeight: 8.0, label: "遥控器" },
        { id: "ordinary-cards", x: 40.1, y: 56.9, hitWidth: 8.5, hitHeight: 7.0, label: "普通卡片" },
        { id: "book-stack", x: 85.8, y: 49.4, hitWidth: 12.0, hitHeight: 14.0, label: "书本堆" },
        { id: "photo-stack", x: 82.8, y: 59.0, hitWidth: 10.5, hitHeight: 9.0, label: "照片堆" },
        { id: "tissue-box", x: 92.0, y: 53.5, hitWidth: 9.5, hitHeight: 12.5, label: "纸巾盒" },
        { id: "power-adapter", x: 87.4, y: 73.2, hitWidth: 5.8, hitHeight: 7.2, label: "插头适配器" },
        { id: "cable-loop", x: 92.5, y: 67.8, hitWidth: 6.4, hitHeight: 8.8, label: "线缆圈" },
        { id: "paper-rubble", x: 72.8, y: 77.4, hitWidth: 11.5, hitHeight: 11.0, label: "杂纸堆" }
      ],
      hotspots: [
        { id: "h1", evidenceId: "cropped_profit_screenshot", x: 39.5, y: 40.7, hitX: 39.5, hitY: 40.7, hitWidth: 4.4, hitHeight: 5.4, radius: 7, label: "手机红线裁边", found: false, renderMode: "embedded", revealText: "红线露出来，本金被手挡住", animationKind: "phone" },
        { id: "h2", evidenceId: "unsent_reply_draft", x: 39.5, y: 45.5, hitX: 39.5, hitY: 45.5, hitWidth: 3.8, hitHeight: 3.8, radius: 6, label: "没按下的发送角", found: false, renderMode: "embedded", revealText: "祝福卡在发送前一秒", animationKind: "chat" },
        { id: "h3", evidenceId: "group_invite_popup", x: 41.9, y: 54.6, hitX: 41.9, hitY: 54.6, hitWidth: 6.2, hitHeight: 5.8, radius: 7, label: "毯边进群卡", found: false, renderMode: "embedded", revealText: "收益后面接着进群按钮", animationKind: "chat" },
        { id: "h4", evidenceId: "pinned_review_comment", x: 71.9, y: 12.5, hitX: 71.9, hitY: 12.5, hitWidth: 4.6, hitHeight: 5.8, radius: 6, label: "便签墙红图钉", found: false, renderMode: "embedded", revealText: "复盘被钉在最前面", animationKind: "chat" },
        { id: "h5", evidenceId: "ai_course_deadline", x: 72.4, y: 34.6, hitX: 72.4, hitY: 34.6, hitWidth: 5.4, hitHeight: 7.0, radius: 7, label: "键盘边沙漏", found: false, renderMode: "embedded", revealText: "倒计时藏在键盘旁边", animationKind: "note" },
        { id: "h6", evidenceId: "side_hustle_bookmark", x: 86.4, y: 45.0, hitX: 86.4, hitY: 45.0, hitWidth: 4.8, hitHeight: 8.2, radius: 7, label: "书堆里的彩色书签", found: false, renderMode: "embedded", revealText: "副业课混在一排书签里", animationKind: "note" },
        { id: "h7", evidenceId: "mortgage_debit_notice", x: 54.4, y: 71.7, hitX: 54.4, hitY: 71.7, hitWidth: 6.6, hitHeight: 6.8, radius: 7, label: "钥匙压住的信封角", found: false, renderMode: "embedded", revealText: "房子照片旁边是下月扣款", animationKind: "contract" },
        { id: "h8", evidenceId: "household_overdue_bill", x: 82.4, y: 72.3, hitX: 82.4, hitY: 72.3, hitWidth: 6.0, hitHeight: 7.4, radius: 7, label: "插排旁红章纸角", found: false, renderMode: "embedded", revealText: "电费角落被线缆压着", animationKind: "paper" }
      ]
    }
  ]
};
