<template>
  <div class="wx-productChoose">
    <!-- Header -->
    <TheHeader title="选择你喜爱的产品类型"></TheHeader>

    <div class="wx-productChoose__content">
      <!-- Banner -->
      <Banner style="height: auto;">
        <img src="./image/banner.jpg"
             style="width: 100%"
             slot="bannerImg" />
      </Banner>

      <TagsPannel>
        <ITag :title="tag.title"
              v-for="tag in products"
              :key="tag.title"
              :checked="isCheckedTag(tag.title)"
              slot="tags"
              @click.native="checkTag(tag.title)"></ITag>

        <IButton size="large"
                 type="red"
                 slot="btn"
                 @click="submitProductType()">提交</IButton>
      </TagsPannel>
    </div>
  </div>
</template>

<script>
import {
  IHeader,
  Banner,
  IField,
  IButton,
  IRadio,
  ITag,
  TheHeader,
} from '@/components/index.js';
import TagsPannel from './TagsPannel';
import * as service from '@/api/service';

export default {
  name: 'memberProductChoose',

  components: {
    IHeader,
    Banner,
    IField,
    IButton,
    IRadio,
    ITag,
    TheHeader,
    TagsPannel,
  },

  data() {
    return {
      products: [],
      checkedTag: [],
    };
  },

  async created() {
    const data = await service.fansTags({});
    this.products = data.result.fansTag;
  },

  methods: {
    async submitProductType() {
      if (this.checkedTag.length === 0) {
        this.$Toast('请选择你喜爱的产品类型');
        return;
      }

      const data = await service.fansTags({
        tag: this.checkedTag.join(),
      });

      if (data.errCode === 0) {
        this.$MessageBox({
          title: '注册成功',
          message: '欢迎加入万科城市广场会员！看看我们为你条形的活动吧 <br/>有惊喜哦',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '去看看',
          cancelButtonText: '残忍拒绝',
        }).then(() => {
          this.$router.push({ name: 'memberCenter' });
        });
      }
    },

    checkTag(title) {
      for (let i = 0; i < this.checkedTag.length; i += 1) {
        if (this.checkedTag[i] === title) {
          this.checkedTag.splice(i, 1);
          return;
        }
      }
      this.checkedTag.push(title);
    },

    isCheckedTag(title) {
      for (let i = 0; i < this.checkedTag.length; i += 1) {
        if (this.checkedTag[i] === title) {
          return true;
        }
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(productChoose) {
  min-height: 100vh;
  background: #ededed;

  @include e(content) {
    padding: rem(20);
  }
}
</style>


