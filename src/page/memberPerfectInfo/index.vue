<template>
  <div class="wx-perfectInfos">
    <!-- Header -->
    <TheHeader title="完善资料"
               style="border-bottom: 1px solid #e5e5e5;"></TheHeader>

    <PerfectInfoForm>
      <i-field label="姓名："
               placeholder="请输入您的姓名"
               v-model="userForm.username"
               class="wx-requiredInput"></i-field>
      <i-radio title="性别："
               v-model="userForm.sex"
               :options="optionsSex"
               class="wx-requiredInput"/>
      <i-field label="生日："
               placeholder="请输入您的生日"
               type="button"
               class="wx-age is-age wx-requiredInput"
               v-model="userForm.birthday"
               @click.native="openPicker('picker')"></i-field>
      <p class="tips">（注册完成后 如需要更改请到服务台更改）</p>
      <i-cell title="地区：">
        <distpicker :provinceList="provinceList"
                    :cityList="cityList"
                    :districtList="districtList"
                    :provinceIndex.sync="provinceIndex"
                    :cityIndex.sync="cityIndex"
                    :districtIndex.sync="districtIndex"
                    @selectProvince="selectProvince"
                    @selectCity="selectCity"
                    @selectDistrict="selectDistrict"></distpicker>
      </i-cell>
      <i-field label="地址："
               placeholder="请输入您的地址"
               v-model="userForm.addressDetail"></i-field>
      <i-field label="手机号："
               placeholder="请输入您的手机号"
               readonly
               v-model="userForm.phone"></i-field>
      <ModelAgree v-if="false"></ModelAgree>
    </PerfectInfoForm>

    <div class="wx-perfectBtn">
      <IButton size="large"
               type="red"
               @click="postUserInfo()">提交</IButton>
    </div>

    <datetime-picker ref="picker"
                     type="date"
                     v-model="currentDate"
                     :startDate="new Date('1900-01-01')"
                     :endDate="new Date()"
                     @confirm="handleChange">
    </datetime-picker>
  </div>
</template>

<script>
import {
  ICell,
  TheHeader,
  IField,
  IRadio,
  IChecklist,
  IButton,
} from '@/components/index.js';
import { DatetimePicker } from 'mint-ui';
import PerfectInfoForm from './PerfectInfoForm';
import ModelAgree from './ModelAgree';
import * as service from '@/api/service';
import moment from 'moment';
import distpicker from './distpicker';
import _ from 'lodash';

