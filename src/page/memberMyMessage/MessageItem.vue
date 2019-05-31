<template>
  <li class="wx-messageItem">
    <div class="wx-messageItem__left">
      <h3 class="wx-messageItem__title">{{ message.title }}</h3>
      <div class="wx-messageItem__content">{{ message.message }}
      </div>
      <div class="wx-messageItem__date">{{ message.intime }}</div>
    </div>
    <div class="wx-messageItem__right">
      <!-- <div class="img-wrap">
              <img src="./image/logistics.png"
                   alt="">
            </div> -->
    </div>
  </li>
</template>

<script>
export default {
  name: 'MessageItem',

  props: {
    message: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(messageItem) {
  display: flex;
  margin-bottom: rem(30);
  padding: rem(20);
  background-color: #fff;
  border: 1px solid #dddddd;

  @include e(left) {
  }

  @include e(title) {
    font-size: rem(30);
    color: #333333;
    font-weight: bold;
  }

  @include e(content) {
    margin-top: rem(10);
    font-size: rem(24);
    color: #666666;
  }

  @include e(date) {
    margin-top: rem(10);
    font-size: rem(24);
    color: #999999;
  }

  @include e(right) {
    display: flex;
    justify-content: center;
    align-items: center;
    // width: rem(150);
    flex-basis: rem(120);
  }

  @include e(imgWrap) {
    overflow: hidden;
    width: rem(72);
    height: rem(72);
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
