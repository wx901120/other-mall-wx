<template>
  <div class="wx-header" :class="{ 'is-fixed': fixed }">
    <div class="header-btn"
         slot="left"
         @click="$back($router)">
      <span class="i-icon"
            :class="[typeClass]"></span>
    </div>
    <i-header :title="title"
              :fixed="fixed"
              :style="typeStyle"
              :class="{'is-underline': isUnderline}">
    </i-header>
  </div>
</template>

<script>

export default {
  name: 'TheHeader',

  props: {
    type: {
      type: String,
    },
    title: {
      type: String,
    },
    fixed: {
      type: Boolean,
    },
    isUnderline: {
      type: Boolean,
    },
  },

  computed: {
    typeStyle() {
      if (this.type === 'backCircle') {
        return {
          background: 'transparent',
          pointerEvents: 'none',
        };
      } else if (this.type === 'backPlain') {
        return {
          background: 'transparent',
          pointerEvents: 'none',
        };
      }
      return '';
    },
    typeClass() {
      if (this.type === 'backCircle') {
        return 'i-icon-back-circle';
      } else if (this.type === 'backPlain') {
        return 'i-icon-back';
      } else if (this.type === 'backCircleGray') {
        return 'i-icon-backCircleGray';
      }
      return 'i-icon-back';
    },
  },
};
</script>


<style lang="scss" scoped>
@import "src/assets/style/mixin.scss";
@include b(header) {
  position: relative;
  z-index: 1;

  @include when(fixed) {
    position: fixed;
    top: 0;
    left: 0;
  }
}
.i-header {
  height: rem(90);
}
.header-btn {
  // overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: rem(100);
  height: rem(90);
  flex: 0.2;
  pointer-events: auto;
  // left: rem(-20);
  z-index: 9999;
}

.header-btn.back-circle {
  display: flex;
  align-items: center;
  flex: 0.5;
  background: transparent;
}
.i-icon-back-circle {
  width: rem(58);
  height: rem(58);
  background: url("./image/icon-back-circle.png") no-repeat;
  background-size: cover;
}
.i-icon-backCircleGray {
  width: rem(56);
  height: rem(56);
  background: url("./image/icon-back-circle-gray.png") no-repeat;
  background-size: cover;
}
.is-underline {
  border-bottom: 1px solid #cbcbcb;
}
</style>
