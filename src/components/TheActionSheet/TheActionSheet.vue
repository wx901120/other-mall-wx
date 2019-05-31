<template>
  <mt-popup v-model="popupVisible"
            position="bottom">
    <div class="specification-wrap">
      <div class="specification-content">
        <div class="title">选择规格</div>
        <div class="date specification-item">
          <div class="date-title specification-item-title">日期</div>
          <div class="selet-list">
            <ITag :title="tag.lessonTime"
                  v-for="(tag, index) in dateList"
                  widthType="auto"
                  visitedType="plain"
                  :key="index"
                  :checked="index === tagCheckIndex"
                  @click.native="dateSel(tag), tagCheckIndex = index"></ITag>
          </div>
        </div>

        <div class="count specification-item">
          <div class="date-title specification-item-title">
            数量
            <span class="specification-item-subtitle" v-if="result.stock">(库存{{ result.stock }}件)</span>
          </div>
          <MultiNumInput v-model="numVal" :max="result.stock"></MultiNumInput>
        </div>
      </div>

      <div class="btn-group">
        <IButton size="large"
                 type="red"
                 style="position: fixed; bottom: 0; border-radius: 0;"
                 @click="popupVisible = false">确定</IButton>
      </div>
    </div>
  </mt-popup>
</template>

<script>

export default {
  data() {
    return {
      stock: 0,
      numVal: 1,
      tagCheckIndex: -1,
      result: '',
      popupVisible: this.value,
    };
  },

  props: {
    value: {
      type: Boolean,
    },

    dateList: {
      type: Array,
    },
  },

  watch: {
    value(newVal) {
      this.popupVisible = newVal;
    },

    numVal(newVal) {
      this.$emit('update:numVal', newVal);
    },

    popupVisible(newVal) {
      this.$emit('input', newVal);
    },
  },

  methods: {
    dateSel(date) {
      this.result = date;
      this.$emit('update:result', this.result);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/style/mixin.scss";
.selet-list {
  display: flex;
  flex-flow: row wrap;
  // justify-content: space-between;
}
.specification-wrap {
  width: rem(750);
  padding-bottom: rem(90);
}
.specification-item {
  font-size: rem(28);
  .i-tag {
    &:not(:nth-child(3n-2)) {
      margin-left: rem(42);
    }
  }
  &.count {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: rem(140);
    border-top: 1px solid #f0f2f5;
    .specification-item-title {
      padding: 0;
    }
  }
  .specification-item-title {
    font-weight: bold;
    padding-bottom: rem(24);
    .specification-item-subtitle {
      font-size: rem(26);
      color: #a8a8a8;
    }
  }
}
.specification-content {
  padding: rem(20) rem(20) 0;
}
.title {
  font-size: rem(36);
  font-weight: bold;
  padding: rem(20) 0 rem(54);
}
</style>


