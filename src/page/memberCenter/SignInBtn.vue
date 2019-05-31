<template>
  <div class="person-info-item wx-signBtn">签到</div>
</template>

<script>
export default {
  name: 'SignInBtn',
};
</script>

<style lang="scss" scoped>
@include b(signBtn) {
    margin-top: rem(14);
    display: flex;
    justify-content: center;
    align-items: center;
    width: rem(112);
    height: rem(42);
    border: 1px solid #f9be02;
    border-radius: rem(10);
    font-size: rem(24);
    color: #f9be02;
  }
</style>


