<template>
  <div class="wx-perferentialInfoDetail">

    <!-- 导航 -->
    <TheHeader fixed
               type="backCircle"></TheHeader>

    <!-- Banner -->
    <Banner class="banner-image">
      <img :src="activityInfo.imgPath"
           alt=""
           slot="bannerImg"
           >
    </Banner>

    <InfoBrief :activityInfo="activityInfo"></InfoBrief>

    <ActivityDetail :activityInfo="activityInfo"></ActivityDetail>

    <!-- 领取卡券 -->
    <div class="bg-white wx-getCoupon"
         v-if="couponslist.length !== 0">
      <h3 class="wx-getCoupon__title color-theme m-title">最新活动</h3>
      <ul class="wx-couponList">
        <!-- <li class="wx-couponItem coupon-noused"
            v-for="(item, index) in couponslist"
            :key="index"
            @click='onGetCoupon(item)'> -->
            <li class="wx-couponItem coupon-noused"
            v-for="(item, index) in couponslist"
            :key="index"
            @click='showMask(item)'>
          <h3 class="wx-couponItem__shopnameWrap">
            <!-- <span class="wx-couponItem__imgWrap">
              <img src=""
                   alt="">
            </span> -->
            <span class="wx-couponItem__shopname">{{ item.shopName }}</span>
          </h3>
          <div class="wx-couponItem__couponContent">
            {{ item.title }}
          </div>
          <div class="wx-couponItem__useCondition" v-if="item.expireTimeType == 1">
            使用时间 {{ item.expenseStartTime | dateStringFilterDot }} - {{ item.expenseEndTime | dateStringFilterDot }}
          </div>
          <div class="wx-couponItem__useCondition" v-if="item.expireTimeType == 2">
            使用时间：自领取{{ item.expireTimeHours}}小时有效
          </div>
          <div class="wx-couponItem__valueWrap">
            <!-- <span class="wx-couponItem__value">{{ item.discount }}</span> -->
            <span class="wx-couponItem__type">{{ couponTypeParse(item) }}</span>
          </div>
        </li>
        <!-- <li class="coupon"
            v-for="(coupon, index) in couponslist"
            :key="index"
            @click="Toast('暂未开放')">
          <div class="coupon-left">
            <h3 class="coupon-title">{{ activityInfo.shopName }}</h3>
            <div class="coupon-con">{{ coupon.title }}</div>
            <div class="coupon-date">
              <span class="label">有效时间</span>
              <span class="date">{{ coupon.expenseStartTime | dateStringFilterDot }} - {{ coupon.expenseEndTime | dateStringFilterDot }}</span>
            </div>
          </div>
          <div class="coupon-right">
            点击领取
          </div>
        </li> -->
      </ul>
    </div>
    <mt-popup
        v-model="popupVisible"
        position="bottom"
        modal=false
        class="mask">
        <div class="title">
          <span class="close" @click="close"><img src="./image/close.png" alt=""></span><span>{{mask.title}}</span>
        </div>
        <div class="content">
          <p>券类型： {{ couponTypeParse( mask ) }}</p>
          <p v-if="mask.useType == 1">金额：{{ mask.cardMoney }}</p>
          <p v-if="mask.useType == 1">使用条件：满{{ mask.discountMax }}元使用</p>
          <p v-if="mask.useType == 3">券的折扣：{{ mask.discount }}折</p>
          <p>有效期：
            <span v-if="mask.expireTimeType == 1"> {{ mask.expenseStartTime | dateStringFilterDot }} - {{ mask.expenseEndTime | dateStringFilterDot }}</span>
            <span v-if="mask.expireTimeType == 2">自领取{{ mask.expireTimeHours }}小时有效</span></p>
          <p v-if="mask.useType == 2">市场价值：{{ mask.cardMoney }}</p>
          <p v-if="mask.useType == 4">券的金额：{{ mask.cardMoney }}</p>
          <p v-if="mask.storeName">适用店铺：{{ mask.storeName }}</p>
          <p>使用须知：{{mask.couponsContent}}</p>
        </div>
         <div class="bottom" @click="onGetCoupon(mask)">领取</div>
    </mt-popup>
  </div>
