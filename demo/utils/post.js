const downloadImage = (config) => {
    wx.showLoading({
        title: '加载中...',
    })

    let imgs = config.imgs;
    let downloadAll = [];
    downloadAll.push(new Promise((resolve, reject) => {
        wx.downloadFile({
            url: config.backgroundImage,
            success(res) {
                resolve(res.tempFilePath)
            }
        })
    }))
    for (var i = 0; i < imgs.length; i++) {
        downloadAll.push(new Promise((resolve, reject) => {
            wx.downloadFile({
                url: imgs[i].imgPath,
                success(res) {
                    resolve(res.tempFilePath)
                }
            })
        }))
    }

    Promise.all(downloadAll).then((res) => {
        for (var i = 0; i < res.length; i++) {
            if (i == 0) {
                config.backgroundImage = res[i];
            } else {
                config.imgs[i - 1].imgPath = res[i];
            }
        }
        createPost(config);
    })
}
const createPost = (config) => {
    // 获取canvas标签实例
    let canvas = wx.createCanvasContext(config.canvasId);
    // 绘制背景图
    let rate = config.windowWidth / 750 * config.rate;
    canvas.drawImage(config.backgroundImage, 0, 0, config.visualWidth * rate, config.visualHeight * rate);
    let imgs = config.imgs;
    for (var i = 0; i < imgs.length; i++) {
        // 绘制小程序码和用户头像
        canvas.save();
        // 画一个圆来裁切二维码为圆形
        canvas.beginPath();
        let x = (imgs[i].width * rate) / 2 + (imgs[i].left * rate);
        let y = (imgs[i].width * rate) / 2 + (imgs[i].top * rate);
        let r = imgs[i].width / 2;
        canvas.arc(x, y, r, 0, 2 * Math.PI);

        canvas.clip();
        canvas.setFillStyle('white');
        canvas.fill();
        canvas.drawImage(imgs[i].imgPath, imgs[i].left * rate, imgs[i].top * rate, imgs[i].width * rate, imgs[i].width * rate);
        canvas.restore();
    }

    let texts = config.texts;
    for (var j = 0; j < texts.length; j++) {
        canvas.save();
        canvas.setFontSize(texts[j].fontSize);
        canvas.setFillStyle(texts[j].color);
        canvas.fillText(texts[j].label, texts[j].left * rate, texts[j].top * rate);
        canvas.restore();
    }

    canvas.draw(false, () => {
        saveCanvasToImage(config);
    })
}
const saveCanvasToImage = (config) => {
    wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        canvasId: config.canvasId,
        success: function(res) {
            wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success(res) {
                    wx.hideLoading();
                    wx.showToast({
                        icon: 'none',
                        title: '图片成功保存到相册了，快去分享朋友圈吧',
                    })
                },
                fail() {
                    wx.hideLoading();
                    wx.showModal({
                        title: '提示',
                        content: '需要您授权保存相册',
                        showCancel: false,
                        success() {
                            wx.openSetting();
                        }
                    })
                }
            })
        }
    })
}
const initPoster = (config) => {
    downloadImage(config);
}
module.exports = {
    initPoster
}