import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "el-icon-house" }
      }
    ]
  },
  {
    name: "userAcl",
    path: "/useracl",
    component: Layout,
    // redirect: "/acl/user/list",
    meta: {
      title: "用户权限管理",
      icon: "el-icon-lock"
    },
    children: [
      {
        path: "/useracl/user",
        name: "user",
        component: () => import("@/views/userAcl/user"),
        meta: { title: "用户列表", icon: "el-icon-user" }
      },
      {
        path: "/useracl/acl",
        name: "user",
        component: () => import("@/views/userAcl/acl"),
        meta: { title: "权限管理", icon: "el-icon-warning-outline" }
      },
      {
        path: "/useracl/role",
        name: "user",
        component: () => import("@/views/userAcl/role"),
        meta: { title: "角色管理", icon: "el-icon-view" }
      }
    ]
  },
  {
    name: "billManage",
    path: "/billmanage",
    component: Layout,
    // redirect: "/acl/user/list",
    meta: {
      title: "账单管理",
      icon: "el-icon-edit-outline"
    },
    children: [
      {
        path: "/billmanage/paybill",
        name: "payBill",
        component: () => import("@/views/billManage/payBill"),
        meta: { title: "支出账单", icon: "el-icon-edit" }
      },
      {
        path: "/billmanage/monthbill",
        name: "monthBill",
        component: () => import("@/views/billManage/monthBill"),
        meta: { title: "月度账单", icon: "el-icon-tickets" }
      },
      {
        path: "/billmanage/room",
        name: "room",
        component: () => import("@/views/billManage/room"),
        meta: { title: "租房记录", icon: "el-icon-office-building" }
      },
      {
        path: "/billmanage/salary",
        name: "salary",
        component: () => import("@/views/billManage/salary"),
        meta: { title: "工资收入", icon: "el-icon-coin" }
      },
      {
        path: "/billmanage/sideline",
        name: "sideline",
        component: () => import("@/views/billManage/sideline"),
        meta: { title: "副业收入", icon: "el-icon-sell" }
      }
    ]
  },
  {
    name: "font",
    path: "/font",
    component: Layout,
    // redirect: "/acl/user/list",
    meta: {
      title: "前台功能控制",
      icon: "el-icon-monitor"
    },
    children: []
  },
  {
    name: "mobile",
    path: "/mobile",
    component: Layout,
    // redirect: "/acl/user/list",
    meta: {
      title: "移动端功能控制",
      icon: "el-icon-mobile-phone"
    },
    children: []
  },
  {
    name: "setting",
    path: "/setting",
    component: Layout,
    // redirect: "/acl/user/list",
    meta: {
      title: "系统设置",
      icon: "el-icon-setting"
    },
    children: []
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
