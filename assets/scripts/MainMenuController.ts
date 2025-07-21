import { _decorator, Component, Button, Node, Label } from 'cc';
import { SceneTransition } from './SceneTransition';
import { SoundManager } from './SoundManager';
const { ccclass, property } = _decorator;

@ccclass('MainMenuController')
export class MainMenuController extends Component {
    @property(Button)
    startGameBtn: Button = null!; // 拖拽你的"开始游戏"按钮到这里

    @property(Button)
    settingBtn: Button = null!; 

    @property(Button)
    closesettingBtn: Button = null!; 

    @property(Button)
    audioBtn: Button = null!; 

    @property(Node)
    settingPanel: Node = null!; // 拖拽你的设置面板节点到这里

    @property(Label)
    audioLabel: Label = null!; // 拖拽音效按钮的Label组件到这里



    start() {
        if (this.startGameBtn) {
            this.startGameBtn.node.on(Button.EventType.CLICK, this.onStartGame, this);
        }
        if(this.settingBtn){
            this.settingBtn.node.on(Button.EventType.CLICK, this.displaySettingPanel, this);
        }
        if(this.closesettingBtn){
            this.closesettingBtn.node.on(Button.EventType.CLICK, this.hideSettingPanel, this);
        }
        if(this.audioBtn){
            this.audioBtn.node.on(Button.EventType.CLICK, this.onAudioClick, this);
        }
        this.updateAudioButtonLabel();
    }

    displaySettingPanel() {
        this.settingPanel.active = true;
    }

    hideSettingPanel() {
        this.settingPanel.active = false;
    }

    onAudioClick() {
       SoundManager.instance.toggleAudio();
       this.updateAudioButtonLabel();
    }

    updateAudioButtonLabel() {
        if (this.audioLabel) {
            this.audioLabel.string = SoundManager.instance.isMuted() ? "音效:关" : "音效:开";
        }
    }


    onStartGame() {
        SceneTransition.loadScene("LevelSelect");
        // director.loadScene("gamescene");
    }
}