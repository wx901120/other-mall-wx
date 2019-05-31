<template>
  <li class="wx-activityItem">
    <a class="wx-activityItem__itemLink"
       href="javascript:;"
       @click="$router.push({ name: 'specialOffersDetail',  params: {'id': activityData.id}})">
      <img :src="activityData.imgPath" />
      <div class="wx-activityItem__actFooter">
        <div class="wx-activityItem__left actInfo">
          <p class="wx-activityItem__nTitle">{{ activityData.title }}</p>
          <p class="wx-activityItem__actDate">
            {{ activityData.stime | capitalizeDate }}-{{ activityData.etime | capitalizeDate }}
          </p>
        </div>
        <div class="wx-activityItem__right">
          <span class="i-icon i-icon-hot"
                v-if="actState(activityData.stime, activityData.etime) === '活动进行中'"></span>
          <span class="wx-activityItem__text">{{ actState(activityData.stime, activityData.etime) }}</span>
        </div>
      </div>
    </a>
  </li>
</template>

<script>
export default {
  name: 'ActivityItem',

  props: {
    activityData: {
      type: Object,
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
@include b(activityItem) {
  position: relative;

  &:nth-child(n + 2) {
    margin-top: rem(20);
  }

  @include e(itemLink) {
    /* TODO: 行内元素无法超出隐藏？ */
    display: block;
    overflow: hidden;
    height: rem(416);

    img {
      width: 100%;
    }
  }

  @include e(actFooter) {
    position: absolute; // top: 0;
    left: 0;
    bottom: 0px;
    padding: rem(10) rem(30);
    width: 100%;
    height: rem(100);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: rem(28);
    color: #fff;
  }

  @include e(right) {
    display: flex;
    align-items: center;
    font-size: rem(28);
    color: #f9be02;
    padding-left: rem(28);
    margin-top: 0.06667rem;
    font-weight: 700;
  }

  @include e(text) {
    margin-left: rem(14);
  }
}
</style>

