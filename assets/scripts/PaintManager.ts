import { _decorator, Component, Node, Prefab, instantiate, Vec2, Vec3, Layers } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 颜料数据接口
 */
interface PaintData {
    node: Node;           // 颜料节点
    position: Vec2;       // 位置
    ownerId: string;      // 拥有者ID（车辆ID）
    timestamp: number;    // 创建时间戳
}

/**
 * 颜料管理器
 * 负责管理游戏中所有车辆喷洒的颜料
 */
@ccclass('PaintManager')
export class PaintManager extends Component {
    private static _instance: PaintManager = null!;
    
    // 存储所有颜料的数据
    private paintMap: Map<string, PaintData> = new Map();
    
    // 颜料覆盖检测的距离阈值（像素）
    @property
    coverageRadius: number = 30;
    
    // 颜料容器节点
    private paintContainer: Node = null!;

    public static getInstance(): PaintManager {
        return PaintManager._instance;
    }

    onLoad() {
        if (PaintManager._instance) {
            console.log("销毁原有PaintManager单例");
            this.node.destroy();
            return;
        }
        PaintManager._instance = this;
        
        // 创建颜料容器节点
        this.paintContainer = new Node('PaintContainer');

        // 设置容器节点的层级为UI_2D，确保颜料固定在游戏世界坐标中
        this.paintContainer.layer = Layers.Enum.UI_2D;

        this.node.addChild(this.paintContainer);
        
        console.log('PaintManager初始化完成');
    }

    onDestroy() {
        if (PaintManager._instance === this) {
            PaintManager._instance = null!;
            console.log("PaintManager实例已销毁");
        }
    }

    /**
     * 添加颜料
     * @param paintPrefab 颜料预制体
     * @param worldPosition 世界坐标位置
     * @param ownerId 拥有者ID
     */
    public addPaint(paintPrefab: Prefab, worldPosition: Vec3, ownerId: string): void {
        if (!paintPrefab || !this.paintContainer) {
            console.warn('PaintManager: 颜料预制体或容器为空');
            return;
        }

        const position2D = new Vec2(worldPosition.x, worldPosition.y);

        // 检查是否在同一拥有者的颜料附近，如果是则不喷洒
        if (this.isNearOwnPaint(position2D, ownerId)) {
            // console.log(`跳过颜料喷洒: 拥有者=${ownerId}, 位置附近已有自己的颜料`);
            return;
        }

        // 检查是否需要覆盖其他拥有者的颜料
        this.checkAndRemoveOverlappingPaint(position2D, ownerId);

        // 创建新颜料节点
        const paintNode = instantiate(paintPrefab);
        paintNode.setWorldPosition(worldPosition);

        // 设置颜料节点的层级为UI_2D，确保它固定在游戏世界坐标中
        paintNode.layer = Layers.Enum.UI_2D;

        this.paintContainer.addChild(paintNode);

        // 生成唯一ID
        const paintId = this.generatePaintId(position2D, ownerId);

        // 存储颜料数据
        const paintData: PaintData = {
            node: paintNode,
            position: position2D,
            ownerId: ownerId,
            timestamp: Date.now()
        };

        this.paintMap.set(paintId, paintData);

        // console.log(`添加颜料: 拥有者=${ownerId}, 位置=(${position2D.x.toFixed(1)}, ${position2D.y.toFixed(1)})`);
    }

    /**
     * 检查并移除重叠的颜料
     * @param newPosition 新颜料位置
     * @param newOwnerId 新颜料拥有者ID
     */
    private checkAndRemoveOverlappingPaint(newPosition: Vec2, newOwnerId: string): void {
        const toRemove: string[] = [];
        
        this.paintMap.forEach((paintData, paintId) => {
            const distance = Vec2.distance(paintData.position, newPosition);
            
            // 如果距离小于覆盖半径，且不是同一个拥有者，则移除旧颜料
            if (distance < this.coverageRadius && paintData.ownerId !== newOwnerId) {
                toRemove.push(paintId);
                
            }
        });
        
        // 移除重叠的颜料
        toRemove.forEach(paintId => {
            this.removePaint(paintId);
        });
        
        if (toRemove.length > 0) {
            // console.log(`移除了 ${toRemove.length} 个重叠的颜料`);
        }
    }

