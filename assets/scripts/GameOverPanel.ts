import { _decorator, Component, Button, Label, Sprite, Color } from 'cc';
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


    // 星星精灵节点（手动拖拽设置）
    @property({
        type: Sprite,
        tooltip: '第1颗星星精灵'
    })
    star1Sprite: Sprite = null!;

    @property({
        type: Sprite,
        tooltip: '第2颗星星精灵'
    })
    star2Sprite: Sprite = null!;

    @property({
        type: Sprite,
        tooltip: '第3颗星星精灵'
    })
    star3Sprite: Sprite = null!;

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
    LevelSelectButton: Button = null!; // 返回主菜单按钮

    start() {

        // this.bindButtonEvents();
        // 注意：不在start中更新数据，而是等待GameManager调用setGameOverInfo
    }

    /**
     * 绑定按钮事件
     */
    public bindButtonEvents() {
        if (this.restartButton) {
            this.restartButton.node.on(Button.EventType.CLICK, this.onRestartClick, this);
        }

        if (this.LevelSelectButton) {
            this.LevelSelectButton.node.on(Button.EventType.CLICK, this.onLevelSelectClick, this);
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
            this.playerRatioLabel.string = `player: ${playerPercentage}%`;
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
     * 更新星星精灵显示
     * @param stars 获得的星星数量
     */
    private updateStarSprites(stars: number): void {
        const starSprites = [this.star1Sprite, this.star2Sprite, this.star3Sprite];

        starSprites.forEach((sprite, index) => {
            if (sprite) {
                // 根据获得的星星数量设置精灵的透明度
                if (index < stars) {
                    // 亮起的星星：完全不透明
                    sprite.color = new Color(255, 255, 255, 255);
                } else {
                    // 暗淡的星星：半透明
                    sprite.color = new Color(255, 255, 255, 100);
                }

                // 可以选择完全隐藏未获得的星星
                // sprite.node.active = index < stars;
            }
        });

        console.log(`更新星星显示: ${stars}/3 颗星星亮起`);
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
    private onLevelSelectClick() {
        const gameManager = GameManager.getInstance();
        if (gameManager) {
            gameManager.returnToLevelSelect();
        }
    }

    /**
     * 设置游戏结束信息
     */
    public setGameOverInfo(
        isVictory: boolean,
        performance: string,
        reward: number,
        gameTime: number,
        healthPercentage: number,
        stars: number
    ) {
        // 更新标题
        if (this.titleLabel) {
            this.titleLabel.string = isVictory ? 'winner' : 'loser';
        }

        // 更新表现评价
        if (this.performanceLabel) {
            this.performanceLabel.string = `performance: ${performance}`;
        }

        // 更新奖励金币
        if (this.rewardLabel) {
            this.rewardLabel.string = `reward: ${reward}`;
        }

        // 更新游戏时长
        if (this.gameTimeLabel) {
            this.gameTimeLabel.string = `time: ${gameTime.toFixed(1)}S`;
        }

        // 更新星星精灵显示
        this.updateStarSprites(stars);

        // 更新颜料占比显示
        this.updatePaintRatios();
    }

    onDestroy() {
        // 清理事件监听
        if (this.restartButton && this.restartButton.node) {
            this.restartButton.node.off(Button.EventType.CLICK, this.onRestartClick, this);
        }
        if (this.LevelSelectButton && this.LevelSelectButton.node) {
            this.LevelSelectButton.node.off(Button.EventType.CLICK, this.onLevelSelectClick, this);
        }
    }
}
