<template>
  <ul class="wx-mallList">
    <slot></slot>
  </ul>
</template>

<style lang="scss" scoped>
@include b(mallList) {
  padding: 0 rem(20) 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
</style>
