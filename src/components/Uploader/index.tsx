import { Upload, message, Image } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import IconBtn from '../IconBtn';
import style from './index.less';
import { useState, useEffect } from 'react';
import { upload } from '@/services/ant-design-pro/api';
interface UploaderProps {
  width?: string;
  height?: string;
  value?: string;
  onChange?: any;
}
const Uploader = ({ width, height, value, onChange }: UploaderProps) => {
  const [fileList, setFileList] = useState<any>([]);
  useEffect(() => {
    if (value) {
      //   setFileList([]);
      setFileList([
        {
          uid: 'upload_01',
          name: value,
          status: 'done',
          url: value,
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [value]);
  // const [uploadingList, setUploadingList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  //   const fileChange = ({ file, fileList }: { file: any; fileList: any }) => {
  //     setFileList([...fileList]);
  //     if (file.response) {
  //       changeFile(file.response.data.img);
  //     }
  //   };
  const handleUpload = (uploadFile: any) => {
    if (uploading) {
      return;
    }

    const formData = new FormData();
    let imgSrc = fileList[0]?.url || '';
    formData.append('file', uploadFile);
    formData.append('src', imgSrc);
    // formData.append('files[]', uploadFile as RcFile);
    // uploadingList.forEach((file) => {

    // });
    // console.log('uploadingList',uploadingList);

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
        // onChange(res.data);
        onChange(res.data);
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
  // useEffect(()=>{
  //     setFileList(value)
  //     return () => {};
  // },[value])
  const uploadOption: UploadProps = {
    onRemove: (file) => {
      setFileList([]);
    },
    beforeUpload: async (file) => {
      //   console.log('beforeUpload:file', file);
      // setUploadingList([file])
      handleUpload(file);
      //   setFileList([file]);

      return false;
    },
    // onChange: fileChange,
    showUploadList: false,
    fileList,
  };
  return (
    <div style={{ width, height }} className={style.upload_fill_box}>
      <Upload
        {...uploadOption}
        style={{ width: '100%', height: '100%', position: 'relative' }}
        className={style.custom_uploader}
      >
        <div className={style.uploader_box}>
          {
            fileList.length ? (
              // 重新上传
              <div className={style.uploader_change}>
                <div className={style.uploader_change_img}>
                  <Image width={'100%'} src={fileList[0]?.url} preview={false} />
                </div>
                <div className={style.uploader_change_reload}>
                  <IconBtn icon="icon-xianxing_shangchuan_1" color="#fff" size={'32px'} />
                  <span>点击上传</span>
                </div>
              </div>
            ) : (
              <div className={style.uploader_default}>
                <div className={style.uploader_default_icon}>
                  <IconBtn icon="icon-xianxing_shangchuan_1" color="#ccc" size={'32px'} />
                </div>
                <div className={style.uploader_default_font}>点击上传</div>
              </div>
            )
            // 新增上传
          }
        </div>
      </Upload>
      {uploading && <div className={style.uploading_box}>上传中...</div>}
    </div>
  );
};
export default Uploader;
