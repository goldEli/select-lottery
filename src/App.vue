<script setup lang="ts">
import "vant/lib/index.css";
import { Button, showConfirmDialog } from "vant";
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

watchEffect(() => {
  console.log(store.value);
});

const onAdd = () => {
  store.value.push(lastedNum.value + "");
};
const onRemove = (drawNum: string) => {
  showConfirmDialog({
    title: "Title",
    message: "Delete it?",
  })
    .then(() => {
      // on confirm
      const idx = store.value.findIndex((item) => item === drawNum);
      store.value.splice(idx, 1);
    })
    .catch(() => {
      // on cancel
    });
};
const current = (drawNum: string) => {
  return list.value?.find((item) => item.lotteryDrawNum == drawNum);
};
</script>

<template>
  <div :class="$style.box">
    <Button :type="'primary'" @click="onAdd">Add</Button>
    <div :class="$style.gap"></div>
    <ul :class="$style.list">
      <li
        @click="onRemove(current(item)?.lotteryDrawNum ?? '')"
        :class="$style.listItem"
        v-for="item in store"
        :key="item"
      >
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
.gap {
  height: 8px;
}
.box {
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
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
