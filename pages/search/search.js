import{request} from "../../request/index.js";
Page({
  data:{
    goods:[],
    // 取消按钮
    isFocus: false,
    inpValue: ""
  },
  TimeId:-1,
  
  handleInput(e){
    // 监听输入框函数
    const {value} = e.detail;
    // 检查合法性
    if(!value.trim())
    {
      this.setData({
        goods:[],
        isFocus:false
      })
      return;
    }
    this.setData({
      isFocus:"true"
    })
    // 定时器防抖   减少发送请求次数
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(()=>{
      this.qsearch(value);
    },1000);
  },
  // 查询请求函数
  qsearch(query){
    request({
      url:"http://192.168.101.8:8080/search/query",
      data:{query:query}
    }).then(res=>{
      this.setData({
        goods:res.data
      });
    })
  },
  handleCancel(){
    this.setData({
      inpValue:"",
      isFocus:false,
      goods:[]
    })
  }
})