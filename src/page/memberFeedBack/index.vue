<template>
  <div class="wx-feedback">
    <TheHeader title="反馈"></TheHeader>

    <SuggestPannel v-model="suggestion"></SuggestPannel>

    <UploadPannel>
      <img class="upload-img"
           :src="localIdsPath ? localIdsPath : addImg"
           @click="upload()" />
      <input id="uploadBtn"
             type="file"
             accept="image/*"
             @change="onFileChange"
             required="required"
             style="width: 0; height: 0; overflow: hidden; opacity: 0;"
             ref="isFile">
    </UploadPannel>

    <div class="wx-feedback__btnGroup">
      <IButton size="large"
               type="red"
               class="wx-submitBtn"
               @click="submitFeedBack()">提交</IButton>
    </div>
  </div>
</template>

<script>
import addImg from './image/add.png';
import { TheHeader, IButton } from '@/components/index.js';
import SuggestPannel from './SuggestPannel';
import UploadPannel from './UploadPannel';
import './utils/lrz.all.bundle.js';
import { uploadFile, convertImgDataToBlob2 } from './utils/utils.js';
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

      addImg,

      imgLink: '',
    };
  },

  methods: {
    upload() {
      this.$refs.isFile.click();
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) { return; }

      const file = files[0];
      this.createImage(file);
      lrz(file, {
        width: 480,
        quality: 0.6,
      }).then((rst) => {
        const img = convertImgDataToBlob2(rst.base64);
        uploadFile(img, (r) => {
          if (r.errcode == 0) {
            this.imgLink = r.data[0].url;
            this.$Indicator.close();
          } else {
            alert('服务繁忙，请重新选择图片上传！');
          }
        });
      }).always(() => {
        e.target.value = null;
      });
    },
    createImage(file) {
      this.$Indicator.open({
        text: '上传中...',
        spinnerType: 'fading-circle',
      });
      const reader = new FileReader();
      const vm = this;
      reader.onload = (e) => {
        this.havaPic = true;
        vm.localIdsPath = e.target.result;
        this.logo = true;
        this.showBtn = false;
      };
      reader.readAsDataURL(file);
    },
    async submitFeedBack() {
      if (!this.suggestion) {
        this.$Toast('请填写反馈信息');
        return;
      }
    try{
      const data = await service.feedback({
        submit: 1,
        picPath: this.imgLink,
        suggestion: this.suggestion,
        uid: this.uid,
      });
        
      if (data.errCode === -1) {
        this.suggestion = '';
        this.localIdsPath = '';
        this.$MessageBox({
          message: data.errMsg,
          closeOnClickModal: false,
        }).then(() => {
          this.$router.push({ name: 'memberCenter' });
        });
      }else{
        this.$Toast(data.errMsg);      
      }
    } catch (error){
        console.log(error)
    }
    }
  }
}
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
  margin: rem(180) 0 rem(30) 0;
}
</style>

