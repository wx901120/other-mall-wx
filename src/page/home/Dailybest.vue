<template>
  <!-- 每日精选 -->
  <div class="wx-dailybest">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@include b(dailybest) {
  padding: 0 rem(20);
  height: rem(380);
  // background: #0066ff;
}
</style>

