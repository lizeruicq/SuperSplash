System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Button, director, ToggleContainer, Sprite, Color, Label, TempData, PlayerManager, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, SelectManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfTempData(extras) {
    _reporterNs.report("TempData", "./TempData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPlayerManager(extras) {
    _reporterNs.report("PlayerManager", "./PlayerManager", _context.meta, extras);
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
      director = _cc.director;
      ToggleContainer = _cc.ToggleContainer;
      Sprite = _cc.Sprite;
      Color = _cc.Color;
      Label = _cc.Label;
    }, function (_unresolved_2) {
      TempData = _unresolved_2.TempData;
    }, function (_unresolved_3) {
      PlayerManager = _unresolved_3.PlayerManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "be7b23A2jVN6agcMGkP3NKP", "SelectManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Button', 'director', 'ToggleContainer', 'Toggle', 'Sprite', 'Color', 'Label', 'Node']);

      // @ts-ignore
      ({
        ccclass,
        property
      } = _decorator); // 车辆价格配置

      _export("SelectManager", SelectManager = (_dec = ccclass('SelectManager'), _dec2 = property(ToggleContainer), _dec3 = property(ToggleContainer), _dec4 = property(Button), _dec5 = property(Label), _dec(_class = (_class2 = class SelectManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "levelToggleGroup", _descriptor, this);

          _initializerDefineProperty(this, "carToggleGroup", _descriptor2, this);

          _initializerDefineProperty(this, "startButton", _descriptor3, this);

          _initializerDefineProperty(this, "insufficientMoneyLabel", _descriptor4, this);

          // 金币不足提示标签
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
        }

        // 金币不足提示计时器
        onLoad() {
          this.updateLevelToggles();
          this.updateCarToggles();
          this.setupCarPurchaseButtons(); // 隐藏金币不足提示

          if (this.insufficientMoneyLabel) {
            this.insufficientMoneyLabel.node.active = false;
          }
        }

        updateLevelToggles() {
          const playerManager = (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance;
          console.log('更新关卡显示');
          this.levelToggleGroup.toggleItems.forEach(toggle => {
            const levelId = toggle.node.name;
            const isUnlocked = playerManager.isLevelUnlocked(levelId);
            console.log(`关卡 ${levelId}: 解锁状态 = ${isUnlocked}`); // 设置交互性和颜色

            toggle.interactable = isUnlocked;
            const sprite = toggle.node.getComponent(Sprite);

            if (sprite) {
              sprite.color = isUnlocked ? Color.WHITE : Color.BLACK;
            } // 更新评级显示


            this.updateLevelGradeDisplay(toggle.node, levelId);
          });
        }
        /**
         * 更新关卡评级显示
         */


        updateLevelGradeDisplay(levelNode, levelId) {
          const playerManager = (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance;
          const gradeText = playerManager.getLevelGradeText(levelId); // 查找或创建评级标签

          let gradeLabel = levelNode.getChildByName('GradeLabel');

          if (!gradeLabel) {
            var _levelNode$getCompone;

            // 如果没有评级标签节点，尝试查找现有的Label子节点
            gradeLabel = (_levelNode$getCompone = levelNode.getComponentInChildren(Label)) == null ? void 0 : _levelNode$getCompone.node;
          }

          if (gradeLabel) {
            const label = gradeLabel.getComponent(Label);

            if (label) {
              if (gradeText) {
                label.string = gradeText;
                label.node.active = true; // 设置评级颜色

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


        hexToColor(hex) {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return new Color(r, g, b, 255);
        }

        updateCarToggles() {
          const unlockedCars = (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance.playerData.unlockedCars;
          this.carToggleGroup.toggleItems.forEach(toggle => {
            const carId = toggle.node.name;
            const isUnlocked = unlockedCars.indexOf(carId) !== -1; // 设置车辆图标的交互性和颜色

            toggle.interactable = isUnlocked;
            const sprite = toggle.node.getComponent(Sprite);

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
          const levelToggle = this.levelToggleGroup.toggleItems.find(t => t.isChecked); // 获取当前选中的car

          const carToggle = this.carToggleGroup.toggleItems.find(t => t.isChecked);

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

          director.loadScene('gamescene');
        }
        /**
         * 设置车辆购买按钮
         */


        setupCarPurchaseButtons() {
          this.carToggleGroup.toggleItems.forEach(toggle => {
            const carId = toggle.node.name;
            const isUnlocked = (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
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
          let purchaseButton = carNode.getChildByName('PurchaseButton');

          if (!isUnlocked && this.carPrices[carId] !== undefined) {
            // 车辆未解锁且有价格配置，显示购买按钮
            if (!purchaseButton) {
              // 创建购买按钮（这里假设场景中已经有购买按钮节点）
              purchaseButton = carNode.getChildByName('PurchaseButton');
            }

            if (purchaseButton) {
              var _purchaseButton$getCh;

              purchaseButton.active = true; // 设置按钮文本

              const buttonLabel = (_purchaseButton$getCh = purchaseButton.getChildByName('Label')) == null ? void 0 : _purchaseButton$getCh.getComponent(Label);

              if (buttonLabel) {
                buttonLabel.string = `购买 ${this.carPrices[carId]}`;
              } // 绑定点击事件


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


        onPurchaseCar(carId) {
          const price = this.carPrices[carId];

          if (price === undefined) {
            console.warn(`车辆 ${carId} 没有配置价格`);
            return;
          }

          const playerManager = (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance;

          if (!playerManager) {
            console.error('PlayerManager 实例不存在');
            return;
          } // 检查玩家金币是否足够


          if (playerManager.playerData.money >= price) {
            // 扣除金币并解锁车辆
            if (playerManager.spendMoney(price)) {
              playerManager.unlockCar(carId);
              console.log(`成功购买车辆 ${carId}，花费 ${price} 金币`); // 更新UI显示

              this.updateCarToggles(); // 保存数据

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
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "carToggleGroup", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "startButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "insufficientMoneyLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=2cf1a6550c6b6cdf3ada12401368ad8645d1b008.js.map