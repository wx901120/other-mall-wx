
import store from '@/store';

export default {
  data() {
    return {
      memberCenterResult: {},
      memberCenterData: {},
      memberCard: '',
      uid: 0,
      msgNum: 0,
      couponsCount: 0,
      cardArr: {},
    };
  },
  // async created() {
  //   console.log('created');
  //   if (!store.state.memberCenterData) {
  //     await store.dispatch('getMemberCenterAction');
  //     console.log('getMemberCenterAction');
  //   }
  //   this.memberCenterData = store.state.memberCenterData.result.info;
  //   this.memberCard = store.state.memberCenterData.result.cardimg;
  // },
  methods: {
    async getMemberCenterData({ refresh = false } = {}) {
      console.log('mixin created');
      if (!store.state.memberCenterData || refresh) {
        await store.dispatch('getMemberCenterAction');
        console.log('getMemberCenterAction');
      }
      this.memberCenterResult = store.state.memberCenterData.result;
      this.memberCenterData = store.state.memberCenterData.result.info;
      this.memberCard = store.state.memberCenterData.result.cardimg;
      this.msgNum = store.state.memberCenterData.result.msgNum;
      this.couponsCount = store.state.memberCenterData.result.couponsCount;
      this.uid = store.state.memberCenterData.uid;
      this.cardArr = store.state.memberCenterData.result.cardArr;
    },
  },
};
