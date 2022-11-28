import DrawerBox from '@/components/Drawer';
import ModalBox from '@/components/Modal';
import PageLayout from '@/components/PageLayout';
import { Button, Form, Input } from 'antd';
import CompBox from './components/CompBox';
import style from './index.less';
import { useEffect, useState } from 'react';
import Detail from './components/Detail';
import { NamePath } from 'antd/lib/form/interface';
let list = [
  {
    typeId: 1,
    name: '分组1',
    children: [
      {
        id: 'a',
        name: '组件1',
        pId: 1,
        bgImg:
          'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
        contente: '',
      },
      {
        id: 'a1',
        name: '组件1',
        pId: 1,
        bgImg:
          'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
        contente: '',
      },
      {
        id: 'a2',
        name: '组件1',
        pId: 1,
        bgImg:
          'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
        contente: '',
      },
      {
        id: 'a3',
        name: '组件1',
        pId: 1,
        bgImg:
          'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
        contente: '',
      },
      {
        id: 'a4',
        name: '组件1',
        pId: 1,
        bgImg:
          'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
        contente: '',
      },
    ],
  },
  {
    typeId: 2,
    name: '分组2',
    children: [],
  },
];
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
  type?: number | string; // 弹窗类型
  data?: any;
}
const defaultModalObj: ModalProps = {
  show: false,
  title: '组件分组',
  width: 440,
  data: {},
};
const Components = () => {
  // 组件滑窗数据
  const [drawerObj, setDrawerObj] = useState(defaultDrawerObj);
  // 分组弹窗数据
  const [modalObj, setModalObj] = useState(defaultModalObj);
  const [form] = Form.useForm();
  // 页面组件显示数据
  const [comps, setComps] = useState(list);

  const resizeUpdate = () => {
    // 通过事件对象获取浏览器窗口的高度 添加空数据 调整样式布局
    let w = window.innerWidth;
    w = w - 220 - 40 - 70;
    let colNum = Math.floor(w / 260) || 1;
    // 删除数据中的空数据 准备重新排列
    let newList = JSON.parse(JSON.stringify(list));
    newList.forEach((item: any) => {
      for (let i = item.children.length - 1; i >= 0; i--) {
        if (!item.children[i].id) {
          item.children.splice(i, 1);
        }
      }
    });
    // 重新排列 添加空数据
    list = JSON.parse(JSON.stringify(newList));
    list.forEach((item: any) => {
      if (item.children.length > 0) {
        const lineRow = colNum - (item.children.length % colNum);
        if (lineRow > 0) {
          for (let i = 1; i <= lineRow; i++) {
            item.children.push({});
          }
        }
      }
    });
    setComps([...list]);
  };
  useEffect(() => {
    // 页面变化时获取浏览器窗口的大小
    window.addEventListener('resize', resizeUpdate);
    resizeUpdate();
    return () => {
      // 组件销毁时移除监听事件
      window.removeEventListener('resize', resizeUpdate);
    };
  }, []);
  // 组件滑窗事件
  const doClick = (record?: any) => {
    // console.log(record);
    setDrawerObj({ ...drawerObj, show: true, data: record?.data || {} });
  };
  const closeDrawer = () => {
    setDrawerObj({ ...drawerObj, show: false, data: {} });
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
    setModalObj({ ...modalObj, show: true, title, data: comp || {} });
  };
  const closeModal = () => {
    setModalObj({ ...modalObj, show: false, data: {} });
  };
  const modalSave = () => {
    // 弹窗保存事件
    // 校验表单必填项
    form.validateFields().then((nameList: NamePath[]) => {
      // 校验通过 获取表单对象
      console.log(nameList, modalObj);
      let currentComp: any;
      if (modalObj.data.pId) {
        const newList = JSON.parse(JSON.stringify(list));
        // 组件分类
        const typeObj = newList.filter((fItem: any) => fItem.typeId == modalObj.data.pId)[0];
        console.log('typeObj', typeObj);

        currentComp =
          typeObj.children.filter((tItem: any) => tItem.id == modalObj.data.id)[0] || {};
        if (currentComp) {
          console.log(currentComp, newList);
          currentComp.name = nameList['name'];
          setComps([...newList]);
        }
      } else if (modalObj.data.typeId) {
        const newList = JSON.parse(JSON.stringify(list));
        // 组件分类
        currentComp = newList.filter((fItem: any) => fItem.typeId == modalObj.data.typeId)[0];
        currentComp.name = nameList['name'];
        setComps([...newList]);
      }

      closeModal();
    });
  };
  const openEdit = (comp: any, type?: string) => {
    console.log('组件编辑', comp);
    if (type == 'name') {
      addType(2, comp);
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
      </ModalBox>
    </div>
  );
};
export default Components;
