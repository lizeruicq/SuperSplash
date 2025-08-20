import { _decorator, Component, Button, Node, Label } from 'cc';
import { SceneTransition } from './SceneTransition';
import { SoundManager } from './SoundManager';
import { PlayerManager } from './PlayerManager';
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


    @property(Button)
    helpButton: Button = null!; 

    @property(Button)
    closehelpBtn: Button = null!; 

    @property(Node)
    helpPanel: Node = null!; // 拖拽你的设置面板节点到这里

    @property(Button)
    resetProgressBtn: Button = null!; // 重置进度按钮

    @property(Node)
    resetProgressConfirmPanel: Node = null!; // 重置进度确认面板

    @property(Button)
    confirmResetBtn: Button = null!; // 确认重置按钮

    @property(Button)
    closeResetPanelBtn: Button = null!; // 关闭重置面板按钮



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

        if(this.helpButton){
            this.helpButton.node.on(Button.EventType.CLICK, this.displayHelpPanel, this);
        }
        if(this.closehelpBtn){
            this.closehelpBtn.node.on(Button.EventType.CLICK, this.hideHelpPanel, this);
        }

        if(this.audioBtn){
            this.audioBtn.node.on(Button.EventType.CLICK, this.onAudioClick, this);
        }
        
        // 添加重置进度按钮事件监听
        if (this.resetProgressBtn) {
            this.resetProgressBtn.node.on(Button.EventType.CLICK, this.onResetProgress, this);
        }

        // 添加重置确认面板按钮事件监听
        if (this.confirmResetBtn) {
            this.confirmResetBtn.node.on(Button.EventType.CLICK, this.onConfirmReset, this);
        }

        if (this.closeResetPanelBtn) {
            this.closeResetPanelBtn.node.on(Button.EventType.CLICK, this.closeResetPanel, this);
        }
        
        this.updateAudioButtonLabel();
    }

    displaySettingPanel() {
        this.settingPanel.active = true;
    }

    hideSettingPanel() {
        this.settingPanel.active = false;
    }

    displayHelpPanel() {
        this.helpPanel.active = true;
    }

    hideHelpPanel() {
        this.helpPanel.active = false;
    }


    onAudioClick() {
       SoundManager.instance.toggleAudio();
       this.updateAudioButtonLabel();
    }

    updateAudioButtonLabel() {
        if (this.audioLabel) {
            this.audioLabel.string = SoundManager.instance.isMuted() ? "音效:关 \n sound:off" : "音效:开\n sound:on";
        }
    }


    onStartGame() {
        SoundManager.instance.playSoundEffect('buttonClick');
        SceneTransition.loadScene("LevelSelect");
        // director.loadScene("gamescene");
    }

    /**
     * 重置玩家进度
     * 将玩家的金钱、车辆解锁状态、关卡解锁状态等重置为初始状态
     */
    onResetProgress() {
        // 播放按钮点击音效
        SoundManager.instance.playSoundEffect('buttonClick');
        
        // 显示确认面板
        this.showResetConfirmPanel();
    }

    /**
     * 显示重置确认面板
     */
    showResetConfirmPanel() {
        if (this.resetProgressConfirmPanel) {
            this.resetProgressConfirmPanel.active = true;
        }
    }

    /**
     * 关闭重置确认面板
     */
    closeResetPanel() {
        if (this.resetProgressConfirmPanel) {
            this.resetProgressConfirmPanel.active = false;
        }
    }

    /**
     * 确认重置玩家进度
     */
    onConfirmReset() {
        // 播放按钮点击音效
        SoundManager.instance.playSoundEffect('buttonClick');
        
        // 关闭确认面板
        this.closeResetPanel();
        
        // 执行重置操作
        if (PlayerManager.instance) {
            PlayerManager.instance.resetPlayerData();
            console.log("玩家进度已重置");
            
            // 如果有UI提示组件，可以在这里显示重置成功的提示
            // 例如：this.showToast("玩家进度已重置");
        }
    }
}