# GameManager 游戏状态管理系统

## 概述

GameManager 现在支持完整的游戏状态管理，包括运行、暂停、游戏结束三种状态，以及基于表现的奖励系统。

## 新增功能

### 1. 游戏状态管理
- **运行状态 (RUNNING)**: 游戏正常进行
- **暂停状态 (PAUSED)**: 游戏暂停，显示暂停面板
- **游戏结束状态 (GAME_OVER)**: 游戏结束，显示结果面板

### 2. 游戏结束条件
- **胜利条件**: 消灭所有AI车辆
- **失败条件**: 玩家生命值降为0

### 3. 表现评价系统
基于以下因素计算表现评价：
- **游戏时长**: 完成时间越短得分越高
- **剩余生命值**: 生命值保持越多得分越高

评价等级：
- **S级 (90-100分)**: 完美表现，奖励500金币
- **A级 (80-89分)**: 优秀表现，奖励400金币
- **B级 (70-79分)**: 良好表现，奖励300金币
- **C级 (60-69分)**: 一般表现，奖励200金币
- **D级 (0-59分)**: 需要改进，奖励100金币

## 使用方法

### 1. 在场景中设置GameManager

在GameManager组件中需要配置以下新属性：

```typescript
// UI面板
@property(Node) pausePanel: Node = null!;        // 暂停面板
@property(Node) gameOverPanel: Node = null!;     // 游戏结束面板

// 按钮
@property(Button) pauseButton: Button = null!;   // 暂停按钮
@property(Button) resumeButton: Button = null!;  // 继续游戏按钮
@property(Button) restartButton: Button = null!; // 重新开始按钮
@property(Button) mainMenuButton: Button = null!; // 返回主菜单按钮

// 标签
@property(Label) gameOverTitleLabel: Label = null!;  // 游戏结束标题
@property(Label) performanceLabel: Label = null!;    // 表现评价标签
@property(Label) rewardLabel: Label = null!;         // 奖励金币标签
```

### 2. 创建UI面板

#### 暂停面板结构
```
PausePanel (Node)
├── Background (Sprite)
├── Title (Label) - "游戏暂停"
├── ResumeButton (Button) - "继续游戏"
├── RestartButton (Button) - "重新开始"
└── MainMenuButton (Button) - "返回主菜单"
```

#### 游戏结束面板结构
```
GameOverPanel (Node)
├── Background (Sprite)
├── TitleLabel (Label) - "胜利！" 或 "失败！"
├── GameTimeLabel (Label) - "游戏时长: XX秒"
├── HealthLabel (Label) - "剩余生命值: XX/100"
├── PerformanceLabel (Label) - "表现评价: X级"
├── RewardLabel (Label) - "获得金币: XX"
├── RestartButton (Button) - "重新开始"
└── MainMenuButton (Button) - "返回主菜单"
```

### 3. 添加面板组件

为面板节点添加对应的组件：
- 暂停面板添加 `PausePanel` 组件
- 游戏结束面板添加 `GameOverPanel` 组件

### 4. 配置按钮引用

在各个面板组件中配置按钮引用，组件会自动处理按钮事件。

## API 参考

### 游戏状态控制方法

```typescript
// 暂停游戏
gameManager.pauseGame();

// 继续游戏
gameManager.resumeGame();

// 游戏结束 (isVictory: 是否胜利)
gameManager.gameOver(true);  // 胜利
gameManager.gameOver(false); // 失败

// 重新开始游戏
gameManager.restartGame();

// 返回主菜单
gameManager.returnToMainMenu();
```

### 状态查询方法

```typescript
// 获取当前游戏状态
const state = gameManager.getCurrentState();

// 获取游戏时长（秒）
const gameTime = gameManager.getGameTime();

// 获取玩家当前生命值
const playerHP = gameManager.getPlayerHP();

// 获取剩余敌人数量
const enemyCount = gameManager.getEnemyCount();
```

## 自动触发机制

### 游戏结束自动检测
- 当玩家生命值降为0时，自动调用 `gameOver(false)`
- 当所有AI车辆被消灭时，自动调用 `gameOver(true)`

### 奖励自动发放
- 游戏结束时自动计算表现评价
- 自动将奖励金币添加到PlayerManager中
- 自动更新UI显示

## 注意事项

1. **面板初始状态**: 暂停面板和游戏结束面板在游戏开始时应该设置为不可见
2. **按钮配置**: 确保所有按钮都正确配置了引用
3. **PlayerManager依赖**: 系统依赖PlayerManager来管理玩家金币
4. **场景切换**: 重新开始和返回主菜单会重新加载场景

## 在Cocos Creator中的配置步骤

### 1. 配置GameManager组件

1. 选择场景中的GameManager节点
2. 在属性检查器中找到GameManager组件
3. 将以下节点拖拽到对应的属性槽：
   - **Pause Panel**: 暂停面板节点
   - **Game Over Panel**: 游戏结束面板节点
   - **Pause Button**: 右上角的暂停按钮
   - **Resume Button**: 暂停面板中的继续按钮
   - **Restart Button**: 重新开始按钮
   - **Main Menu Button**: 返回主菜单按钮
   - **Game Over Title Label**: 游戏结束标题标签
   - **Performance Label**: 表现评价标签
   - **Reward Label**: 奖励金币标签

### 2. 创建暂停面板

1. 在Canvas下创建一个Node，命名为"PausePanel"
2. 添加PausePanel脚本组件
3. 创建子节点：
   - 背景图片 (Sprite)
   - 标题文字 (Label)
   - 继续游戏按钮 (Button)
   - 重新开始按钮 (Button)
   - 返回主菜单按钮 (Button)
4. 将按钮拖拽到PausePanel组件的对应属性槽
5. 设置面板初始状态为不可见 (Active = false)

### 3. 创建游戏结束面板

1. 在Canvas下创建一个Node，命名为"GameOverPanel"
2. 添加GameOverPanel脚本组件
3. 创建子节点：
   - 背景图片 (Sprite)
   - 标题标签 (Label) - 显示"胜利！"或"失败！"
   - 游戏时长标签 (Label)
   - 生命值标签 (Label)
   - 表现评价标签 (Label)
   - 奖励金币标签 (Label)
   - 重新开始按钮 (Button)
   - 返回主菜单按钮 (Button)
4. 将所有UI元素拖拽到GameOverPanel组件的对应属性槽
5. 设置面板初始状态为不可见 (Active = false)

### 4. 测试功能

可以添加GameManagerExample组件到场景中进行测试：
- **P键**: 暂停/继续游戏
- **R键**: 重新开始游戏
- **M键**: 返回主菜单
- 测试按钮可以模拟各种游戏状态

## 扩展建议

1. **音效支持**: 可以在状态切换时添加音效
2. **动画效果**: 为面板显示/隐藏添加动画
3. **更多评价因素**: 可以加入击杀数量、连击等评价因素
4. **成就系统**: 基于表现评价解锁成就
5. **排行榜**: 记录最佳表现和最短时间
