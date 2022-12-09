import PageLayout from '@/components/PageLayout';
import { Button } from 'antd';
import style from './index.less';
import { history, useParams } from 'umi';
import Detail from './components/Detail';
import { useEffect, useState } from 'react';
import { getComponent, getList } from '../api';

export default function preview() {
  const params: any = useParams();
  const [compsList, setCompList] = useState<any>([]);
  const [compObj, setCompObj] = useState<any>({});
  useEffect(() => {
    requestData();
  }, [params]);
  const requestData = async () => {
    const res = await getList();
    if (res.code == 200) {
      // console.log('getComponentsData', res);
      setCompList([...res.data]);
    }
    const res2 = await getComponent({
      componentId: params?.id,
    });
    if (res2.code == 200) {
      // console.log(res2);
      setCompObj({
        ...compObj,
        componentName: res2.data.name,
        componentId: res2.data.id,
        componentContent: res2.data.content,
      });
    }
    // params?.id
  };
  const cancel = () => {
    history.push('/admin/component');
  };
  const compChange = (compInfo: any) => {
    setCompObj({ ...compObj, ...compInfo });
  };
  return (
    <div>
      {/* 内容区域 */}
      <PageLayout>
        <div className={style.component_content}>
          <div className={style.header_box}>
            <div className={style.header_left_title}>{compObj?.componentName || ''}</div>
            <div className={style.header_right_btn}>
              <Button type="default" className={style.header_right_item} onClick={() => cancel()}>
                返回
              </Button>
              {/* <Button type="primary" className={style.header_right_item} onClick={() => save()}>
                保存
              </Button> */}
            </div>
          </div>
          {/* 组件内容区域 */}
          <div className={style.content_box}>
            <Detail compChange={compChange} compsList={compsList} compObj={compObj} />
          </div>
        </div>
      </PageLayout>
    </div>
  );
}
