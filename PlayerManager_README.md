# PlayerManager 玩家数据管理系统

## 概述

PlayerManager 是一个专为 TopRacing 游戏设计的玩家数据管理系统，支持跨场景数据持久化，并兼容微信小游戏平台。

## 主要特性

- ✅ **跨场景持久化** - 使用单例模式，数据在场景切换时保持
- ✅ **自动保存** - 每30秒自动保存数据
- ✅ **微信小游戏支持** - 自动检测环境，支持微信存储和云存储
- ✅ **数据版本兼容** - 支持游戏更新时的数据迁移
- ✅ **事件监听** - 数据变化时自动通知UI更新
- ✅ **调试工具** - 支持数据导出/导入和重置功能

## 数据结构

### 玩家基础信息
```typescript
{
  level: number;        // 玩家等级
  money: number;        // 金钱
  experience: number;   // 经验值
}
```

### 车辆系统
```typescript
{
  unlockedCars: string[];                    // 已解锁车辆列表
  currentCar: string;                        // 当前使用的车辆
  carUpgrades: { [carId: string]: CarUpgrade }; // 车辆升级数据
}

interface CarUpgrade {
  engine: number;      // 引擎等级 (0-5)
  tires: number;       // 轮胎等级 (0-5)
  suspension: number;  // 悬挂等级 (0-5)
  nitro: number;       // 氮气等级 (0-5)
}
```

### 关卡系统
```typescript
{
  unlockedLevels: string[];                    // 已解锁关卡列表
  currentLevel: string;                        // 当前关卡
  levelProgress: { [levelId: string]: LevelProgress }; // 关卡进度
}

interface LevelProgress {
  bestTime: number;    // 最佳时间 (毫秒)
  stars: number;       // 获得星星数 (0-3)
  completed: boolean;  // 是否完成
  attempts: number;    // 尝试次数
}
```

### 游戏设置
```typescript
interface GameSettings {
  soundVolume: number;     // 音效音量 (0-1)
  musicVolume: number;     // 音乐音量 (0-1)
  vibration: boolean;      // 震动开关
  language: string;        // 语言设置
  quality: string;         // 画质设置
}
```

### 游戏统计
```typescript
interface GameStatistics {
  totalPlayTime: number;   // 总游戏时间 (秒)
  totalRaces: number;      // 总比赛次数
  totalWins: number;       // 总胜利次数
  totalMoneyEarned: number; // 总获得金钱
  totalDistance: number;   // 总行驶距离
}
```

## 使用方法

### 1. 设置PlayerManager节点

1. 在场景中创建一个空节点，命名为 "PlayerManager"
2. 将 `PlayerManager.ts` 脚本添加到该节点
3. 该节点会自动设置为常驻节点，不随场景切换而销毁

### 2. 获取PlayerManager实例

```typescript
import { PlayerManager } from './PlayerManager';

// 在任何脚本中获取实例
const playerManager = PlayerManager.instance;
```

### 3. 基本数据操作

```typescript
// 获取玩家数据
const playerData = playerManager.playerData;

// 增加金钱
playerManager.addMoney(100);

// 消费金钱
if (playerManager.spendMoney(500)) {
    console.log('购买成功');
} else {
    console.log('金钱不足');
}

// 增加经验
playerManager.addExperience(50);

// 解锁车辆
playerManager.unlockCar('car_002');

// 设置当前车辆
playerManager.setCurrentCar('car_002');

// 升级车辆部件
playerManager.upgradeCarPart('car_002', 'engine');

// 解锁关卡
playerManager.unlockLevel('level_002');

// 更新关卡进度
playerManager.updateLevelProgress('level_001', 45000, 2); // 45秒，2星

// 更新游戏设置
playerManager.updateSettings({
    soundVolume: 0.8,
    musicVolume: 0.6
});

// 更新统计数据
playerManager.updateStatistics({
    totalRaces: playerData.statistics.totalRaces + 1,
    totalWins: playerData.statistics.totalWins + 1
});
```

### 4. 监听数据变化

