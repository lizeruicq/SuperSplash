System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Prefab, instantiate, resources, UITransform, TempData, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, GameSceneLoader;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfTempData(extras) {
    _reporterNs.report("TempData", "./TempData", _context.meta, extras);
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
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      resources = _cc.resources;
      UITransform = _cc.UITransform;
    }, function (_unresolved_2) {
      TempData = _unresolved_2.TempData;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b67f4UjjapGSoVG2Jvvuyl3", "GameSceneLoader", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Prefab', 'instantiate', 'resources', 'UITransform', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameSceneLoader", GameSceneLoader = (_dec = ccclass('GameSceneLoader'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = class GameSceneLoader extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "playGround", _descriptor, this);

          // PlayGround节点
          _initializerDefineProperty(this, "canvas", _descriptor2, this);

          // Canvas节点
          _initializerDefineProperty(this, "spawnPoint", _descriptor3, this);
        }

        // SpawnPoint节点
        start() {
          this.loadLevelAndCar();
        }

        loadLevelAndCar() {
          // 1. 加载并实例化场景背景
          var levelId = (_crd && TempData === void 0 ? (_reportPossibleCrUseOfTempData({
            error: Error()
          }), TempData) : TempData).selectedLevel;

          if (levelId) {
            resources.load("prefab/levels/" + levelId, Prefab, (err, prefab) => {
              if (!err && prefab) {
                var bgNode = instantiate(prefab);
                bgNode.setPosition(0, 0, 0);
                this.playGround.addChild(bgNode);
              }

              if (err) {
                console.error('加载关卡预制体失败:', err, levelId);
                return;
              }

              if (!prefab) {
                console.error('未找到关卡预制体:', levelId);
                return;
              }
            });
          } // 2. 加载并实例化车辆


          var carId = (_crd && TempData === void 0 ? (_reportPossibleCrUseOfTempData({
            error: Error()
          }), TempData) : TempData).selectedCar;

          if (carId) {
            resources.load("prefab/cars/" + carId, Prefab, (err, prefab) => {
              if (!err && prefab) {
                var carNode = instantiate(prefab); // 随机选择一个SpawnPoint的子节点

                var spawnChildren = this.spawnPoint.children;

                if (spawnChildren.length > 0) {
                  var randomIndex = Math.floor(Math.random() * spawnChildren.length);
                  var spawnPos = spawnChildren[randomIndex].getWorldPosition(); // 转换为Canvas的本地坐标

                  var localPos = this.canvas.getComponent(UITransform).convertToNodeSpaceAR(spawnPos);
                  carNode.setPosition(localPos);
                } else {
                  carNode.setPosition(0, 0, 0);
                }

                this.canvas.addChild(carNode);
              }

              if (err) {
                console.error('加载车辆预制体失败:', err, levelId);
                return;
              }

              if (!prefab) {
                console.error('未找到车辆预制体:', levelId);
                return;
              }
            });
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "playGround", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "canvas", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "spawnPoint", [_dec4], {
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
//# sourceMappingURL=a2085a306541897bb8fb36a74f4e56329cf83f57.js.map