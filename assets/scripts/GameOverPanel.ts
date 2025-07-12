import { _decorator, Component, Node, Button, Label } from 'cc';
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

    @property(Button)
    restartButton: Button = null!; // 重新开始按钮

    @property(Button)
    mainMenuButton: Button = null!; // 返回主菜单按钮

    start() {
        this.bindButtonEvents();
        this.updateGameStats();
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
