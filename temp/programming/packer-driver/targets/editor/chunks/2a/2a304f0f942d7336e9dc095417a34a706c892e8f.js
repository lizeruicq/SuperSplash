System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Button, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, MainMenuController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      director = _cc.director;
      Button = _cc.Button;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "0cf64BckYpA8bODaKn8c5t/", "MainMenuController", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Button']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("MainMenuController", MainMenuController = (_dec = ccclass('MainMenuController'), _dec2 = property(Button), _dec(_class = (_class2 = class MainMenuController extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "startGameBtn", _descriptor, this);
        }

        // 拖拽你的"开始游戏"按钮到这里
        start() {
          if (this.startGameBtn) {
            this.startGameBtn.node.on(Button.EventType.CLICK, this.onStartGame, this);
          }
        }

        onStartGame() {
          director.loadScene("LevelSelect"); // director.loadScene("gamescene");
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "startGameBtn", [_dec2], {
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
//# sourceMappingURL=2a304f0f942d7336e9dc095417a34a706c892e8f.js.map