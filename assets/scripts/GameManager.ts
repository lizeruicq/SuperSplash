import { _decorator, Component, Node, Prefab, instantiate, resources, UITransform, director, ProgressBar, Label, Button } from 'cc';
import { TempData } from './TempData';
import { CameraFollow } from './camera_follow';
import { player } from './player';
import { AIController } from './AIController';
import { AIPlayer } from './AIPlayer';
import { PlayerManager } from './PlayerManager';
import { SceneTransition } from './SceneTransition';
import { SoundManager } from './SoundManager';

const { ccclass, property } = _decorator;

// 游戏状态枚举
export enum GameState {
    RUNNING = 'running',    // 游戏运行中
    PAUSED = 'paused',      // 游戏暂停
    GAME_OVER = 'game_over' // 游戏结束
}

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Node)
    playGround: Node = null!; // PlayGround节点

    @property(Node)
    canvas: Node = null!; // Canvas节点

    @property(Node)
    spawnPoint: Node = null!; // SpawnPoint节点

    @property(Node)
    camera: Node = null!; // Camera节点

    @property(ProgressBar)
    playerHealthBar: ProgressBar = null!; // 玩家血量条

    @property(Label)
    enemyCountLabel: Label = null!; // 敌人数量Label

    @property(Button)
    pauseButton: Button = null!; // 暂停按钮

    @property(Node)
    pausePanel: Node = null!; // 暂停面板

    @property(Node)
    gameOverPanel: Node = null!; // 游戏结束面板

    @property(Button)
    resumeButton: Button = null!; // 继续游戏按钮

    @property(Button)
    mainMenuButton2: Button = null!; // 重新开始按钮

    @property(Button)
    mainMenuButton: Button = null!; // 返回主菜单按钮

    @property(Label)
    gameOverTitleLabel: Label = null!; // 游戏结束标题

    @property(Label)
    performanceLabel: Label = null!; // 表现评价标签

    @property(Label)
    rewardLabel: Label = null!; // 奖励金币标签

    private static _instance: GameManager = null!;
    private aiPlayers: AIPlayer[] = [];

    // 游戏状态相关
    private currentState: GameState = GameState.RUNNING;
    private gameStartTime: number = 0;
    private gameEndTime: number = 0;

    // 玩家数据
    private playerHP: number = 0; // 将在player加载完成后初始化
    private playerMaxHP: number = 0; // 将在player加载完成后初始化
    private enemyCount: number = 0;
    private initialEnemyCount: number = 0;
    private playerComponent: player | null = null; // 玩家组件引用

    public static getInstance(): GameManager {
        return GameManager._instance;
    }

    onLoad() {
        if (GameManager._instance) {
            console.log("销毁原有单例")
            this.node.destroy();
            return;
        }
        GameManager._instance = this;
    }

    start() {
        console.log("调用场景内容加载")
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
    private initializeGame() {
        this.currentState = GameState.RUNNING;
        this.gameStartTime = Date.now();
        this.gameEndTime = 0;

        // 初始化UI面板状态
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
    private bindButtonEvents() {
        // 暂停按钮
        if (this.pauseButton) {
            this.pauseButton.node.on(Button.EventType.CLICK, this.pauseGame, this);
        }

        // 继续游戏按钮
        if (this.resumeButton) {
            this.resumeButton.node.on(Button.EventType.CLICK, this.resumeGame, this);
        }

        // 重新开始按钮
        if (this.mainMenuButton2) {
            this.mainMenuButton2.node.on(Button.EventType.CLICK, this.returnToMainMenu, this);
        }

        // 返回主菜单按钮
        if (this.mainMenuButton) {
            this.mainMenuButton.node.on(Button.EventType.CLICK, this.returnToMainMenu, this);
        }
    }

    loadLevelAndCar() {
        const levelId = TempData.selectedLevel;
        const carId = TempData.selectedCar;
        let mapNode: Node | null = null;
        let playerNode: Node | null = null;
        // 1. 加载并实例化场景背景
        if (levelId) {
            resources.load(`prefab/levels/${levelId}`, Prefab, (err, prefab) => {
                if (!err && prefab) {
                    mapNode = instantiate(prefab);
                    mapNode.setPosition(0, 0, 0);
                    this.playGround.addChild(mapNode);
                    
                    // 场景预制体加载完成，查找AI车辆
                    this.autoFindAIPlayers();
                    this.notifyAIControllers();

                    // 初始化敌人数量
                    this.initialEnemyCount = this.aiPlayers.length;
                    this.refreshEnemyCount(this.initialEnemyCount);
                    
                    // 2. 加载并实例化车辆
                    if (carId) {
                        resources.load(`prefab/cars/${carId}`, Prefab, (err2, prefab2) => {
                            if (!err2 && prefab2) {
                                playerNode = instantiate(prefab2);
                                // 随机选择一个SpawnPoint的子节点
                                const spawnChildren = this.spawnPoint.children;
                                if (spawnChildren.length > 0) {
                                    const randomIndex = Math.floor(Math.random() * spawnChildren.length);
                                    const spawnNode = spawnChildren[randomIndex];
                                    const spawnPos = spawnNode.getWorldPosition();
                                    // 转换为Canvas的本地坐标
                                    const localPos = this.canvas.getComponent(UITransform).convertToNodeSpaceAR(spawnPos);
                                    playerNode.setPosition(localPos);
                                    playerNode.setRotation(spawnNode.getRotation());
                                    // 设置初始角度并初始化玩家血量
                                    const playerScript = playerNode.getComponent(player);
                                    if (playerScript) {
                                        playerScript.init(spawnNode.angle);
                                        // 初始化玩家血量数据
                                        this.initializePlayerHealth(playerScript);
                                    }
                                    // 根据点位名称设置朝向
                                    if (["point4", "point5", "point6"].indexOf(spawnNode.name) !== -1) {
                                        console.log("生成车辆在右侧")
                                        // playerNode.setRotationFromEuler(0, 0, 90);
                                    } 
                                } 
                                this.canvas.addChild(playerNode);
                                // 3. 通知相机
                                const cameraFollow = this.camera.getComponent(CameraFollow);
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
        SoundManager.instance.playSoundEffect('carStart');
    }

    /**
     * 查找所有AIPlayer组件
     */
    public autoFindAIPlayers() {
        this.aiPlayers = [];
        // 路径: Canvas → PlayGround → 场景预制体 → cars
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
            const aiPlayer = carNode.getComponent(AIPlayer);
            if (aiPlayer) {
                this.aiPlayers.push(aiPlayer);
            }
        }
    }

    /**
     * 获取AI车辆列表
     */
    public getAIPlayers(): AIPlayer[] {
        return this.aiPlayers;
    }

    /**
     * 通知所有AIController组件场景预制体已加载完成
     */
    private notifyAIControllers() {
        const aiControllers = this.node.scene.getComponentsInChildren(AIController);
        for (const aiController of aiControllers) {
            aiController.onScenePrefabLoaded();
        }
    }

    /**
     * 初始化玩家血量数据
     */
    private initializePlayerHealth(playerScript: player) {
        this.playerComponent = playerScript;
        this.playerMaxHP = playerScript.getMaxHealth();
        this.playerHP = this.playerMaxHP;

        console.log(`玩家血量初始化完成: ${this.playerHP}/${this.playerMaxHP}`);

        // 刷新血量UI
        this.refreshPlayerHealthBar();
    }

    /**
     * 减少玩家血量并刷新UI
     */
    public reducePlayerHP(amount: number) {
        console.log('减少玩家血量:', amount);
        this.playerHP = Math.max(0, this.playerHP - amount);
        this.refreshPlayerHealthBar();

        // 检查玩家是否死亡
        if (this.playerHP <= 0 && this.currentState === GameState.RUNNING) {
            this.gameOver(false); // 玩家死亡，游戏失败
        }
    }

    /**
     * 同步玩家血量（从player组件获取最新血量）
     */
    public syncPlayerHealth() {
        if (this.playerComponent) {
            this.playerHP = this.playerComponent.getCurrentHealth();
            this.refreshPlayerHealthBar();

            // 检查玩家是否死亡
            if (this.playerHP <= 0 && this.currentState === GameState.RUNNING) {
                this.gameOver(false); // 玩家死亡，游戏失败
            }
        }
    }

    /**
     * 重置玩家血量到满血状态
     */
    public resetPlayerHealth() {
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
    public refreshPlayerHealthBar() {
        if (this.playerHealthBar && this.playerMaxHP > 0) {
            this.playerHealthBar.progress = this.playerHP / this.playerMaxHP;
        }
    }

    /**
     * 刷新剩余敌人数量并刷新UI
     */
    public refreshEnemyCount(count: number) {
        this.enemyCount = count;
        if (this.enemyCountLabel) {
            this.enemyCountLabel.string = `敌人剩余: ${this.enemyCount}`;
        }

        // 检查是否所有敌人都被消灭
        if (this.enemyCount <= 0 && this.currentState === GameState.RUNNING && this.initialEnemyCount > 0) {
            this.gameOver(true); // 敌人全部消灭，游戏胜利
        }
    }

    // ==================== 游戏状态管理方法 ====================

    /**
     * 暂停游戏
     */
    public pauseGame() {
        if (this.currentState !== GameState.RUNNING) return;

        this.currentState = GameState.PAUSED;

        // 暂停游戏时间
        director.pause();

        // 显示暂停面板
        if (this.pausePanel) {
            this.pausePanel.active = true;
        }

        console.log('游戏已暂停');
    }

    /**
     * 继续游戏
     */
    public resumeGame() {
        if (this.currentState !== GameState.PAUSED) return;

        this.currentState = GameState.RUNNING;

        // 恢复游戏时间
        director.resume();

        // 隐藏暂停面板
        if (this.pausePanel) {
            this.pausePanel.active = false;
        }

        console.log('游戏已继续');
    }

    /**
     * 游戏结束
     * @param isVictory 是否胜利
     */
    public gameOver(isVictory: boolean) {
        if (this.currentState === GameState.GAME_OVER) return;

        this.currentState = GameState.GAME_OVER;
        this.gameEndTime = Date.now();

        // 暂停游戏
        director.pause();

        // 显示游戏结束面板
        if (this.gameOverPanel) {
            this.gameOverPanel.active = true;
        }

        // 更新游戏结束UI
        this.updateGameOverUI(isVictory);

        // 计算并给予奖励
        this.calculateAndGiveReward(isVictory);

        console.log(isVictory ? '游戏胜利！' : '游戏失败！');
    }

    /**
     * 重新开始游戏
     */
    public restartGame() {
        // 恢复游戏时间
        director.resume();

        // 重新加载当前场景
        SceneTransition.loadScene(director.getScene()!.name);
    }

    /**
     * 返回主菜单
     */
    public returnToMainMenu() {
        // 恢复游戏时间
        director.resume();

        // 加载主菜单场景
        SceneTransition.loadScene('LevelSelect');
    }

    /**
     * 更新游戏结束UI
     */
    private updateGameOverUI(isVictory: boolean) {
        // 更新标题
        if (this.gameOverTitleLabel) {
            this.gameOverTitleLabel.string = isVictory ? '胜利！' : '失败！';
        }
    }

    /**
     * 计算表现评价和奖励
     */
    private calculateAndGiveReward(isVictory: boolean) {
        // 计算游戏时长（毫秒）
        const gameTimeMs = this.gameEndTime - this.gameStartTime;
        const gameTimeSec = gameTimeMs / 1000;

        if (!isVictory) {
            // 失败时记录F级评价，不给奖励
            this.updateRewardUI('失败', 10);
            PlayerManager.instance.addMoney(10);

            // 记录失败的关卡进度（0星，F级）
            this.updateLevelProgress(gameTimeMs, 0);
            return;
        }

        // 计算生命值百分比
        const healthPercentage = this.playerHP / this.playerMaxHP;

        // 计算星星数（基于生命值和时间）
        const stars = this.calculateStars(gameTimeSec, healthPercentage);

        // 计算表现评价和奖励
        const { performance, reward } = this.calculatePerformance(gameTimeSec, healthPercentage);

        // 更新UI显示
        this.updateRewardUI(performance, reward);

        // 给予玩家奖励
        PlayerManager.instance.addMoney(reward);

        // 更新关卡进度
        this.updateLevelProgress(gameTimeMs, stars);

        console.log(`游戏时长: ${gameTimeSec.toFixed(1)}秒, 生命值: ${(healthPercentage * 100).toFixed(1)}%, 星星: ${stars}, 评价: ${performance}, 奖励: ${reward}金币`);
    }

    /**
     * 计算星星数
     */
    private calculateStars(gameTime: number, healthPercentage: number): number {
        let stars = 1; // 基础1星（完成关卡）

        // 基于时间加星
        if (gameTime <= 60) {
            stars++; // 60秒内完成 +1星
        }

        // 基于生命值加星
        if (healthPercentage >= 0.5) {
            stars++; // 生命值50%以上 +1星
        }

        return Math.min(stars, 3); // 最多3星
    }

    /**
     * 更新关卡进度
     */
    private updateLevelProgress(gameTimeMs: number, stars: number) {
        // 获取当前关卡ID
        const currentLevelId = TempData.selectedLevel;
        if (!currentLevelId) {
            console.warn('无法获取当前关卡ID');
            return;
        }

        // 更新PlayerManager中的关卡进度
        PlayerManager.instance.updateLevelProgress(currentLevelId, gameTimeMs, stars);

        console.log(`关卡进度已更新: ${currentLevelId}, 时间: ${gameTimeMs}ms, 星星: ${stars}`);
    }

    /**
     * 计算表现评价
     */
    private calculatePerformance(gameTime: number, healthPercentage: number): { performance: string, reward: number } {
        let score = 0;

        // 时间评分 (0-50分)
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
        }

        // 生命值评分 (0-50分)
        score += Math.floor(healthPercentage * 50);

        // 根据总分确定评价和奖励
        let performance: string;
        let reward: number;

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

        return { performance, reward };
    }

    /**
     * 更新奖励UI显示
     */
    private updateRewardUI(performance: string, reward: number) {
        if (this.performanceLabel) {
            this.performanceLabel.string = `表现评价: ${performance}`;
        }

        if (this.rewardLabel) {
            this.rewardLabel.string = `获得金币: ${reward}`;
        }
    }

    // ==================== 公共方法 ====================

    /**
     * 获取当前游戏状态
     */
    public getCurrentState(): GameState {
        return this.currentState;
    }

    /**
     * 获取游戏时长（秒）
     */
    public getGameTime(): number {
        if (this.gameEndTime > 0) {
            return (this.gameEndTime - this.gameStartTime) / 1000;
        }
        return (Date.now() - this.gameStartTime) / 1000;
    }

    /**
     * 获取玩家当前生命值
     */
    public getPlayerHP(): number {
        return this.playerHP;
    }

    /**
     * 获取玩家最大生命值
     */
    public getPlayerMaxHP(): number {
        return this.playerMaxHP;
    }

    /**
     * 获取剩余敌人数量
     */
    public getEnemyCount(): number {
        return this.enemyCount;
    }
}