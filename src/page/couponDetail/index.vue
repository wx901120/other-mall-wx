<template>
  <div class="coupon-detail">

    <!-- 导航 -->
    <TheHeader fixed
               type="backCircleGray"></TheHeader>

    <div class="cardCode">
      <div class="cardCodeImg">
        <qriously class="qrcodebox"
                  :value="qrcode"
                  :size="140" />
      </div>
      <div class="cardCodeTxt">
        使用时请出示该二维码
      </div>
    </div>

    <div class="coupon-info">
      <h3 class="coupon-info-title">{{ couponInfo.title }}</h3>
      <!-- <div class="coupon-info-row">
        <span class="coupon-info-label">剩余数量：</span>
        <span class="coupon-info-content">
          <em class="decorate">{{ couponInfo.totalNum === '0' ? '不限' : couponInfo.totalNum }}</em>{{ couponInfo.totalNum === '0' || !couponInfo.totalNum ? '' : '张' }}</span>
      </div> -->
      <!-- <div class="coupon-info-row">
        <span class="coupon-info-label">兑换数量：</span>
        <span class="coupon-info-content">
          <em class="decorate">2</em>张</span>
      </div> -->
      <div class="coupon-info-row">
        <span class="coupon-info-label">卡券状态：</span>
        <span class="coupon-info-content">
          <em class="decorate">{{ statusTypeText(couponInfo.statusType) }}</em>
        </span>
      </div>
      <div class="coupon-info-row">
        <span class="coupon-info-label">卡券类型：</span>
        <span class="coupon-info-content">
          <em class="decorate">{{ couponTypeParse(couponInfo) }}</em>
        </span>
      </div>
      <div class="coupon-info-row">
        <span class="coupon-info-label">领取时间：</span>
        <span class="coupon-info-content">{{ couponInfo.receiveTime  }}</span>
      </div>
      <div class="coupon-info-row">
        <span class="coupon-info-label">有效时间：</span>
        <span class="coupon-info-content">{{ couponInfo.downStartTime}} 至  {{ couponInfo.downEndTime }}</span>
      </div>
    </div>

    <!-- <CouponDetail :couponsContent="couponInfo"></CouponDetail> -->
    <div class="wx-couponDetails">
    <h3 class="wx-couponDetails__title">卡券详情</h3>
    <div class="wx-couponDetails__content">
      <p v-if="couponInfo.useType == 1">券的金额：{{couponInfo.cardMoney }}元</p>
      <p v-if="couponInfo.useType == 1 && couponInfo.useRule > 0">使用条件：满{{ couponInfo.useRule }}元使用</p>
      <p v-if="couponInfo.useType == 1 && couponInfo.useRule == 0">使用条件：不限制</p>
      <p v-if="couponInfo.useType == 3">券的折扣：{{ couponInfo.cardMoney }}折</p>
      <p v-if="couponInfo.useType == 2">市场价值：{{ couponInfo.cardMoney }}元</p>
      <p v-if="couponInfo.useType == 4">券的金额：{{ couponInfo.cardMoney }}</p>
      <p v-if="couponInfo.storeName != ''" >适用店铺：{{ couponInfo.storeName }}</p>
      <p>使用须知：{{ couponInfo.couponsContent }}</p>
      <!-- <p v-html="couponsContent.couponsContent"></p> -->
      <!-- <p class="coupon-details-row">1.凭此券可以在GAGA鲜语店铺消费后使用。</p>
        <p class="coupon-details-row">2.本券仅限于万科城市广场GAGA鲜语店内使用</p>
        <p class="coupon-details-row">3.本券需要下载才能使用。</p> -->
    </div>
  </div>
  </div>
</template>

<script>
import HeadMall from "@/components/HeadMall/index.vue";
import NavMall from "@/components/NavMall/index.vue";
import NavTitle from "@/components/NavTitle/index.vue";
// import CouponDetail from './CouponDetail.vue';
import * as service from "@/api/service";

