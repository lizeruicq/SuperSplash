System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Vec3, Camera, view, UITransform, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, CameraFollow;

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
      Node = _cc.Node;
      Vec3 = _cc.Vec3;
      Camera = _cc.Camera;
      view = _cc.view;
      UITransform = _cc.UITransform;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "daf21OCa1hMm660rOlgyMop", "camera_follow", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'Camera', 'view', 'UITransform']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("CameraFollow", CameraFollow = (_dec = ccclass('CameraFollow'), _dec2 = property(Node), _dec(_class = (_class2 = class CameraFollow extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "target", _descriptor, this);

          // 需要跟随的目标节点
          _initializerDefineProperty(this, "smooth", _descriptor2, this);

          // 跟随平滑度，0为瞬间跟随，越大越慢
          this._tempPos = new Vec3();
          this._mapWidth = 0;
          this._mapHeight = 0;
        }

        onLoad() {
          // 确保在组件加载时初始化
          this._tempPos = new Vec3();
          this._mapWidth = 0;
          this._mapHeight = 0;
        }

        onDestroy() {
          // 确保在组件销毁时清理引用
          this.target = null;
          this._tempPos = null;
        } // start() {
        //     if (!this.node || !this.node.isValid) return;
        //     // 自动检测地图尺寸
        //     this._detectMapSize();
        //     this._updateCameraPosition(0, true);
        // }


        _detectMapSize() {
          if (!this.node || !this.node.parent) return; // 方法1：通过 Map 节点检测

          var mapNode = this.node.parent.children.find(child => child.name === 'PlayGround');

          if (mapNode) {
            var uiTransform = mapNode.getComponentInChildren(UITransform);

            if (uiTransform) {
              this._mapWidth = uiTransform.contentSize.width * mapNode.scale.x;
              this._mapHeight = uiTransform.contentSize.height * mapNode.scale.y;
            }
          } // 如果没检测到，使用默认值


          if (this._mapWidth === 0 || this._mapHeight === 0) {
            console.log("没有检测到地图尺寸");
            this._mapWidth = 2160;
            this._mapHeight = 1440;
          }
        }

        update(deltaTime) {
          if (!this.node || !this.node.isValid) return;

          this._updateCameraPosition(deltaTime, false);
        }

        _clampToMapBounds(x, y, visibleWidth, visibleHeight) {
          if (!this.node || !this.node.parent) return [x, y]; // Canvas世界坐标

          var canvasWorldX = this.node.parent.worldPosition.x;
          var canvasWorldY = this.node.parent.worldPosition.y; // 地图中心为canvas中心

          var mapLeft = canvasWorldX - this._mapWidth / 2;
          var mapRight = canvasWorldX + this._mapWidth / 2;
          var mapBottom = canvasWorldY - this._mapHeight / 2;
          var mapTop = canvasWorldY + this._mapHeight / 2; // 计算摄像机中心允许的移动范围
          // 确保摄像机可视范围不超出地图边界

          var minX = mapLeft + visibleWidth / 2;
          var maxX = mapRight - visibleWidth / 2;
          var minY = mapBottom + visibleHeight / 2;
          var maxY = mapTop - visibleHeight / 2;
          var cx = x,
              cy = y; // 如果地图比可视范围小，摄像机居中

          if (minX > maxX) {
            cx = canvasWorldX;
          } else {
            // 限制摄像机位置，确保不显示地图外的黑边
            if (x < minX) {
              cx = minX;
            } else if (x > maxX) {
              cx = maxX;
            } else {
              cx = x;
            }
          }

          if (minY > maxY) {
            cy = canvasWorldY;
          } else {
            // 限制摄像机位置，确保不显示地图外的黑边
            if (y < minY) {
              cy = minY;
            } else if (y > maxY) {
              cy = maxY;
            } else {
              cy = y;
            }
          }

          return [cx, cy];
        }

        _updateCameraPosition(deltaTime, instant) {
          if (!this.target || !this.node || !this.node.isValid) return;
          this.target.getWorldPosition(this._tempPos);
          var camera = this.getComponent(Camera);
          if (!camera) return; // 获取设备实际宽高比

          var deviceAspect = view.getVisibleSize().width / view.getVisibleSize().height; // 正确的可视范围计算方法
          // orthoHeight就是摄像机可视范围的完整高度

          var visibleHeight = camera.orthoHeight;
          var visibleWidth = visibleHeight * deviceAspect; // 使用正确的可视范围

          var usedVisibleWidth = visibleWidth;
          var usedVisibleHeight = visibleHeight; // clamp摄像机中心，保证可视范围始终在地图内

          var [centerX, centerY] = this._clampToMapBounds(this._tempPos.x, this._tempPos.y, usedVisibleWidth, usedVisibleHeight);

          var camPos = this.node.worldPosition;

          if (instant) {
            this.node.setWorldPosition(centerX, centerY, camPos.z);
          } else {
            this.node.setWorldPosition(camPos.x + (centerX - camPos.x) * (1 - Math.pow(1 - this.smooth, deltaTime * 60)), camPos.y + (centerY - camPos.y) * (1 - Math.pow(1 - this.smooth, deltaTime * 60)), camPos.z);
          }
        }

        init(mapNode, playerNode) {
          this.target = playerNode;

          if (mapNode) {
            var uiTransform = mapNode.getComponent(UITransform);

            if (uiTransform) {
              this._mapWidth = uiTransform.contentSize.width * mapNode.scale.x;
              this._mapHeight = uiTransform.contentSize.height * mapNode.scale.y;
            }
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "smooth", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.15;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=60f6ecf5cc17c1da6598d7f9202a78b81dc8873a.js.map