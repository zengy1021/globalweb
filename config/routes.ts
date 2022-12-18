export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: '登录',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  // ##########管理--start
  {
    path: '/admin',
    name: '管理',
    icon: 'icon-xianxing_shezhi_1',
    // hideInBreadcrumb: true, // 在面包屑中隐藏
    // access: 'canAdmin',
    routes: [
      {
        path: '/admin/user',
        name: '用户',
        icon: 'smile',
        component: './admin/User',
      },
      {
        path: '/admin/component',
        name: '组件',
        icon: 'smile',
        component: './admin/Components',
      },
      {
        path: '/admin/component/preview/:id',
        name: 'preview',
        icon: 'smile',
        hideInMenu: true,
        component: './admin/Components/preview',
      },
      {
        path: '/admin/template',
        name: '模板',
        icon: 'smile',
        component: './admin/Templates',
      },
      {
        path: '/admin/template/preview/:id',
        name: 'preview',
        icon: 'smile',
        hideInMenu: true,
        component: './admin/Templates/TemplateEdit',
      },
      {
        path: '/admin/menu',
        name: '菜单',
        icon: 'smile',
        component: './admin/Menu',
      },
      {
        path: '/admin/type',
        name: '分组',
        icon: 'smile',
        component: './admin/Types',
      },
      {
        path: '/admin/approve',
        name: '审批',
        icon: 'smile',
        component: './admin/Approve',
      },
      {
        component: './404',
      },
    ],
  },
  // ##########管理--end
  // ##########内容--start
  {
    path: '/content',
    name: '内容',
    icon: 'icon-xianxing_caidan_2',
    // access: 'canAdmin',
    routes: [
      {
        path: '/content/6869DBF26F',
        name: 'Product',
        icon: '',
        component: './content',
      },
      {
        path: '/content/209D26BA96',
        name: 'Solutions',
        icon: '',
        component: './content',
      },
      {
        path: '/content/18E0AD8D07',
        name: 'Pricing',
        icon: '',
        component: './content',
      },
      {
        path: '/content/7D8D8C2726',
        name: 'Services',
        icon: '',
        component: './content',
      },
      {
        path: '/content/72CA99C8A2',
        name: 'Resources',
        icon: '',
        component: './content',
      },

      {
        hideInMenu: true,
        path: '/content/:path/edit/:id',
        name: 'Edit',
        icon: '',
        component: './content/ContentEdit',
      },
      // {
      //   path: '/content/edit/:path',
      //   name: 'Product',
      //   icon: '',
      //   hideInMenu: true,
      //   component: './content/ContentEdit',
      // },
      {
        component: './404',
      },
    ],
  },
  // ##########内容--end

  // ##########功能--start
  {
    path: '/other',
    name: '功能',
    icon: 'icon-xianxing_biaoqian',
    // access: 'canAdmin',
    routes: [
      {
        path: '/other/other',
        name: '功能',
        icon: 'smile',
        component: './other/Other',
      },
      {
        path: '/other/content',
        name: '内容',
        icon: 'smile',
        component: './other/Content',
      },
      {
        component: './404',
      },
    ],
  },
  // ##########功能--end
  // ##########文章--start
  {
    path: '/article',
    name: '文章',
    icon: 'icon-xianxing_tishiyu_1',
    // access: 'canAdmin',
    routes: [
      {
        path: '/article/list',
        name: '列表',
        icon: '',
        component: './article/ArticleList',
      },
      {
        component: './404',
      },
    ],
  },
  // ##########文章--end
  {
    path: '/previewContent',
    layout: false,
    component: './preview',
  },
  {
    path: '/',
    component: './Welcome',
  },
  {
    component: './404',
  },
];
// 后台数据增加菜单，此处也必须得添加菜单
