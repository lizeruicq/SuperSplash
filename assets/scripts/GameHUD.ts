import { _decorator, Component, Label, Button, ProgressBar } from 'cc';
const { ccclass, property } = _decorator;
import { GameManager } from './GameManager';

/**
 * 游戏内HUD界面
 * 显示倒计时和颜料占比信息
 */
@ccclass('GameHUD')
export class GameHUD extends Component {
    
    // 倒计时显示
    @property(Label)
    countdownLabel: Label = null!;
    
    // 玩家颜料占比显示
    @property(Label)
    playerRatioLabel: Label = null!;

    // AI颜料占比显示标签（手动拖拽设置）
    @property({
        type: Label,
        tooltip: 'AI车辆1的颜料占比显示标签'
    })
    ai1RatioLabel: Label = null!;

    @property({
        type: Label,
        tooltip: 'AI车辆2的颜料占比显示标签'
    })
    ai2RatioLabel: Label = null!;

    @property({
        type: Label,
        tooltip: 'AI车辆3的颜料占比显示标签'
    })
    ai3RatioLabel: Label = null!;

    @property({
        type: Label,
        tooltip: 'AI车辆4的颜料占比显示标签'
    })
    ai4RatioLabel: Label = null!;

    // 射击系统UI
    @property({
        type: Button,
        tooltip: '射击按钮'
    })
    shootButton: Button = null!;

    @property({
        type: Label,
        tooltip: '弹药数量显示标签'
    })
    ammoLabel: Label = null!;

    @property({
        type: ProgressBar,
        tooltip: '弹药补充进度条'
    })
    reloadProgressBar: ProgressBar = null!;
    
    // 更新频率控制
    @property
    updateInterval: number = 0.1; // 每0.1秒更新一次
    
    private updateTimer: number = 0;
    private gameManager: GameManager = null!;

    onLoad() {
        this.updateTimer = 0;
    }

    start() {
        this.gameManager = GameManager.getInstance();
        if (!this.gameManager) {
            console.error('GameHUD: GameManager未找到');
            return;
        }

        // 初始化AI占比显示
        this.initializeAIRatioDisplay();

        // 初始化射击按钮
        this.initializeShootButton();
    }

    update(deltaTime: number) {
        if (!this.gameManager) return;
        
        this.updateTimer += deltaTime;
        
        // 按设定频率更新UI
        if (this.updateTimer >= this.updateInterval) {
            this.updateCountdownDisplay();
            this.updatePaintRatioDisplay();
            this.updateAmmoDisplay();
            this.updateTimer = 0;
        }
    }

    /**
     * 更新倒计时显示
     */
    private updateCountdownDisplay(): void {
        if (this.countdownLabel) {
            const formattedTime = this.gameManager.getFormattedRemainingTime();
            this.countdownLabel.string = formattedTime;
            
            // 当时间少于30秒时，可以改变颜色提醒
            const remainingTime = this.gameManager.getRemainingTime();
            if (remainingTime <= 30) {
                this.countdownLabel.color = this.countdownLabel.color.lerp(
                    new (this.countdownLabel.color.constructor as any)(255, 0, 0, 255),
                    0.5
                );
            }
        }
    }

    /**
     * 更新颜料占比显示
     */
    private updatePaintRatioDisplay(): void {
        const allRatios = this.gameManager.getAllVehiclePaintRatios();
        
        // 更新玩家占比
        const playerRatio = allRatios['player'] || 0;
        this.updatePlayerRatioDisplay(playerRatio);
        
        // 更新AI占比
        this.updateAIRatiosDisplay(allRatios);
    }

    /**
     * 更新玩家占比显示
     * @param ratio 占比（0-1）
     */
    private updatePlayerRatioDisplay(ratio: number): void {
        const percentage = Math.round(ratio * 100);
        
        if (this.playerRatioLabel) {
            this.playerRatioLabel.string = `player: ${percentage}%`;
        }
        
        // if (this.playerRatioBar) {
        //     this.playerRatioBar.progress = ratio;
        // }
    }

