import { message } from 'antd';
import { useEffect, useState } from 'react';
import { updateType } from '../api';
import TypeList from './TypeList';

interface TypesMenuProps {
  typeHandler: Function;
  data: any;
  curType: any;
  changeCurType: Function;
}
const TypesMenu = ({ typeHandler, data, curType, changeCurType }: TypesMenuProps) => {
  const [currentType, setCurrentType] = useState<any>({});
  const [listData, setListData] = useState<any>([]);
  useEffect(() => {
    setListData([...data]);
  }, [data]);
  useEffect(() => {
    setCurrentType(curType);
  }, [curType]);
  const typeChange = async (item: any, type: number) => {
    console.log('typeChange', item);
    switch (type) {
      case 1: //修改当前选择类型
        // setCurrentType({ ...item });
        changeCurType({ ...item });
        break;
      case 2: //编辑类型数据 update接口
        // setCurrentType({ ...item });
        const res = await updateType({
          id: item.id,
          name: item.name,
        });
        if (res.code == 200) {
          message.success('修改成功');
          typeHandler(2, item);
        }
        break;
      case 3: //删除类型数据 delete接口   判断是否是当前选择类型 true：修改当前类型为全部 或上一个
        // setCurrentType({ ...item });
        typeHandler(3, item);
        break;
      case 4: //打开新增类型弹窗 post接口
        // setCurrentType({ ...item });
        typeHandler(1);
        break;
      default:
        return;
    }
  };
  return (
    <div style={{ height: '100%' }}>
      <TypeList data={listData} currentType={currentType} typeChange={typeChange} />
    </div>
  );
};

export default TypesMenu;
