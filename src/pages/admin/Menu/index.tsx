import PageLayout from '@/components/PageLayout';
import style from './index.less';
import { message, Tabs } from 'antd';
import TabContent from './components/TabContent';
import { useState, useEffect } from 'react';
import { requestFooterCommon, requestHeaderCommon, requestHeaderMain, update } from './api';
const defaultTabList = [
  {
    name: '导航首页',
    id: '1',
    content: '',
  },
  {
    name: '导航通用',
    id: '2',
    content: '',
  },
  {
    name: '底部',
    id: '3',
    content: '',
  },
];

const MenuPage = () => {
  const [tabList, setTabList] = useState<any>([]);
  useEffect(() => {
    requestData();
  }, []);
  const requestData = async () => {
    await getHeaderMain();
    await getHeaderCommon();
    await getFooterCommon();
  };
  const getHeaderMain = async () => {
    let res = await requestHeaderMain();
    if (res.code == 200) {
      tabList[0] = res.data;
      setTabList([...tabList]);
    }
  };
  const getHeaderCommon = async () => {
    let res = await requestHeaderCommon();
    if (res.code == 200) {
      tabList[1] = res.data;
      setTabList([...tabList]);
    }
  };
  const getFooterCommon = async () => {
    let res = await requestFooterCommon();
    if (res.code == 200) {
      tabList[2] = res.data;
      setTabList([...tabList]);
    }
  };
  const changeValue = async (code: any, tabObj: any) => {
    console.log('保存');
    console.log('code', code);
    console.log('tabObj', tabObj);
    let cloneList = JSON.parse(JSON.stringify(tabList));
    const currentItem = cloneList.filter((fItem: any) => fItem.id == tabObj.id)[0];
    if (currentItem) {
      currentItem.content = code;
    }
    setTabList([...cloneList]);
    let res = await update({ id: tabObj.id, content: code });
    if (res.code == 200) {
      message.success('保存成功');
    }
  };
  const onChange = (key: string) => {
    console.log(key);
  };
  const items = tabList.map((_, i) => {
    return {
      label: _.name,
      key: _.id,
      children: <TabContent value={_.content} tabObj={_} changeValue={changeValue} />,
    };
  });

  return (
    <div>
      <PageLayout>
        <div className={style.page_content}>
          <Tabs onChange={onChange} type="card" items={items} />
        </div>
      </PageLayout>
    </div>
  );
};
export default MenuPage;
