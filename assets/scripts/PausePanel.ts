import { _decorator, Component, Node, Button } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('PausePanel')
export class PausePanel extends Component {
    @property(Button)
    resumeButton: Button = null!; // 继续游戏按钮

    @property(Button)
    restartButton: Button = null!; // 重新开始按钮

    @property(Button)
    mainMenuButton: Button = null!; // 返回主菜单按钮

    start() {
        this.bindButtonEvents();
    }

    /**
     * 绑定按钮事件
     */
    private bindButtonEvents() {
        if (this.resumeButton) {
            this.resumeButton.node.on(Button.EventType.CLICK, this.onResumeClick, this);
        }

        if (this.restartButton) {
            this.restartButton.node.on(Button.EventType.CLICK, this.onRestartClick, this);
        }

        if (this.mainMenuButton) {
            this.mainMenuButton.node.on(Button.EventType.CLICK, this.onMainMenuClick, this);
        }
    }

    /**
     * 继续游戏按钮点击
     */
    private onResumeClick() {
        const gameManager = GameManager.getInstance();
        if (gameManager) {
            gameManager.resumeGame();
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

    onDestroy() {
        // 清理事件监听
        if (this.resumeButton) {
            this.resumeButton.node.off(Button.EventType.CLICK, this.onResumeClick, this);
        }
        if (this.restartButton) {
            this.restartButton.node.off(Button.EventType.CLICK, this.onRestartClick, this);
        }
        if (this.mainMenuButton) {
            this.mainMenuButton.node.off(Button.EventType.CLICK, this.onMainMenuClick, this);
        }
    }
}
