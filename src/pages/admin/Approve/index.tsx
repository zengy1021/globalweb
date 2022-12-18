import PageLayout from '@/components/PageLayout';
import { Tabs } from 'antd';
import ArticleList from './article';
import ContentList from './content';
import style from './index.less';

const tabList = [
  {
    name: '内容审批',
    id: '1',
    content: '',
  },
  {
    name: '文章审批',
    id: '2',
    content: '',
  },
];
const ApproverList: React.FC = () => {
  const items = tabList.map((_, i) => {
    return {
      label: _.name,
      key: _.id,
      children: _.id == '1' ? <ContentList /> : <ArticleList />,
    };
  });
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <div>
      {/* 内容区域 */}
      <PageLayout>
        <div className={style.approve_content}>
          <Tabs onChange={onChange} type="card" items={items} />
        </div>
      </PageLayout>
    </div>
  );
};

export default ApproverList;
