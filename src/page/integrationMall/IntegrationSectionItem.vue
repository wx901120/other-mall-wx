<template>
  <span class="wx-option"
        :class="{'wx-option--checked': checked}"
        @click="$Indicator.open('努力加载中...')">{{ section }}</span>
</template>

<script>
export default {
  name: '',

  props: {
    section: {
      type: String,
    },
    checked: {
      type: Boolean,
    },
  },
};
</script>


<style lang="scss" scoped>
@include b(option) {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: rem(164);
  background-color: #f2f2f2;
  &:nth-child(n + 2) {
    margin-left: rem(25);
  }

  @include m(checked) {
    background-color: #d6024c;
    color: #fff;
  }
}
</style>

