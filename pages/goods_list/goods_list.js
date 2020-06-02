/*
1 用户上滑页面 滚动条触底 开始加载下一页数据
  1 找到滚动条触底事件
  2 判断还有没有下一页数据
  3 假如没有下一页数据 弹出一个提示
  4 假如还有下一页数据 加载下一页数据
2 下拉刷新页面
  1 触发下拉刷新事件
  2 重置 数据 数组
  3 重置页码 
*/
import{request} from "../../request/index.js";
Page({
  data: {
    goodsList: []
  },
  //接口要的参数
  QueryParams:{
    pageNum:1,
    pageSize:10
  },
  // 总页数
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsList();
  },

  //获取商品列表数据
  getGoodsList(){
    request({
      url:"http://localhost:8080/goods_list/getGoodsList",
      data: this.QueryParams
    }).then(result=>{
      const total = result.data.total;
      this.totalPages = Math.ceil(total/this.QueryParams.pageSize);
      this.setData({
        goodsList : [...this.data.goodsList,...result.data.goods]
      })
    });

    // 关闭下拉刷新
    wx.stopPullDownRefresh();
  },

  handleTabsItemChange(e){
    // 获取
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({tabs})
  },

  onPullDownRefresh: function () {
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pageNum=1;
    this.getGoodsList();
  },

  onReachBottom: function () {
    if(this.QueryParams.pageNum>=this.totalPages){
      //没有下一页
      wx.showToast({
        title: '没有下一页数据',
      });
    }else{
      //还有下一页
      this.QueryParams.pageNum++;
      this.getGoodsList();
    }
  },
})