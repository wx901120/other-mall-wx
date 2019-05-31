<template>
  <div class="wx-personInfo">
    <div class="wx-personInfo__item wx-personInfo__avatorWrap">
      <img :src="memberCenterData.picPath"
           class="wx-personInfo__avator">
    </div>
    <div class="wx-personInfo__item wx-personInfo__name">{{ memberCenterData.userName }}</div>
    <div class="wx-personInfo__item wx-personInfo__cardDegree">{{ memberCenterData.cardLeveName }}</div>
    <div class="wx-personInfo__item wx-personInfo__integration">我的积分:{{ memberCenterData.integral }}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PersonInfo',

  props: {
    memberCenterData: {
      type: Object,
    },
  },
};
</script>


<style lang="scss" scoped>
@include b(personInfo) {
  // margin: auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: rem(290);
  font-size: rem(30);
  color: #fff;
  // z-index: 300;

  @include e(item) {
    width: 100%;
    text-align: center;
  }

  @include e(avatorWrap) {
    overflow: hidden;
    position: relative;
    width: rem(88);
    height: rem(88);
    border-radius: 50%;
  }

  @include e(avator) {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }

  @include e(name) {
    text-align: center;
    font-size: rem(30);
    margin-top: rem(18);
    line-height: 1;
  }

  @include e(cardDegree) {
    margin-top: rem(12);
    font-size: rem(24);
    font-weight: bold;
    color: #d6024c;
  }

  @include e(integration) {
    margin-top: rem(12);
    font-size: rem(24);
    font-weight: bold;
    color: #ffffff;
  }
}
</style>

