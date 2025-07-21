import { _decorator, Component, Node, AudioClip, AudioSource, director, sys, resources } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SoundManager')
export class SoundManager extends Component {
    @property(AudioSource)
    private bgmAudioSource: AudioSource = null!;
    @property(AudioSource)
    private effectAudioSource: AudioSource = null!;

    private static _instance: SoundManager = null!;

    public static get instance(): SoundManager {
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

    playBGM(name: string) {
        const path = `sound/${name}`;
        resources.load(path, AudioClip, (err, clip) => {
            if (err) {
                console.warn(`Failed to load BGM: ${path}`, err);
                return;
            }
            this.bgmAudioSource.clip = clip;
            this.bgmAudioSource.loop = true;
            this.bgmAudioSource.play();
            console.log(`Playing BGM: ${path}`);
        });
    }

    playSoundEffect(name: string) {
        const path = `sound/${name}`;
        resources.load(path, AudioClip, (err, clip) => {
            if (err) {
                console.warn(`Failed to load sound effect: ${path}`, err);
                return;
            }
            this.effectAudioSource.playOneShot(clip);
        });
    }

    toggleAudio() {
        const isMuted = this.isMuted();
        this.bgmAudioSource.volume = isMuted ? 1 : 0;
        this.effectAudioSource.volume = isMuted ? 1 : 0;
        this.saveState();
    }

    isMuted(): boolean {
        return this.bgmAudioSource.volume === 0;
    }

    saveState() {
        sys.localStorage.setItem('soundMuted', this.isMuted() ? '1' : '0');
    }

    loadState() {
        const muted = sys.localStorage.getItem('soundMuted');
        const isMuted = muted === '0';
        this.bgmAudioSource.volume = isMuted ? 0 : 1;
        this.effectAudioSource.volume = isMuted ? 0 : 1;
    }
}