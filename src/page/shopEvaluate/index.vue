<template>
  <div class="wx-shopEvaluate">
    <ShopInfo :shopInfo="shopInfo"></ShopInfo>
    <Evaluate>
      <!-- 单体评价 -->
      <EvaluateRow v-for="(commentItem, index) in commentList"
                   :key="index"
                   :commentItem="commentItem">
        <EvaluateStars v-model="commentItem.rate"></EvaluateStars>
      </EvaluateRow>

      <!-- 总体评价 -->
      <EvaluateRow :commentItem="commentItemTotal">
        <EvaluateStars v-model="commentItemTotal.rate"></EvaluateStars>
      </EvaluateRow>
    </Evaluate>

    <IButton size="large"
             type="red"
             class="wx-shopEvaluate__submitBtn"
             @click="submitShopComment()
                   ">提交</IButton>
  </div>
</template>

<script>
import * as service from '@/api/service';
import ShopInfo from './ShopInfo';
import Evaluate from './Evaluate';
import EvaluateStars from './EvaluateStars';
import EvaluateRow from './EvaluateRow';

export default {
  name: 'shopEvaluate',

  components: {
    ShopInfo,
    Evaluate,
    EvaluateStars,
    EvaluateRow,
  },

  data() {
    return {
      commentItemTotal: {
        rate: 0,
        title: '总体评价',
      },
      commentList: [],
      shopInfo: {},
      token: '',
    };
  },

  created() {
    this.getShopDetail();
    this.getShopCommentMain();
  },

  methods: {
    async getShopCommentMain() {
      const data = await service.shopCommentMain({});

      this.commentList = data.result.commentList;
      this.token = data.result.token;
      for (let i = 0; i < this.commentList.length; i++) {
        this.$set(this.commentList[i], 'rate', 0);
      }
    },

    async submitShopComment() {
      const grade = {};

      for (let i = 0; i < this.commentList.length; i++) {
        grade[this.commentList[i].id] = window.parseInt((this.commentList[i].rate * 100) / 20);
      }

      const data = await service.shopCommentMain({
        is_submit: 1,
        sid: this.$route.params.sid,
        grade,
        level: window.parseInt((this.commentItemTotal.rate * 100) / 20),
        token: this.token,
      });
    },

    async getShopDetail() {
      const data = await service.shopDetails({
        sid: this.$route.params.sid,
      });

      data.result.shop_info.logoPath = `http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/article/${data.result.shop_info.logoPath}`;

      if (data.result.goodImgsArr != null) {
        for (let i = 0; i < data.result.goodImgsArr.length; i += 1) {
          data.result.goodImgsArr[i].old = `http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/goods/${data.result.goodImgsArr[i].old}`;
          data.result.goodImgsArr[i].m = `http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/goods/${data.result.goodImgsArr[i].m}`;
        }
        this.goodImgsArr = data.result.goodImgsArr;
        this.goodsTj = false;
      }

      this.shopInfo = data.result.shop_info;
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(shopEvaluate) {
  padding: rem(54) rem(44) 0;
  min-height: 100vh;
  background-color: #fff;

  @include e(submitBtn) {
    margin-top: rem(146);
  }
}
</style>

