import Vue from 'vue';
import Router from 'vue-router';


// 首页
const home = () => import('@/page/home/index');

/* 会员中心 */
const memberCenter = () => import('@/page/memberCenter/index');
const memberRegister = () => import('@/page/memberRegister/index');
const memberProductChoose = () => import('@/page/memberProductChoose/index');
const memberPerfectInfo = () => import('@/page/memberPerfectInfo/index');
const memberMyIntegration = () => import('@/page/memberMyIntegration/index');
const memberBindingCard = () => import('@/page/memberBindingCard/index');
const memberExchangeRecords = () => import('@/page/memberExchangeRecords/index');
const memberBenefits = () => import('@/page/memberBenefits/index');
const memberSelfIntegration = () => import('@/page/memberSelfIntegration/index');
const memberSelfIntegrationGuide = () => import('@/page/memberSelfIntegrationGuide/index');
const memberFeedBack = () => import('@/page/memberFeedBack/index');
const memberMyMessage = () => import('@/page/memberMyMessage/index');
const memberPhotoIntegration = () => import('@/page/memberPhotoIntegration/index');
const memberPhotoIntegrationCheck = () => import('@/page/memberPhotoIntegrationCheck/index');
const memberProgressQuery = () => import('@/page/memberProgressQuery/index');
const memberCardIntro = () => import('@/page/memberCardIntro/index');
const memberCustomerService = () => import('@/page/memberCustomerService/index');

/* 店铺列表 */
const shopList = () => import('@/page/shopList/index');
const shopListYL = () => import('@/page/shopListYL/index');
const shopDetail = () => import('@/page/shopDetail/index');
const shopDetailYL = () => import('@/page/shopDetailYL/index');
const shopEvaluate = () => import('@/page/shopEvaluate/index');

/* 社群活动 */
const associationActivity = () => import('@/page/associationActivity/index');
const associationActivityDetail = () => import('@/page/associationActivityDetail/index');
const associationActivityPayDetail = () => import('@/page/associationActivityPayDetail/index');

/* 积分商城 */
const integrationMall = () => import('@/page/integrationMall/index');
const integrationMallDetails = () => import('@/page/integrationMallDetails/index');
const integrationMallPayDetails = () => import('@/page/integrationMallPayDetails/index');

/* 优惠活动 */
const specialOffers = () => import('@/page/specialOffers/index');
const specialOffersDetail = () => import('@/page/specialOffersDetail/index');
const specialOffersCoupons = () => import('@/page/specialOffersCoupons/index');

/* 卡券 */
const coupons = () => import('@/page/coupons/index');
const couponDetail = () => import('@/page/couponDetail/index');

/* 美食 */
const food = () => import('@/page/food/index');

/* 停车场 */
const parkIndex = () => import('@/page/parkIndex/index');
const parkPay = () => import('@/page/parkPay/index');
const parkPaymentRecords = () => import('@/page/parkPaymentRecords');
const parkPlateNumber = () => import('@/page/parkPlateNumber');

/* 测试用 */
const Test = () => import('@/page/Test/index');


Vue.use(Router);

