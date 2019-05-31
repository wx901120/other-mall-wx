<template>
  <div class="i-radiolist" @change="$emit('change', currentValue)">
    <i-cell :title="title">
      <!-- <label class="i-radiolist-title" v-text="title"></label> -->
      <label class="i-radiolist-label" v-for="option in options">
        <span :class="{'is-right': align === 'right'}" class="i-radio">
          <input class="i-radio-input" type="radio" v-model="currentValue" :disabled="option.disabled" :value="option.value || option">
          <span class="i-radio-core"></span>
        </span>
        <span class="i-radio-label" v-text="option.label || option"></span>
      </label>
    </i-cell>
  </div>
</template>

<script>
import ICell from "@/components/i-cell/index.vue";
/**
 * mt-radio
 * @module components/radio
 * @desc 单选框列表，依赖 cell 组件
 *
 * @param {string[], object[]} options - 选项数组，可以传入 [{label: 'label', value: 'value', disabled: true}] 或者 ['ab', 'cd', 'ef']
 * @param {string} value - 选中值
 * @param {string} title - 标题
 * @param {string} [align=left] - checkbox 对齐位置，`left`, `right`
 *
 * @example
 * <mt-radio v-model="value" :options="['a', 'b', 'c']"></mt-radio>
 */
export default {
  name: "i-radio",

  props: {
    title: String,
    align: String,
    options: {
      type: Array,
      required: true
    },
    value: String
  },

  data() {
    return {
      currentValue: this.value
    };
  },

  watch: {
    value(val) {
      this.currentValue = val;
    },

    currentValue(val) {
      this.$emit("input", val);
    }
  },

  components: {
    ICell
  }
};
</script>

<style lang="scss">
@import "src/assets/style/mixin.scss";

.i-radio-core {
  box-sizing: border-box;
  display: inline-flex;
  background-color: #fff;
  border-radius: 100%;
  border: 1px solid #ccc;
  position: relative;
  width: 12px;
  height: 12px;
  vertical-align: middle;
}
.i-radiolist {
  font-size: 0;
  .i-cell {
    display: inline-flex;
  }
}
.i-radiolist-title {
  font-size: 12px;
  display: inline-flex;
  color: #888;
}
.i-radiolist-label {
  display: inline-flex;
  align-items: center;
  &:nth-child(n+2) {
    padding: 0 10px;
  }
}
.i-radio-input {
  display: none;
}
.i-radio-input:checked + .i-radio-core {
  // background-color: #26a2ff;
  border-color: a1a1a1;
}
.i-radio-core::after {
  content: " ";
  border-radius: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  width: 6px;
  height: 6px;
  -webkit-transition: -webkit-transform 0.2s;
  transition: -webkit-transform 0.2s;
  transition: transform 0.2s;
  transition: transform 0.2s, -webkit-transform 0.2s;
  -webkit-transform: scale(0);
  transform: scale(0);
}
.i-radio-input:checked + .i-radio-core::after {
  background-color: #d6024c;
  -webkit-transform: scale(1);
  transform: scale(1);
}
.i-radio-input[disabled] + .i-radio-core {
  background-color: #d9d9d9;
  border-color: #ccc;
}
.i-radio.is-right {
  float: right;
}
.i-radio-label {
  margin-left: rem(26);
}
</style>
