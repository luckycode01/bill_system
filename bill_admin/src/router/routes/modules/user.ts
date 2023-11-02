import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const user: AppRouteModule = {
  path: '/user-manager',
  name: 'user-manager',
  component: LAYOUT,
  redirect: '/user-manager/userlist',
  meta: {
    hideChildrenInMenu: false,
    orderNo: 11,
    icon: 'icon-park-outline:permissions',
    title: t('routes.user.acl'),
  },
  children: [
    {
      path: 'users',
      name: 'Users',
      component: () => import('/@/views/userManager/user/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.user.user'),
      },
    },
    {
      path: 'roles',
      name: 'Roles',
      component: () => import('/@/views/userManager/role/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.user.role'),
      },
    },
    {
      path: 'permission',
      name: 'Permission',
      component: () => import('/@/views/userManager/permission/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.user.permission'),
      },
    },
  ],
};

export default user;
