System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, Button, ProgressBar, Node, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _crd, ccclass, property, GameHUD;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "./GameManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Label = _cc.Label;
      Button = _cc.Button;
      ProgressBar = _cc.ProgressBar;
      Node = _cc.Node;
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8d994pxBTRN65Jo2JjZ4MAH", "GameHUD", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Label', 'Button', 'ProgressBar', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      /**
       * 游戏内HUD界面
       * 显示倒计时和颜料占比信息
       */
      _export("GameHUD", GameHUD = (_dec = ccclass('GameHUD'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property({
        type: Label,
        tooltip: 'AI车辆1的颜料占比显示标签'
      }), _dec5 = property({
        type: Label,
        tooltip: 'AI车辆2的颜料占比显示标签'
      }), _dec6 = property({
        type: Label,
        tooltip: 'AI车辆3的颜料占比显示标签'
      }), _dec7 = property({
        type: Label,
        tooltip: 'AI车辆4的颜料占比显示标签'
      }), _dec8 = property({
        type: Button,
        tooltip: '射击按钮'
      }), _dec9 = property({
        type: Label,
        tooltip: '弹药数量显示标签'
      }), _dec10 = property({
        type: ProgressBar,
        tooltip: '弹药补充进度条'
      }), _dec11 = property({
        type: Button,
        tooltip: '向上移动按钮'
      }), _dec12 = property({
        type: Button,
        tooltip: '向下移动按钮'
      }), _dec13 = property({
        type: Button,
        tooltip: '向左移动按钮'
      }), _dec14 = property({
        type: Button,
        tooltip: '向右移动按钮'
      }), _dec(_class = (_class2 = class GameHUD extends Component {
        constructor() {
          super(...arguments);

          // 倒计时显示
          _initializerDefineProperty(this, "countdownLabel", _descriptor, this);

          // 玩家颜料占比显示
          _initializerDefineProperty(this, "playerRatioLabel", _descriptor2, this);

          // AI颜料占比显示标签（手动拖拽设置）
          _initializerDefineProperty(this, "ai1RatioLabel", _descriptor3, this);

          _initializerDefineProperty(this, "ai2RatioLabel", _descriptor4, this);

          _initializerDefineProperty(this, "ai3RatioLabel", _descriptor5, this);

          _initializerDefineProperty(this, "ai4RatioLabel", _descriptor6, this);

          // 射击系统UI
          _initializerDefineProperty(this, "shootButton", _descriptor7, this);

          _initializerDefineProperty(this, "ammoLabel", _descriptor8, this);

          _initializerDefineProperty(this, "reloadProgressBar", _descriptor9, this);

          // 触摸控制按钮
          _initializerDefineProperty(this, "upButton", _descriptor10, this);

          _initializerDefineProperty(this, "downButton", _descriptor11, this);

          _initializerDefineProperty(this, "leftButton", _descriptor12, this);

          _initializerDefineProperty(this, "rightButton", _descriptor13, this);

          // 更新频率控制
          _initializerDefineProperty(this, "updateInterval", _descriptor14, this);

          // 每0.1秒更新一次
          this.updateTimer = 0;
          this.gameManager = null;
        }

        onLoad() {
          this.updateTimer = 0;
        }

        start() {
          this.gameManager = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance();

          if (!this.gameManager) {
            console.error('GameHUD: GameManager未找到');
            return;
          } // 初始化AI占比显示


          this.initializeAIRatioDisplay(); // 初始化射击按钮

          this.initializeShootButton(); // 初始化触摸控制按钮

          this.initializeTouchControlButtons();
        }

        update(deltaTime) {
          if (!this.gameManager) return;
          this.updateTimer += deltaTime; // 按设定频率更新UI

          if (this.updateTimer >= this.updateInterval) {
            this.updateCountdownDisplay();
            this.updatePaintRatioDisplay();
            this.updateAmmoDisplay();
            this.updateTimer = 0;
          }
        }
        /**
         * 更新倒计时显示
         */


        updateCountdownDisplay() {
          if (this.countdownLabel) {
            var formattedTime = this.gameManager.getFormattedRemainingTime();
            this.countdownLabel.string = formattedTime; // 当时间少于30秒时，可以改变颜色提醒

            var remainingTime = this.gameManager.getRemainingTime();

            if (remainingTime <= 30) {
              this.countdownLabel.color = this.countdownLabel.color.lerp(new this.countdownLabel.color.constructor(255, 0, 0, 255), 0.5);
            }
          }
        }
        /**
         * 更新颜料占比显示
         */


        updatePaintRatioDisplay() {
          var allRatios = this.gameManager.getAllVehiclePaintRatios(); // 更新玩家占比

          var playerRatio = allRatios['player'] || 0;
          this.updatePlayerRatioDisplay(playerRatio); // 更新AI占比

          this.updateAIRatiosDisplay(allRatios);
        }
        /**
         * 更新玩家占比显示
         * @param ratio 占比（0-1）
         */


        updatePlayerRatioDisplay(ratio) {
          var percentage = Math.round(ratio * 100);

          if (this.playerRatioLabel) {
            this.playerRatioLabel.string = "player: " + percentage + "%";
          } // if (this.playerRatioBar) {
          //     this.playerRatioBar.progress = ratio;
          // }

        }
        /**
         * 更新AI占比显示
         * @param allRatios 所有车辆的占比
         */


        updateAIRatiosDisplay(_allRatios) {
          // 获取排序后的占比数据
          var sortedRatios = this.gameManager.getSortedVehiclePaintRatios(); // 只显示AI车辆（排除玩家）

          var aiRatios = sortedRatios.filter(item => item.vehicleId !== 'player'); // 获取AI标签数组

          var aiLabels = [this.ai1RatioLabel, this.ai2RatioLabel, this.ai3RatioLabel, this.ai4RatioLabel]; // 更新每个AI的显示

          aiRatios.forEach((ratioData, index) => {
            if (index < aiLabels.length && aiLabels[index]) {
              var percentage = Math.round(ratioData.ratio * 100);
              var displayName = this.getAIDisplayName(ratioData.vehicleId);
              aiLabels[index].string = displayName + ": " + percentage + "%";
            }
          }); // 清空未使用的标签

          for (var i = aiRatios.length; i < aiLabels.length; i++) {
            if (aiLabels[i]) {
              aiLabels[i].string = '';
            }
          }
        }
        /**
         * 获取AI的显示名称
         * @param vehicleId AI车辆ID
         * @returns 显示名称
         */


        getAIDisplayName(vehicleId) {
          // 从vehicleId中提取简化的显示名称
          if (vehicleId.startsWith('ai_')) {
            var parts = vehicleId.split('_');

            if (parts.length >= 2) {
              return "AI-" + parts[1];
            }
          }

          return vehicleId;
        }
        /**
         * 初始化AI占比显示
         */


        initializeAIRatioDisplay() {
          // 初始化所有AI标签为空字符串
          var aiLabels = [this.ai1RatioLabel, this.ai2RatioLabel, this.ai3RatioLabel, this.ai4RatioLabel];
          aiLabels.forEach((label, index) => {
            if (label) {
              label.string = "AI-" + (index + 1) + ": 0%";
            } else {
              console.warn("GameHUD: AI" + (index + 1) + "RatioLabel\u672A\u8BBE\u7F6E");
            }
          });
        }
        /**
         * 重置HUD显示
         */


        resetHUD() {
          if (this.countdownLabel) {
            this.countdownLabel.string = "02:00";
            this.countdownLabel.color = new this.countdownLabel.color.constructor(255, 255, 255, 255);
          }

          if (this.playerRatioLabel) {
            this.playerRatioLabel.string = "player: 0%";
          }

          this.initializeAIRatioDisplay();
        } // ==================== 射击系统UI ====================

        /**
         * 初始化射击按钮
         */


        initializeShootButton() {
          if (this.shootButton) {
            this.shootButton.node.on(Button.EventType.CLICK, this.onShootButtonClicked, this);
          } else {
            console.warn('GameHUD: 射击按钮未设置');
          }
        }
        /**
         * 射击按钮点击事件处理
         */


        onShootButtonClicked() {
          // 通知GameManager执行射击
          if (this.gameManager) {
            this.gameManager.playerShoot();
          }
        }
        /**
         * 更新弹药显示
         */


        updateAmmoDisplay() {
          if (!this.gameManager) return;
          var playerComponent = this.gameManager.getPlayerComponent();
          if (!playerComponent) return; // 更新弹药数量显示

          if (this.ammoLabel) {
            var currentAmmo = playerComponent.getCurrentAmmo();
            var maxAmmo = playerComponent.getMaxAmmo();
            this.ammoLabel.string = currentAmmo + "/" + maxAmmo;
          } // 更新弹药补充进度条


          if (this.reloadProgressBar) {
            if (playerComponent.isReloading()) {
              this.reloadProgressBar.node.active = true;
              this.reloadProgressBar.progress = playerComponent.getReloadProgress();
            } else {
              this.reloadProgressBar.node.active = false;
            }
          }
        } // ==================== 触摸控制系统 ====================

        /**
         * 初始化触摸控制按钮
         */


        initializeTouchControlButtons() {
          // 初始化上移按钮
          if (this.upButton) {
            this.upButton.node.on(Node.EventType.TOUCH_START, this.onUpButtonPressed, this);
            this.upButton.node.on(Node.EventType.TOUCH_END, this.onUpButtonReleased, this);
            this.upButton.node.on(Node.EventType.TOUCH_CANCEL, this.onUpButtonReleased, this);
          } else {
            console.warn('GameHUD: 上移按钮未设置');
          } // 初始化下移按钮


          if (this.downButton) {
            this.downButton.node.on(Node.EventType.TOUCH_START, this.onDownButtonPressed, this);
            this.downButton.node.on(Node.EventType.TOUCH_END, this.onDownButtonReleased, this);
            this.downButton.node.on(Node.EventType.TOUCH_CANCEL, this.onDownButtonReleased, this);
          } else {
            console.warn('GameHUD: 下移按钮未设置');
          } // 初始化左移按钮


          if (this.leftButton) {
            this.leftButton.node.on(Node.EventType.TOUCH_START, this.onLeftButtonPressed, this);
            this.leftButton.node.on(Node.EventType.TOUCH_END, this.onLeftButtonReleased, this);
            this.leftButton.node.on(Node.EventType.TOUCH_CANCEL, this.onLeftButtonReleased, this);
          } else {
            console.warn('GameHUD: 左移按钮未设置');
          } // 初始化右移按钮


          if (this.rightButton) {
            this.rightButton.node.on(Node.EventType.TOUCH_START, this.onRightButtonPressed, this);
            this.rightButton.node.on(Node.EventType.TOUCH_END, this.onRightButtonReleased, this);
            this.rightButton.node.on(Node.EventType.TOUCH_CANCEL, this.onRightButtonReleased, this);
          } else {
            console.warn('GameHUD: 右移按钮未设置');
          }
        }
        /**
         * 上移按钮按下事件
         */


        onUpButtonPressed() {
          console.log('GameHUD: 上移按钮被按下');

          if (this.gameManager) {
            var playerComponent = this.gameManager.getPlayerComponent();

            if (playerComponent) {
              console.log('GameHUD: 设置玩家加速度为1');
              playerComponent.setAcceleration(1); // 向前加速
            } else {
              console.warn('GameHUD: 无法获取玩家组件');
            }
          } else {
            console.warn('GameHUD: GameManager未找到');
          }
        }
        /**
         * 上移按钮释放事件
         */


        onUpButtonReleased() {
          console.log('GameHUD: 上移按钮被释放');

          if (this.gameManager) {
            var playerComponent = this.gameManager.getPlayerComponent();

            if (playerComponent) {
              console.log('GameHUD: 设置玩家加速度为0');
              playerComponent.setAcceleration(0); // 停止加速
            } else {
              console.warn('GameHUD: 无法获取玩家组件');
            }
          } else {
            console.warn('GameHUD: GameManager未找到');
          }
        }
        /**
         * 下移按钮按下事件
         */


        onDownButtonPressed() {
          console.log('GameHUD: 下移按钮被按下');

          if (this.gameManager) {
            var playerComponent = this.gameManager.getPlayerComponent();

            if (playerComponent) {
              console.log('GameHUD: 设置玩家加速度为-1');
              playerComponent.setAcceleration(-1); // 向后减速
            } else {
              console.warn('GameHUD: 无法获取玩家组件');
            }
          } else {
            console.warn('GameHUD: GameManager未找到');
          }
        }
        /**
         * 下移按钮释放事件
         */


        onDownButtonReleased() {
          console.log('GameHUD: 下移按钮被释放');

          if (this.gameManager) {
            var playerComponent = this.gameManager.getPlayerComponent();

            if (playerComponent) {
              console.log('GameHUD: 设置玩家加速度为0');
              playerComponent.setAcceleration(0); // 停止减速
            } else {
              console.warn('GameHUD: 无法获取玩家组件');
            }
          } else {
            console.warn('GameHUD: GameManager未找到');
          }
        }
        /**
         * 左移按钮按下事件
         */


        onLeftButtonPressed() {
          console.log('GameHUD: 左移按钮被按下');

          if (this.gameManager) {
            var playerComponent = this.gameManager.getPlayerComponent();

            if (playerComponent) {
              console.log('GameHUD: 设置玩家转向为-1');
              playerComponent.setDirection(-1); // 向左转向
            } else {
              console.warn('GameHUD: 无法获取玩家组件');
            }
          } else {
            console.warn('GameHUD: GameManager未找到');
          }
        }
        /**
         * 左移按钮释放事件
         */


        onLeftButtonReleased() {
          console.log('GameHUD: 左移按钮被释放');

          if (this.gameManager) {
            var playerComponent = this.gameManager.getPlayerComponent();

            if (playerComponent) {
              console.log('GameHUD: 设置玩家转向为0');
              playerComponent.setDirection(0); // 停止转向
            } else {
              console.warn('GameHUD: 无法获取玩家组件');
            }
          } else {
            console.warn('GameHUD: GameManager未找到');
          }
        }
        /**
         * 右移按钮按下事件
         */


        onRightButtonPressed() {
          console.log('GameHUD: 右移按钮被按下');

          if (this.gameManager) {
            var playerComponent = this.gameManager.getPlayerComponent();

            if (playerComponent) {
              console.log('GameHUD: 设置玩家转向为1');
              playerComponent.setDirection(1); // 向右转向
            } else {
              console.warn('GameHUD: 无法获取玩家组件');
            }
          } else {
            console.warn('GameHUD: GameManager未找到');
          }
        }
        /**
         * 右移按钮释放事件
         */


        onRightButtonReleased() {
          console.log('GameHUD: 右移按钮被释放');

          if (this.gameManager) {
            var playerComponent = this.gameManager.getPlayerComponent();

            if (playerComponent) {
              console.log('GameHUD: 设置玩家转向为0');
              playerComponent.setDirection(0); // 停止转向
            } else {
              console.warn('GameHUD: 无法获取玩家组件');
            }
          } else {
            console.warn('GameHUD: GameManager未找到');
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "countdownLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "playerRatioLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "ai1RatioLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "ai2RatioLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "ai3RatioLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "ai4RatioLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "shootButton", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "ammoLabel", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "reloadProgressBar", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "upButton", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "downButton", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "leftButton", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "rightButton", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "updateInterval", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.1;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f5d0d9de8e98f9ba667b19cb4e3228cbc440561f.js.map