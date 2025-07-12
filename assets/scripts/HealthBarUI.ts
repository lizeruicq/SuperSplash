import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HealthBarUI')
export class HealthBarUI extends Component {
    @property
    offsetY: number = 50; // 血条在车辆上方的偏移距离
    

    private targetNode: Node = null!; // 目标AI车辆节点
    private canvas: Node = null!; // Canvas节点
    private isInitialized: boolean = false;
    // private _progress: number = 1.0; // 当前进度（0-1）

    start() {
        this.setupCanvas();
        this.targetNode = this.node.parent!;
        this.separateFromParent();
        console.log('血条UI初始化完成');
    }

    /**
     * 获取当前进度
     */
    // public get progress(): number {
    //     return this.progress;
    // }

    // /**
    //  * 设置当前进度（0-1）
    //  */
    // public set progress(value: number) {
    //     this.progress = Math.max(0, Math.min(1, value));
    // }



    /**
     * 设置Canvas引用
     */
    private setupCanvas() {
        this.canvas = this.node.scene.getChildByName('Canvas');
        if (!this.canvas) {
            console.error('未找到Canvas节点，血条可能无法正确显示');
            return;
        }
    }

    /**
     * 将血条从父节点中分离，移动到Canvas下
     */
    private separateFromParent() {
        if (!this.canvas || !this.targetNode) return;

        // 记录当前世界位置
        const currentWorldPos = this.node.worldPosition;
        
        // 将血条移动到Canvas下
        this.node.setParent(this.canvas);
        
        // 保持世界位置不变
        this.node.setWorldPosition(currentWorldPos);
        
        this.isInitialized = true;
        console.log('血条已分离到Canvas下');
    }

    update() {
        if (!this.isInitialized || !this.targetNode || !this.canvas) {
            return;
        }

        this.updatePosition();
    }

    /**
     * 更新血条位置
     * 血条现在是Canvas的子节点，完全独立于AI车辆
     */
    private updatePosition() {
        // 获取AI车辆的世界位置
        const targetWorldPos = this.targetNode.worldPosition;
        
        // 设置血条位置（在AI车辆上方）
        this.node.setWorldPosition(
            targetWorldPos.x,
            targetWorldPos.y + this.offsetY,
            targetWorldPos.z
        );
        
        // 确保血条始终面向屏幕（不随AI车辆旋转）
        this.node.setRotationFromEuler(0, 0, 0);
    }

    /**
     * 设置血条在车辆上方的偏移距离
     */
    public setOffsetY(offset: number) {
        this.offsetY = offset;
    }

    /**
     * 显示或隐藏血条
     */
    public setVisible(visible: boolean) {
        this.node.active = visible;
    }

    /**
     * 获取当前偏移距离
     */
    public getOffsetY(): number {
        return this.offsetY;
    }

    /**
     * 设置目标节点
     */
    public setTarget(target: Node) {
        this.targetNode = target;
    }

    /**
     * 销毁血条
     */
    public destroyHealthBar() {
        this.node.destroy();
    }
} 