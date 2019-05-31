<template>
  <h3 class="wx-homeTitle">
        <div class="wx-homeTitle__content">{{ title }}</div>
        <span class="i-icon i-icon-go"></span>
      </h3>
</template>

<script>
export default {
  name: 'HomeTitle',

  props: {
    title: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(homeTitle) {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: rem(100);
  font-size: rem(32);
  color: #262626;
  background-color: #fff;

  @include e(content) {
    margin-right: rem(20);
  }
}
</style>


