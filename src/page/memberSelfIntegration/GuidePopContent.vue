<template>
  <div class="wx-guidePopContent">
    <h3 class="wx-guidePopContent__title">积分规则协议</h3>
    <div class="wx-guidePopContent__text" v-html="regulation">
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuidePopContent',

  props: {
    regulation: {
      type: String,
    },
  },
};
</script>


<style lang="scss" scoped>
@include b(guidePopContent) {
  width: rem(648);
  overflow: hidden;
  border-radius: rem(12);
  background-color: transparent;
  @include e(title) {
    line-height: rem(82);
    font-size: rem(36);
    color: #fff;
    text-align: center;
    background-color: #d6024c;
  }

  @include e(text) {
    padding: rem(50);
    background-color: #fff;
  }
}
</style>

