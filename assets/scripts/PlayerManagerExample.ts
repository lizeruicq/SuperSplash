import { _decorator, Component, Node, Label, Button } from 'cc';
import { PlayerManager, PlayerData } from './PlayerManager';

const { ccclass, property } = _decorator;

@ccclass('PlayerManagerExample')
export class PlayerManagerExample extends Component {
    @property(Label)
    levelLabel: Label = null!;
    
    @property(Label)
    moneyLabel: Label = null!;
    
    @property(Label)
    experienceLabel: Label = null!;
    
    @property(Button)
    addMoneyBtn: Button = null!;
    
    @property(Button)
    addExpBtn: Button = null!;
    
    @property(Button)
    unlockCarBtn: Button = null!;
    
    @property(Button)
    unlockLevelBtn: Button = null!;
    
    @property(Button)
    wechatLoginBtn: Button = null!;
    
    private _playerManager: PlayerManager = null!;
    
    onLoad() {
        // 获取PlayerManager实例
        this._playerManager = PlayerManager.instance;
        
        // 添加数据变化监听
        this._playerManager.addDataChangeListener(this.onPlayerDataChanged.bind(this));
        
        // 更新UI
        this.updateUI();
    }
    
    start() {
        // 绑定按钮事件
        this.bindButtonEvents();
        
        // 检查微信环境并显示登录按钮
        if (this._playerManager.isWeChatMiniGame) {
            this.wechatLoginBtn.node.active = true;
        } else {
            this.wechatLoginBtn.node.active = false;
        }
    }
    
    onDestroy() {
        // 移除数据变化监听
        if (this._playerManager) {
            this._playerManager.removeDataChangeListener(this.onPlayerDataChanged.bind(this));
        }
    }
    
    /**
     * 绑定按钮事件
     */
    private bindButtonEvents() {
        if (this.addMoneyBtn) {
            this.addMoneyBtn.node.on(Button.EventType.CLICK, this.onAddMoneyClick, this);
        }
        
        if (this.addExpBtn) {
            this.addExpBtn.node.on(Button.EventType.CLICK, this.onAddExpClick, this);
        }
        
        if (this.unlockCarBtn) {
            this.unlockCarBtn.node.on(Button.EventType.CLICK, this.onUnlockCarClick, this);
        }
        
        if (this.unlockLevelBtn) {
            this.unlockLevelBtn.node.on(Button.EventType.CLICK, this.onUnlockLevelClick, this);
        }
        
        if (this.wechatLoginBtn) {
            this.wechatLoginBtn.node.on(Button.EventType.CLICK, this.onWechatLoginClick, this);
        }
    }
    
    /**
     * 玩家数据变化回调
     */
    private onPlayerDataChanged(data: PlayerData) {
        this.updateUI();
        console.log('玩家数据已更新:', data);
    }
    
    /**
     * 更新UI显示
     */
    private updateUI() {
        if (!this._playerManager) return;
        
        const data = this._playerManager.playerData;
        
        if (this.levelLabel) {
            this.levelLabel.string = `等级: ${data.level}`;
        }
        
        if (this.moneyLabel) {
            this.moneyLabel.string = `金钱: ${data.money}`;
        }
        
        if (this.experienceLabel) {
            this.experienceLabel.string = `经验: ${data.experience}/${data.level * 100}`;
        }
    }
    
    /**
     * 增加金钱按钮点击
     */
    private onAddMoneyClick() {
        this._playerManager.addMoney(100);
        console.log('增加了100金钱');
    }
    
    /**
     * 增加经验按钮点击
     */
    private onAddExpClick() {
        this._playerManager.addExperience(50);
        console.log('增加了50经验');
    }
    
    /**
     * 解锁车辆按钮点击
     */
    private onUnlockCarClick() {
        const carId = 'car_002';
        if (this._playerManager.unlockCar(carId)) {
            console.log(`解锁了车辆: ${carId}`);
        } else {
            console.log(`车辆 ${carId} 已经解锁`);
        }
    }
    
    /**
     * 解锁关卡按钮点击
     */
    private onUnlockLevelClick() {
        const levelId = 'level_002';
        if (this._playerManager.unlockLevel(levelId)) {
            console.log(`解锁了关卡: ${levelId}`);
        } else {
            console.log(`关卡 ${levelId} 已经解锁`);
        }
    }
    
    /**
     * 微信登录按钮点击
     */
    private async onWechatLoginClick() {
        if (await this._playerManager.wechatLogin()) {
            console.log('微信登录成功');
        } else {
            console.log('微信登录失败');
        }
    }
    
    /**
     * 模拟比赛完成
     */
    public simulateRaceComplete() {
        // 模拟比赛完成后的数据更新
        const levelId = 'level_001';
        const raceTime = 45000; // 45秒
        const stars = 2;
        
        // 更新关卡进度
        this._playerManager.updateLevelProgress(levelId, raceTime, stars);
        
        // 增加金钱和经验
        this._playerManager.addMoney(200);
        this._playerManager.addExperience(100);
        
        // 更新统计数据
        this._playerManager.updateStatistics({
            totalRaces: this._playerManager.playerData.statistics.totalRaces + 1,
            totalWins: this._playerManager.playerData.statistics.totalWins + 1,
            totalDistance: this._playerManager.playerData.statistics.totalDistance + 5000
        });
        
        console.log('比赛完成，数据已更新');
    }
    
    /**
     * 模拟车辆升级
     */
    public simulateCarUpgrade() {
        const carId = this._playerManager.playerData.currentCar;
        const upgradeCost = 500;
        
        if (this._playerManager.spendMoney(upgradeCost)) {
            // 随机升级一个部件
            const parts: Array<keyof import('./PlayerManager').CarUpgrade> = ['engine', 'tires', 'suspension', 'nitro'];
            const randomPart = parts[Math.floor(Math.random() * parts.length)];
            
            if (this._playerManager.upgradeCarPart(carId, randomPart)) {
                console.log(`车辆 ${carId} 的 ${randomPart} 升级成功`);
            } else {
                console.log(`车辆 ${carId} 的 ${randomPart} 已达到最高等级`);
            }
        } else {
            console.log('金钱不足，无法升级');
        }
    }
    
    /**
     * 导出玩家数据（用于调试）
     */
    public exportPlayerData() {
        const jsonData = this._playerManager.exportPlayerData();
        console.log('玩家数据导出:', jsonData);
        
        // 在实际项目中，可以将数据复制到剪贴板或保存到文件
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(jsonData).then(() => {
                console.log('玩家数据已复制到剪贴板');
            });
        }
    }
    
    /**
     * 重置玩家数据（用于调试）
     */
    public resetPlayerData() {
        if (confirm('确定要重置所有玩家数据吗？此操作不可恢复！')) {
            this._playerManager.resetPlayerData();
            console.log('玩家数据已重置');
        }
    }
} 