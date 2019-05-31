<template>
  <!-- 积分模块 -->
    <div class="wx-integrations bg-white">
      <div class="wx-integrations__item"
           @click="$router.push({ name: 'memberMyIntegration' })">
        <span class="i-icon i-icon-integration"></span>
        <h3>我的积分</h3>
      </div>
      <div class="wx-integrations__item"
           @click="gotoPointMall()">
        <span class="i-icon i-icon-bag"></span>
        <h3>积分商城</h3>
      </div>
      <div class="wx-integrations__item"
           @click="$router.push({ name: 'memberExchangeRecords' })">
        <span class="i-icon i-icon-record"></span>
        <h3>兑换记录</h3>
      </div>
      <div class="wx-integrations__item"
           @click="$router.push({ name: 'memberSelfIntegration' })">
        <span class="i-icon i-icon-v"></span>
        <h3>自助积分</h3>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Integration',

  props: {
    memberCenterResult: {
      type: Object,
    },
  },

  methods: {
    gotoPointMall() {
      if (window.parseInt(window.$bid) === 51) {
        window.location.href = this.memberCenterResult.ylUrlPointMall;
        return;
      }

      this.$router.push({ name: 'integrationMall' });
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(integrations) {
  display: flex;
  height: rem(140);

  @include e(item) {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 25%;
    height: rem(140);
    span {
      margin: rem(25) auto rem(14);
      // display: block;
      // width: 100%;
      // height: rem(86);
    }
    h3 {
      width: 100%;
      text-align: center;
      font-size: rem(28);
      color: #333333;
    }
  }
}
</style>
