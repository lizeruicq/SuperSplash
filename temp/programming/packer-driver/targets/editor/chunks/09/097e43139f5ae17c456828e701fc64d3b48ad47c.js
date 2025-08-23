System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, Button, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, PurchasePanel;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Label = _cc.Label;
      Button = _cc.Button;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c4e94PebKNGoJIxF8tD6ORW", "PurchasePanel", undefined); // 添加必要的import


      // 在PurchasePanel类中添加必要的组件引用
      __checkObsolete__(['_decorator', 'Component', 'Node', 'Label', 'Button', 'Color', 'Sprite', 'Graphics']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PurchasePanel", PurchasePanel = (_dec = ccclass('PurchasePanel'), _dec2 = property({
        type: Label,
        tooltip: '价格显示文本'
      }), _dec3 = property({
        type: Label,
        tooltip: '车辆介绍文本'
      }), _dec4 = property({
        type: Button,
        tooltip: '关闭按钮'
      }), _dec5 = property({
        type: Button,
        tooltip: '购买确认按钮'
      }), _dec(_class = (_class2 = class PurchasePanel extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "priceLabel", _descriptor, this);

          _initializerDefineProperty(this, "infoLabel", _descriptor2, this);

          _initializerDefineProperty(this, "closeButton", _descriptor3, this);

          _initializerDefineProperty(this, "confirmButton", _descriptor4, this);

          // @property({ type: Node, tooltip: '面板节点' })
          // private panelNode: Node = null!;
          this.currentPrice = 0;
          this.onConfirmCallback = null;
        }

        onLoad() {
          // 初始化按钮事件
          if (this.closeButton) {
            this.closeButton.node.on(Button.EventType.CLICK, this.onCloseButtonClick, this);
          }

          if (this.confirmButton) {
            this.confirmButton.node.on(Button.EventType.CLICK, this.onConfirmButtonClick, this);
          }
        } // 显示面板


        show(price, info, onConfirm) {
          this.currentPrice = price;
          this.onConfirmCallback = onConfirm;

          if (this.priceLabel) {
            this.priceLabel.string = `$${price}`;
          }

          if (this.infoLabel) {
            this.infoLabel.string = `${info}`;
          } // 使用拖拽关联的节点控制显示


          if (this.node) {
            this.node.active = true;
          }
        } // 隐藏面板


        hide() {
          // 使用拖拽关联的节点控制隐藏
          if (this.node) {
            this.node.active = false;
          }

          this.onConfirmCallback = null;
        } // 关闭按钮点击事件


        onCloseButtonClick() {
          this.hide();
        } // 确认按钮点击事件


        onConfirmButtonClick() {
          if (this.onConfirmCallback) {
            this.onConfirmCallback(this.currentPrice);
          }

          this.hide();
        } // // 添加静态方法用于查找节点
        // static find(path: string): Node {
        //     return (cc as any).find(path);
        // }


      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "priceLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "infoLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "closeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "confirmButton", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=097e43139f5ae17c456828e701fc64d3b48ad47c.js.map