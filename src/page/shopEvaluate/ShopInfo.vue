<template>
  <div class="wx-shopInfo">
    <img class="wx-shopInfo__logo" :src="shopInfo.logoPath"/>
    <div class="wx-shopInfo__shopDetail">
      <span class="type">{{ shopInfo.c_title }}</span>
      <span class="address">{{ shopInfo.address }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopLogo',

  props: {
    shopInfo: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(shopInfo) {
  text-align: center;
  @include e(logo) {
    margin: 0 auto 0;
    width: rem(142);
    height: rem(70);
    // background: #f0f;
  }

  @include e(shopDetail) {
    margin-top: rem(20);
    color: #898888;
    text-align: center;
  }
}
</style>

