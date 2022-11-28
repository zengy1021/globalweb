import { Collapse } from 'antd';
// import { CaretRightOutlined } from '@ant-design/icons';
import IconBtn from '@/components/IconBtn';
import style from './index.less';
const { Panel } = Collapse;
interface ComsListProps {
  data: any[];
  selectComp?: any; //选择组件事件
  type: number | string; //列表类型  1:点击模式 2:浏览添加模式
}
interface CustomHeaderPorps {
  name: string;
}

const CompsList = ({ data, selectComp, type }: ComsListProps) => {
  const CustomHeader = ({ name }: CustomHeaderPorps) => {
    return (
      <>
        <IconBtn icon="icon-xianxing_shouqi_1" size={'20px'} color="#323232" />
        <span className="custom_collapse_header">{name}</span>
      </>
    );
  };
  const addContent = (comp: any) => {
    // 添加组件
    selectComp(comp);
  };
  // 组件点击事件
  const compClick = (comp: any) => {
    if (type == 1) {
      addContent(comp);
    }
  };
  return (
    <div>
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIconPosition="end"
        // expandIcon={({ isActive }) => <IconBtn icon="" rotate={isActive ? 90 : 0} />}
        className={style.comps_type}
      >
        {data.map((item: any) => (
          <Panel header={<CustomHeader name={item.name} />} key={item.id}>
            <div className={style.comps}>
              {item.children.map((child: any) => (
                <div className={style.comps_item} key={child.id} onClick={() => compClick(child)}>
                  <div className={style.comps_item_name}>{child.name}</div>
                  {type == 2 && (
                    <div className={style.comps_item_hover} onClick={() => addContent(child)}>
                      <div className={style.comps_item_hover_icon}>
                        <IconBtn icon="icon-xianxing_tianjia_1" color="#fff" size="32px" />
                      </div>
                      <div className={style.comps_item_hover_label}>添加至底部</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};
export default CompsList;
