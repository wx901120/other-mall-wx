<template>
  <!-- 卡券模块 -->
    <div class="coupons border-top">
      <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
@include b(coupons) {
  height: rem(120);
}
</style>
