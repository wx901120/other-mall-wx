<template>
  <li class="wx-floorItem"
      :class="{'wx-floorItem--checked': checked}">{{ floorInfo.floorName }}</li>
</template>

<script>
export default {
  name: 'FloorItem',

  props: {
    floorInfo: {
      type: Object,
    },

    checked: {
      type: Boolean,
    }
  },
};
</script>

<style lang="scss" scoped>
@include b(floorItem) {
  text-align: left;
    padding: 0 rem(70);
    line-height: rem(100);
    border-bottom: 1px solid #e5e5e5;
    font-size: rem(28);

    @include m(checked) {
      color: #d6024c;
      background: url("./image/icon-hook.png") no-repeat;
      background-size: rem(20) rem(16);
      background-position: rem(646) center;
    }
}
</style>

