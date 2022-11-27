import { Collapse } from "antd"
// import { CaretRightOutlined } from '@ant-design/icons';
import IconBtn from "@/components/IconBtn";
import style from './CompsList.less'
const { Panel } = Collapse;
interface ComsListProps {
    data: any[]
}
interface CustomHeaderPorps{
    name: string
}

const CompsList = ({data}: ComsListProps)=>{
    const CustomHeader = ({name}: CustomHeaderPorps)=>{
        return (
        <>
            <IconBtn icon="icon-xianxing_shouqi_1" size={'20px'} color="#323232" />
            <span className="custom_collapse_header">{name}</span>
        </>)
    }
    return (
        <div>  
            <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                expandIconPosition="end"
                // expandIcon={({ isActive }) => <IconBtn icon="" rotate={isActive ? 90 : 0} />}
                className={style.comps_type}
            >
                {
                    data.map((item: any)=>(
                        <Panel header={<CustomHeader name={item.name}/>} key={item.id}>
                            <div className={style.comps}>
                                {
                                    item.children.map((child: any)=>(
                                        <div className={style.comps_item} key={child.id}>{child.name}</div>
                                    ))
                                }
                            </div>
                        </Panel>
                    ))
                }
            </Collapse>
            
      </div>
    )
}
export default CompsList