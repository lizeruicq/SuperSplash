import { _decorator, Component, director, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MainMenuController')
export class MainMenuController extends Component {
    @property(Button)
    startGameBtn: Button = null!; // 拖拽你的"开始游戏"按钮到这里

    start() {
        if (this.startGameBtn) {
            this.startGameBtn.node.on(Button.EventType.CLICK, this.onStartGame, this);
        }
    }

    onStartGame() {
        director.loadScene("LevelSelect");
        // director.loadScene("gamescene");
    }
} 