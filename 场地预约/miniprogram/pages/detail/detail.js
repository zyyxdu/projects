// pages/detail/detail.js
const db = wx.cloud.database()
// const _ = db.command
const locations = db.collection('locations')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locations:[],
   
    // fenlei:[],
    img:'',
    // color: '',
    // DATE:"",
    id:"",
    loc_id:''
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.id = options.id
    //传入id的值
    console.log(options.id)
    locations.doc(options.id).get()
    .then(res=>{
      console.log(res)
      this.setData({
        locations:res.data,
       
      })
      console.log(locations)
    })
    
  },

  //设置不可预约时间
  settime(){
    console.log(this.data.id)
    var loc_id=this.data.id;
    //console.log("e",e);
    console.log(loc_id);
    wx.navigateTo({
     // url: '/pages/loc_reserve/loc_reserve'
    //   url: '/pages/locreserve_test2/locreserven_test2?loc_id=' + loc_id,
      url: '/pages/locreserve_set/locreserve_set?loc_id=' + loc_id,
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


  
  //提交功能
  submit:function(e){
    let that = this
    // &&e.detail.value.machine_id!==""
    // && e.detail.value.price !==""
    console.log(e)
    if(e.detail.value.name!==""&&e.detail.value.number!==""&&e.detail.value.detail!=="" ){
      locations.doc(this.data.id).update({
        data:{
          name:e.detail.value.name,
          number:e.detail.value.number - '0',
          // machine_id:that.data.id - '0',
          detail:e.detail.value.detail,
          image:that.data.img,
          // type:parseInt(e.detail.value.type),
          // deficiency:0,
          // threshold:5,
          // price:e.detail.value.price - '0'
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
  },
  //删除场地
  delete(){
    let that = this
    wx.showModal({
      title: '提示',
      content: '请问是否删除？',     
      success: function (res) {
        if (res.confirm) {
          console.log(that.data.id)//事件的id
          wx.cloud.callFunction({
            name: 'delMessage',
            data: {
              youid: that.data.id,
            },
            success: function (res) {
              console.log(res);
              wx.navigateTo({
                url: '../check_machine_resource/check_machine_resource',
              })
            },
            error:function(res){
console.log(res);
            }
          })
        }
      }
    })
    // locations.doc(this.data.id).remove()
    // .then(res=>{

    // })

  },


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
          cloudPath: '医用物品img/'+timestamp+'.png',
          filePath: tempFilePaths[0], // 文件路径
          success: function(res) {
            // get resource ID
            console.log(res.fileID)
            that.setData({
              // 前面this.data里放一个  img:'',
              img:that.data.img.concat(res.fileID)
            })
          },
          fail: function(res) {
            console.log("add_product36行错误")
          }
        })
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