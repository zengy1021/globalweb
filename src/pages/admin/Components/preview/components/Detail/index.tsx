import style from '../../index.less';
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
                    <h5 contenteditable="true" edittype="3" ondblclick="editContent">Live Chat</h5>
                    <h2  contenteditable="true" edittype="3" ondblclick="editContent" class="mb-30">Live chat across any channel</h2>
                    <!-- <p>Echat offers the fastest and easiest way to support your customer service, help agents stay productive, and keep the business connected.</p> -->
                </div>
                <ul class="features_list features_list_02 features_list_05 mb-25">
                    <li>
                        <h5 contenteditable="true" edittype="3" ondblclick="editContent">Send product suggestions directly</h5>
                        <p style="margin-top: 15px;" contenteditable="true" edittype="3" ondblclick="editContent">Echat offers the fastest and easiest way to support
                            your customer service, and keep the business connected.</p>
                    </li>

                    <li>
                        <h5 contenteditable="true" edittype="3" ondblclick="editContent">Translation of various languages</h5>
                        <p style="margin-top: 15px;" contenteditable="true" edittype="3" ondblclick="editContent">Echat offers the fastest and easiest way to support
                            your customer service, and keep the business connected.</p>
                    </li>

                    <!-- <li>Automatic chat routing</li> -->
                </ul>
                <a class="theme_btn theme_btn_06 theme_btn_bg" href="echat-live-chat.html" contenteditable="true" edittype="1" ondblclick="editContent">View all features
                    <i class="fas fa-chevron-right"></i></a>
            </div>
        </div>
    </div>
</div>
</section>`;
export default function detail() {
  const eventListenDB = (e: any) => {
    // 监听双击事件
    if (e.target.ondblclick) {
      // console.log(e.target.getAttribute('href'), item);
      // console.log(e.target.src);
      // this.dialogOption.title = '编辑';
      if (e.target.getAttribute('edittype') == '1') {
        console.log('a标签 带链接');

        // this.dialogOption.href = e.target.getAttribute('href');
      }
      if (e.target.getAttribute('edittype') == '2') {
        console.log('图片');

        // 处理 图片|视频 上传类型
        // this.dialogOption.content = e.target.src;
      } else {
        console.log('文本');

        // this.dialogOption.content = e.target.innerHTML;
      }
      // this.dialogOption.visible = true;
      // this.dialogOption.type = e.target.getAttribute('edittype');
      // this.currentEditObj = {
      //   target: e.target,
      //   type: e.target.getAttribute('edittype') // 1表示a标签编辑  需要编辑href 和 内容
      // };
    }
  };
  return (
    <div className={style.content_detail_box}>
      <div className={style.content_left_box}>content_left_box</div>
      <div
        className={style.content_right_box}
        onDoubleClick={(e) => eventListenDB(e)}
        dangerouslySetInnerHTML={{
          __html: htmlComp,
        }}
      ></div>
    </div>
  );
}
