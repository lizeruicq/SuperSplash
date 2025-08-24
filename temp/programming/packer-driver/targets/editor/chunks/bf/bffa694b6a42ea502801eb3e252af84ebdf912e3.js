System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec2, Vec3, RigidBody2D, ERigidBody2DType, BoxCollider2D, Contact2DType, ProgressBar, Sprite, SpriteFrame, tween, Prefab, Layers, find, player, GameManager, AIController, WeaponType, SoundManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _crd, ccclass, property, AIPlayer;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfplayer(extras) {
    _reporterNs.report("player", "./player", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "./GameManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAIController(extras) {
    _reporterNs.report("AIController", "./AIController", _context.meta, extras);
  }

  function _reportPossibleCrUseOfWeaponType(extras) {
    _reporterNs.report("WeaponType", "./Bullet", _context.meta, extras);
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
      Vec3 = _cc.Vec3;
      RigidBody2D = _cc.RigidBody2D;
      ERigidBody2DType = _cc.ERigidBody2DType;
      BoxCollider2D = _cc.BoxCollider2D;
      Contact2DType = _cc.Contact2DType;
      ProgressBar = _cc.ProgressBar;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
      tween = _cc.tween;
      Prefab = _cc.Prefab;
      Layers = _cc.Layers;
      find = _cc.find;
    }, function (_unresolved_2) {
      player = _unresolved_2.player;
    }, function (_unresolved_3) {
      GameManager = _unresolved_3.GameManager;
    }, function (_unresolved_4) {
      AIController = _unresolved_4.AIController;
    }, function (_unresolved_5) {
      WeaponType = _unresolved_5.WeaponType;
    }, function (_unresolved_6) {
      SoundManager = _unresolved_6.SoundManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "91c082Rgh1HBbV2vKQl2J1W", "AIPlayer", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Vec2', 'Vec3', 'RigidBody2D', 'ERigidBody2DType', 'BoxCollider2D', 'Contact2DType', 'ProgressBar', 'Sprite', 'SpriteFrame', 'tween', 'Prefab', 'Layers', 'find']); // 添加AIController导入


      // 导入武器类型枚举
      ({
        ccclass,
        property
      } = _decorator);

      _export("AIPlayer", AIPlayer = (_dec = ccclass('AIPlayer'), _dec2 = property(ProgressBar), _dec3 = property(SpriteFrame), _dec4 = property(Prefab), _dec5 = property({
        type: Prefab,
        tooltip: "普通子弹预制体"
      }), _dec6 = property({
        type: Prefab,
        tooltip: "飞镖预制体"
      }), _dec7 = property({
        type: Prefab,
        tooltip: "火箭弹预制体"
      }), _dec8 = property({
        tooltip: "射速（发/秒）"
      }), _dec9 = property({
        type: _crd && WeaponType === void 0 ? (_reportPossibleCrUseOfWeaponType({
          error: Error()
        }), WeaponType) : WeaponType,
        tooltip: "武器类型"
      }), _dec(_class = (_class2 = class AIPlayer extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "maxSpeed", _descriptor, this);

          _initializerDefineProperty(this, "acceleration", _descriptor2, this);

          _initializerDefineProperty(this, "brakeDeceleration", _descriptor3, this);

          _initializerDefineProperty(this, "turnSpeed", _descriptor4, this);

          _initializerDefineProperty(this, "friction", _descriptor5, this);

          _initializerDefineProperty(this, "initAngle", _descriptor6, this);

          _initializerDefineProperty(this, "maxHealth", _descriptor7, this);

          // 最大生命值
          _initializerDefineProperty(this, "healthBar", _descriptor8, this);

          // 血条UI组件
          _initializerDefineProperty(this, "destroyedSprite", _descriptor9, this);

          // 摧毁状态的精灵图
          _initializerDefineProperty(this, "removeDelay", _descriptor10, this);

          // 摧毁后移除节点的延迟时间（秒）
          // 颜料喷洒相关属性
          _initializerDefineProperty(this, "paintPrefab", _descriptor11, this);

          // 颜料预制体
          _initializerDefineProperty(this, "paintSprayInterval", _descriptor12, this);

          // 颜料喷洒间隔（秒）
          // 武器系统相关属性
          _initializerDefineProperty(this, "normalBulletPrefab", _descriptor13, this);

          _initializerDefineProperty(this, "dartPrefab", _descriptor14, this);

          _initializerDefineProperty(this, "rocketPrefab", _descriptor15, this);

          _initializerDefineProperty(this, "fireRate", _descriptor16, this);

          _initializerDefineProperty(this, "weaponType", _descriptor17, this);

          this._rigidBody = null;
          this._direction = 0;
          // -1:左, 0:不转, 1:右
          this._accel = 0;
          // -1:刹车, 0:无, 1:加速
          this._angle = 0;
          this._targetAngle = 0;
          this._lastValidPosition = new Vec2();
          this._currentHealth = 100;
          // 当前生命值
          // 摧毁相关
          this._isDestroyed = false;
          // 是否已摧毁
          // 颜料喷洒相关私有变量
          this._paintTimer = 0;
          // 颜料喷洒计时器
          this._vehicleId = '';
          // 车辆唯一ID
          // Block碰撞冷却时间相关
          this._blockCollisionCooldown = 0;
          // Block碰撞冷却时间计时器
          this._blockCollisionCooldownDuration = 3.0;
          // Block碰撞冷却时间(秒)
          // 武器系统相关私有变量
          this._canFire = true;
          // 是否可以射击
          this._fireTimer = 0;
        }

        // 射击计时器
        onLoad() {
          this._rigidBody = null;
          this._direction = 0;
          this._accel = 0;
          this._angle = 0;
          this._targetAngle = 0;
          this._lastValidPosition = new Vec2(); // 初始化摧毁状态

          this._isDestroyed = false; // 初始化颜料喷洒相关

          this._paintTimer = 0;
          this._vehicleId = `ai_${this.node.name}_${Date.now()}`; // 生成唯一ID
          // 初始化Block碰撞冷却时间

          this._blockCollisionCooldown = 0; // 初始化武器系统相关

          this._canFire = true;
          this._fireTimer = 0;
        }

        start() {
          this._rigidBody = this.getComponent(RigidBody2D);

          if (!this._rigidBody || !this.node || !this.node.isValid) {
            console.error('AIPlayer requires RigidBody2D component and valid node');
            return;
          }

          this._rigidBody.type = ERigidBody2DType.Dynamic;
          this._rigidBody.allowSleep = false;
          this._rigidBody.gravityScale = 0;
          this._rigidBody.linearDamping = 0.3;
          this._rigidBody.angularDamping = 0.9;
          this._rigidBody.fixedRotation = true;
          this._lastValidPosition = new Vec2(this.node.worldPosition.x, this.node.worldPosition.y);
          this._angle = this.initAngle;
          this._targetAngle = this.initAngle;
          this.node.setRotationFromEuler(0, 0, this.initAngle); // 初始化血条

          this.initHealthBar(); // 原始精灵图保存留作未来扩展
          // 检查BoxCollider2D组件是否存在

          const collider = this.getComponent(BoxCollider2D);

          if (collider) {
            console.log('AIPlayer BoxCollider2D component found');
            collider.on(Contact2DType.BEGIN_CONTACT, this.onCollisionEnter, this);
          } else {
            console.error('AIPlayer BoxCollider2D component not found');
          }
        }
        /**
         * 初始化血条
         */


        initHealthBar() {
          this._currentHealth = this.maxHealth; // 如果没有手动设置血条UI，尝试自动查找
          // if (!this.healthBarUI) {
          //     this.healthBarUI = this.node.getComponentInChildren(HealthBarUI);
          // }
          // if (this.healthBarUI) {
          //     // 设置血条的目标为当前AI车辆
          //     this.healthBarUI.setTarget(this.node);
          //     this.updateHealthBar();
          // } else {
          //     console.warn('AIPlayer: 未找到HealthBarUI组件');
          // }
        }
        /**
         * 更新血条显示
         */


        updateHealthBar() {
          if (this.healthBar) {
            this.healthBar.progress = this._currentHealth / this.maxHealth;
            console.log('AIPlayer updating health bar:', this._currentHealth / this.maxHealth);
          }
        }

        update(deltaTime) {
          if (!this._rigidBody || !this.node || !this.node.isValid) return; // 更新Block碰撞冷却时间计时器

          if (this._blockCollisionCooldown > 0) {
            this._blockCollisionCooldown -= deltaTime;
          } // 如果车辆已摧毁，执行摧毁动画逻辑


          if (this._isDestroyed) {
            return;
          }

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
        } // 供AI控制器调用的接口


        setAccel(accel) {
          this._accel = accel;
        }

        setDirection(direction) {
          this._direction = direction;
        }

        setTargetAngle(angle) {
          this._targetAngle = angle;
        }

        getCurrentAngle() {
          return this._angle;
        }

        init(angle) {
          this.initAngle = angle;
          this._angle = angle;
          this._targetAngle = angle;
          this.node.setRotationFromEuler(0, 0, angle);
        } // 血量管理接口

        /**
         * 设置当前生命值
         */


        setHealth(health) {
          this._currentHealth = Math.max(0, Math.min(health, this.maxHealth));
          this.updateHealthBar();
        }
        /**
         * 减少生命值
         */


        takeDamage(damage) {
          if (this._isDestroyed) return;
          console.log('AIPlayer taking damage:', damage);
          this.setHealth(this._currentHealth - damage);
          this.updateHealthBar(); // 检查是否死亡

          if (this._currentHealth <= 0) {
            this.destroyVehicle();
          }
        }
        /**
         * 恢复生命值
         */


        heal(amount) {
          this.setHealth(this._currentHealth + amount);
          this.updateHealthBar();
        }
        /**
         * 获取当前生命值
         */


        getHealth() {
          return this._currentHealth;
        }
        /**
         * 获取最大生命值
         */


        getMaxHealth() {
          return this.maxHealth;
        }
        /**
         * 检查是否死亡
         */


        isDead() {
          return this._currentHealth <= 0;
        }
        /**
         * 碰撞事件处理
         */


        onCollisionEnter(self, other) {
          // console.log('AIPlayer collided with something', other.node.name);
          // 获取碰撞对象的层级
          const otherLayer = other.node.layer;
          const blockLayer = Layers.nameToLayer('Block'); // 检查是否与Block层碰撞

          if (otherLayer === blockLayer) {
            // 检查冷却时间
            if (this._blockCollisionCooldown > 0) {
              // console.log('AIPlayer collided with Block but is in cooldown');
              return; // 冷却时间内，不执行任何操作
            } // 获取AIController实例


            const aiControllerNode = find('AIController');

            if (aiControllerNode) {
              const aiController = aiControllerNode.getComponent(_crd && AIController === void 0 ? (_reportPossibleCrUseOfAIController({
                error: Error()
              }), AIController) : AIController);

              if (aiController) {
                // 检查AI是否处于边界转向状态，如果是则不处理Block碰撞
                if (aiController.isAIBoundaryTurning(this)) {
                  return;
                } // console.log('AIPlayer collided with Block, turning around');
                // 设置冷却时间


                this._blockCollisionCooldown = this._blockCollisionCooldownDuration; // 随机选择向左或向右掉头

                const turnDirection = Math.random() < 0.5 ? -1 : 1; // 随机选择掉头角度(130-180度)

                const turnAngle = 130 + Math.random() * 50; // 计算当前角度

                const currentAngle = this.getCurrentAngle(); // 计算目标角度

                const targetAngle = turnDirection > 0 ? currentAngle + turnAngle : currentAngle - turnAngle; // 设置目标角度

                this.setTargetAngle(targetAngle);
                this.setDirection(turnDirection);
                this.setAccel(1);
              }
            }

            return; // Block碰撞处理完成，直接返回
          }

          const playerComponent = other.node.getComponent(_crd && player === void 0 ? (_reportPossibleCrUseOfplayer({
            error: Error()
          }), player) : player);

          if (playerComponent) {
            console.log('AIPlayer 被玩家车辆撞击');
            const playerRigidBody = playerComponent.getRigidBody();

            if (playerRigidBody && !this.isDestroyed) {
              const impactForce = new Vec2(playerRigidBody.linearVelocity.x, playerRigidBody.linearVelocity.y);
              impactForce.normalize(); // 归一化方向

              impactForce.multiplyScalar(20); // 增加冲力强度

              this._rigidBody.linearVelocity = impactForce;
            }
          }
        } // ==================== 摧毁系统 ====================

        /**
         * 摧毁车辆
         */


        destroyVehicle() {
          if (this._isDestroyed) return;
          this._isDestroyed = true;
          console.log('AI车辆被摧毁！');
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).instance.playSoundEffect('carDestruction'); // 切换到摧毁状态的精灵图

          if (this.destroyedSprite) {
            const sprite = this.getComponent(Sprite);

            if (sprite) {
              sprite.spriteFrame = this.destroyedSprite;
            }
          } // 隐藏血条


          if (this.healthBar && this.healthBar.node) {
            this.healthBar.node.active = false;
          } // 开始摧毁动画


          this.startDestroyAnimation(); // 立即更新敌人数量（不等待节点移除）

          this.updateEnemyCount(); // 延迟移除节点

          this.scheduleRemoveNode();
        }
        /**
         * 更新敌人数量
         */


        updateEnemyCount() {
          const gameManager = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance();

          if (gameManager) {
            // 计算当前存活的AI数量
            const allAIPlayers = gameManager.getAIPlayers();
            const aliveCount = allAIPlayers.filter(ai => !ai.isDestroyed()).length;
            gameManager.refreshEnemyCount(aliveCount);
          }
        }
        /**
         * 安排移除节点
         */


        scheduleRemoveNode() {
          if (this.node && this.node.isValid) {
            // 使用scheduleOnce在指定时间后执行移除
            this.scheduleOnce(() => {
              this.removeVehicleNode();
            }, this.removeDelay);
          }
        }
        /**
         * 移除车辆节点
         */


        removeVehicleNode() {
          if (this.node && this.node.isValid) {
            console.log('移除AI车辆节点'); // 从GameManager的AI列表中移除

            const gameManager = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
              error: Error()
            }), GameManager) : GameManager).getInstance();

            if (gameManager) {
              const aiPlayers = gameManager.getAIPlayers();
              const index = aiPlayers.indexOf(this);

              if (index !== -1) {
                aiPlayers.splice(index, 1);
              } // 再次更新敌人数量（基于实际存在的AI数量）


              gameManager.refreshEnemyCount(aiPlayers.length);
            } // 移除节点


            this.node.removeFromParent();
          }
        }
        /**
         * 开始摧毁动画
         */


        startDestroyAnimation() {
          if (this.node) {
            // 添加摧毁动画效果
            tween(this.node).to(2.0, {
              scale: new Vec3(1.1, 1.1, 1) // 稍微缩小
              // angle: this.node.angle + 180 // 旋转180度

            }).start();
          }
        }
        /**
         * 更新摧毁动画
         */

        /**
         * 是否已摧毁
         */


        isDestroyed() {
          return this._isDestroyed;
        }
        /**
         * 获取车辆ID
         */


        getVehicleId() {
          return this._vehicleId;
        }
        /**
         * 恢复车辆（用于重新开始游戏）
         */
        // public restoreVehicle() {
        //     // 取消移除节点的计划
        //     this.unschedule(this.removeVehicleNode);
        //     this._isDestroyed = false;
        //     this._currentHealth = this.maxHealth;
        //     // 恢复原始精灵图
        //     if (this._originalSprite) {
        //         const sprite = this.getComponent(Sprite);
        //         if (sprite) {
        //             sprite.spriteFrame = this._originalSprite;
        //         }
        //     }
        //     // 显示血条
        //     if (this.healthBar && this.healthBar.node) {
        //         this.healthBar.node.active = true;
        //     }
        //     // 更新血条
        //     this.updateHealthBar();
        //     // 恢复节点状态
        //     if (this.node) {
        //         this.node.setScale(1, 1);
        //         this.node.angle = this.initAngle;
        //     }
        //     // 重置速度
        //     if (this._rigidBody) {
        //         this._rigidBody.linearVelocity = Vec2.ZERO;
        //     }
        //     console.log('AI车辆已恢复');
        // }
        // ==================== 颜料喷洒系统 ====================

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
        } // ==================== 武器系统 ====================

        /**
         * 更新武器系统
         * @param deltaTime 帧时间间隔
         */


        updateWeaponSystem(deltaTime) {
          if (this._isDestroyed) return; // 更新射击计时器

          this._fireTimer += deltaTime; // 检查是否可以射击

          const fireInterval = 1 / this.fireRate;

          if (this._fireTimer >= fireInterval) {
            this._canFire = true;
          } // 检查是否应该射击


          this.checkAndShoot();
        }
        /**
         * 检查是否应该射击
         */


        checkAndShoot() {
          if (!this._canFire) return; // 获取玩家位置

          const gameManager = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance();
          if (!gameManager) return;
          const playerComponent = gameManager.getPlayerComponent();
          if (!playerComponent || !playerComponent.node) return; // 获取玩家和AI的位置

          const playerPos = playerComponent.node.getWorldPosition();
          const aiPos = this.node.getWorldPosition(); // 计算玩家相对于AI的方向向量

          const toPlayer = new Vec2(playerPos.x - aiPos.x, playerPos.y - aiPos.y); // 计算玩家相对于AI的角度

          const angleToPlayer = Math.atan2(toPlayer.y, toPlayer.x) * 180 / Math.PI; // 获取AI车辆的正前方角度（AI的角度+90度，因为车辆默认朝向是-90度）

          const aiForwardAngle = this._angle + 90; // 计算角度差

          let angleDiff = angleToPlayer - aiForwardAngle; // 将角度差标准化到-180到180度范围内

          while (angleDiff > 180) angleDiff -= 360;

          while (angleDiff < -180) angleDiff += 360; // 检查玩家是否在AI车辆正前方的-90度到90度范围内


          if (Math.abs(angleDiff) <= 90) {
            this.shoot();
          }
        }
        /**
         * 射击方法
         */


        shoot() {
          if (!this._canFire || this._isDestroyed) return; // 重置射击状态

          this._canFire = false;
          this._fireTimer = 0; // 根据武器类型选择子弹预制体

          let bulletPrefab = null;

          switch (this.weaponType) {
            case (_crd && WeaponType === void 0 ? (_reportPossibleCrUseOfWeaponType({
              error: Error()
            }), WeaponType) : WeaponType).NORMAL:
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
            console.warn('AI子弹预制体未设置'); // 允许重新射击

            this._canFire = true;
            return;
          } // 获取当前车辆的朝向


          const rad = (this._angle + 90) * Math.PI / 180;
          const direction = new Vec2(Math.cos(rad), Math.sin(rad)); // 计算子弹发射位置（车辆正前方）

          const vehicleWorldPos = this.node.worldPosition;
          const offsetDistance = 70; // 子弹发射偏移距离（像素）

          const bulletStartPos = new Vec3(vehicleWorldPos.x + direction.x * offsetDistance, vehicleWorldPos.y + direction.y * offsetDistance, vehicleWorldPos.z); // 获取GameManager实例并发射子弹

          const gameManager = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance();

          if (gameManager) {
            gameManager.fireBullet(bulletPrefab, bulletStartPos, direction, this._vehicleId, this.weaponType);
          } // 播放射击音效
          // SoundManager.instance.playSoundEffect('weaponFire');

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
          return 50;
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
          return 30;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "healthBar", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "destroyedSprite", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "removeDelay", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 3.0;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "paintPrefab", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "paintSprayInterval", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.2;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "normalBulletPrefab", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "dartPrefab", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "rocketPrefab", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "fireRate", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1.5;
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "weaponType", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return (_crd && WeaponType === void 0 ? (_reportPossibleCrUseOfWeaponType({
            error: Error()
          }), WeaponType) : WeaponType).NORMAL;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=bffa694b6a42ea502801eb3e252af84ebdf912e3.js.map