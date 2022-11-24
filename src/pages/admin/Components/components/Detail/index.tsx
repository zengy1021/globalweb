import style from './index.less';
import { Button, Avatar, Form, Input, Upload, message,Tabs,Select   } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import PremisionSelector from './PremisionSelector';
import classNames from 'classnames';
import IconBtn from '@/components/IconBtn';

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
  const saveForm = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
      props.closeDrawer();
    } catch (errorInfo: any) {
      form.scrollToField(errorInfo.errorFields[0].name[0]);
    }
  };
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  
  const onSearch = (value: string) => {
    console.log('search:', value);
  };
  
  return (
    <div className={style.detail_box}>
      <div className={style.detail_content}>
        <div className={style.detail_content_title}>组件</div>
        <Tabs
          defaultActiveKey="1"
        >
          <Tabs.TabPane tab="信息" key="1">
           <div className={style.detail_content_user}>
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
                      label="分类"
                      name="type"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select
                          showSearch
                          optionFilterProp="children"
                          onChange={onChange}
                          onSearch={onSearch}
                          filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                          }
                          options={[
                            {
                              value: 'jack',
                              label: 'Jack',
                            },
                            {
                              value: 'lucy',
                              label: 'Lucy',
                            },
                            {
                              value: 'tom',
                              label: 'Tom',
                            },
                          ]}
                        />
                    </Form.Item>
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
                  </Form>
                </div>
              </div>
            </Tabs.TabPane>
          <Tabs.TabPane tab="代码" key="2">
          代码
          </Tabs.TabPane>
          </Tabs>
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
