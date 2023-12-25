import request from "@/utils/request";
import { proxy } from "@/api/index";

export const getUserlistReq = (params) => {
  return request.reqGet(`${proxy}/v1/users/getUserlist`, params);
};
