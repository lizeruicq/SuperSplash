import { _decorator, Component, Node, Vec2, math, SkeletalAnimationComponent } from 'cc';
import { AIPlayer } from './AIPlayer';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

enum AIState {
    FreeDrive,
    BoundaryTurning
}

@ccclass('AIController')
export class AIController extends Component {
    // @property([AIPlayer])
    // aiPlayers: AIPlayer[] = [];

    @property
    sceneMinX: number = -1048.5; // 左边界：640 - 3377/2
    @property
    sceneMaxX: number = 2328.5;  // 右边界：640 + 3377/2
    @property
    sceneMinY: number = -692.5;  // 下边界：360 - 2105/2
    @property
    sceneMaxY: number = 1412.5;  // 上边界：360 + 2105/2

    private aiStates: AIState[] = [];
    private canvasWorldPos: Vec2 = new Vec2();
    private boundaryTurnTimers: number[] = []; // 边界转向计时器
    private boundaryTurnTargetAngles: number[] = []; // 目标转向角度
    private boundaryTurnDirections: number[] = []; // 转向方向
    private boundaryTurnStartAngles: number[] = []; // 开始转向时的角度
    private lastAngleChanges: number[] = []; // 记录上次角度变化，防止抖动
    private boundaryTurnCooldowns: number[] = []; // 边界转向冷却时间
    private aiPlayers: AIPlayer[] = [];

    start() {
        // 不再自动查找AI车辆，全部通过GameManager单例获取
    }

    /**
     * 场景预制体加载完成后调用此方法
     * 由GameManager在场景预制体加载完成后调用
     */
    public onScenePrefabLoaded() {
        console.log('场景预制体加载完成，通过GameManager获取AI车辆列表...');
        this.aiPlayers = GameManager.getInstance().getAIPlayers();
        // 初始化状态数组
        this.aiStates = this.aiPlayers.map(() => AIState.FreeDrive);
        this.boundaryTurnTimers = this.aiPlayers.map(() => 0);
        this.boundaryTurnTargetAngles = this.aiPlayers.map(() => 0);
        this.boundaryTurnDirections = this.aiPlayers.map(() => 0);
        this.boundaryTurnStartAngles = this.aiPlayers.map(() => 0);
        this.lastAngleChanges = this.aiPlayers.map(() => 0);
        this.boundaryTurnCooldowns = this.aiPlayers.map(() => 0);
        console.log(`AI车辆查找完成，找到 ${this.aiPlayers.length} 个AI车辆`);
    }

    /**
     * 公共方法：重新查找AI车辆（用于动态加载场景时）
     */
    public refreshAIPlayers() {
        this.aiPlayers = GameManager.getInstance().getAIPlayers();
        
        // 重新初始化状态数组
        this.aiStates = this.aiPlayers.map(() => AIState.FreeDrive);
        this.boundaryTurnTimers = this.aiPlayers.map(() => 0);
        this.boundaryTurnTargetAngles = this.aiPlayers.map(() => 0);
        this.boundaryTurnDirections = this.aiPlayers.map(() => 0);
        this.boundaryTurnStartAngles = this.aiPlayers.map(() => 0);
        this.lastAngleChanges = this.aiPlayers.map(() => 0);
        this.boundaryTurnCooldowns = this.aiPlayers.map(() => 0);
        
        console.log(`AI车辆列表已刷新，当前共有 ${this.aiPlayers.length} 个AI车辆`);
    }

    update(dt: number) {
        for (let i = 0; i < this.aiPlayers.length; i++) {
            const ai = this.aiPlayers[i];
            if (!ai) continue;

            this.boundaryTurnTimers[i] += dt;
            this.boundaryTurnCooldowns[i] += dt;

            // 处理边界转向状态
            if (this.aiStates[i] === AIState.BoundaryTurning) {
                this.handleBoundaryTurning(ai, i, dt);
                continue; // 跳过其他状态处理
            }
            if (this.aiPlayers.length != 0) {
                // console.log("AI车辆数量：",this.aiPlayers.length);
                 // 自由驾驶状态
                this.freeDrive(ai, i);
            }
           
        }
    }

