import PageLayout from '@/components/PageLayout';
import {
  Space,
  Button,
  Form,
  Input,
  DatePicker,
  Tooltip,
  Dropdown,
  MenuProps,
  message,
  Select,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import EmptyBox from '@/components/Empty';
import style from './index.less';
import IconBtn from '@/components/IconBtn';
import DrawerBox from '@/components/Drawer';
import { useState, useEffect } from 'react';
import Detail from './components/Detail';
import ModalBox from '@/components/Modal';
import moment from 'moment';
import TypesMenu from './components/TypesMenu';
import TableBox from '@/components/TableBox';
import TagBox from '@/components/TagBox';
import { commitApprove, getList, getTypeList, removeItem, removeType } from './api';
import { addType } from './api';
const { RangePicker } = DatePicker;
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
}
const defaultModalObj: ModalProps = {
  show: false,
  title: '模板',
  width: 440,
  type: 1,
  data: {},
  message: '确认删除？',
};
const defaultUserInfo: any = {};
const TableList: React.FC = () => {
  const dropItems: MenuProps['items'] = [
    // {
    //   label: '预览',
    //   key: '4',
    //   disabled: false,
    // },
    {
      label: '提交',
      key: '1',
      disabled: false,
    },
    {
      label: <span style={{ color: '#ffc53d' }}>{'回退'}</span>,
      key: '3',
      disabled: false,
    },
    {
      label: <span style={{ color: '#ff4d4f' }}>{'删除'}</span>,
      key: '2',
      disabled: false,
      // render: () => <span style={{ color: 'red' }}>{'删除'}</span>,
    },
  ];

  const dropItems2: MenuProps['items'] = [
    // {
    //   label: '预览',
    //   key: '4',
    //   disabled: false,
    // },
    {
      label: <span style={{ color: '#cccccc' }}>{'提交'}</span>,
      key: '1',
      disabled: true,
    },
    {
      label: <span style={{ color: '#cccccc' }}>{'回退'}</span>,
      key: '3',
      disabled: true,
    },
    {
      label: <span style={{ color: '#cccccc' }}>{'删除'}</span>,
      key: '2',
      disabled: true,
      // render: () => <span style={{ color: 'red' }}>{'删除'}</span>,
    },
  ];
  const dropItems3: MenuProps['items'] = [
    // {
    //   label: '预览',
    //   key: '4',
    //   disabled: false,
    // },
    {
      label: <span style={{ color: '#cccccc' }}>{'提交'}</span>,
      key: '1',
      disabled: true,
    },
    {
      label: <span style={{ color: '#cccccc' }}>{'回退'}</span>,
      key: '3',
      disabled: true,
    },
    {
      label: <span style={{ color: '#ff4d4f' }}>{'删除'}</span>,
      key: '2',
      disabled: false,
      // render: () => <span style={{ color: 'red' }}>{'删除'}</span>,
    },
  ];
  const dropItems4: MenuProps['items'] = [
    // {
    //   label: '预览',
    //   key: '4',
    //   disabled: false,
    // },
    {
      label: '提交',
      key: '1',
      disabled: false,
    },
    {
      label: <span style={{ color: '#cccccc' }}>{'回退'}</span>,
      key: '3',
      disabled: true,
    },
    {
      label: <span style={{ color: '#ff4d4f' }}>{'删除'}</span>,
      key: '2',
      disabled: false,
      // render: () => <span style={{ color: 'red' }}>{'删除'}</span>,
    },
  ];
  const onDropClick: any = (obj: any, item: any) => {
    // message.info(`Click on item ${obj.key}`);
    // console.log(item);

    switch (obj.key) {
      case '1': // 提交
        // commit(item);
        commit(item);
        break;
      case '2': // 删除组件 二次确认
        remove(item);
        break;
      default:
        return;
    }
  };
  const columns: ColumnsType<any> = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
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
      title: '分类',
      dataIndex: 'elementName',
      key: 'elementName',
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
      title: '描述',
      dataIndex: 'description',
      key: 'description',
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
    // {
    //   title: '最近更新人',
    //   dataIndex: 'user',
    //   key: 'user',
    //   width: 157,
    //   render: (text) => (
    //     <>
    //       <Avatar size={32} icon={<UserOutlined />} />
    //       <span style={{ marginLeft: '10px' }}>{text}</span>
    //     </>
    //   ),
    // },
    {
      title: '创建时间 ',
      dataIndex: 'createDate',
      key: 'createDate',
      width: 157,
      ellipsis: {
        showTitle: false,
      },
      render: (address: any) => (
        <Tooltip placement="topLeft" title={address}>
          {moment(address).format('YYYY-MM-DD')}
        </Tooltip>
      ),
    },
    {
      title: '关键词',
      dataIndex: 'keywords',
      key: 'keywords',
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
      render: (text, _: any) => <TagBox item={{ text: _.statusStr, type: text }}></TagBox>,
    },
    {
      title: '操作',
      key: 'action',
      width: 157,
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          {record.status != 2 ? (
            <IconBtn
              icon="icon-mianxing_bianji_1"
              size={'20px'}
              color="#888888"
              isBtn={true}
              handleClick={() => doClick(record)}
            />
          ) : (
            <IconBtn
              icon="icon-mianxing_bianji_1"
              size={'20px'}
              color="#cccccc"
              isBtn={true}
              disabled
              // handleClick={() => doClick(record)}
            />
          )}

          <Dropdown
            autoFocus
            menu={{
              items: [1, 4].includes(record.status)
                ? record.hasPro
                  ? dropItems
                  : dropItems4
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
  const [typeList, setTypeList] = useState<any>([]);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [drawerObj, setDrawerObj] = useState(defaultDrawerObj);
  const [modalObj, setModalObj] = useState(defaultModalObj);
  const [curType, setCurType] = useState<any>({});
  const [listData, setListData] = useState(data);
  const [pageOption, setPageOption] = useState({
    current: 1,
    pageSize: 10,
    total: data.length,
    pageOption: [10, 20, 30, 40, 50],
  });
  useEffect(() => {
    requestData();
  }, []);
  useEffect(() => {
    console.log('curType', curType);

    setPageOption({
      ...{
        current: 1,
        pageSize: 10,
        total: data.length,
        pageOption: [10, 20, 30, 40, 50],
      },
    });
    getPageList();
    const defaultSearch = {
      keywords: [],
      description: '',
      date: [],
    };
    form.setFieldsValue(defaultSearch);
  }, [curType]);

  useEffect(() => {
    getPageList();
  }, [pageOption.current, pageOption.pageSize]);

  const requestData = async () => {
    // 获取文章分类列表
    const res = await getTypeList();
    if (res.code == 200) {
      console.log('getTypeList', res.data);
      res.data.forEach((item: any) => {
        item.id = item.elementId;
        item.name = item.elementName;
      });
      res.data.unshift({
        name: '全部',
        id: 'all',
      });
      setTypeList([...res.data]);
      const isCurrentTypeLoad = res.data.filter((item: any) => item.id == curType.id)[0];
      if (!isCurrentTypeLoad) {
        setCurType({ ...(res.data[0] || {}) });
      }
    }
  };
  const getPageList = async (reloadPage?: any, searchParams?: any) => {
    let curElementId = curType.id == 'all' ? '' : curType.id;
    let params = {
      pageNum: reloadPage || pageOption.current,
      pageSize: pageOption.pageSize,
      elementId: curElementId || '',
      ...searchParams,
    };
    const res: any = await getList(params);
    if (res.code == 200) {
      setPageOption({
        ...pageOption,
        current: res.data.pageNum,
        total: res.data.total,
      });
      if (res.data.total > 0 && res.data.pageNum > Math.ceil(res.data.total / res.data.pageSize)) {
        getPageList(Math.ceil(res.data.total / res.data.pageSize), searchParams);
        return;
      }
      res.data.list.forEach((item: any) => {
        item.key = item.contentId;
      });
      setListData([...res.data.list]);
    }
  };
  const changeCurType = (value: any) => {
    setCurType({ ...value });
    //  请求文章列表
  };
  const onPageChange = (page: number, pageSize: number) => {
    console.log(page, pageSize);
    setPageOption({ ...pageOption, current: page, pageSize });
  };
  const searchHandle = (values: any) => {
    // console.log('查询', values);
    // console.log(
    //   values.date[0].format('YYYY-MM-DD 00:00:00'),
    //   values.date[1].format('YYYY-MM-DD 23:59:59'),
    // );
    const search = {
      keywords: values.keywords.join(','),
      description: values.description,
      startDate: values.date[0].format('YYYY-MM-DD 00:00:00'),
      endDate: values.date[1].format('YYYY-MM-DD 23:59:59'),
    };
    getPageList(null, search);
  };
  const doClick = (record: any) => {
    setDrawerObj({ ...drawerObj, show: true, data: record });
  };
  const remove = (item: any) => {
    setModalObj({
      ...modalObj,
      show: true,
      title: '删除',
      type: 3,
      message: '确认删除？',
      data: item,
    });
  };
  const commit = (item: any) => {
    setModalObj({
      ...modalObj,
      show: true,
      title: '提交',
      type: 4,
      message: '是否提交？',
      data: item,
    });
  };
  const closeDrawer = () => {
    setDrawerObj({ ...drawerObj, show: false });
    requestData();
    getPageList();
  };
  const addNew = () => {
    setDrawerObj({ ...drawerObj, show: true, data: {} });
  };
  const closeModal = () => {
    setModalObj({ ...modalObj, show: false, data: {} });
  };
  // 弹窗保存回调
  const modalSave = async () => {
    // 弹窗保存事件
    console.log('保存2', modalObj);
    if (modalObj.type == 1) {
      //编辑 新增
      const res = await addType({
        name: form2.getFieldsValue().name,
      });
      if (res.code == 200) {
        message.success('新增成功');
        requestData();
      }
    } else if (modalObj.type == 2) {
      //删除
      const res = await removeType({
        id: modalObj.data.id,
      });
      if (res.code == 200) {
        message.success('删除成功');
        requestData();
      }
    } else if (modalObj.type == 3) {
      //删除 文章列表表格删除
      const res = await removeItem({
        contentId: modalObj.data.contentId,
      });
      if (res.code == 200) {
        message.success('删除成功');
        getPageList();
        requestData();
      }
    } else if (modalObj.type == 4) {
      //文章列表表格 提交审批
      const res = await commitApprove({
        contentId: modalObj.data.contentId,
      });
      if (res.code == 200) {
        message.success('提交成功');
        getPageList();
        requestData();
      }
    }

    // 调用接口
    closeModal();
  };
  // 分类触发方法
  const typeHandler = (type: number, obj: any) => {
    switch (type) {
      case 1: // 新增弹窗
        form2.setFieldValue('name', '');
        setModalObj({
          ...modalObj,
          show: true,
          title: '新增分类',
          type: 1,
          message: '',
          data: {},
        });
        break;
      case 2: // 编辑
        //更新分类列表
        requestData();
        break;
      case 3: // 删除弹窗
        setModalObj({
          ...modalObj,
          show: true,
          title: '删除分类',
          type: 2,
          message: '确认删除？',
          data: obj,
        });
        break;
      default:
        return;
    }
  };
  return (
    <div>
      {/* 内容区域 */}
      <PageLayout>
        <div className={style.article_content}>
          <div className={style.left_menu}>
            {/* openType={openType}  */}
            <TypesMenu
              typeHandler={typeHandler}
              data={typeList}
              curType={curType}
              changeCurType={changeCurType}
            />
          </div>
          <div className={style.right_table}>
            <div className={style.header_box}>
              <div className={style.header_left_box}>
                <Form
                  form={form}
                  colon={false}
                  initialValues={defaultUserInfo}
                  size={'large'}
                  scrollToFirstError={true}
                  requiredMark={false}
                  onFinish={searchHandle}
                  validateMessages={{ required: '${label}不能为空' }}
                >
                  <div className={style.row_box}>
                    <div className={style.col_box}>
                      <Form.Item
                        label=""
                        name="date"
                        rules={[
                          {
                            required: false,
                          },
                        ]}
                      >
                        <RangePicker />
                      </Form.Item>
                    </div>
                    <div className={style.col_box}>
                      <Form.Item
                        label=""
                        name="keywords"
                        rules={[
                          {
                            required: false,
                          },
                        ]}
                      >
                        <Select mode="tags" placeholder="请输入关键词" />
                      </Form.Item>
                    </div>
                    <div className={style.col_box}>
                      <Form.Item
                        label=""
                        name="description"
                        rules={[
                          {
                            required: false,
                          },
                        ]}
                      >
                        <Input placeholder="标题、描述" />
                      </Form.Item>
                    </div>
                    <div className={style.col_box}>
                      <Button
                        style={{
                          width: '80px',
                          height: '40px',
                          borderRadius: '6px',
                          fontSize: '14px',
                        }}
                        type="primary"
                        htmlType="submit"
                      >
                        搜索
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
              <div className={style.header_right_btn}>
                <Button
                  style={{ width: '120px', height: '40px', borderRadius: '6px' }}
                  onClick={() => addNew()}
                >
                  添加文章
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
        </div>
      </PageLayout>
      {/* 滑窗区域 */}
      <DrawerBox show={drawerObj.show} closeDrawer={closeDrawer}>
        <Detail closeDrawer={closeDrawer} data={drawerObj.data} />
      </DrawerBox>
      {/* 弹窗区域 */}
      <ModalBox {...modalObj} close={() => closeModal()} save={modalSave}>
        {modalObj.type == 1 ? (
          <Form
            form={form2}
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
