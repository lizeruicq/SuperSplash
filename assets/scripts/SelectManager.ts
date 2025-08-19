import { _decorator, Component, Button, ToggleContainer, Toggle, Sprite, Color, Label, Node, find } from 'cc';
import { TempData } from './TempData';
import { PlayerManager } from './PlayerManager';
import { SceneTransition } from './SceneTransition';
import { CarPropertyDisplay } from './CarPropertyDisplay';
// @ts-ignore
const { ccclass, property } = _decorator;

// 添加PurchasePanel引用
import { PurchasePanel } from './PurchasePanel';

// 车辆价格配置
interface CarPriceConfig {
    [carId: string]: number;
}

interface CarinfoConfig {
    [carId: string]: string;
}

@ccclass('SelectManager')
export class SelectManager extends Component {
    @property(ToggleContainer)
    levelToggleGroup: ToggleContainer = null!;

    @property(ToggleContainer)
    carToggleGroup: ToggleContainer = null!;

    @property(Button)
    startButton: Button = null!;

    @property(Button)
    backButton: Button = null!;

    @property(Label)
    insufficientMoneyLabel: Label = null!; // 金币不足提示标签

    // 购买面板相关属性
    @property({
        type: Node,
        tooltip: '场景中的购买面板节点',
    })
    private purchasePanelNode: Node = null!;

    // 车辆属性显示相关属性
    @property({
        type: CarPropertyDisplay,
        tooltip: 'car-property节点上的CarPropertyDisplay组件',
    })
    carPropertyDisplay: CarPropertyDisplay = null!;

    // 车辆价格配置
    private carPrices: CarPriceConfig = {
        'car-1': 0,      // 默认车辆免费
        'car-2': 500,    // 第二辆车500金币
        'car-3': 1000,   // 第三辆车1000金币
        'car-4': 1500,   // 第四辆车1500金币
        'car-5': 2000,   // 第五辆车2000金币
    };

    // 车辆价格配置
    private carInfos: CarinfoConfig = {
        'car-1': '操控性超强小车，武器配备为子弹发射器，击中对手你可造成伤害 \n This super maneuverable car is equipped with a bullet launcher. When you hit your opponent, you can cause damage.',      
        'car-2': '经典跑车,具有坚固的车身,武器配备为火箭炮，爆炸后会清除附近的颜料 \nClassic sports car, with a sturdy body, equipped with  a rocket launcher. After explosion, it will clear the nearby paint.',    
        'car-3': '现代化的超级跑车，速度与转向均衡，配备武器为机炮，击中后可造成伤害 \nA modern supercar with balanced speed and steering, equipped with a bullet launcher. When you hit your opponent, you can cause damage.',   
        'car-4': '甩尾加速犹如闪电，武器配备为火箭炮，爆炸后会清除附近的颜料\nThe drift and acceleration is like lightning, equipped with a rocket launcher. After explosion, it will clear the nearby paint.',   
        'car-5': '送豆腐专用，即使在狭窄的山路也灵活穿梭，武器配备为火箭炮，爆炸后会清除附近的颜料\n It is specially designed for delivering tofu and can move flexibly even on narrow mountain roads. equipped with a rocket launcher. ',   
    };

    private insufficientMoneyTimer: number = 0; // 金币不足提示计时器
    private pendingCarId: string = null!;

