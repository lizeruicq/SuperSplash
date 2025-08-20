System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Button, Node, Label, SceneTransition, SoundManager, PlayerManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _crd, ccclass, property, MainMenuController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfSceneTransition(extras) {
    _reporterNs.report("SceneTransition", "./SceneTransition", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSoundManager(extras) {
    _reporterNs.report("SoundManager", "./SoundManager", _context.meta, extras);
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
      Node = _cc.Node;
      Label = _cc.Label;
    }, function (_unresolved_2) {
      SceneTransition = _unresolved_2.SceneTransition;
    }, function (_unresolved_3) {
      SoundManager = _unresolved_3.SoundManager;
    }, function (_unresolved_4) {
      PlayerManager = _unresolved_4.PlayerManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "0cf64BckYpA8bODaKn8c5t/", "MainMenuController", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Button', 'Node', 'Label']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("MainMenuController", MainMenuController = (_dec = ccclass('MainMenuController'), _dec2 = property(Button), _dec3 = property(Button), _dec4 = property(Button), _dec5 = property(Button), _dec6 = property(Node), _dec7 = property(Label), _dec8 = property(Button), _dec9 = property(Button), _dec10 = property(Node), _dec11 = property(Button), _dec12 = property(Node), _dec13 = property(Button), _dec14 = property(Button), _dec(_class = (_class2 = class MainMenuController extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "startGameBtn", _descriptor, this);

          // 拖拽你的"开始游戏"按钮到这里
          _initializerDefineProperty(this, "settingBtn", _descriptor2, this);

          _initializerDefineProperty(this, "closesettingBtn", _descriptor3, this);

          _initializerDefineProperty(this, "audioBtn", _descriptor4, this);

          _initializerDefineProperty(this, "settingPanel", _descriptor5, this);

          // 拖拽你的设置面板节点到这里
          _initializerDefineProperty(this, "audioLabel", _descriptor6, this);

          // 拖拽音效按钮的Label组件到这里
          _initializerDefineProperty(this, "helpButton", _descriptor7, this);

          _initializerDefineProperty(this, "closehelpBtn", _descriptor8, this);

          _initializerDefineProperty(this, "helpPanel", _descriptor9, this);

          // 拖拽你的设置面板节点到这里
          _initializerDefineProperty(this, "resetProgressBtn", _descriptor10, this);

          // 重置进度按钮
          _initializerDefineProperty(this, "resetProgressConfirmPanel", _descriptor11, this);

          // 重置进度确认面板
          _initializerDefineProperty(this, "confirmResetBtn", _descriptor12, this);

          // 确认重置按钮
          _initializerDefineProperty(this, "closeResetPanelBtn", _descriptor13, this);
        }

        // 关闭重置面板按钮
        start() {
          if (this.startGameBtn) {
            this.startGameBtn.node.on(Button.EventType.CLICK, this.onStartGame, this);
          }

          if (this.settingBtn) {
            this.settingBtn.node.on(Button.EventType.CLICK, this.displaySettingPanel, this);
          }

          if (this.closesettingBtn) {
            this.closesettingBtn.node.on(Button.EventType.CLICK, this.hideSettingPanel, this);
          }

          if (this.helpButton) {
            this.helpButton.node.on(Button.EventType.CLICK, this.displayHelpPanel, this);
          }

          if (this.closehelpBtn) {
            this.closehelpBtn.node.on(Button.EventType.CLICK, this.hideHelpPanel, this);
          }

          if (this.audioBtn) {
            this.audioBtn.node.on(Button.EventType.CLICK, this.onAudioClick, this);
          } // 添加重置进度按钮事件监听


          if (this.resetProgressBtn) {
            this.resetProgressBtn.node.on(Button.EventType.CLICK, this.onResetProgress, this);
          } // 添加重置确认面板按钮事件监听


          if (this.confirmResetBtn) {
            this.confirmResetBtn.node.on(Button.EventType.CLICK, this.onConfirmReset, this);
          }

          if (this.closeResetPanelBtn) {
            this.closeResetPanelBtn.node.on(Button.EventType.CLICK, this.closeResetPanel, this);
          }

          this.updateAudioButtonLabel();
        }

        displaySettingPanel() {
          this.settingPanel.active = true;
        }

        hideSettingPanel() {
          this.settingPanel.active = false;
        }

        displayHelpPanel() {
          this.helpPanel.active = true;
        }

        hideHelpPanel() {
          this.helpPanel.active = false;
        }

        onAudioClick() {
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).instance.toggleAudio();
          this.updateAudioButtonLabel();
        }

        updateAudioButtonLabel() {
          if (this.audioLabel) {
            this.audioLabel.string = (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
              error: Error()
            }), SoundManager) : SoundManager).instance.isMuted() ? "音效:关 \n sound:off" : "音效:开\n sound:on";
          }
        }

        onStartGame() {
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).instance.playSoundEffect('buttonClick');
          (_crd && SceneTransition === void 0 ? (_reportPossibleCrUseOfSceneTransition({
            error: Error()
          }), SceneTransition) : SceneTransition).loadScene("LevelSelect"); // director.loadScene("gamescene");
        }
        /**
         * 重置玩家进度
         * 将玩家的金钱、车辆解锁状态、关卡解锁状态等重置为初始状态
         */


        onResetProgress() {
          // 播放按钮点击音效
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).instance.playSoundEffect('buttonClick'); // 显示确认面板

          this.showResetConfirmPanel();
        }
        /**
         * 显示重置确认面板
         */


        showResetConfirmPanel() {
          if (this.resetProgressConfirmPanel) {
            this.resetProgressConfirmPanel.active = true;
          }
        }
        /**
         * 关闭重置确认面板
         */


        closeResetPanel() {
          if (this.resetProgressConfirmPanel) {
            this.resetProgressConfirmPanel.active = false;
          }
        }
        /**
         * 确认重置玩家进度
         */


        onConfirmReset() {
          // 播放按钮点击音效
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).instance.playSoundEffect('buttonClick'); // 关闭确认面板

          this.closeResetPanel(); // 执行重置操作

          if ((_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance) {
            (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
              error: Error()
            }), PlayerManager) : PlayerManager).instance.resetPlayerData();
            console.log("玩家进度已重置"); // 如果有UI提示组件，可以在这里显示重置成功的提示
            // 例如：this.showToast("玩家进度已重置");
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "startGameBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "settingBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "closesettingBtn", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "audioBtn", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "settingPanel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "audioLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "helpButton", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "closehelpBtn", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "helpPanel", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "resetProgressBtn", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "resetProgressConfirmPanel", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "confirmResetBtn", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "closeResetPanelBtn", [_dec14], {
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
//# sourceMappingURL=2a304f0f942d7336e9dc095417a34a706c892e8f.js.map