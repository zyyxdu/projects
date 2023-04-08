const db = wx.cloud.database()
Page({
  data: {
   
    hiddenmodalput:true,//关于是否预定的隐藏
    hiddenmodalput2:true,//关于是否预定的隐藏


    calendar:[],//可显示的日期数组
    width:0,//用于计算样式的
    currentIndex:0,//在calendar数组的序号,第几天
    currentTime: 0,//。。。。我还不知道这个是干嘛的
    user_openid:"",//使用者的openid
    user_name:"",//使用者的name
    today_date:"",//今天是的日期2022-7-22
    reserved_date:"",//现在选中的日期
    locations_id:"",//locations的会议室记录的id,id是记录的唯一标识，_openid是创建者的标识
    locations_name:"",//locations的name
    /*
    day_0:[],
    day_1:[],
    day_2:[],
    day_3:[],
    day_4:[],
    day_5:[],
    day_6:[],*/
    reserve_time:[],//就是day_的某一天关于时间的全部预约数据
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
    day_5_isAble:
    [
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
    reserve_time_isAble:[
      true,true,true,true,true,true,true,true
      ,true,true,true,true,true,true,true,true
      ,true,true,true,true,true,true,true,true
      ,true,true,true,true,true,true,true,true
    ],
    
    current_index:0,//要修改的是某一天的第几个时间
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
    del_id:"",
    update_index:-1,//用于从loc_set_reserve更新data数据

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
    db.collection('locations').doc(this.data.locations_id).get()
    .then(res => {
      this.setData({
        locations_name:res.data.name
      })
      console.log('成功获取locations的name',this.data.locations_name)
    })
    .catch(res=>{
       console.log('获取locations的name失败啦')
    })

   //获取user_openid +获得user_name
   // this.get_user_openid() //这里没必要，又用不到

    //获取calendar日历
    this.get_calendar_width()
    
    //仿照预约，正文开始了

    //先重置day_i_isAble
    db.collection('locations').doc(this.data.locations_id)
    .update({
      data:{
        cur_date:this.data.calendar,
        day_0_isAble:this.data.isable,
        day_1_isAble:this.data.isable,
        day_2_isAble:this.data.isable,
        day_3_isAble:this.data.isable,
        day_4_isAble:this.data.isable,
        day_5_isAble:this.data.isable,
        day_6_isAble:this.data.isable,
      }
    })
    .then(res=>{
      console.log('这条场地记录的相关设置信息重置了')
     
      //然后从loc_set_reserve更新locations的是否可以预定
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
             
              //我们来更新data
              this.setData({
                update_index:res.data[i].time_index
              })

              console.log('update_index',this.data.update_index)
          
              var tmp='day_'+j+'_isAble['+this.data.update_index+']';
                this.setData({
                  [tmp]:false
              })
              console.log('tmp',tmp)

              //更新场地记录
              db.collection('locations').doc(this.data.locations_id)
              .update({
                data:{
                  ['day_'+(j)+'_isAble'+'.'+(res.data[i].time_index)]:false,
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

        //data的更新完毕了
        if(this.data.currentIndex==0){
          this.setData({
            reserve_time_isAble:this.data.day_0_isAble,
          });
        }else if(this.data.currentIndexx==1){
          this.setData({
            reserve_time_isAble:this.data.day_1_isAble,
          });
        }else if(this.data.currentIndex==2){
          this.setData({
            reserve_time_isAble:this.data.day_2_isAble,
          });
        }else if(this.data.currentIndex==3){
          this.setData({
            reserve_time_isAble:this.data.day_3_isAble,
          });
        }else if(this.data.currentIndex==4){
          this.setData({
            reserve_time_isAble:this.data.day_4_isAble,
          });
        }else if(this.data.currentIndex==5){
          this.setData({
            reserve_time_isAble:this.data.day_5_isAble,
          });
        }else if(this.data.currentIndex==6){
          this.setData({
            reserve_time_isAble:this.data.day_6_isAble,
          });
        }

      
      })
      .catch(res=>{
        console.log('fail,loc_set_reserve获取的数据失败')
      })
      

    })
    .catch(res=>{
      console.log('fail,这条场地记录的相关设置信息起始重置了失败了')
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
   
    const date = new Date();  //Fri Sep 23 2022 21:21:11 GMT+0800 (中国标准时间)
    const cur_year = date.getFullYear();
   // console.log("cur_year=",cur_year) 2022
    const cur_month = date.getMonth() + 1;
    //console.log("cur_month=",cur_month) 9
    const cur_date=date.getDate();
   // console.log("const date=",cur_date)  23
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
  
    var tmp_date=cur_year+'-'+cur_month+'-'+cur_date;//2022-9-23
   
    /* 
    for(var i=0;i<=6;i++){
      if(calendar_index==i){
        var day_tmp="this.data.day_"+i;
        this.setData({
          //reserve_time:['this.data.day_'+(i)]
          reserve_time:[day_tmp]
          //['time.'+(this.data.current_index)+'.1']
        });
      }
    }
    */
    if(calendar_index==0){
      this.setData({
        reserve_time_isAble:this.data.day_0_isAble,
      });
    }else if(calendar_index==1){
      this.setData({
        reserve_time_isAble:this.data.day_1_isAble,
      });
    }else if(calendar_index==2){
      this.setData({
        reserve_time_isAble:this.data.day_2_isAble,
      });
    }else if(calendar_index==3){
      this.setData({
        reserve_time_isAble:this.data.day_3_isAble,
      });
    }else if(calendar_index==4){
      this.setData({
        reserve_time_isAble:this.data.day_4_isAble,
      });
    }else if(calendar_index==5){
      this.setData({
        reserve_time_isAble:this.data.day_5_isAble,
      });
    }else if(calendar_index==6){
      this.setData({
        reserve_time_isAble:this.data.day_6_isAble,
      });
    }
    
  console.log("reserve_time_isAble",this.data.reserve_time_isAble)
  },
  
  get_current_index(e){
    console.log("get_current_index",e.currentTarget.dataset.index)
    this.setData({
      current_index:e.currentTarget.dataset.index
    })
  },

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

   cancel2: function(){
    let that = this
    wx.showToast({
      title: '取消成功',//提示文字
      duration:1100,//显示时长
      mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
      icon:'success', //图标，支持"success"、"loading"  
      success:function(){ 
        that.setData({
          hiddenmodalput2: true
         });
      },//接口调用成功
      fail: function () { console.log("369行有问题")},  //接口调用失败的回调函数  
      complete: function () { } //接口调用结束的回调函数  
   })
   
   },

   confirm:function(e) {
     console.log("要设置成不可预定啦",e)
     let that = this
     that.setData({
      hiddenmodalput: true,
     //current_index:e.currentTarget.dataset.id
     },()=>{
       //从这里开始继续修改哦 ，修改locations
       db.collection('locations')
      .doc(this.data.locations_id)
       .update({
        data:{
          ['day_'+(this.data.currentIndex)+'_isAble'+'.'+(this.data.current_index)]:false,
        }
      })
      .then(res=>{
        console.log('设置不可预定成功，locations的day_i_isAble的某个数组,update成功')
        //接下来我们更新loc_set_reserve
        console.log("接下来我们更新loc_set_reserve")
        //我们只放入设置了 不可预约 的信息
        db.collection('loc_set_reserve').add({
          data:{
            time_period:this.data.timeList[this.data.current_index],
            time_index:this.data.current_index,
            location_id:this.data.locations_id,
            location_name:this.data.locations_name,
            set_date:this.data.calendar[this.data.currentIndex].date,
          }
        })
        .then(res=>{
          console.log('loc_set_reserve添加信息成功了')
          //信息添加成功了，场地信息也更新了，页面数据也要更新
          console.log('confirm完了，然后重新加载页面的date_i_isAble')
          //我们来更新data
          //要更新数据,单条记录有两种方法，直接去集合里面更新全部，或者只修改data里面的某一个小数据
          //这里我采用修改data里面的某一个小数据
            var tmp='day_'+this.data.currentIndex+'_isAble['+this.data.current_index+']';
            this.setData({
                [tmp]:false
            })
            console.log('592.............')
            if(this.data.currentIndex==0){
              this.setData({
                reserve_time_isAble:this.data.day_0_isAble,
              });
            }else if(this.data.currentIndex==1){
              this.setData({
                reserve_time_isAble:this.data.day_1_isAble,
              });
            }else if(this.data.currentIndex==2){
              this.setData({
                reserve_time_isAble:this.data.day_2_isAble,
              });
            }else if(this.data.currentIndex==3){
              this.setData({
                reserve_time_isAble:this.data.day_3_isAble,
              });
            }else if(this.data.currentIndex==4){
              this.setData({
                reserve_time_isAble:this.data.day_4_isAble,
              });
            }else if(this.data.currentIndex==5){
              this.setData({
                reserve_time_isAble:this.data.day_5_isAble,
              });
            }else if(this.data.currentIndex==6){
              this.setData({
                reserve_time_isAble:this.data.day_6_isAble,
              });
            }

        })
        .catch(res=>{
          console.log('fail,loc_user_reserve添加信息失败了')
        })

      })
      .catch(res=>{
        console.log('fail,设置不可预定失败，locations的day_i_isAble的某个数组,update失败')
      })

    }
    )

  },
  
  confirm2:function(e) { 
    console.log("要设置成可预定啦",e)
   let that = this
   that.setData({
     hiddenmodalput2: true,
    //current_index:e.currentTarget.dataset.id
   },()=>{
     //从这里开始继续修改哦 ，修改locations
     db.collection('locations')
     .doc(this.data.locations_id)
      .update({
       data:{
         ['day_'+(this.data.currentIndex)+'_isAble'+'.'+(this.data.current_index)]:true,
        // ['day_'+(this.data.currentIndex)+'.'+(this.data.current_index)+'.1']:this.data.user_openid
       }
     })
     .then(res=>{
       console.log('设置可预订成功，locations的day_i_isAble的某个数组,update成功')
       //然后还要删除 set 记录
       //我先 获取 那条记录的id
       db.collection('loc_set_reserve')
       .where({
        location_id:this.data.locations_id,
        time_index:this.data.current_index,
        set_date:this.data.calendar[this.data.currentIndex].date,
       })
       .get()
       .then(res=>{
         console.log('找到要删除记录的_id了',res.data[0]._id)
         this.setData({
          del_id:res.data[0]._id
        }) 
        //然后开始删除
        db.collection('loc_set_reserve').doc(this.data.del_id)
        .remove()
        .then(res=>{
          console.log('删除不可预定信息成功')
          this.setData({
            del_id:""
          })
          console.log('confirm2完了，然后重新加载页面的date_i_isAble')
          //删除完了要更新数据,单条记录有两种方法，直接去集合里面更新全部，或者只修改data里面的某一个小数据
          //这里我采用修改data里面的某一个小数据
           //我们来更新data
           var tmp='day_'+this.data.currentIndex+'_isAble['+this.data.current_index+']';
           this.setData({
               [tmp]:true
           })
           console.log('685.............')
           if(this.data.currentIndex==0){
             this.setData({
              reserve_time_isAble:this.data.day_0_isAble,
             });
           }else if(this.data.currentIndex==1){
             this.setData({
              reserve_time_isAble:this.data.day_1_isAble,
             });
           }else if(this.data.currentIndex==2){
             this.setData({
              reserve_time_isAble:this.data.day_2_isAble,
             });
           }else if(this.data.currentIndex==3){
             this.setData({
              reserve_time_isAble:this.data.day_3_isAble,
             });
           }else if(this.data.currentIndex==4){
             this.setData({
              reserve_time_isAble:this.data.day_4_isAble,
             });
           }else if(this.data.currentIndex==5){
             this.setData({
              reserve_time_isAble:this.data.day_5_isAble,
             });
           }else if(this.data.currentIndex==6){
             this.setData({
              reserve_time_isAble:this.data.day_6_isAble,
             });
           }

        })
        .catch(res=>{
         console.log('fail,删除不可预定信息失败')
        })
      
       })
       .catch(res=>{
        console.log('fail,找到要删除记录的id失败了')
       })

     })
     .catch(res=>{
       console.log('设置可预订失败，locations的day_的某个数组,update失败')
     })
    
   }
   )
   
 },
 /*
  reserved_show:function(){
    wx.showToast({
      title: '点击无效哦',//提示文字
      duration:1100,//显示时长
      mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
      //icon:'success', //图标，支持"success"、"loading"  
      success:function(){ 
      
      },//接口调用成功
      fail: function () { console.log("369行有问题")},  //接口调用失败的回调函数  
      complete: function () { } //接口调用结束的回调函数  
   })
  },*/

  addReserve:function(e) {
    console.log("这个e应该没问题吧,",e.currentTarget.dataset)
    let that = this
    that.setData({
      hiddenmodalput: !that.data.hiddenmodalput,
      current_index:e.currentTarget.dataset.id
    
    })
  
  },
  addReserve2:function(e) {
    console.log("这个e应该没问题吧,",e.currentTarget.dataset)
    let that = this
    that.setData({
      hiddenmodalput2: !that.data.hiddenmodalput2,
      current_index:e.currentTarget.dataset.id
    
    })
  
  },

 

})