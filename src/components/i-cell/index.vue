<template>
  <a class="i-cell" :href="href">
    <span class="i-cell-mask" v-if="isLink"></span>
    <div class="i-cell-left">
      <slot name="left"></slot>
    </div>
    <div class="i-cell-wrapper">
      <div class="i-cell-title">
        <slot name="icon">
          <i v-if="icon" class="i-icon" :class="'i-icon-' + icon"></i>
        </slot>
        <slot name="title">
          <span class="i-cell-text" v-text="title"></span>
          <span v-if="label" class="i-cell-label" v-text="label"></span>
        </slot>
      </div>
      <div class="i-cell-value" :class="{ 'is-link' : isLink, 'is-message' : isMessage }">
        <slot>
          <span v-text="value"></span>
        </slot>
      </div>
      <i v-if="isLink" class="i-cell-allow-right"></i>
    </div>
    <div class="i-cell-right">
      <slot name="right"></slot>
    </div>
  </a>
</template>

<script>
/**
 * mt-cell
 * @module components/cell
 * @desc 单元格
 * @param {string|Object} [to] - 跳转链接，使用 vue-router 的情况下 to 会传递给 router.push，否则作为 a 标签的 href 属性处理
 * @param {string} [icon] - 图标，提供 more, back，或者自定义的图标（传入不带前缀的图标类名，最后拼接成 .mintui-xxx）
 * @param {string} [title] - 标题
 * @param {string} [label] - 备注信息
 * @param {boolean} [is-link=false] - 可点击的链接
 * @param {string} [value] - 右侧显示文字
 * @param {slot} - 同 value, 会覆盖 value 属性
 * @param {slot} [title] - 同 title, 会覆盖 title 属性
 * @param {slot} [icon] - 同 icon, 会覆盖 icon 属性，例如可以传入图片
 *
 * @example
 * <mt-cell title="标题文字" icon="back" is-link value="描述文字"></mt-cell>
 * <mt-cell title="标题文字" icon="back">
 *   <div slot="value">描述文字啊哈</div>
 * </mt-cell>
 */
export default {
  name: "i-cell",

  props: {
    to: [String, Object],
    icon: String,
    title: String,
    label: String,
    isLink: Boolean,
    isMessage: Boolean,
    value: {}
  },

  computed: {
    href() {
      if (this.to && !this.added && this.$router) {
        const resolved = this.$router.match(this.to);
        if (!resolved.matched.length) return this.to;

        this.$nextTick(() => {
          this.added = true;
          this.$el.addEventListener("click", this.handleClick);
        });
        return resolved.fullPath || resolved.path;
      }
      return this.to;
    }
  },

  methods: {
    handleClick($event) {
      $event.preventDefault();
      this.$router.push(this.href);
    }
  }
};
</script>

<style lang="scss">
@import "src/components/assets/style/mixin.scss";
@import "src/components/assets/style/var.scss";
.i-cell {
  background-color: #fff;
  box-sizing: border-box;
  color: inherit;
  min-height: $--cell-min-height;
  display: block;
  overflow: hidden;
  position: relative;
  text-decoration: none;
}

.i-cell-wrapper {
  // 线条
  background-image: linear-gradient(
    180deg,
    #d9d9d9,
    #d9d9d9 50%,
    transparent 50%
  );
  background-size: 120% 2px;
  background-repeat: no-repeat;
  background-position: top left;
  background-origin: content-box;
  align-items: center;
  box-sizing: border-box;
  display: flex;
  font-size: 16px;
  line-height: 1;
  min-height: inherit;
  overflow: hidden;
  padding: 0 rem(20);
  width: 100%;
}
.i-cell:first-child .i-cell-wrapper {
  background-origin: border-box;
}

.i-cell-title {
  display: flex;
  align-items: center;
  width: $--cell-title-width;
  font-size: $--cell-title-font-size;
  color: $--cell-title-color;
  flex: 1;
  .i-icon {
    font-size: 16px;
    font-style: normal;
    margin-right: rem(20);
  }
  .i-cell-text {
    vertical-align: middle;
    word-spacing: rem(20);
    // word-spacing: 1em;
  }
}

.i-cell-value {
  color: $--cell-value-color;
  display: flex;
  align-items: center;
  font-size: $--cell-value-font-size;
  &.is-link {
    margin-right: 24px;
  }
}

.i-icon {
  display: inline-block;
  font-family: "i-icon" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.i-icon-more:before {
  content: "\E601";
}

.i-cell-allow-right::after {
  border: solid 1px #c8c8cd;
  border-bottom-width: 0;
  border-left-width: 0;
  content: " ";
  top: 50%;
  right: 20px;
  position: absolute;
  width: 8px;
  height: 8px;
  transform: translateY(-50%) rotate(45deg);
}

.i-cell-text {
  vertical-align: middle;
}

.i-cell-label {
  color: #888;
  display: block;
  font-size: 12px;
  margin-top: 6px;
}
.i-cell img {
  vertical-align: middle;
}

.i-cell-left {
    position: absolute;
    height: 100%;
    left: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
}

.i-cell-right {
    position: absolute;
    height: 100%;
    right: 0;
    top: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
}

.is-message {
  position: relative;
  &:after {
    content: '';
    // position: absolute;
    // top: 0;
    // right: 0;
    // bottom: 0;
    // left: auto;
    margin: auto;
    width: 6px;
    height: 6px;
    background-color: #ff5152;
    border-radius: 50%;
  }
}
</style>
