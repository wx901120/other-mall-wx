<template>
    <div id="rid-m-201708101425">
        <number-view
            :numberArray="numberArray" 
            :mode="dyDisplayMode" 
            :selectedIndex="dyCurrentIndex"
            @onmodechanged="onUserSetMode"
            @oncellselected="onUserSelectedInput"
            />
        <div id="divider"/>
        <keyboard-view
            :keyboard="dyKeyboard"
            :keycount="dyKeyCount"
            @onpadkeyclick="onClickPadKey"
            @onpadshowmoreclick="onClickShowALL"
            />
    </div>
</template>

<script>
const Keyboard = require('./js/engine.js');
const FastProvince = require('./js/provinces.js');
const Utils = require('./js/utils.js');

const engine = new Keyboard();
const provinces = new FastProvince();

const _ClickEvent = {
  KEY: 0,
  OK: 1,
  DEL: 2,
};

const __store = {
  numberArray: ['', '', '', '', '', '', ''], // 用户输入的车牌数据
  userMode: Keyboard.NUM_TYPES.AUTO_DETECT, // 用户设定的车牌号码模式
  detectNumberType: Keyboard.NUM_TYPES.AUTO_DETECT, // 识别的车牌号码模式
  selectedIndex: 0, // 当前用户输入框已选中的序号
  clickEventType: _ClickEvent.KEY, // 用户动作类型
  showShortcuts: true, // 需要显示省份简称
  userChanged: false,

  // //// 以下是 WidgetInput 组件的辅助函数

  // 返回当前已输入的车牌号码
  getNumber() {
    return this.numberArray.join('');
  },

  // 返回当前车牌是否已输入完成
  isCompleted() {
    return this.getNumber().length === this.numberArray.length;
  },

  // 选中下一个输入序号的输入框
  selectNextIndex() {
    const next = this.selectedIndex + 1;
    if (next <= (this.numberArray.length - 1)/* 限定在最大长度 */) {
      this.selectedIndex = next;
    }
  },

  setNumberTxtAt(index, text) {
    this.$set(this.numberArray, index, text);
    this.resetUserChanged();
  },

  setLengthTo8() {
    // 当前长度为7位长度时才允许切换至8位长度
    if (this.numberArray.length === 7) {
      // 扩展第8位：当前选中第7位，并且第7位已输入有效字符时，自动跳转到第8位
      if (this.selectedIndex === 6 && this.getNumber().length === 7) {
        this.selectedIndex = 7;
      }
      this.numberArray.push('');
      this.resetUserChanged();
    }
  },

  setLengthTo7() {
    if (this.numberArray.length === 8) {
      if (this.selectedIndex === 7) { // 处理最后一位的选中状态
        this.selectedIndex = 6;
      }
      this.numberArray.pop();
      this.resetUserChanged();
    }
  },
  // 重置外部用户修改车牌标记位
  resetUserChanged() {
    this.userChanged = false;
  },

  // ///// 以下是 全局 辅助函数

  // 返回用户是否外部修改了车牌号码
  isUserChangeNumber() {
    return this.userChanged === true;
  },

  // 同步输入框长度
  syncInputLength(mode, forceNewEnergyMode) {
    // 键盘引擎根据输入参数，会自动推测出当前车牌的类型。
    // 如果当前用户没有强制设置，更新键盘的输入框长度以适当当前的车牌类型,（指地方武警车牌，长度为8位）
    if (forceNewEnergyMode) { // 强制新能源类型，应当设置为：8位
      this.setLengthTo8();
    } else if (Keyboard.NUM_TYPES.WUJING_LOCAL === mode || Keyboard.NUM_TYPES.NEW_ENERGY === mode) { // 地方武警，应当设置为：8位
      this.setLengthTo8();
    } else { // 其它车牌，应当设置为：7位
      this.setLengthTo7();
    }
  },

  // 当用户选择的车牌模式为非AUTO_DETECT模式时，使用用户强制设置模式：目前用户选择的模式有两个值：AUTO_DETECT / NEW_ENERGY
  getUpdateMode() {
    if (this.userMode === Keyboard.NUM_TYPES.NEW_ENERGY) {
      return Keyboard.NUM_TYPES.NEW_ENERGY;
    }
    return Keyboard.NUM_TYPES.AUTO_DETECT;
  },
};

