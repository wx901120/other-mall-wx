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

    <UploadPannel :imgArr.sync="imgArr"></UploadPannel>

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
      havaPic: false,
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

      imgArr: [],
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
    async submitInfo() {
      const regexName = /^[\u4E00-\u9FA5a-zA-Z]{2,4}$/; // 名字格式
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

      if (!money) {
        this.$Toast('请填写您的金额');
        return;
      } else if (!regexMoney.test(money)) {
        this.$Toast('请填写您的正确金额');
        return;
      }

      if (this.imgArr.length === 0) {
        this.$Toast('请上传小票图片');
        return;
      }

      this.$Indicator.open({
        text: '信息提交中...',
        spinnerType: 'fading-circle',
      });

      const data = await service.integralAdd({
        sid: this.submitForm.shopId,
        submit: 1,
        picPath: this.imgArr[0].response.data[0].url,
        number: this.submitForm.cardId,
        money: this.submitForm.money,
      });

      this.$Indicator.close();

      if (data.errCode === 0) {
        this.$MessageBox('上传成功').then(() => {
          this.$router.push({ name: 'memberSelfIntegration' });
        });
      } else {
        this.$Toast(data.errMsg);
      }
    },

    async getShop() {
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

<style lang="scss" scoped>
@include b(photoIntegration) {
  min-height: 100vh;
  background-color: #fff;

  @include e(shopList) {
    position: relative;
    &:after {
      content: '';
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
    margin-top: rem(300);
    margin: rem(300) rem(50) 0;
  }
}

@include b(popContent) {
  width: rem(750);

  .mint-search {
    overflow: scroll;
    height: 50vh;
  }
}
</style>
