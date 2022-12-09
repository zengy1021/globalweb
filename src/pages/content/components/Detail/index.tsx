import style from './index.less';
import { Button, Form, Input, message, Select, Affix, Tabs, Row, Col } from 'antd';
import type { TabsProps } from 'antd';
import { Sticky, StickyContainer } from 'react-sticky';
import { useState, useEffect } from 'react';
// import classNames from 'classnames';
// import IconBtn from '@/components/IconBtn';
import GlobalPage from '@/components/GlobalPage';
import { addItem, getContent, getTemplates, updateItem } from '../../api';
// import htmlJson from './htmlJson';
const defaultUserInfo: any = {};
const templates: any = [];

const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => {
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 999, background: '#fff' }}>
      <DefaultTabBar {...props} style={{ ...style }} />
    </div>
    // <Sticky topOffset={0}>
    //   {(style: any) => <DefaultTabBar {...props} style={{ ...style }} />}
    // </Sticky>
    // <Affix offsetTop={0}>{() => <DefaultTabBar {...props} />}</Affix>
  );
};

export default function Detail(props: any) {
  const [form] = Form.useForm();
  const [templatesList, setTemplatesList] = useState<any>(templates);
  const [tabItems, setTabItems] = useState<any>([]);
  const [templatesOption, setTemplatesOption] = useState<any>([]);
  const [activeKey, setActiveKey] = useState<string>('');
  useEffect(() => {
    getTemplateList();
    if (props.data?.contentId) {
      console.log('内容Id:', props.data.contentId);
      getContentData();
    }
  }, [props.data]);
  const getTemplateList = async () => {
    const res = await getTemplates();
    if (res.code == 200) {
      setTemplatesList([...res.data]);
      let optionList: any = [];
      const tabItemList = res.data?.map((item: any, index: number) => {
        optionList.push({
          label: item.templateName,
          value: item.templateId,
        });
        const rtObj = {
          label: item.templateName,
          key: item.templateId,
          // key: index + 1,
          children: (
            <GlobalPage
              comps={item.components}
              childrenChange={(newChildren: any) => childrenChange(newChildren, item)}
            />
          ),
        };
        if (index == 0) {
          setActiveKey(item.templateId);
        }
        return rtObj;
      });
      console.log('tabItemList', tabItemList);

      setTabItems([...tabItemList]);
      setTemplatesOption([...optionList]);
    }
    console.log('getTemplates', res);
  };
  const getContentData = async () => {
    const res = await getContent({
      contentId: props.data?.contentId,
    });
    if (res.code == 200) {
      // console.log('getContentData', res);
      form.setFieldsValue({
        name: res.data.contentName,
        remark: res.data.remark,
        title: res.data.title,
        description: res.data.description,
        keywords: res.data.keywords,
        type: res.data.templateId,
      });
    }
  };
  // 表单事件
  const saveForm = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
      let param: any = {
        contentName: values.name,
        elementId: props.currentPath,
        templateId: values.type,
        remark: values.remark,
        title: values.title,
        description: values.description,
        keywords: values.keywords,
      };
      if (!props.data?.contentId) {
        const res = await addItem(param);
        if (res.code == 200) {
          message.success('新增成功');
          props.closeDrawer();
        }
      } else {
        param.contentId = props.data?.contentId;
        const res = await updateItem(param);
        if (res.code == 200) {
          message.success('更新成功');
          props.closeDrawer();
        }
      }
    } catch (errorInfo: any) {
      form.scrollToField(errorInfo.errorFields[0].name[0]);
    }
  };
  const onChange = (value: string) => {
    // console.log(`selected ${value}`);
    setActiveKey(value);
  };

  const onSearch = (value: string) => {
    // console.log('search:', value);
  };
  // 选项卡事件
  const tabChange = (key: string) => {
    // console.log(key);
    // setActiveKey(key);
    setActiveKey(key);
  };
  // const tabItems = templatesList.map((item: any) => {
  //   return {
  //     label: item.name,
  //     key: item.id,
  //     children: (
  //       <GlobalPage
  //         comps={item.children}
  //         childrenChange={(newChildren: any) => childrenChange(newChildren, item)}
  //       />
  //     ),
  //   };
  // });
  const childrenChange = (newChildren: any, template: any) => {
    console.log('childrenChange');
    console.log('newChildren', newChildren);
    console.log('template', template);
    const cloneTemplates = JSON.parse(JSON.stringify(templatesList));
    const currentChange = cloneTemplates.filter((fItem: any) => fItem.id == template.id)[0];
    if (currentChange) {
      currentChange.children = newChildren;
    }
    setTemplatesList([...cloneTemplates]);
  };
  return (
    <div className={style.detail_box}>
      <div className={style.detail_content}>
        <div className={style.detail_content_title}>{props.formatPath}</div>
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
              <Row gutter={20}>
                <Col span={12}>
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
                <Col span={12}>
                  <Form.Item
                    label="标题"
                    name="title"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="请输入标题" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="备注"
                    name="remark"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="请输入备注" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="描述"
                    name="description"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Input placeholder="请输入描述" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="模板"
                    name="type"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      optionFilterProp="children"
                      onChange={onChange}
                      onSearch={onSearch}
                      allowClear
                      filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                      }
                      options={templatesOption}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="关键词"
                    name="keywords"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Input placeholder="请输入关键词" />
                  </Form.Item>
                </Col>
              </Row>

              {/* <IconBtn icon="icon-xianxing_jiankong_1" isBtn={true} /> */}
              {/* <EyeInvisibleOutlined /> */}
            </Form>
          </div>
        </div>
        <div className={style.detail_content_templates}>
          {templatesList?.length ? (
            <StickyContainer>
              {/* <Affix offsetTop={300}> */}
              <Tabs
                // defaultActiveKey="1"
                activeKey={activeKey}
                renderTabBar={renderTabBar}
                onChange={tabChange}
                items={tabItems}
              />
              {/* </Affix> */}
            </StickyContainer>
          ) : (
            <></>
          )}
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
