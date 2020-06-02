import{request} from "../../request/index.js";
Page({
  data: {
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },
  onShow: function(){
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart")||[];
    // 过滤后的购物车数据
    cart = cart.filter(v=>v.checked);
    this.setData({address});

    let totalPrice =0;
    let totalNum =0;
    cart.forEach(v=>{
      totalPrice += v.num*v.price;
      totalNum += v.num;
    })
    
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  },


  // 提交订单
  handleOrderPay(){
    // 判断缓存中是否有token
    const token = wx.getStorageSync("token");
    // 如果没token 跳转到授权页面 获取token
    if(!token){
      wx.navigateTo({
        url:'/pages/auth/auth'
      });
      return;
    }
    // 有token
    // 创建订单
    const orderPrice = this.data.totalPrice;
    const consigneeAddr = this.data.address.all;
    const orderParams = {orderPrice, consigneeAddr, token};
    request({
      url:"http://localhost:8080/pay/orderCreate",
      data: orderParams
    }).then(result=>{
      // 创建订单 返回订单号
      wx.showToast({
        title: '创建订单成功',
        success: (result)=>{
          wx.showToast({
            title: '支付成功'
          })
        },
      });
      // 查询订单状态

      // 手动删除缓存中 已支付的商品
      let newCart = wx.getStorageSync("cart");
      newCart = newCart.filter(v=>!v.checked);
      wx.setStorageSync("cart", newCart);

      // 支付成功 跳转到订单页面
      wx.switchTab({
        url: '/pages/cart/cart'
      });
    })
  }

})