</template>

<script>
import Banner from "@/components/Banner/index";
import InfoBrief from "./InfoBrief";
import ActivityDetail from "./ActivityDetail";
import * as service from "@/api/service";
import { TheHeader } from "@/components/index.js";

export default {
  components: {
    Banner,
    TheHeader,
    InfoBrief,
    ActivityDetail
  },
  data() {
    return {
      mask:{

      }, //弹出框信息
      fromId: '', //活动id
      // showMask: false,
      popupVisible: false,
      imgPath: "",
      sTime: "",
      eTime: "",
      overTime: "活动未开始",

      activityInfo: {},
      couponslist: [],
      typeStatus: "",
      uid: ''   //判断是否是会员
    };
  },

  mounted() {
    this.activityDetailsList();
  },
  methods: {
    hahha(){
      this.popupVisible = true;
    },
    // 判断mask里面券的类型
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
    // mask的关闭按钮
    close(){
       console.log(44444)
       this.popupVisible = false;
    },
    showMask(item){
      console.log(this.uid)
      if(this.uid == 0){
        this.$router.push({
          name: 'memberRegister'
        });
        return;
      }
      // this.activityDetailsList();
      this.mask = item;
      this.mask.title = item.title;
      console.log(this.activityInfo);
      this.popupVisible = true;
      console.log(222222222222)
    },
    actState(stime, etime) {
      const currentTime = new Date().getTime();
      const startTime = stime * 1000;
      const endTime = etime * 1000;
      if (currentTime < startTime) {
        return "活动未开始";
      } else if (currentTime >= startTime && currentTime < endTime) {
        return "活动进行中";
      } else if (currentTime > endTime) {
        return "活动已结束";
      }

      return "";
    },

    async activityDetailsList() {
      const data = await service.activityDetails({
        id: this.$route.params.id
      });
      // if (data.result.couponslist.length !== 0) {
      //   if (data.result.couponslist[0].expireTimeType == 1) {
      //     this.typeStatus = 1;
      //   }
      //   if (data.result.couponslist[0].expireTimeType == 2) {
      //     this.typeStatus = 2;
      //   }
      // }
      data.result.info.imgPath = `http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/article/${
        data.result.info.imgPath
      }`;
      this.imgPath = data.result.info.imgPath;

      this.activityInfo = data.result.info;
      this.fromId = data.result.info.id;
      this.uid = data.uid;
      // 判断活动状态
      this.sTime = data.result.info.stime;
      this.eTime = data.result.info.etime;
      this.overTime = this.actState(this.sTime, this.eTime);

      if (data.result.couponslist.length > 0) {
        this.couponslist = data.result.couponslist;
      }
    },

    async onGetCoupon(coupon) {
        // this.popupVisible = true;
      try {
        if (this.overTime !== "活动进行中") {
          this.popupVisible = false;
          this.$MessageBox.alert("抱歉，非活动期间无法领取卡券", "提示");
          return;
        }

        const data = await service.getCoupons({
          id: coupon.id,
          fromId: this.fromId
        });
         this.popupVisible = false;
        await this.$MessageBox.alert("卡券领取成功！", "温馨提示");
        this.$router.push(
          {
            name: "coupons" ,
          }
          );
        // this.popupVisible = false;
      } catch (error) {
        this.popupVisible = false;
        console.log("error", error);
      }
    },

    couponTypeParse(coupon) {
      let couponTypeStr = "";
      switch (coupon.useType) {
        // case '1':
        //   couponTypeStr = '普通卡券';
        //   break;
        // case '2':
        //   couponTypeStr = '普通卡券';
        //   break;
        // case '3':
        //   couponTypeStr = '礼品券';
        //   break;
        // case '4':
        //   couponTypeStr = '游戏券';
        //   break;
        // case '5':
        //   couponTypeStr = '活动券';
        //   break;
        // case '6':
        //   couponTypeStr = '评价卡券';
        //   break;
        // case '7':
        //   couponTypeStr = '优惠券';
        //   break;
        // case '8':
        //   couponTypeStr = '现金券';
        //   break;
        // case '9':
        //   couponTypeStr = '实体卡券';
        //   break;
        // case '10':
        //   couponTypeStr = '课程卡券';
        //   break;
        // case '11':
        //   couponTypeStr = '折扣券';
        //   break;
        // case '12':
        //   couponTypeStr = '满减券';
        //   break;
        // case '13':
        //   if (coupon.businessType === '1') {
        //     couponTypeStr = '门票券';
        //   } else if (coupon.businessType === '2') {
        //     couponTypeStr = '车位预约券';
        //   } else {
        //     couponTypeStr = '停车券';
        //   }
        //   break;
        // case '14':
        //   couponTypeStr = '积分券';
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
<style lang="scss">
  .mask{
    width: 100%;
  }
</style>
<style lang="scss" scoped>
.mask{
  // padding: rem(30);
  // min-height: 65vh;
}
.mask p{
  height: rem(70);
  line-height: rem(70);
  font-size: rem(30);
}
.mask .title{
  height: rem(80);
  position: relative;
  line-height: rem(80);
  font-size: rem(35);
  text-align: center;
  color: #0b0b0b;
  background-color: #f5f5f5;
}
.mask .title .close{
  position: absolute;
  right: rem(30);

}
.mask .content{
  padding: rem(40);
  position: relative;
}
.mask .bottom{
  width: 100%;
  height: rem(99);
  line-height: rem(99);
  font-size: rem(35);
  text-align: center;
  color: #ffffff;
  background-color: #d6024c;
}
@include b(perferentialInfoDetail) {
  // overflow: hidden;
  // height: 100vh;
}

@include b(getCoupon) {
  padding: 0 rem(20) rem(50);
  border-top: rem(18) solid #f0f2f5;

  @include e(title) {
    display: flex;
    align-items: center;
    height: rem(80);
    font-weight: bold;
    font-size: rem(32);
    color: #333333;
  }
}

@include b(couponList) {
  .coupon-noused {
    background: url("./image/coupon_bg-red.png") center center no-repeat;
    background-size: cover;

    .coupon-value-wrap {
      color: #fff;
    }
  }
}

@include b(couponItem) {
  position: relative;
  padding: 0 rem(50);
  height: rem(178);
  border-radius: rem(10);
  background-size: cover;
  box-shadow: 0 0 rem(20) rem(-8) #000;
  &:nth-child(n + 2) {
    margin-top: rem(26);
  }

  @include e(shopnameWrap) {
    display: flex;
    align-items: center;
    height: rem(54);
    font-size: rem(28);
    color: #707070;
    font-weight: bold;
  }

  @include e(shopname) {
    width: rem(450);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @include e(imgWrap) {
    width: rem(36);
    height: rem(36);
    border-radius: 50%;
    background-color: gray;
    margin-right: rem(14);
  }

  @include e(couponContent) {
    width: rem(450);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: rem(40);
    line-height: rem(66);
    font-weight: bold;
    color: #000;
  }

  @include e(useCondition) {
    line-height: rem(58);
    color: #000;
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
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: rem(72);
    width: 100%;
    color: #fff;
  }

  @include e(type) {
    display: flex;
    align-items: center;
    font-size: rem(36);
    color: #fff;
  }
}

// .m-title {

// }
.m-content {
  padding-top: rem(24);
  p {
    line-height: rem(36);
  }
}
.title img{
  width: rem(22);
  height: rem(22);
}
</style>




