// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
/** 修改密码 GET /api/sys/user/password/reset */

export async function resetPassword(data: any, options?: { [key: string]: any }) {
  return request('/api/sys/user/password', {
    method: 'PUT',
    // headers: {
    // Authorization: token,
    // },
    data,
    ...(options || {}),
  });
}
