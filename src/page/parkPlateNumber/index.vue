<template>
  <div class="wx-parkPlateNumber">
    <TheHeader title="停车缴费"></TheHeader>
    <div class="content-car-number">
      <div class="car-content-title">
        <span class="tips">请输入车牌号</span>
        <label class="ze-checkbox"><input type="checkbox"
                 v-model="checkbox"
                 @change="carTypeChange">
          <span class="ze-checkbox-icon"
                style="width: 20px;height: 20px;color: rgb(76, 216, 100);">
            <i style="width: 6px;height: 12px;"></i>
          </span>
          <span class="ze-checkbox-text">新能源</span>
        </label>
      </div>
      <div class="content-section">
        <div class="content-section-flex flex-card">
          <div class="content-section-flex flex-card-border">
            <button id="font"
                    class="flex-btn"
                    @click="btnClickYue"
                    v-bind:class="{isClick: isYue }">{{areaName}}</button>

            <span class="blank-border blank-border-first"></span>

            <button id='letter'
                    class="flex-btn"
                    @click="btnClickA"
                    v-bind:class="{isClick: isA}">{{areaLetter}}</button>

            <div class="flex-mid">
              <span></span>
            </div>

            <div class="flex-btns">

              <button id='numOne'
                      @click="btnClickNum('one')"
                      v-bind:class="{isNumClick: isNumOne }">{{numOne}}</button>

              <span class="blank-border"></span>

              <button id='numTwo'
                      @click="btnClickNum('two')"
                      v-bind:class="{isNumClick: isNumTwo }">{{numTwo}}</button>

              <span class="blank-border"></span>

              <button id='numThree'
                      @click="btnClickNum('three')"
                      v-bind:class="{isNumClick: isNumThree }">{{numThree}}</button>

              <span class="blank-border"></span>

              <button id='numFour'
                      @click="btnClickNum('four')"
                      v-bind:class="{isNumClick: isNumFour }">{{numFour}}</button>

              <span class="blank-border"></span>

              <button id='numFive'
                      @click="btnClickNum('five')"
                      v-bind:class="{isNumClick: isNumFive }">{{numFive}}</button>

              <span class="blank-border"
                    v-if="checkbox"></span>

              <button v-if="checkbox"
                      id='numSix'
                      @click="btnClickNum('six')"
                      v-bind:class="{isNumClick: isNumSix }">{{numSix}}</button>
            </div>
          </div>

          <div class="btn-group">
            <IButton size="large" style="border:none; height: 45px; background-color: #dddddd; font-size: 18px; color: #fff;" @click="toParkPay()">确定</IButton>
          </div>
        </div>
      </div>
    </div>

    <div class="paymemt-intro">
      <h3 class="title">
        缴费说明
      </h3>
      <p class="content">
        1、会员停车权益享卡：线上缴费200积分/小时
        缤纷卡；每日免费3小时，线上缴费200积分/小时璀璨卡；
        每日免费3小时，线上缴费150积分/小时至尊卡；
        全年免费停车会员可在缴费页面选择积分
        1、会员停车权益享卡：线上缴费200积分/小时
        缤纷卡；每日免费3小时，线上缴费200积分/小时璀璨卡；
        每日免费3小时，线上缴费150积分/小时至尊卡；
        全年免费停车会员可在缴费页面选择积分
        1、会员停车权益享卡：线上缴费200积分/小时
        缤纷卡；每日免费3小时，线上缴费200积分/小时璀璨卡；
        每日免费3小时，线上缴费150积分/小时至尊卡；
        全年免费停车会员可在缴费页面选择积分
      </p>
    </div>

    <div class="keyboard"
         :class='{animationDown:isDown,animationUp:isUp}'
         v-if="keyboardShow">

      <button class="btn-complete"
              @click="completeClick">
        <span>完成</span>
      </button>

      <div v-if="keyboard == 'txt'">

        <div class="keyboard-row"
             v-for="(item,rows) in carTxt">

          <button class="keyboard-row-item"
                  v-for="(i,index) in item.name"
                  @click="btnWordClick(rows,index,i)">{{i}}</button>
        </div>

        <div class="keyboard-row">

          <!-- <div class="keyboard-row-items"> -->

          <button class="keyboard-row-item bottom"
                  @click="btnBottomClick('新')">新</button>

          <button class="keyboard-row-item bottom"
                  @click="btnBottomClick('临')">临</button>

          <button v-for="(j, key) in noneBottomtxt"
                  class="none-botton">{{j}}</button>

          <div class="keyboard-row-item clear"
               @click="clearClick">
            <!-- <img src="../assets/icon_input_delete.png"
                 alt="删除"> -->
          </div>

          <!-- </div> -->
        </div>
      </div>

      <div v-if="keyboard == 'num'">

        <div class="keyboard-row"
             v-for="(item,rows) in carNum">

          <button :disabled="!isSelectl?isDisable && i<10 :isDisable&& rows!=0 "
                  class="keyboard-row-item"
                  v-for="(i,index) in item.name"
                  @click="btnWordClick(rows,index,i)">{{i}}
          </button>
        </div>

        <div class="keyboard-row">

          <!-- <div class="keyboard-row-bottom"> -->

          <button :disabled="isSelectl"
                  v-for="(item, key) in carNumBottom"
                  class="keyboard-row-item bottom"
                  @click="btnBottomNumClick(item)">{{item}}</button>

          <button v-for="(j, key) in noneBottom"
                  class="none-botton">{{j}}</button>

          <div class="keyboard-row-item clear"
               @click="clearClick">
            <!-- <img src="../assets/icon_input_delete.png"
                 alt="删除"> -->
          </div>

          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as service from '@/api/service';

