import { _decorator, Component, Node, Prefab, instantiate, resources, UITransform, director, ProgressBar, Label, Button, Vec3 } from 'cc';
import { TempData } from './TempData';
import { CameraFollow } from './camera_follow';
import { player } from './player';
import { AIController } from './AIController';
import { AIPlayer } from './AIPlayer';
import { PlayerManager } from './PlayerManager';
import { SceneTransition } from './SceneTransition';
import { SoundManager } from './SoundManager';
import { PaintManager } from './PaintManager';
import { GameOverPanel } from './GameOverPanel';
import { GameHUD } from './GameHUD';

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

    private static _instance: GameManager = null!;
    private aiPlayers: AIPlayer[] = [];

    // 游戏状态相关
    private currentState: GameState = GameState.RUNNING;
    private gameStartTime: number = 0;
    private gameEndTime: number = 0;

    // 倒计时相关
  
    gameDuration: number = 120; // 游戏时长（秒），默认2分钟

    private remainingTime: number = 120; // 剩余时间

    // 玩家数据
    private playerHP: number = 0; // 将在player加载完成后初始化
    private playerMaxHP: number = 0; // 将在player加载完成后初始化
    private enemyCount: number = 0;
    private initialEnemyCount: number = 0;
    private playerComponent: player | null = null; // 玩家组件引用


    private paintManager: PaintManager | null = null;
    // @property(PaintManager)
    // paintManager: PaintManager = null!;

    // HUD界面
    @property(GameHUD)
    gameHUD: GameHUD = null!;

    // // 游戏结束面板颜料占比显示
    // @property(Node)
    // paintRatiosContainer: Node = null!; // 颜料占比显示容器

    // @property(Label)
    // paintRatiosTitleLabel: Label = null!; // 颜料占比标题

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
    update(deltaTime: number) {
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
    private initializeGame() {
        this.currentState = GameState.RUNNING;
        this.gameStartTime = Date.now();
        this.gameEndTime = 0;

        // 初始化倒计时
        this.remainingTime = this.gameDuration;

        // 初始化UI面板状态
        if (this.pausePanel) {
            this.pausePanel.active = false;
        }
        if (this.gameOverPanel) {
            this.gameOverPanel.active = false;
        }

       

        // 重置HUD显示
        if (this.gameHUD) {
            this.gameHUD.resetHUD();
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
                                 // 初始化颜料系统
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

        // 计算游戏结果数据
        const gameResult = this.calculateGameResult(isVictory);

        // 显示游戏结束面板并传递数据
        if (this.gameOverPanel) {
            this.gameOverPanel.active = true;

            // 获取GameOverPanel组件并设置数据
            const gameOverPanelComponent = this.gameOverPanel.getComponent(GameOverPanel);
            if (gameOverPanelComponent) {
                gameOverPanelComponent.setGameOverInfo(
                    isVictory,
                    gameResult.performance,
                    gameResult.reward,
                    gameResult.gameTime,
                    gameResult.healthPercentage,
                    gameResult.stars
                );
            }
        }

        // 给予玩家奖励
        PlayerManager.instance.addMoney(gameResult.reward);

        // 更新关卡进度
        this.updateLevelProgress(this.gameEndTime - this.gameStartTime, gameResult.stars);

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
    public returnToLevelSelect() {
        // 恢复游戏时间
        director.resume();

        // 加载主菜单场景
        SceneTransition.loadScene('LevelSelect');
    }

    /**
     * 计算游戏结果数据
     * @param isVictory 是否胜利
     * @returns 游戏结果数据
     */
    private calculateGameResult(isVictory: boolean): {
        performance: string;
        reward: number;
        gameTime: number;
        healthPercentage: number;
        stars: number;
    } {
        // 计算游戏时长（秒）
        const gameTimeSec = (this.gameEndTime - this.gameStartTime) / 1000;

        // 计算生命值百分比
        const healthPercentage = this.playerHP / this.playerMaxHP;

        if (!isVictory) {
            // 失败时返回基础数据
            return {
                performance: '失败',
                reward: 10,
                gameTime: gameTimeSec,
                healthPercentage: healthPercentage,
                stars: 0
            };
        }

        // 计算星星数（基于生命值和时间）
        const stars = this.calculateStars(gameTimeSec, healthPercentage);

        // 计算表现评价和奖励
        const { performance, reward } = this.calculatePerformance(gameTimeSec, healthPercentage);

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
    private calculateStars(gameTime: number, healthPercentage: number): number {
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
        const playerPercentage = playerRatio * 100;

        // 检查是否摧毁了所有AI车辆
        const destroyedAllEnemies = this.enemyCount <= 0 && this.initialEnemyCount > 0;

        // 根据新的评价规则计算星星
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
     * 计算表现评价（基于星星数）
     */
    private calculatePerformance(gameTime: number, healthPercentage: number): { performance: string, reward: number } {
        // 先计算星星数
        const stars = this.calculateStars(gameTime, healthPercentage);

        let performance: string;
        let reward: number;

        // 根据星星数确定评价和奖励
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

        return { performance, reward };
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

    // ==================== 颜料系统 ====================

    /**
     * 初始化颜料系统
     */
    private initializePaintSystem(): void {
        // 查找或创建PaintManager
        this.paintManager = this.node.scene.getComponentInChildren(PaintManager);

        
    }

    /**
     * 清除所有颜料（游戏重新开始时调用）
     */
    public clearAllPaint(): void {
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
    public sprayPaint(paintPrefab: Prefab, worldPosition: Vec3, vehicleId: string): void {
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
    public getAllVehiclePaintRatios(): { [vehicleId: string]: number } {
        if (this.paintManager) {
            return this.paintManager.getAllPaintRatios();
        }
        return {};
    }

    /**
     * 获取排序后的颜料占比（从高到低）
     * @returns 按占比排序的数组
     */
    public getSortedVehiclePaintRatios(): Array<{ vehicleId: string, ratio: number, count: number }> {
        if (this.paintManager) {
            const sorted = this.paintManager.getSortedPaintRatios();
            // 将ownerId重命名为vehicleId以保持一致性
            return sorted.map(item => ({
                vehicleId: item.ownerId,
                ratio: item.ratio,
                count: item.count
            }));
        }
        return [];
    }

    // ==================== 倒计时系统 ====================

    /**
     * 更新倒计时
     * @param deltaTime 帧时间间隔
     */
    private updateCountdown(deltaTime: number): void {
        this.remainingTime -= deltaTime;

        // 检查是否时间到了
        if (this.remainingTime <= 0) {
            this.remainingTime = 0;
            this.onCountdownFinished();
        }
    }

    /**
     * 倒计时结束处理
     */
    private onCountdownFinished(): void {
        console.log('倒计时结束，游戏结束');
        // 计算最终的颜料占比并结束游戏
        this.gameOver(this.determineWinner());
    }

    /**
     * 确定获胜者（基于新的胜利条件）
     * @returns 是否玩家获胜
     */
    private determineWinner(): boolean {
        // 检查玩家是否存活
        if (this.playerHP <= 0) {
            console.log('玩家已死亡，游戏失败');
            return false;
        }

        // 检查是否所有AI车辆都被摧毁
        if (this.enemyCount <= 0 && this.initialEnemyCount > 0) {
            console.log('所有AI车辆已被摧毁，游戏胜利');
            return true;
        }

        // 获取玩家颜料占比
        if (!this.paintManager) {
            return false; // 如果没有颜料管理器，默认玩家失败
        }

        const playerPaintCount = this.paintManager.getPaintCountByOwner('player');
        const totalPaintCount = this.paintManager.getTotalPaintCount();

        if (totalPaintCount === 0) {
            return false; // 如果没有颜料，默认玩家失败
        }

        const playerRatio = playerPaintCount / totalPaintCount;
        console.log(`玩家颜料占比: ${(playerRatio * 100).toFixed(1)}%`);

        // 玩家存活且颜料占比>25%则获胜
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
    public getRemainingTime(): number {
        return Math.max(0, this.remainingTime);
    }

    /**
     * 获取剩余时间的格式化字符串
     * @returns 格式化的时间字符串 (MM:SS)
     */
    public getFormattedRemainingTime(): string {
        const totalSeconds = Math.ceil(this.getRemainingTime());
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        // 手动实现padStart功能以兼容旧版本
        const minutesStr = minutes < 10 ? '0' + minutes : minutes.toString();
        const secondsStr = seconds < 10 ? '0' + seconds : seconds.toString();

        return `${minutesStr}:${secondsStr}`;
    }



}