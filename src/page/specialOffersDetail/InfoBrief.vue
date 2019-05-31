<template>
  <!-- 活动详情标题日期 -->
  <div class="wx-infoBrief bg-white">
    <h3 class="wx-infoBrief__infoMain">
      <span class="wx-infoBrief__title">{{ activityInfo.title }}</span>
      <span class="wx-infoBrief__slogan">{{ activityInfo.nTitle }}</span>
    </h3>
    <div class="wx-infoBrief__infoDetail">
      <div class="wx-infoBrief__address" v-if="activityInfo.address">
        <span class="wx-infoBrief__content">{{ activityInfo.address }}</span>
      </div>
      <div class="info-date">
        <span class="wx-infoBrief__label">时间：</span>
        <span class="wx-infoBrief__content">{{ activityInfo.stime | dateStringFilterDot }}-{{ activityInfo.etime | dateStringFilterDot }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoBrief',

  props: {
    activityInfo: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(infoBrief) {
  padding: rem(30) rem(20);

  @include e(infoMain) {
    font-size: rem(32);
    font-weight: 550;
    margin-bottom: rem(16);
  }

  @include e(content) {
    color: #a8a8a8;
      margin-left: rem(12);
  }

  @include e(address) {
    
  }
}
</style>
