import Vue from 'vue';
import VueQriously from 'vue-qriously';
import title from 'vue-wechat-title';
import { Toast, MessageBox ,Indicator, Popup, InfiniteScroll, Spinner, Lazyload, Swipe, SwipeItem } from 'mint-ui';
import {
  IMessageBox,
  ICell,
  IButton,
  IHeader,
  TheHeader,
  ITag,
  IField,
  MultiNumInput,
  MultiCheckBox,
} from '@/components/index.js';
import store from '@/store';
import 'amfe-flexible';
import '@/utils/filters';
import '@/utils/methods.js';
import '@/assets/style/iconfont.js';
import '@/assets/style/reset.css';
import * as filters from '@/filters/';
import router from '@/router';
import App from '@/App';
// import FastClick from 'fastclick';
// import jQuery from 'jquery';
import $ from 'jquery'
// import '../src/assets/js/jquery.min.js'
// 注册全局过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

// 添加全局的Indicator，Toast，MessageBox
Vue.prototype.$Indicator = Indicator;
Vue.prototype.$Toast = Toast;
Vue.prototype.$MessageBox = IMessageBox;

// 注册全局组件
Vue.component(IButton.name, IButton);
Vue.component(ICell.name, ICell);
Vue.component(IHeader.name, IHeader);
Vue.component(ITag.name, ITag);
Vue.component(Spinner.name, Spinner);
Vue.component(Popup.name, Popup);
Vue.component(MultiNumInput.name, MultiNumInput);
Vue.component(MultiCheckBox.name, MultiCheckBox);
Vue.component(TheHeader.name, TheHeader);
Vue.component(IField.name, IField);
Vue.use(title);
Vue.use(InfiniteScroll);
Vue.use(VueQriously);
Vue.use(Lazyload);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

// FastClick.attach(document.body);

const urlStr = 'http://woxmob.w-lans.com/mall_yinxiang/#/?bid=183&url=helloworld';
console.log('urlStr:', router.resolve(urlStr));

router.beforeEach(async (to, from, next) => {
  Indicator.open('努力加载中...');

  window.$from = from;

  const memberRegex = /^(member|integrationMall).*/g;
  // 注册时进入会员中心会请求会员中心接口，注册后需要更新会员中心接口
  if (memberRegex.test(to.name) && to.name !== 'memberRegister' && to.name !== 'memberBindingCard') {
    // 会员中心数据为空，则请求会员中心接口获取数据
    if (!store.state.memberCenterData || from.name === 'memberRegister' || from.name === 'memberBindingCard') {
      await store.dispatch('getMemberCenterAction');
    }


// 会员被冻结了，则跳转到会员注册页
    // if (store.state.memberCenterData.status == 'FROZEN') {
    //   Vue.prototype.$nextTick(() => {
    //     Toast('会员已冻结')
    //   });
    //   next({
    //     name: 'memberCenter',
    //     // replace: true,
    //     query: {
    //       bid: window.$bid,
    //     },
    //   });
    //   // Vue.prototype.$nextTick(() => {
    //   //   Indicator.close();
    //   // });
    //   return;
    // }

  // uid为0，则跳转到会员注册页
 if (!store.state.memberCenterData.uid) {
  next({
    name: 'memberRegister',
    // replace: true,
    query: {
      bid: window.$bid,
    },
  });
  Vue.prototype.$nextTick(() => {
    Indicator.close();
  });
  return;
}
}

  if (!to.query.bid) {
    console.log('没有bid', to.query.bid);
    next({
      path: to.path, // 改为to.name的话，就无法传递params了
      query: {
        bid: window.$bid,
      },
    });
  } else {
    console.log('有bid', to.query.bid);
    next();
  }



});

router.afterEach(() => {
  Vue.prototype.$nextTick(() => {
    Indicator.close();
  });
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store,
  components: { App },
});
