<template>
  <div class="wx-parkMenu">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ParkMenu',
};
</script>


<style lang="scss" scoped>
@include b(parkMenu) {
  display: flex;
  flex-flow: row wrap;
  width: rem(732);
  // height: rem(90);
  margin: 0 auto;
  background-color: #fff;
}
</style>
