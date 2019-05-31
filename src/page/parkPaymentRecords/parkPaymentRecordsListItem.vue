<template>
  <div class="wx-parkPaymentRecordsListItem">
    <div class="wx-parkPaymentRecordsListItem__summaryContent">
      <div class="wx-parkPaymentRecordsListItem__row wx-parkPaymentRecordsListItem__top">
        <span class="wx-parkPaymentRecordsListItem__left wx-parkPaymentRecordsListItem__title">{{ record.title }}</span>
        <span class="wx-parkPaymentRecordsListItem__right wx-parkPaymentRecordsListItem__price">￥{{ record.parkAmount }}</span>
      </div>
      <div class="wx-parkPaymentRecordsListItem__row wx-parkPaymentRecordsListItem__bottom">
        <span class="wx-parkPaymentRecordsListItem__left">
          <span class="wx-parkPaymentRecordsListItem__parkPlateNumber">{{ record.carNo }}</span>
        </span>
        <span class="wx-parkPaymentRecordsListItem__right">
          <span class="wx-parkPaymentRecordsListItem__parkTimeLabel">停车时长</span>
          <!-- <span class="wx-parkPaymentRecordsListItem__parkTime">80分钟</span> -->
          <span class="wx-parkPaymentRecordsListItem__parkTime">{{ record.parkTime | sec2Hour }}</span>
        </span>
      </div>
    </div>
    <div class="wx-parkPaymentRecordsListItem__detailContent" :class="{ 'is-expand': isExpand }">
      <div class="wx-parkPaymentRecordsListItem__row wx-parkPaymentRecordsListItem__detailItem">
        <div class="wx-parkPaymentRecordsListItem__left is-detail">
          缴费明细
        </div>
        <div class="wx-parkPaymentRecordsListItem__right is-detail">
          <span class="wx-parkPaymentRecordsListItem__rightItem" v-if="record.integral != 0">积分支付{{ record.integral }}</span>
          <span class="wx-parkPaymentRecordsListItem__rightItem" v-if="record.couponArr[0].cardMoney != 0">抵扣券支付{{record.couponArr[0].cardMoney}}元</span>
          <span class="wx-parkPaymentRecordsListItem__rightItem" v-if="record.weixinPay != 0">微信支付{{ record.weixinPay / 100 }}元</span>
        </div>
      </div>
      <div class="wx-parkPaymentRecordsListItem__row wx-parkPaymentRecordsListItem__detailItem is-rate">
        <div class="wx-parkPaymentRecordsListItem__left">费率</div>
        <div class="wx-parkPaymentRecordsListItem__right">5元/60分钟</div>
      </div>
      <div class="wx-parkPaymentRecordsListItem__row wx-parkPaymentRecordsListItem__detailItem">
        <div class="wx-parkPaymentRecordsListItem__left">日期</div>
        <div class="wx-parkPaymentRecordsListItem__right">{{ record.indate | dateStringFilter }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'parkPaymentRecordsListItem',

  props: {
    isExpand: {
      type: Boolean,
    },
    record: {
      type: Object,
    }
  },
};
</script>


<style lang="scss" scoped>
@include b(parkPaymentRecordsListItem) {
  border-radius: 4px;
  overflow: hidden;

  &:nth-child(n+2) {
    margin-top: rem(30);
  }

  @include e(summaryContent) {
    padding: rem(28) rem(20) 0;
    height: rem(160);
    background-color: #d6024c;
    color: #fff;
  }

  @include e(detailContent) {
    overflow: hidden;
    height: 0;
    background-color: #fff;
    color: #262626;
    line-height: rem(40);

    @include when(expand) {
      height: auto;
      padding: rem(20);
    }
  }

  @include e(top) {
    font-size: rem(36);
  }
  @include e(bottom) {
    margin-top: rem(20);
    font-size: rem(28);
  }

  @include e(row) {
    display: flex;
    justify-content: space-between;

    @include when(rate) {
      margin-top: rem(14);
    }
  }

  @include e(left) {
    @include when(expand) {
      font-size: rem(28);
    }

    @include when(detail) {
      width: 50%;
    }
  }

  @include e(right) {
    @include when(detail) {
      width: 50%;
    }
  }

  @include e(parkPlateNumber) {
  }

  
  @include e(rightItem) {
    display: block;
    text-align: right;
    color: #ff0000;
  }

  @include e(title) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    // width: rem(300);
  }
  @include e(price) {}
  @include e(parkTimeLabel) {}
  @include e(parkTime) {
    font-size: rem(24);
  }

  @include e(detailItem) {}
}
</style>
