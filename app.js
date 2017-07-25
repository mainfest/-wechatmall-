App({
  onLaunch: function () {
    console.log('test');
    var that = this;
    //  获取商城名称
    wx.request({
      url: 'https://api.it120.cc/' + that.globalData.subDomain + '/config/get-value',
      data: {
        key: 'mallName'
      },
      success: function (res) {
        wx.setStorageSync('mallName', res.data.data.value);
      }
    })
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false
  },
    globalData: {
    userInfo: null,
    subDomain: "lmgb"
  }
})
