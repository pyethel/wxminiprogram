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