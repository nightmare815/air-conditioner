import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {title: 'Dashboard', icon: 'dashboard'},
      hidden: true
    }]
  },

  {
    path: '/status',
    component: Layout,
    redirect: '/status/index',
    name: 'status',
    meta: {
      title: '状态管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/status/index'), // Parent router-view
        name: '状态管理首页',
        meta: {
          title: '首页',
          icon: 'dashboard'
        },
        hidden: true
      },
      // {
      //   path: 'overview',
      //   component: () => import('@/views/airport/index'), // Parent router-view
      //   name: 'air-overview',
      //   meta: {
      //     title: '机场概览',
      //     icon: 'dashboard'
      //   },
      // },
      // {
      //   path: 'station',
      //   component: () => import('@/views/airport/station/index'), // Parent router-view
      //   name: 'station',
      //   meta: {
      //     title: '廊道',
      //     icon: 'dashboard'
      //   },
      //   alwaysShow: true,
      //   children: [
      //     {
      //       path: 'overview',
      //       component: () => import('@/views/airport/station/index'), // Parent router-view
      //       name: 'station-overview',
      //       meta: {
      //         title: '廊道概览',
      //         icon: 'dashboard'
      //       },
      //     },
      //     {
      //       path: 'condition',
      //       component: () => import('@/views/airport/station/condition'),
      //       name: 'condition',
      //       meta: {
      //         title: '空调',
      //         icon: 'dashboard'
      //       },
      //       children: [
      //         {
      //           path: 'one',
      //           component: () => import('@/views/airport/station/condition/one/index'),
      //           name: 'air-one',
      //           meta: { title: '1号空调', icon: 'dashboard' }
      //         },
      //         {
      //           path: 'two',
      //           component: () => import('@/views/airport/station/condition/two/index'),
      //           name: 'air-two',
      //           meta: { title: '2号空调', icon: 'dashboard' }
      //         }
      //       ]
      //     }
      //   ]
      // }
    ]
  },

  {
    path: '/device',
    component: Layout,
    redirect: '/device/list',
    name: 'device',
    meta: {
      title: '设备管理',
      icon: 'nested'
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        component: () => import('@/views/device/list'), // Parent router-view
        name: 'deviceList',
        meta: {
          title: '设备列表',
          icon: 'dashboard'
        },
      },
      {
        path: 'add',
        component: () => import('@/views/device/add'), // Parent router-view
        name: 'addDevice',
        meta: {
          title: '添加设备',
          icon: 'dashboard'
        },
      },
      {
        path: 'gate',
        component: () => import('@/views/device/gate'), // Parent router-view
        name: 'gateState',
        meta: {
          title: '卷闸门',
          icon: 'dashboard'
        },
      },
    ]
  },

  {
    path: '/airport',
    component: Layout,
    redirect: '/airport/list',
    name: 'airport',
    meta: {
      title: '机场管理',
      icon: 'nested'
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        component: () => import('@/views/airport/list'), // Parent router-view
        name: 'airportList',
        meta: {
          title: '机场列表',
          icon: 'dashboard'
        },
      },
      {
        path: 'add',
        component: () => import('@/views/airport/add'), // Parent router-view
        name: '添加机场',
        meta: {
          title: '添加机场',
          icon: 'dashboard'
        },
      },
    ]
  },

  {
    path: '/station',
    component: Layout,
    redirect: '/station/list',
    name: 'station',
    meta: {
      title: '航站楼管理',
      icon: 'nested'
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        component: () => import('@/views/station/list'), // Parent router-view
        name: 'stationList',
        meta: {
          title: '航站楼列表',
          icon: 'dashboard'
        },
      },
      {
        path: 'add',
        component: () => import('@/views/station/add'), // Parent router-view
        name: 'addStation',
        meta: {
          title: '添加航站楼',
          icon: 'dashboard'
        },
      },
    ]
  },

  {
    path: '/condition',
    component: Layout,
    redirect: '/device/list',
    name: 'condition',
    meta: {
      title: '设备详情',
      icon: 'nested'
    },
    hidden: true,
    children: [
      {
        path: 'detail/:id',
        component: () => import('@/views/condition/index'), // Parent router-view
        name: 'detail',
        meta: {
          title: '设备状态',
          icon: 'dashboard'
        },
      }
    ]
  },

  {
    path: '/bridge',
    component: Layout,
    redirect: '/bridge/list',
    name: 'bridge',
    meta: {
      title: '登机桥管理',
      icon: 'nested'
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        component: () => import('@/views/bridge/list'), // Parent router-view
        name: 'bridgeList',
        meta: {
          title: '登机桥列表',
          icon: 'dashboard'
        },
      },
      {
        path: 'add',
        component: () => import('@/views/bridge/add'), // Parent router-view
        name: '添加登机桥',
        meta: {
          title: '添加登机桥',
          icon: 'dashboard'
        },
      },
    ]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: {title: 'Menu1'},
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: {title: 'Menu1-1'}
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: {title: 'Menu1-2'},
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: {title: 'Menu1-2-1'}
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: {title: 'Menu1-2-2'}
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: {title: 'Menu1-3'}
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: {title: 'menu2'}
  //     }
  //   ]
  // },
  //
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
