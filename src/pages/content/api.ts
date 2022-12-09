// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
/** 获取内容列表 GET  */
export async function getList(
  params: {
    // query
    /** 当前的页码 */
    pageNum?: number;
    /** 页面的容量 */
    pageSize?: number;
    elementId?: string;
  },
  options?: { [key: string]: any },
) {
  return request('/api/global/content/pageList', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
/** 获取模板内容 */
export async function getTemplates(options?: { [key: string]: any }) {
  return request('/api/global/template/list', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 获取内容详情 */
export async function getContent(params: any, options?: { [key: string]: any }) {
  return request('/api/global/content', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
/** 新增内容 */
export async function addItem(data?: any, options?: { [key: string]: any }) {
  return request('/api/global/content', {
    method: 'POST',
    data: data,
    ...(options || {}),
  });
}
/** 更新内容 */
export async function updateItem(data?: any, options?: { [key: string]: any }) {
  return request('/api/global/content', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}
/** 更新内容 */
export async function updateItemDeep(data?: any, options?: { [key: string]: any }) {
  return request('/api/global/content/deep', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}

/** 删除内容 */
export async function removeItem(data?: any, options?: { [key: string]: any }) {
  return request('/api/global/content', {
    method: 'DELETE',
    data: data,
    ...(options || {}),
  });
}
/** 提交审核 */
export async function commitApprove(params: any, options?: { [key: string]: any }) {
  return request('/api/global/content/audit', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** resetData 内容回退 */
export async function resetItem(
  params: {
    // query
    contentId?: string;
  },
  options?: { [key: string]: any },
) {
  return request('/api/sys/user/password/reset', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