    /**
     * 移除指定的颜料
     * @param paintId 颜料ID
     */
    private removePaint(paintId: string): void {
        const paintData = this.paintMap.get(paintId);
        if (paintData) {
            // 销毁节点
            if (paintData.node && paintData.node.isValid) {
                paintData.node.destroy();
            }
            
            // 从映射中移除
            this.paintMap.delete(paintId);
        }
    }

    /**
     * 检查指定位置是否在同一拥有者的颜料附近
     * @param position 要检查的位置
     * @param ownerId 拥有者ID
     * @returns 如果附近有同一拥有者的颜料则返回true
     */
    private isNearOwnPaint(position: Vec2, ownerId: string): boolean {
        for (const paintData of this.paintMap.values()) {
            // 只检查同一拥有者的颜料
            if (paintData.ownerId === ownerId) {
                const distance = Vec2.distance(paintData.position, position);

                // 如果距离小于覆盖半径，说明附近已有自己的颜料
                if (distance < this.coverageRadius) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 生成颜料唯一ID
     * @param position 位置
     * @param ownerId 拥有者ID
     * @returns 唯一ID
     */
    private generatePaintId(position: Vec2, ownerId: string): string {
        const timestamp = Date.now();
        return `paint_${ownerId}_${position.x.toFixed(0)}_${position.y.toFixed(0)}_${timestamp}`;
    }

    /**
     * 清除所有颜料
     */
    public clearAllPaint(): void {
        this.paintMap.forEach((paintData) => {
            if (paintData.node && paintData.node.isValid) {
                paintData.node.destroy();
            }
        });
        
        this.paintMap.clear();
        console.log('清除了所有颜料');
    }

    /**
     * 获取指定拥有者的颜料数量
     * @param ownerId 拥有者ID
     * @returns 颜料数量
     */
    public getPaintCountByOwner(ownerId: string): number {
        let count = 0;
        this.paintMap.forEach((paintData) => {
            if (paintData.ownerId === ownerId) {
                count++;
            }
        });
        return count;
    }

    /**
     * 获取总颜料数量
     * @returns 总数量
     */
    public getTotalPaintCount(): number {
        return this.paintMap.size;
    }

    /**
     * 获取指定拥有者的颜料占比
     * @param ownerId 拥有者ID
     * @returns 占比（0-1之间的小数）
     */
    public getPaintRatioByOwner(ownerId: string): number {
        const totalCount = this.getTotalPaintCount();
        if (totalCount === 0) {
            return 0;
        }

        const ownerCount = this.getPaintCountByOwner(ownerId);
        return ownerCount / totalCount;
    }

    /**
     * 获取所有车辆的颜料占比
     * @returns 包含每个车辆ID和其占比的对象
     */
    public getAllPaintRatios(): { [ownerId: string]: number } {
        const ratios: { [ownerId: string]: number } = {};
        const totalCount = this.getTotalPaintCount();

        if (totalCount === 0) {
            return ratios;
        }

        // 统计每个拥有者的颜料数量
        const ownerCounts: { [ownerId: string]: number } = {};
        this.paintMap.forEach((paintData) => {
            const ownerId = paintData.ownerId;
            ownerCounts[ownerId] = (ownerCounts[ownerId] || 0) + 1;
        });

        // 计算占比
        for (const ownerId in ownerCounts) {
            ratios[ownerId] = ownerCounts[ownerId] / totalCount;
        }

        return ratios;
    }

    /**
     * 获取排序后的颜料占比（从高到低）
     * @returns 按占比排序的数组，每个元素包含ownerId和ratio
     */
    public getSortedPaintRatios(): Array<{ ownerId: string, ratio: number, count: number }> {
        const ratios = this.getAllPaintRatios();
        const result: Array<{ ownerId: string, ratio: number, count: number }> = [];

        for (const ownerId in ratios) {
            result.push({
                ownerId: ownerId,
                ratio: ratios[ownerId],
                count: this.getPaintCountByOwner(ownerId)
            });
        }

        // 按占比从高到低排序
        result.sort((a, b) => b.ratio - a.ratio);

        return result;
    }
}
