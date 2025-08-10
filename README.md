## SuperSplash

一款自上而下俯视视角的街头竞速对战小游戏：驾驶你的车辆在封闭场地中与 AI 对手缠斗，通过机动追逐、射击与地面“涂色”争夺胜利。

- 引擎：Cocos Creator 3.8.6
- 设计分辨率：1280 x 720（fitWidth: true）
- 目标平台：Web（Web Desktop/Preview）

---

### 游戏目标与玩法

- 胜利条件（满足其一）：
  - 消灭所有 AI 车辆；
  - 倒计时结束时，你的“颜料”占比最高。
- 失败条件：
  - 玩家生命值降为 0；
  - 倒计时结束且占比不是最高。
- 操作（键盘）：
  - 方向键 上/下：加速 / 倒车；
  - 方向键 左/右：转向（带漂移手感）；
  - 空格：开火（普通子弹 / 火箭弹）。
- 关键机制：
  - 车辆行进时以固定间隔喷洒“颜料”点，形成地面占有；
  - 火箭弹爆炸可清除一定半径内的颜料；
  - 颜料在“覆盖半径”内具备去重/覆盖逻辑，降低节点数量以保障性能。

默认一局时长为 90 秒，可在 GameManager 中调整：

```ts
// assets/scripts/GameManager.ts
gameDuration: number = 90; // 游戏时长（秒）
```

---

### 流程概览

1) 主菜单（MainMenu）
2) 关卡/车辆选择（LevelSelect）
3) 游戏场景（gamescene）：加载地图与车辆 → 相机跟随 → 倒计时开始 → 战斗 → 结算

---

### 主要系统与架构（简版）

- GameManager：游戏总控（加载关卡与车辆、出生点安置、倒计时/暂停/结算、对子弹与颜料的中介）。
- Player / AI：车辆控制与行为；玩家处理输入，AI 采用简单策略（转向/加速、边界保护）。
- PaintManager：颜料点生成、同阵营去重与敌对覆盖、统计占比、范围清除（爆炸）。
- Bullet：武器与子弹（普通/火箭弹），物理推进与碰撞；火箭弹触发范围清除颜料。
- CameraFollow：正交相机平滑跟随与可视范围边界约束。
- UI：HUD（血量、敌人数、倒计时）、暂停面板、结算面板；主菜单与选择界面。
- SoundManager：统一音效开关与播放（漂移、开火、爆炸、按钮等）。
- PlayerManager：玩家数据持久化（货币、车辆解锁/升级等）。

---

### 实现要点与技术细节

- 车辆动力学：基于 2D 物理（RigidBody2D）施力前进；角度插值避免瞬时转向；速度上限与“卡位”修正。
- 分辨率适配：
  - 采用 UI_2D 层和 UITransform 的坐标转换（convertToNodeSpaceAR）确保喷洒的颜料在不同分辨率下对齐；
  - 颜料容器保持在 PaintManager 节点下，但以其 UITransform 为基准进行世界→本地坐标转换。
- 颜料优化：
  - “覆盖半径”内同阵营点跳过生成；与他方重叠时移除旧点；
  - 支持统计各方占比、清空或按范围清除（爆炸时调用）。
- 相机：按设备宽高比计算正交可视范围并做边界约束，避免显示地图外黑边。

---

### 项目结构（节选）

- assets/scripts
  - GameManager.ts（总控）
  - player.ts / AIController.ts / AIPlayer.ts（玩家与 AI 行为）
  - PaintManager.ts（颜料系统）
  - Bullet.ts（武器/子弹）
  - camera_follow.ts（相机跟随）
  - GameHUD.ts / GameOverPanel.ts / MainMenuController.ts / SelectManager.ts（UI）
  - PlayerManager.ts / TempData.ts / SceneTransition.ts / SoundManager.ts（数据与工具）
- assets/scene / assets/prefab（场景、关卡与车辆预制）
- settings/profiles（构建配置）

---

### 运行与构建

1) 使用 Cocos Creator 3.8.6 打开本项目；
2) 预览：选择 mainmenu.scene 或 gamescene.scene，点击“播放”预览；
3) 构建：建议 Web Desktop；构建后在浏览器中运行，并用开发者工具切换设备/分辨率进行验证；
4) 如需修改游戏时长、喷涂间隔、覆盖半径等，可在对应脚本（GameManager / player / PaintManager）中调整属性。

---

### 后续规划

- 差异化车辆（动力/操控/武器/喷涂参数）；
- 更丰富的 AI 策略（追击、队形、诱敌等）；
- 颜料合批/网格化渲染进一步降开销；
- 道具与关卡交互（拾取、陷阱、地形 buff）；
- 排行与挑战模式；
- 联机对战。

---

如需根据你的团队/发行平台定制 README 的徽章、截图与视频预览，请告知我所需素材与格式。
