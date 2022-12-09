import style from './index.less';
import { Button, Avatar, Form, Input, Upload, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import PremisionSelector from './PremisionSelector';
import classNames from 'classnames';
import IconBtn from '@/components/IconBtn';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { upload } from '@/services/ant-design-pro/api';
import { addUser, updateUser, userInfo } from '../../api';

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
  useEffect(() => {
    getUserInfo();
  }, [props.userId]);
  const getUserInfo = async () => {
    let res = await userInfo({ userId: props?.data?.userId || '' });
    console.log(res);
    if (res.code == 200) {
      let file = [
        {
          uid: 'fileId',
          name: 'fileName',
          url: res.data.user.photo,
        },
      ];
      setFileList([...file]);
      form.setFieldValue('userName', res.data.user?.username);
      form.setFieldValue('name', res.data.user?.name);
      setPremissionList(res.data.menu);
    }
  };
  const saveForm = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
      console.log('premissionList', premissionList);
      console.log('photo', fileList[0]?.url);
      let newlist: any = [];
      premissionList.map((nItem: any) => {
        if (nItem.menuId) {
          newlist.push(nItem);
        }
      });
      if (props.data?.userId) {
        await updateUser({
          user: {
            userId: props.data?.userId,
            username: values.userName,
            name: values.name,
            photo: fileList[0]?.url || '',
          },
          menu: newlist,
        }).then(() => {
          // 保存接口
          message.success('操作成功');
          props.closeDrawer();
        });
      } else {
        await addUser({
          user: {
            username: values.userName,
            name: values.name,
            photo: fileList[0]?.url || '',
          },
          menu: newlist,
        }).then(() => {
          // 保存接口
          message.success('操作成功');
          props.closeDrawer();
        });
      }
    } catch (errorInfo: any) {
      form.scrollToField(errorInfo.errorFields[0].name[0]);
    }
  };
  const changeItem = (item: any) => {
    // console.log(item);
    let newChange = JSON.parse(JSON.stringify(premissionList));
    let changePremisonItem = newChange.filter((fitem: any) => fitem.menuId == item.menuId)[0];
    if (changePremisonItem) {
      changePremisonItem.isAuth = item.isAuth;
      changePremisonItem.children = item.children;
      setPremissionList([...newChange]);
    }
  };
  const handleUpload = (file: any) => {
    if (uploading) {
      return;
    }
    const formData = new FormData();

    let imgSrc = fileList[0]?.url || '';
    formData.append('file', file);
    formData.append('src', imgSrc);

    setUploading(true);

    // You can use any AJAX library you like
    upload(formData, {
      // headers: {
      'Content-Type': 'multipart/form-data',
      // },
    })
      .then((res) => {
        // res.json()
        let newList = [
          {
            uid: 'file1',
            url: res.data,
            name: 'file',
          },
        ];
        setFileList([]);
        // form.setFieldValue('photo',res.data)
        setFileList([...newList]);
      })
      .then(() => {
        // message.success('upload successfully.');
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
      // setFileList([file]);
      handleUpload(file);
      return false;
    },
    showUploadList: false,
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
              {fileList[0]?.url ? (
                <Avatar
                  size={80}
                  src={fileList[0].url}
                  shape="circle"
                  style={{ position: 'absolute', top: 0, left: 0 }}
                />
              ) : (
                <Avatar
                  size={80}
                  icon={<UserOutlined />}
                  style={{ position: 'absolute', top: 0, left: 0 }}
                />
              )}
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
              {/* <Form.Item
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
              </Form.Item> */}
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
                  [`${style.detail_content_premission_item_hidden}`]: !item?.menuId,
                })}
              >
                <PremisionSelector item={item} changeItem={changeItem} />
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
