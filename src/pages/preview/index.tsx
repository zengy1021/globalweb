import { useEffect, useState } from 'react';
import { requestFooterCommon, requestHeaderCommon } from '../admin/Menu/api';
// import { useParams } from "umi";
import style from './index.less';
const PreviewBox = () => {
  // let params: any = useParams();
  const [dataList, setDataList] = useState<any>([]);
  const previewData = JSON.parse(localStorage.getItem('previewData') || '');
  useEffect(() => {
    // params.id
    // console.log(previewData);
    requestData();
  }, []);
  const requestData = async () => {
    let newList: any = [];
    const res = await requestHeaderCommon();
    if (res.code == 200) {
      newList.push({ componentContent: res.data.content });
    }

    previewData.forEach((item: any) => {
      item.componentContent = item.componentContent.replaceAll(
        'contenteditable="true"',
        'contenteditable="false"',
      );
      item.componentContent = item.componentContent.replaceAll('href', 'data');
    });
    newList = newList.concat(previewData);
    const res2 = await requestFooterCommon();
    if (res2.code == 200) {
      newList.push({ componentContent: res2.data.content });
    }
    setDataList([...newList]);
  };
  return (
    <div>
      {dataList.map((item: any, index: number) => {
        return (
          <div
            // style={{ pointerEvents: 'none ' }}
            key={index}
            className={style.preview_item}
            // onDoubleClick={(e) => eventListenDB(e, index)}
            // onBlur={(e) => eventListenBlur(e, index)}
            dangerouslySetInnerHTML={{
              __html: item.componentContent,
            }}
          />
        );
      })}
    </div>
  );
};
export default PreviewBox;
