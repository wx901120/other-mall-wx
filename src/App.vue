<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="scss">
@import "src/assets/style/mixin.scss";
#app {
  -webkit-overflow-scrolling: touch;
}

.btn-gray {
  position: fixed;
  left: 0; 
  bottom: 0;
  width: 100%;
  font-size: 0.42667rem;
  color: #fff;
  line-height: 1.06667rem;
  text-align: center;
}

.icon {
  /* 通过设置 font-size 来改变图标大小 */
  width: 1em;
  height: 1em;
  /* 图标和文字相邻时，垂直对齐 */
  vertical-align: -0.15em;
  /* 通过设置 color 来改变 SVG 的颜色/fill */
  fill: currentColor;
  /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示
             normalize.css 中也包含这行 */
  overflow: hidden;
}

// .fade-enter-active, .fade-leave-active {
//   transition: opacity .2s
// }
// .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
//   opacity: 0
// }

// 图片懒加载，需要 1.给需要懒加载的图片加.page-lazyload-image类；2.在img标签中用v-lazy代替src
.page-lazyload-image[lazy="loading"] {
  width: 100%;
  height: 100%;
  margin: auto;
  background: url("./assets/image/lazy.gif");
  background-size: rem(32) rem(32);
  background-position: center center;
  background-repeat: no-repeat;
  background-color: #fff;
}

/* 无限加载 */
.page-infinite-loading {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  height: rem(100);
  margin: rem(10) 0;
  text-align: center;
  font-size: rem(30);
  .loading-tips {
    display: block;
    width: 100%;
  }
}

// 默认字体大小
#app {
  font-size: rem(24);
  background-color: #ededed;
}

// 主题色
.background-theme {
  background-color: #d6024c;
}
.color-theme {
  color: #ff5152;
}

.bg-white {
  background-color: #fff;
}
// icon

