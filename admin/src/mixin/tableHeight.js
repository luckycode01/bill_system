export default {
  data() {
    return {
      tableHeight: 0,
    }
  },
  mounted() {
    this.resetHeight();
    window.addEventListener('resize', this.resetHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.resetHeight)
  },
  methods: {
    resetHeight() {
      this.$nextTick(() => {
        const cardDom = document.querySelector('.el-card');
        this.tableHeight = cardDom.offsetHeight - 180;
      })
    },
  }
};