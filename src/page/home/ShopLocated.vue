<template>
  <!-- 入驻店铺 -->
  <div class="wx-shopsLocated">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ShopLocated',
};
</script>

<style lang="scss" scoped>
@include b(shopsLocated) {
  height: rem(300);
  border-bottom: 1px solid #dcdcdc;
}
</style>

