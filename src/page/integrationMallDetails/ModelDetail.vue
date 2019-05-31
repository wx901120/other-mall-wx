<template>
  <div class="bg-white wx-integrationMallDetailsModel model" v-if="productData.info.goodContent">
    <h3 class="wx-integrationMallDetailsModel__title">详情</h3>
    <div class="wx-integrationMallDetailsModel__content"
         v-html="productData.info.goodContent">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModelDetail',

  props: {
    productData: {
      type: Object,
    },
  },
};
</script>

<style lang="scss">
@include b(integrationMallDetailsModel) {
  padding: rem(26) rem(20) rem(70);

  @include e(title) {
    font-size: rem(32);
    font-weight: bold;
  }

  @include e(content) {
    margin-top: rem(28);
    font-size: rem(28);
    color: #a8a8a8;
    img {
      width: 100%;
    }
  }
}
</style>

