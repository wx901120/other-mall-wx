<template>
  <div class="wx-bottomContent">
    <div class="wx-bottomContent__leftContent">
      <h3 class="wx-bottomContent__title">{{ activity.title }}</h3>
      <p class="wx-bottomContent__date">{{ activity.stime | dateStringFilter }} - {{ activity.etime | dateStringFilter }}</p>
    </div>
    <div class="wx-bottomContent__rightContent"
         :class="actStateClass">
      <span class="i-icon"></span>
      <span class="wx-bottomContent__text">{{ actState(activity.stime, activity.etime) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomContent',

  props: {
    activity: {
      type: Object,
    },
  },

  computed: {
    actStateClass() {
      const currentTime = new Date().getTime();
      const startTime = this.activity.stime * 1000;
      const endTime = this.activity.etime * 1000;
      if (currentTime < startTime) {
        return 'is-noHot';
      } else if (currentTime >= startTime && currentTime < endTime) {
        return 'is-hot';
      } else if (currentTime > endTime) {
        return 'is-noHot';
      }
      return '';
    },
  },

  methods: {
    actState(stime, etime) {
      const currentTime = new Date().getTime();
      const startTime = stime * 1000;
      const endTime = etime * 1000;
      if (currentTime < startTime) {
        return '活动未开始';
      } else if (currentTime >= startTime && currentTime < endTime) {
        return '活动进行中';
      } else if (currentTime > endTime) {
        return '活动已结束';
      }
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(bottomContent) {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: rem(10) rem(20) rem(10);
  width: 100%;
  height: rem(100);
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);

  @include e(leftContent) {
    width: rem(480);
    display: flex;
    flex-flow: row wrap;
    align-content: space-between;
  }

  @include e(rightContent) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: rem(220);
    font-size: rem(28);

    @include when(hot) {
      color: #f9be02;
      .i-icon {
        background-image: url("../../assets/image/icon-hot.png");
        width: rem(24);
        height: rem(34);
      }
    }

    @include when(noHot) {
      color: #bfbfbf;
      .i-icon {
        background-image: url("../../assets/image/icon-hot-gray.png");
        width: rem(24);
        height: rem(34);
      }
    }
  }

  @include e(title) {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: rem(32);
  }

  @include e(date) {
    font-size: rem(24);
  }

  @include e(text) {
    font-weight: bold;
    margin-left: rem(14);
  }
}
</style>


