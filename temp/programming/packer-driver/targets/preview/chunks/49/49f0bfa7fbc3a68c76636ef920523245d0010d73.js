System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, _dec, _class, _crd, ccclass, StartupController;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      director = _cc.director;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "85c04wFVoxGb475xIYcnGAK", "StartupController", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director']);

      ({
        ccclass
      } = _decorator);
      /**
       * 启动控制器
       * 用于处理游戏启动时的初始化逻辑
       * 避免在主菜单场景中直接初始化复杂的单例组件
       */

      _export("StartupController", StartupController = (_dec = ccclass('StartupController'), _dec(_class = class StartupController extends Component {
        start() {
          console.log('StartupController: Game starting...'); // 延迟加载主菜单，确保所有系统准备就绪

          this.scheduleOnce(() => {
            this.loadMainMenu();
          }, 0.5);
        }

        loadMainMenu() {
          try {
            console.log('StartupController: Loading main menu...');
            director.loadScene('mainmenu');
          } catch (error) {
            console.error('StartupController: Error loading main menu:', error); // 如果主菜单加载失败，直接加载关卡选择

            director.loadScene('LevelSelect');
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=49f0bfa7fbc3a68c76636ef920523245d0010d73.js.map