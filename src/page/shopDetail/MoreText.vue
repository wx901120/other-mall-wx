<template>
  <div class="wx-moreText">
    <div class="wx-moreText__textContent"
         :class="{ 'is-showText': isExpand }"
         ref="textContent">
      {{ moreText }}
      <!-- 12323234324dsaf第三方 -->
    </div>
    <div class="wx-moreText__expandBtn"
         :class="{ 'is-showBtn': expandBtnShow }"
         @click="expandText()"></div>
  </div>
</template>

<script>
export default {
  name: 'MoreText',

  props: {
    moreText: {
      type: String,
    },
  },

  data() {
    return {
      isExpand: false,
      expandBtnShow: false,
    };
  },

  created() {
    this.$nextTick(() => {
      const outerHeight = this.$refs.textContent.getBoundingClientRect().height;
      const { scrollHeight } = this.$refs.textContent;
      console.log('outerHeight', outerHeight);
      console.log('scrollHeight', scrollHeight);
      if (scrollHeight > outerHeight) {
        this.expandBtnShow = true;
      }
    });
  },

  methods: {
    expandText() {
      this.isExpand = true;
      this.expandBtnShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(moreText) {
  @include e(textContent) {
    display: -webkit-box;
    overflow: hidden;
    white-space: normal !important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-height: rem(32);
    @include when(showText) {
      display: block;
    }
  }

  @include e(expandBtn) {
    height: rem(68);

    @include when(showBtn) {
      background: url("./image/icon-expand.png");
      background-size: rem(28) rem(20);
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
}
</style>


