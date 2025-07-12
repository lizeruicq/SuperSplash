# LevelSelect场景UI设置指南

## 概述

本指南详细说明如何在LevelSelect场景中设置车辆购买系统所需的UI元素。

## 必需的UI元素

**注意：** 金币显示由PlayerInfoUI组件负责，无需在SelectManager中单独设置金币显示标签。

### 1. 金币不足提示标签 (insufficientMoneyLabel)

**位置：** 屏幕中央或购买按钮附近
**组件：** Label
**用途：** 显示"金币不足"提示信息

**设置步骤：**
1. 在Canvas下创建一个新的Node，命名为"InsufficientMoneyTip"
2. 添加Label组件
3. 设置Label的文本为"金币不足！"
4. 设置醒目的颜色（如红色）
5. 默认设置为不可见（Active = false）
6. 在SelectManager组件中将此Label绑定到insufficientMoneyLabel属性

### 2. 车辆购买按钮

**位置：** 每个车辆图标上或附近
**组件：** Button + Label
**用途：** 显示价格并处理购买操作

**设置步骤：**

#### 为每个车辆节点添加购买按钮：

1. **选择车辆节点**
   - 找到cars节点下的车辆节点（如car-2, car-3等）

2. **创建购买按钮**
   - 在车辆节点下创建子节点，命名为"PurchaseButton"
   - 添加Button组件
   - 设置Button的Target为自身
   - 配置按钮的Normal、Hover、Pressed状态的Sprite

3. **创建价格标签**
   - 在PurchaseButton下创建子节点，命名为"Label"
   - 添加Label组件
   - 设置文本为"购买 500"（示例）
   - 调整字体大小和颜色

4. **调整位置和大小**
   - 将购买按钮放置在车辆图标的合适位置
   - 确保按钮不会遮挡重要的车辆信息
   - 建议放在车辆图标的右下角或底部

## 完整的节点结构

```
Canvas
├── InsufficientMoneyTip (Label) ← 绑定到SelectManager.insufficientMoneyLabel
├── levels (ToggleContainer)
│   ├── level-1 (Toggle)
│   ├── level-2 (Toggle)
│   └── level-3 (Toggle)
├── cars (ToggleContainer) ← 绑定到SelectManager.carToggleGroup
│   ├── car-1 (Toggle)
│   │   ├── Sprite (车辆图标)
│   │   └── PurchaseButton (Button) [可选，car-1免费]
│   │       └── Label (价格文本)
│   ├── car-2 (Toggle)
│   │   ├── Sprite (车辆图标)
│   │   └── PurchaseButton (Button) ← 必需
│   │       └── Label (价格文本)
│   ├── car-3 (Toggle)
│   │   ├── Sprite (车辆图标)
│   │   └── PurchaseButton (Button) ← 必需
│   │       └── Label (价格文本)
│   └── ... (其他车辆)
└── startbutton (Button) ← 绑定到SelectManager.startButton
```

## SelectManager组件配置

在SelectManager组件中需要绑定以下属性：

1. **levelToggleGroup** → levels节点的ToggleContainer组件
2. **carToggleGroup** → cars节点的ToggleContainer组件
3. **startButton** → startbutton节点的Button组件
4. **insufficientMoneyLabel** → InsufficientMoneyTip节点的Label组件

**注意：** 不需要绑定moneyLabel，因为PlayerInfoUI组件会自动处理金币显示。

## 样式建议

### 金币不足提示标签
- 字体大小：28-36
- 颜色：红色 (#FF0000) 或橙红色
- 位置：屏幕中央
- 动画：可添加闪烁或缩放动画效果

### 购买按钮
- 大小：适中，不遮挡车辆图标
- 颜色：绿色系（表示购买）
- 文字：白色，清晰易读
- 状态：Normal（绿色）、Hover（亮绿色）、Pressed（深绿色）

### 车辆图标（未解锁状态）
- 颜色：黑色或灰色（通过Sprite.color设置）
- 透明度：可适当降低透明度表示不可用

## 测试检查清单

设置完成后，请检查以下项目：

- [ ] PlayerInfoUI正确显示当前金币数量（由PlayerInfoUI组件负责）
- [ ] 未解锁车辆显示为黑色/灰色
- [ ] 未解锁车辆显示购买按钮
- [ ] 已解锁车辆隐藏购买按钮
- [ ] 购买按钮显示正确的价格
- [ ] 点击购买按钮能触发购买逻辑
- [ ] 金币不足时显示提示信息
- [ ] 提示信息3秒后自动隐藏
- [ ] 购买成功后UI正确更新

## 常见问题

### Q: 购买按钮不显示？
A: 检查节点命名是否为"PurchaseButton"，确保在正确的车辆节点下。

### Q: 价格文本不更新？
A: 检查购买按钮下的Label节点命名是否为"Label"。

### Q: 金币显示不更新？
A: 确保PlayerInfoUI组件正确设置并绑定了moneyLabel，PlayerManager的数据变化监听正常工作。

### Q: 点击购买按钮没有反应？
A: 检查Button组件是否正确添加，确保SelectManager的updateCarPurchaseButton方法被调用。

## 进阶自定义

### 添加购买确认对话框
可以在onPurchaseCar方法中添加确认对话框：

```typescript
// 在SelectManager中添加
showPurchaseConfirmDialog(carId: string, price: number) {
    // 显示确认对话框
    // "确定要花费 {price} 金币购买 {carId} 吗？"
}
```

### 添加购买动画效果
可以为购买成功添加动画效果：

```typescript
// 购买成功后播放动画
playPurchaseSuccessAnimation(carNode: Node) {
    // 播放闪光、缩放等动画效果
}
```

### 添加音效
在购买成功和失败时播放相应音效：

```typescript
// 购买成功音效
AudioManager.playSound('purchase_success');

// 金币不足音效  
AudioManager.playSound('insufficient_money');
```
