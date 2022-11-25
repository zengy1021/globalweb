import EmptyBox from '@/components/Empty';
import IconBtn from '@/components/IconBtn';
import { Dropdown, message, Image } from 'antd';
import type { MenuProps } from 'antd';
import classNames from 'classnames';
import style from '../index.less';
import { history } from 'umi';
export default function CompBox(props: any) {
  const items: MenuProps['items'] = [
    {
      label: '编辑',
      key: '1',
    },
    {
      label: '重命名',
      key: '2',
    },
    {
      label: '删除',
      key: '3',
    },
  ];
  const onDropClick: any = (obj: any, item: any) => {
    message.info(`Click on item ${obj.key}`);

    switch (obj.key) {
      case '1': // 编辑组件 打开另一个路由
        console.log(item, obj);
        history.push('/admin/component/preview');
        break;
      case '2': // 重命名组件
        break;
      case '3': // 删除组件 二次确认
        break;
      default:
        return;
    }
  };
  return (
    <div style={{ height: '100%' }}>
      {props.list.map((item: any, index: number) => (
        <div className={style.comp_box} key={index}>
          <div className={style.comp_box_header}>
            <div className={style.comp_box_header_title}>{item.name}</div>
            <div className={style.comp_box_header_btn}>
              <IconBtn icon="icon-xianxing_gengduo_1" color="#888" size="20px" isBtn></IconBtn>
            </div>
          </div>
          <div className={style.comp_box_content}>
            {!item.children.length ? (
              <EmptyBox></EmptyBox>
            ) : (
              <div className={style.comp_list_box}>
                {item.children.map((child: any, cIndex: number) => (
                  <div
                    className={classNames(`${style.comp_item}`, {
                      [`${style.comp_item_hidden}`]: !child.id,
                    })}
                    key={cIndex}
                  >
                    <div className={style.comp_item_img}>
                      <Image width={'100%'} src={child.bgImg} preview={false}></Image>
                    </div>
                    <div className={style.comp_item_footer}>
                      <div className={style.comp_item_footer_name}>{child.name}</div>
                      <div className={style.comp_item_footer_btn}>
                        <Dropdown
                          autoFocus
                          menu={{ items, onClick: (obj) => onDropClick(obj, child) }}
                          overlayClassName={'dropMinWidth'}
                          trigger={['click']}
                        >
                          <a onClick={(e) => e.preventDefault()}>
                            <IconBtn
                              icon="icon-xianxing_gengduo_1"
                              color="#888"
                              size="20px"
                              isBtn
                            ></IconBtn>
                          </a>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
