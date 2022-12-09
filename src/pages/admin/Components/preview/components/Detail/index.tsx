import HtmlChangeModal from '@/components/HtmlChangeModal';
import { useState, useRef, useEffect } from 'react';
import style from '../../index.less';
import CompsList from '@/components/CompsList';

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
  compsList: any;
  compObj: any;
}
const Detail = ({ compChange, compsList, compObj }: DetialProps) => {
  // 组件ref元素实例
  const compRef = useRef(null);
  // 当前组件html
  const [currentCompHtml, setCurrentCompHtml] = useState('');
  // 编辑弹窗对象
  const [changeModalObj, setChangeModalObj] = useState(defaultModal);
  // 当前编辑元素
  const [currentTarget, setCurrentTarget] = useState<any>();
  // 左侧菜单列表数据
  const [compList, setCompList] = useState<any>([]);
  // 监听双击事件
  // const eventListenDB = (e: any) => {
  //   // 监听双击事件
  //   if (e.target.ondblclick) {
  //     // console.log(e.target.getAttribute('href'), item);
  //     // console.log(e.target.src);
  //     // this.dialogOption.title = '编辑';
  //     if (e.target.getAttribute('edittype') == '1') {
  //       console.log('a标签 带链接');
  //       setChangeModalObj({
  //         ...changeModalObj,
  //         type: 1,
  //         show: true,
  //         data: {
  //           href: e.target.getAttribute('href'),
  //           content: e.target.innerHTML,
  //         },
  //       });
  //       // this.dialogOption.href = e.target.getAttribute('href');
  //     }
  //     if (e.target.getAttribute('edittype') == '2') {
  //       console.log('图片');
  //       setChangeModalObj({
  //         ...changeModalObj,
  //         type: 2,
  //         show: true,
  //         data: {
  //           href: '',
  //           content: e.target.src,
  //         },
  //       });
  //       // 处理 图片|视频 上传类型
  //       // this.dialogOption.content = e.target.src;
  //     }
  //     if (e.target.getAttribute('edittype') == '3') {
  //       console.log('文本');
  //       setChangeModalObj({
  //         ...changeModalObj,
  //         type: 3,
  //         show: true,
  //         data: {
  //           href: '',
  //           content: e.target.innerHTML,
  //         },
  //       });
  //       // this.dialogOption.content = e.target.innerHTML;
  //     }
  //     setCurrentTarget(e.target);
  //   }
  // };
  // 监听失去焦点事件
  // const eventListenBlur = (e: any) => {
  //   if (e.target.onblur) {
  //     //监听页面输入框失去焦点事件
  //     if (!compRef.current || currentTarget) {
  //       return;
  //     }
  //     // const newHTML:string =
  //     setCurrentCompHtml(compRef?.current?.innerHTML);
  //     // if (e.target.getAttribute('edittype') == '1') {
  //     //   setCurrentCompHtml(e.target.html)
  //     // }
  //     // if (e.target.getAttribute('edittype') == '2') {

  //     // }
  //     // if (e.target.getAttribute('edittype') == '3') {

  //     // }
  //   }
  // };
  useEffect(() => {
    // 初始化左侧菜单列表数据
    setCompList(compsList);
  }, [compsList]);
  useEffect(() => {
    // 初始化设置当前html值
    setCurrentCompHtml(compObj.componentContent);
  }, [compObj]);
  // 编辑弹窗保存事件
  const saveModal = (value: any) => {
    // console.log('save', value);
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
    // console.log(value);

    // console.log(compRef?.current?.innerHTML);
    //清空当前双击编辑目标对象 防止触发失去焦点事件
    setCurrentTarget(null);
    //更新当前组件需要保存对象数据 content:html
    setCurrentCompHtml(compRef?.current?.innerHTML);
    //关闭组件内容编辑弹窗
    setChangeModalObj({ ...changeModalObj, show: false });
  };
  // 编辑弹窗删除事件
  const closeModal = () => {
    // console.log('close');

    setChangeModalObj({ ...changeModalObj, show: false });
  };

  // 组件列表事件
  const selectComp = (comp: any) => {
    // console.log('选择', comp);
    compChange(comp);
  };
  return (
    <div className={style.content_detail_box}>
      <div className={style.content_left_box}>
        <CompsList data={compList} type={1} selectComp={selectComp} />
      </div>
      <div className={style.content_right_box}>
        <div
          style={{ pointerEvents: 'none' }}
          className={style.content_right_box_preview}
          // onDoubleClick={(e) => eventListenDB(e)}
          // onBlur={(e) => eventListenBlur(e)}
          dangerouslySetInnerHTML={{
            __html: currentCompHtml,
          }}
          ref={compRef}
        />
      </div>
      <HtmlChangeModal {...changeModalObj} close={closeModal} save={saveModal} />
    </div>
  );
};
export default Detail;
