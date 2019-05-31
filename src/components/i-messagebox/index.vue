<template>
  <div class="i-msgbox-wrapper">
    <transition name="msgbox-bounce">
      <div class="i-msgbox"
           :class="{'i-msgbox-alert': !showCancelButton}"
           v-show="value">
        <div class="i-msgbox-header"
             v-if="title !== ''">
          <div class="i-msgbox-title">{{ title }}</div>
        </div>
        <div class="i-msgbox-content"
             v-if="message !== ''">
          <div class="i-msgbox-message"
               v-html="message"></div>
          <div class="i-msgbox-input"
               v-show="showInput">
            <input v-model="inputValue"
                   :placeholder="inputPlaceholder"
                   ref="input">
            <div class="i-msgbox-errormsg"
                 :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{ editorErrorMessage }}</div>
          </div>
        </div>
        <div class="i-msgbox-btns">
          <button :class="[ cancelButtonClasses ]"
                  v-show="showCancelButton"
                  @click="handleAction('cancel')">{{ cancelButtonText }}</button>
          <button :class="[ confirmButtonClasses ]"
                  v-show="showConfirmButton"
                  @click="handleAction('confirm')">{{ confirmButtonText }}</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
.msgbox-bounce-enter {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.7);
}
.msgbox-bounce-leave-active {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.9);
}
</style>

<style src="@/components/assets/style/popup.css"></style>

<script type="text/babel">
const CONFIRM_TEXT = '确定';
const CANCEL_TEXT = '取消';

import Popup from '@/components/utils/popup';

export default {
  mixins: [Popup],

  props: {
    modal: {
      default: true,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    lockScroll: {
      type: Boolean,
      default: false,
    },
    closeOnClickModal: {
      default: true,
    },
    closeOnPressEscape: {
      default: true,
    },
    inputType: {
      type: String,
      default: 'text',
    },
  },

  computed: {
    confirmButtonClasses() {
      let classes = 'i-msgbox-btn i-msgbox-confirm ' + this.confirmButtonClass;
      if (this.confirmButtonHighlight) {
        classes += ' i-msgbox-confirm-highlight';
      }
      return classes;
    },
    cancelButtonClasses() {
      let classes = 'i-msgbox-btn i-msgbox-cancel ' + this.cancelButtonClass;
      if (this.cancelButtonHighlight) {
        classes += ' i-msgbox-cancel-highlight';
      }
      return classes;
    },
  },

  methods: {
    doClose() {
      this.value = false;
      this._closing = true;

      this.onClose && this.onClose();

      setTimeout(() => {
        if (this.modal && this.bodyOverflow !== 'hidden') {
          document.body.style.overflow = this.bodyOverflow;
          document.body.style.paddingRight = this.bodyPaddingRight;
        }
        this.bodyOverflow = null;
        this.bodyPaddingRight = null;
      }, 200);
      this.opened = false;

      if (!this.transition) {
        this.doAfterClose();
      }
    },

    handleAction(action) {
      if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
        return;
      }
      let callback = this.callback;
      this.value = false;
      callback(action);
    },

    validate() {
      if (this.$type === 'prompt') {
        let inputPattern = this.inputPattern;
        if (inputPattern && !inputPattern.test(this.inputValue || '')) {
          this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
          this.$refs.input.classList.add('invalid');
          return false;
        }
        let inputValidator = this.inputValidator;
        if (typeof inputValidator === 'function') {
          let validateResult = inputValidator(this.inputValue);
          if (validateResult === false) {
            this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
            this.$refs.input.classList.add('invalid');
            return false;
          }
          if (typeof validateResult === 'string') {
            this.editorErrorMessage = validateResult;
            return false;
          }
        }
      }
      this.editorErrorMessage = '';
      this.$refs.input.classList.remove('invalid');
      return true;
    },

    handleInputType(val) {
      if (val === 'range' || !this.$refs.input) return;
      this.$refs.input.type = val;
    },
  },

  watch: {
    inputValue() {
      if (this.$type === 'prompt') {
        this.validate();
      }
    },

    value(val) {
      this.handleInputType(this.inputType);
      if (val && this.$type === 'prompt') {
        setTimeout(() => {
          if (this.$refs.input) {
            this.$refs.input.focus();
          }
        }, 500);
      }
    },

    inputType(val) {
      this.handleInputType(val);
    },
  },

  data() {
    return {
      title: '',
      message: '',
      type: '',
      showInput: false,
      inputValue: null,
      inputPlaceholder: '',
      inputPattern: null,
      inputValidator: null,
      inputErrorMessage: '',
      showConfirmButton: true,
      showCancelButton: false,
      confirmButtonText: CONFIRM_TEXT,
      cancelButtonText: CANCEL_TEXT,
      confirmButtonClass: '',
      confirmButtonDisabled: false,
      cancelButtonClass: '',
      editorErrorMessage: null,
      callback: null,
    };
  },
};
</script>

<style lang="scss">
@import "src/components/assets/style/mixin.scss";
@import "src/components/assets/style/var.scss";
.i-msgbox {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  background-color: #fff;
  width: rem(560);
  border-radius: rem(8);
  font-size: 16px;
  -webkit-user-select: none;
  overflow: hidden;
  backface-visibility: hidden;
  transition: 0.2s;
}
.i-msgbox-title {
  text-align: center;
  padding-left: 0;
  margin-bottom: 0;
  font-size: 16px;
  font-weight: 700;
}
.i-msgbox-header {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: rem(110);
  font-size: rem(36);
  color: #000;
  /* background-color: #dec07b; */
}
.i-msgbox-content {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  padding: 10px 20px 15px;
  border-bottom: 1px solid #ddd;
  /* min-height: rem(316); */
  padding: 0 rem(78) rem(30);
  position: relative;
  font-size: rem(30);
}
.i-msgbox-message {
  color: #999;
  margin: 0;
  text-align: center;
  /* line-height: rem(3); */
}
.i-msgbox-input {
  padding-top: 15px;
  input {
    border: 1px solid #dedede;
    border-radius: 5px;
    padding: 4px 5px;
    width: 100%;
    appearance: none;
    outline: none;
  }
}
.i-msgbox-errormsg {
  color: red;
  font-size: 12px;
  min-height: 18px;
  margin-top: 2px;
}
.i-msgbox-btns {
  display: flex;
}
.i-msgbox-btn {
  line-height: rem(100);
  display: block;
  background-color: #fff;
  flex: 1;
  margin: 0;
  border: 0;
}
.i-msgbox-cancel {
  width: 50%;
  border-right: 1px solid #ddd;
  color: #666666;
  font-weight: bold;
}
.i-msgbox-confirm {
  width: rem(420);
  height: 100%;
  color: #d6024c;
  font-weight: bold;
}
.i-msgbox-alert {
  .i-msgbox-header {
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // min-height: rem(92);
    padding-top: rem(30);
    background-color: #fff;
    color: #000;
    font-size: rem(36);
    font-weight: bold;
  }
  .i-msgbox-content {
    padding-bottom: rem(70);
  }
  .i-msgbox-btns {
    // border-top: 1px solid #d2d3d5;
    .i-msgbox-confirm {
      height: rem(100);
      line-height: auto;
      color: #fff;
      font-size: rem(30);
      color: #d6024c;
    }
  }
}
</style>
