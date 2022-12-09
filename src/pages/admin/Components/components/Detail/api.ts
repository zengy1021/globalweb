// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
/** 获取组件列表 */
export async function getElements(options?: { [key: string]: any }) {
  return request('/api/global/component/elements', {
    method: 'GET',
    ...(options || {}),
  });
}
