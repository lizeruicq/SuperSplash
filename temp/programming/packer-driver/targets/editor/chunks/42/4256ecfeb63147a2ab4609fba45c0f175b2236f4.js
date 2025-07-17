System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Button, Label, director, SceneTransition, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, SceneTransitionTest;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfSceneTransition(extras) {
    _reporterNs.report("SceneTransition", "./SceneTransition", _context.meta, extras);
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
      director = _cc.director;
    }, function (_unresolved_2) {
      SceneTransition = _unresolved_2.SceneTransition;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "17b89ATsidOnZzZTfc3xnsw", "SceneTransitionTest", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Button', 'Label', 'director']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 场景过渡测试脚本
       * 用于测试场景过渡效果是否正常工作
       */

      _export("SceneTransitionTest", SceneTransitionTest = (_dec = ccclass('SceneTransitionTest'), _dec2 = property(Button), _dec3 = property(Label), _dec(_class = (_class2 = class SceneTransitionTest extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "testButton", _descriptor, this);

          _initializerDefineProperty(this, "statusLabel", _descriptor2, this);

          // 测试场景列表
          this.testScenes = ['mainmenu', 'LevelSelect', 'gamescene'];
          this.currentSceneIndex = 0;
        }

        start() {
          this.bindEvents();
          this.updateStatusLabel();
          this.findCurrentSceneIndex();
        }
        /**
         * 绑定按钮事件
         */


        bindEvents() {
          if (this.testButton) {
            this.testButton.node.on(Button.EventType.CLICK, this.onTestButtonClick, this);
          }
        }
        /**
         * 查找当前场景在测试列表中的索引
         */


        findCurrentSceneIndex() {
          var _director$getScene;

          const currentSceneName = (_director$getScene = director.getScene()) == null ? void 0 : _director$getScene.name;
          const index = this.testScenes.indexOf(currentSceneName || '');

          if (index !== -1) {
            this.currentSceneIndex = index;
          }

          this.updateStatusLabel();
        }
        /**
         * 测试按钮点击事件
         */


        onTestButtonClick() {
          // 循环切换到下一个场景
          this.currentSceneIndex = (this.currentSceneIndex + 1) % this.testScenes.length;
          const nextScene = this.testScenes[this.currentSceneIndex];
          console.log(`Testing SceneTransition: Loading scene ${nextScene}`); // 使用SceneTransition切换场景

          (_crd && SceneTransition === void 0 ? (_reportPossibleCrUseOfSceneTransition({
            error: Error()
          }), SceneTransition) : SceneTransition).loadScene(nextScene);
        }
        /**
         * 更新状态标签
         */


        updateStatusLabel() {
          if (this.statusLabel) {
            var _director$getScene2;

            const currentScene = ((_director$getScene2 = director.getScene()) == null ? void 0 : _director$getScene2.name) || 'Unknown';
            const nextScene = this.testScenes[(this.currentSceneIndex + 1) % this.testScenes.length];
            this.statusLabel.string = `当前场景: ${currentScene}\n下一个场景: ${nextScene}\n点击按钮测试场景切换`;
          }
        }

        onDestroy() {
          // 清理事件监听
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
//# sourceMappingURL=4256ecfeb63147a2ab4609fba45c0f175b2236f4.js.map