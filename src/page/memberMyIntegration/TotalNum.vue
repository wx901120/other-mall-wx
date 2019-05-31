<template>
  <div class="wx-totalNum">
    <span>总计 {{ exchangeNum }}</span>
  </div>
</template>

<script>
export default {
  name: 'TotalNum',

  props: {
    exchangeNum: {
      type: Number,
    },
  },
};
</script>


<style lang="scss" scoped>
@include b(totalNum) {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 30px;
  width: 100%;
  font-size: 12px;
  color: #fff;
  text-align: center;
  background-color: #fff;
  z-index: 9999;
  span {
    float: right;
    display: inline-block;
    padding: 0 24px;
    height: 30px;
    line-height: 30px;
    background-color: #d6024c;
  }
}
</style>
