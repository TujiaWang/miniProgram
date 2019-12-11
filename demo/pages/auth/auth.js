// pages/auth/auth.js
Page({
    data: {

    },
    onLoad: function (options) {
        this.authorize = this.selectComponent("#auth");
    },
    sendAuth() {
        this.authorize.checkAuth('userInfo', (res) => {
            console.log(res)
        });
    }
})