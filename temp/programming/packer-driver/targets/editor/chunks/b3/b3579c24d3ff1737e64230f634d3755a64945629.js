System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, KeyCode, Input, input, PlayerManager, SelectManager, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, CarPurchaseTest;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPlayerManager(extras) {
    _reporterNs.report("PlayerManager", "./PlayerManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSelectManager(extras) {
    _reporterNs.report("SelectManager", "./SelectManager", _context.meta, extras);
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
      KeyCode = _cc.KeyCode;
      Input = _cc.Input;
      input = _cc.input;
    }, function (_unresolved_2) {
      PlayerManager = _unresolved_2.PlayerManager;
    }, function (_unresolved_3) {
      SelectManager = _unresolved_3.SelectManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4b4e42A5TZIyYEalgHgv1Ni", "CarPurchaseTest", undefined);

      __checkObsolete__(['_decorator', 'Component', 'KeyCode', 'Input', 'input']);

      ({
        ccclass,
        property
      } = _decorator);
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

      _export("CarPurchaseTest", CarPurchaseTest = (_dec = ccclass('CarPurchaseTest'), _dec2 = property(_crd && SelectManager === void 0 ? (_reportPossibleCrUseOfSelectManager({
        error: Error()
      }), SelectManager) : SelectManager), _dec(_class = (_class2 = class CarPurchaseTest extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "selectManager", _descriptor, this);
        }

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

        onKeyDown(event) {
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


        addMoney(amount) {
          const playerManager = (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance;

          if (playerManager) {
            playerManager.addMoney(amount);
            console.log(`添加 ${amount} 金币，当前金币: ${playerManager.playerData.money}`); // PlayerInfoUI会自动更新金币显示，无需手动调用
          }
        }
        /**
         * 减少金币
         */


        reduceMoney(amount) {
          const playerManager = (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance;

          if (playerManager) {
            const success = playerManager.spendMoney(amount);

            if (success) {
              console.log(`消费 ${amount} 金币，当前金币: ${playerManager.playerData.money}`);
            } else {
              console.log(`金币不足，无法消费 ${amount} 金币，当前金币: ${playerManager.playerData.money}`);
            } // PlayerInfoUI会自动更新金币显示，无需手动调用

          }
        }
        /**
         * 测试购买车辆
         */


        testPurchaseCar(carId) {
          const playerManager = (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance;

          if (!playerManager) {
            console.error('PlayerManager 实例不存在');
            return;
          }

          console.log(`=== 尝试购买车辆 ${carId} ===`); // 检查车辆是否已解锁

          if (playerManager.isCarUnlocked(carId)) {
            console.log(`车辆 ${carId} 已经解锁`);
            return;
          } // 获取车辆价格


          const price = this.selectManager ? this.selectManager.getCarPrice(carId) : 0;
          console.log(`车辆价格: ${price} 金币`);
          console.log(`当前金币: ${playerManager.playerData.money}`); // 模拟购买

          if (this.selectManager) {
            this.selectManager.onPurchaseCar(carId);
          }
        }
        /**
         * 重置玩家数据
         */


        resetPlayerData() {
          const playerManager = (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance;

          if (playerManager) {
            playerManager.resetPlayerData();
            console.log('玩家数据已重置'); // 更新SelectManager的显示

            if (this.selectManager) {
              this.selectManager.updateCarToggles();
            } // PlayerInfoUI会自动更新金币显示，无需手动调用

          }
        }
        /**
         * 显示当前状态
         */


        showCurrentStatus() {
          const playerManager = (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance;

          if (!playerManager) {
            console.error('PlayerManager 实例不存在');
            return;
          }

          console.log('=== 当前状态 ===');
          console.log(`金币: ${playerManager.playerData.money}`);
          console.log(`已解锁车辆: ${playerManager.playerData.unlockedCars.join(', ')}`); // 显示所有车辆的价格和解锁状态

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

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "selectManager", [_dec2], {
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
//# sourceMappingURL=b3579c24d3ff1737e64230f634d3755a64945629.js.map