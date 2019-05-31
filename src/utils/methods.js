/* 全局方法 */
import Vue from 'vue';

function back(router) {
  router.go(-1);
}

function parseFloat(num) {
  console.log('hello world');
  return window.parseFloat(num.toFixed(2));
  // return 
}

Vue.prototype.$back = back;
Vue.prototype.$parseFloat = parseFloat;