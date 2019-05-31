<template>
  <div class="wx-paymethods model bg-white">
    <h3 class="wx-paymethods__title model-title">价格</h3>
    <div class="wx-paymethods__row border-bottom-gray">
      <div class="wx-paymethods__iconWrap">
        <span class="i-icon i-icon-cash"></span>
      </div>
      <span class="wx-paymethods__leftTitle">现金</span>
      <div class="wx-paymethods__rightContent">{{ activityData.info.money }}元</div>
    </div>
    <div class="wx-paymethods__row border-bottom-gray">
      <div class="wx-paymethods__iconWrap">
        <span class="i-icon i-icon-integration"></span>
      </div>
      <span class="wx-paymethods__leftTitle">积分</span>
      <div class="wx-paymethods__rightContent">{{ activityData.info.integral }}积分</div>
    </div>

    <div class="wx-paymethods__row border-bottom-gray">
      <div class="wx-paymethods__iconWrap">
        <span class="i-icon i-icon-mixin"></span>
      </div>
      <span class="wx-paymethods__leftTitle">组合</span>
      <div class="wx-paymethods__rightContent">¥{{ activityData.info.mixMoney }}元 + {{ activityData.info.mixIntegral }}积分</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModelPrice',

  props: {
    activityData: {
      type: Object,
    },
  },
};
</script>


<style lang="scss" scoped>
.i-icon-cash {
  background-image: url('./image/icon-cash.png');
  width: rem(26);
  height: rem(25);
}

.i-icon-integration {
  background-image: url('./image/icon-integration.png');
  width: rem(30);
  height: rem(26);
}

.i-icon-mixin {
  background-image: url('./image/icon-mixin.png');
  width: rem(26);
  height: rem(26);
}

@include b(paymethods) {
  padding: rem(26) 0 rem(24);

  @include e(title) {
    font-size: rem(32);
    margin-bottom: rem(18);
    padding: 0 rem(20);
  }

  @include e(row) {
    padding: 0 rem(24);
    line-height: rem(90);
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    font-size: rem(26);
  }

  @include e(leftTitle) {
    flex-grow: 1;
    margin-left: rem(28);
  }

  @include e(rightContent) {
    color: #ff5152;
  }

  @include e(iconWrap) {
    width: rem(32);
    text-align: center;
  }
}
</style>

