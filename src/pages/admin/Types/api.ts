// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
// const defaultProxy = process.env.NODE_ENV == 'development' ? '/api' : '';
const defaultProxy = process.env.NODE_ENV == 'development' ? '/api' : '/owm';

/** 获取分组列表 GETdefaultProxy+ /global/group/pageList */
export async function getTypeList(
  params: {
    // query
    /** 当前的页码 */
    pageNum?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request(defaultProxy + '/global/group/pageList', {
    method: 'GET',
    // headers: {
    // Authorization: token,
    // },
    params,
    ...(options || {}),
  });
}

/** 新增分组 DELETEdefaultProxy+ /global/group */
export async function addType(data?: any, options?: { [key: string]: any }) {
  return request(defaultProxy + '/global/group', {
    method: 'POST',
    data: data,
    ...(options || {}),
  });
}
/** 更新分组 DELETEdefaultProxy+ /global/group */
export async function updateType(data?: any, options?: { [key: string]: any }) {
  return request(defaultProxy + '/global/group', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}

/** 删除分组 DELETEdefaultProxy+ /global/component */
export async function deleteType(data?: any, options?: { [key: string]: any }) {
  return request(defaultProxy + '/global/group', {
    method: 'DELETE',
    data: data,
    ...(options || {}),
  });
}
