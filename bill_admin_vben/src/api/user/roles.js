import { defHttp } from '/@/utils/http/axios';

export function getUsersListApi(params, mode) {
  return defHttp.get({ url: Api.Users, params, },
  );
}