    /**
     * 更新AI占比显示
     * @param allRatios 所有车辆的占比
     */
    private updateAIRatiosDisplay(_allRatios: { [vehicleId: string]: number }): void {
        // 获取排序后的占比数据
        const sortedRatios = this.gameManager.getSortedVehiclePaintRatios();

        // 只显示AI车辆（排除玩家）
        const aiRatios = sortedRatios.filter(item => item.vehicleId !== 'player');

        // 获取AI标签数组
        const aiLabels = [this.ai1RatioLabel, this.ai2RatioLabel, this.ai3RatioLabel, this.ai4RatioLabel];

        // 更新每个AI的显示
        aiRatios.forEach((ratioData, index) => {
            if (index < aiLabels.length && aiLabels[index]) {
                const percentage = Math.round(ratioData.ratio * 100);
                const displayName = this.getAIDisplayName(ratioData.vehicleId);
                aiLabels[index].string = `${displayName}: ${percentage}%`;
            }
        });

        // 清空未使用的标签
        for (let i = aiRatios.length; i < aiLabels.length; i++) {
            if (aiLabels[i]) {
                aiLabels[i].string = '';
            }
        }
    }



    /**
     * 获取AI的显示名称
     * @param vehicleId AI车辆ID
     * @returns 显示名称
     */
    private getAIDisplayName(vehicleId: string): string {
        // 从vehicleId中提取简化的显示名称
        if (vehicleId.startsWith('ai_')) {
            const parts = vehicleId.split('_');
            if (parts.length >= 2) {
                return `AI-${parts[1]}`;
            }
        }
        return vehicleId;
    }

    /**
     * 初始化AI占比显示
     */
    private initializeAIRatioDisplay(): void {
        // 初始化所有AI标签为空字符串
        const aiLabels = [this.ai1RatioLabel, this.ai2RatioLabel, this.ai3RatioLabel, this.ai4RatioLabel];

        aiLabels.forEach((label, index) => {
            if (label) {
                label.string = `AI-${index + 1}: 0%`;
            } else {
                console.warn(`GameHUD: AI${index + 1}RatioLabel未设置`);
            }
        });
    }

    /**
     * 重置HUD显示
     */
    public resetHUD(): void {
        if (this.countdownLabel) {
            this.countdownLabel.string = "02:00";
            this.countdownLabel.color = new (this.countdownLabel.color.constructor as any)(255, 255, 255, 255);
        }

        if (this.playerRatioLabel) {
            this.playerRatioLabel.string = "player: 0%";
        }

        this.initializeAIRatioDisplay();
    }

    // ==================== 射击系统UI ====================

    /**
     * 初始化射击按钮
     */
    private initializeShootButton(): void {
        if (this.shootButton) {
            this.shootButton.node.on(Button.EventType.CLICK, this.onShootButtonClicked, this);
        } else {
            console.warn('GameHUD: 射击按钮未设置');
        }
    }

    /**
     * 射击按钮点击事件处理
     */
    private onShootButtonClicked(): void {
        // 通知GameManager执行射击
        if (this.gameManager) {
            this.gameManager.playerShoot();
        }
    }

    /**
     * 更新弹药显示
     */
    private updateAmmoDisplay(): void {
        if (!this.gameManager) return;

        const playerComponent = this.gameManager.getPlayerComponent();
        if (!playerComponent) return;

        // 更新弹药数量显示
        if (this.ammoLabel) {
            const currentAmmo = playerComponent.getCurrentAmmo();
            const maxAmmo = playerComponent.getMaxAmmo();
            this.ammoLabel.string = `${currentAmmo}/${maxAmmo}`;
        }

        // 更新弹药补充进度条
        if (this.reloadProgressBar) {
            if (playerComponent.isReloading()) {
                this.reloadProgressBar.node.active = true;
                this.reloadProgressBar.progress = playerComponent.getReloadProgress();
            } else {
                this.reloadProgressBar.node.active = false;
            }
        }
    }
}
