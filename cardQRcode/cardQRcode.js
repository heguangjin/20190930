// cardQRcode.js
const app = getApp()
let imgUrl = app.globalData.poxy.IMGURL//static文件夹图片路径前缀
let dataUrl = app.globalData.poxy.API_BASE//接口路径前缀
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shareImgSrc:'',
    bgImgPath0:'',
    bgImgPath1:'',
    bgImgPath2:'',
    bgImgPath3:'',
    bgImgPath4:'',
    bgImgPath5:'',
    bgImgPath6:'',
    bgImgPath7:'',
    // tetxArr: ['18720986997', '上海金山去亭林镇林盛路136号', 'yingbin1510000@qq.com', 'yingbin1510000'],
    // tetxArr: ['18720986997', '上海金山去亭林镇林盛路136号', 'yingbin1510000@qq.com'],
    // tetxArr: ['18720986997', '上海金山去亭林镇林盛路136号'],
    tetxArr: ['18720986997'],
    sub:0,
    canvasHeight:550,
    fUserName:'',
    dataObj:{
      fPhotoUrl: '',//名片图像
      fUserName: '',//名片名称
      fPosterUrl: '',//manage后台的海报图片
      fPosition: '',//职位
      fCorpName: '',//公司名称
      fPhone: '',//手机号
      fAddress: '',//地址（公司？）
      fMail: '',//邮箱
      fWechat: '',//微信号
      fCardUrl: '',//小程序二维码
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('options----------------%%%%%%%%%', options)
    let that = this;
    wx.setNavigationBarTitle({
      title: '名片二维码',//页面标题
    })
    if (options.shareIn) {
      this.getData(options.fPhone, options.fId)
      // 为了解决当用户通过点击名片二维码分享出去的页面进到“名片二维码”再返回到上一页（“名片列表"）没有数据的情况
      wx.setStorageSync('QRobj', {
        fPhone: options.fPhone,
        fId: options.fId
      })
    }else{
      this.getData(options.fPhone, options.fId)
      wx.setStorageSync('QRobj', {})
    }
    if (options.fromMine){
      // console.log('options.objJSON---------------',options.objJSON)
      let obj = JSON.parse(options.objJSON)
      this.imgTemPath(2, obj)
    }
  },
  getData: function (v,v2) {//请求获取数据
    let that = this
    let token = wx.getStorageSync('token').token
    if (!token) return
    wx.request({
      url: dataUrl + 'manage-api/resource/cardbag/queryCards',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Authorization': token
      },
      data: { "fOtherId": v },
      success: function (res) {
        res.data.data.forEach((element, index) => {
          if (element.fId == v2) {
            // that.setValue(element)
            console.log('element----海报数据--------------',element)
            that.imgTemPath(2, element)
          }
        })
      },
      fail: function (err) {
        // console.log('请求失败------------------')
      }
    })
  },
  /*v:1(代表不仅要画图还要保存图片到本地)) 否者只是画图
  *obj={
      fPhotoUrl: '',//名片图像
      fUserName: '',//名片名称
      fPosterUrl: v.fPosterUrl,//manage后台的海报图片
      fPosition: '',//职位
      fCorpName: '',//公司名称
      fPhone: '',//手机号
      fAddress: '',//地址（公司？）
      fMail: '',//邮箱
      fWechat: '',//微信号
      fCardUrl: '',//小程序二维码
    }
  */
  imgTemPath: function (v, obj) {//生成临时图片路径以及其他数据的获取
    let that = this;
    that.setValue(obj)
    let bgImgPath1 = that.data.dataObj.fPosterUrl ? that.data.dataObj.fPosterUrl : (imgUrl + '文章.png');
    let bgImgPath2 = that.data.dataObj.fPhotoUrl ? that.data.dataObj.fPhotoUrl : (imgUrl + '文章.png');
    let bgImgPath3 = imgUrl + '09-12-小程序海报-icon_03.png'
    let bgImgPath4 = imgUrl + '09-12-小程序海报-icon_06.png'
    let bgImgPath5 = imgUrl + '09-12-小程序海报-icon_08.png'
    let bgImgPath6 = imgUrl + '09-12-小程序海报-icon_10.png'
    let bgImgPath7 = that.data.dataObj.fCardUrl;
    // console.log('bgImgPath1--------------imgTemPath', bgImgPath1)

    wx.downloadFile({//海报图，名片头像生成临时路径失败的时候用默认的临时路径
      url: imgUrl + '智慧.png',//网络路径
      success: res => {
        console.log('智慧图片转换成功000')
        let path = res.tempFilePath //临时本地路径
        that.setData({
          bgImgPath0: path
        })
      }
    })

    wx.downloadFile({//族蚂后台图片
      url: bgImgPath1,//网络路径
      success: res => {
        console.log('族蚂后台图片转换成功111')
        let path = res.tempFilePath //临时本地路径
        // console.log('path---------------------', path)
        that.setData({
          bgImgPath1: path
        })
      },
      fail: res => {
        console.log('族蚂后台图片转换失败')
      }
    })


    wx.downloadFile({//名片图片
      url: bgImgPath2,//网络路径
      success: res => {
        console.log('名片图片转换成功111')
        let path = res.tempFilePath //临时本地路径
        that.setData({
          bgImgPath2: path
        })
      },
      fail: res => {
        console.log('名片图片转换失败')
      }
    })


    wx.downloadFile({//手机图片临时路径
      url: bgImgPath3,//网络路径
      success: res => {
        let path = res.tempFilePath //临时本地路径
        that.setData({
          bgImgPath3: path
        })
      }
    })

    wx.downloadFile({//地址图片临时路径
      url: bgImgPath4,//网络路径
      success: res => {
        let path = res.tempFilePath //临时本地路径
        that.setData({
          bgImgPath4: path
        })
      }
    })

    wx.downloadFile({//邮箱图片临时路径
      url: bgImgPath5,//网络路径
      success: res => {
        let path = res.tempFilePath //临时本地路径
        that.setData({
          bgImgPath5: path
        })
      }
    })

    wx.downloadFile({//微信图片临时路径
      url: bgImgPath6,//网络路径
      success: res => {
        let path = res.tempFilePath //临时本地路径
        that.setData({
          bgImgPath6: path
        })
      }
    })

    wx.downloadFile({//小程序二维码图片
      url: bgImgPath7,//网络路径
      success: res => {
        console.log('小程序二维码图片转换成功111')
        let path = res.tempFilePath //临时本地路径
        // console.log('path--------------', path)
        that.setData({
          bgImgPath7: path
        })
      },
      fail: res => {
        console.log('小程序二维码图片转换失败')
      }
    })

    setTimeout(() => {
      if (!that.data.bgImgPath1) {
        that.setData({
          bgImgPath1: that.data.bgImgPath0
        })
      }
      if (!that.data.bgImgPath2) {
        that.setData({
          bgImgPath2: that.data.bgImgPath0
        })
      }
      console.log('that.data.bgImgPath7------------------', that.data.bgImgPath7)
      if (!that.data.bgImgPath7) {
        that.setData({
          bgImgPath7: that.data.bgImgPath0
        })
      }
      that.mateImg(v)
      return
    }, 1500)
  },
  setValue: function(v) {//数据的赋值
    let otherObj = {
      fId: v.fId,//名片主键Id
      fPhotoUrl: v.fPhotoUrl ? v.fPhotoUrl : (imgUrl + '服务.png'),//名片图像
      fUserName: v.fUserName ? v.fUserName : '@default',//名片名称
      fPosterUrl: v.fPosterUrl ? v.fPosterUrl : (imgUrl + '服务.png'),//manage后台的海报图片
      fPosition: v.fPosition ? v.fPosition : '@default',//职位
      fCorpName: v.fCorpName ? v.fCorpName : '@default',//公司名称
      fPhone: v.fPhone ? v.fPhone : '',//手机号
      fAddress: v.fAddress ? v.fAddress : '',//地址（公司？）
      fMail: v.fMail ? v.fMail : '',//邮箱
      fWechat: v.fWechat ? v.fWechat : '',//微信号
      fCardUrl: v.fCardUrl ? v.fCardUrl : (imgUrl + 'ccc.png'),//对应的名片二维码
    }
    console.log(v.fPosterUrl,'------v.fCardUrl------------------------', v.fCardUrl)
    let textA = []
    if (otherObj.fPhone&&otherObj.fPhone.length>0){
      textA.push(otherObj.fPhone)
    }
    if (otherObj.fAddress && otherObj.fAddress.length > 0){
      textA.push(otherObj.fAddress)
    }
    if (otherObj.fMail && otherObj.fMail.length > 0){
      textA.push(otherObj.fMail)
    }
    if (otherObj.fWechat && otherObj.fWechat.length > 0){
      textA.push(otherObj.fWechat)
    }
    this.setData({
      tetxArr: textA
    })
    this.setData({
      canvasHeight: 542 - (4 - this.data.tetxArr.length) * 16,
      sub: (4 - this.data.tetxArr.length) * 16
    })
    this.setData({
      dataObj: otherObj
    })
  },
  mateImg: function (v2) {//画图
    let that = this;
    let context = wx.createCanvasContext('share');
    let bgImgPath1 = '服务.png'
    let bgImgPath2 = '服务.png'
    let bgImgPath3 = '服务.png'
    let bgImgPath4 = '服务.png'
    let bgImgPath5 = '服务.png'
    let bgImgPath6 = '服务.png'
    let bgImgPath7 = '服务.png'

    bgImgPath1 = this.data.bgImgPath1
    bgImgPath2 = this.data.bgImgPath2
    bgImgPath3 = this.data.bgImgPath3
    bgImgPath4 = this.data.bgImgPath4
    bgImgPath5 = this.data.bgImgPath5
    bgImgPath6 = this.data.bgImgPath6
    bgImgPath7 = this.data.bgImgPath7
    
    //这里是把页面上的数据写入到画布里，具体的坐标需要各位自行调整

    context.fillStyle = "#FFF";
    context.fillRect(0, 0, 280, 550);

    context.drawImage(bgImgPath1, 0, 0, 280, 186)
    
    //宽：88  高：72===========半包围的长方形=======start
    context.lineWidth = 2
    context.strokeStyle = '#fff'
    context.beginPath();
    
    //左上线
    context.moveTo(35, 58);
    context.lineTo(35, 49);
    // 横上线
    context.moveTo(35, 50);
    context.lineTo(124, 50);
    // 右边线
    context.moveTo(123, 50);
    context.lineTo(123, 123);
    // 横下线
    context.moveTo(123, 122);
    context.lineTo(35, 122);
    // 左下线
    context.moveTo(35, 123);
    context.lineTo(35, 114);
    context.closePath();
    context.stroke();
    //宽：88  高：72===========半包围的长方形=======end

    //半包围的长方形里面的文字==================start
    context.font = "bold 20px Arial";
    context.fillText("族蚂名片", 19, 84);
    context.font = "14px Arial";
    context.fillText("小程序生成", 19, 104);
    //半包围的长方形里面的文字====================end

    context.drawImage(bgImgPath2, 18, 206, 58, 58)

    context.font = "bold 15px Arial";
    context.fillStyle = "#000";
    // context.fillText("欧阳娜娜", 86, 220);
    context.fillText(that.data.dataObj.fUserName, 86, 220);

    context.font = "13px Arial";
    // context.fillText("摄影师", 86, 240);
    context.fillText(that.data.dataObj.fPosition, 86, 240);

    context.fillStyle = "#797979";
    context.font = "10px Arial";
    // context.fillText("上海族蚂信息科技有限公司", 86, 260);
    context.fillText(that.data.dataObj.fCorpName, 86, 260);

    if(this.data.tetxArr[0]){
      context.drawImage(bgImgPath3, 18, 278, 12, 12)
      context.font = "10px Arial";
      // context.fillText("18720986997", 37, 288);
      context.fillText(that.data.dataObj.fPhone, 37, 288);
    }
    if(this.data.tetxArr[1]){
      context.drawImage(bgImgPath4, 18, 298, 12, 12)
      context.font = "10px Arial";
      // context.fillText("上海金山去亭林镇林盛路136号", 37, 310);
      context.fillText(that.data.dataObj.fAddress, 37, 308);
    }
    if(this.data.tetxArr[2]){
      context.drawImage(bgImgPath5, 18, 318, 12, 12)
      context.font = "10px Arial";
      // context.fillText("yingbin1510000@qq.com", 37, 332);
      context.fillText(that.data.dataObj.fMail, 37, 328);
    }
    if(this.data.tetxArr[3]){
      context.drawImage(bgImgPath6, 18, 338, 12, 12)
      context.font = "10px Arial";
      // context.fillText("yingbin1510000", 37, 352);
      context.fillText(that.data.dataObj.fWechat, 37, 347);
    }

    context.setLineDash([3, 4])
    context.lineWidth = 0.5
    context.strokeStyle = '#797979'
    context.beginPath();
    context.moveTo(16, (364-this.data.sub));
    context.lineTo(256, (364 - this.data.sub));
    context.stroke();

    // this.circleImg(context, bgImgPath7, 90, (390 - this.data.sub), 50);
    context.drawImage(bgImgPath7, 90, (390 - this.data.sub), 100, 95)

    context.fillStyle = "#1081FF";
    context.font = "11px Arial red";
    context.fillText("长按或使用扫一扫识别小程序码查看名片", 45, (530 - this.data.sub));
    
    if(v2 == 1){
      context.draw(false, function(){
        setTimeout(()=>{
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 280,
            height: 550,
            destWidth: 280 * 10,
            destHeight: 550 * 10,
            canvasId: 'share',
            success: function (res) {
              console.log('###################', res);
              that.setData({
                shareImgSrc: res.tempFilePath
              })
              if (!res.tempFilePath) {
                wx.showModal({
                  title: '提示',
                  content: '图片绘制中，请稍后重试',
                  showCancel: false
                })
              }

              //4. 当用户点击分享到朋友圈时，将图片保存到相册========start
              wx.saveImageToPhotosAlbum({
                filePath: that.data.shareImgSrc,
                success(res) {
                  // wx.showModal({
                  //   title: '图片保存成功',
                  //   content: '图片成功保存到相册了',
                  //   showCancel: false,
                  //   confirmText: '知道了',
                  //   confirmColor: '#72B9C3',
                  //   success: function (res) {
                  //     if (res.confirm) {
                  //       console.log('用户点击确定');
                  //     }
                  //   }
                  // })
                }
                
              })
              //4. 当用户点击分享到朋友圈时，将图片保存到相册==========end
            },
            fail: function (res) {
              console.log('图片生成失败-----', res)
            }
          })
        },300)
      })
      
    }else{
      context.draw()
    }
    
  },
  //canvas画圆形图片
  circleImg: function (ctx, img, x, y, r) {
    ctx.save();
    let d = 2 * r;
    let cx = x + r;
    let cy = y + r;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI)
    // clip() 方法从原始画布中剪切任意形状和尺寸。
    // 一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内（不能访问画布上的其他区域）。您也可以在使用 clip() 方法前通过使用 save() 方法对当前画布区域进行保存，并在以后的任意时间对其进行恢复（通过 restore() 方法）。
    ctx.clip()
    ctx.drawImage(img, x, y, d, d)
    ctx.restore()
  },
  createImg: function () {
    let that = this
    let bgImgPath1 = imgUrl + 'zuma mpx_shuffling_banner_04.png';
    this.imgTemPath(1, that.data.dataObj)  
    // wx.saveImageToPhotosAlbum({
    //   filePath: that.data.shareImgSrc,
    //   success(res) {
    //     console.log('图片成功保存到相册了');
    //   },
    //   fail:()=>{
    //     console.log('图片保存失败-----')
    //   }
      
    // })
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
  onUnload: function () {

  },

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
  onShareAppMessage: function () {
    return {
      title: this.data.dataObj.fUserName+'的名片',    // 默认是小程序的名称(可以写slogan等)
      path: '/pages/index/index?shareIn=shareFromQR&fPhone=' + this.data.dataObj.fPhone + '&fId=' + this.data.dataObj.fId, // 默认是当前页面，必须是以‘/'开头的完整路径
    }
  }
})