System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, UIOpacity, tween, _dec, _class, _class2, _crd, ccclass, SceneFader;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      director = _cc.director;
      UIOpacity = _cc.UIOpacity;
      tween = _cc.tween;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8f875/PEYxJrbVNtjrMk68M", "SceneFader", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'director', 'UIOpacity', 'tween', 'view', 'UITransform', 'color', 'Graphics', 'Canvas']);

      ({
        ccclass
      } = _decorator);

      _export("SceneFader", SceneFader = (_dec = ccclass('SceneFader'), _dec(_class = (_class2 = class SceneFader extends Component {
        constructor() {
          super(...arguments);
          this.uiOpacity = null;
        }

        /**
         * 静态方法：使用渐变效果加载场景
         */
        static loadScene(sceneName) {
          if (SceneFader.instance) {
            SceneFader.instance.loadScene(sceneName);
          } else {
            // 如果没有实例，直接加载场景
            director.loadScene(sceneName);
          }
        }

        onLoad() {
          // 确保只有一个实例
          if (SceneFader.instance) {
            this.node.destroy();
            return;
          }

          SceneFader.instance = this; // 设置为常驻节点，不会在场景切换时被销毁

          director.addPersistRootNode(this.node); // 从当前节点获取 UIOpacity 组件

          this.uiOpacity = this.getComponent(UIOpacity);

          if (!this.uiOpacity) {
            console.error('UIOpacity component not found on SceneFader node');
            return;
          }

          this.fadeIn();
        }
        /**
         * 渐入效果（从黑屏到透明）
         */


        fadeIn(duration) {
          if (duration === void 0) {
            duration = 0.5;
          }

          if (!this.uiOpacity) return;
          this.uiOpacity.opacity = 255;
          tween(this.uiOpacity).to(duration, {
            opacity: 0
          }).start();
        }
        /**
         * 渐出效果（从透明到黑屏）
         */


        fadeOut(onComplete, duration) {
          if (duration === void 0) {
            duration = 0.5;
          }

          if (!this.uiOpacity) {
            if (onComplete) onComplete();
            return;
          }

          this.uiOpacity.opacity = 0;
          tween(this.uiOpacity).to(duration, {
            opacity: 255
          }).call(() => {
            if (onComplete) onComplete();
          }).start();
        }
        /**
         * 带渐变效果的场景加载
         */


        loadScene(sceneName) {
          this.fadeOut(() => {
            director.loadScene(sceneName, () => {
              this.fadeIn();
            });
          });
        }

        onDestroy() {
          if (SceneFader.instance === this) {
            SceneFader.instance = null;
          }
        }

      }, _class2.instance = null, _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f8773f37c39066f1e669860ad1c60516e354bc05.js.map