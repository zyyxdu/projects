const app = getApp()
const db=wx.cloud.database();
const _=db.command
const user_reserve = db.collection('user_reserve')

Page({
      /**
       * 页面的初始数据
       */
      data: {
            showShare: false,
            // poster: JSON.parse(config.data).share_poster,
            userInformation:[]
      },
      onShow() {
            let that = this;
            this.setData({
                  userinfo: app.userinfo
            })
            wx.getStorage({
              key: 'openid',
              success(res) {
                  that.setData({
                      openid:res.data,
                  },()=>{
                        that.getUserInformation();
                  })
                  console.log(that.data.openid)
                 }
            })
            console.log(that.data.openid)
      },
      //获取用户信息
      getUserInformation: function (){
            let that = this;
            that.data.openid
            db.collection('user_reserve').where({
                  _openid: this.data.openid
           }).get({
             success: (res) => {
               console.log(res.data[0])
               this.setData({
                  userInformation:res.data[0]
                 })
             }
           })

      },

    //提交修改
    submit: function(e){
      let that = this
      // &&e.detail.value.machine_id!==""
      // && e.detail.value.price !==""
      console.log(e)
      if(e.detail.value.teacher!==""&&e.detail.value.name!==""&&e.detail.value.tel!==""&&e.detail.value.college!==""&&e.detail.value.number!=="" ){
        user_reserve .doc(that.data.userInformation._id).update({
          data:{
            teacher:e.detail.value.teacher,
            name:e.detail.value.name,
            tel:e.detail.value.tel,
            num:e.detail.value.num - '0',
            // machine_id:that.data.id - '0',
            college:e.detail.value.college,
            // image:that.data.img,
            // type:parseInt(e.detail.value.type),
            // deficiency:0,
            // threshold:5,
            // price:e.detail.value.price - '0'
          },success:function(res){
            wx.showToast({
              title: '提交成功',
            })
            wx.redirectTo({
              url: '../userList/userList',
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

    //删除该用户信息
    delete(){
      let that = this
      wx.showModal({
        title: '提示',
        content: '请问是否删除？',     
        success: function (res) {
          if (res.confirm) {
            console.log(that.data.userInformation._id)//事件的id
            wx.cloud.callFunction({
              name: 'delUserInfo',
              data: {
                userid:that.data.userInformation._id,
              },
              success: function (res) {
                console.log(res);
                wx.navigateTo({
                  url: '../userList/userList',
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
})