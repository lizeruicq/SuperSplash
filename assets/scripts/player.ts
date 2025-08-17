import { _decorator, Component, input, Input, EventKeyboard, KeyCode, Vec2, Vec3, RigidBody2D, ERigidBody2DType, Contact2DType, IPhysics2DContact, BoxCollider2D, Sprite, SpriteFrame, tween, Prefab } from 'cc';
const { ccclass, property } = _decorator;
import { AIPlayer } from './AIPlayer';
import { GameManager } from './GameManager';
import { SoundManager } from './SoundManager';
import { Bullet, WeaponType } from './Bullet';

@ccclass('player')
export class player extends Component {
    @property
    maxSpeed: number = 50; // 最大速度（像素/秒）
    @property
    acceleration: number = 50; // 加速度（像素/秒²）
    @property
    brakeDeceleration: number = 200; // 刹车减速度
    @property
    turnSpeed: number = 200; // 转向速度（度/秒）
    @property
    friction: number = 1.5; // 摩擦力系数
    @property
    initAngle: number = 0; // 初始角度（度），可由外部设置

    @property
    maxHealth: number = 200; // 最大生命值

    @property(SpriteFrame)
    destroyedSprite: SpriteFrame = null!; // 摧毁状态的精灵图

    @property
    removeDelay: number = 3.0; // 摧毁后移除节点的延迟时间（秒）

    // 颜料喷洒相关属性
    @property(Prefab)
    paintPrefab: Prefab = null!; // 颜料预制体

    @property
    paintSprayInterval: number = 0.2; // 颜料喷洒间隔（秒）

    // 武器系统相关属性
    @property({
        type: Prefab,
        tooltip: "普通子弹预制体"
    })
    normalBulletPrefab: Prefab = null!;

    @property({
        type: Prefab,
        tooltip: "火焰预制体"
    })
    dartPrefab: Prefab = null!;

    @property({
        type: Prefab,
        tooltip: "火箭弹预制体"
    })
    rocketPrefab: Prefab = null!;

    @property({
        tooltip: "射速（发/秒）"
    })
    fireRate: number = 2.0;

    @property({
        type: WeaponType,
        tooltip: "武器类型"
    })
    weaponType: WeaponType = WeaponType.NORMAL;



    @property({
        tooltip: "最大弹药数量"
    })
    maxAmmo: number = 20;

    @property({
        tooltip: "弹药补充时间（秒）"
    })
    ammoReloadTime: number = 10.0;

    protected _rigidBody: RigidBody2D = null!;
    private _direction: number = 0; // -1:左, 0:不转, 1:右
    private _accel: number = 0; // -1:刹车, 0:无, 1:加速
    private _angle: number = -90; // 车辆朝向角度（度）
    private _targetAngle: number = -90; // 目标角度
    private _lastValidPosition: Vec2 = new Vec2(); // 上次有效位置

    // 生命值和摧毁相关
    private _currentHealth: number = 100; // 当前生命值
    private _isDestroyed: boolean = false; // 是否已摧毁
    private _originalSprite: SpriteFrame = null!; // 原始精灵图


    // 颜料喷洒相关私有变量
    private _paintTimer: number = 0; // 颜料喷洒计时器
    private _vehicleId: string = 'player'; // 车辆唯一ID

    // 武器系统相关私有变量
    private _canFire: boolean = true; // 是否可以射击
    private _fireTimer: number = 0; // 射击计时器
    private _currentAmmo: number = 20; // 当前弹药数量
    private _isReloading: boolean = false; // 是否正在补充弹药
    private _reloadTimer: number = 0; // 弹药补充计时器

