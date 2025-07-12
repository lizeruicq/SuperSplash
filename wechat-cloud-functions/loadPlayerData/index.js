// 微信云函数：加载玩家数据
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event, context) => {
  const { userId } = event;
  
  if (!userId) {
    return {
      success: false,
      error: '缺少用户ID'
    };
  }
  
  try {
    // 查询用户数据
    const result = await db.collection('player_data').where({
      userId: userId
    }).get();
    
    if (result.data.length > 0) {
      const playerData = result.data[0];
      return {
        success: true,
        data: playerData.data,
        createTime: playerData.createTime,
        updateTime: playerData.updateTime,
        version: playerData.version
      };
    } else {
      return {
        success: false,
        error: '未找到用户数据'
      };
    }
    
  } catch (error) {
    console.error('加载玩家数据失败:', error);
    return {
      success: false,
      error: error.message
    };
  }
}; 