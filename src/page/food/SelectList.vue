<template>
  <ul class="wx-selList">
    <slot></slot>
  </ul>
</template>

<style lang="scss" scoped>
@include b(selList) {
  width: rem(750);
  overflow: scroll;
  max-height: rem(500);
}
</style>
