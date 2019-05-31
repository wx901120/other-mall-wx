<template>
  <div class="wx-myIntegration">
    <TheHeader title="我的积分"></TheHeader>

    <!-- 会员信息 -->
    <MemberInfo :memberCenterData="memberCenterData"></MemberInfo>

    <!-- 兑换记录-->
    <Records>
      <i-navbar class="page-part"
                v-model="selected">
        <i-tab-item id="1">累计记录</i-tab-item>
        <i-tab-item id="2">兑换记录</i-tab-item>
      </i-navbar>

      <i-tab-container v-model="selected">
        <TabHeader></TabHeader>

        <i-tab-container-item id="1"
                              ref="list"
                              :style="{overflow: 'scroll', height: (listHeight - 30) + 'px'}">
          <ul class="record-list"
              v-infinite-scroll="grandTotalLoadMore"
              infinite-scroll-disabled="grandTotalLoading"
              infinite-scroll-distance="50"
              v-if="selected === '1'">
            <RecordsItem v-for="(record, index) in grandTotalRecords"
                         :key="index"
                         :record="record"></RecordsItem>
          </ul>
          <!-- 下拉到底的提示 -->
          <p v-show="grandTotalLoading"
             class="page-infinite-loading">
            <mt-spinner type="fading-circle"></mt-spinner>
            <span class="loading-tips">{{ grandTotalInfiniteScrollTips }}</span>
          </p>
        </i-tab-container-item>

        <!-- <TotalNum :exchangeNum="grandTotalNum | parseInt"></TotalNum> -->

        <i-tab-container-item id="2"
                              :style="{overflow: 'scroll', height: (listHeight - 30) + 'px'}">
          <ul class="record-list"
              v-infinite-scroll="exchangeLoadMore"
              infinite-scroll-disabled="exchangeLoading"
              infinite-scroll-distance="50"
              v-if="selected === '2'">
            <RecordsItem v-for="(record, index) in exchangeRecords"
                         :key="index"
                         :record="record"></RecordsItem>
          </ul>

          <!-- 下拉到底的提示 -->
          <p v-show="exchangeLoading"
             class="page-infinite-loading">
            <mt-spinner type="fading-circle"></mt-spinner>
            <span class="loading-tips">{{ exchangeInfiniteScrollTips }}</span>
          </p>
        </i-tab-container-item>

        <TotalNum :exchangeNum="exchangeNum | parseInt"></TotalNum>
      </i-tab-container>
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
      listHeight: 0,
      grandTotalAllLoaded: false,
      grandTotalLoading: false,
      grandTotalCount: 1,
      grandTotalInfiniteScrollTips: '加载中...',

      exchangeAllLoaded: false,
      exchangeLoading: false,
      exchangeCount: 1,
      exchangeInfiniteScrollTips: '加载中...',
      exchangeNum: 0,

      selected: '1',
      grandTotalRecords: [], // 累计记录
      exchangeRecords: [], // 兑换记录
    };
  },

  mixins: [
    memberCenterMixin,
  ],

  created() {
    this.getMemberCenterData();
    this.$nextTick(() => {
      this.listHeight = document.documentElement.clientHeight - this.$refs.list.$el.getBoundingClientRect().top;
    });
  },

  methods: {
    async grandTotalLoadMore() {
      if (this.grandTotalAllLoaded) {
        return;
      }

      this.grandTotalLoading = true;

      const data = await service.memberIntegral({
        type: this.selected === '1' ? '1' : '2',
        curPos: this.grandTotalCount,
      });

      if (data.errCode === 0) {
        // 数据加载完成

        this.exchangeNum = data.result.allCount;
        if (
          data.result.pages === 0 || this.grandTotalCount === data.result.pages || !data.result.list
        ) {
          if (data.result.pages === 0) {
            this.noData = true;
          }

          if (data.result.list) {
            if (this.selected === '1') {
              this.grandTotalRecords.push(...data.result.list);
            } else {
              this.exchangeRecords.push(...data.result.list);
            }
          }
          this.grandTotalInfiniteScrollTips = '数据加载完毕';
          setTimeout(() => {
            this.grandTotalLoading = false;
            this.grandTotalAllLoaded = true;
          }, 1000);
          return;
        }

        // 页数大于1
        if (this.grandTotalCount >= 1) {
          if (this.selected === '1') {
            this.grandTotalRecords.push(...data.result.list);
          } else {
            this.exchangeRecords.push(...data.result.list);
          }
          this.grandTotalCount += 1;
          this.grandTotalLoading = false;
        }
      } else {
        this.$Toast(data.data.data);
      }
    },
    async exchangeLoadMore() {
      if (this.exchangeAllLoaded) {
        return;
      }

      this.exchangeLoading = true;

      const type = this.selected === '1' ? '1' : '2';

      const data = await service.memberIntegral({
        type,
        curPos: this.exchangeCount,
      });

      if (data.errCode === 0) {
        this.exchangeNum = data.result.allCount;
        // 数据加载完成
        if (
          data.result.pages === 0 || this.exchangeCount === data.result.pages || !data.result.list
        ) {
          if (data.result.pages === 0) {
            this.noData = true;
          }

          if (data.result.list) {
            if (this.selected === '1') {
              this.exchangeRecords.push(...data.result.list);
            } else {
              this.exchangeRecords.push(...data.result.list);
            }
          }
          this.exchangeInfiniteScrollTips = '数据加载完毕';
          setTimeout(() => {
            this.exchangeLoading = false;
            this.exchangeAllLoaded = true;
          }, 1000);
          return;
        }

        // 页数大于1
        if (this.exchangeCount >= 1) {
          if (this.selected === '1') {
            this.exchangeRecords.push(...data.result.list);
          } else {
            this.exchangeRecords.push(...data.result.list);
          }
          this.exchangeCount += 1;
          this.exchangeLoading = false;
        }
      } else {
        this.$Toast(data.data.data);
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
