<template>
  <div @change="$emit('change', currentValue)" class="i-checklist" :class="{ 'is-limit': max <= currentValue.length }">
    <label class="i-checklist-title" v-text="title"></label>
    <label class="i-checklist-label" slot="title" v-for="option in options">
      <span :class="{'is-right': align === 'right'}" class="i-checkbox">
        <input class="i-checkbox-input" type="checkbox" v-model="currentValue" :disabled="option.disabled" :value="option.value || option">
        <span class="i-checkbox-core"></span>
      </span>
      <span class="i-checkbox-label" v-text="option.label || option"></span>
    </label>
  </div>
</template>

<script>
import ICell from "@/components/i-cell/index.vue";

/**
 * mt-checklist
 * @module components/checklist
 * @desc 复选框列表，依赖 cell 组件
 *
 * @param {(string[]|object[])} options - 选项数组，可以传入 [{label: 'label', value: 'value', disabled: true}] 或者 ['ab', 'cd', 'ef']
 * @param {string[]} value - 选中值的数组
 * @param {string} title - 标题
 * @param {number} [max] - 最多可选的个数
 * @param {string} [align=left] - checkbox 对齐位置，`left`, `right`
 *
 *
 * @example
 * <mt-checklist :v-model="value" :options="['a', 'b', 'c']"></mt-checklist>
 */
export default {
  name: "i-checklist",

  props: {
    max: Number,
    title: String,
    align: String,
    options: {
      type: Array,
      required: true
    },
    value: Array
  },

  components: { ICell },

  data() {
    return {
      currentValue: this.value
    };
  },

  computed: {
    limit() {
      return this.max < this.currentValue.length;
    }
  },

  watch: {
    value(val) {
      this.currentValue = val;
    },

    currentValue(val) {
      if (this.limit) val.pop();
      this.$emit("input", val);
    }
  }
};
</script>

<style lang="css">
.i-checkbox {
  font-size: 0px;
  margin-right: rem(15px);
}
.i-checkbox-input {
  display: none;
}
.i-checkbox-label {
  vertical-align: middle;
  margin-left: 6px;
}
.i-checkbox-input:checked + .i-checkbox-core::after {
  border-color: #fff;
  -webkit-transform: rotate(45deg) scale(1);
  transform: rotate(45deg) scale(1);
}
.i-checkbox-core::after {
  border: 2px solid transparent;
  border-left: 0;
  border-top: 0;
  content: " ";
  /* top: 3px; */
  left: 2px;
  position: absolute;
  width: 4px;
  height: 8px;
  transform: rotate(45deg) scale(0);
  transition: transform 0.2s;
}
.i-checkbox-input:checked + .i-checkbox-core {
  background-color: #d6024c;
  border-color: #d6024c;
}
.i-checkbox-input[disabled] + .i-checkbox-core {
  background-color: #d9d9d9;
  border-color: #ccc;
}
.i-checkbox-core {
  display: inline-block;
  background-color: #fff;
  /* border-radius: 100%; */
  border: 1px solid #ff5152;
  position: relative;
  width: 12px;
  height: 12px;
  vertical-align: middle;
  border-radius: 2px;
}
.i-checkbox.is-right {
  float: right;
}
.i-checklist {
  display: inline-flex;
  align-items: center;
}
.i-checklist-title {
  color: #888;
  display: block;
  font-size: 12px;
  margin: 8px;
}
.i-checklist.is-limit .i-checkbox-core:not(:checked) {
  background-color: #d9d9d9;
  border-color: #d9d9d9;
}
.i-checklist-label {
  display: flex;
  align-items: center;
}
</style>
