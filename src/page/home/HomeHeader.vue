<template>
  <div class="wx-header">
      <div class="wx-header__menuBtn" @click="onOperateSideMenu()">
        <span class="wx-header__leftIcon i-icon i-icon-nav"></span>
      </div>
      <div class="wx-header__logo logo"
           :style="{backgroundImage: `url(${logoImg})`}"></div>
    </div>
</template>

<script>
export default {
  props: {
    logoImg: {
      type: String,
    },
  },

  methods: {
    onOperateSideMenu() {
      this.$emit('onOperateSideMenu');
    },
  },
};
</script>

<style lang="scss" scoped>
/* 头部 */
@include b(header) {
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: rem(90);
  background: #fff;
  z-index: 999;

  @include e(menuBtn) {
    display: flex;
    // justify-content: center;
    align-items: center;
    width: rem(200);
    height: rem(90);
  }

  @include e(leftIcon) {
    // width: rem(100);
    // height: 100%;
    margin-left: rem(35);
  }

  @include e(logo) {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    // height: 100%;
    // align-self: center;
  }
}
</style>


