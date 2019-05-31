<template>
  <div class="wx-cardList"
       :style="{ height: listHeight + 'px', overflow: 'scroll'}"
       ref="list">
    <slot></slot>
  </div>
</template>

<script>
import * as service from '@/api/service';

export default {
  name: 'CardList',

  data() {
    return {
      listHeight: 0,
    }
  },

  created() {
    this.$nextTick(() => {
      this.listHeight =
        document.documentElement.clientHeight -
        this.$refs.list.getBoundingClientRect().top;
    });
  },
};
</script>

<style lang="scss" scoped>
@include b(cardList) {
  padding: rem(30);
}
</style>

