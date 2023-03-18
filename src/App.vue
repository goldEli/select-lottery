<script setup lang="ts">
import "vant/lib/index.css";
import { Button } from "vant";
</script>

<template>
  <div :class="$style.box">
    <Button :type="'primary'">Select</Button>
  </div>
</template>

<style module>
.box {
}
</style>
