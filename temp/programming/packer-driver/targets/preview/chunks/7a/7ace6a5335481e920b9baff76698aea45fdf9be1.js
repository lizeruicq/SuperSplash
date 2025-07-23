System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, _dec, _class, _class2, _crd, ccclass, CarProperties;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "796e3d2xZlPdZWRNarqrn+2", "CarProperties", undefined);

      __checkObsolete__(['_decorator']);

      ({
        ccclass
      } = _decorator);
      /**
       * 车辆属性接口
       */

      /**
       * 车辆属性配置类
       * 管理所有车辆的属性数据
       */
      _export("CarProperties", CarProperties = (_dec = ccclass('CarProperties'), _dec(_class = (_class2 = class CarProperties {
        /**
         * 获取指定车辆的属性
         * @param carId 车辆ID
         * @returns 车辆属性，如果车辆不存在则返回null
         */
        static getCarProperty(carId) {
          return this.carPropertiesConfig[carId] || null;
        }

      }, _class2.carPropertiesConfig = {
        'car-1': {
          speed: 60,
          steering: 70,
          durability: 80
        },
        'car-2': {
          speed: 75,
          steering: 65,
          durability: 70
        },
        'car-3': {
          speed: 85,
          steering: 60,
          durability: 65
        },
        'car-4': {
          speed: 90,
          steering: 55,
          durability: 60
        },
        'car-5': {
          speed: 95,
          steering: 50,
          durability: 55
        }
      }, _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7ace6a5335481e920b9baff76698aea45fdf9be1.js.map