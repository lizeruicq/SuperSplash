System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8", "__unresolved_9", "__unresolved_10", "__unresolved_11"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Prefab, instantiate, resources, UITransform, director, ProgressBar, Label, Button, TempData, CameraFollow, player, AIController, AIPlayer, PlayerManager, SceneTransition, SoundManager, PaintManager, GameOverPanel, GameHUD, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _class3, _crd, ccclass, property, GameState, GameManager;

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

  function _reportPossibleCrUseOfPaintManager(extras) {
    _reporterNs.report("PaintManager", "./PaintManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameOverPanel(extras) {
    _reporterNs.report("GameOverPanel", "./GameOverPanel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameHUD(extras) {
    _reporterNs.report("GameHUD", "./GameHUD", _context.meta, extras);
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
    }, function (_unresolved_10) {
      PaintManager = _unresolved_10.PaintManager;
    }, function (_unresolved_11) {
      GameOverPanel = _unresolved_11.GameOverPanel;
    }, function (_unresolved_12) {
      GameHUD = _unresolved_12.GameHUD;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b67f4UjjapGSoVG2Jvvuyl3", "GameManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Prefab', 'instantiate', 'resources', 'UITransform', 'director', 'ProgressBar', 'Label', 'Button', 'Vec3']);

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

      _export("GameManager", GameManager = (_dec = ccclass('GameManager'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(ProgressBar), _dec7 = property(Label), _dec8 = property(Button), _dec9 = property(Node), _dec10 = property(Node), _dec11 = property(Button), _dec12 = property(Button), _dec13 = property(Button), _dec14 = property(_crd && GameHUD === void 0 ? (_reportPossibleCrUseOfGameHUD({
        error: Error()
      }), GameHUD) : GameHUD), _dec(_class = (_class2 = (_class3 = class GameManager extends Component {
        constructor() {
          super(...arguments);

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

          this.aiPlayers = [];
          // 游戏状态相关
          this.currentState = GameState.RUNNING;
          this.gameStartTime = 0;
          this.gameEndTime = 0;
          // 倒计时相关
          this.gameDuration = 120;
          // 游戏时长（秒），默认2分钟
          this.remainingTime = 120;
          // 剩余时间
          // 玩家数据
          this.playerHP = 0;
          // 将在player加载完成后初始化
          this.playerMaxHP = 0;
          // 将在player加载完成后初始化
          this.enemyCount = 0;
          this.initialEnemyCount = 0;
          this.playerComponent = null;
          // 玩家组件引用
          this.paintManager = null;

          // @property(PaintManager)
          // paintManager: PaintManager = null!;
          // HUD界面
          _initializerDefineProperty(this, "gameHUD", _descriptor13, this);
        }

        // // 游戏结束面板颜料占比显示
        // @property(Node)
        // paintRatiosContainer: Node = null!; // 颜料占比显示容器
        // @property(Label)
        // paintRatiosTitleLabel: Label = null!; // 颜料占比标题
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

        update(deltaTime) {
          // 只在游戏运行状态下更新倒计时
          if (this.currentState === GameState.RUNNING) {
            this.updateCountdown(deltaTime);
          }
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
          this.gameEndTime = 0; // 初始化倒计时

          this.remainingTime = this.gameDuration; // 初始化UI面板状态

          if (this.pausePanel) {
            this.pausePanel.active = false;
          }

          if (this.gameOverPanel) {
            this.gameOverPanel.active = false;
          } // 重置HUD显示


          if (this.gameHUD) {
            this.gameHUD.resetHUD();
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
                this.playGround.addChild(mapNode); // 场景预制体加载完成，查找AI车辆

                this.autoFindAIPlayers();
                this.notifyAIControllers(); // 初始化敌人数量

                this.initialEnemyCount = this.aiPlayers.length;
                this.refreshEnemyCount(this.initialEnemyCount); // 2. 加载并实例化车辆

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
                        playerNode.setRotation(spawnNode.getRotation()); // 设置初始角度并初始化玩家血量

                        var playerScript = playerNode.getComponent(_crd && player === void 0 ? (_reportPossibleCrUseOfplayer({
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

                      var cameraFollow = this.camera.getComponent(_crd && CameraFollow === void 0 ? (_reportPossibleCrUseOfCameraFollow({
                        error: Error()
                      }), CameraFollow) : CameraFollow);

                      if (cameraFollow && mapNode && playerNode) {
                        cameraFollow.init(mapNode, playerNode);
                      } // 初始化颜料系统


                      this.initializePaintSystem();
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

          var scene = this.node.scene;
          if (!scene) return;
          var canvas = scene.getChildByName('Canvas');
          if (!canvas) return;
          var playGround = canvas.getChildByName('PlayGround');
          if (!playGround) return;
          var sceneNode = playGround.children[0];
          if (!sceneNode) return;
          var carsNode = sceneNode.getChildByName('cars');
          if (!carsNode) return;

          for (var carNode of carsNode.children) {
            var aiPlayer = carNode.getComponent(_crd && AIPlayer === void 0 ? (_reportPossibleCrUseOfAIPlayer({
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
          var aiControllers = this.node.scene.getComponentsInChildren(_crd && AIController === void 0 ? (_reportPossibleCrUseOfAIController({
            error: Error()
          }), AIController) : AIController);

          for (var aiController of aiControllers) {
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
          console.log("\u73A9\u5BB6\u8840\u91CF\u521D\u59CB\u5316\u5B8C\u6210: " + this.playerHP + "/" + this.playerMaxHP); // 刷新血量UI

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
            console.log("\u73A9\u5BB6\u8840\u91CF\u5DF2\u91CD\u7F6E: " + this.playerHP + "/" + this.playerMaxHP);
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
            this.enemyCountLabel.string = "\u654C\u4EBA\u5269\u4F59: " + this.enemyCount;
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

          director.pause(); // 计算游戏结果数据

          var gameResult = this.calculateGameResult(isVictory); // 显示游戏结束面板并传递数据

          if (this.gameOverPanel) {
            this.gameOverPanel.active = true; // 获取GameOverPanel组件并设置数据

            var gameOverPanelComponent = this.gameOverPanel.getComponent(_crd && GameOverPanel === void 0 ? (_reportPossibleCrUseOfGameOverPanel({
              error: Error()
            }), GameOverPanel) : GameOverPanel);

            if (gameOverPanelComponent) {
              gameOverPanelComponent.setGameOverInfo(isVictory, gameResult.performance, gameResult.reward, gameResult.gameTime, gameResult.healthPercentage, gameResult.stars);
            }
          } // 给予玩家奖励


          (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance.addMoney(gameResult.reward); // 更新关卡进度

          this.updateLevelProgress(this.gameEndTime - this.gameStartTime, gameResult.stars);
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


        returnToLevelSelect() {
          // 恢复游戏时间
          director.resume(); // 加载主菜单场景

          (_crd && SceneTransition === void 0 ? (_reportPossibleCrUseOfSceneTransition({
            error: Error()
          }), SceneTransition) : SceneTransition).loadScene('LevelSelect');
        }
        /**
         * 计算游戏结果数据
         * @param isVictory 是否胜利
         * @returns 游戏结果数据
         */


        calculateGameResult(isVictory) {
          // 计算游戏时长（秒）
          var gameTimeSec = (this.gameEndTime - this.gameStartTime) / 1000; // 计算生命值百分比

          var healthPercentage = this.playerHP / this.playerMaxHP;

          if (!isVictory) {
            // 失败时返回基础数据
            return {
              performance: '失败',
              reward: 10,
              gameTime: gameTimeSec,
              healthPercentage: healthPercentage,
              stars: 0
            };
          } // 计算星星数（基于生命值和时间）


          var stars = this.calculateStars(gameTimeSec, healthPercentage); // 计算表现评价和奖励

          var {
            performance,
            reward
          } = this.calculatePerformance(gameTimeSec, healthPercentage);
          console.log("\u6E38\u620F\u65F6\u957F: " + gameTimeSec.toFixed(1) + "\u79D2, \u751F\u547D\u503C: " + (healthPercentage * 100).toFixed(1) + "%, \u661F\u661F: " + stars + ", \u8BC4\u4EF7: " + performance + ", \u5956\u52B1: " + reward + "\u91D1\u5E01");
          return {
            performance,
            reward,
            gameTime: gameTimeSec,
            healthPercentage,
            stars
          };
        }
        /**
         * 计算星星数（基于颜料占比）
         */


        calculateStars(gameTime, healthPercentage) {
          // 获取玩家颜料占比
          if (!this.paintManager) {
            return 1; // 如果没有颜料管理器，默认1星
          }

          var playerPaintCount = this.paintManager.getPaintCountByOwner('player');
          var totalPaintCount = this.paintManager.getTotalPaintCount();

          if (totalPaintCount === 0) {
            return 1; // 如果没有颜料，默认1星
          }

          var playerRatio = playerPaintCount / totalPaintCount;
          var playerPercentage = playerRatio * 100; // 检查是否摧毁了所有AI车辆

          var destroyedAllEnemies = this.enemyCount <= 0 && this.initialEnemyCount > 0; // 根据新的评价规则计算星星

          if (playerPercentage >= 45) {
            return 3; // 3星（A级）：颜料数量>=45%
          } else if (playerPercentage >= 35) {
            return 2; // 2星（B级）：颜料数量>=35%
          } else if (playerPercentage >= 25 || destroyedAllEnemies) {
            return 1; // 1星（C级）：颜料数量>=25% 或 摧毁所有AI车辆
          } else {
            return 0; // 不满足任何条件，0星
          }
        }
        /**
         * 更新关卡进度
         */


        updateLevelProgress(gameTimeMs, stars) {
          // 获取当前关卡ID
          var currentLevelId = (_crd && TempData === void 0 ? (_reportPossibleCrUseOfTempData({
            error: Error()
          }), TempData) : TempData).selectedLevel;

          if (!currentLevelId) {
            console.warn('无法获取当前关卡ID');
            return;
          } // 更新PlayerManager中的关卡进度


          (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance.updateLevelProgress(currentLevelId, gameTimeMs, stars);
          console.log("\u5173\u5361\u8FDB\u5EA6\u5DF2\u66F4\u65B0: " + currentLevelId + ", \u65F6\u95F4: " + gameTimeMs + "ms, \u661F\u661F: " + stars);
        }
        /**
         * 计算表现评价（基于星星数）
         */


        calculatePerformance(gameTime, healthPercentage) {
          // 先计算星星数
          var stars = this.calculateStars(gameTime, healthPercentage);
          var performance;
          var reward; // 根据星星数确定评价和奖励

          switch (stars) {
            case 3:
              performance = 'A';
              reward = 500;
              break;

            case 2:
              performance = 'B';
              reward = 300;
              break;

            case 1:
              performance = 'C';
              reward = 200;
              break;

            default:
              performance = 'F';
              reward = 50;
              break;
          }

          return {
            performance,
            reward
          };
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
        } // ==================== 颜料系统 ====================

        /**
         * 初始化颜料系统
         */


        initializePaintSystem() {
          // 查找或创建PaintManager
          this.paintManager = this.node.scene.getComponentInChildren(_crd && PaintManager === void 0 ? (_reportPossibleCrUseOfPaintManager({
            error: Error()
          }), PaintManager) : PaintManager);
        }
        /**
         * 清除所有颜料（游戏重新开始时调用）
         */


        clearAllPaint() {
          if (this.paintManager) {
            this.paintManager.clearAllPaint();
          }
        }
        /**
         * 车辆喷洒颜料的中介方法
         * @param paintPrefab 颜料预制体
         * @param worldPosition 世界坐标位置
         * @param vehicleId 车辆ID
         */


        sprayPaint(paintPrefab, worldPosition, vehicleId) {
          if (this.paintManager && paintPrefab) {
            this.paintManager.addPaint(paintPrefab, worldPosition, vehicleId);
          } else {
            console.warn('GameManager: 无法喷洒颜料，PaintManager或颜料预制体为空');
          }
        }
        /**
         * 获取所有车辆的颜料占比
         * @returns 包含每个车辆ID和其占比的对象
         */


        getAllVehiclePaintRatios() {
          if (this.paintManager) {
            return this.paintManager.getAllPaintRatios();
          }

          return {};
        }
        /**
         * 获取排序后的颜料占比（从高到低）
         * @returns 按占比排序的数组
         */


        getSortedVehiclePaintRatios() {
          if (this.paintManager) {
            var sorted = this.paintManager.getSortedPaintRatios(); // 将ownerId重命名为vehicleId以保持一致性

            return sorted.map(item => ({
              vehicleId: item.ownerId,
              ratio: item.ratio,
              count: item.count
            }));
          }

          return [];
        } // ==================== 倒计时系统 ====================

        /**
         * 更新倒计时
         * @param deltaTime 帧时间间隔
         */


        updateCountdown(deltaTime) {
          this.remainingTime -= deltaTime; // 检查是否时间到了

          if (this.remainingTime <= 0) {
            this.remainingTime = 0;
            this.onCountdownFinished();
          }
        }
        /**
         * 倒计时结束处理
         */


        onCountdownFinished() {
          console.log('倒计时结束，游戏结束'); // 计算最终的颜料占比并结束游戏

          this.gameOver(this.determineWinner());
        }
        /**
         * 确定获胜者（基于新的胜利条件）
         * @returns 是否玩家获胜
         */


        determineWinner() {
          // 检查玩家是否存活
          if (this.playerHP <= 0) {
            console.log('玩家已死亡，游戏失败');
            return false;
          } // 检查是否所有AI车辆都被摧毁


          if (this.enemyCount <= 0 && this.initialEnemyCount > 0) {
            console.log('所有AI车辆已被摧毁，游戏胜利');
            return true;
          } // 获取玩家颜料占比


          if (!this.paintManager) {
            return false; // 如果没有颜料管理器，默认玩家失败
          }

          var playerPaintCount = this.paintManager.getPaintCountByOwner('player');
          var totalPaintCount = this.paintManager.getTotalPaintCount();

          if (totalPaintCount === 0) {
            return false; // 如果没有颜料，默认玩家失败
          }

          var playerRatio = playerPaintCount / totalPaintCount;
          console.log("\u73A9\u5BB6\u989C\u6599\u5360\u6BD4: " + (playerRatio * 100).toFixed(1) + "%"); // 玩家存活且颜料占比>25%则获胜

          if (playerRatio > 0.25) {
            console.log('玩家颜料占比超过25%，游戏胜利');
            return true;
          } else {
            console.log('玩家颜料占比不足25%，游戏失败');
            return false;
          }
        }
        /**
         * 获取剩余时间
         * @returns 剩余时间（秒）
         */


        getRemainingTime() {
          return Math.max(0, this.remainingTime);
        }
        /**
         * 获取剩余时间的格式化字符串
         * @returns 格式化的时间字符串 (MM:SS)
         */


        getFormattedRemainingTime() {
          var totalSeconds = Math.ceil(this.getRemainingTime());
          var minutes = Math.floor(totalSeconds / 60);
          var seconds = totalSeconds % 60; // 手动实现padStart功能以兼容旧版本

          var minutesStr = minutes < 10 ? '0' + minutes : minutes.toString();
          var secondsStr = seconds < 10 ? '0' + seconds : seconds.toString();
          return minutesStr + ":" + secondsStr;
        }

      }, _class3._instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "playGround", [_dec2], {
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
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "playerHealthBar", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "enemyCountLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "pauseButton", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "pausePanel", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "gameOverPanel", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "resumeButton", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "mainMenuButton2", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "mainMenuButton", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "gameHUD", [_dec14], {
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
//# sourceMappingURL=d99ffa78595ef86f45405646d5cc14ad1480dee0.js.map