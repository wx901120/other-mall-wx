<template>
  <div class="member-info">
    <div class="member-info-item portrait">
      <div class="member-info-item-top">
        <img :src="memberCenterData.picPath"
             alt="">
      </div>
      <div class="member-info-item-bottom">
        {{ memberCenterData.userName }}
      </div>
    </div>
    <div class="member-info-item degree">
      <div class="member-info-item-top">
        {{ memberCenterData.cardLeveName }}
      </div>
      <div class="member-info-item-bottom">
        会员等级
      </div>
    </div>
    <div class="member-info-item mypoint">
      <div class="member-info-item-top">
        {{ memberCenterData.integral }}
      </div>
      <div class="member-info-item-bottom">
        我的积分
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemberInfo',

  props: {
    memberCenterData: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/style/mixin.scss";

.member-info {
  background-color: #fff;
  display: flex;
  margin-top: rem(20);
  align-items: center;
  height: rem(140);
  .member-info-item {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    width: 33.33%;
    &:nth-child(2) {
      border: 1px solid #dcdcdc;
      border-top: none;
      border-bottom: none;
    }
    &-top {
      display: flex;
      align-items: center;
      justify-content: center;
      height: rem(70);
      font-size: rem(32);
      color: #f19903;
    }
    &-bottom {
      width: 100%;
      font-size: rem(28);
      color: #000000;
      text-align: center;
    }
  }
  .portrait {
    .member-info-item-top {
      overflow: hidden;
      border-radius: 50%;
      img {
        width: rem(70);
      }
    }
  }
}
</style>

