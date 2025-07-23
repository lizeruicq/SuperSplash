System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Prefab, instantiate, resources, UITransform, director, ProgressBar, Label, Button, TempData, CameraFollow, player, AIController, AIPlayer, PlayerManager, SceneTransition, SoundManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _class3, _crd, ccclass, property, GameState, GameManager;

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

  function _reportPossibleCrUseOfAIPlayer(extras) {
    _reporterNs.report("AIPlayer", "./AIPlayer", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPlayerManager(extras) {
    _reporterNs.report("PlayerManager", "./PlayerManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSceneTransition(extras) {
    _reporterNs.report("SceneTransition", "./SceneTransition", _context.meta, extras);
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
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      resources = _cc.resources;
      UITransform = _cc.UITransform;
      director = _cc.director;
      ProgressBar = _cc.ProgressBar;
      Label = _cc.Label;
      Button = _cc.Button;
    }, function (_unresolved_2) {
      TempData = _unresolved_2.TempData;
    }, function (_unresolved_3) {
      CameraFollow = _unresolved_3.CameraFollow;
    }, function (_unresolved_4) {
      player = _unresolved_4.player;
    }, function (_unresolved_5) {
      AIController = _unresolved_5.AIController;
    }, function (_unresolved_6) {
      AIPlayer = _unresolved_6.AIPlayer;
    }, function (_unresolved_7) {
      PlayerManager = _unresolved_7.PlayerManager;
    }, function (_unresolved_8) {
      SceneTransition = _unresolved_8.SceneTransition;
    }, function (_unresolved_9) {
      SoundManager = _unresolved_9.SoundManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b67f4UjjapGSoVG2Jvvuyl3", "GameManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Prefab', 'instantiate', 'resources', 'UITransform', 'director', 'ProgressBar', 'Label', 'Button']);

      ({
        ccclass,
        property
      } = _decorator); // 游戏状态枚举

      _export("GameState", GameState = /*#__PURE__*/function (GameState) {
        GameState["RUNNING"] = "running";
        GameState["PAUSED"] = "paused";
        GameState["GAME_OVER"] = "game_over";
        return GameState;
      }({}));

      _export("GameManager", GameManager = (_dec = ccclass('GameManager'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(ProgressBar), _dec7 = property(Label), _dec8 = property(Button), _dec9 = property(Node), _dec10 = property(Node), _dec11 = property(Button), _dec12 = property(Button), _dec13 = property(Button), _dec14 = property(Label), _dec15 = property(Label), _dec16 = property(Label), _dec(_class = (_class2 = (_class3 = class GameManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "playGround", _descriptor, this);

          // PlayGround节点
          _initializerDefineProperty(this, "canvas", _descriptor2, this);

          // Canvas节点
          _initializerDefineProperty(this, "spawnPoint", _descriptor3, this);

          // SpawnPoint节点
          _initializerDefineProperty(this, "camera", _descriptor4, this);

          // Camera节点
          _initializerDefineProperty(this, "playerHealthBar", _descriptor5, this);

          // 玩家血量条
          _initializerDefineProperty(this, "enemyCountLabel", _descriptor6, this);

          // 敌人数量Label
          _initializerDefineProperty(this, "pauseButton", _descriptor7, this);

          // 暂停按钮
          _initializerDefineProperty(this, "pausePanel", _descriptor8, this);

          // 暂停面板
          _initializerDefineProperty(this, "gameOverPanel", _descriptor9, this);

          // 游戏结束面板
          _initializerDefineProperty(this, "resumeButton", _descriptor10, this);

          // 继续游戏按钮
          _initializerDefineProperty(this, "mainMenuButton2", _descriptor11, this);

          // 重新开始按钮
          _initializerDefineProperty(this, "mainMenuButton", _descriptor12, this);

          // 返回主菜单按钮
          _initializerDefineProperty(this, "gameOverTitleLabel", _descriptor13, this);

          // 游戏结束标题
          _initializerDefineProperty(this, "performanceLabel", _descriptor14, this);

          // 表现评价标签
          _initializerDefineProperty(this, "rewardLabel", _descriptor15, this);

          this.aiPlayers = [];
          // 游戏状态相关
          this.currentState = GameState.RUNNING;
          this.gameStartTime = 0;
          this.gameEndTime = 0;
          // 玩家数据
          this.playerHP = 0;
          // 将在player加载完成后初始化
          this.playerMaxHP = 0;
          // 将在player加载完成后初始化
          this.enemyCount = 0;
          this.initialEnemyCount = 0;
          this.playerComponent = null;
        }

        // 玩家组件引用
        static getInstance() {
          return GameManager._instance;
        }

        onLoad() {
          if (GameManager._instance) {
            console.log("销毁原有单例");
            this.node.destroy();
            return;
          }

          GameManager._instance = this;
        }

        start() {
          console.log("调用场景内容加载");
          this.initializeGame();
          this.bindButtonEvents();
          this.loadLevelAndCar();
        }

        onDestroy() {
          if (GameManager._instance === this) {
            GameManager._instance = null;
            console.log("GameManager 实例已销毁");
          }
        }
        /**
         * 初始化游戏
         */


        initializeGame() {
          this.currentState = GameState.RUNNING;
          this.gameStartTime = Date.now();
          this.gameEndTime = 0; // 初始化UI面板状态

          if (this.pausePanel) {
            this.pausePanel.active = false;
          }

          if (this.gameOverPanel) {
            this.gameOverPanel.active = false;
          }
        }
        /**
         * 绑定按钮事件
         */


        bindButtonEvents() {
          // 暂停按钮
          if (this.pauseButton) {
            this.pauseButton.node.on(Button.EventType.CLICK, this.pauseGame, this);
          } // 继续游戏按钮


          if (this.resumeButton) {
            this.resumeButton.node.on(Button.EventType.CLICK, this.resumeGame, this);
          } // 重新开始按钮


          if (this.mainMenuButton2) {
            this.mainMenuButton2.node.on(Button.EventType.CLICK, this.returnToMainMenu, this);
          } // 返回主菜单按钮


          if (this.mainMenuButton) {
            this.mainMenuButton.node.on(Button.EventType.CLICK, this.returnToMainMenu, this);
          }
        }

        loadLevelAndCar() {
          const levelId = (_crd && TempData === void 0 ? (_reportPossibleCrUseOfTempData({
            error: Error()
          }), TempData) : TempData).selectedLevel;
          const carId = (_crd && TempData === void 0 ? (_reportPossibleCrUseOfTempData({
            error: Error()
          }), TempData) : TempData).selectedCar;
          let mapNode = null;
          let playerNode = null; // 1. 加载并实例化场景背景

          if (levelId) {
            resources.load(`prefab/levels/${levelId}`, Prefab, (err, prefab) => {
              if (!err && prefab) {
                mapNode = instantiate(prefab);
                mapNode.setPosition(0, 0, 0);
                this.playGround.addChild(mapNode); // 场景预制体加载完成，查找AI车辆

                this.autoFindAIPlayers();
                this.notifyAIControllers(); // 初始化敌人数量

                this.initialEnemyCount = this.aiPlayers.length;
                this.refreshEnemyCount(this.initialEnemyCount); // 2. 加载并实例化车辆

                if (carId) {
                  resources.load(`prefab/cars/${carId}`, Prefab, (err2, prefab2) => {
                    if (!err2 && prefab2) {
                      playerNode = instantiate(prefab2); // 随机选择一个SpawnPoint的子节点

                      const spawnChildren = this.spawnPoint.children;

                      if (spawnChildren.length > 0) {
                        const randomIndex = Math.floor(Math.random() * spawnChildren.length);
                        const spawnNode = spawnChildren[randomIndex];
                        const spawnPos = spawnNode.getWorldPosition(); // 转换为Canvas的本地坐标

                        const localPos = this.canvas.getComponent(UITransform).convertToNodeSpaceAR(spawnPos);
                        playerNode.setPosition(localPos);
                        playerNode.setRotation(spawnNode.getRotation()); // 设置初始角度并初始化玩家血量

                        const playerScript = playerNode.getComponent(_crd && player === void 0 ? (_reportPossibleCrUseOfplayer({
                          error: Error()
                        }), player) : player);

                        if (playerScript) {
                          playerScript.init(spawnNode.angle); // 初始化玩家血量数据

                          this.initializePlayerHealth(playerScript);
                        } // 根据点位名称设置朝向


                        if (["point4", "point5", "point6"].indexOf(spawnNode.name) !== -1) {
                          console.log("生成车辆在右侧"); // playerNode.setRotationFromEuler(0, 0, 90);
                        }
                      }

                      this.canvas.addChild(playerNode); // 3. 通知相机

                      const cameraFollow = this.camera.getComponent(_crd && CameraFollow === void 0 ? (_reportPossibleCrUseOfCameraFollow({
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

          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).instance.playSoundEffect('carStart');
        }
        /**
         * 查找所有AIPlayer组件
         */


        autoFindAIPlayers() {
          this.aiPlayers = []; // 路径: Canvas → PlayGround → 场景预制体 → cars

          const scene = this.node.scene;
          if (!scene) return;
          const canvas = scene.getChildByName('Canvas');
          if (!canvas) return;
          const playGround = canvas.getChildByName('PlayGround');
          if (!playGround) return;
          const sceneNode = playGround.children[0];
          if (!sceneNode) return;
          const carsNode = sceneNode.getChildByName('cars');
          if (!carsNode) return;

          for (const carNode of carsNode.children) {
            const aiPlayer = carNode.getComponent(_crd && AIPlayer === void 0 ? (_reportPossibleCrUseOfAIPlayer({
              error: Error()
            }), AIPlayer) : AIPlayer);

            if (aiPlayer) {
              this.aiPlayers.push(aiPlayer);
            }
          }
        }
        /**
         * 获取AI车辆列表
         */


        getAIPlayers() {
          return this.aiPlayers;
        }
        /**
         * 通知所有AIController组件场景预制体已加载完成
         */


        notifyAIControllers() {
          const aiControllers = this.node.scene.getComponentsInChildren(_crd && AIController === void 0 ? (_reportPossibleCrUseOfAIController({
            error: Error()
          }), AIController) : AIController);

          for (const aiController of aiControllers) {
            aiController.onScenePrefabLoaded();
          }
        }
        /**
         * 初始化玩家血量数据
         */


        initializePlayerHealth(playerScript) {
          this.playerComponent = playerScript;
          this.playerMaxHP = playerScript.getMaxHealth();
          this.playerHP = this.playerMaxHP;
          console.log(`玩家血量初始化完成: ${this.playerHP}/${this.playerMaxHP}`); // 刷新血量UI

          this.refreshPlayerHealthBar();
        }
        /**
         * 减少玩家血量并刷新UI
         */


        reducePlayerHP(amount) {
          console.log('减少玩家血量:', amount);
          this.playerHP = Math.max(0, this.playerHP - amount);
          this.refreshPlayerHealthBar(); // 检查玩家是否死亡

          if (this.playerHP <= 0 && this.currentState === GameState.RUNNING) {
            this.gameOver(false); // 玩家死亡，游戏失败
          }
        }
        /**
         * 同步玩家血量（从player组件获取最新血量）
         */


        syncPlayerHealth() {
          if (this.playerComponent) {
            this.playerHP = this.playerComponent.getCurrentHealth();
            this.refreshPlayerHealthBar(); // 检查玩家是否死亡

            if (this.playerHP <= 0 && this.currentState === GameState.RUNNING) {
              this.gameOver(false); // 玩家死亡，游戏失败
            }
          }
        }
        /**
         * 重置玩家血量到满血状态
         */


        resetPlayerHealth() {
          if (this.playerComponent) {
            this.playerComponent.restoreVehicle(); // 恢复玩家车辆状态

            this.playerHP = this.playerMaxHP;
            this.refreshPlayerHealthBar();
            console.log(`玩家血量已重置: ${this.playerHP}/${this.playerMaxHP}`);
          }
        }
        /**
         * 刷新玩家血量进度条
         */


        refreshPlayerHealthBar() {
          if (this.playerHealthBar && this.playerMaxHP > 0) {
            this.playerHealthBar.progress = this.playerHP / this.playerMaxHP;
          }
        }
        /**
         * 刷新剩余敌人数量并刷新UI
         */


        refreshEnemyCount(count) {
          this.enemyCount = count;

          if (this.enemyCountLabel) {
            this.enemyCountLabel.string = `敌人剩余: ${this.enemyCount}`;
          } // 检查是否所有敌人都被消灭


          if (this.enemyCount <= 0 && this.currentState === GameState.RUNNING && this.initialEnemyCount > 0) {
            this.gameOver(true); // 敌人全部消灭，游戏胜利
          }
        } // ==================== 游戏状态管理方法 ====================

        /**
         * 暂停游戏
         */


        pauseGame() {
          if (this.currentState !== GameState.RUNNING) return;
          this.currentState = GameState.PAUSED; // 暂停游戏时间

          director.pause(); // 显示暂停面板

          if (this.pausePanel) {
            this.pausePanel.active = true;
          }

          console.log('游戏已暂停');
        }
        /**
         * 继续游戏
         */


        resumeGame() {
          if (this.currentState !== GameState.PAUSED) return;
          this.currentState = GameState.RUNNING; // 恢复游戏时间

          director.resume(); // 隐藏暂停面板

          if (this.pausePanel) {
            this.pausePanel.active = false;
          }

          console.log('游戏已继续');
        }
        /**
         * 游戏结束
         * @param isVictory 是否胜利
         */


        gameOver(isVictory) {
          if (this.currentState === GameState.GAME_OVER) return;
          this.currentState = GameState.GAME_OVER;
          this.gameEndTime = Date.now(); // 暂停游戏

          director.pause(); // 显示游戏结束面板

          if (this.gameOverPanel) {
            this.gameOverPanel.active = true;
          } // 更新游戏结束UI


          this.updateGameOverUI(isVictory); // 计算并给予奖励

          this.calculateAndGiveReward(isVictory);
          console.log(isVictory ? '游戏胜利！' : '游戏失败！');
        }
        /**
         * 重新开始游戏
         */


        restartGame() {
          // 恢复游戏时间
          director.resume(); // 重新加载当前场景

          (_crd && SceneTransition === void 0 ? (_reportPossibleCrUseOfSceneTransition({
            error: Error()
          }), SceneTransition) : SceneTransition).loadScene(director.getScene().name);
        }
        /**
         * 返回主菜单
         */


        returnToMainMenu() {
          // 恢复游戏时间
          director.resume(); // 加载主菜单场景

          (_crd && SceneTransition === void 0 ? (_reportPossibleCrUseOfSceneTransition({
            error: Error()
          }), SceneTransition) : SceneTransition).loadScene('LevelSelect');
        }
        /**
         * 更新游戏结束UI
         */


        updateGameOverUI(isVictory) {
          // 更新标题
          if (this.gameOverTitleLabel) {
            this.gameOverTitleLabel.string = isVictory ? '胜利！' : '失败！';
          }
        }
        /**
         * 计算表现评价和奖励
         */


        calculateAndGiveReward(isVictory) {
          // 计算游戏时长（毫秒）
          const gameTimeMs = this.gameEndTime - this.gameStartTime;
          const gameTimeSec = gameTimeMs / 1000;

          if (!isVictory) {
            // 失败时记录F级评价，不给奖励
            this.updateRewardUI('失败', 10);
            (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
              error: Error()
            }), PlayerManager) : PlayerManager).instance.addMoney(10); // 记录失败的关卡进度（0星，F级）

            this.updateLevelProgress(gameTimeMs, 0);
            return;
          } // 计算生命值百分比


          const healthPercentage = this.playerHP / this.playerMaxHP; // 计算星星数（基于生命值和时间）

          const stars = this.calculateStars(gameTimeSec, healthPercentage); // 计算表现评价和奖励

          const {
            performance,
            reward
          } = this.calculatePerformance(gameTimeSec, healthPercentage); // 更新UI显示

          this.updateRewardUI(performance, reward); // 给予玩家奖励

          (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance.addMoney(reward); // 更新关卡进度

          this.updateLevelProgress(gameTimeMs, stars);
          console.log(`游戏时长: ${gameTimeSec.toFixed(1)}秒, 生命值: ${(healthPercentage * 100).toFixed(1)}%, 星星: ${stars}, 评价: ${performance}, 奖励: ${reward}金币`);
        }
        /**
         * 计算星星数
         */


        calculateStars(gameTime, healthPercentage) {
          let stars = 1; // 基础1星（完成关卡）
          // 基于时间加星

          if (gameTime <= 60) {
            stars++; // 60秒内完成 +1星
          } // 基于生命值加星


          if (healthPercentage >= 0.5) {
            stars++; // 生命值50%以上 +1星
          }

          return Math.min(stars, 3); // 最多3星
        }
        /**
         * 更新关卡进度
         */


        updateLevelProgress(gameTimeMs, stars) {
          // 获取当前关卡ID
          const currentLevelId = (_crd && TempData === void 0 ? (_reportPossibleCrUseOfTempData({
            error: Error()
          }), TempData) : TempData).selectedLevel;

          if (!currentLevelId) {
            console.warn('无法获取当前关卡ID');
            return;
          } // 更新PlayerManager中的关卡进度


          (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance.updateLevelProgress(currentLevelId, gameTimeMs, stars);
          console.log(`关卡进度已更新: ${currentLevelId}, 时间: ${gameTimeMs}ms, 星星: ${stars}`);
        }
        /**
         * 计算表现评价
         */


        calculatePerformance(gameTime, healthPercentage) {
          let score = 0; // 时间评分 (0-50分)

          if (gameTime <= 30) {
            score += 50; // 30秒内完成，满分
          } else if (gameTime <= 60) {
            score += 40; // 60秒内完成，40分
          } else if (gameTime <= 90) {
            score += 30; // 90秒内完成，30分
          } else if (gameTime <= 120) {
            score += 20; // 120秒内完成，20分
          } else {
            score += 10; // 超过120秒，10分
          } // 生命值评分 (0-50分)


          score += Math.floor(healthPercentage * 50); // 根据总分确定评价和奖励

          let performance;
          let reward;

          if (score >= 90) {
            performance = 'S级 - 完美表现';
            reward = 500;
          } else if (score >= 80) {
            performance = 'A级 - 优秀表现';
            reward = 400;
          } else if (score >= 70) {
            performance = 'B级 - 良好表现';
            reward = 300;
          } else if (score >= 60) {
            performance = 'C级 - 一般表现';
            reward = 200;
          } else {
            performance = 'D级 - 需要改进';
            reward = 100;
          }

          return {
            performance,
            reward
          };
        }
        /**
         * 更新奖励UI显示
         */


        updateRewardUI(performance, reward) {
          if (this.performanceLabel) {
            this.performanceLabel.string = `表现评价: ${performance}`;
          }

          if (this.rewardLabel) {
            this.rewardLabel.string = `获得金币: ${reward}`;
          }
        } // ==================== 公共方法 ====================

        /**
         * 获取当前游戏状态
         */


        getCurrentState() {
          return this.currentState;
        }
        /**
         * 获取游戏时长（秒）
         */


        getGameTime() {
          if (this.gameEndTime > 0) {
            return (this.gameEndTime - this.gameStartTime) / 1000;
          }

          return (Date.now() - this.gameStartTime) / 1000;
        }
        /**
         * 获取玩家当前生命值
         */


        getPlayerHP() {
          return this.playerHP;
        }
        /**
         * 获取玩家最大生命值
         */


        getPlayerMaxHP() {
          return this.playerMaxHP;
        }
        /**
         * 获取剩余敌人数量
         */


        getEnemyCount() {
          return this.enemyCount;
        }

      }, _class3._instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "playGround", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "canvas", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "spawnPoint", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "camera", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "playerHealthBar", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "enemyCountLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "pauseButton", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "pausePanel", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "gameOverPanel", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "resumeButton", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "mainMenuButton2", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "mainMenuButton", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "gameOverTitleLabel", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "performanceLabel", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "rewardLabel", [_dec16], {
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
//# sourceMappingURL=d99ffa78595ef86f45405646d5cc14ad1480dee0.js.map