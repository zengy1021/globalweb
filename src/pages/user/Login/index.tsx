import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { history, useIntl, useModel } from 'umi';
import style from './index.less';
import { login } from './api';
// import { useState } from 'react';
const defaultUserInfo: any = {};
interface resProps {
  code: number;
  data: any;
  msg: string;
}
const Login = () => {
  const intl = useIntl();
  // const [userLoginState, setUserLoginState] = useState<any>({});
  const { initialState, setInitialState } = useModel('@@initialState');
  const [form] = Form.useForm();
  const fetchUserInfo = async (echatToken: any) => {
    const userInfoRes = await initialState?.fetchUserInfo?.(echatToken);
    if (userInfoRes) {
      await setInitialState((s) => ({
        ...s,
        token: echatToken,
        currentUser: userInfoRes.user,
        currentMenu: userInfoRes.menu,
      }));
    }
  };
  const finishLogin = async (values: any) => {
    try {
      // 登录
      const msg: resProps = await login({ ...values });
      if (msg.code === 200) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);
        // 设置token
        // await setInitialState((s) => ({
        //   ...s,
        //   token: msg.data,
        // }));
        localStorage.echatToken = msg.data;
        // 获取用户相关信息
        fetchUserInfo(msg.data);
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) {
          return;
        }

        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        // console.log('login:redirect', redirect);
        const goPath = redirect || '/';
        // console.log('login:goPath', goPath);
        setTimeout(async () => {
          await history.push(goPath);
        }, 500);
        return;
      } else {
        // message.error(msg.msg);
      }
      // // 如果失败去设置用户错误信息 ########################################
      // setUserLoginState(msg);
      // form.setFields('error')
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={style.login_content}>
      <div className={style.login_box}>
        <div className={style.login_left_box}>
          <div className={style.login_left_box_header}>
            <div className={style.login_left_box_header_logo}></div>
            <div className={style.login_left_box_header_line}></div>
            <div className={style.login_left_box_header_title}>一洽客服系统</div>
          </div>
          <div className={style.login_left_box_content}>
            <div className={style.login_left_box_content_title}>欢迎回来</div>
            <div className={style.login_left_box_content_text}>协同操作，高效管理一洽官网</div>
          </div>
        </div>
        <div className={style.login_right_box}>
          <div className={style.login_right_header}>
            <div className={style.login_right_header_title}>登录</div>
            <div className={style.login_right_header_dec}>一洽官网后台管理系统</div>
          </div>
          <div className={style.login_right_content}>
            <div className={style.login_right_from}>
              <Form
                form={form}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                layout="vertical"
                initialValues={defaultUserInfo}
                size={'large'}
                scrollToFirstError={true}
                requiredMark={false}
                onFinish={finishLogin}
                validateMessages={{ required: '${label}不能为空' }}
              >
                <Form.Item
                  label="账号"
                  name="username"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="请输入账号" />
                </Form.Item>
                {/* <IconBtn icon="icon-xianxing_jiankong_1" isBtn={true} /> */}
                {/* <EyeInvisibleOutlined /> */}
                <Form.Item
                  label="密码"
                  name="password"
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
                <Form.Item>
                  <Button
                    style={{ width: '100%', height: '40px', borderRadius: '6px' }}
                    type="primary"
                    htmlType="submit"
                  >
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div className={style.login_right_btn}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