```typescript
import { PlayerManager, PlayerData } from './PlayerManager';

export class MyUI extends Component {
    onLoad() {
        const playerManager = PlayerManager.instance;
        
        // 添加数据变化监听
        playerManager.addDataChangeListener(this.onPlayerDataChanged.bind(this));
    }
    
    onDestroy() {
        const playerManager = PlayerManager.instance;
        
        // 移除数据变化监听
        playerManager.removeDataChangeListener(this.onPlayerDataChanged.bind(this));
    }
    
    private onPlayerDataChanged(data: PlayerData) {
        // 更新UI显示
        this.updateUI(data);
    }
    
    private updateUI(data: PlayerData) {
        // 更新UI元素
        this.levelLabel.string = `等级: ${data.level}`;
        this.moneyLabel.string = `金钱: ${data.money}`;
    }
}
```

### 5. 微信小游戏集成

```typescript
// 检查是否在微信环境
if (playerManager.isWeChatMiniGame) {
    // 微信登录
    const loginSuccess = await playerManager.wechatLogin();
    if (loginSuccess) {
        console.log('微信登录成功，数据已同步');
    }
}
```

## 微信小游戏部署

### 1. 云函数部署

1. 在微信开发者工具中创建云开发环境
2. 将 `wechat-cloud-functions` 文件夹中的云函数上传到云端
3. 确保云函数有数据库读写权限

### 2. 数据库设置

在微信云开发控制台中创建 `player_data` 集合，设置权限为：
- 读取权限：仅创建者可读
- 写入权限：仅创建者可写

### 3. 小游戏配置

在 `game.json` 中添加云开发配置：

```json
{
  "cloud": true,
  "pages": [
    "pages/index/index"
  ]
}
```

## 调试功能

### 数据导出
```typescript
const jsonData = playerManager.exportPlayerData();
console.log('玩家数据:', jsonData);
```

### 数据导入
```typescript
const success = playerManager.importPlayerData(jsonData);
if (success) {
    console.log('数据导入成功');
}
```

### 数据重置
```typescript
playerManager.resetPlayerData();
```

## 最佳实践

### 1. 数据保存时机
- 重要操作后立即保存：购买、升级、完成关卡
- 定期自动保存：每30秒（已内置）
- 游戏退出时保存：在 `onDestroy` 中调用

### 2. 错误处理
```typescript
try {
    await playerManager.savePlayerData();
} catch (error) {
    console.error('保存失败:', error);
    // 显示错误提示给用户
}
```

### 3. 数据验证
```typescript
// 在加载数据后验证数据完整性
const data = playerManager.playerData;
if (!data.unlockedCars || data.unlockedCars.length === 0) {
    // 数据损坏，重置为默认值
    playerManager.resetPlayerData();
}
```

### 4. 性能优化
- 避免频繁调用数据保存方法
- 使用数据变化监听而不是轮询
- 大量数据更新时批量处理

## 注意事项

1. **单例模式**：PlayerManager 使用单例模式，确保整个游戏中只有一个实例
2. **常驻节点**：PlayerManager 节点会自动设置为常驻节点，不要手动销毁
3. **数据兼容性**：系统会自动处理数据版本兼容，但建议在更新时测试数据迁移
4. **微信限制**：微信小游戏有存储大小限制，注意控制数据量
5. **网络环境**：微信云存储需要网络连接，建议添加离线模式支持

## 故障排除

### 常见问题

1. **数据丢失**
   - 检查存储权限
   - 验证云函数配置
   - 查看控制台错误信息

2. **微信登录失败**
   - 检查小游戏配置
   - 验证云开发环境
   - 确认用户授权

3. **数据不同步**
   - 检查网络连接
   - 验证云函数状态
   - 查看数据版本兼容性

### 调试命令

```typescript
// 查看当前数据
console.log(PlayerManager.instance.playerData);

// 检查环境
console.log('是否微信环境:', PlayerManager.instance.isWeChatMiniGame);

// 强制保存
await PlayerManager.instance.savePlayerData();

// 强制加载
await PlayerManager.instance.loadPlayerData();
```

## 更新日志

### v1.0.0
- 初始版本
- 支持基础数据管理
- 支持微信小游戏集成
- 支持自动保存和数据监听 