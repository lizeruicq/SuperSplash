System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, resources, JsonAsset, _dec, _class, _class2, _crd, ccclass, ConfigManager;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      resources = _cc.resources;
      JsonAsset = _cc.JsonAsset;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c3a02itfkJIEpxNgcU4AkzR", "ConfigManager", undefined);

      __checkObsolete__(['_decorator', 'resources', 'JsonAsset']);

      ({
        ccclass
      } = _decorator);
      /**
       * 车辆属性接口
       */

      /**
       * 车辆配置接口
       */

      /**
       * 玩家数据接口
       */

      /**
       * 配置管理器
       * 负责加载和管理所有JSON配置文件
       */
      _export("ConfigManager", ConfigManager = (_dec = ccclass('ConfigManager'), _dec(_class = (_class2 = class ConfigManager {
        constructor() {
          this.carConfig = null;
          this.playerDataConfig = null;
          this.isLoaded = false;
        }

        /**
         * 获取单例实例
         */
        static getInstance() {
          if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
          }

          return ConfigManager.instance;
        }
        /**
         * 初始化配置管理器，加载所有配置文件
         */


        initialize() {
          var _this = this;

          return _asyncToGenerator(function* () {
            if (_this.isLoaded) {
              return;
            }

            try {
              yield Promise.all([_this.loadCarConfig(), _this.loadPlayerDataConfig()]);
              _this.isLoaded = true;
              console.log('ConfigManager initialized successfully');
            } catch (error) {
              console.error('Failed to initialize ConfigManager:', error);
              throw error;
            }
          })();
        }
        /**
         * 加载车辆配置
         */


        loadCarConfig() {
          return new Promise((resolve, reject) => {
            resources.load('config/car_properties', JsonAsset, (err, jsonAsset) => {
              if (err) {
                console.error('Failed to load car properties config:', err);
                reject(err);
                return;
              }

              this.carConfig = jsonAsset.json;
              console.log('Car properties config loaded:', this.carConfig);
              resolve();
            });
          });
        }
        /**
         * 加载玩家数据配置
         */


        loadPlayerDataConfig() {
          return new Promise((resolve, reject) => {
            resources.load('config/player_data_default', JsonAsset, (err, jsonAsset) => {
              if (err) {
                console.error('Failed to load player data config:', err);
                reject(err);
                return;
              }

              this.playerDataConfig = jsonAsset.json;
              console.log('Player data config loaded:', this.playerDataConfig);
              resolve();
            });
          });
        }
        /**
         * 获取车辆属性
         */


        getCarProperty(carId) {
          if (!this.carConfig) {
            console.warn('Car config not loaded yet');
            return null;
          }

          return this.carConfig.cars[carId] || null;
        }
        /**
         * 获取所有车辆配置
         */


        getAllCarProperties() {
          if (!this.carConfig) {
            console.warn('Car config not loaded yet');
            return {};
          }

          return this.carConfig.cars;
        }
        /**
         * 获取默认玩家数据
         */


        getDefaultPlayerData() {
          if (!this.playerDataConfig) {
            console.warn('Player data config not loaded yet');
            return null;
          }

          return this.playerDataConfig.playerData;
        }
        /**
         * 检查配置是否已加载
         */


        isConfigLoaded() {
          return this.isLoaded;
        }
        /**
         * 重新加载配置（用于热更新）
         */


        reloadConfigs() {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            _this2.isLoaded = false;
            _this2.carConfig = null;
            _this2.playerDataConfig = null;
            yield _this2.initialize();
          })();
        }
        /**
         * 获取车辆综合评分
         */


        getCarOverallRating(carId) {
          var property = this.getCarProperty(carId);
          if (!property) return 0;
          return Math.round((property.speed + property.steering + property.durability) / 3);
        }
        /**
         * 获取配置版本信息
         */


        getConfigVersions() {
          var _this$carConfig, _this$playerDataConfi;

          return {
            carConfig: ((_this$carConfig = this.carConfig) == null ? void 0 : _this$carConfig.version) || 'unknown',
            playerDataConfig: ((_this$playerDataConfi = this.playerDataConfig) == null ? void 0 : _this$playerDataConfi.version) || 'unknown'
          };
        }

      }, _class2.instance = null, _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=1ed6239e7fc7d809d99c59b09a18453a697e539c.js.map