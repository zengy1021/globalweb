// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
/** 获取模板列表 */
export async function getList(
  params: {
    // query
    /** 当前的页码 */
    pageNum?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/api/global/template/pageList', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 新增模板 POST */
export async function addItem(data?: any, options?: { [key: string]: any }) {
  return request('/api/global/template', {
    method: 'POST',
    data: data,
    ...(options || {}),
  });
}
/** 更新模板名称 DELETE */
export async function updateItemName(data?: any, options?: { [key: string]: any }) {
  return request('/api/global/template', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}
/** 更新模板 DELETE */
export async function updateItem(data?: any, options?: { [key: string]: any }) {
  return request('/api/global/template/deep', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}

/** 删除模板 DELETE  */
export async function deleteItem(data?: any, options?: { [key: string]: any }) {
  return request('/api/global/template', {
    method: 'DELETE',
    data: data,
    ...(options || {}),
  });
}

/** 查询模板详情 GET */
export async function getTemplate(
  params: { templateId: string },
  options?: { [key: string]: any },
) {
  return request(`/api/global/template`, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
