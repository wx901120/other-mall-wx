<template>
  <div class="wx-photoIntegrationCheck">
    <!-- Header -->
    <TheHeader title="自助积分"></TheHeader>

    <div class="wx-integrationCheckContent">
      <div class="wx-tabHeader">
        <span class="wx-tabHeader__item">待审核</span>
        <span class="wx-tabHeader__item">审核通过</span>
        <span class="wx-tabHeader__item">审核失败</span>
      </div>

      <div class="wx-tabCheckInfo">
        <span class="wx-tabCheckInfo__item">时间</span>
        <span class="wx-tabCheckInfo__item">小票</span>
        <span class="wx-tabCheckInfo__item">状态</span>
      </div>

      <ul class="wx-checkInfoContent">
        <li class="wx-checkInfoContent__items">
          <span class="wx-checkInfoContent__item">2018/3/5 11:43:24</span>
          <span class="wx-checkInfoContent__item">781141211</span>
          <span class="wx-checkInfoContent__item">
            <input type="button"
                   value="修改"
                   class="wx-checkInfoContent__btn">
          </span>
        </li>
        <li class="wx-checkInfoContent__items">
          <span class="wx-checkInfoContent__item">2018/3/5 11:43:24</span>
          <span class="wx-checkInfoContent__item">781141211</span>
          <span class="wx-checkInfoContent__item">
            <input type="button"
                   value="修改"
                   class="wx-checkInfoContent__btn">
          </span>
        </li>
        <li class="wx-checkInfoContent__items">
          <span class="wx-checkInfoContent__item">2018/3/5 11:43:24</span>
          <span class="wx-checkInfoContent__item">781141211</span>
          <span class="wx-checkInfoContent__item">
            <input type="button"
                   value="修改"
                   class="wx-checkInfoContent__btn">
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as service from '@/api/service';

export default {
  name: 'memberPhotoIntegrationCheck',
  created() {
    this.getIngrationList();
  },
  methods: {
    async getIngrationList() {
      const data = await service.integralList({});

    }
  },
}
</script>

<style lang="scss" scoped>
@include b(photoIntegrationCheck) {
  color: #999999;
  text-align: center;
  @include e(item) {
  }
}

@include b(integrationCheckContent) {
  margin-top: rem(18);
  background: #fff;
}

@include b(tabHeader) {
  font-size: rem(28);
  display: flex;
  line-height: rem(100);
  border-bottom: 1px solid #d6d6d6;
  @include e(item) {
    width: 33.33%;
  }
}

@include b(tabCheckInfo) {
  font-size: rem(28);
  display: flex;
  line-height: rem(100);
  border-bottom: 1px solid #d6d6d6;
  @include e(item) {
    width: 33.33%;
  }
}

@include b(checkInfoContent) {
  @include e(items) {
    display: flex;
    line-height: rem(100);
    border-bottom: 1px solid #d6d6d6;
  }

  @include e(item) {
    width: 33.33%;
  }

  @include e(btn) {
    width: rem(80);
    height: rem(42);
    font-size: rem(24);
    background-color: #dec07b;
    border: none;
    outline: none;
    border-radius: rem(3);
    color: #fff;
  }
}
</style>


