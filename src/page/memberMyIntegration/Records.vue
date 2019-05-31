<template>
  <div class="wx-tabRecords">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Records',
};
</script>

<style lang="scss" scoped>
@include b(tabRecords) {
  margin-top: rem(20);
  background-color: #fff;
}
</style>

