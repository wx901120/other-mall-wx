<template>
  <div class="pay-way-content">
        <div class="row-group"
             :class="{'checked': payWayIndex === 0}"
             @click="payWayIndex = 0">
          <div class="left-title">积分兑换</div>
          <div class="right-content">{{ productData.info.integral * amount }}积分</div>
        </div>
        <div class="row-group"
             :class="{'checked': payWayIndex === 1}"
              v-if="productData.info.mixMoney != '0.00' || productData.info.mixIntegral != '0'"
             @click="payWayIndex = 1">
          <div class="left-title">组合支付</div>
          <div class="right-content">¥{{ productData.info.mixMoney * amount }}元 + {{ productData.info.mixIntegral * amount
            }}积分</div>
        </div>
        <div class="row-group"
             :class="{'checked': payWayIndex === 2}"
             @click="payWayIndex = 2">
          <div class="left-title">微信支付</div>
          <div class="right-content">¥{{ productData.info.money * amount }}元</div>
        </div>
      </div>
</template>

<script>
export default {
  name: 'ThePayCheckList',

  props: {
    productData: {
      type: Object,
    },
    value: {
      type: Number,
    },
    amount: {
      type: Number,
      validator(val) {
        return window.parseInt(val);
      },
    },
  },

  data() {
    return {
      payWayIndex: this.value,
    };
  },

  watch: {
    value(newVal) {
      this.payWayIndex = newVal;
    },
    payWayIndex(newVal) {
      this.$emit('input', newVal);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/style/mixin.scss";

.pay-way-content {
  .row-group {
    padding: 0 rem(26);
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    &.checked {
      .left-title {
        background-image: url('./image/icon_checked.png');
      }
    }
    .left-title {
      flex-shrink: 0;
      color: #333333;
      text-indent: rem(64);
      background-image: url('./image/icon_unchecked.png');
      background-repeat: no-repeat;
      background-position: 0 center;
      background-size: rem(30) rem(30);
    }
    .pay-way-select {
      font-size: rem(32);
    }
    .right-content {
      color: #999999;
    }
  }
}
</style>
