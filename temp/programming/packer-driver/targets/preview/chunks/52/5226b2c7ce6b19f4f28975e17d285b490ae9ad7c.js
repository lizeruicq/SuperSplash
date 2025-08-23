System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, input, Input, KeyCode, Vec2, Vec3, RigidBody2D, ERigidBody2DType, Contact2DType, BoxCollider2D, Sprite, SpriteFrame, tween, Prefab, AIPlayer, GameManager, SoundManager, Bullet, WeaponType, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _crd, ccclass, property, player;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfAIPlayer(extras) {
    _reporterNs.report("AIPlayer", "./AIPlayer", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "./GameManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSoundManager(extras) {
    _reporterNs.report("SoundManager", "./SoundManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBullet(extras) {
    _reporterNs.report("Bullet", "./Bullet", _context.meta, extras);
  }

  function _reportPossibleCrUseOfWeaponType(extras) {
    _reporterNs.report("WeaponType", "./Bullet", _context.meta, extras);
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
      input = _cc.input;
      Input = _cc.Input;
      KeyCode = _cc.KeyCode;
      Vec2 = _cc.Vec2;
      Vec3 = _cc.Vec3;
      RigidBody2D = _cc.RigidBody2D;
      ERigidBody2DType = _cc.ERigidBody2DType;
      Contact2DType = _cc.Contact2DType;
      BoxCollider2D = _cc.BoxCollider2D;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
      tween = _cc.tween;
      Prefab = _cc.Prefab;
    }, function (_unresolved_2) {
      AIPlayer = _unresolved_2.AIPlayer;
    }, function (_unresolved_3) {
      GameManager = _unresolved_3.GameManager;
    }, function (_unresolved_4) {
      SoundManager = _unresolved_4.SoundManager;
    }, function (_unresolved_5) {
      Bullet = _unresolved_5.Bullet;
      WeaponType = _unresolved_5.WeaponType;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b39243E9/5JHJc2plQZwxL1", "player", undefined);

      __checkObsolete__(['_decorator', 'Component', 'input', 'Input', 'EventKeyboard', 'KeyCode', 'Vec2', 'Vec3', 'RigidBody2D', 'ERigidBody2DType', 'Contact2DType', 'IPhysics2DContact', 'BoxCollider2D', 'Sprite', 'SpriteFrame', 'tween', 'Prefab']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("player", player = (_dec = ccclass('player'), _dec2 = property(SpriteFrame), _dec3 = property(Prefab), _dec4 = property({
        type: Prefab,
        tooltip: "普通子弹预制体"
      }), _dec5 = property({
        type: Prefab,
        tooltip: "火焰预制体"
      }), _dec6 = property({
        type: Prefab,
        tooltip: "火箭弹预制体"
      }), _dec7 = property({
        tooltip: "射速（发/秒）"
      }), _dec8 = property({
        type: _crd && WeaponType === void 0 ? (_reportPossibleCrUseOfWeaponType({
          error: Error()
        }), WeaponType) : WeaponType,
        tooltip: "武器类型"
      }), _dec9 = property({
        tooltip: "最大弹药数量"
      }), _dec10 = property({
        tooltip: "弹药补充时间（秒）"
      }), _dec(_class = (_class2 = class player extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "maxSpeed", _descriptor, this);

          // 最大速度（像素/秒）
          _initializerDefineProperty(this, "acceleration", _descriptor2, this);

          // 加速度（像素/秒²）
          _initializerDefineProperty(this, "brakeDeceleration", _descriptor3, this);

          // 刹车减速度
          _initializerDefineProperty(this, "turnSpeed", _descriptor4, this);

          // 转向速度（度/秒）
          _initializerDefineProperty(this, "friction", _descriptor5, this);

          // 摩擦力系数
          _initializerDefineProperty(this, "initAngle", _descriptor6, this);

          // 初始角度（度），可由外部设置
          _initializerDefineProperty(this, "maxHealth", _descriptor7, this);

          // 最大生命值
          _initializerDefineProperty(this, "destroyedSprite", _descriptor8, this);

          // 摧毁状态的精灵图
          _initializerDefineProperty(this, "removeDelay", _descriptor9, this);

          // 摧毁后移除节点的延迟时间（秒）
          // 颜料喷洒相关属性
          _initializerDefineProperty(this, "paintPrefab", _descriptor10, this);

          // 颜料预制体
          _initializerDefineProperty(this, "paintSprayInterval", _descriptor11, this);

          // 颜料喷洒间隔（秒）
          // 武器系统相关属性
          _initializerDefineProperty(this, "normalBulletPrefab", _descriptor12, this);

          _initializerDefineProperty(this, "dartPrefab", _descriptor13, this);

          _initializerDefineProperty(this, "rocketPrefab", _descriptor14, this);

          _initializerDefineProperty(this, "fireRate", _descriptor15, this);

          _initializerDefineProperty(this, "weaponType", _descriptor16, this);

          _initializerDefineProperty(this, "maxAmmo", _descriptor17, this);

          _initializerDefineProperty(this, "ammoReloadTime", _descriptor18, this);

          this._rigidBody = null;
          this._direction = 0;
          // -1:左, 0:不转, 1:右
          this._accel = 0;
          // -1:刹车, 0:无, 1:加速
          this._angle = -90;
          // 车辆朝向角度（度）
          this._targetAngle = -90;
          // 目标角度
          this._lastValidPosition = new Vec2();
          // 上次有效位置
          // 生命值和摧毁相关
          this._currentHealth = 100;
          // 当前生命值
          this._isDestroyed = false;
          // 是否已摧毁
          this._originalSprite = null;
          // 原始精灵图
          // 颜料喷洒相关私有变量
          this._paintTimer = 0;
          // 颜料喷洒计时器
          this._vehicleId = 'player';
          // 车辆唯一ID
          // 武器系统相关私有变量
          this._canFire = true;
          // 是否可以射击
          this._fireTimer = 0;
          // 射击计时器
          this._currentAmmo = 20;
          // 当前弹药数量
          this._isReloading = false;
          // 是否正在补充弹药
          this._reloadTimer = 0;
        }

        // 弹药补充计时器
        onLoad() {
          // 确保在组件加载时初始化
          this._rigidBody = null;
          this._direction = 0;
          this._accel = 0;
          this._angle = -90;
          this._targetAngle = -90;
          this._lastValidPosition = new Vec2(); // 初始化生命值和摧毁状态

          this._currentHealth = this.maxHealth;
          this._isDestroyed = false; // 初始化颜料喷洒相关

          this._paintTimer = 0;
          this._vehicleId = 'player'; // 初始化武器系统相关

          this._canFire = true;
          this._fireTimer = 0;
          this._currentAmmo = this.maxAmmo;
          this._isReloading = false;
          this._reloadTimer = 0;
        }

        onEnable() {
          input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        }

        onDisable() {
          input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
        }

        onDestroy() {
          // 确保在组件销毁时清理所有事件监听
          input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          input.off(Input.EventType.KEY_UP, this.onKeyUp, this); // 清理刚体引用

          this._rigidBody = null; // 注销碰撞回调

          var collider = this.getComponent(BoxCollider2D);

          if (collider) {
            collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
          }
        }

        start() {
          // 获取刚体组件
          this._rigidBody = this.getComponent(RigidBody2D);

          if (!this._rigidBody || !this.node || !this.node.isValid) {
            console.error('player requires RigidBody2D component and valid node');
            return;
          } // 设置刚体属性


          this._rigidBody.type = ERigidBody2DType.Dynamic;
          this._rigidBody.allowSleep = false; // 不允许休眠

          this._rigidBody.gravityScale = 0; // 无重力

          this._rigidBody.linearDamping = 0.3; // 降低线性阻尼

          this._rigidBody.angularDamping = 0.9; // 增加角阻尼防止过度旋转

          this._rigidBody.fixedRotation = true; // 固定旋转，手动控制
          // 记录初始位置

          this._lastValidPosition = new Vec2(this.node.worldPosition.x, this.node.worldPosition.y); // 设置初始角度

          this._angle = this.initAngle;
          this._targetAngle = this.initAngle;
          this.node.setRotationFromEuler(0, 0, this.initAngle); // 保存原始精灵图

          var sprite = this.getComponent(Sprite);

          if (sprite && sprite.spriteFrame) {
            this._originalSprite = sprite.spriteFrame;
          } // 注册碰撞回调


          var collider = this.getComponent(BoxCollider2D);

          if (collider) {
            console.log('BoxCollider2D component found and registered');
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
          } else {
            console.error('BoxCollider2D component not found');
          }
        }

        onKeyDown(event) {
          switch (event.keyCode) {
            case KeyCode.ARROW_UP:
              this._accel = 1;
              break;

            case KeyCode.ARROW_DOWN:
              this._accel = -1;
              break;

            case KeyCode.ARROW_LEFT:
              (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
                error: Error()
              }), SoundManager) : SoundManager).instance.playSoundEffect('carDrift');
              this._direction = -1;
              break;

            case KeyCode.ARROW_RIGHT:
              (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
                error: Error()
              }), SoundManager) : SoundManager).instance.playSoundEffect('carDrift');
              this._direction = 1;
              break;

            case KeyCode.SPACE:
              this.shoot();
              break;
          }
        }

        onKeyUp(event) {
          switch (event.keyCode) {
            case KeyCode.ARROW_UP:
              if (this._accel === 1) this._accel = 0;
              break;

            case KeyCode.ARROW_DOWN:
              if (this._accel === -1) this._accel = 0;
              break;

            case KeyCode.ARROW_LEFT:
              if (this._direction === -1) this._direction = 0;
              break;

            case KeyCode.ARROW_RIGHT:
              if (this._direction === 1) this._direction = 0;
              break;
          }
        }

        update(deltaTime) {
          if (!this._rigidBody || !this.node || !this.node.isValid) return; // 如果车辆已摧毁，执行摧毁动画逻辑

          if (this._isDestroyed) {
            // this.updateDestroyAnimation();
            return;
          } // 获取当前速度和位置


          var currentVelocity = this._rigidBody.linearVelocity;
          var currentSpeed = currentVelocity.length();
          var currentPos = new Vec2(this.node.worldPosition.x, this.node.worldPosition.y); // 更新目标角度（转向）

          if (this._direction !== 0) {
            var turnAmount = this.turnSpeed * deltaTime * this._direction;
            this._targetAngle -= turnAmount;
          } // 平滑角度插值，防止突然转向


          var angleDiff = this._targetAngle - this._angle;

          if (Math.abs(angleDiff) > 0.1) {
            this._angle += angleDiff * 0.1; // 平滑插值
          } else {
            this._angle = this._targetAngle;
          } // 设置节点旋转


          this.node.setRotationFromEuler(0, 0, this._angle); // 前进

          if (this._accel === 1) {
            // 正常加速
            var rad = (this._angle + 90) * Math.PI / 180;
            var force = new Vec2(Math.cos(rad) * this.acceleration, Math.sin(rad) * this.acceleration);

            this._rigidBody.applyForce(force, currentPos, true);
          } // 刹车
          else if (this._accel === -1) {
            // 如果当前速度方向与车辆朝向一致，施加反向力（刹车）
            var _rad = (this._angle + 90) * Math.PI / 180;

            var forward = new Vec2(Math.cos(_rad), Math.sin(_rad));
            var dot = currentVelocity.dot(forward);

            if (dot > 0) {
              // 施加强力反向力（刹车）
              var brakeForce = forward.clone().multiplyScalar(-this.brakeDeceleration);

              this._rigidBody.applyForce(brakeForce, currentPos, true);
            } else {
              // 允许倒车
              var reverseForce = forward.clone().multiplyScalar(-this.acceleration * 0.5);

              this._rigidBody.applyForce(reverseForce, currentPos, true);
            }
          } // 松开加速/刹车键
          else {
            // 增大摩擦力，让车辆更快停下来
            if (currentSpeed > 1) {
              var frictionForce = currentVelocity.clone().multiplyScalar(-this.friction * 2); // 2倍摩擦

              this._rigidBody.applyForce(frictionForce, currentPos, true);
            }
          } // 限制最大速度


          if (currentSpeed > this.maxSpeed) {
            var normalizedVelocity = currentVelocity.clone().normalize();
            this._rigidBody.linearVelocity = normalizedVelocity.multiplyScalar(this.maxSpeed);
          } // 防止车辆卡住或异常位置


          if (currentSpeed < 0.1) {
            // 如果速度很小，重置到上次有效位置附近
            var distanceToLastPos = Vec2.distance(currentPos, this._lastValidPosition);

            if (distanceToLastPos > 50) {
              // 如果偏离太远
              this.node.setWorldPosition(this._lastValidPosition.x, this._lastValidPosition.y, this.node.worldPosition.z);
              this._rigidBody.linearVelocity = new Vec2(0, 0);
            }
          } else {
            // 更新有效位置
            this._lastValidPosition = currentPos.clone();
          } // 防止车辆旋转过度


          if (Math.abs(this._angle) > 360) {
            this._angle = this._angle % 360;
            this._targetAngle = this._targetAngle % 360;
          } // 更新颜料喷洒


          this.updatePaintSpray(deltaTime); // 更新武器系统

          this.updateWeaponSystem(deltaTime);
        }

        init(angle) {
          this.initAngle = angle;
          this._angle = angle;
          this._targetAngle = angle;
          this.node.setRotationFromEuler(0, 0, angle);
        }
        /**
         * 获取玩家车辆的刚体组件
         */


        getRigidBody() {
          return this._rigidBody;
        }
        /**
         * 玩家车辆与AI车辆碰撞时，按双方速度造成伤害
         */


        onBeginContact(_selfCollider, otherCollider, _contact) {
          console.log('玩家车辆发生碰撞，碰撞对象:', otherCollider.node.name); // 判断对方是否为AI车辆

          var otherNode = otherCollider.node;
          var aiPlayer = otherNode.getComponent(_crd && AIPlayer === void 0 ? (_reportPossibleCrUseOfAIPlayer({
            error: Error()
          }), AIPlayer) : AIPlayer);

          if (aiPlayer) {
            (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
              error: Error()
            }), SoundManager) : SoundManager).instance.playSoundEffect('carCollision');
            console.log('碰撞对象是AI车辆:', otherNode.name); // 获取双方速度

            var mySpeed = this._rigidBody.linearVelocity.length();

            var aiRigidBody = aiPlayer.node.getComponent(RigidBody2D);
            var aiSpeed = aiRigidBody ? aiRigidBody.linearVelocity.length() : 0; // 伤害计算：对方受到我速度*系数的伤害，我受到对方速度*系数的伤害

            var damageFactor = 0.5; // 可调节

            var aiDamage = Math.round(mySpeed * damageFactor);
            var playerDamage = Math.round(aiSpeed * damageFactor); // 造成伤害

            aiPlayer.takeDamage(aiDamage); // 施加反作用力

            var recoilForce = new Vec2(this._rigidBody.linearVelocity.x, this._rigidBody.linearVelocity.y);
            recoilForce.normalize(); // 归一化方向

            recoilForce.multiplyScalar(-mySpeed * 0.05); // 根据速度大小施加反作用力

            this._rigidBody.linearVelocity = recoilForce;
            this.takeDamage(playerDamage);
          } // 判断对方是否为子弹
          else {
            var bullet = otherNode.getComponent(_crd && Bullet === void 0 ? (_reportPossibleCrUseOfBullet({
              error: Error()
            }), Bullet) : Bullet);

            if (bullet) {
              // 检查是否为自己发射的子弹
              if (bullet['_shooterId'] === 'player') {
                // 自己发射的子弹不造成伤害和反作用力
                console.log('玩家与自己发射的子弹碰撞，不造成伤害和反作用力');
                return;
              } else {
                (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
                  error: Error()
                }), SoundManager) : SoundManager).instance.playSoundEffect('carCollision'); // 其他子弹造成伤害

                var bulletDamage = bullet['damage'] || 5; // this.takeDamage(bulletDamage);
                // 施加反作用力（只有非普通子弹才施加物理推力）
                // 火焰子弹(FLAME)已被注释，所以只检查是否为普通子弹

                if (bullet['bulletType'] === 0) {
                  // 0是NORMAL类型
                  var _recoilForce = new Vec2(this._rigidBody.linearVelocity.x, this._rigidBody.linearVelocity.y);

                  _recoilForce.normalize();

                  _recoilForce.multiplyScalar(-bulletDamage * 0.5); // 根据子弹伤害施加反作用力


                  this._rigidBody.linearVelocity = _recoilForce;
                }

                console.log('玩家被子弹击中，造成伤害:', bulletDamage);
              }
            } // 检测与地图边界的碰撞
            else {
              (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
                error: Error()
              }), SoundManager) : SoundManager).instance.playSoundEffect('carCollision');

              var _mySpeed = this._rigidBody.linearVelocity.length();

              var _damageFactor = 0.3; // 地图边界碰撞的伤害系数

              var boundaryDamage = Math.round(_mySpeed * _damageFactor); // 施加反作用力

              var _recoilForce2 = new Vec2(this._rigidBody.linearVelocity.x, this._rigidBody.linearVelocity.y);

              _recoilForce2.normalize(); // 归一化方向


              _recoilForce2.multiplyScalar(-_mySpeed * 0.05); // 根据速度大小施加反作用力


              this._rigidBody.linearVelocity = _recoilForce2;
              this.takeDamage(boundaryDamage);
            }
          }
        } // ==================== 生命值和摧毁系统 ====================

        /**
         * 受到伤害
         */


        takeDamage(damage) {
          if (this._isDestroyed) return;
          this._currentHealth = Math.max(0, this._currentHealth - damage);
          console.log("\u73A9\u5BB6\u53D7\u5230\u4F24\u5BB3: " + damage + ", \u5269\u4F59\u751F\u547D\u503C: " + this._currentHealth); // 同步GameManager中的玩家血量显示

          var gameManager = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance();

          if (gameManager) {
            gameManager.syncPlayerHealth();
          } // 检查是否死亡


          if (this._currentHealth <= 0) {
            this.destroyVehicle();
          }
        }
        /**
         * 摧毁车辆
         */


        destroyVehicle() {
          if (this._isDestroyed) return;
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).instance.playSoundEffect('carDestruction');
          this._isDestroyed = true;
          console.log('玩家车辆被摧毁！'); // 切换到摧毁状态的精灵图

          if (this.destroyedSprite) {
            var sprite = this.getComponent(Sprite);

            if (sprite) {
              sprite.spriteFrame = this.destroyedSprite;
            }
          } // 禁用输入控制


          this.disableInput(); // 开始摧毁动画，并在动画完成后触发游戏结束

          this.startDestroyAnimation(); // 延迟移除节点（可选，通常玩家车辆不移除）
          // this.scheduleRemoveNode();
        }
        /**
         * 禁用输入控制
         */


        disableInput() {
          input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          input.off(Input.EventType.KEY_UP, this.onKeyUp, this); // 重置控制状态

          this._direction = 0;
          this._accel = 0;
        }
        /**
         * 移除车辆节点（可选功能，通常玩家车辆不使用）
         */


        removeVehicleNode() {
          if (this.node && this.node.isValid) {
            console.log('移除玩家车辆节点');
            this.node.removeFromParent();
          }
        }
        /**
         * 开始摧毁动画
         */


        startDestroyAnimation() {
          // 使用缓动动画让车辆逐渐停止并可能添加一些视觉效果
          if (this.node) {
            // 可以添加旋转、缩放等效果
            tween(this.node).to(2.0, {
              scale: new Vec3(1, 1, 1),
              // 稍微缩小
              angle: this.node.angle + 180 // 旋转180度

            }).call(() => {
              // 动画完成后触发游戏结束
              this.onDestroyAnimationComplete();
            }).start();
          }
        }
        /**
         * 摧毁动画完成回调
         */


        onDestroyAnimationComplete() {
          console.log('玩家车辆摧毁动画完成，触发游戏结束');
          var gameManager = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance();

          if (gameManager) {
            gameManager.gameOver(false); // false表示玩家失败
          }
        } // ==================== 公共方法 ====================

        /**
         * 获取当前生命值
         */


        getCurrentHealth() {
          return this._currentHealth;
        }
        /**
         * 获取最大生命值
         */


        getMaxHealth() {
          return this.maxHealth;
        }
        /**
         * 是否已摧毁
         */


        isDestroyed() {
          return this._isDestroyed;
        }
        /**
         * 恢复车辆（用于重新开始游戏）
         */


        restoreVehicle() {
          // 取消移除节点的计划
          this.unschedule(this.removeVehicleNode);
          this._isDestroyed = false;
          this._currentHealth = this.maxHealth; // 恢复原始精灵图

          if (this._originalSprite) {
            var sprite = this.getComponent(Sprite);

            if (sprite) {
              sprite.spriteFrame = this._originalSprite;
            }
          } // 重新启用输入


          this.onEnable(); // 恢复节点状态

          if (this.node) {
            this.node.setScale(1, 1);
            this.node.angle = this.initAngle;
          } // 重置速度


          if (this._rigidBody) {
            this._rigidBody.linearVelocity = new Vec2(0, 0);
          }

          console.log('玩家车辆已恢复');
        } // ==================== 颜料喷洒系统 ====================

        /**
         * 更新颜料喷洒
         * @param deltaTime 帧时间间隔
         */


        updatePaintSpray(deltaTime) {
          if (this._isDestroyed || !this.paintPrefab) return; // 更新计时器

          this._paintTimer += deltaTime; // 检查是否到了喷洒时间

          if (this._paintTimer >= this.paintSprayInterval) {
            this.sprayPaint();
            this._paintTimer = 0; // 重置计时器
          }
        }
        /**
         * 喷洒颜料
         */


        sprayPaint() {
          var gameManager = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance();

          if (!gameManager) {
            console.warn('GameManager未找到，无法喷洒颜料');
            return;
          } // 获取当前车辆的世界位置


          var worldPosition = this.node.getWorldPosition(); // 通过GameManager喷洒颜料

          gameManager.sprayPaint(this.paintPrefab, worldPosition, this._vehicleId);
        } // ==================== 武器系统 ====================

        /**
         * 更新武器系统
         * @param deltaTime 帧时间间隔
         */


        updateWeaponSystem(deltaTime) {
          if (this._isDestroyed) return; // 更新射击计时器

          this._fireTimer += deltaTime; // 检查是否可以射击

          var fireInterval = 1 / this.fireRate;

          if (this._fireTimer >= fireInterval) {
            this._canFire = true;
          } // 更新弹药补充


          this.updateAmmoReload(deltaTime);
        }
        /**
         * 更新弹药补充
         * @param deltaTime 帧时间间隔
         */


        updateAmmoReload(deltaTime) {
          if (!this._isReloading) return;
          this._reloadTimer += deltaTime;

          if (this._reloadTimer >= this.ammoReloadTime) {
            // 补充完成
            this._currentAmmo = this.maxAmmo;
            this._isReloading = false;
            this._reloadTimer = 0;
            console.log('弹药补充完成！');
          }
        }
        /**
         * 射击方法
         */


        shoot() {
          if (!this._canFire || this._isDestroyed) return; // 检查弹药

          if (this._currentAmmo <= 0) {
            if (!this._isReloading) {
              this.startReload();
            }

            return;
          } // 重置射击状态


          this._canFire = false;
          this._fireTimer = 0;
          this._currentAmmo--; // 根据武器类型选择子弹预制体

          var bulletPrefab = null;

          switch (this.weaponType) {
            case (_crd && WeaponType === void 0 ? (_reportPossibleCrUseOfWeaponType({
              error: Error()
            }), WeaponType) : WeaponType).NORMAL:
              console.log('发射普通子弹');
              bulletPrefab = this.normalBulletPrefab;
              break;

            case (_crd && WeaponType === void 0 ? (_reportPossibleCrUseOfWeaponType({
              error: Error()
            }), WeaponType) : WeaponType).DART:
              bulletPrefab = this.dartPrefab;
              break;

            case (_crd && WeaponType === void 0 ? (_reportPossibleCrUseOfWeaponType({
              error: Error()
            }), WeaponType) : WeaponType).ROCKET:
              bulletPrefab = this.rocketPrefab;
              break;
          } // 检查预制体是否存在


          if (!bulletPrefab) {
            console.warn('子弹预制体未设置'); // 允许重新射击

            this._canFire = true;
            return;
          } // 获取当前车辆的朝向


          var rad = (this._angle + 90) * Math.PI / 180;
          var direction = new Vec2(Math.cos(rad), Math.sin(rad)); // 计算子弹发射位置（车辆正前方）

          var vehicleWorldPos = this.node.worldPosition;
          var offsetDistance = 50; // 子弹发射偏移距离（像素）

          var bulletStartPos = new Vec3(vehicleWorldPos.x + direction.x * offsetDistance, vehicleWorldPos.y + direction.y * offsetDistance, vehicleWorldPos.z); // 获取GameManager实例并发射子弹

          var gameManager = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance();

          if (gameManager) {
            gameManager.fireBullet(bulletPrefab, bulletStartPos, direction, this._vehicleId, this.weaponType);
          } // 播放射击音效


          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).instance.playSoundEffect('weaponFire'); // 检查是否需要开始补充弹药

          if (this._currentAmmo <= 0 && !this._isReloading) {
            this.startReload();
          }
        }
        /**
         * 开始补充弹药
         */


        startReload() {
          this._isReloading = true;
          this._reloadTimer = 0;
          console.log('开始补充弹药...');
        }
        /**
         * 获取当前弹药数量
         */


        getCurrentAmmo() {
          return this._currentAmmo;
        }
        /**
         * 获取最大弹药数量
         */


        getMaxAmmo() {
          return this.maxAmmo;
        }
        /**
         * 是否正在补充弹药
         */


        isReloading() {
          return this._isReloading;
        }
        /**
         * 获取弹药补充进度（0-1）
         */


        getReloadProgress() {
          if (!this._isReloading) return 1;
          return this._reloadTimer / this.ammoReloadTime;
        } // ==================== 外部控制接口 ====================

        /**
         * 设置加速度（外部控制接口）
         * @param accel 加速度值：1为前进，-1为后退，0为停止
         */


        setAcceleration(accel) {
          console.log("Player: \u8BBE\u7F6E\u52A0\u901F\u5EA6\u4E3A " + accel);
          this._accel = accel;
        }
        /**
         * 设置转向（外部控制接口）
         * @param direction 转向值：1为右转，-1为左转，0为直行
         */


        setDirection(direction) {
          console.log("Player: \u8BBE\u7F6E\u8F6C\u5411\u4E3A " + direction); // 如果开始转向，播放漂移音效

          if (direction !== 0 && this._direction === 0) {
            (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
              error: Error()
            }), SoundManager) : SoundManager).instance.playSoundEffect('carDrift');
          }

          this._direction = direction;
        }
        /**
         * 获取当前加速度状态
         */


        getAcceleration() {
          return this._accel;
        }
        /**
         * 获取当前转向状态
         */


        getDirection() {
          return this._direction;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "maxSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 50;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "acceleration", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 50;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "brakeDeceleration", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 200;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "turnSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 200;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "friction", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.5;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "initAngle", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "maxHealth", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 200;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "destroyedSprite", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "removeDelay", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 3.0;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "paintPrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "paintSprayInterval", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.2;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "normalBulletPrefab", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "dartPrefab", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "rocketPrefab", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "fireRate", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2.0;
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "weaponType", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return (_crd && WeaponType === void 0 ? (_reportPossibleCrUseOfWeaponType({
            error: Error()
          }), WeaponType) : WeaponType).NORMAL;
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "maxAmmo", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 20;
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "ammoReloadTime", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10.0;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5226b2c7ce6b19f4f28975e17d285b490ae9ad7c.js.map