# 迪迪王国

这是一个受 Glu 老手游 `Lil' Kingdom / 小小王国` 启发的原创浏览器原型。它保留了城堡楼层经营、升降梯送客、居民入住、雇佣、补货、建设和任务奖励的核心循环，并扩展成“向下地底王国 + 向上摩天塔楼”的双向建设，但没有使用原作名称、代码或素材。

## 本地运行

直接打开 `index.html` 可以游玩；最近一次 v77 本地验证使用：

```text
http://127.0.0.1:8828
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
- v63 深化旧花园/温泉舒缓系统：茶会或温泉休整结束后会留下“舒缓余韵”，地图、详情面板、居民卡、名册和探险面板都会显示回租、动机缓冲与探险准备收益。
- v64 深化旧探险系统：宿舍派出的斥候现在会在途中留下出发/营地/回程路标，完成后沉淀为可读的探险回执；地图、宿舍面板、居民卡和探险列表都会显示路线档案与回执收益。
- v65 把任务奖励改为手动领取：完成后任务会进入“待领取”状态，玩家点击任务面板里的“领取”才会获得金币和宝石；顶部新增“资产背包”入口，可集中查看金币、宝石、居民、待领任务奖励、珍藏道具、楼层库存、订单和探险档案。
- v66 翻新旧入口大厅：大厅访客会累积等待压力，推荐派号会按贵宾、久候、库存/空房等综合排序；旧地图大厅增加候车道和路线信号，电梯面板和路线票显示“顺畅/繁忙/压线”等状态，并用 `gpt-image-2` 刷新了无文字大厅背景 `room-lobby-v3.webp`。
- v67 翻新旧餐饮楼层：餐桌高峰现在会显示服务轨、桌况点、菜序灯和下一次上菜倒计时；新增 `流水上菜` 手动领取任务，资产背包也会记录高峰桌次、组织次数和上菜份数，并用 `gpt-image-2` 刷新了无文字厨房背景 `room-food-v3.webp`。
- v69 翻新旧观星台：观星台现在可主动 `星图校准`，消耗星盘耗材拉居民读星、为正在进行的探险缩短时间并沉淀星图预报奖励；新增 `星图校准` 手动领取任务，资产背包记录校准场次和星标，并用 `gpt-image-2` 刷新了无文字云顶观星背景 `room-observatory-v2.webp`。
- v77 把人物脚底线修复扩展到全部房间：所有已有经营房间和后续新建房间统一继承安全地板基线，避免任何房间再次只露头或陷进底部前景。
- v76 修正宿舍人物贴地基线：人物不再掉进底部前景或只露头，而是完整站在床前可视地板线上。
- v75 修复移动端临时互动提示和宿舍人物贴地：`访客已进入电梯`、`灯号已派发` 等无需确认的 toast 会在 3 秒内淡出、清空文字并不拦截点击；旧宿舍地图的人物舞台恢复到视觉地面，社交组合和单人不再悬浮在窗边。
- v74 深化旧宿舍/生活足迹系统：生活小故事现在会进入可手动点击的 `回访` 循环，回访会标记故事、增加宿舍租金准备、回补居民动机与关系，并新增 `生活回访` 手动领取任务；资产背包记录待回访和已回访次数，宿舍地图用无文字状态符号和路径光点提示可整理故事。
- v73 修复全局排版审查发现的移动端重叠：金币/宝石/人口等资源条固定回顶部可见，底部功能栏不再盖住资源，互动提示会抬到展开面板上方，弹窗层级也会压住 toast。
- v72 深化旧花园/温泉余韵：茶会或休整结束后的余韵现在可手动导向 `租金回响`、`探险整备` 或 `居民恢复`，新增 `余韵调息` 手动领取任务，资产背包记录三种导向次数；同时修复参与者提前离场导致余韵丢失的旧玩法边界，并用 `gpt-image-2` 刷新无文字花园背景 `room-garden-v3.webp`。
- v71 翻新旧工坊：工坊现在可主动 `工具校准`，消耗工坊零件拉居民到工具台，分阶段积累校准点，支援施工、补货、探险和工坊订单；新增 `工具校准` 手动领取任务，资产背包记录校准场次和校准点，并用 `gpt-image-2` 刷新了无文字工坊背景 `room-craft-v3.webp`。
- v68 翻新旧服务楼层：露台花坊现在可主动安排 `礼宾照看`，消耗花礼把居民拉入服务层，分阶段降低大厅等待压力、奖励金币/幸福/租金准备；新增 `礼宾照看` 手动领取任务，资产背包记录照看次数和场次，并用 `gpt-image-2` 刷新了无文字花坊礼宾背景 `room-service-v2.webp`。
- v62 继续深化角色生活系统：居民外出现在会在出发楼层和目标楼层留下稳定的生活路线，完成后沉淀为“生活小故事”，地图、楼层详情、居民卡片和名册都会显示最近足迹与需求回补，不再用原地震动冒充互动。
- v61 继续深化旧王国楼层：王令现在会显示信使路线、送达阶段和回执奖励，地图、详情面板和订单卡都会反馈信使进度；回执会提高订单奖励，交付时仍只扣除未被王令预备的真实库存。
- v60 深化了旧市集楼层：撮合快单现在会进入“议价 / 打包 / 发货”的包裹流，地图、详情面板和订单卡会显示打包进度、发货状态与市集已打包数量；打包会先扣除真实经营库存，交付时只扣剩余未打包部分。
- v59 深化了旧王国楼层：王国现在可以主动“签发王令”，消耗印信推进缺货订单、增加加赏和御印机会；订单卡会显示真实库存、王令预备量、签发中状态和“签令”按钮，交付时只扣除剩余真实库存。
- v58 重制了角色互动表现：社交场景会经历靠近、互动、收束三个阶段，使用稳定站位、朝向、姿态和小道具焦点来表达互动，不再用原地震动冒充角色行为。
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

## v77 Update

- v77 generalizes the room-person footing fix from a dwelling-only patch into a shared `--room-person-footing` baseline on `.floor`, so current and future rooms inherit the same safe visual floor line.
- The v75 anti-floating depth variables remain, but every `.life-stage` resident/worker/social pair now uses the shared footing offset instead of a too-low default.
- Added `tmp/verify-v77-all-room-footing.mjs`, which seeds and verifies all known non-lobby room types: dwelling, food, service, craft, entertainment, kingdom, market, library, garden, observatory, skyport, festival, bathhouse, clinic, clockwork, aquarium, alchemy, training, and treasure.
- The browser QA confirms every tested room renders people with safe stage/scene bottom gaps, no missing room types, no mobile horizontal overflow, and the transient toast behavior still passes.
- Bumped `index.html` / `sw.js` to v77, synced `dist`, and verified at `http://127.0.0.1:8828/`. Screenshot: `verification-v77-all-room-footing-room-local.png`.
- Cloudflare production and preview both load v77. Preview for this pass: `https://de65b1b7.little-depths.pages.dev/`.

