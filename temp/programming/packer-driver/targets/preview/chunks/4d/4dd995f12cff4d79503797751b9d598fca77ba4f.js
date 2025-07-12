System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec2, GameManager, _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, AIState, AIController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfAIPlayer(extras) {
    _reporterNs.report("AIPlayer", "./AIPlayer", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "./GameManager", _context.meta, extras);
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
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "922b02JTO5KDrBy9ZPUoXjD", "AIController", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec2', 'math', 'SkeletalAnimationComponent']);

      ({
        ccclass,
        property
      } = _decorator);

      AIState = /*#__PURE__*/function (AIState) {
        AIState[AIState["FreeDrive"] = 0] = "FreeDrive";
        AIState[AIState["BoundaryTurning"] = 1] = "BoundaryTurning";
        return AIState;
      }(AIState || {});

      _export("AIController", AIController = (_dec = ccclass('AIController'), _dec(_class = (_class2 = class AIController extends Component {
        constructor() {
          super(...arguments);

          // @property([AIPlayer])
          // aiPlayers: AIPlayer[] = [];
          _initializerDefineProperty(this, "sceneMinX", _descriptor, this);

          // 左边界：640 - 3377/2
          _initializerDefineProperty(this, "sceneMaxX", _descriptor2, this);

          // 右边界：640 + 3377/2
          _initializerDefineProperty(this, "sceneMinY", _descriptor3, this);

          // 下边界：360 - 2105/2
          _initializerDefineProperty(this, "sceneMaxY", _descriptor4, this);

          // 上边界：360 + 2105/2
          this.aiStates = [];
          this.canvasWorldPos = new Vec2();
          this.boundaryTurnTimers = [];
          // 边界转向计时器
          this.boundaryTurnTargetAngles = [];
          // 目标转向角度
          this.boundaryTurnDirections = [];
          // 转向方向
          this.boundaryTurnStartAngles = [];
          // 开始转向时的角度
          this.lastAngleChanges = [];
          // 记录上次角度变化，防止抖动
          this.boundaryTurnCooldowns = [];
          // 边界转向冷却时间
          this.aiPlayers = [];
        }

        start() {// 不再自动查找AI车辆，全部通过GameManager单例获取
        }
        /**
         * 场景预制体加载完成后调用此方法
         * 由GameManager在场景预制体加载完成后调用
         */


        onScenePrefabLoaded() {
          console.log('场景预制体加载完成，通过GameManager获取AI车辆列表...');
          this.aiPlayers = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().getAIPlayers(); // 初始化状态数组

          this.aiStates = this.aiPlayers.map(() => AIState.FreeDrive);
          this.boundaryTurnTimers = this.aiPlayers.map(() => 0);
          this.boundaryTurnTargetAngles = this.aiPlayers.map(() => 0);
          this.boundaryTurnDirections = this.aiPlayers.map(() => 0);
          this.boundaryTurnStartAngles = this.aiPlayers.map(() => 0);
          this.lastAngleChanges = this.aiPlayers.map(() => 0);
          this.boundaryTurnCooldowns = this.aiPlayers.map(() => 0);
          console.log("AI\u8F66\u8F86\u67E5\u627E\u5B8C\u6210\uFF0C\u627E\u5230 " + this.aiPlayers.length + " \u4E2AAI\u8F66\u8F86");
        }
        /**
         * 公共方法：重新查找AI车辆（用于动态加载场景时）
         */


        refreshAIPlayers() {
          this.aiPlayers = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().getAIPlayers(); // 重新初始化状态数组

          this.aiStates = this.aiPlayers.map(() => AIState.FreeDrive);
          this.boundaryTurnTimers = this.aiPlayers.map(() => 0);
          this.boundaryTurnTargetAngles = this.aiPlayers.map(() => 0);
          this.boundaryTurnDirections = this.aiPlayers.map(() => 0);
          this.boundaryTurnStartAngles = this.aiPlayers.map(() => 0);
          this.lastAngleChanges = this.aiPlayers.map(() => 0);
          this.boundaryTurnCooldowns = this.aiPlayers.map(() => 0);
          console.log("AI\u8F66\u8F86\u5217\u8868\u5DF2\u5237\u65B0\uFF0C\u5F53\u524D\u5171\u6709 " + this.aiPlayers.length + " \u4E2AAI\u8F66\u8F86");
        }

        update(dt) {
          for (var i = 0; i < this.aiPlayers.length; i++) {
            var ai = this.aiPlayers[i];
            if (!ai) continue;
            this.boundaryTurnTimers[i] += dt;
            this.boundaryTurnCooldowns[i] += dt; // 处理边界转向状态

            if (this.aiStates[i] === AIState.BoundaryTurning) {
              this.handleBoundaryTurning(ai, i, dt);
              continue; // 跳过其他状态处理
            }

            if (this.aiPlayers.length != 0) {
              // console.log("AI车辆数量：",this.aiPlayers.length);
              // 自由驾驶状态
              this.freeDrive(ai, i);
            }
          }
        }

        freeDrive(ai, i) {
          // console.log(ai.getCurrentAngle());
          // 随机改变方向
          if (Math.random() < 0.005) {
            // 降低频率
            ai.setDirection(Math.random() < 0.5 ? -1 : 1);
          } // 随机加速


          if (Math.random() < 0.01) {
            // 降低频率
            ai.setAccel(Math.random() < 0.8 ? 1 : 0);
          } // 边界检测和转向


          var pos = ai.node.worldPosition; // 计算相对于Canvas中心的位置

          var relativeX = pos.x - this.canvasWorldPos.x;
          var relativeY = pos.y - this.canvasWorldPos.y; // 计算到边界的距离

          var margin = 400; // 边界检测距离
          // 检查是否接近边界

          var nearLeftBoundary = relativeX < this.sceneMinX + margin;
          var nearRightBoundary = relativeX > this.sceneMaxX - margin;
          var nearBottomBoundary = relativeY < this.sceneMinY + margin;
          var nearTopBoundary = relativeY > this.sceneMaxY - margin; // 如果接近边界，开始边界转向（需要检查冷却时间）

          if (nearLeftBoundary || nearRightBoundary || nearBottomBoundary || nearTopBoundary) {
            // 检查冷却时间，避免频繁触发转向
            var requiredCooldown = this.boundaryTurnCooldowns[i] < 0 ? Math.abs(this.boundaryTurnCooldowns[i]) : 3.0;

            if (this.boundaryTurnCooldowns[i] >= requiredCooldown) {
              // 动态冷却时间
              // 打印触发的边界位置
              var boundaryInfo = "触发边界: ";
              if (nearLeftBoundary) boundaryInfo += "左边界 ";
              if (nearRightBoundary) boundaryInfo += "右边界 ";
              if (nearBottomBoundary) boundaryInfo += "下边界 ";
              if (nearTopBoundary) boundaryInfo += "上边界 "; // console.log(boundaryInfo + `位置(${relativeX.toFixed(1)}, ${relativeY.toFixed(1)})`);

              this.startBoundaryTurning(ai, i, nearLeftBoundary, nearRightBoundary, nearBottomBoundary, nearTopBoundary);
            } else {
              // 在冷却时间内，继续正常行驶
              var _requiredCooldown = this.boundaryTurnCooldowns[i] < 0 ? Math.abs(this.boundaryTurnCooldowns[i]) : 3.0; // console.log(`冷却中: ${this.boundaryTurnCooldowns[i].toFixed(1)}s/${requiredCooldown.toFixed(1)}s`);


              ai.setAccel(1);
            }
          } else {
            // 不在边界附近，正常行驶
            ai.setAccel(1);
          }
        }

        startBoundaryTurning(ai, i, nearLeft, nearRight, nearBottom, nearTop) {
          this.aiStates[i] = AIState.BoundaryTurning;
          this.boundaryTurnTimers[i] = 0;
          this.boundaryTurnStartAngles[i] = ai.getCurrentAngle();
          this.boundaryTurnCooldowns[i] = 0; // 重置冷却时间
          // 根据触发的边界确定目标方向

          var targetAngle = 0;
          var turnDirection = 0;
          var currentAngle = ai.getCurrentAngle(); // 优先处理角落情况，避免判断混乱

          var isCorner = nearLeft && nearBottom || nearLeft && nearTop || nearRight && nearBottom || nearRight && nearTop;

          if (isCorner) {
            // 角落情况：转向原朝向的反方向
            targetAngle = (currentAngle + 180) % 360; // 直接转向反方向
            // console.log(`检测到角落，当前角度=${currentAngle.toFixed(1)}°，转向反方向=${targetAngle.toFixed(1)}°`);
            // 角落转向需要更长的冷却时间

            this.boundaryTurnCooldowns[i] = -5.0; // 3秒冷却时间
          } else {
            // 单边界情况：更智能的目标角度选择，考虑当前朝向
            if (nearLeft) {
              // 左边界：转向右方，避免选择与当前角度相近的方向
              if (currentAngle > 180) {
                targetAngle = Math.random() * 90; // 0-90度
              } else {
                targetAngle = 270 + Math.random() * 90; // 270-360度
              }
            } else if (nearRight) {
              // 右边界：转向左方，避免选择与当前角度相近的方向
              if (currentAngle < 180) {
                targetAngle = 180 + Math.random() * 180; // 180-360度
              } else {
                targetAngle = Math.random() * 180; // 0-180度
              }
            } else if (nearBottom) {
              // 下边界：转向上方，避免选择与当前角度相近的方向
              if (currentAngle > 90 && currentAngle < 270) {
                targetAngle = Math.random() * 90; // 0-90度
              } else {
                targetAngle = 270 + Math.random() * 90; // 270-360度
              }
            } else if (nearTop) {
              // 上边界：转向下方，避免选择与当前角度相近的方向
              if (currentAngle < 90 || currentAngle > 270) {
                targetAngle = 90 + Math.random() * 180; // 90-270度
              } else {
                targetAngle = Math.random() * 90 + 270; // 270-360度
              }
            }
          } // 确保目标角度在0-360范围内


          targetAngle = targetAngle % 360;
          if (targetAngle < 0) targetAngle += 360; // 计算当前角度到目标角度的最短路径

          var angleDiff = targetAngle - currentAngle;

          while (angleDiff > 180) angleDiff -= 360;

          while (angleDiff < -180) angleDiff += 360; // 确定转向方向


          turnDirection = angleDiff > 0 ? 1 : -1;
          this.boundaryTurnTargetAngles[i] = targetAngle;
          this.boundaryTurnDirections[i] = turnDirection; // 直接设置目标角度，让车辆立即朝向安全方向

          ai.setTargetAngle(targetAngle);
          ai.setDirection(turnDirection);
          ai.setAccel(1); // 保持全速，产生自然漂移
          // console.log(`开始边界转向: 当前角度=${currentAngle.toFixed(1)}°, 目标角度=${targetAngle.toFixed(1)}°, 角度差=${angleDiff.toFixed(1)}°, 方向=${turnDirection > 0 ? '左' : '右'}`);
        }

        handleBoundaryTurning(ai, i, dt) {
          var currentAngle = ai.getCurrentAngle();
          var targetAngle = this.boundaryTurnTargetAngles[i];
          var startAngle = this.boundaryTurnStartAngles[i]; // 计算已经转向的角度

          var angleTurned = currentAngle - startAngle;

          while (angleTurned > 180) angleTurned -= 360;

          while (angleTurned < -180) angleTurned += 360; // 计算到目标角度的距离


          var angleToTarget = targetAngle - currentAngle;

          while (angleToTarget > 180) angleToTarget -= 360;

          while (angleToTarget < -180) angleToTarget += 360; // 防抖动：如果角度变化很小且与上次变化方向相反，则停止转向


          var angleChange = Math.abs(angleToTarget - this.lastAngleChanges[i]);

          if (angleChange < 5 && Math.sign(angleToTarget) !== Math.sign(this.lastAngleChanges[i])) {
            ai.setDirection(0);
            ai.setAccel(1);
            this.aiStates[i] = AIState.FreeDrive;
            this.boundaryTurnCooldowns[i] = 0; // 重置冷却时间
            // console.log(`边界转向完成: 防抖动触发，角度变化=${angleChange.toFixed(1)}°`);

            return;
          }

          this.lastAngleChanges[i] = angleToTarget; // 检查是否达到目标角度（更宽松的容差）

          if (Math.abs(angleToTarget) < 30) {
            // 30度容差，更宽松
            ai.setDirection(0);
            ai.setAccel(1);
            this.aiStates[i] = AIState.FreeDrive;
            this.boundaryTurnCooldowns[i] = 0; // 重置冷却时间
            // console.log(`边界转向完成: 到达目标角度=${targetAngle.toFixed(1)}°, 当前角度=${currentAngle.toFixed(1)}°`);

            return;
          } // 检查是否已经转向足够的角度（至少30度）


          if (Math.abs(angleTurned) >= 30) {
            // 检查当前朝向是否安全（远离边界）
            var pos = ai.node.worldPosition;
            var relativeX = pos.x - this.canvasWorldPos.x;
            var relativeY = pos.y - this.canvasWorldPos.y; // 如果已经转向足够角度且位置安全，停止转向

            if (relativeX > this.sceneMinX + 400 && relativeX < this.sceneMaxX - 400 && relativeY > this.sceneMinY + 400 && relativeY < this.sceneMaxY - 400) {
              ai.setDirection(0);
              ai.setAccel(1);
              this.aiStates[i] = AIState.FreeDrive;
              this.boundaryTurnCooldowns[i] = 0; // 重置冷却时间
              // console.log(`边界转向完成: 已转向${Math.abs(angleTurned).toFixed(1)}°, 位置安全`);

              return;
            }
          } // 防止转向时间过长（超过3秒）


          if (this.boundaryTurnTimers[i] > 3) {
            ai.setDirection(0);
            ai.setAccel(1);
            this.aiStates[i] = AIState.FreeDrive; // console.log('边界转向超时，强制完成');

            return;
          } // 智能转向控制：根据角度差动态调整转向


          var absAngleToTarget = Math.abs(angleToTarget); // 添加调试信息
          // if (this.boundaryTurnTimers[i] % 0.5 < 0.1) { // 每0.5秒打印一次调试信息
          //     console.log(`转向调试: 当前=${currentAngle.toFixed(1)}°, 目标=${targetAngle.toFixed(1)}°, 角度差=${angleToTarget.toFixed(1)}°, 已转向=${angleTurned.toFixed(1)}°`);
          // }

          if (absAngleToTarget < 30) {
            // 接近目标角度时，停止转向，让车辆自然朝向目标
            ai.setDirection(0);
            ai.setAccel(1);
          } else {
            // 改进的转向策略：根据角度差调整转向强度
            if (absAngleToTarget > 90) {
              // 大角度差：持续转向
              ai.setDirection(this.boundaryTurnDirections[i]);
            } else if (absAngleToTarget > 60) {
              // 中等角度差：持续转向，但稍微减弱
              ai.setDirection(this.boundaryTurnDirections[i]);
            } else if (absAngleToTarget > 30) {
              // 小角度差：脉冲式转向，但更稳定
              var pulseInterval = 0.12; // 120ms脉冲

              var pulseOn = 0.08; // 80ms开启

              var timeInPulse = this.boundaryTurnTimers[i] % pulseInterval;

              if (timeInPulse < pulseOn) {
                ai.setDirection(this.boundaryTurnDirections[i]);
              } else {
                ai.setDirection(0);
              }
            } else {
              // 很小角度差：停止转向，避免来回摆动
              ai.setDirection(0);
            }

            ai.setAccel(1);
          }
        } // 血量管理接口

        /**
         * 为指定AI车辆设置生命值
         */


        setAIHealth(aiIndex, health) {
          if (aiIndex >= 0 && aiIndex < this.aiPlayers.length) {
            var ai = this.aiPlayers[aiIndex];

            if (ai && ai.node && ai.node.isValid) {
              ai.setHealth(health);
            }
          }
        }
        /**
         * 为指定AI车辆造成伤害
         */


        damageAI(aiIndex, damage) {
          if (aiIndex >= 0 && aiIndex < this.aiPlayers.length) {
            var ai = this.aiPlayers[aiIndex];

            if (ai && ai.node && ai.node.isValid) {
              ai.takeDamage(damage);
            }
          }
        }
        /**
         * 为指定AI车辆恢复生命值
         */


        healAI(aiIndex, amount) {
          if (aiIndex >= 0 && aiIndex < this.aiPlayers.length) {
            var ai = this.aiPlayers[aiIndex];

            if (ai && ai.node && ai.node.isValid) {
              ai.heal(amount);
            }
          }
        }
        /**
         * 获取指定AI车辆的生命值
         */


        getAIHealth(aiIndex) {
          if (aiIndex >= 0 && aiIndex < this.aiPlayers.length) {
            var ai = this.aiPlayers[aiIndex];

            if (ai && ai.node && ai.node.isValid) {
              return ai.getHealth();
            }
          }

          return 0;
        }
        /**
         * 获取指定AI车辆的最大生命值
         */


        getAIMaxHealth(aiIndex) {
          if (aiIndex >= 0 && aiIndex < this.aiPlayers.length) {
            var ai = this.aiPlayers[aiIndex];

            if (ai && ai.node && ai.node.isValid) {
              return ai.getMaxHealth();
            }
          }

          return 0;
        }
        /**
         * 检查指定AI车辆是否死亡
         */


        isAIDead(aiIndex) {
          if (aiIndex >= 0 && aiIndex < this.aiPlayers.length) {
            var ai = this.aiPlayers[aiIndex];

            if (ai && ai.node && ai.node.isValid) {
              return ai.isDead();
            }
          }

          return true;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sceneMinX", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return -1048.5;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sceneMaxX", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2328.5;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "sceneMinY", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return -692.5;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "sceneMaxY", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1412.5;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4dd995f12cff4d79503797751b9d598fca77ba4f.js.map