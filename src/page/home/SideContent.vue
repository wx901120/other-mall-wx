<template>
  <div class="wx-sidebarContent">
    <div class="wx-sidebarContent__header">
      <span class="logo"
            :style="{backgroundImage: `url(${logoImg})`}"></span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SideContent',

  props: {
    logoImg: {
      type: String,
    },
  },
};
</script>


<style lang="scss" scoped>
@include b(sidebarContent) {
  @include e(header) {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: rem(100);
    border-bottom: 1px solid #e5e5e5;
  }
}
</style>

