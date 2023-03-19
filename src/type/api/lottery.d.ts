declare namespace API.Lottery {
  namespace GetLotteryList {
    type Params = {};
    type Result = {
      value: {
        list: Model.Lottery.Info[];
      };
    };
  }
}
