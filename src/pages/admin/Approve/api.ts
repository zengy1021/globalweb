// @ts-ignore
/* eslint-disable */
const defaultProxy = process.env.NODE_ENV == 'development' ? '/api' : '/owm';

import { request } from 'umi';
/** 获取内容审批列表 GET defaultProxy/global/content/audit/list */
export async function getList(params: any, options?: { [key: string]: any }) {
  return request(defaultProxy + '/global/content/audit/list', {
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
  return request(defaultProxy + '/global/content/pass', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
/** 内容审批驳回 */
export async function approveReject(params: any, options?: { [key: string]: any }) {
  return request(defaultProxy + '/global/content/reject', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
/** 内容详情 */
export async function getComponentsData(params: any, options?: { [key: string]: any }) {
  return request(defaultProxy + '/global/content', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
/** 更新审批内容 */
export async function updateContent(data: any, options?: { [key: string]: any }) {
  return request(defaultProxy + '/global/content', {
    method: 'PUT',
    data,
    ...(options || {}),
  });
}
