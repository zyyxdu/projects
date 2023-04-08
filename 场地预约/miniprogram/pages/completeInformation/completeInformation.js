const app = getApp()
const db = wx.cloud.database();
const _ = db.command
Page({
  data: {
    name: '',
    tel: '',
    openid: '',
    teacher:'',
    state:"",
    identity:""
  },
  xuanze(e){
    // console.log(e)
    this.setData({
      identity:e.detail.value
    })
    console.log(this.data.identity)
  },
    








  submit (e) {
    console.log(e.detail.value);
    //表单数据
    var objData = e.detail.value;
    if (objData.name && objData.tel && objData.num && objData.college && objData.tel.length==11) {
      //获取openid
      this.setData({
        openid: wx.getStorageSync('openid')
      })
      console.log(this.data.openid)
      //存储到数据库
      db.collection("user_reserve").where({
        _openid: this.data.openid
      }).update({
        data: {
          name: objData.name,
          tel: objData.tel,
          is_approve:0,
          college:objData.college,
          num:objData.num,
          teacher:objData.teacher,
          state:0,
          identity:this.data.identity
          // is_complete:1
        }
      })



      
      
      //获取审核通知 订阅授权
      wx.requestSubscribeMessage({
        tmplIds: ['LARFLQFNBzlJ8HyZZ4Z96yyhst1JIKoYBfQVglwmHbA',],
                  success (res) {
                    console.log('授权成功')
                                        
                  }
      })




      //审核提醒
      wx.showModal({
        title: '提示',
        content: '注册申请已提交，请耐心等待审核通过',
        success (res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1,
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      
      //跳转
     
    }
    //电话号码不是11位
    else if(objData.teache&&robjData.name && objData.tel && objData.num && objData.college && objData.tel.length!=11) {
      wx.showToast({
        title: '请输入11位电话号',
        duration:2000,
        mask:true,
        icon:'error',    
     })
    }
    //信息没填全
    else{
      wx.showToast({
        title: '请检查输入信息',
        duration:2000,
        mask:true,
        icon:'error',    
     })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
