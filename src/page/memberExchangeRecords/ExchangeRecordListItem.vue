<template>
  <li class="wx-exchangeRecordsItem">
    <h3 class="wx-exchangeRecordsItem__title exchange-records-title">订单编号：{{ record.orderId }}</h3>
    <div class="wx-exchangeRecordsItem__goodDetail">
      <div class="wx-exchangeRecordsItem__leftContent wx-exchangeRecordsItem__imgWrap">
        <img :src="record.goodPic"
             alt="">
      </div>
      <div class="wx-exchangeRecordsItem__rightContent">
        <div class="wx-exchangeRecordsItem__goodTitle">{{ record.goodsName }}</div>
        <div class="wx-exchangeRecordsItem__goodNums">x{{ record.buyCount }}</div>
        <div class="wx-exchangeRecordsItem__goodIntegration">{{ record.integral }}积分</div>
        <div class="wx-exchangeRecordsItem__exchangeDate">兑换时间：{{ record.indate | capitalizeDate }}</div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'ExchangeRecordListItem',

  props: {
    record: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(exchangeRecordsItem) {
  background-color: #fff;
  margin-bottom: rem(20);
  padding: rem(20) rem(20) rem(30);
  border-bottom: 1px solid #d5d5d5;

  @include e(title) {
    font-size: rem(28);
    color: #333333;
  }

  @include e(goodDetail) {
    display: flex;
    margin-top: rem(24);
  }

  @include e(leftContent) {
    overflow: hidden;
    width: rem(160);
    height: rem(160);
    img {
      width: 100%;
      height: auto;
    }
  }

  @include e(rightContent) {
    width: rem(480);
    display: flex;
    flex-flow: row wrap;
    align-content: space-between;
    margin-left: rem(40);
  }

  @include e(goodTitle) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: rem(32);
    color: #262626;
  }

  @include e(goodNums) {
    font-size: rem(28);
    color: #959595;
    width: 100%;
  }

  @include e(goodIntegration) {
    font-size: rem(28);
    font-weight: bold;
    color: #ff5152;
    width: 100%;
  }

  @include e(exchangeDate) {
    font-size: rem(24);
    color: #959595;
    width: 100%;
  }
}
</style>
