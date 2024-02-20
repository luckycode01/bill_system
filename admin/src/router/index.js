import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/register",
    component: () => import("@/views/login/register"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/error/404"),
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/views/error/401"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "home",
    children: [
      {
        path: "home",
        component: () => import("@/views/index"),
        name: "home",
        meta: { title: "首页", icon: "home", affix: true },
      },
    ],
  },
  {
    path: "/system",
    component: Layout,
    // redirect: 'icon-list',
    meta: { title: "系统管理", icon: "setting", affix: false },
    children: [
      {
        path: "user-list",
        component: () => import("@/views/system/userManage/index"),
        name: "userManage",
        meta: { title: "用户管理", icon: "user-manage", affix: false },
      },
      {
        path: "role-list",
        component: () => import("@/views/system/roleManage/index"),
        name: "roleManage",
        meta: { title: "角色管理", icon: "roles", affix: false },
      },
      {
        path: "menu-list",
        component: () => import("@/views/system/menuManage/index"),
        name: "menuManage",
        meta: { title: "菜单管理", icon: "menu-manage", affix: false },
      },
      {
        path: "icon-list",
        component: () => import("@/views/system/iconManage/index"),
        name: "icon-list",
        meta: { title: "icon列表", icon: "category", affix: false },
      },
    ],
  },
  {
    path: "/bill-manage",
    component: Layout,
    meta: { title: "账单管理", icon: "bill", affix: false },
    children: [
      {
        path: "expend-list",
        component: () => import("@/views/billManage/expendList/index"),
        name: "expend-list",
        meta: { title: "支出管理", icon: "pay", affix: false },
      },
      {
        path: "income-list",
        component: () => import("@/views/billManage/incomeList/index"),
        name: "income-list",
        meta: { title: "收入管理", icon: "shouru", affix: false },
      },
      {
        path: "rent-list",
        component: () => import("@/views/billManage/rentList/index"),
        name: "rent-list",
        meta: { title: "房租管理", icon: "home", affix: false },
      },
      {
        path: "other-income",
        component: () => import("@/views/billManage/otherIncome/index"),
        name: "other-income",
        meta: { title: "其他收入", icon: "shouru", affix: false },
      },
      {
        path: "category",
        component: () => import("@/views/billManage/category/index"),
        name: "category",
        meta: { title: "分类管理", icon: "category", affix: false },
      },
    ],
  },
];

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [];

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;
let routerReplace = Router.prototype.replace;
// push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((err) => err);
};
// replace
Router.prototype.replace = function push(location) {
  return routerReplace.call(this, location).catch((err) => err);
};

export default new Router({
  mode: "hash", // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
});
