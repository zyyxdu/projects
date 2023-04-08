// 云函数入口文件
const cloud = require('wx-server-sdk')
  cloud.init({
    env: "iset-4gn377ux3077be62",
  })

// 云函数入口函数
exports.main = async (event, context) => {
  //发送订阅消息的云函数
    try {
      const result = await cloud.openapi.subscribeMessage.send({
          "touser": event.openid,
          "page": 'pages/login/login',
          "lang": 'zh_CN',
          "data": {
            "thing14": {
              "value": event.name
            },
            "thing5": {
              "value": '账号注册申请'
            },
            "phrase1": {
              "value": event.result
              
            },
            "thing3": {
              "value": event.reason
            }
          },
          "templateId": 'LARFLQFNBzlJ8HyZZ4Z96yyhst1JIKoYBfQVglwmHbA'
          
        })
      return result
    } catch (err) {
      return err
    }
  
}