.icon,
.logo {
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: rem(100);
  height: rem(100);
}
.logo {
  background-image: url("./assets/image/logo.png");
  // background-size: rem(105) rem(57);
  background-size: cover;
}
.i-icon {
  display: inline-block;
  background-size: cover;
  // margin-right: rem(20);
}
.i-icon-hot {
  background: url("./assets/image/icon-hot.png") no-repeat;
  width: rem(24);
  height: rem(34);
  background-size: cover;
}
.i-icon-hotGray {
  background: url("./assets/image/icon-hot-gray.png") no-repeat;
  width: rem(24);
  height: rem(34);
  background-size: cover;
}
.i-icon-activity {
  background-image: url("./assets/image/icon-activity.png");
  width: rem(36);
  height: rem(33);
}
.i-icon-bag {
  background-image: url("./assets/image/icon-bag.png");
  width: rem(48);
  height: rem(48);
}
.i-icon-card {
  background-image: url("./assets/image/icon-card.png");
  width: rem(31);
  height: rem(24);
}
.i-icon-choiceness {
  background-image: url("./assets/image/icon-choiceness.png");
  width: rem(36);
  height: rem(34);
}
.i-icon-coupon {
  background-image: url("./assets/image/icon-coupon.png");
  width: rem(34);
  height: rem(22);
}
.i-icon-diamond {
  background-image: url("./assets/image/icon-diamond.png");
  width: rem(32);
  height: rem(28);
}
.i-icon-feedback {
  background-image: url("./assets/image/icon-feedback.png");
  width: rem(29);
  height: rem(30);
}
.i-icon-food {
  background-image: url("./assets/image/icon-food.png");
  width: rem(28);
  height: rem(36);
}
.i-icon-integration {
  background-image: url("./assets/image/icon-integration.png");
  width: rem(48);
  height: rem(48);
}
.i-icon-go {
  background-image: url("./assets/image/icon-go.png");
  width: rem(32);
  height: rem(31);
}
.i-icon-intro {
  background-image: url("./assets/image/icon-intro.png");
  width: rem(31);
  height: rem(31);
}
.i-icon-message {
  background-image: url("./assets/image/icon-message.png");
  width: rem(32);
  height: rem(30);
}
.i-icon-nav {
  background-image: url("./assets/image/icon-nav.png");
  width: 18px;
  height: 13px;
}
.i-icon-person {
  background-image: url("./assets/image/icon-person.png");
  width: rem(32);
  height: rem(36);
}
.i-icon-record {
  background-image: url("./assets/image/icon-record.png");
  width: rem(48);
  height: rem(48);
}
.i-icon-shops {
  background-image: url("./assets/image/icon-shops.png");
  width: rem(35);
  height: rem(36);
}
.i-icon-sign {
  background-image: url("./assets/image/icon-sign.png");
  width: rem(24);
  height: rem(24);
}
.i-icon-v {
  background-image: url("./assets/image/icon-v.png");
  width: rem(48);
  height: rem(48);
}
.i-icon-writer {
  background-image: url("./assets/image/icon-writer.png");
  width: rem(31);
  height: rem(29);
}
.i-icon-back {
  border: solid 1px #3a3a48;
  border-bottom-width: 0;
  border-left-width: 0;
  content: " ";
  width: 12px;
  height: 12px;
  transform: rotate(-135deg);
}
.i-icon-book {
  background-image: url("./assets/image/icon-book.png");
  width: rem(32);
  height: rem(37);
}
.i-icon-magnifying-glass {
  background-image: url("./assets/image/icon-magnifying-glass.png");
  width: rem(35);
  height: rem(35);
}
.i-icon-photo {
  background-image: url("./assets/image/icon-photo.png");
  width: rem(41);
  height: rem(33);
}
.i-icon-scan {
  background-image: url("./assets/image/icon-scan.png");
  width: rem(36);
  height: rem(32);
}
.i-icon-shop {
  background-image: url("./assets/image/icon-home-shop.png");
  width: rem(35);
  height: rem(36);
}
.i-icon-gift {
  background-image: url("./assets/image/icon-home-gift.png");
  width: rem(36);
  height: rem(32);
}
.i-icon-person {
  background-image: url("./assets/image/icon-home-person.png");
  width: rem(32);
  height: rem(36);
}
.i-icon-association {
  background-image: url("./assets/image/icon-association.png");
  width: rem(36);
  height: rem(36);
}
.i-icon-park-records {
  background-image: url('./assets/image/icon-park-records.png');
  width: rem(30);
  height: rem(33);
}
.i-icon-park-reservation {
  background-image: url('./assets/image/icon-park-reservation.png');
  width: rem(33);
  height: rem(32);
}
.i-icon-park-gold {
  background-image: url('./assets/image/icon-park-gold.png');
  width: rem(38);
  height: rem(38);
}
.i-icon-park-weixin {
  background-image: url('./assets/image/icon-park-weixin.png');
  width: rem(39);
  height: rem(33);
}
.i-icon-park-checked {
  background-image: url('./assets/image/icon-park-checked.png');
  width: rem(36);
  height: rem(36);
}
.i-icon-park-unchecked {
  background-image: url('./assets/image/icon-park-uncheck.png');
  width: rem(33);
  height: rem(33);
}
.i-icon-park-timer {
  background-image: url('./assets/image/icon-park-timer.png');
  width: rem(35);
  height: rem(36);
}
.i-icon-park-timer2 {
  background-image: url('./assets/image/icon-park-timer1.png');
  width: rem(34);
  height: rem(39);
}
.i-icon-park-card {
  background-image: url('./assets/image/icon-park-card.png');
  width: rem(35);
  height: rem(27);
}
.i-icon-park-address {
  background-image: url('./assets/image/icon-park-address.png');
  width: rem(28);
  height: rem(36);
}
.i-icon-park-tips {
  background-image: url('./assets/image/icon-park-tips.png');
  width: rem(30);
  height: rem(30);
}
.i-icon-parking {
  background-image: url('./assets/image/icon-parking.png');
  width: rem(36);
  height: rem(36);
}
.i-icon-exchange {
  background-image: url('./assets/image/icon-exchange.png');
  width: rem(36);
  height: rem(36);
}
.i-icon-customerService {
  background-image: url('./assets/image/icon-customerService.png');
  width: rem(32);
  height: rem(31);
}

.no-data {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: rem(30);
}

.ajax-data {
  img {
    width: 100%;
  }
}

.decorator {
  height: rem(20);
  background-color: #ededed;
}

/* 覆盖mint-ui */
.mint-indicator {
  position: relative;
  z-index: 9999;
}
</style>
