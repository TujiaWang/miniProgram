//app.js
App({
    onLaunch: function() {
        let self = this;
        wx.getSystemInfo({
            success(res) {
                self.globalData.systemInfo = res;
            }
        })
    },
    globalData: {
        userInfo: null,
        systemInfo: null
    }
})