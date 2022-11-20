// import Footer from '@/components/Footer';
// import RightContent from '@/components/RightContent';
// import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import { Button } from 'antd';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
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
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    // 定义内容样式
    contentStyle:{
      margin:0
    },
    siderWidth: 220,
    fixSiderbar: true,
    siderLinks: false,
    rightContentRender: () => <div>123</div>,
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
    pageTitleRender:()=><div>自定义页面头部组件</div>,
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
        <img src="../echat_logo.png" alt="" />
      </a>
    ),
    // 左侧菜单底部设置 主要设置 打开测试环境 按钮
    menuFooterRender: () => (
      <div style={{ textAlign: 'center', height: '48px', marginBottom: '40px' }}>
        <Button
          type="default"
          style={{ width: '180px', height: '48px', borderRadius: '6px', background: ' #f2f5f9' }}
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
