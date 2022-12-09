// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
/** 获取导航首页 GET /api/global/component/menu/header-main */
export async function requestHeaderMain(options?: { [key: string]: any }) {
  return request('/api/global/component/menu/header-main', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 获取导航通用 GET /api/global/component/menu/header-common */
export async function requestHeaderCommon(options?: { [key: string]: any }) {
  return request('/api/global/component/menu/header-common', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 获取底部 GET /api/global/component/menu/footer */
export async function requestFooterCommon(options?: { [key: string]: any }) {
  return request('/api/global/component/menu/footer', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新用户 DELETE /api/global/component */
export async function update(data?: any, options?: { [key: string]: any }) {
  return request('/api/global/component', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}
