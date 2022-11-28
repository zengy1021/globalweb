import PageLayout from '@/components/PageLayout';
import { Space, Table, Tag, Button, Avatar, Image, Form, Input } from 'antd';
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
interface DataType {
  key: string;
  name: string;
  user: string;
  address: any;
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
  const [form] = Form.useForm();
  const [drawerObj, setDrawerObj] = useState(defaultDrawerObj);
  const [modalObj, setModalObj] = useState(defaultModalObj);
  const doClick = (record: any) => {
    console.log(record);
    history.push('/admin/template/preview');
    // setDrawerObj({ ...drawerObj, show: true });
  };
  const remove = (item: any) => {
    setModalObj({ ...modalObj, show: true, title: '删除', type: 2, message: '确认删除？' });
  };
  const columns: ColumnsType<DataType> = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 235,
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
      dataIndex: 'address',
      key: 'address',
      width: 235,
      render: (text) => <>{moment(text).format('YYYY-MM-DD')}</>,
    },
    {
      title: '操作',
      key: 'action',
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
  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      user: '查三',
      address: new Date(),
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      user: '查三',
      address: new Date(),
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      user: '查三',
      address: new Date(),
      tags: ['cool', 'teacher'],
    },
  ];
  const closeDrawer = () => {
    setDrawerObj({ ...drawerObj, show: false });
  };
  const addNewUser = () => {
    setDrawerObj({ ...drawerObj, show: true });
  };
  const addNewTempalte = () => {
    setModalObj({ ...modalObj, show: true, type: 1, data: {} });
  };
  const closeModal = () => {
    setModalObj({ ...modalObj, show: false, data: {} });
  };
  const modalSave = () => {
    // 弹窗保存事件
    closeModal();
    console.log('保存');
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
            {data.length ? <Table columns={columns} dataSource={data} /> : <EmptyBox />}
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
