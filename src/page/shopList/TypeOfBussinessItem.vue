<template>
  <li class="wx-yetaiItem"
      :class="{'wx-yetaiItem--checked': checked}">
    <img :src="picPath">
    <p>{{ yetaiTitle }}</p>
  </li>
</template>

<script>
export default {
  name: 'TypeOfBussinessItem',

  props: {
    picPath: {
      type: String,
    },
    yetaiTitle: {
      type: String,
    },
    checked: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(yetaiItem) {
  display: inline-flex;
  flex-flow: row wrap;
  justify-content: center;
  padding-top: rem(14);
  width: 25%;
  height: rem(120);
  font-size: rem(24);

  @include m(checked) {
    background-color: #ededed;
  }
  img {
    height: rem(50);
  }
  p {
    width: 100%;
    text-align: center;
  }
}
</style>

