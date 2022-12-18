import style from '../index.less';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
const { TextArea } = Input;
interface TabContentProps {
  // value: string; //代码
  changeValue: Function; // 修改代码
  tabObj: any; //修改目标对象
}
const TabContent = ({ changeValue, tabObj }: TabContentProps) => {
  const [form] = Form.useForm();
  // const [code, setCode] = useState(value);
  const [isEidt, setIsEdit] = useState(false);
  useEffect(() => {
    // setCode(value);
    form.setFieldsValue({
      name: tabObj.name,
      fileName: tabObj.fileName,
      content: tabObj.content,
      title: tabObj.title,
      description: tabObj.description,
      keywords: tabObj.keywords,
    });
  }, [tabObj]);
  // const onChange = (e: any) => {
  //   setCode(e.target.value);
  // };

  const edit = () => {
    console.log('edit');
    setIsEdit(true);
  };
  const save = () => {
    form.validateFields().then((values) => {
      console.log(values);
      changeValue(values, tabObj);
      setIsEdit(false);
    });

    // form.getFieldsValue()
  };
  const cancel = () => {
    // setCode(value);
    // 还原数据
    form.setFieldsValue({
      name: tabObj.name,
      fileName: tabObj.fileName,
      content: tabObj.content,
      title: tabObj.title,
      description: tabObj.description,
      keywords: tabObj.keywords,
    });
    setIsEdit(false);
  };
  return (
    <>
      <div className={style.header_box}>
        <div className={style.header_left_box}>
          <div className={style.header_left_title}>{tabObj.name}</div>
          {/* <div className={style.header_left_dec}>用户管理与权限设置</div> */}
        </div>
        {!isEidt ? (
          <div className={style.header_right_btn}>
            <Button
              // type="primary"
              style={{ width: '120px', height: '40px', borderRadius: '6px' }}
              onClick={() => edit()}
            >
              编辑
            </Button>
          </div>
        ) : (
          <div className={style.header_right_btn}>
            <Button
              // type="primary"
              style={{ width: '120px', height: '40px', borderRadius: '6px' }}
              onClick={() => cancel()}
            >
              取消
            </Button>
            <Button
              type="primary"
              style={{ width: '120px', height: '40px', borderRadius: '6px', marginLeft: '10px' }}
              onClick={() => save()}
            >
              保存
            </Button>
          </div>
        )}
      </div>
      <div className={style.content_box}>
        <Form
          form={form}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          layout="vertical"
          size={'large'}
          scrollToFirstError={true}
          disabled={!isEidt}
          requiredMark={false}
          validateMessages={{ required: '${label}不能为空' }}
        >
          <Row gutter={20} style={{ width: '100%', marginLeft: 0 }}>
            <Col span={12} style={{ paddingLeft: '0px' }}>
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
            </Col>
            <Col span={12} style={{ paddingRight: '0px' }}>
              <Form.Item
                label="fileName"
                name="fileName"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12} style={{ paddingLeft: '0px' }}>
              <Form.Item
                label="title"
                name="title"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12} style={{ paddingRight: '0px' }}>
              <Form.Item
                label="description"
                name="description"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24} style={{ padding: '0px' }}>
              <Form.Item
                label="keywords"
                name="keywords"
                rules={[
                  {
                    required: true,
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
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label="内容"
                name="content"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <TextArea autoSize={{ minRows: 8, maxRows: 16 }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};
export default TabContent;
