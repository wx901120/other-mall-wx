<template>
  <div class="wx-parkPaymentRecords">
    <TheHeader title="缴费记录"></TheHeader>

    <div ref="list"
         :style="{ height: listHeight + 'px', overflow: 'scroll'}">
      <parkPaymentRecordsList v-infinite-scroll="loadMore"
                              infinite-scroll-disabled="loading"
                              infinite-scroll-distance="50">
        <parkPaymentRecordsListItem v-for="(record, index) in recordList"
                                    :key="index"
                                    :isExpand="index === checkedIndex"
                                    :record="record"
                                    @click.native="checkedIndex === index ? checkedIndex = -1 : checkedIndex = index"></parkPaymentRecordsListItem>
      </parkPaymentRecordsList>
      <!-- 下拉到底的提示 -->
      <p class="page-infinite-loading"
         v-show="loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        <span class="loading-tips">{{infiniteScrollTips}}</span>
      </p>
    </div>

  </div>
</template>

<script>
import * as service from '@/api/service';
import parkPaymentRecordsList from './parkPaymentRecordsList';
import parkPaymentRecordsListItem from './parkPaymentRecordsListItem';
import loadMore from '@/mixins/loadMore.js';

export default {
  name: 'parkPaymentRecords',

  components: {
    parkPaymentRecordsList,
    parkPaymentRecordsListItem,
  },

  mixins: [
    loadMore,
  ],

  data() {
    return {
      listHeight: 0,
      checkedIndex: -1,

      recordList: [],
    };
  },

  created() {
    this.$nextTick(() => {
      this.listHeight = document.documentElement.clientHeight - this.$refs.list.getBoundingClientRect().top;

      // this.getParkRecordData();
    });
  },

  methods: {
    async loadMore() {
      if (this.allLoaded) {
        return;
      }

      this.loading = true;
      const data = await service.parkPayRecord({
        curPos: this.count,
      });

      if (data.errCode === 0) {
        // 暂无数据
        if (data.result.pages === 0) {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
          this.allLoaded = true;
          this.noData = true;
          return;
        }

        // 数据加载完成
        if (!data.result.list) {
          this.infiniteScrollTips = '数据加载完毕';
          setTimeout(() => {
            this.loading = false;
          }, 1000);
          this.allLoaded = true;
          return;
        }

        // 页数大于1
        if (this.count >= 1) {
          this.recordList.push(...data.result.list);
          this.count += 1;
          this.loading = false;
        }
      } else {
        this.$Toast(data.data.data);
      }
    },

    async getParkRecordData() {
      const data = await service.parkPayRecord({});
      
      if (data.errCode !== 0) {
        this.$Toast(data.errMsg);
        return;
      }

      this.recordList = data.result.list;
    }
  }
};
</script>

<style lang="scss" scoped>
.wx-parkPaymentRecords {
  min-height: 100vh;
  background-color: #151a24;
}
</style>

