<template>
  <div class="model wx-detail">
    <h3 class="model-title">详情</h3>
    <div class="wx-detail__content"
         v-html="activityData.info.nContent">
    </div>
    <div class="wx-detail__row">
      <div class="wx-detail__leftTitle">参与人数</div>
      <div class="wx-detail__rightContent">{{ activityData.info.peopleNumber }}</div>
    </div>
    <!-- <div class="wx-detail__row">
      <div class="wx-detail__leftTitle">活动地点</div>
      <div class="wx-detail__rightContent">{{ activityData.info.address }}</div>
    </div> -->
    <div class="wx-detail__row">
      <div class="wx-detail__leftTitle">报名热线</div>
      <div class="wx-detail__rightContent">{{ activityData.info.hotLine }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModelDetail',

  props: {
    activityData: {
      type: Object,
    },
  },
};
</script>

<style lang="scss">
@include b(detail) {
  background-color: #fff;
  padding: rem(26) rem(20) rem(46);

  @include e(content) {
    margin-top: rem(28);
    font-size: rem(28);
    color: #a8a8a8;
    img {
      width: 100%;
    }
  }

  @include e(row) {
    display: flex;
    align-items: center;
    // justify-content: space-between;
    margin-top: rem(28);
    font-size: rem(26);
  }

  @include e(leftTitle) {
    font-size: rem(28);
    font-weight: bold;
    color: #747474;
  }

  @include e(rightContent) {
    // margin-left: rem(26);
    margin-left: rem(20);
    color: #a8a8a8;
  }
}
</style>