## v76 Update

- v76 corrects the v75 dwelling footing follow-up: residents/social pairs no longer sink into the bottom foreground or appear as heads on the floor.
- Added dwelling-only sprite footing offsets so other floor maps keep the v75 grounding fix while the old dwelling background aligns feet to the visible bed-front floor line.
- Bumped `index.html` / `sw.js` to v76, synced `dist`, and verified with `tmp/verify-v76-dwelling-footing.mjs` at `http://127.0.0.1:8827/`. Screenshot: `verification-v76-dwelling-footing-room-local.png`.
- Cloudflare production and preview both load v76. Preview for this pass: `https://ccbda666.little-depths.pages.dev/`.

## v75 Update

- v75 focuses on the reported mobile feedback and old dwelling-map layout issues.
- Toast feedback now clamps even long requested durations to at most `2600ms`, fades out, becomes `aria-hidden`, clears its text after the transition, and keeps `pointer-events: none` so non-confirmation messages such as `访客已进入电梯` do not block UI.
- The lobby boarding / route-dispatch toast explicitly uses a short `2400ms` duration.
- Room people keep their depth ordering from motion `y`, but visual lift is capped through `--person-lift` / `--pair-lift` instead of moving sprites far above the floor.
- Restored dwelling `.room-scene` to absolute map positioning after the v74 life-review overlay had made it relative, which was the reason some residents appeared to float near the window.
- Bumped `index.html` / `sw.js` to v75, synced `dist`, and verified with `tmp/verify-v75-toast-grounding.mjs` at `http://127.0.0.1:8826/`. Screenshots: `verification-v75-toast-grounding-toast-local.png`, `verification-v75-toast-grounding-mobile-local.png`, and `verification-v75-toast-grounding-room-local.png`.
- Cloudflare production and preview both load v75. Preview for this pass: `https://4c7e0d05.little-depths.pages.dev/`.

