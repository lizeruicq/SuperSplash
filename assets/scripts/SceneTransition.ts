import { _decorator, Component, director, UIOpacity, tween, Widget } from 'cc';
const { ccclass } = _decorator;

/**
 * 场景过渡管理器
 * 提供渐入渐出的场景切换效果
 */
@ccclass('SceneTransition')
export class SceneTransition extends Component {
    private static instance: SceneTransition | null = null;
    private uiOpacity: UIOpacity | null = null;
    private isTransitioning: boolean = false;

    /**
     * 获取单例实例
     */
    public static getInstance(): SceneTransition | null {
        return SceneTransition.instance;
    }

    /**
     * 静态方法：使用渐变效果加载场景
     * @param sceneName 场景名称
     * @param fadeOutDuration 渐出时间（默认0.5秒）
     * @param fadeInDuration 渐入时间（默认0.5秒）
     */
    public static loadScene(sceneName: string, fadeOutDuration: number = 0.5, fadeInDuration: number = 0.5): void {
        const instance = SceneTransition.getInstance();
        if (instance && !instance.isTransitioning) {
            instance.loadSceneWithTransition(sceneName, fadeOutDuration, fadeInDuration);
        } else {
            // 如果没有实例或正在过渡中，直接加载场景
            console.warn('SceneTransition not available, loading scene directly');
            director.loadScene(sceneName);
        }
    }

    onLoad() {
        // 确保只有一个实例
        if (SceneTransition.instance) {
            this.node.destroy();
            return;
        }

        SceneTransition.instance = this;

        // 设置为常驻节点，不会在场景切换时被销毁
        // director.addPersistRootNode(this.node);

        // 获取UIOpacity组件
        this.uiOpacity = this.getComponent(UIOpacity);
        if (!this.uiOpacity) {
            this.uiOpacity = this.node.addComponent(UIOpacity);
        }

        // 设置全屏覆盖
        this.setupFullScreenOverlay();

        // 场景加载完成后执行渐入
        this.fadeIn();

        console.log('SceneTransition initialized');
    }



    /**
     * 设置全屏遮罩
     */
    private setupFullScreenOverlay(): void {
        // 添加Widget组件实现全屏覆盖
        const widget = this.node.getComponent(Widget) || this.node.addComponent(Widget);
        widget.isAlignTop = true;
        widget.isAlignBottom = true;
        widget.isAlignLeft = true;
        widget.isAlignRight = true;
        widget.top = 0;
        widget.bottom = 0;
        widget.left = 0;
        widget.right = 0;
        widget.alignMode = Widget.AlignMode.ON_WINDOW_RESIZE;
        widget.updateAlignment();

        // 设置渲染层级最高
        this.node.setSiblingIndex(999999);
    }

    /**
     * 渐入效果（从黑屏到透明）
     */
    public fadeIn(duration: number = 0.5): void {
        if (!this.uiOpacity || this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.uiOpacity.opacity = 255;
        
        tween(this.uiOpacity)
            .to(duration, { opacity: 0 })
            .call(() => {
                this.isTransitioning = false;
            })
            .start();
    }

    /**
     * 渐出效果（从透明到黑屏）
     */
    public fadeOut(onComplete?: () => void, duration: number = 0.5): void {
        if (!this.uiOpacity || this.isTransitioning) {
            if (onComplete) onComplete();
            return;
        }
        
        this.isTransitioning = true;
        this.uiOpacity.opacity = 0;
        
        tween(this.uiOpacity)
            .to(duration, { opacity: 255 })
            .call(() => {
                if (onComplete) onComplete();
                // 注意：这里不设置isTransitioning = false，因为场景切换后会重新初始化
            })
            .start();
    }

    /**
     * 带渐变效果的场景加载
     */
    public loadSceneWithTransition(sceneName: string, fadeOutDuration: number = 0.5, fadeInDuration: number = 0.5): void {
        if (this.isTransitioning) {
            console.warn('Scene transition already in progress');
            return;
        }

        console.log(`Starting scene transition to: ${sceneName}`);
        
        this.fadeOut(() => {
            director.loadScene(sceneName, () => {
                // 场景加载完成后，新场景的SceneTransition实例会自动执行fadeIn
                console.log(`Scene transition to ${sceneName} completed`);
            });
        }, fadeOutDuration);
    }

    onDestroy() {
        if (SceneTransition.instance === this) {
            SceneTransition.instance = null;
        }
    }
}
