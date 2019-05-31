<template>
  <div class="wx-photoIntegration">
    <TheHeader title="拍照积分"></TheHeader>

    <PhotoIntegrationForm>
      <i-field label="姓 名："
               placeholder="请输入您的姓名"
               readonly
               v-model="memberCenterData.userTrueName"></i-field>
      <i-field label="手机号："
               placeholder="请输入您的手机号"
               readonly
               v-model="memberCenterData.userPhone"></i-field>
      <!-- <select name="" id="" @click="getShop()"></select> -->
      <i-field label="店 铺："
               type="select"
               placeholder="请输入您的店铺"
               class="wx-photoIntegration__shopList"
               readonly
               disabled
               v-model="submitForm.shopName"
               @click.native="searchPop=true">
      </i-field>
      <i-field label="小票号："
               placeholder="请输入您的小票号"
               v-model="submitForm.cardId"></i-field>
      <i-field label="金 额："
               placeholder="请输入您的金额"
               v-model="submitForm.money"></i-field>
    </PhotoIntegrationForm>

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
      <!-- <IButton size="large"
               type="red"
               class="wx-submitBtn"
               @click="submitFeedBack()">提交</IButton> -->
    </UploadPannel>

    <div class="wx-photoIntegration__btnGroup">
      <IButton size="large"
               type="red"
               @click="submitInfo()">提交</IButton>
    </div>

    <mt-popup v-model="searchPop"
              position="top"
              pop-transition="popup-fade">
      <div class="wx-popContent">
        <Search v-model="searchText"
                autofocus
                :show="true"
                :result="filterResult">
          <i-cell v-for="(item, index) in filterResult"
                  :title="item.shopName"
                  :key="index"
                  ::result.sync="result"
                  @click.native="onShopSelect(item)">
          </i-cell>
        </Search>
      </div>
    </mt-popup>

  </div>
</template>

<script>
import PhotoIntegrationForm from './PhotoIntegrationForm';
import UploadPannel from './UploadPannel';
import addImg from './image/add.png';
import './utils/lrz.all.bundle.js';
import { uploadFile, convertImgDataToBlob2 } from './utils/utils.js';
import * as service from '@/api/service';
import { Search } from 'mint-ui';
import memberCenterMixin from '@/mixins/memberCenter';

