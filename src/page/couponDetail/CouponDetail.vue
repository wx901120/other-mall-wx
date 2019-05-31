<template>
  <div class="wx-couponDetails" v-if="couponsContent">
    <h3 class="wx-couponDetails__title">卡券详情</h3>
    <div class="wx-couponDetails__content">
      <p v-if="couponsContent.useType == 1">券的金额：{{couponsContent.cardMoney }}元</p>
      <p>使用条件：{{ couponsContent.useRule }}</p>
      <p v-if="couponsContent.useType == 3">券的折扣：{{ couponsContent.cardMoney }}</p>
      <p v-if="couponsContent.useType == 2">市场价值：{{ couponsContent.cardMoney }}</p>
      <p v-if="couponsContent.useType == 4">券的金额：{{ couponsContent.cardMoney }}</p>
      <p v-if="couponsContent.storeName">适用店铺：{{ couponsContent.storeName }}</p>
      <p>使用须知：{{ couponsContent.couponsContent }}</p>
      <!-- <p v-html="couponsContent.couponsContent"></p> -->
      <!-- <p class="coupon-details-row">1.凭此券可以在GAGA鲜语店铺消费后使用。</p>
        <p class="coupon-details-row">2.本券仅限于万科城市广场GAGA鲜语店内使用</p>
        <p class="coupon-details-row">3.本券需要下载才能使用。</p> -->
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    couponsContent
  },
};
</script>

<style lang="scss">
@include b(couponDetails) {
  margin: rem(50) rem(50) 0;
  padding: rem(10) 0 0;
  border-top: 1px dashed #b2b2b2;

  @include e(title) {
    line-height: rem(50);
    font-size: rem(32);
    font-weight: bold;
    color: #000;
    padding-bottom: rem(10);
  }

  @include e(content) {
    font-size: rem(28);
    color: #999999;
    .coupon-detail-row {
      line-height: rem(34);
    }

    img {
      width: 100%;
    }
  }
}
</style>