## v74 Update

- v74 deepens the old dwelling / life-trail loop instead of adding a new floor. Completed life stories now become manual `回访` cards in the floor detail panel.
- Added `lifeStoryReviewsDone`, the `life_story_reviews` / `生活回访` quest, review state on saved stories, and `reviewLifeStory()`. Reviews do not auto-award quest coins or gems; they use the existing manual claim flow.
- A story review marks the story as reviewed, boosts linked resident motives/relationships, raises happiness slightly, and adds rent preparation back to the related dwelling.
- The old dwelling map now exposes `.life-story-review-ready`, `data-life-story-reviews`, `data-state="life-story"`, and a textless route/memory-board visual pass over `room-dwelling-v3.webp`.
- The asset backpack now records `生活回访`, pending review count, and the small dwelling journey bonus from reviewed stories.
- `gpt-image-2` was attempted for refreshed dwelling/life-route room art, but the gateway connection closed/timed out. No unstable bitmap was connected; the reusable prompt is saved at `docs/v74-dwelling-life-room-image-prompt.txt`.
- The save version is bumped to `27`; local verification used `http://127.0.0.1:8825/` with `tmp/verify-v74-life-reviews.mjs`.
- Cloudflare production and preview both load v74. Preview for this pass: `https://584e0548.little-depths.pages.dev/`.

## v73 Update

- v73 fixes the game-wide layout audit issues found on mobile, narrow mobile, tablet, and desktop states.
- Mobile coins, gems, population, happiness, and streak now stay visible in the top bar instead of being hidden under the bottom function dock.
- Toast/interaction feedback now lifts above the expanded mobile panel, and guide/build/inventory modals have a higher layer than toast feedback.
- Verification used `tmp/verify-v73-layout-audit.mjs` at `http://127.0.0.1:8824/`; the final report had `0` issues and `0` runtime errors.
- Cloudflare production and preview both load v73. Preview for this pass: `https://3bb48ae2.little-depths.pages.dev/`.

## v72 Update

- v72 deepens the old garden/bathhouse comfort-afterglow loop instead of adding a new floor. Completed tea/rest sessions now preserve their participant list even if residents leave early, so afterglow is no longer lost at session end.
- Added `COMFORT_FOCUS_OPTIONS`, `focusComfortAfterglow()`, `comfortFocusesDone`, per-focus stats, and the new `余韵调息` quest. It uses the existing manual claim flow, so coins and gems are not auto-awarded.
- Active afterglow can be directed into `租金回响`, `探险整备`, or `居民恢复`; these boost dwelling rent preparation, active/next expedition prep, or low-motive residents and comfort memories.
- Garden/bathhouse detail panels now show the current focus, focus controls, updated stats, and backpack records; the old map removes the visible afterglow text label and uses compact glyph/pip styling for focus state.
- `gpt-image-2` generated the refreshed no-text garden afterglow background `assets/art/room-garden-v3.webp`; the reusable prompt is saved at `docs/v72-comfort-focus-garden-image-prompt.txt`.
- The save version is bumped to `26`; local verification used `http://127.0.0.1:8822/` with `tmp/verify-v72-comfort-focus.mjs`.
- Cloudflare production and preview both load v72. Preview for this pass: `https://617d865a.little-depths.pages.dev/`.

## v71 Update

- v71 refreshes the old craft floor instead of adding a new room: craft floors can now start active `toolTune` sessions with phase, precision score, tool marks, pulse state, participant routing, cooldown, and earned coins.
- Added the new `工具校准` quest keyed to `toolTuneMarksDone`. It uses the existing manual claim flow, so the quest becomes ready without auto-awarding coins or gems.
- Craft rooms now render `.tool-tune-layer`, belt/tools/sparks, phase stack, `data-tool-tune-phase`, `data-tool-tune-precision`, a tool-tune room tag, and a dedicated status glyph on the old map.
- The detail panel now shows tool-tune time, phase, precision, marks, next mark, workload count, and start action; the asset backpack records `工具校准` sessions/marks and current craft tool bonus.
- Active tool-tune marks now shorten in-progress construction and production, add `toolTunePrep` to expeditions, and boost craft-order rewards.
- `gpt-image-2` generated the refreshed no-text workshop background `assets/art/room-craft-v3.webp`; the reusable prompt is saved at `docs/v71-craft-tool-tune-room-image-prompt.txt`.
- The save version is bumped to `25`; local verification used `http://127.0.0.1:8821/` with `tmp/verify-v71-craft-tool-tune.mjs`.
- Cloudflare production and preview both load v71. Preview for this pass: `https://87571ccf.little-depths.pages.dev/`.

