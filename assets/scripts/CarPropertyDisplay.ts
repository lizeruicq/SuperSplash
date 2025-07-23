import { _decorator, Component, ProgressBar, tween } from 'cc';
import { CarProperties, CarProperty } from './CarProperties';
const { ccclass, property } = _decorator;

/**
 * 车辆属性显示组件
 * 负责在UI中显示车辆的速度、转向、坚硬度属性
 */
@ccclass('CarPropertyDisplay')
export class CarPropertyDisplay extends Component {
    @property({
        type: ProgressBar,
        tooltip: '速度进度条'
    })
    speedProgressBar: ProgressBar = null!;

    @property({
        type: ProgressBar,
        tooltip: '转向进度条'
    })
    steeringProgressBar: ProgressBar = null!;

    @property({
        type: ProgressBar,
        tooltip: '坚硬度进度条'
    })
    durabilityProgressBar: ProgressBar = null!;

    @property({
        tooltip: '是否启用动画效果'
    })
    enableAnimation: boolean = true;

    @property({
        tooltip: '动画持续时间（秒）'
    })
    animationDuration: number = 0.5;

    onLoad() {
        // 自动查找进度条（如果没有手动设置）
        this.autoFindProgressBars();

        // 初始化时隐藏所有内容
        this.hideAllProperties();
    }

    /**
     * 自动查找进度条组件
     */
    private autoFindProgressBars(): void {
        if (!this.speedProgressBar) {
            const speedNode = this.node.getChildByName('speed') || this.node.getChildByName('Speed');
            if (speedNode) {
                this.speedProgressBar = speedNode.getComponent(ProgressBar);
            }
        }

        if (!this.steeringProgressBar) {
            const steeringNode = this.node.getChildByName('turn') || this.node.getChildByName('turn');
            if (steeringNode) {
                this.steeringProgressBar = steeringNode.getComponent(ProgressBar);
            }
        }

        if (!this.durabilityProgressBar) {
            const durabilityNode = this.node.getChildByName('tough') || this.node.getChildByName('tough');
            if (durabilityNode) {
                this.durabilityProgressBar = durabilityNode.getComponent(ProgressBar);
            }
        }
    }

    /**
     * 显示指定车辆的属性
     * @param carId 车辆ID
     */
    public showCarProperties(carId: string): void {
        const carProperty = CarProperties.getCarProperty(carId);
        if (!carProperty) {
            console.warn(`未找到车辆 ${carId} 的属性配置`);
            this.hideAllProperties();
            return;
        }

        this.updatePropertyDisplay(carProperty);

        // 显示属性面板
        this.node.active = true;
    }

    /**
     * 隐藏所有属性
     */
    public hideAllProperties(): void {
        this.node.active = false;
    }

    /**
     * 更新属性显示
     * @param property 车辆属性
     */
    private updatePropertyDisplay(property: CarProperty): void {
        // 更新速度
        if (this.speedProgressBar) {
            this.updateProgressBar(this.speedProgressBar, property.speed);
        }

        // 更新转向
        if (this.steeringProgressBar) {
            this.updateProgressBar(this.steeringProgressBar, property.steering);
        }

        // 更新坚硬度
        if (this.durabilityProgressBar) {
            this.updateProgressBar(this.durabilityProgressBar, property.durability);
        }
    }

    /**
     * 更新进度条
     * @param progressBar 进度条组件
     * @param value 数值 (0-100)
     */
    private updateProgressBar(progressBar: ProgressBar, value: number): void {
        const targetProgress = value / 100; // 转换为0-1范围

        if (this.enableAnimation) {
            // 使用动画效果
            tween(progressBar)
                .to(this.animationDuration, { progress: targetProgress })
                .start();
        } else {
            // 直接设置
            progressBar.progress = targetProgress;
        }
    }
}
