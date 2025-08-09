import { _decorator, Component, Vec2, RigidBody2D, Contact2DType, IPhysics2DContact, Collider2D, Enum, instantiate, Prefab, tween, Vec3, Animation, AnimationEventType, director, Director } from 'cc';
import { player } from './player';
import { AIPlayer } from './AIPlayer';
import { SoundManager } from './SoundManager';
import { GameManager } from './GameManager';

const { ccclass, property } = _decorator;

// 定义武器类型枚举
export enum WeaponType {
    NORMAL = 0,  // 普通子弹
    // FLAME = 1,   // 火焰喷射
    ROCKET = 2   // 火箭弹
}

// 定义子弹类型枚举
export enum BulletType {
    NORMAL = 0,  // 普通子弹
    // FLAME = 1,   // 火焰
    ROCKET = 2   // 火箭弹
}

// 将枚举注册到Cocos Creator中
Enum(WeaponType);
Enum(BulletType);

@ccclass('Bullet')
export class Bullet extends Component {
    @property
    speed: number = 50; // 子弹速度

    @property
    damage: number = 5; // 伤害值

    @property({
        type: BulletType,
        tooltip: "子弹类型"
    })
    bulletType: BulletType = BulletType.NORMAL;

    @property({
        tooltip: "子弹存活时间（秒）"
    })
    lifeTime: number = 3.0;

    @property({
        type: Prefab,
        tooltip: "爆炸效果预制体（火箭弹专用）"
    })
    explosionPrefab: Prefab = null!;

    @property({
        tooltip: "爆炸范围（火箭弹专用）"
    })
    explosionRadius: number = 300;

    private _shooterId: string = ''; // 发射者ID
    private _rigidBody: RigidBody2D = null!;
    private _direction: Vec2 = new Vec2(0, 1); // 默认向上
    private _velocity: Vec2 = new Vec2(0, 0);
    private _timer: number = 0;
    private _isExploding: boolean = false; // 是否正在爆炸
    private _pendingDestroy: boolean = false; // 延迟销毁标记，避免在物理回调中立刻销毁

    onLoad() {
        // if(this.bulletType!= BulletType.FLAME)
        // {
        this._rigidBody = this.getComponent(RigidBody2D);
        if (!this._rigidBody) {
            console.error('Bullet: RigidBody2D组件未找到');
        // }
        }
       

        // 注册碰撞回调
        const collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    start() {
        // // 根据子弹类型调整属性
        // this.adjustBulletProperties();
    }

    update(deltaTime: number) {
        // 如果正在爆炸，则不再更新位置
        if (this._isExploding) {
            return;
        }

        this._timer += deltaTime;

        // 检查是否超过存活时间
        if (this._timer >= this.lifeTime) {
            // 火箭弹超时爆炸
            if (this.bulletType === BulletType.ROCKET) {
                this.handleTimeoutExplosion();
                return;
            }
            this.destroyBullet();
            return;
        }

        // 更新位置
        if (this._rigidBody) {
            this._velocity.set(this._direction.x * this.speed, this._direction.y * this.speed);
            this._rigidBody.linearVelocity = this._velocity;
        }
    }

    /**
     * 初始化子弹
     * @param direction 子弹方向
     * @param shooterId 发射者ID
     */
    public init(direction: Vec2, shooterId: string) {
        this._direction = direction.normalize();
        this._shooterId = shooterId;

    //     if(this.bulletType!= BulletType.FLAME)
    //     {
    // // 设置初始旋转角度
        const angle = Math.atan2(direction.y, direction.x) * 180 / Math.PI;
        this.node.setRotationFromEuler(0, 0, angle - 90);
    // }
        }    

    /**
     * 碰撞回调
     */
    private onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact) {
        const otherNode = otherCollider.node;
        
        // 不与发射者碰撞
        const otherVehicleId = this.getVehicleId(otherNode);
        if (otherVehicleId === this._shooterId) {
            return;
        }

        // 检查是否碰撞到车辆
        const playerComponent = otherNode.getComponent(player);
        const aiPlayerComponent = otherNode.getComponent(AIPlayer);

        if (playerComponent || aiPlayerComponent) {
            this.handleVehicleHit(otherNode, playerComponent, aiPlayerComponent);
        } else {
            // 碰撞到其他物体（如墙壁）
            this.handleObstacleHit();
        }
    }

