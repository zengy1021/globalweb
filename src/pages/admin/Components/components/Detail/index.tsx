import style from './index.less';
import { Button, Form, Input, message, Tabs, Select } from 'antd';
import { useState, useEffect } from 'react';
import MyEditor from '@/components/BraftEditor';
import Uploader from '@/components/Uploader';
const defaultUserInfo: any = {};

export default function Detail(props: any) {
  const [editValue, setEditValue] = useState('');
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
  // 表单上传
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  const checkFile = (_: any, value: any,validaName: string)=>{
    console.log('_',_);
    // console.log('value',value);
    if (value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error(validaName+'不能为空'));
  }
  // 表单结束
  // 编辑器 开始
  const onEditorChange = (val: any) => {
    console.log(val, 'val');
    setEditValue(val);
  };
  //不需要的操作工具
  const excludeControlsConfig = [
    'emoji',
    // 'superscript',
    // 'subscript',
    // 'strike-through',
    'media',
    // 'blockquote',
    // 'remove-styles',
    // 'code',
    // 'fullscreen',
  ];
  // const imageControlsConfig = [
  //   'align-left',
  //   'align-center',
  //   'align-right',
  //   'size',
  //   {
  //     text: <Icon type="delete" />,
  //     onClick: (block:any, mediaData:any) => {
  //       this.removeFile(mediaData.name, 'image', block, mediaData.url);
  //     },
  //   },
  // ];
  const extendControlsConfig = [
    {
      key: 'custom-modal',
      type: 'button',
      text: '上传文件',
      // onClick: UploadTemplateModal.show
    },
  ];
  // 编辑器 结束
  return (
    <div className={style.detail_box}>
      <div className={style.detail_content}>
        <div className={style.detail_content_title}>组件</div>
        <Tabs defaultActiveKey="1">
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
                  onFinish={onFinish}
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
                  <Form.Item
                    label="略缩图"
                    name="bgImg"
                    // valuePropName="fileList"
                    // getValueFromEvent={normFile}
                    rules={
                      [
                        { validator: (_: any, value: any)=>checkFile(_,value,'略缩图') 
                    }]}
                    // rules={[
                    //   {
                    //     required: true,
                    //   },
                    // ]}
                  >
                    {/* <div style={{width:"240px",height:'120px'}}> */}
                        <Uploader width={'240px'} height={'120px'} />
                    {/* </div> */}
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="代码" key="2">
            <div style={{ height: 'calc(100vh - 152px - 100px)' }}>
              <MyEditor
                value={editValue}
                onChange={(v: any) => onEditorChange(v.toHTML())}
                // excludeControls={excludeControlsConfig}
                // imageControls={imageControlsConfig}
                // extendControls={extendControlsConfig}
               />
            </div>
            {/* <TextArea autoSize={{ minRows: 10 }}></TextArea> */}
            {/* <CodeMirrorBox code={123}></CodeMirrorBox> */}
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
