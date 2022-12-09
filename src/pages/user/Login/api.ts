import { request } from 'umi';
// import qs from 'qs';
/** 获取当前的用户 GET /api/menu/auth */
export async function getUserInfo(options?: { [key: string]: any }) {
  return request('/api/menu/auth', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request('/api/sys/login', {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'appl',
    // },
    data: body,
    ...(options || {}),
  });
}