    /**
     * 处理车辆碰撞
     */
    private handleVehicleHit(vehicleNode: any, playerComponent: player | null, aiPlayerComponent: AIPlayer | null) {
        console.log('子弹撞击类型',this.bulletType);
        switch (this.bulletType) {
            case BulletType.NORMAL:
                this.handleNormalBulletHit(playerComponent, aiPlayerComponent);
                // 普通子弹碰撞后也产生爆炸效果
                this.handleBulletExplosion();
                return;
            // case BulletType.FLAME:
            //     this.handleFlameHit(aiPlayerComponent);
            //     return;
            case BulletType.ROCKET:
                this.handleRocketHit(vehicleNode);
                // 火箭弹由 handleRocketHit 方法负责销毁，这里直接返回
                return;
        }

        // // 播放音效
        // this.playHitSound();
        
        // // 销毁子弹（仅适用于普通子弹和火焰子弹）
        // this.destroyBullet();
    }

    /**
     * 处理普通子弹碰撞
     */
    private handleNormalBulletHit(playerComponent: player | null, aiPlayerComponent: AIPlayer | null) {
        if (playerComponent) {
            playerComponent.takeDamage(this.damage);
        } else if (aiPlayerComponent) {
            aiPlayerComponent.takeDamage(this.damage);
        }
    }

    /**
     * 处理子弹爆炸效果（普通子弹使用）
     */
    private handleBulletExplosion() {
        // 设置爆炸标志
        this._isExploding = true;
        
        // 停止移动
        this.stopMovement();
        
        // 创建爆炸效果
        this.createBulletExplosion();
        
        // 播放音效
        SoundManager.instance.playSoundEffect('bulletHit');
    }

    /**
     * 处理火箭弹碰撞
     */
    private handleRocketHit(hitVehicleNode: any) {
        // 设置爆炸标志
        this._isExploding = true;
        
        // 停止移动
        this.stopMovement();
        
        // 创建爆炸效果
        this.createRocketExplosion();

        // 范围伤害
        this.dealExplosionDamage();
        
        // 清除爆炸范围内的颜料
        this.clearPaintInRange();
        
        // 播放音效
        SoundManager.instance.playSoundEffect('explosion');
    }

    /**
     * 处理火箭弹超时爆炸
     */
    private handleTimeoutExplosion() {
        // 设置爆炸标志
        this._isExploding = true;
        
        // 停止移动
        this.stopMovement();
        
        // 创建爆炸效果
        this.createRocketExplosion();

        // 清除爆炸范围内的颜料
        this.clearPaintInRange();

        // 范围伤害
        this.dealExplosionDamage();
        
        // 播放音效
        SoundManager.instance.playSoundEffect('explosion');
    }

    /**
     * 创建普通子弹爆炸效果
     */
    private createBulletExplosion() {
        if (this.explosionPrefab) {
            const explosion = instantiate(this.explosionPrefab);
            // 将爆炸效果添加为子弹节点的子节点
            this.node.addChild(explosion);
            // 重置位置，使其与子弹节点重合
            explosion.setPosition(Vec3.ZERO);

            // 获取动画组件并播放动画
            const animationComponent = explosion.getComponent(Animation);
            if (animationComponent) {
                // 播放动画并在0.3秒后销毁
                animationComponent.play('explosion');
                this.scheduleOnce(() => {
                    if (explosion && explosion.isValid) {
                        explosion.destroy();
                    }
                    this.destroyBullet();
                }, 0.3);
            } else {
                // 如果没有动画组件，使用tween动画
                tween(explosion)
                    .to(0.3, { scale: new Vec3(1.5, 1.5, 1) })
                    .delay(0.3)
                    .call(() => {
                        if (explosion && explosion.isValid) {
                            explosion.destroy();
                        }
                        this.destroyBullet();
                    })
                    .start();
            }
        } else {
            // 如果没有爆炸预制体，直接销毁子弹
            this.destroyBullet();
        }
    }

    /**
     * 创建火箭弹爆炸效果
     */
    private createRocketExplosion() {
        if (this.explosionPrefab) {
            const explosion = instantiate(this.explosionPrefab);
            // 将爆炸效果添加为子弹节点的子节点
            this.node.addChild(explosion);
            // 重置位置，使其与子弹节点重合
            explosion.setPosition(Vec3.ZERO);

            // 获取动画组件并播放动画
            const animationComponent = explosion.getComponent(Animation);
            if (animationComponent) {
                // 播放动画并在0.5秒后销毁
                animationComponent.play('explosion');
                this.scheduleOnce(() => {
                    if (explosion && explosion.isValid) {
                        explosion.destroy();
                    }
                    this.destroyBullet();
                }, 0.5);
            } else {
                // 如果没有动画组件，使用tween动画
                tween(explosion)
                    .to(0.5, { scale: new Vec3(2, 2, 1) })
                    .delay(0.5)
                    .call(() => {
                        if (explosion && explosion.isValid) {
                            explosion.destroy();
                        }
                        this.destroyBullet();
                    })
                    .start();
            }
        } else {
            // 如果没有爆炸预制体，直接销毁子弹
            this.destroyBullet();
        }
    }

