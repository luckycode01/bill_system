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
        // 是否有分页
        const page = document.querySelector('.el-pagination');
        const cardDom = document.querySelector('.el-card');
        this.tableHeight = cardDom.offsetHeight - (this.defaultHeight || 130);
        if (page) {
          this.tableHeight = this.tableHeight - 50;
        }

      })
    },
  }
};