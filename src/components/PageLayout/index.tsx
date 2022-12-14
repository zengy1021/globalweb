//自定义pageLayout
// 注解
/**
 *
 * @param props 组件传参
 * @param props.headerContent 通用头部配置
 * @param props.children 通用内容插槽，此处用户自定义使用
 * @returns React.FC
 */
import HeaderBox from '@/components/Header';
import style from './index.less';
const PageLayout: React.FC = (props: any) => {
  return (
    <div className={style.custom_box}>
      <div className={style.custom_header}>
        <HeaderBox />
      </div>
      <div className={style.custom_content}>{props.children}</div>
    </div>
  );
};
export default PageLayout;
