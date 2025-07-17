System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Button, Label, SceneFader, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, SceneFaderTest;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfSceneFader(extras) {
    _reporterNs.report("SceneFader", "./SceneFader", _context.meta, extras);
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
      SceneFader = _unresolved_2.SceneFader;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7163cpx+A1I34boiIX23ONF", "SceneFaderTest", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Button', 'Label']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * SceneFader 测试组件
       * 用于测试场景渐变效果是否正常工作
       */

      _export("SceneFaderTest", SceneFaderTest = (_dec = ccclass('SceneFaderTest'), _dec2 = property(Button), _dec3 = property(Label), _dec(_class = (_class2 = class SceneFaderTest extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "testButton", _descriptor, this);

          _initializerDefineProperty(this, "statusLabel", _descriptor2, this);

          this.testScenes = ['mainmenu', 'LevelSelect', 'gamescene'];
          this.currentSceneIndex = 0;
        }

        start() {
          if (this.testButton) {
            this.testButton.node.on(Button.EventType.CLICK, this.onTestButtonClick, this);
          }

          this.updateStatusLabel();
        }

        onTestButtonClick() {
          // 循环切换到下一个场景
          this.currentSceneIndex = (this.currentSceneIndex + 1) % this.testScenes.length;
          const nextScene = this.testScenes[this.currentSceneIndex];
          console.log(`Testing SceneFader: Loading scene ${nextScene}`); // 使用 SceneFader 切换场景

          (_crd && SceneFader === void 0 ? (_reportPossibleCrUseOfSceneFader({
            error: Error()
          }), SceneFader) : SceneFader).loadScene(nextScene);
        }

        updateStatusLabel() {
          if (this.statusLabel) {
            const currentScene = this.testScenes[this.currentSceneIndex];
            this.statusLabel.string = `当前场景: ${currentScene}\n点击按钮测试场景切换`;
          }
        }

        onDestroy() {
          if (this.testButton) {
            this.testButton.node.off(Button.EventType.CLICK, this.onTestButtonClick, this);
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "testButton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "statusLabel", [_dec3], {
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
//# sourceMappingURL=9c46c306d949fec57901ba361b2178b220f0fe43.js.map