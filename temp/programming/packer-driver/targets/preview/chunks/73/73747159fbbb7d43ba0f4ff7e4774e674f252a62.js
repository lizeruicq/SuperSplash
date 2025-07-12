System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Prefab, instantiate, resources, UITransform, TempData, CameraFollow, player, AIController, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, GameSceneManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfTempData(extras) {
    _reporterNs.report("TempData", "./TempData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCameraFollow(extras) {
    _reporterNs.report("CameraFollow", "./camera_follow", _context.meta, extras);
  }

  function _reportPossibleCrUseOfplayer(extras) {
    _reporterNs.report("player", "./player", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAIController(extras) {
    _reporterNs.report("AIController", "./AIController", _context.meta, extras);
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
    }, function (_unresolved_3) {
      CameraFollow = _unresolved_3.CameraFollow;
    }, function (_unresolved_4) {
      player = _unresolved_4.player;
    }, function (_unresolved_5) {
      AIController = _unresolved_5.AIController;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b67f4UjjapGSoVG2Jvvuyl3", "GameSceneManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Prefab', 'instantiate', 'resources', 'UITransform', 'Vec3', 'Quat']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameSceneManager", GameSceneManager = (_dec = ccclass('GameSceneManager'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec(_class = (_class2 = class GameSceneManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "playGround", _descriptor, this);

          // PlayGround节点
          _initializerDefineProperty(this, "canvas", _descriptor2, this);

          // Canvas节点
          _initializerDefineProperty(this, "spawnPoint", _descriptor3, this);

          // SpawnPoint节点
          _initializerDefineProperty(this, "camera", _descriptor4, this);
        }

        // Camera节点
        start() {
          this.loadLevelAndCar();
        }

        loadLevelAndCar() {
          var levelId = (_crd && TempData === void 0 ? (_reportPossibleCrUseOfTempData({
            error: Error()
          }), TempData) : TempData).selectedLevel;
          var carId = (_crd && TempData === void 0 ? (_reportPossibleCrUseOfTempData({
            error: Error()
          }), TempData) : TempData).selectedCar;
          var mapNode = null;
          var playerNode = null; // 1. 加载并实例化场景背景

          if (levelId) {
            resources.load("prefab/levels/" + levelId, Prefab, (err, prefab) => {
              if (!err && prefab) {
                mapNode = instantiate(prefab);
                mapNode.setPosition(0, 0, 0);
                this.playGround.addChild(mapNode); // 场景预制体加载完成，通知AIController查找AI车辆

                this.notifyAIControllers(); // 2. 加载并实例化车辆

                if (carId) {
                  resources.load("prefab/cars/" + carId, Prefab, (err2, prefab2) => {
                    if (!err2 && prefab2) {
                      playerNode = instantiate(prefab2); // 随机选择一个SpawnPoint的子节点

                      var spawnChildren = this.spawnPoint.children;

                      if (spawnChildren.length > 0) {
                        var randomIndex = Math.floor(Math.random() * spawnChildren.length);
                        var spawnNode = spawnChildren[randomIndex];
                        var spawnPos = spawnNode.getWorldPosition(); // 转换为Canvas的本地坐标

                        var localPos = this.canvas.getComponent(UITransform).convertToNodeSpaceAR(spawnPos);
                        playerNode.setPosition(localPos);
                        playerNode.setRotation(spawnNode.getRotation()); // 设置初始角度

                        var playerScript = playerNode.getComponent(_crd && player === void 0 ? (_reportPossibleCrUseOfplayer({
                          error: Error()
                        }), player) : player);

                        if (playerScript) {
                          playerScript.init(spawnNode.angle);
                        } // 根据点位名称设置朝向


                        if (["point4", "point5", "point6"].indexOf(spawnNode.name) !== -1) {
                          console.log("生成车辆在右侧"); // playerNode.setRotationFromEuler(0, 0, 90);
                        }
                      }

                      this.canvas.addChild(playerNode); // 动态赋值所有AIController的playerNode

                      var aiControllers = this.node.scene.getComponentsInChildren(_crd && AIController === void 0 ? (_reportPossibleCrUseOfAIController({
                        error: Error()
                      }), AIController) : AIController); // for (const aiCtrl of aiControllers) {
                      //     aiCtrl.playerNode = playerNode;
                      // }
                      // 3. 通知相机

                      var cameraFollow = this.camera.getComponent(_crd && CameraFollow === void 0 ? (_reportPossibleCrUseOfCameraFollow({
                        error: Error()
                      }), CameraFollow) : CameraFollow);

                      if (cameraFollow && mapNode && playerNode) {
                        cameraFollow.init(mapNode, playerNode);
                      }
                    }

                    if (err2) {
                      console.error('加载车辆预制体失败:', err2, carId);
                      return;
                    }

                    if (!prefab2) {
                      console.error('未找到车辆预制体:', carId);
                      return;
                    }
                  });
                }
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
          }
        }
        /**
         * 通知所有AIController组件场景预制体已加载完成
         */


        notifyAIControllers() {
          var aiControllers = this.node.scene.getComponentsInChildren(_crd && AIController === void 0 ? (_reportPossibleCrUseOfAIController({
            error: Error()
          }), AIController) : AIController);
          console.log("\u627E\u5230 " + aiControllers.length + " \u4E2AAIController\u7EC4\u4EF6\uFF0C\u901A\u77E5\u573A\u666F\u9884\u5236\u4F53\u52A0\u8F7D\u5B8C\u6210");

          for (var aiController of aiControllers) {
            aiController.onScenePrefabLoaded();
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
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "camera", [_dec5], {
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
//# sourceMappingURL=73747159fbbb7d43ba0f4ff7e4774e674f252a62.js.map