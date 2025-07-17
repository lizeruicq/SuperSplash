# 场景过渡系统设置指南

## 概述
这个场景过渡系统为你的Cocos Creator 2D游戏提供了平滑的渐入渐出场景切换效果，替代了生硬的直接场景切换。

## 设置步骤

### 1. 创建SceneTransition预制体

1. 在Cocos Creator编辑器中，在层级管理器中创建一个新的空节点
2. 将节点重命名为 "SceneTransition"
3. 为这个节点添加以下组件：
   - **Sprite组件**: 用于显示黑色遮罩
     - 设置颜色为黑色 (0, 0, 0, 255)
     - 可以使用默认的白色纹理，通过颜色来实现黑色效果
   - **UIOpacity组件**: 用于控制透明度
   - **SceneTransition脚本组件**: 拖拽 `assets/scripts/SceneTransition.ts` 到节点上

4. 设置节点属性：
   - 将节点的锚点设置为 (0.5, 0.5)
   - 将节点的位置设置为 (0, 0, 0)
   - 确保节点的尺寸足够大以覆盖整个屏幕（建议设置为 2048x2048）

5. 将这个节点保存为预制体：
   - 右键点击节点 → "保存为预制体"
   - 保存到 `assets/prefab/` 目录下，命名为 "SceneTransition.prefab"

### 2. 在每个场景中添加SceneTransition

为了确保场景过渡效果在所有场景中都能正常工作，你需要在每个场景中都添加SceneTransition：

#### 主菜单场景 (mainmenu.scene)
1. 打开主菜单场景
2. 将SceneTransition预制体拖拽到Canvas节点下
3. 确保SceneTransition节点在Canvas的最顶层（最后一个子节点）

#### 关卡选择场景 (LevelSelect.scene)
1. 打开关卡选择场景
2. 将SceneTransition预制体拖拽到Canvas节点下
3. 确保SceneTransition节点在Canvas的最顶层

#### 游戏场景 (gamescene.scene)
1. 打开游戏场景
2. 将SceneTransition预制体拖拽到Canvas节点下
3. 确保SceneTransition节点在Canvas的最顶层

### 3. 验证设置

1. 运行游戏
2. 测试场景切换：
   - 主菜单 → 关卡选择
   - 关卡选择 → 游戏场景
   - 游戏场景 → 关卡选择（通过暂停菜单或游戏结束）
   - 游戏场景重新开始

## 工作原理

### 代码修改
系统已经自动修改了以下文件中的场景切换代码：

1. **MainMenuController.ts**: `director.loadScene("LevelSelect")` → `SceneTransition.loadScene("LevelSelect")`
2. **SelectManager.ts**: `director.loadScene('gamescene')` → `SceneTransition.loadScene('gamescene')`
3. **GameManager.ts**: 
   - `director.loadScene(director.getScene()!.name)` → `SceneTransition.loadScene(director.getScene()!.name)`
   - `director.loadScene('LevelSelect')` → `SceneTransition.loadScene('LevelSelect')`

### 过渡效果
- **渐出**: 从透明渐变到黑屏（0.5秒）
- **场景切换**: 在黑屏状态下加载新场景
- **渐入**: 从黑屏渐变到透明（0.5秒）

### 单例模式
SceneTransition使用单例模式确保：
- 每个场景只有一个SceneTransition实例
- 实例在场景切换时保持持久化
- 避免重复创建和冲突

## 自定义选项

### 修改过渡时间
你可以通过修改 `SceneTransition.loadScene()` 的参数来自定义过渡时间：

```typescript
// 使用自定义时间（渐出1秒，渐入0.3秒）
SceneTransition.loadScene("sceneName", 1.0, 0.3);
```

### 修改过渡颜色
如果你想使用其他颜色而不是黑色：
1. 在预制体中修改Sprite组件的颜色
2. 或者修改SceneTransition.ts中的颜色设置

## 故障排除

### 问题1: 过渡效果不显示
- 检查SceneTransition节点是否在Canvas的最顶层
- 确认UIOpacity组件已正确添加
- 检查Sprite组件是否有有效的纹理

### 问题2: 场景切换失败
- 检查场景名称是否正确
- 确认场景已添加到构建设置中
- 查看控制台是否有错误信息

### 问题3: 过渡效果卡住
- 检查是否有多个SceneTransition实例
- 确认没有其他代码干扰tween动画
- 重启游戏重新测试

## 注意事项

1. **性能**: 过渡效果使用tween动画，对性能影响很小
2. **兼容性**: 适用于Cocos Creator 3.x版本
3. **扩展性**: 可以轻松扩展添加其他过渡效果（如滑动、缩放等）
4. **调试**: 在开发过程中可以通过控制台查看过渡日志
