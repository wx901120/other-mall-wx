<template>
  <div class="wx-activity container">
    <div class="wx-activityHeaderWrap">
      <TheHeader fixed
                 type="backPlain"></TheHeader>

      <!-- Tab标题 -->
      <NavTitle>
        <div class="wx-actMenu"
             slot="title-name">
          <span :class="{ active:goSelect }"
                @click='goActivity()'>商圈活动</span>
          <span :class="{ active:!goSelect }"
                @click='goShopsActivity()'>商户活动</span>
        </div>
      </NavTitle>
    </div>

    <!-- Tab内容 -->
    <div class="wx-listWrap"
         ref="list"
         :style="{ height: listHeight + 'px', overflow: 'scroll'}">
      <ul v-show='!noData'
          class="activity-list page-loadmore-list page-lazyload-list">
        <ActivityItem v-for='activity in activityList'
                      :key="activity.id"
                      :activity="activity"
                      @click.native="$router.push({name: 'specialOffersDetail', params: {id: activity.id}})">
          <BottomContent :activity="activity"></BottomContent>
        </ActivityItem>
      </ul>
      <div class="no-data"
           v-show="noData">暂无活动</div>
    </div>
  </div>
</template>

<script>
import NavMall from '@/components/NavMall/index.vue';
import NavTitle from '@/components/NavTitle/index.vue';
import { TheHeader } from '@/components/index.js';
import ActivityItem from './ActivityItem';
import BottomContent from './BottomContent';
import * as service from '@/api/service';

export default {
  name: 'specialOffers',

  components: {
    NavMall,
    NavTitle,
    TheHeader,
    ActivityItem,
    BottomContent,
  },

  data() {
    return {
      listHeight: '',
      activityList: [],
      goSelect: true,
      noData: false,
    };
  },

  mounted() {
    this.$nextTick(() => {
      if (this.$route.params.type) {
        this.goSelect = false;
        this.goShopsActivity();
      } else {
        this.Activity();
      }

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

    async Activity() {
      try {
        // 请求数据
        const data = await service.getActivityIndex({});

        // 如果没有数据
        if (!data.result || !data.result.list) {
          this.activityList = [];
          this.noData = true;
          return;
        }

        // 如果有数据
        for (let i = 0; i < data.result.list.length; i += 1) {
          data.result.list[i].imgPath = `http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/article/${data.result.list[i].imgPath}`;

          const { etime } = data.result.list[i];
          const nowtime = Date.parse(new Date()) / 1000;

          if (etime < nowtime) {
            data.result.list[i].overTime = true;
          } else {
            data.result.list[i].overTime = false;
          }
        }

        // 添加数据
        this.noData = false;
        this.activityList = data.result.list;
      } catch (error) {
        console.log('error', error);
        this.activityList = [];
        this.noData = true;
      }
    },

    async shopsActivity() {
      try {
        // 请求数据
        const data = await service.shopsActivity({});

        // 如果没有数据
        if (!data.result || !data.result.list) {
          this.activityList = [];
          this.noData = true;
          return;
        }

        // 如果有数据
        for (let i = 0; i < data.result.list.length; i += 1) {
          data.result.list[i].imgPath =
            `http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/article/${
              data.result.list[i].imgPath}`;

          const { etime } = data.result.list[i];
          const nowtime = Date.parse(new Date()) / 1000;

          if (etime < nowtime) {
            data.result.list[i].overTime = true;
          } else {
            data.result.list[i].overTime = false;
          }
        }

        // 添加数据
        this.noData = false;
        this.activityList = data.result.list;
      } catch (error) {
        console.log('error', error);
        this.activityList = [];
        this.noData = true;
      }
    },

    goActivity() {
      this.goSelect = true;
      this.Activity();
    },

    goShopsActivity() {
      this.goSelect = false;
      this.shopsActivity();
    },

    goRouter(id, cid) {
      this.$router.push({ name: 'ActivityInfo', params: { id, cid } });
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(activity) {
  min-height: 100vh;
}

@include b(activityHeaderWrap) {
  background: #fff;
}

@include b(activityList) {
  font-size: 0;
}

@include b(actMenu) {
  display: flex;
  padding: 0 rem(122);
  width: 100%;
  height: 100%;
  background-color: #fff; // position: fixed;
  top: 0;
  left: 0;
  // z-index: 96;
  color: #000;
  span {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
    font-size: rem(32);
    text-align: center;
    &.active {
      font-weight: bold;
      color: #d6024c;
    }
    &.active:after {
      content: " ";
      position: absolute;
      top: auto;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      width: rem(136);
      height: rem(4);
      background-color: #d6024c;
    }
  }
}
</style>
