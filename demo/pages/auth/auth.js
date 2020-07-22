// pages/auth/auth.js
Page({
    data: {

    },
    onLoad: function (options) {
        this.authorize = this.selectComponent("#auth");
    },
    sendAuth(e) {
        this.authorize.checkAuth(e.currentTarget.dataset.scope, (res) => {
            console.log(res)
        });
    }
})