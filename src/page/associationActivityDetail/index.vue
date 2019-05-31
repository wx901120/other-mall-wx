<template>
  <div class="wx-productDetails">
    <TheHeader fixed
               type="backCircle"></TheHeader>

    <IBanner class="product-banner banner-img">
      <img :src="'http://file.w-lans.com/uploadfile/article/'+activityData.info.imgPath"
           alt=""
           slot="bannerImg">
    </IBanner>

    <DetailIntro :activityData="activityData"></DetailIntro>

    <ModelPrice :activityData="activityData"></ModelPrice>

    <div class="bg-white model-specification model">
      <h3 class="title">
        <i-cell title="规格"
                :value="result ? result.lessonTime : '请选择规格'"
                is-link
                @click.native="actionSheetShow = true"></i-cell>
      </h3>
    </div>

    <ModelDetail :activityData="activityData"></ModelDetail>

    <IButton size="large"
             type="red"
             style="border-radius: 0; position: fixed; bottom: 0;"
             @click="gotoPay()">立即购买</IButton>

    <TheActionSheet :dateList="activityData.info.lessonArr"
                    :result.sync="result"
                    :numVal.sync="num"
                    v-model="actionSheetShow"></TheActionSheet>
  </div>
</template>

<script>
import { IBanner, HeadMall, TheHeader, TheActionSheet } from '@/components/index';
import * as service from '@/api/service';
import DetailIntro from './DetailIntro';
import ModelPrice from './ModelPrice';
import ModelDetail from './ModelDetail';

export default {
  name: 'associationActivityDetail',

  components: {
    IBanner,
    HeadMall,
    TheHeader,
    DetailIntro,
    ModelPrice,
    ModelDetail,
    TheActionSheet,
  },

  data() {
    return {
      actionSheetShow: false,
      result: null,
      num: 1,
      specificationShow: false,
      activityData: {
        info: {
          lessonArr: [
            {},
          ],
          stock: 1,
        },
        userinfo: {
          userTrueName: '',
        },
      },
      expired: false,
    };
  },

  mounted() {
    this.getData();
  },

  methods: {
    // 判断活动是否过期
    isExpired(activity) {
      const nowTime = new Date().getTime();
      if (nowTime > (window.parseInt(activity.etime) * 1000)) {
        return true;
      }
      return false;
    },

    // 获取课程数据
    async getData() {
      try {
        // 请求数据
        const data = await service.lessonDetails({
          id: this.$route.params.id,
        });
        this.activityData = data.result;
        this.expired = this.isExpired(this.activityData.info);
      } catch (error) {
        console.log('error', error);
      }
    },

    // 选择规格，并进入支付详情
    gotoPay() {
      if (!this.result) {
        this.$Toast('请选择规格');
        return;
      }

      this.$router.push({
        name: 'associationActivityPayDetail',
        params: {
          id: this.$route.params.id,
          standardID: this.result.id,
          buyNum: this.num,
        },
      });
    },
  },
};
</script>


<style lang="scss">
// 覆盖i-cell
.model {
  .i-cell-wrapper {
    background: none;
  }
  .i-cell-title {
    font-size: rem(30);
    font-weight: bold;
    color: #333;
  }
}

@include b(productDetails) {
  padding-bottom: rem(90);
}

.model {
  margin-top: rem(20);
  .model-title {
    font-size: rem(30);
    font-weight: bold;
    color: #333;
  }
}
</style>
