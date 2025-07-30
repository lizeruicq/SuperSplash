import { _decorator, Component, Node, Label, ProgressBar } from 'cc';
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
    
    @property(ProgressBar)
    playerRatioBar: ProgressBar = null!;
    
    // AI颜料占比显示区域
    @property(Node)
    aiRatiosContainer: Node = null!;
    
    // 更新频率控制
    @property
    updateInterval: number = 0.1; // 每0.1秒更新一次
    
    private updateTimer: number = 0;
    private gameManager: GameManager = null!;
    
    // AI占比显示组件缓存
    private aiRatioLabels: Map<string, Label> = new Map();

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
    }

    update(deltaTime: number) {
        if (!this.gameManager) return;
        
        this.updateTimer += deltaTime;
        
        // 按设定频率更新UI
        if (this.updateTimer >= this.updateInterval) {
            this.updateCountdownDisplay();
            this.updatePaintRatioDisplay();
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
            this.playerRatioLabel.string = `玩家: ${percentage}%`;
        }
        
        if (this.playerRatioBar) {
            this.playerRatioBar.progress = ratio;
        }
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
        
        // 更新每个AI的显示
        aiRatios.forEach((ratioData, index) => {
            this.updateAIRatioItem(ratioData.vehicleId, ratioData.ratio, index);
        });
    }

    /**
     * 更新单个AI的占比显示
     * @param vehicleId AI车辆ID
     * @param ratio 占比
     * @param index 显示索引
     */
    private updateAIRatioItem(vehicleId: string, ratio: number, index: number): void {
        const percentage = Math.round(ratio * 100);
        
        // 获取或创建标签
        let label = this.aiRatioLabels.get(vehicleId);
        if (!label && this.aiRatiosContainer) {
            // 创建新的标签节点
            const labelNode = new Node(`AI_${vehicleId}_Label`);
            label = labelNode.addComponent(Label);
            label.fontSize = 20;
            this.aiRatiosContainer.addChild(labelNode);
            this.aiRatioLabels.set(vehicleId, label);
            
            // 设置位置
            labelNode.setPosition(0, -index * 30, 0);
        }
        
        if (label) {
            // 简化AI显示名称
            const displayName = this.getAIDisplayName(vehicleId);
            label.string = `${displayName}: ${percentage}%`;
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
        if (!this.aiRatiosContainer) {
            console.warn('GameHUD: AI占比容器未设置');
            return;
        }
        
        // 清空现有的AI显示
        this.aiRatioLabels.clear();
        
        // 移除所有子节点
        this.aiRatiosContainer.removeAllChildren();
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
            this.playerRatioLabel.string = "玩家: 0%";
        }
        
        if (this.playerRatioBar) {
            this.playerRatioBar.progress = 0;
        }
        
        this.initializeAIRatioDisplay();
    }
}
