import DrawerBox from '@/components/Drawer';
import ModalBox from '@/components/Modal';
import PageLayout from '@/components/PageLayout';
import { Button, Form, Input, message } from 'antd';
import CompBox from './components/CompBox';
import style from './index.less';
import { useEffect, useState } from 'react';
import Detail from './components/Detail';
import { NamePath } from 'antd/lib/form/interface';
import { addItem, deleteComponent, deleteItem, getList, updateComponent, updateItem } from './api';
interface DrawerProps {
  show: boolean; // 显示||收起
  width?: number; //宽度
  placement?: string; //抽屉的方向  top | right | bottom | left
  mask?: boolean; // 是否展示蒙层
  maskClosable?: boolean; //点击蒙层是否关闭
  children?: any;
  data?: any;
}
const defaultDrawerObj: DrawerProps = {
  show: false,
  data: {},
};

interface ModalProps {
  show: boolean; //展示|隐藏
  width?: number; // 弹窗宽度
  children?: any; //插槽内容
  title: any; // 标题
  data?: any; //编辑数据
  type?: number; //弹窗类型 1：表单 2：删除
  message?: string; // 自定义弹窗内容
  footer?: any;
  btn?: boolean;
}
const defaultModalObj: ModalProps = {
  show: false,
  title: '',
  width: 440,
  type: 2,
  data: {},
  footer: false,
  btn: true,
  message: '',
};
let formatList: any = [];
const Components = () => {
  // 组件滑窗数据
  const [drawerObj, setDrawerObj] = useState(defaultDrawerObj);
  // 分组弹窗数据
  const [modalObj, setModalObj] = useState(defaultModalObj);
  const [form] = Form.useForm();
  // 页面组件显示数据
  const [comps, setComps] = useState<any>([]);

  useEffect(() => {
    requestData();
  }, []);
  useEffect(() => {
    // 页面变化时获取浏览器窗口的大小
    window.addEventListener('resize', resizeUpdate);
    resizeUpdate();
    return () => {
      // 组件销毁时移除监听事件
      window.removeEventListener('resize', resizeUpdate);
    };
  }, []);

  const resizeUpdate = () => {
    // 通过事件对象获取浏览器窗口的高度 添加空数据 调整样式布局
    let w = window.innerWidth;
    w = w - 220 - 40 - 70;
    let colNum = Math.floor(w / 260) || 1;
    // 删除数据中的空数据 准备重新排列
    let newList = JSON.parse(JSON.stringify(formatList));
    newList.forEach((item: any) => {
      if (item.components) {
        for (let i = item.components.length - 1; i >= 0; i--) {
          if (!item.components[i].componentId) {
            item.components.splice(i, 1);
          }
        }
      }
    });
    // 重新排列 添加空数据
    let list = JSON.parse(JSON.stringify(newList));
    list.forEach((item: any) => {
      if (item.components) {
        if (item.components.length > 0 && item.components.length % colNum != 0) {
          const lineRow = colNum - (item.components.length % colNum);
          if (lineRow > 0) {
            for (let i = 1; i <= lineRow; i++) {
              item.components.push({});
            }
          }
        }
      }
    });
    formatList = list;
    setComps([...list]);
  };
  const requestData = async () => {
    const res = await getList();
    if (res.code == 200) {
      // console.log(res.data);
      // setComps([]);
      formatList = res.data;
      await setComps([...res.data]);
      await resizeUpdate();
    }
  };
  // 组件滑窗事件
  const doClick = (record?: any) => {
    // console.log(record);
    setDrawerObj({ ...drawerObj, show: true, data: record || {} });
  };
  const closeDrawer = async () => {
    await setDrawerObj({ ...drawerObj, show: false, data: {} });
    requestData();
  };
  // 分类弹窗事件
  const addType = (type: number | string, comp?: any) => {
    form.setFieldValue('name', comp?.name || '');
    let title = '';
    if (type == 1) {
      title = '分组名称';
    }
    if (type == 2) {
      title = '组件名称';
    }
    if (comp?.componentName || comp?.elementName) {
      form.setFieldValue('name', comp?.componentName || comp?.elementName);
    }
    setModalObj({ ...modalObj, show: true, type: 1, title, data: comp || {} });
  };
  const closeModal = () => {
    setModalObj({ ...modalObj, show: false, data: {} });
  };
  const modalSave = async () => {
    // 弹窗保存事件
    // 校验表单必填项
    if (modalObj.type == 1) {
      form.validateFields().then(async (nameList: NamePath[]) => {
        // 校验通过 获取表单对象
        if (!modalObj.data?.componentId && !modalObj.data?.elementId) {
          // 新增 1分类
          const result = await addItem(nameList);
          if (result.code == 200) {
            message.success('新增分类成功');
            await requestData();
            closeModal();
            return;
          }
        } else if (modalObj.data?.elementId && !modalObj.data?.componentId) {
          // 重命名  1分类
          const result = await updateItem({ ...nameList, id: modalObj.data?.elementId });
          if (result.code == 200) {
            message.success('更新分类成功');
            await requestData();
            closeModal();
            return;
          }
        } else if (modalObj.data?.elementId && modalObj.data?.componentId) {
          // 2组件重命名
          const result = await updateComponent({
            ...nameList,
            id: modalObj.data?.componentId,
            elementName: modalObj.data?.elementName,
          });
          if (result.code == 200) {
            message.success('更新组件成功');
            await requestData();
            closeModal();
            return;
          }
        }

        // let currentComp: any;
        // if (modalObj.data.elementId) {
        //   const newList = JSON.parse(JSON.stringify(comps));
        //   // 组件分类
        //   const typeObj = newList.filter(
        //     (fItem: any) => fItem.elementId == modalObj.data.elementId,
        //   )[0];
        //   console.log('typeObj', typeObj);

        //   currentComp =
        //     typeObj.components.filter(
        //       (tItem: any) => tItem.componentId == modalObj.data.componentId,
        //     )[0] || {};
        //   if (currentComp) {
        //     console.log(currentComp, newList);
        //     currentComp.componentName = nameList['componentName'];
        //     setComps([...newList]);
        //   }
        // } else if (modalObj.data.elementId) {
        //   const newList = JSON.parse(JSON.stringify(comps));
        //   // 组件分类
        //   currentComp = newList.filter((fItem: any) => fItem.elementId == modalObj.data.elementId)[0];
        //   currentComp.componentName = nameList['componentName'];
        //   setComps([...newList]);
        // }
      });
    } else if (modalObj.type == 2) {
      if (modalObj.data?.componentId) {
        //组件删除
        const res = await deleteComponent({
          id: modalObj.data.componentId,
        });
        if (res.code == 200) {
          message.success('删除成功');
          await requestData();
          closeModal();
        }
      } else {
        // 分类删除
        const res = await deleteItem({
          id: modalObj.data.elementId,
        });
        if (res.code == 200) {
          message.success('删除成功');
          await requestData();
          closeModal();
        }
      }
    }
  };
  const openEdit = (comp: any, type?: string) => {
    console.log('组件编辑', comp, type);
    if (type == 'name') {
      addType(comp.componentId ? 2 : 1, comp);
    } else if (type == 'remove') {
      // 删除
      setModalObj({
        ...modalObj,
        show: true,
        title: '删除',
        type: 2,
        message: '确认删除？',
        data: comp || {},
      });
    } else {
      doClick(comp);
    }
  };
  return (
    <div>
      {/* 内容区域 */}
      <PageLayout>
        <div className={style.component_content}>
          <div className={style.header_box}>
            <div className={style.header_left_title}>组件</div>
            <div className={style.header_right_btn}>
              <Button type="default" className={style.header_right_item} onClick={() => addType(1)}>
                添加分组
              </Button>
              <Button type="primary" className={style.header_right_item} onClick={() => doClick()}>
                添加组件
              </Button>
            </div>
          </div>
          {/* 组件内容区域 */}
          <div className={style.content_box}>
            <CompBox list={comps} openEdit={openEdit}></CompBox>
          </div>
        </div>
      </PageLayout>
      {/* 滑窗区域 */}
      <DrawerBox show={drawerObj.show}>
        <Detail closeDrawer={closeDrawer} data={drawerObj.data} />
      </DrawerBox>
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
export default Components;
