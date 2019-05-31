export default {
  created() {
    this.$nextTick(() => {
      const {
        clientHeight,
      } = document.documentElement;
      const {
        top,
      } = this.$refs.list.getBoundingClientRect();
      this.listHeight = clientHeight - top;
    });
  },

  data() {
    return {
      listHeight: 0,
    };
  },
};
