import { _decorator, Component, Node, Vec3, Camera, view, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraFollow')
export class CameraFollow extends Component {
    @property(Node)
    target: Node = null!; // 需要跟随的目标节点

    @property
    smooth: number = 0.15; // 跟随平滑度，0为瞬间跟随，越大越慢

    private _tempPos = new Vec3();
    private _mapWidth: number = 0;
    private _mapHeight: number = 0;

    onLoad() {
        // 确保在组件加载时初始化
        this._tempPos = new Vec3();
        this._mapWidth = 0;
        this._mapHeight = 0;
    }

    onDestroy() {
        // 确保在组件销毁时清理引用
        this.target = null!;
        this._tempPos = null!;
    }

    // start() {
    //     if (!this.node || !this.node.isValid) return;
        
    //     // 自动检测地图尺寸
    //     this._detectMapSize();
        
    //     this._updateCameraPosition(0, true);
    // }

    private _detectMapSize() {
        if (!this.node || !this.node.parent) return;
        
        // 方法1：通过 Map 节点检测
        const mapNode = this.node.parent.children.find(child => 
            child.name === 'PlayGround'
        );
        
        if (mapNode) {
            const uiTransform = mapNode.getComponentInChildren(UITransform);
            if (uiTransform) {
                this._mapWidth = uiTransform.contentSize.width * mapNode.scale.x;
                this._mapHeight = uiTransform.contentSize.height * mapNode.scale.y;
            }
        } 
        
        // 如果没检测到，使用默认值
        if (this._mapWidth === 0 || this._mapHeight === 0) {
            console.log("没有检测到地图尺寸");
            this._mapWidth = 2160;
            this._mapHeight = 1440;
        }
    }

    update(deltaTime: number) {
        if (!this.node || !this.node.isValid) return;
        this._updateCameraPosition(deltaTime, false);
    }

    private _clampToMapBounds(x: number, y: number, visibleWidth: number, visibleHeight: number): [number, number] {
        if (!this.node || !this.node.parent) return [x, y];
        
        // Canvas世界坐标
        const canvasWorldX = this.node.parent.worldPosition.x;
        const canvasWorldY = this.node.parent.worldPosition.y;
        // 地图中心为canvas中心
        let mapLeft = canvasWorldX - this._mapWidth / 2;
        let mapRight = canvasWorldX + this._mapWidth / 2;
        let mapBottom = canvasWorldY - this._mapHeight / 2;
        let mapTop = canvasWorldY + this._mapHeight / 2;

        // 计算摄像机中心允许的移动范围
        // 确保摄像机可视范围不超出地图边界
        let minX = mapLeft + visibleWidth / 2;
        let maxX = mapRight - visibleWidth / 2;
        let minY = mapBottom + visibleHeight / 2;
        let maxY = mapTop - visibleHeight / 2;

        let cx = x, cy = y;
        
        // 如果地图比可视范围小，摄像机居中
        if (minX > maxX) {
            cx = canvasWorldX;
        } else {
            // 限制摄像机位置，确保不显示地图外的黑边
            if (x < minX) {
                cx = minX;
            } else if (x > maxX) {
                cx = maxX;
            } else {
                cx = x;
            }
        }
        
        if (minY > maxY) {
            cy = canvasWorldY;
        } else {
            // 限制摄像机位置，确保不显示地图外的黑边
            if (y < minY) {
                cy = minY;
            } else if (y > maxY) {
                cy = maxY;
            } else {
                cy = y;
            }
        }
        
        return [cx, cy];
    }

    private _updateCameraPosition(deltaTime: number, instant: boolean) {
        if (!this.target || !this.node || !this.node.isValid) return;
        this.target.getWorldPosition(this._tempPos);
        const camera = this.getComponent(Camera);
        if (!camera) return;

        // 获取设备实际宽高比
        const deviceAspect = view.getVisibleSize().width / view.getVisibleSize().height;
        
        // 正确的可视范围计算方法
        // orthoHeight就是摄像机可视范围的完整高度
        const visibleHeight = camera.orthoHeight;
        const visibleWidth = visibleHeight * deviceAspect;

        // 使用正确的可视范围
        const usedVisibleWidth = visibleWidth;
        const usedVisibleHeight = visibleHeight;

        // clamp摄像机中心，保证可视范围始终在地图内
        const [centerX, centerY] = this._clampToMapBounds(this._tempPos.x, this._tempPos.y, usedVisibleWidth, usedVisibleHeight);

        let camPos = this.node.worldPosition;
        if (instant) {
            this.node.setWorldPosition(centerX, centerY, camPos.z);
        } else {
            this.node.setWorldPosition(
                camPos.x + (centerX - camPos.x) * (1 - Math.pow(1 - this.smooth, deltaTime * 60)),
                camPos.y + (centerY - camPos.y) * (1 - Math.pow(1 - this.smooth, deltaTime * 60)),
                camPos.z
            );
        }
    }

    public init(mapNode: Node, playerNode: Node) {
        this.target = playerNode;
        if (mapNode) {
            const uiTransform = mapNode.getComponent(UITransform);
            if (uiTransform) {
                this._mapWidth = uiTransform.contentSize.width * mapNode.scale.x;
                this._mapHeight = uiTransform.contentSize.height * mapNode.scale.y;
            }
        }
    }
} 