import EmptyBox from '@/components/Empty';
import IconBtn from '@/components/IconBtn';
import { Image } from 'antd';
import classNames from 'classnames';
import style from '../index.less';
export default function CompBox(props: any) {
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
                  <div  className={classNames(`${style.comp_item}`, {
                    [`${style.comp_item_hidden}`]: !child.id,
                  })} key={cIndex}>
                    <div className={style.comp_item_img}>
                      <Image width={'100%'} src={child.bgImg} preview={false}></Image>
                    </div>
                    <div className={style.comp_item_footer}>
                      <div className={style.comp_item_footer_name}>{child.name}</div>
                      <div className={style.comp_item_footer_btn}>
                        <IconBtn
                          icon="icon-xianxing_gengduo_1"
                          color="#888"
                          size="20px"
                          isBtn
                        ></IconBtn>
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
