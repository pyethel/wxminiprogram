// 0 引入 用来发送请求的方法 路径补全
import{request} from "../../request/index.js";
Page({

  data: {
    // 轮播图数组
    swiperList:[],
    // 楼层数组
    floorList:[]
  },

  onLoad: function (options) {
    // 1 发送异步请求获取轮播图数据
    this.getSwiperList();
    this.getFloorList();
  },

  //获取轮播图数据
  getSwiperList(){
    request({   // 封装request
      url:"http://localhost:8080/index/swiper"
    }).then(result=>{
      this.setData({
        swiperList : result.data
      })
    })
  },
  getFloorList(){
    request({
      url:"http://localhost:8080/index/floor"
    }).then(result=>{
      this.setData({
        floorList : result.data
      })
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