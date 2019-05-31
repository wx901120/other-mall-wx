<template>
  <!-- 图片轮播 -->
    <div class="wx-imgScroll">
      <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
@include b(imgScroll) {
  position: relative;
  height: rem(422);
  background: #a6a6a4;
}
</style>

