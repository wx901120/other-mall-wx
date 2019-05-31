<template>
  <li class="wx-associationItem"
      :style="{'background-image': `url(${activity.imgPath})`}">
    <slot></slot>
    <!-- <div class="expired"
         v-if="isExpired(activity)"></div> -->
  </li>
</template>

<script>
export default {
  name: 'ActivityItem',

  props: {
    activity: {
      type: Object,
    },
  },

  methods: {
    isExpired(activity) {
      const nowTime = new Date().getTime();
      if (nowTime > window.parseInt(activity.etime) * 1000) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(associationItem) {
  position: relative;
  font-size: 0;
  overflow: hidden;
  position: relative;
  height: rem(420);
  background-size: 100% auto;
  display: flex;
  justify-content: center;
  align-items: center;
  &:nth-child(n + 2) {
    margin-top: rem(20);
  }
}
</style>


