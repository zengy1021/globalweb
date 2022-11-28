import PageLayout from '@/components/PageLayout';
import { Button } from 'antd';
import style from './index.less';
import { history } from 'umi';
import Detail from './components/Detail';
import { useState } from 'react';

export default function preview() {
  const [compObj, setCompObj] = useState({});
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
            <div className={style.header_left_title}>{compObj.name}</div>
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
            <Detail compChange={compChange} />
          </div>
        </div>
      </PageLayout>
    </div>
  );
}
