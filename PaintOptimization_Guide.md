# 颜料喷洒优化指南

## 问题描述

在游戏中，车辆会持续喷洒颜料，如果不加限制，会导致：
- 场景中颜料节点过多
- 游戏运行缓慢
- 内存占用过高
- 渲染性能下降

## 解决方案

### 优化逻辑

在`PaintManager.addPaint()`方法中添加了智能判断：

1. **检查附近是否有自己的颜料**
2. **如果距离小于Coverage Radius，则跳过喷洒**
3. **只对其他玩家的颜料进行覆盖**

### 核心代码

```typescript
// 在addPaint方法中添加的检查
if (this.isNearOwnPaint(position2D, ownerId)) {
    // 跳过颜料喷洒，避免重复
    return;
}

// 新增的检查方法
private isNearOwnPaint(position: Vec2, ownerId: string): boolean {
    for (const paintData of this.paintMap.values()) {
        // 只检查同一拥有者的颜料
        if (paintData.ownerId === ownerId) {
            const distance = Vec2.distance(paintData.position, position);
            
            // 如果距离小于覆盖半径，说明附近已有自己的颜料
            if (distance < this.coverageRadius) {
                return true;
            }
        }
    }
    return false;
}
```

## 工作原理

### 优化前的行为：
```
车辆移动 → 每帧喷洒颜料 → 大量重复的颜料节点
```

### 优化后的行为：
```
车辆移动 → 检查附近是否有自己的颜料 → 
├─ 有：跳过喷洒
└─ 无：正常喷洒
```

## 参数说明

### Coverage Radius
- **位置**: PaintManager组件的属性
- **默认值**: 30像素
- **作用**: 控制颜料覆盖和重复检测的范围
- **调整建议**: 
  - 增大 → 颜料更稀疏，性能更好
  - 减小 → 颜料更密集，视觉效果更好

## 性能优化效果

### 节点数量减少
- **优化前**: 车辆每帧都可能创建颜料节点
- **优化后**: 只在必要时创建颜料节点
- **预期减少**: 60-80%的颜料节点

### 内存使用优化
- 减少Node对象创建
- 减少Map存储的数据量
- 降低垃圾回收压力

### 渲染性能提升
- 减少DrawCall数量
- 降低GPU渲染负担
- 提高帧率稳定性

## 游戏逻辑保持

### 保留的功能：
1. ✅ **颜料覆盖**: 不同玩家的颜料仍然可以相互覆盖
2. ✅ **领土争夺**: 游戏的核心玩法不受影响
3. ✅ **视觉效果**: 颜料分布仍然自然

### 优化的部分：
1. 🚀 **避免重复**: 同一车辆不会在附近重复喷洒
2. 🚀 **性能提升**: 减少不必要的节点创建
3. 🚀 **内存优化**: 降低内存占用

## 调试和监控

### 控制台日志
- 成功喷洒: `添加颜料: 拥有者=car-1, 位置=(100.0, 200.0)`
- 跳过喷洒: 可以取消注释日志来查看跳过情况

### 性能监控
```typescript
// 可以添加统计代码
private paintSkipCount: number = 0;
private paintCreateCount: number = 0;

// 在isNearOwnPaint返回true时
this.paintSkipCount++;

// 在成功创建颜料时
this.paintCreateCount++;

// 定期输出统计
console.log(`颜料统计: 创建=${this.paintCreateCount}, 跳过=${this.paintSkipCount}`);
```

## 进一步优化建议

### 1. 时间间隔限制
```typescript
// 为每个车辆添加喷洒冷却时间
private lastPaintTime: Map<string, number> = new Map();

public addPaint(paintPrefab: Prefab, worldPosition: Vec3, ownerId: string): void {
    const now = Date.now();
    const lastTime = this.lastPaintTime.get(ownerId) || 0;
    
    // 限制喷洒频率（例如每100ms一次）
    if (now - lastTime < 100) {
        return;
    }
    
    this.lastPaintTime.set(ownerId, now);
    // ... 其他逻辑
}
```

### 2. 区域分块管理
```typescript
// 将地图分成网格，只检查相邻网格的颜料
private paintGrid: Map<string, PaintData[]> = new Map();
```

### 3. 颜料生命周期
```typescript
// 为颜料添加生命周期，自动清理旧颜料
private cleanupOldPaint(): void {
    const now = Date.now();
    const maxAge = 60000; // 60秒
    
    this.paintMap.forEach((paintData, paintId) => {
        if (now - paintData.timestamp > maxAge) {
            this.removePaint(paintId);
        }
    });
}
```

## 总结

这个优化通过简单的距离检查，有效减少了重复颜料的创建，在保持游戏玩法不变的前提下显著提升了性能。你可以通过调整`coverageRadius`参数来平衡性能和视觉效果。
