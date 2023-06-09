// pages/check_machine_resource/check_machine_resource.js
const db = wx.cloud.database()
const _ = db.command



Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 顶部swiper组件
    carouselImgUrls:[
      "cloud://cloud1-9gcef6nu6fc89a19.636c-cloud1-9gcef6nu6fc89a19-1311107941/images/校园2.jpeg",
      "cloud://cloud1-9gcef6nu6fc89a19.636c-cloud1-9gcef6nu6fc89a19-1311107941/images/校园5.png",
      "cloud://cloud1-9gcef6nu6fc89a19.636c-cloud1-9gcef6nu6fc89a19-1311107941/images/校园6.png",
    ],
    // 访问物资数据库，用一个列表分别保存所有物资数量，另一个列表保存所有阈值
    // [[xxx],[x]]
    // [[xxx],[x]]
    product_num:[],
    // product_threshold:[],
    // product_boolen:[],
    product_image:[],
    product_detail:[],
    // product_location:[],
    // deficiency:[],
    // product_abbre:[],
    // 当前有几个发放机
    number:0,
    product:[],
    // 当前有几个物品
    num:0,
    // 当前点击的是第几个发放机
    currentNum:0,
    idx:0,
    // hiddenmodalput:true,
    add:0,
    nowAdd:"",
    // currentIndex: 0,
    noneValue:"",
    detailid:'',

  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  // swiperChange(e) {
  //   console.log(e)
  //   this.setData({
  //     currentIndex: e.detail.current
  //   });
  // },
  
  todetail(e) {
    let that = this;
    let id =e.currentTarget.dataset.id
    wx.navigateTo({
          url: '/pages/detail/detail?id='+id
         
    })
    console.log(e.currentTarget.dataset)
   
    

  },

  //动态渲染locations集合数据，记录存在product里面
  onLoad() {
    var that =this
    db.collection("locations").get({
      success:res=>{
        console.log(res)
      
        that.setData({
          product:res.data
          // res.data[0].number就是有几个发放机
          // number:res.data[0].number
        })
       

      },fail:err=>{
        console.log("获取发放机资源失败")
      }
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
    // let that = this
    // var tempNum = that.data.currentNum
    // db.collection("infirmary_resource").get({
    //   success:res=>{
    //     console.log("res.data[0]",res.data[0])
    //     that.setData({
    //       product_image:res.data[0].image,
    //       product_location:res.data[0].location,
    //       // res.data[0].number就是有几个发放机
    //       number:res.data[0].number
    //     },()=>{
    //         console.log("所有物资的res.data",res.data)
    //         console.log("发放机页面传进来的数值为：", tempNum)
    //         console.log("typeof(tempNum)",typeof(tempNum))
    //         // 更新发放机的所有数量是否有小于阈值的
    //         db.collection("machine_resource").where({
    //           machine_id:tempNum,
    //           number: _.lt(5)
    //         })
    //         .update({
    //           data:{
    //             deficiency: 1
    //           },success:res=>{
    //             console.log("更新成功59行")
    //             db.collection("machine_resource").where({
    //               machine_id:tempNum,
    //             }).get({
    //               success:res=>{
    //                 console.log("内部刷新的",res.data)
    //                 that.setData({
    //                   product:res.data
    //                 })
    //               },fail:res=>{
    //                 console.log("获取发放机资源错误。")
    //               }
    //             })
    //           },fail:res=>{
    //             console.log("当前点击拒绝申请失败咯")
    //           }
    //         })


    //     })
       

    //   },fail:res=>{
    //     console.log("获取发放机资源失败")
    //   }
    // })
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
  switchCate:function(e) {
    let that = this
    console.log(e.currentTarget.dataset)
    that.setData({
      currentNum:e.currentTarget.dataset.num,
      idx:e.currentTarget.dataset.num
    },()=>{
      
      console.log("currentNum", that.data.currentNum)
      that.onShow()
    }
    )
  },

  //confirm和cancel 是增加商品数量的逻辑
  // cancel: function(){
  //   let that = this
  //   wx.showToast({
  //     title: '取消成功',//提示文字
  //     duration:1100,//显示时长
  //     mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
  //     icon:'success', //图标，支持"success"、"loading"  
  //     success:function(){ 
  //       that.setData({
  
  //         hiddenmodalput: true
       
  //        });
  //     },//接口调用成功
  //     fail: function () { console.log("369行有问题")},  //接口调用失败的回调函数  
  //     complete: function () { } //接口调用结束的回调函数  
  //  })
   
  
  //  },

  //  confirm:function(e) {
  //    console.log("eeeeeeeeeeeeeeeeeeeee",e)
  //   let that = this

  //   that.setData({
  //     hiddenmodalput: true
  //   },()=>{
  //     db.collection("machine_resource").doc(that.data.nowAdd).update({
  //       data:{
  //         number:_.inc(that.data.add),
  //         deficiency:0
  //       },success:res=>{
  //         wx.showToast({
  //           title: '添加成功',//提示文字
  //           duration:1100,//显示时长
  //           mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
  //           icon:'success', //图标，支持"success"、"loading"  
  //           success:function(){ 
  //             that.onShow()
  //           },//接口调用成功
  //           fail: function () { console.log("260行有问题")},  //接口调用失败的回调函数  
  //           complete: function () { } //接口调用结束的回调函数  
  //        })
  //       },fail:res=>{
  //         console.log("247有问题")
  //       }
  //       // },success:res=>{
  //       //   console.log("自增成功")
  //       //   wx.showToast({
  //       //     title: '添加成功',//提示文字
  //       //     duration:1000,//显示时长
  //       //     mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
  //       //     icon:'success', //图标，支持"success"、"loading"  
  //       //     success:function(){ that.onShow()},//接口调用成功
  //       //     fail: function () { console.log("自增有问题")},  //接口调用失败的回调函数  
  //       //     complete: function () { } //接口调用结束的回调函数  
  //       //  })
  
  
          
  //       // },fail:res=>{
  //       //   console.log("自增失败")
  //       // }
  //     })    


     


      
  //   }
  //   )
  // },

  // addNum:function(e){
  //   console.log("input失去焦点的输出内容是什么呢？？？？",e)
  //   this.setData({
  //     add: e.detail.value - '0'
  //     })
  // },


  addProduct:function(e) {
    console.log("这个e应该没问题吧,",e.currentTarget.dataset.id)
    let that = this
    that.setData({
      hiddenmodalput: !that.data.hiddenmodalput,
      nowAdd:e.currentTarget.dataset.id,
      noneValue:""
    })


    
  }
})