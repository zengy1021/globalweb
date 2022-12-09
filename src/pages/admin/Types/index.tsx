import PageLayout from '@/components/PageLayout';
import { Space, Table, Tag, Button, Avatar, Image, Form, Input, Tooltip, message } from 'antd';
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
import { addType, deleteType, getTypeList, updateType } from './api';
import TableBox from '@/components/TableBox';
interface DataType {
  key?: string;
  name?: string;
  age?: number;
  address?: any;
  createDate?: any;
  tags?: string[];
  creator?: any;
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
  const columns: ColumnsType<DataType> = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 235,
      fixed: 'left',
      ellipsis: {
        showTitle: false,
      },
      render: (text: any) => (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      ),
    },
    {
      title: '账号 ',
      dataIndex: 'creator',
      key: 'creator',
      width: 235,
      render: (text, record) => (
        <div>
          {text?.photo ? (
            <Avatar size={32} src={text?.photo} shape="circle" />
          ) : (
            <Avatar size={32} icon={<UserOutlined />} shape="circle" />
          )}
          <span style={{ marginLeft: '10px' }}>{text?.name}</span>
        </div>
      ),
    },
    {
      title: '创建时间 ',
      dataIndex: 'createDate',
      key: 'createDate',
      width: 235,
      ellipsis: {
        showTitle: false,
      },
      render: (text: any) => (
        <Tooltip placement="topLeft" title={moment(text).format('YYYY-MM-DD')}>
          {moment(text).format('YYYY-MM-DD')}
        </Tooltip>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 235,
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <IconBtn
            icon="icon-mianxing_bianji_1"
            size={'20px'}
            color="#888888"
            isBtn={true}
            handleClick={() => doClick(record)}
          />
          <IconBtn
            icon="icon-xianxing_shanchu_1"
            size={'20px'}
            color="#888888"
            isBtn={true}
            handleClick={() => remove(record)}
          />
        </Space>
      ),
    },
  ];
  const data: any[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: new Date(),
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: new Date(),
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: new Date(),
      tags: ['cool', 'teacher'],
    },
  ];
  const [form] = Form.useForm();
  const [listData, setListData] = useState([data]);
  const [drawerObj, setDrawerObj] = useState(defaultDrawerObj);
  const [modalObj, setModalObj] = useState(defaultModalObj);

  const [pageOption, setPageOption] = useState({
    current: 1,
    pageSize: 10,
    total: data.length,
    showTotal: () => <div>共:data.length条</div>,
    pageOption: [10, 20, 30, 40, 50],
  });
  useEffect(() => {
    getList();
  }, [pageOption.current, pageOption.pageSize]);

  const getList = async (reloadPage?: any) => {
    let params = {
      pageNum: reloadPage || pageOption.current,
      pageSize: pageOption.pageSize,
    };
    const res: any = await getTypeList(params);
    if (res.code == 200) {
      setPageOption({
        ...pageOption,
        current: res.data.pageNum,
        total: res.data.total,
        showTotal: () => <div>总数：{res.data.total}</div>,
      });
      if (res.data.total > 0 && res.data.pageNum > Math.ceil(res.data.total / res.data.pageSize)) {
        getList(Math.ceil(res.data.total / res.data.pageSize));
        return;
      }
      res.data.list.forEach((item: any) => {
        item.key = item.id;
      });
      console.log(res.data.list);

      setListData([...res.data.list]);
    }
  };
  const doClick = (record: any) => {
    // console.log(record);
    form.setFieldValue('name', record?.name || '');
    setModalObj({ ...modalObj, show: true, title: '分组', type: 1, data: record });
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
  const onPageChange = async (page: number, pageSize: number) => {
    // console.log(page, pageSize);
    await setPageOption({ ...pageOption, current: page, pageSize });
    // await getUserList();
  };
  const closeDrawer = () => {
    setDrawerObj({ ...drawerObj, show: false });
  };
  // const addNewUser = () => {
  //   setDrawerObj({ ...drawerObj, show: true });
  // };
  const addNew = () => {
    setModalObj({ ...modalObj, show: true, title: '新增分组', type: 1, data: {} });
  };
  const closeModal = () => {
    setModalObj({ ...modalObj, show: false, data: {} });
  };
  const modalSave = async () => {
    // 弹窗保存事件
    console.log('保存', form.getFieldsValue());
    console.log('保存2', modalObj);
    if (modalObj.type == 1) {
      if (modalObj.data.id) {
        // 编辑
        const result = await updateType({ ...form.getFieldsValue(), id: modalObj.data.id });
        if (result.code == 200) {
          message.success('操作成功');
        }
      } else {
        // 新增
        const result = await addType(form.getFieldsValue());
        if (result.code == 200) {
          message.success('新增成功');
        }
      }
      //编辑 新增
    } else if (modalObj.type == 2) {
      //删除
      const result = await deleteType({ id: modalObj.data.id });
      if (result.code == 200) {
        message.success('删除成功');
      }
    }
    // 调用接口
    await closeModal();
    await getList();
  };
  // const dataEmpty: DataType[] = [];
  return (
    <div>
      {/* 内容区域 */}
      <PageLayout>
        <div className={style.user_content}>
          <div className={style.header_box}>
            <div className={style.header_left_box}>
              <div className={style.header_left_title}>分组</div>
              <div className={style.header_left_dec}>内容页一级菜单管理</div>
            </div>
            <div className={style.header_right_btn}>
              <Button
                type="primary"
                style={{ width: '120px', height: '40px', borderRadius: '6px' }}
                onClick={() => addNew()}
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
      {/* <DrawerBox show={drawerObj.show}>
        <Detail closeDrawer={closeDrawer} />
      </DrawerBox> */}
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

export default TableList;
