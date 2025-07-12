import { _decorator, Component, Node, Button, Label, KeyCode, input, Input, EventKeyboard } from 'cc';
import { player } from './player';
import { AIPlayer } from './AIPlayer';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

/**
 * 车辆摧毁系统测试组件
 * 用于测试玩家车辆和AI车辆的摧毁功能
 */
@ccclass('VehicleDestructionTest')
export class VehicleDestructionTest extends Component {
    @property(Label)
    playerHealthLabel: Label = null!; // 玩家血量显示

    @property(Label)
    aiHealthLabel: Label = null!; // AI血量显示

    @property(Label)
    statusLabel: Label = null!; // 状态显示

    @property(Button)
    damagePlayerButton: Button = null!; // 伤害玩家按钮

    @property(Button)
    damageAIButton: Button = null!; // 伤害AI按钮

    @property(Button)
    restoreAllButton: Button = null!; // 恢复所有车辆按钮

    @property(Button)
    destroyPlayerButton: Button = null!; // 直接摧毁玩家按钮

    @property(Button)
    destroyAIButton: Button = null!; // 直接摧毁AI按钮

    private playerVehicle: player = null!;
    private aiVehicles: AIPlayer[] = [];

    onLoad() {
        this.findVehicles();
    }

    start() {
        this.bindButtonEvents();
        this.bindKeyboardEvents();
    }

    /**
     * 查找场景中的车辆
     */
    private findVehicles() {
        // 查找玩家车辆
        const gameManager = GameManager.getInstance();
        if (gameManager) {
            // 通过GameManager获取玩家车辆
            const scene = this.node.scene;
            if (scene) {
                const playerNodes = scene.getComponentsInChildren(player);
                if (playerNodes.length > 0) {
                    this.playerVehicle = playerNodes[0];
                }

                // 获取AI车辆
                this.aiVehicles = gameManager.getAIPlayers();
            }
        }
    }

