<template>
  <div class="swiper-slide"
       :style="{ 
          'background-image': `url(http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/article/${imgSrc})`,
          'background-repeat': 'no-repeat',
          'background-size' : 'auto 100%',
          'background-position' : 'center center',
        }"></div>
</template>

<script>
export default {
  name: 'MultiSwiperItem',

  props: {
    imgSrc: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/style/mixin.scss";
.swiper-slide {
  text-align: center;
  font-size: 18px;
  // background: #ededed;
  background-position: center center;
  width: rem(285);
  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  &:nth-child(n+2) {
    margin-left: rem(20);
  }
}
</style>

