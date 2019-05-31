<template>
  <div class="wx-cardWrap"
       @click.prevent="showQrcode()">
    <img :src="memberCard"
         alt="会员卡"
         class="wx-cardWrap__memberCard" />
    <span class="wx-cardWrap__cardNumber"
          :class="cardNumPosition"
          :style="{ 'color': `${cardArr.cardColor}` }">{{ memberCenterData.cardNumber }}</span>
  </div>
</template>

<script>
export default {
  name: 'Card',

  props: {
    memberCenterData: {
      type: Object,
    },
    memberCard: {
      type: String,
    },
    cardArr: {
      type: Object,
    },
  },

  computed: {
    cardNumPosition() {
      if (this.cardArr.cardPosition === '1') {
        return 'is-leftBottom';
      }

      if (this.cardArr.cardPosition === '2') {
        return 'is-rightBottom';
      }

      if (this.cardArr.cardPosition === '3') {
        return 'is-leftTop';
      }

      if (this.cardArr.cardPosition === '4') {
        return 'is-rightTop';
      }

      if (this.cardArr.cardPosition === '5') {
        return 'is-center';
      }

      return 'is-leftBottom';
    },
  },

  methods: {
    showQrcode() {
      this.$emit('showQrcode');
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(cardWrap) {
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 0;
  overflow: hidden;

  @include e(memberCard) {
    width: rem(391);
    height: rem(253);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: rem(446) rem(286);
  }

  @include e(cardNumber) {
    position: absolute;
    font-size: rem(20);
    color: #fff;

    @include when(leftTop) {
      top: rem(20);
      left: rem(44);
    }

    @include when(rightTop) {
      top: rem(20);
      right: rem(44);
    }

    @include when(leftBottom) {
      left: rem(44);
      bottom: rem(20);
    }

    @include when(rightBottom) {
      right: rem(44);
      bottom: rem(20);
    }

    @include when(center) {
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
