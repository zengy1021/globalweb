// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
/** 获取分组列表 GET /api/global/content/content */
export async function getList(options?: { [key: string]: any }) {
  return request('/api/global/content/content/list', {
    method: 'GET',
    // headers: {
    // Authorization: token,
    // },
    ...(options || {}),
  });
}

/** 新增分组 DELETE /api/global/content */
export async function addItem(data?: any, options?: { [key: string]: any }) {
  return request('/api/global/content/content', {
    method: 'POST',
    data: data,
    ...(options || {}),
  });
}
/** 更新分组 DELETE /api/global/content */
export async function updateItem(data?: any, options?: { [key: string]: any }) {
  return request('/api/global/content/content', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}

/** 删除分组 DELETE /api/global/content */
export async function deleteItem(data?: any, options?: { [key: string]: any }) {
  return request('/api/global/content', {
    method: 'DELETE',
    data: data,
    ...(options || {}),
  });
}
