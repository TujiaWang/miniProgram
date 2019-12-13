// pages/poster/poster.js
let poster = require('../../utils/post.js');
const app = getApp();
Page({
    data: {
        current:1,
        banners:[
            {
                img:'../../images/bg1.jpg' // 地址需提供网络地址
            },
            {
                img: '../../images/bg2.jpg'
            },
            {
                img: '../../images/bg3.jpg'
            },
            {
                img: '../../images/bg4.jpg'
            }
        ],
        userInfo:{
            avatarUrl:'',
            nickName:''
        }
    },
    onLoad: function (options) {
        let self = this;
        this.authorize = this.selectComponent("#auth");
        this.authorize.checkAuth('userInfo', (res) => {
            self.setData({
                userInfo: JSON.parse(res.rawData)
            })
        });
    },
    savePoster(){
        let self = this;
        this.authorize.checkAuth('writePhotosAlbum', (res) => {
            let config = {
                canvasId: 'poster',
                windowWidth: app.globalData.systemInfo.windowWidth, // 可使用窗口宽度
                visualWidth: 500, // 海报设计稿的宽度
                visualHeight: 900, // 海报设计稿的高度
                backgroundImage: self.data.banners[self.data.current].img, // 海报的背景图
                rate: 2, // 生成海报图时放大的倍数
                imgs: [
                    { imgPath: self.data.userInfo.avatarUrl, width: 80, left: 400, top: 780 }, // 绘制二维码
                    { imgPath: self.data.userInfo.avatarUrl, width: 60, left: 20, top: 20 } // 绘制用户头像
                ],
                texts: [
                    { label: self.data.userInfo.nickName, color: '#333', fontSize: 20, left: 100, top: 50 } // 绘制用户昵称
                ]
            }
            poster.initPoster(config);
        });
    }
})