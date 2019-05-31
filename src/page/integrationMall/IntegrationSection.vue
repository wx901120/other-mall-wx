<template>
  <div class="wx-integrationSection">
    <span class="wx-integrationSection__title">积分区间</span>
    <div class="wx-integrationSection__options">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@include b(integrationSection) {
  padding: rem(20) rem(20) rem(25);
  display: flex;
  flex-flow: row wrap;
  height: rem(90);
  font-size: rem(28);
  background-color: #fff;

  @include e(title) {
    padding-left: rem(20);
    width: rem(144);
    height: 100%;
    font-size: rem(28);
    font-weight: bold;
  }

  @include e(options) {
    display: flex;
    flex-wrap: row wrap;
    height: 100%;
    margin-left: rem(10);
  }
}
</style>

