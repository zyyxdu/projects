const db = wx.cloud.database()
Page({
  data: {
   
    hiddenmodalput:true,//关于是否预定的隐藏
    
    people:[],
    calendar:[],//可显示的日期数组
    width:0,//用于计算样式的
    currentIndex:0,//在calendar数组的序号,第几天
    currentTime: 0,//。。。。我还不知道这个是干嘛的
    user_openid:"",//使用者的openid
    user_name:"",//使用者的name
    today_date:"",//今天是的日期2022-7-22
    reserved_date:"",//现在选中的日期22-10-6
    locations_id:"",//locations的会议室记录的id,id是记录的唯一标识，_openid是创建者的标识
    locations_name:"",//locations的name
    reason:"",//预定的原因
    day_0:[
      [false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""], [false,""],
    ],
    day_1:[
      [false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""], [false,""],
    ],
    day_2:[
      [false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""], [false,""],
    ],
    day_3:[
      [false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""], [false,""],
    ],
    day_4:[
      [false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""], [false,""],
    ],
    day_5:[
      [false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""], [false,""],
    ],
    day_6:[
      [false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""], [false,""],
    ],
    reserve_time:[],//就是day_的某一天关于时间的全部预约数据\
    /*
    day_0_isAble:[],
    day_1_isAble:[],
    day_2_isAble:[],
    day_3_isAble:[],
    day_4_isAble:[],
    day_5_isAble:[],
    day_6_isAble:[],*/
    day_0_isAble:[
      true,true,true,true,true,true,true,true
      ,true,true,true,true,true,true,true,true
      ,true,true,true,true,true,true,true,true
      ,true,true,true,true,true,true,true,true
    ],
    day_1_isAble:[
      true,true,true,true,true,true,true,true
      ,true,true,true,true,true,true,true,true
      ,true,true,true,true,true,true,true,true
      ,true,true,true,true,true,true,true,true
    ],
    day_2_isAble:[
      true,true,true,true,true,true,true,true
      ,true,true,true,true,true,true,true,true
      ,true,true,true,true,true,true,true,true
      ,true,true,true,true,true,true,true,true
    ],
    day_3_isAble:[
      true,true,true,true,true,true,true,true
      ,true,true,true,true,true,true,true,true
      ,true,true,true,true,true,true,true,true
      ,true,true,true,true,true,true,true,true
    ],
    day_4_isAble:[
      true,true,true,true,true,true,true,true
      ,true,true,true,true,true,true,true,true
      ,true,true,true,true,true,true,true,true
      ,true,true,true,true,true,true,true,true
    ],
    day_5_isAble:[
      true,true,true,true,true,true,true,true
      ,true,true,true,true,true,true,true,true
      ,true,true,true,true,true,true,true,true
      ,true,true,true,true,true,true,true,true
    ],
    day_6_isAble:[
      true,true,true,true,true,true,true,true
      ,true,true,true,true,true,true,true,true
      ,true,true,true,true,true,true,true,true
      ,true,true,true,true,true,true,true,true
    ],
    reserve_time_isAble:[],
    current_index:0,//要修改的是某一天的第几个时间
   //this.data.timeList[this.data.current_index]
    timeList:[
      "7:30-8:00","8:00-8:30","8:30-9:00","9:00-9:30","9:30-10:00","10:00-10:30","10:30-11:00","11:00-11:30","11:30-12:00","12:00-12:30","12:30-13:00","13:00-13:30","13:30-14:00","14:00-14:30","14:30-15:00","15:00-15:30","15:30-16:00","16:00-16:30","16:30-17:00","17:00-17:30","17:30-18:00","18:00-18:30","18:30-19:00","19:00-19:30","19:30-20:00","20:00-20:30","20:30-21:00","21:00-21:30","21:30-22:00","22:00-22:30","22:30-9:00","23:00-23:30"
    ],
    day:[
      [false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""],[false,""], [false,""],
    ],
    isable:[
      true,true,true,true,true,true,true,true
      ,true,true,true,true,true,true,true,true
      ,true,true,true,true,true,true,true,true
      ,true,true,true,true,true,true,true,true
    ],
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
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    //获得locations页面传输过来的loc_id
    //console.log("输送过来的loc_id",options.loc_id)
    this.setData({
      locations_id:options.loc_id
    })
    console.log("locations_id",this.data.locations_id)

   //获取当前场地的名字
    db.collection('locations').doc(this.data.locations_id).get().then(res => {
      this.setData({
        locations_name:res.data.name
      })
      console.log('成功获取locations的name',this.data.locations_name)
    })
    .catch(res=>{
       console.log('获取locations的name失败啦')
    })

   //获取user_openid +获得user_name
   this.get_user_openid()
  
    //获取calendar日历
   this.get_calendar_width()

    //day_i_isAble
    //然后从loc_set_reserve更新data的是否可以预定
    db.collection("loc_set_reserve").where({
      location_id:this.data.locations_id
      //找到所有在这个场地的预约记录
    })
    .get()
    .then(res=>{
      console.log('咱们来看看在loc_set_reserve获取的数据咋样',res.data)

      for(var i=0;i<res.data.length;i++){
        //咱们来对比calendar和 获取的记录的预定时间，看看要不要update场地记录
         //i是集合的，j是现在的 日历
        for(var j=0;j<this.data.calendar.length;j++){
          //console.log((i+1)*(j+1),res.data[i].set_date,"  ",this.data.calendar[j].date)
          if(res.data[i].set_date==this.data.calendar[j].date){
            console.log('找到了可对应，咱们开始更新重置了之后的locations吧')
            //不需要更新场地纪录，无所谓，除非把场地的isable重置为0，然后再次更新,但是我们这里只是看个页面
            //所以我们更新个页面记录就得了
            this.setData({
              ['day_'+(j)+'_isAble'+'['+(res.data[i].time_index)+']']:false,
            })
          }

        }
      }
      this.setData({
        reserve_time_isAble:this.data.day_0_isAble,
      })

    })
    .catch(res=>{
      console.log('fail,获取loc_set_reserve获取的数据失败了')
    })

    //接下来是day_i
    //我们先把该条场地记录初始化为空的
    db.collection('locations').doc(this.data.locations_id)
    .update({
      data:{
        cur_date:this.data.calendar,
        day_0:this.data.day,
        day_1:this.data.day,
        day_2:this.data.day,
        day_3:this.data.day,
        day_4:this.data.day,
        day_5:this.data.day,
        day_6:this.data.day
      }
    })
    .then(res=>{
      console.log('这条场地记录的相关预约信息重置了')

      //然后从loc_user_reserve更新locations
      db.collection("loc_user_reserve").where({
        location_id:this.data.locations_id
        //找到所有在这个场地的预约记录
      })
      .get()
      .then(res=>{
         console.log('咱们来看看在loc_user_reserve获取的数据咋样',res.data)
        
         for(var i=0;i<res.data.length;i++){
           //咱们来对比calendar和 获取的记录的预定时间，看看要不要update场地记录
           //console.log('res.data[i].reserved_date:',res.data[i].reserved_date)
           for(var j=0;j<this.data.calendar.length;j++){
             //console.log('this.data.calendar[j].date:',this.data.calendar[j].date)
            if(res.data[i].reserved_date==this.data.calendar[j].date){

              //这里先更新data的数据
              var tmp='day_'+j  +'['+res.data[i].time_index+'].0' ;
              var tmp2='day_'+j  +'['+res.data[i].time_index+'].1';
                this.setData({
                  [tmp]:true,
                  [tmp2]:res.data[i].user_openid
              })
              console.log('291....data')

              //该条预约记录，在calendar找到了对应的日期，那就开始去locations里面更改这条场地纪录
              //j 对应day的0-6
              console.log('找到了可对应，咱们开始更新重置了之后的locations吧')
              db.collection('locations').doc(this.data.locations_id)
              .update({
                data:{
                  ['day_'+(j)+'.'+(res.data[i].time_index)+'.0']:true,
                  ['day_'+(j)+'.'+(res.data[i].time_index)+'.1']:res.data[i].user_openid
                }
              })
              .then(res=>{
                console.log('从预定集合找到了当前日期可对应的记录，更新locations成功了')
              })
              .catch(res=>{
                console.log('更新locations失败了，从预定集合找到了当前日期可对应的记录也没用')
              })
         
            }
           }
         }

         //数据都迭代完了,现在可以获得显示数据了
         this.setData({
           reserve_time:this.data.day_0
         })

      })
      .catch(res=>{
          console.log('loc_user_reserve获取数据失败了')
      })

    })
    .catch(res=>{
      console.log('重置失败了，这条场地记录的相关预约信息没有重置')
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

  },

  select_date(e){
    //为上半部分的点击事件
    this.setData({
      currentIndex: e.currentTarget.dataset.index //在calendar数组的序号,第几天
    })
    //console.log(e.currentTarget.dataset.date)//2022-9-24
    console.log("calendar数组的序号:",this.data.currentIndex)//calendar数组的序号
    var calendar_index=e.currentTarget.dataset.index;
    this.setData({ 
      reserved_date:this.data.calendar[calendar_index].date
    })
  
    console.log("reserved_date:",this.data.reserved_date)
  
    if(calendar_index==0){
      this.setData({
        reserve_time:this.data.day_0,
        reserve_time_isAble:this.data.day_0_isAble
      });
    }else if(calendar_index==1){
      this.setData({
        reserve_time:this.data.day_1,
        reserve_time_isAble:this.data.day_1_isAble
      });
    }else if(calendar_index==2){
      this.setData({
        reserve_time:this.data.day_2,
        reserve_time_isAble:this.data.day_2_isAble
      });
    }else if(calendar_index==3){
      this.setData({
        reserve_time:this.data.day_3,
        reserve_time_isAble:this.data.day_3_isAble
      });
    }else if(calendar_index==4){
      this.setData({
        reserve_time:this.data.day_4,
        reserve_time_isAble:this.data.day_4_isAble
      });
    }else if(calendar_index==5){
      this.setData({
        reserve_time:this.data.day_5,
        reserve_time_isAble:this.data.day_5_isAble
      });
    }else if(calendar_index==6){
      this.setData({
        reserve_time:this.data.day_6,
        reserve_time_isAble:this.data.day_6_isAble
      });
    }

    console.log("reserve_time",this.data.reserve_time)
  },

  get_current_index(e){
    console.log("get_current_index",e.currentTarget.dataset.index)
    this.setData({
      current_index:e.currentTarget.dataset.index
    })
  },

  Reason:function(e){
    console.log("reason",e.detail)
    
    this.setData({
      reason:e.detail.value,
    })
    console.log("reason",this.data.reason)
  },

  Name:function(e){
    console.log("Name",e.detail)
  
    this.setData({
      meeting_name:e.detail.value,
    })
    console.log("meeting_name",this.data.meeting_name)
  },
  
 // 文本域的输入事件
 textInput(e){
  this.setData({
    meeting_name:e.detail.value
  })
 },
 
  cancel: function(){
    let that = this
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

   confirm:function(e) {
    console.log("要预定啦",e)
    
    if(this.data.reason==''||this.data.meeting_name==''){
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

    let that = this
    that.setData({
      hiddenmodalput: true,
      people:[],//每次预约与会人员先重置为0,
     //current_index:e.currentTarget.dataset.id
    },()=>{
      //从这里开始继续修改哦 ，修改locations
      db.collection('locations')
      .doc(this.data.locations_id)
       .update({
        data:{
          ['day_'+(this.data.currentIndex)+'.'+(this.data.current_index)+'.0']:true,
          ['day_'+(this.data.currentIndex)+'.'+(this.data.current_index)+'.1']:this.data.user_openid
        }
      })
      .then(res=>{
        console.log('locations的day_的某个数组,update成功')
         //接下来我们更新loc_user_reserve
       console.log("接下来我们更新loc_user_reserve","看看reserved_date",this.data.reserved_date,"mmm")
    
       var tmp_date=new Date();
       var hour=(tmp_date.getUTCHours()+8)%24;
       var minute=tmp_date.getUTCMinutes();
       if(minute<10){
        var now_time=(hour)+':0'+(minute);
       }else{
        var now_time=(hour)+':'+(minute);
       }
       var now_time=(hour)+':'+(minute);

       console.log("now_time",now_time)
       var apply=new Date();
       console.log('558',this.data.reason,this.data.meeting_name)
       db.collection('loc_user_reserve').add({
        data:{
          user_openid:this.data.user_openid,
          user_name:this.data.user_name,
          time_period:this.data.timeList[this.data.current_index],
          location_id:this.data.locations_id,//哪个地点,
          location_name:this.data.locations_name,
          reserved_date:this.data.reserved_date,//预定的日期
          time_index:this.data.current_index,//一天中的第几个时间

          reason:this.data.reason,
          meeting_name:that.data.meeting_name,
          //申请的时间
          time_apply:now_time,
          date_apply:this.data.today_date,
          apply:apply,
          people:this.data.people,//与会人员的信息
          
          
          //is_approve:0,//不用审批，就用不到这个
          //status:0, //0是拒绝，1是通过，2是过期

          //is_use:0,//是否使用了  其实我没有用到，但是懒得删了
          //is_able:1,//是否能用，是否可预约  又没用到，我直接在his页面自动对比获得了
          is_push:0//是否发消息了
        }
      })
      .then(res=>{
        console.log("预约信息添加成功了")
       
        //add完了，然后更新data
        console.log('confirm完了，然后重新设置day_i')

        var tmp='day_'+this.data.currentIndex+'['+this.data.current_index+'].0';
        var tmp2='day_'+this.data.currentIndex+'['+this.data.current_index+'].1';
        this.setData({
            [tmp]:true,
            [tmp2]:this.data.user_openid
        })

       console.log('571.............')

           if(this.data.currentIndex==0){
            this.setData({
              reserve_time:this.data.day_0,
              reserve_time_isAble:this.data.day_0_isAble
            });
          }else if(this.data.currentIndex==1){
            this.setData({
              reserve_time:this.data.day_1,
              reserve_time_isAble:this.data.day_1_isAble
            });
          }else if(this.data.currentIndex==2){
            this.setData({
              reserve_time:this.data.day_2,
              reserve_time_isAble:this.data.day_2_isAble
            });
          }else if(this.data.currentIndex==3){
            this.setData({
              reserve_time:this.data.day_3,
              reserve_time_isAble:this.data.day_3_isAble
            });
          }else if(this.data.currentIndex==4){
            this.setData({
              reserve_time:this.data.day_4,
              reserve_time_isAble:this.data.day_4_isAble
            });
          }else if(this.data.currentIndex==5){
            this.setData({
              reserve_time:this.data.day_5,
              reserve_time_isAble:this.data.day_5_isAble
            });
          }else if(this.data.currentIndex==6){
            this.setData({
              reserve_time:this.data.day_6,
              reserve_time_isAble:this.data.day_6_isAble
            });
          }

          wx.showToast({
            title: '预约成功',//提示文字
            duration:1100,//显示时长
            mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
            icon:'success', //图标，支持"success"、"loading"  
            success:function(){ 
              that.onShow()
            },//接口调用成功
            fail: function () { console.log("260行有问题")},  //接口调用失败的回调函数  
            complete: function () { } //接口调用结束的回调函数  
         })

        //预定完，重置信息，方便下次输入
         this.setData({
          reason:"",
          meeting_name:"",
         })

      })
      .catch(res=>{
        console.log("失败了，预约信息没加上去")
      })

       
      })
      .catch(res=>{
        console.log('locations的day_的某个数组,update失败')
      })
     
    }
    )

  },

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
                  if (res[templateId] == 'accept') {

                  } else {
                    console.log('订阅失败695')
                  }
                }

                var date = that.data.reserved_date.match(/\d+/g);//获取日期数字字段
                var time_period=that.data.timeList[that.data.current_index];
                var period=time_period.match(/\d+/g);
                var time=date[0]+'年'+date[1]+'月'+date[2]+'日'+' '+period[0]+':'+period[1];

                console.log('time',time);
            
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
                    meeting_name:that.data.meeting_name,
                    time:time,
                    location:that.data.locations_name,
                    introduction:that.data.reason,
                    people:that.data.user_name
                  }
      
                }).then(res=>{
                  console.log("发送预约消息成功",res)
                }).catch(err=>{
                  console.log("发送预约消息失败",err)
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

  reserved_show:function(){
    wx.showToast({
      title: '点击无效哦',//提示文字
      duration:1100,//显示时长
      mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
      icon:'none', //图标，支持"success"、"loading"  
      success:function(){ 
      
      },//接口调用成功
      fail: function () { console.log("369行有问题")},  //接口调用失败的回调函数  
      complete: function () { } //接口调用结束的回调函数  
   })
  },

  addReserve:function(e) {
    console.log("这个e应该没问题吧,",e.currentTarget.dataset)
    let that = this
    that.setData({
      hiddenmodalput: !that.data.hiddenmodalput,
      current_index:e.currentTarget.dataset.id
      //noneValue:""
    })
  
  },
  
  add_person(e){
    wx.navigateTo({
      url: '/pages/loc_search_user/loc_search_user'
    })
  }

})