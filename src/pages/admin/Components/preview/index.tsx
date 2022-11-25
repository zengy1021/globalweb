import PageLayout from '@/components/PageLayout';
import { Button } from 'antd';
import style from './index.less';
import { history } from 'umi';
import Detail from './components/Detail';

export default function preview() {
  const cancel = () => {
    history.push('/admin/component');
  };
  const save = () => {
    // 保存组件信息
    // 返回
    history.push('/admin/component');
  };

  return (
    <div>
      {/* 内容区域 */}
      <PageLayout>
        <div className={style.component_content}>
          <div className={style.header_box}>
            <div className={style.header_left_title}>组件名称</div>
            <div className={style.header_right_btn}>
              <Button type="default" className={style.header_right_item} onClick={() => cancel()}>
                取消
              </Button>
              <Button type="primary" className={style.header_right_item} onClick={() => save()}>
                保存
              </Button>
            </div>
          </div>
          {/* 组件内容区域 */}
          <div className={style.content_box}>
            <Detail />
          </div>
        </div>
      </PageLayout>
    </div>
  );
}
