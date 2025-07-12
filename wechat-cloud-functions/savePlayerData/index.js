// 微信云函数：保存玩家数据
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event, context) => {
  const { userId, data } = event;
  
  if (!userId || !data) {
    return {
      success: false,
      error: '缺少必要参数'
    };
  }
  
  try {
    // 检查是否已存在该用户的数据
    const existingData = await db.collection('player_data').where({
      userId: userId
    }).get();
    
    if (existingData.data.length > 0) {
      // 更新现有数据
      await db.collection('player_data').where({
        userId: userId
      }).update({
        data: {
          data: data,
          updateTime: new Date(),
          version: data.version || 1
        }
      });
    } else {
      // 创建新数据
      await db.collection('player_data').add({
        data: {
          userId: userId,
          data: data,
          createTime: new Date(),
          updateTime: new Date(),
          version: data.version || 1
        }
      });
    }
    
    return {
      success: true,
      message: '数据保存成功'
    };
    
  } catch (error) {
    console.error('保存玩家数据失败:', error);
    return {
      success: false,
      error: error.message
    };
  }
}; 