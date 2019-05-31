<template>
  <div class="i-tag"
       :class="[widthTypeClass, visitedClass]">{{ title }}</div>
</template>

<script>
export default {
  name: 'ITag',

  mounted() {
    console.log(typeof this.checked);
  },

  computed: {
    widthTypeClass() {
      if (this.widthType === 'auto') {
        return 'width-auto';
      }
      return '';
    },
    visitedClass() {
      if (this.checked && this.visitedType === 'plain') {
        return 'activited-plain';
      } else if (this.checked) {
        return 'checked';
      }

      return '';
    },
  },

  props: {
    title: String,
    widthType: {
      type: String,
    },
    visitedType: {
      type: String,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>


<style lang="scss" scoped>
@import "src/assets/style/mixin.scss";

.i-tag {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0 rem(12);
  width: rem(176);
  height: rem(70);
  border-radius: rem(10);
  font-size: rem(32);
  border: 1px solid #a3a3a3;
  color: #a3a3a3;
  margin-bottom: rem(20);
  &.checked {
    border: none;
    background-color: #d6024c;
    color: #fff;
  }
  &.width-auto {
    width: auto;
  }
  &.activited-plain {
    background-color: none;
    border: 1px solid #d6024c;
  }
  
}
</style>

