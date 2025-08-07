import { _decorator, Component, Vec2, RigidBody2D, Contact2DType, IPhysics2DContact, Collider2D, Enum, instantiate, Prefab, tween, Vec3 } from 'cc';
import { player } from './player';
import { AIPlayer } from './AIPlayer';
import { SoundManager } from './SoundManager';

const { ccclass, property } = _decorator;

// 定义武器类型枚举
export enum WeaponType {
    NORMAL = 0,  // 普通子弹
    FLAME = 1,   // 火焰喷射
    ROCKET = 2   // 火箭弹
}

// 定义子弹类型枚举
export enum BulletType {
    NORMAL = 0,  // 普通子弹
    FLAME = 1,   // 火焰
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
    explosionRadius: number = 100;

    @property({
        tooltip: "火焰持续时间（火焰专用）"
    })
    flameDuration: number = 1.0;

    private _shooterId: string = ''; // 发射者ID
    private _rigidBody: RigidBody2D = null!;
    private _direction: Vec2 = new Vec2(0, 1); // 默认向上
    private _velocity: Vec2 = new Vec2(0, 0);
    private _timer: number = 0;

    onLoad() {
        this._rigidBody = this.getComponent(RigidBody2D);
        if (!this._rigidBody) {
            console.error('Bullet: RigidBody2D组件未找到');
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
        this._timer += deltaTime;

        // 检查是否超过存活时间
        if (this._timer >= this.lifeTime) {
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

        // 设置初始旋转角度
        const angle = Math.atan2(direction.y, direction.x) * 180 / Math.PI;
        this.node.setRotationFromEuler(0, 0, angle - 90);
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
        switch (this.bulletType) {
            case BulletType.NORMAL:
                this.handleNormalBulletHit(playerComponent, aiPlayerComponent);
                break;
            case BulletType.FLAME:
                this.handleFlameHit(vehicleNode, playerComponent, aiPlayerComponent);
                break;
            case BulletType.ROCKET:
                this.handleRocketHit(vehicleNode);
                break;
        }

        // 播放音效
        this.playHitSound();
        
        // 销毁子弹
        this.destroyBullet();
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
     * 处理火焰碰撞
     */
    private handleFlameHit(vehicleNode: any, playerComponent: player | null, aiPlayerComponent: AIPlayer | null) {
        // 火焰造成持续伤害
        const damagePerTick = this.damage / 5; // 分5次造成伤害
        const tickInterval = this.flameDuration / 5;

        for (let i = 0; i < 5; i++) {
            this.scheduleOnce(() => {
                if (vehicleNode && vehicleNode.isValid) {
                    if (playerComponent && playerComponent.isValid) {
                        playerComponent.takeDamage(damagePerTick);
                    } else if (aiPlayerComponent && aiPlayerComponent.isValid) {
                        aiPlayerComponent.takeDamage(damagePerTick);
                    }
                }
            }, tickInterval * i);
        }
    }

    /**
     * 处理火箭弹碰撞
     */
    private handleRocketHit(hitVehicleNode: any) {
        // 创建爆炸效果
        if (this.explosionPrefab) {
            const explosion = instantiate(this.explosionPrefab);
            explosion.setWorldPosition(this.node.worldPosition);
            this.node.parent?.addChild(explosion);

            // 爆炸动画
            tween(explosion)
                .to(0.5, { scale: new Vec3(2, 2, 1) })
                .call(() => {
                    if (explosion && explosion.isValid) {
                        explosion.destroy();
                    }
                })
                .start();
        }

        // 范围伤害
        this.dealExplosionDamage();
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
        }
    }

    /**
     * 根据子弹类型调整属性
     */
    // private adjustBulletProperties() {
    //     switch (this.bulletType) {
    //         case BulletType.NORMAL:
    //             this.speed = 400;
    //             this.lifeTime = 3.0;
    //             break;
    //         case BulletType.FLAME:
    //             this.speed = 200;
    //             this.lifeTime = 1.5;
    //             break;
    //         case BulletType.ROCKET:
    //             this.speed = 300;
    //             this.lifeTime = 4.0;
    //             break;
    //     }
    // }

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
            case BulletType.FLAME:
                SoundManager.instance.playSoundEffect('flameHit');
                break;
            case BulletType.ROCKET:
                SoundManager.instance.playSoundEffect('explosion');
                break;
        }
    }

    /**
     * 销毁子弹
     */
    private destroyBullet() {
        if (this.node && this.node.isValid) {
            this.node.destroy();
        }
    }
}
