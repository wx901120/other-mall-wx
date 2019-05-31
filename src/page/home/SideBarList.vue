<template>
  <ul class="sidebar-list"
      id="sidebarList">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'SideBarList',
}
</script>

<style lang="scss" scoped>
@include b(sidebarList) {
  .sidebar-list-item-checked {
    background-color: #d6024c;
    color: #fff;
  }
}
</style>

