import request from '@/api/request';
export default {
  reqGetWinNumList() {
    return request({
      url: `/ticai/gateway/lottery/getHistoryPageListV1.qry?gameNo=85&provinceId=0&pageSize=30&isVerify=1&pageNo=1`,
      method: 'get',
    });
  },
};
