import { _decorator, Component, Sprite } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 颜料斑点组件
 * 用于表示车辆喷洒的颜料
 */
@ccclass('PaintSpot')
export class PaintSpot extends Component {
    
    @property
    fadeTime: number = 30.0; // 颜料淡化时间（秒）
    
    @property
    enableFade: boolean = false; // 是否启用淡化效果
    
    private sprite: Sprite = null!;
    private originalAlpha: number = 1.0;
    private creationTime: number = 0;
    
    onLoad() {
        this.sprite = this.getComponent(Sprite);
        if (this.sprite) {
            this.originalAlpha = this.sprite.color.a / 255;
        }
        this.creationTime = Date.now();
    }

    start() {
        // 可以在这里添加颜料出现的动画效果
        this.playSpawnAnimation();
    }

    update(_deltaTime: number) {
        // if (this.enableFade && this.sprite) {
        //     this.updateFadeEffect();
        // }
    }

    /**
     * 播放生成动画
     */
    private playSpawnAnimation(): void {
        // 简单的缩放动画
        if (this.node) {
            this.node.setScale(0.1, 0.1, 1);
            // 使用tween动画放大到正常大小
            // 注意：这里需要导入tween相关模块，暂时用简单的方式
            this.scheduleOnce(() => {
                if (this.node && this.node.isValid) {
                    this.node.setScale(1, 1, 1);
                }
            }, 0.1);
        }
    }

    /**
     * 更新淡化效果
     */
    // private updateFadeEffect(): void {
    //     const currentTime = Date.now();
    //     const elapsedTime = (currentTime - this.creationTime) / 1000; // 转换为秒
        
    //     if (elapsedTime >= this.fadeTime) {
    //         // 时间到了，销毁颜料
    //         this.node.destroy();
    //         return;
    //     }
        
    //     // 计算淡化程度
    //     const fadeProgress = elapsedTime / this.fadeTime;
    //     const currentAlpha = this.originalAlpha * (1 - fadeProgress);
        
    //     // 应用淡化效果
    //     const currentColor = this.sprite.color.clone();
    //     currentColor.a = Math.max(0, currentAlpha * 255);
    //     this.sprite.color = currentColor;
    // }

}
