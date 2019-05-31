<template>
  <h3 class="title-item"
      :class="{ 'checked': $parent.activityName === name }"
      :name="name"
      @click="tabItemClick()">{{ label }}</h3>
</template>

<script>
export default {
  name: 'MultiTabsItem',

  props: {
    label: {
      type: String,
    },
    name: {
      type: String,
    },
  },

  methods: {
    tabItemClick() {
      this.$parent.activityName = this.name;
      this.$parent.handleTabClick();
    }
  }
};
</script>


<style lang="scss" scoped>
@import "src/assets/style/mixin.scss";

.title-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  text-align: center;
  font-size: rem(32);
  color: #999999;
  &.checked {
    position: relative;
    color: #d6024c;
    font-weight: bold;
    &:after {
      position: absolute;
      top: auto;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      content: "";
      display: block;
      width: rem(65);
      height: 1px;
      background-color: #d6024c;
    }
  }
}
</style>

