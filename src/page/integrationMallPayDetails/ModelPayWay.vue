<template>
  <div class="wx-payWay"
       v-if="productData.allIntegral">
    <div class="wx-payWay__row title">
      <div class="wx-payWay__leftTitle pay-way-select">选择支付方式</div>
      <div class="wx-payWay__rightContent color-theme">我的可用积分：{{ productData.allIntegral }}</div>
    </div>

    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ModelPayWay',

  props: {
    productData: {
      type: Object,
    },
  },
};
</script>


<style lang="scss" scoped>
@include b(payWay) {
  border-top: rem(20) solid #f0eff4;
  line-height: rem(84);
  font-size: rem(26);
  background-color: #fff;

  @include e(row) {
    padding: 0 rem(26);
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }

  @include e(leftTitle) {
    flex-shrink: 0;
    color: #333333;
    font-size: rem(30);
    font-weight: bold;
  }

  @include e(rightContent) {
    color: #999999;
  }
}
</style>
