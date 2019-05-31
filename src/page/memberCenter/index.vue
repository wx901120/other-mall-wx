<template>
  <div>
    <TheHeader fixed
               type="backCircle"></TheHeader>

    <!-- Banner -->
    <Banner class="banner-yinxiang">
      <BannerContent slot="bannerContent">
        <PersonInfo :memberCenterData="memberCenterData">
          <!-- <SignInBtn @click.native="signIn()"></SignInBtn> -->
        </PersonInfo>

        <Card :memberCard="memberCard"
              :memberCenterData="memberCenterData"
              :cardArr="cardArr"
              @showQrcode="showQrcode"
              ></Card>

      </BannerContent>
    </Banner>

    <Integration :memberCenterResult="memberCenterResult"></Integration>

    <Member></Member>

    <Coupon>
      <i-cell title="我的卡券"
              icon="coupon"
              is-link
              :is-message="couponsCount != 0"
              @click.native="$router.push({ name: 'coupons' })"></i-cell>
    </Coupon>

    <Message>
      <i-cell title="我的消息"
              icon="message"
              is-link
              :is-message="msgNum != 0"
              @click.native="$router.push({ name: 'memberMyMessage' })"></i-cell>
      <i-cell title="意见反馈"
              icon="feedback"
              is-link
              @click.native="$router.push({ name: 'memberFeedBack' })"></i-cell>
      <i-cell title="客服中心"
              icon="customerService"
              is-link
              @click.native="$router.push({ name: 'memberCustomerService' })"></i-cell>
    </Message>

    <mt-popup v-model="qrcodeShow">
      <popupContent :cardNumber="memberCenterData.cardNumber"></popupContent>
    </mt-popup>
  </div>
</template>

<script>
import { Banner, ICell } from '@/components/index.js';
import memberCenterMixin from '@/mixins/memberCenter';
import BannerContent from './BannerContent';
import PersonInfo from './PersonInfo';
import Integration from './Integration';
import Member from './Member';
import Card from './Card';
import Coupon from './Coupon';
import Message from './Message';
import SignInBtn from './SignInBtn';
import popupContent from './popupContent';
import * as service from '@/api/service.js';

export default {
  name: 'memberCenter',

  components: {
    Banner,
    ICell,
    BannerContent,
    PersonInfo,
    Card,
    Integration,
    Member,
    Coupon,
    Message,
    SignInBtn,
    popupContent,
  },

  mixins: [
    memberCenterMixin,
  ],

  data() {
    return {
      qrcodeShow: false,
    };
  },

  created() {
    this.getMemberCenterData({ refresh: true });
    
  },

  methods: {
    // 保存bid

    async saveBid () {
      try{
        const data = await service.saveBid({
        bid: 51,
      });
      }catch(error){
        console.log(error);
      }
    },
    // 显示二维码
    showQrcode() {
      this.qrcodeShow = !this.qrcodeShow;
      this.saveBid();
    },

    /* 签到 */
    async signIn() {
      const IntegralSignData = await service.IntegralSign({});


      const { lastSignTime } = IntegralSignData.result;

      // 如果未注册，则不能签到，并跳转到注册页面
      if (window.parseInt(IntegralSignData.uid === 0)) {
        this.$router.push({ name: 'memberRegister' });
        return;
      }

      if (IntegralSignData.errCode !== 0) {
        this.$Toast(IntegralSignData.errMsg);
        return;
      }

      // 如果签到时间为null，或者当前时间和签到只差大于等于24小时，则可以签到
      if (!lastSignTime || (new Date().getTime() - (lastSignTime * 1000) >= 1000 * 60 * 60 * 24)) {
        const IntegralSignAddData = await service.IntegralSignIntegralSignAdd({});

        if (IntegralSignAddData.errCode !== 0) {
          this.$Toast(IntegralSignAddData.errMsg);
          return;
        }
        this.$Toast('签到成功');
      } else {
        this.$Toast('您已经签到过了');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.border-top {
  border-top: rem(20) solid #ededed;
}
</style>


