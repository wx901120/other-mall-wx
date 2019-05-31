<template>
  <div class="wx-parkInfo">
    <h3 class="wx-parkInfo__title">印象城 INCITIY</h3>
    <p class="wx-parkInfo__address">地址：深圳市罗湖区解放路1002号</p>

    <p class="wx-parkInfo__rate">费率：5元/小时</p>
    <p class="wx-parkInfo__paymentIntro">缴费说明</p>

    <div class="wx-parkInfo__remaingSpace">
      <span class="wx-parkInfo__remaingSpaceNum">2000</span>剩余车位
    </div>
  </div>
</template>

<script>
export default {
  name: 'ParkInfo',
};
</script>


<style lang="scss" scoped>
@include b(parkInfo) {
  position: relative;
  width: rem(730);
  height: rem(410);
  margin: 0 auto;
  padding: rem(78) rem(30) 0;
  // background-image: url("./image/parkIndex_banner.jpg");
  // background-repeat: no-repeat;
  // background-size: 100% auto;
  // background-color: #aab2b2;
  color: #fff;

  @include e(title) {
    font-size: rem(36);
    color: #fff;
  }

  @include e(address) {
    margin-top: rem(14);
    font-size: rem(24);
  }

  @include e(rate) {
    margin-top: rem(130);
    font-size: rem(24);
  }

  @include e(paymentIntro) {
    margin-top: rem(14);
    width: rem(120);
    line-height: rem(40);
    text-align: center;
    background-color: #ff5152;
  }

  @include e(remaingSpace) {
    position: absolute;
    right: rem(24);
    bottom: rem(24);
    padding-top: rem(10);
    width: rem(160);
    height: rem(160);
    background-color: #dec07b;
    font-size: rem(30);
    border-radius: rem(8);
    text-align: center;
  }

  @include e(remaingSpaceNum) {
    font-size: rem(60);
  }
}
</style>
