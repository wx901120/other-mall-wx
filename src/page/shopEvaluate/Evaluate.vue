<template>
  <div class="wx-evaluate">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'evaluate',

  components: {
    
  },

  props: {
    commentList: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(evaluate) {
  margin-top: rem(58);
  padding: rem(50) rem(40);
  border: 1px solid #ababab;
  font-size: rem(30);
  color: #646363;
}
</style>

