<template>
  <div
    class="i-sidebar-menu"
    @touchstart="startDrag"
    @touchmove="onDrag"
    @touchend="endDrag"
    ref="wrap">

    <div class="masking" v-show="leftState"></div>
    <div
      class="sidebar-menu-list"
      :class="menuClass"
      id="sidebarMenu"
      ref="left"
      v-clickoutside:touchstart="swipeMove" >
      <slot name="slidebarContent"></slot>
    </div>
  </div>
</template>

<script>
import { once } from '@/components/utils/dom';
import ICell from '@/components/i-cell/index.vue';
import Clickoutside from '@/components/utils/clickoutside';

export default {
  props: [
    'showSideMenu',
  ],
  data() {
    return {
      menuShow: false,
      start: { x: 0, y: 0 },
      leftState: false,
    };
  },
  computed: {
    menuClass() {
      if (this.menuShow) {
        return 'show';
      }
      return 'hidden';
    },
  },
  mounted() {
    this.wrap = this.$refs.wrap;
    this.leftWrapElm = this.$refs.left;
    this.leftWidth = this.leftWrapElm.getBoundingClientRect().width;
  },
  watch: {
    leftState(newVal) {
      console.log('leftState:', newVal);
    },
  },
  methods: {
    // 手动开关侧边栏
    operateMenu() {
      this.swipeMove(this.leftWidth);
      this.resetSwipeStatus();
    },

    resetSwipeStatus() {
      this.swiping = false;
      this.opened = true;
      this.offsetLeft = 0;
    },

    translate3d(offset) {
      return `translate3d(${offset}px, 0, 0)`;
    },

    setAnimations(val) {
      this.wrap.style.transitionDuration = val;
      // this.rightWrapElm.style.transitionDuration = val;
      this.leftWrapElm.style.transitionDuration = val;
    },

    swipeMove(offset = 0) {
      // this.wrap.style.webkitTransform = this.translate3d(offset);
      // this.rightWrapElm.style.webkitTransform = this.translate3d(
      //   this.rightWidth + offset
      // );
      this.leftWrapElm.style.webkitTransform = this.translate3d(-this.leftWidth + offset);

      if ((-this.leftWidth + offset) <= -234) {
        this.leftState = false;
      } else {
        this.leftState = true;
      }
      offset && (this.swiping = true);
    },

    swipeLeaveTransition(direction) {
      setTimeout(() => {
        this.swipeLeave = true;

        // left
        if (direction > 0 && -this.offsetLeft > this.rightWidth * 0.4) {
          this.swipeMove(-this.rightWidth);
          this.resetSwipeStatus();
          console.log('left');
          return;
          // right
        } else if (direction < 0 && this.offsetLeft > this.leftWidth * 0.4) {
          this.swipeMove(this.leftWidth);
          this.resetSwipeStatus();
          this.leftState = 1;
          console.log('right');
          return;
        }

        console.log('end');
        this.swipeMove(0);
        this.leftState = -1;
        once(this.wrap, 'webkitTransitionEnd', (_) => {
          // console.log('end');
          this.wrap.style.webkitTransform = '';
          // this.rightWrapElm.style.webkitTransform = this.rightDefaultTransform;
          this.leftWrapElm.style.webkitTransform = this.leftDefaultTransform;
          this.swipeLeave = false;
          this.swiping = false;
        });
      }, 0);
    },

    startDrag(evt) {
      evt = evt.changedTouches ? evt.changedTouches[0] : evt;
      this.dragging = true;
      this.start.x = evt.pageX;
      this.start.y = evt.pageY;
      this.direction = '';
    },

    onDrag(evt) {
      if (this.opened) {
        if (!this.swiping) {
          this.swipeMove(0);
          this.setAnimations('');
        }
        this.opened = false;
        return;
      }
      if (!this.dragging) return;

      let swiping;
      const e = evt.changedTouches ? evt.changedTouches[0] : evt;
      const offsetTop = e.pageY - this.start.y;
      const offsetLeft = (this.offsetLeft = e.pageX - this.start.x);

      const y = Math.abs(offsetTop);
      const x = Math.abs(offsetLeft);

      this.setAnimations('0ms');

      if (this.direction === '') {
        this.direction = x > y ? 'horizonal' : 'vertical';
      }

      if (this.direction === 'horizonal') {
        evt.preventDefault();
        evt.stopPropagation();

        swiping = !(x < 5 || (x >= 5 && y >= x * 1.73));
        if (!swiping) return;

        if (
          (offsetLeft < 0 && -offsetLeft > this.rightWidth) ||
          (offsetLeft > 0 && offsetLeft > this.leftWidth) ||
          (offsetLeft > 0 && !this.leftWidth) ||
          (offsetLeft < 0 && !this.rightWidth)
        ) {
        } else {
          this.swipeMove(offsetLeft);
        }
      }
    },

    endDrag() {
      this.direction = '';
      this.setAnimations('');
      if (!this.swiping) return;
      this.swipeLeaveTransition(this.offsetLeft > 0 ? -1 : 1);
    },
  },
  directives: { Clickoutside },
  watch: {
    showSideMenu() {
      this.operateMenu();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/components/assets/style/mixin.scss";

.i-sidebar-menu {
  // height: 100vh;
}

.masking {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
}




.sidebar-menu-list {
  position: relative;
  z-index: 999;
  transform: translate(-100%, 0);
  position: fixed;
  top: 0;
  right: auto;
  bottom: 0;
  left: 0;
  width: 234px;
  height: 100%;
  background: #fff;
  transition: 0.3s all;
  color: #333333;
}

.menu-btn {
  // float: right;
}

.show {
  transform: translate(0px, 0);
}
.hidden {
  transform: translate(-234px, 0);
}
</style>


