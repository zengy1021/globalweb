// import Footer from '@/components/Footer';
// import RightContent from '@/components/RightContent';
// import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import { recordKeyToString, Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import type { RequestInterceptor } from 'umi-request';
import { history, Link } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import Logo from '@/assets/imgs/echat_logo.png';
import { isFunction } from 'lodash';
import { response } from 'express';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

// 格式化菜单方法
const formatMenuList = (data: any) => {
  let menuList = [];
  // return new Promise((resolve, reject) => {
  // 管理页面 默认路由
  let adminDefaultList = [
    {
      path: '/admin/template/preview/:id',
      name: 'preview',
      icon: 'smile',
      hideInMenu: true,
      component: './admin/Templates/TemplateEdit',
    },
    {
      path: '/admin/component/preview/:id',
      name: 'preview',
      icon: 'smile',
      hideInMenu: true,
      component: './admin/Components/preview',
    },
    {
      component: './404',
    },
  ];
  if (data) {
    // debugger;
    menuList = data.map((item: any) => {
      const newItem = {
        path: item.menuRoute,
        name: item.menuName,
        icon: item.menuIcon,
        routes: item.children.map((child: any) => {
          return {
            path: child.menuRoute,
            name: child.menuName,
            icon: 'smile',
            component: child.menuHref,
          };
        }),
      };
      if (item.menuRoute == '/admin') {
        // 管理页面添加 子集路由
        newItem.routes = newItem.routes.concat(adminDefaultList);
      }
      if (item.menuRoute == '/content') {
        // 管理页面添加 子集路由
        // newItem.routes = newItem.routes.concat(previewList);
        newItem.routes = newItem.routes.concat([
          {
            path: '/content/:path/edit/:id',
            name: 'Product',
            icon: '',
            hideInMenu: true,
            component: './content/ContentEdit',
          },
        ]);
      }
      return newItem;
    });
    // 添加首页默认路由
    menuList = menuList.concat([
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
      {
        path: '/',
        component: './Welcome',
      },
      {
        // 预览页面
        path: '/previewContent',
        layout: false,
        component: './preview',
      },
      {
        component: './404',
      },
    ]);
    // console.log('menuList', menuList);
    // resolve(menuList);
  }
  return menuList;
};

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: any;
  currentMenu?: any;
  token?: any;
  loading?: boolean;
  fetchUserInfo?: (echatToken: any) => Promise<any | undefined>;
}> {
  const token = localStorage.echatToken;
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    let user;
    let menu;

    if (currentUser) {
      user = currentUser.user;
      menu = currentUser.menu;
    }
    return {
      token,
      fetchUserInfo,
      currentUser: user,
      currentMenu: menu,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    token,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    // iconfontUrl: '//at.alicdn.com/t/c/font_3774655_bl1pcrj8xik.js',
    iconfontUrl: require('@/assets/iconfont/iconfont'),
    // 禁止自动切换到移动页面
    disableMobile: true,
    // 定义内容样式
    contentStyle: {
      margin: 0,
    },
    siderWidth: 220,
    fixSiderbar: true,
    siderLinks: false,
    // rightContentRender: () => <div>123</div>,
    disableContentMargin: false,
    // 关闭展开收起菜单按钮
    collapsedButtonRender: false,
    // 水印
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name,
    // },
    // waterMarkProps: false,
    // footerRender: () => <Footer />,
    footerRender: false,
    headerRender: false,
    // pageTitleRender:()=><div>自定义页面头部组件</div>,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    // 左侧菜单头部设置 主要设置logo
    menuHeaderRender: () => (
      <a href="/">
        <img src={Logo} alt="" />
      </a>
    ),
    // menuDataRender: () => {
    //   let menuList;
    //   let adminDefaultList = [
    //     {
    //       path: '/admin/template/preview',
    //       name: 'preview',
    //       icon: 'smile',
    //       hideInMenu: true,
    //       component: './admin/Templates/TemplateEdit',
    //     },
    //     {
    //       path: '/admin/component/preview',
    //       name: 'preview',
    //       icon: 'smile',
    //       hideInMenu: true,
    //       component: './admin/Components/preview',
    //     },
    //     {
    //       component: './404',
    //     },
    //   ];
    //   if (initialState?.currentMenu) {
    //     // debugger;
    //     menuList = initialState?.currentMenu.map((item: any) => {
    //       const newItem = {
    //         path: item.menuRoute,
    //         name: item.menuName,
    //         icon: item.menuIcon,
    //         routes: item.children.map((child: any) => {
    //           return {
    //             path: child.menuRoute,
    //             name: child.menuName,
    //             icon: 'smile',
    //             component: child.menuHref,
    //           };
    //         }),
    //       };
    //       if (item.menuRoute == '/admin') {
    //         // 管理页面添加 子集路由
    //         newItem.routes = newItem.routes.concat(adminDefaultList);
    //       }
    //       if (item.menuRoute == '/content') {
    //         // 管理页面添加 子集路由
    //         // newItem.routes = newItem.routes.concat(previewList);
    //         newItem.routes = newItem.routes.concat([
    //           {
    //             path: '/content/edit/:path',
    //             name: 'Product',
    //             icon: '',
    //             hideInMenu: true,
    //             component: './content/ContentEdit',
    //           },
    //           {
    //             path: '/content/:id',
    //             name: 'Product',
    //             icon: '',
    //             hideInMenu: true,
    //             component: './content/List',
    //           },
    //         ]);
    //       }
    //       return newItem;
    //     });
    //     // 添加首页默认路由
    //     menuList = menuList.concat([
    //       {
    //         path: '/user',
    //         layout: false,
    //         routes: [
    //           {
    //             name: '登录',
    //             path: '/user/login',
    //             component: './user/Login',
    //           },
    //           {
    //             component: './404',
    //           },
    //         ],
    //       },
    //       {
    //         path: '/',
    //         component: './Welcome',
    //       },
    //       {
    //         component: './404',
    //       },
    //     ]);
    //     // resolve(menuList);
    //   }
    //   console.log('menuList', menuList);
    //   return menuList;
    // },
    menuDataRender: () => {
      return formatMenuList(initialState?.currentMenu);
    },
    menu: {
      locale: false,
      // request: async () => {
      //   let result = await formatMenuList(initialState?.currentMenu);
      //   return result;
      // },
    },
    // menuItemRender: (item: any, dom: any) => (
    //   <div
    //     style={{
    //       display: 'flex',
    //       alignItems: 'center',
    //       gap: 8,
    //     }}
    //   >
    //     <div className="menu_item_dot"></div> <span className="menu_item_span">{dom}</span>
    //   </div>
    // ),
    // subMenuItemRender: (item: any, dom: any) => (
    //   <div
    //     style={{
    //       display: 'flex',
    //       alignItems: 'center',
    //       gap: 8,
    //     }}
    //   >
    //     pre {dom}
    //   </div>
    // ),
    // 左侧菜单底部设置 主要设置 打开测试环境 按钮
    menuFooterRender: () => (
      <div style={{ textAlign: 'center', height: '48px', marginBottom: '40px' }}>
        <Button
          type="default"
          style={{
            width: '180px',
            height: '48px',
            borderRadius: '6px',
            background: ' #f2f5f9',
            borderColor: 'transparent',
          }}
        >
          打开测试环境
        </Button>
      </div>
    ),
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;

      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

const headerInfo: RequestInterceptor = (url: string, options: RequestInit) => {
  if (localStorage.getItem('echatToken')) {
    const token = `Bearer ` + localStorage.getItem('echatToken');
    // options.headers.Authorization = `Bearer ` + localStorage.getItem('token');
    options.headers = {
      ...options.headers,
      Authorization: token,
      lan: 'en', // 官网显示语言
      // 'Content-Type': 'application/json',
    };
  }
  return { url, options };
};
export const request: RequestConfig = {
  credentials: 'include',
  requestInterceptors: [headerInfo],
  responseInterceptors: [
    // 响应拦截公共配置
    async (response: any) => {
      const data = await response.clone().json();
      // console.log('response', response);
      // console.log('data', data);

      if (response.status == 200) {
        if (data.code != 200) {
          if (data.code == 401) {
            //
            message.error({
              content: '用户身份失效, 请重新登录',
            });
            history.push(loginPath);
          } else {
            message.error({
              content: data.msg,
            });
          }
        }
      } else {
        if (data.code == 401) {
          //
          message.error({
            content: '用户身份失效, 请重新登录',
          });
          history.push(loginPath);
        } else {
          message.error({
            content: data.msg,
          });
        }
        // return;
        return data;
      }
      return response;
    },
  ],
};
