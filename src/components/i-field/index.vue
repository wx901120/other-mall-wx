<template>
  <i-cell class="i-field" :title="label" v-clickoutside="doCloseActive" :class="[{
      'is-textarea': type === 'textarea',
      'is-nolabel': !label
    }]">
    <textarea @change="$emit('change', currentValue)" ref="textarea" class="i-field-core" :placeholder="placeholder" v-if="type === 'textarea'" :rows="rows" :disabled="disabled" :readonly="readonly" v-model="currentValue">
    </textarea>
    <input @change="$emit('change', currentValue)" ref="input" class="i-field-core" :placeholder="placeholder" :number="type === 'number'" v-else :type="type" @focus="active = true" :disabled="disabled" :readonly="readonly" :value="currentValue" @input="handleInput">
    <div @click="handleClear" class="i-field-clear" v-if="!disableClear" v-show="currentValue && type !== 'textarea' && active">
      <i class="i-icon i-icon-field-error"></i>
    </div>
    <span class="i-field-state" v-if="state" :class="['is-' + state]">
      <i class="i-icon" :class="['i-icon-field-' + state]"></i>
    </span>
    <div class="i-field-other">
      <slot></slot>
    </div>
    <slot name="icon" slot="icon"></slot>
  </i-cell>
</template>

<script>
import ICell from "@/components/i-cell/index.vue";
import Clickoutside from "@/components/utils/clickoutside";
console.log(ICell);
/**
 * mt-field
 * @desc 编辑器，依赖 cell
 * @module components/field
 *
 * @param {string} [type=text] - field 类型，接受 text, textarea 等
 * @param {string} [label] - 标签
 * @param {string} [rows] - textarea 的 rows
 * @param {string} [placeholder] - placeholder
 * @param {string} [disabled] - disabled
 * @param {string} [readonly] - readonly
 * @param {string} [state] - 表单校验状态样式，接受 error, warning, success
 *
 * @example
 * <mt-field v-model="value" label="用户名"></mt-field>
 * <mt-field v-model="value" label="密码" placeholder="请输入密码"></mt-field>
 * <mt-field v-model="value" label="自我介绍" placeholder="自我介绍" type="textarea" rows="4"></mt-field>
 * <mt-field v-model="value" label="邮箱" placeholder="成功状态" state="success"></mt-field>
 */
export default {
  name: "i-field",
  data() {
    return {
      active: false,
      currentValue: this.value
    };
  },

  directives: {
    Clickoutside
  },

  props: {
    type: {
      type: String,
      default: "text"
    },
    rows: String,
    label: String,
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    disableClear: Boolean,
    state: {
      type: String,
      default: "default"
    },
    value: {},
    attr: Object
  },
  components: { ICell },
  methods: {
    doCloseActive() {
      this.active = false;
    },

    handleInput(evt) {
      this.currentValue = evt.target.value;
    },

    handleClear() {
      if (this.disabled || this.readonly) return;
      this.currentValue = "";
    }
  },

  watch: {
    value(val) {
      this.currentValue = val;
    },

    currentValue(val) {
      this.$emit("input", val);
    },

    attr: {
      immediate: true,
      handler(attrs) {
        this.$nextTick(() => {
          const target = [this.$refs.input, this.$refs.textarea];
          target.forEach(el => {
            if (!el || !attrs) return;
            Object.keys(attrs).map(name => el.setAttribute(name, attrs[name]));
          });
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import "src/components/assets/style/mixin.scss";
@import "src/components/assets/style/var.scss";

.i-field .i-cell-title {
  width: $--field-title-width;
  flex: none;
}
.i-field .i-cell-value {
  flex: 1;
  color: inherit;
  display: flex;
}
.i-field.is-nolabel .i-cell-title {
  display: none;
}
.i-field-core {
  appearance: none;
  border-radius: 0;
  border: 0;
  flex: 1;
  outline: 0;
  line-height: 1.6;
  font-size: inherit;
  width: 100%;
  height: rem(70);
  background-color: #f4f4f4;
  // font-size: 12px;
  text-indent: rem(12);
  border-raidus: rem(4);
}
.i-field-clear {
  opacity: 0.2;
}
textarea {
  overflow: auto;
  resize: none;
  vertical-align: top;
}
textarea,
input {
  -webkit-user-modify: read-write-plaintext-only;
}
.i-field.is-textarea {
  align-items: inherit;
}
.i-field.is-textarea .i-cell-value {
  padding: 5px 0;
}
.i-cell:last-child {
  // background-image: linear-gradient(
  //   0deg,
  //   #d9d9d9,
  //   #d9d9d9 50%,
  //   transparent 50%
  // );
  // background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: bottom;
}
.i-field-state .i-icon {
    font-size: 20px;
}
.i-field-other {
  // flex-grow: 1;
}
</style>
