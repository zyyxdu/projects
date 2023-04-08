
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    st:"164522",

    t:{
      continue:60,
      date:"2022-11-19",
      hour:18,
      min:15,
      user_openid:"otpOu5XrEe2vtxFxBD8F73PMDUCQ"
    },
    user_openid:"",
    user_name:"",

      
    

  },
  get_user_openid(){
    //获取user_openid
    wx.cloud.callFunction({
    //name:'getOpenid'
    name:'lll'
     })
     .then(res=>{
      console.log('成功获取user_openid',res.result.openid)
      this.setData({
        user_openid:res.result.openid
      })
      console.log("user_openid:",this.data.user_openid)
      /*
      db.collection('user_reserve').where({
        _openid:this.data.user_openid
      })
      .get()
      .then(res=>{
        console.log("name")
        this.setData({
         user_name:res.data[0].name
       })
       //console.log('user_name:',this.data.user_name)
      })
      .catch(res=>{
        console.log('fail.获取user_name失败',res)
      })*/
   })
   .catch(err=>{
    console.log('获取user_openid失败')
   })
 },

  fangfa(){

    const db = wx.cloud.database();
    const _=db.command;  
   /*
    db.collection('reserved_time1')
    .add({
      data:{
        location_name:"",
        location_id:"",
        location_detail:"",
        reserve:[]
      }
    })
    .then(res=>{
      console.log("add成功")
    })
    .catch(res=>{
      console.log("fail",res)
    })
*/
   
    db.collection('reserved_time1')
    .where({
      //_id:"e09f898e6374ec4a00e20b1d642c3bbd"
      _id:"be09d2a0637612f600e1158269f40df2"
    })
    //.get()
    
    .update({
      data:{
       'reserve':_.push(this.data.t)
      //  reason:"this.data.st"
       //['day_'+(this.data.currentIndex)+'.'+(this.data.current_index)+'.0']:true,
      }
    })
    .then(res=>{
      console.log("找到",res)
    })
    .catch(res=>{
      console.log("no")
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.get_user_openid();
   

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