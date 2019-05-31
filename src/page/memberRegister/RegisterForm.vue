<template>
  <div class="wx-registerForm">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',
}
</script>

<style lang="scss" scoped>
@include b(registerForm) {
  padding: 0 0 rem(20);
  background-color: #fff;
}
</style>
