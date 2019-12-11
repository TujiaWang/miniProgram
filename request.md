## 微信小程序请求数据封装
~~~
/**
 * 请求数据
 * 使用实例
 * utils.requestUrl(app.globalData.serverUrl + '/myMes', { sessionId: wx.getStorageSync('sessionId') }, 'post').then(function (res) {console.log(res)});
 */
const requestUrl = function (url, data, method) {
    return new Promise((resolve, reject) => {
        var header;
        if (method.toUpperCase() === "POST") {
            header = { 'content-type': 'application/x-www-form-urlencoded' };
        } else {
            header = { 'content-type': 'application/json' };
        }
        wx.request({
            url: url,
            data: data,
            header: header,
            method: method.toUpperCase(),
            success: (res => {
                if (res.statusCode === 200) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            }),
            fail: (res => {
                reject(res)
            })
        })
    })
}
~~~