export default new Router({
  // 关闭history模式，因为微信下的iphone可能会导致一些问题
  // mode: 'history',
  base: __dirname,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    /* 首页 */
    {
      path: '/',
      name: 'home',
      component: home,
    },

    /* 会员中心 */
    {
      path: '/memberCenter',
      name: 'memberCenter',
      component: memberCenter,
    },
    {
      path: '/memberRegister',
      name: 'memberRegister',
      component: memberRegister,
    },
    {
      path: '/memberProductChoose',
      name: 'memberProductChoose',
      component: memberProductChoose,
    },
    {
      path: '/memberPerfectInfo',
      name: 'memberPerfectInfo',
      component: memberPerfectInfo,
    },
    {
      path: '/memberMyIntegration',
      name: 'memberMyIntegration',
      component: memberMyIntegration,
    },
    {
      path: '/memberBindingCard',
      name: 'memberBindingCard',
      component: memberBindingCard,
    },
    {
      path: '/memberExchangeRecords',
      name: 'memberExchangeRecords',
      component: memberExchangeRecords,
    },
    {
      path: '/memberBenefits',
      name: 'memberBenefits',
      component: memberBenefits,
    },
    {
      path: '/memberSelfIntegration',
      name: 'memberSelfIntegration',
      component: memberSelfIntegration,
    },
    {
      path: '/memberSelfIntegrationGuide',
      name: 'memberSelfIntegrationGuide',
      component: memberSelfIntegrationGuide,
    },
    {
      path: '/memberFeedBack',
      name: 'memberFeedBack',
      component: memberFeedBack,
    },
    {
      path: '/memberMyMessage',
      name: 'memberMyMessage',
      component: memberMyMessage,
    },
    {
      path: '/memberPhotoIntegration/:recordId?',
      name: 'memberPhotoIntegration',
      component: memberPhotoIntegration,
    },
    {
      path: '/memberPhotoIntegrationCheck',
      name: 'memberPhotoIntegrationCheck',
      component: memberPhotoIntegrationCheck,
    },
    {
      path: '/memberProgressQuery',
      name: 'memberProgressQuery',
      component: memberProgressQuery,
    },
    {
      path: '/memberCardIntro',
      name: 'memberCardIntro',
      component: memberCardIntro,
    },

    {
      path: '/memberCustomerService',
      name: 'memberCustomerService',
      component: memberCustomerService,
    },

    /* 商铺列表 */
    {
      path: '/shopList',
      name: 'shopList',
      component: shopList,
    },
    {
      path: '/shopListYL',
      name: 'shopListYL',
      component: shopListYL,
    },
    {
      path: '/shopDetail/:shopId',
      name: 'shopDetail',
      component: shopDetail,
    },
    {
      path: '/shopDetailYL/:shopId',
      name: 'shopDetailYL',
      component: shopDetailYL,
    },
    {
      path: '/shopEvaluate/:sid',
      name: 'shopEvaluate',
      component: shopEvaluate,
    },
    {
      path: '/associationActivity',
      name: 'associationActivity',
      component: associationActivity
    },
    {
      path: '/associationActivityDetail/:id',
      name: 'associationActivityDetail',
      component: associationActivityDetail
    },
    {
      path: '/associationActivityPayDetail/:id/:standardID/:buyNum',
      name: 'associationActivityPayDetail',
      component: associationActivityPayDetail
    },

    /* 积分商城 */
    {
      path: '/integrationMall',
      name: 'integrationMall',
      component: integrationMall
    },
    {
      path: '/integrationMallDetails/:id',
      name: 'integrationMallDetails',
      component: integrationMallDetails
    },
    {
      path: '/integrationMallPayDetails/:id/:buyNum',
      name: 'integrationMallPayDetails',
      component: integrationMallPayDetails
    },

    /* 优惠活动 */
    {
      path: '/specialOffers/:type?',
      name: 'specialOffers',
      component: specialOffers
    },
    {
      path: '/specialOffersDetail/:id',
      name: 'specialOffersDetail',
      component: specialOffersDetail
    },
    {
      path: '/specialOffersCoupons/:id',
      name: 'specialOffersCoupons',
      component: specialOffersCoupons
    },

    /* 卡券 */
    {
      path: '/coupons',
      name: 'coupons',
      component: coupons
    },
    {
      path: '/couponDetail/:id/:code',
      name: 'couponDetail',
      component: couponDetail
    },

    /* 美食 */
    {
      path: '/food',
      name: 'food',
      component: food
    },

    /* 美食 */
    {
      path: '/Test',
      name: 'Test',
      component: Test
    },

    /* 停车场 */
    {
      path: '/parkIndex',
      name: 'parkIndex',
      component: parkIndex,
    },
    {
      path: '/parkPay/:carNo',
      name: 'parkPay',
      component: parkPay,
    },
    {
      path: '/parkPaymentRecords',
      name: 'parkPaymentRecords',
      component: parkPaymentRecords,
    },
    {
      path: '/parkPlateNumber',
      name: 'parkPlateNumber',
      component: parkPlateNumber,
    },

    /* 其他非法路由 */
    {
      path: '*',
      redirect: '/'
    }
  ],
});
