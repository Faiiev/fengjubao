import Frame from '@views/partials/Frame'
import { $utils } from '@helper'

export default [
  {
    path: '/backstage',
    component: Frame,
    fullpath: 'backstage',
    // isHideInMenu: true,
    meta: {
      title: $utils.titleLang('后台管理', 'backstage Moudle')
    },
    children: [
      {
        path: 'accounts',
        fullpath: '/backstage/accounts',
        isHideInMenu: false,
        meta: {
          title: $utils.titleLang('帐号管理', 'Account Management'),
          ignoreAuth: true
        },
        component: resolve => require(['@views/account/List'], resolve)
      },
      {
        path: 'employees',
        fullpath: '/backstage/employees',
        meta: {
          title: $utils.titleLang('员工管理', 'Employee Management'),
          ignoreAuth: true
        },
        component: resolve => require(['@views/employee/List'], resolve)
      },
      {
        path: 'statistics',
        fullpath: '/backstage/statistics',
        meta: {
          title: $utils.titleLang('计件统计', 'Record Statistics'),
          ignoreAuth: true
        },
        component: resolve => require(['@views/statistics/List'], resolve)
      },
      {
        path: 'analysis',
        fullpath: '/backstage/analysis',
        meta: {
          title: $utils.titleLang('数据分析', 'Data Analysis'),
          ignoreAuth: true
        },
        component: resolve => require(['@views/analysis/List'], resolve)
      },
      {
        path: 'returnAndCollarRecord',
        fullpath: '/backstage/returnAndCollarRecord',
        isHideInMenu: false,
        meta: {
          title: $utils.titleLang('还领卡记录', 'Return And Collar Record'),
          ignoreAuth: true
        },
        component: resolve => require(['@views/returnAndCollarRecord/List'], resolve)
      },
      {
        path: 'qualityInspectionLabel',
        fullpath: '/backstage/qualityInspectionLabel',
        isHideInMenu: false,
        meta: {
          title: $utils.titleLang('质检标签', 'qualityInspectionLabel'),
          ignoreAuth: true
        },
        component: resolve => require(['@views/qualityInspectionLabel/List'], resolve)
      }
    ]
  }
]
