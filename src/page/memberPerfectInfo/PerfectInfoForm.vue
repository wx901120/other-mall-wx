<template>
  <div class="wx-perfectInfosForm">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@include b(perfectInfosForm) {
  padding: 0 rem(22);
  .i-field .i-cell-value {
    // display: block;
  }
  .i-field-core {
    // width: rem(540);
  }
  .tips {
    color: #a8a8a8;
    text-align: center;
  }
}
</style>
