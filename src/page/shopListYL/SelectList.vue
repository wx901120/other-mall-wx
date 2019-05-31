<template>
  <ul class="wx-selList">
    <slot></slot>
  </ul>
</template>

<style lang="scss" scoped>
@include b(selList) {
  overflow: scroll;
  max-height: rem(500);
  font-size: 0;
}
</style>
