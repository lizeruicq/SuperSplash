System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, Button, PlayerManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _crd, ccclass, property, PlayerManagerExample;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPlayerManager(extras) {
    _reporterNs.report("PlayerManager", "./PlayerManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPlayerData(extras) {
    _reporterNs.report("PlayerData", "./PlayerManager", _context.meta, extras);
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
    }, function (_unresolved_2) {
      PlayerManager = _unresolved_2.PlayerManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "20b5ejdWDFAvKPDLrpisPKz", "PlayerManagerExample", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Label', 'Button']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PlayerManagerExample", PlayerManagerExample = (_dec = ccclass('PlayerManagerExample'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Button), _dec6 = property(Button), _dec7 = property(Button), _dec8 = property(Button), _dec9 = property(Button), _dec(_class = (_class2 = class PlayerManagerExample extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "levelLabel", _descriptor, this);

          _initializerDefineProperty(this, "moneyLabel", _descriptor2, this);

          _initializerDefineProperty(this, "experienceLabel", _descriptor3, this);

          _initializerDefineProperty(this, "addMoneyBtn", _descriptor4, this);

          _initializerDefineProperty(this, "addExpBtn", _descriptor5, this);

          _initializerDefineProperty(this, "unlockCarBtn", _descriptor6, this);

          _initializerDefineProperty(this, "unlockLevelBtn", _descriptor7, this);

          _initializerDefineProperty(this, "wechatLoginBtn", _descriptor8, this);

          this._playerManager = null;
        }

        onLoad() {
          // 获取PlayerManager实例
          this._playerManager = (_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
            error: Error()
          }), PlayerManager) : PlayerManager).instance; // 添加数据变化监听

          this._playerManager.addDataChangeListener(this.onPlayerDataChanged.bind(this)); // 更新UI


          this.updateUI();
        }

        start() {
          // 绑定按钮事件
          this.bindButtonEvents(); // 检查微信环境并显示登录按钮

          if (this._playerManager.isWeChatMiniGame) {
            this.wechatLoginBtn.node.active = true;
          } else {
            this.wechatLoginBtn.node.active = false;
          }
        }

        onDestroy() {
          // 移除数据变化监听
          if (this._playerManager) {
            this._playerManager.removeDataChangeListener(this.onPlayerDataChanged.bind(this));
          }
        }
        /**
         * 绑定按钮事件
         */


        bindButtonEvents() {
          if (this.addMoneyBtn) {
            this.addMoneyBtn.node.on(Button.EventType.CLICK, this.onAddMoneyClick, this);
          }

          if (this.addExpBtn) {
            this.addExpBtn.node.on(Button.EventType.CLICK, this.onAddExpClick, this);
          }

          if (this.unlockCarBtn) {
            this.unlockCarBtn.node.on(Button.EventType.CLICK, this.onUnlockCarClick, this);
          }

          if (this.unlockLevelBtn) {
            this.unlockLevelBtn.node.on(Button.EventType.CLICK, this.onUnlockLevelClick, this);
          }

          if (this.wechatLoginBtn) {
            this.wechatLoginBtn.node.on(Button.EventType.CLICK, this.onWechatLoginClick, this);
          }
        }
        /**
         * 玩家数据变化回调
         */


        onPlayerDataChanged(data) {
          this.updateUI();
          console.log('玩家数据已更新:', data);
        }
        /**
         * 更新UI显示
         */


        updateUI() {
          if (!this._playerManager) return;
          const data = this._playerManager.playerData;

          if (this.levelLabel) {
            this.levelLabel.string = `等级: ${data.level}`;
          }

          if (this.moneyLabel) {
            this.moneyLabel.string = `金钱: ${data.money}`;
          }

          if (this.experienceLabel) {
            this.experienceLabel.string = `经验: ${data.experience}/${data.level * 100}`;
          }
        }
        /**
         * 增加金钱按钮点击
         */


        onAddMoneyClick() {
          this._playerManager.addMoney(100);

          console.log('增加了100金钱');
        }
        /**
         * 增加经验按钮点击
         */


        onAddExpClick() {
          this._playerManager.addExperience(50);

          console.log('增加了50经验');
        }
        /**
         * 解锁车辆按钮点击
         */


        onUnlockCarClick() {
          const carId = 'car_002';

          if (this._playerManager.unlockCar(carId)) {
            console.log(`解锁了车辆: ${carId}`);
          } else {
            console.log(`车辆 ${carId} 已经解锁`);
          }
        }
        /**
         * 解锁关卡按钮点击
         */


        onUnlockLevelClick() {
          const levelId = 'level_002';

          if (this._playerManager.unlockLevel(levelId)) {
            console.log(`解锁了关卡: ${levelId}`);
          } else {
            console.log(`关卡 ${levelId} 已经解锁`);
          }
        }
        /**
         * 微信登录按钮点击
         */


        async onWechatLoginClick() {
          if (await this._playerManager.wechatLogin()) {
            console.log('微信登录成功');
          } else {
            console.log('微信登录失败');
          }
        }
        /**
         * 模拟比赛完成
         */


        simulateRaceComplete() {
          // 模拟比赛完成后的数据更新
          const levelId = 'level_001';
          const raceTime = 45000; // 45秒

          const stars = 2; // 更新关卡进度

          this._playerManager.updateLevelProgress(levelId, raceTime, stars); // 增加金钱和经验


          this._playerManager.addMoney(200);

          this._playerManager.addExperience(100); // 更新统计数据


          this._playerManager.updateStatistics({
            totalRaces: this._playerManager.playerData.statistics.totalRaces + 1,
            totalWins: this._playerManager.playerData.statistics.totalWins + 1,
            totalDistance: this._playerManager.playerData.statistics.totalDistance + 5000
          });

          console.log('比赛完成，数据已更新');
        }
        /**
         * 模拟车辆升级
         */


        simulateCarUpgrade() {
          const carId = this._playerManager.playerData.currentCar;
          const upgradeCost = 500;

          if (this._playerManager.spendMoney(upgradeCost)) {
            // 随机升级一个部件
            const parts = ['engine', 'tires', 'suspension', 'nitro'];
            const randomPart = parts[Math.floor(Math.random() * parts.length)];

            if (this._playerManager.upgradeCarPart(carId, randomPart)) {
              console.log(`车辆 ${carId} 的 ${randomPart} 升级成功`);
            } else {
              console.log(`车辆 ${carId} 的 ${randomPart} 已达到最高等级`);
            }
          } else {
            console.log('金钱不足，无法升级');
          }
        }
        /**
         * 导出玩家数据（用于调试）
         */


        exportPlayerData() {
          const jsonData = this._playerManager.exportPlayerData();

          console.log('玩家数据导出:', jsonData); // 在实际项目中，可以将数据复制到剪贴板或保存到文件

          if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(jsonData).then(() => {
              console.log('玩家数据已复制到剪贴板');
            });
          }
        }
        /**
         * 重置玩家数据（用于调试）
         */


        resetPlayerData() {
          if (confirm('确定要重置所有玩家数据吗？此操作不可恢复！')) {
            this._playerManager.resetPlayerData();

            console.log('玩家数据已重置');
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "levelLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "moneyLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "experienceLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "addMoneyBtn", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "addExpBtn", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "unlockCarBtn", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "unlockLevelBtn", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "wechatLoginBtn", [_dec9], {
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
//# sourceMappingURL=dd8654737f782dc7d2f444b1277fa4b83bb7ca70.js.map