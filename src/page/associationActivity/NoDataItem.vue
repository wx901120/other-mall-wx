<template>
  <li class="wx-associationNoData">
    <p class="wx-associationNoData__text color-theme">我们精选的一大波精彩活动即将来袭，誓不辜负您等待的时间！</p>
  </li>
</template>

<script>
export default {
  name: 'NoDataItem',
};
</script>

<style lang="scss" scoped>
@include b(associationNoData) {
  position: relative;
  font-size: 0;
  overflow: hidden;
  position: relative;
  height: rem(360);
  background-size: 100% auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("./image/darkness_banner.png") no-repeat;
  background-size: 100% auto;
  background-position: center center;
  
  @include e(text) {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: rem(24);
    color: #dec07b;
  }
}
</style>


