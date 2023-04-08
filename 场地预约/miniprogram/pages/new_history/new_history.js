// pages/order1/order1.js
const app = getApp()
const util = require('../../utils/utils.js')
const db = wx.cloud.database()
const _ = db.command
import rpx2px from '../../utils/rpx2px.js'
// 300rpx 在6s上为 150px
const qrcodeWidth = rpx2px(300)

Page({

  /**
   * 页面的初始数据
   */
  data: {

    list: [{
      title: "场地预定历史列表",
      up_name: "haihong",
      // upimg是用户头像
      up_img: "https://wx1.sinaimg.cn/mw1024/006cV2kkly1g45b8b243bj30sa0nqwha.jpg",
      // 现在时间
      time: "2022/06/19 ",
      down_num: "2",
      bg_color:"118deg, #fdcb6e 7%, #FF6B95 67%, #45D4FB 30%",
    }],

    _openid:"",  //使用者的openid
    //二维码fileid
    fileID:"",
    // 未审批的申请列表
    user_reserve_approving:[],
    // 已审批的接受列表
    // 考虑到已审批的列表中有同意和拒绝的
    user_reserve_approved:[],
    // 接受是要看未审批还是已审批
    state_approving:'未审批',
    nums_approving:0,//未审批的数量
    nums_approved:0,//已审批的数量
    // openid+id
    qrid:"",
    hiddenmodalput:true,

   //所有的预约
    all_reserve:[],
    nums_all:0,
    all_reserve2:[],//逆序一下
    is_use:[],
    is_able:[],
    user_openid:"",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
            let that=this;
            this.setData({
                  userinfo: app.userinfo
            })
            console.log("颜色",that.data.list[0])

            wx.getStorage({
              key: 'openid',
              success(res) {
                  that.setData({
                      _openid:res.data,
                  },()=>{
                        that.getUserInformation();
                  })
                  console.log(that.data._openid)
                 }
            })
            
            wx.cloud.callFunction({
              //name:'getOpenid'
              //name:'callback'
              name:'lll'
               })
               .then(res=>{
                console.log('成功获取user_openid',res)
                that.setData({
                  user_openid:res.result.openid
                })
                console.log("user_openid:",this.data.user_openid)
                that.setData({
                  _openid:that.data.user_openid,
              },()=>{
                console.log("这就是_openid",that.data._openid)
                var DATE = util.formatTime(new Date());
                //获取预约记录
                db.collection("history").where({
                  user_openid:that.data.user_openid,
                })
                .get()
                .then(res=>{
                  console.log("获取该用户的所有预约信息成功")
                    that.setData({
                      all_reserve:res.data,
                      nums_all:res.data.length,
                      is_use:[]//重置为0
                    })
                    // 弄一个逆序的
                    let tmp=this.data.all_reserve.reverse();
                    that.setData({
                      all_reserve2:tmp
                    })
                    console.log('all_reserve2',this.data.all_reserve2)
                    //是否使用都重置为0
                    var a=new Array(this.data.all_reserve2.length).fill(0)
                    var b=new Array(this.data.all_reserve2.length).fill(1)
                   // console.log("b",b)
                    that.setData({
                      is_use:a,
                      is_able:b
                    })
                
                    //得弄一个判断是否已经使用的
        
                    let all=this.data.all_reserve2;
                    console.log('all')

                    for(var i=0;i<all.length;i++){
                      var now=new Date();
                      var now2=now.getTime();
  
                      var reserved_date=all[i].reserved_date;
                      var date = reserved_date.match(/\d+/g);//获取日期数字字段
                     //console.log(date)
                      var year=parseInt(date[0]);
                      var month=parseInt(date[1]);
                      var day=parseInt(date[2]);
                      //console.log(year,month,day)
                      //var time_period=all[i].time_period;
                      //var period = time_period.match(/\d+/g);//获取时间数字字段
                     // console.log(period)
                      
                     
                     //var hour=parseInt(period[2]);
                      //var minute=parseInt(period[3]);
                      //console.log(hour,minute)
                      var hour1=all[i].hour1;
                      var min1=all[i].min1;


                    //  console.log(reserved_date,time_period)
                      var end = new Date(year,month-1,day,hour1,min1,0);
                      //console.log(end)
                      var end2=end.getTime();//获取结束时间

                      //console.log("now2",now2)
                      //console.log("end2",end2)
                      if(now2>=end2){
                         console.log('该条已经使用了')
                         var t='is_use['+i+']'
                         this.setData({
                           [t]:1
                         })
                      }
                      
                    }
                
                
                })
                .catch(res=>{
                  console.log("获取用户审批中失败")
  
                })
              
  
              }
              )


             })
             .catch(err=>{
              console.log('获取user_openid失败')
             })
          
    
  },

  get_now(){
    db.collection("history").where({
      user_openid:that.data.user_openid,
    })
    .get()
    .then(res=>{
      console.log("获取该用户的所有预约信息成功")
        that.setData({
          all_reserve:res.data,
          nums_all:res.data.length,
          is_use:[]//重置为0
        })
        // 弄一个逆序的
        let tmp=this.data.all_reserve.reverse();
        that.setData({
          all_reserve2:tmp
        })
        console.log('all_reserve2',this.data.all_reserve2)
        //是否使用都重置为0
        var a=new Array(this.data.all_reserve2.length).fill(0)
        var b=new Array(this.data.all_reserve2.length).fill(1)
       // console.log("b",b)
        that.setData({
          is_use:a,
          is_able:b
        })
    
        //得弄一个判断是否已经使用的

        let all=this.data.all_reserve2;
        console.log('all')

        for(var i=0;i<all.length;i++){
          var now=new Date();
          var now2=now.getTime();

          var reserved_date=all[i].reserved_date;
          var date = reserved_date.match(/\d+/g);//获取日期数字字段
         //console.log(date)
          var year=parseInt(date[0]);
          var month=parseInt(date[1]);
          var day=parseInt(date[2]);
          //console.log(year,month,day)
          //var time_period=all[i].time_period;
          //var period = time_period.match(/\d+/g);//获取时间数字字段
         // console.log(period)
          
         
         //var hour=parseInt(period[2]);
          //var minute=parseInt(period[3]);
          //console.log(hour,minute)
          var hour1=all[i].hour1;
          var min1=all[i].min1;


        //  console.log(reserved_date,time_period)
          var end = new Date(year,month-1,day,hour1,min1,0);
          //console.log(end)
          var end2=end.getTime();//获取结束时间

          //console.log("now2",now2)
          //console.log("end2",end2)
          if(now2>=end2){
             console.log('该条已经使用了')
             var t='is_use['+i+']'
             this.setData({
               [t]:1
             })
          }
          
        }
    
    
    })
    .catch(res=>{
      console.log("获取用户审批中失败")

    })




      

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {



  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(e) {
    console.log('e',e)
    var index= e.target.dataset.index;
    var reserve=this.data.all_reserve2[index];

    var location_name=reserve.location_name;
    var reserved_date=reserve.reserved_date;
    var hour=reserve.hour;
    var min=reserve.min;
    var hour1=reserve.hour1;
    var min1=reserve.min1;
    var reason=reserve.reason;
    console.log(reserved_date,location_name,hour,min,hour1,min1,reason)

    var is_use=this.data.is_use[index];
    var date_apply=reserve.date_apply;
    var time_apply=reserve.time_apply;
    var meeting_name=reserve.meeting_name;
    var reason=reserve.reason;
    var time_period=reserve.time_period;
    var is_able=this.data.is_able[index];
    
    var longitude = 114.0322103;
    var latitude = 22.5353646;
    console.log("reserve",reserve)
    return {
      title: '某条预约记录',
     // path: '/pages/loc_share/loc_share?sharetype=1&longitude=' + longitude + '&latitude=' + latitude
     /* path: '/pages/loc_share/loc_share?sharetype=1&reason=' + reason + '&is_able=' + is_able+ '&is_use=' + is_use+ '&location_name=' + location_name+ '&date_apply=' + date_apply+ '&time_apply=' + time_apply+ '&reserved_date=' + reserved_date+ '&meeting_name=' + meeting_name+'&time_period=' + time_period*/
      path: '/pages/new_share/new_share?sharetype=1&reserved_date=' + reserved_date+ '&is_able=' + is_able+ '&is_use=' + is_use+ '&location_name=' + location_name+ '&hour=' + hour+ '&min=' + min+ '&hour1=' + hour1+ '&min1=' + min1+ '&reason=' + reason  
  }
  

},

  cancel_reserve(e){
    console.log("序号",e.currentTarget.dataset.index)
    var num=e.currentTarget.dataset.index;
    var id=this.data.all_reserve2[num]._id;
    var loc_id=this.data.all_reserve2[num].location_id;
    
    var reserved_date=this.data.all_reserve2[num].reserved_date;
    var hour=this.data.all_reserve2[num].hour;
    var min=this.data.all_reserve2[num].min;
    var contin=this.data.all_reserve2[num].contin;

    //没办法了，我只能直接获取reserved_time1的reserve，然后修改，再导入
    var reserve=[];
    var reserve1=[]
    var j=0;
    const _ = db.command
    /*
    db.collection('reserved_time1')
    .where({
      location_id:loc_id
    })
    .get()
    .then(res=>{
      console.log("获取reserve成功了",res.data[0].reserve)
      reserve=res.data[0].reserve;
      for(var i=0;i<reserve.length;i++){
        if(reserve[i].date==reserved_date&&reserve[i].hour==hour&&reserve[i].min==min&&reserve[i].contin==contin){
            continue;
        }
        else{
          reserve1[j]=reserve[i]
          j++;
        }
      }
      console.log('reserve1',reserve1)

      db.collection('reserved_time1')
      .where({
        location_id:loc_id
      })
      .update({
        data:{
          reserve: reserve1
        }
      })
      .then(res=>{
        console.log("更新完毕了",res)
      })
      .catch(res=>{
        console.log("330,fail",res);
      })  

    })
    .catch(res=>{
      console.log("fail获得reserve")
    })*/
    
   
    //寄了但不知道为什么，明明按照文档来的，errMsg: "document.update:ok" stats: {updated: 0}
    //现在成功了
    db.collection('reserved_time1')
    .where({
        location_id:loc_id
      })
    .update({
      data:{
        reserve: _.pull({
          user_openid:this.data.user_openid,
          date:reserved_date,
          hour:hour,
          min:min,
          contin:contin
        })
      }
    })
    .then(res=>{
      console.log("在该死的数组里面找到了,并且更新完毕了",res)
    })
    .catch(res=>{
      console.log("316,fail");
    })
    
    
    db.collection('history').doc(id)
    .remove()
    .then(res=>{
      console.log('取消预约成功了')
      

      wx.showToast({
        title: '点取消预约成功',//提示文字
        duration:1100,//显示时长
        mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
        //icon:'success', //图标，支持"success"、"loading"  
        success:function(){ 
          
        },//接口调用成功
        fail: function () { console.log("369行有问题")},  //接口调用失败的回调函数  
        complete: function () { } //接口调用结束的回调函数  
      })
      this.onLoad();
    })
    .catch(res=>{
      console.log('取消预约失败了')
    })
  

  },



  xuanze1:function(e){
    console.log("xuanze1")
    let that = this
      console.log(e.currentTarget.dataset.state)
      // 接收 看 未审批
      that.setData({
        state_approving:e.currentTarget.dataset.state
    })
    },

  xuanze2:function(e){
    console.log("xuanze2")
    let that = this
    console.log(e.currentTarget.dataset.state)
    // 接收 看 已审批
    that.setData({
      state_approving:e.currentTarget.dataset.state
  })
  },
  qrcode:function(e){
    let that = this
    console.log(e.target.dataset.id)
    that.setData({
      hiddenmodalput: !that.data.hiddenmodalput,
      nowAdd:e.currentTarget.dataset.id
    })
  },
  // 取消拒绝
  cancel: function(){
    let that = this
    wx.showToast({
      title: '取消成功',//提示文字
      duration:1100,//显示时长
      mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
      icon:'success', //图标，支持"success"、"loading"  
      success:function(){ 
        that.setData({
  
          hiddenmodalput: true
       
         });
      },//接口调用成功
      fail: function () { console.log("369行有问题")},  //接口调用失败的回调函数  
      complete: function () { } //接口调用结束的回调函数  
   })
   
  
   },


  confirm:function(e) {
    var DATE = util.formatTime(new Date());
    let that = this

    that.setData({
      hiddenmodalput: true
    },()=>{
      console.log("这就是reject！！",that.data.reject)
      wx.showToast({
        title: '查看成功',//提示文字
        duration:1100,//显示时长
        mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
        icon:'success', //图标，支持"success"、"loading"  
        success:function(){ 
          db.collection("user_reserve").doc(that.data.nowAdd)
          .update({
            data:{
              is_approve: 1,
              time_receive: DATE,
              reject:that.data.reject,
              status:2
            },success:function(res){
      
              that.onLoad()
            },fail:res=>{
              console.log("当前点击拒绝申请失败咯")
            }
          })                
        },//接口调用成功
        fail: function () { console.log("369行有问题")},  //接口调用失败的回调函数  
        complete: function () { } //接口调用结束的回调函数  
     })


      
    }
    )
  },

  savesignupimg(){
    wx.authorize({
      scope:'scope.writePhotosAlbum',
      success:res0=>{wx.cloud.downloadFile({
        fileID:this.data.fileID,
        success:res=>{
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success:(res)=>{
              wx.showToast({
                title: '保存成功',
              })
            }
          })
        },
        fail:(err)=>{
          console.log(err),
          wx.showToast({
            title: '授权失败',
          })
        }
      })

      }
    })
  },

  getUserInformation: function (){
    let that = this;
    that.data.openid
    db.collection('user').where({
          _openid: this.data.openid
   }).get({
     success: (res) => {
       this.setData({
          userInformation:res.data[0]
         })
     }
   })

},

})
