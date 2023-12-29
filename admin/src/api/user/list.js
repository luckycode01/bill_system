import request from "@/utils/request";
import { proxy } from "@/api/index";

// 获取用户列表
export const getUserlistReq = (params) => {
  return request.reqGet(`${proxy}/v1/users/getUserlist`, params);
};
// 修改用户状态
export const changeUsersStateReq = (params) => {
  return request.reqPost(`${proxy}/v1/users/updateUserState`, params);
};
// 获取角色列表
export const getRoleListReq = (params) => {
  return request.reqGet(`${proxy}/v1/roles/getRoleslist`, params);
};
// 更新用户
export const addOrUpdateUser = (params) => {
  return request.reqPost(`${proxy}/v1/users/addOrUpdateUser`, params);
};
// 删除用户
export const deleteUser = (params) => {
  return request.reqPost(`${proxy}/v1/users/deleteUser`, params);
};
