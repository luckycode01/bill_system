<script>
export default {
  globalData: {
    systemInfo: {},
    // 获取状态栏高度
    statusBarHeight: 0,
    menuBtn: {},
  },
  onLaunch: function () {},
  onShow: function () {},
  onHide: function () {},
  created() {
    this.getSystemInfoSync();
    this.getMenuButtonRect();
  },
  methods: {
    // 获取系统信息
    getSystemInfoSync() {
      uni.getSystemInfoAsync({
        success: (res) => {
          this.globalData.statusBarHeight = res.statusBarHeight;
          this.globalData.systemInfo = res;
        },
        fail: (err) => {
          console.log(err);
        },
      });
    },
    // 获取右上角胶囊信息
    async getMenuButtonRect() {
      let res = await uni.getMenuButtonBoundingClientRect();
      this.globalData.menuBtn = res;
      console.log(this.globalData.menuBtn);
    },
  },
};
</script>

<style lang="scss">
@import "uview-ui/index.scss";
</style>
