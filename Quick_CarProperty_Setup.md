# 车辆属性系统 - 精简版设置

## 快速设置步骤

### 1. 创建节点结构

在LevelSelect场景的Canvas下创建：

```
Canvas
└── car-property
    ├── speed (添加ProgressBar组件)
    ├── steering (添加ProgressBar组件)
    └── durability (添加ProgressBar组件)
```

### 2. 设置组件

1. **car-property节点**：
   - 添加 `CarPropertyDisplay` 脚本组件
   - 设置三个进度条：
     - Speed Progress Bar: 拖拽speed节点的ProgressBar
     - Steering Progress Bar: 拖拽steering节点的ProgressBar
     - Durability Progress Bar: 拖拽durability节点的ProgressBar
   - Enable Animation: 勾选（启用动画）
   - Animation Duration: 0.5（动画时长）

2. **SelectManager节点**：
   - Car Property Display: 拖拽car-property节点的CarPropertyDisplay组件

### 3. 车辆属性配置

当前配置（可在CarProperties.ts中修改）：

| 车辆 | 速度 | 转向 | 坚硬度 |
|------|------|------|--------|
| car-1 | 60 | 70 | 80 |
| car-2 | 75 | 65 | 70 |
| car-3 | 85 | 60 | 65 |
| car-4 | 90 | 55 | 60 |
| car-5 | 95 | 50 | 55 |

## 工作原理

1. 点击车辆 → SelectManager监听Toggle变化
2. 获取车辆ID → 查询CarProperties中的属性
3. 更新进度条 → 以动画形式显示属性值

## 预期效果

选择车辆时，三个进度条会以0.5秒动画更新到对应数值。

## 故障排除

- **没反应**: 检查car-property节点和CarPropertyDisplay组件
- **进度条不动**: 确认ProgressBar的Mode为FILLED
- **想修改属性**: 编辑CarProperties.ts中的数值（0-100范围）

设置完成后，车辆选择界面就有动态属性展示了！
