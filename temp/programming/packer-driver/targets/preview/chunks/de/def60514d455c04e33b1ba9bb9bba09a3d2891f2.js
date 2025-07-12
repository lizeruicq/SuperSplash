System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Button, Label, KeyCode, input, Input, GameManager, GameState, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _crd, ccclass, property, GameManagerExample;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "./GameManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameState(extras) {
    _reporterNs.report("GameState", "./GameManager", _context.meta, extras);
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
      GameManager = _unresolved_2.GameManager;
      GameState = _unresolved_2.GameState;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8e647zNZaBP6ZofbQv55lEL", "GameManagerExample", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Button', 'Label', 'KeyCode', 'input', 'Input', 'EventKeyboard']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * GameManager使用示例
       * 这个组件展示了如何使用GameManager的游戏状态管理功能
       */

      _export("GameManagerExample", GameManagerExample = (_dec = ccclass('GameManagerExample'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Label), _dec6 = property(Button), _dec7 = property(Button), _dec8 = property(Button), _dec9 = property(Button), _dec(_class = (_class2 = class GameManagerExample extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "statusLabel", _descriptor, this);

          // 状态显示标签
          _initializerDefineProperty(this, "gameTimeLabel", _descriptor2, this);

          // 游戏时间显示标签
          _initializerDefineProperty(this, "playerHPLabel", _descriptor3, this);

          // 玩家生命值显示标签
          _initializerDefineProperty(this, "enemyCountLabel", _descriptor4, this);

          // 敌人数量显示标签
          _initializerDefineProperty(this, "testPauseButton", _descriptor5, this);

          // 测试暂停按钮
          _initializerDefineProperty(this, "testGameOverWinButton", _descriptor6, this);

          // 测试胜利按钮
          _initializerDefineProperty(this, "testGameOverLoseButton", _descriptor7, this);

          // 测试失败按钮
          _initializerDefineProperty(this, "testDamageButton", _descriptor8, this);

          // 测试伤害按钮
          this.gameManager = null;
        }

        onLoad() {
          // 获取GameManager实例
          this.gameManager = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance();
        }

        start() {
          this.bindButtonEvents();
          this.bindKeyboardEvents();
        }
        /**
         * 绑定按钮事件
         */


        bindButtonEvents() {
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


        bindKeyboardEvents() {
          input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        }
        /**
         * 键盘按下事件
         */


        onKeyDown(event) {
          if (!this.gameManager) return;

          switch (event.keyCode) {
            case KeyCode.KEY_P:
              // P键暂停/继续
              if (this.gameManager.getCurrentState() === (_crd && GameState === void 0 ? (_reportPossibleCrUseOfGameState({
                error: Error()
              }), GameState) : GameState).RUNNING) {
                this.gameManager.pauseGame();
              } else if (this.gameManager.getCurrentState() === (_crd && GameState === void 0 ? (_reportPossibleCrUseOfGameState({
                error: Error()
              }), GameState) : GameState).PAUSED) {
                this.gameManager.resumeGame();
              }

              break;

            case KeyCode.KEY_R:
              // R键重新开始
              this.gameManager.restartGame();
              break;

            case KeyCode.KEY_M:
              // M键返回主菜单
              this.gameManager.returnToMainMenu();
              break;
          }
        }
        /**
         * 测试暂停按钮点击
         */


        onTestPauseClick() {
          if (!this.gameManager) return;

          if (this.gameManager.getCurrentState() === (_crd && GameState === void 0 ? (_reportPossibleCrUseOfGameState({
            error: Error()
          }), GameState) : GameState).RUNNING) {
            this.gameManager.pauseGame();
          } else if (this.gameManager.getCurrentState() === (_crd && GameState === void 0 ? (_reportPossibleCrUseOfGameState({
            error: Error()
          }), GameState) : GameState).PAUSED) {
            this.gameManager.resumeGame();
          }
        }
        /**
         * 测试胜利按钮点击
         */


        onTestGameOverWinClick() {
          if (this.gameManager) {
            this.gameManager.gameOver(true);
          }
        }
        /**
         * 测试失败按钮点击
         */


        onTestGameOverLoseClick() {
          if (this.gameManager) {
            this.gameManager.gameOver(false);
          }
        }
        /**
         * 测试伤害按钮点击
         */


        onTestDamageClick() {
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


        updateUI() {
          if (!this.gameManager) return; // 更新状态显示

          if (this.statusLabel) {
            var state = this.gameManager.getCurrentState();
            var stateText = '';

            switch (state) {
              case (_crd && GameState === void 0 ? (_reportPossibleCrUseOfGameState({
                error: Error()
              }), GameState) : GameState).RUNNING:
                stateText = '运行中';
                break;

              case (_crd && GameState === void 0 ? (_reportPossibleCrUseOfGameState({
                error: Error()
              }), GameState) : GameState).PAUSED:
                stateText = '已暂停';
                break;

              case (_crd && GameState === void 0 ? (_reportPossibleCrUseOfGameState({
                error: Error()
              }), GameState) : GameState).GAME_OVER:
                stateText = '游戏结束';
                break;
            }

            this.statusLabel.string = "\u6E38\u620F\u72B6\u6001: " + stateText;
          } // 更新游戏时间


          if (this.gameTimeLabel) {
            var gameTime = this.gameManager.getGameTime();
            this.gameTimeLabel.string = "\u6E38\u620F\u65F6\u957F: " + gameTime.toFixed(1) + "\u79D2";
          } // 更新玩家生命值


          if (this.playerHPLabel) {
            var playerHP = this.gameManager.getPlayerHP();
            var maxHP = this.gameManager.getPlayerMaxHP();
            this.playerHPLabel.string = "\u751F\u547D\u503C: " + playerHP + "/" + maxHP;
          } // 更新敌人数量


          if (this.enemyCountLabel) {
            var enemyCount = this.gameManager.getEnemyCount();
            this.enemyCountLabel.string = "\u654C\u4EBA\u5269\u4F59: " + enemyCount;
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

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "statusLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "gameTimeLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "playerHPLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "enemyCountLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "testPauseButton", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "testGameOverWinButton", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "testGameOverLoseButton", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "testDamageButton", [_dec9], {
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
//# sourceMappingURL=def60514d455c04e33b1ba9bb9bba09a3d2891f2.js.map