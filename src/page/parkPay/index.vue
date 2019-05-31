<template>
  <div class="wx-parkPay">
    <TheHeader title="缴费支付"></TheHeader>

    <ParkDisplayForm :parkInfo="parkInfo"></ParkDisplayForm>

    <ParkPayForm :deduction="integral / rate">
      <ThePayCheckListPark v-model="payWayIndexArr">
        <MultiNumInput slot="pointInput"
                       v-model="integral"
                       :min="0"
                       :max="integralLimit"></MultiNumInput>
      </ThePayCheckListPark>
    </ParkPayForm>

    <ParkPayBtn @toPay="toPay()"
                :actuallyPaid="actuallyPaid"></ParkPayBtn>

  </div>
</template>

<script>
import * as service from '@/api/service';
import ParkDisplayForm from './ParkDisplayForm';
import ParkPayForm from './ParkPayForm';
import ParkPayBtn from './parkPayBtn';
import { ThePayCheckListPark, MultiNumInput } from '@/components/index';

export default {
  name: 'parkPay',

  components: {
    ParkDisplayForm,
    ParkPayForm,
    ThePayCheckListPark,
    MultiNumInput,
    ParkPayBtn,
  },

  data() {
    return {
      payWayIndexArr: [],

      parkInfo: {
        userInfo: {},
      },

      integral: 0,

      rate: 100,
    };
  },

  computed: {
    integralLimit() {
      if (this.parkInfo.userInfo.integral) {
        const rate = this.rate;
        if (window.parseInt(this.parkInfo.userInfo.integral / rate) > this.parkInfo.totalFee) {
          return this.parkInfo.totalFee * rate;
        }

        return this.parkInfo.userInfo.integral;
      }

      return 0;
    },

    actuallyPaid() {
      const payWayStr = this.payWayIndexArr.join();

      if (payWayStr.indexOf('integral') !== -1) {
        return this.$parseFloat(this.parkInfo.totalFee - (this.integral / this.rate));
      }

      return this.parkInfo.totalFee;
    },
  },

  created() {
    // console.log('test', 25 - (888 / 100));
    this.getCarInfo();
  },

  methods: {
    async getCarInfo() {
      const carNo = this.$route.params.carNo;
      const data = await service.carQuery({ carNo });

      this.parkInfo = data.result;
      console.log('data', data);
    },

    toPay() {
      if (this.payWayIndexArr.length === 0) {
        this.$Toast('请选择支付方式');
        return;
      }

      const payWayStr = this.payWayIndexArr.join();

      // 纯微信支付
      if (payWayStr.indexOf('weixin') !== -1 && payWayStr.indexOf('integral') === -1) {
        this.mixPay(3);
      }

      // 纯积分支付
      if (payWayStr.indexOf('weixin') === -1 && payWayStr.indexOf('integral') !== -1) {
        this.integralPay();
      }

      // 混合支付
      if (payWayStr.indexOf('weixin') !== -1 && payWayStr.indexOf('integral') !== -1) {
        this.mixPay(2);
      }
    },

    integralPay() {
      const orderNo = this.parkInfo.orderNo;
      const totalFee = this.parkInfo.totalFee;
      const integral = this.integral;
      const rate = this.rate;

      if (window.parseInt(integral / rate) < totalFee) {
        this.$Toast('抱歉，您所支付的积分不足以抵扣停车应缴费用');
        return;
      }

      const data = service.parkIntegralPay({
        orderNo,
        integral,
      });

      if (data.errCode !== 0) {
        this.$Toast(data.errMsg);
      }

      this.$MessageBox({
        message: '支付成功',
        closeOnClickModal: false,
      }).then(() => {
        this.$router.push({ name: 'parkIndex' });
      });
    },

    // 混合支付
    async mixPay(payType) {
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
        payType, // 2:混合, 3:微信
        uid: this.uid,
        integral: this.integral,
        orderNo: this.parkInfo.orderNo,
      };

      const href = window.location.href.slice(0, window.location.href.indexOf('/#/'));

      const data = await service.mixPay({
        bid,
        openid: istest === 'yes' ? 'oKPuYjvxCaklKurNUF6zcLfe_EY4' : this.parkInfo.openId,
        body: '停车费用',
        attach: JSON.stringify(attach),
        total_fee: 0.01, // 微信支付价格
        notify_url: `${apiURL}/Webapi/parkCarNew/getWeixin`, // 支付成功后通知的后台接口
        reurl: `${href}/mall_temp/#/coupons?bid=${window.$bid}`, // 支付成功后跳转到指定页面
      });

      // 文豪那边的错误字段为全大写
      if (data.ErrCode !== 0) {
        this.$Toast(data.errMsg);
      }

      window.location.href = data.data.url;
    },
  },
};
</script>

<style lang="scss" scoped>
.wx-parkPay {
  min-height: 100vh;
  background-color: #151a24;
}
</style>

