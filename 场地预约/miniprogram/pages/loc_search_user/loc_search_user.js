const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: '',
    list: [],
    people:[],//放置要添加的与会人员数据
    isAdd:[]

  },

  GetSearchInput: function(e) {
    this.setData({
        search: e.detail.value
    })
  },

  ToSearch: function (e) {
    this.setData({
      list:[],
      isAdd:[],
    })
    if (this.data.search == '') {
        wx.showToast({
            title: '请输入',
            icon: 'none'
        })
        return
    }

    db.collection('user_reserve')
    .where({
        name: db.RegExp({
           //regexp: this.data.search,
           regexp: '.*' + this.data.search+'.*', 
           options: 'i', 
        }),
    })
    .get()
    .then(res => {
        if (res.data.length != 0) {
            this.setData({
                list: res.data
            })
            console.log('搜索结果',res.data)
            
            var isAdd = new Array(res.data.length).fill(0);
            //先初始化为全0的数组
            this.setData({
              isAdd:isAdd
            })
            //然后对比people看看search结果是不是已经有人在people里面了
            for(var i=0;i<this.data.list.length;i++){
              for(var j=0;j<this.data.people.length;j++){
                if(this.data.list[i]._openid==this.data.people[j]._openid){
                  var tmp='isAdd['+i+']'
                  this.setData({
                    [tmp]:1
                  })
                }
              }
            }
         
        } else {
            wx.showToast({
                title: '未找到',
                icon: 'none'
            })
        }
    })
  },

  back(e){
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
 
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      people: this.data.people
    })
    wx.navigateBack();
  },

  add_person(e){

    console.log("list序号",e.currentTarget.dataset.index)
    var idx=e.currentTarget.dataset.index;
    var tmp='isAdd['+idx+']'
    this.setData({
      [tmp]:1
    })

    //添加person
    var add=this.data.list[idx];//该人员的数据
    let people0=this.data.people;
    people0.push(add)
    this.setData({
      people:people0
    })
    
  },

  del_person(e){
    console.log("list序号",e.currentTarget.dataset.index)
    var idx=e.currentTarget.dataset.index;
    var tmp='isAdd['+idx+']'
    this.setData({
      [tmp]:0
    })
    //删除person
    var del=this.data.list[idx];
    let people0=this.data.people;
    for(var i=0;i<people0.length;i++){
      if(people0[i]._openid==del._openid){
        people0.splice(i,1)
        break;
      }
    }
    this.setData({
      people:people0
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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