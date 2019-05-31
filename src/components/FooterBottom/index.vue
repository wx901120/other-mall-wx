<template>
  <!-- 底部提示 -->
  <footer class="index-footer background-theme">
    <!-- <p>UNILAND</p>
    <p>COMMERCIAL MANAGEMENT</p> -->
  </footer>
</template>

<script>
export default {
  name: 'footerBottom'
}
</script>


<style lang="scss">
@import 'src/assets/style/mixin.scss';

.index-footer {
  width: 100%;
  height: rem(120);
  padding: rem(36) rem(48) 0;
  color: #fff;
  font-size: rem(24);
  box-sizing: border-box;
  background-image: url('./image/footer_text.png');
  background-repeat: no-repeat;
  background-size: rem(325) rem(43);
  background-position: rem(50) rem(50);
}

.position-fixed {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
}

/* 
  壹方天地
 */
.yftd {
  .index-footer {
    background-image: url('./image/yftd/footer_text.png');
  }
}
</style>
