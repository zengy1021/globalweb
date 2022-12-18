import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs';
import IconBtn from '../IconBtn';
import style from './index.less';
interface EditCompsProps {
  data: Array<any>;
  compsChange: Function;
  compsClick?: Function;
  currentCompIndex?: any;
}
const EditComps = ({ data, compsChange, compsClick, currentCompIndex }: EditCompsProps) => {
  const [currentList, setCurrentList] = useState<any>([]);
  // 组件ref元素实例
  const [refArrList, setRefArrList] = useState<React.RefObject<HTMLDivElement>[]>([]);
  // 创建一个新的数组来存储ref
  const arr: React.RefObject<HTMLDivElement>[] = [];
  useEffect(() => {
    // 初始化设置当前模板值 ref创建
    data?.forEach((item: any, index: number) => {
      arr.push(React.createRef<HTMLDivElement>());
    });
    setRefArrList(arr);
    setCurrentList([...data]);
    // }
  }, [data]);
  useEffect(() => {
    refArrList[currentCompIndex]?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentCompIndex]);
  const onEnd = (evt: any) => {
    let cloneData = JSON.parse(JSON.stringify(data));
    cloneData.splice(evt.newIndex, 0, cloneData.splice(evt.oldIndex, 1)[0]);
    let newArray = cloneData.slice(0);
    console.log('evt', evt);
    compsChange(newArray);
    compsClick && compsClick(evt, evt.newIndex);
  };
  const deleteComp = (item: any, index: number) => {
    console.log('删除', item);
    let cloneData = JSON.parse(JSON.stringify(data));
    // 是否添加二次确认弹窗？ 暂时不添加
    console.log(cloneData.splice(index, 1), cloneData);
    compsChange(cloneData);
  };
  const handlerClick = (item: any, index: number) => {
    compsClick && compsClick(item, index);
  };
  return (
    <div className={style.edit_box}>
      <ReactSortable list={currentList} setList={setCurrentList} onEnd={onEnd} animation={200}>
        {currentList.map((item: any, index: number) => (
          <div
            className={classNames(style.edit_item, {
              [`${style.edit_item_active}`]: index == currentCompIndex,
            })}
            key={`${item.id}${index}`}
            onClick={() => handlerClick(item, index)}
            style={{
              [item.componentImage ? 'background' : '']: `url(${
                item.componentImage || '@/assets/imgs/login.png'
              }) center center / cover no-repeat`,
            }}
            ref={refArrList?.[index]}
          >
            <div className={style.edit_item_shadow}></div>
            <div
              className={classNames(style.edit_item_bottom_box, {
                [`${style.edit_item_active_line}`]: index == currentCompIndex,
              })}
            >
              <div className={style.edit_item_bottom_name}>{item.componentName}</div>
              <div className={style.edit_item_bottom_sort}>{index + 1}</div>
            </div>
            <div className={style.edit_item_hover_box}>
              <div className={style.edit_item_hover_name}>拖拽排序</div>
              <div className={style.edit_item_hover_btn} onClick={(e) => e.stopPropagation()}>
                <IconBtn
                  handleClick={() => deleteComp(item, index)}
                  icon="icon-xianxing_shanchu_1"
                  color="#ffffff"
                  size={'20px'}
                  isBtn
                />
              </div>
            </div>
          </div>
        ))}
      </ReactSortable>
    </div>
  );
};
export default EditComps;
