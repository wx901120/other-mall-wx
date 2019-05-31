<template>
  <div class="wx-goodDetail bg-white">
    <h3 class="wx-goodDetail__title">{{ productData.info.goodName }}</h3>
    <!-- <div class="wx-goodDetail__row">
      <div class="wx-goodDetail__leftTitle">简介</div>
      <div class="wx-goodDetail__rightContent">{{ productData.info.remark }}</div>
    </div> -->
    <div class="wx-goodDetail__row">
      <div class="wx-goodDetail__leftTitle">数量</div>
      <div class="wx-goodDetail__rightContent">{{ $route.params.buyNum }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'productData',

  props: {
    productData: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(goodDetail) {
  padding: rem(16) rem(26) rem(24);

  @include e(title) {
    font-size: rem(32);
    font-weight: bold;
  }

  @include e(row) {
    display: flex;
    flex-wrap: row nowrap;
    font-size: rem(26);
    margin-top: rem(24);
  }

  @include e(leftTitle) {
    width: rem(74);
      flex-shrink: 0;
  }

  @include e(rightContent) {
    color: #a8a8a8;
  }
}
</style>