export default {
  name: 'memberPerfectInfo',

  components: {
    TheHeader,
    IField,
    IRadio,
    IButton,
    ICell,
    IChecklist,
    PerfectInfoForm,
    ModelAgree,
    DatetimePicker,
    distpicker,
  },

  data() {
    return {
      provinceIndex: '1',
      cityIndex: '1',
      districtIndex: '1',
      provinceList: [],
      cityList: [],
      districtList: [],
      valueSex: '男',
      currentDate: new Date(),
      userForm: {
        username: '',
        sex: '',
        birthday: moment(new Date()).format('YYYY/MM/DD'),
        area: [],
        addressDetail: '',
        phone: '',
      },
    };
  },

  async created() {
    this.options1 = [''];
    this.optionsSex = ['男', '女'];

    document.addEventListener('touchstart', (e) => {
      if (e.target.className === 'v-modal') {
        e.preventDefault();
      }
    });

    await this.getUserInfo();
  },

  methods: {
    async selectProvince(checkedProvinceIndex) {
      console.log('selectProvince', checkedProvinceIndex);
      const citiesRes = await service.getCities({
        pid: checkedProvinceIndex,
      });
      this.cityList = citiesRes;
      console.log('citiesRes', citiesRes);

      this.cityIndex = this.cityList[0].id;

      const districtsRes = await service.getDistricts({
        cid: this.cityIndex,
      });
      console.log('districtsRes', districtsRes);
      this.districtList = districtsRes;

      this.districtIndex = this.districtList[0].id;
    },

    async selectCity(checkedCityIndex) {
      const districtsRes = await service.getDistricts({
        cid: checkedCityIndex,
      });
      this.districtList = districtsRes;

      this.districtIndex = this.districtList[0].id;
    },

    async selectDistrict(checkedDistrictIndex) {
      console.log(checkedDistrictIndex);
    },

    openPicker() {
      console.log('openPicker');
      this.$refs.picker.open('picker');
    },

    handleChange(value) {
      this.userForm.birthday = moment(value).format('YYYY/MM/DD');
    },

    async getUserInfo() {
      const data = await service.perfectInformation({});

      const userInfo = data.result.info;

      this.userForm.username = userInfo.userTrueName;
      this.userForm.sex = userInfo.sex === '2' ? '女' : '男';
      this.userForm.birthday = userInfo.birthday !== null ? moment(userInfo.birthday * 1000).format('YYYY/MM/DD') : null;
      this.userForm.addressDetail = userInfo.address;
      this.userForm.phone = userInfo.userPhone;
      userInfo.province = userInfo.province || '1';
      userInfo.city = userInfo.city || '1';
      userInfo.district = userInfo.district || '1';

      this.provinceList = await service.getProvinces({});

      this.cityList = await service.getCities({
        pid: userInfo.province,
      });

      this.districtList = await service.getDistricts({
        cid: userInfo.city,
      });
      this.provinceIndex = userInfo.province;
      this.cityIndex = userInfo.city;
      this.districtIndex = userInfo.district;
    },

    // 提交资料表单
    postUserInfo: _.debounce(
      async function postUserInfo() {
        if (!this.validateUserInfo().validateResult) {
          this.$MessageBox('提示', this.validateUserInfo().validateInfo);
          return;
        }

        const data = await service.perfectInformation({
          submit: '1',
          userTrueName: this.userForm.username,
          province: this.provinceIndex,
          city: this.cityIndex,
          district: this.districtIndex,
          userPhone: this.phone,
          address: this.userForm.addressDetail,
          YYYY: moment(this.userForm.birthday).format('YYYY'),
          MM: moment(this.userForm.birthday).format('MM'),
          DD: moment(this.userForm.birthday).format('DD'),
          sex: this.userForm.sex === '男' ? 1 : 2,
        });

        if (data.errCode === 0) {
          this.$MessageBox.alert(data.errMsg).then(() => {
            this.$router.go(-1);
          });
        } else {
          this.$Toast(data.errMsg);
        }
      },
      1000,
      {
        leading: true,
        trailing: false,
      },
    ),

    validateUserInfo() {
      const regexName = /^[\u4e00-\u9fa5a-zA-Z]+$/; // 名字格式

      if (this.userForm.address === '') {
        return {
          validateResult: false,
          validateInfo: '地址不能为空',
        };
      }

      console.log(regexName.test(this.userForm.username));

      if (!this.userForm.username) {
        return {
          validateResult: false,
          validateInfo: '姓名不能为空',
        };
      } else if (!regexName.test(this.userForm.username)) {
        return {
          validateResult: false,
          validateInfo: '姓名只能包含汉字或英文',
        };
      }

      return {
        validateResult: true,
      };
    },
  },
};
</script>

<style lang="scss">

@include b(perfectInfos) {
  background-color: #fff;
  /* 覆盖 */
  .i-cell-wrapper {
    background: none;
  }
  .i-cell-title {
    // flex: 0;
    // flex-shrink: 1;
    flex: none;
  }
}

@include b(perfectInfoForm) {
  .i-cell-title {
    flex: none;
    flex-shrink: 0;
  }
}

@include b(age) {
  @include when (age) {
    .i-field-core {
      text-align: left;
      background-image: url("../../assets/image/icon-arrow-down.png");
      background-size: rem(22) rem(13);
      background-repeat: no-repeat;
      background-position: rem(512) center;
    }
  }
}

@include b(requiredInput) {
  position: relative;
  &:after {
    content: '*';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: auto;
    margin: auto;
    display: flex;
    align-items: center;
    color: #d6024c;
    font-size: rem(32);
  }
}

.address select {
  width: rem(170);
  height: rem(70);
  background-color: #f4f4f4;
  border: none;
  border-radius: 0;
  padding: 0;
  font-size: rem(26);
  color: #666666;
}

@include b(perfectBtn) {
  margin: rem(284) 0 rem(30);
  width: 100%;
  padding: 0 rem(50);
}
</style>


