import style from './index.less';
import { UserOutlined, DownOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Form, Image, Input, MenuProps, message } from 'antd';
import { Dropdown, Space, Avatar } from 'antd';
// import { useState } from 'react';
import { history, useModel } from 'umi';
import { outLogin } from '@/services/ant-design-pro/api';
import { stringify } from 'querystring';
import ModalBox from '../Modal';
import { useState } from 'react';
import { NamePath } from 'antd/lib/form/interface';
import { resetPassword } from './api';
interface ModalProps {
  show: boolean; //展示|隐藏
  width?: number; // 弹窗宽度
  children?: any; //插槽内容
  title: any; // 标题
  data?: any; //编辑数据
  type?: number; //弹窗类型 1：表单 2：删除
  message?: string; // 自定义弹窗内容
}
const defaultModalObj: ModalProps = {
  show: false,
  title: '更改面',
  width: 440,
  type: 1,
  data: {},
  message: '',
};
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
  const [form] = Form.useForm();
  const [modalObj, setModalObj] = useState(defaultModalObj);
  const { initialState, setInitialState } = useModel('@@initialState');
  const currentUser: any = initialState?.currentUser || {};
  // useEffect(() => {
  //   console.log('initialState', currentUser);
  //   setCurrentUser({ currentUser, ...initialState?.currentUser });
  // }, []);
  const onClick: MenuProps['onClick'] = ({ key }) => {
    // message.info(`Click on item ${key}`);
    console.log(key);
    if (key == '1') {
      // 修改密码弹窗
      form.setFieldValue('name', '');
      setModalObj({ ...modalObj, show: true, type: 1, data: {}, title: '修改密码' });
    }
    if (key == '2') {
      // 退出
      setInitialState((s) => ({ ...s, currentUser: { name: '' } }));
      loginOut();
    }
  };
  const closeModal = () => {
    setModalObj({ ...modalObj, show: false, data: {} });
  };
  const modalSave = async () => {
    // 弹窗保存事件
    // console.log('保存', modalObj);
    if (modalObj.type == 1) {
      form.validateFields().then(async (nameList: NamePath[]) => {
        const param = {
          userId: initialState?.currentUser.userId,
          username: initialState?.currentUser.username,
          password: nameList['name'],
        };
        const res = await resetPassword(param);
        if (res.code == 200) {
          message.success('修改成功');
          setModalObj({ ...modalObj, show: false, data: {} });
        }
      });
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
      {/* 弹窗区域 */}
      <ModalBox
        show={modalObj.show}
        title={modalObj.title}
        width={modalObj.width}
        close={() => closeModal()}
        save={modalSave}
      >
        {modalObj.type == 1 ? (
          <Form
            form={form}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
            size={'large'}
            scrollToFirstError={true}
            requiredMark={false}
            validateMessages={{ required: '${label}不能为空' }}
          >
            <Form.Item
              label="新密码"
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password
                placeholder="请输入密码"
                iconRender={(visible) => (visible ? <EyeInvisibleOutlined /> : <EyeOutlined />)}
              />
            </Form.Item>
          </Form>
        ) : (
          <div>{modalObj.message}</div>
        )}
      </ModalBox>
    </div>
  );
};
export default HeaderBox;
