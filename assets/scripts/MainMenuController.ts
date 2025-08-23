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
        // 延迟初始化，等待SoundManager和PlayerManager准备就绪
        this.scheduleOnce(() => {
            this.initializeUI();
        }, 0.2);
    }

    private initializeUI() {
        try {
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

            // this.updateAudioButtonLabel();
            console.log('MainMenuController UI initialized successfully');
        } catch (error) {
            console.error('Error initializing MainMenuController UI:', error);
        }
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
        try {
            if (SoundManager.instance) {
                SoundManager.instance.toggleAudio();
                this.updateAudioButtonLabel();
            } else {
                console.warn('SoundManager instance not available');
            }
        } catch (error) {
            console.error('Error toggling audio:', error);
        }
    }

    updateAudioButtonLabel() {
        try {
            if (this.audioLabel && SoundManager.instance) {
                this.audioLabel.string = SoundManager.instance.isMuted() ? "音效:关 \n sound:off" : "音效:开\n sound:on";
            }
        } catch (error) {
            console.error('Error updating audio button label:', error);
        }
    }


    onStartGame() {
        try {
            if (SoundManager.instance) {
                SoundManager.instance.playSoundEffect('buttonClick');
            }
            SceneTransition.loadScene("LevelSelect");
        } catch (error) {
            console.error('Error starting game:', error);
            // 如果出错，直接加载场景
            SceneTransition.loadScene("LevelSelect");
        }
    }

    /**
     * 重置玩家进度
     * 将玩家的金钱、车辆解锁状态、关卡解锁状态等重置为初始状态
     */
    onResetProgress() {
        try {
            // 播放按钮点击音效
            if (SoundManager.instance) {
                SoundManager.instance.playSoundEffect('buttonClick');
            }

            // 显示确认面板
            this.showResetConfirmPanel();
        } catch (error) {
            console.error('Error in reset progress:', error);
        }
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
        try {
            // 播放按钮点击音效
            if (SoundManager.instance) {
                SoundManager.instance.playSoundEffect('buttonClick');
            }

            // 关闭确认面板
            this.closeResetPanel();

            // 执行重置操作
            if (PlayerManager.instance) {
                PlayerManager.instance.resetPlayerData();
                console.log("玩家进度已重置");
            } else {
                console.warn('PlayerManager instance not available');
            }
        } catch (error) {
            console.error('Error confirming reset:', error);
        }
    }
}