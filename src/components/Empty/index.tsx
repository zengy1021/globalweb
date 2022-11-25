import { Empty } from 'antd';
import style from './index.less';
import NullImg from '@/assets/imgs/null.svg';
export default function EmptyBox() {
  return (
    <div className={style.empty_box}>
      <Empty
        image={NullImg}
        imageStyle={{
          height: 160,
        }}
        description={<span className={style.empty_description}>暂无内容</span>}
      />
    </div>
  );
}
