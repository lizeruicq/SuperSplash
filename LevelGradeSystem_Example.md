# 关卡评级系统使用示例

## 快速开始

### 1. 基本使用流程

```typescript
// 1. 获取PlayerManager实例
const playerManager = PlayerManager.instance;

// 2. 游戏结束时更新关卡进度
// 参数：关卡ID, 游戏时间(毫秒), 星星数
playerManager.updateLevelProgress('level-1', 35000, 3);

// 3. 查询关卡信息
const progress = playerManager.getLevelProgress('level-1');
console.log(`评级: ${progress.grade}`); // 输出: 评级: A

// 4. 检查解锁状态
const isUnlocked = playerManager.isLevelUnlocked('level-2');
console.log(`level-2解锁: ${isUnlocked}`); // 输出: level-2解锁: true
```

### 2. 在SelectManager中显示评级

```typescript
// SelectManager会自动调用以下逻辑：
updateLevelToggles() {
    this.levelToggleGroup.toggleItems.forEach((toggle: Toggle) => {
        const levelId = toggle.node.name;
        
        // 检查解锁状态
        const isUnlocked = PlayerManager.instance.isLevelUnlocked(levelId);
        toggle.interactable = isUnlocked;
        
        // 显示评级
        this.updateLevelGradeDisplay(toggle.node, levelId);
    });
}
```

## 实际游戏场景示例

### 场景1：玩家首次完成level-1

```typescript
// 游戏开始
console.log('开始游戏 level-1');

// 游戏进行中...
// 玩家用时40秒，保持了80%生命值，获得3星

// 游戏结束时（在GameManager中自动调用）
const gameTimeMs = 40000; // 40秒
const stars = 3; // 3星（60秒内完成+生命值50%以上）

playerManager.updateLevelProgress('level-1', gameTimeMs, stars);

// 系统自动计算：
// - 40秒内3星 = A级评价
// - A级 >= D级，自动解锁level-2

// 结果查询
const progress = playerManager.getLevelProgress('level-1');
console.log(`level-1完成情况:`);
console.log(`- 评级: ${progress.grade}`);        // A
console.log(`- 星星: ${progress.stars}`);        // 3
console.log(`- 最佳时间: ${progress.bestTime}ms`); // 40000
console.log(`- 尝试次数: ${progress.attempts}`);   // 1

const unlockedLevels = playerManager.playerData.unlockedLevels;
console.log(`解锁关卡: ${unlockedLevels.join(', ')}`); // level-1, level-2
```

### 场景2：玩家重复挑战提升成绩

```typescript
// 第一次完成：B级
playerManager.updateLevelProgress('level-1', 50000, 3); // 50秒，3星 = B级

// 第二次完成：A级（更好成绩）
playerManager.updateLevelProgress('level-1', 35000, 3); // 35秒，3星 = A级

// 第三次完成：C级（较差成绩，不更新最佳记录）
playerManager.updateLevelProgress('level-1', 55000, 2); // 55秒，2星 = C级

// 查看最终结果
const progress = playerManager.getLevelProgress('level-1');
console.log(`最终记录:`);
console.log(`- 评级: ${progress.grade}`);        // A (保持最佳)
console.log(`- 星星: ${progress.stars}`);        // 3 (保持最佳)
console.log(`- 最佳时间: ${progress.bestTime}ms`); // 35000 (保持最佳)
console.log(`- 尝试次数: ${progress.attempts}`);   // 3 (累计)
```

### 场景3：失败情况处理

```typescript
// 玩家失败（0星）
playerManager.updateLevelProgress('level-1', 120000, 0); // 120秒，0星 = F级

// F级不能解锁下一关
const isLevel2Unlocked = playerManager.isLevelUnlocked('level-2');
console.log(`level-2解锁状态: ${isLevel2Unlocked}`); // false

// 玩家需要重新挑战获得D级以上才能解锁
playerManager.updateLevelProgress('level-1', 80000, 1); // 80秒，1星 = D级

// 现在可以解锁level-2了
const isLevel2UnlockedNow = playerManager.isLevelUnlocked('level-2');
console.log(`level-2解锁状态: ${isLevel2UnlockedNow}`); // true
```

## UI集成示例

### 在关卡选择界面显示评级

