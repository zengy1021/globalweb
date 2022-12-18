import { Drawer } from 'antd';
// import type { DrawerProps } from 'antd/es/drawer';
import { useState, useEffect } from 'react';
interface DrawerProps {
  show: boolean; // 显示||收起
  width?: number; //宽度
  placement?: string; //抽屉的方向  top | right | bottom | left
  mask?: boolean; // 是否展示蒙层
  maskClosable?: boolean; //点击蒙层是否关闭
  children?: any;
}
const DrawerBox = ({
  show,
  width = 1000,
  placement = 'right',
  mask = true,
  maskClosable = true,
  children,
}: DrawerProps) => {
  const [open, setOpen] = useState(show);
  useEffect(() => {
    setOpen(show);
    return () => {};
  }, [show]);
  return (
    <Drawer
      width={width}
      placement="right"
      open={open}
      maskClosable={true}
      keyboard={true}
      bodyStyle={{ padding: 0 }}
      destroyOnClose={true} // 关闭时销毁元素
      headerStyle={{ display: 'none' }} // 隐藏头部 自定义布局内容
    >
      {children}
    </Drawer>
  );
};
export default DrawerBox;
