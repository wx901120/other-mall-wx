<template>
  <div class="wx-thePayCheckListPark">
    <div class="wx-thePayCheckListPark__row">
      <div class="wx-thePayCheckListPark__leftTitle">
          <span class="wx-payMethodCheckBox__inputWrap">
            <input class="wx-payMethodCheckBox__checkboxInput"
                  type="checkbox"
                  name="payMethod"
                  id="weixin"
                  value="weixin"
                  v-model="payWayIndexArr">
            <span class="wx-payMethodCheckBox__fakeInput"
                  :class="{ 'is-checked': isChecked('weixin') }"></span>
          </span>
          <label class="wx-payMethodCheckBox__label" for="weixin">微信支付</label>
      </div>
      <div class="wx-thePayCheckListPark__rightContent"></div>
    </div>
    <div class="wx-thePayCheckListPark__row">
      <div class="wx-thePayCheckListPark__leftTitle">
           <span class="wx-payMethodCheckBox__inputWrap">
            <input class="wx-payMethodCheckBox__checkboxInput"
                  type="checkbox"
                  name="payMethod"
                  id="integral"
                  value="integral"
                  v-model="payWayIndexArr">
            <span class="wx-payMethodCheckBox__fakeInput"
                  :class="{ 'is-checked': isChecked('integral') }"></span>
          </span>
           <label class="wx-payMethodCheckBox__label" for="integral">积分支付</label>
      </div>
      <div class="wx-thePayCheckListPark__rightContent">
        <slot name="pointInput"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThePayCheckList',

  props: {
    value: {
      type: Array,
    },
  },

  data() {
    return {
      payWayIndexArr: this.value,
    };
  },

  methods: {
    isChecked(type) {
      for (let i = 0; i < this.payWayIndexArr.length; i++) {
        if (type === this.payWayIndexArr[i]) {
          return true;
        }
      }
    },
  },

  watch: {
    value(newVal) {
      this.payWayIndexArr = newVal;
    },
    payWayIndexArr(newVal) {
      this.$emit('input', newVal);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/style/mixin.scss";

@include b(thePayCheckListPark) {
  @include e(row) {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 rem(26);
    height: rem(100);
  }

  @include e(leftTitle) {
    flex-shrink: 0;
    color: #333333;
    // text-indent: rem(64);
    // background-image: url("./image/icon_unchecked.png");
    // background-repeat: no-repeat;
    // background-position: 0 center;
    // background-size: rem(30) rem(30);

    @include when(checked) {
      background-image: url("./image/icon_checked.png");
    }
  }

  @include e(rightContent) {
    color: #999999;
  }
}

@include b(payMethodCheckBox) {
  display: inline-flex;
  align-items: center;
  @include e(inputWrap) {
    position: relative;
    display: inline-block;
    background-color: #fff;
    /* border-radius: 100%; */
    // border: 1px solid #d6024c;
    position: relative;
    width: rem(30);
    height: rem(30);
    vertical-align: middle;
    border-radius: 2px;
    background-image: url("./image/icon_unchecked.png");
    background-repeat: no-repeat;
    background-position: 0 center;
    // background-size: rem(30) rem(30);
    background-size: cover;
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

    width: rem(30);
    height: rem(30);

    @include when(checked) {
      background-image: url("./image/icon_checked.png");
      background-size: cover;
      // &:after {
      //   border: 2px solid transparent;
      //   border-left: 0;
      //   border-top: 0;
      //   content: " ";
      //   left: 2px;
      //   position: absolute;
      //   width: 4px;
      //   height: 8px;
      //   transform: rotate(45deg) scale(0);
      //   transition: transform 0.2s;
      //   border-color: #d6024c;
      //   transform: rotate(45deg) scale(0.8);
      // }
    }
  }

  @include e(label) {
    margin-left: rem(40);
  }
}
</style>
