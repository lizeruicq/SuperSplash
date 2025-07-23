System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, AudioSource, director, sys, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _class3, _crd, ccclass, property, SoundManager;

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
      AudioSource = _cc.AudioSource;
      director = _cc.director;
      sys = _cc.sys;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7c3850Yg29IBK4wW9FYz7f1", "SoundManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'AudioClip', 'AudioSource', 'director', 'sys']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("SoundManager", SoundManager = (_dec = ccclass('SoundManager'), _dec2 = property({
        type: AudioSource,
        tooltip: "背景音乐"
      }), _dec3 = property({
        type: AudioSource,
        tooltip: "按钮点击音效"
      }), _dec4 = property({
        type: AudioSource,
        tooltip: "车辆碰撞音效"
      }), _dec5 = property({
        type: AudioSource,
        tooltip: "车辆毁坏音效"
      }), _dec6 = property({
        type: AudioSource,
        tooltip: "车辆启动音效"
      }), _dec7 = property({
        type: AudioSource,
        tooltip: "车辆加速音效"
      }), _dec8 = property({
        type: AudioSource,
        tooltip: "车辆漂移音效"
      }), _dec(_class = (_class2 = (_class3 = class SoundManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "bgmAudioSource", _descriptor, this);

          _initializerDefineProperty(this, "buttonClickAudioSource", _descriptor2, this);

          _initializerDefineProperty(this, "carCollisionAudioSource", _descriptor3, this);

          _initializerDefineProperty(this, "carDestructionAudioSource", _descriptor4, this);

          _initializerDefineProperty(this, "carStartAudioSource", _descriptor5, this);

          _initializerDefineProperty(this, "carAccelerateAudioSource", _descriptor6, this);

          _initializerDefineProperty(this, "carDriftAudioSource", _descriptor7, this);

          this.allAudioSources = [];
        }

        static get instance() {
          return this._instance;
        }

        onLoad() {
          if (SoundManager._instance) {
            this.destroy();
            return;
          }

          SoundManager._instance = this;
          director.addPersistRootNode(this.node); // 将所有音源收集到一个数组中，方便统一管理

          this.allAudioSources.push(this.bgmAudioSource);
          this.allAudioSources.push(this.buttonClickAudioSource);
          this.allAudioSources.push(this.carCollisionAudioSource);
          this.allAudioSources.push(this.carDestructionAudioSource);
          this.allAudioSources.push(this.carStartAudioSource);
          this.allAudioSources.push(this.carAccelerateAudioSource);
          this.allAudioSources.push(this.carDriftAudioSource);
          this.loadState();
        }

        start() {
          this.playBGM();
        }

        playBGM() {
          if (this.bgmAudioSource) {
            this.bgmAudioSource.play();
          }
        }

        playSoundEffect(soundName) {
          let sourceToPlay = null;

          switch (soundName) {
            case 'buttonClick':
              sourceToPlay = this.buttonClickAudioSource;
              break;

            case 'carCollision':
              sourceToPlay = this.carCollisionAudioSource;
              break;

            case 'carDestruction':
              sourceToPlay = this.carDestructionAudioSource;
              break;

            case 'carStart':
              sourceToPlay = this.carStartAudioSource;
              break;

            case 'carAccelerate':
              sourceToPlay = this.carAccelerateAudioSource;
              break;

            case 'carDrift':
              sourceToPlay = this.carDriftAudioSource;
              break;
          }

          if (sourceToPlay) {
            sourceToPlay.play();
          }
        }

        toggleAudio() {
          const muted = this.isMuted();
          const newVolume = muted ? 1 : 0;
          this.allAudioSources.forEach(source => {
            if (source === this.bgmAudioSource) {
              source.volume = newVolume * 0.3;
            } else if (source) {
              source.volume = newVolume;
            }
          });
          this.saveState();
        }

        isMuted() {
          // 检查BGM音源的音量作为代表
          return this.bgmAudioSource ? this.bgmAudioSource.volume === 0 : false;
        }

        saveState() {
          const state = {
            muted: this.isMuted()
          };
          sys.localStorage.setItem('soundState', JSON.stringify(state));
        }

        loadState() {
          const stateStr = sys.localStorage.getItem('soundState');

          if (stateStr) {
            const state = JSON.parse(stateStr);
            const volume = state.muted ? 0 : 1;
            this.allAudioSources.forEach(source => {
              if (source === this.bgmAudioSource) {
                source.volume = volume * 0.3;
              } else if (source) {
                source.volume = volume;
              }
            });
          }
        }

      }, _class3._instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bgmAudioSource", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "buttonClickAudioSource", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "carCollisionAudioSource", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "carDestructionAudioSource", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "carStartAudioSource", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "carAccelerateAudioSource", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "carDriftAudioSource", [_dec8], {
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
//# sourceMappingURL=ab66a6622ee4b8eeb035aa78898b50aa594decd6.js.map