// import DrawerBox from '@/components/Drawer';
// import ModalBox from '@/components/Modal';
import PageLayout from '@/components/PageLayout';
import { Button } from 'antd';
import CompBox from './components/CompBox';
import style from './index.less';
import { useEffect, useState } from 'react';
// import Detail from '../User/components/Detail';
const list = [
  {
    typeId: 1,
    name: '分组1',
    children: [
      {
        id: 'a',
        name: '组件1',
        bgImg:
          'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
        contente: '',
      },
      {
        id: 'a',
        name: '组件1',
        bgImg:
          'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
        contente: '',
      },
      {
        id: 'a',
        name: '组件1',
        bgImg:
          'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
        contente: '',
      },
      {
        id: 'a',
        name: '组件1',
        bgImg:
          'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
        contente: '',
      },
      {
        id: 'a',
        name: '组件1',
        bgImg:
          'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
        contente: '',
      },
    ],
  },
];
let newList: any = [];
const Components = () => {
  const [comps, setComps] = useState(list);
  const resizeUpdate = () => {
    // 通过事件对象获取浏览器窗口的高度
    let w = window.innerWidth;
    w = w - 220 - 40 - 70;
    console.log(w);

    let colNum = Math.floor(w / 260) || 1;
    console.log('1', colNum);

    // if (colNum !== 1) {
    //   let newW = w - 30 * (colNum - 1);
    //   colNum = Math.floor(newW / 150) || 1;
    // }

    // newList = [];
    // // 创建列对象
    // for (let i = 1; i <= colNum; i++) {
    //   newList.push([]);
    // }
    // list.map((item, index) => {
    //   newList[index % colNum].push(item);
    // });

    // // setWidth(w);
    // for (let cI = colNum - 1; cI >= 0; cI--) {
    //   if (!newList[cI].length) {
    //     newList.splice(cI, 1);
    //   }
    // }
    // setComps(newList);
  };
  useEffect(() => {
    // 页面变化时获取浏览器窗口的大小
    window.addEventListener('resize', resizeUpdate);
    resizeUpdate();
    return () => {
      // 组件销毁时移除监听事件
      window.removeEventListener('resize', resizeUpdate);
    };
  }, []);

  return (
    <div>
      {/* 内容区域 */}
      <PageLayout>
        <div className={style.component_content}>
          <div className={style.header_box}>
            <div className={style.header_left_title}>组件</div>
            <div className={style.header_right_btn}>
              <Button
                type="default"
                className={style.header_right_item}
                //  onClick={() => addNewUser()}
              >
                添加分组
              </Button>
              <Button
                type="primary"
                className={style.header_right_item}
                // onClick={() => addNewUser()}
              >
                添加组件
              </Button>
            </div>
          </div>
          {/* 组件内容区域 */}
          <div className={style.content_box}>
            <CompBox list={comps}></CompBox>
          </div>
        </div>
      </PageLayout>
      {/* 滑窗区域 */}
      {/* <DrawerBox show={drawerObj.show}>
        <Detail closeDrawer={closeDrawer} />
      </DrawerBox> */}
      {/* 弹窗区域 */}
      {/* <ModalBox {...modalObj} close={() => closeModal()} save={modalSave}>
        <div>大萨达撒</div>
      </ModalBox> */}
    </div>
  );
};
export default Components;