    onLoad() {
        // 确保在组件加载时初始化
        this._rigidBody = null!;
        this._direction = 0;
        this._accel = 0;
        this._angle = -90;
        this._targetAngle = -90;
        this._lastValidPosition = new Vec2();

        // 初始化生命值和摧毁状态
        this._currentHealth = this.maxHealth;
        this._isDestroyed = false;

        // 初始化颜料喷洒相关
        this._paintTimer = 0;
        this._vehicleId = 'player';

        // 初始化武器系统相关
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
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
        
        // 清理刚体引用
        this._rigidBody = null!;
        // 注销碰撞回调
        const collider = this.getComponent(BoxCollider2D);
        if (collider) {
            collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    start() {
        // 获取刚体组件
        this._rigidBody = this.getComponent(RigidBody2D)!;
        if (!this._rigidBody || !this.node || !this.node.isValid) {
            console.error('player requires RigidBody2D component and valid node');
            return;
        }

        // 设置刚体属性
        this._rigidBody.type = ERigidBody2DType.Dynamic;
        this._rigidBody.allowSleep = false; // 不允许休眠
        this._rigidBody.gravityScale = 0; // 无重力
        this._rigidBody.linearDamping = 0.3; // 降低线性阻尼
        this._rigidBody.angularDamping = 0.9; // 增加角阻尼防止过度旋转
        this._rigidBody.fixedRotation = true; // 固定旋转，手动控制

        // 记录初始位置
        this._lastValidPosition = new Vec2(this.node.worldPosition.x, this.node.worldPosition.y);

        // 设置初始角度
        this._angle = this.initAngle;
        this._targetAngle = this.initAngle;
        this.node.setRotationFromEuler(0, 0, this.initAngle);

        // 保存原始精灵图
        const sprite = this.getComponent(Sprite);
        if (sprite && sprite.spriteFrame) {
            this._originalSprite = sprite.spriteFrame;
        }

        // 注册碰撞回调
        const collider = this.getComponent(BoxCollider2D);
        if (collider) {
            console.log('BoxCollider2D component found and registered');
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        } else {
            console.error('BoxCollider2D component not found');
        }
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.ARROW_UP:
                this._accel = 1;
                break;
            case KeyCode.ARROW_DOWN:
                this._accel = -1;
                break;
            case KeyCode.ARROW_LEFT:
                SoundManager.instance.playSoundEffect('carDrift');
                this._direction = -1;
                break;
            case KeyCode.ARROW_RIGHT:
                SoundManager.instance.playSoundEffect('carDrift');
                this._direction = 1;
                break;
            case KeyCode.SPACE:
                this.shoot();
                break;
        }
    }

    onKeyUp(event: EventKeyboard) {
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

    update(deltaTime: number) {
        if (!this._rigidBody || !this.node || !this.node.isValid) return;

        // 如果车辆已摧毁，执行摧毁动画逻辑
        if (this._isDestroyed) {
            // this.updateDestroyAnimation();
            return;
        }

        // 获取当前速度和位置
        const currentVelocity = this._rigidBody.linearVelocity;
        const currentSpeed = currentVelocity.length();
        const currentPos = new Vec2(this.node.worldPosition.x, this.node.worldPosition.y);

        // 更新目标角度（转向）
        if (this._direction !== 0) {
            const turnAmount = this.turnSpeed * deltaTime * this._direction;
            this._targetAngle -= turnAmount;
        }

        // 平滑角度插值，防止突然转向
        const angleDiff = this._targetAngle - this._angle;
        if (Math.abs(angleDiff) > 0.1) {
            this._angle += angleDiff * 0.1; // 平滑插值
        } else {
            this._angle = this._targetAngle;
        }

        // 设置节点旋转
        this.node.setRotationFromEuler(0, 0, this._angle);

        // 前进
        if (this._accel === 1) {
            // 正常加速
            const rad = (this._angle + 90) * Math.PI / 180;
            const force = new Vec2(
                Math.cos(rad) * this.acceleration,
                Math.sin(rad) * this.acceleration
            );
            this._rigidBody.applyForce(force, currentPos, true);
        }
        // 刹车
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
        }
        // 松开加速/刹车键
        else {
            // 增大摩擦力，让车辆更快停下来
            if (currentSpeed > 1) {
                const frictionForce = currentVelocity.clone().multiplyScalar(-this.friction * 2); // 2倍摩擦
                this._rigidBody.applyForce(frictionForce, currentPos, true);
            }
        }

        // 限制最大速度
        if (currentSpeed > this.maxSpeed) {
            const normalizedVelocity = currentVelocity.clone().normalize();
            this._rigidBody.linearVelocity = normalizedVelocity.multiplyScalar(this.maxSpeed);
        }

        // 防止车辆卡住或异常位置
        if (currentSpeed < 0.1) {
            // 如果速度很小，重置到上次有效位置附近
            const distanceToLastPos = Vec2.distance(currentPos, this._lastValidPosition);
            if (distanceToLastPos > 50) { // 如果偏离太远
                this.node.setWorldPosition(this._lastValidPosition.x, this._lastValidPosition.y, this.node.worldPosition.z);
                this._rigidBody.linearVelocity = new Vec2(0, 0);
            }
        } else {
            // 更新有效位置
            this._lastValidPosition = currentPos.clone();
        }

        // 防止车辆旋转过度
        if (Math.abs(this._angle) > 360) {
            this._angle = this._angle % 360;
            this._targetAngle = this._targetAngle % 360;
        }

        // 更新颜料喷洒
        this.updatePaintSpray(deltaTime);

        // 更新武器系统
        this.updateWeaponSystem(deltaTime);
    }

    public init(angle: number) {
        this.initAngle = angle;
        this._angle = angle;
        this._targetAngle = angle;
        this.node.setRotationFromEuler(0, 0, angle);
    }

    /**
     * 获取玩家车辆的刚体组件
     */
    public getRigidBody(): RigidBody2D {
        return this._rigidBody;
    }

    /**
     * 玩家车辆与AI车辆碰撞时，按双方速度造成伤害
     */
    onBeginContact(_selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, _contact: IPhysics2DContact | null) {
        SoundManager.instance.playSoundEffect('carCollision');
        console.log('玩家车辆发生碰撞，碰撞对象:', otherCollider.node.name);
        // 判断对方是否为AI车辆
        const otherNode = otherCollider.node;
        const aiPlayer = otherNode.getComponent(AIPlayer);
        if (aiPlayer) {
            console.log('碰撞对象是AI车辆:', otherNode.name);
            // 获取双方速度
            const mySpeed = this._rigidBody.linearVelocity.length();
            const aiRigidBody = aiPlayer.node.getComponent(RigidBody2D);
            const aiSpeed = aiRigidBody ? aiRigidBody.linearVelocity.length() : 0;
            // 伤害计算：对方受到我速度*系数的伤害，我受到对方速度*系数的伤害
            const damageFactor = 0.5; // 可调节
            const aiDamage = Math.round(mySpeed * damageFactor);
            const playerDamage = Math.round(aiSpeed * damageFactor);
            // 造成伤害
            aiPlayer.takeDamage(aiDamage);
            
            // 施加反作用力
            const recoilForce = new Vec2(this._rigidBody.linearVelocity.x, this._rigidBody.linearVelocity.y);
            recoilForce.normalize(); // 归一化方向
            recoilForce.multiplyScalar(-mySpeed * 0.05); // 根据速度大小施加反作用力
            this._rigidBody.linearVelocity = recoilForce;
            
            this.takeDamage(playerDamage);
        }
        // 判断对方是否为子弹
        else {
            const bullet = otherNode.getComponent(Bullet) ;
            if (bullet) {
                // 检查是否为自己发射的子弹
                if (bullet['_shooterId'] === 'player') {
                    // 自己发射的子弹不造成伤害和反作用力
                    console.log('玩家与自己发射的子弹碰撞，不造成伤害和反作用力');
                    return;
                } else {
                    // 其他子弹造成伤害
                    const bulletDamage = bullet['damage'] || 5;
                    this.takeDamage(bulletDamage);
                    
                    // 施加反作用力（只有非普通子弹才施加物理推力）
                    // 火焰子弹(FLAME)已被注释，所以只检查是否为普通子弹
                    if (bullet['bulletType'] === 0) { // 0是NORMAL类型
                        const recoilForce = new Vec2(this._rigidBody.linearVelocity.x, this._rigidBody.linearVelocity.y);
                        recoilForce.normalize();
                        recoilForce.multiplyScalar(-bulletDamage * 0.5); // 根据子弹伤害施加反作用力
                        this._rigidBody.linearVelocity = recoilForce;
                    }
                    
                    console.log('玩家被子弹击中，造成伤害:', bulletDamage);
                }
            }
            // 检测与地图边界的碰撞
            else {
                const mySpeed = this._rigidBody.linearVelocity.length();
                const damageFactor = 0.3; // 地图边界碰撞的伤害系数
                const boundaryDamage = Math.round(mySpeed * damageFactor);
                
                // 施加反作用力
                const recoilForce = new Vec2(this._rigidBody.linearVelocity.x, this._rigidBody.linearVelocity.y);
                recoilForce.normalize(); // 归一化方向
                recoilForce.multiplyScalar(-mySpeed * 0.05); // 根据速度大小施加反作用力
                this._rigidBody.linearVelocity = recoilForce;
                
                this.takeDamage(boundaryDamage);
            }
        }
    }

    // ==================== 生命值和摧毁系统 ====================

    /**
     * 受到伤害
     */
    public takeDamage(damage: number) {
        if (this._isDestroyed) return;

        this._currentHealth = Math.max(0, this._currentHealth - damage);
        console.log(`玩家受到伤害: ${damage}, 剩余生命值: ${this._currentHealth}`);

        // 同步GameManager中的玩家血量显示
        const gameManager = GameManager.getInstance();
        if (gameManager) {
            gameManager.syncPlayerHealth();
        }

        // 检查是否死亡
        if (this._currentHealth <= 0) {
            this.destroyVehicle();
        }
    }

    /**
     * 摧毁车辆
     */
    private destroyVehicle() {
        if (this._isDestroyed) return;
        SoundManager.instance.playSoundEffect('carDestruction');
        this._isDestroyed = true;
        console.log('玩家车辆被摧毁！');

        // 切换到摧毁状态的精灵图
        if (this.destroyedSprite) {
            const sprite = this.getComponent(Sprite);
            if (sprite) {
                sprite.spriteFrame = this.destroyedSprite;
            }
        }

        // 禁用输入控制
        this.disableInput();

        // 开始摧毁动画，并在动画完成后触发游戏结束
        this.startDestroyAnimation();

        // 延迟移除节点（可选，通常玩家车辆不移除）
        // this.scheduleRemoveNode();
    }

    /**
     * 禁用输入控制
     */
    private disableInput() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);

