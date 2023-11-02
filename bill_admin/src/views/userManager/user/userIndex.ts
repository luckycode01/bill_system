import { useI18n } from '/@/hooks/web/useI18n';
const { t } = useI18n();
export const columns = [
  {
    title: t('routes.user.th.order'),
    dataIndex: 'index',
    className: '!text-center w-70px',
    slots: { customRender: 'index' },
  },
  {
    title: t('routes.user.th.uname'),
    dataIndex: 'username',
    className: '!text-center w-160px',
  },
  {
    title: t('routes.user.th.phone'),
    className: '!text-center w-160px',
    dataIndex: 'mobile',
  },
  {
    title: t('routes.user.th.email'),
    className: '!text-center w-200px',
    dataIndex: 'email',
  },
  {
    title: t('routes.user.th.role'),
    className: '!text-center',
    width: 100,
    dataIndex: 'roleNames',
  },
  {
    title: t('routes.user.th.state'),
    className: '!text-center ',
    dataIndex: 'state',
    width: '80px',
    slots: { customRender: 'state' },
  },
  {
    title: t('routes.user.th.createTime'),
    className: '!text-center ',
    dataIndex: 'createTime',
    width: '240px',
    slots: { customRender: 'createTime' },
  },
  {
    title: t('routes.user.th.operation'),
    className: '!text-center',
    dataIndex: 'operation',
    fixed: 'right',
    width: '140px',
    slots: { customRender: 'operation' },
  },
];
