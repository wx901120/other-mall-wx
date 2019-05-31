<template>
  <!-- 活动详情 -->
  <div class="wx-actDetail bg-white" v-if="activityInfo.nContent">
    <h3 class="wx-actDetail__title">活动详情</h3>
    <div class="wx-actDetail__content"
         v-html="activityInfo.nContent">
      <!-- <p>1.活动期间，购买两件正价商品享7折优惠；</p>
        <p>2.使用日期：2017.10.11 - 2017.11.11；</p>
        <p>3.使用时段：09:00-18:00；</p>
        <p>4.如需开具发票，请具体咨询商户；</p>
        <p>5.该活动所有解释权归于商户所有。</p> -->
    </div>
  </div>
</template>

<script>

export default {
  name: 'ActivityDetail',

  props: {
    activityInfo: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(actDetail) {
  border-top: rem(18) solid #f0f2f5;

  @include e(title) {
    padding: 0 rem(20);
    font-weight: bold;
    display: flex;
    align-items: center;
    height: rem(80);
    font-size: rem(32);
    color: #333333;
  }

  @include e(content) {
    padding: 0 rem(20);
    img {
      width: 100%;
    }
  }
}
</style>

