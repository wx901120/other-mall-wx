<template>
  <div class="wx-feedback">
    <TheHeader title="反馈"></TheHeader>

    <SuggestPannel v-model="suggestion"></SuggestPannel>

    <UploadPannel :imgArr.sync="imgArr"></UploadPannel>

    <div class="wx-feedback__btnGroup">
      <IButton size="large"
               type="red"
               class="wx-submitBtn"
               @click="submitFeedBack()">提交</IButton>
    </div>
  </div>
</template>

<script>
import { TheHeader, IButton } from '@/components/index.js';
import SuggestPannel from './SuggestPannel';
import UploadPannel from './UploadPannel';
import * as service from '@/api/service';
import memberCenterMixin from '@/mixins/memberCenter';

export default {
  components: {
    TheHeader,
    IButton,
    SuggestPannel,
    UploadPannel,
  },

  mixins: [
    memberCenterMixin,
  ],

  created() {
    this.getMemberCenterData();
  },

  data() {
    return {
      localIdsPath: '',
      havaPic: false,
      suggestion: '',
      imgArr: [],
    };
  },

  methods: {
    async submitFeedBack() {
      if (!this.suggestion) {
        this.$Toast('请填写反馈信息');
        return;
      }
      
      const data = await service.feedback({
        submit: 1,
        picPath: this.imgArr.map(item => item.response.data[0].url),
        suggestion: this.suggestion,
        uid: this.uid,
      });

      if (data.errCode === -1) {
        this.suggestion = '';
        this.localIdsPath = '';
        this.imgArr = [];

        this.$MessageBox('反馈成功').then(() => {
          this.$router.push({ name: 'memberCenter' });
        });
      } else {
        this.$Toast(data.errMsg);
      }
    },
  },
};
</script>


<style lang="scss" scoped>
@include b(feedback) {
  min-height: 100vh;
  background-color: #fff;

  @include e(btnGroup) {
    margin: 0 rem(50);
  }
}

@include b(submitBtn) {
  margin-top: rem(180);
}
</style>

