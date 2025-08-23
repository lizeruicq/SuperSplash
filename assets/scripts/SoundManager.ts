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
        tooltip: "战斗音乐1"
    })
    public bgmbattleAudioSource: AudioSource = null!;

     @property({
        type: AudioSource,
        tooltip: "战斗音乐2"
    })
    public bgmbattle2AudioSource: AudioSource = null!;

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
        tooltip: "车辆漂移音效"
    })
    public carDriftAudioSource: AudioSource = null!;

    @property({
        type: AudioSource,
        tooltip: "武器发射音效"
    })
    public weaponFireAudioSource: AudioSource = null!;

    @property({
        type: AudioSource,
        tooltip: "火箭命中音效"
    })
    public rocketHitAudioSource: AudioSource = null!;

    @property({
        type: AudioSource,
        tooltip: "子弹命中音效"
    })
    public bulletHitAudioSource: AudioSource = null!;

    @property({
        type: AudioSource,
        tooltip: "飞镖命中音效"
    })
    public dartHitAudioSource: AudioSource = null!;


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

        // 将所有音源收集到一个数组中，方便统一管理（只添加非空的音源）
        if (this.bgmAudioSource) this.allAudioSources.push(this.bgmAudioSource);
        if (this.bgmbattleAudioSource) this.allAudioSources.push(this.bgmbattleAudioSource);
        if (this.bgmbattle2AudioSource) this.allAudioSources.push(this.bgmbattle2AudioSource);
        if (this.buttonClickAudioSource) this.allAudioSources.push(this.buttonClickAudioSource);
        if (this.carCollisionAudioSource) this.allAudioSources.push(this.carCollisionAudioSource);
        if (this.carDestructionAudioSource) this.allAudioSources.push(this.carDestructionAudioSource);
        if (this.carStartAudioSource) this.allAudioSources.push(this.carStartAudioSource);
        if (this.carDriftAudioSource) this.allAudioSources.push(this.carDriftAudioSource);
        if (this.weaponFireAudioSource) this.allAudioSources.push(this.weaponFireAudioSource);
        // if (this.rocketHitAudioSource) this.allAudioSources.push(this.rocketHitAudioSource);
        // if (this.bulletHitAudioSource) this.allAudioSources.push(this.bulletHitAudioSource);
        // if (this.dartHitAudioSource) this.allAudioSources.push(this.dartHitAudioSource);
        this.loadState();
    }

    start() {
        // 延迟播放BGM，确保所有系统初始化完成
        this.scheduleOnce(() => {
            this.playBGM();
        }, 0.1);
    }

    playBGM() {
        try {
            if (this.bgmAudioSource && this.bgmAudioSource.clip) {
                this.bgmAudioSource.play();
                console.log('BGM started playing');
            } else {
                console.warn('BGM AudioSource or clip is null');
            }
        } catch (error) {
            console.error('Error playing BGM:', error);
        }
    }
    stopBGM() {
        try {
            if (this.bgmAudioSource) {
                this.bgmAudioSource.stop();
                console.log('BGM stopped');
            } 
            else {
                console.warn('BGM AudioSource is null');
            }
        } catch (error) {
            console.error('Error stopping BGM:', error);
        }
    }

    stopbattleBGM() {
        try {
            if (this.bgmbattleAudioSource) {
                this.bgmbattleAudioSource.stop();
                console.log('Battle BGM stopped');
            } 
            else if (this.bgmbattle2AudioSource) {
                this.bgmbattle2AudioSource.stop();
                console.log('Battle BGM stopped');
            }
            else {
                console.warn('Battle BGM AudioSource is null');
            }
        } catch (error) {
            console.error('Error stopping Battle BGM:', error);
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
            case 'carDrift':
                sourceToPlay = this.carDriftAudioSource;
                break;
            // case 'bulletHit':
            //     sourceToPlay = this.bulletHitAudioSource;
            //     break;
            // case 'dartHit':
            //     sourceToPlay = this.dartHitAudioSource;
            //     break;
            // case 'explosion':
            //     sourceToPlay = this.rocketHitAudioSource;
            //     break;
            case 'weaponFire':
                sourceToPlay = this.weaponFireAudioSource;
                break;
            case 'battlebgm1':
                sourceToPlay = this.bgmbattleAudioSource;
                break;
            case 'battlebgm2':
                sourceToPlay = this.bgmbattle2AudioSource;
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
            if (source===this.bgmAudioSource || source===this.bgmbattleAudioSource || source===this.bgmbattle2AudioSource ) {
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
        // return false;
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
                if (source===this.bgmAudioSource || source===this.bgmbattleAudioSource || source===this.bgmbattle2AudioSource ) {
                    source.volume = volume * 0.3;
                }
                else if (source) {
                    source.volume = volume;
                }
            });
        }
    }
}