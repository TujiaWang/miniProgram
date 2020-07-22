// components/navbar/navbar.js
Component({
    properties:{
        isCollect:{
            type:Boolean,
            value:false
        },
        options:{
            type:Object,
            value:{
                bgcolor:'#30CC9C',
                isHidden:true
            }
        }
    },
    data: {
        isDrop:false
    },
    attached() {
        var self = this;
        let menuButtonObject = wx.getMenuButtonBoundingClientRect();
        wx.getSystemInfo({
            success(res) {
                let statusBarHeight = res.statusBarHeight,
                    navTop = menuButtonObject.top,//胶囊按钮与顶部的距离
                    navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight)*2;//导航高度
                    console.log(navTop,navHeight)
                self.setData({
                    navTop,
                    navHeight
                })
            }
        })
    },
    methods: {
        backPrev(){
            wx.navigateBack({
              delta: 1,
            })
        },
        showMenuList(){
            this.setData({
                isDrop:!this.data.isDrop
            })
        },
        doComplaint(){
            this.triggerEvent('handlercomplaint');
            this.showMenuList();
        },
        doCollect(){
            this.triggerEvent('handlercollect');
            this.showMenuList();
        }
    }
})