System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, RigidBody2D, Collider2D, Contact2DType, Vec2, _dec, _class, _class2, _descriptor, _crd, ccclass, property, PhysicsCollision;

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
      RigidBody2D = _cc.RigidBody2D;
      Collider2D = _cc.Collider2D;
      Contact2DType = _cc.Contact2DType;
      Vec2 = _cc.Vec2;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6080bxWjFdNqoQm5TMYb192", "physics_collision", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'RigidBody2D', 'Collider2D', 'Contact2DType', 'IPhysics2DContact', 'Vec2']);

      __checkObsolete__(['PhysicsSystem2D']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PhysicsCollision", PhysicsCollision = (_dec = ccclass('PhysicsCollision'), _dec(_class = (_class2 = class PhysicsCollision extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "bounceForce", _descriptor, this);

          // 碰撞反弹力
          this._rigidBody = null;
          this._collider = null;
        }

        start() {
          // 获取刚体组件
          this._rigidBody = this.getComponent(RigidBody2D);

          if (!this._rigidBody) {
            console.error('PhysicsCollision requires RigidBody2D component');
            return;
          } // 获取碰撞体组件


          this._collider = this.getComponent(Collider2D);

          if (!this._collider) {
            console.error('PhysicsCollision requires Collider2D component');
            return;
          } // 设置碰撞回调


          this._collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);

          this._collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }

        onDestroy() {
          if (this._collider) {
            this._collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);

            this._collider.off(Contact2DType.END_CONTACT, this.onEndContact, this);
          }
        }
        /**
         * 碰撞开始回调
         */


        onBeginContact(selfCollider, otherCollider, contact) {
          console.log('Collision detected with:', otherCollider.node.name); // 如果是与边界碰撞，可以添加反弹效果

          if (otherCollider.node.name.includes('boundary') || otherCollider.node.name.includes('wall')) {
            this._handleBoundaryCollision(contact);
          }
        }
        /**
         * 碰撞结束回调
         */


        onEndContact(selfCollider, otherCollider, contact) {// 可以在这里处理碰撞结束的逻辑
        }
        /**
         * 处理边界碰撞
         */


        _handleBoundaryCollision(contact) {
          // 获取碰撞法向量
          var normal = contact.getWorldManifold().normal; // 计算反弹速度

          var bounceVelocity = new Vec2(-normal.x * this.bounceForce, -normal.y * this.bounceForce); // 应用反弹力

          this._rigidBody.applyLinearImpulse(bounceVelocity, this._rigidBody.getWorldCenter(), true);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bounceForce", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9bd2687c1d16c799fed68f292e2081816d3d8aab.js.map