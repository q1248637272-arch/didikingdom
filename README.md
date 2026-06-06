# 迪迪王国

这是一个受 Glu 老手游 `Lil' Kingdom / 小小王国` 启发的原创浏览器原型。它保留了城堡楼层经营、升降梯送客、居民入住、雇佣、补货、建设和任务奖励的核心循环，并扩展成“向下地底王国 + 向上摩天塔楼”的双向建设，但没有使用原作名称、代码或素材。

## 本地运行

直接打开 `index.html` 可以游玩；最近一次 v56 本地验证使用：

```text
http://127.0.0.1:8806
```

## 玩法切片

- 点击大厅访客让其进入升降梯，升降梯会前往访客想去的楼层。
- 大厅现在会显示派号路线板，推荐优先接待目标；派号成功会积累入口调度经验并给少量额外收益。
- 也可以用升降梯面板里的 `F0/F1/...` 快捷按钮直接调度楼层。
- 到达目标楼层后点击“下客”，居民会入住，顾客会消费，特殊访客会触发奖励。
- 连续准确送达会叠加连送奖励，断送或送错会清零。
- 房间内人物会像小型生活模拟一样自由移动到床、餐桌、柜台、书架、舞台等热点，结伴互动，并通过小图形表达餐饮、娱乐和社交需求；餐饮和演艺房间会更容易触发吃饭、上菜、看演出和鼓掌。
- 人物现在会持续模拟餐饮、娱乐、社交和休息动机，互动会回补需求并积累熟人关系；居民卡片和名册会用四色生活条显示当前状态。
- 手机端会显示底部控制抽屉，可切换当前楼层、居民、任务、订单、图鉴、探险和日志。
- 人物会根据需求和熟人关系结伴出门，去吃饭、看演出、找朋友或休息，不再只是原地摇晃。
- 花园和温泉现在可以主动组织“花园茶会”与“温泉休整”，消耗准备库存邀请低需求居民结伴放松，地图会显示休整光效、状态图标和详情面板；花园与温泉背景已更新为无文字的 `room-garden-v2.webp`、`room-bathhouse-v2.webp`。
- 演艺楼层现在可以主动排演“烛光小剧”，会消耗道具库存邀请娱乐/社交需求高的居民入座，演员与观众会在房间里形成表演、鼓掌、合演等互动，并通过详情面板、状态图标和舞台光效反馈演出进度。
- v56 继续把演艺楼层做成“会热起来的现场”：新增段落、热度、现场反应和收益沉淀，演出面板会直接显示进度条和反应数；这次图像网关超时，所以先保留 `docs/v56-entertainment-theater-image-prompt.txt` 作为后续刷新演艺房间背景的提示词。
- 选中经营楼层可以雇佣居民、补货、升级、加速，并查看员工技能。
- 选中居住楼层可以收租、升级、派空闲居民外出探险，并查看居民理想工作。
- 建设新楼层可以选择向地下开凿，也可以向上加建摩天大楼，天空层会显示为 `T1/T2/...`。
- 离线后再次打开会结算营业收入和租金。
- 每类房间都有专属功能反馈：宿舍远行整备与租金回响、餐饮暖锅补给、工坊工具链、市集订单网络、王国王令、书库典藏、花园舒缓、演艺掌声、服务礼宾、观星星象、星港通航、庆典热度、温泉休整、医馆容错、机巧加速、水族水光、秘药线索、勇者演练、珍宝宝库。
- 地图房间图像不再叠加中文状态文字，状态改用图形标记；宿舍背景已更新为无文字的 `room-dwelling-v3.webp`。
- 市集楼层现在可以主动撮合快单，订单栏会显示容量、来源、缺口和备货定位；市集背景已更新为无文字的 `room-market-v2.webp`。
- 书库楼层现在可以主动整理典藏，消耗书库存量来优先补齐图鉴缺口，并逐步提升探险碎片和典藏订单收益；书库背景已更新为无文字的 `room-library-v2.webp`。
- 新增高级楼层：秘药、勇者、珍宝，会随着基础建设、居民和订单进度解锁。
- 新增天空楼层：星港驿站，会提升访客抵达、订单网络和探险航线效率。
- 工坊楼层现在会形成工具链，降低补货损耗，提升订单网络、探险装备和全城施工/补货节奏。
- 王室订单会消耗指定库存并发放金币、宝石和珍藏碎片。
- 珍藏图鉴提供长期收集目标，碎片来自订单、贵宾事件和书库整理；图鉴界面会显示总进度、下一枚目标、来源标签和单件进度条。
- 键盘支持 `W / ↑`、`S / ↓` 移动升降梯，`Space / Enter` 下客，`B` 打开建设。
- v54 进行了轻量化清理：发布包移除了已被新版替代的旧房间图和旧表演者 PNG，表演者素材改为无损 WebP；发布运行目录只保留当前必要资产，本地旧浏览器配置、旧截图、图像中间产物和过期生成记录已清理。
- v55 深化了旧演艺玩法：新增小剧任务、演出冷却、观众需求撮合、掌声金币奖励和娱乐/社交恢复，并保留 `docs/v55-entertainment-showtime-image-prompt.txt` 供后续图像网关恢复后刷新演艺房间背景。

