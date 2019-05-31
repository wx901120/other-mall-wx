<template>
  <div class="swiper-container">
        <div class="swiper-wrapper">
          <slot></slot>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
  </div>
</template>

<script>
import Swiper from 'swiper/dist/js/swiper';
import 'swiper/dist/css/swiper.min.css';

export default {
  name: 'MultiSwiper',

  mounted() {
    this.$nextTick(() => {
      const swiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        freeMode: true,
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
      });
    });
  },
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/mixin.scss";

/* Swiper */
.swiper-container {
  width: 100%;
  height: rem(160);
  padding: 0 rem(20);
}
.swiper-wrapper {
}
</style>