    freeDrive(ai: AIPlayer, i: number) {
        // console.log(ai.getCurrentAngle());
        // 随机改变方向
        if (Math.random() < 0.005) { // 降低频率
            ai.setDirection(Math.random() < 0.5 ? -1 : 1);
        }
        
        // 随机加速
        if (Math.random() < 0.01) { // 降低频率
            ai.setAccel(Math.random() < 0.8 ? 1 : 0);
        }
        
        // 边界检测和转向
        const pos = ai.node.worldPosition;
        
        // 计算相对于Canvas中心的位置
        const relativeX = pos.x - this.canvasWorldPos.x;
        const relativeY = pos.y - this.canvasWorldPos.y;
        
        // 计算到边界的距离
        const margin = 400; // 边界检测距离
        
        // 检查是否接近边界
        const nearLeftBoundary = relativeX < this.sceneMinX + margin;
        const nearRightBoundary = relativeX > this.sceneMaxX - margin;
        const nearBottomBoundary = relativeY < this.sceneMinY + margin;
        const nearTopBoundary = relativeY > this.sceneMaxY - margin;
        
        // 如果接近边界，开始边界转向（需要检查冷却时间）
        if (nearLeftBoundary || nearRightBoundary || nearBottomBoundary || nearTopBoundary) {
            // 检查冷却时间，避免频繁触发转向
            const requiredCooldown = this.boundaryTurnCooldowns[i] < 0 ? Math.abs(this.boundaryTurnCooldowns[i]) : 3.0;
            if (this.boundaryTurnCooldowns[i] >= requiredCooldown) { // 动态冷却时间
                // 打印触发的边界位置
                let boundaryInfo = "触发边界: ";
                if (nearLeftBoundary) boundaryInfo += "左边界 ";
                if (nearRightBoundary) boundaryInfo += "右边界 ";
                if (nearBottomBoundary) boundaryInfo += "下边界 ";
                if (nearTopBoundary) boundaryInfo += "上边界 ";
                // console.log(boundaryInfo + `位置(${relativeX.toFixed(1)}, ${relativeY.toFixed(1)})`);
                
                this.startBoundaryTurning(ai, i, nearLeftBoundary, nearRightBoundary, nearBottomBoundary, nearTopBoundary);
            } else {
                // 在冷却时间内，继续正常行驶
                const requiredCooldown = this.boundaryTurnCooldowns[i] < 0 ? Math.abs(this.boundaryTurnCooldowns[i]) : 3.0;
                // console.log(`冷却中: ${this.boundaryTurnCooldowns[i].toFixed(1)}s/${requiredCooldown.toFixed(1)}s`);
                ai.setAccel(1);
            }
        } else {
            // 不在边界附近，正常行驶
            ai.setAccel(1);
        }
    }
    
    private startBoundaryTurning(ai: AIPlayer, i: number, nearLeft: boolean, nearRight: boolean, nearBottom: boolean, nearTop: boolean) {
        this.aiStates[i] = AIState.BoundaryTurning;
        this.boundaryTurnTimers[i] = 0;
        this.boundaryTurnStartAngles[i] = ai.getCurrentAngle();
        this.boundaryTurnCooldowns[i] = 0; // 重置冷却时间
        
        // 根据触发的边界确定目标方向
        let targetAngle = 0;
        let turnDirection = 0;
        const currentAngle = ai.getCurrentAngle();
        
        // 优先处理角落情况，避免判断混乱
        const isCorner = (nearLeft && nearBottom) || (nearLeft && nearTop) || 
                        (nearRight && nearBottom) || (nearRight && nearTop);
        
        if (isCorner) {
            // 角落情况：转向原朝向的反方向
            targetAngle = (currentAngle + 180) % 360; // 直接转向反方向
            // console.log(`检测到角落，当前角度=${currentAngle.toFixed(1)}°，转向反方向=${targetAngle.toFixed(1)}°`);
            // 角落转向需要更长的冷却时间
            this.boundaryTurnCooldowns[i] = -5.0; // 3秒冷却时间
        } else {
            // 单边界情况：更智能的目标角度选择，考虑当前朝向
            if (nearLeft) {
                // 左边界：转向右方，避免选择与当前角度相近的方向
                if (currentAngle > 180) {
                    targetAngle = Math.random() * 90; // 0-90度
                } else {
                    targetAngle = 270 + Math.random() * 90; // 270-360度
                }
            } else if (nearRight) {
                // 右边界：转向左方，避免选择与当前角度相近的方向
                if (currentAngle < 180) {
                    targetAngle = 180 + Math.random() * 180; // 180-360度
                } else {
                    targetAngle = Math.random() * 180; // 0-180度
                }
            } else if (nearBottom) {
                // 下边界：转向上方，避免选择与当前角度相近的方向
                if (currentAngle > 90 && currentAngle < 270) {
                    targetAngle = Math.random() * 90; // 0-90度
                } else {
                    targetAngle = 270 + Math.random() * 90; // 270-360度
                }
            } else if (nearTop) {
                // 上边界：转向下方，避免选择与当前角度相近的方向
                if (currentAngle < 90 || currentAngle > 270) {
                    targetAngle = 90 + Math.random() * 180; // 90-270度
                } else {
                    targetAngle = Math.random() * 90 + 270; // 270-360度
                }
            }
        }
        
        // 确保目标角度在0-360范围内
        targetAngle = targetAngle % 360;
        if (targetAngle < 0) targetAngle += 360;
        
        // 计算当前角度到目标角度的最短路径
        let angleDiff = targetAngle - currentAngle;
        while (angleDiff > 180) angleDiff -= 360;
        while (angleDiff < -180) angleDiff += 360;
        
        // 确定转向方向
        turnDirection = angleDiff > 0 ? 1 : -1;
        
        this.boundaryTurnTargetAngles[i] = targetAngle;
        this.boundaryTurnDirections[i] = turnDirection;
        
        // 直接设置目标角度，让车辆立即朝向安全方向
        ai.setTargetAngle(targetAngle);
        ai.setDirection(turnDirection);
        ai.setAccel(1); // 保持全速，产生自然漂移
        
        // console.log(`开始边界转向: 当前角度=${currentAngle.toFixed(1)}°, 目标角度=${targetAngle.toFixed(1)}°, 角度差=${angleDiff.toFixed(1)}°, 方向=${turnDirection > 0 ? '左' : '右'}`);
    }
    
