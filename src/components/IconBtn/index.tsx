import style from './index.less';
interface IconObj {
  icon: string; //iconfont class
  isBtn?: boolean; // 是否按钮
  handleClick?: Function; // 按钮组件执行事件函数
  color?: string; //颜色
  size?: string | number; // icon大小
}
export default function IconBtn(props: IconObj) {
  const handleClick = () => {
    props.handleClick && props.handleClick();
  };
  return (
    <>
      {props.isBtn ? (
        <div className={style.icon_box} onClick={() => handleClick()}>
          <span
            style={{ color: props.color || '#888', fontSize: props.size || '16px' }}
            className={`icon iconfont ${props.icon}`}
          ></span>
        </div>
      ) : (
        <span
          style={{ color: props.color || '#888', fontSize: props.size || '16px' }}
          className={`icon iconfont ${props.icon}`}
        ></span>
      )}
    </>
  );
}