export default {
  name: 'parkPlateNumber',

  data() { // 有一些别的数据,实在懒得一一挑出来了
    return {
      toastTxt: '',
      isToastShow: false,
      isStr: '20px',
      isEnd: '300px',
      ispickerDateShow: '-400px',
      dateTitle: '开始',
      beginTimeVal: '',
      overTimeVal: '',
      isFeeHourClick: true,
      checkbox: false,
      isDown: false,
      isUp: false,
      selected: null,
      isSelectx: false,
      isSelectl: false,
      key: '1',
      areaName: '',
      areaLetter: '',
      numOne: '',
      numTwo: '',
      numThree: '',
      numFour: '',
      numFive: '',
      numSix: '',
      isYue: false,
      keyboardShow: false,
      keyboard: false,
      isA: false,
      isNumOne: false,
      isNumTwo: false,
      isNumThree: false,
      isNumFour: false,
      isNumFive: false,
      isNumSix: false,
      isDisable: false,
      carTxt: [
        { name: ['粤', '京', '冀', '沪', '津', '晋', '蒙', '辽', '吉', '黑'] },
        { name: ['苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '桂'] },
        { name: ['琼', '渝', '川', '贵', '云', '藏', '陕', '甘', '青', '宁'] },
      ],
      carNumBottom: ['W', 'X', 'Y', 'Z'],
      noneBottom: ['', '', '', ''],
      noneBottomtxt: ['', '', '', '', '', ''],
      carNum: [
        { name: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'] },
        { name: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'] },
        { name: ['L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'] },
      ],
      addedCarNum: '',
    };
  },
  watch: {
    checkbox(val, oldval) { // 监听是否为新能源
      this.isNumOne = false;
      this.isNumTwo = false;
      this.isNumThree = false;
      this.isNumFour = false;
      this.isNumFive = false;
      this.isNumSix = false;
      const vm = this;
      if (!val) {
        // 切换到普通车牌
        if (vm.numFour) {
          vm.isNumFive = true;
          vm.key = 7;
        }
      } else {
        // 切换到新能源车牌
        if (vm.numFive) {
          vm.isNumSix = true;
          vm.key = 8;
        }
      }
    },
    numFive(val) { // 监听是否为普通车牌最后一位
      if (!this.checkbox && val) {
        this.isUp = false;
        this.isDown = true;
        this.keyboardShow = false;
        this.isNumFive = false;
      }
    },
    numSix(val) { // 监听是否为新能源车牌最后一位
      if (this.checkbox && val) {
        this.isUp = false;
        this.isDown = true;
        this.keyboardShow = false;
        this.isNumSix = false;
      }
    },
  },
  // methods
  methods: {
    async toParkPay() {
      if (this.areaName === '' || this.areaLetter === '' || this.numOne === '' || this.numTwo === '' || this.numThree === '' || this.numFour === '' || this.numFive === '') {
        this.$Toast('请输入完整的车牌号');
        return;
      }

      // 桂-AX9415,写死的车牌号

      const carNo = this.areaName + '-' + this.areaLetter + this.numOne + this.numTwo + this.numThree + this.numFour + this.numFive + this.numSix;
      const data = await service.carQuery({ carNo });
      
      if (data.errCode !== 0) {
        this.$Toast(data.errMsg);
      }

      this.$router.push({ name: 'parkPay', params: { carNo }});
    },
    // 车牌类型切换
    carTypeChange(val) {
      this.isNumOne = false;
      this.isNumTwo = false;
      this.isNumThree = false;
      this.isNumFour = false;
      this.isNumFive = false;
      this.isNumSix = false;
      if (!val) {
        // 切换到普通车牌
        if (this.numFour) {
          this.isNumFive = true;
          this.key = 7;
        }
      } else {
        // 切换到新能源车牌
        if (this.numFive) {
          this.isNumSix = true;
          this.key = 8;
        }
      }
    },
    // 车牌号第一位输入框选择
    btnClickYue() {
      this.isYue = true;
      this.isA = false;
      this.isUp = true;
      this.isNumOne = false;
      this.isNumTwo = false;
      this.isNumThree = false;
      this.isNumFour = false;
      this.isNumFive = false;
      this.isNumSix = false;
      this.keyboardShow = true;
      this.keyboard = 'txt';
      this.key = 1;
    },
    // 键盘选择显示
    btnWordClick(rows, index, i) {
      this.selected = i;
      if (this.key === 1) {
        if (this.areaName === '临') {
          this.areaLetter = '';
          this.numOne = '';
          this.numTwo = '';
          this.numThree = '';
          this.numFour = '';
          this.numFive = '';
          this.numSix = '';
        }
        this.areaName = i;
        this.isSelectl = false;
        document.getElementById('letter').click();
      } else if (this.key === 2) {
        this.areaLetter = i;
        document.getElementById('numOne').click();
      } else if (this.key === 3) {
        this.numOne = i;
        document.getElementById('numTwo').click();
      } else if (this.key === 4) {
        this.numTwo = i;
        document.getElementById('numThree').click();
      } else if (this.key === 5) {
        this.numThree = i;
        document.getElementById('numFour').click();
      } else if (this.key === 6) {
        this.numFour = i;
        document.getElementById('numFive').click();
      } else if (this.key === 7) {
        this.numFive = i;
        if (this.checkbox) {
          document.getElementById('numSix').click();
        }
      } else if (this.key === 8) {
        this.numSix = i;
      }
      if (this.key === 7 || this.key === 8) {
        this.carNumBottom = ['W', 'X', 'Y', 'Z', '港', '澳', '学'];
        this.noneBottom = [''];
      } else if (this.key === 3 || this.key === 4 || this.key === 5 || this.key === 6) {
        this.carNumBottom = ['W', 'X', 'Y', 'Z'];
        this.noneBottom = ['', '', '', ''];
      }
    },
    // 车牌第一位选择‘临’,’新‘后的键盘显示
    btnBottomClick(val) {
      if (val === '新') {
        if (this.areaName === '临') {
          this.areaLetter = '';
          this.numOne = '';
          this.numTwo = '';
          this.numThree = '';
          this.numFour = '';
          this.numFive = '';
          this.numSix = '';
        }
        this.areaName = '新';
        this.isSelectx = true;
        this.isSelectl = false;
        document.getElementById('letter').click();
      } else if (val === '临') {
        this.areaName = '临';
        this.isSelectl = true;
        this.isSelectx = false;
        this.isDisable = true;
        this.areaLetter = '';
        this.numOne = '';
        this.numTwo = '';
        this.numThree = '';
        this.numFour = '';
        this.numFive = '';
        this.numSix = '';
        document.getElementById('letter').click('isLin');
      }
    },
    // 键盘最后一行字母点击事件
    btnBottomNumClick(i) {
      this.selected = i;
      if (this.key === 2) {
        this.areaLetter = i;
        document.getElementById('numOne').click();
      } else if (this.key === 3) {
        this.numOne = i;
        document.getElementById('numTwo').click();
      } else if (this.key === 4) {
        this.numTwo = i;
        document.getElementById('numThree').click();
      } else if (this.key === 5) {
        this.numThree = i;
        document.getElementById('numFour').click();
      } else if (this.key === 6) {
        this.numFour = i;
        document.getElementById('numFive').click();
      } else if (this.key === 7) {
        this.numFive = i;
        if (this.checkbox) {
          document.getElementById('numSix').click();
        }
      } else if (this.key === 8) {
        this.numSix = i;
      }
    },
    // 车牌号第二位输入框选择
    btnClickA() {
      this.isDisable = true;
      this.isA = true;
      this.isYue = false;
      this.isUp = true;
      this.isNumOne = false;
      this.isNumTwo = false;
      this.isNumThree = false;
      this.isNumFour = false;
      this.isNumFive = false;
      this.isNumSix = false;
      this.keyboardShow = true;
      this.keyboard = 'num';
      this.key = 2;
    },
    // 车牌号后五位或六位输入框选择
    btnClickNum(name) {
      if (this.isSelectl) {
        this.isDisable = true;
      } else {
        this.isDisable = false;
      }
      this.keyboard = 'num';
      this.keyboardShow = true;
      this.isYue = false;
      this.isA = false;
      this.isNumOne = false;
      this.isNumTwo = false;
      this.isNumThree = false;
      this.isNumFour = false;
      this.isNumFive = false;
      this.isNumSix = false;
      this.isUp = true;
      if (name === 'one') {
        this.isNumOne = true;
        this.key = 3;
      } else if (name === 'two') {
        this.isNumTwo = true;
        this.key = 4;
      } else if (name === 'three') {
        this.isNumThree = true;
        this.key = 5;
      } else if (name === 'four') {
        this.isNumFour = true;
        this.key = 6;
      } else if (name === 'five') {
        this.isNumFive = true;
        this.key = 7;
      } else if (name === 'six') {
        this.isNumSix = true;
        this.key = 8;
      }
      if (name === 'five' || name === 'six') {
        this.carNumBottom = ['W', 'X', 'Y', 'Z', '港', '澳', '学'];
        this.noneBottom = [''];
      } else {
        this.carNumBottom = ['W', 'X', 'Y', 'Z'];
        this.noneBottom = ['', '', '', ''];
      }
    },
    // 键盘点击‘完成’
    completeClick() {
      this.isYue = false;
      this.isA = false;
      this.isNumOne = false;
      this.isNumTwo = false;
      this.isNumThree = false;
      this.isNumFour = false;
      this.isNumFive = false;
      this.isNumSix = false;
      this.isUp = false;
      this.isDown = true;
      this.keyboardShow = false;
    },
    // 键盘点击‘删除图标’
    clearClick() {
      if (this.key === 1) {
        this.areaName = '';
      } else if (this.key === 2) {
        document.getElementById('font').click();
        this.areaLetter = '';
      } else if (this.key === 3) {
        document.getElementById('letter').click();
        this.numOne = '';
      } else if (this.key === 4) {
        document.getElementById('numOne').click();
        this.numTwo = '';
      } else if (this.key === 5) {
        document.getElementById('numTwo').click();
        this.numThree = '';
      } else if (this.key === 6) {
        document.getElementById('numThree').click();
        this.numFour = '';
      } else if (this.key === 7) {
        document.getElementById('numFour').click();
        this.numFive = '';
      } else if (this.key === 8) {
        document.getElementById('numFive').click();
        this.numSix = '';
      }
    },
    addCar() {
      const myApp = new Framework7();
      let num;
      const str = document.getElementById('picker-str-date').value;
      const end = document.getElementById('picker-end-date').value;
      const bt = new Date(str.replace(/\-/g, '\/'));
      const et = new Date(end.replace(/\-/g, '\/'));
      if (!this.checkbox) {
        num = this.areaName + this.areaLetter + this.numOne + this.numTwo + this.numThree + this.numFour + this.numFive;
      } else if (this.checkbox) {
        num = this.areaName + this.areaLetter + this.numOne + this.numTwo + this.numThree + this.numFour + this.numFive + this.numSix;
      }
      if (num === '') {
        this.toastMessage('请输入车牌', 1000);
      } else if (!this.checkbox && (this.areaName === '' || this.areaLetter === '' || this.numOne === '' || this.numTwo === '' || this.numThree === '' || this.numFour === '' || this.numFive === '')) {
        this.toastMessage('请输入完整车牌', 1000);
      } else if (this.checkbox && (this.areaName === '' || this.areaLetter === '' || this.numOne === '' || this.numTwo === '' || this.numThree === '' || this.numFour === '' || this.numFive === '' || this.numSix === '')) {
        this.toastMessage('请输入完整车牌', 1000);
      } else if (str !== '' && end !== '' && bt >= et) {
        this.toastMessage('开始时间必须早于结束时间', 1000);
      } else {
        // const data = {
        // vehiclenum: num
        // }
        // this.$http.post(ADD_VEHICLE, data).then(res => {
        // if (res.data.ret === 0) {
        // this.addedCarNum = num
        // this.$router.push({name: 'AddSuccess', params: {addedCarNum: this.addedCarNum}})
        // } else {
        // this.$dialog.toast({mes:res.data.message,timeout:1200})
        // }
        // })
      }
    },
  },
};
</script>

<style lang="scss" scoped>
//车牌输入框
@include b(parkPlateNumber) {
  background-color: #151a24;
  min-height: 100vh;
}
.content-car-number {
  width: rem(710);
  // height: rem(324);
  margin: rem(24) auto 0;
  padding: rem(20);
  border-radius: rem(8);
  background-color: #fff;

  .car-content-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: rem(16);
    font-size: rem(28);
    color: #333333;
    .ze-checkbox {
      display: flex;
      align-items: center;
    }
    .ze-radio-text {
      font-size: rem(28);
    }
    .ze-checkbox-icon {
      color: #ffedb1 !important;
      margin-right: rem(8);
    }
  }
  .content-section {
    .content-section-flex {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      align-items: center;
      font-size: rem(40);
      margin-bottom: rem(35);
      .blank-border {
        height: rem(44);
        width: 1px; /*no*/
        border-right: 1px solid #ddd; /*no*/
        margin-top: rem(27);
        float: left;
        margin-left: rem(-15);
        z-index: 1;
        &.blank-border-first {
          margin-top: 0px;
        }
      }
      &.flex-card {
        color: #000;
        .flex-btn {
          width: rem(88);
          // width: rem(98);
          height: rem(98);
          border: none;
          text-align: center;
          background: #fff;
          font-size: rem(40);
          color: #000;
        }
        .flex-btns {
          text-align: center;
          background: #fff;
          width: fit-content;
          position: relative;
          height: rem(98);
          button {
            width: rem(90);
            height: rem(98);
            border: none;
            font-size: rem(40);
            color: #000;
            border-radius: 50%;
            background: transparent;
            float: left;
            margin-left: rem(-20);
            z-index: 2;
            position: relative;
            &:first-child {
              margin-left: 0;
            }
          }
        }
        .flex-mid {
          margin: 0 0.1rem;
          span {
            display: block;
            width: rem(10);
            height: rem(10);
            border-radius: 50%;
            background: #ddd;
          }
        }
        .isClick {
          border: 1px solid #ffc200; /*no*/
          z-index: 50;
          border-radius: rem(8);
        }
        .isNumClick {
          border-radius: rem(8) !important;
          border: 1px solid #ffc200 !important; /*no*/
          z-index: 10;
          background-color: #fff !important;
        }
      }
      .flex-card-border {
        border: 1px solid #ddd; /*no*/
        border-radius: rem(8);
      }
      .btn-group {
        width: 100%;
      }
    }
  }
}

//键盘
.keyboard {
  width: 100%;
  height: rem(502);
  position: fixed;
  bottom: -rem(502);
  background: #eeeeee;
  z-index: 10;
  &.animationDown {
    animation: slide_dowms 0.3s ease-out;
    animation-fill-mode: forwards;
  }
  &.animationUp {
    animation: slide_ups 0.3s ease-out;
    animation-fill-mode: forwards;
  }
  .btn-complete {
    height: rem(72);
    text-align: right;
    color: #ffc200;
    font-size: rem(30);
    width: 100%;
    background: #fff;
    border: none;
    border-top: 1px solid #eee;
    margin-bottom: rem(30);
    span {
      margin-right: rem(30);
    }
  }
  .keyboard-row {
    margin-top: rem(20);
    display: flex;
    justify-content: space-between;
    padding: 0 rem(8);
    color: #333;
    &:first-child {
      margin-top: 0;
    }
    .keyboard-row-items {
      display: flex;
      justify-content: left;
    }
    .keyboard-row-bottom {
      display: flex;
      justify-content: space-between;
    }
    .keyboard-row-item {
      width: rem(66);
      height: rem(80);
      background: #fff;
      font-size: rem(34);
      text-align: center;
      border: 1px solid #ccc; /*no*/
      border-radius: rem(10);
      color: #333;
      &.bottom {
        height: rem(80);
        width: rem(66);
        line-height: rem(80);
        background: #fff;
        color: #333;
        /*margin-right: 0.08rem;*/
      }
      &.clear {
        width: 1rem(40);
        height: rem(80);
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: rem(62);
        }
      }
    }
    .none-botton {
      border: none;
      height: rem(80);
      width: rem(66);
      visibility: hidden;
    }
  }
  button {
    &:active {
      background: #f4f4f4 !important;
      color: #999 !important;
    }
  }
}

.paymemt-intro {
  background-color: #fff;
  margin: rem(20) rem(20) 0;
  padding: rem(20);
  border-radius: rem(8);
  .title {
    font-size: rem(24);
  }
  .content {
    margin-top: rem(30);
    line-height: rem(45);
    color: #9b9b9b;
  }
}
//键盘滑动
@keyframes slide_ups {
  from {
    bottom: -rem(502);
  }
  to {
    bottom: 0px;
  }
}
@keyframes slide_dowms {
  from {
    bottom: 0px;
  }
  to {
    bottom: -rem(502);
  }
}
</style>