    /**
     * 绑定按钮事件
     */
    private bindButtonEvents() {
        if (this.damagePlayerButton) {
            this.damagePlayerButton.node.on(Button.EventType.CLICK, this.onDamagePlayerClick, this);
        }

        if (this.damageAIButton) {
            this.damageAIButton.node.on(Button.EventType.CLICK, this.onDamageAIClick, this);
        }

        if (this.restoreAllButton) {
            this.restoreAllButton.node.on(Button.EventType.CLICK, this.onRestoreAllClick, this);
        }

        if (this.destroyPlayerButton) {
            this.destroyPlayerButton.node.on(Button.EventType.CLICK, this.onDestroyPlayerClick, this);
        }

        if (this.destroyAIButton) {
            this.destroyAIButton.node.on(Button.EventType.CLICK, this.onDestroyAIClick, this);
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
        switch (event.keyCode) {
            case KeyCode.DIGIT_1: // 1键伤害玩家
                this.damagePlayer(20);
                break;
            case KeyCode.DIGIT_2: // 2键伤害AI
                this.damageRandomAI(20);
                break;
            case KeyCode.DIGIT_3: // 3键摧毁玩家
                this.destroyPlayer();
                break;
            case KeyCode.DIGIT_4: // 4键摧毁AI
                this.destroyRandomAI();
                break;
            case KeyCode.DIGIT_5: // 5键摧毁AI并测试移除
                this.destroyRandomAIWithRemoval();
                break;
            case KeyCode.DIGIT_6: // 6键测试血量同步
                this.testHealthSync();
                break;
            case KeyCode.KEY_R: // R键恢复所有
                this.restoreAllVehicles();
                break;
        }
    }

    /**
     * 伤害玩家按钮点击
     */
    private onDamagePlayerClick() {
        this.damagePlayer(20);
    }

    /**
     * 伤害AI按钮点击
     */
    private onDamageAIClick() {
        this.damageRandomAI(20);
    }

    /**
     * 恢复所有车辆按钮点击
     */
    private onRestoreAllClick() {
        this.restoreAllVehicles();
    }

    /**
     * 摧毁玩家按钮点击
     */
    private onDestroyPlayerClick() {
        this.destroyPlayer();
    }

    /**
     * 摧毁AI按钮点击
     */
    private onDestroyAIClick() {
        this.destroyRandomAI();
    }

    /**
     * 对玩家造成伤害
     */
    private damagePlayer(damage: number) {
        if (this.playerVehicle && !this.playerVehicle.isDestroyed()) {
            this.playerVehicle.takeDamage(damage);
            console.log(`对玩家造成${damage}点伤害`);
        }
    }

    /**
     * 对随机AI造成伤害
     */
    private damageRandomAI(damage: number) {
        const aliveAIs = this.aiVehicles.filter(ai => !ai.isDestroyed());
        if (aliveAIs.length > 0) {
            const randomAI = aliveAIs[Math.floor(Math.random() * aliveAIs.length)];
            randomAI.takeDamage(damage);
            console.log(`对AI车辆造成${damage}点伤害`);
        }
    }

    /**
     * 直接摧毁玩家
     */
    private destroyPlayer() {
        if (this.playerVehicle && !this.playerVehicle.isDestroyed()) {
            this.playerVehicle.takeDamage(this.playerVehicle.getCurrentHealth());
            console.log('直接摧毁玩家车辆');
        }
    }

    /**
     * 直接摧毁随机AI
     */
    private destroyRandomAI() {
        const aliveAIs = this.aiVehicles.filter(ai => !ai.isDestroyed());
        if (aliveAIs.length > 0) {
            const randomAI = aliveAIs[Math.floor(Math.random() * aliveAIs.length)];
            randomAI.takeDamage(randomAI.getHealth());
            console.log('直接摧毁AI车辆');
        }
    }

    /**
     * 摧毁AI并测试3秒后移除功能
     */
    private destroyRandomAIWithRemoval() {
        const aliveAIs = this.aiVehicles.filter(ai => !ai.isDestroyed());
        if (aliveAIs.length > 0) {
            const randomAI = aliveAIs[Math.floor(Math.random() * aliveAIs.length)];
            randomAI.takeDamage(randomAI.getHealth());
            console.log('摧毁AI车辆，3秒后将自动移除节点');
        }
    }

    /**
     * 测试血量同步功能
     */
    private testHealthSync() {
        const gameManager = GameManager.getInstance();
        if (gameManager && this.playerVehicle) {
            console.log('=== 血量同步测试 ===');
            console.log(`GameManager中的玩家血量: ${gameManager.getPlayerHP()}/${gameManager.getPlayerMaxHP()}`);
            console.log(`Player组件中的血量: ${this.playerVehicle.getCurrentHealth()}/${this.playerVehicle.getMaxHealth()}`);

            // 测试同步
            gameManager.syncPlayerHealth();
            console.log('执行同步后:');
            console.log(`GameManager中的玩家血量: ${gameManager.getPlayerHP()}/${gameManager.getPlayerMaxHP()}`);
        }
    }

    /**
     * 恢复所有车辆
     */
    private restoreAllVehicles() {
        // 恢复玩家车辆
        if (this.playerVehicle) {
            this.playerVehicle.restoreVehicle();
        }

        // 恢复所有AI车辆
        this.aiVehicles.forEach(ai => {
            ai.restoreVehicle();
        });

        console.log('所有车辆已恢复');
    }

    update() {
        this.updateUI();
    }

    /**
     * 更新UI显示
     */
    private updateUI() {
        // 更新玩家血量显示
        if (this.playerHealthLabel && this.playerVehicle) {
            const health = this.playerVehicle.getCurrentHealth();
            const maxHealth = this.playerVehicle.getMaxHealth();
            const status = this.playerVehicle.isDestroyed() ? ' [已摧毁]' : '';
            this.playerHealthLabel.string = `玩家血量: ${health}/${maxHealth}${status}`;
        }

        // 更新AI血量显示
        if (this.aiHealthLabel) {
            const aliveCount = this.aiVehicles.filter(ai => !ai.isDestroyed()).length;
            const totalCount = this.aiVehicles.length;
            this.aiHealthLabel.string = `AI车辆: ${aliveCount}/${totalCount} 存活`;
        }

        // 更新状态显示
        if (this.statusLabel) {
            const playerDestroyed = this.playerVehicle ? this.playerVehicle.isDestroyed() : false;
            const allAIDestroyed = this.aiVehicles.length > 0 && this.aiVehicles.every(ai => ai.isDestroyed());
            
            let status = '游戏进行中';
            if (playerDestroyed) {
                status = '玩家已摧毁';
            } else if (allAIDestroyed) {
                status = '所有AI已摧毁';
            }
            
            this.statusLabel.string = `状态: ${status}`;
        }
    }

    onDestroy() {
        // 清理事件监听
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        
        if (this.damagePlayerButton) {
            this.damagePlayerButton.node.off(Button.EventType.CLICK, this.onDamagePlayerClick, this);
        }
        if (this.damageAIButton) {
            this.damageAIButton.node.off(Button.EventType.CLICK, this.onDamageAIClick, this);
        }
        if (this.restoreAllButton) {
            this.restoreAllButton.node.off(Button.EventType.CLICK, this.onRestoreAllClick, this);
        }
        if (this.destroyPlayerButton) {
            this.destroyPlayerButton.node.off(Button.EventType.CLICK, this.onDestroyPlayerClick, this);
        }
        if (this.destroyAIButton) {
            this.destroyAIButton.node.off(Button.EventType.CLICK, this.onDestroyAIClick, this);
        }
    }
}
