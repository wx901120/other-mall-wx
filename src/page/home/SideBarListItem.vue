<template>
  <li class="wx-sidebarListItem">
    <span class="wx-sidebarListItem__iconWrap">
      <span class="i-icon"
            :class="icon"></span>
    </span>
    <h3 class="wx-sidebarListItem__title">{{ title }}</h3>
    <span class="wx-sidebarListItem__subTitle">{{ subTitle }}</span>
  </li>
</template>

<script>
export default {
  name: 'SideBarItem',

  props: {
    title: {
      type: String,
    },
    subTitle: {
      type: String,
    },
    icon: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(sidebarListItem) {
  padding: rem(20);
  display: flex;
  align-items: center;
  height: rem(100);
  font-size: rem(28);
  color: #333333;
  line-height: 1;

  @include e(iconWrap) {
    display: inline-block;
    width: rem(78);
    text-align: center;
  }

  @include e(title) {
    width: rem(120);
    text-align: center;
  }
  
  @include e(subTitle) {
    margin-left: rem(18);
    color: #999999;
  }
}
</style>


