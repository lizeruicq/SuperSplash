System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec2, RigidBody2D, Contact2DType, Collider2D, Enum, instantiate, Prefab, tween, Vec3, player, AIPlayer, SoundManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _crd, ccclass, property, WeaponType, BulletType, Bullet;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfplayer(extras) {
    _reporterNs.report("player", "./player", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAIPlayer(extras) {
    _reporterNs.report("AIPlayer", "./AIPlayer", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSoundManager(extras) {
    _reporterNs.report("SoundManager", "./SoundManager", _context.meta, extras);
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
      Vec2 = _cc.Vec2;
      RigidBody2D = _cc.RigidBody2D;
      Contact2DType = _cc.Contact2DType;
      Collider2D = _cc.Collider2D;
      Enum = _cc.Enum;
      instantiate = _cc.instantiate;
      Prefab = _cc.Prefab;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      player = _unresolved_2.player;
    }, function (_unresolved_3) {
      AIPlayer = _unresolved_3.AIPlayer;
    }, function (_unresolved_4) {
      SoundManager = _unresolved_4.SoundManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "91ffczWtpJKh6L+Ua3qo7Ip", "Bullet", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Vec2', 'RigidBody2D', 'Contact2DType', 'IPhysics2DContact', 'Collider2D', 'Enum', 'instantiate', 'Prefab', 'tween', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator); // 定义武器类型枚举

      _export("WeaponType", WeaponType = /*#__PURE__*/function (WeaponType) {
        WeaponType[WeaponType["NORMAL"] = 0] = "NORMAL";
        WeaponType[WeaponType["FLAME"] = 1] = "FLAME";
        WeaponType[WeaponType["ROCKET"] = 2] = "ROCKET";
        return WeaponType;
      }({})); // 定义子弹类型枚举


      _export("BulletType", BulletType = /*#__PURE__*/function (BulletType) {
        BulletType[BulletType["NORMAL"] = 0] = "NORMAL";
        BulletType[BulletType["FLAME"] = 1] = "FLAME";
        BulletType[BulletType["ROCKET"] = 2] = "ROCKET";
        return BulletType;
      }({})); // 将枚举注册到Cocos Creator中


      Enum(WeaponType);
      Enum(BulletType);

      _export("Bullet", Bullet = (_dec = ccclass('Bullet'), _dec2 = property({
        type: BulletType,
        tooltip: "子弹类型"
      }), _dec3 = property({
        tooltip: "子弹存活时间（秒）"
      }), _dec4 = property({
        type: Prefab,
        tooltip: "爆炸效果预制体（火箭弹专用）"
      }), _dec5 = property({
        tooltip: "爆炸范围（火箭弹专用）"
      }), _dec6 = property({
        tooltip: "火焰持续时间（火焰专用）"
      }), _dec(_class = (_class2 = class Bullet extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "speed", _descriptor, this);

          // 子弹速度
          _initializerDefineProperty(this, "damage", _descriptor2, this);

          // 伤害值
          _initializerDefineProperty(this, "bulletType", _descriptor3, this);

          _initializerDefineProperty(this, "lifeTime", _descriptor4, this);

          _initializerDefineProperty(this, "explosionPrefab", _descriptor5, this);

          _initializerDefineProperty(this, "explosionRadius", _descriptor6, this);

          _initializerDefineProperty(this, "flameDuration", _descriptor7, this);

          this._shooterId = '';
          // 发射者ID
          this._rigidBody = null;
          this._direction = new Vec2(0, 1);
          // 默认向上
          this._velocity = new Vec2(0, 0);
          this._timer = 0;
        }

        onLoad() {
          this._rigidBody = this.getComponent(RigidBody2D);

          if (!this._rigidBody) {
            console.error('Bullet: RigidBody2D组件未找到');
          } // 注册碰撞回调


          var collider = this.getComponent(Collider2D);

          if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
          }
        }

        start() {// // 根据子弹类型调整属性
          // this.adjustBulletProperties();
        }

        update(deltaTime) {
          this._timer += deltaTime; // 检查是否超过存活时间

          if (this._timer >= this.lifeTime) {
            this.destroyBullet();
            return;
          } // 更新位置


          if (this._rigidBody) {
            this._velocity.set(this._direction.x * this.speed, this._direction.y * this.speed);

            this._rigidBody.linearVelocity = this._velocity;
          }
        }
        /**
         * 初始化子弹
         * @param direction 子弹方向
         * @param shooterId 发射者ID
         */


        init(direction, shooterId) {
          this._direction = direction.normalize();
          this._shooterId = shooterId; // 设置初始旋转角度

          var angle = Math.atan2(direction.y, direction.x) * 180 / Math.PI;
          this.node.setRotationFromEuler(0, 0, angle - 90);
        }
        /**
         * 碰撞回调
         */


        onBeginContact(selfCollider, otherCollider, contact) {
          var otherNode = otherCollider.node; // 不与发射者碰撞

          var otherVehicleId = this.getVehicleId(otherNode);

          if (otherVehicleId === this._shooterId) {
            return;
          } // 检查是否碰撞到车辆


          var playerComponent = otherNode.getComponent(_crd && player === void 0 ? (_reportPossibleCrUseOfplayer({
            error: Error()
          }), player) : player);
          var aiPlayerComponent = otherNode.getComponent(_crd && AIPlayer === void 0 ? (_reportPossibleCrUseOfAIPlayer({
            error: Error()
          }), AIPlayer) : AIPlayer);

          if (playerComponent || aiPlayerComponent) {
            this.handleVehicleHit(otherNode, playerComponent, aiPlayerComponent);
          } else {
            // 碰撞到其他物体（如墙壁）
            this.handleObstacleHit();
          }
        }
        /**
         * 处理车辆碰撞
         */


        handleVehicleHit(vehicleNode, playerComponent, aiPlayerComponent) {
          switch (this.bulletType) {
            case BulletType.NORMAL:
              this.handleNormalBulletHit(playerComponent, aiPlayerComponent);
              break;

            case BulletType.FLAME:
              this.handleFlameHit(vehicleNode, playerComponent, aiPlayerComponent);
              break;

            case BulletType.ROCKET:
              this.handleRocketHit(vehicleNode);
              break;
          } // 播放音效


          this.playHitSound(); // 销毁子弹

          this.destroyBullet();
        }
        /**
         * 处理普通子弹碰撞
         */


        handleNormalBulletHit(playerComponent, aiPlayerComponent) {
          if (playerComponent) {
            playerComponent.takeDamage(this.damage);
          } else if (aiPlayerComponent) {
            aiPlayerComponent.takeDamage(this.damage);
          }
        }
        /**
         * 处理火焰碰撞
         */


        handleFlameHit(vehicleNode, playerComponent, aiPlayerComponent) {
          // 火焰造成持续伤害
          var damagePerTick = this.damage / 5; // 分5次造成伤害

          var tickInterval = this.flameDuration / 5;

          for (var i = 0; i < 5; i++) {
            this.scheduleOnce(() => {
              if (vehicleNode && vehicleNode.isValid) {
                if (playerComponent && playerComponent.isValid) {
                  playerComponent.takeDamage(damagePerTick);
                } else if (aiPlayerComponent && aiPlayerComponent.isValid) {
                  aiPlayerComponent.takeDamage(damagePerTick);
                }
              }
            }, tickInterval * i);
          }
        }
        /**
         * 处理火箭弹碰撞
         */


        handleRocketHit(hitVehicleNode) {
          // 创建爆炸效果
          if (this.explosionPrefab) {
            var _this$node$parent;

            var explosion = instantiate(this.explosionPrefab);
            explosion.setWorldPosition(this.node.worldPosition);
            (_this$node$parent = this.node.parent) == null || _this$node$parent.addChild(explosion); // 爆炸动画

            tween(explosion).to(0.5, {
              scale: new Vec3(2, 2, 1)
            }).call(() => {
              if (explosion && explosion.isValid) {
                explosion.destroy();
              }
            }).start();
          } // 范围伤害


          this.dealExplosionDamage();
        }
        /**
         * 处理爆炸范围伤害
         */


        dealExplosionDamage() {
          // 获取场景中所有车辆
          var allVehicles = this.getAllVehiclesInRange();
          allVehicles.forEach(vehicle => {
            var distance = Vec2.distance(new Vec2(this.node.worldPosition.x, this.node.worldPosition.y), new Vec2(vehicle.node.worldPosition.x, vehicle.node.worldPosition.y));

            if (distance <= this.explosionRadius) {
              // 根据距离计算伤害衰减
              var damageRatio = 1 - distance / this.explosionRadius;
              var actualDamage = this.damage * damageRatio;
              vehicle.takeDamage(actualDamage);
            }
          });
        }
        /**
         * 获取范围内的所有车辆
         */


        getAllVehiclesInRange() {
          var _this$node$scene, _this$node$scene2;

          var vehicles = []; // 查找所有玩家车辆

          var playerNodes = ((_this$node$scene = this.node.scene) == null ? void 0 : _this$node$scene.getComponentsInChildren(_crd && player === void 0 ? (_reportPossibleCrUseOfplayer({
            error: Error()
          }), player) : player)) || [];
          playerNodes.forEach(p => {
            if (this.getVehicleId(p.node) !== this._shooterId) {
              vehicles.push(p);
            }
          }); // 查找所有AI车辆

          var aiNodes = ((_this$node$scene2 = this.node.scene) == null ? void 0 : _this$node$scene2.getComponentsInChildren(_crd && AIPlayer === void 0 ? (_reportPossibleCrUseOfAIPlayer({
            error: Error()
          }), AIPlayer) : AIPlayer)) || [];
          aiNodes.forEach(ai => {
            if (this.getVehicleId(ai.node) !== this._shooterId) {
              vehicles.push(ai);
            }
          });
          return vehicles;
        }
        /**
         * 处理障碍物碰撞
         */


        handleObstacleHit() {
          if (this.bulletType === BulletType.ROCKET) {
            // 火箭弹碰撞障碍物也会爆炸
            this.handleRocketHit(null);
          }
        }
        /**
         * 根据子弹类型调整属性
         */
        // private adjustBulletProperties() {
        //     switch (this.bulletType) {
        //         case BulletType.NORMAL:
        //             this.speed = 400;
        //             this.lifeTime = 3.0;
        //             break;
        //         case BulletType.FLAME:
        //             this.speed = 200;
        //             this.lifeTime = 1.5;
        //             break;
        //         case BulletType.ROCKET:
        //             this.speed = 300;
        //             this.lifeTime = 4.0;
        //             break;
        //     }
        // }

        /**
         * 获取车辆ID
         */


        getVehicleId(vehicleNode) {
          var playerComp = vehicleNode.getComponent(_crd && player === void 0 ? (_reportPossibleCrUseOfplayer({
            error: Error()
          }), player) : player);
          var aiComp = vehicleNode.getComponent(_crd && AIPlayer === void 0 ? (_reportPossibleCrUseOfAIPlayer({
            error: Error()
          }), AIPlayer) : AIPlayer);

          if (playerComp) {
            return 'player';
          } else if (aiComp) {
            return aiComp.getVehicleId ? aiComp.getVehicleId() : 'ai_unknown';
          }

          return 'unknown';
        }
        /**
         * 播放碰撞音效
         */


        playHitSound() {
          switch (this.bulletType) {
            case BulletType.NORMAL:
              (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
                error: Error()
              }), SoundManager) : SoundManager).instance.playSoundEffect('bulletHit');
              break;

            case BulletType.FLAME:
              (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
                error: Error()
              }), SoundManager) : SoundManager).instance.playSoundEffect('flameHit');
              break;

            case BulletType.ROCKET:
              (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
                error: Error()
              }), SoundManager) : SoundManager).instance.playSoundEffect('explosion');
              break;
          }
        }
        /**
         * 销毁子弹
         */


        destroyBullet() {
          if (this.node && this.node.isValid) {
            this.node.destroy();
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "speed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 50;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "damage", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "bulletType", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return BulletType.NORMAL;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lifeTime", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 3.0;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "explosionPrefab", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "explosionRadius", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "flameDuration", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.0;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d90bd5f660cca2468e55c522be6e08ed7db4093d.js.map