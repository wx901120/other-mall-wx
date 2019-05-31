<template>
  <div class="wx-home">
    <i-sidebar-menu :showSideMenu='isShowSideMenu'>
      <SideContent :logoImg="logoImg"
                   slot="slidebarContent">
        <SideBarList>
          <SideBarListItem title="店铺"
                           subTitle="Shops"
                           icon="i-icon-shop"
                           @click.native="gotoShopList()"></SideBarListItem>
          <!-- <SideBarListItem title="美食"
                           subTitle="Food"
                           icon="i-icon-food"
                           @click.native="$router.push({ name: 'food' })"></SideBarListItem> -->
          <SideBarListItem title="优惠"
                           subTitle="Promotions"
                           icon="i-icon-gift"
                           @click.native="$router.push({ name: 'specialOffers' })"></SideBarListItem>
          <SideBarListItem title="会员"
                           subTitle="Members"
                           icon="i-icon-person"
                           @click.native="isMember()"></SideBarListItem>
          <!-- 顺德印象城bid=183 -->
          <!-- <SideBarListItem title="社群"
                           subTitle="Activity"
                           icon="i-icon-association"
                           v-if="$route.query.bid !== '183'"
                           @click.native="$router.push({ name: 'associationActivity' })"></SideBarListItem> -->
          <!-- <SideBarListItem title="停车"
                           subTitle="Parking"
                           icon="i-icon-parking"
                           @click.native="$router.push({ name: 'parkIndex' })"></SideBarListItem> -->
          <!-- <SideBarListItem title="兑换"
                           subTitle="Exchange"
                           icon="i-icon-exchange"
                           @click.native="$router.push({ name: 'integrationMall' })"></SideBarListItem> -->
        </SideBarList>
      </SideContent>
    </i-sidebar-menu>

    <HomeHeader :logoImg="logoImg"
                @onOperateSideMenu="onOperateSideMenu"></HomeHeader>

    <ImgScroll>
      <!-- <SignInBtn @click.native="signIn()"></SignInBtn> -->

      <i-swipe :auto="4000">
        <i-swipe-item class="slide1"
                      v-for="banner in bannerList"
                      :key="banner.id"
                      :style="{'background': `url(http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/article/${banner.picPath})`, 'background-size' : 'cover'}"

                      @click.native="toPage(banner)"></i-swipe-item>
      </i-swipe>
    </ImgScroll>

    <ShopLocated>
      <HomeTitle title="入驻店铺"></HomeTitle>

      <MultiSwiper>
        <!-- status等于1：显示， status等于2：隐藏 -->
        <MultiSwiperItem v-for="(shop, index) in shopList"
                         v-if="shop.status === '1'"
                         :key="index"
                         :imgSrc="shop.logoPath"
                         @click.native="$router.push({ name: 'shopDetail', params: { shopId: shop.id }})"></MultiSwiperItem>
      </MultiSwiper>
    </ShopLocated>

    <Dailybest>
      <HomeTitle title="每日精选"></HomeTitle>

      <DailybestList>
        <DailybestListItem v-for="recommend in recommendList"
                           :key="recommend.id"
                           :recommend="recommend"></DailybestListItem>
      </DailybestList>
    </Dailybest>
  </div>
</template>

<script>
import { ISidebarMenu, ISwipe, ISwipeItem, ICell, MultiSwiper, MultiSwiperItem } from '@/components/index.js';
import DailybestList from './DailybestList';
import DailybestListItem from './DailybestListItem';
import HomeHeader from './HomeHeader';
import HomeTitle from './HomeTitle';
import SignInBtn from './SignInBtn';
import SideContent from './SideContent';
import SideBarList from './SideBarList';
import SideBarListItem from './SideBarListItem';
import ImgScroll from './ImgScroll';
import ShopLocated from './ShopLocated';
import Dailybest from './Dailybest';
import * as service from '@/api/service.js';

export default {
  name: 'home',

  components: {
    ISidebarMenu,
    ISwipe,
    ISwipeItem,
    ICell,
    HomeHeader,
    HomeTitle,
    MultiSwiper,
    MultiSwiperItem,
    DailybestList,
    DailybestListItem,
    SignInBtn,
    SideContent,
    SideBarList,
    SideBarListItem,
    ImgScroll,
    ShopLocated,
    Dailybest,
  },

  data() {
    return {
      isShowSideMenu: false,
      bannerList: [],
      shopList: [],
      recommendList: [],
      logoImg: '',
      uid: 0,
    };
  },

  async created() {
    try {
      // 请求数据
      const homeData = await service.getIndex({});

      this.uid = homeData.uid;
      this.bannerList = homeData.result.banner_list;
      this.shopList = homeData.result.shops;
      this.recommendList = homeData.result.recommend_list;
      this.logoImg = `http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/article/${homeData.logo}`;
    } catch (error) {
      console.log('error', error);
    }
  },

  methods: {
    // 判断会员是否冻结
     async  isMember(){
     const data = await service.memberCenter({});
      if(data.result.memberStatus == 'FROZEN'){
        this.$MessageBox({
          message: '会员已冻结',
          closeOnClickModal: false,
          className:'addClass'
        })
      }else{
       this.$router.push({ name: 'memberCenter' });
      }
    },
    onOperateSideMenu() {
      this.isShowSideMenu = !this.isShowSideMenu;
    },

    // 签到
    async signIn() {
      // 用户不存在
      if (!window.parseInt(this.uid)) {
        this.$router.push({ name: 'memberCenter' });
        return;
      }

      try {
        // 请求数据
        const data = await service.IntegralSign({});
        const { lastSignTime } = data.result;

        // 已签到
        if (lastSignTime && (new Date().getTime() - (lastSignTime * 1000) < 1000 * 60 * 60 * 24)) {
          this.$Toast('您已经签到过了');
          return;
        }

        this.$Toast('签到成功');
      } catch (error) {
        console.log('error', error);
      }
    },

    toPage(item) {
      const type = item.clickType;
      if (type === '1') { // 外链
        window.location.href = item.clickValue;
      } else if (type === '2') { // 活动页
        this.$router.push({ name: 'associationActivity' });
      } else if (type === '3') { // 店铺列表
        this.$router.push({ name: 'shopList' });
      } else if (type === '4') { // 游戏

      } else if (type === '5') { // 积分商城
        this.$router.push({ name: 'integrationMall' });
      } else if (type === '6') { // 客服

      } else if (type === '7') { // 商户活动
        this.$router.push({ name: 'specialOffers', params: { type: 'commercial' } });
      } else if (type === '8') { // 美食店铺
        this.$router.push({ name: 'BusinessList', params: { yetaiId: this.$store.state.bid === 53 ? '249' : '247' } });
      } else if (type === '9') { // 会员卡说明
        // this.$router.push({ name: 'memberCard' });
      } else if (type === '10') { // 商城简介

      } else if (type === '11') { // 关于
        // this.$router.push({ name: 'About' });
      } else if (type === '12') { // 用户反馈
        this.$router.push({ name: 'memberFeedBack' });
      } else if (type === '13') { // 会员中心
        this.$router.push({ name: 'memberCenter' });
      }
    },

    gotoShopList() {
      if (window.$bid === '51') {
        this.$router.push({ name: 'shopListYL' });
        return;
      }
      this.$router.push({ name: 'shopList' });
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(home) {
  background-color: #fff;
  padding-top: rem(90);
}

</style>


