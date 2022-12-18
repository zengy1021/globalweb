import PageLayout from '@/components/PageLayout';
import { Button, message } from 'antd';
import style from './index.less';
import { history, useLocation, useParams } from 'umi';
import Detail from './components/Detail';
import { useEffect, useState } from 'react';
import { getList as getComponentsData } from '../../Components/api';
import htmlComp from './components/Detail/htmlJson';
import IconBtn from '@/components/IconBtn';
import { getTemplate, updateItem } from '../api';
export default function preview() {
  // let location = useLocation();
  const params: any = useParams();
  // const [searchParams, setSearchParams] = useSearchParams();
  const [templateObj, setTemplateObj] = useState<any>({});
  const [compsList, setCompsList] = useState<any>([]);
  useEffect(() => {
    requestData();
  }, [params]);
  const requestData = async () => {
    const res = await getComponentsData();
    if (res.code == 200) {
      console.log('getComponentsData', res);
      setCompsList([...res.data]);
    }
    const res2 = await getTemplate({
      templateId: params?.id,
    });
    if (res2.code == 200) {
      console.log(res2);
      setTemplateObj({ ...templateObj, ...res2.data });
    }
    // params?.id
  };
  const cancel = () => {
    history.push('/admin/template');
  };
  const save = async () => {
    // console.log('save', templateObj);
    const res = await updateItem(templateObj);
    if (res.code == 200) {
      message.success('更新成功');
      cancel();
    }
  };
  const compChange = (compInfo: any) => {
    // console.log('选择的组件', compInfo);
    // 添加到模板内容中
    let newChildren = JSON.parse(JSON.stringify(templateObj.components)) || [];
    newChildren.push(compInfo);
    setTemplateObj({ ...templateObj, components: newChildren });
    // setTemplateObj({ ...templateObj, ...tempateInfo });
  };
  const childrenChange = (newChildren: any) => {
    // console.log('childrenChange', newChildren);

    setTemplateObj({ ...templateObj, components: newChildren });
  };
  // 预览模板事件
  const previewBtn = () => {
    localStorage.setItem('previewData', JSON.stringify(templateObj.components) || '');
    // history.push('/#/previewContent');
    // window.open('https://apps.echatsoft.com:9443/cms/previewContent');
    window.open('https://apps.echatsoft.com:9443/cms/#/previewContent');
    // window.open('/previewContent');
  };
  return (
    <div>
      {/* 内容区域 */}
      <PageLayout>
        <div className={style.component_content}>
          <div className={style.header_box}>
            <div className={style.header_left_title}>
              {templateObj.templateName || ''}
              <div className={style.header_left_icon}>
                <IconBtn
                  handleClick={() => previewBtn()}
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
              templateObj={templateObj}
              childrenChange={childrenChange}
              compsList={compsList}
            />
          </div>
        </div>
      </PageLayout>
    </div>
  );
}
