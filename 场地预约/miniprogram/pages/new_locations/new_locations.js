const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infor:[],
    loction_num:""//第几个场地

  },

  jump: function(e){
    var loc_id=e.currentTarget.dataset.id;
    var loc_name=e.currentTarget.dataset.name;
    console.log("e",e);
    console.log(loc_id);
    console.log(loc_name);
    wx.navigateTo({
    // url: '/pages/locreserve_test3/locreserve_test3?loc_id=' + loc_id,
    url: '/pages/new_show/new_show?loc_id=' + loc_id+'&loc_name=' + loc_name,
    })
 },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
  
      db.collection("locations").get({
      success:res=>{
        console.log("locations成功",res)
        that.setData({
          infor:res.data
        })
      },fail:res=>{
        console.log("locations失败")
      }
    })


/*
    let that = this
    db.collection('locations').get()
      .then(res=>{
        console.log('获取location数据成功',res.data)
        
        that.setData({
          infor:res.data
        })
      })
      .catch(err=>{
        console.log('获取location数据失败',err)
      })
  */  
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