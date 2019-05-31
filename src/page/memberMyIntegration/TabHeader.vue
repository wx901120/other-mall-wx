<template>
  <div class="wx-tabContentHeader">
    <span class="wx-tabContentHeader__item">时间</span>
    <span class="wx-tabContentHeader__item">来源</span>
    <span class="wx-tabContentHeader__item">兑换商品</span>
    <span class="wx-tabContentHeader__item">积分</span>
  </div>
</template>

<style lang="scss" scoped>
@include b(tabContentHeader) {
  margin-top: rem(38);
  display: flex;
  border: 1px solid #e5e5e5;
  border-left: none;
  border-right: none;

  @include e(item) {
    width: 25%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: rem(100);
    font-size: rem(28);
    color: #333333;
    font-weight: bold;
  } 
}
</style>
