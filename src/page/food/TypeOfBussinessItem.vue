<template>
  <li class="wx-yetaiItem"
      :class="{'is-checked': checked}">
    <img :src="`http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/article/${yetaiInfo.picPath}`">
    <p>{{ yetaiInfo.title }}</p>
  </li>
</template>

<script>
export default {
  name: 'TypeOfBussinessItem',

  props: {
    yetaiInfo: {
      type: Object,
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

  @include when(checked) {
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