export default {
  name: 'memberPhotoIntegration',

  components: {
    PhotoIntegrationForm,
    UploadPannel,
    Search,
  },

  mixins: [
    memberCenterMixin,
  ],

  data() {
    return {
      localIdsPath: '',
      havaPic: false,
      addImg,

      result: [],

      submitForm: {
        name: '',
        phone: '',
        cardId: '',
        money: '',
        shopName: '',
        shopId: '',
      },

      shopList: [],
      searchText: '',
      searchPop: false,
      imgLink: '',

      order: {},
    };
  },

  computed: {
    filterResult() {
      return this.shopList.filter(value => new RegExp(this.searchText, 'i').test(value.shopName));
    },
  },

  async created() {
    this.getShop();
    await this.getMemberCenterData();

    if (this.memberCenterData.userTrueName) {
      this.submitForm.name = this.memberCenterData.userTrueName;
    }

    if (this.memberCenterData.userPhone) {
      this.submitForm.phone = this.memberCenterData.userPhone;
    }
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
          if (r.errcode === 0) {
            this.imgLink = r.data[0].url;
            console.log('imgLink:', this.imgLink);
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

    async submitInfo() {
      const regexName = /^[\u4E00-\u9FA5a-zA-Z]+$/; // 名字格式
      const regexPhone = /^1[3456789]\d{9}$/; // 手机号码格式
      const regexReceipt = /^[A-Za-z0-9]+$/; // 小票格式
      const regexMoney = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/; // 金额格式

      const {
        name,
        cardId,
        phone,
        money,
        shopId,
      } = this.submitForm;

      if (!name) {
        this.$Toast('请填写您的姓名');
        return;
      } else if (!regexName.test(name)) {
        this.$Toast('请填写正确的名字格式');
        return;
      }

      if (!phone) {
        this.$Toast('请填写您的手机号码');
        return;
      } else if (!regexPhone.test(phone)) {
        this.$Toast('请填写正确的手机号码格式');
        return;
      }

      if (!shopId) {
        this.$Toast('请选择您的店铺');
        return;
      }

      if (!cardId) {
        this.$Toast('请填写您的小票号');
        return;
      } else if (!regexReceipt.test(cardId)) {
        this.$Toast('请填写您的正确小票号');
        return;
      }

      if (!cardId) {
        this.$Toast('请填写您的小票号');
        return;
      } else if (!regexReceipt.test(cardId)) {
        this.$Toast('请填写您的正确小票号');
        return;
      }

      if (!money) {
        this.$Toast('请填写您的金额');
        return;
      } else if (!regexMoney.test(money)) {
        this.$Toast('请填写您的正确金额');
        return;
      }

      if (!this.imgLink) {
        this.$Toast('请上传您的小票号图片');
        return;
      }

      this.$Indicator.open({
        text: '信息提交中...',
        spinnerType: 'fading-circle',
      });

      try {
        let data = null;
        if (!this.$route.params.ticketNum) {
          data = await service.integralAdd({
            sid: this.submitForm.shopId,
            submit: 1,
            picPath: this.imgLink,
            number: this.submitForm.cardId,
            money: this.submitForm.money,
          });
        } else {
          data = await service.integralEdit({
            zid: this.order.id,
            submit: 1,
            picPath: this.imgLink,
            number: this.submitForm.cardId,
            money: this.submitForm.money,
          });

          console.log('data:', data);
        }

        this.$MessageBox({
          message: data.title,
          closeOnClickModal: false,
        }).then(() => {
          this.$router.push({ name: 'memberCenter' });
        });
      } catch (error) {
        console.log('error', error);
      } finally {
        this.$Indicator.close();
      }
    },

    async getShop() {
      if (this.$route.params.recordId) {
        const integralListData = await service.integralList({});

        const orderList = integralListData.result.data;

        const recordId = this.$route.params.recordId;
        for (let i = 0; i < orderList.length; i++) {
          if (orderList[i].id === recordId) {
            console.log('order', orderList[i]);
            this.order = orderList[i];
            this.submitForm.shopName = this.order.shopName;
            this.submitForm.cardId = this.order.number;
            this.submitForm.money = this.order.money;
            this.submitForm.shopId = this.order.sid;
            this.imgLink = this.order.picPath;
            this.localIdsPath = this.order.picPath;
          }
        }
      }

      const data = await service.shopSearch({
        // search_text: text,
      });

      this.shopList = data.result.shop;
    },

    onShopSelect(value) {
      this.searchText = value.shopName;
      this.submitForm.shopName = value.shopName;
      this.submitForm.shopId = value.id;
      this.searchPop = false;
    },
  },
};
</script>

<style lang="scss">
@include b(photoIntegration) {
  min-height: 100vh;
  background-color: #fff;

  input:disabled {
    background: #f4f4f4;
    opacity: 1;
  }

  .mint-popup {
    position: absolute;
    left: 0;
    right: 0;
    top: rem(120);
    margin: 0 auto;
    transform: none;
    // background: transparent;
    background: #fff;
    overflow: hidden;
    width: rem(600);
    height: rem(800);
    border-radius: rem(10);
  }

  .mint-search-list {
    min-height: rem(500);
  }
  // .i-cell-wrapper {
  //   height: rem(50);
  //   min-height: rem(50);
  //   line-height: rem(50);
  // }

  @include e(shopList) {
    position: relative;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: rem(50);
      bottom: 0;
      left: auto;
      margin: auto;
      background-image: url("../../assets//image/icon-arrow-down.png");
      background-repeat: no-repeat;
      background-size: cover;
      width: rem(22);
      height: rem(13);
    }
  }

  @include e(btnGroup) {
    padding: rem(200) rem(50) rem(40);
  }
}

@include b(popContent) {
  // position: absolute;
  // top: 0;
  // right: 0;
  // bottom: 0;
  // left: 0;
  // margin: auto;
  .i-cell {
    height: rem(80);
    min-height: rem(80);
    line-height: rem(80);
  }

  .mint-search {
    overflow: scroll;
    // height: rem(700);
  }
}
</style>
