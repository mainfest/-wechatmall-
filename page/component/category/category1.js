var app = getApp()
Page({
  data: {
    categories: [],
    detail: [],
    curIndex: 0,
    isScroll: true,
    toView: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    loadingHidden: false, // loading
    userInfo: {},
    swiperCurrent: 0,
    selectCurrent: 0,
    activeCategoryId: 0,
    goods: [],
    scrollTop: "0",
    loadingMoreHidden: true,
  },
  onLoad() {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/shop/goods/category/all',
      success: function (res) {
        console.log("onready")
        var categories = [{ id: 0, name: "全部", icon: "../../../image/all.jpg" }];
        for (var i = 0; i < res.data.data.length; i++) {
          categories.push(res.data.data[i]);

        }
        that.setData({
          categories: categories,

          curIndex: 0,
        });
        that.getGoodsList(0);
      }
    })
  },

  switchTab(e) {
    this.setData({
      toView: e.target.dataset.id,
      curIndex: e.target.dataset.index,

    })
    this.getGoodsList(this.data.toView);
  },
  getGoodsList: function (categoryId) {
    if (categoryId == 0) {
      categoryId = "";
    }
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/shop/goods/list',
      data: {
        categoryId: categoryId
      },
      success: function (res) {
        that.setData({
          detail: res.data.data,
          loadingMoreHidden: true
        });
        var detail = [];
        if (res.data.code != 0 || res.data.data.length == 0) {
          that.setData({
            loadingMoreHidden: false,
          });
          return;
        }
        for (var i = 0; i < res.data.data.length; i++) {
          detail.push(res.data.data[i]);
        }
        that.setData({
          detail: detail,
        });
      }
    })
  }
})