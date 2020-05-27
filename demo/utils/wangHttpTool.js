export default {
    rootUrl: '',
    /**
     * 接口请求方法
     * @param {*} url 接口地址
     * @param {*} params 接口所需参数对象
     * @param {*} method 接口请求方法，get、post
     */
    request(url, params, method) {
        method = method ? method : 'POST';
        return new Promise((resolve, reject) => {
            wx.request({
                url: rootUrl + url,
                method: method,
                data: params,
                success(res) {
                    resolve(res.data)
                },
                fail() {
                    reject()
                }
            })
        })
    },
    /**
     * 文件上传方法
     * @param {*} files 需要上传的文件数组
     * @param {*} callBack 上传成功的回调，返回值为数组
     * @param {*} params 上传文件时附带参数对象
     */
    uploads(files, callBack, params) {
        params = params ? params : {};
        var tasks = [];
        files.map((item) => {
            tasks.push(new Promise((resolve, reject) => {
                wx.uploadFile({
                    url: rootUrl + 'upload',
                    filePath: item,
                    name: 'file',
                    formData: params,
                    success(res) {
                        resolve(res.data)
                    },
                    fail() {
                        reject()
                    }
                })
            }))
        })
        Promise.all(tasks).then((result) => {
            return callBack && callBack(result)
        })
    }
}