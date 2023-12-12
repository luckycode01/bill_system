import request from "@/utils/request";
import { proxy } from "./index";

// 登录方法
export const login = (params) => {
  return request.reqPost(`${proxy}/v1/login`, params);
};

// 获取用户详细信息
export function getInfo(params) {
  return request.reqGet(`${proxy}/v1/users/getUserInfo`, params);
}

// 退出方法
export function logout(params) {
  return request.reqPost("/v1/logout", params);
}

// 获取验证码
export function getCodeImg(params) {
  return request.reqPost("/v1/captchaImage", params);
}
