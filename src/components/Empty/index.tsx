import { Empty } from 'antd';
import style from './index.less';
export default function EmptyBox() {
  return (
    <div className={style.empty_box}>
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 160,
        }}
        description={<span className={style.empty_description}>暂无内容</span>}
      />
    </div>
  );
}
