<script setup lang="ts">
import "vant/lib/index.css";
import { Button, showConfirmDialog, ActionSheet, Field } from "vant";
import { computed, ref, watchEffect } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { useLotteryList } from "../api/lottery";
import LotteryBox from "./LotteryBox.vue";
interface Props {
  drawNum: Model.Lottery.Info["lotteryDrawNum"];
}
const props = withDefaults(defineProps<Props>(), {});
const res = useLotteryList();

const list = computed(() => {
  return res.data.value?.value.list;
});

const store = useLocalStorage<string[]>("lottery-data", []);

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
const current = computed(() => {
  return list.value?.find((item) => item.lotteryDrawNum == props.drawNum);
});
</script>

<template>
  <li @click="onRemove(current?.lotteryDrawNum ?? '')" :class="$style.listItem">
    <div :class="$style.titleBox">
      <span>{{ current?.lotteryDrawNum ?? drawNum }}</span>
      <span>{{ current?.lotteryDrawTime }}</span>
      <span>{{ current?.lotteryDrawResult }}</span>
    </div>
    <LotteryBox :nums="current?.lotteryDrawResult.split(' ') ?? []" />
  </li>
</template>

<style module>
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
