import request from "@/utils/request";
import { proxy } from "@/api/index";

export const getUserlistReq = (params) => {
  return request.reqGet(`${proxy}/v1/users/getUserlist`, params);
};
export const changeUsersStateReq = (params) => {
  return request.reqPost(`${proxy}/v1/users/updateUserState`, params);
};
export const getRoleListReq = (params) => {
  return request.reqGet(`${proxy}/v1/roles/getRoleslist`, params);
};
