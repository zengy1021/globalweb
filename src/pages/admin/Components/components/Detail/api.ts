// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
// const defaultProxy = process.env.NODE_ENV == 'development' ? '/api' : '';
const defaultProxy = process.env.NODE_ENV == 'development' ? '/api' : '/owm';

/** 获取组件列表 */
export async function getElements(options?: { [key: string]: any }) {
  return request(defaultProxy + '/global/component/elements', {
    method: 'GET',
    ...(options || {}),
  });
}
