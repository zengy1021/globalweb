import style from './index.less';
import { Button, Form, Input, message, Tabs, Select, AutoComplete } from 'antd';
import { useState, useEffect } from 'react';
import MyEditor from '@/components/BraftEditor';
import Uploader from '@/components/Uploader';
import { addItem, getItem, getTypeList, updateItem } from '../../api';
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
    if (props.data?.contentId) {
      getArtInfo();
    }
  }, [props.data?.contentId]);
  const requestData = async () => {
    const elements = await getTypeList();
    if (elements.code == 200) {
      elements.data.forEach((item: any) => {
        item.value = item.elementName;
        item.label = item.elementName;
      });
      setElementsList([...elements.data]);
    }
  };
  const getArtInfo = async () => {
    const res = await getItem({
      contentId: props.data?.contentId,
    });
    if (res.code == 200) {
      console.log('getArtInfo', res.data);

      const obj = {
        title: res.data.title,
        elementName: res.data.elementName,
        image: res.data.image,
        description: res.data.description,
        keywords: res.data.keywords.split(','),
        content: res.data.content,
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
        title: values.title,
        elementName: values.elementName,
        image: values.image,
        description: values.description,
        keywords: values.keywords.join(','),
        content: editValue,
      };
      let res: any;
      let successMessage = '';
      if (!props.data?.contentId) {
        // 新增
        res = await addItem(parmas);
        successMessage = '新增成功';
      } else {
        // 编辑
        parmas.id = props.data?.contentId;
        successMessage = '更新成功';
        res = await updateItem(parmas);
      }
      if (res.code == 200) {
        message.success(successMessage);
        props.closeDrawer();
      }
    } catch (errorInfo: any) {
      if (errorInfo?.errorFields) {
        message.warning('信息表单有必填项未填');
        onChangeTab('1');
        // console.log(errorInfo);
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
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const changeFile = (fileValue: string) => {
    form.setFieldValue('image', fileValue);
  };
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  const checkFile = (_: any, value: any, validaName: string) => {
    console.log('_', _);
    // console.log('value',value);
    if (value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error(validaName + '不能为空'));
  };
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
        <div className={style.detail_content_title}>文章</div>
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
                        required: false,
                      },
                    ]}
                  >
                    <AutoComplete options={elementsList} />
                  </Form.Item>
                  <Form.Item
                    label="标题"
                    name="title"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="描述"
                    name="description"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <TextArea autoSize={{ minRows: 1, maxRows: 4 }} />
                  </Form.Item>
                  <Form.Item
                    label="关键词"
                    name="keywords"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Select
                      mode="tags"
                      // style={{ width: '100%' }}
                      placeholder="请输入关键词"
                      // onChange={handleChange}
                      // options={options}
                    />
                  </Form.Item>
                  <Form.Item
                    label="图片"
                    name="image"
                    // valuePropName="fileList"
                    // getValueFromEvent={normFile}
                    rules={[{ validator: (_: any, value: any) => checkFile(_, value, '图片') }]}
                    // rules={[
                    //   {
                    //     required: true,
                    //   },
                    // ]}
                  >
                    {/* <div style={{width:"240px",height:'120px'}}> */}
                    <Uploader width={'240px'} height={'120px'} onChange={changeFile} />
                    {/* <Uploader width={'240px'} height={'120px'} /> */}
                    {/* </div> */}
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="内容" key="2">
            <div style={{ height: 'calc(100vh - 152px - 100px)' }}>
              <MyEditor
                value={editValue}
                onChange={(v: any) => onEditorChange(v.toHTML())}
                // excludeControls={excludeControlsConfig}
                // imageControls={imageControlsConfig}
                // extendControls={extendControlsConfig}
              />
            </div>
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
