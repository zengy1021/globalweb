import PageLayout from '@/components/PageLayout';
import { Button } from 'antd';
import style from './index.less';
import { history } from 'umi';
import Detail from './components/Detail';
import { useState } from 'react';
import htmlComp from './components/Detail/htmlJson';
const defaultTemplateObj = {
  id: 'templateId',
  name: '模板名称',
  children: [
    // {
    //   id: 'a',
    //   name: '组件一号',
    //   pId: '1',
    //   content: htmlComp,
    // },
    // {
    //   id: 'b',
    //   name: '组件二号',
    //   pId: '1',
    //   content: htmlComp,
    // },
  ],
};
export default function preview() {
  const [templateObj, setTemplateObj] = useState(defaultTemplateObj);
  const cancel = () => {
    history.push('/admin/template');
  };
  const save = () => {
    console.log('save', templateObj);
  };
  const compChange = (compInfo: any) => {
    console.log('选择的组件', compInfo);
    // 添加到模板内容中
    let newChildren = JSON.parse(JSON.stringify(templateObj.children)) || [];
    newChildren.push(compInfo);
    setTemplateObj({ ...templateObj, children: newChildren });
    // setTemplateObj({ ...templateObj, ...tempateInfo });
  };
  const childrenChange = (newChildren: any) => {
    console.log('childrenChange', newChildren);

    setTemplateObj({ ...templateObj, children: newChildren });
  };
  return (
    <div>
      {/* 内容区域 */}
      <PageLayout>
        <div className={style.component_content}>
          <div className={style.header_box}>
            <div className={style.header_left_title}>{templateObj.name || ''}</div>
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
              templateObj={templateObj}
              childrenChange={childrenChange}
            />
          </div>
        </div>
      </PageLayout>
    </div>
  );
}
