import PageLayout from '@/components/PageLayout';
import style from './index.less';
import { Button, Form, Input, message, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import TabContent from './components/TabContent';
import ModalBox from '@/components/Modal';
import { useEffect, useState } from 'react';
import EmptyBox from '@/components/Empty';
import { addItem, deleteItem, getList, updateItem } from './api';
const defaultTabList = [] || [
  {
    name: '导航首页',
    id: '1',
    fileName: '',
    content: '代码',
  },
  {
    name: '导航通用',
    id: '2',
    fileName: '',
    content: '代码',
  },
  {
    name: '底部',
    id: '3',
    fileName: '',
    content: '代码',
  },
];
interface ModalProps {
  show: boolean; //展示|隐藏
  width?: number; // 弹窗宽度
  children?: any; //插槽内容
  title: any; // 标题
  data?: any; //编辑数据
  type?: number; //弹窗类型 1：表单 2：删除
  message?: string; // 自定义弹窗内容
}
const defaultModalObj: ModalProps = {
  show: false,
  title: '模板',
  width: 440,
  type: 1,
  data: {},
  message: '确认删除？',
};
const MenuPage = () => {
  const [form] = Form.useForm();
  const [modalObj, setModalObj] = useState(defaultModalObj);

  const [tabList, setTabList] = useState<any>(defaultTabList);
  useEffect(() => {
    requestData();
  }, []);
  const requestData = async () => {
    const res = await getList();
    if (res.code == 200) {
      // console.log(res);
      res.data.forEach((item: any) => {
        item.id = item.contentId;
        item.name = item.contentName;
        item.title = item.title;
        item.fileName = item.fileName;
        item.description = item.description;
        item.keywords = item.keywords.split(',') || [];
      });
      setTabList([...res.data]);
    }
  };
  const changeValue = async (obj: any, tabObj: any) => {
    // console.log('保存');
    // console.log('obj', obj);
    // console.log('tabObj', tabObj);
    const res = await updateItem({
      contentId: tabObj.id,
      contentName: obj.name,
      fileName: obj.fileName,
      content: obj.content,
      title: obj.title,
      description: obj.description,
      keywords: obj.keywords.join(','),
    });
    if (res.code == 200) {
      message.success('操作成功');
      requestData();
    }
    // let cloneList = JSON.parse(JSON.stringify(tabList));
    // const currentItem = cloneList.filter((fItem: any) => fItem.id == tabObj.id)[0];
    // if (currentItem) {
    //   Object.keys(obj).forEach((key: string) => {
    //     currentItem[key] = obj[key];
    //   });
    // }
    // console.log(cloneList);
    // setTabList([...cloneList]);
  };
  const onChange = (key: string) => {
    console.log(key);
  };
  const onEdit = (i: any, action: string) => {
    if (action == 'add') {
      // console.log('新增event:', i);
      // 打开新增弹窗
      addNew();
    } else {
      // console.log('删除targetKey:', i);
      // 删除二次确认
      const currentItem = tabList.filter((fItem: any) => fItem.contentId == i)[0];
      remove(currentItem);
    }
  };
  const items = tabList.map((_: any, i: any) => {
    return {
      label: <>{_.name}</>,
      key: _.id,
      // closable: false,
      children: <TabContent tabObj={_} changeValue={changeValue} />,
    };
  });

  const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
    <>
      <DefaultTabBar {...props} className="site-custom-tab-bar" />
    </>
  );
  // 弹窗事件
  const addNew = () => {
    setModalObj({ ...modalObj, show: true, title: '新增', type: 1, data: {} });
  };
  // const doClick = (record: any) => {
  //   // console.log(record);
  //   form.setFieldValue('name', record?.name || '');
  //   setModalObj({ ...modalObj, show: true, title: '分组', type: 1, data: record });
  // };
  const remove = (item: any) => {
    setModalObj({
      ...modalObj,
      show: true,
      title: '删除',
      type: 2,
      message: '确认删除？',
      data: item,
    });
  };
  const closeModal = () => {
    setModalObj({ ...modalObj, show: false, data: {} });
  };
  const modalSave = async () => {
    // 弹窗保存事件
    // console.log('保存', form.getFieldsValue());
    // console.log('保存2', modalObj);
    if (modalObj.type == 1) {
      //编辑 新增
      const result = await addItem({
        contentName: form.getFieldsValue().name,
      });
      if (result.code == 200) {
        message.success('新增成功');
      }
    } else if (modalObj.type == 2) {
      //删除
      const result = await deleteItem({
        contentId: modalObj.data.id,
      });
      if (result.code == 200) {
        message.success('删除成功');
      }
    }
    // 调用接口
    await closeModal();
    await requestData();
  };
  return (
    <div>
      <PageLayout>
        <div className={style.page_content}>
          {items.length ? (
            <Tabs
              type="editable-card"
              renderTabBar={renderTabBar}
              onChange={onChange}
              onEdit={onEdit}
              items={items}
            />
          ) : (
            <EmptyBox>
              <Button
                type="primary"
                onClick={() => addNew()}
                style={{ width: '120px', height: '40px', borderRadius: '6px', marginTop: '30px' }}
              >
                添加页面
              </Button>
            </EmptyBox>
          )}
        </div>
      </PageLayout>
      {/* 弹窗区域 */}
      <ModalBox {...modalObj} close={() => closeModal()} save={modalSave}>
        {modalObj.type == 1 ? (
          <Form
            form={form}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
            size={'large'}
            scrollToFirstError={true}
            requiredMark={false}
            validateMessages={{ required: '${label}不能为空' }}
          >
            <Form.Item
              label="名称"
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        ) : (
          <div>{modalObj.message}</div>
        )}
      </ModalBox>
    </div>
  );
};
export default MenuPage;
