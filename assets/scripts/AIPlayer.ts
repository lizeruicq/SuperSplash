import { _decorator, Component, Node, Vec2, Vec3, RigidBody2D, ERigidBody2DType, math, BoxCollider2D, Contact2DType, ProgressBar, Sprite, SpriteFrame, tween } from 'cc';
import { HealthBarUI } from './HealthBarUI';
import { player } from './player';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('AIPlayer')
export class AIPlayer extends Component {
    @property
    maxSpeed: number = 50;
    @property
    acceleration: number = 50;
    @property
    brakeDeceleration: number = 200;
    @property
    turnSpeed: number = 50;
    @property
    friction: number = 1.5;
    @property
    initAngle: number = 0;

    @property
    maxHealth: number = 30; // 最大生命值

    @property(ProgressBar)
    healthBar: ProgressBar = null!; // 血条UI组件

    @property(SpriteFrame)
    destroyedSprite: SpriteFrame = null!; // 摧毁状态的精灵图

    @property
    removeDelay: number = 3.0; // 摧毁后移除节点的延迟时间（秒）

    private _rigidBody: RigidBody2D = null!;
    private _direction: number = 0; // -1:左, 0:不转, 1:右
    private _accel: number = 0; // -1:刹车, 0:无, 1:加速
    private _angle: number = 0;
    private _targetAngle: number = 0;
    private _lastValidPosition: Vec2 = new Vec2();
    private _currentHealth: number = 100; // 当前生命值

    // 摧毁相关
    private _isDestroyed: boolean = false; // 是否已摧毁
    private _originalSprite: SpriteFrame = null!; // 原始精灵图
    private _destroyAnimationSpeed: number = 0.95; // 摧毁动画速度衰减系数

    onLoad() {
        this._rigidBody = null!;
        this._direction = 0;
        this._accel = 0;
        this._angle = 0;
        this._targetAngle = 0;
        this._lastValidPosition = new Vec2();

        // 初始化摧毁状态
        this._isDestroyed = false;
    }

