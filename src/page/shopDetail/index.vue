<template>
  <div class="wx-shopDetail"
       ref="shopDetail">

    <TheHeader fixed
               type="backCircle"></TheHeader>

    <!-- Banner -->
    <Banner class="banner-image">
      <img :src="`http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/article/${shopInfo.entityPath ? shopInfo.entityPath : shopInfo.shopDefaultPic}`"
    
           alt=""
           slot="bannerImg">
    </Banner>

    <!-- 信息摘要 -->
    <div class="wx-shopBrief bg-white">
      <div class="wx-shopBrief__imgWrap">
        <img :src="`http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/article/${shopInfo.logoPath}`"
             alt="">
      </div>
      <div class="wx-shopBrief__rightContent">
        <div class="wx-shopBrief__shopName">{{ shopInfo.shopName }}</div>
        <div class="wx-shopBrief__shopType background-theme">{{ shopInfo.c_title }}</div>
        <div class="wx-shopBrief__infoRow">
          <div class="wx-shopBrief__address">
            地址： {{ shopInfo.floorName }} {{ shopInfo.address ? '-' : '' }} {{ shopInfo.address }}
          </div>
          <div class="wx-shopBrief__fee"
               v-if="shopInfo.consumeValue">人均：￥{{ shopInfo.consumeValue }}/人</div>
        </div>

        <div class="wx-shopBrief__infoRow"
             v-if="shopInfo.contact">电话：{{ shopInfo.contact }}</div>
        <div class="wx-shopBrief__infoRow"
             v-for="(activity, index) in activityList"
             :key="index">活动：{{ activity.title }}</div>

        <div class="wx-starsWrap" v-if="shopInfo.rate">
          评价热度：
          <vue-stars :value="shopInfo.rate / 20 | parseInt"
                     :char="'★'"
                     readonly
                     :inactive-char="'★'"
                     active-color="#ff5152"
                     hover-color="ff5152"
                     shadow-color="transparent"
                     inactive-color="#DDD" />
        </div>
      </div>
    </div>

    <!-- 商品推荐 -->
    <div class="bg-white act-detail wx-goodsRecommend m-model"
         v-if="goodImgsArr && goodImgsArr.length !== 0">
      <h3 class="act-title color-theme m-title">商品推荐</h3>
      <div class="act-content">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide"
                 v-for="(shop, index) in goodImgsArr"
                 :key="index"
                 :style="{ 'background': `url(${shop.old})`, 'backgroundSize' : 'cover' }"
                 @click='showBigFn(shop.old)'></div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
        <div class="noData"
             v-show='noUserData'>暂无数据!</div>
      </div>
    </div>

    <!-- 品牌简介 -->
    <div class="bg-white act-detail wx-brandIntro m-model"
         v-if="shopInfo.brandText">
      <h3 class="act-title color-theme m-title">品牌简介</h3>
      <MoreText :moreText="shopInfo.brandText"></MoreText>
      <!-- <div class="act-content">
        {{ shopInfo.brandText }}
      </div> -->
    </div>

    <!-- 最新活动 -->
    <div class="bg-white act-detail wx-newestAct m-model"
         v-if="activityList && activityList.length !== 0">
      <h3 class="act-title color-theme m-title">最新活动</h3>
      <div class="act-content">
        <div class="actItem"
             v-for='(activity, index) in activityList'
             :key="index"
             @click="$router.push({name: 'specialOffersDetail', params: {id: activity.id}})">
          <img :src="`http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/article/${activity.imgPath}`" />
          <!-- <div class="actFooter clearfix">
              <div class="left actInfo">
                <p class="nTitle">{{ activity.title }}</p>
                <p class="actDate">
                  {{ activity.stime | capitalizeDate }} - {{ activity.etime | capitalizeDate }}
                </p>
              </div>
              <div class="right hot" v-if='activity.overTime'>
                活动已结束
              </div>
              <div class="right hot" v-else='activity.overTime'>
                火热进行中
              </div>
            </div> -->
        </div>
      </div>
    </div>

    <div class="page"
         v-show='showBImg'
         @click='closeBigFn()'
         id="bigImgPage">
      <img src=""
           class="scale"
           ref="bigImg" />
    </div>
  </div>
</template>

<script>
import Banner from '@/components/Banner/index';
import * as service from '@/api/service';
import vueStars from 'vue-stars';
import { TheHeader } from '@/components/index';
import Swiper from 'swiper/dist/js/swiper';
import 'swiper/dist/css/swiper.min.css';
import MoreText from './MoreText';