    private handleBoundaryTurning(ai: AIPlayer, i: number, dt: number) {
        const currentAngle = ai.getCurrentAngle();
        const targetAngle = this.boundaryTurnTargetAngles[i];
        const startAngle = this.boundaryTurnStartAngles[i];
        
        // 计算已经转向的角度
        let angleTurned = currentAngle - startAngle;
        while (angleTurned > 180) angleTurned -= 360;
        while (angleTurned < -180) angleTurned += 360;
        
        // 计算到目标角度的距离
        let angleToTarget = targetAngle - currentAngle;
        while (angleToTarget > 180) angleToTarget -= 360;
        while (angleToTarget < -180) angleToTarget += 360;
        
        // 防抖动：如果角度变化很小且与上次变化方向相反，则停止转向
        const angleChange = Math.abs(angleToTarget - this.lastAngleChanges[i]);
        if (angleChange < 5 && Math.sign(angleToTarget) !== Math.sign(this.lastAngleChanges[i])) {
            ai.setDirection(0);
            ai.setAccel(1);
            this.aiStates[i] = AIState.FreeDrive;
            this.boundaryTurnCooldowns[i] = 0; // 重置冷却时间
            // console.log(`边界转向完成: 防抖动触发，角度变化=${angleChange.toFixed(1)}°`);
            return;
        }
        this.lastAngleChanges[i] = angleToTarget;
        
        // 检查是否达到目标角度（更宽松的容差）
        if (Math.abs(angleToTarget) < 30) { // 30度容差，更宽松
            ai.setDirection(0);
            ai.setAccel(1);
            this.aiStates[i] = AIState.FreeDrive;
            this.boundaryTurnCooldowns[i] = 0; // 重置冷却时间
            // console.log(`边界转向完成: 到达目标角度=${targetAngle.toFixed(1)}°, 当前角度=${currentAngle.toFixed(1)}°`);
            return;
        }
        
        // 检查是否已经转向足够的角度（至少30度）
        if (Math.abs(angleTurned) >= 30) {
            // 检查当前朝向是否安全（远离边界）
            const pos = ai.node.worldPosition;
            const relativeX = pos.x - this.canvasWorldPos.x;
            const relativeY = pos.y - this.canvasWorldPos.y;
            
            // 如果已经转向足够角度且位置安全，停止转向
            if (relativeX > this.sceneMinX + 400 && relativeX < this.sceneMaxX - 400 &&
                relativeY > this.sceneMinY + 400 && relativeY < this.sceneMaxY - 400) {
                ai.setDirection(0);
                ai.setAccel(1);
                this.aiStates[i] = AIState.FreeDrive;
                this.boundaryTurnCooldowns[i] = 0; // 重置冷却时间
                // console.log(`边界转向完成: 已转向${Math.abs(angleTurned).toFixed(1)}°, 位置安全`);
                return;
            }
        }
        
        // 防止转向时间过长（超过3秒）
        if (this.boundaryTurnTimers[i] > 3) {
            ai.setDirection(0);
            ai.setAccel(1);
            this.aiStates[i] = AIState.FreeDrive;
            // console.log('边界转向超时，强制完成');
            return;
        }
        
        // 智能转向控制：根据角度差动态调整转向
        const absAngleToTarget = Math.abs(angleToTarget);
        
        // 添加调试信息
        // if (this.boundaryTurnTimers[i] % 0.5 < 0.1) { // 每0.5秒打印一次调试信息
        //     console.log(`转向调试: 当前=${currentAngle.toFixed(1)}°, 目标=${targetAngle.toFixed(1)}°, 角度差=${angleToTarget.toFixed(1)}°, 已转向=${angleTurned.toFixed(1)}°`);
        // }
        
        if (absAngleToTarget < 30) {
            // 接近目标角度时，停止转向，让车辆自然朝向目标
            ai.setDirection(0);
            ai.setAccel(1);
        } else {
            // 改进的转向策略：根据角度差调整转向强度
            if (absAngleToTarget > 90) {
                // 大角度差：持续转向
                ai.setDirection(this.boundaryTurnDirections[i]);
            } else if (absAngleToTarget > 60) {
                // 中等角度差：持续转向，但稍微减弱
                ai.setDirection(this.boundaryTurnDirections[i]);
            } else if (absAngleToTarget > 30) {
                // 小角度差：脉冲式转向，但更稳定
                const pulseInterval = 0.12; // 120ms脉冲
                const pulseOn = 0.08; // 80ms开启
                const timeInPulse = this.boundaryTurnTimers[i] % pulseInterval;
                
                if (timeInPulse < pulseOn) {
                    ai.setDirection(this.boundaryTurnDirections[i]);
                } else {
                    ai.setDirection(0);
                }
            } else {
                // 很小角度差：停止转向，避免来回摆动
                ai.setDirection(0);
            }
            ai.setAccel(1);
        }
    }

