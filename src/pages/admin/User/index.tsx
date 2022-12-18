import PageLayout from '@/components/PageLayout';
import {
  Space,
  Table,
  Tag,
  Button,
  Avatar,
  Image,
  message,
  Dropdown,
  MenuProps,
  Tooltip,
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
import { removeUser, resetPassword, userList } from './api';
import TableBox from '@/components/TableBox';
interface DataType {
  userId?: string;
  name?: string;
  createDate?: any;
  photo?: string;
  updateBy?: string;
  updateDate?: string;
  username?: string;
  disable?: number;
}

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
const TableList: React.FC = () => {
  const dropItems: MenuProps['items'] = [
    {
      label: '重置密码',
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
      case '1': // 重置密码
        setModalObj({
          ...modalObj,
          show: true,
          type: 3,
          title: '重置密码',
          data: item,
          message: '是否重置密码?',
        });
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
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 235,
      fixed: 'left',
      // ellipsis: {
      //   showTitle: false,
      // },
      render: (text, record) => (
        <>
          {record?.photo ? (
            <Avatar size={32} src={record.photo} shape="circle" />
          ) : (
            <Avatar size={32} icon={<UserOutlined />} shape="circle" />
          )}
          <span style={{ marginLeft: '10px' }}>{text}</span>
        </>
      ),
    },
    {
      title: '账号 ',
      dataIndex: 'username',
      key: 'username',
      width: 235,
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
  const data: any[] = [];
  const [listData, setListData] = useState(data);
  const [drawerObj, setDrawerObj] = useState(defaultDrawerObj);
  const [modalObj, setModalObj] = useState(defaultModalObj);
  const [pageOption, setPageOption] = useState({
    current: 1,
    pageSize: 10,
    total: data.length,
    showTotal: () => <div>总数：{data.length}</div>,
    pageOption: [10, 20, 30, 40, 50],
  });
  useEffect(() => {
    getUserList();
  }, [pageOption.current, pageOption.pageSize]);
  const getUserList = async (reloadPage?: any) => {
    let params = {
      pageNum: reloadPage || pageOption.current,
      pageSize: pageOption.pageSize,
    };
    const res: any = await userList(params);
    if (res.code == 200) {
      setPageOption({
        ...pageOption,
        current: res.data.pageNum,
        total: res.data.total,
        showTotal: () => <div>总数：{res.data.total}</div>,
      });
      if (res.data.total > 0 && res.data.pageNum > Math.ceil(res.data.total / res.data.pageSize)) {
        getUserList(Math.ceil(res.data.total / res.data.pageSize));
        return;
      }
      res.data.list.forEach((item: any) => {
        item.key = item.userId;
      });
      setListData([...res.data.list]);
    }
  };
  const doClick = (record: any) => {
    setDrawerObj({ ...drawerObj, show: true, data: record });
  };
  const remove = (item: any) => {
    setModalObj({
      ...modalObj,
      show: true,
      type: 2,
      title: '删除',
      data: item,
      message: '确认删除?',
    });
  };

  const onPageChange = async (page: number, pageSize: number) => {
    // console.log(page, pageSize);
    await setPageOption({ ...pageOption, current: page, pageSize });
    // await getUserList();
  };
  const closeDrawer = async () => {
    await setDrawerObj({ ...drawerObj, show: false, data: {} });
    // 刷新页面
    getUserList();
  };
  const addNewUser = () => {
    setDrawerObj({ ...drawerObj, show: true, data: {} });
  };
  const closeModal = () => {
    setModalObj({ ...modalObj, show: false });
  };
  const modalSave = async () => {
    // 弹窗保存事件
    //  console.log('保存', form2.getFieldsValue());
    console.log('保存2', modalObj);
    if (modalObj.type == 1) {
      //编辑 新增
    } else if (modalObj.type == 2) {
      //删除
      const result = await removeUser({ id: modalObj.data.userId });
      if (result.code == 200) {
        message.success('删除成功');
        getUserList();
      }
    } else if (modalObj.type == 3) {
      //重置密码
      const result = await resetPassword({ username: modalObj.data.username });
      if (result.code == 200) {
        message.success('密码重置成功');
        getUserList();
      }
    }

    // 调用接口
    closeModal();
  };
  // const dataEmpty: DataType[] = [];
  return (
    <div>
      {/* 内容区域 */}
      <PageLayout>
        <div className={style.user_content}>
          <div className={style.header_box}>
            <div className={style.header_left_box}>
              <div className={style.header_left_title}>用户</div>
              <div className={style.header_left_dec}>用户管理与权限设置</div>
            </div>
            <div className={style.header_right_btn}>
              <Button
                type="primary"
                style={{ width: '120px', height: '40px', borderRadius: '6px' }}
                onClick={() => addNewUser()}
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
        <Detail closeDrawer={closeDrawer} data={drawerObj.data} />
      </DrawerBox>
      {/* 弹窗区域 */}
      <ModalBox {...modalObj} close={() => closeModal()} save={modalSave}>
        {modalObj.type == 1 ? <></> : <div>{modalObj.message}</div>}
      </ModalBox>
    </div>
  );
};

export default TableList;
