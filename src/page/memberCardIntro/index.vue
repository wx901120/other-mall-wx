<template>
  <div class="wx-memberCardIntro">
    <TheHeader title="会员卡说明"
               fixed></TheHeader>

    <div ref="list"
         :style="{ height: listHeight + 'px', overflow: 'scroll'}">
      <CardList>
        <CardItem v-for="(item, index) in menberCardList"
                  :key="index"
                  :isShow="index === checkedIndex"
                  :item="item"
                  @click.native="onExpand(index)"></CardItem>
      </CardList>
    </div>
  </div>
</template>

<script>
import CardItem from './CardItem';
import CardList from './CardList';
import * as service from '@/api/service';

export default {
  name: 'memberCardIntro',

  components: {
    CardItem,
    CardList,
  },

  data() {
    return {
      listHeight: 0,
      isShow: false,
      checkedIndex: -1,
      menberCardList: [],
    };
  },

  created() {
    this.getList();

    this.$nextTick(() => {
      this.listHeight = document.documentElement.clientHeight - this.$refs.list.getBoundingClientRect().top;
    });
  },

  methods: {
    onExpand(index) {
      if (this.checkedIndex === index) {
        this.checkedIndex = -1;
        return;
      }
      this.checkedIndex = index;
    },

    async getList() {
      const data = await service.memberCardInfo({});

      if (data.result.list.length > 0) {
        this.menberCardShow = false;
        for (let i = 0; i < data.result.list.length; i++) {
          data.result.list[i].idx = i;
          data.result.list[i].cardLongImg = `http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/article/${data.result.list[i].cardLongImg}`;
          data.result.list[i].cardImg = `http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/article/${data.result.list[i].cardImg}`;
        }
        this.menberCardList = data.result.list;
      } else {
        this.menberCardShow = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(memberCardIntro) {
  min-height: 100vh;
  // padding-top: rem(90);
  background-color: #fff;
  border-top: rem(110) solid #e5e5e5;
}
</style>
