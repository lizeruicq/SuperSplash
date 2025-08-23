System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Button, GameManager, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, PausePanel;

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
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5a320cJxNpIpp4K8fCIQRf7", "PausePanel", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Button']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PausePanel", PausePanel = (_dec = ccclass('PausePanel'), _dec2 = property(Button), _dec3 = property(Button), _dec4 = property(Button), _dec(_class = (_class2 = class PausePanel extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "resumeButton", _descriptor, this);

          // 继续游戏按钮
          _initializerDefineProperty(this, "restartButton", _descriptor2, this);

          // 重新开始按钮
          _initializerDefineProperty(this, "mainMenuButton", _descriptor3, this);
        }

        // 返回主菜单按钮
        start() {
          this.bindButtonEvents();
        }
        /**
         * 绑定按钮事件
         */


        bindButtonEvents() {
          if (this.resumeButton) {
            this.resumeButton.node.on(Button.EventType.CLICK, this.onResumeClick, this);
          }

          if (this.restartButton) {
            this.restartButton.node.on(Button.EventType.CLICK, this.onRestartClick, this);
          }

          if (this.mainMenuButton) {
            this.mainMenuButton.node.on(Button.EventType.CLICK, this.onMainMenuClick, this);
          }
        }
        /**
         * 继续游戏按钮点击
         */


        onResumeClick() {
          var gameManager = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance();

          if (gameManager) {
            gameManager.resumeGame();
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

        onDestroy() {
          // 清理事件监听
          if (this.resumeButton) {
            this.resumeButton.node.off(Button.EventType.CLICK, this.onResumeClick, this);
          }

          if (this.restartButton) {
            this.restartButton.node.off(Button.EventType.CLICK, this.onRestartClick, this);
          }

          if (this.mainMenuButton) {
            this.mainMenuButton.node.off(Button.EventType.CLICK, this.onMainMenuClick, this);
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "resumeButton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "restartButton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "mainMenuButton", [_dec4], {
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
//# sourceMappingURL=7db7c970c834bcbcb366e98d02ffbb216840294d.js.map