<template>
  <div class="wx-cardItem">
    <div class="wx-cardItem__cardBrief"
         :style="{ 'background-image': `url(${isShow ? item.cardImg : item.cardLongImg})` }"
         :class="{'is-expanding': isShow}">
      <!-- <span class="wx-cardItem__cardName">{{ item.title }}</span>
      <span class="wx-cardItem__btn">向下展开详情
        <span class="i-icon i-icon-arrowDouble"></span>
      </span> -->
    </div>
    <div class="cardInfo"
         v-if="isShow"
         v-html="item.cardEquity">
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardItem',

  props: {
    isShow: false,
    item: {
      type: Object,
    }
  },

  // data() {
  //   return {
  //     isShow: false,
  //   }
  // }
};
</script>


<style lang="scss" scoped>
.i-icon-arrowDouble {
  width: rem(13);
  height: rem(13);
  background-image: url("./image/icon-arrowBottom.png");
  background-size: cover;
  margin: rem(4) 0 0 rem(8);
}
@include b(cardItem) {
  &:nth-child(n + 2) {
    margin-top: rem(50);
  }

  @include e(cardBrief) {
    position: relative;
    padding: rem(78) rem(10) 0;
    height: rem(180);
    // border-radius: rem(10);
    // background-color: #5555aa;
    background-size: 100% 100%;

    @include when(expanding) {
      height: rem(350);
    }
  }

  @include e(cardName) {
    display: inline-block;
    width: 100%;
    font-size: rem(28);
    color: #fff;
  }

  @include e(btn) {
    position: absolute;
    top: rem(140);
    left: rem(10);
    display: inline-flex;
    align-items: center;
    font-size: rem(20);
    color: #fff;
  }
}
</style>
