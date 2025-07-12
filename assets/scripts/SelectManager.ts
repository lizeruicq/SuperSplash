import { _decorator, Component, Button, director, ToggleContainer, Toggle, Sprite, Color, Label, Node } from 'cc';
import { TempData } from './TempData';
import { PlayerManager, LevelGrade } from './PlayerManager';
// @ts-ignore
const { ccclass, property } = _decorator;

// 车辆价格配置
interface CarPriceConfig {
    [carId: string]: number;
}

@ccclass('SelectManager')
export class SelectManager extends Component {
    @property(ToggleContainer)
    levelToggleGroup: ToggleContainer = null!;

    @property(ToggleContainer)
    carToggleGroup: ToggleContainer = null!;

    @property(Button)
    startButton: Button = null!;

    @property(Label)
    insufficientMoneyLabel: Label = null!; // 金币不足提示标签

    // 车辆价格配置
    private carPrices: CarPriceConfig = {
        'car-1': 0,      // 默认车辆免费
        'car-2': 500,    // 第二辆车500金币
        'car-3': 1000,   // 第三辆车1000金币
        'car-4': 1500,   // 第四辆车1500金币
        'car-5': 2000,   // 第五辆车2000金币
    };

    private insufficientMoneyTimer: number = 0; // 金币不足提示计时器

    onLoad() {
        this.updateLevelToggles();
        this.updateCarToggles();
        this.setupCarPurchaseButtons();

        // 隐藏金币不足提示
        if (this.insufficientMoneyLabel) {
            this.insufficientMoneyLabel.node.active = false;
        }
    }

    updateLevelToggles() {
        const playerManager = PlayerManager.instance;
        console.log('更新关卡显示');

        this.levelToggleGroup.toggleItems.forEach((toggle: Toggle) => {
            const levelId = toggle.node.name;
            const isUnlocked = playerManager.isLevelUnlocked(levelId);

            console.log(`关卡 ${levelId}: 解锁状态 = ${isUnlocked}`);

            // 设置交互性和颜色
            toggle.interactable = isUnlocked;
            const sprite = toggle.node.getComponent(Sprite);
            if (sprite) {
                sprite.color = isUnlocked ? Color.WHITE : Color.BLACK;
            }

            // 更新评级显示
            this.updateLevelGradeDisplay(toggle.node, levelId);
        });
    }

    /**
     * 更新关卡评级显示
     */
    updateLevelGradeDisplay(levelNode: Node, levelId: string) {
        const playerManager = PlayerManager.instance;
        const gradeText = playerManager.getLevelGradeText(levelId);

        // 查找或创建评级标签
        let gradeLabel = levelNode.getChildByName('GradeLabel');
        if (!gradeLabel) {
            // 如果没有评级标签节点，尝试查找现有的Label子节点
            gradeLabel = levelNode.getComponentInChildren(Label)?.node;
        }

        if (gradeLabel) {
            const label = gradeLabel.getComponent(Label);
            if (label) {
                if (gradeText) {
                    label.string = gradeText;
                    label.node.active = true;

                    // 设置评级颜色
                    const progress = playerManager.getLevelProgress(levelId);
                    if (progress) {
                        const colorHex = playerManager.getLevelGradeColor(progress.grade);
                        label.color = this.hexToColor(colorHex);
                    }
                } else {
                    label.string = '';
                    label.node.active = false;
                }
            }
        }
    }

    /**
     * 将十六进制颜色转换为Cocos Color
     */
    private hexToColor(hex: string): Color {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return new Color(r, g, b, 255);
    }

    updateCarToggles() {
        const unlockedCars = PlayerManager.instance.playerData.unlockedCars;
        this.carToggleGroup.toggleItems.forEach((toggle: Toggle) => {
            const carId = toggle.node.name;
            const isUnlocked = unlockedCars.indexOf(carId) !== -1;

            // 设置车辆图标的交互性和颜色
            toggle.interactable = isUnlocked;
            const sprite = toggle.node.getComponent(Sprite);
            if (sprite) {
                sprite.color = isUnlocked ? Color.WHITE : Color.BLACK;
            }

            // 处理购买按钮的显示
            this.updateCarPurchaseButton(toggle.node, carId, isUnlocked);
        });
    }

    start() {
        if (this.startButton) {
            this.startButton.node.on(Button.EventType.CLICK, this.onStartGame, this);
        }
    }

