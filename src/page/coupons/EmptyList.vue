<template>
  <div class="wx-emptyList"></div>
</template>

<script>
export default {
  name: 'EmptyList',
}
</script>

<style lang="scss" scoped>
@include b(emptyList) {
  height: rem(536);
  background-color: #fff;
  background-image: url('./image/empty.png');
  background-size: rem(237) rem(273);
  background-position: center center;
  background-repeat: no-repeat;
}
</style>


