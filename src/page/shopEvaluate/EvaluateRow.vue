<template>
  <div class="wx-evaluateRow">
      <span class="wx-evaluateRow__label">{{ commentItem.title }}</span>
      <div class="wx-evaluateRow__starWrap">
        <slot></slot>
      </div>
      <span class="wx-evaluateRow__score">{{ ( commentItem.rate * 100 ) / 20 | parseInt }}分</span>
    </div>
</template>

<script>
export default {
  name: 'EvaluateRow',

  props: {
    commentItem: {
      type: Object,
    },
  },

  methods: {
    // parseEvaluateScore() {}
  }
};
</script>

<style lang="scss" scoped>
@include b(evaluateRow) {
  line-height: rem(74);

  @include e(label) {
    display: inline-block;
    width: rem(190);
    // margin-right: rem(70);
  }

  @include e(starWrap) {
    display: inline-block;
    font-size: rem(42);
  }

  @include e(score) {
    margin-left: rem(30);
  }
}
</style>


