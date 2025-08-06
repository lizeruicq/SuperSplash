System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, input, Input, KeyCode, Vec2, Vec3, RigidBody2D, ERigidBody2DType, Contact2DType, BoxCollider2D, Sprite, SpriteFrame, tween, Prefab, AIPlayer, GameManager, SoundManager, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _crd, ccclass, property, player;

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
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b39243E9/5JHJc2plQZwxL1", "player", undefined);

      __checkObsolete__(['_decorator', 'Component', 'input', 'Input', 'EventKeyboard', 'KeyCode', 'Vec2', 'Vec3', 'RigidBody2D', 'ERigidBody2DType', 'Contact2DType', 'IPhysics2DContact', 'BoxCollider2D', 'Sprite', 'SpriteFrame', 'tween', 'Prefab']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("player", player = (_dec = ccclass('player'), _dec2 = property(SpriteFrame), _dec3 = property(Prefab), _dec(_class = (_class2 = class player extends Component {
        constructor(...args) {
          super(...args);

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
        }

        // 车辆唯一ID
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
          this._vehicleId = 'player';
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

          const collider = this.getComponent(BoxCollider2D);

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

          const sprite = this.getComponent(Sprite);

          if (sprite && sprite.spriteFrame) {
            this._originalSprite = sprite.spriteFrame;
          } // 注册碰撞回调


          const collider = this.getComponent(BoxCollider2D);

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


          const currentVelocity = this._rigidBody.linearVelocity;
          const currentSpeed = currentVelocity.length();
          const currentPos = new Vec2(this.node.worldPosition.x, this.node.worldPosition.y); // 更新目标角度（转向）

          if (this._direction !== 0) {
            const turnAmount = this.turnSpeed * deltaTime * this._direction;
            this._targetAngle -= turnAmount;
          } // 平滑角度插值，防止突然转向


          const angleDiff = this._targetAngle - this._angle;

          if (Math.abs(angleDiff) > 0.1) {
            this._angle += angleDiff * 0.1; // 平滑插值
          } else {
            this._angle = this._targetAngle;
          } // 设置节点旋转


          this.node.setRotationFromEuler(0, 0, this._angle); // 前进

          if (this._accel === 1) {
            // 正常加速
            const rad = (this._angle + 90) * Math.PI / 180;
            const force = new Vec2(Math.cos(rad) * this.acceleration, Math.sin(rad) * this.acceleration);

            this._rigidBody.applyForce(force, currentPos, true);
          } // 刹车
          else if (this._accel === -1) {
            // 如果当前速度方向与车辆朝向一致，施加反向力（刹车）
            const rad = (this._angle + 90) * Math.PI / 180;
            const forward = new Vec2(Math.cos(rad), Math.sin(rad));
            const dot = currentVelocity.dot(forward);

            if (dot > 0) {
              // 施加强力反向力（刹车）
              const brakeForce = forward.clone().multiplyScalar(-this.brakeDeceleration);

              this._rigidBody.applyForce(brakeForce, currentPos, true);
            } else {
              // 允许倒车
              const reverseForce = forward.clone().multiplyScalar(-this.acceleration * 0.5);

              this._rigidBody.applyForce(reverseForce, currentPos, true);
            }
          } // 松开加速/刹车键
          else {
            // 增大摩擦力，让车辆更快停下来
            if (currentSpeed > 1) {
              const frictionForce = currentVelocity.clone().multiplyScalar(-this.friction * 2); // 2倍摩擦

              this._rigidBody.applyForce(frictionForce, currentPos, true);
            }
          } // 限制最大速度


          if (currentSpeed > this.maxSpeed) {
            const normalizedVelocity = currentVelocity.clone().normalize();
            this._rigidBody.linearVelocity = normalizedVelocity.multiplyScalar(this.maxSpeed);
          } // 防止车辆卡住或异常位置


          if (currentSpeed < 0.1) {
            // 如果速度很小，重置到上次有效位置附近
            const distanceToLastPos = Vec2.distance(currentPos, this._lastValidPosition);

            if (distanceToLastPos > 50) {
              // 如果偏离太远
              this.node.setWorldPosition(this._lastValidPosition.x, this._lastValidPosition.y, this.node.worldPosition.z);
              this._rigidBody.linearVelocity = Vec2.ZERO;
            }
          } else {
            // 更新有效位置
            this._lastValidPosition = currentPos.clone();
          } // 防止车辆旋转过度


          if (Math.abs(this._angle) > 360) {
            this._angle = this._angle % 360;
            this._targetAngle = this._targetAngle % 360;
          } // 更新颜料喷洒


          this.updatePaintSpray(deltaTime);
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
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).instance.playSoundEffect('carCollision');
          console.log('玩家车辆发生碰撞，碰撞对象:', otherCollider.node.name); // 判断对方是否为AI车辆

          const otherNode = otherCollider.node;
          const aiPlayer = otherNode.getComponent(_crd && AIPlayer === void 0 ? (_reportPossibleCrUseOfAIPlayer({
            error: Error()
          }), AIPlayer) : AIPlayer);

          if (aiPlayer) {
            console.log('碰撞对象是AI车辆:', otherNode.name); // 获取双方速度

            const mySpeed = this._rigidBody.linearVelocity.length();

            const aiRigidBody = aiPlayer.node.getComponent(RigidBody2D);
            const aiSpeed = aiRigidBody ? aiRigidBody.linearVelocity.length() : 0; // 伤害计算：对方受到我速度*系数的伤害，我受到对方速度*系数的伤害

            const damageFactor = 0.5; // 可调节

            const aiDamage = Math.round(mySpeed * damageFactor);
            const playerDamage = Math.round(aiSpeed * damageFactor); // 造成伤害

            aiPlayer.takeDamage(aiDamage); // 施加反作用力

            const recoilForce = new Vec2(this._rigidBody.linearVelocity.x, this._rigidBody.linearVelocity.y);
            recoilForce.normalize(); // 归一化方向

            recoilForce.multiplyScalar(-mySpeed * 0.05); // 根据速度大小施加反作用力

            this._rigidBody.linearVelocity = recoilForce;
            this.takeDamage(playerDamage);
          } // 检测与地图边界的碰撞
          else {
            const mySpeed = this._rigidBody.linearVelocity.length();

            const damageFactor = 0.3; // 地图边界碰撞的伤害系数

            const boundaryDamage = Math.round(mySpeed * damageFactor);
            console.log(`玩家车辆与地图边界碰撞，速度: ${mySpeed}, 伤害: ${boundaryDamage}`); // 施加反作用力

            const recoilForce = new Vec2(this._rigidBody.linearVelocity.x, this._rigidBody.linearVelocity.y);
            recoilForce.normalize(); // 归一化方向

            recoilForce.multiplyScalar(-mySpeed * 0.05); // 根据速度大小施加反作用力

            this._rigidBody.linearVelocity = recoilForce;
            this.takeDamage(boundaryDamage);
          }
        } // ==================== 生命值和摧毁系统 ====================

        /**
         * 受到伤害
         */


        takeDamage(damage) {
          if (this._isDestroyed) return;
          this._currentHealth = Math.max(0, this._currentHealth - damage);
          console.log(`玩家受到伤害: ${damage}, 剩余生命值: ${this._currentHealth}`); // 同步GameManager中的玩家血量显示

          const gameManager = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
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
            const sprite = this.getComponent(Sprite);

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
          const gameManager = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
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
            const sprite = this.getComponent(Sprite);

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
            this._rigidBody.linearVelocity = Vec2.ZERO;
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
          const gameManager = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance();

          if (!gameManager) {
            console.warn('GameManager未找到，无法喷洒颜料');
            return;
          } // 获取当前车辆的世界位置


          const worldPosition = this.node.getWorldPosition(); // 通过GameManager喷洒颜料

          gameManager.sprayPaint(this.paintPrefab, worldPosition, this._vehicleId);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "maxSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 50;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "acceleration", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 50;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "brakeDeceleration", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 200;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "turnSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 200;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "friction", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1.5;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "initAngle", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "maxHealth", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 200;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "destroyedSprite", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "removeDelay", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 3.0;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "paintPrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "paintSprayInterval", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.2;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=43ffc2180738b118a8d4d533f2af70ab9b24d0aa.js.map