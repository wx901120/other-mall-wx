<template>
  <div class="wx-search">
    <span class="wx-search__inputWrap">
      <span class="icon-glass"></span>
      <input type="text"
             placeholder="搜索"
             class="wx-search__inputSearch"
             ref="input"
             v-model="currentVal">
      <span class="wx-search__btn"
              @click="search()">搜索</span>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentVal: this.value,
    };
  },

  props: ['value'],

  watch: {
    currentVal(val) {
      this.$emit('input', val);
    },

    value(val) {
      this.currentVal = val;
    },
  },

  methods: {
    search() {
      this.$emit('search');
    },
  },
};
</script>

<style lang="scss">
@include b(search) {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: rem(16) 0;
  background-color: #fff;
  font-size: 0;

  @include e(inputWrap) {
    position: relative;
    display: flex;
    border-radius: rem(10);
    overflow: hidden;
    font-size: 0;
  }

  @include e(inputSearch) {
    display: inline-flex;
    align-items: center;
    border: 1px solid #ededef;
    width: rem(484);
    height: rem(58);
    font-size: rem(26);
    color: #999999;
    background-color: #f4f4f4;
    text-indent: rem(40);
    border-radius: 0;
  }

  @include e(btn) {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: rem(120);
    text-align: center;
    background-color: #d6024c;
    border: none;
    font-size: rem(36);
    color: #fff;
  }
}

.icon-glass {
  position: absolute;
  top: 0;
  left: rem(12);
  right: auto;
  bottom: 0;
  margin: auto;
  width: rem(25);
  height: rem(25);
  background: url("./image/icon-magnifying-glass-gray.png") no-repeat;
  background-size: cover;
}
</style>


