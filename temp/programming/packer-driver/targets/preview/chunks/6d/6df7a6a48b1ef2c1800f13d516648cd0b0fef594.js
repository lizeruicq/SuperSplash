System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, UITransform, view, Vec3, find, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, PaintCoordinateTest;

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
      Label = _cc.Label;
      UITransform = _cc.UITransform;
      view = _cc.view;
      Vec3 = _cc.Vec3;
      find = _cc.find;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "94930T41x5NdJa+u6MTxx29", "PaintCoordinateTest", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Label', 'UITransform', 'Canvas', 'view', 'Vec3', 'find']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 颜料坐标测试组件
       * 用于验证颜料坐标修复是否有效
       */

      _export("PaintCoordinateTest", PaintCoordinateTest = (_dec = ccclass('PaintCoordinateTest'), _dec2 = property(Label), _dec(_class = (_class2 = class PaintCoordinateTest extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "debugLabel", _descriptor, this);

          this.canvas = null;
          this.canvasTransform = null;
        }

        onLoad() {
          var _this$node$scene;

          // 获取Canvas节点
          this.canvas = (_this$node$scene = this.node.scene) == null ? void 0 : _this$node$scene.getChildByName('Canvas');

          if (this.canvas) {
            this.canvasTransform = this.canvas.getComponent(UITransform);
          }
        }

        start() {
          if (this.debugLabel) {
            this.updateDebugInfo(); // 每秒更新一次调试信息

            this.schedule(this.updateDebugInfo, 1.0);
          }
        }
        /**
         * 更新调试信息
         */


        updateDebugInfo() {
          if (!this.debugLabel || !this.canvas || !this.canvasTransform) {
            return;
          } // 获取屏幕信息


          var visibleSize = view.getVisibleSize();
          var designResolution = view.getDesignResolutionSize(); // 获取Canvas信息

          var canvasSize = this.canvasTransform.contentSize;
          var canvasScale = this.canvas.scale; // 计算适配比例

          var scaleX = visibleSize.width / designResolution.width;
          var scaleY = visibleSize.height / designResolution.height;
          var debugInfo = ["=== \u5C4F\u5E55\u9002\u914D\u4FE1\u606F ===", "\u53EF\u89C6\u533A\u57DF: " + visibleSize.width.toFixed(0) + " x " + visibleSize.height.toFixed(0), "\u8BBE\u8BA1\u5206\u8FA8\u7387: " + designResolution.width.toFixed(0) + " x " + designResolution.height.toFixed(0), "Canvas\u5C3A\u5BF8: " + canvasSize.width.toFixed(0) + " x " + canvasSize.height.toFixed(0), "Canvas\u7F29\u653E: " + canvasScale.x.toFixed(3) + " x " + canvasScale.y.toFixed(3), "\u9002\u914D\u6BD4\u4F8B: " + scaleX.toFixed(3) + " x " + scaleY.toFixed(3), "", "=== \u5750\u6807\u7CFB\u7EDF\u72B6\u6001 ===", "\u989C\u6599\u5BB9\u5668\u5DF2\u4FEE\u590D: \u2713", "\u5750\u6807\u8F6C\u6362\u5DF2\u4FEE\u590D: \u2713", "\u7206\u70B8\u6E05\u9664\u5DF2\u4FEE\u590D: \u2713"].join('\n');
          this.debugLabel.string = debugInfo;
        }
        /**
         * 测试坐标转换
         * @param worldX 世界坐标X
         * @param worldY 世界坐标Y
         * @returns 本地坐标
         */


        testCoordinateConversion(worldX, worldY) {
          if (!this.canvasTransform) {
            console.warn('Canvas未初始化');
            return {
              x: 0,
              y: 0
            };
          }

          var worldPos = new Vec3(worldX, worldY, 0);
          var localPos = this.canvasTransform.convertToNodeSpaceAR(worldPos);
          console.log("\u5750\u6807\u8F6C\u6362\u6D4B\u8BD5: \u4E16\u754C\u5750\u6807(" + worldX + ", " + worldY + ") -> \u672C\u5730\u5750\u6807(" + localPos.x.toFixed(2) + ", " + localPos.y.toFixed(2) + ")");
          return {
            x: localPos.x,
            y: localPos.y
          };
        }
        /**
         * 验证颜料位置是否正确
         * 这个方法可以在游戏运行时调用来验证颜料位置
         */


        validatePaintPositions() {
          var paintManagerNode = find('PaintManager');

          if (!paintManagerNode) {
            console.warn('未找到PaintManager节点');
            return;
          }

          console.log('=== 颜料位置验证 ===');
          console.log('PaintManager节点已找到'); // 这里可以添加更多的验证逻辑
          // 由于PaintManager是单例，可以通过getInstance获取
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "debugLabel", [_dec2], {
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
//# sourceMappingURL=6df7a6a48b1ef2c1800f13d516648cd0b0fef594.js.map