<template>
  <div class="wx-parkPayBtn">
    <div class="wx-parkPayBtn__total">实付款：￥{{ actuallyPaid }}</div>
    <div class="wx-parkPayBtn__btn" @click="toPay()">立即支付</div>
  </div>
</template>

<script>
  export default {
    name: 'parkPayBtn',

    props: {
      actuallyPaid: {
        type: Number,
      }
    },

    methods: {
      toPay() {
        this.$emit('toPay');
      }
    }
  }
</script>

<style lang="scss" scoped>
@include b(parkPayBtn) {
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: rem(36);
  background-color: #fff;

  @include e(total) {
    padding: 0 rem(36);
    // width: rem(550);
    color: #ff5758;
  }

  @include e(btn) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: rem(200);
    height: rem(100);
    color: #fff;
    background-color: #ff5758;
  }
}
</style>

