import { request } from 'umi';
// import qs from 'qs';
/** 获取当前的用户 GETdefaultProxy+ /menu/auth */
// const defaultProxy = process.env.NODE_ENV == 'development' ? '/api' : '';
const defaultProxy = process.env.NODE_ENV == 'development' ? '/api' : '/owm';

export async function getUserInfo(options?: { [key: string]: any }) {
  return request(defaultProxy + '/menu/auth', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POSTdefaultProxy+ /login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>(defaultProxy + '/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POSTdefaultProxy+ /login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request(defaultProxy + '/sys/login', {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'appl',
    // },
    data: body,
    ...(options || {}),
  });
}
