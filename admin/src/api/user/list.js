import request from "@/utils/request";
import { proxy } from "@/api/index";

// 获取用户列表
export const getUserlistReq = (params) => {
  return request.reqGet(`${proxy}/system/users/getUserlist`, params);
};
// 修改用户状态
export const changeUsersStateReq = (params) => {
  return request.reqPost(`${proxy}/system/users/updateUserState`, params);
};
// 更新用户
export const addOrUpdateUser = (params) => {
  return request.reqPost(`${proxy}/system/users/addOrUpdateUser`, params);
};
// 删除用户
export const deleteUser = (params) => {
  return request.reqPost(`${proxy}/system/users/deleteUser`, params);
};
