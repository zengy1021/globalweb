import { useState, useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs';
import IconBtn from '../IconBtn';
import style from './index.less';
interface EditCompsProps {
  data: Array<any>;
  compsChange: Function;
}
const EditComps = ({ data, compsChange }: EditCompsProps) => {
  const [currentList, setCurrentList] = useState<any>([]);
  useEffect(() => {
    setCurrentList([...data]);
    // }
  }, [data]);
  const onEnd = (evt: any) => {
    let cloneData = JSON.parse(JSON.stringify(data));
    cloneData.splice(evt.newIndex, 0, cloneData.splice(evt.oldIndex, 1)[0]);
    let newArray = cloneData.slice(0);
    compsChange(newArray);
  };
  const deleteComp = (item: any, index: number) => {
    console.log('删除', item);
    let cloneData = JSON.parse(JSON.stringify(data));
    // 是否添加二次确认弹窗？ 暂时不添加
    console.log(cloneData.splice(index, 1), cloneData);
    compsChange(cloneData);
  };
  return (
    <div className={style.edit_box}>
      <ReactSortable list={currentList} setList={setCurrentList} onEnd={onEnd} animation={200}>
        {currentList.map((item: any, index: number) => (
          <div
            className={style.edit_item}
            key={`${item.id}${index}`}
            style={{
              [item.componentImage ? 'background' : '']: `url(${
                item.componentImage || '@/assets/imgs/login.png'
              }) center center / 100% no-repeat`,
            }}
          >
            <div className={style.edit_item_bottom_box}>
              <div className={style.edit_item_bottom_name}>{item.name}</div>
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