    /**
     * 处理爆炸范围伤害
     */
    private dealExplosionDamage() {
        // 获取场景中所有车辆
        const allVehicles = this.getAllVehiclesInRange();
        
        allVehicles.forEach(vehicle => {
            const distance = Vec2.distance(
                new Vec2(this.node.worldPosition.x, this.node.worldPosition.y),
                new Vec2(vehicle.node.worldPosition.x, vehicle.node.worldPosition.y)
            );

            if (distance <= this.explosionRadius) {
                // 根据距离计算伤害衰减
                const damageRatio = 1 - (distance / this.explosionRadius);
                const actualDamage = this.damage * damageRatio;
                
                vehicle.takeDamage(actualDamage);
            }
        });
    }

    /**
     * 清除爆炸范围内的颜料
     */
    private clearPaintInRange() {
        // 获取GameManager单例
        const gameManager = GameManager.getInstance();
        if (!gameManager) {
            console.warn('Bullet: 无法获取GameManager单例');
            return;
        }

        // 通过GameManager获取PaintManager实例
        const paintManager = gameManager.getPaintManager();
        if (!paintManager) {
            console.warn('Bullet: 无法获取PaintManager实例');
            return;
        }

        // 获取爆炸中心位置
        const explosionCenter = new Vec2(this.node.worldPosition.x, this.node.worldPosition.y);
        
        // 使用PaintManager的公共方法清除范围内的颜料
        const removedCount = paintManager.clearPaintInRange(explosionCenter, this.explosionRadius);
        
        console.log(`火箭弹爆炸清除了 ${removedCount} 个颜料`);
    }

    /**
     * 获取范围内的所有车辆
     */
    private getAllVehiclesInRange(): any[] {
        const vehicles: any[] = [];
        
        // 查找所有玩家车辆
        const playerNodes = this.node.scene?.getComponentsInChildren(player) || [];
        playerNodes.forEach(p => {
            if (this.getVehicleId(p.node) !== this._shooterId) {
                vehicles.push(p);
            }
        });

        // 查找所有AI车辆
        const aiNodes = this.node.scene?.getComponentsInChildren(AIPlayer) || [];
        aiNodes.forEach(ai => {
            if (this.getVehicleId(ai.node) !== this._shooterId) {
                vehicles.push(ai);
            }
        });

        return vehicles;
    }

    /**
     * 处理障碍物碰撞
     */
    private handleObstacleHit() {
        if (this.bulletType === BulletType.ROCKET) {
            // 火箭弹碰撞障碍物也会爆炸
            this.handleRocketHit(null);
            return;
        }
        
        // 播放音效并销毁普通子弹
        this.playHitSound();
        this.destroyBullet();
    }

    /**
     * 停止移动
     */
    private stopMovement() {
        if (this._rigidBody) {
            this._rigidBody.linearVelocity = Vec2.ZERO;
            // 同时清空_velocity，防止其他地方误用
            // this._velocity.set(0, 0);
        }
    }



    /**
     * 获取车辆ID
     */
    private getVehicleId(vehicleNode: any): string {
        const playerComp = vehicleNode.getComponent(player);
        const aiComp = vehicleNode.getComponent(AIPlayer);
        
        if (playerComp) {
            return 'player';
        } else if (aiComp) {
            return aiComp.getVehicleId ? aiComp.getVehicleId() : 'ai_unknown';
        }
        
        return 'unknown';
    }

    /**
     * 播放碰撞音效
     */
    private playHitSound() {
        switch (this.bulletType) {
            case BulletType.NORMAL:
                SoundManager.instance.playSoundEffect('bulletHit');
                break;
            // case BulletType.FLAME:
            //     SoundManager.instance.playSoundEffect('flameHit');
            //     break;
            case BulletType.ROCKET:
                SoundManager.instance.playSoundEffect('explosion');
                break;
        }
    }

    /**
     * 销毁子弹
     */
    private destroyBullet() {
        if (!this.node || !this.node.isValid) {
            return;
        }
        if (this._pendingDestroy) {
            return;
        }
        this._pendingDestroy = true;
        // 不能在物理接触回调中直接销毁刚体/节点，延迟到本帧物理步之后
        director.once(Director.EVENT_AFTER_PHYSICS, () => {
            if (this.node && this.node.isValid) {
                this.node.destroy();
            }
        });
    }
}
