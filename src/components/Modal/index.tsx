import { Button, Modal } from 'antd';
import { useState, useEffect } from 'react';
import IconBtn from '../IconBtn';
import style from './index.less';
interface ModalProps {
  show: boolean; //展示|隐藏
  width?: number; // 弹窗宽度
  children?: any; //插槽内容
  title: any; // 标题
  close: Function; // 关闭方法
  footer?: any; //底部插槽
  btn?: boolean; //是否显示底部按钮
  save?: Function; // 保存方法
}
export default function ModalBox({
  width = 440,
  show,
  children,
  title,
  close,
  footer,
  btn = true,
  save,
}: ModalProps) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(show);
  }, [show]);
  const onCancel = () => {
    close();
  };
  const onSave = () => {
    save ? save() : close();
  };
  return (
    <Modal
      className={style.custom_modal}
      centered
      closable
      closeIcon={<IconBtn icon="icon-xianxing_guanbi_1" color="#888" size="16px" isBtn />}
      title={title}
      open={open}
      onCancel={() => onCancel()}
      footer={null}
      width={width}
      maskClosable={false}
      keyboard={false}
      destroyOnClose
    >
      <div className={style.custom_modal_box}>
        <div className={style.custom_modal_box_content}>{children}</div>
        <div className={style.custom_modal_box_footer}>
          {footer && footer}
          {btn && (
            <div className={style.custom_modal_box_footer_btn}>
              <Button className={style.btn} onClick={onCancel}>
                取消
              </Button>
              <Button className={style.btn} type="primary" onClick={onSave}>
                确认
              </Button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
