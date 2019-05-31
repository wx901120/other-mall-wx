<template>
  <div class="wx-myMessage">
    <TheHeader title="我的消息"></TheHeader>

    <div class="list-wrap"
         ref="list"
         :style="{height: listHeight + 'px', overflow: 'scroll'}">
      <ul class="wx-messageList"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="50">
        <MessageItem v-for="(message, index) in messageList"
                     :key="index"
                     :message="message"></MessageItem>
      </ul>
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
import { TheHeader } from '@/components/index.js';
import MessageItem from './MessageItem';
import * as service from '@/api/service';
import loadMore from '@/mixins/loadMore.js';

export default {
  name: 'messageIndex',

  components: {
    TheHeader,
    MessageItem,
  },

  mixins: [
    loadMore,
  ],

  data() {
    return {
      messageList: [],
    };
  },

  created() {
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
    async loadMore() {
      if (this.allLoaded) {
        return;
      }

      try {
        // 阻塞
        this.loading = true;

        // 请求数据
        const data = await service.myMessage({
          curPos: this.count,
        });

        const { allPage } = data.result;

        // 加载数据
        if (data.result.list) {
          this.noData = false;
          this.messageList.push(...data.result.list);
        }

        // 加载完毕
        if (this.count >= allPage) {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
          this.infiniteScrollTips = '数据加载完毕';
          this.allLoaded = true;
          this.noData = allPage === 0; // 判断是否有数据
        }

        // 下一页
        this.count++;
        this.loading = false;
      } catch (error) {
        this.allLoaded = true;
        this.loading = false;
        console.log('error', error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(myMessage) {
  background-color: #ededed;
  min-height: 100vh;
}

@include b(messageList) {
  padding: rem(30) rem(20) 0;
}
</style>

