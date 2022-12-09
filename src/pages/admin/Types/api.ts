// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
/** 获取分组列表 GET /api/global/group/pageList */
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
  return request('/api/global/group/pageList', {
    method: 'GET',
    // headers: {
    // Authorization: token,
    // },
    params,
    ...(options || {}),
  });
}

/** 新增分组 DELETE /api/global/group */
export async function addType(data?: any, options?: { [key: string]: any }) {
  return request('/api/global/group', {
    method: 'POST',
    data: data,
    ...(options || {}),
  });
}
/** 更新分组 DELETE /api/global/group */
export async function updateType(data?: any, options?: { [key: string]: any }) {
  return request('/api/global/group', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}

/** 删除分组 DELETE /api/global/component */
export async function deleteType(data?: any, options?: { [key: string]: any }) {
  return request('/api/global/group', {
    method: 'DELETE',
    data: data,
    ...(options || {}),
  });
}
