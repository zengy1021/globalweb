import style from './index.less';
import { Button, Form, Input, message, Tabs, Select, AutoComplete } from 'antd';
import { useState, useEffect } from 'react';
// import MyEditor from '@/components/BraftEditor';
import Uploader from '@/components/Uploader';
import { getElements } from './api';
import { addComponent, getComponent, updateComponent } from '../../api';
const defaultUserInfo: any = {};
const { TextArea } = Input;
export default function Detail(props: any) {
  const [elementsList, setElementsList] = useState<any>([]);
  const [editValue, setEditValue] = useState('');
  const [activeKey, setActiveKey] = useState('1');
  const [form] = Form.useForm();
  const onChangeTab = (key: any) => {
    setActiveKey(key);
  };
  useEffect(() => {
    requestData();
    if (props.data?.componentId) {
      getComponentInfo();
    }
  }, [props.data?.componentId]);
  const requestData = async () => {
    const elements = await getElements();
    if (elements.code == 200) {
      elements.data.forEach((item: any) => {
        item.value = item.elementName;
        item.label = item.elementName;
      });
      setElementsList([...elements.data]);
    }
  };
  const getComponentInfo = async () => {
    const res = await getComponent({
      componentId: props.data?.componentId,
    });
    if (res.code == 200) {
      console.log('getComponentInfo', res.data);

      const obj = {
        name: res.data.name,
        image: res.data.image,
        elementName: res.data.elementName,
      };
      form.setFieldsValue(obj);
      setEditValue(res.data.content);
    }
  };
  const saveForm = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
      console.log('editValue', editValue);
      let parmas: any = {
        name: values.name,
        elementName: values.elementName,
        image: values.image,
        content: editValue,
      };
      let res: any;
      let successMessage = '';
      if (!props.data?.componentId) {
        // 新增
        res = await addComponent(parmas);
        successMessage = '新增成功';
      } else {
        // 编辑
        parmas.id = props.data?.componentId;
        successMessage = '更新成功';
        res = await updateComponent(parmas);
      }
      if (res.code == 200) {
        message.success(successMessage);
        props.closeDrawer();
      }
    } catch (errorInfo: any) {
      if (errorInfo?.errorFields) {
        message.warning('信息表单有必填项未填');
        onChangeTab('1');
        console.log(errorInfo);
        form.scrollToField(errorInfo.errorFields[0].name[0]);
      }
    }
  };
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };
  // 表单上传
  // const normFile = (e: any) => {
  //   console.log('Upload event:', e);
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e?.fileList;
  // };
  const changeFile = (fileValue: string) => {
    form.setFieldValue('image', fileValue);
  };
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  const checkFile = (_: any, value: any, validaName: string) => {
    console.log('_', _);
    console.log('value', value);
    if (value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error(validaName + '不能为空'));
  };
  // 表单结束
  const changeCode = (e: any) => {
    console.log(e.target.value);
    setEditValue(e.target.value);
    // editValue =
  };
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
        <Tabs activeKey={activeKey} onChange={onChangeTab}>
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
                    name="elementName"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <AutoComplete options={elementsList} />
                    {/* <Select
                      showSearch
                      optionFilterProp="children"
                      onChange={onChange}
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                      }
                      options={elementsList}
                    /> */}
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
                    name="image"
                    // valuePropName="bgImg"
                    // getValueFromEvent={normFile}
                    rules={[{ validator: (_: any, value: any) => checkFile(_, value, '略缩图') }]}
                    // rules={[
                    //   {
                    //     required: true,
                    //   },
                    // ]}
                  >
                    {/* <div style={{width:"240px",height:'120px'}}> */}
                    <Uploader width={'240px'} height={'120px'} onChange={changeFile} />
                    {/* </div> */}
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="代码" key="2">
            <div style={{ height: 'calc(100vh - 152px - 100px)' }}>
              {/* <MyEditor
                stripPastedStyles
                value={editValue}
                onChange={(v: any) => onEditorChange(v.toHTML())}
                // excludeControls={excludeControlsConfig}
                // imageControls={imageControlsConfig}
                // extendControls={extendControlsConfig}
              /> */}
              <TextArea
                // autoSize={true}
                autoSize={{ minRows: 10 }}
                value={editValue}
                onChange={changeCode}
              ></TextArea>
            </div>

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
