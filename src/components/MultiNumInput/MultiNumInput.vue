<template>
  <div class="multi-num-input">
    <button class="minus-btn"
            @click="calc('-')">-</button>
    <input type="number"
           class="text"
           v-model="num"
           @blur="valitate()">
    <button class="add-btn"
            @click="calc('+')">+</button>
  </div>
</template>

<script>
export default {
  name: 'MultiNumInput',

  props: {
    value: {
      type: String | Number,
      default: 1,
    },
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
    },
  },

  data() {
    return {
      num: window.parseInt(this.value),
    };
  },

  watch: {
    num: {
      handler(newVal) {
        console.log('newVal', newVal);
        let val = window.parseInt(newVal);

        if (!val) {
          val = 0;
        }

        // 不允许小数
        if (val !== newVal) {
          this.num = val;
          return;
        }
        console.log('val', val);
        // 最小值
        if (val < this.min) {
          this.num = this.min;
        }

        // 最大值
        if (val > this.max) {
          this.num = this.max;
        }

        this.$emit('input', val);
      },
      // immediate: true,
    },
    max: {
      /* watch的handler函数不要写成箭头函数，否则访问不到真正想要的this */
      handler(newVal) {
        // this.$nextTick(() => {
        //   console.log('num', this.num);
        //   console.log('value', this.value);
        //   console.log('max', newVal);
        // });
        console.log('this', this);
        // console.log('num', this.value);
        // console.log('newVal', newVal);
        if (this.value > newVal) {
          this.num = newVal;
        }
      },
      // immediate: true,
    },
  },

  mounted() {
    this.$nextTick(() => {
      console.log('hello world');
      console.log('value', this.value);
      console.log('max', this.max);
      if (this.value > this.max) {
        this.value = this.max;
      }
    });
  },

  methods: {
    calc(sign) {
      if (sign === '-') {
        this.num--;
      }

      if (sign === '+') {
        this.num++;
      }
    },
    valitate() {
      if (this.num < this.min || !this.num) {
        this.num = this.min;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/style/mixin.scss";

.multi-num-input {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0;
  button {
    display: inline-block;
    width: rem(70);
    height: rem(70);
    background-color: #fff;
    border: 1px solid #e5e5e5;
    outline: none;
    font-size: rem(24);
    &.minus-btn {
      border-radius: rem(8) 0 0 rem(8);
    }
    &.add-btn {
      border-radius: 0 rem(8) rem(8) 0;
    }
  }
  .text {
    width: rem(80);
    height: rem(70);
    border: none;
    outline: none;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    font-size: rem(24);
    text-align: center;
  }
}
</style>
