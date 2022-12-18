// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
// const defaultProxy = process.env.NODE_ENV == 'development' ? '/api' : '';
const defaultProxy = process.env.NODE_ENV == 'development' ? '/api' : '/owm';

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
  return request(defaultProxy + '/sys/user/list', {
    method: 'GET',
    // headers: {
    // Authorization: token,
    // },
    params,
    ...(options || {}),
  });
}
/** 获取用户详情 GETdefaultProxy+ /sys/user */
export async function userInfo(
  params: {
    // query
    /** 用户id */
    userId?: string;
  },
  options?: { [key: string]: any },
) {
  return request(defaultProxy + '/sys/menu/authMenu', {
    method: 'GET',
    // headers: {
    // Authorization: token,
    // },
    params,
    ...(options || {}),
  });
}

/** 新增用户 DELETEdefaultProxy+ /sys/user */
export async function addUser(data?: any, options?: { [key: string]: any }) {
  return request(defaultProxy + '/sys/user', {
    method: 'POST',
    data: data,
    ...(options || {}),
  });
}
/** 更新用户 DELETEdefaultProxy+ /sys/user */
export async function updateUser(data?: any, options?: { [key: string]: any }) {
  return request(defaultProxy + '/sys/user', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}

/** 删除用户 DELETEdefaultProxy+ /sys/user */
export async function removeUser(data?: any, options?: { [key: string]: any }) {
  return request(defaultProxy + '/sys/user', {
    method: 'DELETE',
    data: data,
    ...(options || {}),
  });
}
/** 用户密码重置 GETdefaultProxy+ /sys/user/password/reset */

export async function resetPassword(
  params: {
    // query
    /** 当前的页码 */
    username?: string;
  },
  options?: { [key: string]: any },
) {
  return request(defaultProxy + '/sys/user/password/reset', {
    method: 'GET',
    // headers: {
    // Authorization: token,
    // },
    params,
    ...(options || {}),
  });
}
