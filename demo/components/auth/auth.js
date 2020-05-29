// components/auth/auth.js
Component({
    data: {
        authShow: false,
        authType: '',
        scope: '',
        callBack: null,
        authTypeCN:{
            userInfo:'用户信息',
            userLocation:'地理位置',
            userLocationBackground:'后台定位',
            address:'通讯地址',
            invoiceTitle:'发票抬头',
            invoice:'获取发票',
            werun:'微信运动步数',
            record:'录音',
            writePhotosAlbum:'保存到相册',
            camera:'摄像头',
            phoneNumber:'绑定手机号'
        }
    },
    methods: {
        popClose() {
            this.setData({
                authShow: false
            })
        },
        checkAuth(scope, callBack) {
            var self = this;
            if (scope && typeof callBack == 'function') {
                self.setData({
                    scope: scope,
                    callBack: callBack
                })
                wx.getSetting({
                    success(res) {
                        if (res.authSetting['scope.' + scope]) {
                            // 已经授权了
                            if (scope == 'userInfo') {
                                wx.getUserInfo({
                                    success: function(result) {
                                        return callBack(result);
                                    }
                                })
                            } else {
                                return callBack(true);
                            }
                        } else {
                            // 没有授权
                            wx.authorize({
                                scope: 'scope.' + scope,
                                success() {
                                    if (scope == 'userInfo') {
                                        wx.getUserInfo({
                                            success: function (result) {
                                                return callBack(result);
                                            }
                                        })
                                    } else {
                                        return callBack(true);
                                    }
                                },
                                fail() {
                                    var authType = 'userInfo';
                                    if (scope == 'userInfo') {
                                        authType = 'userInfo';
                                    } else if (scope == 'phoneNumber') {
                                        authType = 'phoneNumber';
                                    } else {
                                        authType = 'setting';
                                    }
                                    self.setData({
                                        authShow: true,
                                        authType: authType
                                    })
                                }
                            })
                        }
                    }
                })
            }
        },
        handleGetUserInfo(e) {
            this.popClose();
            if (e.detail.errMsg.indexOf('ok') != -1) {
                return this.data.callBack(e.detail);
            }else{
                return this.data.callBack(false);
            }
        },
        handleGetPhoneNumber(e) {
            this.popClose();
            if (e.detail.errMsg.indexOf('ok') != -1) {
                return this.data.callBack(e.detail);
            } else {
                return this.data.callBack(false);
            }
            return this.data.callBack(e.detail);
        },
        handleOpenSetting(e) {
            this.popClose();
            let authSetting = e.detail.authSetting;
            if (authSetting['scope.' + this.data.scope]) {
                return this.data.callBack(true);
            } else {
                return this.data.callBack(false);
            }
        }
    }
})