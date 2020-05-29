// pages/personal/award/award.js
const app = getApp()
Page({
  data: {
    url: '',
    mask: false,
    myAward: false,
    result: false,
    turn: 0,
    isTurn: false,
    prize_list: ['谢谢参与', '一等奖', '二等奖', '三等奖', '四等奖', '五等奖']
  },
  onLoad: function(options) {
    // if(options.code){
    //     this.setData({
    //         url: app.globalData.servicePath + 'guest/salesMgr/prize/drawPrize.html?authCode=' + options.code
    //     })
    // }

    this.setData({
      turn: 0
    })
  },
  viewMyAward() {
    this.setData({
      myAward: true,
      mask: true
    })
  },
  hiddenPop() {
    this.setData({
      myAward: false,
      result: false,
      mask: false
    })
  },
  startLottery() {
    var self = this;
    if (!this.data.isTurn) {
      this.setData({
        isTurn: true
      })

      var awardIndex = Math.floor(Math.random() * 6);
      console.log(awardIndex)
      var runNum = 8; //旋转8周

      // 旋转角度
      let runDeg = this.data.turn || 0;
      runDeg = runDeg + (360 - runDeg % 360) + (360 * runNum - awardIndex * (360 / 6))
      self.setData({
        turn: runDeg
      })
      setTimeout(() => {
        self.showResult(self.data.prize_list[awardIndex]);
      }, 4000)

    }
  },
  showResult(result) {
    this.setData({
      result: true,
      mask: true,
      level: result,
      isTurn: false
    })
  },
  loadMore() {
    console.log('到底了')
  }
})