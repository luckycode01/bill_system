import request from "@/utils/request";
import { proxy } from "@/api/index";

// 获取菜单列表
export const getMenuList = (params) => {
  return request.reqGet(`${proxy}/system/menus/getMenuList`, params);
};
// 添加或修改菜单

// 获取所有权限（菜单）
export const getRightList = (params) => {
  return request.reqGet(`${proxy}/system/rights/getRightList`, params);
};
// 根据ID查询菜单
export const getMenuInfoById = (params) => {
  return request.reqGet(`${proxy}/system/menus/getMenuInfoById`, params);
};
// 添加或修改菜单
export const addOrUpdateMenu = (params) => {
  return request.reqPost(`${proxy}/system/menus/addOrUpdateMenu`, params);
};
// 添加或修改菜单
export const deleteMenu = (params) => {
  return request.reqPost(`${proxy}/system/menus/deleteMenu`, params);
};