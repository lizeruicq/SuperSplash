System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, input, Input, KeyCode, PlayerManager, LevelGrade, SelectManager, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, LevelGradeTest;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPlayerManager(extras) {
    _reporterNs.report("PlayerManager", "./PlayerManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLevelGrade(extras) {
    _reporterNs.report("LevelGrade", "./PlayerManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSelectManager(extras) {
    _reporterNs.report("SelectManager", "./SelectManager", _context.meta, extras);
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
    }, function (_unresolved_2) {
      PlayerManager = _unresolved_2.PlayerManager;
      LevelGrade = _unresolved_2.LevelGrade;
    }, function (_unresolved_3) {
      SelectManager = _unresolved_3.SelectManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4296el4vbBMuZzdX4MRyl2I", "LevelGradeTest", undefined);

      __checkObsolete__(['_decorator', 'Component', 'input', 'Input', 'KeyCode']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 关卡评级系统测试脚本
       * 测试键位：
       * - Q: 完成level-1，获得S级评价（25秒，3星）
       * - W: 完成level-1，获得A级评价（40秒，3星）
       * - E: 完成level-1，获得B级评价（50秒，3星）
       * - R: 完成level-1，获得C级评价（50秒，2星）
       * - T: 完成level-1，获得D级评价（70秒，2星）
       * - Y: 完成level-1，获得F级评价（60秒，0星）
       * - U: 完成level-2，获得D级评价（解锁level-3）
       * - I: 显示所有关卡状态
       * - O: 重置玩家数据
       * - P: 解锁所有关卡（测试用）
       */

      _export("LevelGradeTest", LevelGradeTest = (_dec = ccclass('LevelGradeTest'), _dec2 = property(_crd && SelectManager === void 0 ? (_reportPossibleCrUseOfSelectManager({
        error: Error()
      }), SelectManager) : SelectManager), _dec(_class = (_class2 = class LevelGradeTest extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "selectManager", _descriptor, this);
        }

        onLoad() {
          input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        }

        onDestroy() {
          input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        }

        onKeyDown(event) {
          const playerManager = (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance;

          if (!playerManager) {
            console.error('PlayerManager 实例不存在');
            return;
          }

          switch (event.keyCode) {
            case KeyCode.KEY_Q:
              this.testLevelCompletion('level-1', 25000, 3); // S级

              break;

            case KeyCode.KEY_W:
              this.testLevelCompletion('level-1', 40000, 3); // A级

              break;

            case KeyCode.KEY_E:
              this.testLevelCompletion('level-1', 50000, 3); // B级

              break;

            case KeyCode.KEY_R:
              this.testLevelCompletion('level-1', 50000, 2); // C级

              break;

            case KeyCode.KEY_T:
              this.testLevelCompletion('level-1', 70000, 2); // D级

              break;

            case KeyCode.KEY_Y:
              this.testLevelCompletion('level-1', 60000, 0); // F级

              break;

            case KeyCode.KEY_U:
              this.testLevelCompletion('level-2', 65000, 2); // D级，应该解锁level-3

              break;

            case KeyCode.KEY_I:
              this.showAllLevelStatus();
              break;

            case KeyCode.KEY_O:
              this.resetPlayerData();
              break;

            case KeyCode.KEY_P:
              this.unlockAllLevels();
              break;
          }
        }
        /**
         * 测试关卡完成
         */


        testLevelCompletion(levelId, time, stars) {
          const playerManager = (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance;
          console.log(`\n=== 测试关卡完成 ===`);
          console.log(`关卡: ${levelId}`);
          console.log(`时间: ${time}ms (${time / 1000}秒)`);
          console.log(`星星: ${stars}`); // 确保关卡已解锁

          if (!playerManager.isLevelUnlocked(levelId)) {
            playerManager.unlockLevel(levelId);
            console.log(`自动解锁关卡: ${levelId}`);
          } // 更新关卡进度


          playerManager.updateLevelProgress(levelId, time, stars); // 获取评级结果

          const progress = playerManager.getLevelProgress(levelId);

          if (progress) {
            console.log(`评级: ${progress.grade}`);
            console.log(`最佳时间: ${progress.bestTime}ms`);
            console.log(`尝试次数: ${progress.attempts}`);
          } // 检查是否解锁了新关卡


          const unlockedLevels = playerManager.playerData.unlockedLevels;
          console.log(`当前解锁关卡: ${unlockedLevels.join(', ')}`); // 更新UI

          if (this.selectManager) {
            this.selectManager.updateLevelToggles();
          } // 保存数据


          playerManager.savePlayerData();
        }
        /**
         * 显示所有关卡状态
         */


        showAllLevelStatus() {
          const playerManager = (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance;
          console.log(`\n=== 所有关卡状态 ===`);
          console.log(`解锁关卡: ${playerManager.playerData.unlockedLevels.join(', ')}`); // 显示每个关卡的详细信息

          for (let i = 1; i <= 5; i++) {
            const levelId = `level-${i}`;
            const isUnlocked = playerManager.isLevelUnlocked(levelId);
            const progress = playerManager.getLevelProgress(levelId);
            console.log(`\n${levelId}:`);
            console.log(`  解锁: ${isUnlocked}`);

            if (progress && progress.completed) {
              console.log(`  已完成: 是`);
              console.log(`  评级: ${progress.grade}`);
              console.log(`  星星: ${progress.stars}`);
              console.log(`  最佳时间: ${progress.bestTime}ms (${progress.bestTime / 1000}秒)`);
              console.log(`  尝试次数: ${progress.attempts}`);
            } else {
              console.log(`  已完成: 否`);
            }
          }
        }
        /**
         * 重置玩家数据
         */


        resetPlayerData() {
          const playerManager = (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance;
          playerManager.resetPlayerData();
          console.log('\n=== 玩家数据已重置 ==='); // 更新UI

          if (this.selectManager) {
            this.selectManager.updateLevelToggles();
          }
        }
        /**
         * 解锁所有关卡（测试用）
         */


        unlockAllLevels() {
          const playerManager = (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance;
          console.log('\n=== 解锁所有关卡 ===');

          for (let i = 1; i <= 5; i++) {
            const levelId = `level-${i}`;

            if (!playerManager.isLevelUnlocked(levelId)) {
              playerManager.unlockLevel(levelId);
              console.log(`解锁关卡: ${levelId}`);
            }
          } // 更新UI


          if (this.selectManager) {
            this.selectManager.updateLevelToggles();
          } // 保存数据


          playerManager.savePlayerData();
        }
        /**
         * 获取评级说明
         */


        getGradeDescription(grade) {
          switch (grade) {
            case (_crd && LevelGrade === void 0 ? (_reportPossibleCrUseOfLevelGrade({
              error: Error()
            }), LevelGrade) : LevelGrade).S:
              return 'S级 - 完美表现！';

            case (_crd && LevelGrade === void 0 ? (_reportPossibleCrUseOfLevelGrade({
              error: Error()
            }), LevelGrade) : LevelGrade).A:
              return 'A级 - 优秀表现！';

            case (_crd && LevelGrade === void 0 ? (_reportPossibleCrUseOfLevelGrade({
              error: Error()
            }), LevelGrade) : LevelGrade).B:
              return 'B级 - 良好表现！';

            case (_crd && LevelGrade === void 0 ? (_reportPossibleCrUseOfLevelGrade({
              error: Error()
            }), LevelGrade) : LevelGrade).C:
              return 'C级 - 一般表现';

            case (_crd && LevelGrade === void 0 ? (_reportPossibleCrUseOfLevelGrade({
              error: Error()
            }), LevelGrade) : LevelGrade).D:
              return 'D级 - 勉强通过';

            case (_crd && LevelGrade === void 0 ? (_reportPossibleCrUseOfLevelGrade({
              error: Error()
            }), LevelGrade) : LevelGrade).F:
              return 'F级 - 需要重试';

            default:
              return '未知评级';
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "selectManager", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=00767e9b88c10342f88c206c15295b04b3da3147.js.map