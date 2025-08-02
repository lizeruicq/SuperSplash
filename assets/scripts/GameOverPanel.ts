import { _decorator, Component, Button, Label } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('GameOverPanel')
export class GameOverPanel extends Component {
    @property(Label)
    titleLabel: Label = null!; // 游戏结束标题

    @property(Label)
    performanceLabel: Label = null!; // 表现评价标签

    @property(Label)
    rewardLabel: Label = null!; // 奖励金币标签

    @property(Label)
    gameTimeLabel: Label = null!; // 游戏时长标签

    @property(Label)
    healthLabel: Label = null!; // 剩余生命值标签

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

    @property(Button)
    restartButton: Button = null!; // 重新开始按钮

    @property(Button)
    mainMenuButton: Button = null!; // 返回主菜单按钮

    start() {
        this.bindButtonEvents();
        this.updateGameStats();
        this.updatePaintRatios();
    }

    /**
     * 绑定按钮事件
     */
    private bindButtonEvents() {
        if (this.restartButton) {
            this.restartButton.node.on(Button.EventType.CLICK, this.onRestartClick, this);
        }

        if (this.mainMenuButton) {
            this.mainMenuButton.node.on(Button.EventType.CLICK, this.onMainMenuClick, this);
        }
    }

    /**
     * 更新游戏统计信息
     */
    private updateGameStats() {
        const gameManager = GameManager.getInstance();
        if (!gameManager) return;

        // 更新游戏时长
        if (this.gameTimeLabel) {
            const gameTime = gameManager.getGameTime();
            this.gameTimeLabel.string = `游戏时长: ${gameTime.toFixed(1)}秒`;
        }

        // 更新剩余生命值
        if (this.healthLabel) {
            const playerHP = gameManager.getPlayerHP();
            const maxHP = gameManager.getPlayerMaxHP();
            const healthPercentage = (playerHP / maxHP * 100).toFixed(1);
            this.healthLabel.string = `剩余生命值: ${playerHP}/${maxHP} (${healthPercentage}%)`;
        }
    }

    /**
     * 更新颜料占比显示
     */
    private updatePaintRatios(): void {
        const gameManager = GameManager.getInstance();
        if (!gameManager) return;

        // 获取所有车辆的颜料占比
        const allRatios = gameManager.getAllVehiclePaintRatios();

        // 更新玩家占比
        const playerRatio = allRatios['player'] || 0;
        const playerPercentage = Math.round(playerRatio * 100);
        if (this.playerRatioLabel) {
            this.playerRatioLabel.string = `玩家: ${playerPercentage}%`;
        }

        // 获取排序后的AI占比数据
        const sortedRatios = gameManager.getSortedVehiclePaintRatios();
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
     * 重新开始按钮点击
     */
    private onRestartClick() {
        const gameManager = GameManager.getInstance();
        if (gameManager) {
            gameManager.restartGame();
        }
    }

    /**
     * 返回主菜单按钮点击
     */
    private onMainMenuClick() {
        const gameManager = GameManager.getInstance();
        if (gameManager) {
            gameManager.returnToMainMenu();
        }
    }

    /**
     * 设置游戏结束信息
     */
    public setGameOverInfo(isVictory: boolean, performance: string, reward: number) {
        if (this.titleLabel) {
            this.titleLabel.string = isVictory ? '胜利！' : '失败！';
        }

        if (this.performanceLabel) {
            this.performanceLabel.string = `表现评价: ${performance}`;
        }

        if (this.rewardLabel) {
            this.rewardLabel.string = `获得金币: ${reward}`;
        }
    }

    onDestroy() {
        // 清理事件监听
        if (this.restartButton) {
            this.restartButton.node.off(Button.EventType.CLICK, this.onRestartClick, this);
        }
        if (this.mainMenuButton) {
            this.mainMenuButton.node.off(Button.EventType.CLICK, this.onMainMenuClick, this);
        }
    }
}
