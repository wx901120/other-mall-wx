<template>
  <div class="wx-benefits" :style="{ 'background-image': `url(${bgImg})` }">
    <TheHeader fixed
               type="backCircle"></TheHeader>

    <img class="wx-benefitsImg"
         :src="cardImg"
         alt="">
  </div>
</template>

<script>
import { IField, IRadio, IButton, TheHeader } from '@/components/index.js';
import * as service from '@/api/service';

export default {
  name: 'memberBenefits',

  components: {
    IField,
    IRadio,
    IButton,
    TheHeader,
  },

  data() {
    return {
      cardImg: '',
      bgImg: '',
    };
  },

  created() {
    this.getCardInfo();
  },

  methods: {
    async getCardInfo() {
      const data = await service.memberInfo({});

      if (data.result.list[0].cardInfo1) {
        this.cardImg = `http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/article/${data.result.list[0].cardInfo1}`;
      }

      if (data.result.list[0].cardInfo2) {
        this.bgImg = `http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/article/${data.result.list[0].cardInfo2}`;
      }
      // for (let i = 0; i < data.result.list.length; i++) {
      //   data.result.list[i].spread = false;
      // }
      // this.cardInfoList = data.result.list;
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(benefits) {
  width: 100%;
  height: rem(1218);
  min-height: 100vh;
  background-image: url("./images/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: rem(140);
  text-align: center;
}

@include b(benefitsImg) {
  width: rem(670);
  margin: 0 auto;
}
</style>
