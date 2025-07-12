System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, ProgressBar, Vec3, Camera, UITransform, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, HealthBar;

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
      ProgressBar = _cc.ProgressBar;
      Vec3 = _cc.Vec3;
      Camera = _cc.Camera;
      UITransform = _cc.UITransform;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b0909DVZ2lDs7hO45Hc5RbA", "HealthBar", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'ProgressBar', 'Label', 'Vec3', 'Camera', 'UITransform', 'view']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("HealthBar", HealthBar = (_dec = ccclass('HealthBar'), _dec2 = property(ProgressBar), _dec(_class = (_class2 = class HealthBar extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "progressBar", _descriptor, this);

          // @property(Label)
          // healthLabel: Label = null!;
          _initializerDefineProperty(this, "maxHealth", _descriptor2, this);

          _initializerDefineProperty(this, "offsetY", _descriptor3, this);

          // 血条在车辆上方的偏移距离
          _initializerDefineProperty(this, "useCameraConversion", _descriptor4, this);

          // 是否使用相机坐标转换
          this.currentHealth = 100;
          this.targetNode = null;
          this.camera = null;
          this.canvas = null;
        }

        start() {
          // 初始化血条
          this.setHealth(this.maxHealth);

          if (this.useCameraConversion) {
            // 方式1：使用相机坐标转换（推荐）
            // 为什么需要相机坐标？
            // 1. AI车辆使用世界坐标，UI血条使用屏幕坐标
            // 2. 当相机移动/旋转时，车辆在屏幕上的位置会变化
            // 3. 需要将车辆的世界坐标转换为屏幕坐标，再转换为UI坐标
            this.setupCameraConversion();
          } else {
            // 方式2：直接跟随节点（简单但有限制）
            this.setupDirectFollow();
          }
        }
        /**
         * 设置相机坐标转换模式
         */


        setupCameraConversion() {
          // 获取主相机
          this.camera = this.node.scene.getComponentInChildren(Camera);

          if (!this.camera) {
            console.error('未找到相机组件，血条可能无法正确显示');
            return;
          } // 获取Canvas节点


          this.canvas = this.node.scene.getChildByName('Canvas');

          if (!this.canvas) {
            console.error('未找到Canvas节点，血条可能无法正确显示');
            return;
          }

          console.log('血条使用相机坐标转换模式');
        }
        /**
         * 设置直接跟随模式
         */


        setupDirectFollow() {
          console.log('血条使用直接跟随模式（仅适用于固定相机）');
        }
        /**
         * 设置血条跟随的目标节点
         */


        setTarget(target) {
          this.targetNode = target;
        }
        /**
         * 设置当前生命值
         */


        setHealth(health) {
          this.currentHealth = Math.max(0, Math.min(health, this.maxHealth)); // 更新进度条

          if (this.progressBar) {
            this.progressBar.progress = this.currentHealth / this.maxHealth;
          } // // 更新文本
          // if (this.healthLabel) {
          //     this.healthLabel.string = `${this.currentHealth}/${this.maxHealth}`;
          // }

        }
        /**
         * 减少生命值
         */


        takeDamage(damage) {
          this.setHealth(this.currentHealth - damage);
        }
        /**
         * 恢复生命值
         */


        heal(amount) {
          this.setHealth(this.currentHealth + amount);
        }
        /**
         * 获取当前生命值
         */


        getHealth() {
          return this.currentHealth;
        }
        /**
         * 检查是否死亡
         */


        isDead() {
          return this.currentHealth <= 0;
        }

        update() {
          if (!this.targetNode) {
            return;
          }

          if (this.useCameraConversion) {
            this.updateWithCameraConversion();
          } else {
            this.updateWithDirectFollow();
          }
        }
        /**
         * 使用相机坐标转换更新位置（推荐方式）
         * 
         * 为什么在这种情况下仍然需要相机坐标转换？
         * 
         * 场景分析：
         * - 摄像头跟随玩家车辆移动
         * - AI车辆在游戏世界中固定位置移动
         * - 血条需要显示在AI车辆上方
         * 
         * 问题：
         * 1. 当摄像头跟随玩家移动时，AI车辆在屏幕上的显示位置会发生变化
         * 2. 虽然AI车辆的世界坐标没有改变，但它在屏幕上的投影位置改变了
         * 3. 血条是UI元素，使用屏幕坐标，需要知道AI车辆在屏幕上的实际位置
         * 
         * 举例：
         * - AI车辆世界坐标：(100, 200, 0) - 不变
         * - 玩家向右移动，摄像头跟随
         * - AI车辆在屏幕上的位置：从屏幕中心变为屏幕左侧
         * - 血条需要跟随AI车辆在屏幕上的新位置
         * 
         * 解决方案：
         * 使用相机坐标转换，将AI车辆的世界坐标转换为屏幕坐标
         */


        updateWithCameraConversion() {
          if (!this.camera || !this.canvas) {
            return;
          } // 步骤1：将AI车辆的世界坐标转换为屏幕坐标
          // 这一步是关键：即使AI车辆世界坐标不变，屏幕坐标也会因为相机移动而变化


          const worldPos = this.targetNode.worldPosition;
          const screenPos = this.camera.worldToScreen(worldPos); // 步骤2：将屏幕坐标转换为Canvas的本地坐标

          const canvasTransform = this.canvas.getComponent(UITransform);

          if (!canvasTransform) {
            return;
          }

          const localPos = canvasTransform.convertToNodeSpaceAR(new Vec3(screenPos.x, screenPos.y, 0)); // 步骤3：设置血条位置（在AI车辆上方）

          this.node.setPosition(localPos.x, localPos.y + this.offsetY, 0); // 步骤4：确保血条始终面向屏幕（不随AI车辆旋转）

          this.node.setRotationFromEuler(0, 0, 0);
        }
        /**
         * 使用直接跟随更新位置（简单方式）
         */


        updateWithDirectFollow() {
          // 直接使用目标节点的位置，加上偏移
          const targetPos = this.targetNode.worldPosition;
          this.node.setWorldPosition(targetPos.x, targetPos.y + this.offsetY, targetPos.z); // 血条不旋转

          this.node.setRotationFromEuler(0, 0, 0);
        }
        /**
         * 显示或隐藏血条
         */


        setVisible(visible) {
          this.node.active = visible;
        }
        /**
         * 销毁血条
         */


        destroyHealthBar() {
          this.node.destroy();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "progressBar", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "maxHealth", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 100;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "offsetY", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 50;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "useCameraConversion", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return true;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=352ff4d7be761f3234e0fac3149e9f48bd944991.js.map