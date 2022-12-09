// @ts-ignore
/* eslint-disable */
import { request, useModel } from 'umi';
// import request from 'umi-request';
// request拦截器, 改变url 或 options.
// request.interceptors.request.use((url, options) => {
//   let token = localStorage.getItem('echatToken');
//   if (null === token) {
//       token = '';
//   }
//   const authHeader = { Authorization: `Bearer ${token}` };
//   return {
//     url: url,
//     options: { ...options, interceptors: true, headers: authHeader },
//   };
// });
// const { initialState } = useModel('@@initialState');
// const { token } = initialState;
/** 获取当前的用户 GET /api/menu/auth */
export async function currentUser(options?: { [key: string]: any }) {
  return request('/api/sys/menu/auth', {
    method: 'GET',
    // headers: {
    // Authorization: token,
    // },
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/logout */
export async function outLogin(options?: { [key: string]: any }) {
  return request('/api/sys/logout', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login */
export async function login(body: any, options?: { [key: string]: any }) {
  return request('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 统一上传 POST /api/sys/file/upload*/
export async function upload(body: any, options?: { [key: string]: any }) {
  return request('/api/file/upload', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// /
