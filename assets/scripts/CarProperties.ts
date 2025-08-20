import { _decorator } from 'cc';
const { ccclass } = _decorator;

/**
 * 车辆属性接口
 */
export interface CarProperty {
    speed: number;      // 速度 (0-100)
    steering: number;   // 转向 (0-100)
    durability: number; // 坚硬度/耐久度 (0-100)
}

/**
 * 车辆属性配置类
 * 管理所有车辆的属性数据
 */
@ccclass('CarProperties')
export class CarProperties {
    /**
     * 车辆属性配置表
     * 键为车辆ID，值为车辆属性
     */
    private static carPropertiesConfig: { [carId: string]: CarProperty } = {
        'car-1': {
            speed: 25,
            steering: 60,
            durability: 40
        },
        'car-2': {
            speed: 40,
            steering: 40,
            durability: 80
        },
        'car-3': {
            speed: 60,
            steering: 60,
            durability: 60
        },
        'car-4': {
            speed: 70,
            steering: 70,
            durability: 50
        },
        'car-5': {
            speed: 65,
            steering: 80,
            durability: 60
        }
    };

    /**
     * 获取指定车辆的属性
     * @param carId 车辆ID
     * @returns 车辆属性，如果车辆不存在则返回null
     */
    public static getCarProperty(carId: string): CarProperty | null {
        return this.carPropertiesConfig[carId] || null;
    }

}
