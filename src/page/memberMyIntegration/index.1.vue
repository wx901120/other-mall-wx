<template>
  <div class="wx-myIntegration">
    <TheHeader title="我的积分"></TheHeader>

    <!-- 会员信息 -->
    <MemberInfo :memberCenterData="memberCenterData"></MemberInfo>

    <!-- 兑换记录-->
    <Records>
      <i-navbar class="page-part"
                v-model="selected">
        <i-tab-item id="1"
                    @click.native="resetData('1')">收入</i-tab-item>
        <i-tab-item id="2"
                    @click.native="resetData('2')">支出</i-tab-item>
      </i-navbar>

      <TabHeader></TabHeader>
      <!-- <TotalNum :exchangeNum="grandTotalNum | parseInt"></TotalNum> -->

      <div ref="list"
           :style="{overflow: 'scroll', height: (listHeight - 30) + 'px'}">
        <ul class="record-list"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="50">
          <RecordsItem v-for="(record, index) in recordList"
                       :key="index"
                       :record="record"></RecordsItem>
        </ul>

        <!-- 下拉到底的提示 -->
        <p v-show="loading"
           class="page-infinite-loading">
          <mt-spinner type="fading-circle"></mt-spinner>
          <span class="loading-tips">{{ infiniteScrollTips }}</span>
        </p>
      </div>

      <TotalNum :exchangeNum="exchangeNum | parseInt"></TotalNum>
    </Records>
  </div>
</template>

<script>
import {
  ICell,
  ITabContainer,
  ITabContainerItem,
  INavbar,
  ITabItem,
  TheHeader,
} from '@/components/index.js';
import MemberInfo from './MemberInfo';
import Records from './Records';
import TabHeader from './TabHeader';
import RecordsItem from './RecordsItem';
import TotalNum from './TotalNum';
import * as service from '@/api/service';
import loadMore from '@/mixins/loadMore.js';
import memberCenterMixin from '@/mixins/memberCenter';

export default {
  name: 'memberMyIntegration',

  components: {
    ICell,
    ITabContainer,
    ITabContainerItem,
    INavbar,
    ITabItem,
    TheHeader,
    MemberInfo,
    Records,
    TabHeader,
    RecordsItem,
    TotalNum,
  },

  data() {
    return {
      flag: '',
      exchangeNum: 0,
      selected: '1',
      recordList: [],
      timer: null,
    };
  },

  mixins: [
    loadMore,
    memberCenterMixin,
  ],

  created() {
    this.getMemberCenterData();
    this.$nextTick(() => {
      const {
        clientHeight,
      } = document.documentElement;
      const {
        top,
      } = this.$refs.list.getBoundingClientRect();
      this.listHeight = clientHeight - top;
    });
  },

  methods: {
    resetData(selected) {
      this.selected = selected;
      this.allLoaded = false;
      this.loading = false;
      this.count = 1;
      this.infiniteScrollTips = '加载中...';
      this.exchangeNum = 0;
      this.recordList = []; // 兑换记录
      this.loadMore();
    },

    async loadMore() {
      if (this.allLoaded) {
        return;
      }

      // 1:收入, 2:支出
      const type = this.selected === '1' ? '1' : '2';

      try {
        // 阻塞
        this.loading = true;


        // 请求数据
        const data = await service.memberIntegral({
          type,
          curPos: this.count,
        });

        const { allPage } = data.result;

        // 添加数据
        this.exchangeNum = data.result.allCount;

        if (data.result.list) {
          this.recordList.push(...data.result.list);
        }

        // 加载完毕
        if (this.count >= allPage) {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
          this.infiniteScrollTips = '数据加载完毕';
          this.allLoaded = true;
          this.noData = allPage === 0; // 判断是否有数据
          return;
        }

        // 下一页
        this.count++;

        // 释放
        this.loading = false;
      } catch (error) {
        console.log('error', error);
        this.allLoaded = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(myIntegration) {
  height: 100vh;
}
</style>
