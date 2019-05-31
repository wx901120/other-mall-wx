<template>
  <div class="wx-myCoupon">
    <TheHeader type="backPlain"
               fixed></TheHeader>

    <div class="wx-tabHeader">
      <div class="wx-tabHeader__content">
        <span class="wx-tabHeader__item"
              :class="{'is-checked' : typeSel === 1}"
              @click="checkCoupon(1)">未使用</span>
        <span class="wx-tabHeader__item"
              :class="{'is-checked': typeSel === 2}"
              @click="checkCoupon(2)">已使用</span>
        <span class="wx-tabHeader__item"
              :class="{'is-checked': typeSel === 3}"
              @click="checkCoupon(3)">已过期</span>
      </div>
    </div>

    <div class="wx-listWrap"
         ref="list"
         :style="{ height: listHeight + 'px', overflow: 'scroll'}">
      <EmptyList v-show="noData"></EmptyList>
      <ul class="wx-couponList"
          v-infinite-scroll="loadMore"
          :infinite-scroll-disabled="loading"
          :infinite-scroll-distance="50">
        <Coupon v-for="(couponInfo, index) in couponList"
                :key="index"
                :couponType="typeSel"
                :couponInfo="couponInfo"></Coupon>
      </ul>
      <p class="page-infinite-loading"
         v-show="loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        <span class="loading-tips">{{infiniteScrollTips}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { TheHeader } from '@/components/index.js';
import * as service from '@/api/service';
import fixedList from '@/mixins/fixedList.js';
import loadMore from '@/mixins/loadMore.js';
import Coupon from './Coupon';
import EmptyList from './EmptyList';
import _ from 'lodash';

export default {
  name: 'coupons',

  components: {
    TheHeader,
    Coupon,
    EmptyList,
  },

  mixins: [
    fixedList,
    loadMore,
  ],

  data() {
    return {
      flag: '',
      couponList: [],
      timer: null,

      typeSel: 1,
    };
  },

  methods: {
    async loadMore(typeSel = 1) {
      if (this.allLoaded || this.loading) {
        return;
      }

      try {
        // 阻塞
        this.loading = true;

        // 请求数据
        const data = await service.myCoupons({
          type: this.type,
          flag: this.flag,
          curPos: this.count,
        });

        // 切换到其他tab以及首次加载、couponList却有数据则返回不执行后续代码
        if ((typeSel !== this.typeSel) || (this.count === 1 && this.couponList.length > 0)) {
          return;
        }

        const { allPage } = data.result;

        console.log('couponList:', data.result.list);

        // 加载数据
        if (data.result.list) {
          this.couponList.push(...data.result.list);
          this.noData = false;
        }

        // 加载完毕, 初始化this.count = 1;
        if (this.count >= allPage) {
          this.timer = setTimeout(() => {
            this.loading = false;
          }, 1000);
          this.infiniteScrollTips = '数据加载完毕';
          this.allLoaded = true;
          this.noData = allPage === 0;
          return;
        }

        // 下一页
        this.count++;
        this.loading = false;
      } catch (error) {
        console.log('error', error);

        // 报错则停止加载数据
        this.allLoaded = true;
        this.loading = false;
      }
    },

    async checkCoupon(typeSel) {
      if (this.typeSel === typeSel) {
        return;
      }
      this.noData = false;
      this.typeSel = typeSel;
      this.count = 1;
      this.couponList = [];
      this.allLoaded = false;
      this.loading = false;
      this.infiniteScrollTips = '加载中...';

      if (typeSel === 1) {
        this.type = 1;
        this.flag = '';
      } else if (typeSel === 2) {
        this.type = 2;
        this.flag = 1;
      } else {
        this.type = 2;
        this.flag = 2;
      }
      this.loadMore(typeSel);
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(myCoupon) {
  background-color: #f8f8f8;
}

@include b(tabHeader) {
  background-color: #fff;
  @include e(content) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: rem(90);
    font-size: rem(28);
    font-weight: bold;
    background: #f0f2f5;
    margin: 0 rem(50);
  }

  @include e(item) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33.33%;
    height: 100%;
    text-align: center;
    color: #d9d9d9;
    background: #fff;

    @include when(checked) {
      position: relative;
      color: #d6024c;
      &:after {
        position: absolute;
        top: auto;
        left: 0;
        bottom: 0;
        right: 0;
        content: "";
        margin: auto;
        width: rem(76);
        border-bottom: rem(6) solid #d6024c;
      }
    }
  }
}

@include b(listWrap) {
  // margin-top: rem(20);
  padding: rem(20) rem(20) 0;
}

@include b(couponList) {
  padding-bottom: rem(20);
  font-size: rem(24);
}

.no-data-nousedcoupon {
  // background-image: url('./image/nousedcoupon.png');
  background-size: rem(180) rem(180);
  background-position: center rem(60);
  background-repeat: no-repeat;
  padding-top: rem(294);
  font-size: rem(30);
  color: #999999;
  text-align: center;
}
</style>