    start() {
        this._rigidBody = this.getComponent(RigidBody2D)!;
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
        this.node.setRotationFromEuler(0, 0, this.initAngle);

        // 初始化血条
        this.initHealthBar();

        // 保存原始精灵图
        const sprite = this.getComponent(Sprite);
        if (sprite && sprite.spriteFrame) {
            this._originalSprite = sprite.spriteFrame;
        }

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
    private initHealthBar() {
        this._currentHealth = this.maxHealth;
        
        // 如果没有手动设置血条UI，尝试自动查找
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
    private updateHealthBar() {
        if (this.healthBar) {
            
            this.healthBar.progress = this._currentHealth / this.maxHealth;
            console.log('AIPlayer updating health bar:', this._currentHealth / this.maxHealth);
        }
    }

    update(deltaTime: number) {
        if (!this._rigidBody || !this.node || !this.node.isValid) return;

        // 如果车辆已摧毁，执行摧毁动画逻辑
        if (this._isDestroyed) {

            return;
        }
        
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
                this._rigidBody.linearVelocity = Vec2.ZERO;
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
    }

    // 供AI控制器调用的接口
    public setAccel(accel: number) {
        this._accel = accel;
    }
    
    public setDirection(direction: number) {
        this._direction = direction;
    }
    
    public setTargetAngle(angle: number) {
        this._targetAngle = angle;
    }
    
    public getCurrentAngle(): number {
        return this._angle;
    }
    
    public init(angle: number) {
        this.initAngle = angle;
        this._angle = angle;
        this._targetAngle = angle;
        this.node.setRotationFromEuler(0, 0, angle);
    }

    // 血量管理接口
    /**
     * 设置当前生命值
     */
    public setHealth(health: number) {
        this._currentHealth = Math.max(0, Math.min(health, this.maxHealth));
        this.updateHealthBar();
    }

    /**
     * 减少生命值
     */
    public takeDamage(damage: number) {
        if (this._isDestroyed) return;

        console.log('AIPlayer taking damage:', damage);
        this.setHealth(this._currentHealth - damage);
        this.updateHealthBar();

        // 检查是否死亡
        if (this._currentHealth <= 0) {
            this.destroyVehicle();
        }
    }

    /**
     * 恢复生命值
     */
    public heal(amount: number) {
        this.setHealth(this._currentHealth + amount);
        this.updateHealthBar();
    }

    /**
     * 获取当前生命值
     */
    public getHealth(): number {
        return this._currentHealth;
    }

    /**
     * 获取最大生命值
     */
    public getMaxHealth(): number {
        return this.maxHealth;
    }

    /**
     * 检查是否死亡
     */
    public isDead(): boolean {
        return this._currentHealth <= 0;
    }

    /**
     * 碰撞事件处理
     */
    onCollisionEnter(other: BoxCollider2D, self: BoxCollider2D) {
        console.log('AIPlayer collided with something');
        const playerComponent = other.node.getComponent<player>(player);
        if (playerComponent) {
            console.log('AIPlayer 被玩家车辆撞击');
            const playerRigidBody = playerComponent.getRigidBody();
            if (playerRigidBody) {
                const impactForce = new Vec2(playerRigidBody.linearVelocity.x, playerRigidBody.linearVelocity.y);
                impactForce.normalize(); // 归一化方向
                impactForce.multiplyScalar(100); // 增加冲力强度
                this._rigidBody.linearVelocity = impactForce;
            }

        }
    }

    // ==================== 摧毁系统 ====================

    /**
     * 摧毁车辆
     */
    private destroyVehicle() {
        if (this._isDestroyed) return;

        this._isDestroyed = true;
        console.log('AI车辆被摧毁！');

        // 切换到摧毁状态的精灵图
        if (this.destroyedSprite) {
            const sprite = this.getComponent(Sprite);
            if (sprite) {
                sprite.spriteFrame = this.destroyedSprite;
            }
        }

        // 隐藏血条
        if (this.healthBar && this.healthBar.node) {
            this.healthBar.node.active = false;
        }

        // 开始摧毁动画
        this.startDestroyAnimation();

        // 立即更新敌人数量（不等待节点移除）
        this.updateEnemyCount();

        // 延迟移除节点
        this.scheduleRemoveNode();
    }

    /**
     * 更新敌人数量
     */
    private updateEnemyCount() {
        const gameManager = GameManager.getInstance();
        if (gameManager) {
            // 计算当前存活的AI数量
            const allAIPlayers = gameManager.getAIPlayers();
            const aliveCount = allAIPlayers.filter((ai: AIPlayer) => !ai.isDestroyed()).length;
            gameManager.refreshEnemyCount(aliveCount);
        }
    }

    /**
     * 安排移除节点
     */
    private scheduleRemoveNode() {
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
    private removeVehicleNode() {
        if (this.node && this.node.isValid) {
            console.log('移除AI车辆节点');

            // 从GameManager的AI列表中移除
            const gameManager = GameManager.getInstance();
            if (gameManager) {
                const aiPlayers = gameManager.getAIPlayers();
                const index = aiPlayers.indexOf(this);
                if (index !== -1) {
                    aiPlayers.splice(index, 1);
                }

                // 再次更新敌人数量（基于实际存在的AI数量）
                gameManager.refreshEnemyCount(aiPlayers.length);
            }

            // 移除节点
            this.node.removeFromParent();
        }
    }

    /**
     * 开始摧毁动画
     */
    private startDestroyAnimation() {
        if (this.node) {
            // 添加摧毁动画效果
            tween(this.node)
                .to(2.0, {
                    scale: new Vec3(1.1, 1.1, 1),  // 稍微缩小
                    // angle: this.node.angle + 180 // 旋转180度
                })
                .start();
        }
    }

    /**
     * 更新摧毁动画
     */
   

    /**
     * 是否已摧毁
     */
    public isDestroyed(): boolean {
        return this._isDestroyed;
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
}