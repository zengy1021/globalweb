import HtmlChangeModal from '@/components/HtmlChangeModal';
import React, { useState, useRef, useEffect } from 'react';
import style from '../../index.less';
import CompsList from '@/components/CompsList';
import htmlComp from './htmlJson';
import { Tabs } from 'antd';
import EditComps from '@/components/EditComps';
const defaultModal = {
  show: false,
  type: 3,
  data: {
    href: '',
    content: '',
  },
};
interface DetialProps {
  compChange: Function;
  contentObj: any;
  childrenChange: Function;
  compsData: any;
}
const Detail = ({ compChange, contentObj, childrenChange, compsData }: DetialProps) => {
  // 组件ref元素实例
  const [refArr, setRefArr] = useState<React.RefObject<HTMLDivElement>[]>([]);
  // 创建一个新的数组来存储ref
  const arr: React.RefObject<HTMLDivElement>[] = [];
  // 编辑弹窗对象
  const [changeModalObj, setChangeModalObj] = useState(defaultModal);
  // 当前编辑元素
  const [currentTarget, setCurrentTarget] = useState<any>();
  // 当前编辑ref组件
  const [currentRefIndex, setCurrentRefIndex] = useState<any>();
  const [currentComps, setCurrentComps] = useState<any>();
  // 左侧菜单列表数据
  const [compList, setCompList] = useState<any>([]);

  // 监听双击事件
  const eventListenDB = (e: any, index: number) => {
    // 监听双击事件
    if (e.target.ondblclick) {
      if (e.target.getAttribute('edittype') == '1') {
        console.log('a标签 带链接');
        setChangeModalObj({
          ...changeModalObj,
          type: 1,
          show: true,
          data: {
            href: e.target.getAttribute('href'),
            content: e.target.innerHTML,
          },
        });
        // this.dialogOption.href = e.target.getAttribute('href');
      }
      if (e.target.getAttribute('edittype') == '2') {
        console.log('图片');
        setChangeModalObj({
          ...changeModalObj,
          type: 2,
          show: true,
          data: {
            href: '',
            content: e.target.src,
          },
        });
        // 处理 图片|视频 上传类型
        // this.dialogOption.content = e.target.src;
      }
      if (e.target.getAttribute('edittype') == '3') {
        console.log('文本');
        setChangeModalObj({
          ...changeModalObj,
          type: 3,
          show: true,
          data: {
            href: '',
            content: e.target.innerHTML,
          },
        });
        // this.dialogOption.content = e.target.innerHTML;
      }

      setCurrentTarget(e.target);
      setCurrentRefIndex(index);
    }
  };
  // 监听失去焦点事件
  const eventListenBlur = (e: any, index: number) => {
    if (e.target.onblur) {
      //监听页面输入框失去焦点事件
      if (!refArr[index].current || currentTarget) {
        return;
      }
      let newChildren = JSON.parse(JSON.stringify(contentObj.components));
      newChildren[index].componentContent = refArr[index]?.current?.innerHTML;
      childrenChange(newChildren);
    }
  };
  useEffect(() => {
    // 初始化设置当前模板值 ref创建
    contentObj.components?.forEach((item: any, index: number) => {
      arr.push(React.createRef<HTMLDivElement>());
    });
    setRefArr(arr);
    // 初始化左侧菜单列表数据
    setCurrentComps(contentObj.components);
  }, [contentObj]);
  useEffect(() => {
    console.log('compsData', compsData);

    setCompList(compsData);
  }, [compsData]);
  // 编辑弹窗保存事件
  const saveModal = (value: any) => {
    console.log('save', value);
    // console.log(currentTarget);
    if (changeModalObj.type == 1) {
      //a标签
      currentTarget.innerHTML = value.content;
      currentTarget.href = value.href;
    }
    if (changeModalObj.type == 2) {
      currentTarget.src = value.content;
    }
    if (changeModalObj.type == 3) {
      currentTarget.innerHTML = value.content;
    }
    //清空当前双击编辑目标对象 防止触发失去焦点事件
    setCurrentTarget(null);
    //更新当前组件需要保存对象数据 content:html
    let newChildren = JSON.parse(JSON.stringify(contentObj.components));
    newChildren[currentRefIndex].componentContent = refArr[currentRefIndex]?.current?.innerHTML;
    childrenChange(newChildren);
    //关闭组件内容编辑弹窗
    setChangeModalObj({ ...changeModalObj, show: false });
  };
  // 编辑弹窗删除事件
  const closeModal = () => {
    console.log('close');

    setChangeModalObj({ ...changeModalObj, show: false });
  };

  // 组件列表事件
  const selectComp = (comp: any) => {
    // console.log('选择', comp);
    compChange(comp);
  };
  // 编辑列表事件
  const compsChange = (comps: any) => {
    console.log('编辑列表事件', comps);
    childrenChange(comps);
  };
  const tabsItems = [
    {
      label: '组件',
      key: '1',
      children: <CompsList data={compList} type={2} selectComp={selectComp} />,
    }, // 务必填写 key
    {
      label: '编辑',
      key: '2',
      children: <EditComps data={currentComps} compsChange={compsChange} />,
    },
  ];
  return (
    <div className={style.content_detail_box}>
      <div className={style.content_left_box}>
        <Tabs items={tabsItems} centered />
      </div>
      <div className={style.content_right_box}>
        {/* 头部html */}
        {/* style={{ pointerEvents: 'none' }} */}
        {contentObj.components?.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className={style.content_right_box_preview}
              onDoubleClick={(e) => eventListenDB(e, index)}
              onBlur={(e) => eventListenBlur(e, index)}
              dangerouslySetInnerHTML={{
                __html: item.componentContent,
              }}
              ref={refArr?.[index]}
            />
          );
        })}
        {/* <div
          className={style.content_right_box_preview}
          onDoubleClick={(e) => eventListenDB(e)}
          onBlur={(e) => eventListenBlur(e)}
          dangerouslySetInnerHTML={{
            __html: currentCompHtml,
          }}
          ref={compRef}
        /> */}
      </div>
      {/* 底部html */}
      {/* style={{ pointerEvents: 'none' }} */}
      <HtmlChangeModal {...changeModalObj} close={closeModal} save={saveModal} />
    </div>
  );
};
export default Detail;
