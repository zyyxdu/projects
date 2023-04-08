const app = getApp()
const db=wx.cloud.database();
const _=db.command

Page({
  data: {
    remind: '加载中',
    angle: 0,
    year: 2022,

    avatarUrl: './user-unlogin.png',
    userInfo: {},
    hasUserInfo: false,
    logged: false,
    takeSession: false,
    requestResult: '',
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl'), // 如需尝试获取用户信息可改为false
    openid:'' ,   //用户的openid
    

    //用于修改全局变量
    calendar:[],
  },
  getUserProfile() {
    //用户登录
    wx.setStorage({
      data: 0,
      key: 'character',
    })
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
        console.log(this.data.userInfo)
        //获取openid
        wx.cloud.callFunction({
          name: 'login',
          data: {},
          success: res => {
            console.log('[云函数] [login] user openid: ', res.result.openid)
            app.globalData.openid = res.result.openid
            this.setData({
             openid:res.result.openid
            })
            //异步存储openid
            wx.setStorage({
              key: 'openid',
              data: this.data.openid,
              })
            //判断该openid在不在数据库中
            db.collection('user_reserve').where({
                   _openid: this.data.openid
            })
            
            
            
            
            
            
            .get({
              success: (res) => {
                if (res.data.length == 0){
                  console.log('没有符合的用户')
                  // 存入数据库
                  db.collection('user_reserve').add({
                    data:{
                      openid:this.data.openid,
                      nickName:this.data.userInfo.nickName,
                      gender:this.data.userInfo.gender,
                      language:this.data.userInfo.language,
                      avatarUrl:this.data.userInfo.avatarUrl
                    }
                  }).then(res=>{
                    console.log(res)
                  })
                  //跳转到填T写个人信息的页面（输入：学校，学院，电话，名字）
                  wx.navigateTo({
                    url: '../completeInformation/completeInformation',
                  })
                }else{
                  console.log('查找到对应的用户',res.data)
                  //判断有无完善过个人信息
                  

                  //同意进入
                  if(res.data[0].is_approve==1){
                    console.log('1111')
                    //跳转
                    wx.switchTab({
                     //url: '../locations/locations',
                     url: '../new_locations/new_locations',
                    })
                  }
                  //待审批
                  if(res.data[0].is_approve==0){
                    wx.showModal({
                      title: '提示',
                      content: '注册申请已提交，请耐心等待审核通过',
                      success (res) {
                        if (res.confirm) {
                          console.log('用户点击确认')
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
                    })
                  }
                  //拒绝进入
                  if(res.data[0].is_approve==2){
                    wx.showModal({
                      showCancel:"false",
                      title: '提示',
                      content: '注册申请不成功，请联系****',
                      success (res) {
                        if (res.confirm) {
                          console.log('用户点击确认')
                        } 
                      }
                    })
                  }
                }
              }
            })
          },
          fail: err => {
            console.error('[云函数] [login] 调用失败', err)
          }
        })
      
 
        wx.setStorageSync('userInfo', JSON.stringify(this.data.userInfo));
        wx.setStorageSync('openid', JSON.stringify(this.openid));
        //wx.getStorageSync('userInfo');
        
        
      },
      //用户拒绝授权
      fail: (res) =>{

      }
      
    })
  },
  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
    }
  },
  //校医院登录
  adminLogin:function(){
    //角色：校医院
    wx.setStorage({
      data: 1,
      key: 'character',
    })
    //跳转
    wx.redirectTo({
      url: '../adminLogin/adminLogin',
    })
  },

  //用于修改全局变量
  get_calendar(){
    var that=this;
    function getThisMonthDays(year, month) {
      return new Date(year, month, 0).getDate();
    }
  // 计算每月第一天是星期几
    function getFirstDayOfWeek(year, month) {
      return new Date(Date.UTC(year, month - 1, 1)).getDay();
    }
    const date = new Date();  //Fri Sep 23 2022 21:21:11 GMT+0800 (中国标准时间)
    const cur_year = date.getFullYear();
   // console.log("cur_year=",cur_year) 2022
    const cur_month = date.getMonth() + 1;
    //console.log("cur_month=",cur_month) 9
    const cur_date=date.getDate();
   // console.log("const date=",cur_date)  23

    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    //利用构造函数创建对象
    function calendar(date,week){
      //console.log("week",week)//就是 一，二，三。。。天
      this.date=cur_year+'-'+cur_month+'-'+date;//2022-9-23
      if(date==cur_date){
        this.week = "今天";
      }else if(date==cur_date+1){
        this.week = "明天";
      }else{
        this.week = '星期' + week;
      }
    }
    //当前月份的天数
    var monthLength= getThisMonthDays(cur_year, cur_month)
    //当前月份的第一天是星期几
    var week = getFirstDayOfWeek(cur_year, cur_month)
    var x = week;
    for(var i=1;i<=monthLength;i++){
      //当循环完一周后，初始化再次循环
      if(x>6){
        x=0;
      }
      //利用构造函数创建对象 i是一个月中的第几号，用于构建date, weeks_ch[x]和 [weeks_ch[x]][0]一模一样，我也搞不清楚这样写干嘛
      //console.log("[weeks_ch[x]]",[weeks_ch[x]])
      //that.data.calendar[i] = new calendar(i, [weeks_ch[x]][0]) //原版的
      that.data.calendar[i] = new calendar(i, weeks_ch[x]) 
      x++;
    }
   // console.log(this.data.calendar)//{date: "2022-9-1", week: "星期四"}
    
    //弊端：只能计算当月的，可能还要机选下一个月的，万一12月还要跨年呢 
    //现在给你去除了弊端
    var next_month;
    var next_year;
    if(cur_month==12){
      next_month=1;
      next_year=cur_year+1;
    }else{
       next_month=cur_month+1;
       next_year=cur_year;
    }
   
    function next_calendar(date,week){
      this.date=next_year+'-'+next_month+'-'+date;//2022-9-23
      if(date==cur_date){//这个就算是下个月没问题
        this.week = "今天";
      }else if(date==(cur_date+1)%monthLength){//这个就要修改了
        this.week = "明天";
      }else{
        this.week = '星期' + week;
      }
    }

     //开始构建下一个月，反正我们只管7天的量，x表示星期几，从0开始
    for(var i=monthLength+1;i<=monthLength+7;i++){
      //当循环完一周后，初始化再次循环
      if(x>6){
        x=0;
      }
      //利用构造函数创建对象 i是一个月中的第几号,用于构建date,[weeks_ch[x]][0]就是星期几的几，比如 日 一 二 三
      that.data.calendar[i] = new next_calendar(i-monthLength, [weeks_ch[x]][0])
     // that.data.next_calendar[i-monthLength-1] = new next_calendar(i-monthLength, [weeks_ch[x]][0])//构建一个从0序号开始的新的数组
      
      x++;
    }   
  
    //限制要渲染的日历数据天数为7天以内（用户体验）
    var flag = that.data.calendar.splice(cur_date, that.data.calendar.length - cur_date <= 7? that.data.calendar.length:7)
    that.setData({
      calendar: flag
    })
    console.log(that.data.calendar)
  

  },
 
  onLoad: function() {

    //修改全局变量
    this.get_calendar()
    var App = getApp()
    App.globalData.calendar=this.data.calendar
    console.log('全局变量calendar:',App.globalData.calendar)



    var that = this;
    that.setData({
      year: new Date().getFullYear()
    });

    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      })
    }
  },

  onReady: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 1000);
  },

  
  onShow: function () {

  },

  
  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  },
  //事件处理函数
  bindViewTap: function() {
    this.setData({
      modalHidden:!this.data.modalHidden
    })
    
  },
  //确定按钮点击事件
  modalBindaconfirm:function(){
    this.setData({
      modalHidden:!this.data.modalHidden,
    })
  },
  //取消按钮点击事件
  modalBindcancel:function(){
    this.setData({
      modalHidden:!this.data.modalHidden,
    })
}
})