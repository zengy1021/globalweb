// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
/** 获取内容审批列表 GET /api/global/content/audit/list */
export async function getList(params: any, options?: { [key: string]: any }) {
  return request('/api/global/content/audit/list', {
    method: 'GET',
    // headers: {
    // Authorization: token,
    // },
    params,
    ...(options || {}),
  });
}
/** 内容审批通过 */
export async function approvePass(params: any, options?: { [key: string]: any }) {
  return request('/api/global/content/pass', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
/** 内容审批驳回 */
export async function approveReject(params: any, options?: { [key: string]: any }) {
  return request('/api/global/content/reject', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
