import style from './index.less';
import React, { useState, useEffect } from 'react';
import HtmlChangeModal from '@/components/HtmlChangeModal';
interface GlobalPageProps {
  comps: Array<any>; //页面显示组件数据
  childrenChange: Function; // 修改页面显示数据方法
}
const defaultModal = {
  show: false,
  type: 3,
  data: {
    href: '',
    content: '',
  },
};
const GlobalPage = ({ comps, childrenChange }: GlobalPageProps) => {
  // 组件ref元素实例
  const [refArr, setRefArr] = useState<React.RefObject<HTMLDivElement>[]>([]);
  // 创建一个新的数组来存储ref
  const arr: React.RefObject<HTMLDivElement>[] = [];
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
      let newChildren = JSON.parse(JSON.stringify(comps));
      newChildren[index].content = refArr[index]?.current?.innerHTML;
      childrenChange(newChildren);
    }
  };

  // 编辑弹窗对象
  const [changeModalObj, setChangeModalObj] = useState(defaultModal);
  // 当前编辑元素
  const [currentTarget, setCurrentTarget] = useState<any>();
  // 当前编辑ref组件
  const [currentRefIndex, setCurrentRefIndex] = useState<any>();
  useEffect(() => {
    // 初始化设置当前模板值 ref创建
    comps.forEach((item: any, index: number) => {
      arr.push(React.createRef<HTMLDivElement>());
    });
    setRefArr(arr);
  }, [comps]);
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
    let newChildren = JSON.parse(JSON.stringify(comps));
    newChildren[currentRefIndex].content = refArr[currentRefIndex]?.current?.innerHTML;
    childrenChange(newChildren);
    //关闭组件内容编辑弹窗
    setChangeModalObj({ ...changeModalObj, show: false });
  };
  // 编辑弹窗删除事件
  const closeModal = () => {
    console.log('close');

    setChangeModalObj({ ...changeModalObj, show: false });
  };
  return (
    <div>
      <div className={style.gloabal_page_box}>
        {/* 头部html */}
        {/* style={{ pointerEvents: 'none' }} */}
        {comps.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className={style.gloabal_page_box_preview}
              onDoubleClick={(e) => eventListenDB(e, index)}
              onBlur={(e) => eventListenBlur(e, index)}
              dangerouslySetInnerHTML={{
                __html: item.componentContent,
              }}
              ref={refArr?.[index]}
            />
          );
        })}
      </div>
      {/* 底部html */}
      {/* style={{ pointerEvents: 'none' }} */}
      <HtmlChangeModal {...changeModalObj} close={closeModal} save={saveModal} />
    </div>
  );
};
export default GlobalPage;
