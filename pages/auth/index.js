import {
  request
} from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime";
import {
  login
} from "../../utils/asyncWx.js"

Page({
  // 获取用户信息
  async handleGetUserInfo(e) {
    try {
      // 获取用户信息
      const {
        encryptedData,
        rawData,
        iv,
        signature
      } = e.detail;
      // 获取小程序登录成功后的code
      const {
        code
      } = await login();
      const loginParams = {
        encryptedData,
        rawData,
        iv,
        signature,
        code
      };
      // 发送请求 获取用户token
      // 获取不到，先用假数据当token
      // const {token} = await request({
      //   url: "/users/wxlogin",
      //   data: loginParams,
      //   methods: 'post'
      // })
      // const token = 'helloworld.abc123'
      const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
      // 把token存入缓存中 同时跳转回上一个页面
      wx.setStorageSync("token", token);
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error);
    }
  }
})