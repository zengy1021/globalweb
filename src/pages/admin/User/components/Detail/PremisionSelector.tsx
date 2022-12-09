import { Checkbox, Col, Row } from 'antd';
import style from './index.less';
import { useState, useEffect } from 'react';
export default function PremisionSelector(props: any) {
  const [checkedOptions, setCheckedOptions] = useState<any>([]);
  const [checkAll, setCheckAll] = useState(false);
  const [checkedList, setCheckedList] = useState<any>([]);
  useEffect(() => {
    // console.log('props', props);
    let checkNum = 0;
    if (props?.item?.children?.length) {
      let checkList: any = [];
      props.item.children.forEach((item: any) => {
        if (item.isAuth) {
          checkList.push(item.menuId);
          checkNum++;
        }
      });
      // console.log('checkList', checkList);

      // 设置选择项
      setCheckedOptions([...props.item.children]);
      // 设置初始化已选择项
      setCheckedList([...checkList]);
      // 设置全选项
      if (checkNum) {
        setCheckAll(true);
      } else {
        setCheckAll(false);
      }
      // setCheckAll(props.item.checked);
    }
    return () => {};
  }, [props.item]);

  const onChange = (list: any) => {
    setCheckedList([...list]);
    checkedOptions.forEach((checkItem: any) => {
      // allCheckList.push(checkItem.id);
      if (list.includes(checkItem.menuId)) {
        checkItem.isAuth = true;
      } else {
        checkItem.isAuth = false;
      }
    });
    if (list.length) {
      setCheckAll(true);
      props.changeItem({ ...props.item, isAuth: true, children: checkedOptions });
    } else {
      setCheckAll(false);
      props.changeItem({ ...props.item, isAuth: false, children: checkedOptions });
    }
    console.log('checkedOptions', checkedOptions);
    // props.changeItem(checkedOptions);
  };

  const onCheckAllChange = (e: any) => {
    setCheckAll(e.target.checked);

    if (e.target.checked) {
      // 全选
      let allCheckList: any = [];
      checkedOptions.forEach((checkItem: any) => {
        allCheckList.push(checkItem.menuId);
        checkItem.isAuth = true;
      });
      setCheckedList([...allCheckList]);
      props.changeItem({ ...props.item, isAuth: true, children: checkedOptions });
    } else {
      // 全部取消
      checkedOptions.forEach((checkItem: any) => {
        checkItem.isAuth = false;
      });
      setCheckedList([]);
      props.changeItem({ ...props.item, isAuth: false, children: checkedOptions });
    }

    // console.log('checkedOptions', checkedOptions);
  };
  return (
    <div className={style.detail_content_premission_item}>
      <div className={style.check_all}>
        <Checkbox onChange={onCheckAllChange} checked={checkAll}>
          {props.item.menuName}
        </Checkbox>
      </div>
      <div className={style.check_item}>
        <Checkbox.Group style={{ width: '100%' }} value={checkedList} onChange={onChange}>
          <Row>
            {props.item.children?.map((item: any, index: number) => (
              <Col span={24} key={index} style={{ marginBottom: '16px' }}>
                <Checkbox value={item.menuId}>{item.menuName}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </div>
    </div>
  );
}
