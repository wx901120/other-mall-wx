<template>
  <div class="banner">
    <slot name="bannerContent"></slot>
    <slot name="bannerImg"></slot>
  </div>
</template>

<script>
export default {
  name: 'Banner',
};
</script>

<style lang="scss" scoped>
@import "src/assets/style/mixin.scss";

.banner {
  position: relative;
  width: 100%;
  height: rem(420);
  background-image: url("./image/darkness_banner.jpg");
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: center center;
}

.banner-yinxiang {
  background-image: url("./image/banner_yinxaing.png");
}

.banner-image {
  display: flex;
  align-items: center;
  overflow: hidden;
  background: none;
  font-size: 0;
  img {
    width: 100%;
  }
}
</style>

