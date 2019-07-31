// pages/me/me.js
Page({
  data:{
    what:'jeffer'
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
     console.log(this)
    this.setData({
        what:'jeffers'
    })
    console.log(this)

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onShareAppMessage: function () {
   // return custom share data when user share.
  },
  onUnload:function(){
    // 页面关闭
  }
})