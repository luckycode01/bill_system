<template>
  <view class="content">
    <!--需要子元素撑大父元素高度的情况，才需要设置height-->
    <view class="bill_list flex flex-wrap relative">
      <view
        v-for="item in dataList"
        class="bill_item"
        :style="{ position: 'absolute', top: item.top, left: item.left }"
        bindtap="handleClickOption"
        :data-item="item"
      >
        <image :src="item.src" mode="widthFix" :lazy-load="true"> </image>
        <view class="bill_info">
          <view class="title g-t-over2">{{ item.title }}</view>
          <view class="">{{ item.name }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      dataList: [
        {
          id: 1,
          title: "消费一笔",
          detail: "每天记录消费情况",
          name: "user",
          avator: require("../../static/images/bill/logo.jpg"),
          src: require("../../static/images/bill/jl.png"),
        },
        {
          id: 2,
          title: "消费一览",
          detail: "数据分析管理，对数据分析使用图表展示消费数据",
          name: "user",
          avator: require("../../static/images/bill/logo.jpg"),
          src: require("../../static/images/bill/tubiao.png"),
        },
        {
          id: 3,
          title: "账单明细",
          detail: "查看支出以及收入详细信息",
          name: "user",
          avator: require("../../static/images/bill/logo.jpg"),
          src: require(".../../static/images/bill/mingxi.png"),
        },
        {
          id: 4,
          title: "收入记录",
          detail: "记录收入情况,工资收入、副业收入",
          name: "user",
          avator: require("../../static/images/bill/logo.jpg"),
          src: require("../../static/images/bill/shouru.png"),
        },
        {
          id: 5,
          title: "分类管理",
          detail: "消费分类管理移出或添加分类",
          name: "user",
          avator: require("../../static/images/bill/logo.jpg"),
          src: require("../../static/images/bill/category.png"),
        },
      ],
      data: {
        list: [],
        screenWidth: 10,
      },
    };
  },
  // 需要在节点加载到页面后调用
  onReady() {
    const { screenWidth, list } = this.data;
    this.waterFall(this, ".bill_item", {
      width: 375,
      gap: "auto",
    }).then((arr) => {
      if (!arr.length) return;
      this.dataList = this.dataList.map((item, index) => {
        arr[index].top = arr[index].top * 2 + "rpx";
        arr[index].left = arr[index].left * 2 + "rpx";
        arr[index].height = arr[index].height * 2 + "rpx";
        return {
          ...item,
          ...arr[index],
        };
      });
    });
  },

  methods: {
    getAllRect(context, selector) {
      return new Promise(function (resolve) {
        wx.createSelectorQuery()
          .in(context)
          .selectAll(selector)
          .boundingClientRect()
          .exec(function (rect) {
            console.log("rect", rect);
            if (rect === void 0) {
              rect = [];
            }
            return resolve(rect[0]);
          });
      });
    },
    /**
     * 瀑布流
     * @param {*} context 页面或组件this对象
     * @param {string} selector 选择器
     * @param {Object} options
     * @param {number=375} options.width 屏幕宽度
     * @param {number=2} options.column 列数
     * @param {number|string} options.gap 每列直接的间隙
     * @param {number=0} options.padding 整个列表左右的padding
     * @param {number=0}
     * @returns {Array} 计算每项的top、left、height的数组
     */

    async waterFall(context, selector, options = {}) {
      let items = await this.getAllRect(context, selector);
      console.log(items);
      if (items.length <= 0) return [];
      let {
        gap = 15,
        column = 2,
        padding = 0,
        width = 375,
        firstColumnToTop = 0,
      } = options;
      // 1- 确定列数  = 页面的宽度 / 图片的宽度，单例的宽度
      let itemWidth = items[0].width;
      // 定义每一列之间的间隙 px
      if (gap === "auto") {
        gap = (width - itemWidth * column) / (column - 1);
      }
      let _columnHeightArr = []; // 保存每列高度
      let result = [];

      for (let i = 0, len = items.length; i < len; i++) {
        if (i < column) {
          // 2- 确定第一行
          let top = firstColumnToTop;
          let left = (itemWidth + gap) * i + padding;
          // 瀑布流列表左右padding
          if (i === 0 || i === len - 1) {
            left = padding;
          }
          _columnHeightArr.push(items[i].height - top);
          result.push({
            top,
            left,
            height: items[i].height,
          });
        } else {
          // 其他行
          // 3- 找到数组中最小高度  和 它的索引
          let minHeight = Math.min(..._columnHeightArr);
          let minIndex = _columnHeightArr.findIndex(
            (item) => item === minHeight
          );
          // 4- 设置下一行的第一个盒子位置
          // top值就是最小列的高度 + gap
          result.push({
            top: _columnHeightArr[minIndex] + gap,
            left: result[minIndex].left,
            height: items[i].height,
          });

          // 5- 修改最小列的高度
          // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
          _columnHeightArr[minIndex] =
            _columnHeightArr[minIndex] + items[i].height;
        }
      }
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  position: absolute;
  top: 188rpx;
  bottom: 0px;
  padding-top: 4px;
  background-color: #eee;
  box-sizing: border-box;
  .bill_list {
    width: 100%;
    margin: auto;
    position: relative;
    .bill_item {
      width: 348rpx;
      box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
      border-radius: 4px;
      image {
        width: 100%;
      }
      .bill_info {
        width: 100%;
        .title {
          text-align: center;
          font-family: PingFangSC-Regular;
          text-align: center;
          box-sizing: border-box;
          padding: 18rpx 40rpx 0;
          font-size: 36rpx;
          line-height: 36rpx;
          font-weight: bold;
          color: #2b4167;
        }
      }
    }
  }
}
</style>
