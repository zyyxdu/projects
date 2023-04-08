const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calendar:[],//可显示的日期数组
    user_openid:"",//使用者的openid
    user_name:"",
    all_reserve:[],
    all_reserve2:[]
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
     //获取user_openid +获得user_name
   this.get_user_openid()
  
   //获取calendar日历
   this.get_calendar_width()


  },
  // 检查订阅消息权限，未开启提示前往开启，已开启请求订阅消息
  push(e) {
    let that = this
    wx.getSetting({
      withSubscriptions: true,
      success(res) {
        console.log(res.subscriptionsSetting)
        // 订阅消息总开关是否开启
        if (!res.subscriptionsSetting.mainSwitch) {
        
          console.log('订阅消息总开关关了，674')
          wx.showModal({
            title: '提示',
            content: '当前暂未开启接消息提醒，是否前往设置页开启？',
            success(res) {
              if (res.confirm) {
                wx.openSetting()
              }
            }
          })
        } else {
          console.log('订阅消息总开关打开了，686')
          let templateId ='quzX0MVbfPQC-quIUWLAnd2xbSIk0nOAI_IPc4z4r5M' // 模板ID
         // let templateId = 'LARFLQFNBzlJ8HyZZ4Z96yyhst1JIKoYBfQVglwmHbA'
        
            wx.requestSubscribeMessage({
              tmplIds: [templateId],
              success(res) {
                console.log('授权成功',res)
                // 申请订阅成功，将订阅信息调用云函数存入云开发数据
                if (res.errMsg === 'requestSubscribeMessage:ok') {
                  // res[templateId]: 'accept'、'reject'、'ban'、'filter'
                  if (res[templateId] == 'accept') {} else {
                  
                    console.log('订阅失败695')
                  }
                }
             
                wx.cloud.callFunction({
                  name:"send",
                 // name:"sendMsg",
                  data:{
                    openid:that.data.user_openid,
                    /*
                    name:"name",
                    result:"审核",
                    reason:"请登录查看"
                    */
                    meeting_name:that.data.all_reserve2[0].meeting_name,
                    time:"2019年10月16日 09:30",
                    location:that.data.all_reserve2[0].location_name,
                    introduction:that.data.all_reserve2[0].reason,
                    people:that.data.user_name
                  }
      
                }).then(res=>{
                  console.log("发送注册通过消息成功",res)
                }).catch(err=>{
                  console.log("发送注册通过消息失败",err)
                }) 
               
              },
              fail(err) {
                console.log(err)
             
                console.log('订阅失败702')
                wx.showToast({
                  title: '订阅失败',
                  icon: 'none'
                })
              }
  
            })

       
         
          
        }
      }
    })
  },
  get_calendar_width(){
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
  
    this.setData({
    today_date:cur_year+'-'+cur_month+'-'+cur_date
    //width: 186 * parseInt(that.data.calendar.length - cur_date <= 7 ? that.data.calendar.length : 7)
   })
    console.log("today_date=",this.data.today_date)  

    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    //利用构造函数创建对象
    function calendar(date,week){
      //console.log("week",week)//就是 一，二，三。。。天
      this.date=cur_year+'-'+cur_month+'-'+date;//2022-9-23
      if(date==cur_date){
        this.week = "今天";
        /*
        that.setData({
          today_date:this.date
          //width: 186 * parseInt(that.data.calendar.length - cur_date <= 7 ? that.data.calendar.length : 7)
        })*/
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
    
     this.setData({
       reserved_date:this.data.calendar[0].date
     })
     console.log('reserved_date初始化',this.data.reserved_date)
     //设置scroll-view的子容器的宽度  
     that.setData({
       width: 186 * parseInt(that.data.calendar.length - cur_date <= 7 ? that.data.calendar.length : 7)
     })
 
   },
 
   get_user_openid(){

     //获取user_openid
     wx.cloud.callFunction({
     //name:'getOpenid'
     name:'lll'
      })
      .then(res=>{
       console.log('成功获取user_openid',res)
       this.setData({
         user_openid:res.result.openid
       })
       console.log("user_openid:",this.data.user_openid)

       db.collection('user').where({
        _openid:this.data.user_openid
      })
      .get()
      .then(res=>{
        this.setData({
         user_name:res.data[0].name
       })
       console.log('user_name:',res.data[0].name)
      })
      .catch(res=>{
        console.log('获取user_name失败')
      })

      db.collection("loc_user_reserve").where({
        user_openid:this.data.user_openid,
      })
      .get()
      .then(res=>{
        console.log("获取该用户的所有预约信息成功",res)
        this.setData({
          all_reserve:res.data,
        })
        let tmp=res.data.reverse();
        console.log('tmp',tmp)
        this.setData({
          all_reserve2:tmp
        })
      })
      .catch(res=>{
        console.log("fail,获取该用户的所有预约信息失败")
      })
       
    })
    .catch(err=>{
     console.log('获取user_openid失败')
    })
 
   
   },

   shouquan(){
    let templateId ='quzX0MVbfPQC-quIUWLAnd2xbSIk0nOAI_IPc4z4r5M' // 模板ID
    // let templateId = 'LARFLQFNBzlJ8HyZZ4Z96yyhst1JIKoYBfQVglwmHbA'
       wx.requestSubscribeMessage({
         tmplIds: [templateId],
         success(res) {
           console.log('授权成功',res)
         },
         fail(res){
           console.log('授权失败',res)
         }
      })
   },
  
   message(){
    let templateId ='quzX0MVbfPQC-quIUWLAnd2xbSIk0nOAI_IPc4z4r5M' // 模板ID
    wx.cloud.callFunction({
      name:"send",
     // name:"sendMsg",
      data:{
        openid:this.data.user_openid,
        /*
        name:"name",
        result:"审核",
        reason:"请登录查看"
        */
        meeting_name:this.data.all_reserve2[0].meeting_name,
        time:"2019年10月16日 09:30",
        location:this.data.all_reserve2[0].location_name,
        introduction:this.data.all_reserve2[0].reason,
        people:this.data.user_name
      }

    })
    .then(res=>{
      console.log("发送注册通过消息成功",res)
    })
    .catch(err=>{
      console.log("发送注册通过消息失败",err)
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
  add(){
    db.collection('loc_user_reserve')
    .add({
      data:{
        name:"000"
      }
    })
    .then(res=>{
      console.log('success')
    })
    .catch(res=>{
      console.log("fail")
    })

  },
  onShareAppMessage(e) {
    var that = this;
    var longitude = 114.0322103;
    var latitude = 22.5353646;
    return {
      title: '某条预约记录',
      path: '/pages/loc_share/loc_share?sharetype=1&longitude=' + longitude + '&latitude=' + latitude

  }
}

})