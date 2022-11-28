import EmptyBox from '@/components/Empty';
import IconBtn from '@/components/IconBtn';
import { Dropdown, message, Image } from 'antd';
import type { MenuProps } from 'antd';
import classNames from 'classnames';
import style from '../index.less';
import { history } from 'umi';
import { useState } from 'react';
import ModalBox from '@/components/Modal';
export default function CompBox(props: any) {
  interface ModalProps {
    show: boolean; //展示|隐藏
    width?: number; // 弹窗宽度
    children?: any; //插槽内容
    title: any; // 标题
  }
  const defaultModalObj: ModalProps = {
    show: false,
    title: '弹窗',
    width: 440,
  };
  const [modalObj, setModalObj] = useState(defaultModalObj);
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
  const typeItems: MenuProps['items'] = [
    {
      label: '重命名',
      key: '2',
    },
    {
      label: '删除',
      key: '3',
    },
  ];
  const goComps = (item: any) => {
    console.log(item);
    history.push('/admin/component/preview');
  };
  const onDropClick: any = (obj: any, item: any) => {
    message.info(`Click on item ${obj.key}`);
    switch (obj.key) {
      case '1': // 编辑组件 打开新增|编辑页面
        props.openEdit(item);
        break;
      case '2': // 重命名组件
        props.openEdit(item, 'name');
        break;
      case '3': // 删除组件 二次确认
        remove(item);
        break;
      default:
        return;
    }
  };
  const closeModal = () => {
    setModalObj({ ...modalObj, show: false });
  };
  const modalSave = () => {
    // 弹窗保存事件
    closeModal();
    console.log('保存');
  };
  const remove = (item: any) => {
    setModalObj({ ...modalObj, show: true, title: '删除' });
  };
  return (
    <div style={{ height: '100%' }}>
      {props.list.map((item: any, index: number) => (
        <div className={style.comp_box} key={index}>
          <div className={style.comp_box_header}>
            <div className={style.comp_box_header_title}>{item.name}</div>
            <div
              className={style.comp_box_header_btn}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
              }}
            >
              <Dropdown
                autoFocus
                menu={{ items: typeItems, onClick: (obj: any) => onDropClick(obj, item) }}
                overlayClassName={'dropMinWidth'}
                trigger={['click']}
              >
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                  }}
                >
                  {/* <a onClick={(e) => e.nativeEvent.stopImmediatePropagation()}> */}
                  <IconBtn icon="icon-xianxing_gengduo_1" color="#888" size="20px" isBtn></IconBtn>
                </a>
              </Dropdown>
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
                    onClick={() => goComps(child)}
                  >
                    <div className={style.comp_item_img}>
                      <Image width={'100%'} src={child.bgImg} preview={false}></Image>
                    </div>
                    <div className={style.comp_item_footer}>
                      <div className={style.comp_item_footer_name}>{child.name}</div>
                      <div
                        className={style.comp_item_footer_btn}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          e.nativeEvent.stopImmediatePropagation();
                        }}
                      >
                        <Dropdown
                          autoFocus
                          menu={{ items, onClick: (obj) => onDropClick(obj, child) }}
                          overlayClassName={'dropMinWidth'}
                          trigger={['click']}
                        >
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              e.nativeEvent.stopImmediatePropagation();
                            }}
                          >
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
      {/* 弹窗区域 */}
      <ModalBox {...modalObj} close={() => closeModal()} save={modalSave}>
        <div>确定删除？</div>
      </ModalBox>
    </div>
  );
}
