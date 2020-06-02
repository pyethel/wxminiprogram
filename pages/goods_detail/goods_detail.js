/*
1 发送请求获取数据
2 加入购物车
  1 绑定点击事件
  2 获取缓存中的购物车数据 数组格式
  3 先判断 当前的商品是否已经存在购物车
  4 已经存在 修改商品数据 执行购物车数量++ 重新把购物车数组填充回缓存中。
  5 不存在购物车数组中 直接给购物车数组添加一个新元素 购买数量属性num 填充回缓存中
  6 弹出提示
*/
import{request} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  //商品对象
  GoodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goodsId}=options;
    this.getGoodsDetail(goodsId);
    
  },
  getGoodsDetail(goodsId){
    request({
      url:"http://localhost:8080/goods_detail/getGoodsDetail",
      data:{goodsId}
    }).then(result =>{
      this.setData({goodsObj: result.data});
      this.GoodsInfo = result.data;
    });
  },
  //点击加入购物车
  handleCartAdd(){
    // 1 获取缓存中的购物车 数组
    let cart = wx.getStorageSync("cart")||[];
    // 2 判断商品对象是否存在于购物车数组中
    let index = cart.findIndex(v=>v.id===this.GoodsInfo.id);
    if(index===-1){
      // 不存在
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked=true;
      cart.push(this.GoodsInfo);
    }else{
      // 已存在
      cart[index].num++;
    }
    // 把购物车重新添加缓存
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: 'true',
    })
  }
})