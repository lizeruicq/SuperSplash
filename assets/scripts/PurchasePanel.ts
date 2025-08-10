// 添加必要的import
import { _decorator, Component, Node, Label, Button, Color, Sprite, Graphics } from 'cc';

// 在PurchasePanel类中添加必要的组件引用
const { ccclass, property } = _decorator;

@ccclass('PurchasePanel')
export class PurchasePanel extends Component {
    @property({ type: Label, tooltip: '价格显示文本' })
    private priceLabel: Label = null!;

    @property({ type: Label, tooltip: '车辆介绍文本' })
    private infoLabel: Label = null!;

    @property({ type: Button, tooltip: '关闭按钮' })
    private closeButton: Button = null!;

    @property({ type: Button, tooltip: '购买确认按钮' })
    private confirmButton: Button = null!;

    // @property({ type: Node, tooltip: '面板节点' })
    // private panelNode: Node = null!;

    private currentPrice: number = 0;
    private onConfirmCallback: (price: number) => void = null;

    onLoad() {
        // 初始化按钮事件
        if (this.closeButton) {
            this.closeButton.node.on(Button.EventType.CLICK, this.onCloseButtonClick, this);
        }
        
        if (this.confirmButton) {
            this.confirmButton.node.on(Button.EventType.CLICK, this.onConfirmButtonClick, this);
        }
    }

    // 显示面板
    public show(price: number, info: string, onConfirm: (price: number) => void) {
        this.currentPrice = price;
        
        this.onConfirmCallback = onConfirm;
        
        if (this.priceLabel) {
            this.priceLabel.string = `$${price}`;
        }
        if(this.infoLabel)
        {
            this.infoLabel.string = `${info}`;
        }
        
        // 使用拖拽关联的节点控制显示
        if (this.node) {
            this.node.active = true;
        }
    }

    // 隐藏面板
    public hide() {
        // 使用拖拽关联的节点控制隐藏
        if (this.node) {
            this.node.active = false;
        }
        
        this.onConfirmCallback = null;
    }

    // 关闭按钮点击事件
    private onCloseButtonClick() {
        this.hide();
    }

    // 确认按钮点击事件
    private onConfirmButtonClick() {
        if (this.onConfirmCallback) {
            this.onConfirmCallback(this.currentPrice);
        }
        this.hide();
    }

    // // 添加静态方法用于查找节点
    // static find(path: string): Node {
    //     return (cc as any).find(path);
    // }
}