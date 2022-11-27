import style from './index.less'
import { Form, Input } from "antd";
import ModalBox from '../Modal'
import Uploader from '../Uploader';
import {useState,useEffect} from 'react'
const { TextArea } = Input;
interface ModalProps {
    show?: boolean; //展示|隐藏
    width?: number; // 弹窗宽度
    children?: any; //插槽内容
    title: any; // 标题
    close?: any; // 关闭方法
    footer?: any; //底部插槽
    btn?: boolean; //是否显示底部按钮
    save?: any; // 保存方法
}
const defaultModalProps: ModalProps = {
    width:700,
    title:'编辑',
}
interface DataProps {
    href: string,
    content: string
}
interface HTMLModalProps {
    show: boolean;
    type: number|string;
    data: DataProps;
    close?: any; // 关闭方法
    save?: any; // 保存方法
}
const HtmlChangeModal = ({show=false,type=3,close,save,data}: HTMLModalProps)=>{
    const [form] = Form.useForm();
    // 表单上传
    // const defaultUserInfo: any = {};
    const [formObj] = useState(data)
    const onFinish = (values: any) => {
        save(values)
    };
    const checkFile = (_: any, value: any,validaName: string)=>{
        // console.log('_',_);
        // console.log('value',value);
        if (value) {
        return Promise.resolve();
        }
        return Promise.reject(new Error(validaName+'不能为空'));
    }
    const saveModal = ()=>{
        form.submit()
    }
    useEffect(()=>{
        // setFormObj({...formObj,...data})
        // defaultUserInfo = JSON.parse(JSON.stringify(data))
        Object.keys(data).forEach(key => {
            form.setFieldValue(key,data[key])
        });
        return ()=>{

        }
    },[data, form])
    // 表单结束
    return (
        <ModalBox {...defaultModalProps} show={show} close={close} save={()=>saveModal()}>
            <div>
                {type==1&&(
                    <div>
                        <Form  
                            form={form}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            layout="vertical"
                            initialValues={formObj}
                            size={'large'}
                            scrollToFirstError={true}
                            requiredMark={false}
                            validateMessages={{ required: '${label}不能为空' }}
                            onFinish={onFinish}>
                             <Form.Item
                                label="href"
                                name="href"
                                rules={[
                                {
                                    required: true,
                                },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="内容"
                                name="content"
                                rules={[
                                {
                                    required: true,
                                },
                                ]}
                            >
                                <TextArea autoSize={{minRows:4,maxRows:8}} />
                            </Form.Item>
                        </Form>
                    </div>
                )}
                {type==2&&(<div>
                    <Form  
                            form={form}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            layout="vertical"
                            initialValues={formObj}
                            size={'large'}
                            scrollToFirstError={true}
                            requiredMark={false}
                            validateMessages={{ required: '${label}不能为空' }}
                            onFinish={onFinish}>
                            <Form.Item
                                label="资源"
                                name="content"
                                rules={
                                [
                                    { validator: (_: any, value: any)=>checkFile(_,value,'资源') 
                                }]}
                            >
                                    <Uploader width={'240px'} height={'120px'} />
                            </Form.Item>
                        </Form>
                </div>)}
                {type==3&&(<div>  <Form  
                            form={form}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            layout="vertical"
                            initialValues={formObj}
                            size={'large'}
                            scrollToFirstError={true}
                            requiredMark={false}
                            validateMessages={{ required: '${label}不能为空' }}
                            onFinish={onFinish}>
                             <Form.Item
                                label="内容"
                                name="content"
                                rules={[
                                {
                                    required: true,
                                },
                                ]}
                            >
                                <TextArea autoSize={{minRows:4,maxRows:8}} />
                            </Form.Item>
                        </Form></div>)}
            </div>
        </ModalBox>
    )
}
export default HtmlChangeModal