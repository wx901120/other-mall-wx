<template>
  <button :type="nativeType" class="i-button" :class="['i-button--' + type, 'i-button--' + size, {
      'is-disabled': disabled,
      'is-plain': plain
    }]" @click="handleClick" :disabled="disabled">
    <span class="i-button-icon" v-if="icon || $slots.icon">
      <slot name="icon">
        <i v-if="icon" class="i-icon" :class="'i-icon-' + icon"></i>
      </slot>
    </span>
    <label class="i-button-text">
      <slot></slot>
    </label>
  </button>
</template>

<script>
/**
 * mt-header
 * @module components/button
 * @desc 按钮
 * @param {string} [type=default] - 显示类型，接受 default, primary, danger
 * @param {boolean} [disabled=false] - 禁用
 * @param {boolean} [plain=false] - 幽灵按钮
 * @param {string} [size=normal] - 尺寸，接受 normal, small, large
 * @param {string} [native-type] - 原生 type 属性
 * @param {string} [icon] - 图标，提供 more, back，或者自定义的图标（传入不带前缀的图标类名，最后拼接成 .iui-xxx）
 * @param {slot} - 显示文本
 * @param {slot} [icon] 显示图标
 *
 * @example
 * <mt-button size="large" icon="back" type="primary">按钮</mt-button>
 */
export default {
  name: 'IButton',
  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    },
  },

  props: {
    icon: String,
    disabled: Boolean,
    nativeType: String,
    plain: Boolean,
    type: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'danger', 'primary', 'red', 'gray'].indexOf(value) > -1;
      },
    },
    size: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['small', 'normal', 'large'].indexOf(value) > -1;
      },
    },
  },
};
</script>

<style lang="scss">
@import "src/components/assets/style/mixin.scss";
@import "src/components/assets/style/var.scss";

/* 按钮-基础 */
.i-button {
  appearance: none;
  border-radius: $--button-border-radius;
  border: 0;
  box-sizing: border-box;
  color: inherit;
  display: block;
  font-size: $--button-font-size;
  height: $--button-height;
  outline: 0;
  overflow: hidden;
  position: relative;
  text-align: center;

  /* 按钮-状态 */
  &.is-disabled {
    opacity: 0.6;
  }
}

/* 按钮-尺寸 */
.i-button--small {
  display: inline-block;
  font-size: 14px;
  padding: 0 12px;
  height: 33px;
}

.i-button--normal {
  display: inline-block;
  padding: 0 12px;
}

.i-button--large {
  display: block;
  width: 100%;
}

/* 按钮-风格 */
.i-button--default {
  color: #656b79;
  background-color: #f6f8fa;
  box-shadow: 0 0 1px #b8bbbf;
  &.is-plain {
    border: 1px solid #5a5a5a;
    background-color: transparent;
    box-shadow: none;
    color: #5a5a5a;
  }
}

.i-button--primary {
  color: #fff;
  background-color: $--button-primary-fill;
  &.is-plain {
    border: 1px solid $--button-primary-fill;
    background-color: transparent;
    color: $--button-primary-fill;
  }
}

.i-button--danger {
  color: #fff;
  background-color: #ef4f4f;
  &.is-plain {
    border: 1px solid #ef4f4f;
    background-color: transparent;
    color: #ef4f4f;
  }
}

/* 按钮颜色 */
.i-button--red {
  font-size: rem(36);
  height: rem(86);
  color: #fff;
  background-color: #d6024c;
}

.i-button--gray {
  font-size: rem(36);
  height: rem(86);
  color: #333333;
  background-color: #eeeeee;
}

/* 按钮-图标 */
.i-button-icon {
  vertical-align: middle;
  display: inline-block;
}

.i-button-text {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>