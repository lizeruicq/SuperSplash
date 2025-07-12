# 车辆摧毁系统

## 概述

为玩家车辆(player)和AI车辆(AIPlayer)添加了完整的摧毁判断系统。当车辆HP降为0时，车辆将被摧毁，显示摧毁状态的精灵图，并逐渐停止移动。

## 新增功能

### 1. 生命值系统
- **玩家车辆**: 默认100点生命值
- **AI车辆**: 默认100点生命值
- 受到伤害时生命值减少
- 生命值降为0时触发摧毁

### 2. 摧毁判断
- **自动检测**: 每次受到伤害后自动检查生命值
- **摧毁触发**: HP <= 0时自动执行摧毁逻辑
- **状态管理**: 摧毁后车辆进入不可控制状态

### 3. 摧毁动画
- **精灵切换**: 自动切换到摧毁状态的精灵图
- **逐渐停止**: 车辆速度逐渐衰减直至完全停止
- **视觉效果**: 车辆缩小并旋转180度

### 4. 游戏集成
- **玩家摧毁**: 自动通知GameManager更新玩家血量
- **AI摧毁**: 自动更新敌人数量，可能触发游戏胜利
- **血条隐藏**: AI车辆摧毁时自动隐藏血条

### 5. 节点移除系统
- **延迟移除**: AI车辆摧毁3秒后自动移除节点
- **自动清理**: 从GameManager的AI列表中移除已摧毁车辆
- **数量更新**: 移除节点时再次刷新敌人数量
- **可配置**: 通过`removeDelay`属性配置移除延迟时间

### 6. 动态血量系统
- **动态初始化**: GameManager在player预制体加载完成后自动读取maxHealth
- **实时同步**: player受到伤害时自动同步血量到GameManager
- **准确显示**: UI血量条始终反映player组件的真实血量
- **灵活配置**: 不同车辆预制体可以有不同的血量设置

## 使用方法

### 1. 配置车辆组件

#### 玩家车辆 (player)
在player组件中需要配置：

```typescript
@property
maxHealth: number = 100; // 最大生命值

@property(SpriteFrame)
destroyedSprite: SpriteFrame = null!; // 摧毁状态的精灵图
```

#### AI车辆 (AIPlayer)
在AIPlayer组件中需要配置：

```typescript
@property
maxHealth: number = 100; // 最大生命值

@property(SpriteFrame)
destroyedSprite: SpriteFrame = null!; // 摧毁状态的精灵图

@property
removeDelay: number = 3.0; // 摧毁后移除节点的延迟时间（秒）
```

### 2. 准备摧毁精灵图

为每种车辆准备两张精灵图：
- **正常状态**: 车辆完好的图片
- **摧毁状态**: 车辆损坏/爆炸的图片

在Cocos Creator中：
1. 将摧毁状态的图片导入项目
2. 在车辆组件的`destroyedSprite`属性中拖入摧毁状态的SpriteFrame

### 3. 代码调用

#### 造成伤害
```typescript
// 对玩家造成伤害
playerComponent.takeDamage(20);

// 对AI车辆造成伤害
aiPlayerComponent.takeDamage(30);
```

#### 检查状态
```typescript
// 检查是否已摧毁
if (playerComponent.isDestroyed()) {
    console.log('玩家车辆已摧毁');
}

if (aiPlayerComponent.isDestroyed()) {
    console.log('AI车辆已摧毁');
}
```

#### 恢复车辆（重新开始游戏时）
```typescript
// 恢复玩家车辆
playerComponent.restoreVehicle();

// 恢复AI车辆
aiPlayerComponent.restoreVehicle();
```

## API 参考

### 玩家车辆 (player)

```typescript
// 生命值管理
takeDamage(damage: number): void          // 受到伤害
getCurrentHealth(): number                // 获取当前生命值
getMaxHealth(): number                   // 获取最大生命值

// 状态查询
isDestroyed(): boolean                   // 是否已摧毁

// 车辆恢复
restoreVehicle(): void                   // 恢复车辆状态
```

### AI车辆 (AIPlayer)

```typescript
// 生命值管理
takeDamage(damage: number): void          // 受到伤害
setHealth(health: number): void          // 设置生命值
getHealth(): number                      // 获取当前生命值
getMaxHealth(): number                   // 获取最大生命值
heal(amount: number): void               // 恢复生命值

// 状态查询
isDestroyed(): boolean                   // 是否已摧毁
isDead(): boolean                        // 是否死亡（兼容旧方法）

// 车辆恢复
restoreVehicle(): void                   // 恢复车辆状态
```

## 摧毁流程

### 玩家车辆摧毁流程
1. 受到伤害 → `takeDamage()`
2. 生命值检查 → HP <= 0
3. 执行摧毁 → `destroyVehicle()`
4. 切换精灵图 → 显示摧毁状态
5. 禁用输入控制
6. 开始摧毁动画
7. 逐渐停止移动
8. 通知GameManager更新玩家血量

