# AIController 自动查找AI车辆功能

## 功能说明

AIController现在支持自动查找场景中的AI车辆，无需手动拖拽设置。AI车辆会在场景预制体加载完成后自动查找。

## 加载流程

### 1. 场景初始化
- AIController在start()方法中初始化基本设置
- 等待场景预制体加载完成

### 2. 场景预制体加载
- GameSceneManager加载场景预制体
- 场景预制体加载完成后，通知所有AIController组件

### 3. AI车辆查找
- AIController收到通知后，开始查找AI车辆
- 自动将找到的AI车辆添加到管理列表中

## 使用方法

### 1. 场景结构设置

确保你的场景结构如下：
```
Scene (场景根节点)
├── Canvas
│   ├── PlayGround (游戏场地节点)
│   │   └── [场景预制体level-1加载后]
│   │       └── level-1 (场景预制体节点)
│   │           └── cars (AI车辆容器节点)
│   │               ├── AI_Car_1 (AI车辆节点1)
│   │               ├── AI_Car_2 (AI车辆节点2)
│   │               └── AI_Car_3 (AI车辆节点3)
│   ├── GameSceneManager (游戏场景管理器)
│   └── AIController (AI控制器节点)
```

**注意**：cars节点在场景预制体（如level-1）内部，场景预制体会被实例化到PlayGround节点下。查找路径为：Scene → Canvas → PlayGround → 场景预制体 → cars → AI车辆。

### 2. AI车辆节点要求

每个AI车辆节点必须：
- 包含 `AIPlayer` 组件
- 包含 `RigidBody2D` 组件（AIPlayer会自动配置）

### 3. 自动查找机制

- **延迟查找**：AIController等待场景预制体加载完成后再查找AI车辆
- **自动通知**：GameSceneManager在场景预制体加载完成后自动通知AIController
- **控制台输出**：会显示找到的AI车辆数量和名称
- **错误处理**：如果未找到"cars"节点或AIPlayer组件，会在控制台显示警告

### 4. 运行时刷新

如果需要动态加载AI车辆，可以调用：
```typescript
// 获取AIController组件
const aiController = this.getComponent(AIController);
// 重新查找AI车辆
aiController.refreshAIPlayers();
```

## 控制台输出示例

```
AIController初始化完成，等待场景预制体加载...
找到 1 个AIController组件，通知场景预制体加载完成
场景预制体加载完成，开始查找AI车辆...
找到场景预制体节点: level-1
找到cars节点，包含 3 个子节点
找到AI车辆: AI_Car_1
找到AI车辆: AI_Car_2
找到AI车辆: AI_Car_3
AI车辆查找完成，找到 3 个AI车辆
```

**查找路径**：Scene → Canvas → PlayGround → 场景预制体 → cars → AI车辆

## 注意事项

1. **节点名称**：AI车辆容器节点必须命名为"cars"（区分大小写）
2. **组件依赖**：每个AI车辆节点必须包含AIPlayer组件
3. **加载顺序**：确保场景预制体在AIController之前加载
4. **动态更新**：如果场景中的AI车辆发生变化，调用refreshAIPlayers()方法
5. **预制体依赖**：AI车辆必须在场景预制体中，而不是场景根节点下

## 兼容性

- 保持与原有手动拖拽方式的兼容性
- 如果aiPlayers数组已手动设置，自动查找不会覆盖现有设置
- 支持运行时动态添加/删除AI车辆
- 支持多个AIController组件同时工作 