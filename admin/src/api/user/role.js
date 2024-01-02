import request from "@/utils/request";
import { proxy } from "@/api/index";

// 获取角色列表
export const getRoleslistReq = (params) => {
  return request.reqGet(`${proxy}/v1/roles/getRoleslist`, params);
};
// 添加或修改角色
export const addOrUpdateRoleReq = (params) => {
  return request.reqPost(`${proxy}/v1/roles/addOrUpdateRole`, params);
};

// 删除角色
export const deleteRolesReq = (params) => {
  return request.reqPost(`${proxy}/v1/roles/deleteRoles`, params);
};