```typescript
// 在SelectManager中
updateLevelGradeDisplay(levelNode: Node, levelId: string) {
    const gradeText = PlayerManager.instance.getLevelGradeText(levelId);
    
    // 查找评级标签
    let gradeLabel = levelNode.getChildByName('GradeLabel');
    if (!gradeLabel) {
        gradeLabel = levelNode.getComponentInChildren(Label)?.node;
    }
    
    if (gradeLabel && gradeText) {
        const label = gradeLabel.getComponent(Label);
        label.string = gradeText; // 显示 'S', 'A', 'B' 等
        
        // 设置颜色
        const progress = PlayerManager.instance.getLevelProgress(levelId);
        const colorHex = PlayerManager.instance.getLevelGradeColor(progress.grade);
        label.color = this.hexToColor(colorHex);
    }
}
```

### 创建详细的关卡信息面板

```typescript
// 显示关卡详细信息的示例
showLevelDetails(levelId: string) {
    const progress = PlayerManager.instance.getLevelProgress(levelId);
    
    if (progress && progress.completed) {
        const detailText = `
关卡: ${levelId}
评级: ${progress.grade}
星星: ${progress.stars}/3
最佳时间: ${(progress.bestTime/1000).toFixed(1)}秒
尝试次数: ${progress.attempts}次
        `;
        
        // 显示在UI面板中
        this.detailLabel.string = detailText;
    } else {
        this.detailLabel.string = '尚未完成此关卡';
    }
}
```

## 测试和调试

### 使用测试脚本

```typescript
// 添加LevelGradeTest组件到场景
// 然后使用键盘快捷键测试：

// 按Q键 - 测试S级评价
// 按W键 - 测试A级评价
// 按I键 - 查看所有关卡状态
// 按O键 - 重置数据

// 查看控制台输出验证结果
```

### 手动测试代码

```typescript
// 在任何脚本中添加测试代码
testLevelGradeSystem() {
    const pm = PlayerManager.instance;
    
    // 测试各种评级
    console.log('=== 测试开始 ===');
    
    // S级测试
    pm.updateLevelProgress('level-1', 25000, 3);
    console.log(`S级测试: ${pm.getLevelGradeText('level-1')}`);
    
    // A级测试
    pm.updateLevelProgress('level-2', 40000, 3);
    console.log(`A级测试: ${pm.getLevelGradeText('level-2')}`);
    
    // 查看解锁状态
    console.log(`解锁关卡: ${pm.playerData.unlockedLevels.join(', ')}`);
    
    console.log('=== 测试结束 ===');
}
```

## 常见问题解决

### 1. 评级不显示
```typescript
// 检查关卡节点是否有Label组件
const label = levelNode.getComponentInChildren(Label);
if (!label) {
    console.error(`关卡 ${levelId} 没有找到Label组件`);
}
```

### 2. 关卡不解锁
```typescript
// 检查前一关卡的评级
const prevLevelId = `level-${currentLevel - 1}`;
const prevProgress = PlayerManager.instance.getLevelProgress(prevLevelId);
console.log(`前一关卡评级: ${prevProgress?.grade}`);

// 检查是否达到解锁要求
const canUnlock = prevProgress?.grade !== 'F';
console.log(`可以解锁: ${canUnlock}`);
```

### 3. 数据不保存
```typescript
// 确保调用保存方法
PlayerManager.instance.savePlayerData();

// 检查保存状态
console.log('数据已保存到本地存储');
```

## 性能优化建议

1. **批量更新UI**：在数据变化后统一更新UI，避免频繁刷新
2. **缓存计算结果**：评级颜色等可以缓存避免重复计算
3. **延迟加载**：只在需要时计算和显示评级信息
4. **数据压缩**：对于大量关卡数据，考虑压缩存储格式

## 扩展功能示例

### 添加关卡统计

```typescript
// 获取玩家总体统计
getPlayerStats() {
    const allProgress = PlayerManager.instance.playerData.levelProgress;
    const stats = {
        totalLevels: Object.keys(allProgress).length,
        completedLevels: 0,
        sGrades: 0,
        aGrades: 0,
        totalAttempts: 0
    };
    
    Object.values(allProgress).forEach(progress => {
        if (progress.completed) stats.completedLevels++;
        if (progress.grade === 'S') stats.sGrades++;
        if (progress.grade === 'A') stats.aGrades++;
        stats.totalAttempts += progress.attempts;
    });
    
    return stats;
}
```

这个系统提供了完整的关卡评级和进度管理功能，可以根据具体需求进行调整和扩展。