export default {
  name: "couponDetail",

  components: {
    HeadMall,
    NavMall,
    NavTitle
  },

  data() {
    return {
      couponInfo: {},
      id: this.$route.params.id,
      sid: "",
      qrcode: ""
    };
  },

  created() {
    const code = this.$route.params.code;
    console.log(code,111111111111);
    this.$nextTick(async () => {
      await this.getList();
      const testApi = process.env.TEST_API;
      const onlineApi = process.env.ONLINE_API;
      const domainName = process.env.API_ENV === "test" ? testApi : onlineApi;
      // this.qrcode = `${domainName}/Verification/index?bid=${window.$bid}&id=${
      //   this.$route.params.id
      // }&sid=${this.sid}`;
      this.qrcode = this.$route.params.code;
    });
  },

  methods: {
    async getList() {
      try {
        const data = await service.couponsDetail({
          id: this.id,
          code: this.$route.params.code,
          bid: 51
        });
        this.couponInfo = data.result.info;
        this.sid = data.result.info.sid;
      } catch (error) {
        console.log("error", error);
      }
    },

    statusTypeText(statusType) {
      let statusTypeText = "";

      switch (statusType) {
        case "1":
          statusTypeText = "生成";
          break;

        case "2":
          statusTypeText = "未使用";
          break;

        case "3":
          statusTypeText = "已使用";
          break;

        case "4":
          statusTypeText = "已作废";
          break;

        default:
          break;
      }

      return statusTypeText;
    },

    // couponTypeParse(coupon) {
    //   const {
    //     cardType,
    //     businessType,
    //   } = coupon;
    //   let couponTypeStr = '';
    //   switch (cardType) {
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
    //       if (businessType === '1') {
    //         couponTypeStr = '门票券';
    //       } else if (businessType === '2') {
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

    //   return couponTypeStr;
    // },
    couponTypeParse(coupon) {
      const { useType } = coupon;
      console.log(useType);
      let couponTypeStr = "";
      switch (useType) {
        case "1":
          couponTypeStr = "代金券";
          break;
        case "2":
          couponTypeStr = "礼品券";
          break;
        case "3":
          couponTypeStr = "折扣券";
          break;
        case "4":
          couponTypeStr = "停车券";
          break;
        case "5":
          couponTypeStr = "通用券";
          break;
        default:
          break;
      }

      return couponTypeStr;
    }
  }
};
</script>

<style lang="scss" scoped>
@include b(couponDetails) {
  margin: rem(50) rem(50) 0;
  padding: rem(10) 0 0;
  border-top: 1px dashed #b2b2b2;

  @include e(title) {
    line-height: rem(50);
    font-size: rem(32);
    font-weight: bold;
    color: #000;
    padding-bottom: rem(10);
  }

  @include e(content) {
    font-size: rem(28);
    color: #999999;
    .coupon-detail-row {
      line-height: rem(34);
    }

    img {
      width: 100%;
    }
  }
}
.coupon-detail {
  background-color: #fff;
}

.cardInfo {
  margin: rem(0) rem(60) rem(10);
}

.cardCode {
  font-size: 16px;
  margin-top: rem(150);
  .cardCodeImg {
    text-align: center;
  }

  .cardCodeTxt {
    color: #bbb;
    text-align: center;
    font-size: 14px;
    margin-top: rem(40);
  }
}

.coupon-info {
  margin: rem(50) rem(50) 0;
  padding: rem(36) 0 0;
  border-top: 1px dashed #b2b2b2;
  &-title {
    line-height: rem(44);
    font-size: rem(32);
    font-weight: bold;
    color: #000;
  }
  &-row {
    line-height: rem(44);
    .coupon-info-label {
      font-size: rem(28);
      font-weight: bold;
      color: #333333;
    }
    .coupon-info-content {
      font-size: rem(28);
      .decorate {
        font-size: rem(32);
        font-weight: bold;
        color: #ff5152;
      }
    }
  }
}
</style>

