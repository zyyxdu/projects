const db = wx.cloud.database();
const _=db.command;  
Page({

  /**
   * 页面的初始数据
   */
  data: {
//时间选择
//多项选择器（时间）
multiArray: [['00', '01','02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12','13','14','15','16','17','18','19','20','21','22','23'], 
['00', '15', '30', '45']],
objectMultiArray: [//
  [
    {
      id: 0,
      name: '00'
    },
    {
      id: 1,
      name: '01'
    },
    {
        id: 2,
        name: '02'
      },
      {
        id: 3,
        name: '03'
      },
      {
        id: 4,
        name: '04'
      },
      {
        id: 5,
        name: '05'
      },
      {
        id: 6,
        name: '06'
      },
      {
        id: 7,
        name: '07'
      },
      {
        id: 8,
        name: '08'
      },
      {
        id: 9,
        name: '09'
      },
      {
        id: 10,
        name: '10'
      },
      {
        id: 11,
        name: '11'
      },
      {
        id: 12,
        name: '12'
      },
      {
        id: 13,
        name: '13'
      },{
        id: 14,
        name: '14'
      },{
        id: 15,
        name: '15'
      },{
        id: 16,
        name: '16'
      },{
        id: 17,
        name: '17'
      },{
        id: 18,
        name: '18'
      },{
        id: 19,
        name: '19'
      },{
        id: 20,
        name: '20'
      },{
        id: 21,
        name: '21'
      },{
        id: 22,
        name: '22'
      },{
        id: 23,
        name: '23'
      }
  ], 
  [
    {
      id: 0,
      name: '00'
    },
    {
      id: 1,
      name: '15'
    },
    {
      id: 2,
      name: '30'
    },
    {
      id: 3,
      name: '45'
    }
  ], 
],
multiIndex: [0, 0],

//普通选择器
index: 0,
array: ['15分钟', '30分钟', '45分钟', '1个小时','1个小时15分钟','1个小时30分钟','一个小时45分钟','2个小时',],
objectArray: [
  {
    id: 0,
    name: '15分钟'
  },
  {
    id: 1,
    name: '30分钟'
  },
  {
    id: 2,
    name: '45分钟'
  },
  {
    id: 3,
    name: '1个小时'
  },
  {
    id: 4,
    name: '1个小时15分钟'
  },
  {
    id: 5,
    name: '1个小时30分钟'
  },
  {
    id: 6,
    name: '一个小时45分钟'
  },
  {
    id: 7,
    name: '2个小时'
  }
],

    time:"",
    loc_id:"" ,
    loc_name:"",
    unable_time:[],//读取改场地所有的reserve time
    show_time:[],//
    calendar:[],//可显示的日期数组
    user_openid:"",
    user_name:"",
    currentIndex:0,//日历数组的序号啦
    hour:-1,
    min:-1,
    hiddenmodalput:true,//关于是否预定的隐藏
    reason:"",//预定的原因
  
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

      db.collection('user_reserve').where({
        _openid:this.data.user_openid
      })
      .get()
      .then(res=>{
        this.setData({
         user_name:res.data[0].name
       })
       console.log('user_name:',this.data.user_name)
      })
      .catch(res=>{
        console.log('fail.获取user_name失败',res)
      })
   })
   .catch(err=>{
    console.log('获取user_openid失败')
   })
 },
  shuru(e){
    console.log("shuru",e.detail)
    
    this.setData({
      hour1:e.detail.value,
    })
    console.log("hour1",this.data.hour1)
  

  },

  jump: function(e){

    var loc_id=e.currentTarget.dataset.id;
    //console.log("e",e);
    console.log(loc_id);
    wx.navigateTo({
    // url: '/pages/locreserve_test3/locreserve_test3?loc_id=' + loc_id,
    url: '/pages/new_reserve/new_reserve?loc_id=' + loc_id,
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

//两个时间选择器
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  addReserve:function(e) {
    console.log("这个e应该没问题吧,",e.currentTarget.dataset)
    let that = this
    that.setData({
      hiddenmodalput: !that.data.hiddenmodalput,
    })
  },

  Reason:function(e){
    console.log("reason",e.detail)
    
    this.setData({
      reason:e.detail.value,
    })
    console.log("reason",this.data.reason)
  },

  confirm(){
    if(this.data.reason==''){
      wx.showToast({
        title: '信息未输入完全',//提示文字
        duration:1100,//显示时长
        //mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
        icon:'none', //图标，支持"success"、"loading"  
        success:function(){ 
          that.onShow()
        },//接口调用成功
        fail: function () { console.log("260行有问题")},  //接口调用失败的回调函数  
        complete: function () { } //接口调用结束的回调函数  
     })
         return;
    }

    
    this.setData({
      hiddenmodalput: true
    })

  
    var date=this.data.calendar[this.data.currentIndex].date
    //console.log(this.data.multiIndex)
    var hour=this.data.multiIndex[0];
    var min=15*this.data.multiIndex[1];
    var con=15*this.data.index+15;
    
    var hour1=hour+Math.floor((con+min)/60);
    var min1 =(min+con)%60;
    console.log(hour,min)
    console.log(con)

    var len = this.data.show_time.length
    for(var i=0;i<len;i++){
        var chooseminone = 60*hour+min
        var choosemintwo = 60*hour+min+con
        var existimeone =this.data.show_time[i].hour*60+this.data.show_time[i].min
        var existimetwo =this.data.show_time[i].hour*60+this.data.show_time[i].min+this.data.show_time[i].contin
        if(chooseminone<existimeone){
          if(choosemintwo>existimeone){
            console.log("重合")
            wx.showToast({
              title: '时间段已有预约',
              duration:2100,
               
              icon:'none',  
              success:function(){ 
                
              },//接口调用成功
              fail: function () { console.log("")},  //接口调用失败的回调函数  
              complete: function () { } //接口调用结束的回调函数  
           })
               return;
          }
         
          
        }
        else if(chooseminone>=existimeone&&chooseminone<existimetwo){
          console.log("重合")
          wx.showToast({
            title: '时间段已有预约',
            duration:2100,
             
            icon:'none', //图标，支持"success"、"loading"  
            success:function(){ 
            
            },//接口调用成功
            fail: function () { console.log("")},  //接口调用失败的回调函数  
            complete: function () { } //接口调用结束的回调函数  
         })
             return;
        }
    }

    //判断不能小于当前的时间
      var nowtime = 60*new Date().getHours()+new Date().getMinutes()
      if(this.data.currentIndex==0){
        if(chooseminone<nowtime){
          console.log("选取时间小于当前时间")
          wx.showToast({
            title: '选取时间小于当前时间',
            duration:2100,
             
            icon:'none', //图标，支持"success"、"loading"  
            success:function(){ 
            
            },//接口调用成功
            fail: function () { console.log("")},  //接口调用失败的回调函数  
            complete: function () { } //接口调用结束的回调函数  
         })
             return;
          
        }
      }
      


    this.setData({
      'tmp.contin':con,
      'tmp.date':date,
      'tmp.hour':hour,
      'tmp.min':min,
      'tmp.hour1':hour1,
      'tmp.min1':min1,
      'tmp.user_openid':this.data.user_openid,
      'tmp.reason':this.data.reason,
      'tmp.user_name':this.data.user_name
    })
    const _ = db.command
    
    db.collection('reserved_time1')
    .where({
      location_id:this.data.loc_id
    })
    .update({
      data:{
       'reserve':_.push(this.data.tmp)
      }
    })
    .then(res=>{
      console.log("添加成功",res)
      //还得去history做修改呢
     this.get_now();
     
    })
    .catch(res=>{
      console.log("fail添加")
    })

    db.collection('history')
    .add({
      data:{
        'contin':con,
        'reserved_date':date,
        'hour':hour,
        'min':min,
        'hour1':hour1,
        'min1':min1,
        'user_openid':this.data.user_openid,
        'location_id':this.data.loc_id,
        'location_name':this.data.loc_name,
        'reason':this.data.reason,
        'user_name':this.data.user_name,
      }
    })
    .then(res=>{
      console.log("history添加成功")
      console.log("00000000000",this.data.loc_name)
      wx.showToast({
        title: '预约成功',
        duration:2100,
         
        icon:'success', //图标，支持"success"、"loading"  
        success:function(){ 
        
        },//接口调用成功
        fail: function () { console.log("")},  //接口调用失败的回调函数  
        complete: function () { } //接口调用结束的回调函数  
     })
    })
    .catch(res=>{
      console.log("fail,history添加fail")
    })

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.get_calendar_width()
    this.get_user_openid();

    this.setData({
      loc_id:options.loc_id,
      loc_name:options.loc_name
    })
    console.log("locations_id",this.data.loc_id)
    console.log("loc_name",this.data.loc_name)
    this.get_now();
    
  },

  get_now(){
    db.collection('reserved_time1')
    .where({
      location_id:this.data.loc_id,
    })
    .get()
    .then(res=>{
      console.log("1111111111111111成功获取",res)
      this.setData({
        unable_time:res.data[0].reserve
      })
      console.log("this.data.unable_time",this.data.unable_time)
      var today=this.data.calendar[this.data.currentIndex].date;
      console.log("471777777777",today)
      var tmp=[];
      var j=0;
      for(var i=0;i<this.data.unable_time.length;i++){
        console.log("今天的预约信息");
        if(this.data.unable_time[i].date==today){
          tmp[j]=this.data.unable_time[i];
          j++;
        }
      }
      console.log("tmp",tmp)
      this.setData({
        show_time:tmp
      })
    })
    .catch(res=>{
      console.log("获取失败",res)
    })

  },

  select_date(e){
    //为上半部分的点击事件
    this.setData({
      currentIndex: e.currentTarget.dataset.index, //在calendar数组的序号,第几天
      show_time:[]
    })
    //console.log(e.currentTarget.dataset.date)//2022-9-24
    console.log("calendar数组的序号:",this.data.currentIndex)//calendar数组的序号
    var today=this.data.calendar[this.data.currentIndex].date;
      console.log("471777777777",today)
      var tmp=[];
      var j=0;
      for(var i=0;i<this.data.unable_time.length;i++){
        console.log("今天的预约信息");
        if(this.data.unable_time[i].date==today){
          tmp[j]=this.data.unable_time[i];
          j++;
        }
      }
      console.log("tmp",tmp)
      this.setData({
        show_time:tmp
      })
  },

  cancel: function(){
    let that=this
    wx.showToast({
      title: '取消成功',//提示文字
      duration:1100,//显示时长
      mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
     icon:'none', //图标，支持"success"、"loading"  
      success:function(){ 
        that.setData({
          hiddenmodalput: true
         });
      },//接口调用成功
      fail: function () { console.log("369行有问题")},  //接口调用失败的回调函数  
      complete: function () { } //接口调用结束的回调函数  
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
  onShareAppMessage() {

  }
})