<template>
  <div class="wx-orderItem">
    <h3 class="wx-orderItem__title">单号：{{ order.number }}</h3>
    <div class="wx-orderItem__content">
      <p class="wx-orderItem__contentItem">
        <span class="wx-orderItem__itemLabel">店铺：</span>
        <span class="wx-orderItem__itemContent">{{ order.shopName }}</span>
      </p>
      <p class="wx-orderItem__contentItem">
        <span class="wx-orderItem__itemLabel">时间：</span>
        <span class="wx-orderItem__itemContent">{{ order.intime | dateStringFilterStrike}}</span>
      </p>
      <p class="wx-orderItem__contentItem">
        <span class="wx-orderItem__itemLabel">金额：</span>
        <span class="wx-orderItem__itemContent">￥{{ order.money }}</span>
      </p>
      <p class="wx-orderItem__contentItem">
        <span class="wx-orderItem__itemLabel">状态：</span>
        <span class="wx-orderItem__itemContent">
          {{order.status == 1 ? '审核中': order.status==2 && order.state==1 ? '通过':order.status==2 && order.state!=1? '不通过，请按要求重新上传正确的消费凭证':''}}
          <span v-if="order.status==2 && order.state!=1" class="wx-orderItem__toUpload" @click="$router.push({ name: 'memberPhotoIntegration', params: { recordId: order.id } })">去上传</span>
        </span>
      </p>
      <p class="wx-orderItem__contentItem">
        <span class="wx-orderItem__itemLabel">结果：</span>
        <span class="wx-orderItem__itemContent">{{order.status == 1 ? '审核中': order.status==2 && order.state==1 ? order.content:order.status==2 && order.state!=1? order.content:'-'}}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: '',

  props: {
    order: {
      type: Object,
    },
  },
};
</script>


<style lang="scss" scoped>
@include b(orderItem) {
  background-color: #fff;
  &:nth-child(n + 2) {
    margin-top: rem(30);
  }

  @include e(toUpload) {
    color: #f00;
  }

  @include e(title) {
    padding: 0 rem(20);
    line-height: rem(50);
    font-size: rem(24);
    color: #ffffff;
    background-color: #d6024c;
  }

  @include e(content) {
    padding: 0 rem(20);
    color: #333333;
  }

  @include e(contentItem) {
    line-height: rem(44);
  }

  @include e(itemLabel) {
  }

  @include e(itemContent) {
    color: #8d8d8d;
  }
}
</style>

