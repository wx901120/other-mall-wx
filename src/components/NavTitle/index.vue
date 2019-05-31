<template>
  <!-- 标题导航 -->
  <div class="title-nav-wrap nav-shadow">
    <nav class="title-nav background-opacity">
      <slot name="title-name"></slot>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavTitle',
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
}
</script>


<style lang="scss" scoped>
@import 'src/assets/style/mixin.scss';
.title-nav {
  position: relative;
  display: flex;
  align-items: center;
  height: rem(90);
  color: #000;
}

// 阴影
.nav-shadow {
  box-shadow: rem(2) rem(2) rem(10) rem(-4) #000;
}

// title-固定定位
.title-pos-fixed {
  position: fixed;
  top: rem(90);
  width: 100%;
  padding: 0 rem(20) 0;
  z-index: 999;
}

.no-margin {
  .title-nav {
    margin-top: 0;
  }
}
</style>
