// pages/auth/auth.js
import{request} from "../../request/index.js";
Page({
  // 获取用户信息
  handleGetUserInfo(e){
    try{
      console.log(e.detail);
      const {rawData} = e.detail;
      let token;
      // 调用微信登录api 获取登录成功后的code值
      wx.login({
      success:res=>{
        console.log(res);
        const {code} = res;
        if(code){            
          request({
            // 存入用户信息 获取token
            url:"http://localhost:8080/user/login",
            data: {
              rawData: rawData,
              code: code
            }
            }).then(result=>{
              token = result.data;
              // token存入缓存中
              console.log("token:"+token);
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
})