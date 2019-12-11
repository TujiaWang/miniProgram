## 微信小程序倒计时
~~~
/**
 * 倒计时
 * @param  endTime  倒计时结束时间
 * @param  that  对象指针
 */
const countCurrentEndTime = function(endTime, that) {
    var ss = endTime - new Date().getTime();
    if (ss <= 0) {
        that.getInfos('');
    }
    var seconds = (ss) / 1000;

    var hours = (seconds / 3600) | 0;
    var mins = (seconds / 60 - hours * 60) | 0;
    var secs = (seconds - hours * 3600 - mins * 60) | 0;

    that.setData({
        endTime: format(hours) + ':' + format(mins) + ':' + format(secs)
    });

    setTimeout(function() {
        countCurrentEndTime(endTime, that);
    }, 1000);
}
~~~