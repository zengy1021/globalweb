export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  // {
  //   path: '/welcome',
  //   name: 'welcome',
  //   icon: 'smile',
  //   component: './Welcome',
  // },
  // ##########管理--start
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    hideInBreadcrumb: true, // 在面包屑中隐藏
    // access: 'canAdmin',
    routes: [
      {
        path: '/admin/user',
        name: 'sub-page1',
        icon: 'smile',
        component: './admin/User',
      },
      {
        path: '/admin/component',
        name: 'sub-page2',
        icon: 'smile',
        component: './admin/Components',
      },
      {
        path: '/admin/component/preview',
        name: 'preview',
        icon: 'smile',
        hideInMenu: true,
        component: './admin/Components/preview',
      },
      {
        path: '/admin/template',
        name: 'sub-page3',
        icon: 'smile',
        component: './admin/Templates',
      },
      {
        path: '/admin/template/preview',
        name: 'preview',
        icon: 'smile',
        hideInMenu: true,
        component: './admin/Templates/TemplateEdit',
      },
      {
        path: '/admin/menu',
        name: 'sub-page4',
        icon: 'smile',
        component: './admin/Menu',
      },
      {
        path: '/admin/approve',
        name: 'sub-page5',
        icon: 'smile',
        component: './admin/Approve',
      },
      {
        component: './404',
      },
    ],
  },
  // ##########管理--end

  {
    path: '/content',
    name: 'content',
    icon: 'crown',
    // access: 'canAdmin',
    routes: [
      {
        path: '/content/product',
        name: 'sub-page1',
        icon: 'smile',
        component: './content/Product',
      },
      {
        path: '/content/solutions',
        name: 'sub-page2',
        icon: 'smile',
        component: './content/Solutions',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/other',
    name: 'other',
    icon: 'crown',
    // access: 'canAdmin',
    routes: [
      {
        path: '/other/other',
        name: 'other',
        icon: 'smile',
        component: './other/Other',
      },
      {
        path: '/other/solutions',
        name: 'content',
        icon: 'smile',
        component: './other/Content',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/article',
    name: 'article',
    icon: 'crown',
    // access: 'canAdmin',
    routes: [
      {
        path: '/article/list',
        name: 'article',
        icon: 'smile',
        component: './article/ArticleList',
      },
      {
        component: './404',
      },
    ],
  },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  {
    path: '/',
    component: './Welcome',
  },
  {
    component: './404',
  },
];
