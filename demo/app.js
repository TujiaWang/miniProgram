//app.js
App({
  onLaunch: function () {
    let self = this;
    wx.getSystemInfo({
      success(res) {
        self.globalData.systemInfo = res;
      },
    });
  },
  globalData: {
    userInfo: null,
    systemInfo: null,
  },
  openLocation(latitude, longitude) {
    wx.openLocation({
      latitude: Number(latitude),
      longitude: Number(longitude),
    });
  },
  authLocation(callBack) {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting && res.authSetting["scope.userLocation"]) {
          return callBack && callBack();
        } else {
          wx.authorize({
            scope: "scope.userLocation",
            success() {
              return callBack && callBack();
            },
            fail() {
              wx.showModal({
                content: "请在设置里勾选地理位置",
                showCancel: false,
                success() {
                  wx.openSetting({
                    success: (result) => {
                      if (
                        result.authSetting &&
                        res.authSetting["scope.userLocation"]
                      ) {
                        return callBack && callBack();
                      }
                    },
                  });
                },
              });
            },
          });
        }
      },
    });
  },
});
