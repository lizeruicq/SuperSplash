System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Vec3, TiledMap, TiledLayer, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, CollisionDetector;

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
      TiledMap = _cc.TiledMap;
      TiledLayer = _cc.TiledLayer;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "706446lqtBMKaQgnq25/qk6", "collision_detector", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'UITransform', 'TiledMap', 'TiledLayer']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("CollisionDetector", CollisionDetector = (_dec = ccclass('CollisionDetector'), _dec2 = property(Node), _dec(_class = (_class2 = class CollisionDetector extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "trackLayer", _descriptor, this);

          // 赛道层级节点
          _initializerDefineProperty(this, "collisionRadius", _descriptor2, this);

          // 碰撞检测半径
          this._tiledMap = null;
          this._trackLayer = null;
          this._mapWidth = 0;
          this._mapHeight = 0;
          this._tileWidth = 0;
          this._tileHeight = 0;
        }

        start() {
          this._initCollisionSystem();
        }

        _initCollisionSystem() {
          // 获取tilemap组件
          this._tiledMap = this.trackLayer.getComponent(TiledMap);

          if (!this._tiledMap) {
            console.error('Track layer does not have TiledMap component');
            return;
          } // 获取赛道层级


          this._trackLayer = this.trackLayer.getComponent(TiledLayer);

          if (!this._trackLayer) {
            console.error('Track layer does not have TiledLayer component');
            return;
          } // 获取地图信息


          const mapInfo = this._tiledMap.getMapSize();

          this._mapWidth = mapInfo.width;
          this._mapHeight = mapInfo.height;

          const tileSize = this._tiledMap.getTileSize();

          this._tileWidth = tileSize.width;
          this._tileHeight = tileSize.height;
          console.log('Collision system initialized:', {
            mapSize: `${this._mapWidth}x${this._mapHeight}`,
            tileSize: `${this._tileWidth}x${this._tileHeight}`
          });
        }
        /**
         * 检查指定位置是否在赛道上
         * @param worldPos 世界坐标
         * @returns 是否在赛道上
         */


        isOnTrack(worldPos) {
          if (!this._tiledMap || !this._trackLayer) {
            return true; // 如果没有初始化，默认允许移动
          } // 将世界坐标转换为地图坐标


          const mapPos = this._worldToMapPosition(worldPos); // 检查地图边界


          if (mapPos.x < 0 || mapPos.x >= this._mapWidth || mapPos.y < 0 || mapPos.y >= this._mapHeight) {
            return false;
          } // 获取该位置的tile


          const tileGID = this._trackLayer.getTileGIDAt(mapPos.x, mapPos.y); // 如果tileGID为0，表示没有tile（不是赛道）


          return tileGID > 0;
        }
        /**
         * 将世界坐标转换为地图坐标
         */


        _worldToMapPosition(worldPos) {
          // 获取地图节点的世界坐标
          const mapWorldPos = this.trackLayer.worldPosition; // 计算相对于地图的本地坐标

          const localX = worldPos.x - mapWorldPos.x;
          const localY = worldPos.y - mapWorldPos.y; // 考虑地图的缩放

          const mapScale = this.trackLayer.scale;
          const scaledLocalX = localX / mapScale.x;
          const scaledLocalY = localY / mapScale.y; // 转换为tile坐标

          const tileX = Math.floor(scaledLocalX / this._tileWidth);
          const tileY = Math.floor(scaledLocalY / this._tileHeight); // 注意：tilemap的Y轴是倒置的

          const mapY = this._mapHeight - 1 - tileY;
          return new Vec3(tileX, mapY, 0);
        }
        /**
         * 获取碰撞检测半径
         */


        getCollisionRadius() {
          return this.collisionRadius;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "trackLayer", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "collisionRadius", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 20;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=906fd830b0f5bc980998f9441e3195a08b45cf0f.js.map