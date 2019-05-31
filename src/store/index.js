import Vue from 'vue';
import Vuex from 'vuex';
import * as service from '@/api/service';
import { MessageBox } from 'mint-ui';

Vue.use(Vuex);
Vue.component(MessageBox.name, MessageBox);

const store = new Vuex.Store({
  state: {
    skip: false,

    showQRCode: true,

    bid: '',

    title: '',

    memberCenterData: null,
  },
  getters: {
    skip: state => state.skip,
  },
  actions: {
    async getMemberCenterAction({ commit }) {
      const data = await service.memberCenter({});
      // if(data.result.memberStatus == 'FROZEN'){
      //   MessageBox({
      //     message: '会员已冻结',
      //     closeOnClickModal: false,
      //   })
      // }
      data.result.cardimg = `http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/article/${data.result.cardimg}`;
      return new Promise((resolve) => {
        commit('setMemberCenterData', data);
        console.log('memberData:', data);
        return resolve();
      });
    },
  },
  mutations: {
    switchSkip(state, b) {
      state.skip = b;
    },
    switchQRCode(state, b) {
      state.showQRCode = b;
    },
    setMemberCenterData(state, memberCenterData) {
      state.memberCenterData = memberCenterData;
    },
    setBid(state, bid) {
      if (bid) {
        state.bid = window.parseInt(bid);
      }
    },

    setTitle(state, title) {
      console.log('setTitle', title);
      if (title) {
        state.title = title;
      }
    }
  },
});

export default store;
