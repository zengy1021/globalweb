import PageLayout from '@/components/PageLayout';
import { Button, message } from 'antd';
import style from './index.less';
import { history, useParams } from 'umi';
import Detail from './components/Detail';
import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { getList as getComponentsData } from '../../admin/Components/api';

import htmlComp from './components/Detail/htmlJson';
import IconBtn from '@/components/IconBtn';
import { getContent, updateItemDeep } from '../api';
export default function preview() {
  let params: any = useParams();
  const [contentObj, setContentObj] = useState<any>([]);
  const [compsData, setCompsData] = useState<any>([]);
  useEffect(() => {
    requestData();
  }, [params]);
  const requestData = async () => {
    const res = await getContent({
      contentId: params.id,
    });
    if (res.code == 200) {
      // console.log(res.data);
      setContentObj({ ...res.data });
    }
    const res2 = await getComponentsData();
    if (res2.code == 200) {
      console.log('getComponentsData', res2);
      setCompsData([...res2.data]);
    }
  };
  const cancel = () => {
    history.push(`/content/${params.path}`);
  };
  const save = async () => {
    console.log('save', contentObj);
    const res = await updateItemDeep({
      contentId: contentObj.id,
      components: contentObj.components,
    });
    if (res.code == 200) {
      message.success('更新成功');
      cancel();
    }
  };
  const compChange = (compInfo: any) => {
    console.log('选择的组件', compInfo);
    // 添加到模板内容中
    let newChildren = JSON.parse(JSON.stringify(contentObj.components)) || [];
    newChildren.push(compInfo);
    setContentObj({ ...contentObj, components: newChildren });
    // setTemplateObj({ ...templateObj, ...tempateInfo });
  };
  const childrenChange = (newChildren: any) => {
    console.log('childrenChange', newChildren);
    setContentObj({ ...contentObj, components: newChildren });
  };
  // 预览模板事件
  const previewContent = () => {
    console.log('contentObj', contentObj);
  };
  return (
    <div>
      {/* 内容区域 */}
      <PageLayout>
        <div className={style.component_content}>
          <div className={style.header_box}>
            <div className={style.header_left_title}>
              {contentObj.contentName || ''}
              <div className={style.header_left_icon}>
                <IconBtn
                  handleClick={() => previewContent()}
                  icon="icon-xianxing_jiankong_1"
                  isBtn
                  color="#888888"
                  size={'20px'}
                />
              </div>
            </div>
            <div className={style.header_right_btn}>
              <Button type="default" className={style.header_right_item} onClick={() => cancel()}>
                取消
              </Button>
              <Button type="primary" className={style.header_right_item} onClick={() => save()}>
                保存
              </Button>
            </div>
          </div>
          {/* 组件内容区域 */}
          <div className={style.content_box}>
            <Detail
              compChange={compChange}
              contentObj={contentObj}
              compsData={compsData}
              childrenChange={childrenChange}
            />
          </div>
        </div>
      </PageLayout>
    </div>
  );
}
