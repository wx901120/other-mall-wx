<template>
  <div class="wx-signIn">
    <span class="i-icon i-icon-sign"></span>
    签到
  </div>
</template>

<style lang="scss" scoped>
@include b(signIn) {
  position: absolute;
  z-index: 1;
  top: rem(50);
  right: 0;
  width: rem(100);
  height: rem(58);
  display: flex;
  align-items: center;
  padding-left: rem(12);
  font-size: rem(24);
  color: #d6024c;
  background-color: #fff;
  border-radius: rem(14) 0 0 rem(14);
  background-position: rem(12) center;
  .i-icon {
    margin-right: rem(10);
  }
}
</style>
