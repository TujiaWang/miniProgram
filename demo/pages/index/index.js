//index.js
//获取应用实例
const app = getApp()
const utils = require('../../utils/util')
Page({
  data: {
    address: ''
  },
  onLoad: function () {

  },
  tap: utils.throttle((e) => {
    // e，为传递过来的参数
    // 需要处理的逻辑
  }, 1000),
  chooseLocation() {
    app.authLocation(() => {
      wx.chooseLocation({
        success: (res) => {
          if (res.address) {
            this.setData({
              address: res.address
            })
          }
        },
      })
    })
  },
  openLocation(e) {
    app.openLocation(e.currentTarget.dataset.lat, e.currentTarget.dataset.lot)
  },
})