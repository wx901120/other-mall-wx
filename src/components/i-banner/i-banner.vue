<template>
  <div class="i-banner">
    <slot name="bannerImg"></slot>
  </div>
</template>

<style lang="scss" scoped>
@import "src/assets/style/mixin.scss";

.i-banner {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: rem(420);
  img {
    width: 100%;
  }
}
</style>
