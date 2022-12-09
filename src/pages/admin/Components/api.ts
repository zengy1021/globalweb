// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
/** 获取组件列表 */
export async function getList(options?: { [key: string]: any }) {
  return request('/api/global/component/element/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 新增组件类型 DELETE */
export async function addItem(data?: any, options?: { [key: string]: any }) {
  return request('/api/global/component/element', {
    method: 'POST',
    data: data,
    ...(options || {}),
  });
}
/** 更新组件类型 DELETE */
export async function updateItem(data?: any, options?: { [key: string]: any }) {
  return request('/api/global/component/element', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}

/** 删除组件类型 DELETE  */
export async function deleteItem(data?: any, options?: { [key: string]: any }) {
  return request('/api/global/component/element', {
    method: 'DELETE',
    data: data,
    ...(options || {}),
  });
}

/** 查询组件详情 GET */
export async function getComponent(
  params: { componentId: string },
  options?: { [key: string]: any },
) {
  return request(`/api/global/component`, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 新增组件 POST */
export async function addComponent(data?: any, options?: { [key: string]: any }) {
  return request('/api/global/component', {
    method: 'POST',
    data: data,
    ...(options || {}),
  });
}
/** 更新组件类型 DELETE */
export async function updateComponent(data?: any, options?: { [key: string]: any }) {
  return request('/api/global/component', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}

/** 删除组件类型 DELETE  */
export async function deleteComponent(data?: any, options?: { [key: string]: any }) {
  return request('/api/global/component', {
    method: 'DELETE',
    data: data,
    ...(options || {}),
  });
}