    onStartGame() {
        // 获取当前选中的level
        const levelToggle = this.levelToggleGroup.toggleItems.find((t: any) => t.isChecked);
        // 获取当前选中的car
        const carToggle = this.carToggleGroup.toggleItems.find((t: any) => t.isChecked);

        if (!levelToggle || !carToggle) {
            // 你可以在这里弹窗提示"请选择关卡和车辆"
            return;
        }

        // 记录选择到TempData
        TempData.selectedLevel = levelToggle.node.name;
        TempData.selectedCar = carToggle.node.name;

        console.log(levelToggle.node.name,carToggle.node.name)

        // 切换到游戏场景
        director.loadScene('gamescene');
    }



    /**
     * 设置车辆购买按钮
     */
    setupCarPurchaseButtons() {
        this.carToggleGroup.toggleItems.forEach((toggle: Toggle) => {
            const carId = toggle.node.name;
            const isUnlocked = PlayerManager.instance.playerData.unlockedCars.indexOf(carId) !== -1;
            this.updateCarPurchaseButton(toggle.node, carId, isUnlocked);
        });
    }

    /**
     * 更新单个车辆的购买按钮
     */
    updateCarPurchaseButton(carNode: Node, carId: string, isUnlocked: boolean) {
        // 查找或创建购买按钮
        let purchaseButton = carNode.getChildByName('PurchaseButton');

        if (!isUnlocked && this.carPrices[carId] !== undefined) {
            // 车辆未解锁且有价格配置，显示购买按钮
            if (!purchaseButton) {
                // 创建购买按钮（这里假设场景中已经有购买按钮节点）
                purchaseButton = carNode.getChildByName('PurchaseButton');
            }

            if (purchaseButton) {
                purchaseButton.active = true;

                // 设置按钮文本
                const buttonLabel = purchaseButton.getChildByName('Label')?.getComponent(Label);
                if (buttonLabel) {
                    buttonLabel.string = `购买 ${this.carPrices[carId]}`;
                }

                // 绑定点击事件
                const button = purchaseButton.getComponent(Button);
                if (button) {
                    button.node.off(Button.EventType.CLICK);
                    button.node.on(Button.EventType.CLICK, () => {
                        this.onPurchaseCar(carId);
                    }, this);
                }
            }
        } else {
            // 车辆已解锁或免费，隐藏购买按钮
            if (purchaseButton) {
                purchaseButton.active = false;
            }
        }
    }

    /**
     * 购买车辆
     */
    onPurchaseCar(carId: string) {
        const price = this.carPrices[carId];
        if (price === undefined) {
            console.warn(`车辆 ${carId} 没有配置价格`);
            return;
        }

        const playerManager = PlayerManager.instance;
        if (!playerManager) {
            console.error('PlayerManager 实例不存在');
            return;
        }

        // 检查玩家金币是否足够
        if (playerManager.playerData.money >= price) {
            // 扣除金币并解锁车辆
            if (playerManager.spendMoney(price)) {
                playerManager.unlockCar(carId);

                console.log(`成功购买车辆 ${carId}，花费 ${price} 金币`);

                // 更新UI显示
                this.updateCarToggles();

                // 保存数据
                playerManager.savePlayerData();
            }
        } else {
            // 金币不足，显示提示
            this.showInsufficientMoneyMessage();
        }
    }

    /**
     * 显示金币不足提示
     */
    showInsufficientMoneyMessage() {
        if (this.insufficientMoneyLabel) {
            this.insufficientMoneyLabel.string = '金币不足！';
            this.insufficientMoneyLabel.node.active = true;
            this.insufficientMoneyTimer = 3.0; // 3秒后隐藏
        }
    }

    /**
     * 更新方法，处理金币不足提示的计时
     */
    update(deltaTime: number) {
        if (this.insufficientMoneyTimer > 0) {
            this.insufficientMoneyTimer -= deltaTime;
            if (this.insufficientMoneyTimer <= 0) {
                if (this.insufficientMoneyLabel) {
                    this.insufficientMoneyLabel.node.active = false;
                }
            }
        }
    }

    /**
     * 获取车辆价格
     */
    getCarPrice(carId: string): number {
        return this.carPrices[carId] || 0;
    }

    /**
     * 设置车辆价格
     */
    setCarPrice(carId: string, price: number) {
        this.carPrices[carId] = price;
    }
}