## v57 Update

- v57 deepens the old food floor with an active `餐桌高峰` loop.
- Food floors can now organize a dining rush that pulls hungry residents into visible table service, tracks pace/heat/servings, and pays out through staged meal income.
- The food detail panel, room state tag, floor data attributes, and mobile layout now expose `food-rush-panel`, `data-food-rush-pace`, and `data-food-rush-heat` so the old room reads as a live busy space instead of a passive stock bar.
- Local verification for this pass used `http://127.0.0.1:8807/` with `tmp/verify-v57-food-rush.mjs`.

## Cloudflare Pages

项目是纯静态文件，可直接部署到 Cloudflare Pages。当前已包含：

- `wrangler.toml`
- `_headers`
- `manifest.webmanifest`
- `sw.js`
- `icons/icon.svg`
- `package.json` 的 `deploy` 脚本

有 Wrangler 和 Cloudflare 登录态时可运行：

```text
wrangler pages deploy dist --project-name little-depths
```

## GitHub 同步

仓库包含 `.github/workflows/cloudflare-pages.yml`，但当前发布流程以本地 Wrangler 直传 Cloudflare 为准；GitHub 主要用于同步代码和 `dist`。需要只同步 GitHub 时，提交信息可带 `[skip ci]`，避免触发 GitHub Actions 部署 Cloudflare。

如果以后重新启用 GitHub Actions 部署，需要在 GitHub 仓库的 Secrets 里配置并验证：

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

没有 Wrangler 时，也可以把生成的 `cloudflare-pages-upload.zip` 拖到 Cloudflare Pages 的 Direct Upload 页面。

线上地址：

```text
https://little-depths.pages.dev/
```

GitHub 仓库：

```text
https://github.com/q1248637272-arch/didikingdom
```

## 资料摘要

- `Lil' Kingdom` 的中文页面写到“小小王国现在有中文版了”，并描述了“地下王国”“挖掘、建造”“居民生活工作环境”等卖点。
- Glu 的 2012 年 10-K 将 `Lil' Kingdom` 列为 2012 年 4 月发布的自有 IP 休闲游戏。
- Gamezebo 2012 年评测把它概括成地下版塔楼经营：建楼层、安排居民、补货赚钱、继续扩建，并包含升降梯送访客和理想工作。
- 同一评测还提到宝石用于加速、购买特殊物品或升级升降梯，任务/收藏会解锁独特楼层。

## 参考链接

- https://lil-kingdom.appstor.io/zh/
- https://www.gamezebo.com/reviews/lil-kingdom-review/
- https://www.sec.gov/Archives/edgar/data/1366246/000119312513109950/d453444d10k.htm
- https://www.giantbomb.com/lil-kingdom/3030-38495/
