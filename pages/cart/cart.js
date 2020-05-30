
Page({
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  onShow: function(){
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart")||[];
    this.setData({address});
    this.setCart(cart);

  },
  //点击收货地址
  handleChooseAddress(){
    wx.getSetting({
      success: (result)=>{
        // 获取权限状态
        const scopeAddress = result.authSetting["scope.address"];
        if(scopeAddress===true||scopeAddress===undefined){
          wx.chooseAddress({
            success:(result1)=>{
              let address = result1;
              address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo
              wx.setStorageSync("address", address);
            }
          })
        }else{
          wx.openSetting({
            success: (result2)=>{
              wx.chooseAddress({
                success:(result3)=>{
                  let address = result3;
                  address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo
                  wx.setStorageSync("address", address);
                }
              })
            }
          })
        }
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  // 单选
  handleItemChange(e){
    // 1 获取被修改的商品的id
    const id = e.currentTarget.dataset.id;
    // 2 获取购物车数组
    let {cart} = this.data;
    // 3 找到被修改的商品对象
    let index = cart.findIndex(v=>v.id===id);
    // 4 选中状态取反
    cart[index].checked =! cart[index].checked;
    // 5 重新设置
    this.setCart(cart);
  },
  // 设置购物车状态 重新计算 底部工具栏 全选 总价格 购买数量
  setCart(cart){
    let totalPrice =0;
    let totalNum =0;
    let allChecked = true;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice += v.num*v.price;
        totalNum += v.num;
      }else{
        allChecked = false;
      }
    })
    allChecked=cart.length!=0?allChecked:false;
    
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    });
    wx.setStorageSync("cart", cart);
  },
  // 全选
  handleItemAllChange(){
    let {cart,allChecked}=this.data;
    allChecked =!allChecked;
    cart.forEach(v=>v.checked=allChecked);
    this.setCart(cart);
  },
  // 商品数量编辑
  handleItemNumEdit(e){
    const {operation, id} = e.currentTarget.dataset;
    let {cart} = this.data;
    const index = cart.findIndex(v=>v.id===id);
    if(cart[index].num===1&&operation===-1){
      wx.showModal({
        title:'提示',
        content:'您是否要删除?',
        success:(res)=>{
          if(res.confirm){
            cart.splice(index,1);
            this.setCart(cart);
          }
        }
      })
    }else{
    cart[index].num+=operation;
    this.setCart(cart);
    }
  },
  // 点击结算
  handlePay(){
    // 1 判断收货地址
    const{address, totalNum}=this.data;
    if(!address.userName){
      wx.showToast({
        title: '没有收货地址',
        mask: false,
        success: (result)=>{},
      });
      return;
    }
    if(totalNum===0){
      wx.showToast({
        title: '没有选购商品',
        mask: false,
        success: (result)=>{},
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/pay'
    })
  }
})