const SAVE_KEY = "codex-little-depths-v4";
const GUIDE_KEY = "codex-little-depths-guide-v1";

const ICONS = {
  lobby: `<svg viewBox="0 0 24 24"><path d="M4 20h16"/><path d="M6 20V9l6-5 6 5v11"/><path d="M10 20v-6h4v6"/></svg>`,
  dwelling: `<svg viewBox="0 0 24 24"><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>`,
  food: `<svg viewBox="0 0 24 24"><path d="M6 3v8"/><path d="M10 3v8"/><path d="M8 3v18"/><path d="M17 3c2 2 2 6 0 8v10"/></svg>`,
  service: `<svg viewBox="0 0 24 24"><path d="M12 21s7-4.4 7-11a7 7 0 0 0-14 0c0 6.6 7 11 7 11Z"/><path d="M12 8v5l3 2"/></svg>`,
  craft: `<svg viewBox="0 0 24 24"><path d="m14 7 3 3"/><path d="M5 19 19 5"/><path d="m15 5 4 4"/><path d="M4 20h6"/></svg>`,
  entertainment: `<svg viewBox="0 0 24 24"><path d="M4 18c4-6 12-6 16 0"/><path d="M7 11h.01"/><path d="M17 11h.01"/><path d="M8 4h8l2 7H6Z"/></svg>`,
  kingdom: `<svg viewBox="0 0 24 24"><path d="M4 21V8l3 2 3-4 3 4 3-4 3 4 3-2v13"/><path d="M9 21v-6a3 3 0 0 1 6 0v6"/></svg>`,
  alchemy: `<svg viewBox="0 0 24 24"><path d="M10 2h4"/><path d="M12 2v6l5 8a4 4 0 0 1-3.4 6H10.4A4 4 0 0 1 7 16l5-8"/><path d="M8.5 15h7"/><path d="M10 18h4"/></svg>`,
  training: `<svg viewBox="0 0 24 24"><path d="m14 6 4 4"/><path d="M5 19 19 5"/><path d="m5 5 14 14"/><path d="M3 21h8"/></svg>`,
  treasure: `<svg viewBox="0 0 24 24"><path d="M4 10h16v10H4z"/><path d="M4 10a8 8 0 0 1 16 0"/><path d="M12 10v10"/><path d="M9 15h6"/></svg>`,
  market: `<svg viewBox="0 0 24 24"><path d="M4 10h16l-1.4-5H5.4Z"/><path d="M6 10v10h12V10"/><path d="M9 20v-6h6v6"/><path d="M7 10c0 2 2 2 2 0"/><path d="M11 10c0 2 2 2 2 0"/><path d="M15 10c0 2 2 2 2 0"/></svg>`,
  library: `<svg viewBox="0 0 24 24"><path d="M5 4h10a4 4 0 0 1 4 4v12H8a3 3 0 0 0-3 3Z"/><path d="M5 4v15a3 3 0 0 1 3-3h11"/><path d="M9 8h6"/><path d="M9 12h5"/></svg>`,
  garden: `<svg viewBox="0 0 24 24"><path d="M12 21V9"/><path d="M12 9C9 5 6 5 4 8c3 1 5 1 8 1Z"/><path d="M12 10c3-4 6-4 8-1-3 1-5 1-8 1Z"/><path d="M5 21h14"/><path d="M17 4l.6 1.4L19 6l-1.4.6L17 8l-.6-1.4L15 6l1.4-.6Z"/></svg>`,
  observatory: `<svg viewBox="0 0 24 24"><path d="M5 21h14"/><path d="M7 21 10 8h4l3 13"/><path d="m9 13 6-4"/><path d="M14 5l2 2"/><path d="M17 3l4 4"/><path d="M5 5l.6 1.4L7 7l-1.4.6L5 9l-.6-1.4L3 7l1.4-.6Z"/></svg>`,
  bathhouse: `<svg viewBox="0 0 24 24"><path d="M4 13h16v3a5 5 0 0 1-5 5h-6a5 5 0 0 1-5-5Z"/><path d="M7 13V8a3 3 0 0 1 3-3h1"/><path d="M11 5c0 2 2 2 2 4"/><path d="M16 5c0 2 2 2 2 4"/></svg>`,
  clinic: `<svg viewBox="0 0 24 24"><path d="M12 21s-7-4.1-7-10a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 5.9-7 10-7 10Z"/><path d="M12 8v7"/><path d="M8.5 11.5h7"/></svg>`,
  clockwork: `<svg viewBox="0 0 24 24"><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="m4.9 4.9 2.1 2.1"/><path d="m17 17 2.1 2.1"/><path d="M2 12h3"/><path d="M19 12h3"/><path d="m4.9 19.1 2.1-2.1"/><path d="m17 7 2.1-2.1"/></svg>`,
  aquarium: `<svg viewBox="0 0 24 24"><path d="M4 7h16v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3Z"/><path d="M7 11c2-2 5-2 7 0-2 2-5 2-7 0Z"/><path d="m14 11 3-2v4Z"/><path d="M7 16c1.8-1.2 4.2-1.2 6 0"/><path d="M8 4l.5 1.2L10 6l-1.5.8L8 8l-.5-1.2L6 6l1.5-.8Z"/></svg>`,
  skyport: `<svg viewBox="0 0 24 24"><path d="M4 16h16"/><path d="M6 16V9l6-4 6 4v7"/><path d="M9 16v-4h6v4"/><path d="M3 19c2-1.4 4-1.4 6 0s4 1.4 6 0 4-1.4 6 0"/><path d="M17 4l.6 1.4L19 6l-1.4.6L17 8l-.6-1.4L15 6l1.4-.6Z"/></svg>`,
  festival: `<svg viewBox="0 0 24 24"><path d="M4 20h16"/><path d="M6 20v-9h12v9"/><path d="M8 11l4-5 4 5"/><path d="M9 15c1.2 1 4.8 1 6 0"/><path d="M7 4l1.2 1.2L7 6.4 5.8 5.2Z"/><path d="M18 3l.8 1.4L20 5l-1.2.6L18 7l-.8-1.4L16 5l1.2-.6Z"/></svg>`,
};

const FLOOR_TYPES = {
  dwelling: {
    label: "居住",
    icon: ICONS.dwelling,
    desc: "增加人口容量，居民会带来工作技能和租金。",
    costMod: 0.9,
    buildTime: 14,
    capacity: 4,
    names: ["星灯公寓", "苔藓寝室", "月井小屋", "回声宿舍"],
  },
  food: {
    label: "餐饮",
    icon: ICONS.food,
    desc: "生产餐点并准备暖锅补给，提升快乐、客流节奏和探险出发效率。",
    costMod: 1,
    buildTime: 16,
    stockMax: 28,
    price: 5,
    names: ["蜜糖厨房", "盐晶面包房", "暖锅铺", "薄荷茶室"],
  },
  service: {
    label: "服务",
    icon: ICONS.service,
    desc: "礼宾、花坊与邮务会照顾访客，降低排队压力并加快到站接待。",
    costMod: 1.08,
    buildTime: 18,
    stockMax: 24,
    price: 7,
    names: ["露台花坊", "星尘裁缝间", "泉水理发屋", "印章邮局"],
  },
  craft: {
    label: "工坊",
    icon: ICONS.craft,
    desc: "打造手作货品、工具和材料箱，能降低全城补货损耗并提升订单与探险装备。",
    costMod: 1.22,
    buildTime: 22,
    stockMax: 20,
    price: 10,
    names: ["铜叶工坊", "玻璃匠铺", "齿轮室", "琥珀铸台"],
  },
  entertainment: {
    label: "演艺",
    icon: ICONS.entertainment,
    desc: "举办常驻小剧目，稳定快乐、吸引观众并放大掌声收益。",
    costMod: 1.16,
    buildTime: 20,
    stockMax: 22,
    price: 8,
    names: ["烛光剧场", "回音乐厅", "纸星影院", "泡泡游乐厅"],
  },
  kingdom: {
    label: "王国",
    icon: ICONS.kingdom,
    desc: "签发王令、调度订单和声望事务，让王室委托更容易完成也更有仪式感。",
    costMod: 1.35,
    buildTime: 24,
    stockMax: 18,
    price: 12,
    names: ["议事圆厅", "宝石图书馆", "骑士讲堂", "小旗广场"],
  },
  market: {
    label: "市集",
    icon: ICONS.market,
    desc: "联通订单和客流，提升全城收益。",
    costMod: 1.28,
    buildTime: 22,
    stockMax: 26,
    price: 11,
    names: ["月光市集", "铃铛商会", "星砂摊街", "彩旗集市"],
  },
  library: {
    label: "书库",
    icon: ICONS.library,
    desc: "整理王国典籍，提升探险效率和珍藏发现率。",
    costMod: 1.38,
    buildTime: 24,
    stockMax: 18,
    price: 13,
    names: ["古卷书库", "星尘档案馆", "羽毛誓约厅", "月页阅览室"],
  },
  garden: {
    label: "花园",
    icon: ICONS.garden,
    desc: "安抚居民与访客，持续恢复快乐并吸引贵宾。",
    costMod: 1.32,
    buildTime: 23,
    stockMax: 20,
    price: 9,
    names: ["云顶花园", "星露温室", "铃兰观景台", "月光庭院"],
  },
  observatory: {
    label: "观星",
    icon: ICONS.observatory,
    desc: "观测星象，提升探险收益、碎片发现率和订单宝石概率。",
    costMod: 1.46,
    buildTime: 27,
    stockMax: 17,
    price: 14,
    names: ["云顶观星台", "星盘塔", "月轨天文室", "蓝镜穹顶"],
  },
  skyport: {
    label: "星港",
    icon: ICONS.skyport,
    desc: "调度云船与信使，让访客更快抵达，并提升订单与探险航线效率。",
    costMod: 1.5,
    buildTime: 27,
    stockMax: 18,
    price: 15,
    names: ["星港驿站", "云邮码头", "蓝翼候船厅", "天穹驿廊"],
  },
  festival: {
    label: "庆典",
    icon: ICONS.festival,
    desc: "举办星愿节目，聚拢节庆声望，提升连送奖励、快乐和贵宾热度。",
    costMod: 1.4,
    buildTime: 25,
    stockMax: 20,
    price: 12,
    names: ["星愿剧场", "梦灯舞台", "铃花庆典厅", "星幕小剧院"],
  },
  bathhouse: {
    label: "温泉",
    icon: ICONS.bathhouse,
    desc: "让居民恢复精神，提升快乐、租金和补货效率。",
    costMod: 1.36,
    buildTime: 24,
    stockMax: 24,
    price: 10,
    names: ["暖雾温泉", "月盐浴场", "地热汤屋", "萤石蒸汽室"],
  },
  clinic: {
    label: "医馆",
    icon: ICONS.clinic,
    desc: "照看访客与居民，提升快乐，并让错误接待不那么伤连送。",
    costMod: 1.34,
    buildTime: 23,
    stockMax: 20,
    price: 11,
    names: ["星露医馆", "月芽药铺", "蓝灯诊室", "草药疗养间"],
  },
  clockwork: {
    label: "机巧",
    icon: ICONS.clockwork,
    desc: "用齿轮和铜铃优化施工、补货与订单节奏。",
    costMod: 1.52,
    buildTime: 28,
    stockMax: 16,
    price: 16,
    names: ["铜铃机巧房", "齿轮钟楼", "云梯工坊", "发条控制室"],
  },
  aquarium: {
    label: "水族",
    icon: ICONS.aquarium,
    desc: "水晶鱼群吸引客人，提升快乐、贵宾与探险收益。",
    costMod: 1.44,
    buildTime: 26,
    stockMax: 18,
    price: 14,
    names: ["水晶水族馆", "镜湖观景厅", "珍珠鱼廊", "蓝潮温室"],
  },
  alchemy: {
    label: "秘药",
    icon: ICONS.alchemy,
    desc: "炼制发光药剂，订单价值高，偶尔带来珍藏碎片。",
    costMod: 1.48,
    buildTime: 26,
    stockMax: 16,
    price: 15,
    names: ["月露炼金房", "萤火药室", "星瓶温室", "蘑菇坩埚间"],
  },
  training: {
    label: "勇者",
    icon: ICONS.training,
    desc: "训练小小勇者，能吸引贵宾并提高连送奖励。",
    costMod: 1.42,
    buildTime: 25,
    stockMax: 18,
    price: 13,
    names: ["箭之轨迹", "木剑道场", "靶心庭院", "护盾练习场"],
  },
  treasure: {
    label: "珍宝",
    icon: ICONS.treasure,
    desc: "出售稀有藏品，完成王室订单时奖励更丰厚。",
    costMod: 1.62,
    buildTime: 30,
    stockMax: 14,
    price: 18,
    names: ["皇家金库", "龙骨陈列室", "琉璃宝柜", "深井拍卖厅"],
  },
};

const TYPE_ORDER = ["dwelling", "food", "service", "craft", "entertainment", "festival", "market", "kingdom", "library", "garden", "observatory", "skyport", "bathhouse", "clinic", "clockwork", "aquarium", "alchemy", "training", "treasure"];
const FLOOR_AFFINITIES = {
  dwelling: ["clinic", "bathhouse", "garden"],
  food: ["market", "service", "dwelling"],
  service: ["food", "market", "clinic"],
  craft: ["clockwork", "market", "treasure"],
  entertainment: ["festival", "garden", "service", "market"],
  festival: ["entertainment", "garden", "market", "skyport", "kingdom"],
  market: ["food", "service", "clockwork", "skyport", "festival"],
  kingdom: ["library", "market", "observatory", "skyport", "festival"],
  library: ["observatory", "clinic", "garden"],
  garden: ["bathhouse", "aquarium", "library", "skyport", "festival"],
  observatory: ["library", "aquarium", "market", "skyport"],
  skyport: ["market", "observatory", "garden", "kingdom", "festival"],
  bathhouse: ["garden", "clinic", "aquarium"],
  clinic: ["dwelling", "bathhouse", "aquarium"],
  clockwork: ["craft", "market", "service", "treasure"],
  aquarium: ["garden", "observatory", "clinic", "bathhouse"],
  alchemy: ["library", "observatory", "clockwork"],
  training: ["kingdom", "treasure", "clockwork"],
  treasure: ["training", "clockwork", "market"],
};
const PERSON_COLORS = ["#6ea8e6", "#ec6f5d", "#7dbd62", "#a983d8", "#f2b84b", "#64c4b0"];
const PERSON_ART = {
  resident: "assets/art/person-resident.png",
  shopper: "assets/art/person-shopper.png",
  vip: "assets/art/person-vip.png",
  worker: "assets/art/person-worker.png",
  mage: "assets/art/person-mage.png",
  knight: "assets/art/person-knight.png",
  healer: "assets/art/person-healer.png",
  engineer: "assets/art/person-engineer.png",
  skyfarer: "assets/art/person-skyfarer.png",
  performer: "assets/art/person-performer.webp",
};
const PERSON_ACTIVITY_SETS = {
  lobby: ["wait", "look", "wave", "talk"],
  elevator: ["wait", "look"],
  dwelling: ["rest", "chat", "stroll", "snack", "talk"],
  food: ["work", "serve", "look", "eat", "talk"],
  service: ["serve", "wave", "work", "look", "talk"],
  observatory: ["work", "look", "talk", "chat", "wave", "applaud"],
  craft: ["work", "look", "stroll", "talk"],
  kingdom: ["work", "talk", "look", "wave"],
  entertainment: ["dance", "wave", "work", "watch", "applaud"],
  festival: ["dance", "wave", "chat", "applaud"],
  garden: ["stroll", "chat", "look", "talk", "snack", "rest"],
  bathhouse: ["rest", "chat", "look", "talk"],
  clinic: ["work", "look", "wave"],
  clockwork: ["work", "look", "stroll"],
  aquarium: ["look", "stroll", "wave"],
  skyport: ["wave", "look", "stroll"],
  default: ["idle", "look", "stroll", "wave", "talk"],
};
const SOCIAL_SCENES = {
  dwelling: [
    { kind: "chat", need: "social", left: "talk", right: "chat", label: "闲聊" },
    { kind: "snack", need: "food", left: "snack", right: "eat", label: "分享点心" },
    { kind: "show", need: "entertainment", left: "watch", right: "applaud", label: "讲故事" },
  ],
  food: [
    { kind: "meal", need: "food", left: "serve", right: "eat", label: "上菜" },
    { kind: "toast", need: "social", left: "talk", right: "snack", label: "围桌聊天" },
  ],
  entertainment: [
    { kind: "show", need: "entertainment", left: "dance", right: "applaud", label: "看演出" },
    { kind: "duet", need: "social", left: "wave", right: "dance", label: "合演" },
  ],
  festival: [
    { kind: "show", need: "entertainment", left: "dance", right: "applaud", label: "庆典喝彩" },
    { kind: "chat", need: "social", left: "talk", right: "wave", label: "节庆寒暄" },
  ],
  service: [
    { kind: "chat", need: "social", left: "serve", right: "talk", label: "礼宾问候" },
  ],
  observatory: [
    { kind: "chart", need: "entertainment", left: "look", right: "talk", label: "共读星图" },
    { kind: "focus", need: "social", left: "work", right: "look", label: "校准星轨" },
  ],
  craft: [
    { kind: "tune", need: "energy", left: "work", right: "look", label: "工具校准" },
    { kind: "bench", need: "social", left: "work", right: "talk", label: "工坊试装" },
  ],
  kingdom: [
    { kind: "chat", need: "social", left: "work", right: "talk", label: "议事签令" },
    { kind: "show", need: "entertainment", left: "wave", right: "applaud", label: "宣读王令" },
  ],
  garden: [
    { kind: "chat", need: "social", left: "stroll", right: "chat", label: "散步聊天" },
    { kind: "snack", need: "food", left: "snack", right: "chat", label: "花茶点心" },
    { kind: "show", need: "entertainment", left: "look", right: "applaud", label: "看花灯" },
  ],
  bathhouse: [
    { kind: "soak", need: "energy", left: "rest", right: "rest", label: "一起泡汤" },
    { kind: "steam", need: "energy", left: "look", right: "chat", label: "蒸汽放松" },
    { kind: "chat", need: "social", left: "chat", right: "talk", label: "汤边闲聊" },
  ],
  default: [
    { kind: "chat", need: "social", left: "talk", right: "chat", label: "交谈" },
  ],
};
const PERSON_MOTIVE_KEYS = ["food", "entertainment", "social", "energy"];
const PERSON_NEED_LABELS = {
  food: "餐饮",
  entertainment: "娱乐",
  social: "社交",
  energy: "休息",
};
const PERSON_MOTIVE_DEFAULTS = {
  food: 72,
  entertainment: 70,
  social: 68,
  energy: 74,
};
const PERSON_MOTIVE_DECAY = {
  food: 0.13,
  entertainment: 0.1,
  social: 0.12,
  energy: 0.09,
};
const NEED_ACTIVITY_POOL = {
  food: ["eat", "snack", "serve", "talk"],
  entertainment: ["watch", "applaud", "dance", "wave"],
  social: ["talk", "chat", "wave", "stroll"],
  energy: ["rest", "look", "stroll"],
};
const NEED_VISIT_TYPES = {
  food: ["food", "market", "festival"],
  entertainment: ["entertainment", "festival", "garden", "aquarium"],
  social: ["garden", "market", "food", "entertainment", "festival", "service", "dwelling"],
  energy: ["bathhouse", "clinic", "garden", "dwelling"],
};
const LIFE_VISIT_LABELS = {
  food: "去吃点东西",
  entertainment: "去找乐子",
  social: "去见朋友",
  energy: "去休息一下",
};
const LIFE_COMPANION_LABELS = {
  food: "约朋友吃点东西",
  entertainment: "约朋友看演出",
  social: "找熟人聊天",
  energy: "结伴放松一下",
};
const LIFE_VISIT_ACTIVITIES = {
  food: ["eat", "snack"],
  entertainment: ["watch", "applaud", "dance"],
  social: ["talk", "chat", "stroll"],
  energy: ["rest", "look"],
};
const COMFORT_FLOOR_TYPES = ["garden", "bathhouse"];
const COMFORT_SESSION_LABELS = {
  garden: "花园茶会",
  bathhouse: "温泉休整",
};
const COMFORT_SESSION_ACTIONS = {
  garden: "组织茶会",
  bathhouse: "安排休整",
};
const COMFORT_AFTERGLOW_LABELS = {
  garden: "花香余韵",
  bathhouse: "暖雾余韵",
};
const COMFORT_AFTERGLOW_TOTALS = {
  garden: 105,
  bathhouse: 120,
};
const COMFORT_FOCUS_ORDER = ["rent", "expedition", "recovery"];
const COMFORT_FOCUS_OPTIONS = {
  rent: {
    id: "rent",
    label: "租金回响",
    short: "租",
    action: "导向租金",
    desc: "把余韵转成住户租金准备",
  },
  expedition: {
    id: "expedition",
    label: "探险整备",
    short: "探",
    action: "整备探险",
    desc: "缩短进行中的探险并提高准备",
  },
  recovery: {
    id: "recovery",
    label: "居民恢复",
    short: "舒",
    action: "舒缓居民",
    desc: "治疗低状态居民并延长舒缓记忆",
  },
};
const SHOWTIME_FLOOR_TYPES = ["entertainment"];
const SHOWTIME_LABELS = {
  entertainment: "烛光小剧",
};
const SHOWTIME_ACTIONS = {
  entertainment: "排演小剧",
};
const SHOWTIME_NEEDS = ["entertainment", "social"];
const SHOWTIME_BEATS = [
  { id: "opening", label: "开场", threshold: 0, performer: ["wave", "dance"], audience: ["watch", "talk"] },
  { id: "twist", label: "转场", threshold: 0.36, performer: ["dance", "wave"], audience: ["watch", "applaud"] },
  { id: "finale", label: "谢幕", threshold: 0.72, performer: ["wave", "dance"], audience: ["applaud", "dance"] },
];
const FOOD_RUSH_FLOOR_TYPES = ["food"];
const FOOD_RUSH_LABELS = {
  food: "餐桌高峰",
};
const FOOD_RUSH_ACTIONS = {
  food: "组织用餐高峰",
};
const FOOD_RUSH_NEEDS = ["food", "social"];
const FOOD_RUSH_PACES = [
  { id: "seating", label: "入座", threshold: 0, worker: ["serve", "work"], diner: ["wait", "talk"] },
  { id: "serving", label: "上菜", threshold: 0.26, worker: ["serve", "work"], diner: ["eat", "snack"] },
  { id: "sharing", label: "拼桌", threshold: 0.58, worker: ["serve", "talk"], diner: ["eat", "talk"] },
  { id: "lastcall", label: "加桌", threshold: 0.84, worker: ["serve", "wave"], diner: ["snack", "talk"] },
];
const FOOD_RUSH_COURSES = [
  { id: "starter", label: "暖汤", threshold: 0 },
  { id: "pot", label: "热锅", threshold: 0.28 },
  { id: "share", label: "拼盘", threshold: 0.58 },
  { id: "finale", label: "加桌", threshold: 0.84 },
];
const SERVICE_CARE_FLOOR_TYPES = ["service"];
const SERVICE_CARE_LABELS = {
  service: "礼宾照看",
};
const SERVICE_CARE_ACTIONS = {
  service: "安排礼宾照看",
};
const SERVICE_CARE_PHASES = [
  { id: "greet", label: "迎候", threshold: 0, worker: ["serve", "wave"], guest: ["wait", "talk"] },
  { id: "wrap", label: "整理", threshold: 0.32, worker: ["work", "serve"], guest: ["look", "chat"] },
  { id: "deliver", label: "递送", threshold: 0.64, worker: ["serve", "work"], guest: ["talk", "look"] },
  { id: "thanks", label: "致谢", threshold: 0.86, worker: ["wave", "talk"], guest: ["wave", "chat"] },
];
const STAR_CHART_FLOOR_TYPES = ["observatory"];
const STAR_CHART_LABELS = {
  observatory: "星图校准",
};
const STAR_CHART_ACTIONS = {
  observatory: "校准星图",
};
const STAR_CHART_PHASES = [
  { id: "align", label: "对星", threshold: 0, worker: ["look", "work"], guest: ["look", "talk"] },
  { id: "chart", label: "绘轨", threshold: 0.3, worker: ["work", "talk"], guest: ["look", "chat"] },
  { id: "forecast", label: "预报", threshold: 0.62, worker: ["wave", "work"], guest: ["talk", "look"] },
  { id: "comet", label: "追光", threshold: 0.86, worker: ["look", "wave"], guest: ["wave", "applaud"] },
];
const TOOL_TUNE_FLOOR_TYPES = ["craft"];
const TOOL_TUNE_LABELS = {
  craft: "工具校准",
};
const TOOL_TUNE_ACTIONS = {
  craft: "校准工具",
};
const TOOL_TUNE_PHASES = [
  { id: "sort", label: "分拣", threshold: 0, worker: ["look", "work"], guest: ["look", "talk"] },
  { id: "grind", label: "打磨", threshold: 0.3, worker: ["work", "talk"], guest: ["look", "chat"] },
  { id: "fit", label: "试装", threshold: 0.62, worker: ["work", "look"], guest: ["talk", "look"] },
  { id: "seal", label: "封箱", threshold: 0.86, worker: ["wave", "work"], guest: ["wave", "applaud"] },
];
const ROYAL_MANDATE_PHASES = [
  { id: "draft", label: "拟令", threshold: 0 },
  { id: "seal", label: "盖印", threshold: 0.38 },
  { id: "dispatch", label: "传令", threshold: 0.72 },
];
const ROYAL_COURIER_PHASES = [
  { id: "desk", label: "备囊", threshold: 0 },
  { id: "gate", label: "出门", threshold: 0.38 },
  { id: "route", label: "送达", threshold: 0.72 },
  { id: "receipt", label: "回执", threshold: 0.92 },
];
const MARKET_PARCEL_PHASES = [
  { id: "quote", label: "议价", threshold: 0 },
  { id: "pack", label: "打包", threshold: 0.34 },
  { id: "send", label: "发货", threshold: 0.7 },
];
const PERSON_ROOM_SPOTS = {
  default: [
    { id: "door", x: 18, y: 12, scale: 0.94, activities: ["stroll", "wait", "serve"] },
    { id: "center", x: 48, y: 16, scale: 1, activities: ["wait", "talk", "work", "stroll"] },
    { id: "right", x: 73, y: 13, scale: 0.96, activities: ["look", "serve", "admire", "pack"] },
    { id: "front", x: 56, y: 4, scale: 1.06, activities: ["eat", "snack", "rest", "watch"] },
  ],
  dwelling: [
    { id: "bed", x: 32, y: 8, scale: 1.05, activities: ["rest", "snack"] },
    { id: "window", x: 72, y: 18, scale: 0.95, activities: ["look", "watch"] },
    { id: "table", x: 51, y: 13, scale: 1, activities: ["talk", "eat", "chat"] },
    { id: "door", x: 18, y: 11, scale: 0.94, activities: ["stroll", "wait"] },
  ],
  food: [
    { id: "counter", x: 62, y: 13, scale: 1, activities: ["work", "serve"] },
    { id: "table", x: 36, y: 5, scale: 1.08, activities: ["eat", "snack", "talk"] },
    { id: "menu", x: 78, y: 17, scale: 0.94, activities: ["look", "wait"] },
  ],
  service: [
    { id: "counter", x: 55, y: 12, scale: 1, activities: ["serve", "work", "talk"] },
    { id: "plant", x: 30, y: 14, scale: 0.98, activities: ["look", "chat"] },
    { id: "door", x: 77, y: 10, scale: 0.96, activities: ["wait", "stroll"] },
  ],
  craft: [
    { id: "anvil", x: 57, y: 11, scale: 1, activities: ["work"] },
    { id: "rack", x: 31, y: 17, scale: 0.94, activities: ["look"] },
    { id: "front", x: 75, y: 5, scale: 1.05, activities: ["wait", "talk"] },
  ],
  market: [
    { id: "counter", x: 60, y: 13, scale: 1, activities: ["work", "serve"] },
    { id: "shelf", x: 31, y: 16, scale: 0.96, activities: ["look"] },
    { id: "front", x: 75, y: 4, scale: 1.06, activities: ["wait", "talk"] },
  ],
  library: [
    { id: "desk", x: 44, y: 10, scale: 1.03, activities: ["work", "chat", "talk"] },
    { id: "shelf", x: 73, y: 17, scale: 0.94, activities: ["look"] },
    { id: "chair", x: 29, y: 6, scale: 1.06, activities: ["rest", "watch"] },
  ],
  garden: [
    { id: "bench", x: 38, y: 5, scale: 1.07, activities: ["rest", "chat"] },
    { id: "flowers", x: 66, y: 15, scale: 0.98, activities: ["look", "talk"] },
    { id: "walkway", x: 22, y: 12, scale: 0.96, activities: ["stroll", "wait"] },
  ],
  observatory: [
    { id: "chart", x: 50, y: 9, scale: 1.04, activities: ["work", "talk", "look"] },
    { id: "telescope", x: 68, y: 15, scale: 0.96, activities: ["look", "wave"] },
    { id: "shelf", x: 29, y: 15, scale: 0.94, activities: ["work", "chat"] },
    { id: "front", x: 38, y: 2, scale: 1.08, activities: ["wait", "applaud"] },
  ],
  entertainment: [
    { id: "stage", x: 57, y: 16, scale: 0.98, activities: ["dance", "wave", "work"] },
    { id: "stage-left", x: 46, y: 13, scale: 1, activities: ["dance", "wave", "talk"] },
    { id: "front-seat", x: 31, y: 4, scale: 1.08, activities: ["watch", "applaud", "snack"] },
    { id: "aisle", x: 76, y: 9, scale: 0.98, activities: ["stroll", "talk", "applaud"] },
  ],
  festival: [
    { id: "stage", x: 58, y: 15, scale: 0.98, activities: ["dance", "wave", "work"] },
    { id: "seat", x: 34, y: 4, scale: 1.08, activities: ["watch", "applaud", "snack"] },
    { id: "aisle", x: 76, y: 10, scale: 0.98, activities: ["stroll", "talk"] },
  ],
  bathhouse: [
    { id: "pool", x: 39, y: 5, scale: 1.08, activities: ["rest"] },
    { id: "steam", x: 66, y: 17, scale: 0.96, activities: ["look", "chat"] },
    { id: "desk", x: 23, y: 11, scale: 0.98, activities: ["serve", "talk"] },
  ],
  clinic: [
    { id: "counter", x: 59, y: 12, scale: 1, activities: ["work", "serve", "talk"] },
    { id: "bed", x: 33, y: 6, scale: 1.07, activities: ["rest", "watch"] },
    { id: "vial", x: 77, y: 16, scale: 0.94, activities: ["look"] },
  ],
  clockwork: [
    { id: "gears", x: 60, y: 13, scale: 1, activities: ["work"] },
    { id: "bench", x: 34, y: 5, scale: 1.08, activities: ["rest", "chat"] },
    { id: "shelf", x: 77, y: 16, scale: 0.94, activities: ["look"] },
  ],
  aquarium: [
    { id: "glass", x: 66, y: 17, scale: 0.95, activities: ["look", "watch"] },
    { id: "bench", x: 36, y: 5, scale: 1.07, activities: ["rest", "talk"] },
    { id: "counter", x: 21, y: 12, scale: 0.98, activities: ["serve", "work"] },
  ],
  skyport: [
    { id: "gate", x: 28, y: 13, scale: 0.98, activities: ["wait", "look", "stroll"] },
    { id: "chart", x: 59, y: 16, scale: 0.96, activities: ["work", "wave"] },
    { id: "dock", x: 76, y: 7, scale: 1.04, activities: ["talk", "chat"] },
  ],
  alchemy: [
    { id: "bench", x: 58, y: 13, scale: 1, activities: ["work"] },
    { id: "shelf", x: 31, y: 16, scale: 0.94, activities: ["look"] },
    { id: "front", x: 76, y: 5, scale: 1.06, activities: ["talk", "wait"] },
  ],
  training: [
    { id: "dummy", x: 60, y: 13, scale: 1, activities: ["work", "wave"] },
    { id: "mat", x: 34, y: 5, scale: 1.08, activities: ["rest", "watch"] },
    { id: "rack", x: 76, y: 16, scale: 0.94, activities: ["look", "wait"] },
  ],
  treasure: [
    { id: "chest", x: 60, y: 13, scale: 1, activities: ["work"] },
    { id: "display", x: 33, y: 16, scale: 0.95, activities: ["look"] },
    { id: "front", x: 77, y: 5, scale: 1.06, activities: ["talk", "wait"] },
  ],
  kingdom: [
    { id: "desk", x: 47, y: 12, scale: 1, activities: ["work", "talk"] },
    { id: "throne", x: 70, y: 16, scale: 0.95, activities: ["look", "chat"] },
    { id: "carpet", x: 31, y: 5, scale: 1.07, activities: ["wait", "wave", "stroll"] },
    { id: "courier", x: 22, y: 9, scale: 1.02, activities: ["stroll", "wave"] },
  ],
};
const PERSON_SOCIAL_SPOTS = {
  default: [
    { x: 49, y: 7, scale: 1.02 },
    { x: 62, y: 13, scale: 0.98 },
  ],
  dwelling: [
    { x: 48, y: 9, scale: 1.03 },
    { x: 35, y: 6, scale: 1.06 },
  ],
  food: [
    { x: 40, y: 4, scale: 1.08 },
    { x: 58, y: 11, scale: 1 },
  ],
  garden: [
    { x: 47, y: 5, scale: 1.07 },
    { x: 64, y: 14, scale: 0.98 },
  ],
  library: [
    { x: 43, y: 8, scale: 1.03 },
    { x: 31, y: 6, scale: 1.07 },
  ],
  entertainment: [
    { x: 38, y: 5, scale: 1.08 },
    { x: 59, y: 15, scale: 0.98 },
  ],
  festival: [
    { x: 38, y: 5, scale: 1.08 },
    { x: 59, y: 15, scale: 0.98 },
  ],
};
const VISITOR_QUEUE_MAX = 5;
const ELEVATOR_MAX_UPGRADES = 5;
const RESIDENT_NAMES = ["阿岚", "小芒", "南栀", "森羽", "浅川", "洛洛", "青枝", "米栗", "绒绒", "晓灯", "沐青", "禾星"];
const VISITOR_TITLES = {
  resident: ["新居民", "寻屋人", "旅行学徒"],
  shopper: ["顾客", "采购员", "街角客人"],
  vip: ["急件使者", "巡游贵宾", "星尘匠人", "王室管家", "迷宫斥候", "巡演赞助人"],
};

const EXPEDITION_DEFS = [
  {
    id: "moss",
    title: "苔穴巡逻",
    duration: 22,
    coins: [55, 95],
    gemChance: 0.08,
    relicChance: 0.05,
    tag: "稳妥",
    text: "清理王国入口旁的苔穴，带回零散金币和灯油。",
  },
  {
    id: "well",
    title: "古井探路",
    duration: 38,
    coins: [90, 150],
    gemChance: 0.24,
    relicChance: 0.12,
    tag: "宝石",
    text: "沿旧井绳索向下摸索，偶尔能敲到发亮矿脉。",
  },
  {
    id: "skybridge",
    title: "星桥巡礼",
    duration: 48,
    coins: [120, 190],
    gemChance: 0.26,
    relicChance: 0.18,
    tag: "天空",
    text: "沿塔楼外侧检查星桥与灯缆，书库和花园会让路线更稳。",
  },
  {
    id: "cloudpost",
    title: "云邮航线",
    duration: 50,
    coins: [135, 215],
    gemChance: 0.3,
    relicChance: 0.2,
    tag: "星港",
    text: "借星港驿站的云船航线递送王国急件，常能带回远方见闻和小宝石。",
  },
  {
    id: "parade",
    title: "星愿巡演",
    duration: 52,
    coins: [130, 225],
    gemChance: 0.32,
    relicChance: 0.23,
    tag: "庆典",
    text: "跟随剧场灯车拜访远方街区，带回节目单、赞助和新的传闻。",
  },
  {
    id: "meteor",
    title: "流星采样",
    duration: 58,
    coins: [150, 245],
    gemChance: 0.38,
    relicChance: 0.24,
    tag: "星辉",
    text: "追踪坠落星屑，需要观星台校准路线。",
  },
  {
    id: "reef",
    title: "镜湖潜航",
    duration: 54,
    coins: [135, 220],
    gemChance: 0.32,
    relicChance: 0.22,
    tag: "水晶",
    text: "沿水晶水脉寻找旧王国贝雕，水族馆会指引路线。",
  },
  {
    id: "maze",
    title: "迷宫寻宝",
    duration: 62,
    coins: [145, 230],
    gemChance: 0.34,
    relicChance: 0.28,
    tag: "珍藏",
    text: "深入旧王国迷宫，需要更成熟的王国支援。",
  },
];

const EXPEDITION_WAYMARKS = [
  { id: "depart", at: 0.12, label: "出发", tone: "depart", text: "确认入口补给与住户牵挂" },
  { id: "camp", at: 0.44, label: "营地", tone: "camp", text: "扎下临时营地，记录路线风险" },
  { id: "return", at: 0.74, label: "回程", tone: "return", text: "带着线索与战利品返城" },
];

const QUEST_DEFS = [
  {
    id: "residents",
    title: "安置居民",
    goal: 3,
    metric: "residentsMoved",
    reward: { coins: 130, gems: 1 },
    text: "让 3 位访客入住",
  },
  {
    id: "stock",
    title: "补满货架",
    goal: 4,
    metric: "stockOrders",
    reward: { coins: 180, gems: 1 },
    text: "完成 4 次补货",
  },
  {
    id: "lobby_routes",
    title: "灯号派送",
    goal: 5,
    metric: "lobbyRoutesDone",
    reward: { coins: 180, gems: 1 },
    text: "用大厅推荐接待 5 位访客",
  },
  {
    id: "lobby_order",
    title: "候车秩序",
    goal: 6,
    metric: "lobbyPriorityDispatchesDone",
    reward: { coins: 260, gems: 2 },
    text: "在繁忙或久候时完成 6 次优先派号",
  },
  {
    id: "craft_tools",
    title: "手作工具箱",
    goal: 1,
    metric: "craftFloorsBuilt",
    reward: { coins: 220, gems: 1 },
    text: "拥有 1 层工坊",
  },
  {
    id: "tool_tune",
    title: "工具校准",
    goal: 6,
    metric: "toolTuneMarksDone",
    reward: { coins: 560, gems: 3 },
    text: "用工坊完成 6 次工具校准",
  },
  {
    id: "warm_supper",
    title: "暖锅补给",
    goal: 1,
    metric: "foodFloorsBuilt",
    reward: { coins: 180, gems: 1 },
    text: "拥有 1 层餐饮楼层",
  },
  {
    id: "table_turnover",
    title: "餐桌高峰",
    goal: 2,
    metric: "foodRushesDone",
    reward: { coins: 420, gems: 2 },
    text: "用餐饮楼层组织 2 次用餐高峰",
  },
  {
    id: "serving_line",
    title: "流水上菜",
    goal: 5,
    metric: "foodRushCoursesDone",
    reward: { coins: 460, gems: 2 },
    text: "在餐桌高峰中完成 5 轮上菜",
  },
  {
    id: "shoppers",
    title: "热闹街市",
    goal: 8,
    metric: "shoppersServed",
    reward: { coins: 220, gems: 2 },
    text: "送达 8 位顾客",
  },
  {
    id: "guest_care",
    title: "礼宾花坊",
    goal: 1,
    metric: "serviceFloorsBuilt",
    reward: { coins: 240, gems: 1 },
    text: "拥有 1 层服务楼层",
  },
  {
    id: "care_line",
    title: "礼宾照看",
    goal: 5,
    metric: "serviceCareTouchesDone",
    reward: { coins: 430, gems: 2 },
    text: "在服务楼层完成 5 次礼宾照看",
  },
  {
    id: "opening_night",
    title: "烛光开幕",
    goal: 1,
    metric: "entertainmentFloorsBuilt",
    reward: { coins: 300, gems: 2 },
    text: "建成 1 层演艺楼层",
  },
  {
    id: "curtain_call",
    title: "谢幕掌声",
    goal: 3,
    metric: "entertainmentShowsDone",
    reward: { coins: 520, gems: 3 },
    text: "用演艺楼层排演 3 场小剧",
  },
  {
    id: "full_house",
    title: "满堂喝彩",
    goal: 8,
    metric: "showtimeReactionsDone",
    reward: { coins: 620, gems: 3 },
    text: "让演艺现场触发 8 次观众反应",
  },
  {
    id: "builders",
    title: "双向扩建",
    goal: 2,
    metric: "floorsBuilt",
    reward: { coins: 300, gems: 2 },
    text: "建成 2 个新楼层",
  },
  {
    id: "skyline",
    title: "云端塔楼",
    goal: 1,
    metric: "skyFloorsBuilt",
    reward: { coins: 320, gems: 2 },
    text: "向上建成 1 个摩天楼层",
  },
  {
    id: "market_day",
    title: "开张市集",
    goal: 1,
    metric: "marketFloorsBuilt",
    reward: { coins: 360, gems: 2 },
    text: "建成 1 层市集",
  },
  {
    id: "market_broker",
    title: "撮合快单",
    goal: 2,
    metric: "marketDealsDone",
    reward: { coins: 420, gems: 2 },
    text: "用市集撮合 2 张快单",
  },
  {
    id: "parcel_flow",
    title: "包裹流转",
    goal: 8,
    metric: "marketParcelItemsPacked",
    reward: { coins: 560, gems: 3 },
    text: "让市集打包流转 8 件订单货物",
  },
  {
    id: "archive",
    title: "灯下书库",
    goal: 1,
    metric: "libraryFloorsBuilt",
    reward: { coins: 420, gems: 2 },
    text: "建成 1 层书库",
  },
  {
    id: "archive_study",
    title: "整理典藏",
    goal: 3,
    metric: "libraryStudiesDone",
    reward: { coins: 520, gems: 3 },
    text: "用书库整理 3 次典藏",
  },
  {
    id: "garden_party",
    title: "云端花宴",
    goal: 1,
    metric: "gardenFloorsBuilt",
    reward: { coins: 380, gems: 2 },
    text: "建成 1 层花园",
  },
  {
    id: "stargazer",
    title: "星盘点灯",
    goal: 1,
    metric: "observatoryFloorsBuilt",
    reward: { coins: 460, gems: 3 },
    text: "建成 1 层观星台",
  },
  {
    id: "star_chart",
    title: "星图校准",
    goal: 6,
    metric: "starChartMarksDone",
    reward: { coins: 620, gems: 3 },
    text: "用观星台完成 6 次星标校准",
  },
  {
    id: "sky_mail",
    title: "星港通航",
    goal: 1,
    metric: "skyportFloorsBuilt",
    reward: { coins: 500, gems: 3 },
    text: "建成 1 层星港驿站",
  },
  {
    id: "festival_show",
    title: "星愿开演",
    goal: 1,
    metric: "festivalFloorsBuilt",
    reward: { coins: 460, gems: 3 },
    text: "建成 1 层庆典楼层",
  },
  {
    id: "hot_spring",
    title: "暖雾汤屋",
    goal: 1,
    metric: "bathhouseFloorsBuilt",
    reward: { coins: 410, gems: 2 },
    text: "建成 1 层温泉",
  },
  {
    id: "comfort_circle",
    title: "结伴休整",
    goal: 3,
    metric: "comfortSessionsDone",
    reward: { coins: 540, gems: 3 },
    text: "用花园或温泉组织 3 次居民休整",
  },
  {
    id: "comfort_echoes",
    title: "舒缓余韵",
    goal: 3,
    metric: "comfortEchoesDone",
    reward: { coins: 620, gems: 3 },
    text: "让花园或温泉留下 3 次可读余韵",
  },
  {
    id: "comfort_focus",
    title: "余韵调息",
    goal: 3,
    metric: "comfortFocusesDone",
    reward: { coins: 680, gems: 3 },
    text: "将花园或温泉余韵导向租金、探险或恢复 3 次",
  },
  {
    id: "moon_clinic",
    title: "星露医馆",
    goal: 1,
    metric: "clinicFloorsBuilt",
    reward: { coins: 430, gems: 2 },
    text: "建成 1 层医馆",
  },
  {
    id: "clock_bells",
    title: "铜铃机巧",
    goal: 1,
    metric: "clockworkFloorsBuilt",
    reward: { coins: 520, gems: 3 },
    text: "建成 1 层机巧房",
  },
  {
    id: "crystal_fish",
    title: "水晶鱼廊",
    goal: 1,
    metric: "aquariumFloorsBuilt",
    reward: { coins: 500, gems: 3 },
    text: "建成 1 层水族馆",
  },
  {
    id: "dream_jobs",
    title: "理想岗位",
    goal: 3,
    metric: "dreamJobsFilled",
    reward: { coins: 260, gems: 2 },
    text: "让 3 位居民进入理想工作",
  },
  {
    id: "commissions",
    title: "王室委托",
    goal: 3,
    metric: "commissionsDone",
    reward: { coins: 360, gems: 2 },
    text: "完成 3 张王室订单",
  },
  {
    id: "order_triage",
    title: "调度交付",
    goal: 6,
    metric: "commissionsDone",
    reward: { coins: 680, gems: 3 },
    text: "通过订单调度完成 6 张王室订单",
  },
  {
    id: "royal_seals",
    title: "王令签发",
    goal: 3,
    metric: "royalMandatesDone",
    reward: { coins: 560, gems: 3 },
    text: "用王国楼层签发 3 次王令",
  },
  {
    id: "royal_couriers",
    title: "信使回执",
    goal: 3,
    metric: "royalCourierReceiptsDone",
    reward: { coins: 640, gems: 3 },
    text: "让王令信使送回 3 份回执",
  },
  {
    id: "life_trails",
    title: "生活足迹",
    goal: 6,
    metric: "lifeStoriesDone",
    reward: { coins: 520, gems: 3 },
    text: "让居民完成 6 段可读的生活小故事",
  },
  {
    id: "life_story_reviews",
    title: "生活回访",
    goal: 4,
    metric: "lifeStoryReviewsDone",
    reward: { coins: 460, gems: 2 },
    text: "手动整理 4 段生活足迹回访",
  },
  {
    id: "relics",
    title: "地底珍藏",
    goal: 3,
    metric: "relicPieces",
    reward: { coins: 420, gems: 3 },
    text: "收集 3 枚珍藏碎片",
  },
  {
    id: "expeditions",
    title: "派出斥候",
    goal: 3,
    metric: "expeditionsDone",
    reward: { coins: 520, gems: 3 },
    text: "完成 3 次地底探险",
  },
  {
    id: "expedition_reports",
    title: "探险回执",
    goal: 4,
    metric: "expeditionReportsDone",
    reward: { coins: 640, gems: 3 },
    text: "留下 4 份可读的探险回城报告。",
  },
];

const COLLECTION_DEFS = [
  { id: "crown", name: "月冠徽章", desc: "让住宅租金上限更高", source: "租金 / 订单" },
  { id: "key", name: "深井钥匙", desc: "王室订单奖励提高", source: "王室订单" },
  { id: "seed", name: "萤火种子", desc: "快乐恢复更稳定", source: "花园 / 贵宾" },
  { id: "map", name: "旧王国地图", desc: "贵宾出现更频繁", source: "探险线索" },
  { id: "bell", name: "电梯铜铃", desc: "连送奖励更爽快", source: "入口接待" },
  { id: "mask", name: "迷宫面具", desc: "高级楼层需求提高", source: "地底探险" },
  { id: "compass", name: "星港罗盘", desc: "探险和订单航线更顺", source: "星港航线" },
  { id: "program", name: "星愿节目单", desc: "庆典声望让连送更稳", source: "演艺 / 庆典" },
];
const MOBILE_PANEL_QUERY = "(max-width: 980px)";
const MOBILE_PANEL_DEFAULT = "detail";

const els = {
  kingdom: document.getElementById("kingdom"),
  kingdomScroll: document.getElementById("kingdomScroll"),
  coins: document.getElementById("coins"),
  gems: document.getElementById("gems"),
  population: document.getElementById("population"),
  happiness: document.getElementById("happiness"),
  streak: document.getElementById("streak"),
  elevatorFloor: document.getElementById("elevatorFloor"),
  floorJump: document.getElementById("floorJump"),
  passengerBox: document.getElementById("passengerBox"),
  selectedFloorTag: document.getElementById("selectedFloorTag"),
  floorDetail: document.getElementById("floorDetail"),
  residentCount: document.getElementById("residentCount"),
  residentRoster: document.getElementById("residentRoster"),
  rosterFilters: document.getElementById("rosterFilters"),
  quests: document.getElementById("quests"),
  questCount: document.getElementById("questCount"),
  orders: document.getElementById("orders"),
  orderCount: document.getElementById("orderCount"),
  collection: document.getElementById("collection"),
  collectionCount: document.getElementById("collectionCount"),
  expeditions: document.getElementById("expeditions"),
  expeditionCount: document.getElementById("expeditionCount"),
  log: document.getElementById("log"),
  mobilePanelDock: document.getElementById("mobilePanelDock"),
  toast: document.getElementById("toast"),
  guideModal: document.getElementById("guideModal"),
  inventoryBtn: document.getElementById("inventoryBtn"),
  inventoryModal: document.getElementById("inventoryModal"),
  inventoryPanel: document.getElementById("inventoryPanel"),
  buildModal: document.getElementById("buildModal"),
  buildOptions: document.getElementById("buildOptions"),
};

let state = loadGame();
let lastTime = performance.now();
let lastRender = 0;
let lastKingdomKey = "";
let toastTimer = null;
let autosaveTimer = 0;
let preferredBuildDirection = "down";
let residentRosterFilter = "all";
let activeMobilePanel = MOBILE_PANEL_DEFAULT;
let mobilePanelOpen = true;
let guideReady = false;

function makeNewGame() {
  const game = {
    version: 28,
    coins: 560,
    gems: 7,
    happiness: 72,
    streak: 0,
    selectedFloorId: 0,
    nextFloorId: 0,
    nextSkyFloorId: -1,
    nextResidentId: 1,
    nextVisitorId: 1,
    nextLogId: 1,
    nextExpeditionId: 1,
    nextExpeditionReportId: 1,
    nextLifeStoryId: 1,
    elevator: {
      position: 0,
      target: null,
      speed: 0.92,
      upgrades: 0,
      passenger: null,
      doorTimer: 0,
    },
    queue: [],
    floors: [],
    logs: [],
    arrivals: [],
    stats: {
      residentsMoved: 0,
      stockOrders: 0,
      shoppersServed: 0,
      floorsBuilt: 0,
      rentCollected: 0,
      vipsServed: 0,
      coinsEarned: 0,
      commissionsDone: 0,
      relicPieces: 0,
      expeditionsDone: 0,
      expeditionReportsDone: 0,
      expeditionWaymarksDone: 0,
      skyFloorsBuilt: 0,
      depthFloorsBuilt: 0,
      dreamJobsFilled: 0,
      lobbyRoutesDone: 0,
      lobbyPriorityDispatchesDone: 0,
      foodFloorsBuilt: 1,
      foodRushesDone: 0,
      foodServingsDone: 0,
      foodRushCoursesDone: 0,
      serviceFloorsBuilt: 1,
      serviceCareSessionsDone: 0,
      serviceCareTouchesDone: 0,
      craftFloorsBuilt: 0,
      toolTuneSessionsDone: 0,
      toolTuneMarksDone: 0,
      marketDealsDone: 0,
      marketParcelsDone: 0,
      marketParcelItemsPacked: 0,
      royalMandatesDone: 0,
      royalCourierReceiptsDone: 0,
      lifeStoriesDone: 0,
      lifeStoryReviewsDone: 0,
      libraryStudiesDone: 0,
      comfortSessionsDone: 0,
      comfortEchoesDone: 0,
      comfortFocusesDone: 0,
      comfortRentFocusesDone: 0,
      comfortExpeditionFocusesDone: 0,
      comfortRecoveryFocusesDone: 0,
      entertainmentShowsDone: 0,
      showtimeReactionsDone: 0,
      entertainmentFloorsBuilt: 0,
      marketFloorsBuilt: 0,
      libraryFloorsBuilt: 0,
      gardenFloorsBuilt: 0,
      observatoryFloorsBuilt: 0,
      starChartCalibrationsDone: 0,
      starChartMarksDone: 0,
      skyportFloorsBuilt: 0,
      bathhouseFloorsBuilt: 0,
      clinicFloorsBuilt: 0,
      clockworkFloorsBuilt: 0,
      aquariumFloorsBuilt: 0,
      festivalFloorsBuilt: 0,
    },
    quests: QUEST_DEFS.map((quest) => ({ id: quest.id, claimed: false, ready: false })),
    orders: [],
    collection: makeEmptyCollection(),
    expeditions: [],
    expeditionReports: [],
    lifeStories: [],
    lastSavedAt: Date.now(),
    spawnTimer: 7.5 + Math.random() * 6.5,
    passiveTimer: 0,
  };

  game.floors.push(createFloor(game, "lobby", { name: "地表大厅" }));
  game.floors.push(createFloor(game, "dwelling", { name: "星灯公寓" }));
  game.floors.push(createFloor(game, "food", { name: "蜜糖厨房", stock: 18 }));
  game.floors.push(createFloor(game, "service", { name: "露台花坊", stock: 12 }));

  addResidentToDwelling(game, game.floors[1], makeResident(game, "food"));
  addResidentToDwelling(game, game.floors[1], makeResident(game, "service"));
  hireBestWorker(game.floors[2], game, true);
  hireBestWorker(game.floors[3], game, true);

  game.logs.unshift(makeLog(game, "迪迪王国开门了，城门灯已经点亮。"));
  ensureOrders(game);
  return game;
}

function createFloor(game, type, options = {}) {
  const id = game.nextFloorId++;
  const data = FLOOR_TYPES[type];
  const base = {
    id,
    type,
    name: options.name || pick(data?.names || ["楼层"]),
    direction: options.direction || floorDirectionFromId(id),
    status: "open",
    level: options.level || 1,
    rentReady: 0,
    bonus: 0,
  };

  if (type === "lobby") {
    return { ...base, name: options.name || "地表大厅" };
  }

  if (type === "dwelling") {
    return {
      ...base,
      capacity: options.capacity || data.capacity,
      residents: options.residents || [],
      rentReady: 0,
      rentTimer: 22,
      rentTotal: 22,
    };
  }

  return {
    ...base,
    workers: options.workers || [],
    stock: options.stock || 0,
    stockMax: options.stockMax || data.stockMax,
    production: null,
    saleRemainder: 0,
    foodRushCooldown: FOOD_RUSH_FLOOR_TYPES.includes(type) ? 0 : undefined,
    foodRush: FOOD_RUSH_FLOOR_TYPES.includes(type) ? null : undefined,
    serviceCareCooldown: SERVICE_CARE_FLOOR_TYPES.includes(type) ? 0 : undefined,
    serviceCare: SERVICE_CARE_FLOOR_TYPES.includes(type) ? null : undefined,
    starChartCooldown: STAR_CHART_FLOOR_TYPES.includes(type) ? 0 : undefined,
    starChart: STAR_CHART_FLOOR_TYPES.includes(type) ? null : undefined,
    toolTuneCooldown: TOOL_TUNE_FLOOR_TYPES.includes(type) ? 0 : undefined,
    toolTune: TOOL_TUNE_FLOOR_TYPES.includes(type) ? null : undefined,
    royalMandateCooldown: type === "kingdom" ? 0 : undefined,
    royalMandate: type === "kingdom" ? null : undefined,
    marketCooldown: type === "market" ? 0 : undefined,
    marketParcel: type === "market" ? null : undefined,
    libraryCooldown: type === "library" ? 0 : undefined,
    comfortCooldown: isComfortFloorType(type) ? 0 : undefined,
    comfortSession: isComfortFloorType(type) ? null : undefined,
    comfortAfterglow: isComfortFloorType(type) ? null : undefined,
    showtimeCooldown: isShowtimeFloorType(type) ? 0 : undefined,
    showtime: isShowtimeFloorType(type) ? null : undefined,
  };
}

function createConstructionFloor(game, type, direction = "down") {
  const data = FLOOR_TYPES[type];
  const buildDirection = direction === "up" ? "up" : "down";
  if (!Number.isFinite(game.nextSkyFloorId)) game.nextSkyFloorId = getMinFloorId(game) - 1;
  if (!Number.isFinite(game.nextFloorId)) game.nextFloorId = getMaxFloorId(game) + 1;
  const id = buildDirection === "up" ? game.nextSkyFloorId-- : game.nextFloorId++;
  return {
    id,
    type,
    direction: buildDirection,
    name: `${buildDirection === "up" ? "塔楼" : "地底"}${data.label}施工中`,
    status: "construction",
    buildRemaining: data.buildTime,
    buildTotal: data.buildTime,
    rentReady: 0,
  };
}

function finalizeConstruction(floor) {
  const data = FLOOR_TYPES[floor.type];
  if (floor.type === "dwelling") {
    return {
      id: floor.id,
      type: floor.type,
      direction: floor.direction || floorDirectionFromId(floor.id),
      name: pick(data.names),
      status: "open",
      level: 1,
      capacity: data.capacity,
      residents: [],
      rentReady: 0,
      rentTimer: 22,
      rentTotal: 22,
      bonus: 0,
    };
  }
  return {
    id: floor.id,
    type: floor.type,
    direction: floor.direction || floorDirectionFromId(floor.id),
    name: pick(data.names),
    status: "open",
    level: 1,
    workers: [],
    stock: Math.ceil(data.stockMax * 0.3),
    stockMax: data.stockMax,
    production: null,
    saleRemainder: 0,
    foodRushCooldown: FOOD_RUSH_FLOOR_TYPES.includes(floor.type) ? 0 : undefined,
    foodRush: FOOD_RUSH_FLOOR_TYPES.includes(floor.type) ? null : undefined,
    serviceCareCooldown: SERVICE_CARE_FLOOR_TYPES.includes(floor.type) ? 0 : undefined,
    serviceCare: SERVICE_CARE_FLOOR_TYPES.includes(floor.type) ? null : undefined,
    starChartCooldown: STAR_CHART_FLOOR_TYPES.includes(floor.type) ? 0 : undefined,
    starChart: STAR_CHART_FLOOR_TYPES.includes(floor.type) ? null : undefined,
    toolTuneCooldown: TOOL_TUNE_FLOOR_TYPES.includes(floor.type) ? 0 : undefined,
    toolTune: TOOL_TUNE_FLOOR_TYPES.includes(floor.type) ? null : undefined,
    royalMandateCooldown: floor.type === "kingdom" ? 0 : undefined,
    royalMandate: floor.type === "kingdom" ? null : undefined,
    marketCooldown: floor.type === "market" ? 0 : undefined,
    marketParcel: floor.type === "market" ? null : undefined,
    libraryCooldown: floor.type === "library" ? 0 : undefined,
    comfortCooldown: isComfortFloorType(floor.type) ? 0 : undefined,
    comfortSession: isComfortFloorType(floor.type) ? null : undefined,
    comfortAfterglow: isComfortFloorType(floor.type) ? null : undefined,
    showtimeCooldown: isShowtimeFloorType(floor.type) ? 0 : undefined,
    showtime: isShowtimeFloorType(floor.type) ? null : undefined,
    rentReady: 0,
    bonus: 0,
  };
}

function makeResident(game, dreamType = pick(TYPE_ORDER.slice(1))) {
  const skills = {};
  TYPE_ORDER.forEach((type) => {
    skills[type] = type === "dwelling" ? 0 : randInt(1, 9);
  });
  skills[dreamType] = Math.min(9, skills[dreamType] + 2);
  return ensurePersonLife({
    id: game.nextResidentId++,
    name: pick(RESIDENT_NAMES),
    dreamType,
    color: pick(PERSON_COLORS),
    homeFloorId: null,
    workFloorId: null,
    expeditionId: null,
    skills,
  });
}

function makeVisitor(game) {
  const openBusiness = businessFloors(game).filter((floor) => floor.stock > 0 && floor.status === "open");
  const vacantDwelling = dwellingFloors(game).find((floor) => getVacancy(floor) > 0);
  const baseVipChance = game.stats.shoppersServed + game.stats.residentsMoved > 4 ? 0.12 : 0.04;
  const vipChance = Math.min(
    0.36,
    baseVipChance +
      gardenComfortBonus(game) * 0.32 +
      observatoryStarBonus(game) * 0.26 +
      aquariumWonderBonus(game) * 0.3 +
      skyportFlowBonus(game) * 0.24 +
      entertainmentJoyBonus(game) * 0.22 +
      festivalBuzzBonus(game) * 0.3 +
      serviceCareBonus(game) * 0.2 +
      foodWarmthBonus(game) * 0.16 +
      craftToolBonus(game) * 0.15 +
      lobbyDispatchBonus(game) * 0.18 +
      kingdomMandateBonus(game) * 0.16
  );
  let kind = "shopper";

  if (Math.random() < vipChance && game.floors.length > 3) {
    kind = "vip";
  } else if (vacantDwelling && (Math.random() < 0.48 || openBusiness.length === 0)) {
    kind = "resident";
  } else if (openBusiness.length === 0 && vacantDwelling) {
    kind = "resident";
  }

  if (kind === "resident") {
    const dreamType = pick(TYPE_ORDER.slice(1));
    const resident = makeResident(game, dreamType);
    return {
      id: game.nextVisitorId++,
      kind,
      title: pick(VISITOR_TITLES.resident),
      color: resident.color,
      resident,
      lobbyWait: 0,
      targetFloorId: vacantDwelling?.id ?? null,
      wish: vacantDwelling ? formatFloorLabel(vacantDwelling.id) : "住",
    };
  }

  if (kind === "vip") {
    const candidates = game.floors.filter((floor) => floor.id !== 0 && floor.status === "open");
    const target = pick(candidates);
    return {
      id: game.nextVisitorId++,
      kind,
      title: pick(VISITOR_TITLES.vip),
      color: "#f2b84b",
      lobbyWait: 0,
      targetFloorId: target?.id ?? 0,
      wish: target ? formatFloorLabel(target.id) : "★",
      effect: pick(["rush", "coins", "joy", ...(observatoryStarBonus(game) > 0 ? ["stars"] : [])]),
    };
  }

  const target = pickBusinessTarget(openBusiness.length ? openBusiness : businessFloors(game), game);
  return {
    id: game.nextVisitorId++,
    kind,
    title: pick(VISITOR_TITLES.shopper),
    color: pick(PERSON_COLORS),
    lobbyWait: 0,
    targetFloorId: target?.id ?? 0,
    wish: target ? formatFloorLabel(target.id) : "$",
  };
}

function pickBusinessTarget(floors, game = state) {
  if (!floors.length) return null;
  const total = floors.reduce((sum, floor) => sum + businessVisitorWeight(floor, game), 0);
  let roll = Math.random() * total;
  for (const floor of floors) {
    roll -= businessVisitorWeight(floor, game);
    if (roll <= 0) return floor;
  }
  return floors[floors.length - 1];
}

function lobbyWaitSeconds(visitor) {
  return Math.max(0, Number(visitor?.lobbyWait) || 0);
}

function lobbyWaitTier(visitor) {
  const wait = lobbyWaitSeconds(visitor);
  if (wait >= 32) return "urgent";
  if (wait >= 16) return "waiting";
  return "fresh";
}

function lobbyPressureInfo(game = state) {
  const queue = game.queue || [];
  const maxWait = queue.reduce((max, visitor) => Math.max(max, lobbyWaitSeconds(visitor)), 0);
  const ratio = VISITOR_QUEUE_MAX ? queue.length / VISITOR_QUEUE_MAX : 0;
  const pressure = clamp(ratio * 0.72 + Math.min(1, maxWait / 42) * 0.28, 0, 1);
  const tone = pressure >= 0.78 ? "urgent" : pressure >= 0.52 ? "busy" : pressure >= 0.28 ? "steady" : "calm";
  const label = tone === "urgent" ? "压线" : tone === "busy" ? "繁忙" : tone === "steady" ? "稳定" : "顺畅";
  const text = queue.length
    ? `等候 ${queue.length}/${VISITOR_QUEUE_MAX} · 最久 ${Math.floor(maxWait)}s`
    : "大厅空闲";
  return {
    count: queue.length,
    maxWait,
    pressure,
    percent: Math.round(pressure * 100),
    tone,
    label,
    text,
  };
}

function lobbyRouteRank(visitor, index = 0, game = state) {
  const route = visitorRouteInfo(visitor, game);
  return {
    visitor,
    index,
    route,
    score: route.score,
  };
}

function lobbyRankedVisitors(game = state) {
  return (game.queue || [])
    .map((visitor, index) => lobbyRouteRank(visitor, index, game))
    .sort((a, b) => b.score - a.score || a.index - b.index);
}

function isPriorityLobbyDispatch(visitor, game = state) {
  const pressure = lobbyPressureInfo(game);
  return pressure.count >= 3 || pressure.tone === "busy" || pressure.tone === "urgent" || lobbyWaitSeconds(visitor) >= 18 || visitor?.kind === "vip";
}

function visitorRouteInfo(visitor, game = state) {
  const floor = game.floors.find((entry) => entry.id === Number(visitor?.targetFloorId));
  const floorLabel = floor ? formatFloorLabel(floor.id) : visitor?.wish || "?";
  if (!visitor || !floor) {
    return { floor: null, floorLabel, floorName: "未知楼层", ready: false, tone: "warn", text: "目标不明", score: -20 };
  }
  const wait = lobbyWaitSeconds(visitor);
  const waitBonus = Math.min(28, Math.floor(wait / 3));
  const waitText = wait >= 32 ? "久候" : wait >= 16 ? `等候 ${Math.floor(wait)}s` : "";
  const pressureTone = wait >= 32 ? "urgent" : null;

  if (visitor.kind === "resident") {
    const vacancy = floor.type === "dwelling" ? getVacancy(floor) : 0;
    const ready = vacancy > 0;
    return {
      floor,
      floorLabel,
      floorName: floor.name,
      ready,
      tone: pressureTone || (ready ? "ready" : "warn"),
      text: [ready ? `空房 ${vacancy}` : "满员", waitText].filter(Boolean).join(" · "),
      wait,
      score: (ready ? 42 : 2) + vacancy * 2 + waitBonus,
    };
  }

  if (visitor.kind === "vip") {
    return {
      floor,
      floorLabel,
      floorName: floor.name,
      ready: true,
      tone: "vip",
      text: [floor.status === "construction" ? "施工急件" : "贵宾优先", waitText].filter(Boolean).join(" · "),
      wait,
      score: 80 + (floor.status === "construction" ? 8 : 0) + waitBonus,
    };
  }

  if (!isBusiness(floor)) {
    return {
      floor,
      floorLabel,
      floorName: floor.name,
      ready: false,
      tone: "warn",
      text: ["不能消费", waitText].filter(Boolean).join(" · "),
      wait,
      score: 4 + Math.floor(waitBonus / 2),
    };
  }

  const staffed = (floor.workers || []).length > 0;
  const stocked = floor.stock > 0;
  const ready = staffed && stocked;
  const stockRatio = floor.stockMax ? floor.stock / floor.stockMax : 0;
  return {
    floor,
    floorLabel,
    floorName: floor.name,
    ready,
    tone: pressureTone || (ready ? "ready" : "warn"),
    text: [!staffed ? "缺员工" : !stocked ? "缺货" : `库存 ${floor.stock}`, waitText].filter(Boolean).join(" · "),
    wait,
    score: (ready ? 34 : 6) + Math.round(stockRatio * 12) + (visitor.kind === "shopper" ? 2 : 0) + waitBonus,
  };
}

function bestLobbyVisitor(game = state) {
  return lobbyRankedVisitors(game)[0]?.visitor || null;
}

function businessVisitorWeight(floor, game = state) {
  let weight = 1;
  if (floor.type === "food") weight += 0.38 + foodWarmthBonus(game) + Math.max(0, 82 - (game.happiness || 0)) / 300;
  if (floor.type === "craft") weight += 0.4 + craftToolBonus(game);
  if (floor.type === "market") weight += 0.85;
  if (floor.type === "service") weight += 0.42 + serviceCareBonus(game) + (game.queue?.length || 0) / 20;
  if (floor.type === "garden") weight += 0.45 + (100 - (game.happiness || 0)) / 260;
  if (floor.type === "entertainment") weight += 0.5 + entertainmentJoyBonus(game) + Math.max(0, 86 - (game.happiness || 0)) / 260;
  if (floor.type === "library") weight += 0.35 + libraryResearchBonus(game);
  if (floor.type === "observatory") weight += 0.34 + observatoryStarBonus(game);
  if (floor.type === "skyport") weight += 0.74 + skyportFlowBonus(game);
  if (floor.type === "festival") weight += 0.62 + festivalBuzzBonus(game) + Math.max(0, (game.happiness || 0) - 78) / 240;
  if (floor.type === "bathhouse") weight += 0.55 + bathhouseRestBonus(game);
  if (floor.type === "clinic") weight += 0.42 + clinicCareBonus(game);
  if (floor.type === "clockwork") weight += 0.34 + clockworkTempoBonus(game);
  if (floor.type === "aquarium") weight += 0.5 + aquariumWonderBonus(game);
  if (floor.stockMax) weight += Math.min(0.35, floor.stock / floor.stockMax);
  return weight;
}

function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return makeNewGame();
    const loaded = JSON.parse(raw);
    if (!Array.isArray(loaded.floors) || !loaded.elevator) return makeNewGame();
    migrateGame(loaded);
    applyOfflineProgress(loaded);
    return loaded;
  } catch {
    return makeNewGame();
  }
}

function migrateGame(game) {
  const defaultStats = {
    residentsMoved: 0,
    stockOrders: 0,
    shoppersServed: 0,
    floorsBuilt: 0,
    rentCollected: 0,
    vipsServed: 0,
    coinsEarned: 0,
    commissionsDone: 0,
    relicPieces: 0,
    expeditionsDone: 0,
    expeditionReportsDone: 0,
    expeditionWaymarksDone: 0,
    skyFloorsBuilt: 0,
    depthFloorsBuilt: 0,
    dreamJobsFilled: 0,
    lobbyRoutesDone: 0,
    lobbyPriorityDispatchesDone: 0,
    foodFloorsBuilt: 0,
    foodRushesDone: 0,
    foodServingsDone: 0,
    foodRushCoursesDone: 0,
    serviceFloorsBuilt: 0,
    serviceCareSessionsDone: 0,
    serviceCareTouchesDone: 0,
    craftFloorsBuilt: 0,
    toolTuneSessionsDone: 0,
    toolTuneMarksDone: 0,
    marketDealsDone: 0,
    marketParcelsDone: 0,
    marketParcelItemsPacked: 0,
    royalMandatesDone: 0,
    royalCourierReceiptsDone: 0,
    lifeStoriesDone: 0,
    lifeStoryReviewsDone: 0,
    libraryStudiesDone: 0,
    comfortSessionsDone: 0,
    comfortEchoesDone: 0,
    comfortFocusesDone: 0,
    comfortRentFocusesDone: 0,
    comfortExpeditionFocusesDone: 0,
    comfortRecoveryFocusesDone: 0,
    entertainmentShowsDone: 0,
    showtimeReactionsDone: 0,
    entertainmentFloorsBuilt: 0,
    marketFloorsBuilt: 0,
    libraryFloorsBuilt: 0,
    gardenFloorsBuilt: 0,
    observatoryFloorsBuilt: 0,
    starChartCalibrationsDone: 0,
    starChartMarksDone: 0,
    skyportFloorsBuilt: 0,
    bathhouseFloorsBuilt: 0,
    clinicFloorsBuilt: 0,
    clockworkFloorsBuilt: 0,
    aquariumFloorsBuilt: 0,
    festivalFloorsBuilt: 0,
  };
  game.version = Math.max(Number(game.version) || 0, 28);
  game.nextExpeditionId ||= 1;
  game.nextExpeditionReportId ||= 1;
  game.nextLifeStoryId ||= 1;
  game.quests = Array.isArray(game.quests)
    ? game.quests
        .filter((quest) => quest && typeof quest === "object")
        .map((quest) => ({
          id: quest.id,
          claimed: Boolean(quest.claimed),
          ready: Boolean(quest.ready) && !quest.claimed,
        }))
    : QUEST_DEFS.map((quest) => ({ id: quest.id, claimed: false, ready: false }));
  game.stats ||= {};
  Object.keys(defaultStats).forEach((key) => {
    game.stats[key] ||= 0;
  });
  game.spawnTimer = Math.max(Number(game.spawnTimer) || 0, 6.8 + Math.random() * 4.4);
  game.passiveTimer ||= 0;
  game.arrivals = [];
  game.logs ||= [];
  game.logs = game.logs.map((log) => ({
    ...log,
    text: typeof log.text === "string" ? log.text.replace(/\b[FT](\d+)\b/g, "$1") : log.text,
  }));
  game.queue ||= [];
  game.queue.forEach((visitor) => {
    if (visitor && typeof visitor === "object") {
      ensurePersonLife(visitor);
      visitor.lobbyWait = Math.max(0, Number(visitor.lobbyWait) || 0);
      visitor.routeDispatch = Boolean(visitor.routeDispatch);
      visitor.priorityDispatch = Boolean(visitor.priorityDispatch);
      visitor.wish = visitor.targetFloorId !== null && visitor.targetFloorId !== undefined ? formatFloorLabel(visitor.targetFloorId) : visitor.wish;
    }
  });
  game.orders ||= [];
  game.orders = game.orders.map((order) => normalizeOrderLogistics(order));
  game.expeditions = Array.isArray(game.expeditions) ? game.expeditions : [];
  game.expeditionReports = Array.isArray(game.expeditionReports)
    ? game.expeditionReports.map((report) => normalizeExpeditionReport(report)).filter(Boolean).slice(0, 8)
    : [];
  game.nextExpeditionReportId = Math.max(
    game.nextExpeditionReportId || 1,
    ...game.expeditionReports.map((report) => Number(report.id) + 1).filter(Number.isFinite),
    1
  );
  game.lifeStories = Array.isArray(game.lifeStories)
    ? game.lifeStories.map((story) => normalizeLifeStory(story)).filter(Boolean).slice(0, 8)
    : [];
  game.nextLifeStoryId = Math.max(
    game.nextLifeStoryId || 1,
    ...game.lifeStories.map((story) => Number(story.id) + 1).filter(Number.isFinite),
    1
  );
  game.collection ||= makeEmptyCollection();
  game.floors = Array.isArray(game.floors) ? game.floors : [];
  COLLECTION_DEFS.forEach((item) => {
    game.collection[item.id] ||= 0;
  });
  QUEST_DEFS.forEach((quest) => {
    if (!game.quests.some((entry) => entry.id === quest.id)) {
      game.quests.push({ id: quest.id, claimed: false, ready: false });
    }
  });
  game.quests.forEach((questState) => {
    const def = QUEST_DEFS.find((quest) => quest.id === questState.id);
    if (!def || questState.claimed) {
      questState.ready = false;
      return;
    }
    questState.ready = Boolean(questState.ready || (game.stats?.[def.metric] || 0) >= def.goal);
  });
  game.lastSavedAt ||= Date.now();
  game.happiness = clamp(game.happiness ?? 70, 0, 100);
  game.streak ||= 0;
  const storedPassenger = game.elevator?.passenger && typeof game.elevator.passenger === "object" ? game.elevator.passenger : null;
  game.elevator ||= { position: 0, target: null, passenger: null, speed: 0, upgrades: 0 };
  game.elevator.doorTimer ||= 0;
  game.elevator.position = 0;
  game.elevator.target = null;
  game.elevator.passenger =
    storedPassenger && game.floors.some((floor) => floor.id === Number(storedPassenger.targetFloorId))
      ? {
          ...storedPassenger,
          wish:
            storedPassenger.targetFloorId !== null && storedPassenger.targetFloorId !== undefined
              ? formatFloorLabel(storedPassenger.targetFloorId)
              : storedPassenger.wish,
        }
      : null;
  if (game.elevator.passenger) {
    ensurePersonLife(game.elevator.passenger);
    game.queue = game.queue.filter((visitor) => visitor?.id !== game.elevator.passenger.id);
  }
  const positiveIds = [];
  const negativeIds = [];
  game.floors.forEach((floor) => {
    floor.direction ||= floorDirectionFromId(floor.id);
    floor.level ||= 1;
    floor.bonus ||= 0;
    if (floor.id > 0) positiveIds.push(floor.id);
    if (floor.id < 0) negativeIds.push(floor.id);
    if (floor.type === "dwelling") {
      floor.rentTimer ||= 22;
      floor.rentTotal ||= 22;
      floor.rentReady ||= 0;
      floor.residents ||= [];
      floor.residents.forEach((resident) => {
        ensurePersonLife(resident);
        if (!("expeditionId" in resident)) resident.expeditionId = null;
      });
    } else if (floor.type !== "lobby" && floor.status === "open") {
      floor.workers ||= [];
      floor.stock ||= 0;
      floor.stockMax ||= FLOOR_TYPES[floor.type]?.stockMax || 18;
      floor.saleRemainder ||= 0;
      if (FOOD_RUSH_FLOOR_TYPES.includes(floor.type)) {
        floor.foodRushCooldown = Math.max(0, Number(floor.foodRushCooldown) || 0);
        floor.foodRush =
          floor.foodRush && typeof floor.foodRush === "object" && Number(floor.foodRush.remaining) > 0
            ? {
                ...floor.foodRush,
                remaining: Math.max(0, Number(floor.foodRush.remaining) || 0),
                total: Math.max(1, Number(floor.foodRush.total) || Number(floor.foodRush.remaining) || 1),
                participantIds: Array.isArray(floor.foodRush.participantIds)
                  ? floor.foodRush.participantIds.map(Number).filter(Boolean)
                  : [],
                pace: floor.foodRush.pace || "seating",
                heat: clamp(Number(floor.foodRush.heat) || 24, 0, 100),
                served: Math.max(0, Number(floor.foodRush.served) || 0),
                targetServings: Math.max(1, Number(floor.foodRush.targetServings) || 1),
                serviceTimer: Math.max(0, Number(floor.foodRush.serviceTimer) || 0),
                earned: Math.max(0, Number(floor.foodRush.earned) || 0),
                finalRewarded: Boolean(floor.foodRush.finalRewarded),
                courses: Math.max(0, Number(floor.foodRush.courses) || 0),
                course: floor.foodRush.course || "starter",
                servicePulse: clamp(Number(floor.foodRush.servicePulse) || 0, 0, 1),
                tableFocus: Math.max(0, Number(floor.foodRush.tableFocus) || 0),
              }
            : null;
      }
      if (SERVICE_CARE_FLOOR_TYPES.includes(floor.type)) {
        floor.serviceCareCooldown = Math.max(0, Number(floor.serviceCareCooldown) || 0);
        floor.serviceCare =
          floor.serviceCare && typeof floor.serviceCare === "object" && Number(floor.serviceCare.remaining) > 0
            ? {
                ...floor.serviceCare,
                remaining: Math.max(0, Number(floor.serviceCare.remaining) || 0),
                total: Math.max(1, Number(floor.serviceCare.total) || Number(floor.serviceCare.remaining) || 1),
                participantIds: Array.isArray(floor.serviceCare.participantIds)
                  ? floor.serviceCare.participantIds.map(Number).filter(Boolean)
                  : [],
                phase: floor.serviceCare.phase || "greet",
                care: clamp(Number(floor.serviceCare.care) || 24, 0, 100),
                touches: Math.max(0, Number(floor.serviceCare.touches) || 0),
                targetTouches: Math.max(1, Number(floor.serviceCare.targetTouches) || 1),
                touchTimer: Math.max(0, Number(floor.serviceCare.touchTimer) || 0),
                earned: Math.max(0, Number(floor.serviceCare.earned) || 0),
                finalRewarded: Boolean(floor.serviceCare.finalRewarded),
                carePulse: clamp(Number(floor.serviceCare.carePulse) || 0, 0, 1),
                focusGuest: Math.max(0, Number(floor.serviceCare.focusGuest) || 0),
              }
            : null;
      }
      if (STAR_CHART_FLOOR_TYPES.includes(floor.type)) {
        floor.starChartCooldown = Math.max(0, Number(floor.starChartCooldown) || 0);
        floor.starChart =
          floor.starChart && typeof floor.starChart === "object" && Number(floor.starChart.remaining) > 0
            ? {
                ...floor.starChart,
                remaining: Math.max(0, Number(floor.starChart.remaining) || 0),
                total: Math.max(1, Number(floor.starChart.total) || Number(floor.starChart.remaining) || 1),
                participantIds: Array.isArray(floor.starChart.participantIds)
                  ? floor.starChart.participantIds.map(Number).filter(Boolean)
                  : [],
                phase: floor.starChart.phase || "align",
                focus: clamp(Number(floor.starChart.focus) || 24, 0, 100),
                marks: Math.max(0, Number(floor.starChart.marks) || 0),
                targetMarks: Math.max(1, Number(floor.starChart.targetMarks) || 1),
                markTimer: Math.max(0, Number(floor.starChart.markTimer) || 0),
                earned: Math.max(0, Number(floor.starChart.earned) || 0),
                finalRewarded: Boolean(floor.starChart.finalRewarded),
                starPulse: clamp(Number(floor.starChart.starPulse) || 0, 0, 1),
                focusStar: Math.max(0, Number(floor.starChart.focusStar) || 0),
              }
            : null;
      }
      if (TOOL_TUNE_FLOOR_TYPES.includes(floor.type)) {
        floor.toolTuneCooldown = Math.max(0, Number(floor.toolTuneCooldown) || 0);
        floor.toolTune =
          floor.toolTune && typeof floor.toolTune === "object" && Number(floor.toolTune.remaining) > 0
            ? {
                ...floor.toolTune,
                remaining: Math.max(0, Number(floor.toolTune.remaining) || 0),
                total: Math.max(1, Number(floor.toolTune.total) || Number(floor.toolTune.remaining) || 1),
                participantIds: Array.isArray(floor.toolTune.participantIds)
                  ? floor.toolTune.participantIds.map(Number).filter(Boolean)
                  : [],
                phase: floor.toolTune.phase || "sort",
                precision: clamp(Number(floor.toolTune.precision) || 24, 0, 100),
                marks: Math.max(0, Number(floor.toolTune.marks) || 0),
                targetMarks: Math.max(1, Number(floor.toolTune.targetMarks) || 1),
                markTimer: Math.max(0, Number(floor.toolTune.markTimer) || 0),
                earned: Math.max(0, Number(floor.toolTune.earned) || 0),
                finalRewarded: Boolean(floor.toolTune.finalRewarded),
                toolPulse: clamp(Number(floor.toolTune.toolPulse) || 0, 0, 1),
                focusTool: Math.max(0, Number(floor.toolTune.focusTool) || 0),
              }
            : null;
      }
      if (floor.type === "market") {
        floor.marketCooldown = Math.max(0, Number(floor.marketCooldown) || 0);
        floor.marketParcel =
          floor.marketParcel && typeof floor.marketParcel === "object" && Number(floor.marketParcel.remaining) > 0
            ? {
                ...floor.marketParcel,
                remaining: Math.max(0, Number(floor.marketParcel.remaining) || 0),
                total: Math.max(1, Number(floor.marketParcel.total) || Number(floor.marketParcel.remaining) || 1),
                pulseTimer: Math.max(0, Number(floor.marketParcel.pulseTimer) || 0),
                packed: Math.max(0, Number(floor.marketParcel.packed) || 0),
                earned: Math.max(0, Number(floor.marketParcel.earned) || 0),
                phase: floor.marketParcel.phase || "quote",
              }
            : null;
      }
      if (floor.type === "kingdom") {
        floor.royalMandateCooldown = Math.max(0, Number(floor.royalMandateCooldown) || 0);
        floor.royalMandate =
          floor.royalMandate && typeof floor.royalMandate === "object" && Number(floor.royalMandate.remaining) > 0
            ? {
                ...floor.royalMandate,
                remaining: Math.max(0, Number(floor.royalMandate.remaining) || 0),
                total: Math.max(1, Number(floor.royalMandate.total) || Number(floor.royalMandate.remaining) || 1),
                pulseTimer: Math.max(0, Number(floor.royalMandate.pulseTimer) || 0),
                prepared: Math.max(0, Number(floor.royalMandate.prepared) || 0),
                earned: Math.max(0, Number(floor.royalMandate.earned) || 0),
                receiptBonus: Math.max(0, Number(floor.royalMandate.receiptBonus) || 0),
                courierProgress: clamp(Number(floor.royalMandate.courierProgress) || 0, 0, 1),
                courierPhase: floor.royalMandate.courierPhase || "desk",
                routeLabel: floor.royalMandate.routeLabel || "",
                phase: floor.royalMandate.phase || "draft",
              }
            : null;
      }
      if (floor.type === "library") floor.libraryCooldown = Math.max(0, Number(floor.libraryCooldown) || 0);
      if (isComfortFloorType(floor.type)) {
        floor.comfortCooldown = Math.max(0, Number(floor.comfortCooldown) || 0);
        floor.comfortSession =
          floor.comfortSession && typeof floor.comfortSession === "object" && Number(floor.comfortSession.remaining) > 0
            ? {
                ...floor.comfortSession,
                remaining: Math.max(0, Number(floor.comfortSession.remaining) || 0),
                total: Math.max(1, Number(floor.comfortSession.total) || Number(floor.comfortSession.remaining) || 1),
                participantIds: Array.isArray(floor.comfortSession.participantIds)
                  ? floor.comfortSession.participantIds.map(Number).filter(Boolean)
                  : [],
              }
            : null;
        floor.comfortAfterglow = normalizeComfortAfterglow(floor.comfortAfterglow, floor);
      }
      if (isShowtimeFloorType(floor.type)) {
        floor.showtimeCooldown = Math.max(0, Number(floor.showtimeCooldown) || 0);
        floor.showtime =
          floor.showtime && typeof floor.showtime === "object" && Number(floor.showtime.remaining) > 0
            ? {
                ...floor.showtime,
                remaining: Math.max(0, Number(floor.showtime.remaining) || 0),
                total: Math.max(1, Number(floor.showtime.total) || Number(floor.showtime.remaining) || 1),
                participantIds: Array.isArray(floor.showtime.participantIds)
                  ? floor.showtime.participantIds.map(Number).filter(Boolean)
                  : [],
                beat: floor.showtime.beat || "opening",
                heat: clamp(Number(floor.showtime.heat) || 28, 0, 100),
                reactions: Math.max(0, Number(floor.showtime.reactions) || 0),
                reactionTimer: Math.max(0, Number(floor.showtime.reactionTimer) || 0),
                earned: Math.max(0, Number(floor.showtime.earned) || 0),
                finalRewarded: Boolean(floor.showtime.finalRewarded),
              }
            : null;
      }
    }
  });
  game.stats.entertainmentFloorsBuilt = Math.max(
    game.stats.entertainmentFloorsBuilt || 0,
    businessFloors(game).filter((floor) => floor.type === "entertainment").length
  );
  game.stats.serviceFloorsBuilt = Math.max(
    game.stats.serviceFloorsBuilt || 0,
    businessFloors(game).filter((floor) => floor.type === "service").length
  );
  game.stats.foodFloorsBuilt = Math.max(
    game.stats.foodFloorsBuilt || 0,
    businessFloors(game).filter((floor) => floor.type === "food").length
  );
  game.stats.craftFloorsBuilt = Math.max(
    game.stats.craftFloorsBuilt || 0,
    businessFloors(game).filter((floor) => floor.type === "craft").length
  );
  game.nextFloorId = Math.max(game.nextFloorId || 0, (positiveIds.length ? Math.max(...positiveIds) + 1 : 1));
  game.nextSkyFloorId = Math.min(game.nextSkyFloorId ?? -1, (negativeIds.length ? Math.min(...negativeIds) - 1 : -1));
  game.elevator.position = clamp(Math.round(game.elevator.position ?? 0), getMinFloorId(game), getMaxFloorId(game));
  if (game.elevator.target !== null) {
    game.elevator.target = clamp(Math.round(game.elevator.target), getMinFloorId(game), getMaxFloorId(game));
  }
  if (game.selectedFloorId === undefined || game.selectedFloorId === null) game.selectedFloorId = 0;
  reconcileExpeditions(game);
  ensureOrders(game);
}

function applyOfflineProgress(game) {
  const elapsed = Math.min(21600, Math.max(0, (Date.now() - game.lastSavedAt) / 1000));
  advanceOfflineExpeditions(game, elapsed);
  if (elapsed < 45) return;
  let income = 0;
  let stockedOut = 0;
  const offlineBuildSpeed = 0.45 * (1 + clockworkTempoBonus(game) * 0.72 + craftToolBonus(game) * 0.38);

  game.floors.forEach((floor) => {
    if (floor.status === "construction") {
      floor.buildRemaining = Math.max(0, floor.buildRemaining - elapsed * offlineBuildSpeed);
      return;
    }
    if (isComfortFloorType(floor.type)) {
      floor.comfortCooldown = Math.max(0, (floor.comfortCooldown || 0) - elapsed * (1 + clockworkTempoBonus(game) * 0.12));
      if (floor.comfortSession) {
        floor.comfortSession.remaining = Math.max(0, Number(floor.comfortSession.remaining || 0) - elapsed);
        if (floor.comfortSession.remaining <= 0) {
          floor.comfortSession = null;
        }
      }
      if (floor.comfortAfterglow) {
        floor.comfortAfterglow.remaining = Math.max(0, Number(floor.comfortAfterglow.remaining || 0) - elapsed);
        if (floor.comfortAfterglow.remaining <= 0) {
          floor.comfortAfterglow = null;
        }
      }
    }
    if (FOOD_RUSH_FLOOR_TYPES.includes(floor.type)) {
      floor.foodRushCooldown = Math.max(0, (floor.foodRushCooldown || 0) - elapsed * (1 + clockworkTempoBonus(game) * 0.14));
      if (floor.foodRush) {
        floor.foodRush.remaining = Math.max(0, Number(floor.foodRush.remaining || 0) - elapsed);
        if (floor.foodRush.remaining <= 0) {
          floor.foodRush = null;
        }
      }
    }
    if (STAR_CHART_FLOOR_TYPES.includes(floor.type)) {
      floor.starChartCooldown = Math.max(0, (floor.starChartCooldown || 0) - elapsed * (1 + clockworkTempoBonus(game) * 0.14));
      if (floor.starChart) {
        floor.starChart.remaining = Math.max(0, Number(floor.starChart.remaining || 0) - elapsed);
        if (floor.starChart.remaining <= 0) {
          floor.starChart = null;
        }
      }
    }
    if (floor.type === "dwelling") {
      const cycles = Math.floor((elapsed + (floor.rentTotal - floor.rentTimer)) / floor.rentTotal);
      if (cycles > 0) {
        const rent = cycles * Math.max(8, Math.round(floor.residents.length * (9 + floor.level * 2) * (1 + dwellingJourneyBonus(game) * 0.3 + comfortRentEchoBonus(game)) + floor.bonus));
        floor.rentReady = Math.min(360, (floor.rentReady || 0) + rent);
        floor.rentTimer = floor.rentTotal;
      }
      return;
    }
    if (!isOfflineBusiness(floor) || floor.stock <= 0 || floor.workers.length === 0) return;
    const skill = offlineAverageSkill(game, floor.workers, floor.type);
    const sold = Math.min(floor.stock, Math.floor((0.035 + skill * 0.008 + game.happiness * 0.00035) * elapsed));
    if (sold <= 0) return;
    floor.stock -= sold;
    stockedOut += floor.stock === 0 ? 1 : 0;
    income += Math.round(sold * (FLOOR_TYPES[floor.type].price + floor.level - 1) * businessIncomeMultiplier(floor, game));
  });

  if (income > 0) {
    game.coins += income;
    game.stats.coinsEarned += income;
    game.logs.unshift(makeLog(game, `离线期间营业收入 ${income} 金币${stockedOut ? `，${stockedOut} 个楼层售罄` : ""}。`));
    game.logs = game.logs.slice(0, 24);
  }
}

function saveGame(show = false) {
  state.lastSavedAt = Date.now();
  localStorage.setItem(SAVE_KEY, JSON.stringify({ ...state, arrivals: [] }));
  if (show) showToast("进度已保存");
}

function resetGame() {
  if (!confirm("重置后会清空当前迪迪王国，确定吗？")) return;
  localStorage.removeItem(SAVE_KEY);
  state = makeNewGame();
  render(true);
  showToast("新的迪迪王国已经开张");
}

function update(dt) {
  updateElevator(dt);
  updateLifeVisits(dt);
  updateLifeStories(dt);
  updateExpeditionReports(dt);
  updatePersonActivities(dt);
  updateFloorArrivals(dt);
  updateTimers(dt);
  updateVisitors(dt);
  updatePassiveEconomy(dt);
  updateOrders(dt);
  updateExpeditions(dt);
  checkQuests();
  autosaveTimer += dt;
  if (autosaveTimer > 8) {
    autosaveTimer = 0;
    saveGame(false);
  }
}

function updateElevator(dt) {
  const elevator = state.elevator;
  if ((elevator.doorTimer || 0) > 0) {
    elevator.doorTimer = Math.max(0, elevator.doorTimer - dt);
  }
  if (elevator.target === null) return;
  if (Number(elevator.target) === Number(elevator.position)) {
    elevator.position = Number(elevator.target);
    elevator.target = null;
    if (elevator.passenger && !(elevator.doorTimer > 0)) {
      elevator.doorTimer = elevatorDoorDelay(elevator.position);
    }
    return;
  }
  const direction = Math.sign(elevator.target - elevator.position);
  elevator.position += direction * elevator.speed * dt;
  if (
    (direction > 0 && elevator.position >= elevator.target) ||
    (direction < 0 && elevator.position <= elevator.target)
  ) {
    elevator.position = elevator.target;
    elevator.target = null;
    if (elevator.passenger) {
      elevator.doorTimer = elevatorDoorDelay(elevator.position);
    }
  }
}

function elevatorDoorDelay(floorId) {
  const distance = Math.abs(Number(floorId) || 0);
  const upgradeEase = (state.elevator?.upgrades || 0) * 0.08;
  const serviceEase = serviceCareBonus(state) * 0.55;
  const lobbyEase = lobbyDispatchBonus(state) * 0.3;
  return clamp(0.55 + distance * 0.04 - upgradeEase - serviceEase - lobbyEase, 0.42, 1.15);
}

function updateFloorArrivals(dt) {
  if (!Array.isArray(state.arrivals) || !state.arrivals.length) return;
  const before = state.arrivals.length;
  state.arrivals = state.arrivals
    .map((arrival) => ({ ...arrival, remaining: (arrival.remaining || 0) - dt }))
    .filter((arrival) => arrival.remaining > 0);
  if (state.arrivals.length !== before) {
    lastKingdomKey = "";
  }
}

function updateLifeVisits(dt) {
  let changed = false;
  allResidents(state).forEach((person) => {
    ensurePersonLife(person);
    person.lifeVisitCooldown = Math.max(0, Number(person.lifeVisitCooldown || 0) - dt);
    person.routineCooldown = Math.max(0, Number(person.routineCooldown || 0) - dt);
    if (person.expeditionId) {
      changed = endLifeVisit(person, { record: false }) || changed;
      return;
    }
    if (isActiveLifeVisit(person)) {
      const visit = person.lifeVisit;
      const floor = findFloor(visit.floorId);
      if (!floor || floor.status !== "open") {
        changed = endLifeVisit(person, { record: false }) || changed;
        return;
      }
      visit.remaining = Math.max(0, Number(visit.remaining || 0) - dt);
      person.need = visit.need;
      person.lifeWish = lifeVisitProgressLabel(person);
      const targetValue = Number(person.motives?.[visit.need] || 0);
      const elapsed = Number(visit.total || 0) - Number(visit.remaining || 0);
      const minimumStay =
        Number(visit.minStay || 0) ||
        (visit.reason === "showtime"
          ? 20
          : visit.reason === "foodRush"
            ? 14
            : visit.reason === "companion"
              ? 6
              : visit.reason === "comfort"
                ? 10
                : 0);
      const minimumStayDone = elapsed > minimumStay;
      const targetGoal =
        Number(visit.targetGoal || 0) ||
        (visit.reason === "showtime"
          ? 96
          : visit.reason === "foodRush"
            ? 92
            : visit.reason === "companion"
              ? 86
              : visit.reason === "comfort"
                ? 88
                : 78);
      if ((targetValue >= targetGoal && minimumStayDone) || visit.remaining <= 0) {
        changed = endLifeVisit(person, { outcome: targetValue >= targetGoal ? "fulfilled" : "settled" }) || changed;
      }
      return;
    }
    if (person.lifeVisit) {
      changed = endLifeVisit(person, { record: false }) || changed;
    }
    if (person.lifeVisitCooldown > 0 || person.socialPartnerId) return;
    const currentFloor = currentFloorForPerson(person);
    const floorType = currentFloor?.type || "dwelling";
    const urgentNeed = dominantNeedForPerson(person, floorType);
    const urgentScore = personNeedUrgency(person, urgentNeed);
    const preferenceReady = person.routineCooldown <= 0 && Math.random() < dt * 0.045;
    const shouldGo = urgentScore > 0.42 || (preferenceReady && Math.random() < 0.42);
    if (!shouldGo) return;
    const need = urgentScore > 0.28 ? urgentNeed : pick(["social", "entertainment", "energy"]);
    const target = chooseLifeVisitTarget(person, need, currentFloor);
    if (!target) return;
    changed = startLifeVisit(person, target, need) || changed;
  });
  if (changed) lastKingdomKey = "";
}

function updatePersonActivities(dt) {
  let changed = false;
  state.queue.forEach((visitor) => {
    changed = updateSinglePersonActivity(visitor, "lobby", dt) || changed;
  });
  changed = updateSocialActivities(state.queue, "lobby", dt, "lobby") || changed;
  if (state.elevator.passenger) {
    changed = updateSinglePersonActivity(state.elevator.passenger, "elevator", dt) || changed;
  }
  state.floors.forEach((floor) => {
    if (floor.type === "dwelling") {
      const residents = floorPeopleForLife(floor);
      residents.forEach((resident) => {
        changed = updateSinglePersonActivity(resident, floor.type, dt) || changed;
      });
      changed = updateSocialActivities(residents, floor.type, dt, floorSocialScope(floor)) || changed;
      return;
    }
    if (isBusiness(floor)) {
      const workers = floorPeopleForLife(floor);
      workers.forEach((resident) => {
        changed = updateSinglePersonActivity(resident, floor.type, dt) || changed;
      });
      changed = updateSocialActivities(workers, floor.type, dt, floorSocialScope(floor)) || changed;
    }
  });
  if (changed) lastKingdomKey = "";
}

function ensurePersonLife(person) {
  if (!person || typeof person !== "object") return person;
  if (!person.motives || typeof person.motives !== "object" || Array.isArray(person.motives)) {
    person.motives = {};
  }
  PERSON_MOTIVE_KEYS.forEach((key) => {
    const current = Number(person.motives[key]);
    person.motives[key] = Number.isFinite(current)
      ? clamp(current, 0, 100)
      : clamp((PERSON_MOTIVE_DEFAULTS[key] || 70) + randFloat(-10, 10), 28, 96);
  });
  if (!person.relationships || typeof person.relationships !== "object" || Array.isArray(person.relationships)) {
    person.relationships = {};
  }
  if (person.id && person.relationships[person.id]) delete person.relationships[person.id];
  if (!PERSON_MOTIVE_KEYS.includes(person.need)) {
    person.need = "social";
  }
  person.favoriteTypes = normalizePersonFavoriteTypes(person);
  if (person.lifeVisit && typeof person.lifeVisit !== "object") person.lifeVisit = null;
  if (person.lifeVisit) {
    person.lifeVisit.floorId = Number(person.lifeVisit.floorId);
    person.lifeVisit.remaining = Math.max(0, Number(person.lifeVisit.remaining) || 0);
    person.lifeVisit.total = Math.max(1, Number(person.lifeVisit.total) || person.lifeVisit.remaining || 1);
    person.lifeVisit.need = PERSON_MOTIVE_KEYS.includes(person.lifeVisit.need) ? person.lifeVisit.need : person.need;
    person.lifeVisit.floorType = person.lifeVisit.floorType || "default";
    person.lifeVisit.originFloorId = Number.isFinite(Number(person.lifeVisit.originFloorId)) ? Number(person.lifeVisit.originFloorId) : null;
    person.lifeVisit.originFloorType = person.lifeVisit.originFloorType || "";
    person.lifeVisit.label = person.lifeVisit.label || lifeVisitLabel(person.lifeVisit.need);
    person.lifeVisit.companionId = Number(person.lifeVisit.companionId) || null;
    person.lifeVisit.reason = person.lifeVisit.reason || "need";
    person.lifeVisit.sessionId = person.lifeVisit.sessionId || "";
    person.lifeVisit.minStay = Math.max(0, Number(person.lifeVisit.minStay) || 0);
    person.lifeVisit.targetGoal = clamp(Number(person.lifeVisit.targetGoal) || 0, 0, 100);
    person.lifeVisit.trailId = person.lifeVisit.trailId || `life-${person.id || "guest"}-${Date.now()}`;
    person.lifeVisit.startMotive = clamp(Number(person.lifeVisit.startMotive ?? person.motives?.[person.lifeVisit.need] ?? 0), 0, 100);
  }
  if (person.comfortMemory && typeof person.comfortMemory !== "object") person.comfortMemory = null;
  if (person.comfortMemory) {
    const type = isComfortFloorType(person.comfortMemory.type) ? person.comfortMemory.type : "garden";
    const remaining = Math.max(0, Number(person.comfortMemory.remaining) || 0);
    if (remaining <= 0) {
      delete person.comfortMemory;
    } else {
      person.comfortMemory = {
        id: person.comfortMemory.id || `comfort-memory-${person.id || "resident"}-${Date.now()}`,
        type,
        label: person.comfortMemory.label || COMFORT_AFTERGLOW_LABELS[type] || "舒缓余韵",
        sourceFloorId: Number.isFinite(Number(person.comfortMemory.sourceFloorId)) ? Number(person.comfortMemory.sourceFloorId) : null,
        remaining,
        total: Math.max(1, Number(person.comfortMemory.total) || remaining || 1),
        power: clamp(Number(person.comfortMemory.power) || 0.08, 0, 0.24),
        expeditionBonus: clamp(Number(person.comfortMemory.expeditionBonus) || 0.04, 0, 0.18),
      };
    }
  }
  person.needTimer = Number.isFinite(Number(person.needTimer)) ? Math.max(0, Number(person.needTimer)) : randFloat(5, 13);
  person.socialCooldown = Math.max(0, Number(person.socialCooldown) || 0);
  person.routineCooldown = Math.max(0, Number(person.routineCooldown) || 0);
  person.lifeVisitCooldown = Math.max(0, Number(person.lifeVisitCooldown) || 0);
  person.needIntensity = clamp((72 - Number(person.motives[person.need] || 70)) / 72, 0, 1);
  return person;
}

function normalizePersonFavoriteTypes(person) {
  if (Array.isArray(person.favoriteTypes)) {
    const saved = person.favoriteTypes.filter((type) => FLOOR_TYPES[type]);
    if (saved.length >= 2) return Array.from(new Set(saved)).slice(0, 3);
  }
  const palette = {
    food: ["food", "market", "festival"],
    entertainment: ["entertainment", "festival", "aquarium"],
    social: ["garden", "market", "service"],
    energy: ["bathhouse", "clinic", "garden"],
  };
  const dreamType = FLOOR_TYPES[person.dreamType] && person.dreamType !== "dwelling" ? person.dreamType : "";
  const primary = palette[person.need] || palette.social;
  const fallback = TYPE_ORDER.filter((type) => type !== "dwelling");
  const offset = Math.abs(Number(person.id) || 0) % fallback.length;
  const rotated = fallback.slice(offset).concat(fallback.slice(0, offset));
  return Array.from(new Set([dreamType, ...primary, ...rotated])).filter((type) => FLOOR_TYPES[type]).slice(0, 3);
}

function isActiveLifeVisit(person) {
  return Boolean(person?.lifeVisit && Number(person.lifeVisit.remaining) > 0 && Number.isFinite(Number(person.lifeVisit.floorId)));
}

function lifeVisitLabel(need = "social") {
  return LIFE_VISIT_LABELS[need] || "去转一圈";
}

function lifeVisitProgressLabel(person) {
  const visit = person?.lifeVisit;
  if (!visit) return "";
  const floor = findFloor(visit.floorId);
  const label = PERSON_NEED_LABELS[visit.need] || "生活";
  const companion = visit.companionId ? getResident(Number(visit.companionId)) : null;
  const companionText = companion ? `，和${companion.name}` : "";
  return `${visit.label || lifeVisitLabel(visit.need)}${companionText}：${floor?.name || "附近楼层"}满足${label}`;
}

function currentFloorForPerson(person) {
  if (!person || person.expeditionId) return null;
  if (isActiveLifeVisit(person)) return findFloor(person.lifeVisit.floorId);
  if (person.workFloorId) return findFloor(person.workFloorId);
  if (person.homeFloorId !== null && person.homeFloorId !== undefined) return findFloor(person.homeFloorId);
  return null;
}

function personIsAwayFromFloor(person, floorId) {
  return isActiveLifeVisit(person) && Number(person.lifeVisit.floorId) !== Number(floorId);
}

function floorPeopleForLife(floor) {
  if (!floor || floor.status !== "open") return [];
  const base =
    floor.type === "dwelling"
      ? (floor.residents || []).map((resident) => getResident(resident.id)).filter(Boolean)
      : isBusiness(floor)
        ? (floor.workers || []).map((id) => getResident(id)).filter(Boolean)
        : [];
  const visitors = allResidents(state).filter((person) => {
    if (!person || person.expeditionId || !isActiveLifeVisit(person)) return false;
    return Number(person.lifeVisit.floorId) === Number(floor.id);
  });
  const seen = new Set();
  return [...base, ...visitors]
    .filter((person) => person && !person.expeditionId && !personIsAwayFromFloor(person, floor.id))
    .filter((person) => {
      if (seen.has(person.id)) return false;
      seen.add(person.id);
      return true;
    });
}

function chooseLifeVisitTarget(person, need, currentFloor = null) {
  ensurePersonLife(person);
  const desiredTypes = Array.from(new Set([...(NEED_VISIT_TYPES[need] || []), ...(person.favoriteTypes || [])]));
  const floors = state.floors.filter((floor) => {
    if (!floor || floor.status !== "open" || floor.type === "lobby") return false;
    if (Number(floor.id) === Number(currentFloor?.id)) return false;
    if (!desiredTypes.includes(floor.type)) return false;
    if (isBusiness(floor) && floor.stockMax && floor.stock <= 0 && need !== "social") return false;
    return true;
  });
  if (!floors.length) return null;
  return floors
    .map((floor) => {
      const typeMatch = (NEED_VISIT_TYPES[need] || []).includes(floor.type) ? 4 : 0;
      const favorite = (person.favoriteTypes || []).includes(floor.type) ? 2.4 : 0;
      const home = floor.type === "dwelling" && Number(floor.id) === Number(person.homeFloorId) ? 2 : 0;
      const dream = floor.type === person.dreamType ? 1.1 : 0;
      const stocked = isBusiness(floor) && floor.stockMax ? clamp(floor.stock / floor.stockMax, 0, 1.2) : 0.5;
      const distance = currentFloor ? Math.abs(Number(floor.id) - Number(currentFloor.id)) * 0.08 : 0;
      return { floor, score: typeMatch + favorite + home + dream + stocked - distance + Math.random() };
    })
    .sort((a, b) => b.score - a.score)[0]?.floor || null;
}

function startLifeVisit(person, floor, need = "social", options = {}) {
  if (!person || !floor || person.expeditionId) return false;
  const previous = personLifeKey(person);
  const origin = currentFloorForPerson(person);
  const originFloorId = options.originFloorId !== undefined ? Number(options.originFloorId) : origin ? Number(origin.id) : null;
  endSocialForPerson(person);
  const duration = Math.max(8, Number(options.duration) || randFloat(16, 32));
  const activity = pick(LIFE_VISIT_ACTIVITIES[need] || NEED_ACTIVITY_POOL[need] || ["stroll"]);
  person.lifeVisit = {
    floorId: floor.id,
    floorType: floor.type,
    originFloorId: Number.isFinite(originFloorId) ? originFloorId : null,
    originFloorType: options.originFloorType || origin?.type || "",
    need,
    label: options.label || lifeVisitLabel(need),
    remaining: duration,
    total: duration,
    companionId: Number(options.companionId) || null,
    reason: options.reason || "need",
    sessionId: options.sessionId || "",
    minStay: Math.max(0, Number(options.minStay) || 0),
    targetGoal: clamp(Number(options.targetGoal) || 0, 0, 100),
    trailId: options.trailId || `life-${person.id}-${Date.now()}-${randInt(10, 99)}`,
    startMotive: clamp(Number(options.startMotive ?? person.motives?.[need] ?? 0), 0, 100),
  };
  person.lifeVisitCooldown = randFloat(42, 72);
  person.routineCooldown = randFloat(34, 58);
  person.need = need;
  person.needTimer = Math.max(person.needTimer || 0, duration);
  person.activity = activity;
  person.activityTimer = randFloat(8, 14);
  person.activityDelay = randFloat(-1.8, 0).toFixed(2);
  assignPersonMotion(person, floor.type, activity);
  person.lifeWish = lifeVisitProgressLabel(person);
  const invited = options.allowCompanion === false ? false : maybeInviteLifeCompanion(person, floor, need);
  if (invited) person.lifeWish = lifeVisitProgressLabel(person);
  return invited || previous !== personLifeKey(person);
}

function maybeInviteLifeCompanion(person, floor, need = "social") {
  if (!person?.lifeVisit || !floor || need === "energy" && Math.random() < 0.58) return false;
  const socialPull = need === "social" || personNeedUrgency(person, "social") > 0.24;
  const sharedFun = need === "food" || need === "entertainment";
  if (!socialPull && !sharedFun && Math.random() < 0.7) return false;
  const companion = chooseLifeVisitCompanion(person, floor, need);
  if (!companion) return false;
  const companionLabel = LIFE_COMPANION_LABELS[need] || lifeVisitLabel(need);
  person.lifeVisit.label = companionLabel;
  person.lifeVisit.companionId = companion.id;
  bumpRelationship(person, companion, { kind: "outing", need }, 3);
  const changed = startLifeVisit(companion, floor, need, {
    allowCompanion: false,
    companionId: person.id,
    label: companionLabel,
    reason: "companion",
  });
  bumpRelationship(companion, person, { kind: "outing", need }, 3);
  if (changed && Math.random() < 0.28) {
    addLog(`${person.name} 约上 ${companion.name} 去${FLOOR_TYPES[floor.type]?.label || "附近"}。`);
  }
  return changed;
}

function chooseLifeVisitCompanion(person, floor, need = "social") {
  ensurePersonLife(person);
  const currentFloor = currentFloorForPerson(person);
  const options = allResidents(state).filter((candidate) => {
    if (!candidate || candidate.id === person.id || candidate.expeditionId || candidate.socialPartnerId) return false;
    if (isActiveLifeVisit(candidate)) return false;
    ensurePersonLife(candidate);
    if (candidate.lifeVisitCooldown > 12 && relationshipScore(person, candidate) < 22) return false;
    const candidateFloor = currentFloorForPerson(candidate);
    if (!candidateFloor || candidateFloor.status !== "open") return false;
    return true;
  });
  if (!options.length) return null;
  const chosen = options
    .map((candidate) => {
      const candidateFloor = currentFloorForPerson(candidate);
      const familiar = relationshipScore(person, candidate) / 13;
      const sameHome = Number(candidate.homeFloorId) === Number(person.homeFloorId) ? 1.4 : 0;
      const sameRoom = currentFloor && candidateFloor && Number(candidateFloor.id) === Number(currentFloor.id) ? 2 : 0;
      const sameNeed = candidate.need === need ? 2.2 : 0;
      const needHelp = personNeedUrgency(candidate, need) * 2.8;
      const favorite = (candidate.favoriteTypes || []).includes(floor.type) ? 1.2 : 0;
      const idle = !candidate.workFloorId ? 0.8 : 0;
      const distance = candidateFloor ? Math.abs(Number(candidateFloor.id) - Number(floor.id)) * 0.06 : 0;
      return { candidate, score: familiar + sameHome + sameRoom + sameNeed + needHelp + favorite + idle - distance + Math.random() };
    })
    .sort((a, b) => b.score - a.score)[0];
  if (!chosen || chosen.score < 2.15) return null;
  return chosen.candidate;
}

function endLifeVisit(person, options = {}) {
  if (!person?.lifeVisit) return false;
  const visit = person.lifeVisit;
  const companion = visit.companionId ? getResident(Number(visit.companionId)) : null;
  if (options.record !== false) recordLifeStory(person, visit, options);
  delete person.lifeVisit;
  person.activityTimer = 0;
  person.lifeVisitCooldown = Math.max(Number(person.lifeVisitCooldown) || 0, randFloat(22, 44));
  person.lifeWish = personLifeWish(person, currentFloorForPerson(person)?.type || "dwelling");
  if (companion?.lifeVisit && Number(companion.lifeVisit.companionId) === Number(person.id)) {
    companion.lifeVisit.companionId = null;
    companion.lifeWish = lifeVisitProgressLabel(companion);
  }
  const home = currentFloorForPerson(person);
  if (home) assignPersonMotion(person, home.type, person.activity || "stroll");
  return Boolean(visit);
}

function normalizeLifeStory(story) {
  if (!story || typeof story !== "object") return null;
  const need = PERSON_MOTIVE_KEYS.includes(story.need) ? story.need : "social";
  return {
    id: Number(story.id) || 0,
    personId: Number(story.personId) || 0,
    personName: typeof story.personName === "string" ? story.personName.slice(0, 28) : "居民",
    companionId: Number(story.companionId) || null,
    companionName: typeof story.companionName === "string" ? story.companionName.slice(0, 28) : "",
    need,
    floorId: Number.isFinite(Number(story.floorId)) ? Number(story.floorId) : null,
    floorType: FLOOR_TYPES[story.floorType] ? story.floorType : "default",
    fromFloorId: Number.isFinite(Number(story.fromFloorId)) ? Number(story.fromFloorId) : null,
    fromFloorType: FLOOR_TYPES[story.fromFloorType] ? story.fromFloorType : "",
    label: typeof story.label === "string" ? story.label.slice(0, 34) : lifeVisitLabel(need),
    title: typeof story.title === "string" ? story.title.slice(0, 72) : "生活足迹",
    detail: typeof story.detail === "string" ? story.detail.slice(0, 120) : "",
    motiveGain: clamp(Number(story.motiveGain) || 0, 0, 100),
    tone: ["bright", "shared", "steady", "soft"].includes(story.tone) ? story.tone : "steady",
    reviewed: Boolean(story.reviewed),
    reviewedAt: Number(story.reviewedAt) || null,
    remaining: Number.isFinite(Number(story.remaining)) ? clamp(Number(story.remaining), 0, 180) : 80,
    createdAt: Number(story.createdAt) || Date.now(),
  };
}

function updateLifeStories(dt) {
  if (!Array.isArray(state.lifeStories) || !state.lifeStories.length) return;
  const before = state.lifeStories.length;
  state.lifeStories = state.lifeStories
    .map((story) => normalizeLifeStory({ ...story, remaining: Math.max(0, Number(story.remaining || 0) - dt) }))
    .filter((story) => story && story.remaining > 0)
    .slice(0, 8);
  if (state.lifeStories.length !== before) lastKingdomKey = "";
}

function recordLifeStory(person, visit, options = {}) {
  if (!person || !visit || !state?.stats) return null;
  state.lifeStories = Array.isArray(state.lifeStories) ? state.lifeStories : [];
  state.nextLifeStoryId ||= 1;
  const need = PERSON_MOTIVE_KEYS.includes(visit.need) ? visit.need : person.need || "social";
  const target = findFloor(visit.floorId);
  const origin = Number.isFinite(Number(visit.originFloorId)) ? findFloor(Number(visit.originFloorId)) : null;
  const companion = visit.companionId ? getResident(Number(visit.companionId)) : null;
  const startMotive = clamp(Number(visit.startMotive ?? person.motives?.[need] ?? 0), 0, 100);
  const endMotive = clamp(Number(person.motives?.[need] ?? startMotive), 0, 100);
  const motiveGain = Math.max(0, Math.round(endMotive - startMotive));
  const story = normalizeLifeStory({
    id: state.nextLifeStoryId++,
    personId: person.id,
    personName: person.name,
    companionId: companion?.id || null,
    companionName: companion?.name || "",
    need,
    floorId: target?.id ?? Number(visit.floorId),
    floorType: target?.type || visit.floorType || "default",
    fromFloorId: origin?.id ?? visit.originFloorId ?? null,
    fromFloorType: origin?.type || visit.originFloorType || "",
    label: visit.label || lifeVisitLabel(need),
    title: lifeStoryTitle(person, visit, target, companion),
    detail: lifeStoryDetail(person, visit, origin, target, companion, motiveGain, options.outcome),
    motiveGain,
    tone: companion ? "shared" : motiveGain >= 22 ? "bright" : options.outcome === "settled" ? "soft" : "steady",
    reviewed: false,
    remaining: 96,
    createdAt: Date.now(),
  });
  state.lifeStories.unshift(story);
  state.lifeStories = state.lifeStories.slice(0, 8);
  state.stats.lifeStoriesDone = (state.stats.lifeStoriesDone || 0) + 1;
  if (motiveGain > 0) state.happiness = clamp(state.happiness + Math.min(1.1, 0.18 + motiveGain / 90), 0, 100);
  if ((state.stats.lifeStoriesDone || 0) % 4 === 0) {
    addLog(`${story.personName} 留下一段生活足迹：${story.detail}`);
  }
  return story;
}

function lifeStoryTitle(person, visit, target, companion) {
  const needLabel = PERSON_NEED_LABELS[visit.need] || "生活";
  if (companion) return `${person.name} 和 ${companion.name} 完成${needLabel}小出行`;
  return `${person.name} 完成${needLabel}小出行`;
}

function lifeStoryDetail(person, visit, origin, target, companion, motiveGain = 0, outcome = "fulfilled") {
  const from = origin ? `${formatFloorLabel(origin.id)} ${origin.name}` : "日常路线";
  const to = target ? `${formatFloorLabel(target.id)} ${target.name}` : FLOOR_TYPES[visit.floorType]?.label || "附近楼层";
  const needLabel = PERSON_NEED_LABELS[visit.need] || "生活";
  const companionText = companion ? `，和 ${companion.name} 同行` : "";
  const gainText = motiveGain > 0 ? `，${needLabel}+${motiveGain}` : "";
  const doneText = outcome === "settled" ? "慢慢收尾" : "满足完成";
  return `${from} → ${to}${companionText}，${doneText}${gainText}`;
}

function lifeVisitProgress(person) {
  const visit = person?.lifeVisit;
  if (!visit) return 0;
  return clamp(1 - Number(visit.remaining || 0) / Math.max(1, Number(visit.total || 1)), 0, 1);
}

function lifeTrailsForFloor(floor) {
  if (!floor || floor.status !== "open") return [];
  return allResidents(state)
    .filter((person) => isActiveLifeVisit(person))
    .map((person) => {
      const visit = person.lifeVisit;
      const targetId = Number(visit.floorId);
      const originId = Number.isFinite(Number(visit.originFloorId)) ? Number(visit.originFloorId) : null;
      const isTarget = Number(floor.id) === targetId;
      const isOrigin = originId !== null && Number(floor.id) === originId;
      if (!isTarget && !isOrigin) return null;
      const target = findFloor(targetId);
      const origin = originId !== null ? findFloor(originId) : null;
      const companion = visit.companionId ? getResident(Number(visit.companionId)) : null;
      return {
        person,
        visit,
        target,
        origin,
        companion,
        need: PERSON_MOTIVE_KEYS.includes(visit.need) ? visit.need : person.need || "social",
        progress: lifeVisitProgress(person),
        mode: isTarget ? "arrive" : "depart",
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.progress - a.progress || a.person.id - b.person.id);
}

function lifeTrailMapKey(floor) {
  return lifeTrailsForFloor(floor)
    .map((trail) => `${trail.person.id}:${trail.mode}:${trail.need}:${Math.round(trail.progress * 10)}:${trail.companion?.id || 0}`)
    .join(",");
}

function lifeTrailRouteText(trail) {
  const from = trail.origin ? `${formatFloorLabel(trail.origin.id)} ${trail.origin.name}` : "日常路线";
  const to = trail.target ? `${formatFloorLabel(trail.target.id)} ${trail.target.name}` : FLOOR_TYPES[trail.visit.floorType]?.label || "附近楼层";
  const needLabel = PERSON_NEED_LABELS[trail.need] || "生活";
  const companionText = trail.companion ? ` · 同行 ${trail.companion.name}` : "";
  return `${trail.person.name}: ${from} → ${to} · ${needLabel}${companionText}`;
}

function renderLifeTrailLayer(floor) {
  const trails = lifeTrailsForFloor(floor).slice(0, 4);
  if (!trails.length) return "";
  return `
    <div class="life-trail-layer" data-count="${trails.length}" aria-hidden="true">
      ${trails
        .map((trail, index) => {
          const progress = Math.round(trail.progress * 100);
          const label = PERSON_NEED_LABELS[trail.need] || "生活";
          return `
            <span class="life-trail-route life-trail-route--${escapeAttr(trail.mode)}" data-need="${escapeAttr(trail.need)}" data-mode="${escapeAttr(trail.mode)}" style="--trail-progress:${progress}%; --trail-lane:${index}" title="${escapeAttr(lifeTrailRouteText(trail))}">
              <i></i><b></b><em>${escapeHtml(label)}</em>
            </span>`;
        })
        .join("")}
    </div>`;
}

function latestLifeStoryForPerson(person) {
  if (!person || !Array.isArray(state.lifeStories)) return null;
  return state.lifeStories.find((story) => Number(story.personId) === Number(person.id)) || null;
}

function renderLifeTrailBadge(person) {
  if (!person) return "";
  if (isActiveLifeVisit(person)) {
    const target = findFloor(person.lifeVisit.floorId);
    const need = PERSON_NEED_LABELS[person.lifeVisit.need] || "生活";
    return `<span class="life-trail-chip active" data-need="${escapeAttr(person.lifeVisit.need)}">${escapeHtml(need)}路线 · ${escapeHtml(target?.name || "外出")}</span>`;
  }
  const story = latestLifeStoryForPerson(person);
  if (!story) return "";
  const need = PERSON_NEED_LABELS[story.need] || "生活";
  return `<span class="life-trail-chip" data-need="${escapeAttr(story.need)}">上次${escapeHtml(need)} · ${escapeHtml(story.detail)}</span>`;
}

function renderComfortMemoryBadge(person) {
  if (!person?.comfortMemory) return "";
  const memory = person.comfortMemory;
  const label = memory.label || COMFORT_AFTERGLOW_LABELS[memory.type] || "舒缓余韵";
  const left = Math.ceil(memory.remaining || 0);
  const floor = Number.isFinite(Number(memory.sourceFloorId)) ? findFloor(memory.sourceFloorId) : null;
  const source = floor?.name || FLOOR_TYPES[memory.type]?.label || "休整";
  return `<span class="comfort-memory-chip" data-type="${escapeAttr(memory.type || "garden")}">${escapeHtml(label)} · ${left}s · ${escapeHtml(source)}</span>`;
}

function lifeStoriesForFloor(floor, game = state) {
  if (!floor || floor.status !== "open" || !Array.isArray(game.lifeStories)) return [];
  return game.lifeStories
    .filter((story) => story && (Number(story.floorId) === Number(floor.id) || Number(story.fromFloorId) === Number(floor.id)))
    .sort((a, b) => Number(a.reviewed) - Number(b.reviewed) || (Number(b.createdAt) || 0) - (Number(a.createdAt) || 0));
}

function pendingLifeStoryReviewsForFloor(floor, game = state) {
  return lifeStoriesForFloor(floor, game).filter((story) => !story.reviewed);
}

function pendingLifeStoryReviewCount(game = state) {
  return Array.isArray(game.lifeStories) ? game.lifeStories.filter((story) => story && !story.reviewed).length : 0;
}

function lifeStoryReviewMapKey(floor) {
  return lifeStoriesForFloor(floor)
    .map((story) => `${story.id}:${story.reviewed ? 1 : 0}`)
    .join(",");
}

function lifeStoryReviewBonus(game = state) {
  return Math.min(0.08, (game.stats?.lifeStoryReviewsDone || 0) * 0.004);
}

function lifeStoryReviewTargetFloor(story, fallbackFloor = null) {
  return [story?.fromFloorId, story?.floorId, fallbackFloor?.id]
    .map((id) => (Number.isFinite(Number(id)) ? findFloor(Number(id)) : null))
    .find((floor) => floor?.type === "dwelling" && floor.status === "open") || null;
}

function lifeStoryReviewReward(story, floor = null) {
  const target = lifeStoryReviewTargetFloor(story, floor);
  const level = target?.level || floor?.level || 1;
  const motive = Number(story?.motiveGain) || 8;
  const rentBonus = Math.max(12, Math.round(10 + level * 5 + motive * 0.45 + (story?.companionId ? 6 : 0)));
  const coinBonus = target ? 0 : Math.max(8, Math.round(rentBonus * 0.65));
  const motiveGain = Math.max(5, Math.round(4 + motive * 0.22));
  return { target, rentBonus, coinBonus, motiveGain };
}

function reviewLifeStory(storyId, floorId) {
  const story = (state.lifeStories || []).find((entry) => Number(entry.id) === Number(storyId));
  const floor = findFloor(floorId) || findFloor(state.selectedFloorId);
  if (!story) {
    showToast("这段生活足迹已经消散");
    return;
  }
  if (story.reviewed) {
    showToast("这段足迹已经回访过");
    return;
  }

  const reward = lifeStoryReviewReward(story, floor);
  story.reviewed = true;
  story.reviewedAt = Date.now();
  story.remaining = Math.max(Number(story.remaining) || 0, 48);
  state.stats.lifeStoryReviewsDone = (state.stats.lifeStoryReviewsDone || 0) + 1;
  state.happiness = clamp(state.happiness + 0.9, 0, 100);

  const person = getResident(Number(story.personId));
  const companion = story.companionId ? getResident(Number(story.companionId)) : null;
  const need = PERSON_MOTIVE_KEYS.includes(story.need) ? story.need : "social";
  if (person) boostPersonMotive(person, need, reward.motiveGain);
  if (companion) boostPersonMotive(companion, need, Math.max(3, Math.round(reward.motiveGain * 0.65)));
  if (person && companion) {
    const scene = { kind: "life-review", need };
    bumpRelationship(person, companion, scene, 4);
    bumpRelationship(companion, person, scene, 4);
  }

  if (reward.target) {
    reward.target.rentReady = Math.min(420, (reward.target.rentReady || 0) + reward.rentBonus);
    addLog(`${story.personName} 的生活足迹完成回访，${reward.target.name} 增加 ${reward.rentBonus} 点租金准备。`);
    showFloat(`回访 +${reward.rentBonus}`);
  } else {
    addCoins(reward.coinBonus);
    addLog(`${story.personName} 的生活足迹完成回访，获得 ${reward.coinBonus} 金币。`);
    showFloat(`回访 +${reward.coinBonus}`);
  }
  showToast("生活回访已整理");
  lastKingdomKey = "";
  render(true);
  saveGame(false);
}

function renderLifeStoryPanel(floor) {
  if (!floor || floor.status !== "open") return "";
  const active = lifeTrailsForFloor(floor).slice(0, 3);
  const allStories = lifeStoriesForFloor(floor);
  const stories = allStories.slice(0, 4);
  const pending = allStories.filter((story) => !story.reviewed).length;
  if (!active.length && !stories.length) return "";
  return `
    <div class="life-story-panel ${pending ? "review-ready" : ""}" data-pending-reviews="${pending}">
      <div class="life-story-head">
        <strong>生活足迹</strong>
        <em>${state.stats.lifeStoriesDone || 0} 段 · ${pending ? `${pending} 待回访` : `${state.stats.lifeStoryReviewsDone || 0} 已回访`}</em>
      </div>
      ${active.length
        ? `<div class="life-story-routes">${active
            .map((trail) => `<span class="life-story-route" data-need="${escapeAttr(trail.need)}">${escapeHtml(lifeTrailRouteText(trail))}</span>`)
            .join("")}</div>`
        : ""}
      ${stories.length
        ? `<div class="life-story-list">${stories
            .map((story) => {
              const reward = lifeStoryReviewReward(story, floor);
              const rewardText = reward.target ? `租金准备 +${reward.rentBonus}` : `金币 +${reward.coinBonus}`;
              return `
                <article class="life-story-card ${story.reviewed ? "reviewed" : "reviewable"}" data-tone="${escapeAttr(story.tone)}" data-need="${escapeAttr(story.need)}" data-reviewed="${story.reviewed ? "true" : "false"}">
                  <div class="life-story-card-head">
                    <strong>${escapeHtml(story.title)}</strong>
                    ${story.reviewed
                      ? `<span class="life-story-review-state">已回访</span>`
                      : `<button class="life-story-review-btn" type="button" data-action="review-life-story" data-story-id="${story.id}" data-floor-id="${floor.id}">回访</button>`}
                  </div>
                  <span>${escapeHtml(story.detail)}</span>
                  <small class="life-story-reward">${escapeHtml(rewardText)} · 心情 +${reward.motiveGain}</small>
                </article>`;
            })
            .join("")}</div>`
        : ""}
    </div>`;
}

function endSocialForPerson(person) {
  if (!person?.socialPartnerId) return;
  const partner = getResident(Number(person.socialPartnerId));
  if (partner && Number(partner.socialPartnerId) === Number(person.id)) clearSocialScene(partner);
  clearSocialScene(person);
}

function updatePersonLife(person, floorType = "default", dt = 0) {
  if (!person || typeof person !== "object") return false;
  const before = personLifeKey(person);
  ensurePersonLife(person);
  if (dt > 0) {
    updateComfortMemory(person, dt);
    person.needTimer = Math.max(0, Number(person.needTimer || 0) - dt);
    applyMotiveDecay(person, floorType, dt);
    applyActivityMotiveGain(person, floorType, dt);
    if (person.socialPartnerId) {
      boostPersonMotive(person, "social", dt * 0.34);
    }
  }
  const dominant = dominantNeedForPerson(person, floorType);
  const urgency = personNeedUrgency(person, dominant);
  const currentUrgency = personNeedUrgency(person, person.need);
  if (!person.need || person.needTimer <= 0 || (urgency > 0.48 && urgency > currentUrgency + 0.12)) {
    person.need = choosePersonNeed(person, floorType);
    person.needTimer = randFloat(7.5, 16.5);
  }
  person.needIntensity = personNeedUrgency(person, person.need);
  person.lifeMood = personMotiveMood(person);
  person.lifeWish = personLifeWish(person, floorType);
  return before !== personLifeKey(person);
}

function applyMotiveDecay(person, floorType = "default", dt = 0) {
  const motives = ensurePersonLife(person).motives;
  const workLoad = isBusiness({ type: floorType, status: "open" }) && person.workFloorId ? 1.16 : 1;
  const comfortEase = Math.min(0.32, gardenComfortBonus(state) * 0.28 + bathhouseRestBonus(state) * 0.18 + clinicCareBonus(state) * 0.14 + personComfortMemoryBonus(person));
  PERSON_MOTIVE_KEYS.forEach((key) => {
    const base = PERSON_MOTIVE_DECAY[key] || 0.1;
    const socialPressure = key === "social" && floorType === "lobby" ? 0.82 : 1;
    const roomEase = floorType === "dwelling" && key === "energy" ? 0.78 : 1;
    motives[key] = clamp(motives[key] - dt * base * workLoad * socialPressure * roomEase * (1 - comfortEase), 0, 100);
  });
}

function updateComfortMemory(person, dt = 0) {
  if (!person?.comfortMemory) return false;
  const before = Math.ceil(person.comfortMemory.remaining || 0);
  person.comfortMemory.remaining = Math.max(0, Number(person.comfortMemory.remaining || 0) - dt);
  if (person.comfortMemory.remaining <= 0) {
    delete person.comfortMemory;
  }
  return before !== Math.ceil(person.comfortMemory?.remaining || 0);
}

function personComfortMemoryBonus(person) {
  if (!person?.comfortMemory) return 0;
  const remaining = Math.max(0, Number(person.comfortMemory.remaining) || 0);
  const total = Math.max(1, Number(person.comfortMemory.total) || remaining || 1);
  if (remaining <= 0) return 0;
  const ratio = clamp(remaining / total, 0, 1);
  return Math.min(0.2, (Number(person.comfortMemory.power) || 0.08) * (0.42 + ratio * 0.58));
}

function applyActivityMotiveGain(person, floorType = "default", dt = 0) {
  const activity = person.activity || "idle";
  if (activity === "eat" || activity === "snack") boostPersonMotive(person, "food", dt * (1.7 + foodWarmthBonus(state) * 0.55));
  if (activity === "serve") {
    boostPersonMotive(person, "food", dt * 0.42);
    boostPersonMotive(person, "social", dt * 0.32);
  }
  if (activity === "watch" || activity === "applaud" || activity === "dance") {
    boostPersonMotive(person, "entertainment", dt * (1.24 + entertainmentJoyBonus(state) * 0.42 + festivalBuzzBonus(state) * 0.28));
    boostPersonMotive(person, "social", dt * 0.18);
  }
  if (activity === "talk" || activity === "chat" || activity === "wave") {
    boostPersonMotive(person, "social", dt * 1.18);
    boostPersonMotive(person, "entertainment", dt * 0.16);
  }
  if (activity === "rest") {
    boostPersonMotive(person, "energy", dt * (1.55 + bathhouseRestBonus(state) * 0.42 + clinicCareBonus(state) * 0.24));
  }
  if (activity === "look" || activity === "stroll") {
    boostPersonMotive(person, "entertainment", dt * 0.28);
    boostPersonMotive(person, "energy", dt * 0.1);
  }
  if (activity === "work") {
    boostPersonMotive(person, "energy", -dt * 0.12);
    boostPersonMotive(person, "entertainment", -dt * 0.08);
  }
  if (floorType === "food") boostPersonMotive(person, "food", dt * 0.08);
  if (floorType === "entertainment" || floorType === "festival") boostPersonMotive(person, "entertainment", dt * 0.1);
  if (floorType === "garden" || floorType === "aquarium") boostPersonMotive(person, "entertainment", dt * 0.08);
  if (floorType === "bathhouse" || floorType === "clinic") boostPersonMotive(person, "energy", dt * 0.12);
}

function boostPersonMotive(person, key, amount = 0) {
  if (!person || !PERSON_MOTIVE_KEYS.includes(key)) return;
  ensurePersonLife(person);
  person.motives[key] = clamp(Number(person.motives[key] || 0) + amount, 0, 100);
}

function dominantNeedForPerson(person, floorType = "default") {
  const scores = needScoresForPerson(person, floorType);
  return scores.sort((a, b) => b.score - a.score)[0]?.key || "social";
}

function needScoresForPerson(person, floorType = "default") {
  ensurePersonLife(person);
  return PERSON_MOTIVE_KEYS.map((key) => {
    const motive = Number(person.motives[key] ?? 70);
    let score = 100 - motive;
    if (key === "food" && floorType === "food") score += 10;
    if (key === "entertainment" && (floorType === "entertainment" || floorType === "festival")) score += 10;
    if (key === "social" && ["dwelling", "garden", "market", "service", "lobby"].includes(floorType)) score += 7;
    if (key === "energy" && ["dwelling", "bathhouse", "clinic"].includes(floorType)) score += 8;
    if (person.dreamType === "food" && key === "food") score += 4;
    if ((person.dreamType === "entertainment" || person.dreamType === "festival") && key === "entertainment") score += 4;
    if ((state.happiness || 70) < 68 && key === "entertainment") score += 5;
    return { key, score: Math.max(1, score) };
  });
}

function personNeedUrgency(person, need = person?.need) {
  if (!person || !PERSON_MOTIVE_KEYS.includes(need)) return 0;
  ensurePersonLife(person);
  return clamp((72 - Number(person.motives[need] || 70)) / 72, 0, 1);
}

function personMotiveMood(person) {
  ensurePersonLife(person);
  const values = PERSON_MOTIVE_KEYS.map((key) => Number(person.motives[key] || 0));
  const lowest = Math.min(...values);
  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  if (lowest < 28) return "strained";
  if (lowest < 46) return "seeking";
  if (average > 78) return "bright";
  return "steady";
}

function personLifeWish(person, floorType = "default") {
  ensurePersonLife(person);
  if (isActiveLifeVisit(person)) {
    return lifeVisitProgressLabel(person);
  }
  if (person.comfortMemory) {
    return `带着${person.comfortMemory.label || "舒缓余韵"}`;
  }
  const need = person.need || dominantNeedForPerson(person, floorType);
  const label = PERSON_NEED_LABELS[need] || "生活";
  const supported = (NEED_VISIT_TYPES[need] || []).includes(floorType);
  if (person.socialPartnerId) return `正在${label}互动`;
  if (supported) return `正在满足${label}`;
  return `想要${label}`;
}

function personLifeKey(person) {
  if (!person || typeof person !== "object") return "";
  const motiveKey = PERSON_MOTIVE_KEYS.map((key) => Math.round(Number(person.motives?.[key] || 0) / 12)).join("-");
  const visitKey = person.lifeVisit ? `${person.lifeVisit.floorId || ""}:${person.lifeVisit.need || ""}:${person.lifeVisit.companionId || ""}` : "";
  const comfortKey = person.comfortMemory ? `${person.comfortMemory.type || ""}:${Math.ceil(person.comfortMemory.remaining || 0)}` : "";
  return `${person.need || ""}:${person.needIntensity || 0}:${person.lifeMood || ""}:${person.lifeWish || ""}:${visitKey}:${comfortKey}:${person.socialPhase || ""}:${motiveKey}`;
}

function floorSocialScope(floor) {
  return floor ? `${floor.id}:${floor.type}` : "default";
}

function updateSocialActivities(people, floorType = "default", dt = 0, scope = floorType) {
  if (!Array.isArray(people) || people.length === 0) return false;
  let changed = false;
  const present = new Set(people.map((person) => person?.id).filter(Boolean));
  people.forEach((person) => {
    if (!person || typeof person !== "object") return;
    ensurePersonLife(person);
    const ownsSocial = !person.socialFloorScope || person.socialFloorScope === scope;
    person.socialCooldown = Math.max(0, Number(person.socialCooldown || 0) - dt);
    if (!ownsSocial) return;
    person.socialTimer = Number(person.socialTimer || 0) - dt;
    if (person.socialPartnerId && !present.has(person.socialPartnerId)) {
      clearSocialScene(person);
      changed = true;
    }
    if (person.socialPartnerId && person.socialTimer <= 0) {
      clearSocialScene(person);
      changed = true;
    }
    if (person.socialPartnerId && person.socialRole === "left") {
      const partner = people.find((candidate) => candidate?.id === person.socialPartnerId);
      if (partner && updateSocialScenePhase(person, partner, floorType)) changed = true;
    }
  });

  if (people.length < 2) return changed;
  const candidates = people
    .filter((person) => person && !person.expeditionId && !person.socialPartnerId && !(person.socialCooldown > 0))
    .sort(() => Math.random() - 0.5);
  const used = new Set();
  for (const left of candidates) {
    if (!left || used.has(left.id)) continue;
    const right = chooseSocialPartner(left, candidates, used);
    if (!right) continue;
    const socialChance = socialChanceForFloor(floorType, left, right);
    if (Math.random() > socialChance) {
      left.socialCooldown = randFloat(3, 7);
      right.socialCooldown = randFloat(3, 7);
      used.add(left.id);
      used.add(right.id);
      continue;
    }
    const scene = chooseSocialSceneForPair(floorType, left, right);
    const duration = randFloat(8, 16);
    const groupId = `${left.id}-${right.id}-${Math.round(performance.now())}`;
    applySocialScene(left, right, scene, groupId, duration, floorType, scope);
    used.add(left.id);
    used.add(right.id);
    changed = true;
  }
  return changed;
}

function socialScenesForFloor(floorType) {
  return SOCIAL_SCENES[floorType] || SOCIAL_SCENES.default;
}

function chooseSocialPartner(left, candidates, used) {
  const options = candidates.filter((person) => person && person.id !== left.id && !used.has(person.id));
  if (!options.length) return null;
  ensurePersonLife(left);
  return options
    .map((person) => {
      ensurePersonLife(person);
      const sameNeed = person.need && left.need && person.need === left.need ? 3 : 0;
      const socialNeed = person.need === "social" || left.need === "social" ? 2 : 0;
      const relationship = relationshipScore(left, person) / 18;
      const lowSocial = personNeedUrgency(left, "social") + personNeedUrgency(person, "social");
      const dreamMatch = person.dreamType && left.dreamType && person.dreamType === left.dreamType ? 1 : 0;
      return { person, score: sameNeed + socialNeed + lowSocial + dreamMatch + relationship + Math.random() };
    })
    .sort((a, b) => b.score - a.score)[0].person;
}

function chooseSocialSceneForPair(floorType, left, right) {
  const scenes = socialScenesForFloor(floorType);
  return scenes
    .map((scene) => {
      const needMatch = (left.need === scene.need ? 2.5 : 0) + (right.need === scene.need ? 2.5 : 0);
      const motiveGap = personNeedUrgency(left, scene.need) + personNeedUrgency(right, scene.need);
      const familiar = relationshipScore(left, right) / 35;
      return { scene, score: needMatch + motiveGap + familiar + Math.random() };
    })
    .sort((a, b) => b.score - a.score)[0]?.scene || pick(scenes);
}

function socialSceneFromPeople(left, right, floorType = "default") {
  const kind = left?.socialScene || right?.socialScene || "chat";
  return socialScenesForFloor(floorType).find((scene) => scene.kind === kind) || {
    kind,
    need: left?.need || right?.need || "social",
    left: left?.activity || "talk",
    right: right?.activity || "chat",
    label: left?.socialLabel || right?.socialLabel || "互动",
  };
}

function socialPhaseForProgress(progress = 0) {
  if (progress < 0.22) return "approach";
  if (progress > 0.78) return "settle";
  return "engage";
}

function socialActivitiesForPhase(scene, phase) {
  if (phase === "approach") {
    return {
      left: scene?.kind === "show" || scene?.kind === "duet" ? "wave" : "stroll",
      right: scene?.kind === "meal" || scene?.kind === "snack" || scene?.kind === "toast" ? "wait" : "look",
    };
  }
  if (phase === "settle") {
    return {
      left: scene?.kind === "meal" || scene?.kind === "snack" || scene?.kind === "toast" ? "talk" : scene?.left || "talk",
      right: scene?.kind === "show" || scene?.kind === "duet" ? "applaud" : scene?.right || "chat",
    };
  }
  return { left: scene?.left || "talk", right: scene?.right || "chat" };
}

function updateSocialScenePhase(left, right, floorType = "default") {
  if (!left?.socialPartnerId || !right || left.socialGroup !== right.socialGroup) return false;
  const total = Math.max(1, Number(left.socialTotal || right.socialTotal || left.socialTimer || right.socialTimer || 1));
  const remaining = Math.max(0, Math.min(Number(left.socialTimer || 0), Number(right.socialTimer || 0)));
  const progress = clamp(1 - remaining / total, 0, 1);
  const phase = socialPhaseForProgress(progress);
  if (left.socialPhase === phase && right.socialPhase === phase) return false;
  const scene = socialSceneFromPeople(left, right, floorType);
  const activities = socialActivitiesForPhase(scene, phase);
  left.socialPhase = phase;
  right.socialPhase = phase;
  left.activity = activities.left;
  right.activity = activities.right;
  left.activityTimer = Math.max(left.activityTimer || 0, remaining);
  right.activityTimer = Math.max(right.activityTimer || 0, remaining);
  assignSocialMotion(left, right, floorType, scene, phase);
  return true;
}

function socialChanceForFloor(floorType, left, right) {
  const lively = floorType === "food" || floorType === "entertainment" || floorType === "festival";
  const base = lively ? 0.78 : 0.52;
  const needBonus = left.need && right.need && left.need === right.need ? 0.1 : 0;
  const relationBonus = relationshipScore(left, right) / 550;
  const moodBonus = clamp(((state.happiness || 70) - 70) / 200, -0.08, 0.12);
  return clamp(base + needBonus + relationBonus + moodBonus, 0.32, 0.9);
}

function choosePersonNeed(person, floorType = "default") {
  const scores = needScoresForPerson(person, floorType).sort((a, b) => b.score - a.score);
  const top = scores[0]?.key || "social";
  if ((scores[0]?.score || 0) > 38 || Math.random() < 0.66) return top;
  const total = scores.reduce((sum, item) => sum + item.score, 0);
  let roll = Math.random() * total;
  for (const item of scores) {
    roll -= item.score;
    if (roll <= 0) return item.key;
  }
  return top;
}

function applySocialScene(left, right, scene, groupId, duration, floorType = "default", scope = floorType) {
  left.socialPartnerId = right.id;
  right.socialPartnerId = left.id;
  left.socialGroup = groupId;
  right.socialGroup = groupId;
  left.socialFloorScope = scope;
  right.socialFloorScope = scope;
  left.socialRole = "left";
  right.socialRole = "right";
  left.socialScene = scene.kind;
  right.socialScene = scene.kind;
  left.socialLabel = scene.label;
  right.socialLabel = scene.label;
  left.socialTotal = duration;
  right.socialTotal = duration;
  left.socialPhase = "approach";
  right.socialPhase = "approach";
  delete left.socialAnchor;
  delete right.socialAnchor;
  left.need = scene.need;
  right.need = scene.need;
  left.needTimer = Math.max(left.needTimer || 0, duration);
  right.needTimer = Math.max(right.needTimer || 0, duration);
  left.socialTimer = duration;
  right.socialTimer = duration;
  const opening = socialActivitiesForPhase(scene, "approach");
  left.activity = opening.left;
  right.activity = opening.right;
  left.activityTimer = duration;
  right.activityTimer = duration;
  satisfySocialScene(left, right, scene);
  rememberRelationship(left, right, scene);
  assignSocialMotion(left, right, floorType, scene, "approach");
}

function satisfySocialScene(left, right, scene) {
  const need = scene?.need || "social";
  [left, right].forEach((person) => {
    boostPersonMotive(person, need, 10);
    boostPersonMotive(person, "social", need === "social" ? 8 : 4);
    if (scene?.kind === "meal" || scene?.kind === "snack" || scene?.kind === "toast") boostPersonMotive(person, "food", 8);
    if (scene?.kind === "show" || scene?.kind === "duet") boostPersonMotive(person, "entertainment", 8);
    if (scene?.kind === "soak" || scene?.kind === "steam") boostPersonMotive(person, "energy", 10);
  });
}

function rememberRelationship(left, right, scene) {
  if (!left?.id || !right?.id || left.id === right.id) return;
  const bump = scene?.need === "social" ? 8 : 5;
  bumpRelationship(left, right, scene, bump);
  bumpRelationship(right, left, scene, bump);
}

function bumpRelationship(source, target, scene, amount = 4) {
  ensurePersonLife(source);
  const key = String(target.id);
  const previous = normalizeRelationshipEntry(source.relationships[key]);
  source.relationships[key] = {
    score: clamp(previous.score + amount, 0, 100),
    interactions: previous.interactions + 1,
    lastScene: scene?.kind || previous.lastScene || "chat",
  };
}

function normalizeRelationshipEntry(entry) {
  if (typeof entry === "number") return { score: clamp(entry, 0, 100), interactions: 0, lastScene: "" };
  if (!entry || typeof entry !== "object") return { score: 0, interactions: 0, lastScene: "" };
  return {
    score: clamp(Number(entry.score) || 0, 0, 100),
    interactions: Math.max(0, Number(entry.interactions) || 0),
    lastScene: entry.lastScene || "",
  };
}

function relationshipScore(left, right) {
  if (!left?.id || !right?.id || left.id === right.id) return 0;
  ensurePersonLife(left);
  return normalizeRelationshipEntry(left.relationships[String(right.id)]).score;
}

function clearSocialScene(person) {
  delete person.socialPartnerId;
  delete person.socialGroup;
  delete person.socialFloorScope;
  delete person.socialRole;
  delete person.socialScene;
  delete person.socialLabel;
  delete person.socialTotal;
  delete person.socialPhase;
  delete person.socialAnchor;
  person.socialTimer = 0;
  person.socialCooldown = randFloat(4, 10);
}

function updateSinglePersonActivity(person, floorType = "default", dt = 0) {
  if (!person || typeof person !== "object") return false;
  const lifeChanged = updatePersonLife(person, floorType, dt);
  person.activityTimer = Number(person.activityTimer || 0) - dt;
  if (person.socialPartnerId && person.activityTimer > 0) {
    return (!hasPersonMotion(person) ? assignPersonMotion(person, floorType, person.activity || "talk") : false) || lifeChanged;
  }
  if (person.activity && person.activityTimer > 0 && hasPersonMotion(person)) return lifeChanged;
  const choices = activityChoicesForPerson(person, floorType);
  person.activity = pick(choices);
  person.activityTimer = randFloat(5.5, 13.5);
  person.activityDelay = randFloat(-1.8, 0).toFixed(2);
  person.activityLane = pick(["a", "b", "c"]);
  assignPersonMotion(person, floorType, person.activity);
  return true;
}

function activityChoicesForPerson(person, floorType = "default") {
  const dreamType = person.dreamType || person.resident?.dreamType || person.dream || "";
  const base = PERSON_ACTIVITY_SETS[floorType] || PERSON_ACTIVITY_SETS.default;
  if (person.kind === "vip") return ["wave", "look", "wait"];
  if (person.kind === "shopper") return ["wait", "look", "stroll"];
  if (person.need && NEED_ACTIVITY_POOL[person.need]) return [...base, ...NEED_ACTIVITY_POOL[person.need]];
  if (dreamType && dreamType === floorType) return [...base, "work", "wave"];
  return base;
}

function personActivityClass(person, floorType = "default") {
  updateSinglePersonActivity(person, floorType, 0);
  const activity = person?.activity || "idle";
  const lane = person?.activityLane || "a";
  const mode = person?.motion?.mode || motionModeForActivity(activity);
  const facing = person?.motion?.facing === "left" ? "left" : "right";
  return `person-activity person-activity--${activity} person-lane--${lane} person-motion--${mode} person-facing--${facing}`;
}

function personActivityStyle(person, extra = "") {
  const delay = person?.activityDelay || "0";
  return `--person-art:url('${spriteArtForPerson(person)}');--activity-delay:${delay}s;${personMotionStyle(person)}${extra}`;
}

function roomSpotsForFloor(floorType) {
  return PERSON_ROOM_SPOTS[floorType] || PERSON_ROOM_SPOTS.default;
}

function hasPersonMotion(person) {
  const motion = person?.motion;
  return motion && Number.isFinite(Number(motion.x)) && Number.isFinite(Number(motion.y));
}

function assignPersonMotion(person, floorType = "default", activity = "idle") {
  const spots = roomSpotsForFloor(floorType);
  const matches = spots.filter((spot) => Array.isArray(spot.activities) && spot.activities.includes(activity));
  let choices = matches.length ? matches : spots;
  if (choices.length > 1 && person.motion?.spotId) {
    choices = choices.filter((spot) => spot.id !== person.motion.spotId) || choices;
    if (!choices.length) choices = matches.length ? matches : spots;
  }
  const spot = pick(choices);
  const previousX = Number(person.motion?.x);
  const x = clamp((Number(spot.x) || 50) + randFloat(-2.6, 2.6), 12, 84);
  const y = clamp((Number(spot.y) || 0) + randFloat(-1.3, 1.3), 0, 22);
  const facing = Number.isFinite(previousX) && x < previousX ? "left" : "right";
  return setPersonMotion(person, {
    x,
    y,
    scale: Number(spot.scale) || 1,
    facing,
    mode: motionModeForActivity(activity),
    spotId: spot.id,
  });
}

function assignSocialMotion(left, right, floorType = "default", scene = null, phase = "engage") {
  const anchors = PERSON_SOCIAL_SPOTS[floorType] || PERSON_SOCIAL_SPOTS.default;
  const saved = left?.socialAnchor || right?.socialAnchor;
  const anchor = saved && Number.isFinite(Number(saved.x)) ? saved : pick(anchors);
  left.socialAnchor = { x: anchor.x, y: anchor.y, scale: anchor.scale };
  right.socialAnchor = { x: anchor.x, y: anchor.y, scale: anchor.scale };
  const baseGap = scene?.kind === "show" || scene?.kind === "duet" ? 7.4 : scene?.kind === "meal" || scene?.kind === "toast" ? 6.3 : 5.8;
  const gap = phase === "approach" ? baseGap + 3.8 : phase === "settle" ? baseGap + 1.2 : baseGap;
  const y = phase === "settle" ? anchor.y - 0.4 : phase === "approach" ? anchor.y + 0.2 : anchor.y;
  const leftMode = phase === "approach" ? "walk" : phase === "settle" ? "pose" : "social";
  const rightMode = phase === "approach" ? "observe" : phase === "settle" ? "pose" : "social";
  const leftChanged = setPersonMotion(left, {
    x: clamp(anchor.x - gap, 12, 84),
    y,
    scale: anchor.scale,
    facing: "right",
    mode: leftMode,
    spotId: `social-${scene?.kind || "chat"}`,
  });
  const rightChanged = setPersonMotion(right, {
    x: clamp(anchor.x + gap, 12, 84),
    y,
    scale: Math.max(0.9, anchor.scale - 0.02),
    facing: "left",
    mode: rightMode,
    spotId: `social-${scene?.kind || "chat"}`,
  });
  return leftChanged || rightChanged;
}

function setPersonMotion(person, target) {
  if (!person || typeof person !== "object") return false;
  const next = {
    x: Math.round(clamp(Number(target.x) || 50, 8, 88) * 10) / 10,
    y: Math.round(clamp(Number(target.y) || 0, 0, 24) * 10) / 10,
    scale: Math.round(clamp(Number(target.scale) || 1, 0.86, 1.16) * 100) / 100,
    facing: target.facing === "left" ? "left" : "right",
    mode: target.mode || "pose",
    spotId: target.spotId || "free",
  };
  const previous = person.motion || {};
  const changed =
    Math.abs((Number(previous.x) || 0) - next.x) > 0.1 ||
    Math.abs((Number(previous.y) || 0) - next.y) > 0.1 ||
    previous.mode !== next.mode ||
    previous.facing !== next.facing ||
    previous.spotId !== next.spotId;
  person.motion = next;
  return changed;
}

function motionModeForActivity(activity) {
  if (activity === "stroll") return "walk";
  if (activity === "rest") return "rest";
  if (activity === "eat" || activity === "snack" || activity === "serve" || activity === "work") return "use";
  if (activity === "talk" || activity === "chat" || activity === "wave" || activity === "applaud") return "social";
  if (activity === "watch" || activity === "look") return "observe";
  if (activity === "dance") return "perform";
  return "pose";
}

function personMotionStyle(person) {
  const motion = person?.motion || {};
  const x = clamp(Number(motion.x) || 50, 8, 88);
  const y = clamp(Number(motion.y) || 0, 0, 24);
  const lift = Math.round(clamp(y * 0.34, 0, 8.2) * 10) / 10;
  const scale = clamp(Number(motion.scale) || 1, 0.86, 1.16);
  const facing = motion.facing === "left" ? -1 : 1;
  const depth = Math.round(20 + y * 2);
  return `--person-x:${x}%;--person-y:${y}px;--person-lift:${lift}px;--person-scale:${scale};--person-facing:${facing};--person-depth:${depth};`;
}

function socialPairStyle(left, right) {
  const leftMotion = left?.motion || {};
  const rightMotion = right?.motion || {};
  const x = ((Number(leftMotion.x) || 45) + (Number(rightMotion.x) || 55)) / 2;
  const y = Math.max(Number(leftMotion.y) || 0, Number(rightMotion.y) || 0);
  const lift = Math.round(clamp(y * 0.34, 0, 8.2) * 10) / 10;
  const scale = ((Number(leftMotion.scale) || 1) + (Number(rightMotion.scale) || 1)) / 2;
  const depth = Math.round(26 + y * 2);
  return `--pair-x:${clamp(x, 12, 84)}%;--pair-y:${clamp(y, 0, 24)}px;--pair-lift:${lift}px;--pair-scale:${clamp(scale, 0.9, 1.14)};--person-depth:${depth};`;
}

function enqueueFloorArrival(passenger, floor, correct = true) {
  if (!passenger || !floor) return;
  state.arrivals ||= [];
  const duration = randFloat(2.25, 3.25);
  const side = Math.random() < 0.5 ? "left" : "right";
  state.arrivals.push({
    id: `${passenger.id || Date.now()}-${Math.round(performance.now())}`,
    floorId: floor.id,
    remaining: duration,
    duration,
    side,
    correct: Boolean(correct),
    title: passenger.title || passenger.resident?.name || "访客",
    variant: spriteVariantForPerson(passenger),
    art: spriteArtForPerson(passenger),
  });
  if (state.arrivals.length > 8) state.arrivals = state.arrivals.slice(-8);
}

function updateTimers(dt) {
  const clockSpeed = 1 + clockworkTempoBonus(state) * 0.72 + craftToolBonus(state) * 0.34;
  state.floors = state.floors.map((floor) => {
    if (floor.status === "construction") {
      floor.buildRemaining -= dt * clockSpeed;
      if (floor.buildRemaining <= 0) {
        const built = finalizeConstruction(floor);
        state.stats.floorsBuilt += 1;
        if (getFloorZone(built) === "sky") state.stats.skyFloorsBuilt += 1;
        if (getFloorZone(built) === "depth") state.stats.depthFloorsBuilt += 1;
        if (built.type === "entertainment") state.stats.entertainmentFloorsBuilt += 1;
        if (built.type === "food") state.stats.foodFloorsBuilt += 1;
        if (built.type === "service") state.stats.serviceFloorsBuilt += 1;
        if (built.type === "craft") state.stats.craftFloorsBuilt += 1;
        if (built.type === "market") state.stats.marketFloorsBuilt += 1;
        if (built.type === "library") state.stats.libraryFloorsBuilt += 1;
        if (built.type === "garden") state.stats.gardenFloorsBuilt += 1;
        if (built.type === "observatory") state.stats.observatoryFloorsBuilt += 1;
        if (built.type === "skyport") state.stats.skyportFloorsBuilt += 1;
        if (built.type === "bathhouse") state.stats.bathhouseFloorsBuilt += 1;
        if (built.type === "clinic") state.stats.clinicFloorsBuilt += 1;
        if (built.type === "clockwork") state.stats.clockworkFloorsBuilt += 1;
        if (built.type === "aquarium") state.stats.aquariumFloorsBuilt += 1;
        if (built.type === "festival") state.stats.festivalFloorsBuilt += 1;
        addCoins(35);
        addLog(`${built.name} 建成了。`);
        return built;
      }
      return floor;
    }

    if (floor.type === "dwelling") {
      floor.rentTimer -= dt;
      if (floor.rentTimer <= 0) {
        floor.rentTimer = floor.rentTotal;
        const income = Math.max(8, Math.round(floor.residents.length * 11 * (1 + dwellingJourneyBonus(state) * 0.3 + comfortRentEchoBonus(state)) + floor.bonus));
        floor.rentReady = Math.min(180, floor.rentReady + income);
      }
      return floor;
    }

    if (isBusiness(floor) && floor.production) {
      floor.production.remaining -= dt * clockSpeed;
      if (floor.production.remaining <= 0) {
        floor.stock = floor.stockMax + floor.production.bonus;
        floor.production = null;
        state.stats.stockOrders += 1;
        if (floor.type === "alchemy" && Math.random() < alchemyPotionBonus(state) * 0.55) {
          state.gems += 1;
          addLog(`${floor.name} 炼出一瓶发光秘药，额外获得 1 宝石。`);
        }
        addLog(`${floor.name} 的货架补满了。`);
      }
    }
    if (floor.type === "market") {
      floor.marketCooldown = Math.max(0, (floor.marketCooldown || 0) - dt * (1 + clockworkTempoBonus(state) * 0.18));
      if (updateMarketParcelFloor(floor, dt)) {
        lastKingdomKey = "";
      }
    }
    if (floor.type === "kingdom" && updateRoyalMandateFloor(floor, dt)) {
      lastKingdomKey = "";
    }
    if (floor.type === "library") {
      floor.libraryCooldown = Math.max(0, (floor.libraryCooldown || 0) - dt * (1 + clockworkTempoBonus(state) * 0.18));
    }
    if (isFoodRushFloorType(floor.type) && updateFoodRushFloor(floor, dt)) {
      lastKingdomKey = "";
    }
    if (isServiceCareFloorType(floor.type) && updateServiceCareFloor(floor, dt)) {
      lastKingdomKey = "";
    }
    if (isStarChartFloorType(floor.type) && updateStarChartFloor(floor, dt)) {
      lastKingdomKey = "";
    }
    if (isToolTuneFloorType(floor.type) && updateToolTuneFloor(floor, dt)) {
      lastKingdomKey = "";
    }
    if (isShowtimeFloorType(floor.type) && updateShowtimeFloor(floor, dt)) {
      lastKingdomKey = "";
    }
    if (isComfortFloorType(floor.type) && updateComfortFloor(floor, dt)) {
      lastKingdomKey = "";
    }
    return floor;
  });
}

function updateVisitors(dt) {
  (state.queue || []).forEach((visitor) => {
    visitor.lobbyWait = Math.min(90, lobbyWaitSeconds(visitor) + dt);
  });
  state.spawnTimer -= dt;
  if (state.spawnTimer > 0) return;
  const queueCount = state.queue.length;
  state.spawnTimer = getNextVisitorDelay(queueCount);
  if (queueCount >= VISITOR_QUEUE_MAX) return;
  if (!shouldVisitorArrive(queueCount)) return;
  const visitor = makeVisitor(state);
  if (visitor.targetFloorId === null) return;
  state.queue.push(visitor);
}

function getNextVisitorDelay(queueCount) {
  const base = 8.5 + Math.random() * 8.5;
  const happinessPull = state.happiness / 130;
  const entrancePull = state.elevator.upgrades * 0.08;
  const districtPull =
    lobbyDispatchBonus(state) * 1.1 +
    marketTradeBonus(state) * 1.2 +
    foodWarmthBonus(state) * 0.95 +
    gardenComfortBonus(state) * 1.6 +
    entertainmentJoyBonus(state) * 1.35 +
    serviceCareBonus(state) * 1.1 +
    bathhouseRestBonus(state) * 1.2 +
    clinicCareBonus(state) * 0.9 +
    aquariumWonderBonus(state) * 1.4 +
    skyportFlowBonus(state) * 1.85 +
    festivalBuzzBonus(state) * 1.55;
  const queueRelief = 1 - Math.min(0.32, serviceCareBonus(state) * 0.9 + foodWarmthBonus(state) * 0.45);
  const crowdPause = queueCount * (2.8 + Math.random() * 1.8) * queueRelief;
  const quietBeat = Math.random() < 0.18 + queueCount * 0.08 ? 4.5 + Math.random() * 6 : 0;
  return clamp(base + crowdPause + quietBeat - happinessPull - entrancePull - districtPull, 7, 30);
}

function shouldVisitorArrive(queueCount) {
  const serviceRelief = Math.min(0.12, serviceCareBonus(state) * 0.5);
  const foodRelief = Math.min(0.06, foodWarmthBonus(state) * 0.3);
  const crowdFactor = clamp(1 - queueCount * (0.35 - serviceRelief - foodRelief), 0.08, 1);
  const moodFactor = clamp(
    0.42 +
      state.happiness / 360 +
      lobbyDispatchBonus(state) * 0.12 +
      foodWarmthBonus(state) * 0.12 +
      gardenComfortBonus(state) * 0.18 +
      serviceCareBonus(state) * 0.14 +
      entertainmentJoyBonus(state) * 0.15 +
      bathhouseRestBonus(state) * 0.14 +
      aquariumWonderBonus(state) * 0.16 +
      skyportFlowBonus(state) * 0.16 +
      festivalBuzzBonus(state) * 0.18,
    0.42,
    0.92
  );
  return Math.random() < crowdFactor * moodFactor;
}

function updatePassiveEconomy(dt) {
  state.passiveTimer += dt;
  if (state.passiveTimer < 1.8) return;
  const step = state.passiveTimer;
  state.passiveTimer = 0;

  businessFloors(state).forEach((floor) => {
    if (floor.stock <= 0 || floor.workers.length === 0 || floor.production) return;
    const skill = averageSkill(floor.workers, floor.type);
    const toolFlow = craftToolBonus(state) * (floor.type === "craft" ? 0.14 : 0.06);
    floor.saleRemainder += (0.16 + skill * 0.025 + state.happiness * 0.0015 + toolFlow) * step;
    const sold = Math.min(floor.stock, Math.floor(floor.saleRemainder));
    if (sold <= 0) return;
    floor.saleRemainder -= sold;
    floor.stock -= sold;
    const income = Math.round(sold * FLOOR_TYPES[floor.type].price * businessIncomeMultiplier(floor, state));
    addCoins(income);
  });

  const gardenPower = floorTypeInfluence(state, "garden");
  if (gardenPower > 0 && state.happiness < 100) {
    state.happiness = clamp(state.happiness + gardenPower * 0.018 * step, 0, 100);
  }
  const foodPower = floorTypeInfluence(state, "food");
  if (foodPower > 0 && state.happiness < 88) {
    state.happiness = clamp(state.happiness + foodPower * 0.011 * step, 0, 88);
  }
  const entertainmentPower = floorTypeInfluence(state, "entertainment");
  if (entertainmentPower > 0 && state.happiness < 94) {
    state.happiness = clamp(state.happiness + entertainmentPower * 0.015 * step, 0, 94);
  }
  const bathhousePower = floorTypeInfluence(state, "bathhouse");
  if (bathhousePower > 0 && state.happiness < 100) {
    state.happiness = clamp(state.happiness + bathhousePower * 0.024 * step, 0, 100);
  }
  const clinicPower = floorTypeInfluence(state, "clinic");
  if (clinicPower > 0 && state.happiness < 100) {
    state.happiness = clamp(state.happiness + clinicPower * 0.018 * step, 0, 100);
  }
  const aquariumPower = floorTypeInfluence(state, "aquarium");
  if (aquariumPower > 0 && state.happiness < 100) {
    state.happiness = clamp(state.happiness + aquariumPower * 0.016 * step, 0, 100);
  }
  const festivalPower = floorTypeInfluence(state, "festival");
  if (festivalPower > 0 && state.happiness < 100) {
    state.happiness = clamp(state.happiness + festivalPower * 0.017 * step, 0, 100);
  }
}

function makeEmptyCollection() {
  return COLLECTION_DEFS.reduce((acc, item) => {
    acc[item.id] = 0;
    return acc;
  }, {});
}

function ensureOrders(game) {
  const active = game.orders || [];
  const capacity = orderCapacity(game);
  const autoFill = Math.min(3, capacity);
  while (active.length < autoFill) {
    active.push(createOrder(game));
  }
  game.orders = active.slice(0, capacity);
}

function orderCapacity(game = state) {
  const marketPower = floorTypeInfluence(game, "market");
  const marketSlots = marketPower > 0 ? 1 + (marketPower >= 2.2 ? 1 : 0) : 0;
  return Math.min(5, 3 + marketSlots + Math.floor(skyportFlowBonus(game) * 2));
}

function createOrder(game, options = {}) {
  const builtTypes = [...new Set(businessFloors(game).map((floor) => floor.type))];
  const pool = builtTypes.length ? builtTypes : ["food", "service"];
  const type = options.type || pick(pool.length ? pool : ["food", "service"]);
  const floorsOfType = businessFloors(game).filter((candidate) => candidate.type === type);
  const floor = floorsOfType.sort((a, b) => (options.preferStocked ? b.stock - a.stock : a.stock - b.stock))[0] || businessFloors(game)[0];
  const stocked = floorsOfType.reduce((sum, candidate) => sum + (candidate.stock || 0), 0);
  const baseAmount = type === "treasure" ? randInt(3, 4) : randInt(4, 7);
  const amount = options.amount || (options.preferStocked && stocked > 0 ? clamp(randInt(Math.max(2, Math.floor(stocked * 0.42)), Math.max(3, stocked)), 3, type === "treasure" ? 5 : 9) : baseAmount);
  const prestige = floor?.level || 1;
  const craftCrate = type === "craft" ? craftToolBonus(game) * 0.45 : 0;
  const vaultPremium = type === "treasure" ? treasureVaultBonus(game) * 0.42 : treasureVaultBonus(game) * 0.12;
  const potionPremium = type === "alchemy" ? alchemyPotionBonus(game) * 0.36 : alchemyPotionBonus(game) * 0.1;
  const sourceBoost = options.source === "market" ? 1.12 + marketTradeBonus(game) * 0.45 : 1;
  const reward = Math.round((FLOOR_TYPES[type].price * amount * 2.2 + prestige * 35) * collectionOrderBonus(game) * orderNetworkBonus(game) * (1 + craftCrate + vaultPremium + potionPremium) * sourceBoost);
  const gemReward = type === "treasure" ? 2 : Math.random() < 0.45 + observatoryStarBonus(game) * 0.35 + craftCrate + alchemyPotionBonus(game) * 0.18 + treasureVaultBonus(game) * 0.12 ? 1 : 0;
  return {
    id: `ord-${game.nextLogId++}`,
    type,
    amount,
    delivered: 0,
    reward,
    gemReward,
    title: `交付 ${FLOOR_TYPES[type].label} ${amount}`,
    note: options.note || (floor ? `送往 ${floor.name}` : `任意${FLOOR_TYPES[type].label}楼层`),
    source: options.source || "royal",
    bonusRelic: Math.random() < (options.source === "market" ? 0.44 : 0.35),
    royalMandate: null,
    marketParcel: null,
  };
}

function orderSourceLabel(order) {
  return order?.source === "market" ? "市集快单" : "王室订单";
}

function normalizeOrderMandate(order) {
  if (!order || typeof order !== "object") return order;
  const amount = Math.max(1, Number(order.amount) || 1);
  if (!order.royalMandate || typeof order.royalMandate !== "object") {
    delete order.royalMandate;
    return order;
  }
  const prepared = clamp(Number(order.royalMandate.prepared) || 0, 0, amount);
  const rewardBonus = Math.max(0, Number(order.royalMandate.rewardBonus) || 0);
  const receiptBonus = Math.max(0, Number(order.royalMandate.receiptBonus) || 0);
  const delivered = Boolean(order.royalMandate.delivered);
  if (!prepared && !rewardBonus && !receiptBonus && !order.royalMandate.active && !delivered) {
    delete order.royalMandate;
    return order;
  }
  order.royalMandate = {
    floorId: Number(order.royalMandate.floorId) || 0,
    prepared,
    rewardBonus,
    receiptBonus,
    active: Boolean(order.royalMandate.active),
    seal: Boolean(order.royalMandate.seal),
    delivered,
    routeLabel: typeof order.royalMandate.routeLabel === "string" ? order.royalMandate.routeLabel.slice(0, 48) : "",
  };
  return order;
}

function orderMandatePrepared(order) {
  return clamp(Number(order?.royalMandate?.prepared) || 0, 0, Math.max(1, Number(order?.amount) || 1));
}

function normalizeOrderLogistics(order) {
  normalizeOrderMandate(order);
  if (!order || typeof order !== "object") return order;
  const amount = Math.max(1, Number(order.amount) || 1);
  if (!order.marketParcel || typeof order.marketParcel !== "object") {
    delete order.marketParcel;
    return order;
  }
  const maxPacked = Math.max(0, amount - orderMandatePrepared(order));
  const packed = clamp(Number(order.marketParcel.packed) || 0, 0, maxPacked);
  const rewardBonus = Math.max(0, Number(order.marketParcel.rewardBonus) || 0);
  if (!packed && !rewardBonus && !order.marketParcel.active && !order.marketParcel.shipped) {
    delete order.marketParcel;
    return order;
  }
  order.marketParcel = {
    floorId: Number(order.marketParcel.floorId) || 0,
    packed,
    rewardBonus,
    active: Boolean(order.marketParcel.active),
    shipped: Boolean(order.marketParcel.shipped),
  };
  return order;
}

function orderMarketPacked(order) {
  const amount = Math.max(1, Number(order?.amount) || 1);
  const maxPacked = Math.max(0, amount - orderMandatePrepared(order));
  return clamp(Number(order?.marketParcel?.packed) || 0, 0, maxPacked);
}

function orderPreparedTotal(order) {
  const amount = Math.max(1, Number(order?.amount) || 1);
  return clamp(orderMandatePrepared(order) + orderMarketPacked(order), 0, amount);
}

function orderRawStock(order, game = state) {
  return businessFloors(game)
    .filter((floor) => floor.type === order.type)
    .reduce((sum, floor) => sum + (floor.stock || 0), 0);
}

function orderStockInfo(order, game = state) {
  const floors = businessFloors(game).filter((floor) => floor.type === order.type);
  const stockOwned = floors.reduce((sum, floor) => sum + floor.stock, 0);
  const mandatePrepared = orderMandatePrepared(order);
  const packed = orderMarketPacked(order);
  const prepared = clamp(mandatePrepared + packed, 0, Math.max(1, Number(order.amount) || 1));
  const owned = stockOwned + prepared;
  const bestFloor = floors.sort((a, b) => {
    const missingA = a.stock > 0 ? 0 : a.production ? 1 : a.workers?.length ? 2 : 3;
    const missingB = b.stock > 0 ? 0 : b.production ? 1 : b.workers?.length ? 2 : 3;
    return missingA - missingB || b.stock - a.stock || a.id - b.id;
  })[0];
  return {
    owned,
    stockOwned,
    mandatePrepared,
    packed,
    prepared,
    missing: Math.max(0, order.amount - owned),
    ready: owned >= order.amount,
    floor: bestFloor || null,
  };
}

function orderSupplySegments(order, info = orderStockInfo(order)) {
  const amount = Math.max(1, Number(order?.amount) || 1);
  const stock = clamp(Number(info.stockOwned) || 0, 0, amount);
  const mandate = clamp(Number(info.mandatePrepared) || 0, 0, Math.max(0, amount - stock));
  const packed = clamp(Number(info.packed) || 0, 0, Math.max(0, amount - stock - mandate));
  const filled = clamp(stock + mandate + packed, 0, amount);
  const missing = Math.max(0, amount - filled);
  const pct = (value) => `${clamp((value / amount) * 100, 0, 100).toFixed(2)}%`;
  return {
    stock,
    mandate,
    packed,
    missing,
    filled,
    stockPct: pct(stock),
    mandatePct: pct(mandate),
    packedPct: pct(packed),
    missingPct: pct(missing),
    filledPct: clamp((filled / amount) * 100, 0, 100),
  };
}

function orderDispatchInfo(order, mandateFloor = null) {
  const info = orderStockInfo(order);
  const segments = orderSupplySegments(order, info);
  const typeLabel = FLOOR_TYPES[order.type]?.label || "订单";
  const ready = info.ready;
  const mandateActive = Boolean(order.royalMandate?.active);
  const parcelActive = Boolean(order.marketParcel?.active);
  const mandateReason = mandateFloor ? royalMandateActionBlockReason(mandateFloor, order) : "暂无可签令的王国楼层";
  const base = {
    order,
    info,
    segments,
    tone: "missing",
    stateLabel: `缺 ${info.missing}`,
    nextLabel: "定位补货",
    detail: info.floor
      ? `${info.floor.name} 还有 ${info.floor.stock || 0}/${info.floor.stockMax || 0} 现货`
      : `需要建造或补足 ${typeLabel} 楼层`,
    action: info.floor ? "focus" : "",
    actionLabel: info.floor ? "定位" : "等待",
    floorId: info.floor?.id || 0,
    disabled: !info.floor,
  };

  if (ready) {
    return {
      ...base,
      tone: "ready",
      stateLabel: "可交付",
      nextLabel: "立即交付",
      detail: `${typeLabel} ${order.amount} 件已备齐，交付可获得 ${order.reward} 金币${order.gemReward ? ` / ${order.gemReward} 宝石` : ""}`,
      action: "fulfill",
      actionLabel: "交付",
      disabled: false,
    };
  }

  if (mandateActive) {
    return {
      ...base,
      tone: "running",
      stateLabel: "王令中",
      nextLabel: "等待王令",
      detail: `王令正在补 ${typeLabel} 缺口，已预备 ${info.mandatePrepared}/${order.amount}`,
      action: order.royalMandate?.floorId ? "focus" : "",
      actionLabel: order.royalMandate?.floorId ? "看王令" : "等待",
      floorId: Number(order.royalMandate?.floorId) || 0,
      disabled: !order.royalMandate?.floorId,
    };
  }

  if (parcelActive) {
    return {
      ...base,
      tone: "running",
      stateLabel: "包裹中",
      nextLabel: "等待包裹",
      detail: `市集正在打包 ${typeLabel}，已装箱 ${info.packed}/${order.amount}`,
      action: order.marketParcel?.floorId ? "focus" : "",
      actionLabel: order.marketParcel?.floorId ? "看包裹" : "等待",
      floorId: Number(order.marketParcel?.floorId) || 0,
      disabled: !order.marketParcel?.floorId,
    };
  }

  if (!mandateReason) {
    return {
      ...base,
      tone: "mandate",
      stateLabel: `缺 ${info.missing}`,
      nextLabel: "签令补缺",
      detail: `王国可优先补 ${typeLabel} 缺口，真实库存 ${Math.min(info.stockOwned, order.amount)}/${order.amount}`,
      action: "mandate",
      actionLabel: "签令",
      floorId: mandateFloor.id,
      disabled: false,
    };
  }

  if (info.floor) {
    const stocking = Boolean(info.floor.production);
    const empty = (info.floor.stock || 0) <= 0;
    return {
      ...base,
      tone: empty ? "missing" : "stock",
      stateLabel: `缺 ${info.missing}`,
      nextLabel: stocking ? "等待补货" : empty ? "定位补货" : "定位现货",
      detail: stocking
        ? `${info.floor.name} 正在补货，剩余 ${Math.ceil(info.floor.production.remaining || 0)}s`
        : empty
          ? `${info.floor.name} 货架见底，先补货再交付`
          : `${info.floor.name} 有 ${info.floor.stock || 0} 件现货，可继续凑单`,
      action: "focus",
      actionLabel: stocking ? "看补货" : "定位",
      floorId: info.floor.id,
      disabled: false,
    };
  }

  return {
    ...base,
    tone: "blocked",
    nextLabel: "缺少产线",
    detail: `王国暂时找不到 ${typeLabel} 楼层，先建设或等待新订单`,
  };
}

function orderDispatchPriority(dispatch) {
  const rank = {
    ready: 0,
    mandate: 1,
    stock: 2,
    missing: 3,
    running: 4,
    blocked: 5,
  };
  return (rank[dispatch.tone] ?? 9) * 100000 - (dispatch.order.reward || 0) * 10 - (dispatch.info.missing || 0);
}

function orderDispatchSummary(mandateFloor) {
  const dispatches = state.orders.map((order) => orderDispatchInfo(order, mandateFloor));
  const totals = dispatches.reduce(
    (sum, dispatch) => {
      sum.amount += Math.max(1, Number(dispatch.order.amount) || 1);
      sum.filled += dispatch.segments.filled;
      if (dispatch.tone === "ready") sum.ready += 1;
      if (dispatch.tone === "running") sum.running += 1;
      if (dispatch.info.missing > 0 && dispatch.tone !== "running") sum.missing += 1;
      return sum;
    },
    { amount: 0, filled: 0, ready: 0, running: 0, missing: 0 }
  );
  const best = dispatches.slice().sort((a, b) => orderDispatchPriority(a) - orderDispatchPriority(b))[0] || null;
  const tone = totals.ready ? "ready" : totals.running ? "running" : totals.missing ? "missing" : "calm";
  return {
    dispatches,
    best,
    tone,
    ready: totals.ready,
    running: totals.running,
    missing: totals.missing,
    progress: totals.amount ? clamp((totals.filled / totals.amount) * 100, 0, 100) : 0,
  };
}

function bestMarketOrderType(game = state) {
  const candidates = businessFloors(game)
    .filter((floor) => floor.type !== "market" && floor.stock > 0)
    .map((floor) => ({
      type: floor.type,
      stock: businessFloors(game)
        .filter((candidate) => candidate.type === floor.type)
        .reduce((sum, candidate) => sum + (candidate.stock || 0), 0),
      price: FLOOR_TYPES[floor.type]?.price || 1,
    }))
    .sort((a, b) => b.stock * b.price - a.stock * a.price);
  return candidates[0]?.type || businessFloors(game).find((floor) => floor.type !== "market")?.type || "food";
}

function marketDealCooldown(floor) {
  const skill = averageSkill(floor.workers || [], "market");
  const network = marketTradeBonus(state);
  return Math.max(18, Math.round(42 - skill * 2.2 - network * 36 - clockworkTempoBonus(state) * 12));
}

function isActiveMarketParcel(floor) {
  return floor?.type === "market" && floor.marketParcel && Number(floor.marketParcel.remaining || 0) > 0;
}

function currentMarketParcelPhase(floor) {
  if (!isActiveMarketParcel(floor)) return MARKET_PARCEL_PHASES[0];
  const total = Math.max(1, Number(floor.marketParcel.total || 1));
  const progress = clamp(1 - Number(floor.marketParcel.remaining || 0) / total, 0, 1);
  return MARKET_PARCEL_PHASES.slice()
    .reverse()
    .find((phase) => progress >= phase.threshold) || MARKET_PARCEL_PHASES[0];
}

function marketDealActionBlockReason(floor) {
  if (!floor || floor.type !== "market") return "需要市集楼层";
  if (!floor.workers?.length) return "市集需要员工撮合快单";
  if ((floor.stock || 0) <= 0) return "市集货摊空了，先补货";
  if (isActiveMarketParcel(floor)) return "市集包裹正在流转";
  if ((floor.marketCooldown || 0) > 0) return `摊主还在谈价：${Math.ceil(floor.marketCooldown)}s`;
  if ((state.orders || []).length >= orderCapacity(state)) return "订单栏已满，先交付一张";
  if (!businessFloors(state).some((candidate) => candidate.type !== "market" && candidate.stock > 0)) return "需要其他经营楼层先备出可售现货";
  return "";
}

function collectOrderStockForParcel(order, amount, game = state) {
  let remaining = Math.max(0, Math.round(amount || 0));
  if (!order || remaining <= 0) return 0;
  let collected = 0;
  businessFloors(game)
    .filter((floor) => floor.type === order.type && floor.stock > 0)
    .sort((a, b) => b.stock - a.stock || b.level - a.level || a.id - b.id)
    .forEach((floor) => {
      if (remaining <= 0) return;
      const take = Math.min(floor.stock || 0, remaining);
      floor.stock -= take;
      remaining -= take;
      collected += take;
    });
  return collected;
}

function applyMarketParcelStep(floor, order, scale = 1) {
  if (!floor || !order) return { packed: 0, reward: 0 };
  normalizeOrderLogistics(order);
  const mandatePrepared = orderMandatePrepared(order);
  const packedBefore = orderMarketPacked(order);
  const canPack = Math.max(0, order.amount - mandatePrepared - packedBefore);
  if (canPack <= 0) {
    if (order.marketParcel) order.marketParcel.active = false;
    return { packed: 0, reward: 0 };
  }
  const skill = averageSkill(floor.workers || [], "market");
  const batch = Math.max(1, Math.round((1 + skill / 7 + (floor.level || 1) * 0.2) * scale));
  const packed = collectOrderStockForParcel(order, Math.min(canPack, batch), state);
  if (packed <= 0) return { packed: 0, reward: 0 };

  const reward = Math.round((10 + (FLOOR_TYPES[order.type]?.price || 8) * packed * 0.34 + skill * 1.8) * (1 + marketTradeBonus(state) * 1.45));
  order.marketParcel ||= { floorId: floor.id, packed: 0, rewardBonus: 0, active: true, shipped: false };
  order.marketParcel.floorId = floor.id;
  order.marketParcel.active = true;
  order.marketParcel.packed = clamp(orderMarketPacked(order) + packed, 0, Math.max(0, order.amount - orderMandatePrepared(order)));
  order.marketParcel.rewardBonus = Math.max(0, Number(order.marketParcel.rewardBonus || 0) + reward);
  order.reward += reward;

  if (floor.marketParcel) {
    floor.marketParcel.packed = Math.max(0, Number(floor.marketParcel.packed || 0) + packed);
    floor.marketParcel.earned = Math.max(0, Number(floor.marketParcel.earned || 0) + reward);
    floor.marketParcel.phase = currentMarketParcelPhase(floor).id;
  }
  state.stats.marketParcelItemsPacked = (state.stats.marketParcelItemsPacked || 0) + packed;
  return { packed, reward };
}

function startMarketParcel(floor, order) {
  if (!floor || !order) return null;
  const duration = randFloat(18, 25);
  floor.marketParcel = {
    id: `parcel-${floor.id}-${Date.now()}-${randInt(10, 99)}`,
    orderId: order.id,
    type: order.type,
    remaining: duration,
    total: duration,
    pulseTimer: 0.2,
    packed: 0,
    earned: 0,
    phase: "quote",
  };
  order.marketParcel = {
    ...(order.marketParcel || {}),
    floorId: floor.id,
    packed: orderMarketPacked(order),
    rewardBonus: Math.max(0, Number(order.marketParcel?.rewardBonus) || 0),
    active: true,
    shipped: false,
  };
  state.stats.marketParcelsDone = (state.stats.marketParcelsDone || 0) + 1;
  applyMarketParcelStep(floor, order, 1);
  return floor.marketParcel;
}

function brokerMarketOrder(floor, options = {}) {
  if (!floor || floor.type !== "market") return null;
  const capacity = orderCapacity(state);
  if ((state.orders || []).length >= capacity) return null;
  if (isActiveMarketParcel(floor)) return null;
  const type = bestMarketOrderType(state);
  const stocked = businessFloors(state)
    .filter((candidate) => candidate.type === type)
    .reduce((sum, candidate) => sum + (candidate.stock || 0), 0);
  const minAmount = type === "treasure" ? 2 : 3;
  const maxAmount = type === "treasure" ? 5 : 9;
  const amount = clamp(Math.max(minAmount, Math.round(stocked * randFloat(0.48, 0.78))), minAmount, maxAmount);
  const order = createOrder(state, {
    type,
    amount,
    source: "market",
    preferStocked: true,
    note: `${floor.name}撮合 · ${stocked} 件现货`,
  });
  state.orders.unshift(order);
  state.orders = state.orders.slice(0, capacity);
  if (!options.free) floor.stock = Math.max(0, (floor.stock || 0) - 1);
  if (!options.noCooldown) floor.marketCooldown = marketDealCooldown(floor);
  state.stats.marketDealsDone = (state.stats.marketDealsDone || 0) + 1;
  startMarketParcel(floor, order);
  return order;
}

function startMarketDeal(floorId) {
  const floor = findFloor(floorId);
  if (!isBusiness(floor) || floor.type !== "market") return;
  const reason = marketDealActionBlockReason(floor);
  if (reason) {
    showToast(reason);
    return;
  }
  const order = brokerMarketOrder(floor);
  if (!order) return;
  showToast("市集撮合快单，包裹开始流转");
  addLog(`${floor.name} 撮合快单：${FLOOR_TYPES[order.type].label} ${order.amount}，摊位开始打包发货。`);
  render(true);
}

function updateMarketParcelFloor(floor, dt) {
  if (floor?.type !== "market") return false;
  const before = marketParcelMapKey(floor);
  if (!isActiveMarketParcel(floor)) return before !== marketParcelMapKey(floor);
  const order = state.orders.find((entry) => entry.id === floor.marketParcel.orderId);
  if (!order) {
    floor.marketParcel = null;
    return true;
  }
  floor.marketParcel.remaining = Math.max(0, Number(floor.marketParcel.remaining || 0) - dt);
  floor.marketParcel.pulseTimer = Math.max(0, Number(floor.marketParcel.pulseTimer || 0) - dt);
  floor.marketParcel.phase = currentMarketParcelPhase(floor).id;
  order.marketParcel ||= { floorId: floor.id, packed: 0, rewardBonus: 0, active: true, shipped: false };
  order.marketParcel.active = true;
  if (floor.marketParcel.pulseTimer <= 0 && floor.marketParcel.remaining > 0) {
    const step = applyMarketParcelStep(floor, order, 1);
    if (!step.packed && orderStockInfo(order).ready) {
      order.marketParcel.active = false;
      order.marketParcel.shipped = true;
      addLog(`${floor.name} 的市集包裹提前备齐，订单已可交付。`);
      floor.marketParcel = null;
      return true;
    }
    floor.marketParcel.pulseTimer = randFloat(4.6, 6.4);
  }
  if (floor.marketParcel.remaining <= 0) {
    order.marketParcel.active = false;
    order.marketParcel.shipped = orderMarketPacked(order) > 0;
    addLog(`${floor.name} 的包裹流转完成，已打包 ${orderMarketPacked(order)}/${order.amount} 件。`);
    floor.marketParcel = null;
  }
  return before !== marketParcelMapKey(floor);
}

function renderMarketParcelPanel(floor) {
  if (floor?.type !== "market") return "";
  const active = isActiveMarketParcel(floor);
  const order = active ? state.orders.find((entry) => entry.id === floor.marketParcel.orderId) : null;
  const phase = active ? currentMarketParcelPhase(floor) : MARKET_PARCEL_PHASES[0];
  const progress = active ? Math.round((1 - floor.marketParcel.remaining / Math.max(1, floor.marketParcel.total)) * 100) : 0;
  const packed = order ? orderMarketPacked(order) : 0;
  const status = active
    ? `${phase.label} ${Math.ceil(floor.marketParcel.remaining)}s · ${FLOOR_TYPES[order?.type]?.label || "订单"}`
    : (floor.marketCooldown || 0) > 0
      ? `冷却 ${Math.ceil(floor.marketCooldown)}s`
      : "等待撮合快单";
  const detail = active
    ? `已打包 ${packed}/${order?.amount || 0} · 加价 ${floor.marketParcel.earned || 0}`
    : `包裹 ${state.stats.marketParcelsDone || 0} 次 · 打包 ${state.stats.marketParcelItemsPacked || 0} 件`;
  return `
    <div class="market-parcel-panel ${active ? "active" : ""}" data-phase="${escapeAttr(phase.id)}">
      <div class="market-parcel-head">
        <strong>市集包裹流</strong>
        <em>${active ? phase.label : "待单"}</em>
      </div>
      <div class="market-parcel-track" style="--parcel-x:${progress}%" aria-hidden="true">
        <i style="width:${progress}%"></i>
        <b></b>
      </div>
      <span>${escapeHtml(status)}</span>
      <small>${escapeHtml(detail)}</small>
    </div>`;
}

function marketParcelMapKey(floor) {
  if (floor?.type !== "market") return "";
  const order = floor.marketParcel?.orderId ? state.orders.find((entry) => entry.id === floor.marketParcel.orderId) : null;
  const packed = order ? orderMarketPacked(order) : 0;
  return `parcel:${Math.ceil(floor.marketCooldown || 0)}:${Math.ceil(floor.marketParcel?.remaining || 0)}:${floor.marketParcel?.orderId || ""}:${floor.marketParcel?.phase || ""}:${floor.marketParcel?.packed || 0}:${floor.marketParcel?.earned || 0}:${packed}`;
}

function clearMarketParcelForOrder(orderId) {
  businessFloors(state).forEach((floor) => {
    if (floor.type === "market" && floor.marketParcel?.orderId === orderId) {
      floor.marketParcel = null;
    }
  });
  lastKingdomKey = "";
}

function isActiveRoyalMandate(floor) {
  return floor?.type === "kingdom" && floor.royalMandate && Number(floor.royalMandate.remaining || 0) > 0;
}

function currentRoyalMandatePhase(floor) {
  if (!isActiveRoyalMandate(floor)) return ROYAL_MANDATE_PHASES[0];
  const total = Math.max(1, Number(floor.royalMandate.total || 1));
  const progress = clamp(1 - Number(floor.royalMandate.remaining || 0) / total, 0, 1);
  return ROYAL_MANDATE_PHASES.slice()
    .reverse()
    .find((phase) => progress >= phase.threshold) || ROYAL_MANDATE_PHASES[0];
}

function royalCourierProgress(floor) {
  if (!isActiveRoyalMandate(floor)) return 0;
  const total = Math.max(1, Number(floor.royalMandate.total || 1));
  return clamp(1 - Number(floor.royalMandate.remaining || 0) / total, 0, 1);
}

function currentRoyalCourierPhase(floor) {
  if (!isActiveRoyalMandate(floor)) return ROYAL_COURIER_PHASES[0];
  const progress = royalCourierProgress(floor);
  return ROYAL_COURIER_PHASES.slice()
    .reverse()
    .find((phase) => progress >= phase.threshold) || ROYAL_COURIER_PHASES[0];
}

function royalCourierRouteLabel(floor, order) {
  const targetFloor = order ? orderStockInfo(order).floor : null;
  const from = floor ? formatFloorLabel(floor.id) : "王令";
  const to = targetFloor ? `${formatFloorLabel(targetFloor.id)} ${FLOOR_TYPES[targetFloor.type]?.label || "楼层"}` : `${FLOOR_TYPES[order?.type]?.label || "订单"}缺口`;
  return `${from}→${to}`;
}

function royalCourierReceiptBonus(floor, order) {
  const skill = averageSkill(floor?.workers || [], "kingdom");
  const prepared = orderMandatePrepared(order);
  return Math.round((18 + prepared * 3.2 + skill * 2.4 + (floor?.level || 1) * 4) * (1 + kingdomMandateBonus(state) * 1.45));
}

function applyRoyalCourierMotion(floor) {
  if (!isActiveRoyalMandate(floor)) return;
  const phase = currentRoyalCourierPhase(floor);
  (floor.workers || [])
    .map((id) => getResident(id))
    .filter(Boolean)
    .forEach((worker, index) => {
      const activities = {
        desk: ["work", "look", "talk"],
        gate: ["wave", "stroll", "look"],
        route: ["stroll", "wave", "work"],
        receipt: ["wave", "talk", "work"],
      }[phase.id] || ["work"];
      worker.activity = activities[index % activities.length];
      worker.lifeWish = `${phase.label}王令信使`;
      assignPersonMotion(worker, floor.type, worker.activity);
    });
}

function completeRoyalMandateDelivery(floor, order, options = {}) {
  if (!floor || !order) return 0;
  normalizeOrderMandate(order);
  order.royalMandate ||= { floorId: floor.id, prepared: 0, rewardBonus: 0, active: false, seal: false };
  if (order.royalMandate.delivered) {
    order.royalMandate.active = false;
    return 0;
  }
  const routeLabel = order.royalMandate.routeLabel || floor.royalMandate?.routeLabel || royalCourierRouteLabel(floor, order);
  const bonus = royalCourierReceiptBonus(floor, order);
  order.royalMandate.active = false;
  order.royalMandate.delivered = true;
  order.royalMandate.routeLabel = routeLabel;
  order.royalMandate.receiptBonus = Math.max(0, Number(order.royalMandate.receiptBonus || 0) + bonus);
  order.royalMandate.rewardBonus = Math.max(0, Number(order.royalMandate.rewardBonus || 0) + bonus);
  order.reward += bonus;
  if (floor.royalMandate) {
    floor.royalMandate.courierProgress = 1;
    floor.royalMandate.courierPhase = "receipt";
    floor.royalMandate.receiptBonus = bonus;
    floor.royalMandate.routeLabel = routeLabel;
  }
  state.stats.royalCourierReceiptsDone = (state.stats.royalCourierReceiptsDone || 0) + 1;
  state.happiness = clamp(state.happiness + (options.early ? 2 : 1), 0, 100);
  return bonus;
}

function royalMandateCooldown(floor) {
  const skill = averageSkill(floor.workers || [], "kingdom");
  return Math.max(22, Math.round(54 - skill * 2.2 - kingdomMandateBonus(state) * 42 - clockworkTempoBonus(state) * 10));
}

function royalMandateReadyBlock(floor) {
  if (!floor || floor.type !== "kingdom") return "需要王国楼层";
  if (!floor.workers?.length) return "王国楼层需要官员签令";
  if ((floor.stock || 0) <= 0) return "王国印信不足，先补货";
  if (isActiveRoyalMandate(floor)) return "王令正在签发";
  if ((floor.royalMandateCooldown || 0) > 0) return `还要 ${Math.ceil(floor.royalMandateCooldown)}s 才能再次签令`;
  return "";
}

function availableRoyalMandateFloor() {
  return businessFloors(state)
    .filter((floor) => floor.type === "kingdom" && !royalMandateReadyBlock(floor))
    .sort((a, b) => averageSkill(b.workers || [], "kingdom") - averageSkill(a.workers || [], "kingdom") || b.level - a.level)[0] || null;
}

function bestRoyalMandateOrder(game = state, explicitOrderId = "") {
  ensureOrders(game);
  const orders = explicitOrderId ? game.orders.filter((order) => order.id === explicitOrderId) : game.orders;
  return orders
    .map((order, index) => {
      const rawStock = orderRawStock(order, game);
      const prepared = orderPreparedTotal(order);
      const missing = Math.max(0, order.amount - rawStock - prepared);
      const repeatPenalty = order.royalMandate?.active ? -100 : 0;
      const readyPenalty = missing <= 0 ? -4 : 0;
      const rewardWeight = Math.min(12, (order.reward || 0) / 90);
      const sourceWeight = order.source === "market" ? 1.2 : 2;
      return { order, missing, score: missing * 4.5 + rewardWeight + sourceWeight + readyPenalty + repeatPenalty - index * 0.08 };
    })
    .filter(({ missing }) => explicitOrderId || missing > 0)
    .sort((a, b) => b.score - a.score)[0]?.order || null;
}

function royalMandateActionBlockReason(floor, order = null) {
  const readyBlock = royalMandateReadyBlock(floor);
  if (readyBlock) return readyBlock;
  const target = order || bestRoyalMandateOrder(state);
  if (!target) return "暂无可签发的订单";
  if (target.royalMandate?.active) return "这张订单已经在签令";
  if (orderStockInfo(target).ready) return "这张订单已经可交付";
  return "";
}

function applyRoyalMandateStep(floor, order, scale = 1) {
  if (!floor || !order) return { prepared: 0, reward: 0 };
  normalizeOrderMandate(order);
  const skill = averageSkill(floor.workers || [], "kingdom");
  const rawStock = orderRawStock(order);
  const preparedBefore = orderPreparedTotal(order);
  const missing = Math.max(0, order.amount - rawStock - preparedBefore);
  if (missing <= 0) {
    if (order.royalMandate) order.royalMandate.active = false;
    return { prepared: 0, reward: 0 };
  }
  const prepared = Math.min(missing, Math.max(1, Math.round(1 + skill / 6 + (floor.level || 1) * 0.22)) * scale);
  const reward = Math.round((16 + (FLOOR_TYPES[order.type]?.price || 8) * (prepared || 1) + skill * 2.5) * (1 + kingdomMandateBonus(state) * 1.8));
  order.royalMandate ||= { floorId: floor.id, prepared: 0, rewardBonus: 0, active: true, seal: false };
  order.royalMandate.floorId = floor.id;
  order.royalMandate.active = true;
  order.royalMandate.prepared = clamp(orderMandatePrepared(order) + prepared, 0, Math.max(0, order.amount - orderMarketPacked(order)));
  order.royalMandate.rewardBonus = Math.max(0, Number(order.royalMandate.rewardBonus || 0) + reward);
  if (!order.royalMandate.seal && Math.random() < 0.16 + kingdomMandateBonus(state) * 0.55) {
    order.royalMandate.seal = true;
    order.gemReward = (order.gemReward || 0) + 1;
  }
  order.reward += reward;
  floor.royalMandate.prepared = Math.max(0, Number(floor.royalMandate.prepared || 0) + prepared);
  floor.royalMandate.earned = Math.max(0, Number(floor.royalMandate.earned || 0) + reward);
  floor.royalMandate.phase = currentRoyalMandatePhase(floor).id;
  return { prepared, reward };
}

function startRoyalMandate(floorId, orderId = "") {
  const floor = findFloor(floorId);
  if (!isBusiness(floor) || floor.type !== "kingdom") return;
  const target = bestRoyalMandateOrder(state, orderId);
  const reason = royalMandateActionBlockReason(floor, target);
  if (reason) {
    showToast(reason);
    return;
  }
  const duration = randFloat(28, 38);
  const routeLabel = royalCourierRouteLabel(floor, target);
  floor.stock = Math.max(0, (floor.stock || 0) - 1);
  floor.royalMandateCooldown = royalMandateCooldown(floor);
  floor.royalMandate = {
    id: `mandate-${floor.id}-${Date.now()}-${randInt(10, 99)}`,
    orderId: target.id,
    type: target.type,
    remaining: duration,
    total: duration,
    pulseTimer: 0.2,
    prepared: 0,
    earned: 0,
    receiptBonus: 0,
    courierProgress: 0,
    courierPhase: "desk",
    routeLabel,
    phase: "draft",
  };
  target.royalMandate = {
    ...(target.royalMandate || {}),
    floorId: floor.id,
    prepared: orderMandatePrepared(target),
    rewardBonus: Math.max(0, Number(target.royalMandate?.rewardBonus) || 0),
    active: true,
    seal: Boolean(target.royalMandate?.seal),
    delivered: false,
    receiptBonus: Math.max(0, Number(target.royalMandate?.receiptBonus) || 0),
    routeLabel,
  };
  state.stats.royalMandatesDone = (state.stats.royalMandatesDone || 0) + 1;
  applyRoyalMandateStep(floor, target, 1);
  applyRoyalCourierMotion(floor);
  showToast(`王令已签发：${FLOOR_TYPES[target.type].label}`);
  addLog(`${floor.name} 签发王令，优先推进「${target.title}」。`);
  lastKingdomKey = "";
  render(true);
}

function updateRoyalMandateFloor(floor, dt) {
  if (floor?.type !== "kingdom") return false;
  const before = royalMandateMapKey(floor);
  floor.royalMandateCooldown = Math.max(0, (floor.royalMandateCooldown || 0) - dt * (1 + clockworkTempoBonus(state) * 0.18));
  if (!isActiveRoyalMandate(floor)) return before !== royalMandateMapKey(floor);
  const order = state.orders.find((entry) => entry.id === floor.royalMandate.orderId);
  if (!order) {
    delete floor.royalMandate;
    return true;
  }
  floor.royalMandate.remaining = Math.max(0, Number(floor.royalMandate.remaining || 0) - dt);
  floor.royalMandate.pulseTimer = Math.max(0, Number(floor.royalMandate.pulseTimer || 0) - dt);
  floor.royalMandate.phase = currentRoyalMandatePhase(floor).id;
  floor.royalMandate.courierProgress = royalCourierProgress(floor);
  floor.royalMandate.courierPhase = currentRoyalCourierPhase(floor).id;
  floor.royalMandate.routeLabel ||= royalCourierRouteLabel(floor, order);
  order.royalMandate ||= { floorId: floor.id, prepared: 0, rewardBonus: 0, active: true, seal: false };
  order.royalMandate.active = true;
  order.royalMandate.routeLabel ||= floor.royalMandate.routeLabel;
  applyRoyalCourierMotion(floor);
  if (floor.royalMandate.pulseTimer <= 0 && floor.royalMandate.remaining > 0) {
    const step = applyRoyalMandateStep(floor, order, 1);
    if (!step.prepared && orderStockInfo(order).ready) {
      completeRoyalMandateDelivery(floor, order, { early: true });
      addLog(`${floor.name} 的王令提前送达，订单已可交付。`);
      delete floor.royalMandate;
      return true;
    }
    floor.royalMandate.pulseTimer = randFloat(6.4, 8.8);
  }
  if (floor.royalMandate.remaining <= 0) {
    completeRoyalMandateDelivery(floor, order);
    addLog(`${floor.name} 的王令传达完毕，订单已预备 ${orderMandatePrepared(order)}/${order.amount}。`);
    delete floor.royalMandate;
  }
  return before !== royalMandateMapKey(floor);
}

function renderRoyalMandatePanel(floor) {
  if (floor?.type !== "kingdom") return "";
  const active = isActiveRoyalMandate(floor);
  const order = active ? state.orders.find((entry) => entry.id === floor.royalMandate.orderId) : bestRoyalMandateOrder(state);
  const phase = active ? currentRoyalMandatePhase(floor) : ROYAL_MANDATE_PHASES[0];
  const info = order ? orderStockInfo(order) : null;
  const progress = active ? Math.round((1 - floor.royalMandate.remaining / Math.max(1, floor.royalMandate.total)) * 100) : 0;
  const courierPhase = active ? currentRoyalCourierPhase(floor) : ROYAL_COURIER_PHASES[0];
  const courierProgress = active ? Math.round(royalCourierProgress(floor) * 100) : 0;
  const routeLabel = active ? floor.royalMandate.routeLabel || royalCourierRouteLabel(floor, order) : order?.royalMandate?.routeLabel || "";
  const receipts = state.stats.royalCourierReceiptsDone || 0;
  const status = active
    ? `${phase.label} ${Math.ceil(floor.royalMandate.remaining)}s · ${FLOOR_TYPES[order?.type]?.label || "订单"}`
    : (floor.royalMandateCooldown || 0) > 0
      ? `冷却 ${Math.ceil(floor.royalMandateCooldown)}s`
      : order
        ? `候选：${order.title}`
        : "等待订单";
  const prepared = info ? `王令预备 ${info.mandatePrepared}/${order.amount} · 缺 ${info.missing}` : "暂无订单";
  const earned = active ? ` · 加赏 ${floor.royalMandate.earned || 0}` : "";
  return `
    <div class="royal-mandate-panel ${active ? "active" : ""}" data-phase="${escapeAttr(phase.id)}" data-courier-phase="${escapeAttr(courierPhase.id)}">
      <div class="royal-mandate-head">
        <strong>王令签发</strong>
        <em>${active ? phase.label : "待令"}</em>
      </div>
      <div class="royal-mandate-meter" aria-hidden="true"><i style="width:${progress}%"></i></div>
      <div class="royal-courier-track" style="--courier-progress:${courierProgress}%" aria-hidden="true"><i></i><b></b></div>
      <span class="royal-courier-status">${escapeHtml(active ? `${courierPhase.label} · ${routeLabel}` : routeLabel ? `上次路线 ${routeLabel}` : `信使回执 ${receipts} 份`)}</span>
      <span>${escapeHtml(status)}</span>
      <small>${escapeHtml(prepared)}${earned} · 签发 ${state.stats.royalMandatesDone || 0} 次 · 回执 ${receipts} 份</small>
    </div>`;
}

function royalMandateMapKey(floor) {
  if (floor?.type !== "kingdom") return "";
  const order = floor.royalMandate?.orderId ? state.orders.find((entry) => entry.id === floor.royalMandate.orderId) : null;
  const prepared = order ? orderMandatePrepared(order) : 0;
  return `mandate:${Math.ceil(floor.royalMandateCooldown || 0)}:${Math.ceil(floor.royalMandate?.remaining || 0)}:${floor.royalMandate?.orderId || ""}:${floor.royalMandate?.phase || ""}:${floor.royalMandate?.courierPhase || ""}:${Math.round((floor.royalMandate?.courierProgress || 0) * 100)}:${floor.royalMandate?.routeLabel || ""}:${floor.royalMandate?.prepared || 0}:${floor.royalMandate?.earned || 0}:${floor.royalMandate?.receiptBonus || 0}:${prepared}`;
}

function clearRoyalMandateForOrder(orderId) {
  businessFloors(state).forEach((floor) => {
    if (floor.type === "kingdom" && floor.royalMandate?.orderId === orderId) {
      floor.royalMandate = null;
    }
  });
  lastKingdomKey = "";
}

function collectionProgress(game = state) {
  const total = COLLECTION_DEFS.reduce((sum, item) => sum + (game.collection?.[item.id] || 0), 0);
  const completed = COLLECTION_DEFS.filter((item) => (game.collection?.[item.id] || 0) >= 3).length;
  const max = COLLECTION_DEFS.length * 3;
  const next = nextCollectionItem(game);
  return { total, completed, max, next };
}

function nextCollectionItem(game = state) {
  const candidates = COLLECTION_DEFS.filter((item) => (game.collection?.[item.id] || 0) < 3);
  if (!candidates.length) return null;
  return candidates
    .slice()
    .sort((a, b) => (game.collection?.[b.id] || 0) - (game.collection?.[a.id] || 0) || a.name.localeCompare(b.name, "zh-CN"))[0];
}

function pickCatalogRelic(game = state, options = {}) {
  const candidates = COLLECTION_DEFS.filter((item) => (game.collection?.[item.id] || 0) < 3);
  if (!candidates.length) return null;
  if (options.itemId) {
    const exact = candidates.find((item) => item.id === options.itemId);
    if (exact) return exact;
  }
  if (options.preferCatalog) {
    const highest = Math.max(...candidates.map((item) => game.collection?.[item.id] || 0));
    const close = candidates.filter((item) => (game.collection?.[item.id] || 0) >= Math.max(0, highest - 1));
    return pick(close);
  }
  return pick(candidates);
}

function libraryStudyBonus(game = state) {
  return Math.min(0.12, (game.stats?.libraryStudiesDone || 0) * 0.006);
}

function libraryStudyCooldown(floor) {
  const skill = averageSkill(floor.workers || [], "library");
  return Math.max(20, Math.round(48 - skill * 2.4 - libraryResearchBonus(state) * 38 - clockworkTempoBonus(state) * 10));
}

function studyLibraryArchive(floor, options = {}) {
  if (!floor || floor.type !== "library") return null;
  const item = awardRelicPiece(state, { preferCatalog: true, sourceLabel: options.sourceLabel || "整理典藏" });
  const skill = averageSkill(floor.workers || [], "library");
  const reward = Math.round(34 + floor.level * 18 + skill * 14 + libraryResearchBonus(state) * 150);
  if (!options.free) floor.stock = Math.max(0, (floor.stock || 0) - 1);
  if (!options.noCooldown) floor.libraryCooldown = libraryStudyCooldown(floor);
  state.stats.libraryStudiesDone = (state.stats.libraryStudiesDone || 0) + 1;
  addCoins(reward);
  state.happiness = clamp(state.happiness + 1, 0, 100);
  return { item, reward };
}

function startLibraryStudy(floorId) {
  const floor = findFloor(floorId);
  if (!isBusiness(floor) || floor.type !== "library") return;
  if (!floor.workers.length) {
    showToast("书库需要馆员整理典藏");
    return;
  }
  if (floor.stock <= 0) {
    showToast("书库卷宗不足，先补货");
    return;
  }
  if ((floor.libraryCooldown || 0) > 0) {
    showToast(`馆员还在编目：${Math.ceil(floor.libraryCooldown)}s`);
    return;
  }
  const result = studyLibraryArchive(floor);
  if (!result) return;
  const itemText = result.item ? `发现 ${result.item.name}` : "图鉴已满，转化为宝石";
  showToast(`整理典藏：${itemText}`);
  addLog(`${floor.name} 整理典藏，${itemText}，追加 ${result.reward} 金币。`);
  render(true);
}

function isComfortFloorType(type) {
  return COMFORT_FLOOR_TYPES.includes(type);
}

function isActiveComfortSession(floor) {
  return Boolean(isComfortFloorType(floor?.type) && floor.comfortSession && Number(floor.comfortSession.remaining) > 0);
}

function normalizeComfortAfterglow(glow, floor = null) {
  if (!glow || typeof glow !== "object") return null;
  const type = isComfortFloorType(glow.type) ? glow.type : isComfortFloorType(floor?.type) ? floor.type : "garden";
  const remaining = Math.max(0, Number(glow.remaining) || 0);
  if (remaining <= 0) return null;
  const total = Math.max(1, Number(glow.total) || COMFORT_AFTERGLOW_TOTALS[type] || remaining || 1);
  const focus = COMFORT_FOCUS_OPTIONS[glow.focus] ? glow.focus : "";
  return {
    id: glow.id || `comfort-echo-${floor?.id || type}-${Date.now()}`,
    type,
    label: glow.label || COMFORT_AFTERGLOW_LABELS[type] || "舒缓余韵",
    remaining,
    total,
    participantIds: Array.isArray(glow.participantIds) ? glow.participantIds.map(Number).filter(Boolean) : [],
    rentBonus: Math.max(0, Number(glow.rentBonus) || 0),
    expeditionBonus: clamp(Number(glow.expeditionBonus) || 0.06, 0, 0.22),
    motiveEase: clamp(Number(glow.motiveEase) || 0.08, 0, 0.24),
    focus,
    focusLabel: focus ? COMFORT_FOCUS_OPTIONS[focus].label : "",
    focusApplied: Boolean(glow.focusApplied && focus),
    focusPulse: Math.max(0, Number(glow.focusPulse) || 0),
  };
}

function isActiveComfortAfterglow(floor) {
  return Boolean(isComfortFloorType(floor?.type) && floor.comfortAfterglow && Number(floor.comfortAfterglow.remaining) > 0);
}

function comfortFocusOption(focus) {
  return COMFORT_FOCUS_OPTIONS[focus] || null;
}

function comfortFocusLabel(glow) {
  const option = comfortFocusOption(glow?.focus);
  return option ? option.label : "待调息";
}

function comfortFocusTone(glow) {
  return comfortFocusOption(glow?.focus)?.id || "open";
}

function comfortFocusStatKey(focus) {
  if (focus === "rent") return "comfortRentFocusesDone";
  if (focus === "expedition") return "comfortExpeditionFocusesDone";
  if (focus === "recovery") return "comfortRecoveryFocusesDone";
  return "";
}

function comfortSessionBonus(game = state) {
  return Math.min(0.1, (game.stats?.comfortSessionsDone || 0) * 0.0035);
}

function comfortEchoPracticeBonus(game = state) {
  return Math.min(0.06, (game.stats?.comfortEchoesDone || 0) * 0.0025);
}

function activeComfortAfterglowBonus(game = state) {
  return Math.min(
    0.12,
    businessFloors(game).reduce((sum, floor) => {
      if (!isActiveComfortAfterglow(floor)) return sum;
      const glow = floor.comfortAfterglow;
      const ratio = clamp(Number(glow.remaining) / Math.max(1, Number(glow.total) || 1), 0, 1);
      const focusBoost = glow.focus === "recovery" ? 1.42 : glow.focus ? 1.12 : 1;
      return sum + (Number(glow.motiveEase) || 0.08) * (0.45 + ratio * 0.55) * focusBoost;
    }, 0)
  );
}

function comfortRentEchoBonus(game = state) {
  const focusBonus = businessFloors(game).reduce((sum, floor) => {
    if (!isActiveComfortAfterglow(floor) || floor.comfortAfterglow.focus !== "rent") return sum;
    const glow = floor.comfortAfterglow;
    const ratio = clamp(Number(glow.remaining) / Math.max(1, Number(glow.total) || 1), 0, 1);
    return sum + 0.026 + ratio * 0.034;
  }, 0);
  return Math.min(0.2, activeComfortAfterglowBonus(game) * 0.9 + comfortEchoPracticeBonus(game) * 0.55 + focusBonus);
}

function comfortExpeditionPrepBonus(game = state) {
  const focusBonus = businessFloors(game).reduce((sum, floor) => {
    if (!isActiveComfortAfterglow(floor) || floor.comfortAfterglow.focus !== "expedition") return sum;
    const glow = floor.comfortAfterglow;
    const ratio = clamp(Number(glow.remaining) / Math.max(1, Number(glow.total) || 1), 0, 1);
    return sum + 0.024 + ratio * 0.04;
  }, 0);
  return Math.min(
    0.22,
    activeComfortAfterglowBonus(game) * 0.75 +
      comfortEchoPracticeBonus(game) * 0.48 +
      businessFloors(game).reduce((sum, floor) => sum + (isActiveComfortAfterglow(floor) ? floor.comfortAfterglow.expeditionBonus || 0 : 0), 0) * 0.22 +
      focusBonus
  );
}

function isFoodRushFloorType(type) {
  return FOOD_RUSH_FLOOR_TYPES.includes(type);
}

function isActiveFoodRush(floor) {
  return Boolean(isFoodRushFloorType(floor?.type) && floor.foodRush && Number(floor.foodRush.remaining) > 0);
}

function foodRushPracticeBonus(game = state) {
  return Math.min(0.12, (game.stats?.foodRushesDone || 0) * 0.004 + (game.stats?.foodServingsDone || 0) * 0.0015);
}

function activeFoodRushBonus(game = state) {
  return businessFloors(game).some((floor) => isActiveFoodRush(floor)) ? 0.038 : 0;
}

function foodRushProgress(floor) {
  if (!isActiveFoodRush(floor)) return 0;
  const total = Math.max(1, Number(floor.foodRush.total) || 1);
  const servings = Math.max(1, Number(floor.foodRush.targetServings) || 1);
  const timeProgress = clamp(1 - Number(floor.foodRush.remaining || 0) / total, 0, 1);
  const serveProgress = clamp(Number(floor.foodRush.served || 0) / servings, 0, 1);
  return clamp(Math.max(timeProgress, serveProgress * 0.92), 0, 1);
}

function foodRushPaceForProgress(progress = 0) {
  return FOOD_RUSH_PACES.reduce((current, pace) => (progress >= pace.threshold ? pace : current), FOOD_RUSH_PACES[0]);
}

function foodRushCourseForProgress(progress = 0) {
  return FOOD_RUSH_COURSES.reduce((current, course) => (progress >= course.threshold ? course : current), FOOD_RUSH_COURSES[0]);
}

function currentFoodRushPace(floor) {
  if (!isFoodRushFloorType(floor?.type)) return FOOD_RUSH_PACES[0];
  const activePace = FOOD_RUSH_PACES.find((pace) => pace.id === floor.foodRush?.pace);
  return activePace || foodRushPaceForProgress(foodRushProgress(floor));
}

function currentFoodRushCourse(floor) {
  if (!isFoodRushFloorType(floor?.type)) return FOOD_RUSH_COURSES[0];
  const activeCourse = FOOD_RUSH_COURSES.find((course) => course.id === floor.foodRush?.course);
  return activeCourse || foodRushCourseForProgress(foodRushProgress(floor));
}

function foodRushTableCount(floor, diners = foodRushParticipants(floor)) {
  if (!isFoodRushFloorType(floor?.type)) return 0;
  return clamp(Math.ceil((diners.length || floor.foodRush?.participantIds?.length || 1) / 2), 1, 4);
}

function foodRushNextServiceProgress(floor) {
  if (!isActiveFoodRush(floor)) return 0;
  return clamp(1 - Number(floor.foodRush.serviceTimer || 0) / 6.1, 0, 1);
}

function foodRushHeatTone(floor) {
  const heat = Number(floor?.foodRush?.heat || 0);
  if (heat >= 76) return "peak";
  if (heat >= 46) return "busy";
  return "cozy";
}

function foodRushHeatLabel(floor) {
  const heat = Number(floor?.foodRush?.heat || 0);
  if (heat >= 76) return "满桌";
  if (heat >= 46) return "忙场";
  return "暖场";
}

function foodRushCooldown(floor) {
  const skill = averageSkill(floor.workers || [], floor.type);
  return Math.max(24, Math.round(58 - skill * 2 - serviceCareBonus(state) * 28 - clockworkTempoBonus(state) * 7));
}

function foodRushCandidatesForFloor(floor) {
  if (!isFoodRushFloorType(floor?.type)) return [];
  const staff = new Set(floor.workers || []);
  return allResidents(state)
    .filter((person) => person && !staff.has(person.id) && !person.expeditionId && !isActiveLifeVisit(person))
    .map((person) => {
      ensurePersonLife(person);
      const currentFloor = currentFloorForPerson(person);
      const foodNeed = personNeedUrgency(person, "food") * 1.9;
      const socialNeed = personNeedUrgency(person, "social") * 0.65;
      const favorite = (person.favoriteTypes || []).includes("food") ? 0.5 : 0;
      const dream = person.dreamType === "food" || person.dreamType === "service" ? 0.35 : 0;
      const familiarStaff = (floor.workers || []).reduce((sum, id) => {
        const worker = getResident(id);
        return sum + (worker ? relationshipScore(person, worker) / 110 : 0);
      }, 0);
      const near = currentFloor ? Math.max(0, 0.42 - Math.abs(Number(currentFloor.id) - Number(floor.id)) * 0.04) : 0;
      const mood = personMotiveMood(person);
      const moodNeed = mood === "strained" ? 0.42 : mood === "seeking" ? 0.22 : 0;
      const hunger = Number(person.motives?.food || 0) <= 44 ? 0.28 : 0;
      const workBreak = person.workFloorId ? 0.18 : 0;
      return { person, score: foodNeed + socialNeed + favorite + dream + familiarStaff + near + moodNeed + hunger + workBreak + Math.random() * 0.18 };
    })
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.person);
}

function foodRushActionBlockReason(floor) {
  if (!isFoodRushFloorType(floor?.type)) return "这个楼层不能组织用餐高峰";
  if (!floor.workers?.length) return `${FLOOR_TYPES[floor.type].label}需要员工招呼餐桌`;
  if ((floor.stock || 0) <= 0) return `${FLOOR_TYPES[floor.type].label}备餐不足，先补货`;
  if (isActiveFoodRush(floor)) return "餐桌高峰正在进行";
  if ((floor.foodRushCooldown || 0) > 0) return `还要 ${Math.ceil(floor.foodRushCooldown)}s 才能再次开桌`;
  if (!foodRushCandidatesForFloor(floor).length) return "暂时没有居民腾得出空来吃饭";
  return "";
}

function applyFoodRushMotiveBurst(floor, person, scale = 1) {
  boostPersonMotive(person, "food", 16 * scale);
  boostPersonMotive(person, "social", 6 * scale);
  boostPersonMotive(person, "energy", 3 * scale);
  boostPersonMotive(person, "entertainment", 2 * scale);
  if (floor.level > 2) boostPersonMotive(person, "food", 2 * scale);
}

function foodRushParticipants(floor) {
  if (!isFoodRushFloorType(floor?.type) || !floor.foodRush?.id) return [];
  const sessionId = floor.foodRush.id;
  return allResidents(state).filter((person) => {
    return person?.lifeVisit?.reason === "foodRush" && person.lifeVisit.sessionId === sessionId && Number(person.lifeVisit.floorId) === Number(floor.id);
  });
}

function applyFoodRushPaceMotion(floor, diners = foodRushParticipants(floor), staff = null) {
  if (!isActiveFoodRush(floor)) return;
  const pace = currentFoodRushPace(floor);
  const workers = staff || (floor.workers || []).map((id) => getResident(id)).filter(Boolean);
  workers.forEach((worker, index) => {
    endSocialForPerson(worker);
    worker.need = index % 2 ? "social" : "food";
    worker.activity = pace.worker[index % pace.worker.length] || "serve";
    worker.activityTimer = Math.max(worker.activityTimer || 0, randFloat(7, 11));
    worker.activityLane = "c";
    worker.lifeWish = `${pace.label}${FOOD_RUSH_LABELS[floor.type] || "餐桌高峰"}`;
    assignPersonMotion(worker, floor.type, worker.activity);
  });
  diners.forEach((person, index) => {
    person.need = index % 3 === 0 ? "social" : "food";
    person.activity = pace.diner[index % pace.diner.length] || "eat";
    person.activityTimer = Math.max(person.activityTimer || 0, randFloat(6, 10));
    person.lifeWish = `${pace.label}用餐：${floor.name}`;
    assignPersonMotion(person, floor.type, person.activity);
  });
}

function pairFoodRushTables(floor, diners, staff, seed = 0) {
  if (!diners.length) return;
  const servers = staff.filter((person) => person && !person.socialPartnerId);
  const guests = diners.filter((person) => person && !person.socialPartnerId);
  servers.forEach((worker, index) => {
    const diner = guests[(index + seed) % guests.length];
    if (!diner || diner.socialPartnerId) return;
    const scene = SOCIAL_SCENES.food[(index + seed) % SOCIAL_SCENES.food.length] || SOCIAL_SCENES.food[0];
    applySocialScene(worker, diner, scene, `food-rush-${floor.id}-${worker.id}-${diner.id}-${Date.now()}`, randFloat(8, 12), floor.type, floorSocialScope(floor));
  });
  for (let index = 0; index + 1 < guests.length; index += 2) {
    const left = guests[index];
    const right = guests[index + 1];
    if (!left || !right || left.socialPartnerId || right.socialPartnerId) continue;
    const scene = SOCIAL_SCENES.food[1] || SOCIAL_SCENES.default[0];
    applySocialScene(left, right, scene, `food-rush-table-${floor.id}-${left.id}-${right.id}-${Date.now()}`, randFloat(7, 11), floor.type, floorSocialScope(floor));
  }
}

function serveFoodRushCourse(floor, diners = foodRushParticipants(floor), staff = null) {
  if (!isActiveFoodRush(floor) || !diners.length) return 0;
  const workers = staff || (floor.workers || []).map((id) => getResident(id)).filter(Boolean);
  const rush = floor.foodRush;
  const skill = averageSkill(floor.workers || [], floor.type);
  const remaining = Math.max(0, (rush.targetServings || 0) - (rush.served || 0));
  const serveCapacity = clamp(1 + Math.floor(skill / 3) + Math.min(2, workers.length), 1, Math.max(1, diners.length));
  const servedNow = Math.min(remaining || 1, serveCapacity, Math.max(1, Math.ceil(diners.length / 2)));
  rush.served = (rush.served || 0) + servedNow;
  rush.courses = (rush.courses || 0) + 1;
  rush.course = foodRushCourseForProgress(foodRushProgress(floor)).id;
  rush.servicePulse = 1;
  rush.tableFocus = ((rush.tableFocus || 0) + 1) % foodRushTableCount(floor, diners);
  state.stats.foodServingsDone = (state.stats.foodServingsDone || 0) + servedNow;
  state.stats.foodRushCoursesDone = (state.stats.foodRushCoursesDone || 0) + 1;
  rush.heat = clamp(Number(rush.heat || 0) + 5 + servedNow * 4 + skill * 0.28 + serviceCareBonus(state) * 18, 0, 100);
  applyFoodRushPaceMotion(floor, diners, workers);
  for (let index = 0; index < servedNow; index += 1) {
    const diner = diners[(index + rush.courses - 1) % diners.length];
    if (!diner) continue;
    diner.activity = index % 2 ? "eat" : "snack";
    diner.activityTimer = Math.max(diner.activityTimer || 0, randFloat(7, 11));
    assignPersonMotion(diner, floor.type, diner.activity);
    applyFoodRushMotiveBurst(floor, diner, 0.65);
    const home = findFloor(diner.homeFloorId);
    if (home?.type === "dwelling") {
      home.rentReady = Math.min(360, (home.rentReady || 0) + 2);
    }
  }
  workers.forEach((worker) => {
    boostPersonMotive(worker, "social", 2.2);
    boostPersonMotive(worker, "food", 1.4);
  });
  pairFoodRushTables(floor, diners, workers, rush.courses || 0);
  const tips = Math.round((4 + servedNow * (3.2 + state.happiness / 90) + skill * 0.7) * (1 + foodRushPracticeBonus(state) * 0.7 + serviceCareBonus(state) * 0.28));
  addCoins(tips);
  showFloat(`上菜 +${tips}`);
  rush.earned = (rush.earned || 0) + tips;
  if (rush.heat >= 76 && !rush.peakLogged) {
    rush.peakLogged = true;
    addLog(`${floor.name} 忙成一片，餐桌几乎坐满了。`);
  }
  return tips;
}

function settleFoodRushFinale(floor, diners = foodRushParticipants(floor)) {
  if (!isActiveFoodRush(floor) || floor.foodRush.finalRewarded) return 0;
  const rush = floor.foodRush;
  const heat = Number(rush.heat || 0);
  const target = Math.max(1, Number(rush.targetServings) || 1);
  const ratio = clamp((rush.served || 0) / target, 0, 1.35);
  const bonus = Math.round((rush.earned || 0) * (0.12 + ratio * 0.18) + heat * 0.6 + (rush.served || 0) * 4);
  rush.finalRewarded = true;
  rush.earned = (rush.earned || 0) + bonus;
  if (bonus > 0) addCoins(bonus);
  state.happiness = clamp(state.happiness + Math.min(6, 1 + Math.floor((rush.served || 0) / 2)), 0, 100);
  diners.forEach((person) => {
    applyFoodRushMotiveBurst(floor, person, 0.42);
    const home = findFloor(person.homeFloorId);
    if (home?.type === "dwelling") {
      home.rentReady = Math.min(360, (home.rentReady || 0) + 4);
    }
  });
  return bonus;
}

function startFoodRush(floorId) {
  const floor = findFloor(floorId);
  if (!isBusiness(floor) || !isFoodRushFloorType(floor.type)) return;
  const reason = foodRushActionBlockReason(floor);
  if (reason) {
    showToast(reason);
    return;
  }
  const skill = averageSkill(floor.workers || [], floor.type);
  const capacity = clamp(2 + (floor.level || 1) + Math.floor(skill / 4), 2, 6);
  const diners = foodRushCandidatesForFloor(floor).slice(0, Math.min(capacity, Math.max(2, (floor.stock || 0) * 2)));
  if (!diners.length) {
    showToast("暂时没有居民有空来用餐");
    return;
  }
  const stockCost = Math.min(floor.stock || 0, Math.max(1, Math.ceil(diners.length / 2)));
  const label = FOOD_RUSH_LABELS[floor.type] || "餐桌高峰";
  const sessionId = `food-rush-${floor.id}-${Date.now()}-${randInt(10, 99)}`;
  const duration = randFloat(34, 46);
  const targetServings = Math.max(diners.length + 2, diners.length * 2 + Math.floor(skill / 3));
  const openingHeat = clamp(22 + diners.length * 6 + skill * 0.9 + foodRushPracticeBonus(state) * 80 + serviceCareBonus(state) * 18, 18, 68);
  floor.stock = Math.max(0, (floor.stock || 0) - stockCost);
  floor.foodRushCooldown = foodRushCooldown(floor);
  floor.foodRush = {
    id: sessionId,
    label,
    remaining: duration,
    total: duration,
    participantIds: diners.map((person) => person.id),
    pace: "seating",
    heat: openingHeat,
    served: 0,
    targetServings,
    serviceTimer: randFloat(4.2, 5.8),
    earned: 0,
    finalRewarded: false,
    courses: 0,
    course: "starter",
    servicePulse: 0,
    tableFocus: 0,
  };
  const staff = (floor.workers || []).map((id) => getResident(id)).filter(Boolean);
  staff.forEach((worker, index) => {
    endSocialForPerson(worker);
    worker.need = index % 2 ? "social" : "food";
    worker.activity = index % 2 ? "serve" : "work";
    worker.activityTimer = Math.max(worker.activityTimer || 0, duration);
    worker.activityLane = "c";
    assignPersonMotion(worker, floor.type, worker.activity);
    boostPersonMotive(worker, "food", 4);
  });
  diners.forEach((person, index) => {
    startLifeVisit(person, floor, "food", {
      allowCompanion: false,
      label: `参加${label}`,
      reason: "foodRush",
      duration: duration + randFloat(-3, 4),
      minStay: Math.max(14, duration * 0.38),
      targetGoal: 92,
      sessionId,
    });
    person.activity = index % 2 ? "wait" : "talk";
    person.activityTimer = Math.max(person.activityTimer || 0, duration * 0.45);
    assignPersonMotion(person, floor.type, person.activity);
    applyFoodRushMotiveBurst(floor, person, 0.55);
  });
  applyFoodRushPaceMotion(floor, diners, staff);
  pairFoodRushTables(floor, diners, staff, 0);
  state.stats.foodRushesDone = (state.stats.foodRushesDone || 0) + 1;
  state.happiness = clamp(state.happiness + Math.min(5, 1 + diners.length), 0, 100);
  const names = diners.map((person) => person.name).slice(0, 3).join("、");
  const extra = diners.length > 3 ? `等 ${diners.length} 人` : "";
  showToast(`${label}开始：${diners.length} 位居民入座`);
  addLog(`${floor.name} 组织${label}，${names}${extra}入座，用掉 ${stockCost} 份备餐。`);
  lastKingdomKey = "";
  render(true);
}

function updateFoodRushFloor(floor, dt) {
  if (!isFoodRushFloorType(floor?.type)) return false;
  const before = foodRushMapKey(floor);
  floor.foodRushCooldown = Math.max(0, (floor.foodRushCooldown || 0) - dt * (1 + clockworkTempoBonus(state) * 0.18));
  if (!isActiveFoodRush(floor)) return before !== foodRushMapKey(floor);
  floor.foodRush.remaining = Math.max(0, Number(floor.foodRush.remaining || 0) - dt);
  floor.foodRush.servicePulse = Math.max(0, Number(floor.foodRush.servicePulse || 0) - dt * 0.9);
  const diners = foodRushParticipants(floor);
  floor.foodRush.participantIds = diners.map((person) => person.id);
  diners.forEach((person) => applyFoodRushMotiveBurst(floor, person, dt * 0.06));
  const staff = (floor.workers || []).map((id) => getResident(id)).filter(Boolean);
  staff.forEach((person) => {
    boostPersonMotive(person, "food", dt * 0.08);
    boostPersonMotive(person, "social", dt * 0.04);
  });
  const pace = foodRushPaceForProgress(foodRushProgress(floor));
  if (floor.foodRush.pace !== pace.id) {
    floor.foodRush.pace = pace.id;
    floor.foodRush.heat = clamp(Number(floor.foodRush.heat || 0) + 6 + diners.length, 0, 100);
    applyFoodRushPaceMotion(floor, diners, staff);
    addLog(`${floor.name} 的${floor.foodRush.label || "餐桌高峰"}进入${pace.label}。`);
  }
  floor.foodRush.serviceTimer = Math.max(0, Number(floor.foodRush.serviceTimer || 0) - dt * (1 + serviceCareBonus(state) * 0.4));
  if (floor.foodRush.serviceTimer <= 0 && diners.length) {
    serveFoodRushCourse(floor, diners, staff);
    floor.foodRush.serviceTimer = randFloat(4.2, 6.1);
  }
  floor.foodRush.course = foodRushCourseForProgress(foodRushProgress(floor)).id;
  if (floor.foodRush.remaining <= 0 || !diners.length || (floor.foodRush.served || 0) >= (floor.foodRush.targetServings || 1)) {
    const label = FOOD_RUSH_LABELS[floor.type] || "餐桌高峰";
    const served = floor.foodRush.served || 0;
    const heat = Math.round(floor.foodRush.heat || 0);
    const finale = diners.length ? settleFoodRushFinale(floor, diners) : 0;
    floor.foodRush = null;
    if (diners.length) addLog(`${floor.name} 的${label}收尾，上菜 ${served} 次，忙场 ${heat}，追加 ${finale} 金币。`);
  }
  return before !== foodRushMapKey(floor);
}

function renderFoodRushPanel(floor) {
  if (!isFoodRushFloorType(floor?.type)) return "";
  const active = isActiveFoodRush(floor);
  const diners = active ? foodRushParticipants(floor) : [];
  const pace = currentFoodRushPace(floor);
  const heat = active ? Math.round(Number(floor.foodRush.heat || 0)) : 0;
  const heatTone = active ? foodRushHeatTone(floor) : "cozy";
  const served = active ? floor.foodRush.served || 0 : state.stats.foodServingsDone || 0;
  const target = active ? Math.max(1, Number(floor.foodRush.targetServings) || 1) : Math.max(1, served || 1);
  const progress = active ? clamp(served / target, 0, 1) : 0;
  const course = active ? currentFoodRushCourse(floor) : FOOD_RUSH_COURSES[0];
  const tableCount = active ? foodRushTableCount(floor, diners) : 0;
  const serviceLeft = active ? Math.ceil(floor.foodRush.serviceTimer || 0) : 0;
  const names = diners.length ? diners.map((person) => person.name).slice(0, 4).join("、") : "等待居民入座";
  const status = active
    ? `${pace.label} ${Math.ceil(floor.foodRush.remaining)}s · ${names}`
    : (floor.foodRushCooldown || 0) > 0
      ? `冷却 ${Math.ceil(floor.foodRushCooldown)}s`
      : "就绪";
  const extra = active ? ` · 收益 ${floor.foodRush.earned || 0}` : "";
  const courseRow = FOOD_RUSH_COURSES.map((entry) => {
    const done = active && foodRushProgress(floor) >= entry.threshold;
    const current = active && entry.id === course.id;
    return `<i class="${done ? "done" : ""} ${current ? "current" : ""}" title="${escapeAttr(entry.label)}"><b></b><span>${escapeHtml(entry.label)}</span></i>`;
  }).join("");
  return `
    <div class="food-rush-panel ${active ? "active" : ""}" data-heat="${escapeAttr(heatTone)}" data-pace="${escapeAttr(pace.id)}">
      <div class="food-rush-panel-head">
        <strong>${FOOD_RUSH_LABELS[floor.type] || "餐桌高峰"}</strong>
        <em>${active ? `${foodRushHeatLabel(floor)} ${heat}%` : "待开桌"}</em>
      </div>
      <div class="food-rush-meter" aria-hidden="true"><i style="width:${Math.round(progress * 100)}%"></i></div>
      <div class="food-rush-course-row" aria-hidden="true">${courseRow}</div>
      <div class="food-rush-readout">
        <b><span>菜序</span><strong>${active ? escapeHtml(course.label) : "待开"}</strong></b>
        <b><span>桌况</span><strong>${active ? `${tableCount}桌` : `${state.stats.foodRushCoursesDone || 0}桌次`}</strong></b>
        <b><span>下次</span><strong>${active ? `${serviceLeft}s` : "就绪"}</strong></b>
      </div>
      <span>${escapeHtml(status)}${extra}</span>
      <small>上菜 ${served}/${target} · 桌次 ${state.stats.foodRushCoursesDone || 0} · 已组织 ${state.stats.foodRushesDone || 0} 次</small>
    </div>`;
}

function foodRushMapKey(floor) {
  if (!isFoodRushFloorType(floor?.type)) return "";
  const participants = floor.foodRush?.participantIds || [];
  return `foodRush:${Math.ceil(floor.foodRushCooldown || 0)}:${Math.ceil(floor.foodRush?.remaining || 0)}:${participants.join("-")}:${floor.foodRush?.pace || ""}:${floor.foodRush?.course || ""}:${Math.round(floor.foodRush?.heat || 0)}:${floor.foodRush?.served || 0}:${floor.foodRush?.targetServings || 0}:${floor.foodRush?.earned || 0}:${floor.foodRush?.courses || 0}:${Math.round((floor.foodRush?.servicePulse || 0) * 10)}:${floor.foodRush?.tableFocus || 0}`;
}

function isServiceCareFloorType(type) {
  return SERVICE_CARE_FLOOR_TYPES.includes(type);
}

function isActiveServiceCare(floor) {
  return Boolean(isServiceCareFloorType(floor?.type) && floor.serviceCare && Number(floor.serviceCare.remaining) > 0);
}

function serviceCarePracticeBonus(game = state) {
  return Math.min(0.13, (game.stats?.serviceCareSessionsDone || 0) * 0.004 + (game.stats?.serviceCareTouchesDone || 0) * 0.002);
}

function activeServiceCareBonus(game = state) {
  return businessFloors(game).some((floor) => isActiveServiceCare(floor)) ? 0.036 : 0;
}

function serviceCareProgress(floor) {
  if (!isActiveServiceCare(floor)) return 0;
  const total = Math.max(1, Number(floor.serviceCare.total) || 1);
  const touches = Math.max(1, Number(floor.serviceCare.targetTouches) || 1);
  const timeProgress = clamp(1 - Number(floor.serviceCare.remaining || 0) / total, 0, 1);
  const touchProgress = clamp(Number(floor.serviceCare.touches || 0) / touches, 0, 1);
  return clamp(Math.max(timeProgress, touchProgress * 0.92), 0, 1);
}

function serviceCarePhaseForProgress(progress = 0) {
  return SERVICE_CARE_PHASES.reduce((current, phase) => (progress >= phase.threshold ? phase : current), SERVICE_CARE_PHASES[0]);
}

function currentServiceCarePhase(floor) {
  if (!isServiceCareFloorType(floor?.type)) return SERVICE_CARE_PHASES[0];
  const activePhase = SERVICE_CARE_PHASES.find((phase) => phase.id === floor.serviceCare?.phase);
  return activePhase || serviceCarePhaseForProgress(serviceCareProgress(floor));
}

function serviceCareTone(floor) {
  const care = Number(floor?.serviceCare?.care || 0);
  if (care >= 76) return "polished";
  if (care >= 46) return "busy";
  return "gentle";
}

function serviceCareToneLabel(floor) {
  const care = Number(floor?.serviceCare?.care || 0);
  if (care >= 76) return "妥帖";
  if (care >= 46) return "忙碌";
  return "温和";
}

function serviceCareCooldown(floor) {
  const skill = averageSkill(floor.workers || [], floor.type);
  return Math.max(22, Math.round(54 - skill * 2 - serviceCarePracticeBonus(state) * 34 - clockworkTempoBonus(state) * 6));
}

function serviceCareCandidatesForFloor(floor) {
  if (!isServiceCareFloorType(floor?.type)) return [];
  const staff = new Set(floor.workers || []);
  return allResidents(state)
    .filter((person) => person && !staff.has(person.id) && !person.expeditionId && !isActiveLifeVisit(person))
    .map((person) => {
      ensurePersonLife(person);
      const currentFloor = currentFloorForPerson(person);
      const socialNeed = personNeedUrgency(person, "social") * 1.45;
      const energyNeed = personNeedUrgency(person, "energy") * 0.9;
      const favorite = (person.favoriteTypes || []).includes("service") ? 0.46 : 0;
      const dream = person.dreamType === "service" || person.dreamType === "garden" ? 0.3 : 0;
      const queuePressure = Math.min(0.42, (state.queue?.length || 0) * 0.08);
      const familiarStaff = (floor.workers || []).reduce((sum, id) => {
        const worker = getResident(id);
        return sum + (worker ? relationshipScore(person, worker) / 125 : 0);
      }, 0);
      const near = currentFloor ? Math.max(0, 0.36 - Math.abs(Number(currentFloor.id) - Number(floor.id)) * 0.04) : 0;
      const mood = personMotiveMood(person);
      const moodNeed = mood === "strained" ? 0.5 : mood === "seeking" ? 0.24 : 0;
      return { person, score: socialNeed + energyNeed + favorite + dream + queuePressure + familiarStaff + near + moodNeed + Math.random() * 0.18 };
    })
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.person);
}

function serviceCareActionBlockReason(floor) {
  if (!isServiceCareFloorType(floor?.type)) return "这个楼层不能安排礼宾照看";
  if (!floor.workers?.length) return `${FLOOR_TYPES[floor.type].label}需要员工接待访客`;
  if ((floor.stock || 0) <= 0) return `${FLOOR_TYPES[floor.type].label}花礼不足，先补货`;
  if (isActiveServiceCare(floor)) return "礼宾照看正在进行";
  if ((floor.serviceCareCooldown || 0) > 0) return `还要 ${Math.ceil(floor.serviceCareCooldown)}s 才能再次照看`;
  if (!serviceCareCandidatesForFloor(floor).length) return "暂时没有居民需要礼宾照看";
  return "";
}

function applyServiceCareMotiveBurst(floor, person, scale = 1) {
  boostPersonMotive(person, "social", 14 * scale);
  boostPersonMotive(person, "energy", 7 * scale);
  boostPersonMotive(person, "entertainment", 4 * scale);
  if (floor.level > 2) boostPersonMotive(person, "social", 2 * scale);
}

function serviceCareParticipants(floor) {
  if (!isServiceCareFloorType(floor?.type) || !floor.serviceCare?.id) return [];
  const sessionId = floor.serviceCare.id;
  return allResidents(state).filter((person) => {
    return person?.lifeVisit?.reason === "serviceCare" && person.lifeVisit.sessionId === sessionId && Number(person.lifeVisit.floorId) === Number(floor.id);
  });
}

function applyServiceCarePhaseMotion(floor, guests = serviceCareParticipants(floor), staff = null) {
  if (!isActiveServiceCare(floor)) return;
  const phase = currentServiceCarePhase(floor);
  const workers = staff || (floor.workers || []).map((id) => getResident(id)).filter(Boolean);
  workers.forEach((worker, index) => {
    endSocialForPerson(worker);
    worker.need = "social";
    worker.activity = phase.worker[index % phase.worker.length] || "serve";
    worker.activityTimer = Math.max(worker.activityTimer || 0, randFloat(7, 11));
    worker.activityLane = "c";
    worker.lifeWish = `${phase.label}${SERVICE_CARE_LABELS[floor.type] || "礼宾照看"}`;
    assignPersonMotion(worker, floor.type, worker.activity);
  });
  guests.forEach((person, index) => {
    person.need = index % 2 ? "energy" : "social";
    person.activity = phase.guest[index % phase.guest.length] || "talk";
    person.activityTimer = Math.max(person.activityTimer || 0, randFloat(6, 10));
    person.lifeWish = `${phase.label}照看，${floor.name}`;
    assignPersonMotion(person, floor.type, person.activity);
  });
}

function pairServiceCareGuests(floor, guests, staff, seed = 0) {
  if (!guests.length) return;
  const scene = SOCIAL_SCENES.service[0] || SOCIAL_SCENES.default[0];
  const servers = staff.filter((person) => person && !person.socialPartnerId);
  const visitors = guests.filter((person) => person && !person.socialPartnerId);
  servers.forEach((worker, index) => {
    const guest = visitors[(index + seed) % visitors.length];
    if (!guest || guest.socialPartnerId) return;
    applySocialScene(worker, guest, scene, `service-care-${floor.id}-${worker.id}-${guest.id}-${Date.now()}`, randFloat(7, 11), floor.type, floorSocialScope(floor));
  });
}

function serveServiceCareTouch(floor, guests = serviceCareParticipants(floor), staff = null) {
  if (!isActiveServiceCare(floor) || !guests.length) return 0;
  const workers = staff || (floor.workers || []).map((id) => getResident(id)).filter(Boolean);
  const care = floor.serviceCare;
  const skill = averageSkill(floor.workers || [], floor.type);
  const remaining = Math.max(0, (care.targetTouches || 0) - (care.touches || 0));
  const capacity = clamp(1 + Math.floor(skill / 4) + Math.min(2, workers.length), 1, Math.max(1, guests.length));
  const touchedNow = Math.min(remaining || 1, capacity, Math.max(1, Math.ceil(guests.length / 2)));
  care.touches = (care.touches || 0) + touchedNow;
  care.carePulse = 1;
  care.focusGuest = ((care.focusGuest || 0) + 1) % Math.max(1, guests.length);
  state.stats.serviceCareTouchesDone = (state.stats.serviceCareTouchesDone || 0) + touchedNow;
  care.care = clamp(Number(care.care || 0) + 6 + touchedNow * 5 + skill * 0.25 + serviceCarePracticeBonus(state) * 36, 0, 100);
  applyServiceCarePhaseMotion(floor, guests, workers);
  for (let index = 0; index < touchedNow; index += 1) {
    const guest = guests[(index + care.touches - 1) % guests.length];
    if (!guest) continue;
    guest.activity = index % 2 ? "chat" : "talk";
    guest.activityTimer = Math.max(guest.activityTimer || 0, randFloat(7, 11));
    assignPersonMotion(guest, floor.type, guest.activity);
    applyServiceCareMotiveBurst(floor, guest, 0.68);
    const home = findFloor(guest.homeFloorId);
    if (home?.type === "dwelling") {
      home.rentReady = Math.min(360, (home.rentReady || 0) + 3);
    }
  }
  workers.forEach((worker) => {
    boostPersonMotive(worker, "social", 2.4);
    boostPersonMotive(worker, "energy", 1.2);
  });
  pairServiceCareGuests(floor, guests, workers, care.touches || 0);
  (state.queue || []).forEach((visitor) => {
    visitor.lobbyWait = Math.max(0, lobbyWaitSeconds(visitor) - (1.4 + touchedNow * 0.6));
  });
  state.spawnTimer = Math.max(2.8, Math.min(state.spawnTimer || 8, getNextVisitorDelay((state.queue || []).length) * 0.82));
  const tips = Math.round((5 + touchedNow * (3.6 + state.happiness / 100) + skill * 0.65) * (1 + serviceCarePracticeBonus(state) * 0.8));
  addCoins(tips);
  showFloat(`照看 +${tips}`);
  care.earned = (care.earned || 0) + tips;
  if (care.care >= 76 && !care.polishedLogged) {
    care.polishedLogged = true;
    addLog(`${floor.name} 的礼宾动线变得格外妥帖，大厅也安静了下来。`);
  }
  return tips;
}

function settleServiceCareFinale(floor, guests = serviceCareParticipants(floor)) {
  if (!isActiveServiceCare(floor) || floor.serviceCare.finalRewarded) return 0;
  const care = floor.serviceCare;
  const target = Math.max(1, Number(care.targetTouches) || 1);
  const ratio = clamp((care.touches || 0) / target, 0, 1.35);
  const bonus = Math.round((care.earned || 0) * (0.1 + ratio * 0.18) + (care.care || 0) * 0.45 + (care.touches || 0) * 3);
  care.finalRewarded = true;
  care.earned = (care.earned || 0) + bonus;
  if (bonus > 0) addCoins(bonus);
  state.happiness = clamp(state.happiness + Math.min(5, 1 + Math.floor((care.touches || 0) / 2)), 0, 100);
  guests.forEach((person) => {
    applyServiceCareMotiveBurst(floor, person, 0.38);
    const home = findFloor(person.homeFloorId);
    if (home?.type === "dwelling") {
      home.rentReady = Math.min(420, (home.rentReady || 0) + 4);
    }
  });
  return bonus;
}

function startServiceCare(floorId) {
  const floor = findFloor(floorId);
  if (!isBusiness(floor) || !isServiceCareFloorType(floor.type)) return;
  const reason = serviceCareActionBlockReason(floor);
  if (reason) {
    showToast(reason);
    return;
  }
  const skill = averageSkill(floor.workers || [], floor.type);
  const capacity = clamp(2 + (floor.level || 1) + Math.floor(skill / 5), 2, 6);
  const guests = serviceCareCandidatesForFloor(floor).slice(0, Math.min(capacity, Math.max(2, (floor.stock || 0) * 2)));
  if (!guests.length) {
    showToast("暂时没有居民需要礼宾照看");
    return;
  }
  const stockCost = Math.min(floor.stock || 0, Math.max(1, Math.ceil(guests.length / 3)));
  const label = SERVICE_CARE_LABELS[floor.type] || "礼宾照看";
  const sessionId = `service-care-${floor.id}-${Date.now()}-${randInt(10, 99)}`;
  const duration = randFloat(32, 42);
  const targetTouches = Math.max(guests.length + 1, guests.length * 2 + Math.floor(skill / 4));
  const openingCare = clamp(20 + guests.length * 7 + skill * 0.75 + serviceCarePracticeBonus(state) * 68 + serviceCareBonus(state) * 22, 18, 68);
  floor.stock = Math.max(0, (floor.stock || 0) - stockCost);
  floor.serviceCareCooldown = serviceCareCooldown(floor);
  floor.serviceCare = {
    id: sessionId,
    label,
    remaining: duration,
    total: duration,
    participantIds: guests.map((person) => person.id),
    phase: "greet",
    care: openingCare,
    touches: 0,
    targetTouches,
    touchTimer: randFloat(4.0, 5.6),
    earned: 0,
    finalRewarded: false,
    carePulse: 0,
    focusGuest: 0,
  };
  const staff = (floor.workers || []).map((id) => getResident(id)).filter(Boolean);
  staff.forEach((worker, index) => {
    endSocialForPerson(worker);
    worker.need = "social";
    worker.activity = index % 2 ? "wave" : "serve";
    worker.activityTimer = Math.max(worker.activityTimer || 0, duration);
    worker.activityLane = "c";
    assignPersonMotion(worker, floor.type, worker.activity);
    boostPersonMotive(worker, "social", 3);
  });
  guests.forEach((person, index) => {
    startLifeVisit(person, floor, index % 2 ? "energy" : "social", {
      allowCompanion: false,
      label: `参加${label}`,
      reason: "serviceCare",
      duration: duration + randFloat(-3, 4),
      minStay: Math.max(12, duration * 0.35),
      targetGoal: 90,
      sessionId,
    });
    person.activity = index % 2 ? "wait" : "talk";
    person.activityTimer = Math.max(person.activityTimer || 0, duration * 0.42);
    assignPersonMotion(person, floor.type, person.activity);
    applyServiceCareMotiveBurst(floor, person, 0.5);
  });
  applyServiceCarePhaseMotion(floor, guests, staff);
  pairServiceCareGuests(floor, guests, staff, 0);
  state.stats.serviceCareSessionsDone = (state.stats.serviceCareSessionsDone || 0) + 1;
  state.happiness = clamp(state.happiness + Math.min(4, 1 + Math.ceil(guests.length / 2)), 0, 100);
  const names = guests.map((person) => person.name).slice(0, 3).join("、");
  const extra = guests.length > 3 ? `等 ${guests.length} 人` : "";
  showToast(`${label}开始：${guests.length} 位居民被安排照看`);
  addLog(`${floor.name} 安排${label}，${names}${extra}入座等候，用掉 ${stockCost} 份花礼。`);
  lastKingdomKey = "";
  render(true);
}

function updateServiceCareFloor(floor, dt) {
  if (!isServiceCareFloorType(floor?.type)) return false;
  const before = serviceCareMapKey(floor);
  floor.serviceCareCooldown = Math.max(0, (floor.serviceCareCooldown || 0) - dt * (1 + clockworkTempoBonus(state) * 0.18));
  if (!isActiveServiceCare(floor)) return before !== serviceCareMapKey(floor);
  floor.serviceCare.remaining = Math.max(0, Number(floor.serviceCare.remaining || 0) - dt);
  floor.serviceCare.carePulse = Math.max(0, Number(floor.serviceCare.carePulse || 0) - dt * 0.9);
  const guests = serviceCareParticipants(floor);
  floor.serviceCare.participantIds = guests.map((person) => person.id);
  guests.forEach((person) => applyServiceCareMotiveBurst(floor, person, dt * 0.055));
  const staff = (floor.workers || []).map((id) => getResident(id)).filter(Boolean);
  staff.forEach((person) => {
    boostPersonMotive(person, "social", dt * 0.07);
    boostPersonMotive(person, "energy", dt * 0.035);
  });
  const phase = serviceCarePhaseForProgress(serviceCareProgress(floor));
  if (floor.serviceCare.phase !== phase.id) {
    floor.serviceCare.phase = phase.id;
    floor.serviceCare.care = clamp(Number(floor.serviceCare.care || 0) + 6 + guests.length, 0, 100);
    applyServiceCarePhaseMotion(floor, guests, staff);
    addLog(`${floor.name} 的${floor.serviceCare.label || "礼宾照看"}进入${phase.label}。`);
  }
  floor.serviceCare.touchTimer = Math.max(0, Number(floor.serviceCare.touchTimer || 0) - dt * (1 + serviceCarePracticeBonus(state) * 0.5));
  if (floor.serviceCare.touchTimer <= 0 && guests.length) {
    serveServiceCareTouch(floor, guests, staff);
    floor.serviceCare.touchTimer = randFloat(4.0, 5.8);
  }
  if (floor.serviceCare.remaining <= 0 || !guests.length || (floor.serviceCare.touches || 0) >= (floor.serviceCare.targetTouches || 1)) {
    const label = SERVICE_CARE_LABELS[floor.type] || "礼宾照看";
    const touches = floor.serviceCare.touches || 0;
    const care = Math.round(floor.serviceCare.care || 0);
    const finale = guests.length ? settleServiceCareFinale(floor, guests) : 0;
    floor.serviceCare = null;
    if (guests.length) addLog(`${floor.name} 的${label}收尾，完成 ${touches} 次照看，妥帖 ${care}，追加 ${finale} 金币。`);
  }
  return before !== serviceCareMapKey(floor);
}

function renderServiceCarePanel(floor) {
  if (!isServiceCareFloorType(floor?.type)) return "";
  const active = isActiveServiceCare(floor);
  const guests = active ? serviceCareParticipants(floor) : [];
  const phase = currentServiceCarePhase(floor);
  const care = active ? Math.round(Number(floor.serviceCare.care || 0)) : 0;
  const tone = active ? serviceCareTone(floor) : "gentle";
  const touches = active ? floor.serviceCare.touches || 0 : state.stats.serviceCareTouchesDone || 0;
  const target = active ? Math.max(1, Number(floor.serviceCare.targetTouches) || 1) : Math.max(1, touches || 1);
  const progress = active ? clamp(touches / target, 0, 1) : 0;
  const nextTouch = active ? Math.ceil(floor.serviceCare.touchTimer || 0) : 0;
  const names = guests.length ? guests.map((person) => person.name).slice(0, 4).join("、") : "等待居民到访";
  const status = active
    ? `${phase.label} ${Math.ceil(floor.serviceCare.remaining)}s · ${names}`
    : (floor.serviceCareCooldown || 0) > 0
      ? `冷却 ${Math.ceil(floor.serviceCareCooldown)}s`
      : "就绪";
  const extra = active ? ` · 收益 ${floor.serviceCare.earned || 0}` : "";
  const phaseRow = SERVICE_CARE_PHASES.map((entry) => {
    const done = active && serviceCareProgress(floor) >= entry.threshold;
    const current = active && entry.id === phase.id;
    return `<i class="${done ? "done" : ""} ${current ? "current" : ""}" title="${escapeAttr(entry.label)}"><b></b><span>${escapeHtml(entry.label)}</span></i>`;
  }).join("");
  return `
    <div class="service-care-panel ${active ? "active" : ""}" data-care="${escapeAttr(tone)}" data-phase="${escapeAttr(phase.id)}">
      <div class="service-care-panel-head">
        <strong>${SERVICE_CARE_LABELS[floor.type] || "礼宾照看"}</strong>
        <em>${active ? `${serviceCareToneLabel(floor)} ${care}%` : "待安排"}</em>
      </div>
      <div class="service-care-meter" aria-hidden="true"><i style="width:${Math.round(progress * 100)}%"></i></div>
      <div class="service-care-phase-row" aria-hidden="true">${phaseRow}</div>
      <div class="service-care-readout">
        <b><span>阶段</span><strong>${active ? escapeHtml(phase.label) : "待开"}</strong></b>
        <b><span>照看</span><strong>${active ? `${touches}/${target}` : `${state.stats.serviceCareTouchesDone || 0}`}</strong></b>
        <b><span>下次</span><strong>${active ? `${nextTouch}s` : "就绪"}</strong></b>
      </div>
      <span>${escapeHtml(status)}${extra}</span>
      <small>照看 ${touches}/${target} · 已安排 ${state.stats.serviceCareSessionsDone || 0} 次</small>
    </div>`;
}

function serviceCareMapKey(floor) {
  if (!isServiceCareFloorType(floor?.type)) return "";
  const participants = floor.serviceCare?.participantIds || [];
  return `serviceCare:${Math.ceil(floor.serviceCareCooldown || 0)}:${Math.ceil(floor.serviceCare?.remaining || 0)}:${participants.join("-")}:${floor.serviceCare?.phase || ""}:${Math.round(floor.serviceCare?.care || 0)}:${floor.serviceCare?.touches || 0}:${floor.serviceCare?.targetTouches || 0}:${floor.serviceCare?.earned || 0}:${Math.round((floor.serviceCare?.carePulse || 0) * 10)}:${floor.serviceCare?.focusGuest || 0}`;
}

function isStarChartFloorType(type) {
  return STAR_CHART_FLOOR_TYPES.includes(type);
}

function isActiveStarChart(floor) {
  return Boolean(isStarChartFloorType(floor?.type) && floor.starChart && Number(floor.starChart.remaining) > 0);
}

function starChartPracticeBonus(game = state) {
  return Math.min(0.14, (game.stats?.starChartCalibrationsDone || 0) * 0.004 + (game.stats?.starChartMarksDone || 0) * 0.002);
}

function activeStarChartBonus(game = state) {
  return businessFloors(game).some((floor) => isActiveStarChart(floor)) ? 0.038 : 0;
}

function starChartProgress(floor) {
  if (!isActiveStarChart(floor)) return 0;
  const total = Math.max(1, Number(floor.starChart.total) || 1);
  const target = Math.max(1, Number(floor.starChart.targetMarks) || 1);
  const timeProgress = clamp(1 - Number(floor.starChart.remaining || 0) / total, 0, 1);
  const markProgress = clamp(Number(floor.starChart.marks || 0) / target, 0, 1);
  return clamp(Math.max(timeProgress, markProgress * 0.92), 0, 1);
}

function starChartPhaseForProgress(progress = 0) {
  return STAR_CHART_PHASES.reduce((current, phase) => (progress >= phase.threshold ? phase : current), STAR_CHART_PHASES[0]);
}

function currentStarChartPhase(floor) {
  if (!isStarChartFloorType(floor?.type)) return STAR_CHART_PHASES[0];
  const activePhase = STAR_CHART_PHASES.find((phase) => phase.id === floor.starChart?.phase);
  return activePhase || starChartPhaseForProgress(starChartProgress(floor));
}

function starChartFocusTone(floor) {
  const focus = Number(floor?.starChart?.focus || 0);
  if (focus >= 78) return "clear";
  if (focus >= 48) return "bright";
  return "dim";
}

function starChartFocusLabel(floor) {
  const focus = Number(floor?.starChart?.focus || 0);
  if (focus >= 78) return "星路清晰";
  if (focus >= 48) return "星光明亮";
  return "云隙初开";
}

function starChartCooldown(floor) {
  const skill = averageSkill(floor.workers || [], floor.type);
  return Math.max(22, Math.round(58 - skill * 2.15 - starChartPracticeBonus(state) * 38 - clockworkTempoBonus(state) * 7));
}

function starChartCandidatesForFloor(floor) {
  if (!isStarChartFloorType(floor?.type)) return [];
  const staff = new Set(floor.workers || []);
  return allResidents(state)
    .filter((person) => person && !staff.has(person.id) && !person.expeditionId && !isActiveLifeVisit(person))
    .map((person) => {
      ensurePersonLife(person);
      const currentFloor = currentFloorForPerson(person);
      const wonderNeed = personNeedUrgency(person, "entertainment") * 1.2;
      const socialNeed = personNeedUrgency(person, "social") * 0.72;
      const energyNeed = personNeedUrgency(person, "energy") * 0.35;
      const favorite = (person.favoriteTypes || []).includes("observatory") || (person.favoriteTypes || []).includes("library") ? 0.46 : 0;
      const dream = person.dreamType === "observatory" || person.dreamType === "library" || person.dreamType === "skyport" ? 0.36 : 0;
      const expeditionPull = Math.min(0.34, (state.expeditions?.length || 0) * 0.08);
      const near = currentFloor ? Math.max(0, 0.38 - Math.abs(Number(currentFloor.id) - Number(floor.id)) * 0.04) : 0;
      const mood = personMotiveMood(person);
      const moodNeed = mood === "strained" ? 0.28 : mood === "seeking" ? 0.2 : 0;
      return { person, score: wonderNeed + socialNeed + energyNeed + favorite + dream + expeditionPull + near + moodNeed + Math.random() * 0.18 };
    })
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.person);
}

function starChartActionBlockReason(floor) {
  if (!isStarChartFloorType(floor?.type)) return "这个楼层不能校准星图";
  if (!floor.workers?.length) return `${FLOOR_TYPES[floor.type].label}需要员工观测`;
  if ((floor.stock || 0) <= 0) return `${FLOOR_TYPES[floor.type].label}星盘耗材不足，先补货`;
  if (isActiveStarChart(floor)) return "星图校准正在进行";
  if ((floor.starChartCooldown || 0) > 0) return `还要 ${Math.ceil(floor.starChartCooldown)}s 才能再次校准`;
  if (!starChartCandidatesForFloor(floor).length && !(state.expeditions || []).length) return "暂时没有居民或探险队需要星象预报";
  return "";
}

function applyStarChartMotiveBurst(floor, person, scale = 1) {
  boostPersonMotive(person, "entertainment", 11 * scale);
  boostPersonMotive(person, "social", 6 * scale);
  boostPersonMotive(person, "energy", 3 * scale);
  if (floor.level > 2) boostPersonMotive(person, "entertainment", 2 * scale);
}

function starChartParticipants(floor) {
  if (!isStarChartFloorType(floor?.type) || !floor.starChart?.id) return [];
  const sessionId = floor.starChart.id;
  return allResidents(state).filter((person) => {
    return person?.lifeVisit?.reason === "starChart" && person.lifeVisit.sessionId === sessionId && Number(person.lifeVisit.floorId) === Number(floor.id);
  });
}

function applyStarChartPhaseMotion(floor, guests = starChartParticipants(floor), staff = null) {
  if (!isActiveStarChart(floor)) return;
  const phase = currentStarChartPhase(floor);
  const workers = staff || (floor.workers || []).map((id) => getResident(id)).filter(Boolean);
  workers.forEach((worker, index) => {
    endSocialForPerson(worker);
    worker.need = "entertainment";
    worker.activity = phase.worker[index % phase.worker.length] || "look";
    worker.activityTimer = Math.max(worker.activityTimer || 0, randFloat(7, 12));
    worker.activityLane = "c";
    worker.lifeWish = `${phase.label}${STAR_CHART_LABELS[floor.type] || "星图校准"}`;
    assignPersonMotion(worker, floor.type, worker.activity);
  });
  guests.forEach((person, index) => {
    person.need = index % 2 ? "social" : "entertainment";
    person.activity = phase.guest[index % phase.guest.length] || "look";
    person.activityTimer = Math.max(person.activityTimer || 0, randFloat(6, 11));
    person.lifeWish = `${phase.label}星图：${floor.name}`;
    assignPersonMotion(person, floor.type, person.activity);
  });
}

function pairStarChartReaders(floor, guests, staff, seed = 0) {
  if (!guests.length) return;
  const scene = SOCIAL_SCENES.observatory[seed % SOCIAL_SCENES.observatory.length] || SOCIAL_SCENES.default[0];
  const readers = [...staff, ...guests].filter((person) => person && !person.socialPartnerId);
  for (let index = 0; index + 1 < readers.length; index += 2) {
    applySocialScene(
      readers[index],
      readers[index + 1],
      scene,
      `star-chart-${floor.id}-${readers[index].id}-${readers[index + 1].id}-${Date.now()}`,
      randFloat(7, 12),
      floor.type,
      floorSocialScope(floor)
    );
  }
}

function pulseStarChartMark(floor, guests = starChartParticipants(floor), staff = null) {
  if (!isActiveStarChart(floor)) return 0;
  const workers = staff || (floor.workers || []).map((id) => getResident(id)).filter(Boolean);
  const chart = floor.starChart;
  const skill = averageSkill(floor.workers || [], floor.type);
  const remaining = Math.max(0, (chart.targetMarks || 0) - (chart.marks || 0));
  const capacity = clamp(1 + Math.floor(skill / 5) + Math.min(1, workers.length), 1, 3);
  const markedNow = Math.min(remaining || 1, capacity);
  chart.marks = (chart.marks || 0) + markedNow;
  chart.starPulse = 1;
  chart.focusStar = ((chart.focusStar || 0) + markedNow) % 7;
  state.stats.starChartMarksDone = (state.stats.starChartMarksDone || 0) + markedNow;
  chart.focus = clamp(Number(chart.focus || 0) + 5 + markedNow * 6 + skill * 0.28 + starChartPracticeBonus(state) * 42, 0, 100);
  applyStarChartPhaseMotion(floor, guests, workers);
  guests.forEach((person) => applyStarChartMotiveBurst(floor, person, 0.36));
  workers.forEach((worker) => {
    boostPersonMotive(worker, "entertainment", 2.2);
    boostPersonMotive(worker, "social", 1);
  });
  pairStarChartReaders(floor, guests, workers, chart.marks || 0);
  const expeditionPush = (state.expeditions || []).length
    ? (0.9 + skill * 0.08 + starChartPracticeBonus(state) * 7) * markedNow
    : 0;
  if (expeditionPush > 0) {
    state.expeditions.forEach((expedition) => {
      expedition.remaining = Math.max(1, Number(expedition.remaining || 0) - expeditionPush);
      expedition.starChartPrep = Math.min(0.18, Number(expedition.starChartPrep || 0) + 0.012 * markedNow);
    });
  }
  const coins = Math.round((6 + markedNow * (4 + state.happiness / 115) + skill * 0.62) * (1 + starChartPracticeBonus(state) * 0.68));
  addCoins(coins);
  if (Math.random() < 0.055 + starChartPracticeBonus(state) * 0.35 + Math.min(0.04, (floor.level || 1) * 0.008)) {
    state.gems += 1;
    addLog(`${floor.name} 捕捉到一枚星屑，额外获得 1 宝石。`);
  }
  showFloat(`星标 +${coins}`);
  chart.earned = (chart.earned || 0) + coins;
  if (chart.focus >= 78 && !chart.clearLogged) {
    chart.clearLogged = true;
    addLog(`${floor.name} 的星图变得格外清晰，探险队看见了更短的航线。`);
  }
  return coins;
}

function settleStarChartFinale(floor, guests = starChartParticipants(floor)) {
  if (!isActiveStarChart(floor) || floor.starChart.finalRewarded) return 0;
  const chart = floor.starChart;
  const target = Math.max(1, Number(chart.targetMarks) || 1);
  const ratio = clamp((chart.marks || 0) / target, 0, 1.35);
  const bonus = Math.round((chart.earned || 0) * (0.1 + ratio * 0.2) + (chart.focus || 0) * 0.56 + (chart.marks || 0) * 4);
  chart.finalRewarded = true;
  chart.earned = (chart.earned || 0) + bonus;
  if (bonus > 0) addCoins(bonus);
  if (ratio >= 1 && Math.random() < 0.22 + starChartPracticeBonus(state) * 0.5) {
    state.gems += 1;
  }
  state.happiness = clamp(state.happiness + Math.min(4, 1 + Math.floor((chart.marks || 0) / 3)), 0, 100);
  guests.forEach((person) => {
    applyStarChartMotiveBurst(floor, person, 0.32);
    const home = findFloor(person.homeFloorId);
    if (home?.type === "dwelling") {
      home.rentReady = Math.min(420, (home.rentReady || 0) + 3);
    }
  });
  return bonus;
}

function startStarChart(floorId) {
  const floor = findFloor(floorId);
  if (!isBusiness(floor) || !isStarChartFloorType(floor.type)) return;
  const reason = starChartActionBlockReason(floor);
  if (reason) {
    showToast(reason);
    return;
  }
  const skill = averageSkill(floor.workers || [], floor.type);
  const capacity = clamp(1 + (floor.level || 1) + Math.floor(skill / 5), 1, 5);
  const guests = starChartCandidatesForFloor(floor).slice(0, Math.min(capacity, Math.max(1, (floor.stock || 0) * 2)));
  const stockCost = Math.min(floor.stock || 0, Math.max(1, Math.ceil(Math.max(guests.length, 1) / 2)));
  const label = STAR_CHART_LABELS[floor.type] || "星图校准";
  const sessionId = `star-chart-${floor.id}-${Date.now()}-${randInt(10, 99)}`;
  const duration = randFloat(34, 46);
  const targetMarks = Math.max(4, guests.length + 3 + Math.floor(skill / 5));
  const openingFocus = clamp(22 + guests.length * 6 + skill * 0.82 + starChartPracticeBonus(state) * 74 + (state.expeditions?.length || 0) * 4, 18, 68);
  floor.stock = Math.max(0, (floor.stock || 0) - stockCost);
  floor.starChartCooldown = starChartCooldown(floor);
  floor.starChart = {
    id: sessionId,
    label,
    remaining: duration,
    total: duration,
    participantIds: guests.map((person) => person.id),
    phase: "align",
    focus: openingFocus,
    marks: 0,
    targetMarks,
    markTimer: randFloat(4.0, 5.8),
    earned: 0,
    finalRewarded: false,
    starPulse: 0,
    focusStar: 0,
  };
  const staff = (floor.workers || []).map((id) => getResident(id)).filter(Boolean);
  staff.forEach((worker, index) => {
    endSocialForPerson(worker);
    worker.need = "entertainment";
    worker.activity = index % 2 ? "work" : "look";
    worker.activityTimer = Math.max(worker.activityTimer || 0, duration);
    worker.activityLane = "c";
    assignPersonMotion(worker, floor.type, worker.activity);
    boostPersonMotive(worker, "entertainment", 3);
  });
  guests.forEach((person, index) => {
    startLifeVisit(person, floor, index % 2 ? "social" : "entertainment", {
      allowCompanion: false,
      label: `参加${label}`,
      reason: "starChart",
      duration: duration + randFloat(-3, 4),
      minStay: Math.max(12, duration * 0.38),
      targetGoal: 91,
      sessionId,
    });
    person.activity = index % 2 ? "talk" : "look";
    person.activityTimer = Math.max(person.activityTimer || 0, duration * 0.5);
    assignPersonMotion(person, floor.type, person.activity);
    applyStarChartMotiveBurst(floor, person, 0.48);
  });
  applyStarChartPhaseMotion(floor, guests, staff);
  pairStarChartReaders(floor, guests, staff, 0);
  state.stats.starChartCalibrationsDone = (state.stats.starChartCalibrationsDone || 0) + 1;
  state.happiness = clamp(state.happiness + Math.min(4, 1 + Math.ceil(guests.length / 2)), 0, 100);
  const names = guests.length ? guests.map((person) => person.name).slice(0, 3).join("、") : "探险队";
  const extra = guests.length > 3 ? `等 ${guests.length} 人` : "";
  showToast(`${label}开始：${guests.length || state.expeditions.length} 条星路待确认`);
  addLog(`${floor.name} 开始${label}，${names}${extra}围着星图读盘，消耗 ${stockCost} 份星盘耗材。`);
  lastKingdomKey = "";
  render(true);
}

function updateStarChartFloor(floor, dt) {
  if (!isStarChartFloorType(floor?.type)) return false;
  const before = starChartMapKey(floor);
  floor.starChartCooldown = Math.max(0, (floor.starChartCooldown || 0) - dt * (1 + clockworkTempoBonus(state) * 0.18));
  if (!isActiveStarChart(floor)) return before !== starChartMapKey(floor);
  floor.starChart.remaining = Math.max(0, Number(floor.starChart.remaining || 0) - dt);
  floor.starChart.starPulse = Math.max(0, Number(floor.starChart.starPulse || 0) - dt * 0.9);
  const guests = starChartParticipants(floor);
  floor.starChart.participantIds = guests.map((person) => person.id);
  guests.forEach((person) => applyStarChartMotiveBurst(floor, person, dt * 0.05));
  const staff = (floor.workers || []).map((id) => getResident(id)).filter(Boolean);
  staff.forEach((person) => {
    boostPersonMotive(person, "entertainment", dt * 0.08);
    boostPersonMotive(person, "social", dt * 0.03);
  });
  const phase = starChartPhaseForProgress(starChartProgress(floor));
  if (floor.starChart.phase !== phase.id) {
    floor.starChart.phase = phase.id;
    floor.starChart.focus = clamp(Number(floor.starChart.focus || 0) + 6 + Math.max(1, guests.length), 0, 100);
    applyStarChartPhaseMotion(floor, guests, staff);
    addLog(`${floor.name} 的${floor.starChart.label || "星图校准"}进入${phase.label}。`);
  }
  floor.starChart.markTimer = Math.max(0, Number(floor.starChart.markTimer || 0) - dt * (1 + starChartPracticeBonus(state) * 0.48));
  if (floor.starChart.markTimer <= 0) {
    pulseStarChartMark(floor, guests, staff);
    floor.starChart.markTimer = randFloat(4.2, 6.2);
  }
  if (floor.starChart.remaining <= 0 || (floor.starChart.marks || 0) >= (floor.starChart.targetMarks || 1)) {
    const label = STAR_CHART_LABELS[floor.type] || "星图校准";
    const marks = floor.starChart.marks || 0;
    const focus = Math.round(floor.starChart.focus || 0);
    const finale = settleStarChartFinale(floor, guests);
    floor.starChart = null;
    addLog(`${floor.name} 的${label}收束，标记 ${marks} 颗星，清晰度 ${focus}%，追加 ${finale} 金币。`);
  }
  return before !== starChartMapKey(floor);
}

function renderStarChartPanel(floor) {
  if (!isStarChartFloorType(floor?.type)) return "";
  const active = isActiveStarChart(floor);
  const guests = active ? starChartParticipants(floor) : [];
  const phase = currentStarChartPhase(floor);
  const focus = active ? Math.round(Number(floor.starChart.focus || 0)) : 0;
  const tone = active ? starChartFocusTone(floor) : "dim";
  const marks = active ? floor.starChart.marks || 0 : state.stats.starChartMarksDone || 0;
  const target = active ? Math.max(1, Number(floor.starChart.targetMarks) || 1) : Math.max(1, marks || 1);
  const progress = active ? clamp(marks / target, 0, 1) : 0;
  const nextMark = active ? Math.ceil(floor.starChart.markTimer || 0) : 0;
  const names = guests.length ? guests.map((person) => person.name).slice(0, 4).join("、") : (state.expeditions || []).length ? "为探险队预报" : "等待居民读星";
  const status = active
    ? `${phase.label} ${Math.ceil(floor.starChart.remaining)}s · ${names}`
    : (floor.starChartCooldown || 0) > 0
      ? `冷却 ${Math.ceil(floor.starChartCooldown)}s`
      : "就绪";
  const extra = active ? ` · 收益 ${floor.starChart.earned || 0}` : "";
  const phaseRow = STAR_CHART_PHASES.map((entry) => {
    const done = active && starChartProgress(floor) >= entry.threshold;
    const current = active && entry.id === phase.id;
    return `<i class="${done ? "done" : ""} ${current ? "current" : ""}" title="${escapeAttr(entry.label)}"><b></b><span>${escapeHtml(entry.label)}</span></i>`;
  }).join("");
  return `
    <div class="star-chart-panel ${active ? "active" : ""}" data-focus="${escapeAttr(tone)}" data-phase="${escapeAttr(phase.id)}">
      <div class="star-chart-panel-head">
        <strong>${STAR_CHART_LABELS[floor.type] || "星图校准"}</strong>
        <em>${active ? `${starChartFocusLabel(floor)} ${focus}%` : "待校准"}</em>
      </div>
      <div class="star-chart-meter" aria-hidden="true"><i style="width:${Math.round(progress * 100)}%"></i></div>
      <div class="star-chart-phase-row" aria-hidden="true">${phaseRow}</div>
      <div class="star-chart-readout">
        <b><span>星标</span><strong>${active ? `${marks}/${target}` : `${state.stats.starChartMarksDone || 0}`}</strong></b>
        <b><span>下次</span><strong>${active ? `${nextMark}s` : "就绪"}</strong></b>
        <b><span>探险</span><strong>${(state.expeditions || []).length}</strong></b>
      </div>
      <span>${escapeHtml(status)}${extra}</span>
      <small>校准 ${state.stats.starChartCalibrationsDone || 0} 次 · 星标 ${state.stats.starChartMarksDone || 0} · 星象 +${Math.round(observatoryStarBonus(state) * 100)}%</small>
    </div>`;
}

function starChartMapKey(floor) {
  if (!isStarChartFloorType(floor?.type)) return "";
  const participants = floor.starChart?.participantIds || [];
  return `starChart:${Math.ceil(floor.starChartCooldown || 0)}:${Math.ceil(floor.starChart?.remaining || 0)}:${participants.join("-")}:${floor.starChart?.phase || ""}:${Math.round(floor.starChart?.focus || 0)}:${floor.starChart?.marks || 0}:${floor.starChart?.targetMarks || 0}:${floor.starChart?.earned || 0}:${Math.round((floor.starChart?.starPulse || 0) * 10)}:${floor.starChart?.focusStar || 0}`;
}

function isToolTuneFloorType(type) {
  return TOOL_TUNE_FLOOR_TYPES.includes(type);
}

function isActiveToolTune(floor) {
  return Boolean(isToolTuneFloorType(floor?.type) && floor.toolTune && Number(floor.toolTune.remaining) > 0);
}

function toolTunePracticeBonus(game = state) {
  return Math.min(0.14, (game.stats?.toolTuneSessionsDone || 0) * 0.004 + (game.stats?.toolTuneMarksDone || 0) * 0.002);
}

function activeToolTuneBonus(game = state) {
  return businessFloors(game).some((floor) => isActiveToolTune(floor)) ? 0.038 : 0;
}

function toolTuneWorkloadCount(game = state) {
  const construction = (game.floors || []).filter((floor) => floor.status === "construction").length;
  const production = businessFloors(game).filter((floor) => floor.production).length;
  const expeditions = game.expeditions?.length || 0;
  const craftOrders = (game.orders || []).filter((order) => order.type === "craft").length;
  return construction + production + expeditions + craftOrders;
}

function toolTuneProgress(floor) {
  if (!isActiveToolTune(floor)) return 0;
  const total = Math.max(1, Number(floor.toolTune.total) || 1);
  const target = Math.max(1, Number(floor.toolTune.targetMarks) || 1);
  const timeProgress = clamp(1 - Number(floor.toolTune.remaining || 0) / total, 0, 1);
  const markProgress = clamp(Number(floor.toolTune.marks || 0) / target, 0, 1);
  return clamp(Math.max(timeProgress, markProgress * 0.92), 0, 1);
}

function toolTunePhaseForProgress(progress = 0) {
  return TOOL_TUNE_PHASES.reduce((current, phase) => (progress >= phase.threshold ? phase : current), TOOL_TUNE_PHASES[0]);
}

function currentToolTunePhase(floor) {
  if (!isToolTuneFloorType(floor?.type)) return TOOL_TUNE_PHASES[0];
  const activePhase = TOOL_TUNE_PHASES.find((phase) => phase.id === floor.toolTune?.phase);
  return activePhase || toolTunePhaseForProgress(toolTuneProgress(floor));
}

function toolTunePrecisionTone(floor) {
  const precision = Number(floor?.toolTune?.precision || 0);
  if (precision >= 78) return "exact";
  if (precision >= 48) return "steady";
  return "rough";
}

function toolTunePrecisionLabel(floor) {
  const precision = Number(floor?.toolTune?.precision || 0);
  if (precision >= 78) return "精密成套";
  if (precision >= 48) return "校准稳定";
  return "粗调起步";
}

function toolTuneCooldown(floor) {
  const skill = averageSkill(floor.workers || [], floor.type);
  return Math.max(22, Math.round(56 - skill * 2.05 - toolTunePracticeBonus(state) * 38 - clockworkTempoBonus(state) * 7));
}

function toolTuneCandidatesForFloor(floor) {
  if (!isToolTuneFloorType(floor?.type)) return [];
  const staff = new Set(floor.workers || []);
  return allResidents(state)
    .filter((person) => person && !staff.has(person.id) && !person.expeditionId && !isActiveLifeVisit(person))
    .map((person) => {
      ensurePersonLife(person);
      const currentFloor = currentFloorForPerson(person);
      const energyNeed = personNeedUrgency(person, "energy") * 1.12;
      const socialNeed = personNeedUrgency(person, "social") * 0.62;
      const favorite = (person.favoriteTypes || []).some((type) => ["craft", "clockwork", "market"].includes(type)) ? 0.45 : 0;
      const dream = ["craft", "clockwork", "market", "treasure"].includes(person.dreamType) ? 0.35 : 0;
      const workload = Math.min(0.42, toolTuneWorkloadCount(state) * 0.08);
      const near = currentFloor ? Math.max(0, 0.36 - Math.abs(Number(currentFloor.id) - Number(floor.id)) * 0.04) : 0;
      const mood = personMotiveMood(person);
      const moodNeed = mood === "strained" ? 0.28 : mood === "seeking" ? 0.18 : 0;
      return { person, score: energyNeed + socialNeed + favorite + dream + workload + near + moodNeed + Math.random() * 0.18 };
    })
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.person);
}

function toolTuneActionBlockReason(floor) {
  if (!isToolTuneFloorType(floor?.type)) return "这个楼层不能校准工具";
  if (!floor.workers?.length) return `${FLOOR_TYPES[floor.type].label}需要员工看台校准`;
  if ((floor.stock || 0) <= 0) return `${FLOOR_TYPES[floor.type].label}零件不足，先补货`;
  if (isActiveToolTune(floor)) return "工具校准正在进行";
  if ((floor.toolTuneCooldown || 0) > 0) return `还要 ${Math.ceil(floor.toolTuneCooldown)}s 才能再次校准`;
  if (!toolTuneCandidatesForFloor(floor).length && !toolTuneWorkloadCount(state)) return "暂时没有居民或王国工作需要校准工具";
  return "";
}

function applyToolTuneMotiveBurst(floor, person, scale = 1) {
  boostPersonMotive(person, "energy", 10 * scale);
  boostPersonMotive(person, "social", 5 * scale);
  boostPersonMotive(person, "entertainment", 3 * scale);
  if (floor.level > 2) boostPersonMotive(person, "energy", 2 * scale);
}

function toolTuneParticipants(floor) {
  if (!isToolTuneFloorType(floor?.type) || !floor.toolTune?.id) return [];
  const sessionId = floor.toolTune.id;
  return allResidents(state).filter((person) => {
    return person?.lifeVisit?.reason === "toolTune" && person.lifeVisit.sessionId === sessionId && Number(person.lifeVisit.floorId) === Number(floor.id);
  });
}

function applyToolTunePhaseMotion(floor, guests = toolTuneParticipants(floor), staff = null) {
  if (!isActiveToolTune(floor)) return;
  const phase = currentToolTunePhase(floor);
  const workers = staff || (floor.workers || []).map((id) => getResident(id)).filter(Boolean);
  workers.forEach((worker, index) => {
    endSocialForPerson(worker);
    worker.need = "energy";
    worker.activity = phase.worker[index % phase.worker.length] || "work";
    worker.activityTimer = Math.max(worker.activityTimer || 0, randFloat(7, 12));
    worker.activityLane = "c";
    worker.lifeWish = `${phase.label}${TOOL_TUNE_LABELS[floor.type] || "工具校准"}`;
    assignPersonMotion(worker, floor.type, worker.activity);
  });
  guests.forEach((person, index) => {
    person.need = index % 2 ? "social" : "energy";
    person.activity = phase.guest[index % phase.guest.length] || "look";
    person.activityTimer = Math.max(person.activityTimer || 0, randFloat(6, 11));
    person.lifeWish = `${phase.label}工具，${floor.name}`;
    assignPersonMotion(person, floor.type, person.activity);
  });
}

function pairToolTuneWorkers(floor, guests, staff, seed = 0) {
  const scene = SOCIAL_SCENES.craft?.[seed % SOCIAL_SCENES.craft.length] || SOCIAL_SCENES.default[0];
  const makers = [...staff, ...guests].filter((person) => person && !person.socialPartnerId);
  for (let index = 0; index + 1 < makers.length; index += 2) {
    applySocialScene(
      makers[index],
      makers[index + 1],
      scene,
      `tool-tune-${floor.id}-${makers[index].id}-${makers[index + 1].id}-${Date.now()}`,
      randFloat(7, 12),
      floor.type,
      floorSocialScope(floor)
    );
  }
}

function pulseToolTuneMark(floor, guests = toolTuneParticipants(floor), staff = null) {
  if (!isActiveToolTune(floor)) return 0;
  const workers = staff || (floor.workers || []).map((id) => getResident(id)).filter(Boolean);
  const tune = floor.toolTune;
  const skill = averageSkill(floor.workers || [], floor.type);
  const remaining = Math.max(0, (tune.targetMarks || 0) - (tune.marks || 0));
  const capacity = clamp(1 + Math.floor(skill / 5) + Math.min(1, workers.length), 1, 3);
  const markedNow = Math.min(remaining || 1, capacity);
  tune.marks = (tune.marks || 0) + markedNow;
  tune.toolPulse = 1;
  tune.focusTool = ((tune.focusTool || 0) + markedNow) % 6;
  state.stats.toolTuneMarksDone = (state.stats.toolTuneMarksDone || 0) + markedNow;
  tune.precision = clamp(Number(tune.precision || 0) + 5 + markedNow * 6 + skill * 0.28 + toolTunePracticeBonus(state) * 42, 0, 100);
  applyToolTunePhaseMotion(floor, guests, workers);
  guests.forEach((person) => applyToolTuneMotiveBurst(floor, person, 0.36));
  workers.forEach((worker) => {
    boostPersonMotive(worker, "energy", 2.2);
    boostPersonMotive(worker, "social", 1);
  });
  pairToolTuneWorkers(floor, guests, workers, tune.marks || 0);

  const push = (0.55 + skill * 0.05 + toolTunePracticeBonus(state) * 5) * markedNow;
  state.floors.forEach((targetFloor) => {
    if (targetFloor.status === "construction") {
      targetFloor.buildRemaining = Math.max(0.4, Number(targetFloor.buildRemaining || 0) - push);
    } else if (isBusiness(targetFloor) && targetFloor.production) {
      targetFloor.production.remaining = Math.max(0.4, Number(targetFloor.production.remaining || 0) - push * 0.82);
    }
  });
  (state.expeditions || []).forEach((expedition) => {
    expedition.remaining = Math.max(1, Number(expedition.remaining || 0) - push * 0.62);
    expedition.toolTunePrep = Math.min(0.14, Number(expedition.toolTunePrep || 0) + 0.01 * markedNow);
  });
  let orderBoost = 0;
  (state.orders || [])
    .filter((order) => order.type === "craft")
    .slice(0, 2)
    .forEach((order) => {
      const previous = Math.max(0, Number(order.toolTuneRewardBonus) || 0);
      const reward = Math.min(180 - previous, Math.max(0, Math.round((8 + skill * 0.8) * markedNow * (1 + toolTunePracticeBonus(state) * 0.6))));
      if (reward <= 0) return;
      order.toolTuneRewardBonus = previous + reward;
      order.reward += reward;
      orderBoost += reward;
    });
  const coins = Math.round((5 + markedNow * (3.6 + state.happiness / 120) + skill * 0.55) * (1 + toolTunePracticeBonus(state) * 0.68));
  addCoins(coins);
  showFloat(`工具 +${coins}`);
  tune.earned = (tune.earned || 0) + coins + orderBoost;
  if (tune.precision >= 78 && !tune.preciseLogged) {
    tune.preciseLogged = true;
    addLog(`${floor.name} 的工具校准到精密状态，施工、补货和探险队都拿到了新工具。`);
  }
  return coins + orderBoost;
}

function settleToolTuneFinale(floor, guests = toolTuneParticipants(floor)) {
  if (!isActiveToolTune(floor) || floor.toolTune.finalRewarded) return 0;
  const tune = floor.toolTune;
  const target = Math.max(1, Number(tune.targetMarks) || 1);
  const ratio = clamp((tune.marks || 0) / target, 0, 1.35);
  const bonus = Math.round((tune.earned || 0) * (0.1 + ratio * 0.2) + (tune.precision || 0) * 0.5 + (tune.marks || 0) * 4);
  tune.finalRewarded = true;
  tune.earned = (tune.earned || 0) + bonus;
  if (bonus > 0) addCoins(bonus);
  if (ratio >= 1 && Math.random() < 0.18 + toolTunePracticeBonus(state) * 0.45) {
    state.gems += 1;
  }
  state.happiness = clamp(state.happiness + Math.min(4, 1 + Math.floor((tune.marks || 0) / 3)), 0, 100);
  guests.forEach((person) => {
    applyToolTuneMotiveBurst(floor, person, 0.32);
    const home = findFloor(person.homeFloorId);
    if (home?.type === "dwelling") {
      home.rentReady = Math.min(420, (home.rentReady || 0) + 3);
    }
  });
  return bonus;
}

function startToolTune(floorId) {
  const floor = findFloor(floorId);
  if (!isBusiness(floor) || !isToolTuneFloorType(floor.type)) return;
  const reason = toolTuneActionBlockReason(floor);
  if (reason) {
    showToast(reason);
    return;
  }
  const skill = averageSkill(floor.workers || [], floor.type);
  const workload = toolTuneWorkloadCount(state);
  const capacity = clamp(1 + (floor.level || 1) + Math.floor(skill / 5), 1, 5);
  const guests = toolTuneCandidatesForFloor(floor).slice(0, Math.min(capacity, Math.max(1, (floor.stock || 0) * 2)));
  const stockCost = Math.min(floor.stock || 0, Math.max(1, Math.ceil(Math.max(guests.length, 1) / 2)));
  const label = TOOL_TUNE_LABELS[floor.type] || "工具校准";
  const sessionId = `tool-tune-${floor.id}-${Date.now()}-${randInt(10, 99)}`;
  const duration = randFloat(33, 45);
  const targetMarks = Math.max(4, guests.length + 3 + Math.floor(skill / 5) + Math.min(2, workload));
  const openingPrecision = clamp(22 + guests.length * 5 + workload * 3 + skill * 0.82 + toolTunePracticeBonus(state) * 74, 18, 68);
  floor.stock = Math.max(0, (floor.stock || 0) - stockCost);
  floor.toolTuneCooldown = toolTuneCooldown(floor);
  floor.toolTune = {
    id: sessionId,
    label,
    remaining: duration,
    total: duration,
    participantIds: guests.map((person) => person.id),
    phase: "sort",
    precision: openingPrecision,
    marks: 0,
    targetMarks,
    markTimer: randFloat(4.0, 5.8),
    earned: 0,
    finalRewarded: false,
    toolPulse: 0,
    focusTool: 0,
  };
  const staff = (floor.workers || []).map((id) => getResident(id)).filter(Boolean);
  staff.forEach((worker, index) => {
    endSocialForPerson(worker);
    worker.need = "energy";
    worker.activity = index % 2 ? "look" : "work";
    worker.activityTimer = Math.max(worker.activityTimer || 0, duration);
    worker.activityLane = "c";
    assignPersonMotion(worker, floor.type, worker.activity);
    boostPersonMotive(worker, "energy", 3);
  });
  guests.forEach((person, index) => {
    startLifeVisit(person, floor, index % 2 ? "social" : "energy", {
      allowCompanion: false,
      label: `参加${label}`,
      reason: "toolTune",
      duration: duration + randFloat(-3, 4),
      minStay: Math.max(12, duration * 0.38),
      targetGoal: 91,
      sessionId,
    });
    person.activity = index % 2 ? "talk" : "look";
    person.activityTimer = Math.max(person.activityTimer || 0, duration * 0.5);
    assignPersonMotion(person, floor.type, person.activity);
    applyToolTuneMotiveBurst(floor, person, 0.48);
  });
  applyToolTunePhaseMotion(floor, guests, staff);
  pairToolTuneWorkers(floor, guests, staff, 0);
  state.stats.toolTuneSessionsDone = (state.stats.toolTuneSessionsDone || 0) + 1;
  state.happiness = clamp(state.happiness + Math.min(4, 1 + Math.ceil(guests.length / 2)), 0, 100);
  const names = guests.length ? guests.map((person) => person.name).slice(0, 3).join("、") : "施工与探险队";
  const extra = guests.length > 3 ? `等 ${guests.length} 人` : "";
  showToast(`${label}开始：${guests.length || workload || 1} 项工具待校准`);
  addLog(`${floor.name} 开始${label}，${names}${extra}围着工具台检查零件，消耗 ${stockCost} 份工坊零件。`);
  lastKingdomKey = "";
  render(true);
}

function updateToolTuneFloor(floor, dt) {
  if (!isToolTuneFloorType(floor?.type)) return false;
  const before = toolTuneMapKey(floor);
  floor.toolTuneCooldown = Math.max(0, (floor.toolTuneCooldown || 0) - dt * (1 + clockworkTempoBonus(state) * 0.18));
  if (!isActiveToolTune(floor)) return before !== toolTuneMapKey(floor);
  floor.toolTune.remaining = Math.max(0, Number(floor.toolTune.remaining || 0) - dt);
  floor.toolTune.toolPulse = Math.max(0, Number(floor.toolTune.toolPulse || 0) - dt * 0.9);
  const guests = toolTuneParticipants(floor);
  floor.toolTune.participantIds = guests.map((person) => person.id);
  guests.forEach((person) => applyToolTuneMotiveBurst(floor, person, dt * 0.05));
  const staff = (floor.workers || []).map((id) => getResident(id)).filter(Boolean);
  staff.forEach((person) => {
    boostPersonMotive(person, "energy", dt * 0.08);
    boostPersonMotive(person, "social", dt * 0.03);
  });
  const phase = toolTunePhaseForProgress(toolTuneProgress(floor));
  if (floor.toolTune.phase !== phase.id) {
    floor.toolTune.phase = phase.id;
    floor.toolTune.precision = clamp(Number(floor.toolTune.precision || 0) + 6 + Math.max(1, guests.length), 0, 100);
    applyToolTunePhaseMotion(floor, guests, staff);
    addLog(`${floor.name} 的${floor.toolTune.label || "工具校准"}进入${phase.label}。`);
  }
  floor.toolTune.markTimer = Math.max(0, Number(floor.toolTune.markTimer || 0) - dt * (1 + toolTunePracticeBonus(state) * 0.48));
  if (floor.toolTune.markTimer <= 0) {
    pulseToolTuneMark(floor, guests, staff);
    floor.toolTune.markTimer = randFloat(4.2, 6.2);
  }
  if (floor.toolTune.remaining <= 0 || (floor.toolTune.marks || 0) >= (floor.toolTune.targetMarks || 1)) {
    const label = TOOL_TUNE_LABELS[floor.type] || "工具校准";
    const marks = floor.toolTune.marks || 0;
    const precision = Math.round(floor.toolTune.precision || 0);
    const finale = settleToolTuneFinale(floor, guests);
    floor.toolTune = null;
    addLog(`${floor.name} 的${label}收束，完成 ${marks} 个校准点，精度 ${precision}%，追加 ${finale} 金币。`);
  }
  return before !== toolTuneMapKey(floor);
}

function renderToolTunePanel(floor) {
  if (!isToolTuneFloorType(floor?.type)) return "";
  const active = isActiveToolTune(floor);
  const guests = active ? toolTuneParticipants(floor) : [];
  const phase = currentToolTunePhase(floor);
  const precision = active ? Math.round(Number(floor.toolTune.precision || 0)) : 0;
  const tone = active ? toolTunePrecisionTone(floor) : "rough";
  const marks = active ? floor.toolTune.marks || 0 : state.stats.toolTuneMarksDone || 0;
  const target = active ? Math.max(1, Number(floor.toolTune.targetMarks) || 1) : Math.max(1, marks || 1);
  const progress = active ? clamp(marks / target, 0, 1) : 0;
  const nextMark = active ? Math.ceil(floor.toolTune.markTimer || 0) : 0;
  const names = guests.length ? guests.map((person) => person.name).slice(0, 4).join("、") : toolTuneWorkloadCount(state) ? "支援施工/补货/探险" : "等待居民试用";
  const status = active
    ? `${phase.label} ${Math.ceil(floor.toolTune.remaining)}s · ${names}`
    : (floor.toolTuneCooldown || 0) > 0
      ? `冷却 ${Math.ceil(floor.toolTuneCooldown)}s`
      : "就绪";
  const extra = active ? ` · 收益 ${floor.toolTune.earned || 0}` : "";
  const phaseRow = TOOL_TUNE_PHASES.map((entry) => {
    const done = active && toolTuneProgress(floor) >= entry.threshold;
    const current = active && entry.id === phase.id;
    return `<i class="${done ? "done" : ""} ${current ? "current" : ""}" title="${escapeAttr(entry.label)}"><b></b><span>${escapeHtml(entry.label)}</span></i>`;
  }).join("");
  return `
    <div class="tool-tune-panel ${active ? "active" : ""}" data-precision="${escapeAttr(tone)}" data-phase="${escapeAttr(phase.id)}">
      <div class="tool-tune-panel-head">
        <strong>${TOOL_TUNE_LABELS[floor.type] || "工具校准"}</strong>
        <em>${active ? `${toolTunePrecisionLabel(floor)} ${precision}%` : "待校准"}</em>
      </div>
      <div class="tool-tune-meter" aria-hidden="true"><i style="width:${Math.round(progress * 100)}%"></i></div>
      <div class="tool-tune-phase-row" aria-hidden="true">${phaseRow}</div>
      <div class="tool-tune-readout">
        <b><span>校准点</span><strong>${active ? `${marks}/${target}` : `${state.stats.toolTuneMarksDone || 0}`}</strong></b>
        <b><span>下次</span><strong>${active ? `${nextMark}s` : "就绪"}</strong></b>
        <b><span>支援</span><strong>${toolTuneWorkloadCount(state)}</strong></b>
      </div>
      <span>${escapeHtml(status)}${extra}</span>
      <small>校准 ${state.stats.toolTuneSessionsDone || 0} 场 · 校准点 ${state.stats.toolTuneMarksDone || 0} · 工具 +${Math.round(craftToolBonus(state) * 100)}%</small>
    </div>`;
}

function renderToolTuneLayer(floor) {
  if (!isActiveToolTune(floor)) return "";
  const tune = floor.toolTune;
  const phase = currentToolTunePhase(floor);
  const tone = toolTunePrecisionTone(floor);
  const progress = Math.round(toolTuneProgress(floor) * 100);
  const markProgress = Math.round(clamp(Number(tune.marks || 0) / Math.max(1, Number(tune.targetMarks) || 1), 0, 1) * 100);
  const focusTool = clamp(Number(tune.focusTool) || 0, 0, 5);
  const tools = Array.from({ length: 6 }, (_, index) => {
    const lit = index < Math.ceil((markProgress / 100) * 6);
    const current = index === focusTool;
    const left = 15 + index * 13;
    const top = 23 + (index % 2) * 17;
    return `<b class="${lit ? "lit" : ""} ${current ? "current" : ""}" style="--tool-left:${left}%; --tool-top:${top}%"><i></i></b>`;
  }).join("");
  const phases = TOOL_TUNE_PHASES.map((entry) => {
    const lit = progress >= Math.round(entry.threshold * 100);
    return `<i class="${lit ? "lit" : ""} ${entry.id === phase.id ? "current" : ""}" data-phase="${escapeAttr(entry.id)}"></i>`;
  }).join("");
  return `
    <span class="tool-tune-layer" data-phase="${escapeAttr(phase.id)}" data-precision="${escapeAttr(tone)}" data-pulse="${tune.toolPulse > 0 ? "pulse" : "idle"}" style="--tool-progress:${progress}%; --mark-progress:${markProgress}%; --tool-precision:${Math.round(tune.precision || 0)};" title="${escapeAttr(`${phase.label} · 校准点 ${tune.marks || 0}/${tune.targetMarks || 0}`)}" aria-label="${escapeAttr(`${phase.label} · 校准点 ${tune.marks || 0}/${tune.targetMarks || 0}`)}">
      <span class="tool-tune-belt"><i></i><b></b></span>
      <span class="tool-tune-tools">${tools}</span>
      <span class="tool-tune-phase-stack">${phases}</span>
      <span class="tool-tune-sparks"><i></i><i></i><i></i></span>
    </span>`;
}

function toolTuneMapKey(floor) {
  if (!isToolTuneFloorType(floor?.type)) return "";
  const participants = floor.toolTune?.participantIds || [];
  return `toolTune:${Math.ceil(floor.toolTuneCooldown || 0)}:${Math.ceil(floor.toolTune?.remaining || 0)}:${participants.join("-")}:${floor.toolTune?.phase || ""}:${Math.round(floor.toolTune?.precision || 0)}:${floor.toolTune?.marks || 0}:${floor.toolTune?.targetMarks || 0}:${floor.toolTune?.earned || 0}:${Math.round((floor.toolTune?.toolPulse || 0) * 10)}:${floor.toolTune?.focusTool || 0}`;
}

function isShowtimeFloorType(type) {
  return SHOWTIME_FLOOR_TYPES.includes(type);
}

function isActiveShowtime(floor) {
  return Boolean(isShowtimeFloorType(floor?.type) && floor.showtime && Number(floor.showtime.remaining) > 0);
}

function showtimeProgress(floor) {
  if (!isActiveShowtime(floor)) return 0;
  const total = Math.max(1, Number(floor.showtime.total) || 1);
  return clamp(1 - Number(floor.showtime.remaining || 0) / total, 0, 1);
}

function showtimeBeatForProgress(progress = 0) {
  return SHOWTIME_BEATS.reduce((current, beat) => (progress >= beat.threshold ? beat : current), SHOWTIME_BEATS[0]);
}

function currentShowtimeBeat(floor) {
  if (!isShowtimeFloorType(floor?.type)) return SHOWTIME_BEATS[0];
  const activeBeat = SHOWTIME_BEATS.find((beat) => beat.id === floor.showtime?.beat);
  return activeBeat || showtimeBeatForProgress(showtimeProgress(floor));
}

function showtimeHeatTone(floor) {
  const heat = Number(floor?.showtime?.heat || 0);
  if (heat >= 78) return "hot";
  if (heat >= 48) return "warm";
  return "quiet";
}

function showtimeHeatLabel(floor) {
  const heat = Number(floor?.showtime?.heat || 0);
  if (heat >= 78) return "满堂";
  if (heat >= 48) return "热场";
  return "入戏";
}

function showtimePracticeBonus(game = state) {
  return Math.min(0.12, (game.stats?.entertainmentShowsDone || 0) * 0.004);
}

function activeShowtimeBonus(game = state) {
  return businessFloors(game).some((floor) => isActiveShowtime(floor)) ? 0.035 : 0;
}

function showtimeCooldown(floor) {
  const skill = averageSkill(floor.workers || [], floor.type);
  return Math.max(24, Math.round(62 - skill * 2.25 - entertainmentJoyBonus(state) * 34 - clockworkTempoBonus(state) * 7));
}

function showtimeAudienceCandidates(floor) {
  if (!isShowtimeFloorType(floor?.type)) return [];
  const performers = new Set(floor.workers || []);
  return allResidents(state)
    .filter((person) => person && !performers.has(person.id) && !person.expeditionId && !isActiveLifeVisit(person))
    .map((person) => {
      ensurePersonLife(person);
      const currentFloor = currentFloorForPerson(person);
      const entertainmentNeed = personNeedUrgency(person, "entertainment") * 1.75;
      const socialNeed = personNeedUrgency(person, "social") * 0.9;
      const favorite = (person.favoriteTypes || []).includes("entertainment") ? 0.5 : 0;
      const dream = person.dreamType === "entertainment" || person.dreamType === "festival" ? 0.38 : 0;
      const familiarCast = (floor.workers || []).reduce((sum, id) => {
        const worker = getResident(id);
        return sum + (worker ? relationshipScore(person, worker) / 95 : 0);
      }, 0);
      const near = currentFloor ? Math.max(0, 0.42 - Math.abs(Number(currentFloor.id) - Number(floor.id)) * 0.045) : 0;
      const mood = personMotiveMood(person);
      const moodNeed = mood === "strained" ? 0.42 : mood === "seeking" ? 0.24 : 0;
      return { person, score: entertainmentNeed + socialNeed + favorite + dream + familiarCast + near + moodNeed + Math.random() * 0.18 };
    })
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.person);
}

function showtimeActionBlockReason(floor) {
  if (!isShowtimeFloorType(floor?.type)) return "这个楼层不能排演";
  if (!floor.workers?.length) return "演艺楼层需要演员";
  if ((floor.stock || 0) <= 0) return "剧场道具不足，先补货";
  if (isActiveShowtime(floor)) return "小剧正在演出";
  if ((floor.showtimeCooldown || 0) > 0) return `还要 ${Math.ceil(floor.showtimeCooldown)}s 才能再次开演`;
  if (!showtimeAudienceCandidates(floor).length) return "暂时没有观众有空";
  return "";
}

function applyShowtimeMotiveBurst(floor, person, scale = 1) {
  boostPersonMotive(person, "entertainment", 13 * scale);
  boostPersonMotive(person, "social", 7 * scale);
  boostPersonMotive(person, "energy", 2 * scale);
  if (floor.stock > 0) boostPersonMotive(person, "food", 2 * scale);
}

function showtimeAudience(floor) {
  if (!isActiveShowtime(floor)) return [];
  const sessionId = floor.showtime.id;
  return allResidents(state).filter((person) => {
    return person?.lifeVisit?.reason === "showtime" && person.lifeVisit.sessionId === sessionId && Number(person.lifeVisit.floorId) === Number(floor.id);
  });
}

function applyShowtimeBeatMotion(floor, audience = showtimeAudience(floor), cast = null) {
  if (!isActiveShowtime(floor)) return;
  const beat = currentShowtimeBeat(floor);
  const performers = cast || (floor.workers || []).map((id) => getResident(id)).filter(Boolean);
  performers.forEach((performer, index) => {
    endSocialForPerson(performer);
    performer.need = "entertainment";
    performer.activity = beat.performer[index % beat.performer.length] || "dance";
    performer.activityTimer = Math.max(performer.activityTimer || 0, randFloat(7, 13));
    performer.activityLane = "c";
    performer.lifeWish = `${beat.label}${SHOWTIME_LABELS[floor.type] || "小剧"}`;
    assignPersonMotion(performer, floor.type, performer.activity);
  });
  audience.forEach((person, index) => {
    person.need = index % 3 === 0 ? "social" : "entertainment";
    person.activity = beat.audience[index % beat.audience.length] || "watch";
    person.activityTimer = Math.max(person.activityTimer || 0, randFloat(6, 12));
    person.lifeWish = `${beat.label}喝彩：${floor.name}`;
    assignPersonMotion(person, floor.type, person.activity);
  });
}

function pulseShowtimeReaction(floor, audience = showtimeAudience(floor), cast = null) {
  if (!isActiveShowtime(floor) || !audience.length) return 0;
  const performers = cast || (floor.workers || []).map((id) => getResident(id)).filter(Boolean);
  const show = floor.showtime;
  const skill = averageSkill(floor.workers || [], floor.type);
  const crowdNeed = audience.reduce((sum, person) => sum + personNeedUrgency(person, "entertainment") + personNeedUrgency(person, "social") * 0.45, 0);
  const relation = performers.reduce((sum, performer) => {
    return sum + audience.reduce((inner, watcher) => inner + relationshipScore(performer, watcher), 0);
  }, 0);
  const heatGain = clamp(4 + audience.length * 1.15 + skill * 0.22 + crowdNeed * 0.62 + relation / 360, 4, 18);
  show.heat = clamp(Number(show.heat || 0) + heatGain, 0, 100);
  show.reactions = (show.reactions || 0) + 1;
  state.stats.showtimeReactionsDone = (state.stats.showtimeReactionsDone || 0) + 1;
  applyShowtimeBeatMotion(floor, audience, performers);
  performers.slice(0, audience.length).forEach((performer, index) => {
    const watcher = audience[(index + show.reactions) % audience.length];
    if (!watcher || performer.socialPartnerId || watcher.socialPartnerId) return;
    const scene = SOCIAL_SCENES.entertainment[(index + show.reactions) % SOCIAL_SCENES.entertainment.length] || SOCIAL_SCENES.entertainment[0];
    applySocialScene(performer, watcher, scene, `showtime-pulse-${floor.id}-${performer.id}-${watcher.id}-${Date.now()}`, randFloat(7, 11), floor.type, floorSocialScope(floor));
  });
  audience.forEach((person) => applyShowtimeMotiveBurst(floor, person, 0.28));
  performers.forEach((person) => boostPersonMotive(person, "social", 2));
  const bonus = Math.round((3 + audience.length * 1.8 + skill * 0.42) * (1 + show.heat / 180 + festivalBuzzBonus(state) * 0.18));
  addCoins(bonus);
  show.earned = (show.earned || 0) + bonus;
  if (show.heat >= 78 && !show.hotLogged) {
    show.hotLogged = true;
    addLog(`${floor.name} 现场热起来了，观众跟着演员鼓掌。`);
  }
  return bonus;
}

function settleShowtimeFinale(floor, audience = showtimeAudience(floor)) {
  if (!isActiveShowtime(floor) || floor.showtime.finalRewarded) return 0;
  const show = floor.showtime;
  const heat = Number(show.heat || 0);
  const bonus = Math.round((show.applause || 0) * clamp(heat / 240, 0.12, 0.52) + (show.earned || 0) * 0.16);
  show.finalRewarded = true;
  show.earned = (show.earned || 0) + bonus;
  if (bonus > 0) addCoins(bonus);
  state.happiness = clamp(state.happiness + Math.min(5, 1 + Math.floor(heat / 32)), 0, 100);
  audience.forEach((person) => applyShowtimeMotiveBurst(floor, person, 0.45));
  return bonus;
}

function startEntertainmentShow(floorId) {
  const floor = findFloor(floorId);
  if (!isBusiness(floor) || !isShowtimeFloorType(floor.type)) return;
  const reason = showtimeActionBlockReason(floor);
  if (reason) {
    showToast(reason);
    return;
  }
  const skill = averageSkill(floor.workers || [], floor.type);
  const capacity = clamp(2 + (floor.level || 1) + Math.floor(skill / 4), 2, 6);
  const audience = showtimeAudienceCandidates(floor).slice(0, Math.min(capacity, Math.max(1, (floor.stock || 0) * 4)));
  if (!audience.length) {
    showToast("暂时没有观众有空");
    return;
  }
  const stockCost = Math.min(floor.stock || 0, Math.max(1, Math.ceil(audience.length / 3)));
  const label = SHOWTIME_LABELS[floor.type] || "小剧";
  const sessionId = `showtime-${floor.id}-${Date.now()}-${randInt(10, 99)}`;
  const duration = randFloat(38, 52);
  const openingHeat = clamp(24 + audience.length * 5 + skill * 1.2 + showtimePracticeBonus(state) * 90 + festivalBuzzBonus(state) * 20, 18, 64);
  floor.stock = Math.max(0, (floor.stock || 0) - stockCost);
  floor.showtimeCooldown = showtimeCooldown(floor);
  floor.showtime = {
    id: sessionId,
    label,
    remaining: duration,
    total: duration,
    participantIds: audience.map((person) => person.id),
    beat: "opening",
    heat: openingHeat,
    reactions: 0,
    reactionTimer: randFloat(4.5, 6.8),
    earned: 0,
    finalRewarded: false,
    applause: 0,
  };
  const cast = (floor.workers || []).map((id) => getResident(id)).filter(Boolean);
  cast.forEach((performer, index) => {
    endSocialForPerson(performer);
    performer.need = "entertainment";
    performer.activity = index % 2 ? "wave" : "dance";
    performer.activityTimer = Math.max(performer.activityTimer || 0, duration);
    performer.activityLane = "c";
    assignPersonMotion(performer, floor.type, performer.activity);
    boostPersonMotive(performer, "entertainment", 5);
  });
  audience.forEach((person, index) => {
    startLifeVisit(person, floor, "entertainment", {
      allowCompanion: false,
      label: `看${label}`,
      reason: "showtime",
      duration: duration + randFloat(-3, 4),
      minStay: Math.max(18, duration * 0.62),
      targetGoal: 96,
      sessionId,
    });
    person.activity = index % 3 === 0 ? "applaud" : "watch";
    person.activityTimer = Math.max(person.activityTimer || 0, duration);
    assignPersonMotion(person, floor.type, person.activity);
    applyShowtimeMotiveBurst(floor, person, 1);
  });
  cast.slice(0, audience.length).forEach((performer, index) => {
    const watcher = audience[index];
    if (!watcher) return;
    const scene = SOCIAL_SCENES.entertainment[index % 2] || SOCIAL_SCENES.entertainment[0];
    applySocialScene(performer, watcher, scene, `showtime-${floor.id}-${performer.id}-${watcher.id}-${Date.now()}`, Math.min(duration, randFloat(14, 20)), floor.type, floorSocialScope(floor));
  });
  const applause = Math.round((18 + audience.length * 8 + skill * 2.4) * (1 + showtimePracticeBonus(state) + festivalBuzzBonus(state) * 0.22));
  floor.showtime.applause = applause;
  addCoins(applause);
  floor.showtime.earned += applause;
  state.stats.entertainmentShowsDone = (state.stats.entertainmentShowsDone || 0) + 1;
  state.happiness = clamp(state.happiness + Math.min(6, 2 + Math.ceil(audience.length / 2)), 0, 100);
  const names = audience.map((person) => person.name).slice(0, 3).join("、");
  const extra = audience.length > 3 ? `等 ${audience.length} 人` : "";
  showToast(`${label}开演：${audience.length} 位观众`);
  addLog(`${floor.name} 排演${label}，${names}${extra}入座喝彩，消耗 ${stockCost} 份道具，收获 ${applause} 金币。`);
  lastKingdomKey = "";
  render(true);
}

function updateShowtimeFloor(floor, dt) {
  if (!isShowtimeFloorType(floor?.type)) return false;
  const before = showtimeMapKey(floor);
  floor.showtimeCooldown = Math.max(0, (floor.showtimeCooldown || 0) - dt * (1 + clockworkTempoBonus(state) * 0.18));
  if (!isActiveShowtime(floor)) return before !== showtimeMapKey(floor);
  floor.showtime.remaining = Math.max(0, Number(floor.showtime.remaining || 0) - dt);
  const audience = showtimeAudience(floor);
  floor.showtime.participantIds = audience.map((person) => person.id);
  audience.forEach((person) => applyShowtimeMotiveBurst(floor, person, dt * 0.06));
  const cast = (floor.workers || []).map((id) => getResident(id)).filter(Boolean);
  cast.forEach((person) => boostPersonMotive(person, "entertainment", dt * 0.12));
  const beat = showtimeBeatForProgress(showtimeProgress(floor));
  if (floor.showtime.beat !== beat.id) {
    floor.showtime.beat = beat.id;
    floor.showtime.heat = clamp(Number(floor.showtime.heat || 0) + 7 + audience.length, 0, 100);
    applyShowtimeBeatMotion(floor, audience, cast);
    addLog(`${floor.name} 的${floor.showtime.label || "小剧"}进入${beat.label}。`);
  }
  floor.showtime.reactionTimer = Math.max(0, Number(floor.showtime.reactionTimer || 0) - dt);
  if (floor.showtime.reactionTimer <= 0 && audience.length) {
    pulseShowtimeReaction(floor, audience, cast);
    floor.showtime.reactionTimer = randFloat(5.2, 7.6);
  }
  if (floor.showtime.remaining <= 0 || !audience.length) {
    const label = SHOWTIME_LABELS[floor.type] || "小剧";
    const finale = audience.length ? settleShowtimeFinale(floor, audience) : 0;
    const heat = Math.round(floor.showtime.heat || 0);
    floor.showtime = null;
    if (audience.length) addLog(`${floor.name} 的${label}谢幕，现场热度 ${heat}，追加 ${finale} 金币。`);
  }
  return before !== showtimeMapKey(floor);
}

function renderShowtimePanel(floor) {
  if (!isShowtimeFloorType(floor?.type)) return "";
  const active = isActiveShowtime(floor);
  const audience = active ? showtimeAudience(floor) : [];
  const beat = currentShowtimeBeat(floor);
  const heat = active ? Math.round(Number(floor.showtime.heat || 0)) : 0;
  const heatTone = active ? showtimeHeatTone(floor) : "quiet";
  const names = audience.length ? audience.map((person) => person.name).slice(0, 4).join("、") : "等待观众入座";
  const status = active
    ? `${beat.label} ${Math.ceil(floor.showtime.remaining)}s · ${names}`
    : (floor.showtimeCooldown || 0) > 0
      ? `冷却 ${Math.ceil(floor.showtimeCooldown)}s`
      : "就绪";
  const applause = active && floor.showtime?.applause ? ` · 收益 ${floor.showtime.earned || floor.showtime.applause}` : "";
  return `
    <div class="showtime-panel ${active ? "active" : ""}" data-beat="${escapeAttr(beat.id)}" data-heat="${escapeAttr(heatTone)}">
      <div class="showtime-panel-head">
        <strong>${SHOWTIME_LABELS[floor.type] || "小剧"}</strong>
        <em>${active ? showtimeHeatLabel(floor) + " " + heat + "%" : "待演"}</em>
      </div>
      <div class="showtime-meter" aria-hidden="true"><i style="width:${active ? heat : 0}%"></i></div>
      <span>${escapeHtml(status)}${applause}</span>
      <small>现场反应 ${active ? floor.showtime.reactions || 0 : state.stats.showtimeReactionsDone || 0} · 已排演 ${state.stats.entertainmentShowsDone || 0} 场</small>
    </div>`;
}

function showtimeMapKey(floor) {
  if (!isShowtimeFloorType(floor?.type)) return "";
  const participants = floor.showtime?.participantIds || [];
  return `showtime:${Math.ceil(floor.showtimeCooldown || 0)}:${Math.ceil(floor.showtime?.remaining || 0)}:${participants.join("-")}:${floor.showtime?.beat || ""}:${Math.round(floor.showtime?.heat || 0)}:${floor.showtime?.reactions || 0}:${floor.showtime?.earned || floor.showtime?.applause || 0}`;
}

function comfortSessionCooldown(floor) {
  const skill = averageSkill(floor.workers || [], floor.type);
  const roomBonus = floor.type === "garden" ? gardenComfortBonus(state) : bathhouseRestBonus(state);
  return Math.max(22, Math.round(56 - skill * 2.1 - roomBonus * 42 - clockworkTempoBonus(state) * 8));
}

function comfortSessionNeedsForFloor(floor) {
  return floor?.type === "bathhouse" ? ["energy", "social", "entertainment"] : ["social", "entertainment", "food", "energy"];
}

function comfortNeedForPerson(floor, person) {
  const needs = comfortSessionNeedsForFloor(floor);
  ensurePersonLife(person);
  return needs
    .map((need) => ({ need, score: personNeedUrgency(person, need) + (person.need === need ? 0.18 : 0) }))
    .sort((a, b) => b.score - a.score)[0]?.need || needs[0] || "social";
}

function comfortCandidatesForFloor(floor) {
  if (!isComfortFloorType(floor?.type)) return [];
  const needs = comfortSessionNeedsForFloor(floor);
  return allResidents(state)
    .filter((person) => person && !person.expeditionId && !isActiveLifeVisit(person))
    .map((person) => {
      ensurePersonLife(person);
      const currentFloor = currentFloorForPerson(person);
      const needScore = needs.reduce((sum, need, index) => {
        const weight = floor.type === "bathhouse" && need === "energy" ? 1.55 : index === 0 ? 1.25 : 1;
        return sum + personNeedUrgency(person, need) * weight;
      }, 0);
      const favorite = (person.favoriteTypes || []).includes(floor.type) ? 0.48 : 0;
      const dream = person.dreamType === floor.type ? 0.38 : 0;
      const workerFatigue = person.workFloorId ? 0.25 : 0;
      const near = currentFloor ? Math.max(0, 0.38 - Math.abs(Number(currentFloor.id) - Number(floor.id)) * 0.04) : 0;
      const mood = personMotiveMood(person);
      const moodNeed = mood === "strained" ? 0.5 : mood === "seeking" ? 0.28 : 0;
      return { person, score: needScore + favorite + dream + workerFatigue + near + moodNeed + Math.random() * 0.18 };
    })
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.person);
}

function comfortActionBlockReason(floor) {
  if (!isComfortFloorType(floor?.type)) return "这个楼层不能组织休整";
  if (!floor.workers?.length) return `${FLOOR_TYPES[floor.type].label}需要员工照看`;
  if ((floor.stock || 0) <= 0) return `${FLOOR_TYPES[floor.type].label}准备不足，先补货`;
  if (isActiveComfortSession(floor)) return "休整正在进行";
  if ((floor.comfortCooldown || 0) > 0) return `还要 ${Math.ceil(floor.comfortCooldown)}s 才能再次组织`;
  if (!comfortCandidatesForFloor(floor).length) return "暂时没有可参加的居民";
  return "";
}

function applyComfortMotiveBurst(floor, person, scale = 1) {
  if (floor.type === "bathhouse") {
    boostPersonMotive(person, "energy", 15 * scale);
    boostPersonMotive(person, "social", 6 * scale);
    boostPersonMotive(person, "entertainment", 4 * scale);
    return;
  }
  boostPersonMotive(person, "social", 10 * scale);
  boostPersonMotive(person, "entertainment", 9 * scale);
  boostPersonMotive(person, "food", 5 * scale);
  boostPersonMotive(person, "energy", 4 * scale);
}

function pairComfortParticipants(floor, participants, duration = 14) {
  const available = participants.filter((person) => person && !person.socialPartnerId);
  for (let index = 0; index + 1 < available.length; index += 2) {
    const left = available[index];
    const right = available[index + 1];
    const scene = chooseSocialSceneForPair(floor.type, left, right);
    applySocialScene(left, right, scene, `comfort-${floor.id}-${left.id}-${right.id}-${Date.now()}`, Math.min(duration, randFloat(11, 18)), floor.type, floorSocialScope(floor));
  }
}

function comfortParticipants(floor) {
  if (!isActiveComfortSession(floor)) return [];
  const sessionId = floor.comfortSession.id;
  return allResidents(state).filter((person) => {
    return person?.lifeVisit?.reason === "comfort" && person.lifeVisit.sessionId === sessionId && Number(person.lifeVisit.floorId) === Number(floor.id);
  });
}

function grantComfortMemory(person, floor, glow) {
  if (!person || !glow) return;
  ensurePersonLife(person);
  const remaining = Math.max(48, Math.round((glow.total || 90) * 0.78));
  person.comfortMemory = {
    id: `${glow.id}-${person.id}`,
    type: glow.type,
    label: glow.label,
    sourceFloorId: floor.id,
    remaining,
    total: remaining,
    power: glow.motiveEase,
    expeditionBonus: glow.expeditionBonus,
  };
  person.lifeWish = personLifeWish(person, floor.type);
}

function finishComfortSession(floor, participants = []) {
  if (!isComfortFloorType(floor?.type) || !floor.comfortSession) return null;
  const session = floor.comfortSession;
  const participantIds = Array.from(
    new Set([...(session.participantIds || []), ...participants.map((person) => person.id)].map(Number).filter(Boolean))
  );
  const resolvedParticipants = participantIds.map((id) => getResident(id)).filter(Boolean);
  if (!resolvedParticipants.length) return null;
  const count = resolvedParticipants.length;
  const type = floor.type;
  const label = COMFORT_AFTERGLOW_LABELS[type] || "舒缓余韵";
  const total = Math.round((COMFORT_AFTERGLOW_TOTALS[type] || 100) + count * (type === "bathhouse" ? 7 : 6) + (floor.level || 1) * 3);
  const rentBonus = Math.round((type === "bathhouse" ? 9 : 6) + count * (type === "bathhouse" ? 4 : 3) + (floor.level || 1) * 2);
  const expeditionBonus = clamp(0.045 + count * 0.012 + (type === "bathhouse" ? 0.026 : 0.012) + (floor.level || 1) * 0.004, 0.05, 0.18);
  const motiveEase = clamp(0.07 + count * 0.012 + (type === "bathhouse" ? 0.02 : 0.012), 0.07, 0.19);
  const glow = normalizeComfortAfterglow(
    {
      id: `comfort-echo-${floor.id}-${Date.now()}-${randInt(10, 99)}`,
      type,
      label,
      remaining: total,
      total,
      participantIds,
      rentBonus,
      expeditionBonus,
      motiveEase,
    },
    floor
  );
  floor.comfortAfterglow = glow;
  state.stats.comfortEchoesDone = (state.stats.comfortEchoesDone || 0) + 1;
  resolvedParticipants.forEach((person) => {
    grantComfortMemory(person, floor, glow);
    applyComfortMotiveBurst(floor, person, 0.5);
    const home = findFloor(person.homeFloorId);
    if (home?.type === "dwelling") {
      home.rentReady = Math.min(420, (home.rentReady || 0) + Math.round(rentBonus * 0.55));
    }
  });
  state.happiness = clamp(state.happiness + Math.min(5, 1 + Math.ceil(count / 2)), 0, 100);
  return glow;
}

function startComfortSession(floorId) {
  const floor = findFloor(floorId);
  if (!isBusiness(floor) || !isComfortFloorType(floor.type)) return;
  const reason = comfortActionBlockReason(floor);
  if (reason) {
    showToast(reason);
    return;
  }
  const capacity = clamp(2 + (floor.level || 1) + Math.floor(averageSkill(floor.workers || [], floor.type) / 5), 2, floor.type === "garden" ? 5 : 4);
  const participants = comfortCandidatesForFloor(floor).slice(0, Math.min(capacity, Math.max(1, (floor.stock || 0) * 3)));
  if (!participants.length) {
    showToast("暂时没有可参加的居民");
    return;
  }
  const stockCost = Math.min(floor.stock || 0, Math.max(1, Math.ceil(participants.length / 3)));
  const label = COMFORT_SESSION_LABELS[floor.type] || "结伴休整";
  const sessionId = `comfort-${floor.id}-${Date.now()}-${randInt(10, 99)}`;
  const duration = floor.type === "bathhouse" ? randFloat(34, 46) : randFloat(30, 42);
  floor.stock = Math.max(0, (floor.stock || 0) - stockCost);
  floor.comfortCooldown = comfortSessionCooldown(floor);
  floor.comfortSession = {
    id: sessionId,
    label,
    remaining: duration,
    total: duration,
    participantIds: participants.map((person) => person.id),
  };
  participants.forEach((person) => {
    const need = comfortNeedForPerson(floor, person);
    startLifeVisit(person, floor, need, {
      allowCompanion: false,
      label: `参加${label}`,
      reason: "comfort",
      duration: duration + randFloat(-4, 5),
      minStay: 12,
      targetGoal: 90,
      sessionId,
    });
    applyComfortMotiveBurst(floor, person, 1);
    const home = findFloor(person.homeFloorId);
    if (home?.type === "dwelling") home.rentReady = Math.min(360, (home.rentReady || 0) + (floor.type === "bathhouse" ? 8 : 5));
  });
  pairComfortParticipants(floor, participants, duration);
  state.stats.comfortSessionsDone = (state.stats.comfortSessionsDone || 0) + 1;
  state.happiness = clamp(state.happiness + Math.min(7, 2 + participants.length + (floor.type === "bathhouse" ? 1 : 0)), 0, 100);
  const names = participants.map((person) => person.name).slice(0, 3).join("、");
  const extra = participants.length > 3 ? `等 ${participants.length} 人` : "";
  showToast(`${label}开始了：${participants.length} 位居民`);
  addLog(`${floor.name} 组织${label}，${names}${extra}结伴休整，消耗 ${stockCost} 份准备。`);
  lastKingdomKey = "";
  render(true);
}

function comfortFocusActionBlockReason(floor, focus) {
  if (!isBusiness(floor) || !isComfortFloorType(floor.type)) return "这个楼层不能调息余韵";
  if (!isActiveComfortAfterglow(floor)) return "先完成一次花园茶会或温泉休整";
  if (!comfortFocusOption(focus)) return "选择一个余韵方向";
  if (floor.comfortAfterglow.focusApplied) return `余韵已经导向${comfortFocusLabel(floor.comfortAfterglow)}`;
  return "";
}

function focusComfortAfterglow(floorId, focus) {
  const floor = findFloor(floorId);
  const reason = comfortFocusActionBlockReason(floor, focus);
  if (reason) {
    showToast(reason);
    return;
  }
  const glow = floor.comfortAfterglow;
  const option = comfortFocusOption(focus);
  const participantCount = Math.max(1, (glow.participantIds || []).length);
  glow.focus = option.id;
  glow.focusLabel = option.label;
  glow.focusApplied = true;
  glow.focusPulse = 5.5;
  glow.remaining = Math.min(Math.max(glow.total || 1, glow.remaining || 1) + 22, (glow.remaining || 0) + 18);
  glow.total = Math.max(glow.total || 1, glow.remaining || 1);
  state.stats.comfortFocusesDone = (state.stats.comfortFocusesDone || 0) + 1;
  const statKey = comfortFocusStatKey(option.id);
  if (statKey) state.stats[statKey] = (state.stats[statKey] || 0) + 1;

  let resultText = "";
  if (option.id === "rent") {
    const dwellings = dwellingFloors(state);
    const rentGain = Math.round((glow.rentBonus || 8) * (1.18 + participantCount * 0.14 + (floor.level || 1) * 0.08));
    dwellings.forEach((home) => {
      home.rentReady = Math.min(520, (home.rentReady || 0) + rentGain);
    });
    state.happiness = clamp(state.happiness + Math.min(3, 1 + dwellings.length * 0.4), 0, 100);
    resultText = `${dwellings.length} 间住处租金准备 +${rentGain}`;
  } else if (option.id === "expedition") {
    const active = state.expeditions || [];
    const prep = clamp((glow.expeditionBonus || 0.06) * 0.42 + participantCount * 0.006, 0.02, 0.08);
    const timePush = Math.round(6 + participantCount * 2 + (floor.level || 1) * 1.5);
    active.forEach((expedition) => {
      expedition.remaining = Math.max(1, Number(expedition.remaining || 0) - timePush);
      expedition.comfortPrepBonus = Math.min(0.28, Number(expedition.comfortPrepBonus || 0) + prep);
      expedition.comfortPrepLabel = option.label;
      updateExpeditionWaymarks(expedition, state, true);
    });
    resultText = active.length ? `${active.length} 支探险队准备 +${Math.round(prep * 100)}%，剩余 -${timePush}s` : "下一次探险准备提高";
  } else {
    const targets = allResidents(state)
      .filter((person) => person && !person.expeditionId)
      .map((person) => {
        ensurePersonLife(person);
        const pressure = PERSON_MOTIVE_KEYS.reduce((sum, key) => sum + (100 - Number(person.motives[key] || 0)), 0);
        return { person, pressure };
      })
      .sort((a, b) => b.pressure - a.pressure)
      .slice(0, Math.max(3, Math.min(6, participantCount + 2)))
      .map((entry) => entry.person);
    targets.forEach((person) => {
      applyComfortMotiveBurst(floor, person, 0.82);
      ensurePersonLife(person);
      const memory = person.comfortMemory;
      if (memory) {
        memory.remaining = Math.min(180, Number(memory.remaining || 0) + 28);
        memory.total = Math.max(Number(memory.total || 1), memory.remaining);
        memory.power = Math.min(0.26, Number(memory.power || glow.motiveEase || 0.08) + 0.025);
      } else {
        grantComfortMemory(person, floor, glow);
      }
    });
    state.happiness = clamp(state.happiness + Math.min(4, 1.2 + targets.length * 0.35), 0, 100);
    resultText = `${targets.length} 位居民恢复并延长舒缓记忆`;
  }

  showToast(`${option.label}：${resultText}`);
  addLog(`${floor.name} 将${glow.label || "余韵"}导向${option.label}，${resultText}。`);
  lastKingdomKey = "";
  render(true);
}

function updateComfortFloor(floor, dt) {
  if (!isComfortFloorType(floor?.type)) return false;
  const before = comfortSessionMapKey(floor);
  floor.comfortCooldown = Math.max(0, (floor.comfortCooldown || 0) - dt * (1 + clockworkTempoBonus(state) * 0.18));
  if (isActiveComfortAfterglow(floor)) {
    floor.comfortAfterglow.remaining = Math.max(0, Number(floor.comfortAfterglow.remaining || 0) - dt);
    floor.comfortAfterglow.focusPulse = Math.max(0, Number(floor.comfortAfterglow.focusPulse || 0) - dt);
    if (floor.comfortAfterglow.remaining <= 0) floor.comfortAfterglow = null;
  }
  if (!isActiveComfortSession(floor)) return before !== comfortSessionMapKey(floor);
  const participants = comfortParticipants(floor);
  floor.comfortSession.remaining = Math.max(0, Number(floor.comfortSession.remaining || 0) - dt);
  floor.comfortSession.participantIds = Array.from(
    new Set([...(floor.comfortSession.participantIds || []), ...participants.map((person) => person.id)].map(Number).filter(Boolean))
  );
  participants.forEach((person) => applyComfortMotiveBurst(floor, person, dt * 0.055));
  if (floor.comfortSession.remaining <= 0 || !participants.length) {
    const label = COMFORT_SESSION_LABELS[floor.type] || "休整";
    const glow = finishComfortSession(floor, participants);
    delete floor.comfortSession;
    if (glow) {
      addLog(`${floor.name} 的${label}结束，留下${glow.label}：租金 +${glow.rentBonus}，探险准备 +${Math.round(glow.expeditionBonus * 100)}%。`);
    } else if (participants.length) {
      addLog(`${floor.name} 的${label}结束，居民们精神好了许多。`);
    }
  }
  return before !== comfortSessionMapKey(floor);
}

function renderComfortSessionPanel(floor) {
  if (!isComfortFloorType(floor?.type)) return "";
  const active = isActiveComfortSession(floor);
  const afterglow = isActiveComfortAfterglow(floor) ? floor.comfortAfterglow : null;
  const participants = active ? comfortParticipants(floor) : [];
  const participantNames = participants.length ? participants.map((person) => person.name).slice(0, 4).join("、") : "等待居民参加";
  const status = active
    ? `${Math.ceil(floor.comfortSession.remaining)}s · ${participantNames}`
    : afterglow
      ? `${afterglow.label} ${Math.ceil(afterglow.remaining)}s`
      : (floor.comfortCooldown || 0) > 0
        ? `冷却 ${Math.ceil(floor.comfortCooldown)}s`
        : "就绪";
  const needs = floor.type === "bathhouse" ? "优先恢复休息与社交" : "优先恢复社交、娱乐与餐饮";
  const echoText = afterglow
    ? `<small class="comfort-afterglow-readout">回租 +${afterglow.rentBonus} · 探险准备 +${Math.round(afterglow.expeditionBonus * 100)}% · 余韵 ${state.stats.comfortEchoesDone || 0} 次</small>`
    : `<small>${needs} · 已组织 ${state.stats.comfortSessionsDone || 0} 次</small>`;
  return `
    <div class="comfort-session-panel ${active ? "active" : ""} ${afterglow ? "afterglow" : ""}">
      <strong>${COMFORT_SESSION_LABELS[floor.type] || "结伴休整"}</strong>
      <span>${escapeHtml(status)}</span>
      ${echoText}
      ${renderComfortFocusControls(floor, afterglow)}
    </div>`;
}

function renderComfortFocusControls(floor, afterglow) {
  if (!afterglow) return "";
  const focusText = afterglow.focus
    ? `<small class="comfort-focus-readout" data-focus="${escapeAttr(afterglow.focus)}">已导向 ${escapeHtml(comfortFocusLabel(afterglow))} · 调息 ${state.stats.comfortFocusesDone || 0} 次</small>`
    : `<small class="comfort-focus-readout">选择余韵用途：租金、探险或居民恢复</small>`;
  const actions = !afterglow.focusApplied
    ? `<div class="comfort-focus-actions">${COMFORT_FOCUS_ORDER.map((focus) => {
        const option = comfortFocusOption(focus);
        return `<button class="comfort-focus-btn" data-action="comfort-focus" data-floor-id="${floor.id}" data-focus="${escapeAttr(option.id)}" title="${escapeAttr(option.desc)}"><b>${escapeHtml(option.short)}</b><span>${escapeHtml(option.action)}</span></button>`;
      }).join("")}</div>`
    : "";
  return `${focusText}${actions}`;
}

function comfortSessionMapKey(floor) {
  if (!isComfortFloorType(floor?.type)) return "";
  const participants = floor.comfortSession?.participantIds || [];
  const glow = floor.comfortAfterglow;
  return `comfort:${Math.ceil(floor.comfortCooldown || 0)}:${Math.ceil(floor.comfortSession?.remaining || 0)}:${participants.join("-")}:echo:${Math.ceil(glow?.remaining || 0)}:${glow?.participantIds?.join("-") || ""}:${glow?.rentBonus || 0}:${Math.round((glow?.expeditionBonus || 0) * 100)}:${glow?.focus || ""}:${Math.round((glow?.focusPulse || 0) * 10)}`;
}

function collectionOrderBonus(game) {
  const map = game.collection || {};
  const total = COLLECTION_DEFS.reduce((sum, item) => sum + (map[item.id] || 0), 0);
  return 1 + Math.min(0.58, total * 0.03 + libraryResearchBonus(game) * 0.36 + libraryStudyBonus(game) * 0.72 + treasureVaultBonus(game) * 0.34 + alchemyPotionBonus(game) * 0.16);
}

function collectionMapBonus() {
  return Math.min(0.28, ((state.collection.map || 0) + (state.collection.key || 0) + (state.collection.compass || 0)) * 0.02 + libraryResearchBonus(state) * 0.5 + libraryStudyBonus(state) * 0.45 + observatoryStarBonus(state) * 0.45);
}

function floorTypeInfluence(game, type) {
  return businessFloors(game)
    .filter((floor) => floor.type === type)
    .reduce((sum, floor) => sum + 1 + Math.max(0, (floor.level || 1) - 1) * 0.22, 0) + adjacencyBonus(game, type);
}

function neighboringFloors(game, floor) {
  const ordered = getOrderedFloors(game);
  const index = ordered.findIndex((entry) => entry.id === floor.id);
  return [ordered[index - 1], ordered[index + 1]].filter(Boolean);
}

function adjacencyBonus(game, type) {
  const affinity = FLOOR_AFFINITIES[type] || [];
  if (!affinity.length) return 0;
  return businessFloors(game)
    .filter((floor) => floor.type === type)
    .reduce((sum, floor) => {
      const neighbors = neighboringFloors(game, floor);
      const linked = neighbors.filter((neighbor) => affinity.includes(neighbor.type)).length;
      if (!linked) return sum;
      const sameTypeNeighbor = neighbors.some((neighbor) => neighbor.type === type) ? 0.03 : 0;
      return sum + linked * 0.07 + sameTypeNeighbor + Math.max(0, (floor.level || 1) - 1) * 0.015;
    }, 0);
}

function marketTradeBonus(game = state) {
  return Math.min(0.28, floorTypeInfluence(game, "market") * 0.055);
}

function lobbyDispatchBonus(game = state) {
  const floorSupport = Math.max(0, businessFloors(game).length - 2) * 0.006;
  const routePractice = Math.min(0.05, (game.stats?.lobbyRoutesDone || 0) * 0.002);
  return Math.min(0.24, (game.elevator?.upgrades || 0) * 0.026 + floorSupport + routePractice);
}

function dwellingJourneyBonus(game = state) {
  return Math.min(
    0.22,
    lifeStoryReviewBonus(game) +
      dwellingFloors(game).reduce((sum, floor) => {
        const residents = floor.residents?.length || 0;
        const away = (floor.residents || []).filter((resident) => resident.expeditionId).length;
        return sum + residents * 0.012 + away * 0.018 + Math.max(0, (floor.level || 1) - 1) * 0.018;
      }, 0)
  );
}

function foodWarmthBonus(game = state) {
  return Math.min(0.24, floorTypeInfluence(game, "food") * 0.038 + foodRushPracticeBonus(game) * 0.85 + activeFoodRushBonus(game));
}

function craftToolBonus(game = state) {
  return Math.min(0.3, floorTypeInfluence(game, "craft") * 0.05 + toolTunePracticeBonus(game) * 0.72 + activeToolTuneBonus(game));
}

function libraryResearchBonus(game = state) {
  return Math.min(0.28, floorTypeInfluence(game, "library") * 0.05 + libraryStudyBonus(game) * 0.65);
}

function kingdomMandateBonus(game = state) {
  return Math.min(0.22, floorTypeInfluence(game, "kingdom") * 0.046);
}

function gardenComfortBonus(game = state) {
  return Math.min(0.27, floorTypeInfluence(game, "garden") * 0.045 + comfortSessionBonus(game) * 0.34 + comfortEchoPracticeBonus(game) * 0.3 + activeComfortAfterglowBonus(game) * 0.28);
}

function serviceCareBonus(game = state) {
  return Math.min(0.26, floorTypeInfluence(game, "service") * 0.046 + serviceCarePracticeBonus(game) * 0.72 + activeServiceCareBonus(game));
}

function observatoryStarBonus(game = state) {
  return Math.min(0.3, floorTypeInfluence(game, "observatory") * 0.052 + starChartPracticeBonus(game) * 0.74 + activeStarChartBonus(game));
}

function bathhouseRestBonus(game = state) {
  return Math.min(0.29, floorTypeInfluence(game, "bathhouse") * 0.05 + comfortSessionBonus(game) * 0.42 + comfortEchoPracticeBonus(game) * 0.36 + activeComfortAfterglowBonus(game) * 0.34);
}

function clinicCareBonus(game = state) {
  return Math.min(0.24, floorTypeInfluence(game, "clinic") * 0.05);
}

function clockworkTempoBonus(game = state) {
  return Math.min(0.28, floorTypeInfluence(game, "clockwork") * 0.052);
}

function alchemyPotionBonus(game = state) {
  return Math.min(0.23, floorTypeInfluence(game, "alchemy") * 0.05);
}

function trainingDrillBonus(game = state) {
  return Math.min(0.24, floorTypeInfluence(game, "training") * 0.052);
}

function treasureVaultBonus(game = state) {
  return Math.min(0.25, floorTypeInfluence(game, "treasure") * 0.052);
}

function aquariumWonderBonus(game = state) {
  return Math.min(0.25, floorTypeInfluence(game, "aquarium") * 0.052);
}

function skyportFlowBonus(game = state) {
  return Math.min(0.26, floorTypeInfluence(game, "skyport") * 0.054);
}

function festivalBuzzBonus(game = state) {
  const programSupport = Math.min(0.05, ((game.collection || {}).program || 0) * 0.016);
  return Math.min(0.25, floorTypeInfluence(game, "festival") * 0.05 + programSupport);
}

function entertainmentJoyBonus(game = state) {
  return Math.min(0.29, floorTypeInfluence(game, "entertainment") * 0.048 + showtimePracticeBonus(game) + activeShowtimeBonus(game));
}

function orderNetworkBonus(game = state) {
  const compassSupport = Math.min(0.05, ((game.collection || {}).compass || 0) * 0.016);
  return 1 + Math.min(0.62, marketTradeBonus(game) + kingdomMandateBonus(game) * 0.55 + compassSupport + foodWarmthBonus(game) * 0.18 + craftToolBonus(game) * 0.28 + alchemyPotionBonus(game) * 0.14 + treasureVaultBonus(game) * 0.2 + observatoryStarBonus(game) * 0.45 + clockworkTempoBonus(game) * 0.34 + skyportFlowBonus(game) * 0.36 + festivalBuzzBonus(game) * 0.24);
}

function businessIncomeMultiplier(floor, game = state) {
  let bonus = marketTradeBonus(game);
  bonus += Math.min(0.06, foodWarmthBonus(game) * Math.min(1.1, (game.happiness || 0) / 90));
  bonus += Math.min(0.07, craftToolBonus(game) * Math.min(1.1, (floor?.stock || 0) / Math.max(1, floor?.stockMax || 1) + 0.35));
  bonus += Math.min(0.08, entertainmentJoyBonus(game) * Math.min(1, (game.happiness || 0) / 100));
  bonus += Math.min(0.12, festivalBuzzBonus(game) * Math.min(1.2, (game.streak || 0) / 10));
  bonus += Math.min(0.07, serviceCareBonus(game) * Math.min(1, ((game.queue || []).length + 1) / 4));
  bonus += Math.min(0.06, kingdomMandateBonus(game));
  if (floor?.type === "food") bonus += 0.05 + foodWarmthBonus(game) * 0.28;
  if (floor?.type === "craft") bonus += 0.07 + craftToolBonus(game) * 0.34;
  if (floor?.type === "market") bonus += 0.08;
  if (floor?.type === "service") bonus += 0.06 + serviceCareBonus(game) * 0.32;
  if (floor?.type === "kingdom") bonus += 0.06 + kingdomMandateBonus(game) * 0.34;
  if (floor?.type === "alchemy") bonus += 0.07 + alchemyPotionBonus(game) * 0.34;
  if (floor?.type === "training") bonus += 0.05 + trainingDrillBonus(game) * 0.3;
  if (floor?.type === "treasure") bonus += 0.08 + treasureVaultBonus(game) * 0.36;
  if (floor?.type === "garden" && (game.happiness || 0) >= 82) bonus += 0.05;
  if (floor?.type === "entertainment") bonus += 0.06 + entertainmentJoyBonus(game) * 0.32;
  if (floor?.type === "bathhouse") bonus += 0.06 + bathhouseRestBonus(game) * 0.35;
  if (floor?.type === "observatory") bonus += observatoryStarBonus(game) * 0.34;
  if (floor?.type === "skyport") bonus += 0.08 + skyportFlowBonus(game) * 0.34;
  if (floor?.type === "festival") bonus += 0.07 + festivalBuzzBonus(game) * 0.38;
  if (floor?.type === "clinic") bonus += 0.06 + clinicCareBonus(game) * 0.28;
  if (floor?.type === "clockwork") bonus += 0.07 + clockworkTempoBonus(game) * 0.32;
  if (floor?.type === "aquarium") bonus += 0.07 + aquariumWonderBonus(game) * 0.36;
  return 1 + Math.min(0.5, bonus);
}

function updateOrders(dt) {
  if (Math.random() < dt * 0.04) ensureOrders(state);
}

function expeditionProgress(expedition) {
  if (!expedition) return 0;
  const total = Math.max(1, Number(expedition.total) || 1);
  return clamp(1 - Number(expedition.remaining || 0) / total, 0, 1);
}

function expeditionCurrentWaymark(expedition) {
  const progress = expeditionProgress(expedition);
  return EXPEDITION_WAYMARKS.reduce((current, mark) => (progress >= mark.at ? mark : current), EXPEDITION_WAYMARKS[0]);
}

function expeditionNextWaymark(expedition) {
  const progress = expeditionProgress(expedition);
  return EXPEDITION_WAYMARKS.find((mark) => progress < mark.at) || null;
}

function updateExpeditionWaymarks(expedition, game = state, noisy = game === state) {
  if (!expedition || !game?.stats) return 0;
  expedition.waymarkIds = Array.isArray(expedition.waymarkIds) ? expedition.waymarkIds : [];
  const progress = expeditionProgress(expedition);
  let added = 0;
  EXPEDITION_WAYMARKS.forEach((mark) => {
    if (progress < mark.at || expedition.waymarkIds.includes(mark.id)) return;
    expedition.waymarkIds.push(mark.id);
    game.stats.expeditionWaymarksDone = (game.stats.expeditionWaymarksDone || 0) + 1;
    added += 1;
    if (noisy) {
      addLogToGame(game, `${expedition.residentName || "斥候"} 抵达「${expedition.title}」${mark.label}路标：${mark.text}。`);
    }
  });
  if (added && game === state) lastKingdomKey = "";
  return added;
}

function expeditionReportBonus(game = state) {
  const reportsDone = Number(game?.stats?.expeditionReportsDone) || 0;
  const visibleReports = Array.isArray(game?.expeditionReports) ? game.expeditionReports.length : 0;
  return clamp(reportsDone * 0.006 + visibleReports * 0.01, 0, 0.22);
}

function normalizeExpeditionReport(report) {
  if (!report || typeof report !== "object") return null;
  const def = EXPEDITION_DEFS.find((entry) => entry.id === report.type) || EXPEDITION_DEFS[0];
  const waymarks = Array.isArray(report.waymarks)
    ? report.waymarks.filter((id) => EXPEDITION_WAYMARKS.some((mark) => mark.id === id)).slice(0, 4)
    : [];
  return {
    id: Number(report.id) || 0,
    expeditionId: typeof report.expeditionId === "string" ? report.expeditionId.slice(0, 32) : "",
    personId: Number(report.personId) || 0,
    personName: typeof report.personName === "string" ? report.personName.slice(0, 28) : "斥候",
    type: def.id,
    title: typeof report.title === "string" ? report.title.slice(0, 72) : def.title,
    routeLabel: typeof report.routeLabel === "string" ? report.routeLabel.slice(0, 34) : def.tag,
    originFloorId: Number.isFinite(Number(report.originFloorId)) ? Number(report.originFloorId) : null,
    originFloorName: typeof report.originFloorName === "string" ? report.originFloorName.slice(0, 48) : "",
    detail: typeof report.detail === "string" ? report.detail.slice(0, 150) : "",
    coins: Math.max(0, Math.round(Number(report.coins) || 0)),
    gems: Math.max(0, Math.round(Number(report.gems) || 0)),
    relicFound: Boolean(report.relicFound),
    comfortPrepLabel: typeof report.comfortPrepLabel === "string" ? report.comfortPrepLabel.slice(0, 34) : "",
    reportBonus: clamp(Number(report.reportBonus) || 0, 0, 0.24),
    waymarks,
    tone: ["depart", "camp", "return", "rare", "bright", "steady"].includes(report.tone) ? report.tone : "steady",
    remaining: Number.isFinite(Number(report.remaining)) ? clamp(Number(report.remaining), 0, 240) : 150,
    createdAt: Number(report.createdAt) || Date.now(),
  };
}

function updateExpeditionReports(dt) {
  if (!Array.isArray(state.expeditionReports) || !state.expeditionReports.length) return;
  const before = state.expeditionReports.length;
  state.expeditionReports = state.expeditionReports
    .map((report) => normalizeExpeditionReport({ ...report, remaining: Math.max(0, Number(report.remaining || 0) - dt) }))
    .filter((report) => report && report.remaining > 0)
    .slice(0, 8);
  if (state.expeditionReports.length !== before) lastKingdomKey = "";
}

function recordExpeditionReport(game, expedition, resident, options = {}) {
  if (!game || !expedition || !game.stats) return null;
  game.expeditionReports = Array.isArray(game.expeditionReports) ? game.expeditionReports : [];
  game.nextExpeditionReportId ||= 1;
  const def = EXPEDITION_DEFS.find((entry) => entry.id === expedition.type) || EXPEDITION_DEFS[0];
  const origin = Number.isFinite(Number(expedition.originFloorId))
    ? game.floors.find((floor) => Number(floor.id) === Number(expedition.originFloorId))
    : null;
  const waymarks = Array.isArray(expedition.waymarkIds) && expedition.waymarkIds.length
    ? expedition.waymarkIds
    : EXPEDITION_WAYMARKS.map((mark) => mark.id);
  const waymarkText = waymarks
    .map((id) => EXPEDITION_WAYMARKS.find((mark) => mark.id === id)?.label)
    .filter(Boolean)
    .join(" / ");
  const comfortText = expedition.comfortPrepBonus > 0 ? `，${expedition.comfortPrepLabel || "舒缓余韵"}稳定了队伍` : "";
  const starText = expedition.starChartPrep > 0 ? `，星图预报 +${Math.round(Number(expedition.starChartPrep || 0) * 100)}%` : "";
  const toolText = expedition.toolTunePrep > 0 ? `，工具校准 +${Math.round(Number(expedition.toolTunePrep || 0) * 100)}%` : "";
  const relicText = options.relicFound ? "，发现珍藏碎片" : "";
  const gemText = options.gems ? `，带回 ${options.gems} 宝石` : "";
  const report = normalizeExpeditionReport({
    id: game.nextExpeditionReportId++,
    expeditionId: expedition.id,
    personId: resident?.id || expedition.residentId,
    personName: resident?.name || expedition.residentName || "斥候",
    type: expedition.type,
    title: `${def.title}回城报告`,
    routeLabel: def.tag || def.title,
    originFloorId: origin?.id ?? expedition.originFloorId ?? null,
    originFloorName: origin?.name || "",
    detail: `${origin ? `${formatFloorLabel(origin.id)} ${origin.name}` : "公共探险队"} → ${def.title}，路标 ${waymarkText || "完整"}${gemText}${relicText}${comfortText}${starText}${toolText}`,
    coins: options.coins || expedition.rewardCoins || 0,
    gems: options.gems || 0,
    relicFound: Boolean(options.relicFound),
    comfortPrepLabel: expedition.comfortPrepLabel || "",
    reportBonus: expedition.reportBonus || 0,
    waymarks,
    tone: options.relicFound ? "rare" : options.gems ? "bright" : "return",
    remaining: 170,
    createdAt: Date.now(),
  });
  game.expeditionReports.unshift(report);
  game.expeditionReports = game.expeditionReports.slice(0, 8);
  game.stats.expeditionReportsDone = (game.stats.expeditionReportsDone || 0) + 1;
  return report;
}

function activeExpeditionForPerson(person) {
  if (!person?.expeditionId || !Array.isArray(state.expeditions)) return null;
  return state.expeditions.find((expedition) => expedition.id === person.expeditionId) || null;
}

function latestExpeditionReportForPerson(person) {
  if (!person || !Array.isArray(state.expeditionReports)) return null;
  return state.expeditionReports.find((report) => Number(report.personId) === Number(person.id)) || null;
}

function renderExpeditionBadge(person) {
  if (!person) return "";
  const active = activeExpeditionForPerson(person);
  if (active) {
    const mark = expeditionCurrentWaymark(active);
    const pct = Math.round(expeditionProgress(active) * 100);
    return `<span class="expedition-report-chip active" data-tone="${escapeAttr(mark.tone)}">${escapeHtml(mark.label)} · ${escapeHtml(active.title)} · ${pct}%</span>`;
  }
  const report = latestExpeditionReportForPerson(person);
  if (!report) return "";
  return `<span class="expedition-report-chip" data-tone="${escapeAttr(report.tone)}">上次探险 · ${escapeHtml(report.routeLabel)} · ${escapeHtml(report.detail)}</span>`;
}

function expeditionWaymarksForFloor(floor) {
  if (!floor || floor.type !== "dwelling" || floor.status !== "open") return [];
  return (state.expeditions || [])
    .filter((expedition) => Number(expedition.originFloorId) === Number(floor.id))
    .map((expedition) => {
      const resident = getResident(expedition.residentId);
      const mark = expeditionCurrentWaymark(expedition);
      return {
        expedition,
        resident,
        mark,
        progress: expeditionProgress(expedition),
      };
    })
    .sort((a, b) => b.progress - a.progress);
}

function expeditionWaymarkMapKey(floor) {
  return expeditionWaymarksForFloor(floor)
    .map((entry) => `${entry.expedition.id}:${entry.mark.id}:${Math.round(entry.progress * 12)}`)
    .join(",");
}

function renderExpeditionWaymarkLayer(floor) {
  const waymarks = expeditionWaymarksForFloor(floor).slice(0, 3);
  if (!waymarks.length) return "";
  return `
    <div class="expedition-waymark-layer" data-count="${waymarks.length}" aria-hidden="true">
      ${waymarks
        .map((entry, index) => {
          const progress = Math.round(entry.progress * 100);
          const title = `${entry.resident?.name || entry.expedition.residentName || "斥候"} / ${entry.expedition.title} / ${entry.mark.label} ${progress}%`;
          return `
            <span class="expedition-waymark expedition-waymark--${escapeAttr(entry.mark.tone)}" data-stage="${escapeAttr(entry.mark.id)}" style="--expedition-progress:${progress}%; --expedition-lane:${index}" title="${escapeAttr(title)}">
              <i></i><b></b><em>${escapeHtml(entry.mark.label)}</em>
            </span>`;
        })
        .join("")}
    </div>`;
}

function renderExpeditionReportPanel(floor) {
  if (!floor || floor.type !== "dwelling" || floor.status !== "open") return "";
  const active = expeditionWaymarksForFloor(floor).slice(0, 3);
  const reports = (state.expeditionReports || [])
    .filter((report) => Number(report.originFloorId) === Number(floor.id))
    .slice(0, 3);
  if (!active.length && !reports.length) return "";
  return `
    <div class="expedition-report-panel">
      <div class="expedition-report-head">
        <strong>探险回执</strong>
        <em>${state.stats.expeditionReportsDone || 0} 份 · 路线档案 +${Math.round(expeditionReportBonus(state) * 100)}%</em>
      </div>
      ${active.length ? `<div class="expedition-report-list">${active
        .map((entry) => {
          const pct = Math.round(entry.progress * 100);
          return `
            <div class="expedition-report-card active" data-tone="${escapeAttr(entry.mark.tone)}">
              <strong>${escapeHtml(entry.resident?.name || entry.expedition.residentName || "斥候")} · ${escapeHtml(entry.expedition.title)}</strong>
              <span>${escapeHtml(entry.mark.label)} · ${pct}% · ${escapeHtml(entry.mark.text)}</span>
              <div class="expedition-report-meter"><i style="width:${clamp(pct, 0, 100)}%"></i></div>
            </div>`;
        })
        .join("")}</div>` : ""}
      ${reports.length ? `<div class="expedition-report-list">${reports
        .map((report) => `
          <div class="expedition-report-card" data-tone="${escapeAttr(report.tone)}">
            <strong>${escapeHtml(report.personName)} · ${escapeHtml(report.routeLabel)}</strong>
            <span>${escapeHtml(report.detail)}</span>
            <small>${report.coins} 金币${report.gems ? ` · ${report.gems} 宝石` : ""}${report.relicFound ? " · 珍藏碎片" : ""}</small>
          </div>`)
        .join("")}</div>` : ""}
    </div>`;
}

function reconcileExpeditions(game) {
  const residents = allResidents(game);
  residents.forEach((resident) => {
    if (!("expeditionId" in resident)) resident.expeditionId = null;
  });
  const residentIds = new Set(residents.map((resident) => resident.id));
  const activeIds = new Set();
  game.expeditions = game.expeditions
    .filter((expedition) => {
      const def = EXPEDITION_DEFS.find((entry) => entry.id === expedition.type);
      return def && residentIds.has(expedition.residentId);
    })
    .map((expedition) => {
      const def = EXPEDITION_DEFS.find((entry) => entry.id === expedition.type);
      const total = expedition.total || def.duration;
      const id = expedition.id || `exp-${game.nextExpeditionId++}`;
      activeIds.add(id);
      return {
        ...expedition,
        id,
        title: expedition.title || def.title,
        total,
        remaining: clamp(expedition.remaining ?? total, 0, total),
        rewardCoins: expedition.rewardCoins || randInt(def.coins[0], def.coins[1]),
        rewardGems: expedition.rewardGems || 0,
        relicChance: expedition.relicChance ?? def.relicChance,
        comfortPrepBonus: clamp(Number(expedition.comfortPrepBonus) || 0, 0, 0.28),
        comfortPrepLabel: expedition.comfortPrepLabel || "",
        starChartPrep: clamp(Number(expedition.starChartPrep) || 0, 0, 0.18),
        toolTunePrep: clamp(Number(expedition.toolTunePrep) || 0, 0, 0.14),
        routeNote: expedition.routeNote || def.text,
        waymarkIds: Array.isArray(expedition.waymarkIds)
          ? expedition.waymarkIds.filter((id) => EXPEDITION_WAYMARKS.some((mark) => mark.id === id))
          : [],
        reportBonus: clamp(Number(expedition.reportBonus) || 0, 0, 0.24),
      };
    });
  residents.forEach((resident) => {
    if (resident.expeditionId && !activeIds.has(resident.expeditionId)) {
      resident.expeditionId = null;
    }
  });
  game.expeditions.forEach((expedition) => {
    const resident = residents.find((entry) => entry.id === expedition.residentId);
    if (resident) resident.expeditionId = expedition.id;
  });
}

function updateExpeditions(dt) {
  if (!state.expeditions.length) return;
  const completed = [];
  state.expeditions.forEach((expedition) => {
    expedition.remaining -= dt;
    updateExpeditionWaymarks(expedition, state, true);
    if (expedition.remaining <= 0) completed.push(expedition.id);
  });
  completed.forEach((id) => completeExpedition(state, id, true));
  if (completed.length) render(true);
}

function advanceOfflineExpeditions(game, elapsed) {
  if (!elapsed || !game.expeditions?.length) return;
  const completed = [];
  game.expeditions.forEach((expedition) => {
    expedition.remaining -= elapsed;
    updateExpeditionWaymarks(expedition, game, false);
    if (expedition.remaining <= 0) completed.push(expedition.id);
  });
  completed.forEach((id) => completeExpedition(game, id, false));
}

function expeditionCapacity(game = state) {
  const supportFloors = businessFloors(game).filter((floor) => ["training", "kingdom", "library", "treasure", "observatory", "skyport", "festival", "craft", "clockwork", "aquarium"].includes(floor.type)).length;
  return Math.min(4, 1 + supportFloors);
}

function availableExplorers(game = state) {
  return allResidents(game)
    .filter((resident) => !resident.workFloorId && !resident.expeditionId)
    .sort((a, b) => explorerPower(b) - explorerPower(a));
}

function explorerPower(resident) {
  if (!resident) return 1;
  const skills = resident.skills || {};
  const focus = Math.max(skills.training || 1, skills.kingdom || 1, skills.library || 1, skills.observatory || 1, skills.skyport || 1, skills.festival || 1, skills.clockwork || 1, skills.aquarium || 1, skills.service || 1, skills.craft || 1);
  const dreamBonus = ["training", "kingdom", "library", "treasure", "observatory", "skyport", "festival", "craft", "clockwork", "aquarium"].includes(resident.dreamType) ? 1.2 : 0;
  return focus + dreamBonus + trainingDrillBonus(state) * 2;
}

function expeditionLockReason(def) {
  if (def.id === "well" && state.floors.length < 5) return "需要 5 层王国";
  if (def.id === "skybridge" && !state.floors.some((floor) => getFloorZone(floor) === "sky" && floor.status === "open")) {
    return "需要 1 层天空楼";
  }
  if (def.id === "meteor" && !businessFloors(state).some((floor) => floor.type === "observatory")) {
    return "需要观星楼层";
  }
  if (def.id === "cloudpost" && !businessFloors(state).some((floor) => floor.type === "skyport")) {
    return "需要星港楼层";
  }
  if (def.id === "parade" && !businessFloors(state).some((floor) => floor.type === "festival")) {
    return "需要庆典楼层";
  }
  if (def.id === "reef" && !businessFloors(state).some((floor) => floor.type === "aquarium")) {
    return "需要水族楼层";
  }
  if (def.id === "maze" && !businessFloors(state).some((floor) => ["training", "treasure"].includes(floor.type))) {
    return "需要勇者或珍宝楼层";
  }
  return "";
}

function startExpedition(type, preferredResident = null, options = {}) {
  const def = EXPEDITION_DEFS.find((entry) => entry.id === type);
  if (!def) return;
  const lock = expeditionLockReason(def);
  if (lock) {
    showToast(lock);
    return;
  }
  if (state.expeditions.length >= expeditionCapacity(state)) {
    showToast("探险队已满，建造勇者/王国/书库/观星/星港/庆典/工坊/珍宝/机巧/水族可扩容");
    return;
  }
  const preferredAvailable = preferredResident && !preferredResident.workFloorId && !preferredResident.expeditionId;
  const resident = preferredAvailable ? preferredResident : availableExplorers(state)[0];
  if (!resident) {
    showToast("没有空闲居民可以出发");
    return;
  }
  const power = explorerPower(resident);
  const researchBonus = libraryResearchBonus(state);
  const starBonus = observatoryStarBonus(state);
  const restBonus = bathhouseRestBonus(state);
  const clockBonus = clockworkTempoBonus(state);
  const wonderBonus = aquariumWonderBonus(state);
  const routeBonus = skyportFlowBonus(state);
  const buzzBonus = festivalBuzzBonus(state);
  const foodBonus = foodWarmthBonus(state);
  const craftBonus = craftToolBonus(state);
  const homeBonus = dwellingJourneyBonus(state);
  const comfortPrep = Math.min(0.24, comfortExpeditionPrepBonus(state) + (resident.comfortMemory?.expeditionBonus || 0) * 0.72);
  const toolPrep = Math.min(0.12, activeToolTuneBonus(state) * 1.45 + toolTunePracticeBonus(state) * 0.22);
  const reportBonus = expeditionReportBonus(state);
  const speedBonus = Math.min(0.58, (power - 3) * 0.025 + state.elevator.upgrades * 0.015 + researchBonus * 0.45 + starBonus * 0.38 + restBonus * 0.18 + homeBonus * 0.24 + foodBonus * 0.22 + craftBonus * 0.24 + clockBonus * 0.28 + routeBonus * 0.32 + buzzBonus * 0.2 + comfortPrep * 0.28 + toolPrep * 0.34 + reportBonus * 0.18);
  const total = Math.max(14, Math.round(def.duration * (1 - speedBonus)));
  const rewardCoins = Math.round((randInt(def.coins[0], def.coins[1]) + power * 8) * (1 + starBonus * 0.55 + wonderBonus * 0.32 + routeBonus * 0.42 + buzzBonus * 0.24 + homeBonus * 0.18 + foodBonus * 0.2 + craftBonus * 0.2 + comfortPrep * 0.26 + toolPrep * 0.22 + reportBonus * 0.24));
  const rewardGems = Math.random() < def.gemChance + power * 0.01 + starBonus * 0.22 + wonderBonus * 0.12 + routeBonus * 0.18 + buzzBonus * 0.1 + craftBonus * 0.08 + comfortPrep * 0.08 + toolPrep * 0.08 ? 1 : 0;
  const relicChance = clamp(def.relicChance + power * 0.012 + collectionMapBonus() + researchBonus + starBonus + wonderBonus * 0.4 + routeBonus * 0.22 + buzzBonus * 0.16 + homeBonus * 0.1 + craftBonus * 0.18 + comfortPrep * 0.12 + toolPrep * 0.14 + reportBonus * 0.1 + alchemyPotionBonus(state) * 0.12 + treasureVaultBonus(state) * 0.12, 0, 0.84);
  const expedition = {
    id: `exp-${state.nextExpeditionId++}`,
    type: def.id,
    title: def.title,
    residentId: resident.id,
    residentName: resident.name,
    originFloorId: options.originFloorId || resident.homeFloorId || null,
    total,
    remaining: total,
    rewardCoins,
    rewardGems,
    relicChance,
    comfortPrepBonus: comfortPrep,
    comfortPrepLabel: resident.comfortMemory?.label || (comfortPrep > 0 ? "舒缓余韵" : ""),
    toolTunePrep: toolPrep,
    routeNote: def.text,
    waymarkIds: [],
    reportBonus,
  };
  resident.expeditionId = expedition.id;
  state.expeditions.push(expedition);
  const comfortText = comfortPrep > 0 ? `，${expedition.comfortPrepLabel}让准备 +${Math.round(comfortPrep * 100)}%` : "";
  const toolText = toolPrep > 0 ? `，工具校准 +${Math.round(toolPrep * 100)}%` : "";
  addLog(`${resident.name} 出发执行「${def.title}」${options.originFloorId !== undefined ? "，宿舍完成远行整备" : ""}${comfortText}${toolText}。`);
  render(true);
}

function startDwellingExpedition(floorId) {
  const floor = findFloor(floorId);
  if (!floor || floor.type !== "dwelling") return;
  if (state.expeditions.length >= expeditionCapacity(state)) {
    showToast("探险队已满");
    return;
  }
  const resident = floor.residents
    .map((entry) => getResident(entry.id))
    .filter((entry) => entry && !entry.workFloorId && !entry.expeditionId)
    .sort((a, b) => explorerPower(b) - explorerPower(a))[0];
  if (!resident) {
    showToast("这间宿舍没有空闲居民");
    return;
  }
  const unlocked = EXPEDITION_DEFS.filter((def) => !expeditionLockReason(def));
  if (!unlocked.length) {
    showToast("还没有可出发的探险路线");
    return;
  }
  const routeIndex = clamp(Math.floor((floor.level || 1) / 2), 0, unlocked.length - 1);
  const route = unlocked[routeIndex];
  startExpedition(route.id, resident, { originFloorId: floor.id });
}

function completeExpedition(game, expeditionId, noisy = game === state) {
  const expedition = game.expeditions.find((entry) => entry.id === expeditionId);
  if (!expedition) return;
  expedition.remaining = 0;
  updateExpeditionWaymarks(expedition, game, false);
  const resident = allResidents(game).find((entry) => entry.id === expedition.residentId);
  if (resident) resident.expeditionId = null;
  game.expeditions = game.expeditions.filter((entry) => entry.id !== expeditionId);
  const starPrep = Math.min(0.18, Number(expedition.starChartPrep || 0));
  const toolPrep = Math.min(0.14, Number(expedition.toolTunePrep || 0));
  const coins = Math.round((expedition.rewardCoins || 50) * (1 + starPrep + toolPrep * 0.75));
  const gems = (expedition.rewardGems || 0) + (starPrep > 0 && Math.random() < starPrep * 1.35 ? 1 : 0) + (toolPrep > 0 && Math.random() < toolPrep * 0.9 ? 1 : 0);
  addCoinsToGame(game, coins);
  game.gems += gems;
  game.stats.expeditionsDone += 1;
  const provisionJoy = Math.round(foodWarmthBonus(game) * 6);
  game.happiness = clamp(game.happiness + 1 + provisionJoy, 0, 100);
  const relicFound = Math.random() < clamp((expedition.relicChance || 0) + starPrep * 0.32 + toolPrep * 0.24, 0, 0.92);
  if (relicFound) awardRelicPiece(game);
  const report = recordExpeditionReport(game, expedition, resident, { coins, gems, relicFound });
  const gemText = gems ? `、${gems} 宝石` : "";
  const relicText = relicFound ? "，还带回珍藏碎片" : "";
  const provisionText = provisionJoy ? "，暖锅补给让队伍精神更足" : "";
  const toolText = toolPrep > 0 ? `，工具校准让收益 +${Math.round(toolPrep * 75)}%` : craftToolBonus(game) > 0 ? "，工坊工具包让路线更稳" : "";
  const comfortText = expedition.comfortPrepBonus > 0 ? `，${expedition.comfortPrepLabel || "舒缓余韵"}让路线更安稳` : "";
  const starText = starPrep > 0 ? `，星图预报让收益 +${Math.round(starPrep * 100)}%` : "";
  const reportText = report ? "，留下回城报告" : "";
  const homeFloor = game.floors.find((floor) => floor.id === expedition.originFloorId && floor.type === "dwelling");
  if (homeFloor) {
    const homeShare = Math.round(coins * (0.08 + dwellingJourneyBonus(game) * 0.24));
    homeFloor.rentReady = Math.min(420, (homeFloor.rentReady || 0) + homeShare);
  }
  addLogToGame(game, `${expedition.residentName || resident?.name || "斥候"} 完成「${expedition.title}」，带回 ${coins} 金币${gemText}${relicText}${provisionText}${toolText}${comfortText}${starText}${reportText}。`);
  if (noisy) {
    showFloat(`探险 +${coins}`);
    if (gems || relicFound) showToast(relicFound ? "探险发现珍藏碎片" : `探险带回 ${gems} 宝石`);
  }
}

function moveElevator(delta) {
  const ordered = getOrderedFloors(state);
  const currentIndex = Math.max(0, ordered.findIndex((floor) => floor.id === state.selectedFloorId));
  const nextIndex = clamp(currentIndex + delta, 0, ordered.length - 1);
  const next = ordered[nextIndex];
  if (!next || next.id === state.selectedFloorId) return;
  state.selectedFloorId = next.id;
  state.elevator.target = next.id;
  state.elevator.doorTimer = 0;
  if (navigator.vibrate) navigator.vibrate(10);
  render(true);
}

function setElevatorTarget(floorId) {
  const target = findFloor(floorId);
  if (!target) return;
  state.selectedFloorId = target.id;
  state.elevator.target = target.id;
  state.elevator.doorTimer = 0;
  if (navigator.vibrate) navigator.vibrate(12);
  render(true);
}

function elevatorIsMaxed(game = state) {
  return (game.elevator?.upgrades || 0) >= ELEVATOR_MAX_UPGRADES;
}

function elevatorUpgradeCost(game = state) {
  return 5 + (game.elevator?.upgrades || 0) * 3;
}

function boardVisitor(visitorId, options = {}) {
  const index = state.queue.findIndex((visitor) => visitor.id === visitorId);
  if (index < 0) return;
  const visitor = state.queue[index];
  const floor = findFloor(visitor.targetFloorId) || findFloor(0);
  if (!floor) return;

  if (state.elevator.passenger) {
    showToast("电梯里已有访客，请先接待");
    toggleElevatorPanel(true);
    return;
  }

  if (options.routeDispatch) {
    visitor.routeDispatch = true;
    visitor.priorityDispatch = isPriorityLobbyDispatch(visitor, state);
    visitor.dispatchPressure = lobbyPressureInfo(state).tone;
    state.stats.lobbyRoutesDone = (state.stats.lobbyRoutesDone || 0) + 1;
  } else {
    visitor.routeDispatch = false;
    visitor.priorityDispatch = false;
  }

  if (elevatorIsMaxed()) {
    state.queue.splice(index, 1);
    state.selectedFloorId = floor.id;
    enqueueFloorArrival(visitor, floor, true);
    resolveVisitorAtFloor(visitor, floor, true);
    return true;
  }

  state.queue.splice(index, 1);
  state.elevator.passenger = visitor;
  state.elevator.position = 0;
  state.elevator.target = floor.id;
  state.elevator.doorTimer = 0;
  state.selectedFloorId = floor.id;
  toggleElevatorPanel(true);
  showToast(`${options.routeDispatch ? "灯号已派发" : "访客已进入电梯"}，前往 ${formatFloorLabel(floor.id)} 层`, { duration: 2400 });
  render(true);
  return true;
}

function dispatchLobbyVisitor() {
  if (state.elevator.passenger) {
    showToast("电梯里已有访客，请先接待");
    toggleElevatorPanel(true);
    return;
  }
  const visitor = bestLobbyVisitor(state);
  if (!visitor) {
    showToast("大厅暂时没有访客");
    return;
  }
  const route = visitorRouteInfo(visitor, state);
  const boarded = boardVisitor(visitor.id, { routeDispatch: true });
  if (boarded) {
    addLog(`大厅灯号推荐 ${visitor.title} 前往 ${route.floorLabel} ${route.floorName}（${route.text}）。`);
    render(true);
  }
}

function dropPassenger() {
  const elevator = state.elevator;
  if (!elevator.passenger) {
    showToast("请先点大厅访客进入电梯");
    return;
  }
  if (elevator.target !== null) {
    showToast("电梯正在前往目标楼层");
    return;
  }
  if ((elevator.doorTimer || 0) > 0) {
    showToast(`电梯到站开门中：${Math.ceil(elevator.doorTimer)}s`);
    return;
  }
  const floor = findFloor(Math.round(elevator.position)) || findFloor(state.selectedFloorId) || findFloor(0);
  if (!floor) return;
  const passenger = elevator.passenger;
  const correct = floor.id === passenger.targetFloorId;
  elevator.passenger = null;
  elevator.position = floor.id;
  state.selectedFloorId = floor.id;
  enqueueFloorArrival(passenger, floor, correct);
  resolveVisitorAtFloor(passenger, floor, correct);
}

function resolveVisitorAtFloor(passenger, floor, correct = true) {
  let success = false;

  if (passenger.kind === "resident") {
    if (floor.type === "dwelling" && getVacancy(floor) > 0) {
      addResidentToDwelling(state, floor, passenger.resident);
      state.stats.residentsMoved += 1;
      const income = correct ? 42 : 20;
      addCoins(income);
      showFloat(`+${income}`);
      state.happiness = clamp(state.happiness + 2, 0, 100);
      addLog(`${passenger.resident.name} 入住了 ${floor.name}。`);
      maybeOfferDreamJob(getResident(passenger.resident.id));
      success = true;
    } else {
      state.happiness = clamp(state.happiness - 3, 0, 100);
      addLog(`${passenger.title} 没找到合适的房间。`);
    }
  } else if (passenger.kind === "vip") {
    success = applyVipEffect(floor, passenger, correct);
  } else {
    success = serveShopper(floor, passenger, correct);
  }

  if (passenger.routeDispatch && success && correct) {
    const waitBonus = Math.min(16, Math.floor(lobbyWaitSeconds(passenger) / 4));
    const priorityBonus = passenger.priorityDispatch ? 8 : 0;
    const routeBonus = Math.min(48, 8 + Math.floor((state.streak || 0) * 1.4) + waitBonus + priorityBonus);
    addCoins(routeBonus);
    showFloat(`+${routeBonus}`);
    state.happiness = clamp(state.happiness + 1, 0, 100);
    if (passenger.priorityDispatch) {
      state.stats.lobbyPriorityDispatchesDone = (state.stats.lobbyPriorityDispatchesDone || 0) + 1;
    }
    addLog(`大厅派号顺利完成，额外收入 ${routeBonus} 金币${passenger.priorityDispatch ? "，候车秩序 +1" : ""}。`);
  }

  recordDelivery(success && correct);
  render(true);
}

function serveShopper(floor, passenger, correct) {
  if (!isBusiness(floor) || floor.stock <= 0) {
    state.happiness = clamp(state.happiness - 2, 0, 100);
    addLog(`${passenger.title} 空手离开了。`);
    return false;
  }
  const sold = Math.min(floor.stock, correct ? 3 : 1);
  floor.stock -= sold;
  const income = Math.round((sold * FLOOR_TYPES[floor.type].price + (correct ? 9 : 0)) * businessIncomeMultiplier(floor, state));
  addCoins(income);
  showFloat(`+${income}`);
  state.happiness = clamp(state.happiness + (correct ? 2 : 0), 0, 100);
  const serviceNote = floor.type === "service" ? "，礼宾把下一位访客也安排好了" : "";
  const foodNote = floor.type === "food" ? "，热餐让大厅等待轻松了些" : "";
  const craftNote = floor.type === "craft" ? "，新工具让补货队少跑了一趟" : "";
  if (floor.type === "food") {
    state.happiness = clamp(state.happiness + (correct ? 2 : 1), 0, 100);
    const pull = correct ? 0.78 : 0.92;
    state.spawnTimer = Math.max(3.4, Math.min(state.spawnTimer || 8, getNextVisitorDelay((state.queue || []).length) * pull));
  }
  if (floor.type === "service") {
    state.happiness = clamp(state.happiness + (correct ? 2 : 1), 0, 100);
    const pull = correct ? 0.72 : 0.88;
    state.spawnTimer = Math.max(3.1, Math.min(state.spawnTimer || 8, getNextVisitorDelay((state.queue || []).length) * pull));
  }
  if (floor.type === "craft") {
    const toolTime = correct ? 1.8 + craftToolBonus(state) * 5 : 0.8;
    businessFloors(state)
      .filter((candidate) => candidate.id !== floor.id && candidate.production)
      .forEach((candidate) => {
        candidate.production.remaining = Math.max(0, candidate.production.remaining - toolTime);
      });
    if (correct) state.happiness = clamp(state.happiness + 1, 0, 100);
  }
  state.stats.shoppersServed += 1;
  addLog(`${floor.name} 接待了 ${passenger.title}，收入 ${income} 金币${serviceNote || foodNote || craftNote}。`);
  return true;
}

function applyVipEffect(floor, passenger, correct) {
  let note = "";
  if (passenger.effect === "rush") {
    if (floor.status === "construction") {
      floor.buildRemaining = Math.max(0, floor.buildRemaining - 9);
      note = "施工进度大幅推进";
    } else if (isBusiness(floor)) {
      if (floor.production) {
        floor.production.remaining = Math.max(0, floor.production.remaining - 9);
      } else {
        floor.stock = floor.stockMax;
      }
      note = "楼层马上忙碌起来";
    } else {
      floor.rentReady = (floor.rentReady || 0) + 35;
      note = "住户们交来了额外租金";
    }
  } else if (passenger.effect === "joy") {
    state.happiness = clamp(state.happiness + (correct ? 9 : 4), 0, 100);
    note = "王国快乐提升";
  } else if (passenger.effect === "stars") {
    state.gems += correct ? 2 : 1;
    if (correct || Math.random() < 0.35) awardRelicPiece();
    note = "带来星象记录和宝石";
  } else {
    const coins = correct ? 95 : 45;
    addCoins(coins);
    showFloat(`+${coins}`);
    note = `带来 ${coins} 金币赞助`;
  }
  if (floor?.type === "food") {
    state.happiness = clamp(state.happiness + (correct ? 7 : 3), 0, 100);
    state.spawnTimer = Math.max(2.8, Math.min(state.spawnTimer || 8, getNextVisitorDelay((state.queue || []).length) * (correct ? 0.68 : 0.86)));
    note += "，暖锅晚餐稳住了大厅心情";
  } else if (floor?.type === "service") {
    state.happiness = clamp(state.happiness + (correct ? 6 : 2), 0, 100);
    state.spawnTimer = Math.max(2.4, Math.min(state.spawnTimer || 8, getNextVisitorDelay((state.queue || []).length) * (correct ? 0.62 : 0.82)));
    if (correct) state.streak = Math.min(99, (state.streak || 0) + 1);
    note += "，礼宾服务让访客动线顺畅";
  } else if (floor?.type === "craft") {
    const toolTime = correct ? 4 + craftToolBonus(state) * 8 : 2;
    businessFloors(state)
      .filter((candidate) => candidate.production)
      .forEach((candidate) => {
        candidate.production.remaining = Math.max(0, candidate.production.remaining - toolTime);
      });
    state.floors
      .filter((candidate) => candidate.status === "construction")
      .forEach((candidate) => {
        candidate.buildRemaining = Math.max(0, candidate.buildRemaining - (correct ? 2.5 : 1));
      });
    note += "，工坊交付了一批工具箱";
  } else if (floor?.type === "market" && isBusiness(floor)) {
    floor.stock = floor.stockMax;
    if (correct && (state.orders || []).length < orderCapacity(state)) {
      const order = brokerMarketOrder(floor, { free: true, noCooldown: true });
      note += order ? "，市集顺手撮合了一张快单" : "，市集迅速补满";
    } else {
      note += "，市集迅速补满";
    }
  } else if (floor?.type === "library" && correct) {
    if (Math.random() < 0.7) awardRelicPiece(state, { preferCatalog: true, sourceLabel: "贵宾书评" });
    state.gems += 1;
    note += "，书库翻出珍藏线索";
  } else if (floor?.type === "garden") {
    state.happiness = clamp(state.happiness + (correct ? 7 : 3), 0, 100);
    note += "，花园让王国更舒心";
  } else if (floor?.type === "entertainment") {
    state.happiness = clamp(state.happiness + (correct ? 6 : 2), 0, 100);
    if (correct) state.streak = Math.min(99, (state.streak || 0) + 1);
    const applausePull = correct ? 0.55 : 0.75;
    state.spawnTimer = Math.max(2.8, Math.min(state.spawnTimer || 8, getNextVisitorDelay(state.queue.length) * applausePull));
    note += "，剧场掌声把下一波观众引近了";
  } else if (floor?.type === "observatory" && correct) {
    state.gems += 1;
    if (Math.random() < 0.55) awardRelicPiece();
    note += "，观星台校准了星路";
  } else if (floor?.type === "festival") {
    state.happiness = clamp(state.happiness + (correct ? 8 : 3), 0, 100);
    state.streak = Math.min(99, (state.streak || 0) + (correct ? 2 : 1));
    if (correct && Math.random() < 0.35 + festivalBuzzBonus(state) * 0.4) state.gems += 1;
    note += "，剧场节目点燃了节庆声望";
  } else if (floor?.type === "bathhouse") {
    state.happiness = clamp(state.happiness + (correct ? 8 : 4), 0, 100);
    businessFloors(state)
      .filter((candidate) => candidate.production)
      .forEach((candidate) => {
        candidate.production.remaining = Math.max(0, candidate.production.remaining - 3);
      });
    note += "，温泉让大家恢复精神";
  } else if (floor?.type === "clinic") {
    state.happiness = clamp(state.happiness + (correct ? 7 : 3), 0, 100);
    state.streak = Math.min(99, (state.streak || 0) + 1);
    note += "，医馆稳住了连送节奏";
  } else if (floor?.type === "clockwork") {
    state.floors
      .filter((candidate) => candidate.status === "construction")
      .forEach((candidate) => {
        candidate.buildRemaining = Math.max(0, candidate.buildRemaining - 4);
      });
    businessFloors(state)
      .filter((candidate) => candidate.production)
      .forEach((candidate) => {
        candidate.production.remaining = Math.max(0, candidate.production.remaining - 4);
      });
    note += "，机巧铜铃让全城加速";
  } else if (floor?.type === "aquarium") {
    state.happiness = clamp(state.happiness + (correct ? 6 : 2), 0, 100);
    if (correct && Math.random() < 0.45) state.gems += 1;
    note += "，水晶鱼群引来好运";
  }
  state.stats.vipsServed += 1;
  if (correct && Math.random() < 0.4) state.gems += 1;
  if (correct && Math.random() < 0.2 + collectionMapBonus()) awardRelicPiece();
  addLog(`${passenger.title} 拜访了 ${floor.name}，${note}。`);
  return true;
}

function maybeOfferDreamJob(resident) {
  const floor = businessFloors(state).find((candidate) => {
    return candidate.type === resident.dreamType && candidate.workers.length < 3;
  });
  if (!floor || Math.random() > 0.55) return;
  resident.workFloorId = floor.id;
  floor.workers.push(resident.id);
  state.gems += 1;
  state.stats.dreamJobsFilled += 1;
  addLog(`${resident.name} 找到了理想工作，奖励 1 宝石。`);
}

function startStock(floorId) {
  const floor = findFloor(floorId);
  if (!isBusiness(floor)) return;
  if (floor.workers.length === 0) {
    showToast("这个楼层还没有员工");
    return;
  }
  if (floor.production) {
    showToast("已经在补货了");
    return;
  }
  if (floor.stock >= floor.stockMax) {
    showToast("货架已经很满");
    return;
  }
  const toolBonus = craftToolBonus(state);
  const materialDiscount = Math.min(0.2, toolBonus * (floor.type === "craft" ? 0.55 : 0.42));
  const cost = Math.max(8, Math.ceil(floor.stockMax * 0.35 * (1 - materialDiscount)));
  if (state.coins < cost) {
    showToast("金币不够补货");
    return;
  }
  state.coins -= cost;
  const skill = averageSkill(floor.workers, floor.type);
  const restBoost = bathhouseRestBonus(state);
  const clockBoost = clockworkTempoBonus(state);
  const mealPrepBoost = floor.type === "food" ? foodWarmthBonus(state) * 0.28 : 0;
  const workshopBoost = floor.type === "craft" ? toolBonus * 0.52 : toolBonus * 0.24;
  const total = Math.max(4.2, (15 - skill * 0.9 + TYPE_ORDER.indexOf(floor.type) * 1.08) * (1 - restBoost * 0.42 - clockBoost * 0.36 - mealPrepBoost - workshopBoost));
  const toolStock = floor.type === "craft" ? Math.max(1, Math.floor(toolBonus * 12)) : Math.floor(toolBonus * 6);
  floor.production = {
    remaining: total,
    total,
    bonus: Math.floor(skill / 3) + toolStock,
  };
  addLog(`${floor.name} 开始补货${toolBonus > 0 ? "，工坊工具减少了材料损耗" : ""}。`);
  render(true);
}

function hireBestWorker(floor, game = state, silent = false) {
  if (!isBusiness(floor)) return false;
  if (floor.workers.length >= 3) {
    if (!silent) showToast("员工位已满");
    return false;
  }
  const available = allResidents(game).filter((resident) => !resident.workFloorId && !resident.expeditionId);
  if (!available.length) {
    if (!silent) showToast("没有空闲居民");
    return false;
  }
  available.sort((a, b) => workerSkillValue(b, floor.type) - workerSkillValue(a, floor.type));
  const resident = available[0];
  resident.workFloorId = floor.id;
  floor.workers.push(resident.id);
  if (resident.dreamType === floor.type) {
    game.gems += 1;
    game.stats.dreamJobsFilled = (game.stats.dreamJobsFilled || 0) + 1;
    if (!silent) addLog(`${resident.name} 入职理想岗位，奖励 1 宝石。`);
  } else if (!silent) {
    addLog(`${resident.name} 开始在 ${floor.name} 工作。`);
  }
  if (!silent) render(true);
  return true;
}

function collectRent(floorId) {
  const floor = findFloor(floorId);
  if (!floor || floor.type !== "dwelling") return;
  if (!floor.rentReady) {
    showToast("租金还没攒起来");
    return;
  }
  const rent = floor.rentReady;
  floor.rentReady = 0;
  addCoins(rent);
  state.stats.rentCollected += rent;
  addLog(`${floor.name} 收到 ${rent} 金币租金。`);
  render(true);
}

function speedUpFloor(floorId) {
  const floor = findFloor(floorId);
  if (!floor || state.gems <= 0) {
    showToast("宝石不够");
    return;
  }
  if (floor.status === "construction") {
    state.gems -= 1;
    floor.buildRemaining = Math.max(0, floor.buildRemaining - 10);
  } else if (floor.production) {
    state.gems -= 1;
    floor.production.remaining = Math.max(0, floor.production.remaining - 10);
  } else {
    showToast("这个楼层暂时不用加速");
    return;
  }
  addLog(`${floor.name} 使用宝石加速。`);
  render(true);
}

function openBuildModal(direction = preferredBuildDirection) {
  preferredBuildDirection = direction === "up" ? "up" : "down";
  renderBuildOptions();
  els.buildModal.hidden = false;
}

function closeBuildModal() {
  els.buildModal.hidden = true;
}

function openGuideModal() {
  if (!els.guideModal) return;
  els.guideModal.hidden = false;
}

function closeGuideModal(persist = true) {
  if (!els.guideModal) return;
  els.guideModal.hidden = true;
  if (persist) {
    try {
      localStorage.setItem(GUIDE_KEY, "seen");
    } catch {
      // The guide is optional; private browsing can block this.
    }
  }
}

function openInventoryModal() {
  if (!els.inventoryModal) return;
  renderInventoryPanel();
  els.inventoryModal.hidden = false;
}

function closeInventoryModal() {
  if (!els.inventoryModal) return;
  els.inventoryModal.hidden = true;
}

function buildFloor(type, direction = preferredBuildDirection) {
  const buildDirection = direction === "up" ? "up" : "down";
  const lockedReason = buildLockReason(type, buildDirection);
  if (lockedReason) {
    showToast(lockedReason);
    return;
  }
  const cost = buildCost(type, buildDirection);
  if (state.coins < cost) {
    showToast("金币不够建设");
    return;
  }
  state.coins -= cost;
  const floor = createConstructionFloor(state, type, buildDirection);
  state.floors.push(floor);
  state.selectedFloorId = floor.id;
  closeBuildModal();
  addLog(`${buildDirection === "up" ? "向上加建" : "向下开凿"}新的${FLOOR_TYPES[type].label}楼层。`);
  render(true);
  setTimeout(() => {
    const node = document.querySelector(`[data-floor-id="${floor.id}"]`);
    node?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 80);
}

function upgradeElevator() {
  if (elevatorIsMaxed()) {
    showToast("入口已满级");
    render(true);
    return;
  }
  const cost = elevatorUpgradeCost();
  if (state.gems < cost) {
    showToast(`需要 ${cost} 宝石`);
    return;
  }
  state.gems -= cost;
  state.elevator.upgrades = Math.min(ELEVATOR_MAX_UPGRADES, state.elevator.upgrades + 1);
  state.elevator.speed += 0.28;
  addLog("访客入口扩容了。");
  render(true);
}

function upgradeFloor(floorId) {
  const floor = findFloor(floorId);
  if (!floor || floor.type === "lobby" || floor.status !== "open") return;
  const cost = floorUpgradeCost(floor);
  if (state.coins < cost) {
    showToast(`需要 ${cost} 金币`);
    return;
  }
  state.coins -= cost;
  floor.level = (floor.level || 1) + 1;

  if (floor.type === "dwelling") {
    floor.capacity += floor.level % 2 === 0 ? 1 : 0;
    floor.rentTotal = Math.max(14, floor.rentTotal - 1);
    floor.bonus += 8;
  } else {
    floor.stockMax += 5 + Math.floor(floor.level / 2);
    floor.stock = Math.min(floor.stockMax, floor.stock + 4);
    floor.bonus += 1;
  }

  state.happiness = clamp(state.happiness + 1, 0, 100);
  addLog(`${floor.name} 升到 Lv${floor.level}。`);
  render(true);
}

function floorUpgradeCost(floor) {
  return Math.round(160 + Math.abs(floor.id) * 48 + (floor.level || 1) * 125);
}

function questEntry(def, game = state) {
  game.quests ||= [];
  const questState = game.quests.find((quest) => quest.id === def.id);
  if (questState) return questState;
  const created = { id: def.id, claimed: false, ready: false };
  game.quests.push(created);
  return created;
}

function questProgressValue(def, game = state) {
  return Math.max(0, Number(game.stats?.[def.metric]) || 0);
}

function isQuestReady(def, game = state) {
  const questState = questEntry(def, game);
  return !questState.claimed && (questState.ready || questProgressValue(def, game) >= def.goal);
}

function pendingQuestRewards(game = state) {
  return QUEST_DEFS.reduce(
    (total, def) => {
      if (!isQuestReady(def, game)) return total;
      total.count += 1;
      total.coins += def.reward.coins;
      total.gems += def.reward.gems;
      return total;
    },
    { count: 0, coins: 0, gems: 0 }
  );
}

function checkQuests() {
  QUEST_DEFS.forEach((def) => {
    const questState = questEntry(def);
    if (questState.claimed) {
      questState.ready = false;
      return;
    }
    if (questProgressValue(def) < def.goal) {
      questState.ready = false;
      return;
    }
    if (questState.ready) return;
    questState.ready = true;
    addLog(`任务「${def.title}」已完成，前往任务面板领取奖励。`);
  });
}

function claimQuest(questId) {
  const def = QUEST_DEFS.find((quest) => quest.id === questId);
  if (!def) return;
  const questState = questEntry(def);
  if (questState.claimed) {
    showToast("任务奖励已领取");
    return;
  }
  if (questProgressValue(def) < def.goal) {
    showToast("任务还未完成");
    return;
  }
  questState.claimed = true;
  questState.ready = false;
  addCoins(def.reward.coins);
  state.gems += def.reward.gems;
  addLog(`领取任务「${def.title}」奖励：${def.reward.coins} 金币和 ${def.reward.gems} 宝石。`);
  showFloat(`任务 +${def.reward.coins}`);
  showToast(`已领取：${def.title}`);
  render(true);
  saveGame(false);
}

function canFulfillOrder(order) {
  return orderStockInfo(order).ready;
}

function fulfillOrder(orderId) {
  const order = state.orders.find((entry) => entry.id === orderId);
  if (!order) return;
  if (!canFulfillOrder(order)) {
    showToast("库存还不够交付订单");
    return;
  }

  const mandatePrepared = orderMandatePrepared(order);
  const packed = orderMarketPacked(order);
  const prepared = orderPreparedTotal(order);
  const receiptBonus = Math.max(0, Number(order.royalMandate?.receiptBonus) || 0);
  const toolTuneReward = Math.max(0, Number(order.toolTuneRewardBonus) || 0);
  let remaining = Math.max(0, order.amount - prepared);
  businessFloors(state)
    .filter((floor) => floor.type === order.type)
    .sort((a, b) => b.stock - a.stock)
    .forEach((floor) => {
      const take = Math.min(floor.stock, remaining);
      floor.stock -= take;
      remaining -= take;
    });

  state.coins += order.reward;
  state.gems += order.gemReward;
  state.stats.coinsEarned += order.reward;
  state.stats.commissionsDone += 1;
  state.happiness = clamp(state.happiness + (order.source === "market" ? 4 : 3), 0, 100);
  showFloat(`订单 +${order.reward}`);
  const preparedText = [
    mandatePrepared ? `王令预备 ${mandatePrepared}` : "",
    order.royalMandate?.delivered ? `信使回执 +${receiptBonus}` : "",
    packed ? `市集打包 ${packed}` : "",
    toolTuneReward ? `工具校准 +${toolTuneReward}` : "",
  ].filter(Boolean).join("，");
  addLog(`${orderSourceLabel(order)}完成：${FLOOR_TYPES[order.type].label} ${order.amount}${preparedText ? `，${preparedText}` : ""}，奖励 ${order.reward} 金币。`);
  if (order.type === "craft") {
    const crateBonus = Math.round(18 + craftToolBonus(state) * 115);
    addCoins(crateBonus);
    addLog(`手作工具箱验收合格，追加 ${crateBonus} 金币。`);
  }
  if (order.bonusRelic || Math.random() < 0.22 + (order.type === "craft" ? craftToolBonus(state) * 0.45 : 0)) {
    awardRelicPiece();
  }
  clearRoyalMandateForOrder(orderId);
  clearMarketParcelForOrder(orderId);
  state.orders = state.orders.filter((entry) => entry.id !== orderId);
  ensureOrders(state);
  render(true);
}

function awardRelicPiece(game = state, options = {}) {
  const item = pickCatalogRelic(game, options);
  if (!item) {
    game.gems += 1;
    addLogToGame(game, "珍藏图鉴已满，额外转化为 1 宝石。");
    return null;
  }
  game.collection[item.id] = Math.min(3, (game.collection[item.id] || 0) + 1);
  game.stats.relicPieces += 1;
  addLogToGame(game, `${options.sourceLabel || "发现珍藏碎片"}：${item.name} ${game.collection[item.id]}/3。`);
  return item;
}

function render(force = false) {
  const now = performance.now();
  if (!force && now - lastRender < 650) return;
  lastRender = now;
  renderResources();
  const kingdomKey = getKingdomRenderKey();
  if (force || kingdomKey !== lastKingdomKey) {
    lastKingdomKey = kingdomKey;
    renderKingdom();
  }
  renderElevatorPanel();
  renderFloorDetail();
  injectFloorObjectivePanel();
  renderResidentRoster();
  renderQuests();
  renderOrders();
  renderCollection();
  renderExpeditions();
  renderLog();
  if (els.inventoryModal && !els.inventoryModal.hidden) renderInventoryPanel();
  updateResponsiveLayoutState();
  updateFullscreenButton();
  updateElevatorToggleButton();
}

function getKingdomRenderKey() {
  const best = bestLobbyVisitor(state);
  const bestRoute = best ? visitorRouteInfo(best, state) : null;
  const passenger = state.elevator?.passenger;
  const floorKey = state.floors
    .map((floor) => {
      const objectiveKey = floorObjectiveMapKey(floor);
      if (floor.status === "construction") {
        return `${floor.id}:${floor.type}:build:${Math.ceil(floor.buildRemaining)}:${objectiveKey}:${state.selectedFloorId}`;
      }
      if (floor.type === "dwelling") {
        return `${floor.id}:dw:${floor.level}:${floor.residents.length}:${floor.capacity}:${floor.rentReady}:${floor.residents.map((resident) => resident.expeditionId || 0).join("-")}:${lifeTrailMapKey(floor)}:${lifeStoryReviewMapKey(floor)}:${expeditionWaymarkMapKey(floor)}:${floorPeopleMotionKey(floor)}:${objectiveKey}:${state.selectedFloorId}`;
      }
      if (floor.type === "lobby") {
        return `${floor.id}:lobby:${state.queue.map((visitor) => `${visitor.id}:${visitor.need || ""}:${visitor.activity || ""}:${Math.floor(lobbyWaitSeconds(visitor) / 5)}:${visitor.targetFloorId || ""}`).join("-")}:${lobbyPressureInfo(state).tone}:${objectiveKey}:${state.selectedFloorId}`;
      }
      return `${floor.id}:${floor.type}:${floor.level}:${floor.stock}:${floor.stockMax}:${floor.workers.length}:${Boolean(floor.production)}:${foodRushMapKey(floor)}:${serviceCareMapKey(floor)}:${starChartMapKey(floor)}:${toolTuneMapKey(floor)}:${marketParcelMapKey(floor)}:${royalMandateMapKey(floor)}:${comfortSessionMapKey(floor)}:${showtimeMapKey(floor)}:${lifeTrailMapKey(floor)}:${floorPeopleMotionKey(floor)}:${objectiveKey}:${state.selectedFloorId}`;
    })
    .join("|");
  const arrivalKey = (state.arrivals || []).map((arrival) => `${arrival.id}:${arrival.floorId}`).join("-");
  const routeKey = `route:${best?.id || 0}:${bestRoute?.floor?.id || 0}:${bestRoute?.tone || "none"}:passenger:${passenger?.id || 0}:${passenger?.targetFloorId || 0}`;
  return `${floorKey}:arrivals:${arrivalKey}:${routeKey}`;
}

function floorPeopleMotionKey(floor) {
  if (!floor || floor.status === "construction") return "";
  const people = floorPeopleForLife(floor);
  return people
    .map((person) => {
      const motion = person.motion || {};
      return `${person.id}:${person.need || ""}:${person.activity || ""}:${person.socialPartnerId || ""}:${person.socialScene || ""}:${person.socialPhase || ""}:${person.socialFloorScope || ""}:${person.lifeVisit?.floorId || ""}:${motion.x || 0}:${motion.y || 0}:${motion.mode || ""}:${personLifeKey(person)}`;
    })
    .join(",");
}

function renderResources() {
  els.coins.textContent = Math.floor(state.coins);
  els.gems.textContent = state.gems;
  els.population.textContent = `${allResidents(state).length}/${populationCap(state)}`;
  els.happiness.textContent = `${Math.round(state.happiness)}`;
  els.streak.textContent = `x${state.streak || 0}`;
  const pending = pendingQuestRewards();
  const pendingReviews = pendingLifeStoryReviewCount(state);
  els.inventoryBtn?.classList.toggle("attention", pending.count > 0 || pendingReviews > 0);
  els.inventoryBtn?.setAttribute(
    "aria-label",
    pending.count > 0 || pendingReviews > 0
      ? `资产背包，${pending.count} 个任务奖励待领取，${pendingReviews} 段生活足迹待回访`
      : "资产背包"
  );
}

function renderKingdom() {
  const floors = getOrderedFloors(state).map((floor) => renderFloor(floor)).join("");
  els.kingdom.innerHTML = `${renderBuildSlot("up")}${floors}${renderBuildSlot("down")}`;
}

function renderFloor(floor) {
  const selected = floor.id === state.selectedFloorId ? "selected" : "";
  const constructing = floor.status === "construction" ? "constructing" : "";
  const objective = floorObjective(floor);
  const objectiveClass = objective ? `objective-${objective.tone}` : "";
  const objectiveAttrs = objective
    ? ` data-objective-tone="${escapeAttr(objective.tone)}" data-objective-label="${escapeAttr(objective.mapLabel || objective.label)}"`
    : "";
  const routeClass = floorRouteClass(floor);
  const lifeTrailItems = lifeTrailsForFloor(floor);
  const lifeTrailClass = lifeTrailItems.length ? "life-trail-active" : "";
  const lifeTrailAttrs = lifeTrailItems.length
    ? ` data-life-trail-count="${lifeTrailItems.length}" data-life-trail-need="${escapeAttr(lifeTrailItems[0].need)}"`
    : "";
  const lifeStoryReviewItems = pendingLifeStoryReviewsForFloor(floor);
  const lifeStoryReviewClass = lifeStoryReviewItems.length ? "life-story-review-ready" : "";
  const lifeStoryReviewAttrs = lifeStoryReviewItems.length
    ? ` data-life-story-reviews="${lifeStoryReviewItems.length}" data-life-story-need="${escapeAttr(lifeStoryReviewItems[0].need)}"`
    : "";
  const expeditionWaymarkItems = expeditionWaymarksForFloor(floor);
  const expeditionWaymarkClass = expeditionWaymarkItems.length ? "expedition-waymark-active" : "";
  const expeditionWaymarkAttrs = expeditionWaymarkItems.length
    ? ` data-expedition-waymarks="${expeditionWaymarkItems.length}" data-expedition-stage="${escapeAttr(expeditionWaymarkItems[0].mark.id)}"`
    : "";
  const foodRushClass = isActiveFoodRush(floor) ? "food-rush-active" : "";
  const foodRushAttrs = isActiveFoodRush(floor)
    ? ` data-food-rush-pace="${escapeAttr(currentFoodRushPace(floor).id)}" data-food-rush-heat="${escapeAttr(foodRushHeatTone(floor))}"`
    : "";
  const serviceCareClass = isActiveServiceCare(floor) ? "service-care-active" : "";
  const serviceCareAttrs = isActiveServiceCare(floor)
    ? ` data-service-care-phase="${escapeAttr(currentServiceCarePhase(floor).id)}" data-service-care-tone="${escapeAttr(serviceCareTone(floor))}"`
    : "";
  const starChartClass = isActiveStarChart(floor) ? "star-chart-active" : "";
  const starChartAttrs = isActiveStarChart(floor)
    ? ` data-star-chart-phase="${escapeAttr(currentStarChartPhase(floor).id)}" data-star-chart-focus="${escapeAttr(starChartFocusTone(floor))}"`
    : "";
  const toolTuneClass = isActiveToolTune(floor) ? "tool-tune-active" : "";
  const toolTuneAttrs = isActiveToolTune(floor)
    ? ` data-tool-tune-phase="${escapeAttr(currentToolTunePhase(floor).id)}" data-tool-tune-precision="${escapeAttr(toolTunePrecisionTone(floor))}"`
    : "";
  const royalMandateClass = isActiveRoyalMandate(floor) ? "royal-mandate-active" : "";
  const royalMandateAttrs = isActiveRoyalMandate(floor)
    ? ` data-royal-mandate-phase="${escapeAttr(currentRoyalMandatePhase(floor).id)}"`
    : "";
  const royalCourierClass = isActiveRoyalMandate(floor) ? "royal-courier-active" : "";
  const royalCourierAttrs = isActiveRoyalMandate(floor)
    ? ` data-royal-courier-phase="${escapeAttr(currentRoyalCourierPhase(floor).id)}" data-royal-courier-progress="${escapeAttr(Math.round(royalCourierProgress(floor) * 100))}"`
    : "";
  const marketParcelClass = isActiveMarketParcel(floor) ? "market-parcel-active" : "";
  const marketParcelAttrs = isActiveMarketParcel(floor)
    ? ` data-market-parcel-phase="${escapeAttr(currentMarketParcelPhase(floor).id)}" data-market-parcel-packed="${escapeAttr(floor.marketParcel.packed || 0)}"`
    : "";
  const comfortClass = isActiveComfortSession(floor) ? "comfort-active" : "";
  const comfortEchoClass = isActiveComfortAfterglow(floor) ? "comfort-afterglow-active" : "";
  const comfortEchoAttrs = isActiveComfortAfterglow(floor)
    ? ` data-comfort-echo="${escapeAttr(floor.comfortAfterglow.type)}" data-comfort-echo-focus="${escapeAttr(comfortFocusTone(floor.comfortAfterglow))}" data-comfort-echo-power="${escapeAttr(Math.round((floor.comfortAfterglow.expeditionBonus || 0) * 100))}"`
    : "";
  const showtimeClass = isActiveShowtime(floor) ? "showtime-active" : "";
  const showtimeAttrs = isActiveShowtime(floor)
    ? ` data-showtime-beat="${escapeAttr(currentShowtimeBeat(floor).id)}" data-showtime-heat="${escapeAttr(showtimeHeatTone(floor))}"`
    : "";
  const zone = getFloorZone(floor);
  return `
    <article class="floor ${selected} ${constructing} ${objectiveClass} ${routeClass} ${lifeTrailClass} ${lifeStoryReviewClass} ${expeditionWaymarkClass} ${foodRushClass} ${serviceCareClass} ${starChartClass} ${toolTuneClass} ${marketParcelClass} ${royalMandateClass} ${royalCourierClass} ${comfortClass} ${comfortEchoClass} ${showtimeClass}" data-floor-id="${floor.id}" data-type="${floor.type}" data-zone="${zone}" data-direction="${floor.direction || floorDirectionFromId(floor.id)}" data-level="${floor.level || 1}"${objectiveAttrs}${lifeTrailAttrs}${lifeStoryReviewAttrs}${expeditionWaymarkAttrs}${foodRushAttrs}${serviceCareAttrs}${starChartAttrs}${toolTuneAttrs}${marketParcelAttrs}${royalMandateAttrs}${royalCourierAttrs}${comfortEchoAttrs}${showtimeAttrs}>
      ${renderFloorIndex(floor)}
      <div class="room" data-action="select-floor" data-floor-id="${floor.id}" title="${escapeAttr(floorMapLabel(floor))}" aria-label="${escapeAttr(floorMapLabel(floor))}">
        ${floor.status === "construction" ? renderConstruction(floor) : renderOpenFloor(floor)}
      </div>
    </article>`;
}

function floorRouteClass(floor) {
  if (!floor) return "";
  const passenger = state.elevator?.passenger;
  if (passenger && Number(passenger.targetFloorId) === Number(floor.id)) return "route-target route-active";
  if (passenger) return "";
  const best = bestLobbyVisitor(state);
  if (!best || Number(best.targetFloorId) !== Number(floor.id)) return "";
  const route = visitorRouteInfo(best, state);
  return `route-target route-candidate route-${route.tone}`;
}

function floorMapLabel(floor) {
  if (!floor) return "";
  if (floor.status === "construction") return `${FLOOR_TYPES[floor.type]?.label || "楼层"}施工中，剩余 ${Math.ceil(floor.buildRemaining || 0)} 秒`;
  const objective = floorObjective(floor);
  return `${floor.name}，${renderFloorStatus(floor)}${objective?.label ? `，目标：${objective.label}` : ""}`;
}

function makeFloorObjective(floor, options = {}) {
  const progress = clamp(Number(options.progress) || 0, 0, 1);
  return {
    floorId: floor?.id,
    tone: options.tone || "calm",
    title: options.title || "房间目标",
    label: options.label || "观察",
    detail: options.detail || "",
    mapLabel: options.mapLabel || options.actionLabel || options.label || "",
    progress,
    action: options.action || "",
    actionLabel: options.actionLabel || "",
    disabled: Boolean(options.disabled),
    storyId: options.storyId || "",
    direction: options.direction || "",
  };
}

function floorStockRatio(floor) {
  if (!isBusiness(floor)) return 0;
  return clamp((Number(floor.stock) || 0) / Math.max(1, Number(floor.stockMax) || 1), 0, 1);
}

function idleResidentCount(game = state) {
  return allResidents(game).filter((resident) => resident && !resident.workFloorId && !resident.expeditionId).length;
}

function dwellingIdleResidents(floor) {
  if (!floor || floor.type !== "dwelling") return [];
  return floor.residents
    .map((entry) => getResident(entry.id))
    .filter((resident) => resident && !resident.workFloorId && !resident.expeditionId);
}

function activeFloorEventObjective(floor) {
  if (isActiveFoodRush(floor)) {
    return makeFloorObjective(floor, {
      tone: "running",
      title: "餐桌高峰",
      label: `${currentFoodRushPace(floor).label} · 上菜 ${floor.foodRush.served || 0}/${floor.foodRush.targetServings || 0}`,
      detail: `居民正在用餐，忙场 ${Math.round(floor.foodRush.heat || 0)}%。`,
      mapLabel: "上菜",
      progress: foodRushProgress(floor),
    });
  }
  if (isActiveServiceCare(floor)) {
    return makeFloorObjective(floor, {
      tone: "running",
      title: "礼宾照看",
      label: `${currentServiceCarePhase(floor).label} · ${floor.serviceCare.touches || 0}/${floor.serviceCare.targetTouches || 0}`,
      detail: `照看正在推进，妥帖度 ${Math.round(floor.serviceCare.care || 0)}%。`,
      mapLabel: "照看",
      progress: serviceCareProgress(floor),
    });
  }
  if (isActiveStarChart(floor)) {
    return makeFloorObjective(floor, {
      tone: "running",
      title: "星图校准",
      label: `${currentStarChartPhase(floor).label} · 星标 ${floor.starChart.marks || 0}/${floor.starChart.targetMarks || 0}`,
      detail: `星路清晰度 ${Math.round(floor.starChart.focus || 0)}%，探险和订单收益正在受益。`,
      mapLabel: "星标",
      progress: starChartProgress(floor),
    });
  }
  if (isActiveToolTune(floor)) {
    return makeFloorObjective(floor, {
      tone: "running",
      title: "工具校准",
      label: `${currentToolTunePhase(floor).label} · 校准点 ${floor.toolTune.marks || 0}/${floor.toolTune.targetMarks || 0}`,
      detail: `工具精度 ${Math.round(floor.toolTune.precision || 0)}%，会帮助施工、补货和订单。`,
      mapLabel: "校准",
      progress: toolTuneProgress(floor),
    });
  }
  if (isActiveMarketParcel(floor)) {
    return makeFloorObjective(floor, {
      tone: "running",
      title: "市集包裹",
      label: `${currentMarketParcelPhase(floor).label} · 打包 ${floor.marketParcel.packed || 0}`,
      detail: "摊位正在把现货装入王室订单，完成后会提高订单奖励。",
      mapLabel: "包裹",
      progress: 1 - Number(floor.marketParcel.remaining || 0) / Math.max(1, Number(floor.marketParcel.total) || 1),
    });
  }
  if (isActiveRoyalMandate(floor)) {
    return makeFloorObjective(floor, {
      tone: "running",
      title: "王令签发",
      label: `${currentRoyalMandatePhase(floor).label} · ${currentRoyalCourierPhase(floor).label}`,
      detail: `${floor.royalMandate.routeLabel || "信使路线"}，剩余 ${Math.ceil(floor.royalMandate.remaining || 0)} 秒。`,
      mapLabel: "王令",
      progress: 1 - Number(floor.royalMandate.remaining || 0) / Math.max(1, Number(floor.royalMandate.total) || 1),
    });
  }
  if (isActiveComfortSession(floor)) {
    const progress = 1 - Number(floor.comfortSession.remaining || 0) / Math.max(1, Number(floor.comfortSession.total) || 1);
    return makeFloorObjective(floor, {
      tone: "running",
      title: COMFORT_SESSION_LABELS[floor.type] || "休整",
      label: `${floor.comfortSession.label || COMFORT_SESSION_LABELS[floor.type] || "休整"} · ${Math.ceil(floor.comfortSession.remaining || 0)}s`,
      detail: "居民正在恢复状态，结束后会留下可调息的舒缓余韵。",
      mapLabel: "休整",
      progress,
    });
  }
  if (isActiveComfortAfterglow(floor)) {
    return makeFloorObjective(floor, {
      tone: floor.comfortAfterglow.focus ? "ready" : "running",
      title: floor.comfortAfterglow.label || "舒缓余韵",
      label: floor.comfortAfterglow.focus ? `已调息 · ${comfortFocusLabel(floor.comfortAfterglow)}` : "余韵待调息",
      detail: floor.comfortAfterglow.focus
        ? `剩余 ${Math.ceil(floor.comfortAfterglow.remaining || 0)} 秒，继续影响租金、探险和恢复。`
        : "可以在详情里选择余韵用途，让旧房间的休整收益更明确。",
      mapLabel: floor.comfortAfterglow.focus ? "余韵" : "调息",
      progress: Number(floor.comfortAfterglow.remaining || 0) / Math.max(1, Number(floor.comfortAfterglow.total) || 1),
    });
  }
  if (isActiveShowtime(floor)) {
    return makeFloorObjective(floor, {
      tone: "running",
      title: SHOWTIME_LABELS[floor.type] || "常驻小剧",
      label: `${currentShowtimeBeat(floor).label} · 热度 ${Math.round(floor.showtime.heat || 0)}%`,
      detail: "观众反应越好，连送和金币奖励越稳定。",
      mapLabel: "演出",
      progress: showtimeProgress(floor),
    });
  }
  return null;
}

function readyFloorEventObjective(floor) {
  if (isFoodRushFloorType(floor.type)) {
    const reason = foodRushActionBlockReason(floor);
    return makeFloorObjective(floor, {
      tone: reason ? "calm" : "ready",
      title: "厨房目标",
      label: reason || "组织一轮用餐高峰",
      detail: reason || "让饥饿居民入座，补足需求并把老厨房的热闹感拉起来。",
      mapLabel: reason ? "待桌" : "开桌",
      progress: floorStockRatio(floor),
      action: reason ? "" : "food-rush",
      actionLabel: "开桌",
    });
  }
  if (isServiceCareFloorType(floor.type)) {
    const reason = serviceCareActionBlockReason(floor);
    return makeFloorObjective(floor, {
      tone: reason ? "calm" : "ready",
      title: "礼宾目标",
      label: reason || "安排礼宾照看",
      detail: reason || "照看需要社交和恢复的居民，同时压低大厅等待压力。",
      mapLabel: reason ? "候客" : "照看",
      progress: floorStockRatio(floor),
      action: reason ? "" : "service-care",
      actionLabel: "照看",
    });
  }
  if (isStarChartFloorType(floor.type)) {
    const reason = starChartActionBlockReason(floor);
    return makeFloorObjective(floor, {
      tone: reason ? "calm" : "ready",
      title: "观星目标",
      label: reason || "校准星图",
      detail: reason || "为探险、订单和居民路线校准星象，提升旧观星台的战略感。",
      mapLabel: reason ? "候星" : "星图",
      progress: floorStockRatio(floor),
      action: reason ? "" : "star-chart",
      actionLabel: "校准",
    });
  }
  if (isToolTuneFloorType(floor.type)) {
    const reason = toolTuneActionBlockReason(floor);
    return makeFloorObjective(floor, {
      tone: reason ? "calm" : "ready",
      title: "工坊目标",
      label: reason || "校准工具",
      detail: reason || "把工坊从单纯补货变成全城效率支点。",
      mapLabel: reason ? "候件" : "校准",
      progress: floorStockRatio(floor),
      action: reason ? "" : "tool-tune",
      actionLabel: "校准",
    });
  }
  if (floor.type === "market") {
    const reason = marketDealActionBlockReason(floor);
    return makeFloorObjective(floor, {
      tone: reason ? "calm" : "ready",
      title: "市集目标",
      label: reason || "撮合一张快单",
      detail: reason || "让旧市集主动发现现货需求，并把包裹流转展示在地图上。",
      mapLabel: reason ? "候单" : "撮合",
      progress: floorStockRatio(floor),
      action: reason ? "" : "market-deal",
      actionLabel: "撮合",
    });
  }
  if (floor.type === "kingdom") {
    const target = bestRoyalMandateOrder(state);
    const reason = royalMandateActionBlockReason(floor, target);
    return makeFloorObjective(floor, {
      tone: reason ? "calm" : "ready",
      title: "王国目标",
      label: reason || "签发王令补足缺口",
      detail: reason || `优先支援 ${FLOOR_TYPES[target.type].label} 订单，让王国旧玩法更像调度中心。`,
      mapLabel: reason ? "候令" : "王令",
      progress: floorStockRatio(floor),
      action: reason ? "" : "royal-mandate",
      actionLabel: "签发",
    });
  }
  if (floor.type === "library") {
    let reason = "";
    if (!floor.workers?.length) reason = "书库需要馆员整理典藏";
    else if ((floor.stock || 0) <= 0) reason = "书库卷宗不足，先补货";
    else if ((floor.libraryCooldown || 0) > 0) reason = `馆员还在编目：${Math.ceil(floor.libraryCooldown)}s`;
    const next = nextCollectionItem(state);
    return makeFloorObjective(floor, {
      tone: reason ? "calm" : "ready",
      title: "书库目标",
      label: reason || (next ? `整理典藏：下枚 ${next.name}` : "整理典藏换取宝石"),
      detail: reason || "让旧书库更明确地服务珍藏图鉴、探险碎片和典藏订单。",
      mapLabel: reason ? "候卷" : "典藏",
      progress: collectionProgress(state).completed / Math.max(1, COLLECTION_DEFS.length),
      action: reason ? "" : "library-study",
      actionLabel: "整理",
    });
  }
  if (isShowtimeFloorType(floor.type)) {
    const reason = showtimeActionBlockReason(floor);
    return makeFloorObjective(floor, {
      tone: reason ? "calm" : "ready",
      title: "演艺目标",
      label: reason || "排演常驻小剧",
      detail: reason || "用清楚的段落和热度反馈强化旧演艺房间。",
      mapLabel: reason ? "候场" : "排演",
      progress: floorStockRatio(floor),
      action: reason ? "" : "entertainment-show",
      actionLabel: "排演",
    });
  }
  if (isComfortFloorType(floor.type)) {
    const reason = comfortActionBlockReason(floor);
    return makeFloorObjective(floor, {
      tone: reason ? "calm" : "ready",
      title: "休整目标",
      label: reason || `${COMFORT_SESSION_ACTIONS[floor.type] || "组织休整"}`,
      detail: reason || "把花园、温泉等旧休整房间变成可见的恢复节奏。",
      mapLabel: reason ? "候息" : "休整",
      progress: floorStockRatio(floor),
      action: reason ? "" : "comfort-session",
      actionLabel: COMFORT_SESSION_ACTIONS[floor.type] || "休整",
    });
  }
  return null;
}

function floorObjective(floor) {
  if (!floor) return null;
  if (floor.status === "construction") {
    const progress = 1 - Number(floor.buildRemaining || 0) / Math.max(1, Number(floor.buildTotal) || 1);
    return makeFloorObjective(floor, {
      tone: "build",
      title: "施工目标",
      label: `施工 ${Math.round(clamp(progress, 0, 1) * 100)}%`,
      detail: `剩余 ${Math.ceil(floor.buildRemaining || 0)} 秒，完工后会加入地图目标系统。`,
      mapLabel: "施工",
      progress,
      action: "speed",
      actionLabel: "加速",
      disabled: state.gems <= 0,
    });
  }
  if (floor.type === "lobby") {
    const pressure = lobbyPressureInfo(state);
    const best = bestLobbyVisitor(state);
    const route = best ? visitorRouteInfo(best, state) : null;
    const hasPassenger = Boolean(state.elevator?.passenger);
    return makeFloorObjective(floor, {
      tone: pressure.tone === "urgent" ? "warn" : state.queue.length ? "ready" : "calm",
      title: "大厅目标",
      label: route ? `推荐 ${route.floorLabel} ${route.floorName}` : "保持入口节奏",
      detail: route ? `${best.title} · ${route.text}` : pressure.text,
      mapLabel: state.queue.length ? "派号" : "待客",
      progress: pressure.percent / 100,
      action: "dispatch-lobby",
      actionLabel: "派号",
      disabled: !state.queue.length || hasPassenger,
    });
  }
  if (floor.type === "dwelling") {
    const waymarks = expeditionWaymarksForFloor(floor);
    if (waymarks.length) {
      const first = waymarks[0];
      return makeFloorObjective(floor, {
        tone: "running",
        title: "公寓目标",
        label: `探险${first.mark.label} ${Math.round(first.progress * 100)}%`,
        detail: first.mark.text,
        mapLabel: "探险",
        progress: first.progress,
      });
    }
    const pendingReviews = pendingLifeStoryReviewsForFloor(floor);
    if (pendingReviews.length) {
      const story = pendingReviews[0];
      return makeFloorObjective(floor, {
        tone: "ready",
        title: "公寓目标",
        label: `生活足迹待回访 ${pendingReviews.length}`,
        detail: story.detail || "整理居民生活足迹，补强公寓租金和人物关系。",
        mapLabel: "回访",
        progress: Math.min(1, pendingReviews.length / 4),
        action: "review-life-story",
        actionLabel: "回访",
        storyId: story.id,
      });
    }
    if ((floor.rentReady || 0) > 0) {
      return makeFloorObjective(floor, {
        tone: "ready",
        title: "公寓目标",
        label: `收取 ${floor.rentReady} 金币租金`,
        detail: "旧公寓的生活收益已经结算，可以手动领取。",
        mapLabel: "收租",
        progress: Math.min(1, (floor.rentReady || 0) / 180),
        action: "collect-rent",
        actionLabel: "收租",
      });
    }
    const idle = dwellingIdleResidents(floor);
    if (idle.length && state.expeditions.length < expeditionCapacity(state)) {
      return makeFloorObjective(floor, {
        tone: "ready",
        title: "公寓目标",
        label: "派出空闲居民探险",
        detail: "公寓会记录远行整备，把旧居住玩法和地底探险连起来。",
        mapLabel: "远行",
        progress: idle.length / Math.max(1, floor.residents.length || 1),
        action: "start-dwelling-expedition",
        actionLabel: "探险",
      });
    }
    return makeFloorObjective(floor, {
      tone: getVacancy(floor) ? "calm" : "ready",
      title: "公寓目标",
      label: getVacancy(floor) ? `空房 ${getVacancy(floor)} 间` : "住户已满",
      detail: getVacancy(floor) ? "等待大厅派来的新居民入住。" : "可升级公寓，继续扩充居住容量。",
      mapLabel: getVacancy(floor) ? "空房" : "满员",
      progress: floor.residents.length / Math.max(1, floor.capacity || 1),
      action: getVacancy(floor) ? "" : "upgrade-floor",
      actionLabel: getVacancy(floor) ? "" : "升级",
    });
  }
  if (!isBusiness(floor)) return null;
  const active = activeFloorEventObjective(floor);
  if (active) return active;
  if (floor.production) {
    const progress = 1 - Number(floor.production.remaining || 0) / Math.max(1, Number(floor.production.total) || 1);
    return makeFloorObjective(floor, {
      tone: "running",
      title: "补货目标",
      label: `补货 ${Math.ceil(floor.production.remaining || 0)}s`,
      detail: "货架正在恢复，完成后会刷新经营节奏。",
      mapLabel: "补货",
      progress,
      action: "speed",
      actionLabel: "加速",
      disabled: state.gems <= 0,
    });
  }
  if (!floor.workers?.length) {
    return makeFloorObjective(floor, {
      tone: "warn",
      title: "房间目标",
      label: "先安排员工",
      detail: idleResidentCount(state) ? "有空闲居民可直接派到这个房间。" : "没有空闲居民，先接待访客入住公寓。",
      mapLabel: "雇佣",
      progress: 0,
      action: "hire",
      actionLabel: "雇佣",
      disabled: idleResidentCount(state) <= 0,
    });
  }
  if ((floor.stock || 0) <= 0) {
    return makeFloorObjective(floor, {
      tone: "warn",
      title: "房间目标",
      label: "库存见底",
      detail: "旧房间缺货时会中断订单、事件和访客收益，建议优先补货。",
      mapLabel: "缺货",
      progress: 0,
      action: "stock",
      actionLabel: "补货",
    });
  }
  const eventObjective = readyFloorEventObjective(floor);
  if (eventObjective && (eventObjective.tone === "ready" || eventObjective.action)) return eventObjective;
  if (floorStockRatio(floor) <= 0.36) {
    return makeFloorObjective(floor, {
      tone: "ready",
      title: "房间目标",
      label: "库存偏低，补货更稳",
      detail: "提前补货可以避免旧玩法事件启动时被库存卡住。",
      mapLabel: "补货",
      progress: floorStockRatio(floor),
      action: "stock",
      actionLabel: "补货",
    });
  }
  if ((floor.workers || []).length < 3 && idleResidentCount(state) > 0) {
    return makeFloorObjective(floor, {
      tone: "ready",
      title: "房间目标",
      label: "补齐员工位",
      detail: "更多员工会提高补货速度、事件产出和订单效率。",
      mapLabel: "雇佣",
      progress: (floor.workers || []).length / 3,
      action: "hire",
      actionLabel: "雇佣",
    });
  }
  return eventObjective || makeFloorObjective(floor, {
    tone: "calm",
    title: "房间目标",
    label: `${FLOOR_TYPES[floor.type]?.label || "房间"}运转稳定`,
    detail: "可以继续升级、扩建，或等待新的居民需求触发房间事件。",
    mapLabel: "稳定",
    progress: floorStockRatio(floor),
    action: "upgrade-floor",
    actionLabel: "升级",
  });
}

function floorObjectiveMapKey(floor) {
  const objective = floorObjective(floor);
  if (!objective) return "";
  return [
    objective.tone,
    objective.mapLabel,
    objective.action,
    objective.disabled ? 1 : 0,
    Math.round(objective.progress * 100),
  ].join(":");
}

function renderRoomObjectiveCue(floor) {
  const objective = floorObjective(floor);
  if (!objective || objective.tone === "calm") return "";
  const label = objective.mapLabel || objective.actionLabel || objective.label;
  return `
    <span class="room-objective-cue" data-tone="${escapeAttr(objective.tone)}" style="--objective:${Math.round(objective.progress * 100)}%" title="${escapeAttr(`${objective.title}：${objective.label}`)}" aria-label="${escapeAttr(`${objective.title}：${objective.label}`)}">
      <i aria-hidden="true"></i>
      <b>${escapeHtml(label)}</b>
    </span>`;
}

function renderFloorObjectivePanel(floor) {
  const objective = floorObjective(floor);
  if (!objective) return "";
  const disabled = objective.disabled ? "disabled" : "";
  const actionButton = objective.action
    ? `<button class="floor-objective-action detail-btn primary" type="button" data-action="${escapeAttr(objective.action)}" data-floor-id="${escapeAttr(objective.floorId)}"${objective.storyId ? ` data-story-id="${escapeAttr(objective.storyId)}"` : ""}${objective.direction ? ` data-direction="${escapeAttr(objective.direction)}"` : ""} ${disabled}>${escapeHtml(objective.actionLabel || "执行")}</button>`
    : "";
  return `
    <div class="floor-objective-panel" data-tone="${escapeAttr(objective.tone)}">
      <div class="floor-objective-head">
        <strong>${escapeHtml(objective.title)}</strong>
        <span>${escapeHtml(objective.label)}</span>
      </div>
      <div class="floor-objective-meter" aria-hidden="true"><i style="width:${Math.round(objective.progress * 100)}%"></i></div>
      <div class="floor-objective-copy">
        <small>${escapeHtml(objective.detail)}</small>
        ${actionButton}
      </div>
    </div>`;
}

function injectFloorObjectivePanel() {
  if (!els.floorDetail) return;
  const floor = findFloor(state.selectedFloorId) || state.floors[0];
  const html = renderFloorObjectivePanel(floor);
  els.floorDetail.querySelector(".floor-objective-panel")?.remove();
  if (!html) return;
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  const node = template.content.firstElementChild;
  if (!node) return;
  const intro = els.floorDetail.querySelector(":scope > p");
  if (intro) {
    intro.insertAdjacentElement("afterend", node);
    return;
  }
  const anchor = els.floorDetail.querySelector(":scope > strong");
  if (anchor?.nextSibling) {
    anchor.parentNode.insertBefore(node, anchor.nextSibling);
  } else {
    els.floorDetail.prepend(node);
  }
}

function renderFloorIndex(floorOrId) {
  const floor = typeof floorOrId === "object" ? floorOrId : null;
  const id = floor ? floor.id : floorOrId;
  const zone = floor ? getFloorZone(floor) : id < 0 ? "sky" : id === 0 ? "ground" : "depth";
  return `
    <div class="floor-index" data-zone="${zone}" aria-label="${formatFloorLabel(id)}">
      <strong>${Math.abs(id)}</strong>
    </div>`;
}

function renderOpenFloor(floor) {
  return `
    <div class="room-atmosphere" aria-hidden="true">
      <span class="room-beam"></span>
      <span class="arch arch-a"></span>
      <span class="arch arch-b"></span>
      <span class="glow-pod pod-a"></span>
      <span class="glow-pod pod-b"></span>
      <span class="room-banner banner-a"></span>
      <span class="room-banner banner-b"></span>
      <span class="vine vine-a"></span>
      <span class="vine vine-b"></span>
    </div>
    <div class="room-content">
      <div class="room-head">
        <div class="room-title">
          <span class="type-token">${floor.type === "lobby" ? ICONS.lobby : FLOOR_TYPES[floor.type].icon}</span>
        </div>
        ${renderFloorBadge(floor)}
      </div>
      <div class="room-scene">
        ${renderRoomStateTag(floor)}
        ${renderRoomObjectiveCue(floor)}
        ${renderKingdomDispatchLayer(floor)}
        ${renderFoodRushServiceLayer(floor)}
        ${renderServiceCareLayer(floor)}
        ${renderStarChartLayer(floor)}
        ${renderToolTuneLayer(floor)}
        ${floor.type === "lobby" ? renderLobbyRouteLayer() : ""}
        ${renderLifeTrailLayer(floor)}
        ${renderExpeditionWaymarkLayer(floor)}
        ${renderComfortAfterglowLayer(floor)}
        ${renderRoyalCourierLayer(floor)}
        ${renderFloorArrivals(floor)}
        ${floor.type === "lobby" ? renderLobbyQueue() : renderFloorPeople(floor)}
        ${renderFixture(floor)}
      </div>
      ${renderRoomPips(floor)}
      <div class="room-foot">
        ${renderFloorMeter(floor)}
        ${renderFloorStatusGlyph(floor)}
      </div>
    </div>
    ${renderRoomSideCard(floor)}
    <div class="room-ledge" aria-hidden="true"><span></span><span></span></div>
    ${renderMapSign(floor)}`;
}

function renderConstruction(floor) {
  const progress = 1 - floor.buildRemaining / floor.buildTotal;
  const isSky = floor.direction === "up" || floor.id < 0;
  return `
    <div class="room-atmosphere" aria-hidden="true">
      <span class="room-beam"></span>
      <span class="arch arch-a"></span>
      <span class="glow-pod pod-a"></span>
      <span class="room-banner banner-a"></span>
      <span class="vine vine-b"></span>
    </div>
    <div class="room-content">
      <div class="room-head">
        <div class="room-title">
          <span class="type-token">${FLOOR_TYPES[floor.type].icon}</span>
        </div>
        <span class="badge">${Math.ceil(floor.buildRemaining)}s</span>
      </div>
      <div class="construction-frame">
        <span class="hammer">${ICONS.craft}</span>
        <span class="construction-pulse" aria-hidden="true"></span>
      </div>
      <div class="room-foot">
        <div class="meter"><span style="width:${clamp(progress * 100, 0, 100)}%"></span></div>
        <span class="status-glyph" data-state="build" title="建设中" aria-label="建设中"></span>
      </div>
    </div>
    <div class="room-ledge" aria-hidden="true"><span></span><span></span></div>
    <div class="hanging-sign map-sign" title="${isSky ? "塔楼施工中" : "地底施工中"}" aria-hidden="true"></div>`;
}

function renderMapSign(floor) {
  return `<div class="hanging-sign map-sign" title="${escapeAttr(floor.name)}" aria-hidden="true"></div>`;
}

function renderFloorBadge(floor) {
  if (floor.type === "lobby") return `<span class="badge" title="等候访客" aria-label="等候访客 ${state.queue.length}">${state.queue.length}</span>`;
  if (floor.type === "dwelling") return `<span class="badge">${floor.residents.length}/${floor.capacity}</span>`;
  if (isBusiness(floor)) return `<span class="badge">${floor.stock}/${floor.stockMax}</span>`;
  return "";
}

function renderLobbyQueue() {
  if (!state.queue.length) return `<div class="lobby-queue empty" aria-hidden="true"></div>`;
  const recommended = bestLobbyVisitor(state);
  return `
    <div class="lobby-queue">
      ${state.queue
        .map((visitor) => {
          const route = visitorRouteInfo(visitor, state);
          const recommendClass = recommended?.id === visitor.id ? "recommended" : "";
          const title = `${visitor.title} · ${route.floorLabel} ${route.floorName} · ${route.text}`;
          return renderPersonButton(visitor, "visitor", "lobby", {
            extraClass: `${visitor.kind === "vip" ? "vip" : ""} ${recommendClass} route-${route.tone} wait-${lobbyWaitTier(visitor)}`,
            action: "board",
            actionId: visitor.id,
            title,
            wish: visitor.wish,
          });
        })
        .join("")}
    </div>`;
}

function renderLobbyRouteLayer() {
  const pressure = lobbyPressureInfo(state);
  const ranked = lobbyRankedVisitors(state).slice(0, 3);
  const signals = ranked
    .map(({ visitor, route }, index) => {
      const waitTier = lobbyWaitTier(visitor);
      return `
        <span class="lobby-route-signal route-${escapeAttr(route.tone)} wait-${escapeAttr(waitTier)}" style="--route-lane:${index}" title="${escapeAttr(`${visitor.title} → ${route.floorLabel} ${route.floorName} · ${route.text}`)}">
          <i></i><b>${escapeHtml(route.floorLabel)}</b>
        </span>`;
    })
    .join("");
  return `
    <div class="lobby-route-layer" data-pressure="${escapeAttr(pressure.tone)}" aria-hidden="true">
      <span class="lobby-pressure-gate" style="--pressure:${pressure.percent}%"><i></i></span>
      ${signals}
    </div>`;
}

function renderLobbyRouteBoard() {
  const queue = state.queue || [];
  const pressure = lobbyPressureInfo(state);
  if (!queue.length) return `<div class="lobby-route-board empty"><span>大厅空闲，下一位访客正在路上。</span></div>`;
  const recommended = bestLobbyVisitor(state);
  return `
    <div class="lobby-route-board">
      <div class="lobby-route-summary" data-pressure="${escapeAttr(pressure.tone)}">
        <strong>${escapeHtml(pressure.label)}</strong>
        <span>${escapeHtml(pressure.text)}</span>
        <i style="--pressure:${pressure.percent}%"></i>
      </div>
      ${lobbyRankedVisitors(state)
        .map(({ visitor, route }, index) => {
          const active = recommended?.id === visitor.id ? "active" : "";
          const waitTier = lobbyWaitTier(visitor);
          const tags = [
            active ? "推荐" : "",
            route.tone === "vip" ? "贵宾" : "",
            waitTier === "urgent" ? "久候" : waitTier === "waiting" ? "等候" : "",
            index === 0 && isPriorityLobbyDispatch(visitor, state) ? "优先" : "",
          ].filter(Boolean);
          return `
            <button class="route-ticket ${active} route-${route.tone} wait-${waitTier}" data-action="board" data-visitor-id="${visitor.id}" title="${escapeAttr(`${visitor.title} → ${route.floorLabel} ${route.floorName} · ${route.text}`)}">
              <b>${escapeHtml(route.floorLabel)}</b>
              <span>${escapeHtml(visitor.title)} · ${escapeHtml(route.floorName)}</span>
              <small>${escapeHtml(route.text)}</small>
              ${tags.length ? `<em>${tags.map((tag) => `<i>${escapeHtml(tag)}</i>`).join("")}</em>` : ""}
              <i class="need-badge" data-need="${escapeAttr(visitor.need || "social")}" aria-hidden="true"></i>
            </button>`;
        })
        .join("")}
    </div>`;
}

function renderKingdomDispatchLayer(floor) {
  if (floor?.type !== "kingdom" || !(state.orders || []).length) return "";
  const summary = orderDispatchSummary(availableRoyalMandateFloor());
  const ledgers = summary.dispatches.slice(0, 5).map((dispatch, index) => {
    const width = Math.max(12, Math.round(dispatch.segments.filledPct));
    return `<b data-tone="${escapeAttr(dispatch.tone)}" style="--ledger-index:${index}; --ledger-fill:${width}%"><i></i></b>`;
  }).join("");
  const title = summary.best
    ? `${summary.best.nextLabel} · ${summary.best.order.title} · ${summary.best.detail}`
    : "王室订单调度桌";
  return `
    <span class="kingdom-dispatch-layer" data-tone="${escapeAttr(summary.tone)}" style="--dispatch-progress:${Math.round(summary.progress)}%" title="${escapeAttr(title)}" aria-label="${escapeAttr(title)}">
      <span class="kingdom-dispatch-desk"><i></i><em></em></span>
      <span class="kingdom-dispatch-ledgers">${ledgers}</span>
      <span class="kingdom-dispatch-route"><i></i><b></b></span>
    </span>`;
}

function renderFloorArrivals(floor) {
  const arrivals = (state.arrivals || []).filter((arrival) => arrival.floorId === floor.id);
  if (!arrivals.length) return "";
  return `
    <div class="floor-arrivals" aria-hidden="true">
      ${arrivals
        .map(
          (arrival) => `
        <span class="floor-arrival floor-arrival--${arrival.side} person-sprite person-sprite--${arrival.variant} ${arrival.correct ? "correct" : "lost"}"
          style="--person-art:url('${arrival.art}');--arrival-duration:${arrival.duration}s"
          title="${escapeAttr(arrival.title)}"></span>`
        )
        .join("")}
    </div>`;
}

function renderFloorPeople(floor) {
  if (floor.type === "dwelling") {
    const residents = floorPeopleForLife(floor);
    return `
      <div class="resident-row life-stage">
        ${renderPeopleCluster(residents, "resident-dot", floor.type, "away")}
      </div>`;
  }
  const workers = floorPeopleForLife(floor);
  return `
    <div class="worker-row life-stage">
      ${renderPeopleCluster(workers, "resident-dot", floor.type, "staff")}
    </div>`;
}

function renderFixture(floor) {
  const extras = {
    lobby: `<i class="fixture-carpet"></i><i class="fixture-throne"></i><i class="fixture-banner"></i>`,
    food: `<i class="fixture-lamp lamp-left"></i><i class="fixture-lamp lamp-right"></i><i class="fixture-dish"></i><i class="fixture-menu-board"></i>`,
    dwelling: `<i class="fixture-curtain"></i><i class="fixture-bed"></i><i class="fixture-nightstand"></i>`,
    service: `<i class="fixture-plant"></i><i class="fixture-counter"></i>`,
    craft: `<i class="fixture-anvil"></i><i class="fixture-sparks"></i>`,
    market: `<i class="fixture-menu-board"></i><i class="fixture-counter"></i><i class="fixture-gem-pile"></i>`,
    kingdom: `<i class="fixture-carpet"></i><i class="fixture-throne"></i><i class="fixture-banner"></i>`,
    library: `<i class="fixture-lamp lamp-left"></i><i class="fixture-vial"></i><i class="fixture-charms"></i>`,
    garden: `<i class="fixture-plant"></i><i class="fixture-charms"></i><i class="fixture-lamp lamp-right"></i>`,
    clinic: `<i class="fixture-vial"></i><i class="fixture-plant"></i><i class="fixture-lamp lamp-left"></i>`,
    clockwork: `<i class="fixture-anvil"></i><i class="fixture-sparks"></i><i class="fixture-lamp lamp-right"></i>`,
    aquarium: `<i class="fixture-bubbles"></i><i class="fixture-charms"></i><i class="fixture-lamp lamp-left"></i>`,
    skyport: `<i class="fixture-lamp lamp-left"></i><i class="fixture-banner banner-a"></i><i class="fixture-charms"></i>`,
    festival: `<i class="fixture-charms"></i><i class="fixture-stage"></i><i class="fixture-spotlight"></i><i class="fixture-lamp lamp-right"></i>`,
    treasure: `<i class="fixture-statue"></i><i class="fixture-crown"></i><i class="fixture-gem-pile"></i>`,
    entertainment: `<i class="fixture-charms"></i><i class="fixture-stage"></i><i class="fixture-spotlight"></i>`,
    alchemy: `<i class="fixture-vial"></i><i class="fixture-lamp lamp-right"></i><i class="fixture-bubbles"></i>`,
    training: `<i class="fixture-banner"></i><i class="fixture-target"></i><i class="fixture-dummy"></i>`,
  };
  const type = floor.type === "lobby" ? "lobby kingdom" : floor.type;
  return `<span class="fixture ${type}" aria-hidden="true">${extras[floor.type] || ""}</span>`;
}

function renderFoodRushServiceLayer(floor) {
  if (!isActiveFoodRush(floor)) return "";
  const rush = floor.foodRush;
  const diners = foodRushParticipants(floor);
  const pace = currentFoodRushPace(floor);
  const course = currentFoodRushCourse(floor);
  const heatTone = foodRushHeatTone(floor);
  const tableCount = foodRushTableCount(floor, diners);
  const tableFocus = clamp(Number(rush.tableFocus) || 0, 0, Math.max(0, tableCount - 1));
  const servedRatio = clamp(Number(rush.served || 0) / Math.max(1, Number(rush.targetServings) || 1), 0, 1);
  const serviceProgress = Math.round(foodRushNextServiceProgress(floor) * 100);
  const progress = Math.round(foodRushProgress(floor) * 100);
  const tables = Array.from({ length: 4 }, (_, index) => {
    const active = index < tableCount;
    const served = active && index < Math.ceil(servedRatio * tableCount);
    const focus = active && index === tableFocus;
    return `<b class="${active ? "active" : ""} ${served ? "served" : ""} ${focus ? "focus" : ""}" style="--table-index:${index}"><i></i><em></em></b>`;
  }).join("");
  const courses = FOOD_RUSH_COURSES.map((entry) => {
    const lit = progress >= Math.round(entry.threshold * 100);
    return `<i class="${lit ? "lit" : ""} ${entry.id === course.id ? "current" : ""}" data-course="${escapeAttr(entry.id)}"></i>`;
  }).join("");
  return `
    <span class="food-rush-service-layer" data-pace="${escapeAttr(pace.id)}" data-course="${escapeAttr(course.id)}" data-heat="${escapeAttr(heatTone)}" data-pulse="${rush.servicePulse > 0 ? "pulse" : "idle"}" style="--rush-progress:${progress}%; --service-progress:${serviceProgress}%; --rush-heat:${Math.round(rush.heat || 0)};" title="${escapeAttr(`${course.label} · ${tableCount}桌 · 上菜 ${rush.served || 0}/${rush.targetServings || 0}`)}" aria-label="${escapeAttr(`${course.label} · ${tableCount}桌 · 上菜 ${rush.served || 0}/${rush.targetServings || 0}`)}">
      <span class="food-rush-service-rail"><i></i><b></b></span>
      <span class="food-rush-counter-spark"><i></i><i></i><i></i></span>
      <span class="food-rush-course-stack">${courses}</span>
      <span class="food-rush-table-lane">${tables}</span>
    </span>`;
}

function renderServiceCareLayer(floor) {
  if (!isActiveServiceCare(floor)) return "";
  const care = floor.serviceCare;
  const guests = serviceCareParticipants(floor);
  const phase = currentServiceCarePhase(floor);
  const tone = serviceCareTone(floor);
  const progress = Math.round(serviceCareProgress(floor) * 100);
  const touchProgress = Math.round(clamp(Number(care.touches || 0) / Math.max(1, Number(care.targetTouches) || 1), 0, 1) * 100);
  const focus = clamp(Number(care.focusGuest) || 0, 0, Math.max(0, guests.length - 1));
  const tokens = Array.from({ length: 5 }, (_, index) => {
    const active = index < Math.min(5, Math.max(2, guests.length || 1));
    const handled = active && index < Math.ceil((touchProgress / 100) * Math.min(5, Math.max(2, guests.length || 1)));
    const current = active && index === focus % Math.min(5, Math.max(1, guests.length || 1));
    return `<b class="${active ? "active" : ""} ${handled ? "handled" : ""} ${current ? "current" : ""}" style="--care-index:${index}"><i></i></b>`;
  }).join("");
  const phases = SERVICE_CARE_PHASES.map((entry) => {
    const lit = progress >= Math.round(entry.threshold * 100);
    return `<i class="${lit ? "lit" : ""} ${entry.id === phase.id ? "current" : ""}" data-phase="${escapeAttr(entry.id)}"></i>`;
  }).join("");
  return `
    <span class="service-care-layer" data-phase="${escapeAttr(phase.id)}" data-tone="${escapeAttr(tone)}" data-pulse="${care.carePulse > 0 ? "pulse" : "idle"}" style="--care-progress:${progress}%; --touch-progress:${touchProgress}%; --care-score:${Math.round(care.care || 0)};" title="${escapeAttr(`${phase.label} · 照看 ${care.touches || 0}/${care.targetTouches || 0}`)}" aria-label="${escapeAttr(`${phase.label} · 照看 ${care.touches || 0}/${care.targetTouches || 0}`)}">
      <span class="service-care-ribbon"><i></i><b></b></span>
      <span class="service-care-phase-stack">${phases}</span>
      <span class="service-care-token-lane">${tokens}</span>
      <span class="service-care-bloom"><i></i><i></i><i></i></span>
    </span>`;
}

function renderStarChartLayer(floor) {
  if (!isActiveStarChart(floor)) return "";
  const chart = floor.starChart;
  const phase = currentStarChartPhase(floor);
  const tone = starChartFocusTone(floor);
  const progress = Math.round(starChartProgress(floor) * 100);
  const markProgress = Math.round(clamp(Number(chart.marks || 0) / Math.max(1, Number(chart.targetMarks) || 1), 0, 1) * 100);
  const focusStar = clamp(Number(chart.focusStar) || 0, 0, 6);
  const stars = Array.from({ length: 7 }, (_, index) => {
    const lit = index < Math.ceil((markProgress / 100) * 7);
    const current = index === focusStar;
    const left = 12 + index * 12;
    const top = 22 + (index % 3) * 16;
    return `<b class="${lit ? "lit" : ""} ${current ? "current" : ""}" style="--star-left:${left}%; --star-top:${top}%"><i></i></b>`;
  }).join("");
  const phases = STAR_CHART_PHASES.map((entry) => {
    const lit = progress >= Math.round(entry.threshold * 100);
    return `<i class="${lit ? "lit" : ""} ${entry.id === phase.id ? "current" : ""}" data-phase="${escapeAttr(entry.id)}"></i>`;
  }).join("");
  return `
    <span class="star-chart-layer" data-phase="${escapeAttr(phase.id)}" data-focus="${escapeAttr(tone)}" data-pulse="${chart.starPulse > 0 ? "pulse" : "idle"}" style="--chart-progress:${progress}%; --mark-progress:${markProgress}%; --chart-focus:${Math.round(chart.focus || 0)};" title="${escapeAttr(`${phase.label} · 星标 ${chart.marks || 0}/${chart.targetMarks || 0}`)}" aria-label="${escapeAttr(`${phase.label} · 星标 ${chart.marks || 0}/${chart.targetMarks || 0}`)}">
      <span class="star-chart-sweep"><i></i><b></b></span>
      <span class="star-chart-constellation">${stars}</span>
      <span class="star-chart-phase-stack">${phases}</span>
      <span class="star-chart-comet"><i></i></span>
    </span>`;
}

function renderRoyalCourierLayer(floor) {
  if (!isActiveRoyalMandate(floor)) return "";
  const phase = currentRoyalCourierPhase(floor);
  const progress = Math.round(royalCourierProgress(floor) * 100);
  const order = state.orders.find((entry) => entry.id === floor.royalMandate.orderId);
  const routeLabel = floor.royalMandate.routeLabel || royalCourierRouteLabel(floor, order);
  return `
    <span class="royal-courier-route" data-phase="${escapeAttr(phase.id)}" style="--courier-progress:${progress}%" title="${escapeAttr(`${phase.label} · ${routeLabel}`)}" aria-label="${escapeAttr(`${phase.label} · ${routeLabel}`)}">
      <i></i>
      <b></b>
      <em></em>
    </span>`;
}

function renderComfortAfterglowLayer(floor) {
  if (!isActiveComfortAfterglow(floor)) return "";
  const glow = floor.comfortAfterglow;
  const progress = Math.round((Number(glow.remaining) / Math.max(1, Number(glow.total) || 1)) * 100);
  const count = clamp((glow.participantIds || []).length || 1, 1, 5);
  const focus = comfortFocusTone(glow);
  const focusLabel = comfortFocusLabel(glow);
  return `
    <span class="comfort-afterglow-layer" data-type="${escapeAttr(glow.type)}" style="--comfort-echo:${progress}%" title="${escapeAttr(`${glow.label} · ${Math.ceil(glow.remaining)}s`)}" aria-label="${escapeAttr(`${glow.label} · ${Math.ceil(glow.remaining)}s`)}">
      <i></i>
      ${Array.from({ length: count }, (_, index) => `<b style="--echo-left:${14 + index * 17}%; --echo-lift:${index % 2 ? 8 : 0}px"></b>`).join("")}
      <em aria-hidden="true"><span></span><span></span><span></span></em>
    </span>`;
}

function renderRoomStateTag(floor) {
  if ((state.arrivals || []).some((arrival) => arrival.floorId === floor.id)) {
    return `<span class="room-state-tag good icon-only" data-state="arrival" title="到站" aria-label="到站"></span>`;
  }
  if (isActiveComfortSession(floor)) {
    const label = COMFORT_SESSION_LABELS[floor.type] || "休整";
    return `<span class="room-state-tag good icon-only" data-state="comfort" title="${escapeAttr(label)}" aria-label="${escapeAttr(label)}"></span>`;
  }
  if (isActiveComfortAfterglow(floor)) {
    const label = floor.comfortAfterglow.label || "舒缓余韵";
    return `<span class="room-state-tag good icon-only" data-state="${floor.comfortAfterglow.focus ? "comfort-focus" : "comfort-echo"}" title="${escapeAttr(label)}" aria-label="${escapeAttr(label)}"></span>`;
  }
  if (isActiveFoodRush(floor)) {
    const label = FOOD_RUSH_LABELS[floor.type] || "餐桌高峰";
    return `<span class="room-state-tag good icon-only" data-state="meal-rush" title="${escapeAttr(label)}" aria-label="${escapeAttr(label)}"></span>`;
  }
  if (isActiveServiceCare(floor)) {
    const label = SERVICE_CARE_LABELS[floor.type] || "礼宾照看";
    return `<span class="room-state-tag good icon-only" data-state="service-care" title="${escapeAttr(label)}" aria-label="${escapeAttr(label)}"></span>`;
  }
  if (isActiveStarChart(floor)) {
    const label = STAR_CHART_LABELS[floor.type] || "星图校准";
    return `<span class="room-state-tag good icon-only" data-state="star-chart" title="${escapeAttr(label)}" aria-label="${escapeAttr(label)}"></span>`;
  }
  if (isActiveToolTune(floor)) {
    const label = TOOL_TUNE_LABELS[floor.type] || "工具校准";
    return `<span class="room-state-tag good icon-only" data-state="tool-tune" title="${escapeAttr(label)}" aria-label="${escapeAttr(label)}"></span>`;
  }
  if (isActiveMarketParcel(floor)) {
    const phase = currentMarketParcelPhase(floor);
    return `<span class="room-state-tag good icon-only" data-state="market-parcel" title="${escapeAttr(`包裹${phase.label}`)}" aria-label="${escapeAttr(`包裹${phase.label}`)}"></span>`;
  }
  if (isActiveRoyalMandate(floor)) {
    const phase = currentRoyalMandatePhase(floor);
    return `<span class="room-state-tag good icon-only" data-state="royal-mandate" title="${escapeAttr(`王令${phase.label}`)}" aria-label="${escapeAttr(`王令${phase.label}`)}"></span>`;
  }
  if (isActiveShowtime(floor)) {
    const label = SHOWTIME_LABELS[floor.type] || "小剧";
    return `<span class="room-state-tag good icon-only" data-state="showtime" title="${escapeAttr(label)}" aria-label="${escapeAttr(label)}"></span>`;
  }
  if (floor.type === "lobby") {
    return state.queue.length ? "" : `<span class="room-state-tag calm icon-only" data-state="idle" title="自然待客" aria-label="自然待客"></span>`;
  }
  if (floor.type === "dwelling") {
    const waymarks = expeditionWaymarksForFloor(floor);
    if (waymarks.length) {
      const mark = waymarks[0].mark;
      return `<span class="room-state-tag good icon-only" data-state="expedition-report" title="${escapeAttr(`探险${mark.label}`)}" aria-label="${escapeAttr(`探险${mark.label}`)}"></span>`;
    }
    const pendingReviews = pendingLifeStoryReviewsForFloor(floor);
    if (pendingReviews.length) {
      return `<span class="room-state-tag good icon-only" data-state="life-story" title="生活足迹待回访" aria-label="生活足迹待回访"></span>`;
    }
    const vacancy = getVacancy(floor);
    return vacancy
      ? `<span class="room-state-tag calm icon-only" data-state="vacancy" title="余 ${vacancy} 间" aria-label="余 ${vacancy} 间"></span>`
      : `<span class="room-state-tag good icon-only" data-state="full" title="满员" aria-label="满员"></span>`;
  }
  if (!isBusiness(floor)) return "";
  if (!floor.workers.length) return `<span class="room-state-tag warn icon-only" data-state="empty" title="空置" aria-label="空置"></span>`;
  if (floor.stock <= 0) return `<span class="room-state-tag warn icon-only" data-state="soldout" title="售罄" aria-label="售罄"></span>`;
  if (floor.production) return `<span class="room-state-tag calm icon-only" data-state="stocking" title="补货中" aria-label="补货中"></span>`;
  const stateLabels = {
    food: "热餐",
    craft: "工具",
    market: "旺市",
    library: "典藏",
    kingdom: "王令",
    garden: "花宴",
    entertainment: "掌声",
    service: "礼宾",
    observatory: "星象",
    clinic: "护理",
    clockwork: "加速",
    aquarium: "水光",
    skyport: "通航",
    festival: "开演",
    bathhouse: "温泉",
    alchemy: "秘药",
    training: "演练",
    treasure: "宝库",
  };
  if (stateLabels[floor.type]) return `<span class="room-state-tag good icon-only" data-state="${floor.type}" title="${stateLabels[floor.type]}" aria-label="${stateLabels[floor.type]}"></span>`;
  if (countDreamWorkers(floor) > 0) return `<span class="room-state-tag good icon-only" data-state="dream" title="理想岗位" aria-label="理想岗位"></span>`;
  return "";
}

function renderFloorStatusGlyph(floor) {
  const status = renderFloorStatus(floor);
  let stateName = "open";
  if (floor.type === "lobby") stateName = state.queue.length ? "queue" : "idle";
  else if (floor.type === "dwelling") stateName = expeditionWaymarksForFloor(floor).length ? "expedition-report" : pendingLifeStoryReviewsForFloor(floor).length ? "life-story" : floor.rentReady ? "rent" : "home";
  else if (isActiveComfortSession(floor)) stateName = "comfort";
  else if (isActiveComfortAfterglow(floor)) stateName = floor.comfortAfterglow.focus ? "comfort-focus" : "comfort-echo";
  else if (isActiveFoodRush(floor)) stateName = "meal-rush";
  else if (isActiveServiceCare(floor)) stateName = "service-care";
  else if (isActiveStarChart(floor)) stateName = "star-chart";
  else if (isActiveToolTune(floor)) stateName = "tool-tune";
  else if (isActiveMarketParcel(floor)) stateName = "market-parcel";
  else if (isActiveRoyalMandate(floor)) stateName = "royal-mandate";
  else if (isActiveShowtime(floor)) stateName = "showtime";
  else if (floor.production) stateName = "stocking";
  else if (floor.stock <= 0) stateName = "soldout";
  else if (!floor.workers.length) stateName = "empty";
  else stateName = floor.type;
  return `<span class="status-glyph" data-state="${stateName}" title="${escapeAttr(status)}" aria-label="${escapeAttr(status)}"></span>`;
}

function renderRoomPips(floor) {
  if (floor.type === "lobby") return renderPips(state.queue.length, VISITOR_QUEUE_MAX, "queue");
  if (floor.type === "dwelling") return renderPips(floor.residents.length, floor.capacity, "resident");
  if (isBusiness(floor)) return renderPips(floor.workers.length, 3, "worker");
  return "";
}

function renderPips(value, total, kind) {
  const count = clamp(Math.round(total || 0), 0, 8);
  if (!count) return "";
  const filled = clamp(Math.round(value || 0), 0, count);
  return `
    <div class="room-pips" data-kind="${kind}" aria-hidden="true">
      ${Array.from({ length: count }, (_, index) => `<i class="${index < filled ? "filled" : ""}"></i>`).join("")}
    </div>`;
}

function renderRoomSideCard(floor) {
  if (floor.type === "lobby") return "";
  if (floor.type === "dwelling") {
    const pct = floor.capacity ? Math.round((floor.residents.length / floor.capacity) * 100) : 0;
    return `
      <div class="room-side-card dwelling-card" aria-hidden="true">
        <span class="side-card-icon">${ICONS.dwelling}</span>
        <small>${floor.residents.length}/${floor.capacity}</small>
        <i style="height:${clamp(pct, 5, 100)}%"></i>
      </div>`;
  }
  if (!isBusiness(floor)) return "";
  const pct = floor.stockMax ? Math.round((floor.stock / floor.stockMax) * 100) : 0;
  const label = floor.production ? `${Math.ceil(floor.production.remaining)}s` : `${floor.stock}/${floor.stockMax}`;
  return `
    <div class="room-side-card" aria-hidden="true">
      <span class="side-card-icon">${FLOOR_TYPES[floor.type].icon}</span>
      <small>${label}</small>
      <i style="height:${clamp(pct, 5, 100)}%"></i>
    </div>`;
}

function renderPeopleCluster(people, className, floorType = "default", emptyState = "staff") {
  if (!people || !people.length) {
    return emptyState === "away"
      ? `<span class="map-empty-dot map-empty-dot--away" title="外出探险" aria-label="外出探险"></span>`
      : `<span class="map-empty-dot map-empty-dot--staff" title="未雇佣" aria-label="未雇佣"></span>`;
  }
  const seen = new Set();
  return people
    .map((person) => {
      if (!person || seen.has(person.id)) return "";
      if (person.socialPartnerId) {
        const partner = people.find((candidate) => candidate.id === person.socialPartnerId);
        if (partner && !seen.has(partner.id)) {
          seen.add(person.id);
          seen.add(partner.id);
          return renderSocialPair(person, partner, className, floorType);
        }
      }
      seen.add(person.id);
      return renderPersonDot(person, className, floorType);
    })
    .join("");
}

function renderSocialPair(left, right, className, floorType = "default") {
  const scene = left.socialLabel || right.socialLabel || "互动";
  const sceneClass = left.socialScene || "chat";
  const phase = left.socialPhase || right.socialPhase || "engage";
  const title = `${scene} / ${relationshipLabel(left, right)}`;
  return `
    <span class="social-pair social-pair--${escapeAttr(sceneClass)} social-pair-floor-${escapeAttr(floorType)}" data-phase="${escapeAttr(phase)}" data-need="${escapeAttr(left.need || right.need || "social")}" style="${socialPairStyle(left, right)}" title="${escapeAttr(title)}">
      ${renderPersonDot(left, className, floorType, "left")}
      ${renderPersonDot(right, className, floorType, "right")}
      <span class="social-focus" aria-hidden="true"></span>
      <span class="social-bubble" data-need="${escapeAttr(left.need || "social")}" aria-hidden="true"></span>
    </span>`;
}

function renderPersonButton(person, className, floorType = "default", options = {}) {
  const routeClass = options.extraClass || "";
  const title = [options.title || person.title || "", personLifeSummary(person, floorType)].filter(Boolean).join(" / ");
  return `
    <button class="${className} ${routeClass} person-sprite person-sprite--${spriteVariantForPerson(person)} ${personActivityClass(person, floorType)}" data-action="${options.action || "board"}" ${options.actionId ? `data-visitor-id="${options.actionId}"` : ""} style="${personActivityStyle(person)}" title="${escapeAttr(title)}">
      ${options.wish ? `<span class="wish">${escapeHtml(options.wish)}</span>` : ""}
      <span class="route-dot" aria-hidden="true"></span>
      <span class="need-badge" data-need="${escapeAttr(person.need || "social")}" aria-hidden="true"></span>
    </button>`;
}

function renderPersonDot(person, className, floorType = "default", socialSide = "") {
  if (!person) return "";
  ensurePersonLife(person);
  const unemployed = !person.workFloorId && !person.expeditionId && className === "resident-dot" ? "unemployed" : "";
  const exploring = person.expeditionId ? "exploring" : "";
  const visiting = isActiveLifeVisit(person) ? "life-visitor" : "";
  const companion = visiting && person.lifeVisit?.companionId ? "life-companion" : "";
  const comfortMemory = person.comfortMemory ? "comfort-memory-person" : "";
  const mood = person.lifeMood || personMotiveMood(person);
  const label = `${person.name} / 理想 ${FLOOR_TYPES[person.dreamType]?.label || "岗位"} / ${personLifeSummary(person, floorType)}`;
  return `<span class="${className} person-sprite person-sprite--${spriteVariantForPerson(person)} ${personActivityClass(person, floorType)} person-mood--${escapeAttr(mood)} ${socialSide ? `social-${socialSide}` : ""} ${unemployed} ${exploring} ${visiting} ${companion} ${comfortMemory}" style="${personActivityStyle(person)}" title="${escapeAttr(label)}"><span class="need-badge" data-need="${escapeAttr(person.need || "social")}" data-urgency="${escapeAttr(motiveLevel(100 - personNeedUrgency(person, person.need) * 100))}" aria-hidden="true"></span></span>`;
}

function spriteVariantForPerson(person) {
  if (!person) return "resident";
  if (person.kind === "vip") return "vip";
  if (person.kind === "shopper") return "shopper";
  const dreamType = person.dreamType || person.resident?.dreamType || person.dream || "worker";
  if (dreamType === "entertainment" || dreamType === "festival") return "performer";
  if (dreamType === "alchemy" || dreamType === "kingdom" || dreamType === "library" || dreamType === "observatory") return "mage";
  if (dreamType === "training" || dreamType === "treasure") return "knight";
  if (dreamType === "clinic") return "healer";
  if (dreamType === "clockwork") return "engineer";
  if (dreamType === "skyport") return "skyfarer";
  if (dreamType === "food" || dreamType === "service" || dreamType === "craft" || dreamType === "market" || dreamType === "garden" || dreamType === "bathhouse" || dreamType === "aquarium") return "worker";
  return "resident";
}

function spriteArtForPerson(person) {
  return PERSON_ART[spriteVariantForPerson(person)] || PERSON_ART.resident;
}

function personLifeSummary(person, floorType = "default") {
  if (!person || typeof person !== "object") return "";
  ensurePersonLife(person);
  const expedition = activeExpeditionForPerson(person);
  if (expedition) {
    const mark = expeditionCurrentWaymark(expedition);
    return `探险中 · ${expedition.title} · ${mark.label} ${Math.round(expeditionProgress(expedition) * 100)}% · 剩余 ${Math.ceil(expedition.remaining)}s`;
  }
  if (isActiveLifeVisit(person)) {
    const visit = person.lifeVisit;
    const liveLabel = PERSON_NEED_LABELS[visit.need] || "生活";
    const floorLabel = FLOOR_TYPES[visit.floorType]?.label || "外出";
    const companion = visit.companionId ? getResident(Number(visit.companionId)) : null;
    const companionText = companion ? ` · 同行 ${companion.name}` : "";
    const motives = PERSON_MOTIVE_KEYS.map((key) => `${PERSON_NEED_LABELS[key]} ${Math.round(person.motives[key] || 0)}`).join(" / ");
    const friend = bestRelationshipLabel(person);
    return `${visit.label || lifeVisitLabel(visit.need)} · ${floorLabel}${companionText} · ${liveLabel}优先 · ${motives}${friend ? ` · ${friend}` : ""}`;
  }
  const need = person.need || dominantNeedForPerson(person, floorType);
  const label = PERSON_NEED_LABELS[need] || "生活";
  const wish = person.lifeWish || personLifeWish(person, floorType);
  const motives = PERSON_MOTIVE_KEYS.map((key) => `${PERSON_NEED_LABELS[key]} ${Math.round(person.motives[key] || 0)}`).join(" / ");
  const friend = bestRelationshipLabel(person);
  const comfort = person.comfortMemory ? ` · ${person.comfortMemory.label || "舒缓余韵"}剩余 ${Math.ceil(person.comfortMemory.remaining || 0)}s` : "";
  return `${wish} · ${label}优先 · ${motives}${friend ? ` · ${friend}` : ""}${comfort}`;
}

function renderMotiveStrip(person, floorType = "default") {
  if (!person || typeof person !== "object") return "";
  ensurePersonLife(person);
  return `
    <span class="motive-strip" title="${escapeAttr(personLifeSummary(person, floorType))}">
      ${PERSON_MOTIVE_KEYS.map((key) => {
        const value = clamp(Number(person.motives[key] || 0), 0, 100);
        return `<i data-need="${escapeAttr(key)}" data-level="${motiveLevel(value)}" style="--motive:${value}%"></i>`;
      }).join("")}
    </span>`;
}

function motiveLevel(value) {
  if (value < 30) return "low";
  if (value < 55) return "mid";
  return "ok";
}

function relationshipLabel(left, right) {
  const score = relationshipScore(left, right);
  if (score >= 65) return "熟络伙伴";
  if (score >= 35) return "熟人互动";
  if (score > 0) return "刚认识";
  return "初次互动";
}

function bestRelationshipLabel(person) {
  ensurePersonLife(person);
  const best = Object.entries(person.relationships || {})
    .map(([id, entry]) => ({ id, ...normalizeRelationshipEntry(entry) }))
    .filter((entry) => entry.score >= 18)
    .sort((a, b) => b.score - a.score)[0];
  if (!best) return "";
  const friend = getResident(Number(best.id));
  const name = friend?.name || "熟人";
  return `常找 ${name}`;
}

function renderFloorMeter(floor) {
  if (floor.type === "lobby") {
    return `<div class="meter"><span style="width:${Math.min(100, state.queue.length * (100 / VISITOR_QUEUE_MAX))}%"></span></div>`;
  }
  if (floor.type === "dwelling") {
    const ratio = floor.capacity ? floor.residents.length / floor.capacity : 0;
    return `<div class="meter"><span style="width:${Math.round(ratio * 100)}%"></span></div>`;
  }
  if (isActiveFoodRush(floor)) {
    const progress = foodRushProgress(floor);
    return `<div class="meter food-rush-inline-meter"><span style="width:${Math.round(progress * 100)}%"></span></div>`;
  }
  if (isActiveServiceCare(floor)) {
    const progress = serviceCareProgress(floor);
    return `<div class="meter service-care-inline-meter"><span style="width:${Math.round(progress * 100)}%"></span></div>`;
  }
  if (isActiveStarChart(floor)) {
    const progress = starChartProgress(floor);
    return `<div class="meter star-chart-inline-meter"><span style="width:${Math.round(progress * 100)}%"></span></div>`;
  }
  if (isActiveToolTune(floor)) {
    const progress = toolTuneProgress(floor);
    return `<div class="meter tool-tune-inline-meter"><span style="width:${Math.round(progress * 100)}%"></span></div>`;
  }
  if (floor.production) {
    const progress = 1 - floor.production.remaining / floor.production.total;
    return `<div class="meter"><span style="width:${clamp(progress * 100, 0, 100)}%"></span></div>`;
  }
  if (isActiveRoyalMandate(floor)) {
    const progress = 1 - floor.royalMandate.remaining / Math.max(1, floor.royalMandate.total || 1);
    return `<div class="meter royal-mandate-inline-meter"><span style="width:${clamp(progress * 100, 0, 100)}%"></span></div>`;
  }
  if (isActiveMarketParcel(floor)) {
    const progress = 1 - floor.marketParcel.remaining / Math.max(1, floor.marketParcel.total || 1);
    return `<div class="meter market-parcel-inline-meter"><span style="width:${clamp(progress * 100, 0, 100)}%"></span></div>`;
  }
  const ratio = floor.stockMax ? floor.stock / floor.stockMax : 0;
  return `<div class="meter"><span style="width:${Math.round(ratio * 100)}%"></span></div>`;
}

function renderFloorStatus(floor) {
  if (floor.type === "lobby") return state.queue.length ? "待接待" : "自然待客";
  if (floor.type === "dwelling") {
    const waymarks = expeditionWaymarksForFloor(floor);
    if (waymarks.length) return `探险${waymarks[0].mark.label} ${Math.round(waymarks[0].progress * 100)}%`;
    const pendingReviews = pendingLifeStoryReviewsForFloor(floor).length;
    if (pendingReviews) return `待回访 ${pendingReviews}`;
    return floor.rentReady ? `租金 ${floor.rentReady}` : "居住";
  }
  if (isActiveComfortSession(floor)) return `${COMFORT_SESSION_LABELS[floor.type] || "休整"} ${Math.ceil(floor.comfortSession.remaining)}s`;
  if (isActiveComfortAfterglow(floor)) return `${floor.comfortAfterglow.label || "余韵"}${floor.comfortAfterglow.focus ? ` · ${comfortFocusLabel(floor.comfortAfterglow)}` : ""} ${Math.ceil(floor.comfortAfterglow.remaining)}s`;
  if (isActiveServiceCare(floor)) return `${currentServiceCarePhase(floor).label}${SERVICE_CARE_LABELS[floor.type] || "礼宾照看"} · 照看 ${floor.serviceCare.touches || 0}/${floor.serviceCare.targetTouches || 0}`;
  if (isActiveStarChart(floor)) return `${currentStarChartPhase(floor).label}${STAR_CHART_LABELS[floor.type] || "星图校准"} · 星标 ${floor.starChart.marks || 0}/${floor.starChart.targetMarks || 0}`;
  if (isActiveToolTune(floor)) return `${currentToolTunePhase(floor).label}${TOOL_TUNE_LABELS[floor.type] || "工具校准"} · 校准点 ${floor.toolTune.marks || 0}/${floor.toolTune.targetMarks || 0}`;
  if (isActiveRoyalMandate(floor)) return `${currentRoyalMandatePhase(floor).label}王令 · ${currentRoyalCourierPhase(floor).label} ${Math.ceil(floor.royalMandate.remaining)}s`;
  if (isActiveShowtime(floor)) return `${currentShowtimeBeat(floor).label}${SHOWTIME_LABELS[floor.type] || "小剧"} · 热度 ${Math.round(floor.showtime.heat || 0)}%`;
  if (floor.production) return `补货 ${Math.ceil(floor.production.remaining)}s`;
  if (floor.stock <= 0) return "缺货";
  if (!floor.workers.length) return "缺员工";
  if (floor.type === "food") return "出餐";
  if (floor.type === "craft") return "打磨";
  if (floor.type === "market") return "旺市";
  if (floor.type === "library") return "研读";
  if (floor.type === "garden") return "花宴";
  if (floor.type === "entertainment") return "演出";
  if (floor.type === "service") return "礼宾";
  if (floor.type === "observatory") return "观星";
  if (floor.type === "bathhouse") return "暖雾";
  if (floor.type === "clinic") return "护理";
  if (floor.type === "clockwork") return "运转";
  if (floor.type === "aquarium") return "水光";
  if (floor.type === "festival") return "开演";
  return "营业";
}

function renderFloorStatus(floor) {
  if (floor.type === "lobby") return state.queue.length ? "等候接待" : "自然待客";
  if (floor.type === "dwelling") {
    const waymarks = expeditionWaymarksForFloor(floor);
    if (waymarks.length) return `探险${waymarks[0].mark.label} ${Math.round(waymarks[0].progress * 100)}%`;
    const pendingReviews = pendingLifeStoryReviewsForFloor(floor).length;
    if (pendingReviews) return `待回访 ${pendingReviews}`;
    return floor.rentReady ? `租金 ${floor.rentReady}` : "居住";
  }
  if (isActiveComfortSession(floor)) return `${COMFORT_SESSION_LABELS[floor.type] || "休整"} ${Math.ceil(floor.comfortSession.remaining)}s`;
  if (isActiveComfortAfterglow(floor)) return `${floor.comfortAfterglow.label || "余韵"}${floor.comfortAfterglow.focus ? ` · ${comfortFocusLabel(floor.comfortAfterglow)}` : ""} ${Math.ceil(floor.comfortAfterglow.remaining)}s`;
  if (isActiveFoodRush(floor)) return `${currentFoodRushPace(floor).label}${FOOD_RUSH_LABELS[floor.type] || "餐桌高峰"} · 上菜 ${floor.foodRush.served || 0}/${floor.foodRush.targetServings || 0}`;
  if (isActiveServiceCare(floor)) return `${currentServiceCarePhase(floor).label}${SERVICE_CARE_LABELS[floor.type] || "礼宾照看"} · 照看 ${floor.serviceCare.touches || 0}/${floor.serviceCare.targetTouches || 0}`;
  if (isActiveStarChart(floor)) return `${currentStarChartPhase(floor).label}${STAR_CHART_LABELS[floor.type] || "星图校准"} · 星标 ${floor.starChart.marks || 0}/${floor.starChart.targetMarks || 0}`;
  if (isActiveToolTune(floor)) return `${currentToolTunePhase(floor).label}${TOOL_TUNE_LABELS[floor.type] || "工具校准"} · 校准点 ${floor.toolTune.marks || 0}/${floor.toolTune.targetMarks || 0}`;
  if (isActiveMarketParcel(floor)) return `${currentMarketParcelPhase(floor).label}包裹 · 打包 ${floor.marketParcel.packed || 0}`;
  if (isActiveRoyalMandate(floor)) return `${currentRoyalMandatePhase(floor).label}王令 · ${currentRoyalCourierPhase(floor).label} ${Math.ceil(floor.royalMandate.remaining)}s`;
  if (isActiveShowtime(floor)) return `${currentShowtimeBeat(floor).label}${SHOWTIME_LABELS[floor.type] || "小剧"} · 热度 ${Math.round(floor.showtime.heat || 0)}%`;
  if (floor.production) return `补货 ${Math.ceil(floor.production.remaining)}s`;
  if (floor.stock <= 0) return "缺货";
  if (!floor.workers.length) return "缺员工";
  if (floor.type === "food") return "出餐";
  if (floor.type === "craft") return "打磨";
  if (floor.type === "market") return "市集";
  if (floor.type === "library") return "研读";
  if (floor.type === "garden") return "花圃";
  if (floor.type === "entertainment") return "演出";
  if (floor.type === "service") return "礼宾";
  if (floor.type === "observatory") return "观星";
  if (floor.type === "bathhouse") return "暖雾";
  if (floor.type === "clinic") return "护理";
  if (floor.type === "clockwork") return "运转";
  if (floor.type === "aquarium") return "水光";
  if (floor.type === "festival") return "开演";
  return "营业";
}

function renderBuildSlot(direction = "down") {
  const isSky = direction === "up";
  const next = isSky ? state.nextSkyFloorId : state.nextFloorId;
  const title = isSky ? "向上加建摩天大楼" : "向下扩建地底楼层";
  const hint = isSky ? "云端塔楼" : "地下新室";
  return `
    <article class="floor build-slot ${isSky ? "build-up" : "build-down"}" data-type="build" data-zone="${isSky ? "sky" : "depth"}">
      ${renderFloorIndex(next)}
      <div class="room">
        <div class="build-room">
          <button class="build-slot-btn" type="button" data-action="open-build" data-direction="${direction}" aria-label="${title}" title="${title}">
            <span aria-hidden="true">+</span>
          </button>
        </div>
      </div>
    </article>`;
}

function renderElevatorPassenger() {
  const passenger = state.elevator.passenger;
  if (!passenger) return "";
  return `<span class="mini-person person-sprite person-sprite--${spriteVariantForPerson(passenger)} ${personActivityClass(passenger, "elevator")}" style="${personActivityStyle(passenger)}" title="${escapeAttr(passenger.title)}"></span>`;
}

function elevatorTripProgress() {
  const passenger = state.elevator?.passenger;
  if (!passenger) return 0;
  if (state.elevator.target === null && !(state.elevator.doorTimer > 0)) return 100;
  const target = Number(passenger.targetFloorId) || 0;
  const total = Math.max(1, Math.abs(target));
  const remaining = Math.abs(target - Number(state.elevator.position || 0));
  return clamp(((total - remaining) / total) * 100, 0, 100);
}

function updateElevatorCar() {
  const car = document.getElementById("elevatorCar");
  if (!car) return;
  const floors = [...els.kingdom.querySelectorAll(".floor:not(.build-slot)")];
  const firstFloor = floors[0];
  const floorHeight =
    floors[1] && firstFloor ? floors[1].offsetTop - firstFloor.offsetTop : (firstFloor ? firstFloor.offsetHeight + 16 : 148);
  const minId = getMinFloorId(state);
  const origin = firstFloor ? firstFloor.offsetTop : 0;
  car.style.transform = `translateY(${origin + (state.elevator.position - minId) * floorHeight + 24}px)`;
}

function renderElevatorPanel() {
  const passenger = state.elevator.passenger;
  const directLobby = elevatorIsMaxed();
  const dropBtn = document.getElementById("dropBtn");
  const upgradeBtn = document.getElementById("upgradeElevatorBtn");
  els.elevatorFloor.textContent = formatFloorLabel(state.selectedFloorId);
  if (passenger) {
    const target = findFloor(passenger.targetFloorId);
    const targetLabel = target ? `${formatFloorLabel(target.id)} ${target.name}` : formatFloorLabel(passenger.targetFloorId);
    const travelText =
      state.elevator.target !== null
        ? `电梯前往 ${formatFloorLabel(state.elevator.target)} 层中。`
        : (state.elevator.doorTimer || 0) > 0
          ? `到站开门中，约 ${Math.ceil(state.elevator.doorTimer)} 秒。`
          : "到站后可以接待。";
    els.passengerBox.innerHTML = `
      ${renderElevatorPassenger()}
      <div class="passenger-copy">
        <strong>${escapeHtml(passenger.title)} · 目标 ${escapeHtml(targetLabel)}</strong>
        <span>${travelText}</span>
        <div class="elevator-route-meter" aria-hidden="true"><i style="width:${elevatorTripProgress()}%"></i></div>
      </div>`;
  } else {
    const pressure = lobbyPressureInfo(state);
    const best = bestLobbyVisitor(state);
    const route = best ? visitorRouteInfo(best, state) : null;
    const idleText = route
      ? `${pressure.label} · 推荐 ${route.floorLabel} ${route.floorName}`
      : directLobby
        ? "入口满级，可直接点大厅接待。"
        : "点大厅访客进入电梯。";
    els.passengerBox.innerHTML = `
      <div class="passenger-copy">
        <strong>大厅访客 ${state.queue.length}/${VISITOR_QUEUE_MAX}</strong>
        <span>${escapeHtml(idleText)}</span>
        <div class="elevator-route-meter lobby-pressure-meter" data-pressure="${escapeAttr(pressure.tone)}" aria-hidden="true"><i style="width:${pressure.percent}%"></i></div>
      </div>`;
  }
  const elevatorBusy = Boolean(passenger && (state.elevator.target !== null || (state.elevator.doorTimer || 0) > 0));
  dropBtn.disabled = !passenger || elevatorBusy;
  dropBtn.textContent = !passenger ? "接待" : state.elevator.target !== null ? "前往中" : (state.elevator.doorTimer || 0) > 0 ? `开门 ${Math.ceil(state.elevator.doorTimer)}s` : "接待";
  upgradeBtn.disabled = directLobby;
  upgradeBtn.textContent = directLobby ? "入口满级：可直接接待" : `扩充入口：${elevatorUpgradeCost()} 宝石`;
  els.floorJump.innerHTML = getOrderedFloors(state)
    .map((floor) => {
      const active = state.selectedFloorId === floor.id ? "active" : "";
      return `<button class="${active}" data-action="target-floor" data-floor-id="${floor.id}">${formatFloorLabel(floor.id)}</button>`;
    })
    .join("");
}

function renderFloorDetail() {
  const floor = findFloor(state.selectedFloorId) || state.floors[0];
  state.selectedFloorId = floor.id;
  els.selectedFloorTag.textContent = formatFloorLabel(floor.id);

  if (floor.status === "construction") {
    els.floorDetail.innerHTML = `
      <strong>${FLOOR_TYPES[floor.type].label}施工中</strong>
      <p>剩余 ${Math.ceil(floor.buildRemaining)} 秒</p>
      <div class="stat-grid">
        <div class="stat"><b>${Math.round((1 - floor.buildRemaining / floor.buildTotal) * 100)}%</b><span>进度</span></div>
        <div class="stat"><b>${state.gems}</b><span>宝石</span></div>
      </div>
      <div class="detail-actions">
        <button class="detail-btn primary" data-action="speed" data-floor-id="${floor.id}">加速</button>
      </div>`;
    return;
  }

  if (floor.type === "lobby") {
    const best = bestLobbyVisitor(state);
    const bestRoute = best ? visitorRouteInfo(best, state) : null;
    const pressure = lobbyPressureInfo(state);
    els.floorDetail.innerHTML = `
      <strong>${escapeHtml(floor.name)}</strong>
      <p>${escapeHtml(pressure.text)}</p>
      <div class="stat-grid">
        <div class="stat"><b>${state.queue.length}</b><span>等候访客</span></div>
        <div class="stat"><b>${escapeHtml(pressure.label)}</b><span>候车压力</span></div>
        <div class="stat"><b>${bestRoute ? bestRoute.floorLabel : "-"}</b><span>推荐目标</span></div>
        <div class="stat"><b>${state.stats.lobbyPriorityDispatchesDone || 0}</b><span>优先派号</span></div>
      </div>
      ${renderFloorPerks(floor)}
      ${renderLobbyRouteBoard()}
      <div class="detail-actions">
        <button class="detail-btn primary" data-action="dispatch-lobby" ${state.queue.length && !state.elevator.passenger ? "" : "disabled"}>派号接待</button>
        <button class="detail-btn primary" data-action="open-build">建设</button>
      </div>`;
    return;
  }

  if (floor.type === "dwelling") {
    const unemployed = floor.residents.filter((resident) => {
      const full = getResident(resident.id);
      return full && !full.workFloorId && !full.expeditionId;
    }).length;
    const pendingReviews = pendingLifeStoryReviewsForFloor(floor).length;
    els.floorDetail.innerHTML = `
      <strong>${escapeHtml(floor.name)}</strong>
      <p>${FLOOR_TYPES.dwelling.desc}</p>
      <div class="stat-grid">
        <div class="stat"><b>${floor.residents.length}/${floor.capacity}</b><span>住户</span></div>
        <div class="stat"><b>Lv${floor.level}</b><span>楼层等级</span></div>
        <div class="stat"><b>${unemployed}</b><span>空闲居民</span></div>
        <div class="stat"><b>${floor.rentReady || 0}</b><span>待收租金</span></div>
        <div class="stat"><b>${pendingReviews}</b><span>待回访</span></div>
      </div>
      ${renderFloorPerks(floor)}
      ${renderLifeStoryPanel(floor)}
      ${renderExpeditionReportPanel(floor)}
      ${renderResidentList(floor.residents)}
      <div class="detail-actions">
        <button class="detail-btn primary" data-action="collect-rent" data-floor-id="${floor.id}">收租</button>
        <button class="detail-btn" data-action="start-dwelling-expedition" data-floor-id="${floor.id}">外出探险</button>
        <button class="detail-btn" data-action="upgrade-floor" data-floor-id="${floor.id}">升级 ${floorUpgradeCost(floor)}</button>
        <button class="detail-btn" data-action="open-build">建设</button>
      </div>`;
    return;
  }

  const workers = floor.workers.map((id) => getResident(id)).filter(Boolean);
  const skill = averageSkill(floor.workers, floor.type);
  const dreamWorkers = countDreamWorkers(floor);
  const marketCooldown = floor.type === "market" ? Math.ceil(floor.marketCooldown || 0) : 0;
  const marketParcelActive = floor.type === "market" && isActiveMarketParcel(floor);
  const marketParcelTarget = marketParcelActive ? state.orders.find((order) => order.id === floor.marketParcel.orderId) : null;
  const marketParcelReason = floor.type === "market" ? marketDealActionBlockReason(floor) : "";
  const marketParcelStageValue = marketParcelActive ? currentMarketParcelPhase(floor).label : "待单";
  const marketParcelPackedValue = marketParcelActive ? `${floor.marketParcel.packed || 0}/${marketParcelTarget?.amount || 0}` : `${state.stats.marketParcelItemsPacked || 0}`;
  const libraryCooldown = floor.type === "library" ? Math.ceil(floor.libraryCooldown || 0) : 0;
  const comfortCooldown = isComfortFloorType(floor.type) ? Math.ceil(floor.comfortCooldown || 0) : 0;
  const comfortActive = isActiveComfortSession(floor);
  const comfortReason = isComfortFloorType(floor.type) ? comfortActionBlockReason(floor) : "";
  const showtimeCooldownValue = isShowtimeFloorType(floor.type) ? Math.ceil(floor.showtimeCooldown || 0) : 0;
  const showtimeActive = isActiveShowtime(floor);
  const showtimeReason = isShowtimeFloorType(floor.type) ? showtimeActionBlockReason(floor) : "";
  const showtimeHeatValue = showtimeActive ? `${Math.round(floor.showtime.heat || 0)}%` : "-";
  const showtimeBeatValue = showtimeActive ? currentShowtimeBeat(floor).label : showtimeCooldownValue ? `${showtimeCooldownValue}s` : "就绪";
  const catalog = floor.type === "library" ? collectionProgress(state) : null;
  const royalMandateActive = isActiveRoyalMandate(floor);
  const royalMandateCooldownValue = floor.type === "kingdom" ? Math.ceil(floor.royalMandateCooldown || 0) : 0;
  const royalMandateTarget =
    floor.type === "kingdom"
      ? royalMandateActive
        ? state.orders.find((order) => order.id === floor.royalMandate.orderId)
        : bestRoyalMandateOrder(state)
      : null;
  const royalMandateInfo = royalMandateTarget ? orderStockInfo(royalMandateTarget) : null;
  const royalMandateReason = floor.type === "kingdom" ? royalMandateActionBlockReason(floor, royalMandateTarget) : "";
  const royalMandateStageValue = royalMandateActive
    ? currentRoyalMandatePhase(floor).label
    : royalMandateCooldownValue
      ? `${royalMandateCooldownValue}s`
      : royalMandateTarget
        ? "就绪"
        : "无单";
  const royalMandatePreparedValue = royalMandateInfo ? `${royalMandateInfo.mandatePrepared}/${royalMandateTarget.amount}` : "-";
  els.floorDetail.innerHTML = `
    <strong>${escapeHtml(floor.name)}</strong>
    <p>${FLOOR_TYPES[floor.type].desc}</p>
    <div class="stat-grid">
      <div class="stat"><b>${floor.stock}/${floor.stockMax}</b><span>库存</span></div>
      <div class="stat"><b>Lv${floor.level}</b><span>楼层等级</span></div>
      <div class="stat"><b>${workers.length}/3</b><span>员工</span></div>
      <div class="stat"><b>${dreamWorkers}/3</b><span>理想岗位</span></div>
      <div class="stat"><b>${skill.toFixed(1)}</b><span>技能</span></div>
      <div class="stat"><b>${floor.production ? Math.ceil(floor.production.remaining) + "s" : "就绪"}</b><span>补货</span></div>
      ${floor.type === "market" ? `<div class="stat"><b>${state.orders.length}/${orderCapacity(state)}</b><span>订单栏</span></div><div class="stat"><b>${marketCooldown ? marketCooldown + "s" : "就绪"}</b><span>撮合</span></div><div class="stat"><b>${marketParcelStageValue}</b><span>包裹</span></div><div class="stat"><b>${marketParcelPackedValue}</b><span>打包</span></div><div class="stat"><b>${state.stats.marketParcelsDone || 0}</b><span>流转</span></div>` : ""}
      ${floor.type === "library" ? `<div class="stat"><b>${catalog.completed}/${COLLECTION_DEFS.length}</b><span>图鉴</span></div><div class="stat"><b>${libraryCooldown ? libraryCooldown + "s" : "就绪"}</b><span>编目</span></div>` : ""}
      ${isComfortFloorType(floor.type) ? `<div class="stat"><b>${comfortActive ? Math.ceil(floor.comfortSession.remaining) + "s" : comfortCooldown ? comfortCooldown + "s" : "就绪"}</b><span>休整</span></div>` : ""}
      ${isShowtimeFloorType(floor.type) ? `<div class="stat"><b>${showtimeActive ? Math.ceil(floor.showtime.remaining) + "s" : showtimeCooldownValue ? showtimeCooldownValue + "s" : "就绪"}</b><span>演出</span></div><div class="stat"><b>${showtimeBeatValue}</b><span>段落</span></div><div class="stat"><b>${showtimeHeatValue}</b><span>热度</span></div><div class="stat"><b>${state.stats.entertainmentShowsDone || 0}/${state.stats.showtimeReactionsDone || 0}</b><span>小剧/反应</span></div>` : ""}
    </div>
    ${renderFloorPerks(floor)}
    ${renderLifeStoryPanel(floor)}
    ${renderExpeditionReportPanel(floor)}
    ${renderMarketParcelPanel(floor)}
    ${renderComfortSessionPanel(floor)}
    ${renderShowtimePanel(floor)}
    ${renderResidentList(workers, floor.type)}
    <div class="detail-actions">
      <button class="detail-btn primary" data-action="stock" data-floor-id="${floor.id}">补货</button>
      ${floor.type === "market" ? `<button class="detail-btn" data-action="market-deal" data-floor-id="${floor.id}" title="${escapeAttr(marketParcelReason || "撮合快单，并让市集摊位把现货打包发出")}" ${marketParcelReason ? "disabled" : ""}>撮合快单</button>` : ""}
      ${floor.type === "library" ? `<button class="detail-btn" data-action="library-study" data-floor-id="${floor.id}" ${libraryCooldown || !floor.workers.length || floor.stock <= 0 ? "disabled" : ""}>整理典藏</button>` : ""}
      ${isShowtimeFloorType(floor.type) ? `<button class="detail-btn" data-action="entertainment-show" data-floor-id="${floor.id}" title="${escapeAttr(showtimeReason || "组织演员与观众开演")}" ${showtimeReason ? "disabled" : ""}>${SHOWTIME_ACTIONS[floor.type] || "排演"}</button>` : ""}
      ${isComfortFloorType(floor.type) ? `<button class="detail-btn" data-action="comfort-session" data-floor-id="${floor.id}" title="${escapeAttr(comfortReason || "组织居民结伴休整")}" ${comfortReason ? "disabled" : ""}>${COMFORT_SESSION_ACTIONS[floor.type] || "组织休整"}</button>` : ""}
      <button class="detail-btn" data-action="hire" data-floor-id="${floor.id}">雇佣</button>
      <button class="detail-btn" data-action="upgrade-floor" data-floor-id="${floor.id}">升级 ${floorUpgradeCost(floor)}</button>
      <button class="detail-btn" data-action="speed" data-floor-id="${floor.id}">加速</button>
      <button class="detail-btn" data-action="open-build">建设</button>
    </div>`;
}

function renderFloorPerks(floor) {
  const perks = [];
  if (floor.type === "lobby") {
    perks.push(`入口调度 +${Math.round(lobbyDispatchBonus(state) * 100)}%`);
    perks.push(`优先派号 ${state.stats.lobbyPriorityDispatchesDone || 0}`);
    perks.push(elevatorIsMaxed() ? "满级直达接待" : "访客节奏优化");
  } else if (floor.type === "dwelling") {
    perks.push(`远行整备 +${Math.round(dwellingJourneyBonus(state) * 100)}%`);
    perks.push(`租金回响 +${Math.round(dwellingJourneyBonus(state) * 30)}%`);
    perks.push(`生活回访 +${Math.round(lifeStoryReviewBonus(state) * 100)}%`);
    perks.push(`已回访 ${state.stats.lifeStoryReviewsDone || 0}`);
    perks.push(`探险回执 ${state.stats.expeditionReportsDone || 0}`);
    perks.push(`路线档案 +${Math.round(expeditionReportBonus(state) * 100)}%`);
  } else if (!isBusiness(floor)) {
    return "";
  } else if (floor.type === "food") {
    perks.push(`快乐暖意 +${Math.round(foodWarmthBonus(state) * 55)}%`);
    perks.push(`探险补给 +${Math.round(foodWarmthBonus(state) * 22)}%`);
  } else if (floor.type === "craft") {
    perks.push(`工具链 +${Math.round(craftToolBonus(state) * 100)}%`);
    perks.push(`补货省耗 +${Math.round(Math.min(0.2, craftToolBonus(state) * 0.42) * 100)}%`);
    perks.push(`探险装备 +${Math.round(craftToolBonus(state) * 24)}%`);
    perks.push(`校准 ${state.stats.toolTuneSessionsDone || 0}`);
    perks.push(`校准点 ${state.stats.toolTuneMarksDone || 0}`);
    if (isActiveToolTune(floor)) perks.push(`${currentToolTunePhase(floor).label}精度 ${Math.round(floor.toolTune.precision || 0)}%`);
  } else if (floor.type === "market") {
    perks.push(`订单 +${Math.round((orderNetworkBonus(state) - 1) * 100)}%`);
    perks.push(`容量 ${state.orders.length}/${orderCapacity(state)}`);
    perks.push(`售卖 +${Math.round((businessIncomeMultiplier(floor, state) - 1) * 100)}%`);
    perks.push(`包裹 ${state.stats.marketParcelsDone || 0}`);
    perks.push(`打包 ${state.stats.marketParcelItemsPacked || 0}`);
    if (isActiveMarketParcel(floor)) perks.push(`${currentMarketParcelPhase(floor).label} ${floor.marketParcel.packed || 0}件`);
  } else if (floor.type === "library") {
    const next = nextCollectionItem(state);
    perks.push(`探险碎片 +${Math.round(libraryResearchBonus(state) * 100)}%`);
    perks.push(`典藏订单 +${Math.round((collectionOrderBonus(state) - 1) * 100)}%`);
    perks.push(`整理 ${state.stats.libraryStudiesDone || 0}`);
    if (next) perks.push(`下枚 ${next.name}`);
  } else if (floor.type === "kingdom") {
    perks.push(`王令订单 +${Math.round(kingdomMandateBonus(state) * 55)}%`);
    perks.push(`全城声望 +${Math.round(kingdomMandateBonus(state) * 100)}%`);
    perks.push(`签发 ${state.stats.royalMandatesDone || 0}`);
    perks.push(`回执 ${state.stats.royalCourierReceiptsDone || 0}`);
    if (isActiveRoyalMandate(floor)) perks.push(`${currentRoyalMandatePhase(floor).label} ${Math.ceil(floor.royalMandate.remaining)}s`);
  } else if (floor.type === "garden") {
    perks.push("快乐缓慢恢复");
    perks.push(`贵宾 +${Math.round(gardenComfortBonus(state) * 36)}%`);
    perks.push(`休整 ${state.stats.comfortSessionsDone || 0}`);
  } else if (floor.type === "entertainment") {
    perks.push("快乐稳定恢复");
    perks.push(`掌声奖励 +${Math.round(entertainmentJoyBonus(state) * 55)}%`);
    perks.push(`小剧 ${state.stats.entertainmentShowsDone || 0}`);
    perks.push(`现场反应 ${state.stats.showtimeReactionsDone || 0}`);
    if (isActiveShowtime(floor)) perks.push(`${currentShowtimeBeat(floor).label}热度 ${Math.round(floor.showtime.heat || 0)}%`);
  } else if (floor.type === "service") {
    perks.push(`排队缓冲 +${Math.round(serviceCareBonus(state) * 90)}%`);
    perks.push(`到站接待 +${Math.round(serviceCareBonus(state) * 55)}%`);
    perks.push(`照看 ${state.stats.serviceCareTouchesDone || 0}`);
    if (isActiveServiceCare(floor)) perks.push(`${currentServiceCarePhase(floor).label}妥帖 ${Math.round(floor.serviceCare.care || 0)}%`);
  } else if (floor.type === "observatory") {
    perks.push(`探险收益 +${Math.round(observatoryStarBonus(state) * 55)}%`);
    perks.push(`宝石概率 +${Math.round(observatoryStarBonus(state) * 35)}%`);
    perks.push(`校准 ${state.stats.starChartCalibrationsDone || 0}`);
    perks.push(`星标 ${state.stats.starChartMarksDone || 0}`);
    if (isActiveStarChart(floor)) perks.push(`${currentStarChartPhase(floor).label}清晰 ${Math.round(floor.starChart.focus || 0)}%`);
  } else if (floor.type === "skyport") {
    perks.push(`访客节奏 +${Math.round(skyportFlowBonus(state) * 185)}%`);
    perks.push(`订单/探险 +${Math.round(skyportFlowBonus(state) * 42)}%`);
  } else if (floor.type === "festival") {
    perks.push(`连送奖励 +${Math.round(festivalBuzzBonus(state) * 90)}%`);
    perks.push(`贵宾热度 +${Math.round(festivalBuzzBonus(state) * 30)}%`);
  } else if (floor.type === "bathhouse") {
    perks.push(`补货加速 +${Math.round(bathhouseRestBonus(state) * 42)}%`);
    perks.push("快乐恢复增强");
    perks.push(`休整 ${state.stats.comfortSessionsDone || 0}`);
  } else if (floor.type === "clinic") {
    perks.push(`容错 +${Math.round(clinicCareBonus(state) * 180)}%`);
    perks.push("快乐缓慢恢复");
  } else if (floor.type === "clockwork") {
    perks.push(`施工/补货 +${Math.round(clockworkTempoBonus(state) * 72)}%`);
    perks.push(`订单网络 +${Math.round(clockworkTempoBonus(state) * 34)}%`);
  } else if (floor.type === "aquarium") {
    perks.push(`探险收益 +${Math.round(aquariumWonderBonus(state) * 32)}%`);
    perks.push(`贵宾 +${Math.round(aquariumWonderBonus(state) * 30)}%`);
  } else if (floor.type === "alchemy") {
    perks.push(`秘药宝石 +${Math.round(alchemyPotionBonus(state) * 18)}%`);
    perks.push(`碎片线索 +${Math.round(alchemyPotionBonus(state) * 12)}%`);
  } else if (floor.type === "training") {
    perks.push(`探险战力 +${Math.round(trainingDrillBonus(state) * 200)}%`);
    perks.push(`连送韧性 +${Math.round(trainingDrillBonus(state) * 130)}%`);
  } else if (floor.type === "treasure") {
    perks.push(`宝库订单 +${Math.round(treasureVaultBonus(state) * 42)}%`);
    perks.push(`珍藏奖励 +${Math.round(treasureVaultBonus(state) * 34)}%`);
  }
  const resonance = Math.round(adjacencyBonus(state, floor.type) * 100);
  if (resonance > 0) perks.push(`街区共鸣 +${resonance}%`);
  if (!perks.length) return "";
  return `<div class="floor-perks">${perks.map((perk) => `<span>${perk}</span>`).join("")}</div>`;
}

function renderFloorDetail() {
  const floor = findFloor(state.selectedFloorId) || state.floors[0];
  state.selectedFloorId = floor.id;
  els.selectedFloorTag.textContent = formatFloorLabel(floor.id);

  if (floor.status === "construction") {
    els.floorDetail.innerHTML = `
      <strong>${FLOOR_TYPES[floor.type].label}施工中</strong>
      <p>剩余 ${Math.ceil(floor.buildRemaining)} 秒</p>
      <div class="stat-grid">
        <div class="stat"><b>${Math.round((1 - floor.buildRemaining / floor.buildTotal) * 100)}%</b><span>进度</span></div>
        <div class="stat"><b>${state.gems}</b><span>宝石</span></div>
      </div>
      <div class="detail-actions">
        <button class="detail-btn primary" data-action="speed" data-floor-id="${floor.id}">加速</button>
      </div>`;
    return;
  }

  if (floor.type === "lobby") {
    const best = bestLobbyVisitor(state);
    const bestRoute = best ? visitorRouteInfo(best, state) : null;
    const pressure = lobbyPressureInfo(state);
    els.floorDetail.innerHTML = `
      <strong>${escapeHtml(floor.name)}</strong>
      <p>${escapeHtml(pressure.text)}</p>
      <div class="stat-grid">
        <div class="stat"><b>${state.queue.length}</b><span>等待访客</span></div>
        <div class="stat"><b>${escapeHtml(pressure.label)}</b><span>候车压力</span></div>
        <div class="stat"><b>${bestRoute ? bestRoute.floorLabel : "-"}</b><span>推荐目标</span></div>
        <div class="stat"><b>${state.stats.lobbyPriorityDispatchesDone || 0}</b><span>优先派号</span></div>
      </div>
      ${renderFloorPerks(floor)}
      ${renderLobbyRouteBoard()}
      <div class="detail-actions">
        <button class="detail-btn primary" data-action="dispatch-lobby" ${state.queue.length && !state.elevator.passenger ? "" : "disabled"}>派号接待</button>
        <button class="detail-btn primary" data-action="open-build">建设</button>
      </div>`;
    return;
  }

  if (floor.type === "dwelling") {
    const unemployed = floor.residents.filter((resident) => {
      const full = getResident(resident.id);
      return full && !full.workFloorId && !full.expeditionId;
    }).length;
    const pendingReviews = pendingLifeStoryReviewsForFloor(floor).length;
    els.floorDetail.innerHTML = `
      <strong>${escapeHtml(floor.name)}</strong>
      <p>${FLOOR_TYPES.dwelling.desc}</p>
      <div class="stat-grid">
        <div class="stat"><b>${floor.residents.length}/${floor.capacity}</b><span>住户</span></div>
        <div class="stat"><b>Lv${floor.level}</b><span>楼层等级</span></div>
        <div class="stat"><b>${unemployed}</b><span>空闲居民</span></div>
        <div class="stat"><b>${floor.rentReady || 0}</b><span>待收租金</span></div>
        <div class="stat"><b>${pendingReviews}</b><span>待回访</span></div>
      </div>
      ${renderFloorPerks(floor)}
      ${renderLifeStoryPanel(floor)}
      ${renderExpeditionReportPanel(floor)}
      ${renderResidentList(floor.residents)}
      <div class="detail-actions">
        <button class="detail-btn primary" data-action="collect-rent" data-floor-id="${floor.id}">收租</button>
        <button class="detail-btn" data-action="start-dwelling-expedition" data-floor-id="${floor.id}">外出探险</button>
        <button class="detail-btn" data-action="upgrade-floor" data-floor-id="${floor.id}">升级 ${floorUpgradeCost(floor)}</button>
        <button class="detail-btn" data-action="open-build">建设</button>
      </div>`;
    return;
  }

  const workers = floor.workers.map((id) => getResident(id)).filter(Boolean);
  const skill = averageSkill(floor.workers, floor.type);
  const dreamWorkers = countDreamWorkers(floor);
  const marketCooldown = floor.type === "market" ? Math.ceil(floor.marketCooldown || 0) : 0;
  const marketParcelActive = floor.type === "market" && isActiveMarketParcel(floor);
  const marketParcelTarget = marketParcelActive ? state.orders.find((order) => order.id === floor.marketParcel.orderId) : null;
  const marketParcelReason = floor.type === "market" ? marketDealActionBlockReason(floor) : "";
  const marketParcelStageValue = marketParcelActive ? currentMarketParcelPhase(floor).label : "待单";
  const marketParcelPackedValue = marketParcelActive ? `${floor.marketParcel.packed || 0}/${marketParcelTarget?.amount || 0}` : `${state.stats.marketParcelItemsPacked || 0}`;
  const libraryCooldown = floor.type === "library" ? Math.ceil(floor.libraryCooldown || 0) : 0;
  const foodRushCooldownValue = isFoodRushFloorType(floor.type) ? Math.ceil(floor.foodRushCooldown || 0) : 0;
  const foodRushActive = isActiveFoodRush(floor);
  const foodRushReason = isFoodRushFloorType(floor.type) ? foodRushActionBlockReason(floor) : "";
  const foodRushHeatValue = foodRushActive ? `${Math.round(floor.foodRush.heat || 0)}%` : "-";
  const foodRushPaceValue = foodRushActive ? currentFoodRushPace(floor).label : foodRushCooldownValue ? `${foodRushCooldownValue}s` : "就绪";
  const foodRushCourseValue = foodRushActive ? currentFoodRushCourse(floor).label : `${state.stats.foodRushCoursesDone || 0}`;
  const foodRushServedValue = foodRushActive ? `${floor.foodRush.served || 0}/${floor.foodRush.targetServings || 0}` : `${state.stats.foodServingsDone || 0}`;
  const serviceCareCooldownValue = isServiceCareFloorType(floor.type) ? Math.ceil(floor.serviceCareCooldown || 0) : 0;
  const serviceCareActive = isActiveServiceCare(floor);
  const serviceCareReason = isServiceCareFloorType(floor.type) ? serviceCareActionBlockReason(floor) : "";
  const serviceCareToneValue = serviceCareActive ? `${Math.round(floor.serviceCare.care || 0)}%` : "-";
  const serviceCarePhaseValue = serviceCareActive ? currentServiceCarePhase(floor).label : serviceCareCooldownValue ? `${serviceCareCooldownValue}s` : "就绪";
  const serviceCareTouchValue = serviceCareActive ? `${floor.serviceCare.touches || 0}/${floor.serviceCare.targetTouches || 0}` : `${state.stats.serviceCareTouchesDone || 0}`;
  const starChartCooldownValue = isStarChartFloorType(floor.type) ? Math.ceil(floor.starChartCooldown || 0) : 0;
  const starChartActive = isActiveStarChart(floor);
  const starChartReason = isStarChartFloorType(floor.type) ? starChartActionBlockReason(floor) : "";
  const starChartFocusValue = starChartActive ? `${Math.round(floor.starChart.focus || 0)}%` : "-";
  const starChartPhaseValue = starChartActive ? currentStarChartPhase(floor).label : starChartCooldownValue ? `${starChartCooldownValue}s` : "就绪";
  const starChartMarksValue = starChartActive ? `${floor.starChart.marks || 0}/${floor.starChart.targetMarks || 0}` : `${state.stats.starChartMarksDone || 0}`;
  const toolTuneCooldownValue = isToolTuneFloorType(floor.type) ? Math.ceil(floor.toolTuneCooldown || 0) : 0;
  const toolTuneActive = isActiveToolTune(floor);
  const toolTuneReason = isToolTuneFloorType(floor.type) ? toolTuneActionBlockReason(floor) : "";
  const toolTunePrecisionValue = toolTuneActive ? `${Math.round(floor.toolTune.precision || 0)}%` : "-";
  const toolTunePhaseValue = toolTuneActive ? currentToolTunePhase(floor).label : toolTuneCooldownValue ? `${toolTuneCooldownValue}s` : "就绪";
  const toolTuneMarksValue = toolTuneActive ? `${floor.toolTune.marks || 0}/${floor.toolTune.targetMarks || 0}` : `${state.stats.toolTuneMarksDone || 0}`;
  const comfortCooldown = isComfortFloorType(floor.type) ? Math.ceil(floor.comfortCooldown || 0) : 0;
  const comfortActive = isActiveComfortSession(floor);
  const comfortAfterglow = isActiveComfortAfterglow(floor) ? floor.comfortAfterglow : null;
  const comfortReason = isComfortFloorType(floor.type) ? comfortActionBlockReason(floor) : "";
  const comfortEchoValue = comfortAfterglow ? `${Math.ceil(comfortAfterglow.remaining)}s` : `${state.stats.comfortEchoesDone || 0}`;
  const comfortPrepValue = comfortAfterglow ? `+${Math.round((comfortAfterglow.expeditionBonus || 0) * 100)}%` : `+${Math.round(comfortExpeditionPrepBonus(state) * 100)}%`;
  const comfortFocusValue = comfortAfterglow?.focus ? comfortFocusLabel(comfortAfterglow) : `${state.stats.comfortFocusesDone || 0}`;
  const showtimeCooldownValue = isShowtimeFloorType(floor.type) ? Math.ceil(floor.showtimeCooldown || 0) : 0;
  const showtimeActive = isActiveShowtime(floor);
  const showtimeReason = isShowtimeFloorType(floor.type) ? showtimeActionBlockReason(floor) : "";
  const showtimeHeatValue = showtimeActive ? `${Math.round(floor.showtime.heat || 0)}%` : "-";
  const showtimeBeatValue = showtimeActive ? currentShowtimeBeat(floor).label : showtimeCooldownValue ? `${showtimeCooldownValue}s` : "就绪";
  const catalog = floor.type === "library" ? collectionProgress(state) : null;
  const royalMandateActive = isActiveRoyalMandate(floor);
  const royalMandateCooldownValue = floor.type === "kingdom" ? Math.ceil(floor.royalMandateCooldown || 0) : 0;
  const royalMandateTarget =
    floor.type === "kingdom"
      ? royalMandateActive
        ? state.orders.find((order) => order.id === floor.royalMandate.orderId)
        : bestRoyalMandateOrder(state)
      : null;
  const royalMandateInfo = royalMandateTarget ? orderStockInfo(royalMandateTarget) : null;
  const royalMandateReason = floor.type === "kingdom" ? royalMandateActionBlockReason(floor, royalMandateTarget) : "";
  const royalMandateStageValue = royalMandateActive
    ? currentRoyalMandatePhase(floor).label
    : royalMandateCooldownValue
      ? `${royalMandateCooldownValue}s`
      : royalMandateTarget
        ? "就绪"
        : "无单";
  const royalMandatePreparedValue = royalMandateInfo ? `${royalMandateInfo.mandatePrepared}/${royalMandateTarget.amount}` : "-";

  els.floorDetail.innerHTML = `
    <strong>${escapeHtml(floor.name)}</strong>
    <p>${FLOOR_TYPES[floor.type].desc}</p>
    <div class="stat-grid">
      <div class="stat"><b>${floor.stock}/${floor.stockMax}</b><span>库存</span></div>
      <div class="stat"><b>Lv${floor.level}</b><span>楼层等级</span></div>
      <div class="stat"><b>${workers.length}/3</b><span>员工</span></div>
      <div class="stat"><b>${dreamWorkers}/3</b><span>理想岗位</span></div>
      <div class="stat"><b>${skill.toFixed(1)}</b><span>技能</span></div>
      <div class="stat"><b>${floor.production ? Math.ceil(floor.production.remaining) + "s" : "就绪"}</b><span>补货</span></div>
      ${isFoodRushFloorType(floor.type) ? `<div class="stat"><b>${foodRushActive ? Math.ceil(floor.foodRush.remaining) + "s" : foodRushCooldownValue ? foodRushCooldownValue + "s" : "就绪"}</b><span>高峰</span></div><div class="stat"><b>${foodRushPaceValue}</b><span>节奏</span></div><div class="stat"><b>${foodRushCourseValue}</b><span>菜序</span></div><div class="stat"><b>${foodRushHeatValue}</b><span>忙场</span></div><div class="stat"><b>${foodRushServedValue}</b><span>上菜</span></div>` : ""}
      ${isServiceCareFloorType(floor.type) ? `<div class="stat"><b>${serviceCareActive ? Math.ceil(floor.serviceCare.remaining) + "s" : serviceCareCooldownValue ? serviceCareCooldownValue + "s" : "就绪"}</b><span>照看</span></div><div class="stat"><b>${serviceCarePhaseValue}</b><span>阶段</span></div><div class="stat"><b>${serviceCareToneValue}</b><span>妥帖</span></div><div class="stat"><b>${serviceCareTouchValue}</b><span>次数</span></div>` : ""}
      ${isStarChartFloorType(floor.type) ? `<div class="stat"><b>${starChartActive ? Math.ceil(floor.starChart.remaining) + "s" : starChartCooldownValue ? starChartCooldownValue + "s" : "就绪"}</b><span>校准</span></div><div class="stat"><b>${starChartPhaseValue}</b><span>阶段</span></div><div class="stat"><b>${starChartFocusValue}</b><span>清晰</span></div><div class="stat"><b>${starChartMarksValue}</b><span>星标</span></div>` : ""}
      ${isToolTuneFloorType(floor.type) ? `<div class="stat"><b>${toolTuneActive ? Math.ceil(floor.toolTune.remaining) + "s" : toolTuneCooldownValue ? toolTuneCooldownValue + "s" : "就绪"}</b><span>校准</span></div><div class="stat"><b>${toolTunePhaseValue}</b><span>阶段</span></div><div class="stat"><b>${toolTunePrecisionValue}</b><span>精度</span></div><div class="stat"><b>${toolTuneMarksValue}</b><span>校准点</span></div>` : ""}
      ${floor.type === "market" ? `<div class="stat"><b>${state.orders.length}/${orderCapacity(state)}</b><span>订单栏</span></div><div class="stat"><b>${marketCooldown ? marketCooldown + "s" : "就绪"}</b><span>撮合</span></div><div class="stat"><b>${marketParcelStageValue}</b><span>包裹</span></div><div class="stat"><b>${marketParcelPackedValue}</b><span>打包</span></div><div class="stat"><b>${state.stats.marketParcelsDone || 0}</b><span>流转</span></div>` : ""}
      ${floor.type === "kingdom" ? `<div class="stat"><b>${royalMandateStageValue}</b><span>王令</span></div><div class="stat"><b>${royalMandatePreparedValue}</b><span>预备</span></div><div class="stat"><b>${state.stats.royalMandatesDone || 0}</b><span>签发</span></div><div class="stat"><b>${state.stats.royalCourierReceiptsDone || 0}</b><span>回执</span></div><div class="stat"><b>${royalMandateInfo ? royalMandateInfo.missing : "-"}</b><span>缺口</span></div>` : ""}
      ${floor.type === "library" ? `<div class="stat"><b>${catalog.completed}/${COLLECTION_DEFS.length}</b><span>图鉴</span></div><div class="stat"><b>${libraryCooldown ? libraryCooldown + "s" : "就绪"}</b><span>编目</span></div>` : ""}
      ${isComfortFloorType(floor.type) ? `<div class="stat"><b>${comfortActive ? Math.ceil(floor.comfortSession.remaining) + "s" : comfortCooldown ? comfortCooldown + "s" : "就绪"}</b><span>休整</span></div><div class="stat"><b>${comfortEchoValue}</b><span>余韵</span></div><div class="stat"><b>${comfortPrepValue}</b><span>探险准备</span></div><div class="stat"><b>${comfortFocusValue}</b><span>调息</span></div>` : ""}
      ${isShowtimeFloorType(floor.type) ? `<div class="stat"><b>${showtimeActive ? Math.ceil(floor.showtime.remaining) + "s" : showtimeCooldownValue ? showtimeCooldownValue + "s" : "就绪"}</b><span>演出</span></div><div class="stat"><b>${showtimeBeatValue}</b><span>段落</span></div><div class="stat"><b>${showtimeHeatValue}</b><span>热度</span></div><div class="stat"><b>${state.stats.entertainmentShowsDone || 0}/${state.stats.showtimeReactionsDone || 0}</b><span>小剧/反应</span></div>` : ""}
    </div>
    ${renderFloorPerks(floor)}
    ${renderLifeStoryPanel(floor)}
    ${renderExpeditionReportPanel(floor)}
    ${renderMarketParcelPanel(floor)}
    ${renderRoyalMandatePanel(floor)}
    ${renderFoodRushPanel(floor)}
    ${renderServiceCarePanel(floor)}
    ${renderStarChartPanel(floor)}
    ${renderToolTunePanel(floor)}
    ${renderComfortSessionPanel(floor)}
    ${renderShowtimePanel(floor)}
    ${renderResidentList(workers, floor.type)}
    <div class="detail-actions">
      <button class="detail-btn primary" data-action="stock" data-floor-id="${floor.id}">补货</button>
      ${isFoodRushFloorType(floor.type) ? `<button class="detail-btn" data-action="food-rush" data-floor-id="${floor.id}" title="${escapeAttr(foodRushReason || "组织饥饿居民入座并完成一轮忙碌上菜")}" ${foodRushReason ? "disabled" : ""}>${FOOD_RUSH_ACTIONS[floor.type] || "组织用餐高峰"}</button>` : ""}
      ${isServiceCareFloorType(floor.type) ? `<button class="detail-btn" data-action="service-care" data-floor-id="${floor.id}" title="${escapeAttr(serviceCareReason || "安排需要照看的居民入座，降低大厅压力并完成礼宾服务")}" ${serviceCareReason ? "disabled" : ""}>${SERVICE_CARE_ACTIONS[floor.type] || "安排礼宾照看"}</button>` : ""}
      ${isStarChartFloorType(floor.type) ? `<button class="detail-btn" data-action="star-chart" data-floor-id="${floor.id}" title="${escapeAttr(starChartReason || "消耗星盘耗材，为居民和探险队校准星图")}" ${starChartReason ? "disabled" : ""}>${STAR_CHART_ACTIONS[floor.type] || "校准星图"}</button>` : ""}
      ${isToolTuneFloorType(floor.type) ? `<button class="detail-btn" data-action="tool-tune" data-floor-id="${floor.id}" title="${escapeAttr(toolTuneReason || "消耗工坊零件，为施工、补货、探险和订单校准工具")}" ${toolTuneReason ? "disabled" : ""}>${TOOL_TUNE_ACTIONS[floor.type] || "校准工具"}</button>` : ""}
      ${floor.type === "market" ? `<button class="detail-btn" data-action="market-deal" data-floor-id="${floor.id}" title="${escapeAttr(marketParcelReason || "撮合快单，并让市集摊位把现货打包发出")}" ${marketParcelReason ? "disabled" : ""}>撮合快单</button>` : ""}
      ${floor.type === "kingdom" ? `<button class="detail-btn" data-action="royal-mandate" data-floor-id="${floor.id}" title="${escapeAttr(royalMandateReason || "消耗 1 枚印信，为最缺货的订单预备物资并提高奖励")}" ${royalMandateReason ? "disabled" : ""}>签发王令</button>` : ""}
      ${floor.type === "library" ? `<button class="detail-btn" data-action="library-study" data-floor-id="${floor.id}" ${libraryCooldown || !floor.workers.length || floor.stock <= 0 ? "disabled" : ""}>整理典藏</button>` : ""}
      ${isShowtimeFloorType(floor.type) ? `<button class="detail-btn" data-action="entertainment-show" data-floor-id="${floor.id}" title="${escapeAttr(showtimeReason || "组织演员与观众开演")}" ${showtimeReason ? "disabled" : ""}>${SHOWTIME_ACTIONS[floor.type] || "排演"}</button>` : ""}
      ${isComfortFloorType(floor.type) ? `<button class="detail-btn" data-action="comfort-session" data-floor-id="${floor.id}" title="${escapeAttr(comfortReason || "组织居民结伴休整")}" ${comfortReason ? "disabled" : ""}>${COMFORT_SESSION_ACTIONS[floor.type] || "组织休整"}</button>` : ""}
      <button class="detail-btn" data-action="hire" data-floor-id="${floor.id}">雇佣</button>
      <button class="detail-btn" data-action="upgrade-floor" data-floor-id="${floor.id}">升级 ${floorUpgradeCost(floor)}</button>
      <button class="detail-btn" data-action="speed" data-floor-id="${floor.id}">加速</button>
      <button class="detail-btn" data-action="open-build">建设</button>
    </div>`;
}

function renderFloorPerks(floor) {
  const perks = [];
  if (floor.type === "lobby") {
    perks.push(`入口调度 +${Math.round(lobbyDispatchBonus(state) * 100)}%`);
    perks.push(`优先派号 ${state.stats.lobbyPriorityDispatchesDone || 0}`);
    perks.push(elevatorIsMaxed() ? "满级直达接待" : "访客节奏优化");
  } else if (floor.type === "dwelling") {
    perks.push(`远行整备 +${Math.round(dwellingJourneyBonus(state) * 100)}%`);
    perks.push(`租金回响 +${Math.round(dwellingJourneyBonus(state) * 30)}%`);
    perks.push(`生活回访 +${Math.round(lifeStoryReviewBonus(state) * 100)}%`);
    perks.push(`已回访 ${state.stats.lifeStoryReviewsDone || 0}`);
    perks.push(`探险回执 ${state.stats.expeditionReportsDone || 0}`);
    perks.push(`路线档案 +${Math.round(expeditionReportBonus(state) * 100)}%`);
  } else if (!isBusiness(floor)) {
    return "";
  } else if (floor.type === "food") {
    perks.push(`快乐暖意 +${Math.round(foodWarmthBonus(state) * 55)}%`);
    perks.push(`探险补给 +${Math.round(foodWarmthBonus(state) * 22)}%`);
    perks.push(`高峰 ${state.stats.foodRushesDone || 0}`);
    perks.push(`上菜 ${state.stats.foodServingsDone || 0}`);
    perks.push(`桌次 ${state.stats.foodRushCoursesDone || 0}`);
    if (isActiveFoodRush(floor)) perks.push(`${currentFoodRushCourse(floor).label} · ${currentFoodRushPace(floor).label} ${Math.round(floor.foodRush.heat || 0)}%`);
  } else if (floor.type === "craft") {
    perks.push(`工具链 +${Math.round(craftToolBonus(state) * 100)}%`);
    perks.push(`补货省耗 +${Math.round(Math.min(0.2, craftToolBonus(state) * 0.42) * 100)}%`);
    perks.push(`探险装备 +${Math.round(craftToolBonus(state) * 24)}%`);
    perks.push(`校准 ${state.stats.toolTuneSessionsDone || 0}`);
    perks.push(`校准点 ${state.stats.toolTuneMarksDone || 0}`);
    if (isActiveToolTune(floor)) perks.push(`${currentToolTunePhase(floor).label}精度 ${Math.round(floor.toolTune.precision || 0)}%`);
  } else if (floor.type === "market") {
    perks.push(`订单 +${Math.round((orderNetworkBonus(state) - 1) * 100)}%`);
    perks.push(`容量 ${state.orders.length}/${orderCapacity(state)}`);
    perks.push(`销售 +${Math.round((businessIncomeMultiplier(floor, state) - 1) * 100)}%`);
    perks.push(`包裹 ${state.stats.marketParcelsDone || 0}`);
    perks.push(`打包 ${state.stats.marketParcelItemsPacked || 0}`);
    if (isActiveMarketParcel(floor)) perks.push(`${currentMarketParcelPhase(floor).label} ${floor.marketParcel.packed || 0}件`);
  } else if (floor.type === "library") {
    const next = nextCollectionItem(state);
    perks.push(`探险碎片 +${Math.round(libraryResearchBonus(state) * 100)}%`);
    perks.push(`典藏订单 +${Math.round((collectionOrderBonus(state) - 1) * 100)}%`);
    perks.push(`整理 ${state.stats.libraryStudiesDone || 0}`);
    if (next) perks.push(`下枚 ${next.name}`);
  } else if (floor.type === "kingdom") {
    perks.push(`王令订单 +${Math.round(kingdomMandateBonus(state) * 55)}%`);
    perks.push(`全城声望 +${Math.round(kingdomMandateBonus(state) * 100)}%`);
    perks.push(`签发 ${state.stats.royalMandatesDone || 0}`);
    perks.push(`回执 ${state.stats.royalCourierReceiptsDone || 0}`);
    if (isActiveRoyalMandate(floor)) perks.push(`${currentRoyalMandatePhase(floor).label} ${Math.ceil(floor.royalMandate.remaining)}s`);
  } else if (floor.type === "garden") {
    perks.push("快乐缓慢恢复");
    perks.push(`贵客 +${Math.round(gardenComfortBonus(state) * 36)}%`);
    perks.push(`休整 ${state.stats.comfortSessionsDone || 0}`);
    perks.push(`余韵 ${state.stats.comfortEchoesDone || 0}`);
    if (isActiveComfortAfterglow(floor)) perks.push(`${floor.comfortAfterglow.label} ${Math.ceil(floor.comfortAfterglow.remaining)}s`);
    if (isActiveComfortAfterglow(floor) && floor.comfortAfterglow.focus) perks.push(`调息 ${comfortFocusLabel(floor.comfortAfterglow)}`);
  } else if (floor.type === "entertainment") {
    perks.push("快乐稳定恢复");
    perks.push(`掌声奖励 +${Math.round(entertainmentJoyBonus(state) * 55)}%`);
    perks.push(`小剧 ${state.stats.entertainmentShowsDone || 0}`);
    perks.push(`现场反应 ${state.stats.showtimeReactionsDone || 0}`);
    if (isActiveShowtime(floor)) perks.push(`${currentShowtimeBeat(floor).label}热度 ${Math.round(floor.showtime.heat || 0)}%`);
  } else if (floor.type === "service") {
    perks.push(`排队缓冲 +${Math.round(serviceCareBonus(state) * 90)}%`);
    perks.push(`到站接待 +${Math.round(serviceCareBonus(state) * 55)}%`);
    perks.push(`照看 ${state.stats.serviceCareTouchesDone || 0}`);
    if (isActiveServiceCare(floor)) perks.push(`${currentServiceCarePhase(floor).label}妥帖 ${Math.round(floor.serviceCare.care || 0)}%`);
  } else if (floor.type === "observatory") {
    perks.push(`探险收益 +${Math.round(observatoryStarBonus(state) * 55)}%`);
    perks.push(`宝石概率 +${Math.round(observatoryStarBonus(state) * 35)}%`);
    perks.push(`校准 ${state.stats.starChartCalibrationsDone || 0}`);
    perks.push(`星标 ${state.stats.starChartMarksDone || 0}`);
    if (isActiveStarChart(floor)) perks.push(`${currentStarChartPhase(floor).label}清晰 ${Math.round(floor.starChart.focus || 0)}%`);
  } else if (floor.type === "skyport") {
    perks.push(`访客节奏 +${Math.round(skyportFlowBonus(state) * 185)}%`);
    perks.push(`订单/探险 +${Math.round(skyportFlowBonus(state) * 42)}%`);
  } else if (floor.type === "festival") {
    perks.push(`连送奖励 +${Math.round(festivalBuzzBonus(state) * 90)}%`);
    perks.push(`贵客热度 +${Math.round(festivalBuzzBonus(state) * 30)}%`);
  } else if (floor.type === "bathhouse") {
    perks.push(`补货加速 +${Math.round(bathhouseRestBonus(state) * 42)}%`);
    perks.push(`休整回租 +${Math.round(bathhouseRestBonus(state) * 26)}%`);
    perks.push(`休整 ${state.stats.comfortSessionsDone || 0}`);
    perks.push(`余韵 ${state.stats.comfortEchoesDone || 0}`);
    if (isActiveComfortAfterglow(floor)) perks.push(`${floor.comfortAfterglow.label} ${Math.ceil(floor.comfortAfterglow.remaining)}s`);
    if (isActiveComfortAfterglow(floor) && floor.comfortAfterglow.focus) perks.push(`调息 ${comfortFocusLabel(floor.comfortAfterglow)}`);
  } else if (floor.type === "clinic") {
    perks.push(`容错护理 +${Math.round(clinicCareBonus(state) * 100)}%`);
    perks.push(`情绪修复 +${Math.round(clinicCareBonus(state) * 42)}%`);
  } else if (floor.type === "clockwork") {
    perks.push(`全城节奏 +${Math.round(clockworkTempoBonus(state) * 100)}%`);
    perks.push(`施工/补货 +${Math.round(clockworkTempoBonus(state) * 36)}%`);
  } else if (floor.type === "aquarium") {
    perks.push(`贵客惊喜 +${Math.round(aquariumWonderBonus(state) * 44)}%`);
    perks.push(`探险观光 +${Math.round(aquariumWonderBonus(state) * 28)}%`);
  } else if (floor.type === "alchemy") {
    perks.push(`药剂线索 +${Math.round(alchemyPotionBonus(state) * 100)}%`);
    perks.push(`订单溢价 +${Math.round(alchemyPotionBonus(state) * 36)}%`);
  } else if (floor.type === "training") {
    perks.push(`接待韧性 +${Math.round(trainingDrillBonus(state) * 100)}%`);
    perks.push(`贵客演练 +${Math.round(trainingDrillBonus(state) * 28)}%`);
  } else if (floor.type === "treasure") {
    perks.push(`王室奖赏 +${Math.round(treasureVaultBonus(state) * 100)}%`);
    perks.push(`藏品溢价 +${Math.round(treasureVaultBonus(state) * 34)}%`);
  }
  if (!perks.length) return "";
  return `<div class="detail-perks">${perks.map((text) => `<span class="perk">${escapeHtml(text)}</span>`).join("")}</div>`;
}

function renderResidentList(residents, skillType = null) {
  if (!residents.length) {
    return `<div class="resident-list empty">暂无居民</div>`;
  }
  return `
    <div class="resident-list">
      ${residents
        .map((resident) => {
          const dream = FLOOR_TYPES[resident.dreamType]?.label || "岗位";
          const dreamFit = skillType && resident.dreamType === skillType ? "dream" : "";
          const skill = skillType ? `<span class="skill-pill ${dreamFit}">技能 ${resident.skills[skillType] || 1}</span>` : "";
          const job = residentJobLabel(resident);
          const life = renderMotiveStrip(resident, skillType || "dwelling");
          const trail = renderLifeTrailBadge(resident);
          const expedition = renderExpeditionBadge(resident);
          const comfort = renderComfortMemoryBadge(resident);
          const comfortClass = resident.comfortMemory ? "comfort-memory-active" : "";
          const expeditionClass = resident.expeditionId || latestExpeditionReportForPerson(resident) ? "expedition-report-active" : "";
          return `
            <div class="resident-card ${dreamFit} ${isActiveLifeVisit(resident) ? "life-story-active" : ""} ${comfortClass} ${expeditionClass}">
              <span class="mini-person person-sprite person-sprite--${spriteVariantForPerson(resident)}" style="--person-art:url('${spriteArtForPerson(resident)}')"></span>
              <span><strong>${escapeHtml(resident.name)}</strong><small>理想 ${dream} · ${job}</small>${life}${trail}${expedition}${comfort}</span>
              ${skill}
            </div>`;
        })
        .join("")}
    </div>`;
}

function renderResidentRoster() {
  if (!els.residentRoster || !els.rosterFilters) return;
  const residents = allResidents(state);
  const filters = [
    { id: "all", label: "全部" },
    ...TYPE_ORDER.filter((type) => type !== "dwelling").map((type) => ({ id: type, label: FLOOR_TYPES[type].label })),
  ];
  if (residentRosterFilter !== "all" && !filters.some((filter) => filter.id === residentRosterFilter)) {
    residentRosterFilter = "all";
  }
  const filtered =
    residentRosterFilter === "all" ? residents : residents.filter((resident) => resident.dreamType === residentRosterFilter);
  els.residentCount.textContent = `${filtered.length}/${residents.length}`;
  els.rosterFilters.innerHTML = filters
    .map((filter) => {
      const active = filter.id === residentRosterFilter ? "active" : "";
      return `<button class="roster-filter ${active}" data-action="filter-roster" data-filter="${filter.id}" data-type="${filter.id}">${filter.label}</button>`;
    })
    .join("");

  if (!filtered.length) {
    els.residentRoster.innerHTML = `<div class="roster-empty">暂无符合条件的居民</div>`;
    return;
  }

  els.residentRoster.innerHTML = filtered
    .map((resident) => {
      const dream = FLOOR_TYPES[resident.dreamType]?.label || "岗位";
      const job = residentJobLabel(resident);
      const mood = residentMoodClass(resident);
      const lifeFloor = resident.workFloorId ? findFloor(resident.workFloorId)?.type || "dwelling" : "dwelling";
      const life = renderMotiveStrip(resident, lifeFloor);
      const trail = renderLifeTrailBadge(resident);
      const expedition = renderExpeditionBadge(resident);
      const comfort = renderComfortMemoryBadge(resident);
      const comfortClass = resident.comfortMemory ? "comfort-memory-active" : "";
      const expeditionClass = resident.expeditionId || latestExpeditionReportForPerson(resident) ? "expedition-report-active" : "";
      return `
        <article class="roster-card ${isActiveLifeVisit(resident) ? "life-story-active" : ""} ${comfortClass} ${expeditionClass}" data-dream="${resident.dreamType}" data-mood="${mood}">
          <span class="roster-portrait">
            <span class="mini-person person-sprite person-sprite--${spriteVariantForPerson(resident)}" style="--person-art:url('${spriteArtForPerson(resident)}')"></span>
            <i class="mood-mark" aria-hidden="true"></i>
          </span>
          <span class="roster-copy">
            <strong>${escapeHtml(resident.name)}</strong>
            <small>理想 ${dream} · ${job}</small>
            ${renderSkillStrip(resident)}
            ${life}
            ${trail}
            ${expedition}
            ${comfort}
          </span>
        </article>`;
    })
    .join("");
}

function renderSkillStrip(resident) {
  const types = TYPE_ORDER.filter((type) => type !== "dwelling");
  return `
    <span class="skill-strip" aria-label="居民技能">
      ${types
        .map((type) => {
          const dream = resident.dreamType === type ? " dream" : "";
          return `<i class="${dream}" data-type="${type}" title="${FLOOR_TYPES[type].label}">${resident.skills[type] || 1}</i>`;
        })
        .join("")}
    </span>`;
}

function residentJobLabel(resident) {
  if (resident.expeditionId) return "探险中";
  if (isActiveLifeVisit(resident)) {
    const floor = findFloor(resident.lifeVisit.floorId);
    return `${resident.lifeVisit.label || lifeVisitLabel(resident.lifeVisit.need)} · ${floor?.name || "外出"}`;
  }
  if (!resident.workFloorId) return "无业";
  const floor = findFloor(resident.workFloorId);
  return floor ? `${floor.name}` : formatFloorLabel(resident.workFloorId);
}

function residentMoodClass(resident) {
  if (resident.expeditionId) return "away";
  if (isActiveLifeVisit(resident)) return "visiting";
  if (resident.comfortMemory) return "bright";
  const lifeMood = personMotiveMood(resident);
  if (lifeMood === "strained" || lifeMood === "seeking") return lifeMood;
  if (!resident.workFloorId) return "idle";
  const floor = findFloor(resident.workFloorId);
  if (floor?.type === resident.dreamType) return "dream";
  if (lifeMood === "bright") return "bright";
  return "working";
}

function renderQuests() {
  const completed = state.quests.filter((quest) => quest.claimed).length;
  const pending = pendingQuestRewards();
  els.questCount.textContent = pending.count ? `${completed}/${QUEST_DEFS.length} · ${pending.count}待领` : `${completed}/${QUEST_DEFS.length}`;
  els.quests.innerHTML = QUEST_DEFS.map((def) => {
    const questState = questEntry(def);
    const ready = isQuestReady(def);
    const current = Math.min(def.goal, questProgressValue(def));
    const pct = Math.round((current / def.goal) * 100);
    const status = questState.claimed ? "已领取" : ready ? "待领取" : `${current}/${def.goal}`;
    return `
      <div class="quest ${questState.claimed ? "done" : ""} ${ready ? "ready" : ""}">
        <div class="quest-head"><span>${def.title}</span><span>${status}</span></div>
        <small>${def.text} · 奖励 ${def.reward.coins} 金币 / ${def.reward.gems} 宝石</small>
        <div class="quest-progress-row">
          <div class="meter"><span style="width:${pct}%"></span></div>
          ${ready ? `<button class="quest-claim-btn" type="button" data-action="claim-quest" data-quest-id="${def.id}">领取</button>` : ""}
          ${questState.claimed ? `<span class="quest-claimed">已领取</span>` : ""}
        </div>
      </div>`;
  }).join("");
}

function renderOrderDispatchAction(dispatch, extraClass = "") {
  const disabled = dispatch.disabled ? "disabled" : "";
  const className = `detail-btn ${dispatch.tone === "ready" ? "primary" : ""} ${extraClass}`.trim();
  if (dispatch.action === "fulfill") {
    return `<button type="button" class="${escapeAttr(className)}" data-action="fulfill-order" data-order-id="${escapeAttr(dispatch.order.id)}" ${disabled}>${escapeHtml(dispatch.actionLabel)}</button>`;
  }
  if (dispatch.action === "mandate") {
    return `<button type="button" class="${escapeAttr(className)} royal-order-btn" data-action="royal-mandate-order" data-order-id="${escapeAttr(dispatch.order.id)}" ${disabled}>${escapeHtml(dispatch.actionLabel)}</button>`;
  }
  if (dispatch.action === "focus") {
    return `<button type="button" class="${escapeAttr(className)}" data-action="focus-order-floor" data-floor-id="${escapeAttr(dispatch.floorId)}" ${disabled}>${escapeHtml(dispatch.actionLabel)}</button>`;
  }
  return `<button type="button" class="${escapeAttr(className)}" disabled>${escapeHtml(dispatch.actionLabel || "等待")}</button>`;
}

function renderOrderSupplyBar(dispatch) {
  const { segments, order, info } = dispatch;
  const label = `库存 ${segments.stock}/${order.amount}，王令 ${segments.mandate}，市集 ${segments.packed}，缺 ${info.missing}`;
  return `
    <div class="meter order-supply-bar" title="${escapeAttr(label)}" aria-label="${escapeAttr(label)}">
      <i data-kind="stock" style="flex-basis:${segments.stockPct}"></i>
      <i data-kind="mandate" style="flex-basis:${segments.mandatePct}"></i>
      <i data-kind="parcel" style="flex-basis:${segments.packedPct}"></i>
      <i data-kind="missing" style="flex-basis:${segments.missingPct}"></i>
    </div>`;
}

function renderOrderDispatchSummary(summary) {
  if (!summary.dispatches.length) return "";
  const best = summary.best;
  const focus = best
    ? `
      <div class="order-dispatch-focus" data-tone="${escapeAttr(best.tone)}">
        <div>
          <strong>${escapeHtml(best.nextLabel)}</strong>
          <small>${escapeHtml(best.order.title)} · ${escapeHtml(best.detail)}</small>
        </div>
        ${renderOrderDispatchAction(best, "order-dispatch-action")}
      </div>`
    : "";
  return `
    <div class="order-dispatch-panel" data-tone="${escapeAttr(summary.tone)}">
      <div class="order-dispatch-head">
        <strong>王室订单调度桌</strong>
        <span>${Math.round(summary.progress)}% 已备</span>
      </div>
      <div class="order-dispatch-meter" aria-hidden="true"><i style="width:${Math.round(summary.progress)}%"></i></div>
      <div class="order-dispatch-stats">
        <span><b>${summary.ready}</b><small>可交付</small></span>
        <span><b>${summary.missing}</b><small>待补缺</small></span>
        <span><b>${summary.running}</b><small>流转中</small></span>
      </div>
      ${focus}
    </div>`;
}

function renderOrders() {
  ensureOrders(state);
  const mandateFloor = availableRoyalMandateFloor();
  const summary = orderDispatchSummary(mandateFloor);
  els.orderCount.textContent = summary.ready ? `${state.orders.length}/${orderCapacity(state)} · ${summary.ready}可交` : `${state.orders.length}/${orderCapacity(state)}`;
  const ordersHtml = summary.dispatches
    .map((dispatch) => {
      const order = dispatch.order;
      const info = dispatch.info;
      const owned = info.owned;
      const ready = info.ready;
      const prepared = info.prepared || 0;
      const mandatePrepared = info.mandatePrepared || 0;
      const packed = info.packed || 0;
      const parcelActive = Boolean(order.marketParcel?.active);
      const parcelShipped = Boolean(order.marketParcel?.shipped);
      const mandateActive = Boolean(order.royalMandate?.active);
      const mandateDelivered = Boolean(order.royalMandate?.delivered);
      const receiptBonus = Math.max(0, Number(order.royalMandate?.receiptBonus) || 0);
      const mandateReason = mandateActive
        ? "王令正在签发"
        : ready
          ? "这张订单已经可交付"
          : mandateFloor
            ? royalMandateActionBlockReason(mandateFloor, order)
            : "暂无可签令的王国楼层";
      const preparedParts = [
        mandatePrepared ? `王令 ${mandatePrepared}` : "",
        packed ? `市集打包 ${packed}` : "",
      ].filter(Boolean);
      const stockText = preparedParts.length
        ? `库存 ${Math.min(info.stockOwned, order.amount)}/${order.amount} · ${preparedParts.join(" · ")}`
        : `${Math.min(owned, order.amount)}/${order.amount}`;
      const floorButton = info.floor ? `<button type="button" class="detail-btn" data-action="focus-order-floor" data-floor-id="${info.floor.id}">定位</button>` : "";
      return `
        <div class="order dispatch-${escapeAttr(dispatch.tone)} ${ready ? "ready" : ""} ${order.source === "market" ? "market-order" : ""} ${mandatePrepared ? "mandated-order" : ""} ${mandateDelivered ? "mandate-delivered royal-courier-order" : ""} ${packed ? "parcel-order" : ""} ${parcelActive ? "parcel-active" : ""} ${mandateActive ? "mandate-active" : ""}">
          <div class="order-head">
            <span class="type-token">${FLOOR_TYPES[order.type].icon}</span>
            <span><strong>${escapeHtml(order.title)}</strong><small>${escapeHtml(order.note)}</small></span>
          </div>
          <div class="order-tags">
            <span>${orderSourceLabel(order)}</span>
            <span class="dispatch-tag" data-tone="${escapeAttr(dispatch.tone)}">${escapeHtml(dispatch.stateLabel)}</span>
            ${packed ? `<span class="parcel-tag">市集打包 ${packed}</span>` : ""}
            ${parcelActive ? `<span class="parcel-tag active">发货中</span>` : ""}
            ${parcelShipped && !parcelActive ? `<span class="parcel-tag shipped">已发货</span>` : ""}
            ${mandatePrepared ? `<span class="mandate-tag">王令预备 ${mandatePrepared}</span>` : ""}
            ${mandateActive ? `<span class="mandate-tag active">签发中</span>` : ""}
            ${mandateDelivered ? `<span class="mandate-tag delivered">信使送达</span>` : ""}
            ${receiptBonus ? `<span class="mandate-tag receipt">回执 +${receiptBonus}</span>` : ""}
            ${order.royalMandate?.seal ? `<span class="mandate-tag seal">御印</span>` : ""}
          </div>
          ${renderOrderSupplyBar(dispatch)}
          <div class="order-next-step" data-tone="${escapeAttr(dispatch.tone)}">
            <strong>${escapeHtml(dispatch.nextLabel)}</strong>
            <small>${escapeHtml(dispatch.detail)}</small>
          </div>
          <div class="order-foot">
            <span>${stockText} · ${order.reward} 金币${order.gemReward ? ` / ${order.gemReward} 宝石` : ""}</span>
            ${ready ? "" : floorButton}
            <button class="detail-btn royal-order-btn" data-action="royal-mandate-order" data-order-id="${order.id}" title="${escapeAttr(mandateReason || "调度王国楼层签发这张订单")}" ${mandateReason ? "disabled" : ""}>签令</button>
            <button class="detail-btn ${ready ? "primary" : ""}" data-action="fulfill-order" data-order-id="${order.id}" ${ready ? "" : "disabled"}>交付</button>
          </div>
        </div>`;
    })
    .join("");
  els.orders.innerHTML = renderOrderDispatchSummary(summary) + ordersHtml;
}

function renderCollection() {
  const progress = collectionProgress(state);
  const pct = Math.round((progress.total / progress.max) * 100);
  els.collectionCount.textContent = `${progress.completed}/${COLLECTION_DEFS.length} · ${progress.total}/${progress.max}`;
  const ordered = COLLECTION_DEFS.slice().sort((a, b) => {
    const av = state.collection[a.id] || 0;
    const bv = state.collection[b.id] || 0;
    return Number(av >= 3) - Number(bv >= 3) || bv - av || a.name.localeCompare(b.name, "zh-CN");
  });
  const nextText = progress.next ? `下枚优先：${progress.next.name} · ${state.collection[progress.next.id] || 0}/3` : "图鉴已满，后续碎片会转化为宝石";
  const summary = `
    <div class="collection-summary">
      <div class="collection-summary-head">
        <strong>典藏进度</strong>
        <span>${pct}%</span>
      </div>
      <div class="meter"><span style="width:${pct}%"></span></div>
      <small>${escapeHtml(nextText)} · 整理 ${state.stats.libraryStudiesDone || 0} 次</small>
    </div>`;
  const items = ordered.map((item) => {
    const value = state.collection[item.id] || 0;
    const done = value >= 3;
    const itemPct = Math.round((value / 3) * 100);
    const focus = progress.next?.id === item.id ? "next" : "";
    return `
      <div class="collection-item ${done ? "done" : ""} ${focus}">
        <span class="relic-mark" aria-label="${escapeAttr(item.name)} ${value}/3">${done ? "★" : value}</span>
        <div class="collection-copy">
          <strong>${escapeHtml(item.name)}</strong>
          <small>${escapeHtml(item.desc)}</small>
          <div class="collection-tags">
            <span>${escapeHtml(item.source || "订单 / 探险")}</span>
            <span>${done ? "已完成" : `${value}/3`}</span>
          </div>
          <div class="meter"><span style="width:${itemPct}%"></span></div>
        </div>
      </div>`;
  }).join("");
  els.collection.innerHTML = summary + items;
}

function renderInventoryMetric(label, value, note = "", tone = "") {
  return `
    <div class="inventory-item ${tone}">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      ${note ? `<small>${escapeHtml(note)}</small>` : ""}
    </div>`;
}

function renderInventoryPanel() {
  if (!els.inventoryPanel) return;
  ensureOrders(state);
  const pending = pendingQuestRewards();
  const progress = collectionProgress(state);
  const stockFloors = businessFloors(state);
  const stockTotal = stockFloors.reduce((sum, floor) => sum + (floor.stock || 0), 0);
  const stockMax = stockFloors.reduce((sum, floor) => sum + (floor.stockMax || 0), 0);
  const readyOrders = state.orders.filter((order) => orderStockInfo(order).ready).length;
  const activeExpeditions = state.expeditions.length;
  const reportCount = state.expeditionReports?.length || 0;
  const lifeStoryCount = state.lifeStories?.length || 0;
  const pendingReviews = pendingLifeStoryReviewCount(state);
  const recordItems = [
    renderInventoryMetric("余韵调息", `${state.stats.comfortFocusesDone || 0} 次`, `租金 ${state.stats.comfortRentFocusesDone || 0} / 探险 ${state.stats.comfortExpeditionFocusesDone || 0} / 恢复 ${state.stats.comfortRecoveryFocusesDone || 0}`),
    renderInventoryMetric("生活记录", `${lifeStoryCount} 段`, "居民外出与日常片段"),
    renderInventoryMetric("生活回访", `${state.stats.lifeStoryReviewsDone || 0} 次`, pendingReviews ? `${pendingReviews} 段待整理 / 家园 +${Math.round(lifeStoryReviewBonus(state) * 100)}%` : `家园 +${Math.round(lifeStoryReviewBonus(state) * 100)}%`),
    renderInventoryMetric("探险回执", `${reportCount} 份`, `路线档案 +${Math.round(expeditionReportBonus(state) * 100)}%`),
    renderInventoryMetric("餐桌高峰", `${state.stats.foodRushCoursesDone || 0} 桌次`, `${state.stats.foodRushesDone || 0} 次 / ${state.stats.foodServingsDone || 0} 份`),
    renderInventoryMetric("礼宾照看", `${state.stats.serviceCareTouchesDone || 0} 次`, `${state.stats.serviceCareSessionsDone || 0} 场 / 缓冲 +${Math.round(serviceCareBonus(state) * 90)}%`),
    renderInventoryMetric("星图校准", `${state.stats.starChartMarksDone || 0} 星标`, `${state.stats.starChartCalibrationsDone || 0} 场 / 星象 +${Math.round(observatoryStarBonus(state) * 100)}%`),
    renderInventoryMetric("工具校准", `${state.stats.toolTuneMarksDone || 0} 校准点`, `${state.stats.toolTuneSessionsDone || 0} 场 / 工具 +${Math.round(craftToolBonus(state) * 100)}%`),
    renderInventoryMetric("珍藏碎片", `${progress.total}/${progress.max}`, progress.next ? `下枚 ${progress.next.name}` : "图鉴已满"),
    renderInventoryMetric("任务奖励", pending.count ? `${pending.count} 待领` : "已清点", pending.count ? `${pending.coins} 金币 / ${pending.gems} 宝石` : "暂无待领"),
  ].join("");
  const overview = [
    renderInventoryMetric("金币", Math.floor(state.coins), pending.coins ? `任务待领 +${pending.coins}` : "建设、补货、雇佣"),
    renderInventoryMetric("宝石", state.gems, pending.gems ? `任务待领 +${pending.gems}` : "加速与扩充入口"),
    renderInventoryMetric("居民", `${allResidents(state).length}/${populationCap(state)}`, `快乐 ${Math.round(state.happiness)}`),
    renderInventoryMetric("连送", `x${state.streak || 0}`, "准确送达越多，奖励越高"),
    renderInventoryMetric("待领任务", pending.count ? `${pending.count} 个` : "无", pending.count ? `${pending.coins} 金币 / ${pending.gems} 宝石` : "暂无待领", pending.count ? "ready" : ""),
    renderInventoryMetric("王室订单", `${readyOrders}/${state.orders.length}`, `容量 ${orderCapacity(state)}`),
    renderInventoryMetric("楼层现货", `${stockTotal}/${stockMax || 0}`, `${stockFloors.length} 个经营楼层`),
    renderInventoryMetric("探险档案", `${reportCount} 份`, activeExpeditions ? `进行中 ${activeExpeditions}` : "暂无出发队伍"),
  ].join("");
  const relicItems = COLLECTION_DEFS.map((item) => {
    const value = state.collection[item.id] || 0;
    const pct = Math.round((value / 3) * 100);
    return `
      <div class="inventory-relic ${value >= 3 ? "done" : ""}">
        <div>
          <strong>${escapeHtml(item.name)}</strong>
          <small>${escapeHtml(item.source || "订单 / 探险")} · ${escapeHtml(item.desc)}</small>
        </div>
        <span>${value}/3</span>
        <div class="meter"><span style="width:${pct}%"></span></div>
      </div>`;
  }).join("");
  const stockItems = stockFloors.length
    ? stockFloors
        .map((floor) => {
          const pct = floor.stockMax ? Math.round((floor.stock / floor.stockMax) * 100) : 0;
          return `
            <div class="inventory-stock">
              <div>
                <strong>${escapeHtml(formatFloorLabel(floor.id))}层 ${escapeHtml(floor.name)}</strong>
                <small>${escapeHtml(FLOOR_TYPES[floor.type]?.label || "楼层")} · 等级 ${floor.level || 1} · 员工 ${floor.workers?.length || 0}</small>
              </div>
              <span>${floor.stock || 0}/${floor.stockMax || 0}</span>
              <div class="meter"><span style="width:${pct}%"></span></div>
            </div>`;
        })
        .join("")
    : `<div class="inventory-empty">还没有经营楼层库存。</div>`;
  els.inventoryPanel.innerHTML = `
    <section class="inventory-section">
      <div class="inventory-section-head">
        <h3>王国资产</h3>
        <span>${new Date(state.lastSavedAt || Date.now()).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}</span>
      </div>
      <div class="inventory-grid">${overview}</div>
    </section>
    <section class="inventory-section">
      <div class="inventory-section-head">
        <h3>珍藏道具</h3>
        <span>${progress.completed}/${COLLECTION_DEFS.length} · ${progress.total}/${progress.max}</span>
      </div>
      <div class="inventory-relic-list">${relicItems}</div>
    </section>
    <section class="inventory-section">
      <div class="inventory-section-head">
        <h3>楼层现货</h3>
        <span>${stockTotal}/${stockMax || 0}</span>
      </div>
      <div class="inventory-stock-list">${stockItems}</div>
    </section>
    <section class="inventory-section compact">
      <div class="inventory-section-head">
        <h3>记录</h3>
        <span>${lifeStoryCount} 段生活 / ${state.stats.lifeStoryReviewsDone || 0} 次回访 / ${reportCount} 份探险</span>
      </div>
      <div class="inventory-grid inventory-grid-compact">${recordItems}</div>
    </section>`;
}

function renderExpeditions() {
  const capacity = expeditionCapacity(state);
  const explorers = availableExplorers(state);
  const reportBonus = expeditionReportBonus(state);
  els.expeditionCount.textContent = `${state.expeditions.length}/${capacity}`;
  const active = state.expeditions
    .map((expedition) => {
      const pct = Math.round(expeditionProgress(expedition) * 100);
      const resident = getResident(expedition.residentId);
      const mark = expeditionCurrentWaymark(expedition);
      const next = expeditionNextWaymark(expedition);
      const comfortPrep = expedition.comfortPrepBonus > 0 ? ` · ${expedition.comfortPrepLabel || "舒缓余韵"} +${Math.round(expedition.comfortPrepBonus * 100)}%` : "";
      const starPrep = expedition.starChartPrep > 0 ? ` · 星图预报 +${Math.round(expedition.starChartPrep * 100)}%` : "";
      const toolPrep = expedition.toolTunePrep > 0 ? ` · 工具校准 +${Math.round(expedition.toolTunePrep * 100)}%` : "";
      const routeArchive = expedition.reportBonus > 0 ? ` · 路线档案 +${Math.round(expedition.reportBonus * 100)}%` : "";
      return `
        <div class="expedition-card active expedition-report-active" data-stage="${escapeAttr(mark.id)}">
          <div class="expedition-head">
            <span><strong>${escapeHtml(expedition.title)}</strong><small>${escapeHtml(expedition.residentName || resident?.name || "斥候")} · ${escapeHtml(mark.label)} · 剩余 ${Math.ceil(expedition.remaining)}s${escapeHtml(comfortPrep)}${escapeHtml(starPrep)}${escapeHtml(toolPrep)}${escapeHtml(routeArchive)}</small></span>
            <span class="expedition-tag">${escapeHtml(mark.label)}</span>
          </div>
          <div class="expedition-waymark-readout">
            <span>${escapeHtml(mark.text)}</span>
            <small>${next ? `下一路标：${next.label}` : "准备回城报告"}</small>
          </div>
          <div class="meter"><span style="width:${clamp(pct, 0, 100)}%"></span></div>
        </div>`;
    })
    .join("");

  const options = EXPEDITION_DEFS.map((def) => {
    const lock = expeditionLockReason(def);
    const full = state.expeditions.length >= capacity;
    const disabled = Boolean(lock) || full || !explorers.length;
    const best = explorers[0];
    const prep = best ? Math.min(0.24, comfortExpeditionPrepBonus(state) + (best.comfortMemory?.expeditionBonus || 0) * 0.72) : comfortExpeditionPrepBonus(state);
    const toolPrep = Math.min(0.12, activeToolTuneBonus(state) * 1.45 + toolTunePracticeBonus(state) * 0.22);
    const estimate = best ? `${def.coins[0] + Math.round(explorerPower(best) * 8)}-${def.coins[1] + Math.round(explorerPower(best) * 8)}` : `${def.coins[0]}-${def.coins[1]}`;
    const note = lock || (full ? "探险队已满" : explorers.length ? `${explorers.length} 位空闲居民${prep > 0 ? ` · 舒缓准备 +${Math.round(prep * 100)}%` : ""}${toolPrep > 0 ? ` · 工具校准 +${Math.round(toolPrep * 100)}%` : ""}${reportBonus > 0 ? ` · 路线档案 +${Math.round(reportBonus * 100)}%` : ""}` : "需要空闲居民");
    return `
      <button class="expedition-card option" data-action="start-expedition" data-expedition-id="${def.id}" ${disabled ? "disabled" : ""}>
        <div class="expedition-head">
          <span><strong>${def.title}</strong><small>${def.text}</small></span>
          <span class="expedition-tag">${def.tag}</span>
        </div>
        <div class="expedition-meta">
          <span>${def.duration}s</span>
          <span>${estimate} 金币</span>
          <span>${Math.round(def.relicChance * 100)}% 碎片</span>
          ${prep > 0 ? `<span class="comfort-prep-tag">舒缓 +${Math.round(prep * 100)}%</span>` : ""}
          ${toolPrep > 0 ? `<span class="expedition-report-tag">工具 +${Math.round(toolPrep * 100)}%</span>` : ""}
          ${reportBonus > 0 ? `<span class="expedition-report-tag">档案 +${Math.round(reportBonus * 100)}%</span>` : ""}
        </div>
        <small>${note}</small>
      </button>`;
  }).join("");

  els.expeditions.innerHTML = `${active}${options}`;
}

function renderLog() {
  els.log.innerHTML = state.logs
    .slice(0, 9)
    .map((entry) => `<div class="log-entry">${escapeHtml(entry.text)}</div>`)
    .join("");
}

function renderBuildOptions() {
  const directions = [
    { id: "up", title: "向上建摩天大楼", note: "在地表之上加建塔楼，形成迪迪王国的天空街区。" },
    { id: "down", title: "向下扩建地底楼层", note: "继续向地下开凿，扩展原本的洞窟王国。" },
  ];
  els.buildOptions.innerHTML = directions
    .map(
      (direction) => `
      <section class="build-direction ${preferredBuildDirection === direction.id ? "preferred" : ""}" data-direction="${direction.id}">
        <div class="build-direction-head">
          <strong>${direction.title}</strong>
          <small>${direction.note}</small>
        </div>
        <div class="build-option-grid">
          ${TYPE_ORDER.map((type) => renderBuildOption(type, direction.id)).join("")}
        </div>
      </section>`
    )
    .join("");
}

function renderBuildOption(type, direction) {
  const data = FLOOR_TYPES[type];
  const cost = buildCost(type, direction);
  const demand = demandScore(type);
  const lockedReason = buildLockReason(type, direction);
  const locked = Boolean(lockedReason);
  return `
    <button class="build-option ${locked ? "locked" : ""}" data-action="build" data-type="${type}" data-direction="${direction}" ${state.coins < cost || locked ? "disabled" : ""}>
      <span class="type-token">${data.icon}</span>
      <div class="build-option-body">
        <h3>${data.label}</h3>
        <p>${data.desc}${lockedReason ? ` · ${lockedReason}` : ""}</p>
        <span class="option-meta">
          <span>${cost} 金币</span>
          <span>${data.buildTime}s</span>
          <span>需求 ${demand}</span>
        </span>
      </div>
    </button>`;
}

function buildLockReason(type, direction = "down") {
  if (direction === "up" && state.floors.some((floor) => floor.status === "construction" && floor.direction === "up")) {
    return "天空塔楼已有施工队";
  }
  if (direction === "down" && state.floors.some((floor) => floor.status === "construction" && floor.direction !== "up")) {
    return "地底已有施工队";
  }
  if (["dwelling", "food", "service", "craft", "entertainment", "kingdom"].includes(type)) return "";
  if (type === "market" && state.stats.commissionsDone < 1) return "先完成 1 张王室订单";
  if (type === "library" && state.stats.relicPieces < 1) return "先获得 1 枚珍藏碎片";
  if (type === "garden" && direction !== "up") return "花园适合向上建造";
  if (type === "garden" && state.stats.skyFloorsBuilt < 1) return "先建起 1 层天空楼";
  if (type === "observatory" && direction !== "up") return "观星台适合向上建造";
  if (type === "observatory" && state.stats.skyFloorsBuilt < 1) return "先建起 1 层天空楼";
  if (type === "observatory" && state.stats.expeditionsDone < 1) return "先完成 1 次探险";
  if (type === "skyport" && direction !== "up") return "星港适合向上建造";
  if (type === "skyport" && state.stats.skyFloorsBuilt < 1) return "先建起 1 层天空楼";
  if (type === "skyport" && !businessFloors(state).some((floor) => ["market", "observatory", "garden"].includes(floor.type))) return "先建成市集、花园或观星台";
  if (type === "festival" && state.stats.shoppersServed < 8) return "先接待 8 位顾客";
  if (type === "festival" && !businessFloors(state).some((floor) => ["entertainment", "garden", "market"].includes(floor.type))) return "先建成演艺、花园或市集";
  if (type === "bathhouse" && direction !== "down") return "温泉适合向下开凿";
  if (type === "bathhouse" && state.stats.depthFloorsBuilt < 2) return "先建成 2 层地底楼";
  if (type === "clinic" && allResidents(state).length < 4) return "先安置 4 位居民";
  if (type === "clockwork" && !businessFloors(state).some((floor) => floor.type === "craft")) return "先建成 1 层工坊";
  if (type === "clockwork" && state.stats.floorsBuilt < 3) return "先建成 3 个新楼层";
  if (type === "aquarium" && direction !== "up") return "水族馆适合向上建造";
  if (type === "aquarium" && state.stats.skyFloorsBuilt < 1) return "先建起 1 层天空楼";
  if (type === "aquarium" && !businessFloors(state).some((floor) => ["garden", "observatory"].includes(floor.type))) return "先建成花园或观星台";
  if (type === "alchemy" && state.stats.floorsBuilt < 2) return "先建成 2 层基础楼";
  if (type === "training" && allResidents(state).length < 3) return "先安置 3 位居民";
  if (type === "treasure" && state.stats.commissionsDone < 1) return "先完成 1 张王室订单";
  return "";
}

function buildCost(type, direction = "down") {
  const base = 250 + state.floors.length * 82;
  const directionMod = direction === "up" ? 1.12 : 1;
  return Math.round(base * FLOOR_TYPES[type].costMod * directionMod);
}

function demandScore(type) {
  if (type === "dwelling") return Math.max(1, openJobs(state) - getVacancyTotal(state) + 2);
  const stocked = businessFloors(state).filter((floor) => floor.type === type).length;
  const workers = allResidents(state).filter((resident) => !resident.workFloorId && resident.dreamType === type).length;
  return Math.max(1, 5 + workers - stocked * 2);
}

function addResidentToDwelling(game, floor, resident) {
  resident.homeFloorId = floor.id;
  floor.residents.push(resident);
}

function allResidents(game) {
  return game.floors
    .filter((floor) => floor.type === "dwelling")
    .flatMap((floor) => floor.residents || []);
}

function getResident(id) {
  return allResidents(state).find((resident) => resident.id === id);
}

function businessFloors(game) {
  return game.floors.filter((floor) => isBusiness(floor));
}

function dwellingFloors(game) {
  return game.floors.filter((floor) => floor.type === "dwelling" && floor.status === "open");
}

function isBusiness(floor) {
  return floor && !["lobby", "dwelling"].includes(floor.type) && floor.status === "open";
}

function isOfflineBusiness(floor) {
  return floor && !["lobby", "dwelling"].includes(floor.type) && floor.status === "open";
}

function populationCap(game) {
  return dwellingFloors(game).reduce((sum, floor) => sum + floor.capacity, 0);
}

function getVacancy(floor) {
  return Math.max(0, (floor.capacity || 0) - (floor.residents?.length || 0));
}

function getVacancyTotal(game) {
  return dwellingFloors(game).reduce((sum, floor) => sum + getVacancy(floor), 0);
}

function openJobs(game) {
  return businessFloors(game).reduce((sum, floor) => sum + Math.max(0, 3 - floor.workers.length), 0);
}

function averageSkill(workerIds, type) {
  const workers = workerIds.map((id) => getResident(id)).filter(Boolean);
  if (!workers.length) return 0;
  return workers.reduce((sum, worker) => sum + workerSkillValue(worker, type), 0) / workers.length;
}

function offlineAverageSkill(game, workerIds, type) {
  const residents = game.floors
    .filter((floor) => floor.type === "dwelling")
    .flatMap((floor) => floor.residents || []);
  const workers = workerIds.map((id) => residents.find((resident) => resident.id === id)).filter(Boolean);
  if (!workers.length) return 0;
  return workers.reduce((sum, worker) => sum + workerSkillValue(worker, type), 0) / workers.length;
}

function workerSkillValue(worker, type) {
  return (worker.skills?.[type] || 1) + (worker.dreamType === type ? 0.8 : 0);
}

function countDreamWorkers(floor) {
  if (!isBusiness(floor)) return 0;
  return floor.workers.map((id) => getResident(id)).filter((resident) => resident?.dreamType === floor.type).length;
}

function getOrderedFloors(game = state) {
  return [...(game.floors || [])].sort((a, b) => a.id - b.id);
}

function getMinFloorId(game = state) {
  const ids = (game.floors || []).map((floor) => floor.id);
  return ids.length ? Math.min(...ids) : 0;
}

function getMaxFloorId(game = state) {
  const ids = (game.floors || []).map((floor) => floor.id);
  return ids.length ? Math.max(...ids) : 0;
}

function floorDirectionFromId(id) {
  if (id < 0) return "up";
  if (id === 0) return "ground";
  return "down";
}

function getFloorZone(floor) {
  if (floor.id < 0 || floor.direction === "up") return "sky";
  if (floor.id === 0 || floor.direction === "ground") return "ground";
  return "depth";
}

function formatFloorLabel(id) {
  const numeric = Number(id) || 0;
  return `${Math.abs(numeric)}`;
}

function findFloor(id) {
  return state.floors.find((floor) => floor.id === Number(id));
}

function getCurrentFloor() {
  return findFloor(Math.round(state.elevator.position));
}

function addCoins(value) {
  addCoinsToGame(state, value);
}

function addCoinsToGame(game, value) {
  game.coins += value;
  game.stats.coinsEarned += value;
}

function recordDelivery(perfect) {
  if (!perfect) {
    const buzz = festivalBuzzBonus(state);
    if ((state.streak || 0) >= 3 && Math.random() < buzz * 1.55) {
      state.streak = Math.max(1, Math.floor((state.streak || 0) / 2));
      state.happiness = clamp(state.happiness + 1, 0, 100);
      addLog("星愿剧场稳住了气氛，连送保留一半。");
      return;
    }
    if ((state.streak || 0) > 0 && Math.random() < clinicCareBonus(state) * 1.8) {
      state.streak = Math.max(0, state.streak - 1);
      addLog("医馆帮忙安抚了访客，连送只降 1 层。");
      return;
    }
    if ((state.streak || 0) > 0 && Math.random() < trainingDrillBonus(state) * 1.3) {
      state.streak = Math.max(1, Math.floor((state.streak || 0) * 0.45));
      addLog("勇者训练让队伍稳住脚步，连送保留了一部分。");
      return;
    }
    state.streak = 0;
    return;
  }
  state.streak = Math.min(99, (state.streak || 0) + 1);
  if (state.streak < 3) return;
  const applause = entertainmentJoyBonus(state);
  const bonus = Math.min(118, Math.round(state.streak * 6 * (1 + festivalBuzzBonus(state) * 0.9 + applause * 0.55)));
  state.coins += bonus;
  state.stats.coinsEarned += bonus;
  state.happiness = clamp(
    state.happiness +
      (state.streak % 5 === 0 ? 1 : 0) +
      (state.streak % 6 === 0 && applause > 0 ? 1 : 0) +
      (state.streak % 8 === 0 && festivalBuzzBonus(state) > 0 ? 1 : 0),
    0,
    100
  );
  showFloat(`连送 x${state.streak} +${bonus}`);
  if (state.streak === 3 || state.streak % 5 === 0) {
    addLog(`连续准确送达 x${state.streak}，额外奖励 ${bonus} 金币。`);
  }
  if (applause > 0 && state.streak % 4 === 0) {
    const applauseBonus = Math.round(14 + applause * 90);
    state.coins += applauseBonus;
    state.stats.coinsEarned += applauseBonus;
    addLog(`演艺楼层响起掌声，追加 ${applauseBonus} 金币。`);
  }
}

function addLog(text) {
  addLogToGame(state, text);
}

function addLogToGame(game, text) {
  game.logs.unshift(makeLog(game, text));
  game.logs = game.logs.slice(0, 24);
}

function makeLog(game, text) {
  return { id: game.nextLogId++, text };
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
  });
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

function showToast(message, options = {}) {
  const duration = clamp(Number(options.duration) || 2200, 900, 2600);
  clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.removeAttribute("aria-hidden");
  els.toast.classList.add("show");
  toastTimer = setTimeout(() => {
    els.toast.classList.remove("show");
    els.toast.setAttribute("aria-hidden", "true");
    window.setTimeout(() => {
      if (!els.toast.classList.contains("show")) els.toast.textContent = "";
    }, 240);
  }, duration);
}

function showFloat(message) {
  const node = document.createElement("div");
  node.className = "float-pop";
  node.textContent = message;
  document.body.appendChild(node);
  window.setTimeout(() => node.remove(), 1100);
}

function isFullscreenActive() {
  return Boolean(document.fullscreenElement || document.webkitFullscreenElement);
}

function updateFullscreenButton() {
  const button = document.getElementById("fullscreenBtn");
  if (!button) return;
  const active = isFullscreenActive();
  button.title = active ? "退出全屏" : "进入全屏";
  button.setAttribute("aria-label", active ? "退出全屏" : "进入全屏");
  button.classList.toggle("active", active);
  document.body.classList.toggle("fullscreen-active", active);
}

function updateElevatorToggleButton() {
  const button = document.getElementById("elevatorToggleBtn");
  if (!button) return;
  const open = document.body.classList.contains("elevator-open");
  button.classList.toggle("active", open);
  button.setAttribute("aria-expanded", open ? "true" : "false");
}

function isMobilePanelLayout() {
  if (typeof window === "undefined") return false;
  if (typeof window.matchMedia !== "function") {
    return window.innerWidth <= 980;
  }
  return window.matchMedia(MOBILE_PANEL_QUERY).matches;
}

function updateResponsiveLayoutState() {
  const mobile = isMobilePanelLayout();
  document.body.classList.toggle("mobile-panel-layout", mobile);
  document.body.classList.toggle("mobile-panel-open", mobile && mobilePanelOpen);
  if (!mobile) {
    document.body.removeAttribute("data-mobile-panel");
  } else {
    document.body.setAttribute("data-mobile-panel", mobilePanelOpen ? activeMobilePanel : "closed");
  }
  document.querySelectorAll("[data-mobile-panel]").forEach((section) => {
    section.classList.toggle("mobile-panel-active", mobile && mobilePanelOpen && section.dataset.mobilePanel === activeMobilePanel);
  });
  if (els.mobilePanelDock) {
    els.mobilePanelDock.hidden = !mobile;
    els.mobilePanelDock.querySelectorAll(".mobile-panel-tab").forEach((button) => {
      const target = button.dataset.mobilePanelTarget;
      const active = mobilePanelOpen && target === activeMobilePanel;
      button.classList.toggle("active", active);
      button.classList.toggle("closed", target === "close" && !mobilePanelOpen);
      if (target && target !== "close") button.setAttribute("aria-expanded", active ? "true" : "false");
    });
  }
}

function setMobilePanel(panel = MOBILE_PANEL_DEFAULT, open = true) {
  activeMobilePanel = panel === "close" ? activeMobilePanel : panel;
  mobilePanelOpen = panel === "close" ? false : Boolean(open);
  updateResponsiveLayoutState();
}

function toggleElevatorPanel(force) {
  const open = typeof force === "boolean" ? force : !document.body.classList.contains("elevator-open");
  document.body.classList.toggle("elevator-open", open);
  updateElevatorToggleButton();
}

async function toggleFullscreen() {
  try {
    if (isFullscreenActive()) {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen();
      } else {
        showToast("当前浏览器不支持退出全屏");
      }
      return;
    }
    const target = document.documentElement;
    if (target.requestFullscreen) {
      await target.requestFullscreen();
    } else if (target.webkitRequestFullscreen) {
      await target.webkitRequestFullscreen();
    } else {
      showToast("这个浏览器不支持全屏，可尝试添加到主屏幕");
    }
  } catch {
    showToast("全屏切换失败");
  } finally {
    updateFullscreenButton();
  }
}

function bindEvents() {
  document.getElementById("elevatorToggleBtn")?.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleElevatorPanel();
  });
  document.getElementById("upBtn").addEventListener("click", () => moveElevator(-1));
  document.getElementById("downBtn").addEventListener("click", () => moveElevator(1));
  document.getElementById("dropBtn").addEventListener("click", dropPassenger);
  document.getElementById("upgradeElevatorBtn").addEventListener("click", upgradeElevator);
  document.getElementById("saveBtn").addEventListener("click", () => saveGame(true));
  document.getElementById("resetBtn").addEventListener("click", resetGame);
  document.getElementById("guideBtn").addEventListener("click", openGuideModal);
  els.inventoryBtn?.addEventListener("click", openInventoryModal);
  document.getElementById("fullscreenBtn").addEventListener("click", toggleFullscreen);
  document.getElementById("closeBuildBtn").addEventListener("click", closeBuildModal);
  document.getElementById("closeGuideBtn").addEventListener("click", () => closeGuideModal(true));
  document.getElementById("closeInventoryBtn")?.addEventListener("click", closeInventoryModal);
  els.mobilePanelDock?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-mobile-panel-target]");
    if (!button) return;
    const target = button.dataset.mobilePanelTarget || MOBILE_PANEL_DEFAULT;
    if (target === "close") {
      setMobilePanel("close", false);
      return;
    }
    const shouldOpen = !(mobilePanelOpen && activeMobilePanel === target);
    setMobilePanel(target, shouldOpen);
  });
  els.floorJump.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action='target-floor']");
    if (!button) return;
    setElevatorTarget(button.dataset.floorId);
  });
  els.buildModal.addEventListener("click", (event) => {
    if (event.target === els.buildModal) closeBuildModal();
  });
  document.addEventListener("click", (event) => {
    if (!document.body.classList.contains("elevator-open")) return;
    if (event.target.closest(".elevator-card") || event.target.closest("#elevatorToggleBtn")) return;
    toggleElevatorPanel(false);
  });
  els.guideModal.addEventListener("click", (event) => {
    if (event.target === els.guideModal) closeGuideModal(true);
  });
  els.inventoryModal?.addEventListener("click", (event) => {
    if (event.target === els.inventoryModal) closeInventoryModal();
  });
  els.rosterFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action='filter-roster']");
    if (!button) return;
    residentRosterFilter = button.dataset.filter || "all";
    render(true);
  });

  els.kingdom.addEventListener("click", (event) => {
    const actionNode = event.target.closest("[data-action]");
    if (!actionNode) return;
    const action = actionNode.dataset.action;
    if (action === "board") {
      event.stopPropagation();
      boardVisitor(Number(actionNode.dataset.visitorId));
      return;
    }
    if (action === "select-floor") {
      state.selectedFloorId = Number(actionNode.dataset.floorId);
      setMobilePanel("detail", true);
      render(true);
      return;
    }
    if (action === "open-build") {
      openBuildModal(actionNode.dataset.direction || preferredBuildDirection);
    }
  });

  els.floorDetail.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const floorId = Number(button.dataset.floorId);
    switch (button.dataset.action) {
      case "stock":
        startStock(floorId);
        break;
      case "hire":
        hireBestWorker(findFloor(floorId));
        break;
      case "upgrade-floor":
        upgradeFloor(floorId);
        break;
      case "collect-rent":
        collectRent(floorId);
        break;
      case "start-dwelling-expedition":
        startDwellingExpedition(floorId);
        break;
      case "review-life-story":
        reviewLifeStory(button.dataset.storyId, floorId);
        break;
      case "market-deal":
        startMarketDeal(floorId);
        break;
      case "royal-mandate":
        startRoyalMandate(floorId);
        break;
      case "library-study":
        startLibraryStudy(floorId);
        break;
      case "food-rush":
        startFoodRush(floorId);
        break;
      case "service-care":
        startServiceCare(floorId);
        break;
      case "star-chart":
        startStarChart(floorId);
        break;
      case "tool-tune":
        startToolTune(floorId);
        break;
      case "comfort-session":
        startComfortSession(floorId);
        break;
      case "comfort-focus":
        focusComfortAfterglow(floorId, button.dataset.focus);
        break;
      case "entertainment-show":
        startEntertainmentShow(floorId);
        break;
      case "dispatch-lobby":
        dispatchLobbyVisitor();
        break;
      case "board":
        boardVisitor(Number(button.dataset.visitorId), { routeDispatch: Boolean(button.closest(".lobby-route-board")) });
        break;
      case "speed":
        speedUpFloor(floorId);
        break;
      case "open-build":
        openBuildModal(button.dataset.direction || preferredBuildDirection);
        break;
      case "call-lobby":
        state.selectedFloorId = 0;
        setMobilePanel("detail", true);
        render(true);
        break;
      default:
        break;
    }
  });

  els.quests.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action='claim-quest']");
    if (!button || button.disabled) return;
    claimQuest(button.dataset.questId);
  });

  els.orders.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    if (button.dataset.action === "fulfill-order") {
      fulfillOrder(button.dataset.orderId);
      return;
    }
    if (button.dataset.action === "focus-order-floor") {
      state.selectedFloorId = Number(button.dataset.floorId);
      setMobilePanel("detail", true);
      render(true);
      return;
    }
    if (button.dataset.action === "royal-mandate-order") {
      const floor = availableRoyalMandateFloor();
      if (!floor) {
        showToast("暂无可签令的王国楼层");
        return;
      }
      state.selectedFloorId = floor.id;
      setMobilePanel("detail", true);
      startRoyalMandate(floor.id, button.dataset.orderId);
    }
  });

  els.expeditions.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action='start-expedition']");
    if (!button || button.disabled) return;
    startExpedition(button.dataset.expeditionId);
  });

  els.buildOptions.addEventListener("click", (event) => {
    const option = event.target.closest("[data-action='build']");
    if (!option || option.disabled) return;
    buildFloor(option.dataset.type, option.dataset.direction);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeBuildModal();
      closeInventoryModal();
      closeGuideModal(false);
      return;
    }
    if (event.target.closest("button")) return;
    if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") {
      event.preventDefault();
      moveElevator(-1);
    }
    if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") {
      event.preventDefault();
      moveElevator(1);
    }
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      if (state.queue[0]) boardVisitor(state.queue[0].id);
    }
    if (event.key.toLowerCase() === "b") openBuildModal();
  });

  window.addEventListener("resize", updateResponsiveLayoutState);
  document.addEventListener("fullscreenchange", updateFullscreenButton);
  document.addEventListener("webkitfullscreenchange", updateFullscreenButton);
  document.addEventListener("selectstart", preventFullscreenBrowserGesture);
  document.addEventListener("dragstart", preventFullscreenBrowserGesture);
  document.addEventListener("contextmenu", preventFullscreenBrowserGesture);
}

function preventFullscreenBrowserGesture(event) {
  if (!isFullscreenActive()) return;
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (!target.closest("#app")) return;
  event.preventDefault();
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  const isLocal = ["localhost", "127.0.0.1"].includes(location.hostname);
  if (location.protocol !== "https:" && !isLocal) return;
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

function maybeShowGuide() {
  if (guideReady) return;
  guideReady = true;
  const params = new URLSearchParams(location.search);
  if (params.has("guide")) {
    window.setTimeout(openGuideModal, 450);
    return;
  }
  try {
    localStorage.setItem(GUIDE_KEY, "seen");
  } catch {
    // The guide remains available from the top-left notice button.
  }
}

function loop(now) {
  const dt = Math.min(0.08, (now - lastTime) / 1000);
  lastTime = now;
  update(dt);
  render(false);
  updateElevatorCar();
  requestAnimationFrame(loop);
}

bindEvents();
registerServiceWorker();
render(true);
maybeShowGuide();
requestAnimationFrame(loop);
