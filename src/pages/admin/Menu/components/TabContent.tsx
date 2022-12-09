import style from '../index.less';
import { Button, Input } from 'antd';
import { useEffect, useState } from 'react';
const { TextArea } = Input;
interface TabContentProps {
  value: string; //代码
  changeValue: Function; // 修改代码
  tabObj: any; //修改目标对象
}
const TabContent = ({ value, changeValue, tabObj }: TabContentProps) => {
  const [code, setCode] = useState(value);
  const [isEidt, setIsEdit] = useState(false);
  useEffect(() => {
    setCode(value);
  }, [value]);
  const onChange = (e: any) => {
    setCode(e.target.value);
  };

  const edit = () => {
    console.log('edit');
    setIsEdit(true);
  };
  const save = () => {
    changeValue(code, tabObj);
    setIsEdit(false);
  };
  const cancel = () => {
    setCode(value);
    setIsEdit(false);
  };
  return (
    <>
      <div className={style.header_box}>
        <div className={style.header_left_box}>
          <div className={style.header_left_title}>代码</div>
          {/* <div className={style.header_left_dec}>用户管理与权限设置</div> */}
        </div>
        {!isEidt ? (
          <div className={style.header_right_btn}>
            <Button
              // type="primary"
              style={{ width: '120px', height: '40px', borderRadius: '6px' }}
              onClick={() => edit()}
            >
              编辑
            </Button>
          </div>
        ) : (
          <div className={style.header_right_btn}>
            <Button
              // type="primary"
              style={{ width: '120px', height: '40px', borderRadius: '6px' }}
              onClick={() => cancel()}
            >
              取消
            </Button>
            <Button
              type="primary"
              style={{ width: '120px', height: '40px', borderRadius: '6px', marginLeft: '10px' }}
              onClick={() => save()}
            >
              保存
            </Button>
          </div>
        )}
      </div>
      <div className={style.content_box}>
        <TextArea
          disabled={!isEidt}
          value={code}
          onChange={onChange}
          autoSize={{ minRows: 8, maxRows: 16 }}
        />
      </div>
    </>
  );
};
export default TabContent;
