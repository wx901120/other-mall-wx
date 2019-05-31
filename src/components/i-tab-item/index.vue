<template>
  <a class="i-tab-item"
    @click="$parent.$emit('input', id)"
    :class="{ 'is-selected': $parent.value === id }">
    <div class="i-tab-item-icon"><slot name="icon"></slot></div>
    <div class="i-tab-item-label"><slot></slot></div>
  </a>
</template>

<script>
/**
 * mt-tab-item
 * @module components/tab-item
 * @desc 搭配 tabbar 或 navbar 使用
 * @param {*} id - 选中后的返回值，任意类型
 * @param {slot} [icon] - icon 图标
 * @param {slot} - 文字
 *
 * @example
 * <mt-tab-item>
 *   <img slot="icon" src="http://placehold.it/100x100">
 *   订单
 * </mt-tab-item>
 */
export default {
  name: 'i-tab-item',

  props: ['id']
};
</script>

<style lang="scss">
.i-tab-item {
    display: block;
    padding: 7px 0;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-decoration: none;
}

.i-tab-item-label {
    color: inherit;
    font-size: 12px;
    line-height: 1;
}
</style>
