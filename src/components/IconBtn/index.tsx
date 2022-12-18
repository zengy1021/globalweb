import classNames from 'classnames';
import style from './index.less';
interface IconObj {
  icon: string; //iconfont class
  isBtn?: boolean; // 是否按钮
  handleClick?: Function; // 按钮组件执行事件函数
  color?: string; //颜色
  size?: string | number; // icon大小
  disabled?: boolean; // 是否禁用
}
export default function IconBtn(props: IconObj) {
  const handleClick = () => {
    props.handleClick && props.handleClick();
  };
  return (
    <>
      {props.isBtn ? (
        <div
          className={classNames(style.icon_box, {
            [style.diabled_box]: props.disabled,
          })}
          onClick={() => handleClick()}
        >
          <span
            style={{
              color: props.disabled ? '#ccc' : props.color || '#888',
              fontSize: props.size || '16px',
              fontWeight: 400,
            }}
            className={`icon iconfont ${props.icon} ${props.disabled ? 'diabled_icon' : ''}`}
          ></span>
        </div>
      ) : (
        <span
          style={{
            color: props.disabled ? '#ccc' : props.color || '#888',
            fontSize: props.size || '16px',
            fontWeight: 400,
          }}
          className={`icon iconfont ${props.icon}`}
        ></span>
      )}
    </>
  );
}
