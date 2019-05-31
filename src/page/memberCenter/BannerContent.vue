<template>
  <div class="wx-bannerContent">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@include b(bannerContent) {
  padding-top: rem(80);
  display: flex;

}
</style>

