<template>
  <div class="wx-customerService">
    <TheHeader title="客服中心"></TheHeader>

    <Banner class="daytime-banner banner-image">
      <img :src="'http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/article/' + customerInfoList[0].customerPic" alt="" slot="bannerImg">
    </Banner>

    <div class="wx-mallInfo">
      <div class="wx-mallInfo__infoGroup">
        <!-- <span class="icon icon-phone"></span> -->
        <h3 class="wx-customerService__title">服务电话</h3>
        <p class="wx-mallInfo__infoContent">
          <a :href="'tel:' + phoneNumber.phoneValue"
             v-for="(phoneNumber, index) in numberList"
             :key="index"> {{ phoneNumber.phoneValue }}</a>
        </p>
      </div>
      <!-- <div class="info-group">
        <span class="icon icon-address"></span>
        <p class="info-content">地址：浙江省杭州市下城区武林广场21号</p>
      </div> -->
    </div>

    <div class="service-project">
      <h3 class="wx-customerService__title is-border">服务项目</h3>
      <div class="wx-customerService__images"
           v-for="(customerInfo, index) in customerInfoList"
           :key="index">
        <img class="wx-customerService__image" :src="'http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/article/' + customerInfo.customerInfo"
             alt="">
      </div>
      <!-- <div class="projects">
        <div class="project-item">
          <span class="icon icon-consult"></span>
          <p class="project-title">导购咨询</p>
        </div>
        <div class="project-item">
          <span class="icon icon-subscribe"></span>
          <p class="project-title">会员卡服务</p>
        </div>
        <div class="project-item">
          <span class="icon icon-feedback"></span>
          <p class="project-title">顾客意见受理</p>
        </div>
        <div class="project-item">
          <span class="icon icon-member-card"></span>
          <p class="project-title">广播服务</p>
        </div>
        <div class="project-item">
          <span class="icon icon-personal-tailor"></span>
          <p class="project-title">便民租借</p>
        </div>
        <div class="project-item">
          <span class="icon icon-key"></span>
          <p class="project-title">应急药箱</p>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { Banner, HeadMall } from '@/components/index';
import * as service from '@/api/service';

export default {
  name: 'customerService',
  data() {
    return {
      numberList: [],

      customerInfoList: [
        {
          customerInfo: {
            customerPic: '',
          },
        },
      ],
    };
  },
  components: {
    Banner,
    HeadMall,
  },
  async mounted() {
    const data = await service.customerService({});

    this.customerInfoList = data.result.customerInfo;
    this.numberList = data.result.list;
  },
};
</script>

<style lang="scss" scoped>
@include b(customerService) {
  background-color: #fff;

  @include e(title) {
    padding-left: rem(20);
    line-height: rem(96);
    font-size: rem(32);
    font-weight: bold;
    color: #333333;
    @include when(border) {
      border-bottom: rem(2) solid #eeeeee;
    }
  }

  @include e(image) {
    width: 100%;
  }
}

@include b(mallInfo) {
  padding: rem(14) 0;

  @include e(infoGroup) {
    // display: flex;
    // flex-flow: row wrap;
    // line-height: rem(60);
    .icon {
      display: inline-block;
      width: rem(85);
      height: rem(60);
      background-repeat: no-repeat;
      background-size: rem(31) rem(34);
      background-position: center center;
    }
    .icon-address {
      background-image: url("./image/address.png");
    }
  }

  @include e(infoContent) {
    line-height: rem(90);
    padding-left: rem(20);
    font-size: rem(30);
    color: #666666;
    border-top: 1px solid #eeeeee;
  }
}

.service-project {
  border-top: rem(28) solid #eeeeee;
  .projects {
    display: flex;
    flex-flow: row wrap;
    padding: rem(30) 0;
    .project-item {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      align-content: space-between;

      width: 33.33%;
      height: rem(166);
      &:nth-child(n + 4) {
        margin-top: rem(50);
      }
      .icon {
        display: block;
        width: 100%;
        height: rem(116);
        background-size: rem(116) rem(116);
        background-repeat: no-repeat;
        background-position: center center;
      }
      .icon-consult {
        background-image: url("./image/consult.png");
      }
      .icon-subscribe {
        background-image: url("./image/subscribe.png");
      }
      .icon-feedback {
        background-image: url("./image/feedback.png");
      }
      .icon-member-card {
        background-image: url("./image/member_card.png");
      }
      .icon-personal-tailor {
        background-image: url("./image/personal_tailor.png");
      }
      .icon-key {
        background-image: url("./image/key.png");
      }
      .project-title {
        text-align: center;
        line-height: 1;
        font-size: rem(24);
        color: #6e6e6e;
      }
    }
  }
}
</style>

