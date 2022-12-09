import style from './index.less';
import { Button, Avatar, Form, Input, Upload, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import PremisionSelector from './PremisionSelector';
import classNames from 'classnames';
import IconBtn from '@/components/IconBtn';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const defaultList: any[] = [
  {
    id: 1,
    name: '1组',
    checked: false,
    children: [
      { id: 'a', name: 'live-chat', checked: true },
      { id: 'b', name: 'remote', checked: false },
      { id: 'c', name: 'apple', checked: false },
    ],
  },
  {
    id: 2,
    name: '2组',
    checked: false,
    children: [
      { id: 'a', name: 'live-chat', checked: false },
      { id: 'b', name: 'remote', checked: false },
      { id: 'c', name: 'apple', checked: false },
    ],
  },
  {
    id: 3,
    name: '3组',
    checked: false,
    children: [
      { id: 'a', name: 'live-chat', checked: false },
      { id: 'b', name: 'remote', checked: false },
      { id: 'c', name: 'apple', checked: false },
    ],
  },
  {
    id: 4,
    name: '4组',
    checked: false,
    children: [
      { id: 'a', name: 'live-chat', checked: false },
      { id: 'b', name: 'remote', checked: false },
      { id: 'c', name: 'apple', checked: false },
    ],
  },
  {
    id: 5,
    name: '5组',
    checked: false,
    children: [
      { id: 'a', name: 'live-chat', checked: false },
      { id: 'b', name: 'remote', checked: false },
      { id: 'c', name: 'apple', checked: false },
    ],
  },
  {
    id: 6,
    name: '6组',
    checked: false,
    children: [
      { id: 'a', name: 'live-chat', checked: false },
      { id: 'b', name: 'remote', checked: false },
      { id: 'c', name: 'apple', checked: false },
    ],
  },
  {
    id: 7,
    name: '7组',
    checked: false,
    children: [
      { id: 'a', name: 'live-chat', checked: false },
      { id: 'b', name: 'remote', checked: false },
      { id: 'c', name: 'apple', checked: false },
    ],
  },
];
const defaultUserInfo: any = {};
export default function Detail(props: any) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [premissionList, setPremissionList] = useState(defaultList);
  useEffect(() => {
    let newEmpty = [];
    if (premissionList.length % 3 !== 0) {
      let count = 3 - (premissionList.length % 3);
      for (let i = 0; i < count; i++) {
        newEmpty.push({});
      }
      setPremissionList([...premissionList, ...newEmpty]);
    }
    return () => {};
  }, [premissionList]);

  const saveForm = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
      props.closeDrawer();
    } catch (errorInfo: any) {
      form.scrollToField(errorInfo.errorFields[0].name[0]);
    }
  };
  const handleUpload = () => {
    if (uploading) {
      return;
    }
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file as RcFile);
    });
    setUploading(true);
    // You can use any AJAX library you like
    fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success('upload successfully.');
      })
      .catch(() => {
        message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const uploadOption: UploadProps = {
    onRemove: (file) => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
  };
  return (
    <div className={style.detail_box}>
      <div className={style.detail_content}>
        <div className={style.detail_content_title}>用户</div>
        <div className={style.detail_content_user}>
          <div className={style.detail_content_userImg}>
            <div className={style.detail_content_Img_box}>
              <Upload {...uploadOption}>
                <div className={style.detail_content_Img_box_shadow}>
                  <IconBtn icon="icon-xianxing_shangchuan_1" color="#fff" size={'32px'} />
                </div>
              </Upload>
              <Avatar
                size={80}
                icon={<UserOutlined />}
                style={{ position: 'absolute', top: 0, left: 0 }}
              />
            </div>
          </div>
          <div className={style.detail_content_userInfo}>
            <Form
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              layout="vertical"
              initialValues={defaultUserInfo}
              size={'large'}
              scrollToFirstError={true}
              requiredMark={false}
              validateMessages={{ required: '${label}不能为空' }}
            >
              <Form.Item
                label="姓名"
                name="name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="账号"
                name="userName"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="请输入账号" />
              </Form.Item>
              {/* <IconBtn icon="icon-xianxing_jiankong_1" isBtn={true} /> */}
              {/* <EyeInvisibleOutlined /> */}
              <Form.Item
                label="密码"
                name="password"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.Password
                  placeholder="请输入密码"
                  iconRender={(visible) => (visible ? <EyeInvisibleOutlined /> : <EyeOutlined />)}
                />
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className={style.detail_content_premission}>
          <div className={style.detail_content_premission_title}>权限</div>
          <div className={style.detail_content_premission_box}>
            {premissionList.map((item: any, index: number) => (
              <div
                key={index}
                className={classNames('', {
                  [`${style.detail_content_premission_item_hidden}`]: !item?.id,
                })}
              >
                <PremisionSelector item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={style.detail_footer}>
        <Button className={style.btn} type="default" onClick={() => props.closeDrawer()}>
          取消
        </Button>
        <Button className={style.btn} type="primary" onClick={() => saveForm()}>
          保存
        </Button>
      </div>
    </div>
  );
}
