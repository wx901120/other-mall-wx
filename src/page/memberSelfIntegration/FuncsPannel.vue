<template>
  <div class="wx-pannelBottom">
      <p class="wx-pannelBottom__tips">* 请点击“扫码积分”，扫描收银小票二维码完成自助积分</p>

      <div class="wx-pannelBottom__btnGroup">
        <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
  name: 'FuncsPannel',
};
</script>

<style lang="scss" scoped>
@include b(pannelBottom) {
  position: absolute;
  left: 0;
  bottom: rem(70);
  padding: 0 rem(30);
  width: 100%;

  @include e(tips) {
    font-size: rem(26);
    color: #969696;
    text-align: center;
  }

  @include e(btnGroup) {
    padding: 0;
    display: flex;
    justify-content: space-between;
    margin-top: rem(46);
    .i-button {
      width: rem(328);
    }
    .i-icon {
      margin-right: rem(30);
    }
  }
}
</style>


