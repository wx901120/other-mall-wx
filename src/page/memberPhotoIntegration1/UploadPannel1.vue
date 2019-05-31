<template>
  <div class="wx-uploadimgPannel">
    <!-- <p class="wx-uploadimgPannel__tips">图片（提供图片输入）</p> -->
    <div class="wx-uploadimgPannel__uploadImg">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadPannel',
};
</script>

<style lang="scss" scoped>
@include b(uploadimgPannel) {
  padding: rem(20);

  @include e(tips) {
    // margin-top: rem(20);
    font-size: rem(28);
    color: #888888;
  }

  @include e(uploadPannel) {
    padding: 0 rem(20);
  }

  @include e(uploadImg) {
    margin-top: rem(20);
    width: rem(116);
    height: rem(116);
    img {
      width: 100%;
    }
  }
}
</style>

