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
        constructor() {
          super(...arguments);

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
          var playerManager = (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance;

          if (playerManager) {
            playerManager.addMoney(amount);
            console.log("\u6DFB\u52A0 " + amount + " \u91D1\u5E01\uFF0C\u5F53\u524D\u91D1\u5E01: " + playerManager.playerData.money); // PlayerInfoUI会自动更新金币显示，无需手动调用
          }
        }
        /**
         * 减少金币
         */


        reduceMoney(amount) {
          var playerManager = (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance;

          if (playerManager) {
            var success = playerManager.spendMoney(amount);

            if (success) {
              console.log("\u6D88\u8D39 " + amount + " \u91D1\u5E01\uFF0C\u5F53\u524D\u91D1\u5E01: " + playerManager.playerData.money);
            } else {
              console.log("\u91D1\u5E01\u4E0D\u8DB3\uFF0C\u65E0\u6CD5\u6D88\u8D39 " + amount + " \u91D1\u5E01\uFF0C\u5F53\u524D\u91D1\u5E01: " + playerManager.playerData.money);
            } // PlayerInfoUI会自动更新金币显示，无需手动调用

          }
        }
        /**
         * 测试购买车辆
         */


        testPurchaseCar(carId) {
          var playerManager = (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance;

          if (!playerManager) {
            console.error('PlayerManager 实例不存在');
            return;
          }

          console.log("=== \u5C1D\u8BD5\u8D2D\u4E70\u8F66\u8F86 " + carId + " ==="); // 检查车辆是否已解锁

          if (playerManager.isCarUnlocked(carId)) {
            console.log("\u8F66\u8F86 " + carId + " \u5DF2\u7ECF\u89E3\u9501");
            return;
          } // 获取车辆价格


          var price = this.selectManager ? this.selectManager.getCarPrice(carId) : 0;
          console.log("\u8F66\u8F86\u4EF7\u683C: " + price + " \u91D1\u5E01");
          console.log("\u5F53\u524D\u91D1\u5E01: " + playerManager.playerData.money); // 模拟购买

          if (this.selectManager) {
            this.selectManager.onPurchaseCar(carId);
          }
        }
        /**
         * 重置玩家数据
         */


        resetPlayerData() {
          var playerManager = (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
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
          var playerManager = (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance;

          if (!playerManager) {
            console.error('PlayerManager 实例不存在');
            return;
          }

          console.log('=== 当前状态 ===');
          console.log("\u91D1\u5E01: " + playerManager.playerData.money);
          console.log("\u5DF2\u89E3\u9501\u8F66\u8F86: " + playerManager.playerData.unlockedCars.join(', ')); // 显示所有车辆的价格和解锁状态

          if (this.selectManager) {
            var carIds = ['car-1', 'car-2', 'car-3', 'car-4', 'car-5'];
            console.log('车辆状态:');
            carIds.forEach(carId => {
              var price = this.selectManager.getCarPrice(carId);
              var isUnlocked = playerManager.isCarUnlocked(carId);
              console.log("  " + carId + ": " + price + " \u91D1\u5E01 - " + (isUnlocked ? '已解锁' : '未解锁'));
            });
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "selectManager", [_dec2], {
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
//# sourceMappingURL=b3579c24d3ff1737e64230f634d3755a64945629.js.map