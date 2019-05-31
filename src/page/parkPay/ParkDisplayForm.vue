<template>
  <div class="wx-parkPayForm">
    <div class="wx-parkPayForm__row">
      <span class="icon-wrap"><span class="i-icon i-icon-park-card"></span></span>
      <span class="wx-parkPayForm__label">会员等级：</span>
      <span class="wx-parkPayForm__content">{{ parkInfo.userInfo ? parkInfo.userInfo.cardLeve : '' }}</span>
    </div>
    <div class="wx-parkPayForm__row">
      <span class="icon-wrap"><span class="i-icon i-icon-park-address"></span></span>
      <span class="wx-parkPayForm__label">停车位置：</span>
      <span class="wx-parkPayForm__content">负1层 C224</span>
    </div>
    <div class="wx-parkPayForm__row">
      <span class="icon-wrap"><span class="i-icon i-icon-park-timer"></span></span>
      <span class="wx-parkPayForm__label">驶入时间：</span>
      <span class="wx-parkPayForm__content">{{ parkInfo.inTime }}</span>
    </div>
    <div class="wx-parkPayForm__row">
      <span class="icon-wrap"><span class="i-icon i-icon-park-timer"></span></span>
      <span class="wx-parkPayForm__label">停车时长：</span>
      <span class="wx-parkPayForm__content">{{ parkInfo.parkTime | sec2Hour }}</span>
    </div>
    <div class="wx-parkPayForm__row">
      <span class="icon-wrap"><span class="i-icon i-icon-park-timer"></span></span>
      <span class="wx-parkPayForm__label">应缴金额：</span>
      <span class="wx-parkPayForm__content">{{ parkInfo.totalFee }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ParkDisplayForm',

  props: {
    parkInfo: {
      type: Object,
      default: {
        userInfo: {}
      },
    }
  }
};
</script>


<style lang="scss" scoped>
@include b(parkPayForm) {
  margin: rem(30) rem(20) 0;
  padding: 0 rem(30);
  background-color: #fff;
  border-radius: 4px 4px 0 0;

  @include e(row) {
    height: rem(90);
    display: flex;
    align-items: center;
    font-size: rem(24);
    
    &:nth-child(n+2) {
      border-top: 1px solid #e5e5e5;
    }

    .icon-wrap {
      width: rem(36);
      text-align: center;
    }
  }

  @include e(label) {
    margin-left: rem(24);
    
  }

  @include e(content) {}
}
</style>