    // 血量管理接口
    /**
     * 为指定AI车辆设置生命值
     */
    public setAIHealth(aiIndex: number, health: number) {
        if (aiIndex >= 0 && aiIndex < this.aiPlayers.length) {
            const ai = this.aiPlayers[aiIndex];
            if (ai && ai.node && ai.node.isValid) {
                ai.setHealth(health);
            }
        }
    }

    /**
     * 为指定AI车辆造成伤害
     */
    public damageAI(aiIndex: number, damage: number) {
        if (aiIndex >= 0 && aiIndex < this.aiPlayers.length) {
            const ai = this.aiPlayers[aiIndex];
            if (ai && ai.node && ai.node.isValid) {
                ai.takeDamage(damage);
            }
        }
    }

    /**
     * 为指定AI车辆恢复生命值
     */
    public healAI(aiIndex: number, amount: number) {
        if (aiIndex >= 0 && aiIndex < this.aiPlayers.length) {
            const ai = this.aiPlayers[aiIndex];
            if (ai && ai.node && ai.node.isValid) {
                ai.heal(amount);
            }
        }
    }

    /**
     * 获取指定AI车辆的生命值
     */
    public getAIHealth(aiIndex: number): number {
        if (aiIndex >= 0 && aiIndex < this.aiPlayers.length) {
            const ai = this.aiPlayers[aiIndex];
            if (ai && ai.node && ai.node.isValid) {
                return ai.getHealth();
            }
        }
        return 0;
    }

    /**
     * 获取指定AI车辆的最大生命值
     */
    public getAIMaxHealth(aiIndex: number): number {
        if (aiIndex >= 0 && aiIndex < this.aiPlayers.length) {
            const ai = this.aiPlayers[aiIndex];
            if (ai && ai.node && ai.node.isValid) {
                return ai.getMaxHealth();
            }
        }
        return 0;
    }

    /**
     * 检查指定AI车辆是否死亡
     */
    public isAIDead(aiIndex: number): boolean {
        if (aiIndex >= 0 && aiIndex < this.aiPlayers.length) {
            const ai = this.aiPlayers[aiIndex];
            if (ai && ai.node && ai.node.isValid) {
                return ai.isDead();
            }
        }
        return true;
    }
} 