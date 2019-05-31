<template>
  <li class="wx-couponItem"
      :class="couponClass"
      @click="$router.push({ name: 'couponDetail', params: { id: couponInfo.id, code: couponInfo.cvalue } })">
    <h3 class="wx-couponItem__shopnameWrap">
      <span class="shopname"
            v-if="couponInfo.shopName">{{ couponInfo.shopName }}
      </span>
    </h3>
    <div class="wx-couponItem__content color-theme">
      {{ couponInfo.title }}
    </div>
    <div class="wx-couponItem__useCondition">
      使用时间 {{ couponInfo.sendTime }} - {{ couponInfo.endTime }}
    </div>
    <div class="wx-couponItem__valueWrap">
      <span class="wx-couponItem__value">{{ couponInfo.discount }}</span>
      <span class="wx-couponItem__type">{{ couponTypeParse(couponInfo) }}</span>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    couponInfo: {
      type: Object,
    },
    couponType: {
      type: Number,
      default: 1,
    },
  },

  computed: {
    couponClass() {
      if (this.couponType === 2) {
        return 'wx-couponItem--hasused';
      } else if (this.couponType === 3) {
        return 'wx-couponItem--expired';
      }
      return 'wx-couponItem--noused';
    },
  },

  methods: {
    // couponTypeParse(coupon) {
    //   let couponTypeStr = '';
    //   switch (coupon.cardType) {
    //     case '1':
    //       couponTypeStr = '普通卡券';
    //       break;
    //     case '2':
    //       couponTypeStr = '普通卡券';
    //       break;
    //     case '3':
    //       couponTypeStr = '礼品券';
    //       break;
    //     case '4':
    //       couponTypeStr = '游戏券';
    //       break;
    //     case '5':
    //       couponTypeStr = '活动券';
    //       break;
    //     case '6':
    //       couponTypeStr = '评价卡券';
    //       break;
    //     case '7':
    //       couponTypeStr = '优惠券';
    //       break;
    //     case '8':
    //       couponTypeStr = '现金券';
    //       break;
    //     case '9':
    //       couponTypeStr = '实体卡券';
    //       break;
    //     case '10':
    //       couponTypeStr = '课程卡券';
    //       break;
    //     case '11':
    //       couponTypeStr = '折扣券';
    //       break;
    //     case '12':
    //       couponTypeStr = '满减券';
    //       break;
    //     case '13':
    //       if (coupon.businessType === '1') {
    //         couponTypeStr = '门票券';
    //       } else if (coupon.businessType === '2') {
    //         couponTypeStr = '车位预约券';
    //       } else {
    //         couponTypeStr = '停车券';
    //       }
    //       break;
    //     case '14':
    //       couponTypeStr = '积分券';
    //       break;
    //     default:
    //       break;
    //   }

    //   if (!couponTypeStr) {
    //     console.log('coupon', coupon);
    //   }

    //   return couponTypeStr;
    // },
    couponTypeParse(coupon) {
      let couponTypeStr = '';
      switch (coupon.useType) {
        case '1':
          couponTypeStr = '代金券';
          break;  
        case '2':
          couponTypeStr = '礼品券';
          break;
        case '3':
          couponTypeStr = '折扣券';
          break;
        case '4':
          couponTypeStr = '停车券';
          break;
        case '5':
          couponTypeStr = '通用券';
          break;
        default:
          break;
      }

      if (!couponTypeStr) {
        console.log('coupon', coupon);
      }

      return couponTypeStr;
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(couponItem) {
  position: relative;
  padding: 0 rem(50);
  height: rem(178);
  border-radius: rem(10);
  background-color: #fff;
  box-shadow: rem(5) rem(5) rem(10) rem(-8) #000;

  @include m(expired) {
    background: url("./image/coupon_expired.png") rem(365) rem(6) no-repeat,
      url("./image/coupon_bg-gray.png") center center no-repeat;
    background-size: rem(126) rem(128), cover;

    .coupon-value-wrap {
      color: #999;
    }
  }

  @include m(hasused) {
    background: url("./image/coupon_hasused.png") rem(365) rem(6) no-repeat,
      url("./image/coupon_bg-gray.png") center center no-repeat;
    background-size: rem(126) rem(128), cover;

    .coupon-value-wrap {
      color: #999999;
    }
  }

  @include m(noused) {
    background: url("./image/coupon_bg-red.png") center center no-repeat;
    background-size: cover;

    .coupon-value-wrap {
      color: #fff;
    }
  }

  &:nth-child(n + 2) {
    margin-top: rem(26);
  }

  @include e(shopnameWrap) {
    display: flex;
    align-items: center;
    height: rem(54);
    font-size: rem(28);
    color: #333333;
    font-weight: bold;
  }

  @include e(content) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: rem(430);
    font-size: rem(40);
    line-height: rem(66);
    font-weight: bold;
    color: #999999;
  }

  @include e(useCondition) {
    line-height: rem(58);
    color: #999999;
    font-size: rem(24);
    // background: url("./image/dashed_line.png") 0 0 repeat-x;
    background-size: rem(10) rem(2);
  }

  @include e(valueWrap) {
    position: absolute;
    right: 0;
    top: 0;
    width: rem(196);
    height: 100%;
    text-align: center;
    display: flex;
    flex-flow: row wrap;
    align-content: center;
    justify-content: center;
  }

  @include e(value) {
    display: block;
      font-size: rem(72);
      width: 100%;
  }

  @include e(type) {
    display: block;
    font-size: rem(36);
    color: #fff;
  }
}
</style>
