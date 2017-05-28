const Promise = require('../../util/bluebird.min');
const github = require('../../util/github');

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    searchData: null
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this

    var keys = github.getHots();
    var hiss = github.getHistorys();
    that.setData({
      searchData: {
        'keys': keys,
        'his': hiss
      }
    });

  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  }
})
