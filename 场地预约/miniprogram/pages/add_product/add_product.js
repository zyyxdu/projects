// pages/add_product/add_product.js
const db = wx.cloud.database()
const util = require('../../utils/utils.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      title: "增加场地",
      up_name: "haihong",
      up_img: "https://wx1.sinaimg.cn/mw1024/006cV2kkly1g45b8b243bj30sa0nqwha.jpg",
      time: "2021/10/01",
      down_num: "2",
      bg_color: "122deg,#55efc4 10%,#81ecec 63%,#ff7675 10%",
    }],
    fenlei:[],
    img:'',
    color: '',
    DATE:"",
    id:"",
     //天数
   day:[
    [false,""],
    [false,""],
    [false,""],
    [false,""],
    [false,""],
    [false,""],
    [false,""],
    [false,""],
    [false,""],
    [false,""],
    [false,""],
    [false,""],
    [false,""],
    [false,""],
    [false,""],
    [false,""],
    [false,""],
    [false,""],
    [false,""],
    [false,""],
    [false,""],
    [false,""],
    [false,""],
    [false,""],
    [false,""],
    [false,""],
    [false,""],
    [false,""],
    [false,""],
    [false,""],
    [false,""],      
    [false,""],
  ],
    isable:[
          true,true,true,true,true,true,true,true
          ,true,true,true,true,true,true,true,true
          ,true,true,true,true,true,true,true,true
          ,true,true,true,true,true,true,true,true],
    //意义不明
        user_openid:"",
        now_time:"",
        cur_date:[],

    // 被选择图片路径数组
    chooseImgs:[],
       
      
 
  },
  // 全局的 上床到外网图床的图片路径数组
  UpLoadImgs:[],
  // 上传图片
  upload_img:function(){
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;
        console.log("当前时间戳为：" + timestamp);
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.cloud.uploadFile({
          // 这个是云存储的路径
          cloudPath: '场地图片/'+timestamp+'.png',
          filePath: tempFilePaths[0], // 文件路径
          success: function(res) {
            // get resource ID
            console.log(res.fileID)
            that.setData({
              // 前面this.data里放一个  img:'',
              img:that.data.img.concat(res.fileID)
            })
            console.log(that.data.img)
          },
          fail: function(res) {
            console.log("add_product36行错误")
          }
        })
      }
    })
  },
  //删除图片
  delete: function (e) {
    let that = this
    console.log(that.data.img)
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id;
    var img= that.data.img;
    // img.splice(id,1)

    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            img: ''
          })
          console.log("e.currentTarget.dataset.src",e.currentTarget.dataset.src)
          wx.cloud.deleteFile({
            
            fileList: [e.currentTarget.dataset.src],
            success: res => {
              // handle success
              console.log(res.fileList)
            },
            fail: err => {
              console.log("add_product行错误")
            },
          })
          console.log(that.data.img)
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
      }
    })

    
  },

  chooseImg(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          // 图片数组进行拼接
          chooseImgs:[...this.data.chooseImgs,...result.tempFilePaths]
        })
      },
      fail: () => {},
      complete: () => {}
    });
  },
  // 删除图片
  removeImg(e){
    // 获取被点击的图片索引
    const {index} = e.currentTarget.dataset;
    // 获取data中的原数组
    let {chooseImgs} = this.data;
    // 删除元素
    chooseImgs.splice(index,1);
    this.setData({chooseImgs})
  },

  //提交功能
  submit:function(e){
    let that = this
    // &&e.detail.value.machine_id!==""
    // && e.detail.value.price !==""
    console.log(e)
    if(e.detail.value.name!==""&&e.detail.value.number!==""&&e.detail.value.detail!==""&&that.data.img.length!==0  ){
      
        // console.log(this.data.day)
         console.log(this.data.another)
         //引用全局变量calendar
         console.log(app.globalData.calendar)
         this.data.cur_date= app.globalData.calendar,
     
         db.collection('locations').add({
           data:{
             day_0:this.data.day,
             day_1:this.data.day,
             day_2:this.data.day,
             day_3:this.data.day,
             day_4:this.data.day,
             day_5:this.data.day,
             day_6:this.data.day,

        day_0_isAble:this.data.isable,
        day_1_isAble:this.data.isable,
        day_2_isAble:this.data.isable,
        day_3_isAble:this.data.isable,
        day_4_isAble:this.data.isable,
        day_5_isAble:this.data.isable,
        day_6_isAble:this.data.isable,
              //场地自己的信息
              name:e.detail.value.name,
              number:e.detail.value.number - '0',
              detail:e.detail.value.detail,
              image:that.data.img,
              cur_date:this.data.cur_date
           },success:function(res){
                  wx.showToast({
                    title: '提交成功',
                  })
                  wx.redirectTo({
                    url: '../check_machine_resource/check_machine_resource',
                  })
                }
              })
            }else{
                wx.showToast({
                  title: '您还有未填信息',
                  icon:"none"
                })
              }
           
    //   db.collection('locations').add({
    //     data:{
    //       name:e.detail.value.name,
    //       number:e.detail.value.number - '0',
    //       // machine_id:that.data.id - '0',
    //       detail:e.detail.value.detail,
    //       image:that.data.img,
    //       // type:parseInt(e.detail.value.type),
    //       // deficiency:0,
    //       // threshold:5,
    //       // price:e.detail.value.price - '0'
    //     },success:function(res){
    //       wx.showToast({
    //         title: '提交成功',
    //       })
    //       wx.redirectTo({
    //         url: '../check_machine_resource/check_machine_resource',
    //       })
    //     }
    //   })
    // }else{
    //   wx.showToast({
    //     title: '您还有未填信息',
    //     icon:"none"
    //   })
    // }
  },


  
  reset:function(e){
    console.log("这一步能输出吗")
    console.log("e.detail.value",e.detail.value)

    let that = this
    console.log(that.data.img)
    var img= that.data.img;
    // img.splice(id,1)
    
    console.log("that.data.img",that.data.img)
    wx.cloud.deleteFile({
      
      fileList: [that.data.img],
      success: res => {
        // handle success
        that.setData({
          img: ''
        },()=>{
          wx.showToast({
            title: '重置成功',
          })
          
        })
        console.log(res.fileList)
      },
      fail: err => {
        console.log("add_product行错误")
      },
    })

  },








  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      id:options.id
    })
    value:''
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
    var DATE = util.formatTime(new Date());
    this.setData({
      DATE:DATE.split(" ")[0]
    })
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