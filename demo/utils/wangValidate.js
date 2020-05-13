/**
 * 表单验证
 * 主要使用策略模式
 */
class Validate {
  constructor() {
    this.init()
  }
  init() {
    this.messages = [];
    this.initMethods();
  }
  /**
   * 策略定义，可根据自己项目情况添加
   */
  initMethods() {
    var self = this;
    this.methods = {
      required(value) {
        return value.replace(/^\s+|\s+$/g, '')
      },
      email(value) {
        return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)
      },
      checkPhone(value) {
        return /^1[0-9]\d{9}$/.test(value)
      },
      checkNumber(value){
        return /^[0-9]*$/.test(value)
      },
      checkPrice(value){
        return /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(value)
      },
      equalItem(value, param) {
        return value == param
      },
      notEqual(value, param) {
        return value != param
      },
      idcard(value) {
        if (self.checkCode(value)) {
          var date = value.substring(6, 14);
          if (self.checkDate(date)) {
            if (self.checkProv(value.substring(0, 2))) {
              return true;
            }
          }
        }
        return false;
      }
    }
  }
  checkDate(val) {
    var pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
    if (pattern.test(val)) {
      var year = val.substring(0, 4);
      var month = val.substring(4, 6);
      var date = val.substring(6, 8);
      var date2 = new Date(year + "-" + month + "-" + date);
      if (date2 && date2.getMonth() == (parseInt(month) - 1)) {
        return true;
      }
    }
    return false;
  }
  checkCode(val) {
    var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    var code = val.substring(17);
    if (p.test(val)) {
      var sum = 0;
      for (var i = 0; i < 17; i++) {
        sum += val[i] * factor[i];
      }
      if (parity[sum % 11] == code.toUpperCase()) {
        return true;
      }
    }
    return false;
  }
  checkProv(val) {
    var pattern = /^[1-9][0-9]/;
    var provs = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江 ",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北 ",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏 ",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门"
    };
    if (pattern.test(val)) {
      if (provs[val]) {
        return true;
      }
    }
    return false;
  }
  /**
   * 传入自定义参数的验证
   */
  commonCheck(item, data) {
    for (var i = 0; i < item.length; i++) {
      if (item[i].param) {
        if (!this.methods[item[i].fun](data, item[i].param)) {
          return i;
        }
      } else {
        if (!this.methods[item[i].fun](data)) {
          return i;
        }
      }
    }
    return -1;
  }
  /**
   * 对于必填项的判断
   */
  checkItem(item, data) {
    if (item[0].fun != 'required') {
      if (data) {
        return this.commonCheck(item, data)
      } else {
        return -1
      }
    } else {
      return this.commonCheck(item, data)
    }
  }
  /**
   * 表单验证的主方法
   */
  validateForm(rules, data) {
    for (var key in rules) {
      let status = this.checkItem(rules[key], data[key]);
      if (status != -1) {
        this.messages.push({
          'message': rules[key][status]['message']
        })
      }
    }
    return this.messages.length === 0;
  }
}

module.exports = {
  Validate
}