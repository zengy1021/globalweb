// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
// const defaultProxy = process.env.NODE_ENV == 'development' ? '/api' : '';
const defaultProxy = process.env.NODE_ENV == 'development' ? '/api' : '/owm';

/** 获取导航首页 GETdefaultProxy+ /global/component/menu/header-main */
export async function requestHeaderMain(options?: { [key: string]: any }) {
  return request(defaultProxy + '/global/component/menu/header-main', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 获取导航通用 GETdefaultProxy+ /global/component/menu/header-common */
export async function requestHeaderCommon(options?: { [key: string]: any }) {
  return request(defaultProxy + '/global/component/menu/header-common', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 获取底部 GETdefaultProxy+ /global/component/menu/footer */
export async function requestFooterCommon(options?: { [key: string]: any }) {
  return request(defaultProxy + '/global/component/menu/footer', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新用户 DELETEdefaultProxy+ /global/component */
export async function update(data?: any, options?: { [key: string]: any }) {
  return request(defaultProxy + '/global/component/menu ', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}
