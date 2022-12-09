// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
/** 获取用户列表 GET /api/sys/user/list */
export async function userList(
  params: {
    // query
    /** 当前的页码 */
    pageNum?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/api/sys/user/list', {
    method: 'GET',
    // headers: {
    // Authorization: token,
    // },
    params,
    ...(options || {}),
  });
}
/** 获取用户详情 GET /api/sys/user */
export async function userInfo(
  params: {
    // query
    /** 用户id */
    userId?: string;
  },
  options?: { [key: string]: any },
) {
  return request('/api/sys/menu/authMenu', {
    method: 'GET',
    // headers: {
    // Authorization: token,
    // },
    params,
    ...(options || {}),
  });
}

/** 新增用户 DELETE /api/sys/user */
export async function addUser(data?: any, options?: { [key: string]: any }) {
  return request('/api/sys/user', {
    method: 'POST',
    data: data,
    ...(options || {}),
  });
}
/** 更新用户 DELETE /api/sys/user */
export async function updateUser(data?: any, options?: { [key: string]: any }) {
  return request('/api/sys/user', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}

/** 删除用户 DELETE /api/sys/user */
export async function removeUser(data?: any, options?: { [key: string]: any }) {
  return request('/api/sys/user', {
    method: 'DELETE',
    data: data,
    ...(options || {}),
  });
}
/** 用户密码重置 GET /api/sys/user/password/reset */

export async function resetPassword(
  params: {
    // query
    /** 当前的页码 */
    username?: string;
  },
  options?: { [key: string]: any },
) {
  return request('/api/sys/user/password/reset', {
    method: 'GET',
    // headers: {
    // Authorization: token,
    // },
    params,
    ...(options || {}),
  });
}
