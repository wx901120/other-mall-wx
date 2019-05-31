<template>
    <header class="i-header"
            :class="{ 'is-fixed': fixed }">
        <div class="i-header-button is-left">
            <slot name="left"></slot>
        </div>
        <h1 class="i-header-title"
            v-text="title"></h1>
        <div class="i-header-button is-right">
            <slot name="right"></slot>
        </div>
    </header>
</template>

<script>
/**
 * i-header
 * @module components/header
 * @desc 顶部导航
 * @param {boolean} [fixed=false] - 固定顶部
 * @param {string} [title] - 标题
 * @param {slot} [left] - 显示在左侧区域
 * @param {slot} [right] - 显示在右侧区域
 *
 * @example
 * <i-header title="我是标题" fixed>
 *   <i-button slot="left" icon="back" @click="handleBack">返回</i-button>
 *   <i-button slot="right" icon="more"></i-button>
 * </i-header>
 */
export default {
  name: 'IHeader',

  props: {
    fixed: Boolean,
    title: String,
  },
};
</script>

<style lang="scss">
@import "src/assets/style/mixin.scss";

.i-header {
  align-items: center;
  background-color: #fff;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  font-size: 18px;
  height: 45px;
  padding: 0 rem(30);
  position: relative;
  text-align: center;
  white-space: nowrap;
  color: #000000;
  &.is-fixed {
    top: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 1;
  }
  .i-button {
    background-color: transparent;
    border: 0;
    box-shadow: none;
    color: inherit;
    display: inline-block;
    padding: 0;
    font-size: inherit;
  }
}

.i-header-button {
  flex: 0.5;
  &.i-header-title {
    font-size: inherit;
    font-weight: 400;
    flex: 1;
  }
  &.is-left {
    text-align: left;
    display: flex;
    justify-content: left;
    align-items: center;
  }
  &.is-right {
    text-align: right;
  }
  & > a {
    color: inherit;
  }
}
</style>


