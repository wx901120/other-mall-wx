<template>
  <div class="i-navbar" :class="{ 'is-fixed': fixed }">
    <slot></slot>
  </div>
</template>

<script>
/**
 * mt-navbar
 * @module components/navbar
 * @desc 顶部 tab，依赖 tab-item
 *
 * @param {boolean} [fixed=false] - 固定底部
 * @param {*} selected - 返回 item component 传入的 value
 *
 * @example
 * <mt-navbar :selected.sync="selected">
 *   <mt-tab-item value="订单">
 *     <span slot="label">订单</span>
 *   </mt-tab-item>
 * </mt-navbar>
 *
 * <mt-navbar :selected.sync="selected" fixed>
 *   <mt-tab-item :value="['传入数组', '也是可以的']">
 *     <span slot="label">订单</span>
 *   </mt-tab-item>
 * </mt-navbar>
 *
 */
export default {
  name: 'i-navbar',

  props: {
    fixed: Boolean,
    value: {}
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/style/mixin.scss";

.i-navbar .i-tab-item {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    // padding: 17px 0;
    height: rem(64);
    font-size: rem(24);
    color: #fff;
    background-color: #dddddd;
}

.i-navbar {
    background-color: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    text-align: center;
}
.i-navbar .i-tab-item.is-selected {
    position: relative;
    margin-bottom: -3px;
    background-color: #d6024c;
    &:after {
      content: '';
      display: inline-block;
      position: absolute;
      top: auto;
      right: 0;
      bottom: rem(-34);
      left: 0;
      margin: auto;
      width: 0;
      height: 0;
      z-index: 9999;
      border: rem(20) solid transparent;
      border-top-color: #d6024c;
    }
}

.i-navbar .i-tab-item:last-child {
    border-right: 0;
}
</style>
