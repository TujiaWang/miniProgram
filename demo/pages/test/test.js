// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prizeList:[{name:'一等奖'},{name:'二等奖'},{name:'三等奖'},{name:'四等奖'},{name:'五等奖'},{name:'六等奖'}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          rate: res.windowWidth / 750 * 2,
          w:300 * (res.windowWidth / 750 * 2),
          h:300 * (res.windowWidth / 750 * 2),
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var context = wx.createCanvasContext('lottery');
    this.drawWheel(context);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  drawWheel(context) {
    var colors = ["#000000", "#ffffff"];
    context.drawImage('../../images/award/turntable_draw.png', 0, 0, this.data.w, this.data.h);
    for (var i = 0; i < this.data.prizeList.length; i++) {
        context.beginPath()
        context.moveTo(0, 0)
        context.arc(0, 0, (this.data.w / 2) - 35, 0, (360 / this.data.prizeList.length) * Math.PI / 180)
        context.setFillStyle(colors[i % colors.length])
        context.fill()
        context.rotate((360 / this.data.prizeList.length) * Math.PI / 180);
    }
    context.draw();
  }
})