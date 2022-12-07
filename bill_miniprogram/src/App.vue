<script>
export default {
  globalData() {
    return {
      systemInfo: {},
      // 获取状态栏高度
      statusBarHeight: 0,
      menuBtn: {},
    };
  },
  onLaunch: function () {},
  onShow: function () {},
  onHide: function () {},
  created() {
    this.getSystemInfoSync();
    this.getMenuButtonBoundingClientRect();
  },
  methods: {
    // 获取系统信息
    getSystemInfoSync() {
      uni.getSystemInfoAsync({
        success: (res) => {
          // this.globalData.statusBarHeight = res.statusBarHeight;
          // this.globalData.systemInfo = res;
          console.log(this.statusBarHeight);
        },
        fail: (err) => {
          console.log(err);
        },
      });
    },
    // 获取右上角胶囊信息
    getMenuButtonBoundingClientRect() {
      // console.log(this.globalData.systemInfo);
      // let res = uni.getMenuButtonBoundingClientRect();
      // this.globalData.menuButton = res;
    },
  },
};
</script>

<style></style>
