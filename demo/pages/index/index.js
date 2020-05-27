//index.js
//获取应用实例
const app = getApp()
const utils = require('../../utils/util')
Page({
  data: {

  },
  onLoad: function () {

  },
  tap: utils.throttle((e) => {
    // e，为传递过来的参数
    // 需要处理的逻辑
  }, 1000)
})