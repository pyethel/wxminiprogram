// 同时发送异步次数
let ajaxTimes = 0;
export const request=(params)=>{
    ajaxTimes++;
    // 显示加载中
    wx.showLoading({
        title: "加载中",
        mask: true,
    });
    return new Promise((resolve, reject)=>{
        wx.request({
            ...params,
            success:(result)=>{
                resolve(result);
            },
            fail:(err)=>{
                reject(err);
            },
            complete:()=>{
                ajaxTimes--;
                if(ajaxTimes===0){
                    // 关闭图标
                    wx.hideLoading();
                }
            }
        });
    })
}