<template>
  <div class="wx-qcoreArea">
    <div class="wx-qcoreArea__mNum">会员卡号</div>
    <qriously class="qrcodebox"
              :value="cardNumber"
              :size="200" />
  </div>
</template>

<script>
export default {
  name: 'popupContent',

  props: {
    cardNumber: {
      type: String,
      default: '',
    },
  },
};
</script>


<style lang="scss" scoped>
@include b(qcoreArea) {
  width: rem(600);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  z-index: 97;
  text-align: center;
  background-color: #fff;
  .qrcodebox {
    padding: rem(20);
  }
  img {
    width: 65%;
    display: block;
    padding: 30px 0;
    margin: 0 auto;
  }

  @include e(mNum) {
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #000;
    color: #fff;
    font-size: 14px;
  }
}
</style>

