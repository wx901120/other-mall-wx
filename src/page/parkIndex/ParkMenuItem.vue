<template>
  <div class="wx-parkMenuItem">
    <slot></slot>
    <span class="wx-parkMenuItem__title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'ParkMenuItem',

  props: {
    title: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(parkMenuItem) {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: rem(90);
  font-size: rem(28);
  color: 333333;

  &:nth-child(2n-1) {
    position: relative;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: auto;
      margin: auto;
      width: 1px;
      height: rem(45);
      background-color: #666666;
    }
    // border-right: 1px solid #666;
  }

  @include e(title) {
    margin-left: rem(20);
  }
}
</style>


