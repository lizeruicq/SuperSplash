# AI车辆血条系统

## 功能说明

为每个AI车辆在头顶显示血条UI，血条始终跟随AI车辆，不受车辆旋转影响，血量由AIController统一管理。

## 系统架构

```
AI车辆节点
├── AIPlayer组件 (管理血量和血条)
└── HealthBar节点 (血条UI)
    ├── ProgressBar组件 (进度条)
    └── HealthBarUI组件 (位置控制)
```

## 设置步骤

### 1. AI车辆节点设置

#### 1.1 添加AIPlayer组件
- 在AI车辆节点上添加 `AIPlayer` 脚本组件
- 设置 `maxHealth` 属性（默认100）
- 将血条的ProgressBar组件拖拽到 `healthBar` 属性

#### 1.2 创建血条UI节点
在AI车辆节点下创建血条UI结构：
```
AI车辆节点
└── HealthBar (血条根节点)
    ├── Background (背景)
    │   └── BackgroundSprite (背景图片)
    └── ProgressBar (进度条)
        ├── BarSprite (进度条图片)
        └── ProgressBar组件
```

#### 1.3 添加HealthBarUI组件
- 在 `HealthBar` 根节点上添加 `HealthBarUI` 脚本组件
- 设置 `offsetY` 属性（血条在车辆上方的偏移距离，默认50）

### 2. 组件配置

#### 2.1 AIPlayer组件配置
```
maxHealth: 100 (最大生命值)
healthBar: ProgressBar组件引用
```

#### 2.2 HealthBarUI组件配置
```
offsetY: 50 (血条偏移距离)
```

### 3. 血条特性

#### 3.1 位置跟随
- 血条作为AI车辆的子节点，与父节点保持相对位置
- 血条会跟随AI车辆移动，但保持固定的相对位置
- 血条始终显示在车辆上方固定距离

#### 3.2 固定朝向
- 血条不会随车辆旋转而旋转
- 始终面向屏幕，保持UI可读性
- 每帧重置旋转角度为(0, 0, 0)

#### 3.3 血量管理
- 血量由AIPlayer组件管理
- 血条显示由AIPlayer自动更新
- 血量改变通过AIController调用

## 使用方法

### 1. 基本操作

```typescript
// 获取AIController组件
const aiController = this.getComponent(AIController);

// 设置AI车辆生命值
aiController.setAIHealth(0, 80); // 设置第0个AI车辆生命值为80

// 对AI车辆造成伤害
aiController.damageAI(0, 20); // 对第0个AI车辆造成20点伤害

// 恢复AI车辆生命值
aiController.healAI(0, 10); // 恢复第0个AI车辆10点生命值

// 获取AI车辆生命值
const health = aiController.getAIHealth(0); // 获取第0个AI车辆生命值
const maxHealth = aiController.getAIMaxHealth(0); // 获取第0个AI车辆最大生命值

// 检查AI车辆是否死亡
const isDead = aiController.isAIDead(0); // 检查第0个AI车辆是否死亡
```

### 2. 直接操作AIPlayer

```typescript
// 获取AI车辆组件
const aiPlayer = this.getComponent(AIPlayer);

// 设置生命值
aiPlayer.setHealth(80);

// 造成伤害
aiPlayer.takeDamage(20);

// 恢复生命值
aiPlayer.heal(10);

// 获取生命值
const health = aiPlayer.getHealth();
const maxHealth = aiPlayer.getMaxHealth();

// 检查是否死亡
const isDead = aiPlayer.isDead();
```

### 3. 血条UI控制

```typescript
// 获取血条UI组件
const healthBarUI = this.getComponent(HealthBarUI);

// 设置偏移距离
healthBarUI.setOffsetY(60);

// 显示/隐藏血条
healthBarUI.setVisible(false); // 隐藏血条
healthBarUI.setVisible(true);  // 显示血条
```

## 工作流程

### 1. 初始化流程
```
1. AI车辆加载 → AIPlayer组件初始化
2. 血条UI初始化 → HealthBarUI组件设置相机和Canvas引用
3. 血条位置更新 → 每帧更新血条位置
```

### 2. 血量更新流程
```
1. AIController调用血量改变方法
2. AIPlayer更新内部血量值
3. AIPlayer自动更新血条显示
4. HealthBarUI确保血条位置正确
```

### 3. 位置更新流程
```
1. 记录血条初始本地位置
2. 每帧设置血条位置为初始位置 + 偏移距离
3. 重置血条旋转角度为(0, 0, 0)
4. 血条自动跟随父节点移动，但保持相对位置不变
```

## 注意事项

1. **组件引用**：确保AIPlayer组件的healthBar属性正确引用ProgressBar组件
2. **节点层级**：血条必须是AI车辆的子节点
3. **相对位置**：血条与父节点保持相对位置，不受父节点旋转影响
4. **性能考虑**：每个AI车辆都会有一个血条，注意性能影响
5. **偏移设置**：通过offsetY属性调整血条在车辆上方的距离

## 扩展功能

### 1. 血条样式
- 修改ProgressBar的BarSprite颜色和样式
- 添加血条背景和边框
- 根据血量百分比改变颜色

### 2. 血条动画
- 添加血量变化时的动画效果
- 添加血条闪烁效果
- 添加伤害数字显示

### 3. 状态指示
- 在血条上添加状态图标
- 显示AI车辆的特殊状态
- 添加血条透明度变化

## 故障排除

### 1. 血条不显示
- 检查HealthBarUI组件是否正确添加
- 检查血条节点是否激活
- 检查血条是否在正确的父节点下

### 2. 血条位置错误
- 检查offsetY设置是否正确
- 检查血条初始位置是否正确
- 检查血条是否在正确的父节点下

### 3. 血量不更新
- 检查AIPlayer组件的healthBar引用
- 检查ProgressBar组件是否正确设置
- 检查血量改变方法是否正确调用

### 4. 血条旋转问题
- 检查HealthBarUI组件是否正确重置旋转
- 检查父节点旋转是否影响血条
- 检查血条是否每帧都重置旋转角度 