### AI车辆摧毁流程
1. 受到伤害 → `takeDamage()`
2. 生命值检查 → HP <= 0
3. 执行摧毁 → `destroyVehicle()`
4. 切换精灵图 → 显示摧毁状态
5. 隐藏血条UI
6. 开始摧毁动画
7. 逐渐停止移动
8. 立即更新敌人数量
9. 安排3秒后移除节点
10. 节点移除时从AI列表中清除
11. 再次更新敌人数量
12. 可能触发游戏胜利判断

## 摧毁动画详情

### 视觉效果
- **缩放**: 车辆缩小到80%
- **旋转**: 旋转180度
- **持续时间**: 2秒动画时间

### 物理效果
- **速度衰减**: 每帧速度乘以0.95
- **完全停止**: 速度小于0.1时设为0
- **保持位置**: 车辆停在摧毁位置

## 注意事项

1. **精灵图配置**: 确保为每个车辆都配置了摧毁状态的精灵图
2. **生命值初始化**: 车辆生命值在onLoad时自动初始化为maxHealth
3. **重复摧毁**: 系统会自动防止重复摧毁同一车辆
4. **游戏重启**: 使用restoreVehicle()方法可以完全恢复车辆状态
5. **性能考虑**: 摧毁的车辆仍会执行update，但只处理摧毁动画

## 在Cocos Creator中的配置步骤

### 1. 配置玩家车辆

1. 选择玩家车辆节点
2. 在player组件中设置：
   - **Max Health**: 设置最大生命值（默认100）
   - **Destroyed Sprite**: 拖入摧毁状态的SpriteFrame
3. 确保车辆有Sprite组件用于显示图片
4. 确保车辆有RigidBody2D和BoxCollider2D组件

### 2. 配置AI车辆

1. 选择AI车辆节点
2. 在AIPlayer组件中设置：
   - **Max Health**: 设置最大生命值（默认100）
   - **Destroyed Sprite**: 拖入摧毁状态的SpriteFrame
   - **Health Bar**: 拖入血条ProgressBar组件（可选）
3. 确保车辆有Sprite组件用于显示图片
4. 确保车辆有RigidBody2D和BoxCollider2D组件

### 3. 准备摧毁精灵图

1. 在项目中创建`textures/vehicles/destroyed/`文件夹
2. 导入摧毁状态的车辆图片
3. 在属性检查器中将图片设置为Sprite Frame类型
4. 将对应的SpriteFrame拖入车辆组件的Destroyed Sprite属性

### 4. 测试摧毁功能

可以添加VehicleDestructionTest组件进行测试：

1. 创建一个UI节点
2. 添加VehicleDestructionTest脚本
3. 创建测试按钮和标签：
   - 伤害玩家按钮
   - 伤害AI按钮
   - 摧毁玩家按钮
   - 摧毁AI按钮
   - 恢复所有按钮
   - 血量显示标签
   - 状态显示标签
4. 将UI元素拖入对应的属性槽

### 5. 键盘测试快捷键

- **1键**: 对玩家造成20点伤害
- **2键**: 对随机AI造成20点伤害
- **3键**: 直接摧毁玩家
- **4键**: 直接摧毁随机AI
- **5键**: 摧毁AI并测试3秒后移除功能
- **6键**: 测试血量同步功能
- **R键**: 恢复所有车辆

## 故障排除

### 常见问题

1. **摧毁精灵图不显示**
   - 检查是否正确设置了Destroyed Sprite属性
   - 确认精灵图已正确导入并设置为SpriteFrame

2. **车辆不会停止移动**
   - 检查车辆是否有RigidBody2D组件
   - 确认update方法中的摧毁检查逻辑

3. **AI血条不隐藏**
   - 检查healthBar属性是否正确设置
   - 确认血条节点存在且可访问

4. **游戏状态不更新**
   - 确认GameManager单例正常工作
   - 检查refreshEnemyCount方法调用

### 调试建议

1. 在浏览器控制台查看摧毁相关的日志输出
2. 使用VehicleDestructionTest组件进行功能测试
3. 检查车辆的isDestroyed()状态
4. 验证生命值变化是否正确

## 扩展建议

1. **音效**: 在摧毁时播放爆炸音效
2. **粒子效果**: 添加爆炸粒子特效
3. **碎片**: 车辆摧毁时产生碎片飞散效果
4. **摧毁计数**: 统计摧毁的车辆数量用于评分
5. **不同摧毁状态**: 根据剩余血量显示不同程度的损坏
6. **摧毁奖励**: 摧毁敌方车辆时给予金币奖励
7. **摧毁特效**: 添加屏幕震动等反馈效果
