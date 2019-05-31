<template>
  <div class="wx-goodCard"
       @click="toPage(recommend)">
    <div class="wx-goodCard__imgWrap">
      <img :src="`http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/article/${recommend.picPath}`"
           alt="">
    </div>
    <div class="wx-goodCard__textWrap">
      <p class="wx-goodCard__shopName">{{ recommend.field1 }}</p>
      <p class="wx-goodCard__shopSlogan">{{ recommend.field2 }}</p>
      <p class="wx-goodCard__shopAvgConsume">{{ recommend.subHead }}</p>
      <p class="wx-goodCard__shopAvgMoney">人均：{{ recommend.perConsume }}元/人</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "",

  props: {
    recommend: {
      type: Object
    }
  },

  methods: {
    toPage(item) {
      const type = item.clickType;
      if (type === "1") {
        // 外链
        window.location.href = item.clickValue;
      } else if (type === "2") {
        // 活动页
        this.$router.push({ name: "associationActivity" });
      } else if (type === "3") {
        // 店铺列表
        this.$router.push({ name: "shopList" });
      } else if (type === "4") {
        // 游戏
      } else if (type === "5") {
        // 积分商城
        this.$router.push({ name: "integrationMall" });
      } else if (type === "6") {
        // 客服
      } else if (type === "7") {
        // 商户活动
        this.$router.push({
          name: "specialOffers",
          params: { type: "commercial" }
        });
      } else if (type === "8") {
        // 美食店铺
        this.$router.push({
          name: "BusinessList",
          params: { yetaiId: this.$store.state.bid === 53 ? "249" : "247" }
        });
      } else if (type === "9") {
        // 会员卡说明
        // this.$router.push({ name: 'memberCard' });
      } else if (type === "10") {
        // 商城简介
      } else if (type === "11") {
        // 关于
        // this.$router.push({ name: 'About' });
      } else if (type === "12") {
        // 用户反馈
        this.$router.push({ name: "memberFeedBack" });
      } else if (type === "13") {
        // 会员中心
        this.$router.push({ name: "memberCenter" });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@include b(goodCard) {
  width: rem(340);
  margin-bottom: rem(30);

  @include e(imgWrap) {
    width: 100%;
    height: rem(190);
    img {
      width: 100%;
    }
  }

  @include e(textWrap) {
    p {
      line-height: rem(46);
    }
  }

  @include e(shopName) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: rem(28);
    color: #262626;
    margin-top: rem(16);
  }

  @include e(shopSlogan) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: rem(24);
    color: #999999;
  }

  @include e(shopAvgConsume) {
    font-size: rem(28);
    width: rem(340);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #999999;
  }
  @include e(shopAvgMoney) {
    font-size: rem(24);
    color: #ff0036;
  }
}
</style>
