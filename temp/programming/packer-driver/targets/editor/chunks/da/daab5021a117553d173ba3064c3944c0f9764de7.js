System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Button, Label, KeyCode, input, Input, player, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _crd, ccclass, property, VehicleDestructionTest;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfplayer(extras) {
    _reporterNs.report("player", "./player", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAIPlayer(extras) {
    _reporterNs.report("AIPlayer", "./AIPlayer", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "./GameManager", _context.meta, extras);
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
      Label = _cc.Label;
      KeyCode = _cc.KeyCode;
      input = _cc.input;
      Input = _cc.Input;
    }, function (_unresolved_2) {
      player = _unresolved_2.player;
    }, function (_unresolved_3) {
      GameManager = _unresolved_3.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "01c08BDv6JMg5V8oZTJZu8J", "VehicleDestructionTest", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Button', 'Label', 'KeyCode', 'input', 'Input', 'EventKeyboard']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 车辆摧毁系统测试组件
       * 用于测试玩家车辆和AI车辆的摧毁功能
       */

      _export("VehicleDestructionTest", VehicleDestructionTest = (_dec = ccclass('VehicleDestructionTest'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Button), _dec6 = property(Button), _dec7 = property(Button), _dec8 = property(Button), _dec9 = property(Button), _dec(_class = (_class2 = class VehicleDestructionTest extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "playerHealthLabel", _descriptor, this);

          // 玩家血量显示
          _initializerDefineProperty(this, "aiHealthLabel", _descriptor2, this);

          // AI血量显示
          _initializerDefineProperty(this, "statusLabel", _descriptor3, this);

          // 状态显示
          _initializerDefineProperty(this, "damagePlayerButton", _descriptor4, this);

          // 伤害玩家按钮
          _initializerDefineProperty(this, "damageAIButton", _descriptor5, this);

          // 伤害AI按钮
          _initializerDefineProperty(this, "restoreAllButton", _descriptor6, this);

          // 恢复所有车辆按钮
          _initializerDefineProperty(this, "destroyPlayerButton", _descriptor7, this);

          // 直接摧毁玩家按钮
          _initializerDefineProperty(this, "destroyAIButton", _descriptor8, this);

          // 直接摧毁AI按钮
          this.playerVehicle = null;
          this.aiVehicles = [];
        }

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


        findVehicles() {
          // 查找玩家车辆
          const gameManager = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance();

          if (gameManager) {
            // 通过GameManager获取玩家车辆
            const scene = this.node.scene;

            if (scene) {
              const playerNodes = scene.getComponentsInChildren(_crd && player === void 0 ? (_reportPossibleCrUseOfplayer({
                error: Error()
              }), player) : player);

              if (playerNodes.length > 0) {
                this.playerVehicle = playerNodes[0];
              } // 获取AI车辆


              this.aiVehicles = gameManager.getAIPlayers();
            }
          }
        }
        /**
         * 绑定按钮事件
         */


        bindButtonEvents() {
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


        bindKeyboardEvents() {
          input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        }
        /**
         * 键盘按下事件
         */


        onKeyDown(event) {
          switch (event.keyCode) {
            case KeyCode.DIGIT_1:
              // 1键伤害玩家
              this.damagePlayer(20);
              break;

            case KeyCode.DIGIT_2:
              // 2键伤害AI
              this.damageRandomAI(20);
              break;

            case KeyCode.DIGIT_3:
              // 3键摧毁玩家
              this.destroyPlayer();
              break;

            case KeyCode.DIGIT_4:
              // 4键摧毁AI
              this.destroyRandomAI();
              break;

            case KeyCode.DIGIT_5:
              // 5键摧毁AI并测试移除
              this.destroyRandomAIWithRemoval();
              break;

            case KeyCode.DIGIT_6:
              // 6键测试血量同步
              this.testHealthSync();
              break;

            case KeyCode.KEY_R:
              // R键恢复所有
              this.restoreAllVehicles();
              break;
          }
        }
        /**
         * 伤害玩家按钮点击
         */


        onDamagePlayerClick() {
          this.damagePlayer(20);
        }
        /**
         * 伤害AI按钮点击
         */


        onDamageAIClick() {
          this.damageRandomAI(20);
        }
        /**
         * 恢复所有车辆按钮点击
         */


        onRestoreAllClick() {
          this.restoreAllVehicles();
        }
        /**
         * 摧毁玩家按钮点击
         */


        onDestroyPlayerClick() {
          this.destroyPlayer();
        }
        /**
         * 摧毁AI按钮点击
         */


        onDestroyAIClick() {
          this.destroyRandomAI();
        }
        /**
         * 对玩家造成伤害
         */


        damagePlayer(damage) {
          if (this.playerVehicle && !this.playerVehicle.isDestroyed()) {
            this.playerVehicle.takeDamage(damage);
            console.log(`对玩家造成${damage}点伤害`);
          }
        }
        /**
         * 对随机AI造成伤害
         */


        damageRandomAI(damage) {
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


        destroyPlayer() {
          if (this.playerVehicle && !this.playerVehicle.isDestroyed()) {
            this.playerVehicle.takeDamage(this.playerVehicle.getCurrentHealth());
            console.log('直接摧毁玩家车辆');
          }
        }
        /**
         * 直接摧毁随机AI
         */


        destroyRandomAI() {
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


        destroyRandomAIWithRemoval() {
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


        testHealthSync() {
          const gameManager = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance();

          if (gameManager && this.playerVehicle) {
            console.log('=== 血量同步测试 ===');
            console.log(`GameManager中的玩家血量: ${gameManager.getPlayerHP()}/${gameManager.getPlayerMaxHP()}`);
            console.log(`Player组件中的血量: ${this.playerVehicle.getCurrentHealth()}/${this.playerVehicle.getMaxHealth()}`); // 测试同步

            gameManager.syncPlayerHealth();
            console.log('执行同步后:');
            console.log(`GameManager中的玩家血量: ${gameManager.getPlayerHP()}/${gameManager.getPlayerMaxHP()}`);
          }
        }
        /**
         * 恢复所有车辆
         */


        restoreAllVehicles() {
          // 恢复玩家车辆
          if (this.playerVehicle) {
            this.playerVehicle.restoreVehicle();
          } // 恢复所有AI车辆


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


        updateUI() {
          // 更新玩家血量显示
          if (this.playerHealthLabel && this.playerVehicle) {
            const health = this.playerVehicle.getCurrentHealth();
            const maxHealth = this.playerVehicle.getMaxHealth();
            const status = this.playerVehicle.isDestroyed() ? ' [已摧毁]' : '';
            this.playerHealthLabel.string = `玩家血量: ${health}/${maxHealth}${status}`;
          } // 更新AI血量显示


          if (this.aiHealthLabel) {
            const aliveCount = this.aiVehicles.filter(ai => !ai.isDestroyed()).length;
            const totalCount = this.aiVehicles.length;
            this.aiHealthLabel.string = `AI车辆: ${aliveCount}/${totalCount} 存活`;
          } // 更新状态显示


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

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "playerHealthLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "aiHealthLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "statusLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "damagePlayerButton", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "damageAIButton", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "restoreAllButton", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "destroyPlayerButton", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "destroyAIButton", [_dec9], {
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
//# sourceMappingURL=daab5021a117553d173ba3064c3944c0f9764de7.js.map