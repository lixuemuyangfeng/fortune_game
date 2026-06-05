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
      title: "只截涨幅的收益图",
      detail: "手机里只截了上涨那一段，买入本金、持仓时间和回撤区间都不在画面里。",
      emotion: "envy",
      theme: "ai",
      counterText: "只看涨幅截图，很容易把本金忘掉。"
    },
    group_invite_popup: {
      id: "group_invite_popup",
      title: "收益帖旁的进群邀请",
      detail: "独立设备上弹着群头像和加入按钮，它不解释收益，只负责把你接进下一轮焦虑。",
      emotion: "pretend",
      theme: "ai",
      counterText: "真正的分享不会急着把你拉进下一场焦虑。"
    },
    pinned_review_comment: {
      id: "pinned_review_comment",
      title: "高赞补课评论",
      detail: "电脑评论区最醒目的那条把围观的人导向补课，像是给焦虑顺手开了下一扇门。",
      emotion: "pretend",
      theme: "ai",
      counterText: "高赞的位置，不代表它更接近真相。"
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
      title: "课程截止便签",
      detail: "黄色便签只写了课程截止，像是在提醒他再不报名就会落后。",
      emotion: "fantasy",
      theme: "ai",
      counterText: "截止日期是真的，机会未必是真的。"
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
      title: "写坏的祝福草稿",
      detail: "草稿本上把恭喜写了又划，真正露出来的是比较后的别扭。",
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
    },
    polished_ai_demo_rows: {
      id: "polished_ai_demo_rows",
      title: "太干净的演示数据",
      detail: "发布会里的客户、表格和流程都顺得像刚洗过，真实公司没有这么听话。",
      emotion: "pretend",
      theme: "ai",
      counterText: "演示环境越干净，越不能直接拿来吓自己。"
    },
    manual_review_sheet: {
      id: "manual_review_sheet",
      title: "待人工处理清单",
      detail: "屏幕上都在讲自动化，桌上的清单还写着待处理，说明流程没有一起升级。",
      emotion: "stubborn",
      theme: "ai",
      counterText: "工具能生成结果，流程还是会把人叫回来确认。"
    },
    panic_course_checkout: {
      id: "panic_course_checkout",
      title: "恐慌课结账倒计时",
      detail: "倒计时贴在付款旁边，像是在说不买课就来不及活下去。",
      emotion: "fantasy",
      theme: "ai",
      counterText: "学习可以，别把恐慌当付款理由。"
    },
    legacy_ie_token: {
      id: "legacy_ie_token",
      title: "旧系统 USB 令牌",
      detail: "现代发布会讲自动化，桌上旧令牌还在提醒他：系统先要求兼容 IE。",
      emotion: "pretend",
      theme: "ai",
      counterText: "能替代 PPT，不等于能替代祖传审批系统。"
    },
    approval_chain_notebook: {
      id: "approval_chain_notebook",
      title: "预算审批人脉图",
      detail: "笔记里圈着谁能批预算、谁只会已读不回，AI 还没学会催这个。",
      emotion: "stubborn",
      theme: "ai",
      counterText: "真正卡人的，常常不是写不出，而是批不下。"
    },
    manual_stamp_queue: {
      id: "manual_stamp_queue",
      title: "人工盖章队列",
      detail: "表单摞在印章旁边，说明流程还在用最原始的方式排队。",
      emotion: "breakdown",
      theme: "ai",
      counterText: "自动化很强，盖章窗口仍然午休。"
    },
    seventeen_tabs_fatigue: {
      id: "seventeen_tabs_fatigue",
      title: "连播到发麻的标签页",
      detail: "一排发布会、测评和转型攻略堆在一起，恐慌先把睡眠替代了。",
      emotion: "breakdown",
      theme: "ai",
      counterText: "看十七个视频，不等于多一份判断。"
    },
    job_replacement_clip: {
      id: "job_replacement_clip",
      title: "被剪下来的替代新闻",
      detail: "剪报只留下最吓人的标题，没留下行业、岗位和前提条件。",
      emotion: "envy",
      theme: "ai",
      counterText: "被裁出来的标题，最会裁掉上下文。"
    },
    boss_followup_unanswered: {
      id: "boss_followup_unanswered",
      title: "未接的老板追问",
      detail: "手机亮着未接消息，AI 会写初稿，但邢总还是会找真人追责。",
      emotion: "breakdown",
      theme: "ai",
      counterText: "它能生成回复，不能替你接邢总的电话。"
    },
    empty_resource_collab_slide: {
      id: "empty_resource_collab_slide",
      title: "空着的资源协同格",
      detail: "屏幕上写着协同落地，协同栏却像还没来上班。",
      emotion: "pretend",
      theme: "ai",
      counterText: "没有人认领的协同，不叫资源。"
    },
    zhou_owner_nameplate: {
      id: "zhou_owner_nameplate",
      title: "周启明负责人牌",
      detail: "桌牌把项目负责人写得很清楚，其他支持人却不在同一张牌上。",
      emotion: "stubborn",
      theme: "ai",
      counterText: "名字被摆上桌，不代表资源也到场。"
    },
    crossed_out_risk_page: {
      id: "crossed_out_risk_page",
      title: "红叉风险页",
      detail: "风险没有被解决，只是被红笔划得更安静。",
      emotion: "breakdown",
      theme: "ai",
      counterText: "划掉风险，不等于风险下线。"
    },
    scope_creep_action_sheet: {
      id: "scope_creep_action_sheet",
      title: "行动跟踪表",
      detail: "会前说初稿，会后表格已经排成完整方案的节奏。",
      emotion: "stubborn",
      theme: "ai",
      counterText: "表格最擅长把一句话变成一周活。"
    },
    target_budget_gap_chart: {
      id: "target_budget_gap_chart",
      title: "目标预算剪刀差",
      detail: "目标往上，预算往下，中间那段差距正好落在周启明身上。",
      emotion: "breakdown",
      theme: "ai",
      counterText: "数学不会因为叫挑战就变简单。"
    },
    rejected_headcount_form: {
      id: "rejected_headcount_form",
      title: "人头申请不通过",
      detail: "空椅子还在，申请表已经盖了不予通过。",
      emotion: "pretend",
      theme: "ai",
      counterText: "人没补，目标却补了一大截。"
    },
    friday_deadline_calendar: {
      id: "friday_deadline_calendar",
      title: "周五截止日历",
      detail: "日历把周五圈出来，旁边的咖啡已经替这周先加班了。",
      emotion: "breakdown",
      theme: "ai",
      counterText: "截止日不是资源，只是倒计时。"
    },
    opportunity_laser_pointer: {
      id: "opportunity_laser_pointer",
      title: "机会激光笔",
      detail: "激光点停在机会两个字上，下一秒任务就落到别人桌上。",
      emotion: "fantasy",
      theme: "ai",
      counterText: "被照亮的是话术，不是资源。"
    },
    budget_locked_folder: {
      id: "budget_locked_folder",
      title: "预算锁盒",
      detail: "目标图贴在桌面正中，预算方案却被锁在文件堆旁边。",
      emotion: "pretend",
      theme: "ai",
      counterText: "预算锁住以后，机会就只剩口头。"
    },
    erased_whiteboard_risk: {
      id: "erased_whiteboard_risk",
      title: "白板淡掉的风险",
      detail: "白板上还有风险被擦过的影子，会议纪要里却像从没出现。",
      emotion: "stubborn",
      theme: "ai",
      counterText: "擦得掉字，擦不掉责任。"
    },
    nest_office_noise_core: {
      id: "nest_office_noise_core",
      title: "碎键盘行情芯",
      detail: "断掉的键盘还在往粉碎口里喂行情纸，踏空噪声就是这么续命的。",
      emotion: "envy",
      theme: "gold",
      counterText: "不是每辆车都值得上。"
    },
    nest_gold_receipt_heat: {
      id: "nest_gold_receipt_heat",
      title: "半焦金店小票",
      detail: "小票被烤到卷边，还在假装自己是长期配置。",
      emotion: "stubborn",
      theme: "gold",
      counterText: "嘴硬不是策略。"
    },
    nest_lottery_near_miss_roll: {
      id: "nest_lottery_near_miss_roll",
      title: "连环差一点票卷",
      detail: "每一格都差一点，卷起来就像下一张一定会中。",
      emotion: "fantasy",
      theme: "lottery",
      counterText: "差一点不等于差一张。"
    },
    nest_social_filter_shard: {
      id: "nest_social_filter_shard",
      title: "高光滤镜碎片",
      detail: "镜片只反射布好的那一角，剩下的乱桌面被裁在外面。",
      emotion: "breakdown",
      theme: "gold",
      counterText: "别人发的是可发布版本。"
    },
    nest_ai_panic_meter: {
      id: "nest_ai_panic_meter",
      title: "恐慌课程计时器",
      detail: "计时器插在课程模块旁边，先替你制造来不及。",
      emotion: "pretend",
      theme: "ai",
      counterText: "吓人的人先赚钱。"
    },
    nest_meeting_blame_pipe: {
      id: "nest_meeting_blame_pipe",
      title: "甩锅管阀",
      detail: "文件夹顺着管道往同一个托盘里掉，资源还在阀门外面。",
      emotion: "stubborn",
      theme: "ai",
      counterText: "没有资源的机会叫甩锅。"
    },
    tag_not_every_car: {
      id: "tag_not_every_car",
      title: "不上车金属牌",
      detail: "小车坡道旁挂着刹车牌，提醒你不是每条线都通往终点。",
      emotion: "envy",
      theme: "gold",
      counterText: "不是每辆车都值得上。"
    },
    tag_stubborn_not_strategy: {
      id: "tag_stubborn_not_strategy",
      title: "裂盾策略牌",
      detail: "盾牌已经裂了，还想挡住那张发烫的小票。",
      emotion: "stubborn",
      theme: "gold",
      counterText: "嘴硬不是策略。"
    },
    tag_near_miss_not_next: {
      id: "tag_near_miss_not_next",
      title: "止损停牌",
      detail: "停止牌压在票卷出口，终于让差一点停下来。",
      emotion: "fantasy",
      theme: "lottery",
      counterText: "差一点不等于差一张。"
    },
    tag_publishable_version: {
      id: "tag_publishable_version",
      title: "可发布画框",
      detail: "画框只夹住照片里最顺眼的一角，桌上的过程被留在框外。",
      emotion: "breakdown",
      theme: "gold",
      counterText: "别人发的是可发布版本。"
    },
    tag_panic_sellers_profit: {
      id: "tag_panic_sellers_profit",
      title: "恐慌价签",
      detail: "价签挂在倒计时线缆上，急的人还没报名，卖课的人已经结账。",
      emotion: "pretend",
      theme: "ai",
      counterText: "吓人的人先赚钱。"
    },
    tag_no_resource_blame: {
      id: "tag_no_resource_blame",
      title: "流程封签",
      detail: "封签卡在锁阀上，先把没有资源的锅挡回流程。",
      emotion: "stubborn",
      theme: "ai",
      counterText: "没有资源的机会叫甩锅。"
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
        { id: "window-photo", x: 2.7, y: 21.6, hitWidth: 5.2, hitHeight: 10.0, label: "窗边相框" },
        { id: "window-plant", x: 18.0, y: 12.3, hitWidth: 6.8, hitHeight: 7.4, label: "窗台绿植" },
        { id: "bedside-clock", x: 22.4, y: 16.3, hitWidth: 6.8, hitHeight: 8.4, label: "床头日历钟" },
        { id: "shelf-books", x: 41.3, y: 12.1, hitWidth: 11.8, hitHeight: 16.0, label: "左侧书架" },
        { id: "tablet-cards", x: 52.6, y: 30.6, hitWidth: 9.8, hitHeight: 8.4, label: "普通消息卡片" },
        { id: "pen-cup", x: 62.2, y: 24.5, hitWidth: 6.0, hitHeight: 11.0, label: "笔筒" },
        { id: "course-sticky", x: 82.0, y: 42.5, hitWidth: 8.6, hitHeight: 7.4, label: "普通课程便签" },
        { id: "desk-mug", x: 80.0, y: 52.0, hitWidth: 7.4, hitHeight: 8.0, label: "桌面杯子" },
        { id: "snack-bag", x: 38.9, y: 84.0, hitWidth: 12.0, hitHeight: 12.0, label: "零食包装" },
        { id: "remote-control", x: 52.6, y: 95.6, hitWidth: 9.2, hitHeight: 5.6, label: "遥控器" },
        { id: "ashtray", x: 58.9, y: 87.7, hitWidth: 9.0, hitHeight: 8.0, label: "烟灰缸" },
        { id: "normal-receipts", x: 47.9, y: 66.7, hitWidth: 10.0, hitHeight: 10.5, label: "普通小票" },
        { id: "loose-keys", x: 49.2, y: 73.1, hitWidth: 8.0, hitHeight: 6.8, label: "普通钥匙" },
        { id: "black-notebook", x: 52.5, y: 76.1, hitWidth: 9.0, hitHeight: 9.0, label: "黑色笔记本" },
        { id: "cable-loop", x: 87.3, y: 75.8, hitWidth: 12.0, hitHeight: 13.0, label: "线缆圈" },
        { id: "power-strip", x: 89.0, y: 88.0, hitWidth: 11.0, hitHeight: 10.0, label: "插排" },
        { id: "adapter", x: 93.9, y: 76.5, hitWidth: 6.2, hitHeight: 9.0, label: "充电头" },
        { id: "book-tabs", x: 89.0, y: 27.2, hitWidth: 10.0, hitHeight: 9.0, label: "普通书签" },
        { id: "desk-lamp", x: 84.4, y: 13.8, hitWidth: 8.0, hitHeight: 12.0, label: "台灯" },
        { id: "thermos", x: 79.7, y: 25.1, hitWidth: 5.5, hitHeight: 14.5, label: "保温杯" },
        { id: "blank-envelopes", x: 76.0, y: 67.1, hitWidth: 10.5, hitHeight: 10.0, label: "普通信封" }
      ],
      hotspots: [
        { id: "h1", evidenceId: "cropped_profit_screenshot", x: 40.4, y: 37.7, hitX: 40.4, hitY: 37.7, hitWidth: 5.2, hitHeight: 7.4, radius: 7, label: "只截涨幅的手机图", found: false, renderMode: "embedded", revealText: "红线露出来，本金和时间被裁掉", animationKind: "phone" },
        { id: "h2", evidenceId: "unsent_reply_draft", x: 9.2, y: 72.6, hitX: 9.2, hitY: 72.6, hitWidth: 7.8, hitHeight: 8.6, radius: 7, label: "写坏的祝福草稿", found: false, renderMode: "embedded", revealText: "恭喜两个字在本子上别扭了一圈", animationKind: "chat" },
        { id: "h3", evidenceId: "group_invite_popup", x: 54.4, y: 19.4, hitX: 54.4, hitY: 19.4, hitWidth: 7.4, hitHeight: 7.2, radius: 7, label: "小屏上的进群弹窗", found: false, renderMode: "embedded", revealText: "高光后面接着进群按钮", animationKind: "chat" },
        { id: "h4", evidenceId: "pinned_review_comment", x: 73.1, y: 16.0, hitX: 73.1, hitY: 16.0, hitWidth: 9.0, hitHeight: 8.5, radius: 7, label: "高赞补课评论行", found: false, renderMode: "embedded", revealText: "围观被顺手导向补课", animationKind: "chat" },
        { id: "h5", evidenceId: "ai_course_deadline", x: 71.8, y: 45.8, hitX: 71.8, hitY: 45.8, hitWidth: 8.6, hitHeight: 7.4, radius: 7, label: "课程截止便签", found: false, renderMode: "embedded", revealText: "截止日期贴在桌面最顺手的位置", animationKind: "note" },
        { id: "h6", evidenceId: "side_hustle_bookmark", x: 92.5, y: 30.9, hitX: 92.5, hitY: 30.9, hitWidth: 4.2, hitHeight: 7.6, radius: 7, label: "书堆里的彩色书签", found: false, renderMode: "embedded", revealText: "副业课混在一排书签里", animationKind: "note" },
        { id: "h7", evidenceId: "mortgage_debit_notice", x: 72.0, y: 71.0, hitX: 72.0, hitY: 71.0, hitWidth: 8.0, hitHeight: 6.0, radius: 7, label: "新房照旁还款单", found: false, renderMode: "embedded", revealText: "房子照片旁边是下月扣款", animationKind: "contract" },
        { id: "h8", evidenceId: "household_overdue_bill", x: 75.8, y: 94.5, hitX: 75.8, hitY: 94.5, hitWidth: 7.2, hitHeight: 5.8, radius: 7, label: "桌沿逾期红章", found: false, renderMode: "embedded", revealText: "电费角落被线缆压着", animationKind: "paper" }
      ]
    },
    {
      id: "ai_launch",
      name: "AI 发布会公开处刑",
      theme: "ai",
      description: "凌晨两点，周启明把发布会、课程广告和旧系统工单一起看完，恐慌比泡面先凉。",
      backgroundImage: "/assets/game/ai-launch/states/ai-launch-progress-0.png",
      hint: "先别把自己下架",
      enemyName: "替代恐慌体",
      enemyDescription: "它把变化包装成末日，把学习包装成救命稻草，再把救命稻草做成限时付款。",
      machineName: "恐慌降噪器",
      machineEmbedded: true,
      completeText: "能用它写初稿，不代表要把自己判出局。先把吓人的部分降噪。",
      decoys: [
        { id: "normal-video-card", x: 47.0, y: 19.2, hitWidth: 7.0, hitHeight: 7.6, label: "普通视频卡片" },
        { id: "normal-browser-tabs", x: 55.2, y: 11.2, hitWidth: 9.0, hitHeight: 4.6, label: "普通浏览器标签" },
        { id: "regular-meeting-paper", x: 58.4, y: 52.8, hitWidth: 7.6, hitHeight: 7.0, label: "普通会议纸" },
        { id: "plain-sticky-note", x: 68.4, y: 33.8, hitWidth: 5.8, hitHeight: 6.2, label: "普通便签" },
        { id: "desk-hourglass", x: 74.2, y: 42.6, hitWidth: 4.2, hitHeight: 8.4, label: "普通沙漏" },
        { id: "adapter-cable", x: 80.0, y: 77.6, hitWidth: 9.0, hitHeight: 8.8, label: "普通线缆" },
        { id: "usb-drive-decoy", x: 84.3, y: 70.8, hitWidth: 4.6, hitHeight: 5.6, label: "普通 U 盘" },
        { id: "normal-notebook", x: 19.0, y: 84.0, hitWidth: 10.0, hitHeight: 9.8, label: "普通笔记本" },
        { id: "book-stack", x: 88.0, y: 31.4, hitWidth: 8.2, hitHeight: 13.0, label: "普通书堆" },
        { id: "coffee-mug", x: 64.8, y: 60.0, hitWidth: 5.0, hitHeight: 6.2, label: "咖啡杯" },
        { id: "ramen-bowl", x: 55.0, y: 90.0, hitWidth: 8.8, hitHeight: 8.2, label: "泡面碗" },
        { id: "family-photo", x: 18.8, y: 19.6, hitWidth: 6.2, hitHeight: 7.4, label: "家庭相框" },
        { id: "printer-paper", x: 97.0, y: 66.0, hitWidth: 7.8, hitHeight: 10.0, label: "打印纸" },
        { id: "loose-receipts", x: 53.0, y: 84.2, hitWidth: 8.8, hitHeight: 7.2, label: "普通小票" },
        { id: "remote-control", x: 25.0, y: 88.0, hitWidth: 7.2, hitHeight: 5.4, label: "遥控器" },
        { id: "charger-brick", x: 91.4, y: 82.4, hitWidth: 5.8, hitHeight: 7.6, label: "充电头" },
        { id: "blank-envelope", x: 70.8, y: 86.0, hitWidth: 8.0, hitHeight: 7.2, label: "普通信封" },
        { id: "ordinary-phone-card", x: 38.6, y: 54.8, hitWidth: 5.4, hitHeight: 7.8, label: "普通手机消息" },
        { id: "keyboard-corner", x: 63.2, y: 47.8, hitWidth: 10.0, hitHeight: 6.0, label: "键盘边角" },
        { id: "pen-cup", x: 67.0, y: 24.4, hitWidth: 5.4, hitHeight: 9.4, label: "笔筒" },
        { id: "normal-clipping", x: 30.4, y: 60.2, hitWidth: 7.8, hitHeight: 6.8, label: "普通剪报" },
        { id: "router-light", x: 94.0, y: 48.8, hitWidth: 7.8, hitHeight: 6.8, label: "路由器灯" }
      ],
      hotspots: [
        { id: "h1", evidenceId: "polished_ai_demo_rows", x: 78.0, y: 18.8, hitX: 78.0, hitY: 18.8, hitWidth: 17.0, hitHeight: 18.0, radius: 7, label: "发布会演示表格", found: false, renderMode: "embedded", revealText: "演示数据干净得不像真实公司", animationKind: "kline" },
        { id: "h2", evidenceId: "manual_review_sheet", x: 65.0, y: 73.0, hitX: 65.0, hitY: 73.0, hitWidth: 9.0, hitHeight: 8.0, radius: 7, label: "待人工处理清单", found: false, renderMode: "embedded", revealText: "自动化旁边还压着待处理", animationKind: "paper" },
        { id: "h3", evidenceId: "panic_course_checkout", x: 88.0, y: 58.0, hitX: 88.0, hitY: 58.0, hitWidth: 11.0, hitHeight: 14.0, radius: 7, label: "课程付款倒计时", found: false, renderMode: "embedded", revealText: "恐慌被做成限时付款", animationKind: "note" },
        { id: "h4", evidenceId: "legacy_ie_token", x: 28.0, y: 82.0, hitX: 28.0, hitY: 82.0, hitWidth: 8.0, hitHeight: 7.0, radius: 7, label: "旧系统令牌", found: false, renderMode: "embedded", revealText: "兼容模式还在要求真人值班", animationKind: "alert" },
        { id: "h5", evidenceId: "approval_chain_notebook", x: 53.0, y: 61.2, hitX: 53.0, hitY: 61.2, hitWidth: 11.0, hitHeight: 10.0, radius: 7, label: "审批人脉笔记", found: false, renderMode: "embedded", revealText: "谁能批预算还写在纸上", animationKind: "contract" },
        { id: "h6", evidenceId: "manual_stamp_queue", x: 69.0, y: 77.5, hitX: 69.0, hitY: 77.5, hitWidth: 5.5, hitHeight: 6.2, radius: 7, label: "人工盖章表单", found: false, renderMode: "embedded", revealText: "自动化绕不开盖章窗口", animationKind: "receipt" },
        { id: "h7", evidenceId: "seventeen_tabs_fatigue", x: 72.6, y: 4.8, hitX: 72.6, hitY: 4.8, hitWidth: 25.0, hitHeight: 5.8, radius: 7, label: "连播标签页", found: false, renderMode: "embedded", revealText: "发布会连播先替代了睡眠", animationKind: "chat" },
        { id: "h8", evidenceId: "job_replacement_clip", x: 41.7, y: 83.0, hitX: 41.7, hitY: 83.0, hitWidth: 20.0, hitHeight: 13.0, radius: 7, label: "替代新闻剪报", found: false, renderMode: "embedded", revealText: "标题留下恐慌，剪掉上下文", animationKind: "news" },
        { id: "h9", evidenceId: "boss_followup_unanswered", x: 8.5, y: 76.0, hitX: 8.5, hitY: 76.0, hitWidth: 11.0, hitHeight: 17.0, radius: 7, label: "未接老板消息", found: false, renderMode: "embedded", revealText: "AI 写初稿，邢总找真人", animationKind: "phone" }
      ]
    },
    {
      id: "meeting",
      name: "邢总画饼复盘会",
      theme: "ai",
      description: "早上九点，会议室里写满成长机会，桌上的表单却把资源和风险都推回周启明这边。",
      backgroundImage: "/assets/game/meeting/states/meeting-progress-0.png",
      hint: "先把锅退回流程",
      enemyName: "画饼增殖体",
      enemyDescription: "它把无资源任务包装成成长机会，把老板的锅滑到周启明桌上。",
      machineName: "责任切割机",
      machineEmbedded: true,
      completeText: "没有资源的机会，叫甩锅。饼可以收下，锅请走流程。",
      decoys: [
        { id: "ordinary-slide-title", x: 72.0, y: 9.8, hitWidth: 24.0, hitHeight: 7.5, label: "普通标题区" },
        { id: "slide-action-list", x: 75.0, y: 22.0, hitWidth: 9.2, hitHeight: 14.0, label: "普通行动列表" },
        { id: "whiteboard-checks", x: 32.0, y: 15.5, hitWidth: 8.0, hitHeight: 14.0, label: "白板普通勾选" },
        { id: "whiteboard-pinned-pages", x: 55.5, y: 15.0, hitWidth: 8.6, hitHeight: 17.0, label: "白板普通附件" },
        { id: "laptop-screen", x: 37.5, y: 45.0, hitWidth: 11.0, hitHeight: 10.0, label: "普通笔记本电脑" },
        { id: "black-mug", x: 48.6, y: 42.8, hitWidth: 5.2, hitHeight: 6.4, label: "黑色咖啡杯" },
        { id: "tissue-box", x: 61.4, y: 37.0, hitWidth: 7.4, hitHeight: 8.4, label: "纸巾盒" },
        { id: "pen-cup", x: 67.0, y: 40.0, hitWidth: 5.0, hitHeight: 9.6, label: "笔筒" },
        { id: "paper-stack-right", x: 70.0, y: 49.0, hitWidth: 13.0, hitHeight: 12.0, label: "普通文件堆" },
        { id: "dark-folder", x: 69.5, y: 53.8, hitWidth: 10.0, hitHeight: 7.0, label: "普通文件夹" },
        { id: "calculator", x: 56.2, y: 82.5, hitWidth: 7.2, hitHeight: 9.0, label: "计算器" },
        { id: "normal-minutes", x: 20.0, y: 89.0, hitWidth: 15.0, hitHeight: 13.0, label: "普通会议记录" },
        { id: "sticky-note-left", x: 25.4, y: 89.0, hitWidth: 9.5, hitHeight: 8.0, label: "普通便利贴" },
        { id: "book-stack-left", x: 8.0, y: 63.0, hitWidth: 12.0, hitHeight: 11.0, label: "左侧书堆" },
        { id: "thermos", x: 3.8, y: 84.0, hitWidth: 5.8, hitHeight: 11.0, label: "保温杯" },
        { id: "name-card-row", x: 86.0, y: 35.0, hitWidth: 16.0, hitHeight: 5.8, label: "普通桌牌" },
        { id: "plant-left", x: 2.6, y: 20.0, hitWidth: 5.2, hitHeight: 18.0, label: "绿植" },
        { id: "glass-office", x: 21.0, y: 20.0, hitWidth: 18.0, hitHeight: 25.0, label: "玻璃外办公区" },
        { id: "empty-chair-front", x: 5.2, y: 52.0, hitWidth: 9.0, hitHeight: 16.0, label: "普通空椅" },
        { id: "paper-lower-right", x: 88.0, y: 88.0, hitWidth: 10.0, hitHeight: 13.0, label: "右下普通笔记" },
        { id: "calendar-checkboxes", x: 89.2, y: 72.0, hitWidth: 9.0, hitHeight: 12.0, label: "日历普通事项" },
        { id: "screen-empty-area", x: 75.0, y: 15.0, hitWidth: 8.0, hitHeight: 9.0, label: "投影普通空白" }
      ],
      hotspots: [
        { id: "h1", evidenceId: "empty_resource_collab_slide", x: 88.7, y: 22.9, hitX: 88.7, hitY: 22.9, hitWidth: 17.0, hitHeight: 15.0, radius: 7, label: "空着的资源协同格", found: false, renderMode: "embedded", revealText: "协同写在屏幕上，人没写进格子里", animationKind: "kline" },
        { id: "h2", evidenceId: "zhou_owner_nameplate", x: 50.0, y: 59.7, hitX: 50.0, hitY: 59.7, hitWidth: 8.0, hitHeight: 8.0, radius: 7, label: "周启明负责人牌", found: false, renderMode: "embedded", revealText: "名字摆上桌，资源没到场", animationKind: "contract" },
        { id: "h3", evidenceId: "crossed_out_risk_page", x: 28.9, y: 72.6, hitX: 28.9, hitY: 72.6, hitWidth: 14.0, hitHeight: 13.0, radius: 7, label: "红叉风险页", found: false, renderMode: "embedded", revealText: "风险被划掉，不是被解决", animationKind: "news" },
        { id: "h4", evidenceId: "scope_creep_action_sheet", x: 37.5, y: 74.3, hitX: 37.5, hitY: 74.3, hitWidth: 15.0, hitHeight: 17.0, radius: 7, label: "行动跟踪表", found: false, renderMode: "embedded", revealText: "一句初稿长成整张表", animationKind: "paper" },
        { id: "h5", evidenceId: "target_budget_gap_chart", x: 53.5, y: 71.1, hitX: 53.5, hitY: 71.1, hitWidth: 15.0, hitHeight: 14.0, radius: 7, label: "目标预算剪刀差", found: false, renderMode: "embedded", revealText: "目标往上，预算往下", animationKind: "kline" },
        { id: "h6", evidenceId: "rejected_headcount_form", x: 83.6, y: 51.0, hitX: 83.6, hitY: 51.0, hitWidth: 13.0, hitHeight: 20.0, radius: 7, label: "人头申请不通过", found: false, renderMode: "embedded", revealText: "人没补，目标先补上去了", animationKind: "receipt" },
        { id: "h7", evidenceId: "friday_deadline_calendar", x: 12.5, y: 77.2, hitX: 12.5, hitY: 77.2, hitWidth: 17.0, hitHeight: 17.0, radius: 7, label: "周五截止日历", found: false, renderMode: "embedded", revealText: "截止日不是资源", animationKind: "note" },
        { id: "h8", evidenceId: "opportunity_laser_pointer", x: 64.5, y: 24.3, hitX: 64.5, hitY: 24.3, hitWidth: 13.0, hitHeight: 20.0, radius: 7, label: "机会激光笔", found: false, renderMode: "embedded", revealText: "被照亮的是话术", animationKind: "alert" },
        { id: "h9", evidenceId: "budget_locked_folder", x: 71.9, y: 81.4, hitX: 71.9, hitY: 81.4, hitWidth: 20.0, hitHeight: 20.0, radius: 7, label: "预算锁盒", found: false, renderMode: "embedded", revealText: "预算锁住以后，机会只剩口头", animationKind: "contract" },
        { id: "h10", evidenceId: "erased_whiteboard_risk", x: 43.8, y: 23.6, hitX: 43.8, hitY: 23.6, hitWidth: 14.0, hitHeight: 20.0, radius: 7, label: "白板淡掉的风险", found: false, renderMode: "embedded", revealText: "擦掉字，不等于擦掉责任", animationKind: "sign" }
      ]
    },
    {
      id: "nest",
      name: "暴富噪声母巢",
      theme: "ai",
      description: "地下室里，前六关的噪声被重新接线，等着再把人拖回同一个循环。",
      backgroundImage: "/assets/game/nest/states/nest-progress-0.png",
      hint: "先给噪声分类",
      enemyName: "暴富噪声母巢",
      enemyDescription: "它不再伪装，直接把踏空、接盘、差一点、高光、恐慌和甩锅接成一台机器。",
      machineName: "母巢粉碎机",
      machineEmbedded: true,
      completeText: "噪声拆成了六类残骸。以前它们轮流打你，现在轮到你给它们分类、粉碎、挂牌。",
      decoys: [
        { id: "ordinary-keyboard-left", x: 30.0, y: 33.0, hitWidth: 13.0, hitHeight: 11.0, label: "普通旧键盘" },
        { id: "left-laptop-screen", x: 28.0, y: 24.0, hitWidth: 14.0, hitHeight: 15.0, label: "普通旧屏幕" },
        { id: "drawer-labels", x: 5.0, y: 18.0, hitWidth: 9.0, hitHeight: 20.0, label: "抽屉标签" },
        { id: "book-shelf", x: 21.5, y: 15.0, hitWidth: 14.0, hitHeight: 18.0, label: "旧书架" },
        { id: "lamp-head", x: 11.0, y: 48.0, hitWidth: 11.0, hitHeight: 13.0, label: "台灯" },
        { id: "ordinary-left-tags", x: 8.0, y: 58.0, hitWidth: 12.0, hitHeight: 14.0, label: "普通旧票据" },
        { id: "burned-paper-decoy", x: 18.0, y: 68.0, hitWidth: 10.0, hitHeight: 12.0, label: "烧焦纸片" },
        { id: "normal-chain", x: 29.0, y: 63.0, hitWidth: 6.0, hitHeight: 12.0, label: "普通链条" },
        { id: "ticket-scraps", x: 29.0, y: 79.0, hitWidth: 14.0, hitHeight: 10.0, label: "散落票根" },
        { id: "ordinary-token-row", x: 38.0, y: 87.0, hitWidth: 15.0, hitHeight: 8.0, label: "普通圆牌" },
        { id: "shield-decoy-left", x: 41.0, y: 93.0, hitWidth: 9.0, hitHeight: 9.0, label: "普通盾牌" },
        { id: "machine-icon-row", x: 55.0, y: 17.5, hitWidth: 20.0, hitHeight: 9.0, label: "机器状态图标" },
        { id: "machine-mouth", x: 64.0, y: 36.0, hitWidth: 14.0, hitHeight: 15.0, label: "粉碎口" },
        { id: "zhou-arm", x: 62.5, y: 41.0, hitWidth: 12.0, hitHeight: 11.0, label: "周启明手臂" },
        { id: "normal-market-paper", x: 63.0, y: 47.0, hitWidth: 10.0, hitHeight: 12.0, label: "普通行情纸" },
        { id: "photo-box-edge", x: 64.0, y: 86.0, hitWidth: 11.0, hitHeight: 18.0, label: "照片盒边" },
        { id: "ordinary-photo-left", x: 47.0, y: 72.0, hitWidth: 8.0, hitHeight: 11.0, label: "普通照片" },
        { id: "ordinary-photo-right", x: 76.0, y: 72.0, hitWidth: 9.0, hitHeight: 12.0, label: "普通相片" },
        { id: "black-lens-decoy", x: 48.5, y: 86.0, hitWidth: 11.0, hitHeight: 11.0, label: "黑色镜片" },
        { id: "red-lens-decoy", x: 61.0, y: 88.0, hitWidth: 10.0, hitHeight: 9.0, label: "红色镜片" },
        { id: "pipe-folder-row", x: 78.0, y: 24.0, hitWidth: 18.0, hitHeight: 14.0, label: "普通文件槽" },
        { id: "pipe-nozzle-row", x: 90.0, y: 45.0, hitWidth: 18.0, hitHeight: 10.0, label: "普通管口" },
        { id: "hanging-tags-row", x: 72.0, y: 61.0, hitWidth: 22.0, hitHeight: 12.0, label: "普通吊牌" },
        { id: "red-valve-wheel", x: 93.0, y: 47.0, hitWidth: 10.0, hitHeight: 14.0, label: "红色阀轮" },
        { id: "right-pipe-locks", x: 80.0, y: 18.0, hitWidth: 10.0, hitHeight: 20.0, label: "普通锁头" },
        { id: "toy-car-silver", x: 84.0, y: 67.0, hitWidth: 10.0, hitHeight: 10.0, label: "银色玩具车" },
        { id: "toy-car-black", x: 91.0, y: 68.0, hitWidth: 9.0, hitHeight: 10.0, label: "黑色玩具车" },
        { id: "toy-car-yellow", x: 97.0, y: 68.0, hitWidth: 8.0, hitHeight: 10.0, label: "黄色玩具车" },
        { id: "right-wood-box", x: 97.0, y: 82.0, hitWidth: 20.0, hitHeight: 15.0, label: "木箱边缘" },
        { id: "foreground-keys", x: 75.0, y: 92.0, hitWidth: 12.0, hitHeight: 8.0, label: "普通钥匙圈" },
        { id: "bottom-notes", x: 58.0, y: 94.0, hitWidth: 15.0, hitHeight: 8.0, label: "普通便签堆" },
        { id: "cable-left", x: 5.0, y: 48.0, hitWidth: 8.0, hitHeight: 22.0, label: "普通线缆" }
      ],
      hotspots: [
        { id: "h1", evidenceId: "nest_office_noise_core", x: 52.8, y: 43.0, hitX: 52.8, hitY: 43.0, hitWidth: 14.0, hitHeight: 18.0, radius: 7, label: "碎键盘行情芯", found: false, renderMode: "embedded", revealText: "踏空噪声靠半张行情纸续命", animationKind: "kline" },
        { id: "h2", evidenceId: "nest_gold_receipt_heat", x: 10.0, y: 68.2, hitX: 10.0, hitY: 68.2, hitWidth: 14.0, hitHeight: 16.0, radius: 7, label: "半焦金店小票", found: false, renderMode: "embedded", revealText: "接盘余热还在小票边上冒烟", animationKind: "receipt" },
        { id: "h3", evidenceId: "nest_lottery_near_miss_roll", x: 37.4, y: 67.8, hitX: 37.4, hitY: 67.8, hitWidth: 9.0, hitHeight: 13.0, radius: 7, label: "连环差一点票卷", found: false, renderMode: "embedded", revealText: "差一点卷起来也不是下一张", animationKind: "ticket" },
        { id: "h4", evidenceId: "nest_social_filter_shard", x: 57.4, y: 73.7, hitX: 57.4, hitY: 73.7, hitWidth: 16.0, hitHeight: 18.0, radius: 7, label: "高光滤镜碎片", found: false, renderMode: "embedded", revealText: "镜片只留下可发布版本", animationKind: "photo" },
        { id: "h5", evidenceId: "nest_ai_panic_meter", x: 18.0, y: 35.4, hitX: 18.0, hitY: 35.4, hitWidth: 18.0, hitHeight: 18.0, radius: 7, label: "恐慌课程计时器", found: false, renderMode: "embedded", revealText: "倒计时先替卖课的人工作", animationKind: "alert" },
        { id: "h6", evidenceId: "nest_meeting_blame_pipe", x: 78.0, y: 41.6, hitX: 78.0, hitY: 41.6, hitWidth: 22.0, hitHeight: 22.0, radius: 7, label: "甩锅管阀", found: false, renderMode: "embedded", revealText: "文件沿着管子掉进同一个锅里", animationKind: "contract" },
        { id: "h7", evidenceId: "tag_not_every_car", x: 87.4, y: 81.2, hitX: 87.4, hitY: 81.2, hitWidth: 14.0, hitHeight: 16.0, radius: 7, label: "不上车金属牌", found: false, renderMode: "embedded", revealText: "车多，不代表都值得上", animationKind: "sign" },
        { id: "h8", evidenceId: "tag_stubborn_not_strategy", x: 31.4, y: 91.0, hitX: 31.4, hitY: 91.0, hitWidth: 12.0, hitHeight: 12.0, radius: 7, label: "裂盾策略牌", found: false, renderMode: "embedded", revealText: "盾裂了，嘴硬就挡不住了", animationKind: "goldLine" },
        { id: "h9", evidenceId: "tag_near_miss_not_next", x: 43.0, y: 76.8, hitX: 43.0, hitY: 76.8, hitWidth: 7.0, hitHeight: 8.0, radius: 7, label: "止损停牌", found: false, renderMode: "embedded", revealText: "停止牌压住差一点出口", animationKind: "scratch" },
        { id: "h10", evidenceId: "tag_publishable_version", x: 69.2, y: 73.2, hitX: 69.2, hitY: 73.2, hitWidth: 10.0, hitHeight: 17.0, radius: 7, label: "可发布画框", found: false, renderMode: "embedded", revealText: "画框只夹住最好看的角", animationKind: "photo" },
        { id: "h11", evidenceId: "tag_panic_sellers_profit", x: 4.7, y: 35.6, hitX: 4.7, hitY: 35.6, hitWidth: 9.0, hitHeight: 14.0, radius: 7, label: "恐慌价签", found: false, renderMode: "embedded", revealText: "吓人的人先把价签挂好了", animationKind: "note" },
        { id: "h12", evidenceId: "tag_no_resource_blame", x: 91.5, y: 27.0, hitX: 91.5, hitY: 27.0, hitWidth: 12.0, hitHeight: 18.0, radius: 7, label: "流程封签", found: false, renderMode: "embedded", revealText: "锁阀先把锅挡回流程", animationKind: "contract" }
      ]
    }
  ]
};
