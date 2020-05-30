// pages/auth/auth.js
import{request} from "../../request/index.js";
Page({
  // 获取用户信息
  handleGetUserInfo(e){
    try{
      const {rawData} = e.detail;
      let token;
      // 调用微信登录api 获取 code
      wx.login({
      success(res){
        if(res.code){            
          request({
            // 存入用户信息 获取token
            url:"http://192.168.101.8:8080/user/login",
            data: {
              rawData: rawData,
              code: res.code
            },
            }).then(result=>{
              token = result.data;
              // token存入缓存中
              wx.setStorageSync("token", token);
            })
            wx.navigateBack({
              delta: 2
            });
        }
      }
      });
    }catch(error)
    {
      console.log(error);
    }
  },
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})