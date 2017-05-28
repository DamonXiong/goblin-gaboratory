const Promise = require('../../util/bluebird.min');
const github = require('../../util/github');
var app = getApp()
Page({
  data: {
    list: [],
    userInfo: {}
  },
  totle: 0,
  count: 0,
  onLoad: function () {
    
  },
  onShow: function () {
    this.data.list = []
    this.load();
  },
  load: function () {
    var list = github.getSubs();
    this.totle = list.length;
    this.count = 0;
    var that = this;
    app.getUserInfo(function (userInfo) {
      console.log(userInfo);
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

    if (0 === this.totle){
      that.setData({
        list: []
      });
    } else {
      list.map(this.get, this);
    }
  },
  get: function (item) {
    var list = this.data.list;

    var that = this;
    github.getUserInfo(item).then(function (userinfo) {
      that.count = that.count + 1;

      userinfo = Object.assign({}, item, userinfo);
      list.push(userinfo);
      that.setData({
        list: list
      });
    }).catch(function () {
      that.count = that.count + 1;
      that.setData({
        list: list
      });
    });
  }
})
