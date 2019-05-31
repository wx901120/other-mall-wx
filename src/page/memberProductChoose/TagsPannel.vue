<template>
  <div class="wx-tagBlock">
    <div class="wx-tagBlock__tags">
      <slot name="tags"></slot>
    </div>

    <!-- 按钮组 -->
    <div class="wx-tagBlock__btnGroup">
      <slot name="btn"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@include b(tagBlock) {
  background: #fff;
  padding: rem(30) rem(30) rem(40);

  @include e(tags) {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    .i-tag:nth-child(n + 4) {
      margin-top: rem(30);
    }
    .i-tag:not(:nth-child(3n-2)) {
      margin-left: rem(60);
    }
  }

  @include e(btnGroup) {
    margin-top: rem(150);
  }
}
</style>

