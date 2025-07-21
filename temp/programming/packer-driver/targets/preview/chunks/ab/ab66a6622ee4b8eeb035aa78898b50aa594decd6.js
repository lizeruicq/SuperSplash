System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, AudioClip, AudioSource, director, sys, resources, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _class3, _crd, ccclass, property, SoundManager;

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
      AudioClip = _cc.AudioClip;
      AudioSource = _cc.AudioSource;
      director = _cc.director;
      sys = _cc.sys;
      resources = _cc.resources;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7c3850Yg29IBK4wW9FYz7f1", "SoundManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'AudioClip', 'AudioSource', 'director', 'sys', 'resources']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("SoundManager", SoundManager = (_dec = ccclass('SoundManager'), _dec2 = property(AudioSource), _dec3 = property(AudioSource), _dec(_class = (_class2 = (_class3 = class SoundManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "bgmAudioSource", _descriptor, this);

          _initializerDefineProperty(this, "effectAudioSource", _descriptor2, this);
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
          director.addPersistRootNode(this.node);
          this.bgmAudioSource = this.node.addComponent(AudioSource);
          this.effectAudioSource = this.node.addComponent(AudioSource);
          this.loadState();
        }

        start() {
          this.playBGM('bgm'); // 默认播放的BGM，请确保resources/sound目录下有bgm.mp3/wav等格式文件
        }

        playBGM(name) {
          var path = "sound/" + name;
          resources.load(path, AudioClip, (err, clip) => {
            if (err) {
              console.warn("Failed to load BGM: " + path, err);
              return;
            }

            this.bgmAudioSource.clip = clip;
            this.bgmAudioSource.loop = true;
            this.bgmAudioSource.play();
            console.log("Playing BGM: " + path);
          });
        }

        playSoundEffect(name) {
          var path = "sound/" + name;
          resources.load(path, AudioClip, (err, clip) => {
            if (err) {
              console.warn("Failed to load sound effect: " + path, err);
              return;
            }

            this.effectAudioSource.playOneShot(clip);
          });
        }

        toggleAudio() {
          var isMuted = this.isMuted();
          this.bgmAudioSource.volume = isMuted ? 1 : 0;
          this.effectAudioSource.volume = isMuted ? 1 : 0;
          this.saveState();
        }

        isMuted() {
          return this.bgmAudioSource.volume === 0;
        }

        saveState() {
          sys.localStorage.setItem('soundMuted', this.isMuted() ? '1' : '0');
        }

        loadState() {
          var muted = sys.localStorage.getItem('soundMuted');
          var isMuted = muted === '0';
          this.bgmAudioSource.volume = isMuted ? 0 : 1;
          this.effectAudioSource.volume = isMuted ? 0 : 1;
        }

      }, _class3._instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bgmAudioSource", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "effectAudioSource", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ab66a6622ee4b8eeb035aa78898b50aa594decd6.js.map