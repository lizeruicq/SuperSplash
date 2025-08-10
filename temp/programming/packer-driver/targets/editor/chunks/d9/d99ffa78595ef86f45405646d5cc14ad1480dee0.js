System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8", "__unresolved_9", "__unresolved_10", "__unresolved_11", "__unresolved_12"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Prefab, instantiate, resources, UITransform, director, ProgressBar, Label, Button, TempData, CameraFollow, player, AIController, AIPlayer, PlayerManager, SceneTransition, SoundManager, PaintManager, GameOverPanel, GameHUD, Bullet, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _class3, _crd, ccclass, property, GameState, GameManager;

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
    }, function (_unresolved_13) {
      Bullet = _unresolved_13.Bullet;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b67f4UjjapGSoVG2Jvvuyl3", "GameManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Prefab', 'instantiate', 'resources', 'UITransform', 'director', 'ProgressBar', 'Label', 'Button', 'Vec3', 'Vec2']);

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

      _export("GameManager", GameManager = (_dec = ccclass('GameManager'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(ProgressBar), _dec7 = property(Label), _dec8 = property(Button), _dec9 = property(Node), _dec10 = property(Node), _dec11 = property(Button), _dec12 = property(Button), _dec13 = property(_crd && GameHUD === void 0 ? (_reportPossibleCrUseOfGameHUD({
        error: Error()
      }), GameHUD) : GameHUD), _dec(_class = (_class2 = (_class3 = class GameManager extends Component {
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
          // @property(Button)
          // mainMenuButton2: Button = null!; // 
          _initializerDefineProperty(this, "mainMenuButton", _descriptor11, this);

          this.aiPlayers = [];
          // 游戏状态相关
          this.currentState = GameState.RUNNING;
          this.gameStartTime = 0;
          this.gameEndTime = 0;
          // 倒计时相关
          this.gameDuration = 90;
          // 游戏时长（秒），默认2分钟
          this.remainingTime = 90;
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
          _initializerDefineProperty(this, "gameHUD", _descriptor12, this);

          // 子弹根节点
          this.bulletRoot = null;
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
          } // if (this.mainMenuButton2) {
          //     this.mainMenuButton2.node.on(Button.EventType.CLICK, this.returnToLevelSelect, this);
          // }
          // 返回主菜单按钮


          if (this.mainMenuButton) {
            this.mainMenuButton.node.on(Button.EventType.CLICK, this.returnToLevelSelect, this);
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
                this.notifyAIControllers(); // 查找BulletRoot节点

                this.findBulletRoot(); // 初始化敌人数量

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
         * 查找BulletRoot节点
         */


        findBulletRoot() {
          // 直接在场景中搜索BulletRoot节点（递归搜索所有子节点）
          const scene = this.node.scene;

          if (!scene) {
            console.warn('场景未找到');
            return;
          } // 使用find方法递归查找BulletRoot节点


          this.bulletRoot = scene.getChildByName('BulletRoot') || this.findNodeRecursively(scene, 'BulletRoot');

          if (this.bulletRoot) {
            console.log('BulletRoot节点找到:', this.bulletRoot.name);
          } else {
            console.warn('BulletRoot节点未找到，子弹将添加到场景根节点');
          }
        }
        /**
         * 递归查找指定名称的节点
         */


        findNodeRecursively(parent, name) {
          for (const child of parent.children) {
            if (child.name === name) {
              return child;
            }

            const found = this.findNodeRecursively(child, name);

            if (found) {
              return found;
            }
          }

          return null;
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
          this.refreshPlayerHealthBar(); // 检查玩家是否死亡，但不立即触发游戏结束
          // 游戏结束将由玩家车辆的摧毁动画完成后触发

          if (this.playerHP <= 0 && this.currentState === GameState.RUNNING) {
            console.log('玩家血量归零，等待摧毁动画完成'); // 不在这里调用 gameOver，让 player.ts 的动画完成后调用
          }
        }
        /**
         * 同步玩家血量（从player组件获取最新血量）
         */


        syncPlayerHealth() {
          if (this.playerComponent) {
            this.playerHP = this.playerComponent.getCurrentHealth();
            this.refreshPlayerHealthBar(); // 检查玩家是否死亡，但不立即触发游戏结束
            // 游戏结束将由玩家车辆的摧毁动画完成后触发

            if (this.playerHP <= 0 && this.currentState === GameState.RUNNING) {
              console.log('玩家血量归零，等待摧毁动画完成'); // 不在这里调用 gameOver，让 player.ts 的动画完成后调用
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
            this.enemyCountLabel.string = `opponent: ${this.enemyCount}`;
          } // 检查是否所有敌人都被消灭
          // 这个方法现在由AI车辆摧毁动画完成后调用，所以可以立即触发游戏结束


          if (this.enemyCount <= 0 && this.currentState === GameState.RUNNING && this.initialEnemyCount > 0) {
            console.log('所有AI车辆摧毁动画完成，触发游戏胜利');
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

          const gameResult = this.calculateGameResult(isVictory); // 显示游戏结束面板并传递数据

          if (this.gameOverPanel) {
            this.gameOverPanel.active = true; // 获取GameOverPanel组件并设置数据

            const gameOverPanelComponent = this.gameOverPanel.getComponent(_crd && GameOverPanel === void 0 ? (_reportPossibleCrUseOfGameOverPanel({
              error: Error()
            }), GameOverPanel) : GameOverPanel);

            if (gameOverPanelComponent) {
              gameOverPanelComponent.bindButtonEvents();
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
          const gameTimeSec = (this.gameEndTime - this.gameStartTime) / 1000; // 计算生命值百分比

          const healthPercentage = this.playerHP / this.playerMaxHP;

          if (!isVictory) {
            // 失败时返回基础数据
            return {
              performance: 'failure',
              reward: 10,
              gameTime: gameTimeSec,
              healthPercentage: healthPercentage,
              stars: 0
            };
          } // 计算星星数（基于生命值和时间）


          const stars = this.calculateStars(gameTimeSec, healthPercentage); // 计算表现评价和奖励

          const {
            performance,
            reward
          } = this.calculatePerformance(gameTimeSec, healthPercentage);
          console.log(`游戏时长: ${gameTimeSec.toFixed(1)}秒, 生命值: ${(healthPercentage * 100).toFixed(1)}%, 星星: ${stars}, 评价: ${performance}, 奖励: ${reward}金币`);
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

          const playerPaintCount = this.paintManager.getPaintCountByOwner('player');
          const totalPaintCount = this.paintManager.getTotalPaintCount();

          if (totalPaintCount === 0) {
            return 1; // 如果没有颜料，默认1星
          }

          const playerRatio = playerPaintCount / totalPaintCount;
          const playerPercentage = playerRatio * 100; // 检查是否摧毁了所有AI车辆

          const destroyedAllEnemies = this.enemyCount <= 0 && this.initialEnemyCount > 0; // 根据新的评价规则计算星星

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
         * 计算表现评价（基于星星数）
         */


        calculatePerformance(gameTime, healthPercentage) {
          // 先计算星星数
          const stars = this.calculateStars(gameTime, healthPercentage);
          let performance;
          let reward; // 根据星星数确定评价和奖励

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
            const sorted = this.paintManager.getSortedPaintRatios(); // 将ownerId重命名为vehicleId以保持一致性

            return sorted.map(item => ({
              vehicleId: item.ownerId,
              ratio: item.ratio,
              count: item.count
            }));
          }

          return [];
        }
        /**
         * 获取颜料管理器
         */


        getPaintManager() {
          return this.paintManager;
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

          const playerPaintCount = this.paintManager.getPaintCountByOwner('player');
          const totalPaintCount = this.paintManager.getTotalPaintCount();

          if (totalPaintCount === 0) {
            return false; // 如果没有颜料，默认玩家失败
          }

          const playerRatio = playerPaintCount / totalPaintCount;
          console.log(`玩家颜料占比: ${(playerRatio * 100).toFixed(1)}%`); // 玩家存活且颜料占比>25%则获胜

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
          const totalSeconds = Math.ceil(this.getRemainingTime());
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60; // 手动实现padStart功能以兼容旧版本

          const minutesStr = minutes < 10 ? '0' + minutes : minutes.toString();
          const secondsStr = seconds < 10 ? '0' + seconds : seconds.toString();
          return `${minutesStr}:${secondsStr}`;
        } // ==================== 射击系统 ====================

        /**
         * 玩家射击
         */


        playerShoot() {
          if (this.playerComponent) {
            this.playerComponent.shoot();
          }
        }
        /**
         * 发射子弹
         * @param bulletPrefab 子弹预制体
         * @param position 发射位置
         * @param direction 发射方向
         * @param shooterId 发射者ID
         * @param weaponType 武器类型
         */


        fireBullet(bulletPrefab, position, direction, shooterId, weaponType) {
          // 实例化子弹
          const bulletNode = instantiate(bulletPrefab); // 获取子弹组件

          const bulletComponent = bulletNode.getComponent(_crd && Bullet === void 0 ? (_reportPossibleCrUseOfBullet({
            error: Error()
          }), Bullet) : Bullet);

          if (bulletComponent) {
            // 初始化子弹
            bulletComponent.init(direction, shooterId); // 设置子弹类型（WeaponType和BulletType值相同）

            bulletComponent.bulletType = weaponType;
          } // 将子弹添加到BulletRoot节点或场景中


          if (this.bulletRoot) {
            var _this$bulletRoot$getC;

            // 转换世界坐标到BulletRoot的本地坐标
            const localPos = (_this$bulletRoot$getC = this.bulletRoot.getComponent(UITransform)) == null ? void 0 : _this$bulletRoot$getC.convertToNodeSpaceAR(position);

            if (localPos) {
              bulletNode.setPosition(localPos);
            } else {
              bulletNode.setWorldPosition(position);
            }

            this.bulletRoot.addChild(bulletNode);
            console.log('子弹已添加到BulletRoot节点');
          } // } else {
          //     const localPos = this.playerComponent.node.getComponent(UITransform)?.convertToNodeSpaceAR(position);
          //     // 如果没有找到BulletRoot，添加到场景根节点
          //     bulletNode.setWorldPosition(localPos);
          //     this.playerComponent.node.addChild(bulletNode);
          //     console.log('子弹已添加到wa玩家车辆根节点');
          // }

        }
        /**
         * 获取玩家组件
         */


        getPlayerComponent() {
          return this.playerComponent;
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
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "mainMenuButton", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "gameHUD", [_dec13], {
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