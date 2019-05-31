<template>
  <!-- 综合导航 -->
  <div class="nav-wrap">
    <div class="back"
         @click="back()"></div>

    <h3 class="head-title color-theme">
      <slot name="head-title"></slot>
    </h3>

    <slot name="input-search-wrap"></slot>

    <div style="opacity: 0;" class="nav-btn"></div>

    <div class="nav-mall"
         v-show="displayMenu">
      <div class="masking"
           @click="showMenu()"></div>
      <div class="nav-block"
           :class="{'bounceInDown': displayMenu}">
        <div class="nav-item"
             @click="$router.push({name: 'home'}); displayMenu=false;">
          <div class="icon index"></div>
          <div class="title">首页</div>
        </div>
        <div class="nav-item"
             @click="$router.push({name: 'mallIntro'}); displayMenu=false;">
          <div class="icon mall-intro"></div>
          <div class="title">商城简介</div>
        </div>
        <div class="nav-item"
             @click="$router.push({name: 'preferentialInfo'}); displayMenu=false;">
          <div class="icon activity"></div>
          <div class="title">活动</div>
        </div>
        <div class="nav-item"
             @click="$router.push({name: 'developing'}); displayMenu=false;">
          <div class="icon member-center"></div>
          <div class="title">会员中心</div>
        </div>
        <div class="nav-item"
             @click="$router.push({name: 'developing'}); displayMenu=false;">
          <div class="icon about-us"></div>
          <div class="title">关于我们</div>
        </div>
        <div class="nav-item"
             @click="$router.push({name: 'developing'}); displayMenu=false;">
          <div class="icon member-emailbox"></div>
          <div class="title">会员信箱</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "headMall",
  data() {
    return {
      displayMenu: false
    };
  },
  components: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    showMenu() {
      this.displayMenu = !this.displayMenu;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/style/mixin.scss";

.nav-wrap {
  display: flex;
  justify-content: space-between;
  height: rem(90);
  background-color: #fff;
  .back,
  .nav-btn {
    width: rem(90);
    height: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    // pointer-events: auto;
  }
  .back {
    // background-image: url("./image/back.png");
    // background-size: rem(20) rem(37);
  }
  .nav-btn {
    // width: rem(110);
    // height: rem(110);
    background-image: url("./image/nav.png");
    background-size: rem(38) rem(38);
  }
}

.head-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: rem(32);
  line-height: 1;
}

.input-search-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: rem(660);
  height: 100%;
  font-size: 0;
  .input-search {
    display: flex;
    align-items: center;
    border: 1px solid #ededef;
    // padding-left: rem(94);
    width: 100%;
    height: rem(58);
    font-size: rem(26);
    color: #999999;
    background-color: #f4f4f4;
    border-radius: rem(10);
    text-align: center;
  }
}

.nav-mall {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 200;
  .masking {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: -1;
    // pointer-events: auto;

    animation: fade 0.5s;
    animation-fill-mode: forwards;
  }
}

.nav-block {
  position: absolute;
  top: rem(90);
  font-size: rem(28);
  // padding: rem(10) 0;
  width: rem(750);
  height: rem(250);
  display: flex;
  flex-flow: row wrap;
  background-color: #fff;
  z-index: 100;
  // pointer-events: auto;
  .nav-item {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    padding-top: rem(20);
    width: 33.33%;
    // height: rem(10);
    text-align: center;
    border-bottom: rem(2) solid #ededed;
    border-right: rem(2) solid #ededed;
    &:nth-child(n + 4) {
      border-bottom: none;
      // border: rem(2) solid #ededed;
    }
    &:nth-child(3n) {
      border-right: none;
    }
    .icon {
      width: rem(40);
      height: rem(40);
      background-repeat: no-repeat;
      background-position: center center;
    }
    .title {
      width: 100%;
    }
    .index {
      background-image: url("./image/home.png");
      background-size: rem(48) rem(48);
    }
    .mall-intro {
      background-image: url("./image/dpIcon.png");
      background-size: rem(48) rem(48);
    }
    .activity {
      background-image: url("./image/hdIcon.png");
      background-size: rem(48) rem(48);
    }
    .member-center {
      background-image: url("./image/user.png");
      background-size: rem(48) rem(48);
    }
    .about-us {
      background-image: url("./image/about.png");
      background-size: rem(48) rem(48);
    }
    .member-emailbox {
      background-image: url("./image/feedback.png");
      background-size: rem(48) rem(48);
    }
  }
}

// 固定布局
.layout-fixed {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: rem(90);
  z-index: 400;
  // pointer-events: none;
}

.background-white {
  background-color: #fff;
}

// 导航-白色风格
.nav-white {
  .back {
    background-image: url("./image/icon_back-white.png");
    background-size: rem(22) rem(40);
  }
  .nav-btn {
    background-image: url("./image/icon_menu-white.png");
    background-size: rem(40) rem(40);
  }
}

.bounceInDown {
  animation: bounceInDown 0.5s ease;
}

@keyframes navSport {
  0% {
    top: 0;
  }
  100% {
    top: rem(100);
  }
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes bounceInDown {
  0%,
  100%,
  60%,
  75%,
  90% {
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: translate3d(0, -3000px, 0);
  }

  60% {
    opacity: 1;
    transform: translate3d(0, 25px, 0);
  }

  75% {
    transform: translate3d(0, -10px, 0);
  }

  90% {
    transform: translate3d(0, 5px, 0);
  }

  100% {
    transform: none;
  }
}

.bg-white {
  background-color: #fff;
}
</style>
