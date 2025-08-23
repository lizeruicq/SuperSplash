System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, ProgressBar, tween, CarProperties, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, CarPropertyDisplay;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfCarProperties(extras) {
    _reporterNs.report("CarProperties", "./CarProperties", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCarProperty(extras) {
    _reporterNs.report("CarProperty", "./CarProperties", _context.meta, extras);
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
      ProgressBar = _cc.ProgressBar;
      tween = _cc.tween;
    }, function (_unresolved_2) {
      CarProperties = _unresolved_2.CarProperties;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "add91PL8SRFs5KSXc8GbptH", "CarPropertyDisplay", undefined);

      __checkObsolete__(['_decorator', 'Component', 'ProgressBar', 'tween']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 车辆属性显示组件
       * 负责在UI中显示车辆的速度、转向、坚硬度属性
       */

      _export("CarPropertyDisplay", CarPropertyDisplay = (_dec = ccclass('CarPropertyDisplay'), _dec2 = property({
        type: ProgressBar,
        tooltip: '速度进度条'
      }), _dec3 = property({
        type: ProgressBar,
        tooltip: '转向进度条'
      }), _dec4 = property({
        type: ProgressBar,
        tooltip: '坚硬度进度条'
      }), _dec5 = property({
        tooltip: '是否启用动画效果'
      }), _dec6 = property({
        tooltip: '动画持续时间（秒）'
      }), _dec(_class = (_class2 = class CarPropertyDisplay extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "speedProgressBar", _descriptor, this);

          _initializerDefineProperty(this, "steeringProgressBar", _descriptor2, this);

          _initializerDefineProperty(this, "durabilityProgressBar", _descriptor3, this);

          _initializerDefineProperty(this, "enableAnimation", _descriptor4, this);

          _initializerDefineProperty(this, "animationDuration", _descriptor5, this);
        }

        onLoad() {
          // 自动查找进度条（如果没有手动设置）
          this.autoFindProgressBars(); // // 初始化时隐藏所有内容
          // this.hideAllProperties();
        }
        /**
         * 自动查找进度条组件
         */


        autoFindProgressBars() {
          if (!this.speedProgressBar) {
            const speedNode = this.node.getChildByName('speed') || this.node.getChildByName('Speed');

            if (speedNode) {
              this.speedProgressBar = speedNode.getComponent(ProgressBar);
            }
          }

          if (!this.steeringProgressBar) {
            const steeringNode = this.node.getChildByName('turn') || this.node.getChildByName('turn');

            if (steeringNode) {
              this.steeringProgressBar = steeringNode.getComponent(ProgressBar);
            }
          }

          if (!this.durabilityProgressBar) {
            const durabilityNode = this.node.getChildByName('tough') || this.node.getChildByName('tough');

            if (durabilityNode) {
              this.durabilityProgressBar = durabilityNode.getComponent(ProgressBar);
            }
          }
        }
        /**
         * 显示指定车辆的属性
         * @param carId 车辆ID
         */


        showCarProperties(carId) {
          const carProperty = (_crd && CarProperties === void 0 ? (_reportPossibleCrUseOfCarProperties({
            error: Error()
          }), CarProperties) : CarProperties).getCarProperty(carId);

          if (!carProperty) {
            console.warn(`未找到车辆 ${carId} 的属性配置`); // this.hideAllProperties();

            return;
          }

          this.updatePropertyDisplay(carProperty); // 显示属性面板

          this.node.active = true;
        }
        /**
         * 隐藏所有属性
         */


        hideAllProperties() {
          this.node.active = false;
        }
        /**
         * 更新属性显示
         * @param property 车辆属性
         */


        updatePropertyDisplay(property) {
          // 更新速度
          if (this.speedProgressBar) {
            this.updateProgressBar(this.speedProgressBar, property.speed);
          } // 更新转向


          if (this.steeringProgressBar) {
            this.updateProgressBar(this.steeringProgressBar, property.steering);
          } // 更新坚硬度


          if (this.durabilityProgressBar) {
            this.updateProgressBar(this.durabilityProgressBar, property.durability);
          }
        }
        /**
         * 更新进度条
         * @param progressBar 进度条组件
         * @param value 数值 (0-100)
         */


        updateProgressBar(progressBar, value) {
          const targetProgress = value / 100; // 转换为0-1范围

          if (this.enableAnimation) {
            // 使用动画效果
            tween(progressBar).to(this.animationDuration, {
              progress: targetProgress
            }).start();
          } else {
            // 直接设置
            progressBar.progress = targetProgress;
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "speedProgressBar", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "steeringProgressBar", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "durabilityProgressBar", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "enableAnimation", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return true;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "animationDuration", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.5;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=90df3cbac4939c24c528c1e36504a3db0c6ac7df.js.map