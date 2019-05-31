<template>
  <div class="wx-memberInfo">
    <div class="wx-memberInfo__item">
      <div class="wx-memberInfo__top is-portrait">
        <img :src="memberCenterData.picPath"
             alt="">
      </div>
      <div class="wx-memberInfo__bottom">
        {{ memberCenterData.userName }}
      </div>
    </div>
    <div class="wx-memberInfo__item degree">
      <div class="wx-memberInfo__top">
        {{ memberCenterData.cardLeveName }}
      </div>
      <div class="wx-memberInfo__bottom">
        会员等级
      </div>
    </div>
    <div class="wx-memberInfo__item mypoint">
      <div class="wx-memberInfo__top">
        {{ memberCenterData.integral }}
      </div>
      <div class="wx-memberInfo__bottom">
        我的积分
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemberInfo',

  props: {
    memberCenterData: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(memberInfo) {
  background-color: #fff;
  display: flex;
  margin-top: rem(20);
  align-items: center;
  height: rem(140);

  @include e(item) {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    width: 33.33%;
    &:nth-child(2) {
      border: 1px solid #dcdcdc;
      border-top: none;
      border-bottom: none;
    }
  }

  @include e(top) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: rem(70);
    font-size: rem(32);
    color: #f19903;

    @include when(portrait) {
      overflow: hidden;
      border-radius: 50%;
      img {
        width: rem(70);
      }
    }
  }

  @include e(bottom) {
    width: 100%;
    font-size: rem(28);
    color: #000000;
    text-align: center;
  }
}
</style>

