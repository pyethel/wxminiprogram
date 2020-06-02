/*
1 onShow
  1 type
  2 发送请求 获取数据
  3 渲染页面
2 点击标题 重新发送请求 获取渲染数据

*/
import{request} from "../../request/index.js";
Page({
  data: {
    tabs:[
      {
        id:0,
        value:"全部",
        isActive:true
      },
      {
        id:1,
        value:"待付款",
        isActive:false
      },
      {
        id:2,
        value:"待收货",
        isActive:false
      },
      {
        id:3,
        value:"退货/退款",
        isActive:false
      }
    ],
    orders: []
  },
  onShow(options){
    const token = wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url:'/pages/auth/auth'
      });
      return;
    }
    // 1 获取小程序页面栈-数组 长度最大是10页面
    // 2 数组中 索引最大的页面为当前页面
    let pages = getCurrentPages();
    let currentPage = pages[pages.length-1];
    // 3 获取url上的type参数
    const {type} = currentPage.options;
    // 4 激活选中页面标题
    this.changeTitleByIndex(type-1);

    this.getOrders(type ,token);
  },
  // 激活选中
  changeTitleByIndex(index){
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({tabs})
  },
  // 获取被点击标题索引 
  handleTabsItemChange(e){
    const {index} = e.detail;
    this.changeTitleByIndex(index);
    const token = wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url:'/pages/auth/auth'
      });
      return;
    }
    this.getOrders(index+1,token);

  },
  // 获取订单列表方法
  getOrders(type, token){
    request({
      url:"http://localhost:8080/order/getOrder",
      data: {
        type: type,
        token
      }
    }).then(res=>{
      this.setData({orders: res.data});
    })
  }
})