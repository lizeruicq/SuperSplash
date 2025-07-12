System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, PlayerManager, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, PlayerInfoUI;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPlayerManager(extras) {
    _reporterNs.report("PlayerManager", "./PlayerManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPlayerData(extras) {
    _reporterNs.report("PlayerData", "./PlayerManager", _context.meta, extras);
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
      Label = _cc.Label;
    }, function (_unresolved_2) {
      PlayerManager = _unresolved_2.PlayerManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "66fbclPUjBL7oYA2xIdTwf+", "PlayerInfoUI", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Label']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PlayerInfoUI", PlayerInfoUI = (_dec = ccclass('PlayerInfoUI'), _dec2 = property(Label), _dec3 = property(Label), _dec(_class = (_class2 = class PlayerInfoUI extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "levelLabel", _descriptor, this);

          // 拖拽等级Label
          _initializerDefineProperty(this, "moneyLabel", _descriptor2, this);

          // 拖拽金钱Label
          this._playerManager = null;
        }

        onLoad() {
          this._playerManager = (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance; // 监听数据变化，自动刷新UI

          this._playerManager.addDataChangeListener(this.updateUI.bind(this));

          this.updateUI(this._playerManager.playerData);
        }

        onDestroy() {
          if (this._playerManager) {
            this._playerManager.removeDataChangeListener(this.updateUI.bind(this));
          }
        }

        updateUI(data) {
          if (this.levelLabel) {
            this.levelLabel.string = `等级: ${data.level}`;
          }

          if (this.moneyLabel) {
            this.moneyLabel.string = `金钱: ${data.money}`;
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "levelLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "moneyLabel", [_dec3], {
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
//# sourceMappingURL=5747e286ea7bb225640df61cf460ffb63f9b975e.js.map