## v70 Update

- v70 raises the mobile interaction toast above the bottom function dock so short action messages are no longer covered by the mobile controls.
- The mobile toast now uses a larger safe-area-aware bottom offset, a wider small-screen max width, and a higher layer than the dock.
- Local verification used `http://127.0.0.1:8820/` with `tmp/verify-v70-mobile-toast-offset.mjs`; the measured mobile toast/dock clearance was `28px`.
- Cloudflare production and preview both load v70. Preview for this pass: `https://06de3a5a.little-depths.pages.dev/`.

## v69 Update

- v69 refreshes the old observatory floor instead of adding a new room: observatories can now start an active `starChart` calibration session with phase, focus score, star marks, pulse state, expedition prep, and cooldown.
- Added the new `星图校准` quest keyed to `starChartMarksDone`. It uses the existing manual claim flow, so the quest becomes `ready` without auto-awarding coins or gems.
- Observatory rooms now render `.star-chart-layer`, telescope sweep, constellation marks, phase stack, comet trace, `data-star-chart-phase`, `data-star-chart-focus`, and a dedicated star-chart status glyph on the old map.
- The detail panel now shows star-chart time, phase, clarity, star marks, next mark, expedition count, and a start action; the asset backpack records `星图校准` calibrations/marks.
- Active star-chart marks shorten in-progress expeditions and add a small `starChartPrep` reward/relic boost to expedition returns.
- `gpt-image-2` generated the refreshed no-text rooftop observatory background `assets/art/room-observatory-v2.webp`; the reusable prompt is saved at `docs/v69-observatory-star-chart-image-prompt.txt`.
- The save version is bumped to `24`; local verification used `http://127.0.0.1:8819/` with `tmp/verify-v69-observatory-star-chart.mjs`.
- Cloudflare production and preview both load v69. Preview for this pass: `https://6dd9355b.little-depths.pages.dev/`.

## v68 Update

- v68 refreshes the old service floor instead of adding a new room: service rooms can now start an active `serviceCare` concierge-care session with phase, tone, care score, focus guest, touch progress, and earned tips.
- Added the new `礼宾照看` quest keyed to `serviceCareTouchesDone`. It uses the existing manual claim flow, so the quest becomes `ready` without auto-awarding coins or gems.
- Service rooms now render `.service-care-layer`, ribbon progress, phase dots, care tokens, bloom effects, `data-service-care-phase`, `data-service-care-tone`, and a dedicated service-care status glyph on the old map.
- The detail panel now shows service-care phase, tone, next touch, total touches, cooldown, and a start action; the asset backpack records `礼宾照看` sessions/touches.
- `gpt-image-2` generated the refreshed no-text concierge flower atelier background `assets/art/room-service-v2.webp`; the reusable prompt is saved at `docs/v68-service-care-room-image-prompt.txt`.
- The save version is bumped to `23`; local verification used `http://127.0.0.1:8818/` with `tmp/verify-v68-service-care-refresh.mjs`.
- Cloudflare production and preview both load v68. Preview for this pass: `https://3d242cf1.little-depths.pages.dev/`.

## v67 Update

- v67 refreshes the old food-floor meal-rush loop instead of adding a new room: active rushes now track `foodRushCoursesDone`, current course, service pulse, and focused table state.
- Added the new `流水上菜` quest. It becomes `ready` through the existing manual claim flow, so coins and gems are not auto-awarded.
- Food rooms now render `.food-rush-service-layer`, service rails, course dots, and table markers on the old map; the detail panel shows course, table count, next serving time, total serving courses, heat, and progress.
- The asset backpack now includes a food-rush record metric, and the save version is bumped to `22`.
- `gpt-image-2` generated the refreshed no-text kitchen background `assets/art/room-food-v3.webp`; the reusable prompt is saved at `docs/v67-food-rush-kitchen-image-prompt.txt`.
- Local verification for this pass used `http://127.0.0.1:8817/` with `tmp/verify-v67-food-rush-refresh.mjs`.
- Cloudflare preview for this pass: `https://bed78f83.little-depths.pages.dev/`.

