<template>
  <div class="nav">
    <span class="nav-btn" @click="showMenu()"></span>

    <div class="pageList" v-show='menuShow' id="menu-list" ref="wrapper" v-bind:style="{ height: wrapperHeight + 500 + 'px'}" @click='close()'>
      <div class="menu-list clearfix" :class="{ bounceInDown: menuShow }">
        <ul>
          <li :class='{ active: 0 == sel }'>
            <a href="javascript:;" @click="goRouter('Home')">
              <img src="./image/home.png" />
              <p>首页</p>
            </a>
          </li>
          <li :class='{ active: 1 == sel }'>
            <a href="javascript:;" @click="scan()">
              <img src="./image/dpIcon.png" />
              <p>商城简介</p>
            </a>
          </li>
          <li :class='{ active: 2 == sel }'>
            <a href="javascript:;" @click="goRouter('Activity')">
              <img src="./image/hdIcon.png" />
              <p>活动</p>
            </a>
          </li>
          <li :class='{ active: 3 == sel }'>
            <div :class='{ active: 0 == sel }' @click="scan()">
              <img src="./image/user.png" />
              <p>会员中心</p>
            </div>
          </li>
          <li :class='{ active: 4 == sel }'>
            <a href="javascript:;" @click="goRouter('About')">
              <img src="./image/about.png" />
              <p>关于我们</p>
            </a>
          </li>
          <li :class='{ active: 5 == sel }'>
            <a href="javascript:;" @click="scan()">
              <img src="./image/feedback.png" />
              <p>会员信箱</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox, Indicator } from "mint-ui";
import * as service from "@/api/service";
export default {
  name: "navMall",
  data() {
    return {
      menuShow: false,
      menuName: "",
      sel: -1,
      stopUse: true,
      wrapperHeight: ""
    };
  },
  mounted() {
    this.wrapperHeight = document.documentElement.clientHeight;
  },
  methods: {
    showMenu() {
      this.menuShow = true;
      this.sel = -1;
      window.ontouchmove = function() {
        return false;
      };
      // window.onorientationchange = function() { document.body.scrollTop = 0; }
    },
    goRouter(url) {
      this.$router.push({ name: url });
    },
    close() {
      this.menuShow = false;
      window.ontouchmove = function() {
        return true;
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/style/mixin.scss";
.nav {
  font-size: rem(28);
  color: #000;
}
.nav-btn {
  position: absolute;
  top: 0;
  right: rem(10);
  bottom: 0;
  left: auto;
  margin: auto;
  width: rem(48);
  height: rem(48);
  background-image: url("./image/nav.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: rem(36) rem(36);
}

.pageList {
  width: 100%;
  height: 100%;
  position: fixed;
  top: rem(172);
  left: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.2);
}

.menu-list {
  //padding: 48px rem(20);
  width: 100%;
  position: absolute;
  top: 40px;
  z-index: 999;
}

#menu-list {
  top: 0;
  z-index: 9999;
}

#menu-list img {
  width: 30px;
  vertical-align: middle;
}

#menu-list li {
  padding: rem(20) 0 rem(30);
  height: rem(145);
}

#menu-list li:nth-child(2) i {
  font-size: 20px;
  margin-bottom: 4px;
}

#menu-list li p {
  margin-top: rem(5);
}

.menu-list li {
  float: left;
  width: 33.33%;
  text-align: center;
  height: rem(120);
  padding-top: rem(5);
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #fff;
}

.menu-list li:nth-child(3n + 2) {
  border-bottom: 2px solid #ededed !important;
  border-left: 1px solid #ededed !important;
  border-right: 1px solid #ededed !important;
}

.menu-list li:nth-child(3n + 3),
.menu-list li:nth-child(3n + 1) {
  border-bottom: 2px solid #ededed !important;
}

/* 
  壹方天地
 */
.yftd {
  .nav-btn {
    background-image: url("./image/yftd/nav.png");
  }
}
</style>


