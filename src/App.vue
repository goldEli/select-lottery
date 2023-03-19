<script setup lang="ts">
import "vant/lib/index.css";
import { Button } from "vant";
import { useLotteryList } from "./api/lottery";
import { computed } from "vue";
const res = useLotteryList();

const list = computed(() => {
  return res.data.value?.value.list;
});
</script>

<template>
  <div :class="$style.box">
    <Button :type="'primary'">Select</Button>
    <ul>
      <li v-for="item in list" :key="item.lotteryDrawNum">
        <span>{{ item.lotteryDrawNum }}</span>
        <span>{{ item.lotteryDrawTime }}</span>
        <span>{{ item.lotteryDrawResult }}</span>
      </li>
    </ul>
  </div>
</template>

<style module>
.box {
  width: 375px;
}
</style>
