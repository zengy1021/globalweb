import PageLayout from '@/components/PageLayout';
import { Space, Button, Avatar, Form, Input, Dropdown, MenuProps, message, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import EmptyBox from '@/components/Empty';
import style from './index.less';
import IconBtn from '@/components/IconBtn';
import DrawerBox from '@/components/Drawer';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Detail from './components/Detail';
import ModalBox from '@/components/Modal';
import moment from 'moment';
import { history, useModel } from 'umi';
import TagBox from '@/components/TagBox';
import TableBox from '@/components/TableBox';
import { commitApprove, getList, removeItem } from './api';
import lodash from 'lodash';
interface DataType {
  key: string;
  name: string;
  remark: string;
  status: string;
  user: string;
  address: any;
  tags: string[];
  version: string;
}
interface DrawerProps {
  show: boolean; // 显示||收起
  width?: number; //宽度
  placement?: string; //抽屉的方向  top | right | bottom | left
  mask?: boolean; // 是否展示蒙层
  maskClosable?: boolean; //点击蒙层是否关闭
  children?: any;
  data?: {};
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
  const location = useLocation();
  // const [form] = Form.useForm();
  const [drawerObj, setDrawerObj] = useState(defaultDrawerObj);
  const [modalObj, setModalObj] = useState(defaultModalObj);
  const [currentPath, setCurrentPath] = useState('');
  const { initialState } = useModel('@@initialState');
  const currentMenu: any = initialState?.currentMenu || [];
  const dropItems: MenuProps['items'] = [
    // const dropItems: MenuProps['items'] = [
    {
      label: '修改',
      key: '1',
      disabled: false,
    },
    {
      label: '预览',
      key: '2',
      disabled: false,
    },
    {
      label: '提交',
      key: '3',
      disabled: false,
    },
    {
      label: <span style={{ color: '#ff4d4f' }}>{'删除'}</span>,
      key: '4',
      disabled: false,

      // render: () => <span style={{ color: 'red' }}>{'删除'}</span>,
    },
  ];
  const dropItems2: MenuProps['items'] = [
    // const dropItems: MenuProps['items'] = [
    {
      label: '修改',
      key: '1',
      disabled: true,
    },
    {
      label: '预览',
      key: '2',
      disabled: false,
    },
    {
      label: '提交',
      key: '3',
      disabled: true,
    },
    {
      label: '删除',
      key: '4',
      disabled: true,

      // render: () => <span style={{ color: 'red' }}>{'删除'}</span>,
    },
  ];
  const dropItems3: MenuProps['items'] = [
    // const dropItems: MenuProps['items'] = [
    {
      label: '修改',
      key: '1',
      disabled: false,
    },
    {
      label: '预览',
      key: '2',
      disabled: false,
    },
    {
      label: '提交',
      key: '3',
      disabled: true,
    },
    {
      label: <span style={{ color: '#ff4d4f' }}>{'删除'}</span>,
      key: '4',
      disabled: false,

      // render: () => <span style={{ color: 'red' }}>{'删除'}</span>,
    },
  ];
  const getItems = (record: any) => {
    let dorpList: MenuProps['items'] = lodash.cloneDeep(dropItems);
    if (record.status == 2) {
      dorpList?.forEach((item: any) => {
        if ([1, 3, 4].includes(item.key)) {
          item.disabled = true;
        }
      });
    }
    if (record.status == 3) {
      dorpList?.forEach((item: any) => {
        if ([3].includes(item.key)) {
          item.disabled = true;
        }
      });
    }
    return dorpList;
  };
  const onDropClick: any = (obj: any, item: any) => {
    // message.info(`Click on item ${obj.key}`);
    // console.log(item);

    switch (obj.key) {
      case '1': // 修改模板
        setDrawerObj({ ...drawerObj, show: true, data: item });
        break;
      case '2': // 预览
        break;
      case '3': // 提交
        commit(item);
        break;
      case '4': // 删除组件 二次确认
        remove(item);
        break;
      default:
        return;
    }
  };
  const columns: ColumnsType<DataType> = [
    {
      title: '名称',
      dataIndex: 'contentName',
      key: 'contentName',
      fixed: 'left',
      width: 157,
      ellipsis: {
        showTitle: false,
      },
      render: (address: any) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 157,
      ellipsis: {
        showTitle: false,
      },
      render: (address: any) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: '最近更新人',
      dataIndex: 'updater',
      key: 'updater',
      width: 157,
      render: (text) => (
        <>
          {text?.photo ? (
            <Avatar size={32} src={text.photo} shape="circle" />
          ) : (
            <Avatar size={32} icon={<UserOutlined />} shape="circle" />
          )}
          <span style={{ marginLeft: '10px' }}>{text?.name}</span>
        </>
      ),
    },
    {
      title: '最近更新时间 ',
      dataIndex: 'updateDate',
      key: 'updateDate',
      width: 157,
      ellipsis: {
        showTitle: false,
      },
      render: (item: any) => (
        <Tooltip placement="topLeft" title={moment(item).format('YYYY-MM-DD hh:mm:ss')}>
          {moment(item).format('YYYY-MM-DD hh:mm:ss')}
        </Tooltip>
      ),
    },
    {
      title: '当前版本',
      dataIndex: 'version',
      key: 'version',
      width: 157,
      ellipsis: {
        showTitle: false,
      },
      render: (address: any) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 157,
      render: (text: any, _: any) => <TagBox item={{ text: _.statusStr, type: text }}></TagBox>,
    },
    {
      title: '操作',
      key: 'action',
      width: 157,
      fixed: 'right',
      render: (_, record: any) => (
        <Space size="middle">
          {[1, 3, 4].includes(record.status) && (
            <IconBtn
              icon="icon-mianxing_bianji_1"
              size={'20px'}
              color="#888888"
              isBtn={true}
              handleClick={() => doClick(record)}
            />
          )}

          <Dropdown
            autoFocus
            // getItems(record) dropItems
            menu={{
              items: [1, 4].includes(record.status)
                ? dropItems
                : [2].includes(record.status)
                ? dropItems2
                : [3].includes(record.status)
                ? dropItems3
                : [],
              onClick: (obj: any) => onDropClick(obj, record),
            }}
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
        </Space>
      ),
    },
  ];
  const data: any = [];
  const [pageOption, setPageOption] = useState({
    current: 1,
    pageSize: 10,
    total: data.length,
    pageOption: [10, 20, 30, 40, 50],
  });
  const [listData, setListData] = useState(data);
  useEffect(() => {
    const pathList = location.pathname.split('/');
    setCurrentPath(pathList[pathList.length - 1]);
    // requestData();
    console.log(pathList[pathList.length - 1]);
    requestData(pathList[pathList.length - 1]);
  }, [location.pathname]);

  useEffect(() => {
    if (currentPath) {
      requestData(currentPath);
    }
  }, [pageOption.current, pageOption.pageSize]);
  const requestData = async (id?: any, reloadPage?: any) => {
    if (!id) {
      return;
    }
    let params = {
      pageNum: reloadPage || pageOption.current,
      pageSize: pageOption.pageSize,
      elementId: id,
    };
    const res: any = await getList(params);
    if (res.code == 200) {
      setPageOption({
        ...pageOption,
        current: res.data.pageNum,
        total: res.data.total,
      });
      if (res.data.total > 0 && res.data.pageNum > Math.ceil(res.data.total / res.data.pageSize)) {
        requestData(id, Math.ceil(res.data.total / res.data.pageSize));
        return;
      }
      res.data.list.forEach((item: any) => {
        item.key = item.contentId;
      });
      setListData([...res.data.list]);
    }
  };
  const formatPath = (path?: string) => {
    if (!path) {
      return '';
    }
    const parentMenu = currentMenu.filter((Fitem: any) => Fitem.menuRoute == '/content')[0];
    if (parentMenu) {
      const currentMenu = parentMenu.children?.filter(
        (filterChild: any) => filterChild.menuRoute == location.pathname,
      )[0];
      return currentMenu?.menuName;
    }
    return '';
  };
  const doClick = (record: any) => {
    // console.log(record);
    history.push(`/content/${currentPath}/edit/${record.contentId}`);
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
  const commit = (item: any) => {
    setModalObj({
      ...modalObj,
      show: true,
      title: '提交',
      type: 1,
      message: '是否提交？',
      data: item,
    });
  };

  const onPageChange = (page: number, pageSize: number) => {
    console.log(page, pageSize);
    setPageOption({ ...pageOption, current: page, pageSize });
  };
  const closeDrawer = () => {
    setDrawerObj({ ...drawerObj, show: false });
    requestData(currentPath);
  };
  const addNewContent = () => {
    setDrawerObj({ ...drawerObj, show: true, data: {} });
  };
  const closeModal = () => {
    setModalObj({ ...modalObj, show: false, data: {} });
  };
  const modalSave = async () => {
    // 弹窗保存事件
    if (modalObj.type == 1) {
      // 提交审核
      // closeModal();
      const result = await commitApprove({ contentId: modalObj.data.contentId });
      if (result.code == 200) {
        message.success('提交成功');
        requestData(currentPath);
        closeModal();
      }
    } else if (modalObj.type == 2) {
      //删除
      const result = await removeItem({ contentId: modalObj.data.contentId });
      if (result.code == 200) {
        message.success('删除成功');
        requestData(currentPath);
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
              <div className={style.header_left_title}>{formatPath(currentPath)}</div>
              <div className={style.header_left_dec}>页面管理</div>
            </div>
            <div className={style.header_right_btn}>
              <Button
                type="primary"
                style={{ width: '120px', height: '40px', borderRadius: '6px' }}
                onClick={() => addNewContent()}
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
        <Detail
          closeDrawer={closeDrawer}
          formatPath={formatPath(currentPath)}
          data={drawerObj.data}
          currentPath={currentPath}
        />
      </DrawerBox>
      {/* 弹窗区域 */}
      <ModalBox
        show={modalObj.show}
        title={modalObj.title}
        width={modalObj.width}
        close={() => closeModal()}
        save={modalSave}
      >
        {/* {modalObj.type == 5 ? (
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
        ) : ( */}
        <div>{modalObj.message}</div>
        {/* )} */}
      </ModalBox>
    </div>
  );
};

export default TableList;
