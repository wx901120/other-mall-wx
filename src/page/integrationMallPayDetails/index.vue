<template>
  <div class="pay-details">

    <TheHeader title="积分商城支付" isUnderline></TheHeader>

    <GoodDetail :productData="productData"></GoodDetail>

    <ModelPayWay :productData="productData">
      <ThePayCheckList :productData="productData"
                       :amount="$route.params.buyNum | parseInt"
                       v-model="payWayIndex"></ThePayCheckList>
    </ModelPayWay>

    <IButton size="large"
             type="red"
             style="border-radius: 0; position: fixed; bottom: 0;"
             @click="onPay()">立即支付</IButton>
  </div>
</template>

<script>
import { TheHeader, ThePayCheckList } from '@/components/index';
import GoodDetail from './GoodDetail';
import ModelPayWay from './ModelPayWay';
import * as service from '@/api/service';
import wx from 'weixin-js-sdk';
import _ from 'lodash';
import * as mUtils from '@/utils/mUtils';

export default {
  name: 'integrationMallPayDetails',

  components: {
    TheHeader,
    GoodDetail,
    ThePayCheckList,
    ModelPayWay,
  },

  data() {
    return {
      productData: {
        info: {},
      },
      myIntegration: 0,
      payWayIndex: -1,
    };
  },

  async mounted() {
    this.getData();
    this.getPersonInfo();
  },

  methods: {
    // 获取支付显示信息
    async getData() {
      const data = await service.exchangeDetails({
        id: this.$route.params.id,
        buyNum: this.$route.params.buyNum,
      });

      this.productData = data.result;

      mUtils.setStore('integrationMallCardId', data.result.info.cardId);
    },

    async getPersonInfo() {
      const data = await service.integralMall({
        rangeId: this.sectionIndex,
        search_text: this.searchText,
      });
      this.myIntegration = data.result.integral;
    },

    // 点击进行支付
    onPay: _.debounce(
      async function onPay() {
        let tips = '';

        if (this.payWayIndex === -1) {
          this.$Toast('请选择支付方式');
          return;
        }


        if (this.payWayIndex === 0) {
          // 积分支付
          tips =
              `是否确定扣除 ${this.productData.info.integral * this.$route.params.buyNum} 积分，兑换${this.productData.info.goodName}？`;
        } else if (this.payWayIndex === 1) {
          // 组合支付
          tips =
              `是否确定扣除 ${this.productData.info.mixMoney * this.$route.params.buyNum} 元和 ${this.productData.info.mixIntegral * this.$route.params.buyNum} 积分，兑换${this.productData.info.goodName}？`;
        } else {
          // 微信支付
          tips =
              `是否确定扣除 ${this.productData.info.money * this.$route.params.buyNum} 元，兑换${this.productData.info.goodName}？`;
        }

        this.$MessageBox.confirm(tips, '温馨提示').then(async () => {
          if (this.payWayIndex === 0) {
            // 积分支付
            this.integralPay();
          } else {
            this.mixPay();
          }
        });
      },
      200,
      {
        leading: false,
        trailing: true,
      },
    ),

    // 积分支付
    async integralPay() {
      const buyAuthorData = await service.exchangeGoods({
        buyNum: this.$route.params.buyNum,
        id: this.$route.params.id,
      });

      if (buyAuthorData.errCode === -1) {
        this.$MessageBox.alert(buyAuthorData.errMsg);
        return;
      }

      this.$MessageBox.alert('您的优惠券已经放入您的卡包').then(() => {
        this.$router.push({ name: 'coupons' });
      });
    },

    // 混合支付
    async mixPay() {
      if (
        this.payWayIndex === 1 && window.parseInt(this.productData.allIntegral) < this.productData.info.mixIntegral * this.$route.params.buyNum
      ) {
        this.$Toast('积分不足');
        return;
      }

      // 判断运行环境
      const istest = process.env.IS_TEST;
      const bid = process.env.BID;
      const externalBid = process.env.EXTERNAL_BID;
      const apiEnv = process.env.API_ENV;
      const testApi = process.env.TEST_API; // 测试后台接口主机地址
      const onLineApi = process.env.ONLINE_API; // 正式后台接口主机地址
      const apiURL = apiEnv === 'test' ? testApi : onLineApi;
      const attach = {
        bid: istest === 'yes' ? externalBid : bid,
        id: this.timeSlotID,
        payType: this.payWayIndex === 1 ? 2 : 1,
        userId: this.uid,
        buyNum: this.$route.params.buyNum,
      };

      // const host = istest === 'yes' ? testUrl : onlineUrl;
      const href = window.location.href.slice(0, window.location.href.indexOf('/#/'));
      const data = await service.mixPay({
        openid:
          istest === 'yes'
            ? 'oKPuYjvxCaklKurNUF6zcLfe_EY4'
            : this.productData.openid,
        body: '活动',
        total_fee:
          this.payWayIndex === 1
            ? this.productData.info.mixMoney
            : this.productData.info.money,
        notify_url: `${apiURL}/Webapi/ShopTeach/weixinpayreturn`,
        attach: JSON.stringify(attach),
        // TODO: 上线前，需检查改修改
        // reurl: `http://${host}/hanzhoudasha_mall/#/memberActivityPayDetail/${this
        //   .$route.params.id}/${this.$route.params.timeSlotIndex}`,
        reurl: `${href}/#/coupons?bid=${window.$bid}`,
      });

      if (data.ErrCode !== 0) {
        this.$Toast(data.errMsg);
      }

      window.location.href = data.data.url;
    },
  },
};
</script>


<style lang="scss" scoped>
</style>
