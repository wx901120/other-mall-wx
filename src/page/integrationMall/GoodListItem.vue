<template>
  <li class="wx-listItem"
      @click="$router.push({name: 'integrationMallDetails', params: {id: good.id}})">
    <div class="wx-listItem__imgWrap">
      <img v-lazy="good.goodPic"
           class="page-lazyload-image">
    </div>
    <div class="wx-listItem__detail">
      <h3 class="wx-listItem__title ellipsis">{{ good.goodName }}</h3>
      <div class="wx-listItem__detailItem wx-listItem__point">
        <span class="wx-listItem__label">积分：</span>
        <span class="wx-listItem__content color-theme is-strong">{{ good.integral }}</span>
      </div>
      
      <div class="wx-listItem__detailItem wx-listItem__remainCount">
        <span class="wx-listItem__label is-gray">剩余：</span>
        <span class="wx-listItem__content">{{ good.goodsNum }}</span>
      </div>

      <div class="wx-listItem__detailItem wx-listItem__point" v-if="good.mixMoney != '0.00' || good.mixIntegral != '0'">
        <span class="wx-listItem__label">积分+现金：</span>
        <span class="wx-listItem__content color-theme is-strong">{{ good.mixIntegral }}+¥{{ good.mixMoney }}</span>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: '',

  props: {
    good: {
      type: Object,
    },
  },
};
</script>


<style lang="scss" scoped>
@include b(listItem) {
  width: rem(346);
  background-color: #fff;
  &:nth-child(n + 3) {
    margin-top: rem(28);
  }

  @include e(label) {
    color: #000;

    @include when(gray) {
      color: #999999;
    }
  }

  @include e(content) {
    

    @include when(strong) {
      font-weight: bold;
      font-size: rem(26);
    }
  }

  @include e(imgWrap) {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: rem(336);
    img {
      width: 100%;
    }
  }

  @include e(detail) {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: baseline;
    padding: rem(20);
    // height: rem(130);
    color: #fff;
    font-size: rem(24);
  }

  @include e(title) {
    width: 100%;
    height: rem(48);
    font-size: rem(28);
    font-weight: bold;
    color: #434343;
  }

  @include e(detailItem) {
    color: #787878;
    height: rem(48);
    font-size: rem(24);
  }

  @include e(point) {
  }

  @include e(pointContent) {
    font-size: rem(32);
  }

  @include e(remainCount) {
    color: #999999;
  }
}
</style>

