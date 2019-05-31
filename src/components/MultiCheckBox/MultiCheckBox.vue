<template>
  <span class="wx-multiCheckBox">
    <span class="wx-multiCheckBox__inputWrap">
      <input class="wx-multiCheckBox__checkboxInput"
             type="checkbox"
             name=""
             id="checkboxInput"
             v-model="isChecked">
      <span class="wx-multiCheckBox__fakeInput"
            :class="{ 'is-checked': isChecked }"></span>
    </span>
    <label for="checkboxInput" class="wx-multiCheckBox__endLabel">
      <slot name="endLabel"></slot>
    </label>
  </span>
</template>

<script>
export default {
  name: 'MultiCheckBox',

  data() {
    return {
      isChecked: this.value,
    };
  },

  props: {
    value: {
      type: Boolean,
    },
  },

  watch: {
    value(newVal) {
      this.isChecked = newVal;
    },

    isChecked(newVal) {
      this.$emit('input', newVal);
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(multiCheckBox) {
  display: inline-flex;
  align-items: center;
  @include e(inputWrap) {
    position: relative;
    display: inline-block;
    background-color: #fff;
    /* border-radius: 100%; */
    border: 1px solid #d6024c;
    position: relative;
    width: 12px;
    height: 12px;
    vertical-align: middle;
    border-radius: 2px;
  }

  @include e(checkboxInput) {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    opacity: 0;
    z-index: 1;
  }

  @include e(fakeInput) {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;

    @include when(checked) {

      &:after {
        border: 2px solid transparent;
        border-left: 0;
        border-top: 0;
        content: " ";
        left: 2px;
        position: absolute;
        width: 4px;
        height: 8px;
        transform: rotate(45deg) scale(0);
        transition: transform 0.2s;
        border-color: #d6024c;
        transform: rotate(45deg) scale(0.8);
      }
    }
  }

  @include e(endLabel) {
    margin-left: rem(20);
  }
}
</style>
