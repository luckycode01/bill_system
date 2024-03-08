import request from "@/utils/request";
import { proxy } from "@/api/index";

// 获取用户列表
export const getCategoryList = (params) => {
  return request.reqGet(`${proxy}/bill/category/getCategoryList`, params);
};
export const addorEditCategory = (params) => {
  return request.reqPost(`${proxy}/bill/category/addorEditCategory`, params);
};
export const deleteCategory = (params) => {
  return request.reqPost(`${proxy}/bill/category/deleteCategory`, params);
};
