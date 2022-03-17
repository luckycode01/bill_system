<template>
  <div>
    <div class="fn_bg">
      <ul class="f_nav clearfix">
        <li>
          <a href="javascript:;">
            <i class="iconfont icon-lianxi1"></i>
            <span>联系我们</span>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <i class="iconfont icon-guanzhuwomen"></i>
            <span>关注我们</span>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <i class="iconfont icon-yijianfenxiang"></i>
            <span>一键分享</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="bq">Copyright © 2022 永不言弃</div>
  </div>
</template>

<script>
export default {
  name: '',
}
</script>

<style lang="less" scoped>
.fn_bg {
  width: 100%;
  background: #232323;
  padding-top: 25px;
}
.fn_bg .f_nav {
  // width: 1170px;
  margin: 0px auto;
  text-align: center;
}
.fn_bg .f_nav li {
  display: inline-block;
  *display: inline;
  zoom: 1;
  height: 45px;
  line-height: 45px;
  margin: 0 28px 25px;
}
.fn_bg .f_nav li img {
  width: 45px;
  height: 45px;
  vertical-align: top;
}
.fn_bg .f_nav li span {
  display: inline-block;
  *display: inline;
  zoom: 1;
  height: 45px;
  line-height: 45px;
  vertical-align: top;
  font-size: 14px;
  color: #bebebe;
  font-weight: bold;
  margin-left: 10px;
}
.fn_bg .f_nav li a:hover span {
  color: #fff;
}

.fn_bg .f_nav li a:hover {
  text-decoration: none;
}
.bq {
  width: 100%;
  background: #131313;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 12px;
  color: #bebebe;
}
.bq a {
  color: #bebebe;
}
</style>
