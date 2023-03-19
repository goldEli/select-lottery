<script setup lang="ts">
import "vant/lib/index.css";
import { Button } from "vant";
import { useLotteryList } from "./api/lottery";
import { computed, watch, watchEffect } from "vue";
import { useLocalStorage } from "@vueuse/core";
import LotteryBox from "./components/LotteryBox.vue";
const res = useLotteryList();

const list = computed(() => {
  return res.data.value?.value.list;
});
const lastedNum = computed(() => {
  return parseInt(list.value?.[0].lotteryDrawNum ?? "") + 1;
});
const store = useLocalStorage<string[]>("lottery-data", []);
const myLottery = ["10", "12", "24", "30", "33", "9", "12"];

watchEffect(() => {
  console.log(store.value);
});

const onAdd = () => {
  store.value.push(lastedNum.value + "");
};
const current = (drawNum: string) => {
  return list.value?.find((item) => item.lotteryDrawNum == drawNum);
};
</script>

<template>
  <div :class="$style.box">
    <Button :type="'primary'" @click="onAdd">Add</Button>
    <ul :class="$style.list">
      <li :class="$style.listItem" v-for="item in store" :key="item">
        <div :class="$style.titleBox">
          <span>{{ item ?? current(item)?.lotteryDrawNum }}</span>
          <span>{{ current(item)?.lotteryDrawTime }}</span>
          <span>{{ current(item)?.lotteryDrawResult }}</span>
        </div>
        <lottery-box
          :nums="current(item)?.lotteryDrawResult.split(' ') ?? []"
        />
      </li>
    </ul>
  </div>
</template>

<style module>
.box {
  width: 375px;
}
.list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.listItem {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.titleBox {
  display: flex;
  gap: 8px;
}
</style>
