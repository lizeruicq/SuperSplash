System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, _dec, _class, _class2, _descriptor, _crd, ccclass, property, HealthBarUI;

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
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "79d6fgSlVRCYoTh/XQ+YRv5", "HealthBarUI", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("HealthBarUI", HealthBarUI = (_dec = ccclass('HealthBarUI'), _dec(_class = (_class2 = class HealthBarUI extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "offsetY", _descriptor, this);

          // 血条在车辆上方的偏移距离
          this.targetNode = null;
          // 目标AI车辆节点
          this.canvas = null;
          // Canvas节点
          this.isInitialized = false;
        }

        // private _progress: number = 1.0; // 当前进度（0-1）
        start() {
          this.setupCanvas();
          this.targetNode = this.node.parent;
          this.separateFromParent();
          console.log('血条UI初始化完成');
        }
        /**
         * 获取当前进度
         */
        // public get progress(): number {
        //     return this.progress;
        // }
        // /**
        //  * 设置当前进度（0-1）
        //  */
        // public set progress(value: number) {
        //     this.progress = Math.max(0, Math.min(1, value));
        // }

        /**
         * 设置Canvas引用
         */


        setupCanvas() {
          this.canvas = this.node.scene.getChildByName('Canvas');

          if (!this.canvas) {
            console.error('未找到Canvas节点，血条可能无法正确显示');
            return;
          }
        }
        /**
         * 将血条从父节点中分离，移动到Canvas下
         */


        separateFromParent() {
          if (!this.canvas || !this.targetNode) return; // 记录当前世界位置

          var currentWorldPos = this.node.worldPosition; // 将血条移动到Canvas下

          this.node.setParent(this.canvas); // 保持世界位置不变

          this.node.setWorldPosition(currentWorldPos);
          this.isInitialized = true;
          console.log('血条已分离到Canvas下');
        }

        update() {
          if (!this.isInitialized || !this.targetNode || !this.canvas) {
            return;
          }

          this.updatePosition();
        }
        /**
         * 更新血条位置
         * 血条现在是Canvas的子节点，完全独立于AI车辆
         */


        updatePosition() {
          // 获取AI车辆的世界位置
          var targetWorldPos = this.targetNode.worldPosition; // 设置血条位置（在AI车辆上方）

          this.node.setWorldPosition(targetWorldPos.x, targetWorldPos.y + this.offsetY, targetWorldPos.z); // 确保血条始终面向屏幕（不随AI车辆旋转）

          this.node.setRotationFromEuler(0, 0, 0);
        }
        /**
         * 设置血条在车辆上方的偏移距离
         */


        setOffsetY(offset) {
          this.offsetY = offset;
        }
        /**
         * 显示或隐藏血条
         */


        setVisible(visible) {
          this.node.active = visible;
        }
        /**
         * 获取当前偏移距离
         */


        getOffsetY() {
          return this.offsetY;
        }
        /**
         * 设置目标节点
         */


        setTarget(target) {
          this.targetNode = target;
        }
        /**
         * 销毁血条
         */


        destroyHealthBar() {
          this.node.destroy();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "offsetY", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 50;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c898d39bda182a050a3f8669e8a79c303cd86325.js.map