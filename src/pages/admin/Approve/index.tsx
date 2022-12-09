import PageLayout from '@/components/PageLayout';
import { Space, Table, Tag, Button, Avatar, Image, Form, Input, Tooltip, message } from 'antd';

import { UserOutlined } from '@ant-design/icons';
import EmptyBox from '@/components/Empty';
import style from './index.less';
import IconBtn from '@/components/IconBtn';
import DrawerBox from '@/components/Drawer';
import React, { useState, useEffect, useRef, useContext } from 'react';
import Detail from './components/Detail';
import ModalBox from '@/components/Modal';
import moment from 'moment';
import TagBox from '@/components/TagBox';
import TableBox from '@/components/TableBox';
import { approvePass, approveReject, getList } from './api';

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
  const data: any[] = [];
  const columns = [
    {
      title: '名称 ',
      dataIndex: 'contentName',
      key: 'contentName',
      width: 157,
      fixed: 'left',
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
      title: '提交人',
      dataIndex: 'auditor',
      key: 'auditor',
      width: 157,
      render: (text: any) => (
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
      title: '时间 ',
      ellipsis: {
        showTitle: false,
      },
      render: (text: any) => (
        <Tooltip placement="topLeft" title={moment(text).format('YYYY-MM-DD hh:mm:ss')}>
          {moment(text).format('YYYY-MM-DD hh:mm:ss')}
        </Tooltip>
      ),
      dataIndex: 'auditDate',
      key: 'auditDate',
      width: 157,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 157,
      render: (text: any, _: any) => <TagBox item={{ text: '待审核', type: text }}></TagBox>,
    },

    {
      title: '备注',
      ellipsis: {
        showTitle: false,
      },
      render: (text: any) => (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      ),
      dataIndex: 'remark',
      key: 'remark',
      width: 157,
    },
    {
      title: '文件名',
      ellipsis: {
        showTitle: false,
      },
      render: (text: any) => (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      ),
      editable: true,
      dataIndex: 'fileName',
      key: 'fileName',
      width: 157,
    },
    {
      title: '操作',
      key: 'action',
      width: 157,
      fixed: 'right',
      render: (_: any, record: any) => (
        <Space size="middle">
          {record.fileName && (
            <IconBtn
              icon="icon-xianxing_shenhe_1"
              size={'20px'}
              color="#888888"
              isBtn={true}
              handleClick={() => doClick(record)}
            />
          )}

          <IconBtn
            icon="icon-xianxing_jiankong_1"
            size={'20px'}
            color="#888888"
            isBtn={true}
            handleClick={() => review(record)}
          />
        </Space>
      ),
    },
  ];
  const [listData, setListData] = useState(data);
  const [form] = Form.useForm();
  const [drawerObj, setDrawerObj] = useState(defaultDrawerObj);
  const [modalObj, setModalObj] = useState(defaultModalObj);
  const [pageOption, setPageOption] = useState({
    current: 1,
    pageSize: 10,
    total: data.length,
    pageOption: [10, 20, 30, 40, 50],
  });
  useEffect(() => {
    getApproveList();
  }, [pageOption.current, pageOption.pageSize]);
  const getApproveList = async (reloadPage?: any) => {
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
        getList(Math.ceil(res.data.total / res.data.pageSize));
        return;
      }
      res.data.list.forEach((item: any) => {
        item.key = item.userId;
      });
      setListData([...res.data.list]);
    }
  };
  const closeMoodal = () => {
    setModalObj({ ...modalObj, show: false, data: {} });
  };
  const doClick = (record: any) => {
    // console.log(record);
    console.log('审批', record);
    setModalObj({
      ...modalObj,
      show: true,
      title: '审批',
      type: 2,
      message: '审批通过将进入发布页面',
      data: record,
      btn: false,
      footer: (
        <div className={style.custom_modal_box_footer_btn}>
          <Button className={style.btn} onClick={closeModal}>
            取消
          </Button>
          <Button className={style.btn} type="primary" onClick={() => submit(0, record, modalObj)}>
            驳回
          </Button>
          <Button className={style.btn} type="primary" onClick={() => submit(1, record, modalObj)}>
            确认
          </Button>
        </div>
      ),
    });

    // form.setFieldValue('name', record?.name || '');
    // setModalObj({ ...modalObj, show: true, title: '分组', type: 1, data: record });
  };
  const submit = async (type: number | string, item: any, a: any) => {
    console.log('提交数据', item);
    switch (type) {
      case 0:
        // 驳回 调用接口
        const res1 = await approveReject({
          contentId: item.contentId,
        });
        if (res1.code == 200) {
          message.success('操作成功');
          closeMoodal();
        }
        break;
      case 1:
        // 通过 调用接口
        const res2 = await approvePass({
          contentId: item.contentId,
        });
        if (res2.code == 200) {
          message.success('操作成功');
          closeMoodal();
        }
        break;
      default:
        return;
    }
  };
  const review = (item: any) => {
    console.log('新页面预览', item);
  };
  // tabel

  const onPageChange = (page: number, pageSize: number) => {
    console.log(page, pageSize);
    setPageOption({ ...pageOption, current: page, pageSize });
  };
  const closeDrawer = () => {
    setDrawerObj({ ...drawerObj, show: false });
  };
  const addNewUser = () => {
    setDrawerObj({ ...drawerObj, show: true });
  };
  const addNew = () => {
    setModalObj({ ...modalObj, show: true, title: '新增分组', type: 1, data: {} });
  };
  const closeModal = () => {
    setModalObj({ ...modalObj, show: false, data: {} });
  };
  const modalSave = () => {
    // 弹窗保存事件
    console.log('保存', form.getFieldsValue());
    console.log('保存2', modalObj);
    if (modalObj.type == 1) {
      //编辑 新增
    } else if (modalObj.type == 2) {
      //删除
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
              <div className={style.header_left_title}>审批</div>
              <div className={style.header_left_dec}>审批内容页以备发布</div>
            </div>
            <div className={style.header_right_btn}>
              {/* <Button
                type="primary"
                style={{ width: '120px', height: '40px', borderRadius: '6px' }}
                onClick={() => addNew()}
              >
                添加
              </Button> */}
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
              // <Table
              //   pagination={{
              //     onChange: onPageChange,
              //     showSizeChanger: true,
              //     pageSize: 2,
              //     total: 10,
              //   }}
              //   columns={columns}
              //   dataSource={data}
              //   scroll={{ x: '100%', y: '100%' }}
              // />
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
