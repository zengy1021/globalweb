import PageLayout from '@/components/PageLayout';
import {
  Space,
  Table,
  Tag,
  Button,
  Avatar,
  Image,
  Form,
  Input,
  Dropdown,
  MenuProps,
  message,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import EmptyBox from '@/components/Empty';
import style from './index.less';
import IconBtn from '@/components/IconBtn';
import DrawerBox from '@/components/Drawer';
import { useState, useEffect } from 'react';
import Detail from './components/Detail';
import ModalBox from '@/components/Modal';
import moment from 'moment';
import { history } from 'umi';
import TableBox from '@/components/TableBox';
import { addItem, deleteItem, getList, updateItemName } from './api';
import { NamePath } from 'antd/lib/form/interface';
interface DataType {
  key: string;
  templateName: string;
  user: string;
  createDate: any;
  tags: string[];
}
interface DrawerProps {
  show: boolean; // 显示||收起
  width?: number; //宽度
  placement?: string; //抽屉的方向  top | right | bottom | left
  mask?: boolean; // 是否展示蒙层
  maskClosable?: boolean; //点击蒙层是否关闭
  children?: any;
}
const defaultDrawerObj: DrawerProps = {
  show: false,
};

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
const TableList: React.FC = () => {
  const dropItems: MenuProps['items'] = [
    {
      label: '重命名',
      key: '1',
    },
    {
      label: <span style={{ color: '#ff4d4f' }}>{'删除'}</span>,
      key: '2',
      // render: () => <span style={{ color: 'red' }}>{'删除'}</span>,
    },
  ];
  const onDropClick: any = (obj: any, item: any) => {
    // message.info(`Click on item ${obj.key}`);
    // console.log(item);

    switch (obj.key) {
      case '1': // 重命名
        setModalObj({
          ...modalObj,
          show: true,
          type: 1,
          title: '编辑模板',
          data: item,
        });
        form.setFieldValue('name', item.templateName);
        break;
      case '2': // 删除组件 二次确认
        remove(item);
        break;
      default:
        return;
    }
  };
  const columns: ColumnsType<DataType> = [
    {
      title: '名称',
      dataIndex: 'templateName',
      key: 'templateName',
      width: 235,
      fixed: 'left',
    },
    {
      title: '创建者',
      dataIndex: 'user',
      key: 'user',
      width: 235,
      render: (text) => (
        <>
          <Avatar size={32} icon={<UserOutlined />} />
          <span style={{ marginLeft: '10px' }}>{text}</span>
        </>
      ),
    },
    {
      title: '创建时间 ',
      dataIndex: 'createDate',
      key: 'createDate',
      width: 235,
      render: (text) => <>{moment(text).format('YYYY-MM-DD')}</>,
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 235,
      render: (_, record) => (
        <Space size="middle">
          <IconBtn
            icon="icon-mianxing_bianji_1"
            size={'20px'}
            color="#888888"
            isBtn={true}
            handleClick={() => doClick(record)}
          />
          <Dropdown
            autoFocus
            menu={{ items: dropItems, onClick: (obj: any) => onDropClick(obj, record) }}
            overlayClassName={'dropMinWidth'}
            trigger={['click']}
          >
            <a
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
              }}
            >
              <IconBtn
                icon="icon-xianxing_gengduo_1"
                size={'20px'}
                color="#888888"
                isBtn={true}
                // handleClick={() => remove(record)}
              />
            </a>
          </Dropdown>
          {/* <IconBtn
            icon="icon-xianxing_shanchu_1"
            size={'20px'}
            color="#888888"
            isBtn={true}
            handleClick={() => remove(record)}
          /> */}
        </Space>
      ),
    },
  ];
  const data: DataType[] = [];
  const [form] = Form.useForm();
  const [listData, setListData] = useState(data);
  const [drawerObj, setDrawerObj] = useState(defaultDrawerObj);
  const [modalObj, setModalObj] = useState(defaultModalObj);
  const [pageOption, setPageOption] = useState({
    current: 1,
    pageSize: 10,
    total: data.length,
    pageOption: [10, 20, 30, 40, 50],
  });
  useEffect(() => {
    getTemplateList();
  }, [pageOption.current, pageOption.pageSize]);
  const getTemplateList = async (reloadPage?: any) => {
    let params = {
      pageNum: reloadPage || pageOption.current,
      pageSize: pageOption.pageSize,
    };
    const res: any = await getList(params);
    if (res.code == 200) {
      setPageOption({
        ...pageOption,
        current: res.data.pageNum,
        total: res.data.total,
      });
      if (res.data.total > 0 && res.data.pageNum > Math.ceil(res.data.total / res.data.pageSize)) {
        getTemplateList(Math.ceil(res.data.total / res.data.pageSize));
        return;
      }
      res.data.list.forEach((item: any) => {
        item.key = item.templateId;
      });
      setListData([...res.data.list]);
    }
  };
  const onPageChange = (page: number, pageSize: number) => {
    // console.log(page, pageSize);
    setPageOption({ ...pageOption, current: page, pageSize });
  };
  const doClick = (record: any) => {
    console.log(record);
    history.push(`/admin/template/preview/${record.templateId}`);
    // setDrawerObj({ ...drawerObj, show: true });
  };
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

  const closeDrawer = () => {
    setDrawerObj({ ...drawerObj, show: false });
  };
  const addNewUser = () => {
    setDrawerObj({ ...drawerObj, show: true });
  };
  const addNewTempalte = () => {
    form.setFieldValue('name', '');
    setModalObj({ ...modalObj, show: true, type: 1, data: {}, title: '新增模板' });
  };
  const closeModal = () => {
    setModalObj({ ...modalObj, show: false, data: {} });
  };
  const modalSave = async () => {
    // 弹窗保存事件

    console.log('保存', modalObj);
    if (modalObj.type == 1) {
      form.validateFields().then(async (nameList: NamePath[]) => {
        if (modalObj.data?.templateId) {
          //编辑名称
          const res = await updateItemName({
            templateId: modalObj.data.templateId,
            templateName: nameList['name'],
          });
          if (res.code == 200) {
            message.success('编辑成功');
            getTemplateList();
            closeModal();
          }
        } else {
          // 新增
          const res = await addItem({
            templateName: nameList['name'],
          });
          if (res.code == 200) {
            message.success('新增成功');
            getTemplateList();
            closeModal();
          }
        }
      });
    } else if (modalObj.type == 2) {
      //删除
      const res = await deleteItem({
        templateId: modalObj.data?.templateId,
      });
      if (res.code == 200) {
        message.success('删除成功');
        getTemplateList();
        closeModal();
      }
    }
  };
  // const dataEmpty: DataType[] = [];
  return (
    <div>
      {/* 内容区域 */}
      <PageLayout>
        <div className={style.template_content}>
          <div className={style.header_box}>
            <div className={style.header_left_box}>
              <div className={style.header_left_title}>模板</div>
              <div className={style.header_left_dec}>模板管理与配置</div>
            </div>
            <div className={style.header_right_btn}>
              <Button
                type="primary"
                style={{ width: '120px', height: '40px', borderRadius: '6px' }}
                onClick={() => addNewTempalte()}
              >
                添加
              </Button>
            </div>
          </div>
          {/* 表格 */}
          <div className={style.table_content}>
            {listData.length ? (
              <TableBox
                columns={columns}
                data={listData}
                pagination={{
                  onChange: onPageChange,
                  showSizeChanger: true,
                  ...pageOption,
                }}
              />
            ) : (
              <EmptyBox />
            )}
          </div>
        </div>
      </PageLayout>
      {/* 滑窗区域 */}
      <DrawerBox show={drawerObj.show}>
        <Detail closeDrawer={closeDrawer} />
      </DrawerBox>
      {/* 弹窗区域 */}
      <ModalBox
        show={modalObj.show}
        title={modalObj.title}
        width={modalObj.width}
        close={() => closeModal()}
        save={modalSave}
      >
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

export default TableList;
