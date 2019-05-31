<template>
  <div class="wx-distpicker">
    <select class="wx-distpicker__item"
            ref="provinceSelect"
            v-model="checkedProvinceIndex"
            @change="selectProvince">
      <option :value="value.id"
              :selected="value.id === checkedProvinceIndex"
              v-for="(value, key) in provinceList"
              :key="key">{{ value.ProvinceName }}</option>
    </select>
    <select class="wx-distpicker__item"
            ref="citySelect"
            v-model="checkedCityIndex"
            @change="selectCity">
      <option :value="value.id"
              :selected="value.id === checkedDistrictIndex"
              v-for="(value, key) in cityList"
              :key="key">{{ value.CityName }}</option>
    </select>
    <select class="wx-distpicker__item"
            ref="districtSelect"
            v-model="checkedDistrictIndex"
            @change="selectDistrict">
      <option :value="value.id"
              :selected="value.id === checkedDistrictIndex"
              v-for="(value, key) in districtList"
              :key="key">{{ value.DistrictName }}</option>
    </select>
  </div>
</template>

<script>
import areaJson from './data/area';
import * as service from '@/api/service';

export default {
  name: 'distpicker',

  props: {
    provinceIndex: {
      type: String,
      default: '1',
    },
    cityIndex: {
      type: String,
      default: '1',
    },
    districtIndex: {
      type: String,
      default: '1',
    },
    provinceList: {
      type: Array,
    },
    cityList: {
      type: Array,
    },
    districtList: {
      type: Array,
    },
  },

  data() {
    return {


      checkedProvinceIndex: this.provinceIndex,
      checkedCityIndex: this.cityIndex,
      checkedDistrictIndex: this.districtIndex,
    };
  },

  async created() {
    // const provinceRes = await service.getProvinces({});
    // this.provinceList = provinceRes;

    // // const provinceIndex = this.$refs.provinceSelect.selectedIndex;
    // // const selectedProvince = this.provinceList[provinceIndex];
    // // this.checkedProvinceIndex = selectedProvince.id;


    // const citiesRes = await service.getCities({
    //   pid: this.checkedProvinceIndex,
    // });
    // this.cityList = citiesRes;

    // // this.checkedCityIndex = this.cityList[0].id;

    // const districtsRes = await service.getDistricts({
    //   cid: this.checkedCityIndex,
    // });
    // this.districtList = districtsRes;

    // this.checkedDistrictIndex = this.districtList[0].id;
  },

  watch: {
    provinceIndex(newVal) {
      this.checkedProvinceIndex = newVal;
    },
    cityIndex(newVal) {
      this.checkedCityIndex = newVal;
    },
    districtIndex(newVal) {
      this.checkedDistrictIndex = newVal;
    },
    checkedProvinceIndex: {
      async handler(newVal) {
        this.$emit('update:provinceIndex', newVal);
      },
      // immediate: true,
    },
    checkedCityIndex: {
      async handler(newVal) {
        this.$emit('update:cityIndex', newVal);
      },
      // immediate: true,
    },
    checkedDistrictIndex: {
      async handler(newVal) {
        this.$emit('update:districtIndex', newVal);
      },
      // immediate: true,
    },
  },
  methods: {
    async selectProvince() {
      const provinceIndex = this.$refs.provinceSelect.selectedIndex;
      const selectedProvince = this.provinceList[provinceIndex];
      this.checkedProvinceIndex = selectedProvince.id;

      this.$emit('selectProvince', this.checkedProvinceIndex);
    },
    async selectCity() {
      const cityIndex = this.$refs.citySelect.selectedIndex;
      const selectedCity = this.cityList[cityIndex];
      this.checkedCityIndex = selectedCity.id;

      this.$emit('selectCity', this.checkedCityIndex);
    },
    selectDistrict() {
      const districtIndex = this.$refs.districtSelect.selectedIndex;
      const selectedDistrict = this.districtList[districtIndex];
      this.checkedDistrictIndex = selectedDistrict.id;

      this.$emit('selectDistrict', this.checkedDistrictIndex);
    },
  },
};
</script>

<style lang="scss" scoped>
select {
  position: relative;
  display: block;
  border: solid 1px #000;
  appearance: none;
  padding-right: 14px;

  background-image: url("../../assets/image/icon-arrow-down.png");
  background-size: rem(22) rem(13);
  background-repeat: no-repeat;
  background-position: rem(130) center;
  text-indent: rem(20);
}
@include b(distpicker) {
  display: flex;
  @include e(item) {
    width: rem(166);
    height: rem(70);
    background-color: #f4f4f4;
    border: none;
    &:nth-child(n + 2) {
      margin-left: rem(26);
    }
  }
}
</style>