## v66 Update

- v66 refreshes the old lobby/elevator loop instead of adding a new floor: queued visitors now accumulate `lobbyWait`, and route scoring blends destination value with waiting pressure.
- Added `lobbyPriorityDispatchesDone` and the new `候车秩序` quest; successful priority dispatches from busy/urgent/VIP lobby states now grant stronger dispatch rewards and quest progress.
- The old lobby map now renders `.lobby-route-layer`, `.lobby-pressure-gate`, and `.lobby-route-signal` overlays; the detail panel route board now has a pressure summary and priority-sorted route tickets with tags.
- `gpt-image-2` generated the refreshed no-text lobby background `assets/art/room-lobby-v3.webp`; the reusable prompt is saved at `docs/v66-lobby-route-hall-image-prompt.txt`.
- Local verification for this pass used `http://127.0.0.1:8816/` with `tmp/verify-v66-lobby-refresh.mjs`.
- Cloudflare preview for this pass: `https://444eb98e.little-depths.pages.dev/`.

## v65 Update

- v65 makes quest rewards manually claimed instead of automatically granted by `checkQuests()`.
- Quest save entries now carry `ready`; completed unclaimed quests render a `领取` button, `claimQuest()` grants the reward, and the save version is bumped to `20`.
- Added a topbar asset backpack with `#inventoryBtn`, `#inventoryModal`, and `renderInventoryPanel()` so players can inspect coins, gems, population, streak, pending quest rewards, collection items, floor stock, orders, life records, and expedition reports in one place.
- Local verification for this pass used `http://127.0.0.1:8815/` with `tmp/verify-v65-manual-quests-inventory.mjs`; Cloudflare production and preview both load `app.js?v=65`, `overrides.css?v=65`, and `little-depths-v65`.
- Cloudflare preview for this pass: `https://b69b37e1.little-depths.pages.dev/`.

## v64 Update

- v64 deepens the old expedition loop with visible route waymarks and return reports instead of one-off countdown completion.
- Dwelling-origin expeditions now expose `EXPEDITION_WAYMARKS`, `expeditionReports`, `expeditionReportsDone`, `expeditionWaymarksDone`, `nextExpeditionReportId`, `expeditionReportBonus()`, and the new `探险回执` quest.
- Dwelling rooms show `.expedition-waymark-layer`, `.floor.expedition-waymark-active`, `data-expedition-waymarks`, `data-expedition-stage`, and `.expedition-report-panel`; resident cards, roster cards, and expedition cards show `.expedition-report-chip`, `.expedition-report-tag`, and readable route archive bonus.
- Completed expeditions now create readable report cards with route, waymarks, rewards, gems/relics, and a small route archive bonus feeding future expedition speed/reward/readability.
- Local verification for this pass used `http://127.0.0.1:8814/` with `tmp/verify-v64-expedition-reports.mjs`; no new image generation was needed.

## v63 Update

- v63 deepens the old garden/bathhouse comfort loop with readable afterglow instead of one-off hidden recovery.
- Completed comfort sessions now create `comfortAfterglow`, increment `comfortEchoesDone`, grant participant `comfortMemory`, and unlock the new `舒缓余韵` quest.
- Garden and bathhouse rooms expose stable afterglow state through `.comfort-afterglow-active`, `.comfort-afterglow-layer`, `data-comfort-echo`, `data-comfort-echo-power`, `.comfort-session-panel.afterglow`, and `data-state="comfort-echo"`.
- Resident cards, roster cards, and sprites now show `.comfort-memory-chip` / `.comfort-memory-active`, while expedition cards show `.comfort-prep-tag`; afterglow also feeds rent echo and expedition preparation bonuses.
- Local verification for this pass used `http://127.0.0.1:8813/` with `tmp/verify-v63-comfort-afterglow.mjs`; `gpt-image-2` was attempted for refreshed comfort-afterglow garden art but the gateway timed out, so the reusable prompt is saved at `docs/v63-comfort-afterglow-garden-image-prompt.txt`.

## v62 Update

