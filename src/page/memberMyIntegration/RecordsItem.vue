<template>
  <li class="wx-recordItems">
    <span class="wx-recordItems__item date">{{ record.intime | dateStringFilterStrike }} {{ record.intime | dateStringFilterTime }}</span>
    <span class="wx-recordItems__item source">{{ record.type_id_name }}</span>
    <span class="wx-recordItems__item goods">{{ record.goodName }}</span>
    <span class="wx-recordItems__item integration">{{ record.integral }}</span>
  </li>
</template>

<script>
export default {
  name: 'RecordsItem',

  props: {
    record: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(recordItems) {
  display: flex;
  height: rem(100);
  border-bottom: 1px solid #e5e5e5;

  @include e(item) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    text-align: center;
  }
}
</style>