        // 重置控制状态
        this._direction = 0;
        this._accel = 0;
    }



    /**
     * 移除车辆节点（可选功能，通常玩家车辆不使用）
     */
    private removeVehicleNode() {
        if (this.node && this.node.isValid) {
            console.log('移除玩家车辆节点');
            this.node.removeFromParent();
        }
    }

    /**
     * 开始摧毁动画
     */
    private startDestroyAnimation() {
        // 使用缓动动画让车辆逐渐停止并可能添加一些视觉效果
        if (this.node) {
            // 可以添加旋转、缩放等效果
            tween(this.node)
                .to(2.0, {
                    scale: new Vec3(1, 1, 1),  // 稍微缩小
                    angle: this.node.angle + 180 // 旋转180度
                })
                .call(() => {
                    // 动画完成后触发游戏结束
                    this.onDestroyAnimationComplete();
                })
                .start();
        }
    }

    /**
     * 摧毁动画完成回调
     */
    private onDestroyAnimationComplete() {
        console.log('玩家车辆摧毁动画完成，触发游戏结束');
        const gameManager = GameManager.getInstance();
        if (gameManager) {
            gameManager.gameOver(false); // false表示玩家失败
        }
    }



    // ==================== 公共方法 ====================

    /**
     * 获取当前生命值
     */
    public getCurrentHealth(): number {
        return this._currentHealth;
    }

    /**
     * 获取最大生命值
     */
    public getMaxHealth(): number {
        return this.maxHealth;
    }

    /**
     * 是否已摧毁
     */
    public isDestroyed(): boolean {
        return this._isDestroyed;
    }

    /**
     * 恢复车辆（用于重新开始游戏）
     */
    public restoreVehicle() {
        // 取消移除节点的计划
        this.unschedule(this.removeVehicleNode);

        this._isDestroyed = false;
        this._currentHealth = this.maxHealth;

        // 恢复原始精灵图
        if (this._originalSprite) {
            const sprite = this.getComponent(Sprite);
            if (sprite) {
                sprite.spriteFrame = this._originalSprite;
            }
        }

        // 重新启用输入
        this.onEnable();

        // 恢复节点状态
        if (this.node) {
            this.node.setScale(1, 1);
            this.node.angle = this.initAngle;
        }

        // 重置速度
        if (this._rigidBody) {
            this._rigidBody.linearVelocity = new Vec2(0, 0);
        }

        console.log('玩家车辆已恢复');
    }

    // ==================== 颜料喷洒系统 ====================

    /**
     * 更新颜料喷洒
     * @param deltaTime 帧时间间隔
     */
    private updatePaintSpray(deltaTime: number): void {
        if (this._isDestroyed || !this.paintPrefab) return;

        // 更新计时器
        this._paintTimer += deltaTime;

        // 检查是否到了喷洒时间
        if (this._paintTimer >= this.paintSprayInterval) {
            this.sprayPaint();
            this._paintTimer = 0; // 重置计时器
        }
    }

    /**
     * 喷洒颜料
     */
    private sprayPaint(): void {
        const gameManager = GameManager.getInstance();
        if (!gameManager) {
            console.warn('GameManager未找到，无法喷洒颜料');
            return;
        }

        // 获取当前车辆的世界位置
        const worldPosition = this.node.getWorldPosition();

        // 通过GameManager喷洒颜料
        gameManager.sprayPaint(this.paintPrefab, worldPosition, this._vehicleId);
    }

    // ==================== 武器系统 ====================

    /**
     * 更新武器系统
     * @param deltaTime 帧时间间隔
     */
    private updateWeaponSystem(deltaTime: number): void {
        if (this._isDestroyed) return;

        // 更新射击计时器
        this._fireTimer += deltaTime;

        // 检查是否可以射击
        const fireInterval = 1 / this.fireRate;
        if (this._fireTimer >= fireInterval) {
            this._canFire = true;
        }

        // 更新弹药补充
        this.updateAmmoReload(deltaTime);
    }

    /**
     * 更新弹药补充
     * @param deltaTime 帧时间间隔
     */
    private updateAmmoReload(deltaTime: number): void {
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
    public shoot(): void {
        if (!this._canFire || this._isDestroyed) return;

        // 检查弹药
        if (this._currentAmmo <= 0) {
            if (!this._isReloading) {
                this.startReload();
            }
            return;
        }

        // 重置射击状态
        this._canFire = false;
        this._fireTimer = 0;
        this._currentAmmo--;

        // 根据武器类型选择子弹预制体
        let bulletPrefab: Prefab | null = null;
        switch (this.weaponType) {
            case WeaponType.NORMAL:
                console.log('发射普通子弹');
                bulletPrefab = this.normalBulletPrefab;
                break;
            case WeaponType.DART:
                bulletPrefab = this.dartPrefab;
                break;
            case WeaponType.ROCKET:
                bulletPrefab = this.rocketPrefab;
                break;
        }

        // 检查预制体是否存在
        if (!bulletPrefab) {
            console.warn('子弹预制体未设置');
            // 允许重新射击
            this._canFire = true;
            return;
        }

        // 获取当前车辆的朝向
        const rad = (this._angle + 90) * Math.PI / 180;
        const direction = new Vec2(Math.cos(rad), Math.sin(rad));

        // 计算子弹发射位置（车辆正前方）
        const vehicleWorldPos = this.node.worldPosition;
        const offsetDistance = 30; // 子弹发射偏移距离（像素）
        const bulletStartPos = new Vec3(
            vehicleWorldPos.x + direction.x * offsetDistance,
            vehicleWorldPos.y + direction.y * offsetDistance,
            vehicleWorldPos.z
        );

        // 获取GameManager实例并发射子弹
        const gameManager = GameManager.getInstance();
        if (gameManager) {
            gameManager.fireBullet(bulletPrefab, bulletStartPos, direction, this._vehicleId, this.weaponType);
        }

        // 播放射击音效
        SoundManager.instance.playSoundEffect('weaponFire');

        // 检查是否需要开始补充弹药
        if (this._currentAmmo <= 0 && !this._isReloading) {
            this.startReload();
        }
    }

    /**
     * 开始补充弹药
     */
    private startReload(): void {
        this._isReloading = true;
        this._reloadTimer = 0;
        console.log('开始补充弹药...');
    }

    /**
     * 获取当前弹药数量
     */
    public getCurrentAmmo(): number {
        return this._currentAmmo;
    }

    /**
     * 获取最大弹药数量
     */
    public getMaxAmmo(): number {
        return this.maxAmmo;
    }

    /**
     * 是否正在补充弹药
     */
    public isReloading(): boolean {
        return this._isReloading;
    }

    /**
     * 获取弹药补充进度（0-1）
     */
    public getReloadProgress(): number {
        if (!this._isReloading) return 1;
        return this._reloadTimer / this.ammoReloadTime;
    }

    // ==================== 外部控制接口 ====================

    /**
     * 设置加速度（外部控制接口）
     * @param accel 加速度值：1为前进，-1为后退，0为停止
     */
    public setAcceleration(accel: number): void {
        console.log(`Player: 设置加速度为 ${accel}`);
        this._accel = accel;
    }

    /**
     * 设置转向（外部控制接口）
     * @param direction 转向值：1为右转，-1为左转，0为直行
     */
    public setDirection(direction: number): void {
        console.log(`Player: 设置转向为 ${direction}`);
        // 如果开始转向，播放漂移音效
        if (direction !== 0 && this._direction === 0) {
            SoundManager.instance.playSoundEffect('carDrift');
        }
        this._direction = direction;
    }

    /**
     * 获取当前加速度状态
     */
    public getAcceleration(): number {
        return this._accel;
    }

    /**
     * 获取当前转向状态
     */
    public getDirection(): number {
        return this._direction;
    }

}

