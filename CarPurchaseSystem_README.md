# 车辆购买系统

## 概述

车辆购买系统允许玩家在LevelSelect场景中使用金币购买未解锁的车辆。系统包含以下功能：

- 车辆价格配置
- 金币检查和扣除
- 购买按钮显示/隐藏
- 金币不足提示
- 自动保存购买记录

## 系统架构

### 1. SelectManager (车辆选择管理器)

**新增属性：**
- `insufficientMoneyLabel: Label` - 金币不足提示标签
- `carPrices: CarPriceConfig` - 车辆价格配置

**注意：** 金币显示由PlayerInfoUI组件负责，SelectManager不需要单独的金币显示标签。

**车辆价格配置：**
```typescript
private carPrices: CarPriceConfig = {
    'car-1': 0,      // 默认车辆免费
    'car-2': 500,    // 第二辆车500金币
    'car-3': 1000,   // 第三辆车1000金币
    'car-4': 1500,   // 第四辆车1500金币
    'car-5': 2000,   // 第五辆车2000金币
};
```

**主要方法：**
- `setupCarPurchaseButtons()` - 设置购买按钮
- `updateCarPurchaseButton()` - 更新单个车辆的购买按钮
- `onPurchaseCar(carId)` - 处理车辆购买
- `showInsufficientMoneyMessage()` - 显示金币不足提示

### 2. PlayerManager (玩家数据管理器)

**新增方法：**
- `isCarUnlocked(carId: string): boolean` - 检查车辆是否已解锁

**现有相关方法：**
- `spendMoney(amount: number): boolean` - 消费金币
- `unlockCar(carId: string): boolean` - 解锁车辆
- `savePlayerData()` - 保存玩家数据

## 使用说明

### 1. 场景设置

在LevelSelect场景中需要设置以下UI元素：

1. **金币显示标签**
   - 在SelectManager组件中绑定`moneyLabel`
   - 用于显示当前玩家金币数量

2. **金币不足提示标签**
   - 在SelectManager组件中绑定`insufficientMoneyLabel`
   - 用于显示"金币不足"提示信息

3. **车辆购买按钮**
   - 每个车辆节点下需要添加名为"PurchaseButton"的子节点
   - 购买按钮下需要有名为"Label"的子节点用于显示价格
   - 购买按钮需要添加Button组件

### 2. 节点结构示例

```
cars (ToggleContainer)
├── car-1 (Toggle)
│   ├── Sprite (车辆图标)
│   └── PurchaseButton (Button)
│       └── Label (显示价格文本)
├── car-2 (Toggle)
│   ├── Sprite (车辆图标)
│   └── PurchaseButton (Button)
│       └── Label (显示价格文本)
└── car-3 (Toggle)
    ├── Sprite (车辆图标)
    └── PurchaseButton (Button)
        └── Label (显示价格文本)
```

### 3. 购买流程

1. **检查解锁状态**
   - 已解锁车辆：隐藏购买按钮，车辆图标正常显示
   - 未解锁车辆：显示购买按钮，车辆图标变黑

2. **点击购买按钮**
   - 检查玩家金币是否足够
   - 足够：扣除金币，解锁车辆，更新UI，保存数据
   - 不足：显示"金币不足"提示，3秒后自动隐藏

3. **UI更新**
   - 金币数量实时更新
   - 车辆解锁状态实时更新
   - 购买按钮显示/隐藏状态实时更新

## 测试功能

### CarPurchaseTest 测试脚本

提供了完整的测试脚本用于验证购买系统功能：

**测试键位：**
- `1` - 添加500金币
- `2` - 减少200金币
- `3` - 尝试购买car-2 (500金币)
- `4` - 尝试购买car-3 (1000金币)
- `5` - 重置玩家数据
- `6` - 显示当前状态

**使用方法：**
1. 将CarPurchaseTest组件添加到LevelSelect场景的任意节点
2. 在组件中绑定SelectManager引用
3. 运行游戏并使用键盘测试各项功能

## 配置说明

### 1. 修改车辆价格

在SelectManager中修改`carPrices`配置：

```typescript
private carPrices: CarPriceConfig = {
    'car-1': 0,      // 免费车辆
    'car-2': 300,    // 修改为300金币
    'car-3': 800,    // 修改为800金币
    // 添加新车辆
    'car-6': 2500,   // 新车辆2500金币
};
```

### 2. 动态设置价格

使用SelectManager的方法动态设置：

```typescript
// 获取SelectManager实例
const selectManager = this.getComponent(SelectManager);

// 设置车辆价格
selectManager.setCarPrice('car-2', 600);

// 获取车辆价格
const price = selectManager.getCarPrice('car-2');
```

## 注意事项

1. **数据持久化**
   - 购买记录会自动保存到PlayerManager
   - 支持微信小游戏和本地存储

2. **错误处理**
   - 自动检查PlayerManager实例是否存在
   - 处理价格配置缺失的情况
   - 防止重复购买已解锁车辆

3. **UI同步**
   - 购买成功后自动更新所有相关UI
   - 金币变化实时反映在界面上

4. **扩展性**
   - 支持添加新车辆和价格配置
   - 可以轻松修改购买逻辑和UI表现

## 集成步骤

1. 确保PlayerManager已正确设置并初始化
2. 在LevelSelect场景中配置UI元素
3. 在SelectManager组件中绑定相关UI引用
4. 根据需要调整车辆价格配置
5. 测试购买流程确保功能正常
