import { _decorator, Component, Label } from 'cc';
import { PlayerManager, PlayerData } from './PlayerManager';
const { ccclass, property } = _decorator;

@ccclass('PlayerInfoUI')
export class PlayerInfoUI extends Component {
    @property(Label)
    levelLabel: Label = null!; // 拖拽等级Label

    @property(Label)
    moneyLabel: Label = null!; // 拖拽金钱Label

    private _playerManager: PlayerManager = null!;

    onLoad() {
        this._playerManager = PlayerManager.instance;
        // 监听数据变化，自动刷新UI
        this._playerManager.addDataChangeListener(this.updateUI.bind(this));
        this.updateUI(this._playerManager.playerData);
    }

    onDestroy() {
        if (this._playerManager) {
            this._playerManager.removeDataChangeListener(this.updateUI.bind(this));
        }
    }

    updateUI(data: PlayerData) {
        if (this.levelLabel) {
            this.levelLabel.string = `level: ${data.level}`;
        }
        if (this.moneyLabel) {
            this.moneyLabel.string = `money: ${data.money}`;
        }
    }
} 