// pages/loc_share/loc_share.js
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
   
    is_use:-1,
    is_able:-1,
    location_name:"",
    date_apply:"",
   time_apply:"",
   reserved_date:"",
    meeting_name:"",
    reason:"",
   


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   
    if (options != null && options != undefined && options.sharetype != null && options.sharetype > 0) {
      this.setData({
        is_use:options.is_use,
        is_able:options.is_able,
        location_name:options.location_name,
       date_apply:options.date_apply,
        time_apply:options.time_apply,
       reserved_date:options.reserved_date,
      meeting_name:options.meeting_name,
       reason:options.reason,
      })
     
      console.log("options",options)
    }
 /*
    if (options != null && options != undefined &&
      options.sharetype != null && options.sharetype > 0) {
      var longitude = options.longitude;
      var latitude = options.latitude;
      console.log("longitude",longitude)
 
      //拿到经纬度，然后就处理自己逻辑，比如显示该位置地图
    }*/

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
  onShareAppMessage() {

  }
})