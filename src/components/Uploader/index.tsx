import { Upload,message, Image } from "antd"
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import IconBtn from "../IconBtn"
import style from './index.less'
import {useState,useEffect} from 'react';
interface UploaderProps {
    width?: string,
    height?: string,
    value?: string;
    onChange?: (value: string) => void;
  }
const Uploader: React.FC<UploaderProps> = ({ width='100%', height='100%',value = '', onChange })=>{

    const [fileList, setFileList] = useState<UploadFile[]>(()=>{
        if(!value){
            return []
        }
        return [
            {
                uid:'upload_01',
                name:value,
                status:'done',
                url:value,
            }

        ]
    });
    // const [uploadingList, setUploadingList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);
    const handleUpload = (uploadFile: any) => {
        if (uploading) {
          return;
        }

        const formData = new FormData();
        formData.append('files[]', uploadFile as RcFile);
        // uploadingList.forEach((file) => {
        
        // });
        // console.log('uploadingList',uploadingList);
        
        setUploading(true);
        // You can use any AJAX library you like
        fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
          method: 'POST',
          body: formData,
        })
          .then((res) => res.json())
          .then((result) => {
            // 此处url取返回数据中的url result.data.url
            // const url = uploadFile.url || ''
            console.log('成功url：',result);
            // 添加url参数
            uploadFile.url = '成功url'
            onChange?.('成功url')
            // 修改当前列表
            setFileList([uploadFile]);
            // 清空上传列表
            // setUploadingList([]);
            message.success('upload successfully.');
          })
          .catch(() => {
            // setUploadingList([]);
            message.error('upload failed.');
          })
          .finally(() => {
            setUploading(false);
          });
    
    };
    // useEffect(()=>{
    //     setFileList(value)
    //     return () => {};
    // },[value])
     const uploadOption: UploadProps = {
        onRemove: (file) => {
          setFileList([]);
        },
        beforeUpload: async(file) => {
            console.log('beforeUpload:file',file);
            // setUploadingList([file])
            handleUpload(file)
            //   setFileList([file]);
        
        return false;
        },
        fileList,
      }; 
      return (
        <div style={{width,height}} className={style.upload_fill_box}>
        
        <Upload {...uploadOption} style={{width:'100%',height:'100%'}} className={style.custom_uploader}>
            <div className={style.uploader_box}>
                {fileList.length?
                    // 重新上传
                    (<div className={style.uploader_change}>
                        <div className={style.uploader_change_img}>
                        <Image
                            width={'100%'}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            preview={false}
                        />
                        </div>
                        <div className={style.uploader_change_reload}>
                            <IconBtn icon="icon-xianxing_shangchuan_1" color="#fff" size={'32px'} />
                            <span>点击上传</span>
                        </div>
                    </div>)
                :
                    (<div className={style.uploader_default}>
                        <div className={style.uploader_default_icon}>
                            <IconBtn icon="icon-xianxing_shangchuan_1" color="#ccc" size={'32px'} />
                        </div>
                        <div className={style.uploader_default_font}>
                            点击上传
                        </div>
                    </div>)
                    // 新增上传
                }
                
            </div>
        </Upload>
        {uploading&&(<div className={style.uploading_box}>上传中...</div>)}
        </div>
    )
}
export default Uploader