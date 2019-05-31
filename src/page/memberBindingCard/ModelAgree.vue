<template>
  <div class="wx-agreeWrap">
    <slot></slot>
  </div>
</template>

<script>
import { MultiCheckBox } from '@/components/index.js';

export default {
  name: 'ModelAgree',

  components: {
    MultiCheckBox,
  },
};

</script>

<style lang="scss">
@include b(agreeWrap) {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: rem(24);

  @include e(text1) {
    color: #a8a8a8;
  }

  @include e(text2) {
    color: #d6024c;
    margin-left: rem(14);
  }
}
.agree-wrap {
}
</style>
