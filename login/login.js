// pages/login/login.js
const app = getApp();
let imgurl = app.globalData.poxy.IMGURL;
let dataUrl = app.globalData.poxy.API_BASE //接口路径前缀
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginState: true,
    index: -1,
    login: true,
    assgin: "",
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, "*******((((((((")
    if (options.assgin) {
      this.setData({
        assgin: options.assgin
      })
    }
    // wx.hideTabBar({
    //   animation: true //是否需要过渡动画
    // })
  },
  bindGetUserInfo(e) {
    let _this = this;
    wx.login({
      fail: err => { },
      success: ces => {
        let code = ces.code;
        wx.getUserInfo({
          success: function (res) {
            console.log(res)
            wx.setStorageSync("WechatRawData", res.rawData);
            wx.showLoading({
              title: '加载中',
            })
            wx.request({
              url: dataUrl + 'manage-api/resource/carduser/getAuthCode2',
              data: {
                code: code,
                signature: res.signature,
                rawData: res.rawData,
                encryptedData: res.encryptedData,
                iv: res.iv
              },
              header: {
                'content-type': 'application/json'
              },
              success: res => {
                console.log(res, "----=---", res.data.status, _this.data.assgin)
                //写入本地缓存;
                wx.hideLoading();
                if (res.statusCode == 200) {
                  if (res.data.status == 200) {
                    let _data = res.data.data;
                    wx.setStorageSync('token', {
                      token: _data.token,
                      unionId: _data.unionId,
                      zmCookie: _data.zmCookie
                    });
                    wx.setStorageSync('taskStatus', _data.taskStatus);
                    wx.setStorageSync('activity', _data.activity);
                    _this.setData({
                      loginState: false,
                      login: false
                    }, () => {
                      try {
                        if (_data.phone == "") {
                          wx.navigateTo({
                            url: '../component/getPhone/getPhone?assign=' + _this.data.assgin //获致手机号页面返回的页数;
                          })
                        } else {
                          wx.setStorageSync('phone', _data.phone);
                          if (_data.zmToken == "") {
                            wx.navigateTo({
                              url: '../component/getPhone/getPhone?assign=' + _this.data.assgin //获致手机号页面返回的页数;
                            })
                          } else {
                            wx.setStorageSync('zmToken', _data.zmToken);
                          }
                          if (_this.data.assgin != "") {
                            wx.navigateBack({
                              delta: 1
                            })
                          }
                        }
                      } catch (err) {

                      }
                    });
                  } else {
                    wx.showModal({
                      content: '授权失败！请重新授权！',
                      showCancel: false,
                      confirmText: "我知道了",
                      success(res) {
                        if (res.confirm) {
                          console.log('用户点击确定')
                        }
                      }
                    })
                    console.log("登录接口异常")
                  }
                } else {
                  wx.showModal({
                    content: '授权失败！请重新授权！',
                    showCancel: false,
                    confirmText: "我知道了",
                    success(res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                      }
                    }
                  })
                }
              }
            })
          },
          fail: function (err) {
            wx.hideLoading();
            wx.showModal({
              content: '授权失败！请重新授权！',
              showCancel: false,
              confirmText: "我知道了",
              success(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
            // _this.setData({
            //   loginState: false,
            //   login: false
            // });
            // try {
            //   _this.triggerEvent('myevent', {
            //     loginState: false
            //   });
            // } catch (err) {

            // }
          }
        })
      }
    })

  },
  addAnimation(event) {
    let _this = this;
    console.log(event)
    this.setData({
      loginState: false,
      login: false
    }, () => {
      try {
        this.triggerEvent('compontpass', {
          compontpass: true
        });

      } catch (err) {

      }
      if (_this.data.assgin != "") {
        wx.navigateBack({
          delta: 1
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var shareObj = {
      title: "能够关联网站、公众号、小程序的智能微信名片！",
      path: "/pages/index/index",
      imageUrl: imgurl + '智慧.png'
    }
    return shareObj;
  }
})