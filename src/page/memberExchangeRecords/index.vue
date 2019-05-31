<template>
  <div class="wx-exchangeRecords">
    <TheHeader title="兑换记录"></TheHeader>

    <!-- 记录列表 -->
    <div class="wx-listWrap"
         ref="list"
         :style="{height: listHeight + 'px', overflow: 'scroll'}">
      <ul class="exchange-records-list"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="50">
        <ExchangeRecordListItem v-for="(record, index) in recordList"
                                :key="index"
                                :record="record"></ExchangeRecordListItem>
      </ul>
      <!-- 下拉到底的提示 -->
      <p v-show="loading"
         class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        <span class="loading-tips">{{infiniteScrollTips}}</span>
      </p>
    </div>
  </div>

</template>

<script>
import {
  IHeader,
  IField,
  IRadio,
  IButton,
  TheHeader,
} from '@/components/index.js';
import ExchangeRecordListItem from './ExchangeRecordListItem';
import * as service from '@/api/service';
import loadMore from '@/mixins/loadMore.js';

export default {
  name: 'memberExchangeRecords',

  mixins: [
    loadMore,
  ],

  components: {
    IHeader,
    IField,
    IRadio,
    IButton,
    TheHeader,
    ExchangeRecordListItem,
  },

  data() {
    return {
      recordList: [],
    };
  },

  async created() {
    this.$nextTick(() => {
      this.listHeight =
        document.documentElement.clientHeight - this.$refs.list.getBoundingClientRect().top;
    });
  },

  methods: {
    async loadMore() {
      if (this.allLoaded) {
        return;
      }

      this.loading = true;
      const data = await service.exchangeList({
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
            this.allLoaded = true;
          }, 1000);
          return;
        }

        // 页数大于1
        if (this.count >= 1) {
          for (let i = 0; i < data.result.list.length; i += 1) {
            data.result.list[i].goodPic = `http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/goods/${data.result.list[i].goodPic}`;
          }
          this.recordList.push(...data.result.list);
          this.count += 1;
          this.loading = false;
        }
      } else {
        this.$Toast(data.data.data);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(exchangeRecords) {
  background-color: #ededed;
  min-height: 100vh; 
}

@include b(listWrap) {
    margin-top: rem(20);
  }
</style>

