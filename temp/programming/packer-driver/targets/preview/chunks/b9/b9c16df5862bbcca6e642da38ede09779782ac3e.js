System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Button, ToggleContainer, Sprite, Color, Label, Node, TempData, PlayerManager, SceneTransition, PurchasePanel, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, SelectManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfTempData(extras) {
    _reporterNs.report("TempData", "./TempData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPlayerManager(extras) {
    _reporterNs.report("PlayerManager", "./PlayerManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSceneTransition(extras) {
    _reporterNs.report("SceneTransition", "./SceneTransition", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPurchasePanel(extras) {
    _reporterNs.report("PurchasePanel", "./PurchasePanel", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Button = _cc.Button;
      ToggleContainer = _cc.ToggleContainer;
      Sprite = _cc.Sprite;
      Color = _cc.Color;
      Label = _cc.Label;
      Node = _cc.Node;
    }, function (_unresolved_2) {
      TempData = _unresolved_2.TempData;
    }, function (_unresolved_3) {
      PlayerManager = _unresolved_3.PlayerManager;
    }, function (_unresolved_4) {
      SceneTransition = _unresolved_4.SceneTransition;
    }, function (_unresolved_5) {
      PurchasePanel = _unresolved_5.PurchasePanel;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "be7b23A2jVN6agcMGkP3NKP", "SelectManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Button', 'ToggleContainer', 'Toggle', 'Sprite', 'Color', 'Label', 'Node', 'find', 'instantiate']);

      // @ts-ignore
      ({
        ccclass,
        property
      } = _decorator); // 添加PurchasePanel引用

      // 车辆价格配置
      _export("SelectManager", SelectManager = (_dec = ccclass('SelectManager'), _dec2 = property(ToggleContainer), _dec3 = property(ToggleContainer), _dec4 = property(Button), _dec5 = property(Label), _dec6 = property({
        type: Node,
        tooltip: '场景中的购买面板节点'
      }), _dec(_class = (_class2 = class SelectManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "levelToggleGroup", _descriptor, this);

          _initializerDefineProperty(this, "carToggleGroup", _descriptor2, this);

          _initializerDefineProperty(this, "startButton", _descriptor3, this);

          _initializerDefineProperty(this, "insufficientMoneyLabel", _descriptor4, this);

          // 金币不足提示标签
          // 购买面板相关属性
          _initializerDefineProperty(this, "purchasePanelNode", _descriptor5, this);

          // 车辆价格配置
          this.carPrices = {
            'car-1': 0,
            // 默认车辆免费
            'car-2': 500,
            // 第二辆车500金币
            'car-3': 1000,
            // 第三辆车1000金币
            'car-4': 1500,
            // 第四辆车1500金币
            'car-5': 2000 // 第五辆车2000金币

          };
          this.insufficientMoneyTimer = 0;
          // 金币不足提示计时器
          this.pendingCarId = null;
        }

        onLoad() {
          this.updateLevelToggles();
          this.updateCarToggles();
          this.setupCarPurchaseButtons(); // 隐藏金币不足提示

          if (this.insufficientMoneyLabel) {
            this.insufficientMoneyLabel.node.active = false;
          }
        }

        updateLevelToggles() {
          var playerManager = (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance;
          console.log('更新关卡显示');
          this.levelToggleGroup.toggleItems.forEach(toggle => {
            var levelId = toggle.node.name;
            var isUnlocked = playerManager.isLevelUnlocked(levelId);
            console.log("\u5173\u5361 " + levelId + ": \u89E3\u9501\u72B6\u6001 = " + isUnlocked); // 设置交互性和颜色

            toggle.interactable = isUnlocked;
            var sprite = toggle.node.getComponent(Sprite);
            var lock = toggle.node.getChildByName('lock');

            if (sprite) {
              sprite.color = isUnlocked ? Color.WHITE : Color.BLACK;
            }

            if (lock) {
              lock.active = !isUnlocked;
            } // 更新评级显示


            this.updateLevelGradeDisplay(toggle.node, levelId);
          });
        }
        /**
         * 更新关卡评级显示
         */


        updateLevelGradeDisplay(levelNode, levelId) {
          var playerManager = (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance;
          var gradeText = playerManager.getLevelGradeText(levelId); // 查找或创建评级标签

          var gradeLabel = levelNode.getChildByName('GradeLabel');

          if (!gradeLabel) {
            var _levelNode$getCompone;

            // 如果没有评级标签节点，尝试查找现有的Label子节点
            gradeLabel = (_levelNode$getCompone = levelNode.getComponentInChildren(Label)) == null ? void 0 : _levelNode$getCompone.node;
          }

          if (gradeLabel) {
            var label = gradeLabel.getComponent(Label);

            if (label) {
              if (gradeText) {
                label.string = gradeText;
                label.node.active = true; // 设置评级颜色

                var progress = playerManager.getLevelProgress(levelId);

                if (progress) {
                  var colorHex = playerManager.getLevelGradeColor(progress.grade);
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


        hexToColor(hex) {
          var r = parseInt(hex.slice(1, 3), 16);
          var g = parseInt(hex.slice(3, 5), 16);
          var b = parseInt(hex.slice(5, 7), 16);
          return new Color(r, g, b, 255);
        }

        updateCarToggles() {
          var unlockedCars = (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance.playerData.unlockedCars;
          this.carToggleGroup.toggleItems.forEach(toggle => {
            var carId = toggle.node.name;
            var isUnlocked = unlockedCars.indexOf(carId) !== -1; // 设置车辆图标的交互性和颜色

            toggle.interactable = isUnlocked;
            var sprite = toggle.node.getComponent(Sprite);

            if (sprite) {
              sprite.color = isUnlocked ? Color.WHITE : Color.BLACK;
            } // 处理购买按钮的显示


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
          var levelToggle = this.levelToggleGroup.toggleItems.find(t => t.isChecked); // 获取当前选中的car

          var carToggle = this.carToggleGroup.toggleItems.find(t => t.isChecked);

          if (!levelToggle || !carToggle) {
            // 你可以在这里弹窗提示"请选择关卡和车辆"
            return;
          } // 记录选择到TempData


          (_crd && TempData === void 0 ? (_reportPossibleCrUseOfTempData({
            error: Error()
          }), TempData) : TempData).selectedLevel = levelToggle.node.name;
          (_crd && TempData === void 0 ? (_reportPossibleCrUseOfTempData({
            error: Error()
          }), TempData) : TempData).selectedCar = carToggle.node.name;
          console.log(levelToggle.node.name, carToggle.node.name); // 切换到游戏场景

          (_crd && SceneTransition === void 0 ? (_reportPossibleCrUseOfSceneTransition({
            error: Error()
          }), SceneTransition) : SceneTransition).loadScene('gamescene');
        }
        /**
         * 设置车辆购买按钮
         */


        setupCarPurchaseButtons() {
          this.carToggleGroup.toggleItems.forEach(toggle => {
            var carId = toggle.node.name;
            var isUnlocked = (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
              error: Error()
            }), PlayerManager) : PlayerManager).instance.playerData.unlockedCars.indexOf(carId) !== -1;
            this.updateCarPurchaseButton(toggle.node, carId, isUnlocked);
          });
        }
        /**
         * 更新单个车辆的购买按钮
         */


        updateCarPurchaseButton(carNode, carId, isUnlocked) {
          // 查找或创建购买按钮
          var purchaseButton = carNode.getChildByName('PurchaseButton');

          if (!isUnlocked && this.carPrices[carId] !== undefined) {
            // 车辆未解锁且有价格配置，显示购买按钮
            if (!purchaseButton) {
              // 创建购买按钮（这里假设场景中已经有购买按钮节点）
              purchaseButton = carNode.getChildByName('PurchaseButton');
            }

            if (purchaseButton) {
              purchaseButton.active = true; // 设置按钮文本
              // const buttonLabel = purchaseButton.getChildByName('Label')?.getComponent(Label);
              // if (buttonLabel) {
              //     buttonLabel.string = `购买 ${this.carPrices[carId]}`;
              // }
              // 绑定点击事件

              var button = purchaseButton.getComponent(Button);

              if (button) {
                button.node.off(Button.EventType.CLICK);
                button.node.on(Button.EventType.CLICK, () => {
                  this.pendingCarId = carId;
                  this.showPurchasePanel(this.carPrices[carId]);
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


        showPurchasePanel(price) {
          if (!this.purchasePanelNode) {
            console.error('购买面板节点未配置');
            return;
          }

          var purchasePanel = this.purchasePanelNode.getComponent(_crd && PurchasePanel === void 0 ? (_reportPossibleCrUseOfPurchasePanel({
            error: Error()
          }), PurchasePanel) : PurchasePanel);

          if (!purchasePanel) {
            console.error('购买面板组件未找到');
            return;
          } // 确保面板在最上层
          // this.purchasePanelNode.setSiblingIndex(Number.MAX_SAFE_INTEGER);
          // 显示面板


          purchasePanel.show(price, purchasePrice => {
            // 确认购买后的回调
            this.processPurchase(purchasePrice);
          });
        }
        /**
         * 处理实际购买逻辑
         */


        processPurchase(price) {
          if (!this.pendingCarId) {
            return;
          }

          var carId = this.pendingCarId;
          var playerManager = (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance; // 检查玩家金币是否足够（再次检查，因为用户可能在面板显示期间改变了金币）

          if (playerManager.playerData.money >= price) {
            // 扣除金币并解锁车辆
            if (playerManager.spendMoney(price)) {
              playerManager.unlockCar(carId);
              console.log("\u6210\u529F\u8D2D\u4E70\u8F66\u8F86 " + carId + "\uFF0C\u82B1\u8D39 " + price + " \u91D1\u5E01"); // 更新UI显示

              this.updateCarToggles(); // 保存数据

              playerManager.savePlayerData();
            }
          } else {
            // 金币不足，显示提示
            this.showInsufficientMoneyMessage();
          } // 重置待购买车辆ID


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
            this.insufficientMoneyLabel.string = '金币不足！';
            this.insufficientMoneyLabel.node.active = true;
            this.insufficientMoneyTimer = 3.0; // 3秒后隐藏
          }
        }
        /**
         * 更新方法，处理金币不足提示的计时
         */


        update(deltaTime) {
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


        getCarPrice(carId) {
          return this.carPrices[carId] || 0;
        }
        /**
         * 设置车辆价格
         */


        setCarPrice(carId, price) {
          this.carPrices[carId] = price;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "levelToggleGroup", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "carToggleGroup", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "startButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "insufficientMoneyLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "purchasePanelNode", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b9c16df5862bbcca6e642da38ede09779782ac3e.js.map