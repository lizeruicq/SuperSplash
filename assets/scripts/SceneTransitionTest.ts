import { _decorator, Component, Button, Label, director } from 'cc';
import { SceneTransition } from './SceneTransition';
const { ccclass, property } = _decorator;

/**
 * 场景过渡测试脚本
 * 用于测试场景过渡效果是否正常工作
 */
@ccclass('SceneTransitionTest')
export class SceneTransitionTest extends Component {
    @property(Button)
    testButton: Button = null!;

    @property(Label)
    statusLabel: Label = null!;

    // 测试场景列表
    private testScenes: string[] = ['mainmenu', 'LevelSelect', 'gamescene'];
    private currentSceneIndex: number = 0;

    start() {
        this.bindEvents();
        this.updateStatusLabel();
        this.findCurrentSceneIndex();
    }

    /**
     * 绑定按钮事件
     */
    private bindEvents(): void {
        if (this.testButton) {
            this.testButton.node.on(Button.EventType.CLICK, this.onTestButtonClick, this);
        }
    }

    /**
     * 查找当前场景在测试列表中的索引
     */
    private findCurrentSceneIndex(): void {
        const currentSceneName = director.getScene()?.name;
        const index = this.testScenes.indexOf(currentSceneName || '');
        if (index !== -1) {
            this.currentSceneIndex = index;
        }
        this.updateStatusLabel();
    }

    /**
     * 测试按钮点击事件
     */
    private onTestButtonClick(): void {
        // 循环切换到下一个场景
        this.currentSceneIndex = (this.currentSceneIndex + 1) % this.testScenes.length;
        const nextScene = this.testScenes[this.currentSceneIndex];
        
        console.log(`Testing SceneTransition: Loading scene ${nextScene}`);
        
        // 使用SceneTransition切换场景
        SceneTransition.loadScene(nextScene);
    }

    /**
     * 更新状态标签
     */
    private updateStatusLabel(): void {
        if (this.statusLabel) {
            const currentScene = director.getScene()?.name || 'Unknown';
            const nextScene = this.testScenes[(this.currentSceneIndex + 1) % this.testScenes.length];
            this.statusLabel.string = `当前场景: ${currentScene}\n下一个场景: ${nextScene}\n点击按钮测试场景切换`;
        }
    }

    onDestroy() {
        // 清理事件监听
        if (this.testButton) {
            this.testButton.node.off(Button.EventType.CLICK, this.onTestButtonClick, this);
        }
    }
}
