<template>
  <ul class="wx-parkPaymentRecordsList">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'parkPaymentRecordsList',
};
</script>

<style lang="scss" scoped>
@include b(parkPaymentRecordsList) {
  padding: rem(24) rem(30) rem(20);
}
</style>
