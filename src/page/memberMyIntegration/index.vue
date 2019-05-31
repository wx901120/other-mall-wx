<template>
  <div class="wx-myIntegration">
    <TheHeader title="我的积分"></TheHeader>

    <!-- 会员信息 -->
    <MemberInfo :memberCenterData="memberCenterData"></MemberInfo>

    <!-- 兑换记录-->
    <Records>
      <!-- <i-navbar class="page-part"
                v-model="selected">
        <i-tab-item id="1"
                    @click.native="resetData('1')">收入</i-tab-item>
        <i-tab-item id="2"
                    @click.native="resetData('2')">支出</i-tab-item>
      </i-navbar> -->
      <div class="wx-tabHeader__content">
        <span class="wx-tabHeader__item"
              :class="{'is-checked' : typeSel === 1}"
              @click="resetData(1)">收入</span>
        <span class="wx-tabHeader__item"
              :class="{'is-checked': typeSel === 2}"
              @click="resetData(2)">支出</span>
      </div>

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
  TheHeader
} from "@/components/index.js";
import MemberInfo from "./MemberInfo";
import Records from "./Records";
import TabHeader from "./TabHeader";
import RecordsItem from "./RecordsItem";
import TotalNum from "./TotalNum";
import * as service from "@/api/service";
import loadMore from "@/mixins/loadMore.js";
import memberCenterMixin from "@/mixins/memberCenter";

export default {
  name: "memberMyIntegration",

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
    TotalNum
  },

  data() {
    return {
      flag: "",
      exchangeNum: 0,
      selected: "1",
      recordList: [],
      timer: null,
      typeSel: 1,

    };
  },

  mixins: [loadMore, memberCenterMixin],

  created() {
    this.getMemberCenterData();
    this.$nextTick(() => {
      const { clientHeight } = document.documentElement;
      const { top } = this.$refs.list.getBoundingClientRect();
      this.listHeight = clientHeight - top;
    });
  },

  methods: {
    // resetData(selected) {
    //   this.selected = selected;
    //   this.allLoaded = false;
    //   this.loading = false;
    //   this.count = 1;
    //   this.infiniteScrollTips = "加载中...";
    //   this.exchangeNum = 0;
    //   this.recordList = []; // 兑换记录
    //   this.loadMore();
    // },

    async loadMore(typeSel = 1) {
      if (this.allLoaded || this.loading) {
        return;
      }
      // 1:收入, 2:支出
      // const type = this.typeSel === 1 ? 1 : 2;

      try {
        // 阻塞
        this.loading = true;

        // 请求数据
        const data = await service.memberIntegral({
          type: this.type || 1,
          curPos: this.count
        });

        // 切换到其他tab以及首次加载、couponList却有数据则返回不执行后续代码
        if (
          typeSel !== this.typeSel ||
          (this.count === 1 && this.recordList.length > 0)
        ) {
          return;
        }
        const { allPage } = data.result;

        // 添加数据
        this.exchangeNum = data.result.allCount;

        if (data.result.list) {
          this.recordList.push(...data.result.list);
          this.noData = false;
        }

        // 加载完毕, 初始化this.count = 1;
        if (this.count >= allPage) {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
          this.infiniteScrollTips = "数据加载完毕";
          this.allLoaded = true;
          this.noData = allPage === 0; // 判断是否有数据
          return;
        }

        // 下一页
        this.count++;

        // 释放
        this.loading = false;
      } catch (error) {
        console.log("error", error);
        this.allLoaded = true;
        this.loading = false;
      }
    },
    async resetData(typeSel) {
      if (this.typeSel === typeSel) {
        return;
      }
      this.noData = false;
      this.typeSel = typeSel;
      this.count = 1;
      this.recordList = [];
      this.allLoaded = false;
      this.loading = false;
      this.infiniteScrollTips = "加载中...";

      if (typeSel === 1) {
        this.type = 1;
        this.flag = "";
      } else if (typeSel === 2) {
        this.type = 2;
        this.flag = 1;
      }
      this.loadMore(typeSel);
    }
  }
};
</script>

<style lang="scss" scoped>
@include b(myIntegration) {
  height: 100vh;
}
.wx-tabHeader__content {
  display: flex;
}
.wx-tabHeader__item {
  display: block;
  padding: 7px 0;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  text-align: center;
  text-decoration: none;
  color: #fff;
  background-color: #dddddd;
}
.wx-tabHeader__item.is-checked::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: auto;
  right: 0;
  bottom: -0.45333rem;
  left: 0;
  margin: auto;
  width: 0;
  height: 0;
  z-index: 9999;
  border: 0.26667rem solid transparent;
  border-top-color: #d6024c;
}
.is-checked {
  background-color: #d6024c;
  position: relative;
}
</style>
