import { _decorator, Component, KeyCode, Input, input } from 'cc';
import { PlayerManager } from './PlayerManager';
import { SelectManager } from './SelectManager';

const { ccclass, property } = _decorator;

/**
 * 车辆购买系统测试脚本
 * 
 * 测试键位：
 * - 1: 添加500金币
 * - 2: 减少200金币
 * - 3: 尝试购买car-2 (500金币)
 * - 4: 尝试购买car-3 (1000金币)
 * - 5: 重置玩家数据
 * - 6: 显示当前状态
 */
@ccclass('CarPurchaseTest')
export class CarPurchaseTest extends Component {
    
    @property(SelectManager)
    selectManager: SelectManager = null!;

    onLoad() {
        // 启用键盘输入
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        console.log('=== 车辆购买系统测试 ===');
        console.log('测试键位：');
        console.log('1: 添加500金币');
        console.log('2: 减少200金币');
        console.log('3: 尝试购买car-2 (500金币)');
        console.log('4: 尝试购买car-3 (1000金币)');
        console.log('5: 重置玩家数据');
        console.log('6: 显示当前状态');
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    private onKeyDown(event: any) {
        switch (event.keyCode) {
            case KeyCode.DIGIT_1:
                this.addMoney(500);
                break;
            case KeyCode.DIGIT_2:
                this.reduceMoney(200);
                break;
            case KeyCode.DIGIT_3:
                this.testPurchaseCar('car-2');
                break;
            case KeyCode.DIGIT_4:
                this.testPurchaseCar('car-3');
                break;
            case KeyCode.DIGIT_5:
                this.resetPlayerData();
                break;
            case KeyCode.DIGIT_6:
                this.showCurrentStatus();
                break;
        }
    }

    /**
     * 添加金币
     */
    private addMoney(amount: number) {
        const playerManager = PlayerManager.instance;
        if (playerManager) {
            playerManager.addMoney(amount);
            console.log(`添加 ${amount} 金币，当前金币: ${playerManager.playerData.money}`);

            // PlayerInfoUI会自动更新金币显示，无需手动调用
        }
    }

    /**
     * 减少金币
     */
    private reduceMoney(amount: number) {
        const playerManager = PlayerManager.instance;
        if (playerManager) {
            const success = playerManager.spendMoney(amount);
            if (success) {
                console.log(`消费 ${amount} 金币，当前金币: ${playerManager.playerData.money}`);
            } else {
                console.log(`金币不足，无法消费 ${amount} 金币，当前金币: ${playerManager.playerData.money}`);
            }

            // PlayerInfoUI会自动更新金币显示，无需手动调用
        }
    }

    /**
     * 测试购买车辆
     */
    private testPurchaseCar(carId: string) {
        const playerManager = PlayerManager.instance;
        if (!playerManager) {
            console.error('PlayerManager 实例不存在');
            return;
        }

        console.log(`=== 尝试购买车辆 ${carId} ===`);
        
        // 检查车辆是否已解锁
        if (playerManager.isCarUnlocked(carId)) {
            console.log(`车辆 ${carId} 已经解锁`);
            return;
        }

        // 获取车辆价格
        const price = this.selectManager ? this.selectManager.getCarPrice(carId) : 0;
        console.log(`车辆价格: ${price} 金币`);
        console.log(`当前金币: ${playerManager.playerData.money}`);

        // 模拟购买
        if (this.selectManager) {
            this.selectManager.onPurchaseCar(carId);
        }
    }

    /**
     * 重置玩家数据
     */
    private resetPlayerData() {
        const playerManager = PlayerManager.instance;
        if (playerManager) {
            playerManager.resetPlayerData();
            console.log('玩家数据已重置');

            // 更新SelectManager的显示
            if (this.selectManager) {
                this.selectManager.updateCarToggles();
            }
            // PlayerInfoUI会自动更新金币显示，无需手动调用
        }
    }

    /**
     * 显示当前状态
     */
    private showCurrentStatus() {
        const playerManager = PlayerManager.instance;
        if (!playerManager) {
            console.error('PlayerManager 实例不存在');
            return;
        }

        console.log('=== 当前状态 ===');
        console.log(`金币: ${playerManager.playerData.money}`);
        console.log(`已解锁车辆: ${playerManager.playerData.unlockedCars.join(', ')}`);
        
        // 显示所有车辆的价格和解锁状态
        if (this.selectManager) {
            const carIds = ['car-1', 'car-2', 'car-3', 'car-4', 'car-5'];
            console.log('车辆状态:');
            carIds.forEach(carId => {
                const price = this.selectManager.getCarPrice(carId);
                const isUnlocked = playerManager.isCarUnlocked(carId);
                console.log(`  ${carId}: ${price} 金币 - ${isUnlocked ? '已解锁' : '未解锁'}`);
            });
        }
    }
}
