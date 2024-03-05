import request from "@/utils/request";
import { proxy } from "./index";

// 登录方法
export const login = (params) => {
  return request.reqPost(`${proxy}/system/login`, params);
};
// 发送短信
export const sendMsg = (params) => {
  return request.reqPost(`${proxy}/system/sendMsg`, params);
};

// 获取用户详细信息
export function getInfo(params) {
  return request.reqGet(`${proxy}/system/users/getUserInfo`, params);
}

// 退出方法
export function logout(params) {
  return request.reqPost("/system/logout", params);
}

// 获取验证码
export function getCodeImg(params) {
  return request.reqPost("/system/captchaImage", params);
}