    onLoad() {
        this.updateLevelToggles();
        this.updateCarToggles();
        this.setupCarPurchaseButtons();
        this.setupCarSelectionListener();

        // 隐藏金币不足提示
        if (this.insufficientMoneyLabel) {
            this.insufficientMoneyLabel.node.active = false;
        }

        // 自动查找车辆属性显示组件（如果没有手动设置）
        this.autoFindCarPropertyDisplay();
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
            const lock = toggle.node.getChildByName('lock');

            if (sprite) {
                sprite.color = isUnlocked ? Color.WHITE : Color.BLACK;
            }
            if (lock) {
                lock.active = !isUnlocked;
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
         if (this.backButton) {
            this.backButton.node.on(Button.EventType.CLICK, this.onBackButton, this);
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
        SceneTransition.loadScene('gamescene');
    }

    onBackButton()
    {
        SceneTransition.loadScene('mainmenu');
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
                // const buttonLabel = purchaseButton.getChildByName('Label')?.getComponent(Label);
                // if (buttonLabel) {
                //     buttonLabel.string = `购买 ${this.carPrices[carId]}`;
                // }

                // 绑定点击事件
                const button = purchaseButton.getComponent(Button);
                if (button) {
                    button.node.off(Button.EventType.CLICK);
                    button.node.on(Button.EventType.CLICK, () => {
                        this.pendingCarId = carId;
                        this.showPurchasePanel(this.carPrices[carId], this.carInfos[carId]);
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
     * 显示购买面板
     */
    private showPurchasePanel(price: number, info: string) {
        if (!this.purchasePanelNode) {
            console.error('购买面板节点未配置');
            return;
        }

        const purchasePanel = this.purchasePanelNode.getComponent<PurchasePanel>(PurchasePanel);
        if (!purchasePanel) {
            console.error('购买面板组件未找到');
            return;
        }

        // 确保面板在最上层
        // this.purchasePanelNode.setSiblingIndex(Number.MAX_SAFE_INTEGER);

        // 显示面板
        purchasePanel.show(price, info, (purchasePrice) => {
            // 确认购买后的回调
            this.processPurchase(purchasePrice);
        });
    }

    /**
     * 处理实际购买逻辑
     */
    private processPurchase(price: number) {
        if (!this.pendingCarId) {
            return;
        }

        const carId = this.pendingCarId;
        const playerManager = PlayerManager.instance;

        // 检查玩家金币是否足够（再次检查，因为用户可能在面板显示期间改变了金币）
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

        // 重置待购买车辆ID
        this.pendingCarId = null;
    }

    /**
     * 购买车辆
     */
    // onPurchaseCar(carId: string) {
    //     const price = this.carPrices[carId];
    //     if (price === undefined) {
    //         console.warn(`车辆 ${carId} 没有配置价格`);
    //         return;
    //     }

    //     const playerManager = PlayerManager.instance;
    //     if (!playerManager) {
    //         console.error('PlayerManager 实例不存在');
    //         return;
    //     }

    //     // 检查玩家金币是否足够
    //     if (playerManager.playerData.money >= price) {
    //         // 扣除金币并解锁车辆
    //         if (playerManager.spendMoney(price)) {
    //             playerManager.unlockCar(carId);

    //             console.log(`成功购买车辆 ${carId}，花费 ${price} 金币`);

    //             // 更新UI显示
    //             this.updateCarToggles();

    //             // 保存数据
    //             playerManager.savePlayerData();
    //         }
    //     } else {
    //         // 金币不足，显示提示
    //         this.showInsufficientMoneyMessage();
    //     }
    // }

    /**
     * 显示金币不足提示
     */
    showInsufficientMoneyMessage() {
        if (this.insufficientMoneyLabel) {
            this.insufficientMoneyLabel.string = '金币不足！\n your money is not enough';
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

    /**
     * 自动查找车辆属性显示组件
     */
    private autoFindCarPropertyDisplay(): void {
        if (!this.carPropertyDisplay) {
            // 尝试在场景中查找car-property节点
            const carPropertyNode = find('Canvas/car-property') ||
                                   find('car-property') ||
                                   this.node.getChildByName('car-property');

            if (carPropertyNode) {
                this.carPropertyDisplay = carPropertyNode.getComponent(CarPropertyDisplay);
                if (!this.carPropertyDisplay) {
                    console.warn('car-property节点找到了，但没有CarPropertyDisplay组件');
                }
            } else {
                console.warn('未找到car-property节点，请确保场景中存在该节点');
            }
        }
    }

    /**
     * 设置车辆选择监听器
     */
    private setupCarSelectionListener(): void {
        if (!this.carToggleGroup) {
            console.warn('carToggleGroup未设置');
            return;
        }

        // 为每个车辆Toggle添加选择监听
        this.carToggleGroup.toggleItems.forEach((toggle: Toggle) => {
            toggle.node.on(Toggle.EventType.TOGGLE, this.onCarToggleChanged, this);
        });

        // 检查是否有默认选中的车辆
        this.checkInitialCarSelection();
    }

    /**
     * 车辆Toggle状态改变时的回调
     */
    private onCarToggleChanged(toggle: Toggle): void {
        if (toggle.isChecked) {
            const carId = toggle.node.name;
            console.log(`选中车辆: ${carId}`);
            this.showCarProperties(carId);
        }
    }

    /**
     * 显示车辆属性
     */
    private showCarProperties(carId: string): void {
        if (this.carPropertyDisplay) {
            this.carPropertyDisplay.showCarProperties(carId);
        } else {
            console.warn('CarPropertyDisplay组件未找到，无法显示车辆属性');
        }
    }

    /**
     * 检查初始车辆选择
     */
    private checkInitialCarSelection(): void {
        const selectedToggle = this.carToggleGroup.toggleItems.find((toggle: Toggle) => toggle.isChecked);
        if (selectedToggle) {
            const carId = selectedToggle.node.name;
            this.showCarProperties(carId);
        } 
        // else {
        //     // 如果没有选中的车辆，隐藏属性显示
        //     if (this.carPropertyDisplay) {
        //         this.carPropertyDisplay.hideAllProperties();
        //     }
        // }
    }
}

