import IconBtn from '@/components/IconBtn';
import { Form, Input, message } from 'antd';
import { useState } from 'react';
import style from './typeList.less';
import classNames from 'classnames';
interface TypeList {
  data: any; // 文章类型列表数据
  currentType: any; // 当前选择文章类型
  typeChange: Function; // 修改当前文章类型回调方法  item:当前操作类型对象 type:操作方式 1:change当前选择类型 2:更新当前类型数据 3:删除当前类型 4:触发添加类型事件
}
const defaultUserInfo = {
  name: '',
};
const TypeList = ({ data, currentType, typeChange }: TypeList) => {
  const [form] = Form.useForm();
  const [editItem, setEditItem] = useState<any>({});
  const itemChange = (item: any) => {
    typeChange(item, 1);
  };
  const itemEdit = (item: any) => {
    if (item.id == 'all') {
      //全部不能编辑
      return;
    }
    form.setFieldValue('name', item.name);
    setEditItem({ ...item });
  };
  const saveEdit = () => {
    const editObj: any = form.getFieldsValue();
    if (!editObj.name) {
      message.warning('分类名不能为空');
      return;
    }
    if (editObj.name == editItem.name) {
      // debugger;
      setEditItem({});
      return;
    }
    typeChange({ ...editItem, name: editObj.name }, 2);
    setEditItem({});
  };
  const removeItem = (item: any, e: any) => {
    typeChange(item, 3);
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };
  const cancelEdit = (item: any) => {
    setEditItem({});
  };
  return (
    <div className={style.type_box}>
      <Form
        form={form}
        colon={false}
        initialValues={defaultUserInfo}
        // size={'large'}
        requiredMark={false}
      >
        {data.map((item: any, index: number) => (
          <div
            className={classNames(style.type_item_box, {
              [style.currentSelect]: item.id == currentType.id,
            })}
            key={index}
            onClick={() => itemChange(item)}
          >
            {/* <div className={style.type_item_box} key={index}> */}
            <div className={style.type_item_icon_box}>
              <div className={style.type_item_icon}></div>
            </div>
            <div className={style.type_item_label_box} onDoubleClick={() => itemEdit(item)}>
              {editItem.id != item.id ? ( // 非编辑项
                <div className={style.type_item_label}>
                  <div className={style.type_item_label_text}>{item.name}</div>
                  {item.id !== 'all' && (
                    <div
                      className={style.type_item_label_delete}
                      onClick={(e) => removeItem(item, e)}
                    >
                      <IconBtn icon="icon-xianxing_shanchu_1" size={'22px'} isBtn color="#888888" />
                    </div>
                  )}
                </div>
              ) : (
                // 编辑项
                <div className={style.type_item_label_input}>
                  <Form.Item
                    label=""
                    name="name"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input autoFocus placeholder="请输入" onBlur={saveEdit} />
                  </Form.Item>
                  <div
                    className={style.type_item_label_input_cancel}
                    onClick={() => cancelEdit(item)}
                  >
                    取消
                    {/* <IconBtn icon="icon-xianxing_shanchu_1" size={'22px'} isBtn color="#1890FF" /> */}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        <div
          className={classNames(style.type_item_box, {
            [style.add_box]: true,
          })}
          onClick={() => typeChange({}, 4)}
        >
          {/* <div className={style.type_item_box} key={index}> */}
          <div className={classNames(style.type_item_icon_box, {})}>
            <IconBtn icon="icon-xianxing_tianjia_1" size={'20px'} color={'#cccccc'} />
          </div>
          <div className={style.type_item_label_box}>添加</div>
        </div>
      </Form>
    </div>
  );
};
export default TypeList;
