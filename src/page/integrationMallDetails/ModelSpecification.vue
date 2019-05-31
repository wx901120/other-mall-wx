<template>
  <div class="wx-specification bg-white model">
    <h3 class="wx-specification__row title">
      <span class="wx-specification__leftTitle">数量</span>
      <div class="wx-specification__rightContent">
        <slot></slot>
      </div>
    </h3>
  </div>
</template>

<script>
export default {
  name: 'ModelSpecification',
};
</script>

<style lang="scss" scoped>
@include b(specification) {
  padding: 0 rem(24) 0;
  line-height: rem(120);
  border-top: rem(2) solid #f0f2f5;
  border-bottom: rem(2) solid #f0f2f5;

  @include e(row) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @include e(leftTitle) {
    font-size: rem(32);
    font-weight: bold;
  }

  @include e(rightContent) {
    display: flex;
      justify-content: center;
      width: rem(300);
      font-size: rem(26);
      color: #a8a8a8;
      font-weight: normal;
  }
}
</style>


