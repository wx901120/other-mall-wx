<template>
  <div class="wx-evaluateStars"
       ref="progressWrap"
       @touchstart="onTouchStart"
       @touchmove="onTouchMove">
    <div class="wx-evaluateStars__progressWrap">
    </div>
    <div class="wx-evaluateStars__currentProgress"
         ref="progress"
         :style="{ width: progressWidth * rate + 'px' }"></div>
  </div>
</template>

<script>
export default {
  name: 'EvaluateStars',

  props: {
    value: {
      type: Number,
    },
  },

  data() {
    return {
      progressWidth: 0,
      progressLeft: 0,
      touchStartX: 0,
      touchMoveX: 0,
      rate: this.value,
    };
  },

  watch: {
    value(newVal) {
      this.rate = newVal;
    },
    rate(newVal) {
      this.$emit('input', newVal);
    },
  },

  created() {
    this.$nextTick(() => {
      this.progressWidth = this.$refs.progressWrap.getBoundingClientRect().width;
      this.progressLeft = this.$refs.progressWrap.getBoundingClientRect().left;
    });
  },

  methods: {
    onTouchStart(e) {
      this.touchStartX = e.changedTouches[0].clientX;
      this.setRate(this.touchStartX);
    },
    onTouchMove(e) {
      this.touchStartX = 0;
      this.touchMoveX = e.changedTouches[0].clientX;
      this.setRate(this.touchMoveX);
    },

    setRate(startX) {
      let distance = startX - this.progressLeft;

      if (distance > this.progressWidth) {
        distance = this.progressWidth;
      }

      if (distance < 0) {
        distance = 0;
      }

      this.rate = window.parseFloat((distance / this.progressWidth).toFixed(2));
      this.rate = this.rate;
    },
  },
};
</script>


<style lang="scss" scoped>
@include b(evaluateStars) {
  width: rem(260);
  height: rem(38);
  background-image: url('./image/stars-gray.png');
  background-repeat: no-repeat;
  background-size: rem(260) rem(38);
  @include e(progressWrap) {
  }

  @include e(currentProgress) {
    width: rem(100);
    height: 100%;
    background-image: url("./image/stars-yellow.png");
    background-repeat: no-repeat;
    background-size: rem(260) rem(38);
  }
}
</style>

