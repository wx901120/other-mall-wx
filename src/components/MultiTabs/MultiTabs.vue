<template>
  <div class="tab-title">
    <slot ref="tabItem"></slot>
  </div>
</template>

<script>
export default {
  name: 'MultiTabs',

  props: {
    value: {
      type: String,
    },
  },

  data() {
    return {
      activityName: this.value,
    };
  },

  watch: {
    value(newVal) {
      this.activityName = newVal;
    },
    activityName(newVal) {
      this.$emit('input', newVal);
    },
  },

  methods: {
    handleTabClick() {
      this.$emit('tabClick', this.activityName);
    },
  },
};
</script>


<style lang="scss" scoped>
@import "src/assets/style/mixin.scss";

/* Tab切换-头部 */
.tab-title {
  display: flex;
  align-items: center;
  height: rem(70);
  font-size: rem(26);
  color: #a8a8a8;
  background-color: #fff;
  border-bottom: 1px solid #e2e1df;
}
</style>
