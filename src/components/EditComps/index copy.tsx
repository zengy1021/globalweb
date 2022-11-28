import { useState, useEffect, useRef } from 'react';
import Sortable from 'sortablejs';
import style from './index.less';
interface EditCompsProps {
  data: Array<any>;
  compsChange: Function;
}
const EditComps = ({ data, compsChange }: EditCompsProps) => {
  const sortableGroupDecorator = (componentBackingInstance: any) => {
    if (componentBackingInstance) {
      let options = {
        draggable: '.rows',
        animation: '150',
        onEnd: (evt: any) => {
          let cloneData = JSON.parse(JSON.stringify(data));
          cloneData.splice(evt.newIndex, 0, cloneData.splice(evt.oldIndex, 1)[0]);
          let newArray = cloneData.slice(0);
          compsChange(newArray);
        },
      };
      Sortable.create(componentBackingInstance, options);
    }
  };
  const compsRef = useRef(null);
  const [currentList, setCurrentList] = useState<any>([]);
  useEffect(() => {
    // if (data.length) {
    //   new Sortable(compsRef.current, {
    //     animation: 150,
    //     ghostClass: 'blue-background-class',
    //     onEnd: function (evt: any) {
    //       // console.log(evt);
    //       let cloneData = JSON.parse(JSON.stringify(data));
    //       cloneData.splice(evt.newIndex, 0, cloneData.splice(evt.oldIndex, 1)[0]);
    //       let newArray = cloneData.slice(0);
    //       compsChange(newArray);
    //     },
    //   });
    //   setCurrentList(data);
    // }
  }, [data]);

  return (
    <>
      {currentList.length ? (
        <div className={style.edit_box} ref={sortableGroupDecorator}>
          {currentList.map((item: any, index: number) => (
            <div key={index}>{item.name}</div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
export default EditComps;
