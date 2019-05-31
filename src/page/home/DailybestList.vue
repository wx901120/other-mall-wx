<template>
  <div class="wx-dailybestContent">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@include b(dailybestContent) {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
</style>

