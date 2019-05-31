<template>
  <div class="wx-agreeWrap">
      <i-checklist class="page-part"
                   v-model="value1"
                   :options="options1">
      </i-checklist>
      <span>我已阅读并同意遵守</span>
      <a href="javascript(void)">用户注册协议</a>
    </div>
</template>

<script>
import { IChecklist } from '@/components/index.js';

export default {
  name: 'ModelAgree',

  components: {
    IChecklist,
  },
};

</script>

<style lang="scss" scoped>
@include b(agreeWrap) {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: rem(24);
  span {
    color: #a8a8a8;
  }
  a {
    color: #d6024c;
  }
}
</style>
