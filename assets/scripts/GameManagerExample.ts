import { _decorator, Component, Node, Button, Label, KeyCode, input, Input, EventKeyboard } from 'cc';
import { GameManager, GameState } from './GameManager';
const { ccclass, property } = _decorator;

/**
 * GameManager使用示例
 * 这个组件展示了如何使用GameManager的游戏状态管理功能
 */
@ccclass('GameManagerExample')
export class GameManagerExample extends Component {
    @property(Label)
    statusLabel: Label = null!; // 状态显示标签

    @property(Label)
    gameTimeLabel: Label = null!; // 游戏时间显示标签

    @property(Label)
    playerHPLabel: Label = null!; // 玩家生命值显示标签

    @property(Label)
    enemyCountLabel: Label = null!; // 敌人数量显示标签

    @property(Button)
    testPauseButton: Button = null!; // 测试暂停按钮

    @property(Button)
    testGameOverWinButton: Button = null!; // 测试胜利按钮

    @property(Button)
    testGameOverLoseButton: Button = null!; // 测试失败按钮

    @property(Button)
    testDamageButton: Button = null!; // 测试伤害按钮

    private gameManager: GameManager = null!;

    onLoad() {
        // 获取GameManager实例
        this.gameManager = GameManager.getInstance();
    }

    start() {
        this.bindButtonEvents();
        this.bindKeyboardEvents();
    }

    /**
     * 绑定按钮事件
     */
    private bindButtonEvents() {
        if (this.testPauseButton) {
            this.testPauseButton.node.on(Button.EventType.CLICK, this.onTestPauseClick, this);
        }

        if (this.testGameOverWinButton) {
            this.testGameOverWinButton.node.on(Button.EventType.CLICK, this.onTestGameOverWinClick, this);
        }

        if (this.testGameOverLoseButton) {
            this.testGameOverLoseButton.node.on(Button.EventType.CLICK, this.onTestGameOverLoseClick, this);
        }

        if (this.testDamageButton) {
            this.testDamageButton.node.on(Button.EventType.CLICK, this.onTestDamageClick, this);
        }
    }

    /**
     * 绑定键盘事件
     */
    private bindKeyboardEvents() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    /**
     * 键盘按下事件
     */
    private onKeyDown(event: EventKeyboard) {
        if (!this.gameManager) return;

        switch (event.keyCode) {
            case KeyCode.KEY_P: // P键暂停/继续
                if (this.gameManager.getCurrentState() === GameState.RUNNING) {
                    this.gameManager.pauseGame();
                } else if (this.gameManager.getCurrentState() === GameState.PAUSED) {
                    this.gameManager.resumeGame();
                }
                break;
            case KeyCode.KEY_R: // R键重新开始
                this.gameManager.restartGame();
                break;
            case KeyCode.KEY_M: // M键返回主菜单
                this.gameManager.returnToMainMenu();
                break;
        }
    }

    /**
     * 测试暂停按钮点击
     */
    private onTestPauseClick() {
        if (!this.gameManager) return;

        if (this.gameManager.getCurrentState() === GameState.RUNNING) {
            this.gameManager.pauseGame();
        } else if (this.gameManager.getCurrentState() === GameState.PAUSED) {
            this.gameManager.resumeGame();
        }
    }

    /**
     * 测试胜利按钮点击
     */
    private onTestGameOverWinClick() {
        if (this.gameManager) {
            this.gameManager.gameOver(true);
        }
    }

    /**
     * 测试失败按钮点击
     */
    private onTestGameOverLoseClick() {
        if (this.gameManager) {
            this.gameManager.gameOver(false);
        }
    }

    /**
     * 测试伤害按钮点击
     */
    private onTestDamageClick() {
        if (this.gameManager) {
            this.gameManager.reducePlayerHP(20); // 减少20点生命值
        }
    }

    update() {
        this.updateUI();
    }

    /**
     * 更新UI显示
     */
    private updateUI() {
        if (!this.gameManager) return;

        // 更新状态显示
        if (this.statusLabel) {
            const state = this.gameManager.getCurrentState();
            let stateText = '';
            switch (state) {
                case GameState.RUNNING:
                    stateText = '运行中';
                    break;
                case GameState.PAUSED:
                    stateText = '已暂停';
                    break;
                case GameState.GAME_OVER:
                    stateText = '游戏结束';
                    break;
            }
            this.statusLabel.string = `游戏状态: ${stateText}`;
        }

        // 更新游戏时间
        if (this.gameTimeLabel) {
            const gameTime = this.gameManager.getGameTime();
            this.gameTimeLabel.string = `游戏时长: ${gameTime.toFixed(1)}秒`;
        }

        // 更新玩家生命值
        if (this.playerHPLabel) {
            const playerHP = this.gameManager.getPlayerHP();
            const maxHP = this.gameManager.getPlayerMaxHP();
            this.playerHPLabel.string = `生命值: ${playerHP}/${maxHP}`;
        }

        // 更新敌人数量
        if (this.enemyCountLabel) {
            const enemyCount = this.gameManager.getEnemyCount();
            this.enemyCountLabel.string = `敌人剩余: ${enemyCount}`;
        }
    }

    onDestroy() {
        // 清理事件监听
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        
        if (this.testPauseButton) {
            this.testPauseButton.node.off(Button.EventType.CLICK, this.onTestPauseClick, this);
        }
        if (this.testGameOverWinButton) {
            this.testGameOverWinButton.node.off(Button.EventType.CLICK, this.onTestGameOverWinClick, this);
        }
        if (this.testGameOverLoseButton) {
            this.testGameOverLoseButton.node.off(Button.EventType.CLICK, this.onTestGameOverLoseClick, this);
        }
        if (this.testDamageButton) {
            this.testDamageButton.node.off(Button.EventType.CLICK, this.onTestDamageClick, this);
        }
    }
}
