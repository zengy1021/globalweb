import HtmlChangeModal from '@/components/HtmlChangeModal'
import { useState,useRef ,useEffect} from 'react'
import style from '../../index.less';
import CompsList from '../CompsList';
const htmlComp = `<section class="feature-area-03 what-do-area-05  pt-100 pb-100">
<div class="container">
    <div class="row align-items-center fl-row-bt">
        <div class="col-xxl-6 col-xl-7 col-lg-7 col-md-12">
            <div class="feature_img_03 mb-30 wow fadeInUp2" data-wow-delay="0.2s"
                style="visibility: visible; animation-delay: 0.2s; animation-name: fadeInUp2;">
                <img class="img-fluid float-bob" src="/assets/img/feature/01.png" alt="" edittype="2" ondblclick="editContent">
            </div>
        </div>
        <div class="col-xxl-5 offset-xxl-1 col-xl-5 col-lg-5 col-md-12">
            <div class="cfeatures-content ml-25">
                <div class="section-title orenge-title text-left mb-25">
                    <h5 contenteditable="true"  onblur="blurEdit" edittype="3" ondblclick="editContent">Live Chat</h5>
                    <h2  contenteditable="true"  onblur="blurEdit" edittype="3" ondblclick="editContent" class="mb-30">Live chat across any channel</h2>
                    <!-- <p>Echat offers the fastest and easiest way to support your customer service, help agents stay productive, and keep the business connected.</p> -->
                </div>
                <ul class="features_list features_list_02 features_list_05 mb-25">
                    <li>
                        <h5 contenteditable="true" edittype="3"  onblur="blurEdit" ondblclick="editContent">Send product suggestions directly</h5>
                        <p style="margin-top: 15px;" contenteditable="true" edittype="3" onblur="blurEdit" ondblclick="editContent">Echat offers the fastest and easiest way to support
                            your customer service, and keep the business connected.</p>
                    </li>

                    <li>
                        <h5 contenteditable="true" edittype="3" onblur="blurEdit" ondblclick="editContent">Translation of various languages</h5>
                        <p style="margin-top: 15px;" contenteditable="true" edittype="3" ondblclick="editContent">Echat offers the fastest and easiest way to support
                            your customer service, and keep the business connected.</p>
                    </li>

                    <!-- <li>Automatic chat routing</li> -->
                </ul>
                <a class="theme_btn theme_btn_06 theme_btn_bg" href="echat-live-chat.html" onblur="blurEdit" contenteditable="true" edittype="1" ondblclick="editContent">View all features
                    <i class="fas fa-chevron-right"></i></a>
            </div>
        </div>
    </div>
</div>
</section>`;
const defaultModal =  {
  show:false,
  type:3,
  data:{
    href:'',
    content:''
  }
}
 const Detail=()=> {
  // 组件ref元素实例
  const compRef = useRef(null)
  // 当前组件html
  const [currentCompHtml,setCurrentCompHtml] = useState('')
  // 编辑弹窗对象
  const [changeModalObj,setChangeModalObj] = useState(defaultModal)
  // 当前编辑元素
  const [currentTarget,setCurrentTarget] = useState<any>()
  // 左侧菜单列表数据
  const [compList,setCompList] = useState<any>([])
  // 监听双击事件
  const eventListenDB = (e: any) => {
    // 监听双击事件
    if (e.target.ondblclick) {
      // console.log(e.target.getAttribute('href'), item);
      // console.log(e.target.src);
      // this.dialogOption.title = '编辑';
      if (e.target.getAttribute('edittype') == '1') {
        console.log('a标签 带链接');
        setChangeModalObj({
          ...changeModalObj,
          type:1,
          show:true,
          data:{
            href:e.target.getAttribute('href'),
            content:e.target.innerHTML
          }
        })
        // this.dialogOption.href = e.target.getAttribute('href');
      }
      if (e.target.getAttribute('edittype') == '2') {
        console.log('图片');
        setChangeModalObj({
          ...changeModalObj,
          type:2,
          show:true,
          data:{
            href:'',
            content:e.target.src
          }
        })
        // 处理 图片|视频 上传类型
        // this.dialogOption.content = e.target.src;
      } 
      if (e.target.getAttribute('edittype') == '3') {
        console.log('文本');
        setChangeModalObj({
          ...changeModalObj,
          type:3,
          show:true,
          data:{
            href:'',
            content:e.target.innerHTML
          }
        })
        // this.dialogOption.content = e.target.innerHTML;
      }
      setCurrentTarget(e.target)
    }
  };
  // 监听失去焦点事件
  const eventListenBlur = (e: any)=>{
    if (e.target.onblur) { //监听页面输入框失去焦点事件
      if(!compRef.current||currentTarget){
        return
      }
      // const newHTML:string = 
      setCurrentCompHtml(compRef?.current?.innerHTML)
      // if (e.target.getAttribute('edittype') == '1') {
      //   setCurrentCompHtml(e.target.html)
      // }
      // if (e.target.getAttribute('edittype') == '2') {
        
      // }
      // if (e.target.getAttribute('edittype') == '3') {
        
      // }
    }
  }
  useEffect(()=>{
    // 初始化设置当前html值
    setCurrentCompHtml(htmlComp)

    // 初始化左侧菜单列表数据
    const comps = [
      {
        id:'1',
        name:'分类',
        children:[
          {
            id:'a',
            name:'组件名称1',
            content:''
          },
          {
            id:'b',
            name:'组件名称2',
            content:''
          }
        ]
      },
      {
        id:'2',
        name:'分类2',
        children:[
          {
            id:'c',
            name:'组件名称3',
            content:''
          },
          {
            id:'d',
            name:'组件名称4',
            content:''
          }
        ]
      }
    ]
    setCompList(comps)
  },[])
  // 编辑弹窗保存事件
  const saveModal = (value: any)=>{
    console.log('save',value);
    console.log(currentTarget);
    if(changeModalObj.type==1){ //a标签
      currentTarget.innerHTML = value.content
      currentTarget.href = value.href
    }
    if(changeModalObj.type==2){
      currentTarget.src  = value.content
    }
    if(changeModalObj.type==3){
      currentTarget.innerHTML = value.content
    }
    console.log(value);

    console.log(compRef?.current?.innerHTML);
    //清空当前双击编辑目标对象 防止触发失去焦点事件
    setCurrentTarget(null)
    //更新当前组件需要保存对象数据 content:html
    setCurrentCompHtml(compRef?.current?.innerHTML)
    //关闭组件内容编辑弹窗
    setChangeModalObj({...changeModalObj,show:false})
  }
  // 编辑弹窗删除事件
  const closeModal = ()=>{
    console.log('close');
    
    setChangeModalObj({...changeModalObj,show:false})
  }
  return (
    <div className={style.content_detail_box}>
      <div className={style.content_left_box} >
        <CompsList data={compList} />
      </div>
      <div
        className={style.content_right_box}
       >
          <div 
          className={style.content_right_box_preview}
          onDoubleClick={(e) => eventListenDB(e)}
          onBlur={(e)=>eventListenBlur(e)}
          dangerouslySetInnerHTML={{
            __html: currentCompHtml,
          }}
          ref={compRef} />
        </div>
       <HtmlChangeModal {...changeModalObj} close={closeModal} save={saveModal}/>
    </div>
  );
}
export default Detail
