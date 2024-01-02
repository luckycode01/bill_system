import request from "@/utils/request";
import { proxy } from "@/api/index";

// 获取菜单列表
export const getMenuList = (params) => {
  return request.reqGet(`${proxy}/v1/menus/getMenuList`, params);
};
// 添加或修改菜单
