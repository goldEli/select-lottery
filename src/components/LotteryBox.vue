<template>
  <div :class="$style.box">
    <div
      :class="[$style.numBox, { [$style.numBoxActive]: isActive(idx) }]"
      v-for="(num, idx) in myLottery"
      :key="idx"
    >
      {{ num }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  nums: string[];
}
const props = withDefaults(defineProps<Props>(), {});
const myLottery = ["10", "12", "24", "30", "33", "9", "12"];
const isActive = (idx: number) => {
  if (props.nums.length !== 7) {
    return false;
  }
  const left = props.nums.slice(0, 5);
  const right = props.nums.slice(5);
  const current = parseInt(myLottery[idx]);
  if (idx < 5) {
    return left.some((item) => parseInt(item) === current);
  } else {
    return right.some((item) => parseInt(item) === current);
  }
};
</script>

<style module>
.box {
  display: flex;
  gap: 8px;
}
.numBox {
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #999;
  color: #fff;
}
.numBoxActive {
  background: red;
}
</style>
