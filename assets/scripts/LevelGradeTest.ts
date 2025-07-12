import { _decorator, Component, input, Input, KeyCode } from 'cc';
import { PlayerManager, LevelGrade } from './PlayerManager';
import { SelectManager } from './SelectManager';

const { ccclass, property } = _decorator;

/**
 * 关卡评级系统测试脚本
 * 测试键位：
 * - Q: 完成level-1，获得S级评价（25秒，3星）
 * - W: 完成level-1，获得A级评价（40秒，3星）
 * - E: 完成level-1，获得B级评价（50秒，3星）
 * - R: 完成level-1，获得C级评价（50秒，2星）
 * - T: 完成level-1，获得D级评价（70秒，2星）
 * - Y: 完成level-1，获得F级评价（60秒，0星）
 * - U: 完成level-2，获得D级评价（解锁level-3）
 * - I: 显示所有关卡状态
 * - O: 重置玩家数据
 * - P: 解锁所有关卡（测试用）
 */
@ccclass('LevelGradeTest')
export class LevelGradeTest extends Component {
    @property(SelectManager)
    selectManager: SelectManager = null!;

    onLoad() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event: any) {
        const playerManager = PlayerManager.instance;
        if (!playerManager) {
            console.error('PlayerManager 实例不存在');
            return;
        }

        switch (event.keyCode) {
            case KeyCode.KEY_Q:
                this.testLevelCompletion('level-1', 25000, 3); // S级
                break;
            case KeyCode.KEY_W:
                this.testLevelCompletion('level-1', 40000, 3); // A级
                break;
            case KeyCode.KEY_E:
                this.testLevelCompletion('level-1', 50000, 3); // B级
                break;
            case KeyCode.KEY_R:
                this.testLevelCompletion('level-1', 50000, 2); // C级
                break;
            case KeyCode.KEY_T:
                this.testLevelCompletion('level-1', 70000, 2); // D级
                break;
            case KeyCode.KEY_Y:
                this.testLevelCompletion('level-1', 60000, 0); // F级
                break;
            case KeyCode.KEY_U:
                this.testLevelCompletion('level-2', 65000, 2); // D级，应该解锁level-3
                break;
            case KeyCode.KEY_I:
                this.showAllLevelStatus();
                break;
            case KeyCode.KEY_O:
                this.resetPlayerData();
                break;
            case KeyCode.KEY_P:
                this.unlockAllLevels();
                break;
        }
    }

    /**
     * 测试关卡完成
     */
    testLevelCompletion(levelId: string, time: number, stars: number) {
        const playerManager = PlayerManager.instance;
        
        console.log(`\n=== 测试关卡完成 ===`);
        console.log(`关卡: ${levelId}`);
        console.log(`时间: ${time}ms (${time/1000}秒)`);
        console.log(`星星: ${stars}`);
        
        // 确保关卡已解锁
        if (!playerManager.isLevelUnlocked(levelId)) {
            playerManager.unlockLevel(levelId);
            console.log(`自动解锁关卡: ${levelId}`);
        }
        
        // 更新关卡进度
        playerManager.updateLevelProgress(levelId, time, stars);
        
        // 获取评级结果
        const progress = playerManager.getLevelProgress(levelId);
        if (progress) {
            console.log(`评级: ${progress.grade}`);
            console.log(`最佳时间: ${progress.bestTime}ms`);
            console.log(`尝试次数: ${progress.attempts}`);
        }
        
        // 检查是否解锁了新关卡
        const unlockedLevels = playerManager.playerData.unlockedLevels;
        console.log(`当前解锁关卡: ${unlockedLevels.join(', ')}`);
        
        // 更新UI
        if (this.selectManager) {
            this.selectManager.updateLevelToggles();
        }
        
        // 保存数据
        playerManager.savePlayerData();
    }

    /**
     * 显示所有关卡状态
     */
    showAllLevelStatus() {
        const playerManager = PlayerManager.instance;
        
        console.log(`\n=== 所有关卡状态 ===`);
        console.log(`解锁关卡: ${playerManager.playerData.unlockedLevels.join(', ')}`);
        
        // 显示每个关卡的详细信息
        for (let i = 1; i <= 5; i++) {
            const levelId = `level-${i}`;
            const isUnlocked = playerManager.isLevelUnlocked(levelId);
            const progress = playerManager.getLevelProgress(levelId);
            
            console.log(`\n${levelId}:`);
            console.log(`  解锁: ${isUnlocked}`);
            
            if (progress && progress.completed) {
                console.log(`  已完成: 是`);
                console.log(`  评级: ${progress.grade}`);
                console.log(`  星星: ${progress.stars}`);
                console.log(`  最佳时间: ${progress.bestTime}ms (${progress.bestTime/1000}秒)`);
                console.log(`  尝试次数: ${progress.attempts}`);
            } else {
                console.log(`  已完成: 否`);
            }
        }
    }

    /**
     * 重置玩家数据
     */
    resetPlayerData() {
        const playerManager = PlayerManager.instance;
        playerManager.resetPlayerData();
        
        console.log('\n=== 玩家数据已重置 ===');
        
        // 更新UI
        if (this.selectManager) {
            this.selectManager.updateLevelToggles();
        }
    }

    /**
     * 解锁所有关卡（测试用）
     */
    unlockAllLevels() {
        const playerManager = PlayerManager.instance;
        
        console.log('\n=== 解锁所有关卡 ===');
        
        for (let i = 1; i <= 5; i++) {
            const levelId = `level-${i}`;
            if (!playerManager.isLevelUnlocked(levelId)) {
                playerManager.unlockLevel(levelId);
                console.log(`解锁关卡: ${levelId}`);
            }
        }
        
        // 更新UI
        if (this.selectManager) {
            this.selectManager.updateLevelToggles();
        }
        
        // 保存数据
        playerManager.savePlayerData();
    }

    /**
     * 获取评级说明
     */
    getGradeDescription(grade: LevelGrade): string {
        switch (grade) {
            case LevelGrade.S: return 'S级 - 完美表现！';
            case LevelGrade.A: return 'A级 - 优秀表现！';
            case LevelGrade.B: return 'B级 - 良好表现！';
            case LevelGrade.C: return 'C级 - 一般表现';
            case LevelGrade.D: return 'D级 - 勉强通过';
            case LevelGrade.F: return 'F级 - 需要重试';
            default: return '未知评级';
        }
    }
}
