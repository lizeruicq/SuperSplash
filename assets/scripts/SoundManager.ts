import { _decorator, Component, Node, AudioClip, AudioSource, director, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SoundManager')
export class SoundManager extends Component {
    @property({
        type: AudioSource,
        tooltip: "背景音乐"
    })
    public bgmAudioSource: AudioSource = null!;

    @property({
        type: AudioSource,
        tooltip: "按钮点击音效"
    })
    public buttonClickAudioSource: AudioSource = null!;

    @property({
        type: AudioSource,
        tooltip: "车辆碰撞音效"
    })
    public carCollisionAudioSource: AudioSource = null!;

    @property({
        type: AudioSource,
        tooltip: "车辆毁坏音效"
    })
    public carDestructionAudioSource: AudioSource = null!;

    @property({
        type: AudioSource,
        tooltip: "车辆启动音效"
    })
    public carStartAudioSource: AudioSource = null!;

    @property({
        type: AudioSource,
        tooltip: "车辆加速音效"
    })
    public carAccelerateAudioSource: AudioSource = null!;

    @property({
        type: AudioSource,
        tooltip: "车辆漂移音效"
    })
    public carDriftAudioSource: AudioSource = null!;

    private allAudioSources: AudioSource[] = [];

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

        // 将所有音源收集到一个数组中，方便统一管理
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

    playSoundEffect(soundName: string) {
        let sourceToPlay: AudioSource | null = null;
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
            if (source===this.bgmAudioSource) {
                    source.volume = newVolume * 0.3;
                }
                else if (source) {
                    source.volume = newVolume;
                }
        });
        this.saveState();
    }

    isMuted(): boolean {
        // 检查BGM音源的音量作为代表
        return this.bgmAudioSource ? this.bgmAudioSource.volume === 0 : false;
    }

    private saveState() {
        const state = {
            muted: this.isMuted()
        };
        sys.localStorage.setItem('soundState', JSON.stringify(state));
    }

    private loadState() {
        const stateStr = sys.localStorage.getItem('soundState');
        if (stateStr) {
            const state = JSON.parse(stateStr);
            const volume = state.muted ? 0 : 1;
            this.allAudioSources.forEach(source => {
                if (source===this.bgmAudioSource) {
                    source.volume = volume * 0.3;
                }
                else if (source) {
                    source.volume = volume;
                }
            });
        }
    }
}