# HealthBarUI 血条系统说明

## 概述

HealthBarUI 是一个改进的血条系统，解决了血条跟随父节点旋转的问题。血条现在会从AI车辆节点中分离出来，成为Canvas下的独立节点，确保血条始终面向屏幕且不随车辆旋转。

## 系统架构

```
Canvas
├── PlayGround
│   └── Scene Prefab
│       └── cars
│           ├── AI Vehicle 1
│           │   └── HealthBar (初始位置，会被分离)
│           ├── AI Vehicle 2
│           │   └── HealthBar (初始位置，会被分离)
│           └── ...
└── HealthBar 1 (分离后的独立节点)
├── HealthBar 2 (分离后的独立节点)
└── ...
```

## 核心特性

### 1. 自动分离机制
- 血条在初始化时自动从AI车辆节点分离
- 移动到Canvas下成为独立节点
- 保持世界位置不变，避免位置跳跃

### 2. 独立位置更新
- 血条不再受父节点变换影响
- 每帧根据AI车辆的世界位置更新血条位置
- 血条始终面向屏幕（旋转为0）

### 3. 灵活的目标设置
- 支持动态设置目标AI车辆
- 可以在运行时切换血条跟随的目标

## 使用方法

### 1. 创建血条预制体

1. 在场景中创建一个UI节点作为血条
2. 添加必要的UI组件（如ProgressBar、Image等）
3. 添加HealthBarUI脚本组件
4. 将节点保存为预制体

### 2. 配置AI车辆

1. 将血条预制体作为AI车辆的子节点
2. 在AIPlayer组件中设置healthBarUI属性（可选）
3. 系统会自动处理血条的分离和初始化

### 3. 代码示例

```typescript
// 在AIPlayer中自动初始化
private initHealthBar() {
    this._currentHealth = this.maxHealth;
    
    // 如果没有手动设置血条UI，尝试自动查找
    if (!this.healthBarUI) {
        this.healthBarUI = this.node.getComponentInChildren(HealthBarUI);
    }
    
    if (this.healthBarUI) {
        // 设置血条的目标为当前AI车辆
        this.healthBarUI.setTarget(this.node);
        this.updateHealthBar();
    }
}
```

## 组件属性

### HealthBarUI 属性
- `offsetY`: 血条在车辆上方的偏移距离（默认50）

### 公共方法
- `setOffsetY(offset: number)`: 设置偏移距离
- `setVisible(visible: boolean)`: 显示/隐藏血条
- `setTarget(target: Node)`: 设置目标AI车辆
- `destroyHealthBar()`: 销毁血条

## 工作流程

1. **初始化阶段**
   - HealthBarUI在start()中获取Canvas引用
   - 记录当前AI车辆作为目标
   - 调用separateFromParent()分离血条

2. **分离过程**
   - 记录血条当前世界位置
   - 将血条移动到Canvas下
   - 保持世界位置不变
   - 设置初始化完成标志

3. **运行时更新**
   - 每帧获取目标AI车辆的世界位置
   - 计算血条新位置（车辆上方）
   - 设置血条世界位置
   - 重置血条旋转为0

## 优势

1. **完全独立**: 血条不再受父节点变换影响
2. **性能优化**: 避免复杂的坐标转换计算
3. **易于维护**: 清晰的分离逻辑，便于调试
4. **灵活扩展**: 支持动态目标切换和自定义偏移

## 注意事项

1. **Canvas依赖**: 系统需要场景中存在名为"Canvas"的节点
2. **初始化时机**: 血条分离在start()中进行，确保节点已完全加载
3. **内存管理**: 使用destroyHealthBar()方法正确销毁血条
4. **性能考虑**: 每帧更新位置，确保血条跟随车辆移动

## 故障排除

### 血条不显示
- 检查Canvas节点是否存在
- 确认血条预制体包含HealthBarUI组件
- 查看控制台是否有错误信息

### 血条位置不正确
- 检查offsetY设置是否合适
- 确认AI车辆节点有效
- 验证世界坐标转换是否正确

### 血条仍然旋转
- 确认血条已成功分离到Canvas下
- 检查update()方法是否正常执行
- 验证setRotationFromEuler(0, 0, 0)是否生效

## 版本历史

- v2.0: 完全重写，实现血条分离机制
- v1.0: 基础血条跟随功能（已废弃） 