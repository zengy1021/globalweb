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
  return request('/api/global/art/pageList', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
/** 获取文章分类列表 */
export async function getTypeList(options?: { [key: string]: any }) {
  return request('/api/global/art/element/list', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 新增文章分类 */
export async function addType(data?: any, options?: { [key: string]: any }) {
  return request('/api/global/art/element', {
    method: 'POST',
    data: data,
    ...(options || {}),
  });
}
/** 更新文章分类 */
export async function updateType(data?: any, options?: { [key: string]: any }) {
  return request('/api/global/art/element', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}
/** 删除文章分类 */
export async function removeType(data?: any, options?: { [key: string]: any }) {
  return request('/api/global/art/element', {
    method: 'DELETE',
    data: data,
    ...(options || {}),
  });
}

/** 获取文章详情 */
export async function getItem(params: any, options?: { [key: string]: any }) {
  return request('/api/global/content', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
/** 新增文章 */
export async function addItem(data?: any, options?: { [key: string]: any }) {
  return request('/api/global/art', {
    method: 'POST',
    data: data,
    ...(options || {}),
  });
}
/** 更新文章 */
export async function updateItem(data?: any, options?: { [key: string]: any }) {
  return request('/api/global/art', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}
/** 删除文章 */
export async function removeItem(data?: any, options?: { [key: string]: any }) {
  return request('/api/global/art', {
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
