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
          "page": 'pages/lll/lll',
          "lang": 'zh_CN',
          "data": {
            "thing2": {//会议名称
             // "value": '会议名称'
             "value":event.meeting_name,
            },
            "date3": {//会议时间
              "value":event.time
              //"value":event.time
            },
            "thing4": {//会议地点
              //"value": '网安大楼'
              "value":event.location,
            },
            "thing5": {//会议介绍
              "value":event.introduction,
            },
            "thing6":{//主持人
              "value":event.people
            }
          },
          "templateId": 'quzX0MVbfPQC-quIUWLAnd2xbSIk0nOAI_IPc4z4r5M',
          
        })
        
      return result
    } catch (err) {
      return err
    }
  
}


/*
    const result = await cloud.openapi.subscribeMessage.send({
        "touser": 'OPENID',
        "page": 'index',
        "lang": 'zh_CN',
        "data": {
          "thing2": {//会议名称
            "value": '会议名称'
          },
          "date3": {//会议时间
            "value": '2015年01月05日'
          },
          "thing4": {//会议地点
            "value": '网安大楼'
          },
          "thing5": {//会议介绍
            "value": '介绍。。。。。'
          },
          "thing6":{//主持人
            "value": '某某某'
          }
        },
        "templateId": 'quzX0MVbfPQC-quIUWLAnd2xbSIk0nOAI_IPc4z4r5M',
        //"miniprogramState": 'developer'
      })
    return result
  } catch (err) {
    return err
  }

}*/