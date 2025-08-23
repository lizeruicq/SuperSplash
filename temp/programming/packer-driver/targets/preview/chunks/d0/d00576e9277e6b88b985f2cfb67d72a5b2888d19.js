System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, instantiate, Vec2, Vec3, Layers, UITransform, _dec, _class, _class2, _descriptor, _class3, _crd, ccclass, property, PaintManager;

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
      instantiate = _cc.instantiate;
      Vec2 = _cc.Vec2;
      Vec3 = _cc.Vec3;
      Layers = _cc.Layers;
      UITransform = _cc.UITransform;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7dd7aydfZBHRbtWPJmh00Xf", "PaintManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Prefab', 'instantiate', 'Vec2', 'Vec3', 'Layers', 'UITransform', 'Canvas', 'view']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 颜料数据接口
       */

      /**
       * 颜料管理器
       * 负责管理游戏中所有车辆喷洒的颜料
       */
      _export("PaintManager", PaintManager = (_dec = ccclass('PaintManager'), _dec(_class = (_class2 = (_class3 = class PaintManager extends Component {
        constructor() {
          super(...arguments);
          // 存储所有颜料的数据
          this.paintMap = new Map();

          // 颜料覆盖检测的距离阈值（像素）
          _initializerDefineProperty(this, "coverageRadius", _descriptor, this);

          // 颜料容器节点
          this.paintContainer = null;
        }

        static getInstance() {
          return PaintManager._instance;
        }

        onLoad() {
          if (PaintManager._instance) {
            console.log("销毁原有PaintManager单例");
            this.node.destroy();
            return;
          }

          PaintManager._instance = this; // 创建颜料容器节点，保持在PaintManager节点下

          this.paintContainer = new Node('PaintContainer'); // 设置容器节点的层级为UI_2D，确保颜料固定在游戏世界坐标中

          this.paintContainer.layer = Layers.Enum.UI_2D; // 将颜料容器添加到PaintManager节点下，保持项目层次结构

          this.node.addChild(this.paintContainer);
          console.log('PaintManager初始化完成');
        }

        onDestroy() {
          if (PaintManager._instance === this) {
            PaintManager._instance = null;
            console.log("PaintManager实例已销毁");
          }
        }
        /**
         * 添加颜料
         * @param paintPrefab 颜料预制体
         * @param worldPosition 世界坐标位置
         * @param ownerId 拥有者ID
         */


        addPaint(paintPrefab, worldPosition, ownerId) {
          if (!paintPrefab || !this.paintContainer) {
            console.warn('PaintManager: 颜料预制体或容器为空');
            return;
          } // 将世界坐标转换为paintContainer的本地坐标
          // 这样可以保持节点层次结构，同时确保坐标正确


          var paintContainerTransform = this.paintContainer.getComponent(UITransform);

          if (!paintContainerTransform) {
            // 如果paintContainer没有UITransform，添加一个
            var uiTransform = this.paintContainer.addComponent(UITransform);
            uiTransform.setContentSize(1280, 720); // 设置为设计分辨率大小
          } // 转换世界坐标到paintContainer的本地坐标


          var localPosition = this.paintContainer.getComponent(UITransform).convertToNodeSpaceAR(worldPosition);
          var position2D = new Vec2(localPosition.x, localPosition.y); // 检查是否在同一拥有者的颜料附近，如果是则不喷洒

          if (this.isNearOwnPaint(position2D, ownerId)) {
            // console.log(`跳过颜料喷洒: 拥有者=${ownerId}, 位置附近已有自己的颜料`);
            return;
          } // 检查是否需要覆盖其他拥有者的颜料


          this.checkAndRemoveOverlappingPaint(position2D, ownerId); // 创建新颜料节点

          var paintNode = instantiate(paintPrefab); // 设置颜料节点的本地位置（相对于paintContainer）

          paintNode.setPosition(localPosition); // 设置颜料节点的层级为UI_2D，确保它固定在游戏世界坐标中

          paintNode.layer = Layers.Enum.UI_2D;
          this.paintContainer.addChild(paintNode); // 生成唯一ID

          var paintId = this.generatePaintId(position2D, ownerId); // 存储颜料数据（使用本地坐标）

          var paintData = {
            node: paintNode,
            position: position2D,
            ownerId: ownerId,
            timestamp: Date.now()
          };
          this.paintMap.set(paintId, paintData); // console.log(`添加颜料: 拥有者=${ownerId}, 位置=(${position2D.x.toFixed(1)}, ${position2D.y.toFixed(1)})`);
        }
        /**
         * 检查并移除重叠的颜料
         * @param newPosition 新颜料位置
         * @param newOwnerId 新颜料拥有者ID
         */


        checkAndRemoveOverlappingPaint(newPosition, newOwnerId) {
          var toRemove = [];
          this.paintMap.forEach((paintData, paintId) => {
            var distance = Vec2.distance(paintData.position, newPosition); // 如果距离小于覆盖半径，且不是同一个拥有者，则移除旧颜料

            if (distance < this.coverageRadius && paintData.ownerId !== newOwnerId) {
              toRemove.push(paintId);
            }
          }); // 移除重叠的颜料

          toRemove.forEach(paintId => {
            this.removePaint(paintId);
          });

          if (toRemove.length > 0) {// console.log(`移除了 ${toRemove.length} 个重叠的颜料`);
          }
        }
        /**
         * 移除指定的颜料
         * @param paintId 颜料ID
         */


        removePaint(paintId) {
          var paintData = this.paintMap.get(paintId);

          if (paintData) {
            // 销毁节点
            if (paintData.node && paintData.node.isValid) {
              paintData.node.destroy();
            } // 从映射中移除


            this.paintMap.delete(paintId);
          }
        }
        /**
         * 公开方法：移除指定的颜料（供外部调用）
         * @param paintId 颜料ID
         */


        removePaintById(paintId) {
          this.removePaint(paintId);
        }
        /**
         * 检查指定位置是否在同一拥有者的颜料附近
         * @param position 要检查的位置
         * @param ownerId 拥有者ID
         * @returns 如果附近有同一拥有者的颜料则返回true
         */


        isNearOwnPaint(position, ownerId) {
          for (var paintData of this.paintMap.values()) {
            // 只检查同一拥有者的颜料
            if (paintData.ownerId === ownerId) {
              var distance = Vec2.distance(paintData.position, position); // 如果距离小于覆盖半径，说明附近已有自己的颜料

              if (distance < this.coverageRadius) {
                return true;
              }
            }
          }

          return false;
        }
        /**
         * 生成颜料唯一ID
         * @param position 位置
         * @param ownerId 拥有者ID
         * @returns 唯一ID
         */


        generatePaintId(position, ownerId) {
          var timestamp = Date.now();
          return "paint_" + ownerId + "_" + position.x.toFixed(0) + "_" + position.y.toFixed(0) + "_" + timestamp;
        }
        /**
         * 清除所有颜料
         */


        clearAllPaint() {
          this.paintMap.forEach(paintData => {
            if (paintData.node && paintData.node.isValid) {
              paintData.node.destroy();
            }
          });
          this.paintMap.clear();
          console.log('清除了所有颜料');
        }
        /**
         * 获取指定拥有者的颜料数量
         * @param ownerId 拥有者ID
         * @returns 颜料数量
         */


        getPaintCountByOwner(ownerId) {
          var count = 0;
          this.paintMap.forEach(paintData => {
            if (paintData.ownerId === ownerId) {
              count++;
            }
          });
          return count;
        }
        /**
         * 获取总颜料数量
         * @returns 总数量
         */


        getTotalPaintCount() {
          return this.paintMap.size;
        }
        /**
         * 获取指定拥有者的颜料占比
         * @param ownerId 拥有者ID
         * @returns 占比（0-1之间的小数）
         */


        getPaintRatioByOwner(ownerId) {
          var totalCount = this.getTotalPaintCount();

          if (totalCount === 0) {
            return 0;
          }

          var ownerCount = this.getPaintCountByOwner(ownerId);
          return ownerCount / totalCount;
        }
        /**
         * 获取所有车辆的颜料占比
         * @returns 包含每个车辆ID和其占比的对象
         */


        getAllPaintRatios() {
          var ratios = {};
          var totalCount = this.getTotalPaintCount();

          if (totalCount === 0) {
            return ratios;
          } // 统计每个拥有者的颜料数量


          var ownerCounts = {};
          this.paintMap.forEach(paintData => {
            var ownerId = paintData.ownerId;
            ownerCounts[ownerId] = (ownerCounts[ownerId] || 0) + 1;
          }); // 计算占比

          for (var _ownerId in ownerCounts) {
            ratios[_ownerId] = ownerCounts[_ownerId] / totalCount;
          }

          return ratios;
        }
        /**
         * 获取排序后的颜料占比（从高到低）
         * @returns 按占比排序的数组，每个元素包含ownerId和ratio
         */


        getSortedPaintRatios() {
          var ratios = this.getAllPaintRatios();
          var result = [];

          for (var _ownerId2 in ratios) {
            result.push({
              ownerId: _ownerId2,
              ratio: ratios[_ownerId2],
              count: this.getPaintCountByOwner(_ownerId2)
            });
          } // 按占比从高到低排序


          result.sort((a, b) => b.ratio - a.ratio);
          return result;
        }
        /**
         * 清除指定范围内的颜料
         * @param center 爆炸中心位置（世界坐标）
         * @param radius 爆炸半径
         * @returns 被清除的颜料数量
         */


        clearPaintInRange(center, radius) {
          if (!this.paintContainer) {
            console.warn('PaintManager: 颜料容器未初始化');
            return 0;
          }

          var paintContainerTransform = this.paintContainer.getComponent(UITransform);

          if (!paintContainerTransform) {
            console.warn('PaintManager: 颜料容器缺少UITransform组件');
            return 0;
          } // 将世界坐标转换为paintContainer本地坐标


          var worldPos = new Vec3(center.x, center.y, 0);
          var localCenter = paintContainerTransform.convertToNodeSpaceAR(worldPos);
          var localCenter2D = new Vec2(localCenter.x, localCenter.y);
          var toRemove = [];
          this.paintMap.forEach((paintData, paintId) => {
            var distance = Vec2.distance(paintData.position, localCenter2D); // 如果颜料在爆炸范围内，则标记为需要移除

            if (distance <= radius) {
              toRemove.push(paintId);
            }
          }); // 移除范围内的颜料

          toRemove.forEach(paintId => {
            this.removePaint(paintId); // 使用现有的私有方法
          });
          console.log("\u6E05\u9664\u4E86 " + toRemove.length + " \u4E2A\u8303\u56F4\u5185\u7684\u989C\u6599");
          return toRemove.length;
        }

      }, _class3._instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "coverageRadius", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 30;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d00576e9277e6b88b985f2cfb67d72a5b2888d19.js.map