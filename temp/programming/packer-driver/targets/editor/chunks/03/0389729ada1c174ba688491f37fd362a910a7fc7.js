System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Sprite, _dec, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, PaintSpot;

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
      Sprite = _cc.Sprite;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e9c7fJf5G9M8ZAl2uR3FDyp", "PaintSpot", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Sprite']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 颜料斑点组件
       * 用于表示车辆喷洒的颜料
       */

      _export("PaintSpot", PaintSpot = (_dec = ccclass('PaintSpot'), _dec(_class = (_class2 = class PaintSpot extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "fadeTime", _descriptor, this);

          // 颜料淡化时间（秒）
          _initializerDefineProperty(this, "enableFade", _descriptor2, this);

          // 是否启用淡化效果
          this.sprite = null;
          this.originalAlpha = 1.0;
          this.creationTime = 0;
        }

        onLoad() {
          this.sprite = this.getComponent(Sprite);

          if (this.sprite) {
            this.originalAlpha = this.sprite.color.a / 255;
          }

          this.creationTime = Date.now();
        }

        start() {
          // 可以在这里添加颜料出现的动画效果
          this.playSpawnAnimation();
        }

        update(_deltaTime) {// if (this.enableFade && this.sprite) {
          //     this.updateFadeEffect();
          // }
        }
        /**
         * 播放生成动画
         */


        playSpawnAnimation() {
          // 简单的缩放动画
          if (this.node) {
            this.node.setScale(0.1, 0.1, 1); // 使用tween动画放大到正常大小
            // 注意：这里需要导入tween相关模块，暂时用简单的方式

            this.scheduleOnce(() => {
              if (this.node && this.node.isValid) {
                this.node.setScale(1, 1, 1);
              }
            }, 0.1);
          }
        }
        /**
         * 更新淡化效果
         */
        // private updateFadeEffect(): void {
        //     const currentTime = Date.now();
        //     const elapsedTime = (currentTime - this.creationTime) / 1000; // 转换为秒
        //     if (elapsedTime >= this.fadeTime) {
        //         // 时间到了，销毁颜料
        //         this.node.destroy();
        //         return;
        //     }
        //     // 计算淡化程度
        //     const fadeProgress = elapsedTime / this.fadeTime;
        //     const currentAlpha = this.originalAlpha * (1 - fadeProgress);
        //     // 应用淡化效果
        //     const currentColor = this.sprite.color.clone();
        //     currentColor.a = Math.max(0, currentAlpha * 255);
        //     this.sprite.color = currentColor;
        // }


      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "fadeTime", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 30.0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "enableFade", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0389729ada1c174ba688491f37fd362a910a7fc7.js.map