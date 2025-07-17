# 快速测试场景过渡效果

## 最简单的测试方法

如果你想快速测试场景过渡效果而不需要完整设置，可以按照以下步骤：

### 1. 创建最简单的SceneTransition节点

1. 在任意一个场景中（建议从主菜单开始）
2. 在Canvas下创建一个新的空节点，命名为"SceneTransition"
3. 为这个节点添加组件：
   - **Sprite组件**：设置颜色为黑色 (0, 0, 0, 255)
   - **UIOpacity组件**
   - **Widget组件**：设置为全屏对齐
     - 勾选 Top、Bottom、Left、Right
     - 所有边距设为 0
   - **SceneTransition脚本**：拖拽 `SceneTransition.ts` 到节点上

4. 确保这个节点在Canvas的最后（最顶层）

### 2. 立即测试

现在你可以立即测试：
1. 运行游戏
2. 点击"开始游戏"按钮
3. 你应该看到黑屏渐入渐出的过渡效果

### 3. 添加测试按钮（可选）

如果你想要一个专门的测试按钮：

1. 在场景中添加一个Button节点
2. 为Button添加 `SceneTransitionTest.ts` 脚本
3. 在脚本属性中：
   - 将Button拖拽到 `testButton` 字段
   - 创建一个Label显示状态，拖拽到 `statusLabel` 字段
4. 运行游戏，点击测试按钮即可循环测试所有场景

## 预期效果

正确设置后，你应该看到：
1. **渐出效果**：屏幕从正常画面渐变到黑屏（0.5秒）
2. **场景加载**：在黑屏状态下加载新场景
3. **渐入效果**：从黑屏渐变到新场景画面（0.5秒）

## 如果没有效果

检查以下几点：
1. SceneTransition节点是否在Canvas的最顶层
2. Sprite组件是否设置为黑色
3. UIOpacity组件是否正确添加
4. Widget组件是否设置为全屏对齐
5. 控制台是否有错误信息

## 控制台日志

正常工作时，你应该在控制台看到：
```
SceneTransition initialized
Starting scene transition to: LevelSelect
Scene transition to LevelSelect completed
```

## 自定义过渡时间

如果你觉得0.5秒太快或太慢，可以修改：

```typescript
// 在任何调用场景切换的地方
SceneTransition.loadScene("sceneName", 1.0, 0.8); // 渐出1秒，渐入0.8秒
```

## 下一步

测试成功后，建议：
1. 将SceneTransition保存为预制体
2. 在所有场景中添加这个预制体
3. 按照完整的设置指南进行配置

这样可以确保所有场景切换都有平滑的过渡效果。
