import classNames from 'classnames';
import style from './index.less';
const TagBox = ({ item }: any) => {
  return (
    <div
      className={classNames(`${style.tag_box}`, {
        [`${style.tag_box_1}`]: item.type == 1,
        [`${style.tag_box_2}`]: item.type == 2,
        [`${style.tag_box_3}`]: item.type == 3,
        [`${style.tag_box_4}`]: item.type == 4,
      })}
    >
      {item.text}
    </div>
  );
};
export default TagBox;
