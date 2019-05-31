<template>
  <li class="wx-sortItem"
            :class="{'wx-sortItem--checked': checked}">{{ title }}</li>
</template>

<script>
export default {
  name: '',

  props: {
    title: {
      type: String,
    },
    checked: {
      type: Boolean,
    }
  },
};
</script>

<style lang="scss" scoped>
@include b(sortItem) {
  font-size: rem(28);
    text-align: left;
    padding: 0 rem(70);
    line-height: rem(100);
    border-bottom: 1px solid #e5e5e5;

    @include m(checked) {
      color: #d6024c;
      background: url("./image/icon-hook.png") no-repeat;
      background-size: rem(20) rem(16);
      background-position: rem(646) center;
    }
}
</style>

