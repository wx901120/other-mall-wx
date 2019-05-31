<template>
  <div class="wx-parkPayForm">
    <slot></slot>
    <p class="wx-parkPayForm__tips">
      <span class="i-icon i-icon-park-tips"></span>
      <span class="wx-parkPayForm__tipsContent">您已用积分抵换{{ deduction ? deduction : 0 }}元优惠，还需微信支付哦</span>
      <span class="wx-parkPayForm__tipsContent">每100积分抵扣1元</span>
    </p>
  </div>
</template>

<script>
  export default {
    props: {
      deduction: {
        type: Number,
      }
    }
  }
</script>

<style lang="scss" scoped>
@include b(parkPayForm) {
  margin: 0 rem(20);
  border-top: rem(20) solid #e5e5e5;
  background-color: #fff;
  border-radius: 0 0 4px 4px;

  @include e(tips) {
    display: flex;
    align-items: center;
    padding: 0 rem(20);
    height: rem(110);
    color: #ff5758;
  }
  @include e(tipsContent) {
    margin-left: rem(22);
  }
}
</style>