export default {
  name: 'shopDetail',

  components: {
    Banner,
    vueStars,
    TheHeader,
    MoreText,
  },

  data() {
    return {
      shopInfo: {},
      goodImgsArr: [],
      goodsTj: true,
      noUserData: false,
      activityList: [],
      showBImg: false,
    };
  },

  async created() {
    const data = await service.shopDetails({
      sid: this.$route.params.shopId,
      // name: this.$route.params.name,
    });

    this.shopInfo = data.result.shop_info;

    if (data.result.goodImgsArr != null) {
      for (let i = 0; i < data.result.goodImgsArr.length; i += 1) {
        data.result.goodImgsArr[i].old = `http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/goods/${data.result.goodImgsArr[i].old}`;
        data.result.goodImgsArr[i].m = `http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/goods/${data.result.goodImgsArr[i].m}`;
      }
      this.goodImgsArr = data.result.goodImgsArr;
      this.goodsTj = false;
    }

    this.activityList = data.result.activityList;

    this.$nextTick(() => {
      const swiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        freeMode: true,
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
      });
    });
  },

  methods: {
    showBigFn(val) {
      const img = new Image();
      img.src = val;
      img.onload = () => {
        this.showBImg = true;
        this.$refs.bigImg.src = val;
      };
      this.$refs.shopDetail.ontouchmove = function () {
        return false;
      };
      window.onorientationchange = function () {
        document.body.scrollTop = 0;
      };
    },

    closeBigFn() {
      this.showBImg = false;
      this.$refs.shopDetail.ontouchmove = function () {
        return true;
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(starsWrap) {
  margin-top: rem(20);
  font-size: rem(24);
  color: #ff5152;
}

#bigImgPage {
  background: rgba(0, 0, 0, 0.6);
  overflow: hidden;
  img {
    width: 90%;
    position: fixed;
    top: 50%;
    left: 50%;
    // transform: translate3d(-50%, -50%, 0);
    transform: translate(-50%, -50%);
    z-index: 9999;
  }
}

.act-content {
  img {
    width: 100%;
  }
}

.scale {
  animation: scale 0.5s ease;
}

@keyframes scale {
  from {
    width: 0;
  }
  to {
    width: 90%;
  }
}

@include b(shopBrief) {
  display: flex;
  padding: rem(30) rem(20);

  @include e(imgWrap) {
    width: rem(160);
    height: rem(160);
    img {
      width: 100%;
    }
  }

  @include e(rightContent) {
    width: rem(500);
    margin-left: rem(55);
    // line-height: 1;
  }

  @include e(shopName) {
    font-size: rem(30);
  }

  @include e(shopType) {
    display: inline-block;
    padding: 0 rem(8);
    height: rem(28);
    line-height: rem(28);
    margin-top: rem(12);
    font-size: rem(22);
    border-radius: rem(4);
    color: #fff;
  }

  @include e(infoRow) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: rem(12);
    font-size: rem(22);
    color: #a8a8a8;
  }

  @include e(address) {
    display: inline-block;
  }

  @include e(fee) {
    margin-left: rem(80);
    display: inline-block;
  }

  @include e(concatWay) {
    margin-top: rem(22);
    font-size: rem(22);
    color: #a8a8a8;
  }
}

@include b(goodsRecommend) {
  padding: 0 rem(20);
  @include e(content) {
    padding: rem(20) rem(20) rem(40);
  }

  @include e(imgWrap) {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    width: rem(200);
    margin: 0 rem(15);
    // height: rem(266);
    img {
      width: rem(200);
      height: auto;
    }
  }
}

@include b(brandIntro) {
  padding: 0 rem(20);
  height: auto;
  font-size: rem(24);
  line-height: 22px;
  color: #4a4a4a;

  @include e(content) {
    padding: rem(20) rem(30);
    text-indent: 2em;
    .mint-swipe-items-wrap {
      .mint-swipe-item {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}

@include b(newestAct) {
  padding: 0 rem(20);
  color: #4a4a4a;
  img {
    width: 100%;
  }
  p {
    // padding: rem(10) 0;
  }
}

.act-content {
  padding: 0 0 rem(20);
}

.mint-swipe {
  overflow: hidden;
  position: relative;
  height: 100%;
}

.mint-swipe-items-wrap {
  position: relative;
  overflow: hidden;
  height: 100%;
}

.mint-swipe-items-wrap > div.is-active {
  display: block;
  -webkit-transform: none;
  transform: none;
}

.mint-swipe-items-wrap > div {
  position: absolute;
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
  width: 100%;
  height: 100%;
  display: none;
}

/* 模块 */
.m-model {
  border-top: rem(18) solid #f0f2f5;
  // padding: 0 rem(30);
}

/* 标题 */
.m-title {
  display: flex;
  align-items: center;
  height: rem(80);
  font-size: rem(32);
  font-weight: bold;
  color: #333333;
  // border-bottom: 1px solid #ededed;
}

/* Swiper */
.swiper-container {
  width: 100%;
  height: rem(200);
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #ededed;
  background-position: center center;
  width: rem(200);
  height: rem(200);
  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
  &:nth-child(n + 2) {
    margin-left: rem(24);
  }
}
</style>


