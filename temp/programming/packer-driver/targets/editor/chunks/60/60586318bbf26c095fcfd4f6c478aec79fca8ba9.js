System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Button, Label, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _crd, ccclass, property, GameOverPanel;

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
      Button = _cc.Button;
      Label = _cc.Label;
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "85096jcoYBCMKDGuUlvynIB", "GameOverPanel", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Button', 'Label']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameOverPanel", GameOverPanel = (_dec = ccclass('GameOverPanel'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Label), _dec6 = property(Label), _dec7 = property(Label), _dec8 = property({
        type: Label,
        tooltip: 'AI车辆1的颜料占比显示标签'
      }), _dec9 = property({
        type: Label,
        tooltip: 'AI车辆2的颜料占比显示标签'
      }), _dec10 = property({
        type: Label,
        tooltip: 'AI车辆3的颜料占比显示标签'
      }), _dec11 = property({
        type: Label,
        tooltip: 'AI车辆4的颜料占比显示标签'
      }), _dec12 = property(Button), _dec13 = property(Button), _dec(_class = (_class2 = class GameOverPanel extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "titleLabel", _descriptor, this);

          // 游戏结束标题
          _initializerDefineProperty(this, "performanceLabel", _descriptor2, this);

          // 表现评价标签
          _initializerDefineProperty(this, "rewardLabel", _descriptor3, this);

          // 奖励金币标签
          _initializerDefineProperty(this, "gameTimeLabel", _descriptor4, this);

          // 游戏时长标签
          _initializerDefineProperty(this, "healthLabel", _descriptor5, this);

          // 剩余生命值标签
          // 玩家颜料占比显示
          _initializerDefineProperty(this, "playerRatioLabel", _descriptor6, this);

          // AI颜料占比显示标签（手动拖拽设置）
          _initializerDefineProperty(this, "ai1RatioLabel", _descriptor7, this);

          _initializerDefineProperty(this, "ai2RatioLabel", _descriptor8, this);

          _initializerDefineProperty(this, "ai3RatioLabel", _descriptor9, this);

          _initializerDefineProperty(this, "ai4RatioLabel", _descriptor10, this);

          _initializerDefineProperty(this, "restartButton", _descriptor11, this);

          // 重新开始按钮
          _initializerDefineProperty(this, "mainMenuButton", _descriptor12, this);
        }

        // 返回主菜单按钮
        start() {
          this.bindButtonEvents();
          this.updateGameStats();
          this.updatePaintRatios();
        }
        /**
         * 绑定按钮事件
         */


        bindButtonEvents() {
          if (this.restartButton) {
            this.restartButton.node.on(Button.EventType.CLICK, this.onRestartClick, this);
          }

          if (this.mainMenuButton) {
            this.mainMenuButton.node.on(Button.EventType.CLICK, this.onMainMenuClick, this);
          }
        }
        /**
         * 更新游戏统计信息
         */


        updateGameStats() {
          const gameManager = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance();
          if (!gameManager) return; // 更新游戏时长

          if (this.gameTimeLabel) {
            const gameTime = gameManager.getGameTime();
            this.gameTimeLabel.string = `游戏时长: ${gameTime.toFixed(1)}秒`;
          } // 更新剩余生命值


          if (this.healthLabel) {
            const playerHP = gameManager.getPlayerHP();
            const maxHP = gameManager.getPlayerMaxHP();
            const healthPercentage = (playerHP / maxHP * 100).toFixed(1);
            this.healthLabel.string = `剩余生命值: ${playerHP}/${maxHP} (${healthPercentage}%)`;
          }
        }
        /**
         * 更新颜料占比显示
         */


        updatePaintRatios() {
          const gameManager = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance();
          if (!gameManager) return; // 获取所有车辆的颜料占比

          const allRatios = gameManager.getAllVehiclePaintRatios(); // 更新玩家占比

          const playerRatio = allRatios['player'] || 0;
          const playerPercentage = Math.round(playerRatio * 100);

          if (this.playerRatioLabel) {
            this.playerRatioLabel.string = `玩家: ${playerPercentage}%`;
          } // 获取排序后的AI占比数据


          const sortedRatios = gameManager.getSortedVehiclePaintRatios();
          const aiRatios = sortedRatios.filter(item => item.vehicleId !== 'player'); // 获取AI标签数组

          const aiLabels = [this.ai1RatioLabel, this.ai2RatioLabel, this.ai3RatioLabel, this.ai4RatioLabel]; // 更新每个AI的显示

          aiRatios.forEach((ratioData, index) => {
            if (index < aiLabels.length && aiLabels[index]) {
              const percentage = Math.round(ratioData.ratio * 100);
              const displayName = this.getAIDisplayName(ratioData.vehicleId);
              aiLabels[index].string = `${displayName}: ${percentage}%`;
            }
          }); // 清空未使用的标签

          for (let i = aiRatios.length; i < aiLabels.length; i++) {
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
            const parts = vehicleId.split('_');

            if (parts.length >= 2) {
              return `AI-${parts[1]}`;
            }
          }

          return vehicleId;
        }
        /**
         * 重新开始按钮点击
         */


        onRestartClick() {
          const gameManager = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance();

          if (gameManager) {
            gameManager.restartGame();
          }
        }
        /**
         * 返回主菜单按钮点击
         */


        onMainMenuClick() {
          const gameManager = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance();

          if (gameManager) {
            gameManager.returnToMainMenu();
          }
        }
        /**
         * 设置游戏结束信息
         */


        setGameOverInfo(isVictory, performance, reward) {
          if (this.titleLabel) {
            this.titleLabel.string = isVictory ? '胜利！' : '失败！';
          }

          if (this.performanceLabel) {
            this.performanceLabel.string = `表现评价: ${performance}`;
          }

          if (this.rewardLabel) {
            this.rewardLabel.string = `获得金币: ${reward}`;
          }
        }

        onDestroy() {
          // 清理事件监听
          if (this.restartButton) {
            this.restartButton.node.off(Button.EventType.CLICK, this.onRestartClick, this);
          }

          if (this.mainMenuButton) {
            this.mainMenuButton.node.off(Button.EventType.CLICK, this.onMainMenuClick, this);
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "titleLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "performanceLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "rewardLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "gameTimeLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "healthLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "playerRatioLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "ai1RatioLabel", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "ai2RatioLabel", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "ai3RatioLabel", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "ai4RatioLabel", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "restartButton", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "mainMenuButton", [_dec13], {
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
//# sourceMappingURL=60586318bbf26c095fcfd4f6c478aec79fca8ba9.js.map