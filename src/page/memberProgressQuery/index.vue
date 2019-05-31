<template>
  <div class="wx-progressQuery">
    <TheHeader title="查询进度"></TheHeader>

    <div ref="list"
         :style="{ height: listHeight + 'px', overflow: 'scroll'}">
      <OrderList>
        <OrderItem v-for="(order, index) in orderList"
                   :key="index"
                   :order="order"></OrderItem>
      </OrderList>
    </div>
  </div>
</template>

<script>
import OrderList from './OrderList';
import OrderItem from './OrderItem';
import * as service from '@/api/service';

export default {
  name: 'memberProgressQuery',

  components: {
    OrderList,
    OrderItem,
  },

  data() {
    return {
      listHeight: 0,
      orderList: [],
    };
  },

  created() {
    this.getData();

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
    async getData() {
      try {
        // 请求数据
        const data = await service.integralList({});

        // 添加数据
        this.orderList = data.result.data;
      } catch (error) {
        console.log('error', error);
      }
    },
  },
};
</script>


<style lang="scss" scoped>
@include b(progressQuery) {
  // padding: 0 0 rem(20);
  min-height: 100vh;
}
</style>
