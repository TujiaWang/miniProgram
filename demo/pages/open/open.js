// pages/open/open.js
Page({
    data: {
        slideButtons: [{
            text: '编辑',
            extClass: 'test'
        }, {
            type: 'warn',
            text: '删除',
            extClass: 'test'
        }],
        showActionsheet: false,
        groups: [{
                text: '示例菜单11'
            },
            {
                text: '示例菜单22'
            },
            {
                text: '示例菜单33',
                type: 'warn'
            }
        ],
        show: false,
        buttons: [{
                type: 'default',
                className: '',
                text: '辅助操作'
            },
            {
                type: 'primary',
                className: '',
                text: '主操作'
            }
        ]
    },
    slideButtonTap(e) {
        let row = parseInt(e.currentTarget.dataset.index) + 1;
        let id = e.currentTarget.dataset.id;
        let option = e.detail.index == 0 ? '编辑' : '删除';
        console.log('第' + row + '行编号为' + id + '请求' + option)
    },
    btnClick() {
        this.setData({
            showActionsheet: true
        })
    },
    handleBtnClick(e) {
        console.log(this.data.groups[e.detail.index].text)
        this.setData({
            showActionsheet: false
        })
    },
    open() {
        this.setData({
            show: true
        })
    },
    buttontap(e) {
        console.log(this.data.buttons[e.detail.index].text)
        this.setData({
            show: false
        })
    }
})