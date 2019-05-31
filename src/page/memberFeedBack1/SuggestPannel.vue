<template>
  <div class="wx-suggestPannel">
      <textarea class="wx-suggestPannel__textarea"
                cols="30"
                rows="10"
                placeholder="请详细描述您遇到的问题或者建议！"
                v-model="suggestion"></textarea>
    </div>
</template>

<script>
export default {
  name: 'SuggestPannel',

  props: {
    value: {
      type: String,
    },
  },

  data() {
    return {
      suggestion: this.value,
    };
  },

  watch: {
    value(newVal) {
      this.suggestion = newVal;
    },
    suggestion(newVal) {
      this.$emit('input', newVal);
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(suggestPannel) {
  padding: rem(20);

  @include e(textarea) {
    padding: rem(20);
  width: 100%;
  height: rem(560);
  border: none;
  font-size: rem(30);
  color: #bbbbbb;
  background-color: #eeeeee;
  }
}
</style>
