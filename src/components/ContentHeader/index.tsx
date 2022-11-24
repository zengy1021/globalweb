import style from './index.less';
export default function ContentHeader() {
  return (
    <div className={style.header_box}>
      <div className={style.header_left_title}>
        <div className={style.header_left_title}>标题</div>
        <div className={style.header_left_dec}>描述</div>
      </div>
      <div className={style.header_right_btn}></div>
    </div>
  );
}
