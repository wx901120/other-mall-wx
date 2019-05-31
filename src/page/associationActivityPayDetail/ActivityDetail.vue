<template>
  <div class="wx-goodDetails bg-white">
      <h3 class="wx-goodDetails__title">{{ productData.info.title }}</h3>
      <div class="wx-goodDetails__row">
        <div class="wx-goodDetails__leftTitle">简介</div>
        <div class="wx-goodDetails__rightContent">{{ productData.info.shortText }}</div>
      </div>
      <div class="wx-goodDetails__row">
        <div class="wx-goodDetails__leftTitle">规格</div>
        <div class="wx-goodDetails__rightContent">{{ productData.info.indate | dateStringFilterStrike }} {{ standard.lessonTime }}</div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ActivityDetail',

  props: {
    productData: {
      type: Object,
    },
    standard: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(goodDetails) {
  padding: rem(16) rem(26) rem(24);

  @include e(title) {
    font-size: rem(32);
    font-weight: bold;
  }

  @include e(row) {
    display: flex;
    flex-wrap: row nowrap;
    font-size: rem(26);
    margin-top: rem(24);
  }

  @include e(leftTitle) {
    width: rem(74);
      flex-shrink: 0;
  }

  @include e(rightContent) {
    color: #a8a8a8;
  }
}
</style>


