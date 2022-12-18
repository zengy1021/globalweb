// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
// const defaultProxy = process.env.NODE_ENV == 'development' ? '/api' : '';
const defaultProxy = process.env.NODE_ENV == 'development' ? '/api' : '/owm';

/** 获取分组列表 GET /api/global/content/content */
export async function getList(options?: { [key: string]: any }) {
  return request(defaultProxy + '/global/content/content/list', {
    method: 'GET',
    // headers: {
    // Authorization: token,
    // },
    ...(options || {}),
  });
}

/** 新增分组 DELETEdefaultProxy+ /global/content */
export async function addItem(data?: any, options?: { [key: string]: any }) {
  return request(defaultProxy + '/global/content/content', {
    method: 'POST',
    data: data,
    ...(options || {}),
  });
}
/** 更新分组 DELETEdefaultProxy+ /global/content */
export async function updateItem(data?: any, options?: { [key: string]: any }) {
  return request(defaultProxy + '/global/content/content', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}

/** 删除分组 DELETEdefaultProxy+ /global/content */
export async function deleteItem(data?: any, options?: { [key: string]: any }) {
  return request(defaultProxy + '/global/content', {
    method: 'DELETE',
    data: data,
    ...(options || {}),
  });
}
