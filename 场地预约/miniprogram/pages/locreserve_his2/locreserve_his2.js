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
  //判断是否已经过期了


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
                db.collection("loc_user_reserve").where({
                  user_openid:that.data.user_openid,
                })
                .get()
                .then(res=>{
                  console.log("获取该用户的所有预约信息成功")
                    that.setData({
                      all_reserve:res.data,
                      nums_all:res.data.length,
                      //is_use:[]//重置为0
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
                      var time_period=all[i].time_period;
                      var period = time_period.match(/\d+/g);//获取时间数字字段
                     // console.log(period)
                      var hour=parseInt(period[2]);
                      var minute=parseInt(period[3]);
                      //console.log(hour,minute)
                    //  console.log(reserved_date,time_period)
                      var end = new Date(year,month-1,day,hour,minute,0);
                      //console.log(end)
                      var end2=end.getTime();
                      if(now2>=end2){
                         console.log('该条已经使用了')
                         var t='is_use['+i+']'
                         this.setData({
                           [t]:1
                         })
                      }
                      
                    }
  
                    //看看是否被后来修改成了不可预约 那要设置两重循环对比预约记录是不是有和它重叠的
                    var set=[];
                    db.collection('loc_set_reserve')
                    .get()
                    .then(res=>{
                        set=res.data;
                        console.log('set',set)
                    })
                    .catch(res=>{
                       console.log('获取set集合失败')
                    })
                    //all是逆序的预约历史，set是不可预约数组
                    let isable=this.data.is_able;
                    for(var i=0;i<all.length;i++){
                      for(var j=0;j<set.length;j++){
                        if(all[i].location_id==set[j].location_id&&all[i].reserved_date==set[j].set_date&&all[i].time_index==set[j].time_index){
                          console.log('预约信息中找到了被设置成不可预约的了')
                          isable[i]=0;//
                        }
                      }
                    }
                    this.setData({
                      is_able:isable
                    })
                   
                
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    
    console.log("这就是QRRRRRRR",this.data.qrid)
    var DATE = util.formatTime(new Date());


    let that = this

/*
    db.collection("loc_user_reserve").where({
      user_openid:that.data._openid,
      //is_approve:0
    }).get({
      success:res=>{
        console.log("_openid:",res.data._openid)
        that.setData({
          all_reserve:res.data,
          nums_all:res.data.length,
        })
        console.log('all_reserve',this.data.all_reserve)
      },fail:res=>{
        console.log("获取用户审批中失败")
      }
    })

    /*
    db.collection("loc_user_reserve").where({
      user_openid:that.data._openid,
     is_approve:0
    }).get({
      success:res=>{
        console.log("user_openid",res.data._openid)
        that.setData({
          user_reserve_approving:res.data,
          nums_approving:res.data.length,
        })
      },fail:res=>{
        console.log("获取用户审批中失败")
      }
    })

    db.collection("loc_user_reserve").where({
      user_openid:that.data._openid,
     is_approve:1
    }).get({
      success:res=>{
        //console.log("这就是fileID",res.data[0].qr)
        that.setData({
          user_reserve_approved:res.data,
          nums_approved:res.data.length,
         // fileID:res.data[0].qr,
        })
      },fail:res=>{
        console.log("获取用户申请过失败")
      }
    })*/

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
/*
    console.log("刚进入showwwww这就是QRRRRRRR",this.data.qrid)
    var DATE = util.formatTime(new Date());


    let that = this
    
    let oP = new Promise( (res, rej) => {


      db.collection("loc_user_reserve").where({
        user_openid:that.data._openid,
        //is_approve:0
      }).get({
        success:res=>{
          console.log("_openid:",res.data._openid)
          that.setData({
            all_reserve:res.data,
            nums_all:res.data.length,
          })
          console.log('all_reserve',this.data.all_reserve)
        },fail:res=>{
          console.log("获取用户审批中失败")
        }
      })
    
     
  


    });
    
    */
    

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
    var date_apply=reserve.date_apply;
    var time_apply=reserve.time_apply;
    var reserved_date=reserve.reserved_date;
    var meeting_name=reserve.meeting_name;
    var reason=reserve.reason;
    var time_period=reserve.time_period;
    var is_able=this.data.is_able[index];
    var is_use=this.data.is_use[index];
    var longitude = 114.0322103;
    var latitude = 22.5353646;
    console.log("reserve",reserve)
    return {
      title: '某条预约记录',
     // path: '/pages/loc_share/loc_share?sharetype=1&longitude=' + longitude + '&latitude=' + latitude
      path: '/pages/loc_share/loc_share?sharetype=1&reason=' + reason + '&is_able=' + is_able+ '&is_use=' + is_use+ '&location_name=' + location_name+ '&date_apply=' + date_apply+ '&time_apply=' + time_apply+ '&reserved_date=' + reserved_date+ '&meeting_name=' + meeting_name+'&time_period=' + time_period
  }
},

  cancel_reserve(e){
    console.log("序号",e.currentTarget.dataset.index)
    var num=e.currentTarget.dataset.index;
    //var id=this.data.all_reserve[num]._id;
    var id=this.data.all_reserve2[num]._id;
    db.collection('loc_user_reserve').doc(id)
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
      /*
      db.collection("loc_user_reserve").where({
        user_openid:that.data._openid,
      })
      .get()
      .then(res=>{
        //又来更新了
        this.setData({
          all_reserve:res.data,
          nums_all:res.data.length,
        })
        console('更新成功了')
      })
      .catch(res=>{
        console('更新失败了')
      })*/

       
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
