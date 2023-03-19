import { useQuery } from "vue-query";
import http from "../utils/http";

function fetchLotteryList() {
  return http<API.Lottery.GetLotteryList.Result>(
    "https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry?gameNo=85&provinceId=0&pageSize=30&isVerify=1&pageNo=1"
  );
}
export function useLotteryList() {
  return useQuery("fetchLotteryList", fetchLotteryList);
}