- v62 deepens the old character-life system with visible life trails and short story receipts for completed outings.
- Life visits now remember origin floor/type, target route, motive, progress, and completion outcome through `lifeStories`, `nextLifeStoryId`, `lifeStoriesDone`, and the new `生活足迹` quest.
- Map rooms expose stable route state through `.life-trail-layer`, `.life-trail-route`, `.floor.life-trail-active`, `data-life-trail-count`, and `data-life-trail-need`; floor detail, resident cards, and the roster show `.life-story-panel`, `.life-story-card`, and `.life-trail-chip`.
- Completed visits now produce readable story text and small happiness feedback, so player-visible character behavior is based on routes, needs, and receipts rather than fake in-place shaking.
- Local verification for this pass used `http://127.0.0.1:8812/` with `tmp/verify-v62-life-trails.mjs`; `gpt-image-2` was attempted twice for refreshed dwelling/life-trail room art but the gateway returned upstream request failures, so the reusable prompt is saved at `docs/v62-life-trails-dwelling-image-prompt.txt`.

## v61 Update

- v61 deepens the old kingdom floor again by turning royal mandates into a visible courier-and-receipt loop.
- Royal mandates now expose `ROYAL_COURIER_PHASES`, route labels, courier progress, `royalCourierReceiptsDone`, delivered order state, receipt bonuses, and the new `信使回执` quest.
- Kingdom rooms render stable courier route/dispatch visuals through `.royal-courier-route`, `.royal-courier-track`, `.floor.royal-courier-active`, `data-royal-courier-phase`, and `data-royal-courier-progress`; this pass avoids fake in-place character shaking.
- Order cards now show delivered courier and receipt tags, and fulfillment still consumes only the real stock not already prepared by the mandate.
- Local verification for this pass used `http://127.0.0.1:8811/` with `tmp/verify-v61-kingdom-couriers.mjs`; `gpt-image-2` was attempted twice for refreshed kingdom room art but the gateway returned upstream request failures, so the reusable prompt is saved at `docs/v61-kingdom-courier-room-image-prompt.txt`.

## v60 Update

- v60 turns the old market quick-order action into a visible logistics loop instead of an instant card generator.
- Market floors now start an active parcel flow with `quote` / `pack` / `send` phases, `marketParcel`, `marketParcelsDone`, `marketParcelItemsPacked`, and the new `包裹流转` quest.
- Parcel packing deducts real stock from the matching business floor immediately, stores the packed amount on the order, and fulfillment consumes only the remaining stock not already packed or prepared by royal mandate.
- Market floors and order cards now expose `.market-parcel-panel`, `.floor.market-parcel-active`, `data-market-parcel-phase`, `data-state="market-parcel"`, `.parcel-order`, and `.parcel-tag` with stable package/track visuals rather than character shaking.
- Local verification for this pass used `http://127.0.0.1:8810/` with `tmp/verify-v60-market-parcels.mjs`; no new image generation was needed because this pass focused on gameplay, UI, and CSS polish over new room art.

## v59 Update

- v59 turns the old kingdom floor into an active royal mandate hub instead of a passive reward bonus.
- Kingdom floors can now spend one seal stock to sign a mandate for a missing-stock order; mandate phases move through draft, seal, and dispatch while adding prepared progress and reward bonus.
- Order cards now show raw stock versus mandate preparation, active signing tags, seal tags, and a direct `签令` button; fulfillment consumes only the remaining real stock after mandate preparation.
- The map and detail UI now expose `.royal-mandate-panel`, `.floor.royal-mandate-active`, `data-royal-mandate-phase`, `data-state="royal-mandate"`, and mandate order tags so the old room reads as a working council chamber.
- Local verification for this pass used `http://127.0.0.1:8809/` with `tmp/verify-v59-kingdom-mandates.mjs`; refreshed kingdom room art was attempted through `gpt-image-2`, but the gateway timed out, so the reusable prompt is saved at `docs/v59-kingdom-royal-council-image-prompt.txt`.

## v58 Update

- v58 rebuilds character interactions so paired scenes read as staged behavior instead of in-place shaking.
- Social scenes now progress through `approach`, `engage`, and `settle`, keep a stable `socialAnchor`, and update person activities/motion modes by phase.
- Room sprites now rely on readable pose, facing, spacing, social focus props, and smooth location transitions; direct person/speech-bubble animations are disabled through the v58 override layer.
- Local verification for this pass used `http://127.0.0.1:8808/` with `tmp/verify-v58-character-interactions.mjs`.

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
