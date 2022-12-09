import style from './index.less';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { Image, MenuProps } from 'antd';
import { Dropdown, Space, Avatar } from 'antd';
// import { useState } from 'react';
import { history, useModel } from 'umi';
import { outLogin } from '@/services/ant-design-pro/api';
import { stringify } from 'querystring';

const items: MenuProps['items'] = [
  {
    label: '修改密码',
    key: '1',
  },
  {
    label: '退出',
    key: '2',
  },
];
/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  await outLogin();
  const { query = {}, search, pathname } = history.location;
  const { redirect } = query;
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
};
const HeaderBox: React.FC = (props: any) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const currentUser: any = initialState?.currentUser || {};
  // useEffect(() => {
  //   console.log('initialState', currentUser);
  //   setCurrentUser({ currentUser, ...initialState?.currentUser });
  // }, []);
  const onClick: MenuProps['onClick'] = ({ key }) => {
    // message.info(`Click on item ${key}`);
    console.log(key);
    if (key == '2') {
      setInitialState((s) => ({ ...s, currentUser: { name: '' } }));
      loginOut();
    }
  };

  return (
    <div className={style.header_box}>
      <div className={style.header_left_box}>{props.leftTitle ? props.leftTitle : ''}</div>
      <div className={style.header_right_box}>
        {props.children ? (
          props.children
        ) : (
          <Dropdown menu={{ items, onClick }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <div className={style.userInfo}>
                <div className={style.userImg}>
                  {currentUser.photo ? (
                    <Image width={'100%'} height={'100%'} src={currentUser.photo} preview={false} />
                  ) : (
                    <Avatar size={32} icon={<UserOutlined />} />
                  )}
                </div>
                <div className={style.userName}>{currentUser.name}</div>
                <div className={style.arrow_icon}>
                  <Space>
                    <DownOutlined size={14} style={{ color: '#888888' }} />
                  </Space>
                </div>
              </div>
            </a>
          </Dropdown>
        )}
      </div>
    </div>
  );
};
export default HeaderBox;
