System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Button, Label, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _crd, ccclass, property, GameOverPanel;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

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
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "62b90P612FPK4AW7iiJGfF6", "GameOverPanel", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Button', 'Label']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameOverPanel", GameOverPanel = (_dec = ccclass('GameOverPanel'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Label), _dec6 = property(Label), _dec7 = property(Button), _dec8 = property(Button), _dec(_class = (_class2 = class GameOverPanel extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "titleLabel", _descriptor, this);

          // 游戏结束标题
          _initializerDefineProperty(this, "performanceLabel", _descriptor2, this);

          // 表现评价标签
          _initializerDefineProperty(this, "rewardLabel", _descriptor3, this);

          // 奖励金币标签
          _initializerDefineProperty(this, "gameTimeLabel", _descriptor4, this);

          // 游戏时长标签
          _initializerDefineProperty(this, "healthLabel", _descriptor5, this);

          // 剩余生命值标签
          _initializerDefineProperty(this, "restartButton", _descriptor6, this);

          // 重新开始按钮
          _initializerDefineProperty(this, "mainMenuButton", _descriptor7, this);
        }

        // 返回主菜单按钮
        start() {
          this.bindButtonEvents();
          this.updateGameStats();
        }
        /**
         * 绑定按钮事件
         */


        bindButtonEvents() {
          if (this.restartButton) {
            this.restartButton.node.on(Button.EventType.CLICK, this.onRestartClick, this);
          }

          if (this.mainMenuButton) {
            this.mainMenuButton.node.on(Button.EventType.CLICK, this.onMainMenuClick, this);
          }
        }
        /**
         * 更新游戏统计信息
         */


        updateGameStats() {
          var gameManager = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance();
          if (!gameManager) return; // 更新游戏时长

          if (this.gameTimeLabel) {
            var gameTime = gameManager.getGameTime();
            this.gameTimeLabel.string = "\u6E38\u620F\u65F6\u957F: " + gameTime.toFixed(1) + "\u79D2";
          } // 更新剩余生命值


          if (this.healthLabel) {
            var playerHP = gameManager.getPlayerHP();
            var maxHP = gameManager.getPlayerMaxHP();
            var healthPercentage = (playerHP / maxHP * 100).toFixed(1);
            this.healthLabel.string = "\u5269\u4F59\u751F\u547D\u503C: " + playerHP + "/" + maxHP + " (" + healthPercentage + "%)";
          }
        }
        /**
         * 重新开始按钮点击
         */


        onRestartClick() {
          var gameManager = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance();

          if (gameManager) {
            gameManager.restartGame();
          }
        }
        /**
         * 返回主菜单按钮点击
         */


        onMainMenuClick() {
          var gameManager = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance();

          if (gameManager) {
            gameManager.returnToMainMenu();
          }
        }
        /**
         * 设置游戏结束信息
         */


        setGameOverInfo(isVictory, performance, reward) {
          if (this.titleLabel) {
            this.titleLabel.string = isVictory ? '胜利！' : '失败！';
          }

          if (this.performanceLabel) {
            this.performanceLabel.string = "\u8868\u73B0\u8BC4\u4EF7: " + performance;
          }

          if (this.rewardLabel) {
            this.rewardLabel.string = "\u83B7\u5F97\u91D1\u5E01: " + reward;
          }
        }

        onDestroy() {
          // 清理事件监听
          if (this.restartButton) {
            this.restartButton.node.off(Button.EventType.CLICK, this.onRestartClick, this);
          }

          if (this.mainMenuButton) {
            this.mainMenuButton.node.off(Button.EventType.CLICK, this.onMainMenuClick, this);
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "titleLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "performanceLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "rewardLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "gameTimeLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "healthLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "restartButton", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "mainMenuButton", [_dec8], {
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
//# sourceMappingURL=60586318bbf26c095fcfd4f6c478aec79fca8ba9.js.map