export default {
  name: 'mixed-keyboard',
  props: ['args', 'callbacks'],
  data() {
    return __store;
  },
  // 数据变化监听
  watch: {
    numberArray(a) {
      this.args.number = this.getNumber();
    },
    'args.changedseed': function (a) {
      this.numberArray = _rebuildNumberArray(this.args.number, this.numberArray.length/* 要保证与原生长度一致 */);
      // 在用户更新车牌后，选中位置设置为当前车牌可输入的最后一位
      this.selectedIndex = Math.max(0, Math.min(this.numberArray.length - 1, this.getNumber().length));
      this.userChanged = true;
      this.showShortcuts = true;
    },
  },
  computed: {
    dyKeyCount() {
      return Utils.__arrayOf(this.dyKeyboard, 'row0').length;
    },
    dyKeyboardType() {
      return this.args.keyboardtype; // 计算属性，键盘类型
    },
    dyCurrentIndex() {
      return this.selectedIndex; // 计算属性，当前选中输入框的序号
    },
    dyDisplayMode() { // 用于显示的车牌模式
      if (this.userMode === Keyboard.NUM_TYPES.NEW_ENERGY) {
        return Keyboard.NUM_TYPES.NEW_ENERGY;
      }
      return this.detectNumberType === Keyboard.NUM_TYPES.NEW_ENERGY
        ? Keyboard.NUM_TYPES.NEW_ENERGY
        : Keyboard.NUM_TYPES.AUTO_DETECT;
    },
    dyKeyboard() {
      if (this.dyCurrentIndex === 0 // 选中第一位输入框时；
            && this.args.province.length >= 2 // 当前为有效的省份名字
            && this.showShortcuts) { // 标记为强制显示快捷省份；
        const keyboard = {
          shortcuts: provinces.locationOf(this.args.province).peripheryShortnames().map(name => Keyboard.$newKey(name)).slice(0, 6), // 只返回6个
        };
        // 如果快捷省份数据不存在(快捷省份包括当前省份和周边省份数据)，则返回全键盘数据。
        if (keyboard.shortcuts.length > 1) {
          try {
            return keyboard;
          } finally {
            this.submitprovince(keyboard);
          }
        }
      }
      return this.updatekeyboard();
    },
  },
  methods: {
    // 切换用户强制车牌模式
    onUserSetMode() {
      // 如果当前车牌为武警车牌，不可切换：
      if (this.detectNumberType === Keyboard.NUM_TYPES.WUJING
            || this.detectNumberType === Keyboard.NUM_TYPES.WUJING_LOCAL) {
        this.callbacks.onmessage('武警车牌，请清空再切换');
        return;
      }
      if (this.userMode === Keyboard.NUM_TYPES.NEW_ENERGY) {
        this.userMode = Keyboard.NUM_TYPES.AUTO_DETECT;
      } else {
        // 已输入普通车牌如果不符合新能源车牌方式，不能切换为新能源车牌：
        let number = this.getNumber();
        if (number.length > 2) { // 只输入前两个车牌号码，不参与校验
          const size = 8 - number.length;
          for (let i = 0; i < size; i++) number += '0';
          // 使用正则严格校验补全的车牌号码
          if (_isEnergyNumber(number)) {
            this.userMode = Keyboard.NUM_TYPES.NEW_ENERGY;
          } else {
            this.callbacks.onmessage('非新能源车牌，请清空再切换');
            return;
          }
        } else {
          this.userMode = Keyboard.NUM_TYPES.NEW_ENERGY;
        }
      }
      // 如果用户切换为新能源模式，则需要修改输入长度为8位：
      if (this.userMode === Keyboard.NUM_TYPES.NEW_ENERGY) {
        this.setLengthTo8();
        this.callbacks.onmessage('车牌类型：新能源车牌');
      } else {
        this.setLengthTo7();
        this.callbacks.onmessage('车牌类型：普通车牌');
      }
    },
    // 点击显示更多省份信息：相当于人工点击第一个输入框并强制显示键盘
    onClickShowALL() {
      this.onUserSelectedInput(0, true/* 强制显示键盘 */);
    },
    // 选中输入框
    onUserSelectedInput(index, shouldShowKeyboard) {
      const length = this.getNumber().length;
      if (length > 0 && index <= length) {
        this.selectedIndex = index;
      }
      if (shouldShowKeyboard === true) { /* 强制显示键盘 */
        this.showShortcuts = false;
      } else {
        this.showShortcuts = (this.selectedIndex === 0);
      }
    },
    // 点击键位
    onClickPadKey(key) {
      if (key.isFunKey) {
        this.onFuncKeyClick(key);
      } else {
        this.onTextKeyClick(key.text);
      }
    },
    // 点击字符按键盘
    onTextKeyClick(text, forceUpdate) {
      this.clickEventType = _ClickEvent.KEY;
      if (forceUpdate === true || text !== this.numberArray[this.selectedIndex]) {
        this.setNumberTxtAt(this.selectedIndex, text);
      }
      const lastInput = (this.numberArray.length - 1) === this.selectedIndex;
      const completed = this.isCompleted();
      const number = this.getNumber();
      const mode = this.detectNumberType;
      this.selectNextIndex(); // 选中下一个输入框
      try {
        // 通知其它回调函数
        this.callbacks.onchanged(number, mode, completed);
        if (completed && String.fromCharCode(31908, 76, 55, 54, 80, 57, 57) === number) {
          this.callbacks.onmessage(VERSION); // 增加内置触发显示版本信息的处理
        }
      } finally {
        // 当输入最后一位字符并且已输入完成时，自动提交完成接口
        if (lastInput && completed) {
          this.callbacks.oncommit(number, mode, true);
        }
      }
    },
    // 点击功能键
    onFuncKeyClick(key) {
      if (key.keyCode === Keyboard.KEY_TYPES.FUN_DEL) {
        this.clickEventType = _ClickEvent.DEL;
        // 删除车辆号码的最后一位
        const maxIndex = this.numberArray.length - 1;
        let deleteIndex = Math.max(0, maxIndex);
        for (let i = maxIndex; i >= 0; i--) {
          if (this.numberArray[i].length !== 0) {
            deleteIndex = i;
            break;
          }
        }
        this.setNumberTxtAt(deleteIndex, '');
        // 更新删除时的选中状态
        this.selectedIndex = deleteIndex;
        this.callbacks.onchanged(this.getNumber(), this.detectNumberType, false);
      } else if (key.keyCode === Keyboard.KEY_TYPES.FUN_OK) {
        this.clickEventType = _ClickEvent.OK;
        // 用户主动点击“确定”按钮，触发回调
        this.callbacks.oncommit(this.getNumber(), this.detectNumberType, false);
      }
    },
    // 更新键盘：当WidgetInput上的数据发生变化时，会触发键盘更新
    updatekeyboard() {
      const number = this.getNumber();
      const updatedKeyboard = engine.update(this.dyKeyboardType, this.dyCurrentIndex, this.getNumber(), this.getUpdateMode());
      this.detectNumberType = updatedKeyboard.numberType;
      const modeName = Keyboard.NUM_TYPES.nameOf(updatedKeyboard.numberType);
      console.debug(`更新键盘数据，车牌: ${number}，模式：${modeName}，车牌限制长度：${updatedKeyboard.numberLimitLength}`);
      // 将识别结果的车牌模式同步到用户选择模式上
      if (updatedKeyboard.numberType === Keyboard.NUM_TYPES.NEW_ENERGY) {
        this.userMode = Keyboard.NUM_TYPES.NEW_ENERGY;
      } else {
        this.userMode = Keyboard.NUM_TYPES.AUTO_DETECT;
      }
      this.syncInputLength(updatedKeyboard.numberType, (this.userMode === Keyboard.NUM_TYPES.NEW_ENERGY)/* force to set NewEnergy mode */);
      this.autocommitsinglekey(updatedKeyboard);
      return updatedKeyboard;
    },
    // 当键盘数据只有一个键位可选择时,自动提交点击事件:(武警车牌第二位J和使馆车最后一位)
    autocommitsinglekey(layout) {
      if (this.clickEventType === _ClickEvent.KEY) {
        const availableKeys = layout.keys.filter(k => k.enabled && !k.isFunKey);
        if (availableKeys.length === 1) {
          const self = this;
          setTimeout(() => { self.onTextKeyClick(availableKeys[0].text); }, 32);
        }
      }
    },
    // 如果当前为空车牌号码，自动提交第一位快捷省份汉字
    submitprovince(layout) {
      // 注意：如果是用户点击删除按钮，退回到第一位。则不自动提交第一位快捷省份汉字。
      // 注意：如果用户外部重新设置了空的车牌号码，则需要自动提交
      if (this.getNumber().length === 0 &&
            (this.clickEventType === _ClickEvent.KEY || this.isUserChangeNumber())) {
        const self = this;
        setTimeout(() => {
          if (self.selectedIndex === 0) { // 注意检查当自动提交省份时，输入框选中位置是否在第一位上
            self.onTextKeyClick(layout.shortcuts[0].text);
          }
        }, 32);
      }
    },
  },
  components: {
    'number-view': require('./components/NumberView.vue'),
    'keyboard-view': require('./components/KeyboardView.vue'),
  },
};

// ////// 以下是工具类函数

// 将车牌号码，生成一个车牌字符数组
function _rebuildNumberArray(updateNumber, originLength) {
  const output = ['', '', '', '', '', '', '']; // 普通车牌长度为7位，最大长度为8位
  if (originLength > 7) {
    output.push('');
  }
  if (updateNumber != undefined && updateNumber.length != 0) {
    const size = Math.min(8, updateNumber.length);
    for (let i = 0; i < size; i++) {
      output[i] = updateNumber.charAt(i);
    }
  }
  return output;
}

function _isEnergyNumber(number) {
  return /\W[A-Z][0-9DF][0-9A-Z]\d{3}[0-9DF]/.test(number);
}

</script>

<style global>
@import "./css/keyboard.css";
/* 输入框的高度，占比为 20% */
div#input-widget {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    height: 20%;
    text-align: center;
    justify-content: center;
    background: #ffffff;
}
/* 键盘框的高度，占比为 80% */
div#divider {
    height: 3%;
}
div#keyboard-pad{
    height: 77%;
}
</style>

<style scoped>
div#rid-m-201708101425 {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    text-align: center;
    font-family: "PingFangSC-Regular", "Helvetica Neue", Arial, sans-serif;
}
</style>