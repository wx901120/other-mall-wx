<template>
  <div class="wx-integrationMallDetails" :class="{'is-fixBottom': productData.goodsNum > 0}">

    <TheHeader fixed
               type="backCircle"></TheHeader>

    <IBanner class="product-banner banner-img">
      <img :src="'http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/goods/'+productData.imgs"
           alt=""
           slot="bannerImg">
    </IBanner>

    <integrationMallDetailIntro :productData="productData"></integrationMallDetailIntro>

    <!-- <ModelPayMethods :productData="productData" :buyNum="buyNum"></ModelPayMethods> -->

    <ModelPrice :activityData="productData"
                :buyNum="buyNum"></ModelPrice>

    <ModelSpecification v-if="productData.goodsNum > 0">
      <MultiNumInput v-model="buyNum"
                     :max="productData.goodsNum"></MultiNumInput>
    </ModelSpecification>

    <ModelDetail :productData="productData"></ModelDetail>

    <IButton size="large"
             type="red"
             style="border-radius: 0; position: fixed; bottom: 0;"
             v-if="productData.goodsNum > 0"
             @click="$router.push({name: 'integrationMallPayDetails', params: {id: $route.params.id, buyNum}})">立即购买</IButton>
  </div>
</template>

<script>
import { IBanner, TheHeader, MultiNumInput } from '@/components/index';
import integrationMallDetailIntro from './integrationMallDetailIntro';
import ModelSpecification from './ModelSpecification';
import ModelDetail from './ModelDetail';
import ModelPrice from './ModelPrice';
import * as service from '@/api/service';

export default {
  name: 'integrationMallDetails',

  components: {
    IBanner,
    TheHeader,
    MultiNumInput,
    integrationMallDetailIntro,
    ModelSpecification,
    ModelDetail,
    ModelPrice,
  },

  data() {
    return {
      specificationShow: false,
      productData: {
        info: {},
      },
      buyNum: 1,
    };
  },

  mounted() {
    this.getData();
  },

  methods: {
    async getData() {
      try {
        const data = await service.exchangeDetails({
          id: this.$route.params.id,
        });

        this.productData = data.result;
      } catch (error) {
        console.log('error', error);
      }
    },

    onSelectSpecification() {
      this.specificationShow = !this.specificationShow;
    },

    onCount(sign) {
      if (sign === '-') {
        if (this.buyNum >= 2) {
          this.buyNum -= 1;
        }
      } else if (sign === '+') {
        this.buyNum += 1;
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.model {
  margin-top: rem(20);
  .title {
    font-weight: bold;
  }
}

@include b(integrationMallDetails) {
  min-height: 100vh;
  
  @include when(fixBottom) {
    padding-bottom: rem(90);
  }
}
</style>
