# 关卡评级系统

## 概述

关卡评级系统为玩家的关卡表现提供详细的评价和进度跟踪。系统包含评级计算、关卡解锁逻辑、进度显示等功能。

## 系统特性

### 1. 评级系统
- **S级**：完美表现（30秒内3星）
- **A级**：优秀表现（45秒内3星）
- **B级**：良好表现（超过45秒3星）
- **C级**：一般表现（60秒内2星）
- **D级**：勉强通过（超过60秒2星或1星）
- **F级**：失败（0星或未完成）

### 2. 星星评定标准
- **1星**：完成关卡（基础奖励）
- **2星**：60秒内完成 +1星
- **3星**：生命值保持50%以上 +1星

### 3. 关卡解锁机制
- 默认只解锁第一关
- 只有获得D级及以上评价才能解锁下一关
- F级评价无法解锁新关卡

## 数据结构

### LevelProgress 接口
```typescript
interface LevelProgress {
    stars: number;       // 获得星星数 (0-3)
    completed: boolean;  // 是否完成
    bestTime: number;    // 最佳时间 (毫秒)
    grade: LevelGrade;   // 评级 (S, A, B, C, D, F)
    attempts: number;    // 尝试次数
}
```

### LevelGrade 枚举
```typescript
enum LevelGrade {
    S = 'S',
    A = 'A', 
    B = 'B',
    C = 'C',
    D = 'D',
    F = 'F'
}
```

## 核心方法

### PlayerManager 新增方法

#### updateLevelProgress(levelId, time, stars)
更新关卡进度，自动计算评级并检查解锁条件
```typescript
// 示例：完成level-1，用时35秒，获得3星
playerManager.updateLevelProgress('level-1', 35000, 3);
```

#### getLevelProgress(levelId)
获取指定关卡的进度信息
```typescript
const progress = playerManager.getLevelProgress('level-1');
console.log(`评级: ${progress.grade}, 星星: ${progress.stars}`);
```

#### isLevelUnlocked(levelId)
检查关卡是否已解锁
```typescript
const isUnlocked = playerManager.isLevelUnlocked('level-2');
```

#### getLevelGradeText(levelId)
获取关卡评级文本（用于UI显示）
```typescript
const gradeText = playerManager.getLevelGradeText('level-1'); // 返回 'S' 或 ''
```

#### getLevelGradeColor(grade)
获取评级对应的颜色
```typescript
const color = playerManager.getLevelGradeColor(LevelGrade.S); // 返回 '#FFD700'
```

### SelectManager 增强功能

#### updateLevelToggles()
更新关卡选择界面，显示解锁状态和评级
- 未解锁关卡显示为黑色且不可交互
- 已完成关卡显示评级文字和对应颜色

#### updateLevelGradeDisplay(levelNode, levelId)
更新单个关卡的评级显示
- 自动查找关卡节点下的Label组件
- 设置评级文字和颜色

### GameManager 集成

#### calculateAndGiveReward(isVictory)
游戏结束时自动调用关卡评级系统
- 计算星星数和评级
- 更新关卡进度
- 检查并解锁下一关

## 评级计算逻辑

### 星星计算
```typescript
let stars = 1; // 基础1星（完成关卡）

// 基于时间加星
if (gameTime <= 60) {
    stars++; // 60秒内完成 +1星
}

// 基于生命值加星
if (healthPercentage >= 0.5) {
    stars++; // 生命值50%以上 +1星
}

return Math.min(stars, 3); // 最多3星
```

### 评级计算
```typescript
if (stars === 3) {
    if (time <= 30000) return LevelGrade.S;      // 30秒内3星 = S
    else if (time <= 45000) return LevelGrade.A; // 45秒内3星 = A
    else return LevelGrade.B;                     // 超过45秒3星 = B
} else if (stars === 2) {
    if (time <= 60000) return LevelGrade.C;      // 60秒内2星 = C
    else return LevelGrade.D;                     // 超过60秒2星 = D
} else if (stars === 1) {
    return LevelGrade.D;                          // 1星 = D
} else {
    return LevelGrade.F;                          // 0星 = F
}
```

## UI设置指南

### 关卡选择界面
1. **关卡节点结构**：
```
level-1 (Toggle)
├── Sprite (关卡图标)
└── GradeLabel (Label) ← 用于显示评级，可选
```

2. **自动查找Label**：
如果没有名为"GradeLabel"的子节点，系统会自动查找第一个Label组件

3. **评级颜色**：
- S级：金色 (#FFD700)
- A级：银色 (#C0C0C0)
- B级：铜色 (#CD7F32)
- C级：浅绿色 (#90EE90)
- D级：天蓝色 (#87CEEB)
- F级：红色 (#FF6B6B)

## 测试功能

### LevelGradeTest 测试脚本
提供完整的键盘测试功能：

**测试键位**：
- `Q` - 完成level-1，获得S级评价（25秒，3星）
- `W` - 完成level-1，获得A级评价（40秒，3星）
- `E` - 完成level-1，获得B级评价（50秒，3星）
- `R` - 完成level-1，获得C级评价（50秒，2星）
- `T` - 完成level-1，获得D级评价（70秒，2星）
- `Y` - 完成level-1，获得F级评价（60秒，0星）
- `U` - 完成level-2，获得D级评价（解锁level-3）
- `I` - 显示所有关卡状态
- `O` - 重置玩家数据
- `P` - 解锁所有关卡（测试用）

### 使用测试脚本
1. 将LevelGradeTest组件添加到LevelSelect场景
2. 绑定SelectManager引用
3. 运行游戏并使用键盘测试

## 集成步骤

### 1. 数据迁移
现有的PlayerManager数据会自动升级，添加新的字段：
- `bestTime`: 0
- `grade`: LevelGrade.F
- `attempts`: 0

### 2. UI更新
SelectManager会自动处理关卡评级显示，无需额外配置

### 3. 游戏流程集成
GameManager已自动集成评级系统，游戏结束时会：
- 计算星星数和评级
- 更新关卡进度
- 检查并解锁下一关
- 保存数据

## 扩展功能

### 自定义评级标准
可以修改`calculateLevelGrade`方法来调整评级标准：
```typescript
private calculateLevelGrade(time: number, stars: number): LevelGrade {
    // 自定义评级逻辑
}
```

### 自定义解锁条件
可以修改`isGradePassable`方法来调整解锁要求：
```typescript
private isGradePassable(grade: LevelGrade): boolean {
    return grade !== LevelGrade.F && grade !== LevelGrade.D; // 要求C级以上
}
```

### 添加成就系统
基于评级数据可以轻松添加成就系统：
```typescript
// 检查是否获得所有S级评价
const allSGrades = levels.every(levelId => 
    playerManager.getLevelProgress(levelId)?.grade === LevelGrade.S
);
```

## 注意事项

1. **数据兼容性**：系统会自动处理旧数据的升级
2. **性能优化**：评级计算在游戏结束时进行，不影响游戏性能
3. **错误处理**：包含完善的错误检查和日志输出
4. **扩展性**：易于添加新的评级标准和解锁条件
