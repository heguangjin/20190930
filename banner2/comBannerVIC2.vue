<template>
  <!-- PC端 -->
  <div v-if="isComputer" @click.stop.left="parentC" @dblclick.stop="cl2($event,1)" :id="id" :class="{mainIsSelectBanner:emptyPlace&&hoverIndex==0,mainIsSelectBanner3:!emptyPlace&&settingData.classShow&&!settingData.classShow2,mainIsSelectBanner4:!emptyPlace&&!settingData.classShow&&settingData.classShow2}" class="zm-banner-main newBanner" :style="{paddingRight:(settingData.bannerLRMargin.lrValue)+'px',paddingLeft:(settingData.bannerLRMargin.lrValue)+'px',paddingBottom:settingData.bannerPaddin.value+'px',paddingTop:settingData.bannerPaddin.value+'px',position: 'absolute', width: style.width+'px',height: style.height+'px',left: style.left+'px',top: style.top+'px',}" @mousedown.stop.left="other($event),mousedown($event)" @contextmenu.stop.prevent="other($event),openMenu($event),rightClickP($event)">
      <!-- <span v-html='mainHtml'></span> -->
      <div :style="{zIndex:childMove?'':0,position:'relative',left:'0px',top:'0px',width:style.width-(settingData.bannerLRMargin.lrValue*2)+'px',height:(style.height-settingData.bannerPaddin.value*2)+'px',paddingRight:(settingData.bannerLRMargin.lrValue)+'px',paddingLeft:(settingData.bannerLRMargin.lrValue)+'px',}">
        <!-- 包含所有横条列的盒子 -->
        <div :style="{zIndex:childMove?'':0,position:'absolute',left:settingData.bannerPaddin.value+'px',top:'0px',width:style.width-(settingData.bannerPaddin.value*2+settingData.bannerLRMargin.lrValue*2)+'px',height:(style.height-settingData.bannerPaddin.value*2)+'px',}">
          <div class="eachBanner" ref="eachBanner"  :class="{SelectBzIndex:pointMove,mainIsSelectNotBanner:childData.length!=1&&!emptyPlace&&(hoverIndex==index),oneIsSelect:(settingData.myData[index]&&childData.length!=1)?settingData.myData[index].oneIsSelect:null}" v-for="(item,index) in childData" :key="index" :id="item.id" :style="{position:'absolute',left:settingData.myData[index].outLeft+'px',width:parseFloat(settingData.myData[index].width)/100*(style.width-(settingData.bannerPaddin.value*2+settingData.bannerLRMargin.lrValue*2)-(settingData.bannerLineSpace.value*(childData.length-1)))+'px',height:style.height-settingData.bannerPaddin.value*2+'px'}">
              <div class="is-container banner-container">
                  <component :is="item.component" :key="item.id" :prop="item" :index="index" :topMin="topMin" :settingDataP="settingData" :length="childData.length" :selIndex="index" :Myleft="settingData.myData[index].left"  :fheight="style.height-settingData.bannerPaddin.value*2" :fwidth="parseFloat(settingData.myData[index].width)/100*(style.width-(settingData.bannerPaddin.value*2+settingData.bannerLRMargin.lrValue*2)-(settingData.bannerLineSpace.value*(childData.length-1)))" 
                  @rightAdd="rightAdd" @deleteBanner="deleteBanner" @leftMove="leftMove" @rightMove="rightMove" @updataMes="updataMes" @updateRenderStatus="updateRenderStatus"></component>
              </div>
              <div class="bannerHoverLabel bannerBaseColor" :class="{bannerLineBGC2:hoverIndex==index,hoverTopL:topMin,hoverBottomL:!topMin}" v-show="childData.length!=1&&!settingData.myData[index].ColumnLabelShow&&!emptyPlace&&(hoverIndex==index)">第{{index+1}}列</div>
          </div>

        </div>
        <!-- 整体覆盖纹理及背景色 -->
        <div class="zm-bg-banner-vein" v-if="settingData.backgroundData.previewData.type=='img'||settingData.backgroundData.previewData.type=='video'" :style="{zIndex:-1,position: 'absolute',left:'0px',top:-settingData.bannerPaddin.value+'px',width:style.width-(settingData.bannerLRMargin.lrValue*2)+'px',height:style.height+'px',backgroundImage:texturePicture,backgroundColor:settingData.backgroundData.coverage.color}"></div>
        <!-- 整体背景图片及纯色 -->
        <div class="zm-bg-banner-PIC" v-show="settingData.backgroundData.previewData.type=='img'||settingData.backgroundData.previewData.type=='color'" :style="{overflow:'hidden',zIndex:-2,position:'absolute',left:'0px',top:-settingData.bannerPaddin.value+'px',width: style.width-(settingData.bannerLRMargin.lrValue*2)+'px',height: style.height+'px',backgroundImage:'url('+settingData.backgroundData.previewData.poster+')',backgroundColor:settingData.backgroundData.previewData.color,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center',}"></div>
        <!-- 整体背景视频 -->
        <div class="zm-bg-banner-Video" v-show="settingData.backgroundData.previewData.type=='video'" :style="{overflow:'hidden',zIndex:-2,position:'absolute',left:'0px',top:-settingData.bannerPaddin.value+'px',width: style.width-(settingData.bannerLRMargin.lrValue*2)+'px',height: style.height+'px'}">
            <div class="zm-bg-banner-PIC" v-show="colorAb" :style="{backgroundImage:'url('+settingData.backgroundData.previewData.poster+')',backgroundColor:settingData.backgroundData.bottom.color,width:'100%',height: '100%',backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center',}"></div>
            <video  muted :poster="settingData.backgroundData.previewData.poster" :loop="settingData.backgroundData.isLoopPlay" ref="video" :style="{objectFit:'cover',width: '100%',height: '100%'}"></video>
        </div>
      </div>
      <div class="zm-bg-bannerPB" v-if="childData.length!=1&&!emptyPlace&&!settingData.classShow&&settingData.bannerPaddin.value<=0&&settingData.bannerLRMargin.lrValue>=0" :class="{bannerPB:nowBorder.clickIndex!=0||nowBorder.clickIndex!=(childData.length-1),bannerPBStart:nowBorder.clickIndex==0,bannerPBEnd:nowBorder.clickIndex==(childData.length-1),mainIsSelectBanner3:settingData.bannerPaddin.value<=0}" :style="{zIndex:1,position: 'absolute',left:nowBorder.left+'px',top:'0px',width:nowBorder.width+'px',height:'100%',}"></div>
      <div class="mainIsSelectBanner3" :class="{mainBannerIndex:pointMove}" v-if="childData.length==1&&!emptyPlace"></div>
      <div class="bannerHoverLabel bannerBaseColor bannerLineBGC2" :class="{hoverTopL:topMin,hoverBottomL:!topMin}" v-show="!settingData.classShow&&emptyPlace&&hoverIndex==0" :style="{left:'30%'}">{{typeC}}</div>
      <div class="mainLabel" v-if="!pointMove" v-show="!pointMove&&settingData.classShow || (childData.length==1&&!emptyPlace&&settingData.bannerPaddin.value<=0)" :class="{bannerLineBGC:settingData.classShow || (childData.length==1&&!emptyPlace),mainLabel1:topMin,mainLabel2:!topMin}">横 条</div>
  </div>

  <!-- 移动端 -->
  <div @click.stop="parentC" @dblclick.stop.prevent="openSetPane" v-else-if="(!isComputer && settingData.mobileComIsHide)" :id="id" :class="{mainIsSelectBanner:emptyPlace&&hoverIndex==0,mainIsSelectBanner3:!emptyPlace&&settingData.classShow&&!settingData.classShow2,mainIsSelectBanner4:!emptyPlace&&!settingData.classShow&&settingData.classShow2}" class="zm-banner-main newBnanerM" :style="{position: 'absolute', width: (mobileStyle.width<=320?320:mobileStyle.width)+'px',height: mobileStyle.height+'px',left: mobileStyle.left+'px',top: mobileStyle.top+'px',backgroundImage:'url('+settingData.backgroundData.previewData.poster+')',backgroundColor:settingData.backgroundData.previewData.color,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'50%',}" @mouseover.stop='hh' @mousedown.stop.left="other($event),mousedown($event)" @contextmenu.stop.prevent="other($event),openMenu($event),rightClickP($event)">
      <div :style="{zIndex:0,position: 'relative',left:'0px',top:'0px',width:'100%',height:'100%'}">
          <span v-html='mainHtml' :style="{height:'0px'}"></span>
          <div class="eachBannerM" ref="eachBannerM" v-show="item.settingData.mobileComIsHide" :class="{SelectBzIndex:pointMove,mainIsSelectNotBanner:childData.length!=1&&!emptyPlace&&(hoverIndex==index),oneIsSelect:item.settingData.mobileComIsHide&&(settingData.myData[index]?settingData.myData[index].oneIsSelect:null)}" v-for="(item,index) in childData" :key="index" :style="{left:'0px',position: 'absolute',top:item.mobileStyle.top+'px',width:'320px',height:item.mobileStyle.height+'px'}">
              <div class="is-container banner-container">
                <component :is="item.component" :key="item.id" :prop="item" :index="index" :topMin="topMin" :settingDataP="settingData" :length="childData.length" :selIndex="index" :Myleft="0"  :fheight="style.height" :fwidth="(mobileStyle.width<=320?320:mobileStyle.width)" @rightAdd="rightAdd" @deleteBanner="deleteBanner" @leftMove="leftMove" @rightMove="rightMove" @updataMes="updataMes" @updateRenderStatus="updateRenderStatus"></component>
              </div>
              <!-- <div class="bannerHoverLabel bannerLineBGC2 bannerBaseColor" v-show="!settingData.myData[index].ColumnLabelShow&&!emptyPlace&&!settingData.classShow&&(hoverIndex==index)">第{{hoverIndexM+1}}列</div> -->
              <div class="bannerHoverLabelM bannerLineBGC2 bannerBaseColor" v-show="childData.length!=1&&!settingData.myData[index].ColumnLabelShow&&!emptyPlace&&(hoverIndex==index)" :style="{left:settingData.classShow&&hoverIndexM==0?'70px':'0px'}">第{{hoverIndexM+1}}列</div>
          </div>
          <div class="banner-Column-label mainLabel" :class="{bannerLineBGC:settingData.classShow}" v-show="!pointMove&&settingData.classShow" :style="{left:'1%',top:'-30px',lineHeight:'30px',width:'64px',height:'30px',}">横条组件</div>
          <!-- <div class="bannerHoverLabel bannerBaseColor bannerLineBGC2" :class="{hoverTopL:topMin,hoverBottomL:!topMin}" v-show="emptyPlace&&hoverIndex==0" :style="{left:'0px'}">{{typeC}}</div> -->
          <div class="bannerHoverLabel bannerBaseColor bannerLineBGC2 hoverTopL" v-show="emptyPlace&&hoverIndex==0" :style="{left:'0px'}">{{typeC}}</div>
          <div class="zm-bg-banner-vein" v-if="settingData.backgroundData.previewData.type=='img'||settingData.backgroundData.previewData.type=='video'" :style="{zIndex:-1,position: 'absolute',left:'0px',top:'0px',width:(mobileStyle.width<=320?320:mobileStyle.width)+'px',height:mobileStyle.height+'px',backgroundImage:texturePicture,backgroundColor:settingData.backgroundData.coverage.color}"></div>
      </div>
      <div class="zm-bg-bannerPB mainIsSelectBanner3" v-if="!emptyPlace&&!settingData.classShow&&nowBorder.lengthM!=1" :class="{bannerPBM:nowBorder.clickIndex!=0||nowBorder.clickIndex!=(nowBorder.lengthM-1),bannerPBStartM:nowBorder.clickIndex==0,bannerPBEndM:nowBorder.clickIndex==(nowBorder.lengthM-1)}" :style="{zIndex:1,position: 'absolute',left:'0px',top:nowBorder.top+'px',width:nowBorder.width+'px',height:nowBorder.height+'px',}"></div>
  </div>
</template>
<script>
import videojs from 'video.js';
import configBanner from "./configBanner.js";
export default {
  mixins:[configBanner],
  name: 'vic',
  props: {
    prop: {
      type:Object,
      required:true
    },
    index:{
      type:[String,Number],
      required:true
    }
  },
  data: function () {
      return {
        ptopMin:true,
        mDisableToolH:true,//true:禁止修改宽度，false允许修改
        mDisableToolX:true,//true:禁止修改移动端left值，false允许修改
        showCtrlBox:false,//false:不显示编辑框,true:显示编辑框
        keepScale:true,//zcm
        comName:this.prop.comName,//手机端在隐藏时左边弹框中相应隐藏组件的名称
        id:this.prop.id,
        type:"banner",
        typeC:"横条",
        otherType:"combinationBanner",//用于区分横条列和整体横条
        settingData:this.prop.settingData,
        style: this.prop.style,
        mold:"commonContainer",
        pattern: [0,1,0,0,0,1,0,0],//当前组件显示八个点，1：显示 0：不显示
        isShowRotateBtn: false,//当前组件是否显示旋转按钮
        specialTop:true,//上部特殊按钮    true:显示    false: 不显示
        specialBot:true,//下部特殊按钮    true:显示    false: 不显示
        fullPageSet: true,//组件是否有全屏（宽度）功能
        backgroundBtn:false,//是否打开背景设置弹窗
        bannerTitle:"横条背景",
        setDialogIndex:0,
        buttonList:[
            { type: "set",title: "样式设置", icon: "icon-shezhi1",paneTitle:'横条管理',paneInfo:"通过设置项编辑横条组件样式"},
            {type:'editor',title:"底色编辑",icon:'icon-bgEditor',callback:this.cl2,paneInfo:"通过设置项设置横条背景样式"},
            {type:'del',title:'删除',icon:'icon-delete'},
        ],
        mobileButtonList: [//手机版设置项按钮
          { type: "hide", title: "隐藏", icon: "icon-hide" },
          { type: "set", title: "设置", icon: "icon-shezhi1" ,
            paneTitle:'横条设置',
            paneHeight:420,
            paneInfo:"设置手机端横条样式",
          },
        ],
        childData: this.prop.childData,
        mobileChildData: this.prop.mobileChildData,//手机版子组件信息
        mobileStyle: this.prop.mobileStyle, //手机版样式
        classShow:true,//整体横条被选中时出现选中框
        classShow2:false,//横条列被选中时整体横条的选中框主色半透明
        dx:0,//当你第一次单击的时候，存储x轴的坐标。
        dw:0,
        nowElWidth:0,//当前选中列的宽度
        nowElWidth2:0,//当前选中列的在拖动按钮拖动改变后的宽度
        nextElPer:0,//当前选中列的下一列占整体横条的百分比
        nextElWidth2:0,//当前选中列后第一兄弟列宽度
        preElWidth:0,//当前选中列前第一兄弟列宽度
        preElWidth2:0,//当前选中列前第一兄弟列宽度（拖动按钮拖动改变后的宽度）
        preElPer:0,//当前选中列前第一兄弟列占整体横条的百分比
        nowElLeft:0,//当前选中列的left
        nextElLeft:0,//当前选中列后第一兄弟列left
        preElLeft:0,//当前选中列前第一兄弟列left
        nowLeft:0,//当前选中列的left
        nowVue:null,//当前选中实例
        nowIndex:0,
        nowLength:0,
        nStyle:{
          width:0,
          height:0,
          height2:0,
          oldHeight:0,
          minH:0,
          left:0,
          top:0,
          top2:null,
          lemiTop2:null,
          dy:0,
          dw:0,
          dw2:0,
          minT:0,
          nowVue:null,
          isClick:false,//true:单击父组件，false：移动父组件（为了不让父组件的单击事件与mousedown,mouseup事件冲突）
          // clientYMin:0
        },
        changH:{
          oriL:0,//组件改变前的left
          oriH:0,//组件改变前的height
          oriW:0,//组件改变前的width
          oriT:0,//组件改变前的top
          curH:0,//组件改变后的高度
          oriRotate:0,
          nowCom:null,//当前选中组件
          isPush:true//true-下推组件 反之下推页面分割线
        },
        maxTArr:[],//把每一列横条中子组件距离容器下部距离最大的值加入数组
        minTArr:[],//把每一列横条中子组件距离容器上部距离最小的值加入数组
        maxTp:0,//获取数组中的最大值（所有列横条中子组件距离容器上部距离最大的值）
        minTp:0,//获取数组中的最小值（所有列横条中子组件距离容器上部距离最小的值）
        maxTp2:0,
        minTp2:0,
        minSub:0,
        maxT:0,
        minT:0,
        pointDrag:false,//pointDrag为true代表拖动第二个圆点，false代表拖动第六个圆点
        oldChildw:new Map(),
        childDataArrLeft:new Map(),
        childDataArr:new Map(),
        childDataArr2:new Map(),
        allChildren:new Map(),
        childDataLeftPer:new Map(),
        topArr2: [],//记录手机端未隐藏横条列的top值，由小到大排序
        notShowtopArr2: [],//记录手机端隐藏横条列的top值，由小到大排序
        topMin:false,
        emptyPlace:true,//点击空白处或点击横条以外的组件（不包含横条列里面的子组件）true为点击空白处
        myAllBannderCom:[],//保存页面中的所有横条
        btnMove:false,//是否拖动左右按钮true:拖动 反之
        pointMove:false,//是否拖动圆点true:拖动 反之
        childMove:false,
        labelShow:false,
        parentMove:false,//是否在通过圆点改变组件的高度true:不执行横条列点击事件反之
        isRightAdd:false,//是否通过
        selectObj:{
          emptyPlace:false,
          labelShow:false,
          classShow:false,
          classShow2:false,
          firstTime:0,
          lastTime:0,
          subTime:0
        },
        colorAb:false,
        nowSelectIndex:0,
        hoverIndex:-1,//横条列hover时浅色列标签是否要显示（-1：不显示）以及pc端浅色列标签的number数
        hoverIndexM:0,//移动端横条列hover时显示浅色列标签的number数
        childVueDown:false,//移动横条列的时候不执行横条列的eachBannerMove和eachBannerOut事件（true：不执行，反之）
        noPer:false,
        nowBorder:{
          left:0,
          top:0,
          width:0,
          height:0,
          clickIndex:0,
          lengthM:0
        },
        totleLineW:0,
        childComRenderCompleteNum:0, //渲染完的子组件数量ssm
        curComIsRender:false, //当前组件是否渲染完成ssm
        isRenderCompleted:false, //当前组件包括子组件是否全部渲染完成ssm
        DirectionArr:[]
      }
  },
  watch:{
    "settingData.backgroundData.playbackRate":{//视频播放速率
      handler:function(n,o){
        if(this.videoPlayer){
          this.videoPlayer.playbackRate(n)
        }
      }
    },
    "settingData.backgroundData.isLoopPlay":{//视频循环播放与否
      handler:function(n,o){
        if(this.videoPlayer){
          this.videoPlayer.loop(n)
        }
      }
    },
    "settingData.backgroundData.previewData.src":{//改变视频路径
      handler:function(n,o){
        let _this = this
        if(n){
          _this.settingData.backgroundData.isVideoPlay = true
          if(this.videoPlay){
            this.src(n)
            setTimeout(()=>{
              this.videoPlayer.playbackRate(this.settingData.backgroundData.playbackRate)
              return
            },50)
          }else{
            if(this.settingData.backgroundData.previewData.src){
              this.videoPlayer = videojs(this.$refs.video,{
                bigPlayButton:false,
                textTrackDisplay:false,
                posterImage:false,
                errorDisplay:false,
                autoplay : _this.settingData.backgroundData.isVideoPlay,
                loop:_this.settingData.backgroundData.isLoopPlay,
              },function(){
                this.src(n)
                this.on('ended',function(){
                    _this.settingData.backgroundData.isVideoPlay = false;
                })
                setTimeout(()=>{
                  this.playbackRate(_this.settingData.backgroundData.playbackRate)
                  return
                },50)
              })
            }
          }
        }else{
          this.settingData.backgroundData.playbackRate = 1;
        }
      },
    },
    colorAbsorption(val){//ml===========val:true(吸色中)   val:false(吸色完毕)
      this.colorAb = val
    },
    getContentWidth(val){
      this.style.width = zmEditor.$store.state.page.contentWidth
      this.totleLineW = zmEditor.$store.state.page.contentWidth - this.settingData.bannerPaddin.value*2-this.settingData.bannerLineSpace.value*(this.childData.length-1)
      this.lemitWidthF()
      this.setOutL()
    },
    getNowWinWidth(val){
      this.style.width = zmEditor.$store.state.page.nowWinWidth
      this.setOutL()
    },
    getMarginLeft(val){
      this.style.left = -val
    },
    'style.top': {
      handler(){
        this.parentMove = true
      },
    },
    'settingData.myData':{//用于判断当横条列中的子组件移出横条列的时候，去除选中框和列标签
      handler(){
        let moveOut = false
        this.settingData.myData.forEach((element,i)=>{
          if(element.oneIsSelect == true){
            moveOut = true
          }
        })
        if(!moveOut && !this.settingData.classShow ){
          this.emptyPlace = true
          this.settingData.classShow = false
          this.settingData.classShow2 = false
        }
      },
      deep:true
    },
    'mobileStyle.width':{
        handler(){
          this.mobileStyle.width = 320
        }
    },
    'mobileStyle.left':{
        handler(){
          this.mobileStyle.left = 0
        }
    },
    'style.height':{//监测组件高度变化（解决横条（即具有容器功能）组件上如果有组合进入来的组件，那么调节横条高度的时候，遇到内部组件阻碍时，应该禁止调整，具体参考Wix）
        handler(newV,oldV){
          let sub = newV-oldV//容器组件高度变化差
          let that = this
          if(this.pointDrag){//this.pointDrag为true代表拖动第二个圆点，false代表拖动第六个圆点
            if(sub <= 0){//当向下拖动改变容器的高度
              this.childData.forEach((ele,i)=>{
                if(ele.childData.length > 0){
                  ele.childData.forEach((element,index)=>{
                    if(element.style.top<0){
                    }else{
                      element.style.top = element.style.top - Math.abs(sub)//容器里的每一个子组件的top值减去容器组件高度变化差的绝对值（这样才能保证子组件相对于容器静止）
                    }
                    // element.style.top = element.style.top - Math.abs(sub)//容器里的每一个子组件的top值减去容器组件高度变化差的绝对值（这样才能保证子组件相对于容器静止）
                    // if(element.style.top <= 0){
                    //   element.style.top = 0
                    //   return
                    // }
                  })
                }
              })
            }else{//当向上拖动改变容器的高度
              this.childData.forEach((ele,i)=>{
                if(ele.childData.length > 0){
                  ele.childData.forEach((element,index)=>{
                    element.style.top = element.style.top + Math.abs(sub)//容器里的每一个子组件的top值加上容器组件高度变化差的绝对值（这样才能保证子组件相对于容器静止）
                  })
                }
              })
            }
          }
          this.bannerChildLimitHP()
        }
    },
    childData:{
      handler(){
        if(!this.isComputer){
          this.childData.forEach((element,index)=>{
            if(element.settingData.backgroundData.previewData.type == 'color'){
              element.bigClass = 'bannerColor'
            }else if(element.settingData.backgroundData.previewData.type == 'img'){
              element.bigClass = 'bannerImg'
            }else if(element.settingData.backgroundData.previewData.type == 'video'){
              element.bigClass = 'bannerVideo'
            }
          })
        }
      },
      deep:true
    },
    'childData.length':{
      handler(){
        if(this.childData.length == 1){
          this.labelShow = true
          this.settingData.classShow = false
          this.settingData.classShow2 = false
          this.emptyPlace = false
          this.specialBot = false
          this.settingData.bannerBackups2.value = true
          this.settingData.backgroundData.previewData = {
            color:"rgba(255,255,255,0)",
            type:"color"
          }
          this.settingData.bannerLineSpace.value = 0
        }else{
          this.specialBot = true
          this.settingData.bannerBackups2.value = false
        }
        // if(!this.isComputer){
          let count = 0
          let nowV = null
          this.childData.forEach(ele=>{
            if(ele.settingData.mobileComIsHide){
              nowV = ele
              count++
            }
          })
          if(count == 1){
            nowV.mDisableToolY = false
          }
        // }
      },
      immediate:true,
    },
    clickDoc(val){//点击空白处或点击横条以外的组件（不包含横条列里面的子组件）true为点击空白处
      if(val){
        this.backgroundBtn = false
        this.pointMove = false
        this.labelShow = false
        this.settingData.classShow = false
        this.settingData.classShow2 = true
        this.emptyPlace = true
        this.settingData.myData.forEach((element,i)=>{
            element.resizeLShow = false
            element.resizeRShow = false
            element.ColumnLabelShow = false
            element.oneIsSelect = false
        })
        this.selectObj.emptyPlace = this.emptyPlace
        this.selectObj.labelShow = this.labelShow
        this.selectObj.classShow = this.settingData.classShow
        this.selectObj.classShow2 = this.settingData.classShow2
        this.selectObj.subTime = 0
      }
    },
    paneTypeF(val){//判断设置项弹窗是否关闭  打开:true  关闭:false
      if(this.childData.length == 1){
        this.specialBot = true
        this.settingData.bannerLineSpace.value = 0
        this.hChangeSetPageH(0)
      }else{
      }
      if(val){
        this.$children.forEach((element,index)=>{
          element.specialBot = false
        })
      }else{
        this.$children.forEach((element,index)=>{
          element.specialBot = true
        })
        if(!this.isComputer && !this.childVueDown){
          this.escClick()
          this.$store.commit("changeSelectList",null)
        }
      }
    },
    'style.left':{
      handler(){
        if(!this.settingData.fullScreen.value){
          this.style.left = 0
        }
      }
    },
    'settingData.fullScreen.value':{
      handler(){
        if(!this.settingData.fullScreen.value){
          this.settingData.bannerLRMargin.lrValue = 0
          this.style.left = -zmEditor.$store.state.page.marginLeft
          this.style.width = zmEditor.$store.state.page.contentWidth
          this.settingData.bannerBackups1.value = true
        }else{
          this.settingData.bannerLRMargin.lrValue = this.settingData.bannerLRMargin.value
          this.style.width = zmEditor.$store.state.page.nowWinWidth
          this.settingData.bannerBackups1.value = false
        }

        this.childData.forEach((element,index)=>{
          element.style.width = parseFloat(this.settingData.myData[index].width)/100*(this.style.width-(this.settingData.bannerPaddin.value*2+this.settingData.bannerLRMargin.lrValue*2)-(this.settingData.bannerLineSpace.value*(this.childData.length-1)))
        })
        if(this.childData.length == 1){
          this.settingData.bannerBackups2.value = true
          this.settingData.bannerLineSpace.value = 0
          this.hChangeSetPageH(0)
        }
      },
      immediate:true
    },
    'settingData.mobileComIsHide':{
      handler(val){
        if(!this.isComputer){
          this.setMobileTop()
          // this.escClick()
          this.$store.commit("changeSelectList",null)
        }
      }
    },
    childComRenderCompleteNum(n){//ssm
      if(this.childData.length == n && this.curComIsRender){
        this.isRenderCompleted = true;
      }
    },
    curComIsRender(n){//ssm
      if(this.childData.length == this.childComRenderCompleteNum && n){
        this.isRenderCompleted = true;
      }
    },
    isRenderCompleted(n){//ssm
      if(n){
        //组件包括所有的子组件全部渲染完成
        this.$store.commit('resetHistoryDataAccordingToHistoryId',this)
      }
    },
    forwardOrBack(v){//工具栏上一步下一步，Ctrl+z（ssm）
      this.settingData.backgroundData.nowVideo = this.$refs.video;
      this.videoF()
      this.eachBannerLeft()
      this.deleteSelectList()
      // console.log('forwardOrBack-------------------------zmEditor.$store.state.component.selectList[0]',zmEditor.$store.state.component.selectList[0])
    },
    isAtPreview(v){//监测是否在编辑模式，预览模式之间切换 true:预览模式  false:编辑模式
      this.escClick()
    },
    selectList(v){//为了解决从侧边栏拖出组件放入到横条列中然后在点击空白处横条列的选中效果不取消
      if(this.isComputer){
        if(v){
          if(v.otherType&&v.otherType == 'combinationBanner') return
          let el = this.findParent(v)
          if((el&&el.otherType != 'bannerChild') || !el){
            this.escClick()
          }
          if(el&&el.otherType == 'bannerChild'){
            this.settingData.myData.forEach((element,i)=>{
              if(element.id == el.id){
                this.bannerPBF(i,el.id)
              }
            })
            if(el.$parent.childData.length == 1){
              el.$parent.settingData.classShow = true
              el.$parent.settingData.classShow2 = false
              el.$parent.emptyPlace = false
            }
          }
        }else{
          this.escClick()
        }
      }
    }
  },
  computed:{
    selectList(){
      return zmEditor.$store.state.component.selectList[0]
    },
    isAtPreview(){//监测是否在编辑模式，预览模式之间切换 true:预览模式  false:编辑模式
      return zmEditor.$store.state.preview.isAtPreview
    },
    forwardOrBack(){//监测是否执行了上一步下一步操作
      return zmEditor.$store.state.history.forwardOrBack
    },
    texturePicture(){//覆盖纹理对的图片路径
        let url = '';
        if(this.settingData.backgroundData.depthIndex === 0){
          url = 'url(/static/background/light_0' + this.settingData.backgroundData.textureIndex + '.png)'
          if(this.settingData.backgroundData.textureIndex == 0){
            url =''
          }
        } else{
          url = 'url(/static/background/dark_0' + this.settingData.backgroundData.textureIndex + '.png)'
        }
        return url;
    },
    paneTypeF(){//判断设置项弹窗是否关闭  打开:true  关闭:false
      return zmEditor.$store.state.pane.paneData.paneType
    },
    clickDoc(){//点击空白处或点击横条以外的组件（不包含横条列里面的子组件）true为点击空白处
      return zmEditor.$store.state.otherStore.clickDoc
    },
    mainHtml(){
        let bgcC
        if(this.settingData.classShow){
          bgcC = 'rgba(45,129,201)'
        }else{
          bgcC = 'rgba(45,129,201,.5)'
        }
        if(this.settingData.classShow2){
          bgcC = 'rgba(45,129,201,0)'
        }
        let _id = "#"+this.id
        return `<style>
                ${_id}.mainIsSelect2{
                  box-sizing: content-box !important;
                }
                ${_id}.mainIsSelect2::before{
                    content: "";
                    display: block;
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    width:100%;
                    height:100%;
                    border:3px solid ${bgcC};
                    box-sizing: border-box;
                    z-index:1;
                    pointer-events:none;
                }
                .notMove{
                  color: #BFBFBF !important;
                  cursor:default !important;
                }
        </style>`
    },
    getContentWidth() {
      return zmEditor.$store.state.page.contentWidth
    },
    getNowWinWidth() {
      return zmEditor.$store.state.page.nowWinWidth
    },
    getMarginLeft(val) {
      if(this.settingData['fullScreen'].value){
        return zmEditor.$store.state.page.marginLeft;
      }else{
        return 0;
      }
    },
    isFullPage(){// 返回值为当前组件控制全屏按钮的属性值
      return this.settingData['fullScreen'].value
    },
  },
  methods:{
    deleteSelectList(){
      setTimeout(()=>{
        this.$store.commit("changeSelectList",null)
        this.escClick()
        return
      },400)
    },
    hh(){//解决在hover横条的时候让，‘页面’标签不应该显示(czj)
      // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&hh')
    },
    updateRenderStatus(){//ssm
      this.childComRenderCompleteNum ++;
    },
    rightClickP(){//父级横条右击
      this.selectObj.subTime = 0
      this.parentC()
      zmEditor.$store.commit('switchBtnType', 'comMenu')
    },
    dblclick(){//双击弹出设置框
      this.bannerTitle = "横条设置"
      this.setDialogIndex = 1;
      // this.$store.commit('setComBackgroundData',this.settingData.backgroundData)
      // zmEditor.$store.commit('setBackgroundData', {key: 'comType', value: 'banner'});
      zmEditor.$store.commit('changePaneData', {key: 'paneType', value: true});
      zmEditor.$store.commit('changePaneData', {key: 'paneTitle', value: this.bannerTitle});
      zmEditor.$store.commit('changePaneData', {key: 'paneMode', value: "/editor/pane/backgroundPreview.vue"});
      zmEditor.$store.commit('changePaneData', {key: 'paneHelpInfo', value: "通过设置项设置列背景样式"});
      // zmEditor.$store.commit('setBackgroundData', {key: 'nowShowStyle', value: 'img'});
      this.settingData.backgroundData.tabIndex = this.setDialogIndex;
    },
    cl2(evt,v2){//pc端双击横条列弹出设置框
      let event = window.event || evt
      this.backgroundBtn = !this.backgroundBtn
      this.bannerTitle = "横条背景"
      this.setDialogIndex = 1;
      // if(v2){
      //   this.bannerTitle = "横条背景"
      //   this.setDialogIndex = 1;
      // }else{
      //   event.currentTarget.firstChild.innerHTML.trim() == "编辑" ? this.bannerTitle = "横条背景" : this.bannerTitle = "横条设置"
      //   event.currentTarget.firstChild.innerHTML.trim() == "编辑" ? this.setDialogIndex = 0 : this.setDialogIndex = 1;
      // }
      zmEditor.$store.commit('changePaneData', {key: 'paneType', value: this.backgroundBtn});
      if(!this.backgroundBtn) return
      // this.$store.commit('setComBackgroundData',this.settingData.backgroundData)
      zmEditor.$store.commit('changePaneData', {key: 'paneTitle', value: this.bannerTitle});
      zmEditor.$store.commit('changePaneData', {key: 'paneIcon', value: ''});
      zmEditor.$store.commit('changePaneData', {key: 'paneMode', value: "/editor/pane/backgroundPreview.vue"});
      zmEditor.$store.commit('changePaneData', {key: 'paneHelpInfo', value: "通过设置项设置横条背景样式"});
      this.settingData.backgroundData.tabIndex = this.setDialogIndex;
    },
    bannerChildLimitHM(){//手机端高度极限值限定
      this.mobileStyle.height=this.mobileStyle.height >= 75120?this.mobileStyle.height = 75120:this.mobileStyle.height
      this.mobileStyle.height=this.mobileStyle.height <= 145?this.mobileStyle.height = 145:this.mobileStyle.height
    },
    bannerChildLimitHP(){//pc端高度极限值限定
      this.style.height=this.style.height >= 15000?this.style.height = 15000:this.style.height
      this.style.height=this.style.height <= 5?this.style.height = 5:this.style.height
    },
    updataMes(obj) {//当容器里面的子组件内部数据改变时及时更新子组件数据
      this.childData[obj.index][obj.key] = obj.value;
    },
    getMarginLeft2() {
      if(zmEditor.$store.state.page.marginLeft >= 0){
        return zmEditor.$store.state.page.marginLeft;
      }else{
        return 0;
      }
    },
    toolbarH(v){//在工具条中修改组件的高度后执行的回调函数
      setTimeout(()=>{
        if(v.editMold == 'computer'){
          
          this.style.height = v.height
          if(v.childCH){
            this.style.height = v.height + this.settingData.bannerPaddin.value*2
          }
          //在工具栏中输入【H】应该判断阻力值。输入小于阻力高度的值应该回弹并回填阻力值=======start
          if(this.style.height >= (this.maxTp + this.settingData.bannerPaddin.value*2)){
          }else{
              this.style.height = this.maxTp + this.settingData.bannerPaddin.value*2
          }
          //在工具栏中输入【H】应该判断阻力值。输入小于阻力高度的值应该回弹并回填阻力值=======end

          this.bannerChildLimitHP()
          this.childData.forEach((element,index)=>{
            element.style.height = this.style.height - this.settingData.bannerPaddin.value*2
          })
        }else{
          this.mobileStyle.height = v.height
          let topArr = []
          let nowVue = null
          this.$children.forEach((element,index)=>{
            if(element.settingData.mobileComIsHide){
              nowVue = element
              topArr.push(element.mobileStyle.top)
            }
          })

          if(topArr.length == 1){
            nowVue.mobileStyle.height = this.mobileStyle.height
            if(nowVue.maxTH && nowVue.mobileStyle.height <= nowVue.maxTH){
                nowVue.mobileStyle.height = nowVue.maxTH
                this.mobileStyle.height = nowVue.mobileStyle.height

            }
          }
        }
        //不下推组件只下推bodyRow/headRow/footRow的高度的参数：
        let params = {
            nowCom:this,//当前选中组件
            isPush:false,//false-不下推组件，之下推页面分割线
        }
        this.$store.commit("createChangeHeightClass",params);
        // this.$store.commit('updateComStyle', { id:this.id, style: this.style , mobileStyle: this.mobileStyle })//组件自身高度变化时 要同步修改下方或父级组件大小或者位置的 调用方法
        zmEditor.$store.commit('saveOperationToHistory')
       return
      },20)
    },
    eachBannerLeft(){//计算每一列的left
      if(this.isComputer){
        this.$nextTick(()=>{
          this.settingData.myData.forEach((element,index)=>{
            element.left = this.settingData.bannerPaddin.value+this.settingData.bannerLRMargin.lrValue
            element.outLeft = 0
            for(let j = 0;j<index;j++){
              element.left += parseFloat(this.settingData.myData[j].width)/100*(this.style.width-this.settingData.bannerPaddin.value*2-this.settingData.bannerLRMargin.lrValue*2-this.settingData.bannerLineSpace.value*(this.childData.length-1))+this.settingData.bannerLineSpace.value
              element.outLeft += parseFloat(this.settingData.myData[j].width)/100*(this.style.width-this.settingData.bannerPaddin.value*2-this.settingData.bannerLRMargin.lrValue*2-this.settingData.bannerLineSpace.value*(this.childData.length-1))+this.settingData.bannerLineSpace.value
            }
          })

          this.childData.forEach((element,index)=>{
            element.style.left = this.settingData.myData[index].left
            element.style.top = this.settingData.bannerPaddin.value
          })

        })
        let FullPageObj = {type:'fullPage',title:"满屏",icon:'icon-quanping1',callback:this.fullOrNotPage}
        let notFullPageObj = {type:'notFullPage',title:"取消满屏",icon:'icon-puman',callback:this.fullOrNotPage}
        if(this.settingData['fullScreen'].value){
            // this.buttonList.splice(0,1,notFullPageObj)
            this.style.width = zmEditor.$store.state.page.nowWinWidth
            this.style.left = -this.getMarginLeft2()
        }else{
            // this.buttonList.splice(0,1,FullPageObj)
            this.style.width = zmEditor.$store.state.page.contentWidth;
            this.style.left = 0
        }

      }
    },
    findParent(el){//当点击横条列中的任意一个组件的时候根据当前点击的组件查找横条列实例
      // if(!el.otherType) return
      if (el.otherType && el.otherType == 'bannerChild') {
        return el
      } else
      if (['bodyRow','headRow','footRow'].indexOf(el.$parent.type) > -1) {
        return false
      } else {
        return this.findParent(el.$parent)
      }
    },
    childDataTH(){//只要横条列中的子组件位置（包含组件宽高的改变）或者个数发生改变就会执行此函数
      // console.log('childDataTH----------------------')
      this.getMaxAndMinF()
      //解决再次改变横条列中子组件的style值（比如改变宽度）此时就要重置该子组件的style值==============start
      if(zmEditor.$store.state.component.selectList[0] && zmEditor.$store.state.component.selectList[0].type != 'banner'){
        let [childDOMRect,parentDOMRect,that,childBannerDOMRect] = [null,null,null,null]
        that = zmEditor.$store.state.component.selectList[0]
        let bannerChildVue = this.findParent(that)
        if(!$(zmEditor.$store.state.component.selectList[0].$el)[0] || !$(this.$el)[0] || !$(bannerChildVue.$el)[0]) return
        childDOMRect = $(zmEditor.$store.state.component.selectList[0].$el)[0].getBoundingClientRect()
        parentDOMRect = $(this.$el)[0].getBoundingClientRect()
        childBannerDOMRect = $(bannerChildVue.$el)[0].getBoundingClientRect()
        //用于判断当横条列中的子组件在纵向方向上移出横条列的时候，去除选中框和列标签==========================================start
        if(childDOMRect.y >= (parentDOMRect.y + parentDOMRect.height) || childDOMRect.y <= (parentDOMRect.y - childDOMRect.height)){
          // console.log('子组件移出了横条--------------@@@@@@@')
          this.settingData.myData.forEach((element,i)=>{
            element.oneIsSelect = false
            element.ColumnLabelShow = false
          })
        }
        if(bannerChildVue && bannerChildVue.otherType == 'bannerChild'){
          this.settingData.classShow = false
          this.settingData.classShow2 = true
          this.emptyPlace = false
          this.settingData.myData.forEach((element,i)=>{
            if(element.id == bannerChildVue.id){
              this.bannerPBF(i,bannerChildVue.id)
              element.resizeLShow = false
              element.resizeRShow = false
              element.ColumnLabelShow = true
              element.oneIsSelect = true
            }else{
              element.resizeLShow = false
              element.resizeRShow = false
              element.ColumnLabelShow = false
              element.oneIsSelect = false
            }
          })
        }
      }
      //用于判断当横条列中的子组件在纵向方向上移出横条列的时候，去除选中框和列标签==============================================end

      //解决再次改变横条列中子组件的style值（比如改变宽度）此时就要重置该子组件的style值==============end
      this.eachBannerLeft()
    },
    getMaxAndMinF(){//获取所有横条列中子组件距离容器上部最大的值（子组件top+子组件height）和子组件距离容器上部最小的值（子组件top+子组件height）
     /*
     *zmEditor.$store.getters.getComRotateInfo(element)这个是编辑器提供的,遍历的是容器里面的所有子组件，返回的是一个对象例如：
     {
      bottom: 175//子组件距离容器上部的top值加子组件的高度（包含具有旋转功能组件旋转后）
      height: 126//子组件高度
      left: 99//子组件距离容器左侧的距离
      right: 169//子组件距离容器左侧的距离加上子组件的高度（包含具有旋转功能组件旋转后）
      top: 49//子组件距离容器上部距离
      width: 70//子组件宽度
      }
     */
      // console.log('childDataTH-------------------')
      let that = this
      this.maxTArr = []
      this.maxTp = null
      this.minTArr = []
      this.minTp = 0
      that.minSub = 0

      this.childData.forEach((ele,i)=>{//循环遍历组合横条中的每一列
        if(ele.childData.length > 0){
          let vueT = []
          let vueT2 = []
          let vueMinT = []
          let maxHEle
          ele.childData.forEach((element,index)=>{//循环遍历组合横条中的每一列中的子组件 把所有的子组件的(top+height)值都保存到数组vueT中
            if(element.style.height != element.style.height || !element.style.height){
              element.style.height = 0
            }
            // let totalH = parseFloat(element.style.top)+parseFloat(element.style.height)
            let totalH = zmEditor.$store.getters.getComRotateInfo(element).bottom
            vueT.push(totalH)
            // vueMinT.push(parseFloat(element.style.top))
            vueMinT.push(parseFloat(zmEditor.$store.getters.getComRotateInfo(element).top))
          })

          that.maxT = Math.max.apply(null,vueT)//获取当前列横条子组件距离容器上部距离最大的值（即哪一个子组件距离容器上部距离最大的值）
          that.minT = Math.min.apply(null,vueMinT)//获取当前列横条子组件距离容器上部距离最小的值（即哪一个子组件距离容器上部距离最小的值）
          
          that.maxTArr.push(that.maxT)//把每一列横条中子组件距离容器下部距离最大的值加入数组
          that.minTArr.push(that.minT)//把每一列横条中子组件距离容器上部距离最小的值加入数组

          that.maxTArr = [...new Set(that.maxTArr)] //数组去重
          that.minTArr = [...new Set(that.minTArr)] //数组去重

          that.maxTp = Math.max.apply(null,that.maxTArr) //获取数组中的最大值（所有列横条中子组件距离容器上部距离最大的值）
          that.minTp = Math.min.apply(null,that.minTArr) //获取数组中的最小值（所有列横条中子组件距离容器上部距离最小的值）
          
          that.minSub = that.maxTp - (this.style.height-this.settingData.bannerPaddin.value*2)
          if(that.minSub<=0){
            that.minSub = 0
          }
        }
      })
    },
    getAllChildren(arr){//记录所有横条列里所有子组件
      // console.log('getAllChildren-------------------------',arr)
      let that = this
      loopN(arr)
      function loopN(arr){
        arr.forEach( item => {
          that.allChildren.set(item.id, item)
          if( item.$children && item.$children.length > 0){
            loopN(item.$children)
          }
        })
      }
    },
    GetDirection(y){//判断鼠标在纵轴的移动方向
      let Direction = ''
      this.DirectionArr.push(y)
      // this.DirectionArr = [...new Set(this.DirectionArr)] //数组去重
      if(this.DirectionArr[this.DirectionArr.length-1] > this.DirectionArr[this.DirectionArr.length-2]){
        // console.log('向下移动--------')
        Direction = 'down'
      }else{
        // console.log('向上移动--------')
        Direction = 'up'
      }
      return Direction
    },
    pointDown(obj){
      // console.log('pointDown-----------------------------event',event)
      let event = window.event || evt
      let index = obj.index
      this.nStyle.dy = event.clientY
      let lemitHeight
      if(this.isComputer){
        let realHeight = this.style.height - this.settingData.bannerPaddin.value*2
        this.nStyle.height = this.style.height
        this.nStyle.height2 = this.style.height
        this.nStyle.top = this.style.top
        this.getMaxAndMinF()
          this.changH = {
            oriL:this.style.left,//组件改变前的left
            oriH:this.style.height,//组件改变前的height
            oriW:this.style.width,//组件改变前的width
            oriT:this.style.top,//组件改变前的top
            curH:this.style.height,//组件改变后的高度
            oriRotate:this.style.rotate,
            nowCom:this,//当前选中组件
            isPush:true//true-下推组件 反之下推页面分割线
          }
      }
      if(index == 1){
        this.minTp2 = this.minTp
        this.nStyle.minT = this.minTp
        this.pointDrag = true
        this.nStyle.minH = this.nStyle.height - this.minTp2
        this.nStyle.top2 = this.style.top
      }
      if(index == 5){
        this.maxTp2 = this.maxTp
      }
      lemitHeight = this.maxTp?this.maxTp:5
      return {minHeight:(lemitHeight+this.settingData.bannerPaddin.value*2)}
    },
    pointCallBack(obj){
      // console.log('obj.height------------------------222222',obj)
      let event = window.event || evt
      let top2 = null
      this.pointMove = true
      this.parentMove = true
      let index = obj.index
      if(this.isComputer){
        this.getMaxAndMinF()
        let GetDirection = this.GetDirection(event.clientY)
        if(index == 5){
          this.pointDrag = false
          if(obj.height <= (5+this.settingData.bannerPaddin.value*2)){
            obj.height = 5+this.settingData.bannerPaddin.value*2
          }
          if(this.maxTArr.length > 0){
            if(this.minSub>=0&&obj.height <= (this.maxTp-this.minSub+this.settingData.bannerPaddin.value*2)){
              obj.height = (this.maxTp-this.minSub+this.settingData.bannerPaddin.value*2)
            }
          }
          this.style.height = obj.height

          this.childData.forEach((element,i)=>{
            element.style.height = this.style.height - this.settingData.bannerPaddin.value*2
          })

          //不下推组件只下推bodyRow/headRow/footRow的高度的参数==========statr
          let params = {
              nowCom:this,//当前选中组件
              isPush:false,//false-不下推组件，之下推页面分割线
          }
          this.$store.commit("createChangeHeightClass",params)
          //不下推组件只下推bodyRow/headRow/footRow的高度的参数============end
        }
        if(index == 1){
          this.pointDrag = true
          if(this.minTArr.length > 0){//横条列中有子组件
            if(this.minTp>=0){//子组件有部分超出横条列上边框
              if(obj.height <= this.nStyle.minH){
                obj.height = this.nStyle.minH
                this.style.height = obj.height
              }
              if(GetDirection == 'up'){//鼠标往上拖动
                this.style.height = obj.height
                if(this.nStyle.lemiTop2){
                  this.style.top = this.nStyle.lemiTop2- (this.style.height - this.nStyle.height2)
                  this.nStyle.top2 = this.style.top
                  this.nStyle.lemiTop2 = null
                }else{
                  this.style.top = this.nStyle.top2 - (this.style.height - this.nStyle.height2)
                }
              }else{//鼠标往下拖动
                if(obj.height <= this.nStyle.minH){
                  this.style.height = this.nStyle.minH
                }else{
                  this.style.height = obj.height
                }
                this.style.top = this.nStyle.top2 + (this.nStyle.height2 - this.style.height)
              }
            }else{//子组件没有超出横条列上边框
              if(obj.height <= this.nStyle.minH){
                obj.height = this.style.height
              }
              if(GetDirection == 'up'){
                this.style.height = obj.height
                this.style.top = this.nStyle.top - (this.style.height - this.nStyle.height)
                this.style.top2 = this.style.top
                this.nStyle.lemiTop2 = this.style.top2
                this.nStyle.height2 = this.style.height
                this.nStyle.minH = this.style.height
              }else{
                this.style.height = this.nStyle.height2
                obj.height = this.style.height 
              }
            }
          }else{//横条列中没有有子组件
            this.style.height = obj.height
            this.style.top = this.nStyle.top + (this.nStyle.height - this.style.height)
          }
          if(this.style.height <= (5+this.settingData.bannerPaddin.value*2)){
            this.style.top = this.nStyle.top + (this.nStyle.height - 5 - this.settingData.bannerPaddin.value*2 )
          }
          this.childData.forEach((element,i)=>{
              element.style.height = this.style.height - this.settingData.bannerPaddin.value*2
          })
          $("#zm-editor-component-btnList").css('display','none')
        }
      }else{
        if(index == 5){
          let topArr = []
          let nowVue = null
          this.childData.forEach((element,index)=>{
            if(element.settingData.mobileComIsHide){
              nowVue = element
              topArr.push(element.mobileStyle.top)
            }
          })
          if(topArr.length == 1){
            nowVue.mobileStyle.height = this.mobileStyle.height
          }
          this.getAllShowComH()
        }
      }
    },
    pointUp(obj){
      this.btnMove = false
      this.pointMove = false
      this.parentMove = false
      this.pointDrag = false
    },
    stretchDown(obj){//下推按钮按下回调
      // console.log('stretchDown-----------------------------0000',obj)
      let event = window.event || evt
      this.pointMove = true
      if(obj.index == 1){
        this.emptyPlace = false
        this.settingData.classShow = true
        this.settingData.classShow2 = false
        return
      }
      this.nStyle.dy = event.clientY
      this.nStyle.oldHeight = this.style.height?this.style.height:($(this.$refs.eachBanner).outerHeight()+this.settingData.bannerPaddin.value*2)
      let lemitHeight
      this.getMaxAndMinF()
      if(this.isComputer){
        this.nStyle.height = this.style.height
        this.nStyle.height2 = this.style.height
        this.nStyle.top = this.style.top
      }else{
        this.nStyle.height = this.mobileStyle.height
        this.nStyle.height2 = this.mobileStyle.height
      }
      lemitHeight = this.maxTp?this.maxTp:5
      return {minHeight:(this.isComputer?(lemitHeight+this.settingData.bannerPaddin.value*2):lemitHeight)}
    },
    stretchCallBack(obj){//下推按钮拖动回调
      let event = window.event || evt
      // console.log('stretchCallBack-----------------------------666666',obj)
      let Direction = this.GetDirection(event.clientY)
      if(obj.index == 1){
        this.emptyPlace = false
        this.settingData.classShow = true
        this.settingData.classShow2 = false
        return
      }
      this.pointMove = true
      this.parentMove = true
      this.getMaxAndMinF()
      if(this.isComputer){
          this.nStyle.dw = (event.clientY - this.nStyle.dy)?(event.clientY - this.nStyle.dy):(($(this.$refs.eachBanner).outerHeight()+this.settingData.bannerPaddin.value*2) - this.nStyle.height)
          obj.height = this.nStyle.height2 + this.nStyle.dw
          this.pointDrag = false
          if(obj.height <= (5+this.settingData.bannerPaddin.value*2)){
            obj.height = 5+this.settingData.bannerPaddin.value*2
          }
          if(this.maxTArr.length > 0){//横条列中有子组件
            if(obj.height <= (this.maxTp+this.settingData.bannerPaddin.value*2)){//回调传回来的高度小于等于横条的最小高度时
              if(obj.height >= this.nStyle.height){
                this.style.height = obj.height
                this.nStyle.height = this.style.height
              }else{
                if(this.nStyle.height>=(this.maxTp+this.settingData.bannerPaddin.value*2)){
                  this.nStyle.height = (this.maxTp+this.settingData.bannerPaddin.value*2)
                }
                this.style.height = this.nStyle.height
              }
            }else{//回调传回来的高度大于横条的实际高度时，改变横条高度即等于obj.height
              if(obj.height<=(this.maxTp+this.settingData.bannerPaddin.value*2)){
                obj.height = (this.maxTp+this.settingData.bannerPaddin.value*2)
              }
              this.style.height = obj.height
              this.nStyle.height = this.style.height
            }
          }else{//横条列中没有有子组件
            this.style.height = obj.height
          }
          this.childData.forEach((element,i)=>{
            element.style.height = this.style.height - this.settingData.bannerPaddin.value*2
          })
          // this.hChangeSetPageH2()
      }else{
        // if(index == 5){
          this.nStyle.dw = (event.clientY - this.nStyle.dy)?(event.clientY - this.nStyle.dy):($(this.$refs.eachBannerM).outerHeight() - this.nStyle.height)
          obj.height = this.nStyle.height2 + this.nStyle.dw
          let count = 0
          let nowV = null
          this.$children.forEach(ele=>{
            if(ele.settingData.mobileComIsHide){
              nowV = ele
              count++
            }
          })
          if(this.maxTArr.length > 0){
            if(obj.height <= this.maxTp){
              if(obj.height >= this.nStyle.height){
                this.mobileStyle.height = obj.height
                this.nStyle.height = this.mobileStyle.height
              }else{
                if(this.nStyle.height>=this.maxTp){
                  this.nStyle.height = this.maxTp
                }
                this.mobileStyle.height = this.nStyle.height
              }
            }else{
              if(obj.height<=this.maxTp){
                obj.height = this.maxTp
              }
              this.mobileStyle.height = obj.height
              this.nStyle.height = this.mobileStyle.height
            }
          }else{
            this.mobileStyle.height = obj.height
          }
          if(count == 1){
            nowV.mobileStyle.height = this.mobileStyle.height
          }
        }
      // }
    },
    stretchUp(){//下推按钮松开回调
      // console.log('stretchUp-----------------------------0000')
      this.DirectionArr = []
      this.btnMove = false
      this.pointMove = false
      this.parentMove = false
      if(this.childData.length != 1){
        this.emptyPlace = false
        this.settingData.classShow = true
        this.settingData.classShow2 = false
      }
    },
    mainClick(){//手机端点击整个横条(主要是点击列间距)
      // console.log('mainClick----------------------------')
      this.labelShow = true
      this.settingData.classShow = true
      this.settingData.classShow2 = false
      this.emptyPlace = false
      this.settingData.myData.forEach((element,i)=>{
        element.resizeLShow = false
        element.resizeRShow = false
        element.ColumnLabelShow = false
        element.oneIsSelect = false
      })
      this.$store.commit("changeSelectList",this)
      let DOMRect = $(this.$el)[0].getBoundingClientRect()
      this.getVue2(DOMRect,0)
    },
    parentC(){//点击父组件(解决在点击父组件的时候直接选中父组件或者在拖动横条列左右按钮时鼠标有可能停留在父组件上松开鼠标此时不选中父组件)
      // console.log('parentC-------------------22',zmEditor.$store.state.component.selectList[0].otherType)
      this.isClick = true
      this.pointMove = false
      if(this.isComputer && this.settingData['fullScreen'].value){
        zmEditor.$store.commit('upPlace', {
          left: Math.abs(zmEditor.$store.state.page.marginLeft) + 290,
          top: 0
        })
      }
      if(!this.isComputer){
        this.$store.commit("changeSelectList",this)
        let DOMRect = $(this.$el)[0].getBoundingClientRect()
        this.getVue2(DOMRect,0)
      }
      if(zmEditor.$store.state.component.selectList[0]&&zmEditor.$store.state.component.selectList[0].otherType == 'combinationBanner'){
        this.selectObj.subTime = 0
      }else if(zmEditor.$store.state.component.selectList[0]&&zmEditor.$store.state.component.selectList[0].otherType == 'bannerChild'){
        this.selectObj.subTime = 250
      }
      if(this.selectObj.subTime<200){
        this.bannerU()
        this.backgroundBtn = false
        this.settingData.classShow = true
        this.settingData.classShow2 = false
        this.emptyPlace = false
        if(this.childData.length == 1){
          if(this.isComputer){
            this.$store.commit("changeSelectList",this.$children[0])
          }else{
            this.$store.commit("changeSelectList",this)
          }
          
        }else{
          this.$store.commit("changeSelectList",this)
          if(this.isComputer){
            this.specialTop = true
            this.specialBot = true
          }else{
            // this.childData.forEach
            let count = this.getAllShowComH()
            if(count <=1){
              this.specialTop = true
              this.specialBot = true
            }else{
              this.specialTop = true
              this.specialBot = false
            }
          }
          
          this.settingData.myData.forEach((element,i)=>{
            element.resizeLShow = false
            element.resizeRShow = false
            element.ColumnLabelShow = false
            element.oneIsSelect = false
          })
        }
      }else{
        this.selectObj.subTime = 0
        if(this.isComputer){
          let nowVue = this.getNowVue().nowVue
          if(nowVue){
            let DOMRect = $(nowVue.$el)[0].getBoundingClientRect()
            this.getVue2(DOMRect,this.getNowVue().index)
          }
        }
      }
    },
    getNowVue(){//获取当前选中实例
      let nowId = null
      let nowVue = null
      let index = null
      this.settingData.myData.forEach((element,i)=>{
          if(element.oneIsSelect){
            nowId = element.id
            index = i
          }
      })
      this.$children.forEach((element,index)=>{
        if(element.id == nowId){
          nowVue = element
        }
      })
      return {
        nowVue,
        index
      }
    },
    bannerDown(){
      // console.log('bannerDown-----------------parent')
      let event = window.event || evt
      this.pointMove = true
      this.nStyle.nowVue = this.getNowVue().nowVue
      this.nStyle.dy = event.clientY
    },
    bannerMove(){
      // console.log('bannerMove-----------------parent')
      let event = window.event || evt
      this.nStyle.dw = event.clientY - this.nStyle.dy
      this.pointMove = true
      this.isClick = false
    },
    bannerUp(){
      // console.log('bannerUp-----------this.nStyle.dw-------------$parent',this.nStyle.dw)
      if(this.isClick || this.nStyle.dw == 0) return
      this.pointMove = false
      this.isClick = false
      if(this.nStyle.nowVue){
        this.selectObj.subTime = 250
        this.settingData.classShow = false
        this.settingData.classShow2 = true
        this.$store.commit("changeSelectList",this.nStyle.nowVue)
        let index = 0
        this.settingData.myData.forEach((element,i)=>{
          if(element.id == this.nStyle.nowVue.id){
            element.oneIsSelect = true
            element.resizeLShow = true
            element.resizeRShow = true
            element.ColumnLabelShow = true
            index = i
          }
        })
        let DOMRect = $(this.nStyle.nowVue.$el)[0].getBoundingClientRect()
        DOMRect?this.getVue2(DOMRect,index):''

      }else{
        this.settingData.classShow = true
        this.settingData.classShow2 = false
        this.$store.commit("changeSelectList",this)
      }
      // this.settingData.classShow = true
      
    },
    rightMove(index,_ComId){//右移
      if(this.isComputer){
        let nowEleW = parseFloat(this.settingData.myData[index].width)/100*this.style.width
        let nextEleW = parseFloat(this.settingData.myData[index+1].width)/100*this.style.width
      }
      let nowEle = this.settingData.myData[index]
      let nextEle = this.settingData.myData[index+1]
      let nowEleSet = this.childData[index]
      let nextEleSet = this.childData[index+1]

      //当前被选中的列的下一列位置被上一列替换
      this.settingData.myData.splice(index+1,1,Object.assign({},nowEle))
      this.childData.splice(index+1,1,Object.assign({},nowEleSet))
      // //当前被选中的列的位置被下一列替换
      this.settingData.myData.splice(index,1,Object.assign({},nextEle))
      this.childData.splice(index,1,Object.assign({},nextEleSet))
      this.selectObj.subTime = 600
      if(this.isComputer){
        this.eachBannerLeft()
        this.getVue(_ComId)
        setTimeout(()=>{
          this.bannerPBF(index+1)
          return
        },100)
        
      }else{
        this.$nextTick(() => {
          let num = this.$children.findIndex( item=> {
            return item.id == _ComId
          })
          this.$store.commit("changeSelectList",this.$children[num])//这句话不能删，否者左移后当前选中的实例会出错
        })
      }
      zmEditor.$store.commit('saveOperationToHistory')
    },
    leftMove(index,_ComId){//左移
      if(this.isComputer){
        let nowEleW = parseFloat(this.settingData.myData[index].width)/100*this.style.width
        let preEleW = parseFloat(this.settingData.myData[index-1].width)/100*this.style.width
      }
      let nowEle = this.settingData.myData[index]
      let preEle = this.settingData.myData[index-1]

      let nowEleSet = this.childData[index]
      let preEleSet = this.childData[index-1]

       //当前被选中的列的前一列位置被后一列替换
      this.settingData.myData.splice(index-1,1,Object.assign({},nowEle))
      this.childData.splice(index-1,1,Object.assign({},nowEleSet))
      //当前被选中的列的位置被前一列替换
      this.settingData.myData.splice(index,1,Object.assign({},preEle))
      this.childData.splice(index,1,Object.assign({},preEleSet))
      this.selectObj.subTime = 600
      if(this.isComputer){
        this.eachBannerLeft()
        this.getVue(_ComId)
        setTimeout(()=>{
          this.bannerPBF(index-1)
          return
        },100)
      }else{
        this.$nextTick(() => {
          let num = this.$children.findIndex( item=> {
            return item.id == _ComId
          })
          this.$store.commit("changeSelectList",this.$children[num])//这句话不能删，否者左移后当前选中的实例会出错
        })
      }
      zmEditor.$store.commit('saveOperationToHistory')
    },
    deleteBanner(index,_ComId,v){//删除列
      this.$store.commit('deleteComAfterdeleteHideCom', this.$store.state.component.selectList[0])
      this.selectObj.subTime = 300
      this.settingData.myData.splice(index,1)
      this.settingData.classShow = false
      this.childData.splice(index,1)
      // let w = parseFloat(1/this.settingData.myData.length*100)+"%"
      let w = parseFloat(1/this.childData.length*100)+"%"

      this.childData.forEach((element,index)=>{
        this.settingData.myData[index].id = element.id
      })
      this.settingData.myData.forEach((element,i)=>{
          element.width = w
          // element.left = parseFloat(element.width)/100*this.style.width*i
          element.resizeLShow = false
          element.resizeRShow = false
          element.ColumnLabelShow = false
          element.oneIsSelect = false
      })
      // this.childData.splice(index,1)
      // setTimeout(()=>{
        let that = this
        this.eachBannerLeft()//删除横条列之后所有横条列的left值重新计算
        if(this.childData.length == 0) {
          this.$store.state.otherStore.componentPosition.el = undefined//把编辑器的hover层去掉
          this.$store.commit('delComponent',this)//删除当前组件（调用编辑器的提供的删除方法）
        }
        this.selectObj.subTime = 300
        this.$store.commit("changeSelectList",null)
        // zmEditor.$store.commit('saveOperationToHistory')
        setTimeout(()=>{
          zmEditor.$store.commit('switchBtnType', null);//隐藏设置按钮
          this.escClick(1)//只要删除横条列就取消横条的所有选中效果
          if(this.childData.length == 1){
            this.settingData.marginT.value = 0
            this.hChangeSetPageH(0)
          }
          this.$store.commit("changeSelectList",null)
          zmEditor.$store.commit('saveOperationToHistory')
          return
        },300)
    },
    rightAdd(index,_ComId,v){//右侧添加列
      // zmEditor.$store.commit('saveOperationToHistory')
      //深层拷贝对象（对象里面嵌套对象）,如果只是一般的对象（对象里没有嵌套对象）就用Object.assign({},obj)
      // console.log('this.childData.length横条最多五列---------------------',this.childData.length)
      if(this.childData.length >= 5){
        // console.log('横条最多五列---------------------')
        return
      }
      let that = this
      let newColumn = JSON.parse(JSON.stringify(this.childData[index]))
      if(newColumn.settingData && newColumn.settingData.toMobileData){//zcm要求加的
          delete newColumn.settingData.toMobileData
      }
      let newchild = this.resolveComponent(newColumn)
      let newId = newchild.id
      // newchild.childData = []

      let newSetObj = JSON.parse(JSON.stringify(this.settingData.myData[index]))
      this.settingData.myData.splice(index,0,newSetObj)
      this.childData.splice(index + 1,0,newchild)
      // let w = (1/this.settingData.myData.length*100)+"%"

      this.childData.forEach((element,index)=>{
        this.settingData.myData[index].id = element.id
      })
      let w = (1/this.childData.length*100)+"%"

      this.settingData.myData.forEach((element,i)=>{
        element.width = w
        if(i != index){
            element.oneIsSelect = false
            element.resizeLShow = false
            element.resizeRShow = false
            element.ColumnLabelShow = false
        }
      })
      this.witchShow(index)

      this.eachBannerLeft()
      this.selectObj.subTime = 300
      zmEditor.$store.state.pane.paneData.paneType = false//关闭设置弹窗

      //czj--增加列时，所有子组件绝对位置不变，脱离父子组件关系============================start
      // this.$children.forEach( item => {
      //   this.$store.commit('other_addRowList',{_this:item})
      // })
      //czj--增加列时，所有子组件绝对位置不变，脱离父子组件关系============================end
      zmEditor.$store.commit('saveOperationToHistory')
      setTimeout(()=>{
        this.getVue(newId)
        this.settingData.classShow = false
        this.settingData.classShow2 = true
        this.eachBannerLeft()
        this.settingData.myData.forEach((element,i)=>{
          element.resizeLShow = false
          element.resizeRShow = false
        })
        this.notAddF()
        this.forSelect(newId)
        this.bannerPBF(index+1)

        this.childData.forEach((element,index)=>{
          this.settingData.myData[index].id = element.id
        })
        //最新添加列中的子组件距离左右虚线的相对位置不变==========================start
        this.$children.forEach( item => {
          if(item.childData.length > 0 && item.isComputer){
            item.childData.forEach((ele,i)=>{
              if(this.settingData.myData[index+1].childLeft[i]){
                this.settingData.myData[index+1].childLeft[i][0] = ele.id
              }
            })
            item.setChildleftF(item.childData)
          }
        })
        //最新添加列中的子组件距离左右虚线的相对位置不变==========================end
        return
      },300)
    },
    hChangeSetPageH2(){
      if(this.isComputer){
          this.style.height = this.childData[0].style.height + this.settingData.bannerPaddin.value*2
          this.childData.forEach((element,i)=>{
              element.style.top = this.settingData.bannerPaddin.value
          })
          this.curH = this.style.height
      }else{
          this.getAllShowComH()
          this.curH = this.mobileStyle.height
      }
      if(this.isComputer){
          this.$store.commit("createChangeHeightClass",this.changH)
      }else{
        this.$store.commit("createChangeHeightClass",this.changH)
      }
    },
    hChangeSetPageH(v){//组件高度变化后下方组件跟着上移
      let changH;
      if(this.isComputer){
          changH = {
              oriL:this.style.left,//组件改变前的left
              oriH:this.style.height,//组件改变前的height
              oriW:this.style.width,//组件改变前的width
              oriT:this.style.top,//组件改变前的top
              curH:this.style.height,//组件改变后的高度
              oriRotate:this.style.rotate,
              nowCom:this,//当前选中组件
              isPush:true//true-下推组件 反之下推页面分割线
          }
      }
      this.settingData.bannerPaddin.value = v
      this.style.height = this.childData[0].style.height + this.settingData.bannerPaddin.value*2
      this.childData.forEach((element,i)=>{
          element.style.top = this.settingData.bannerPaddin.value
      })
      if(this.isComputer){
          changH.curH = this.style.height;
          this.$store.commit("createChangeHeightClass",changH)
      }
    },
    forSelect(_ComId){//根据选中框确定横条列的索引
      let [nowS,nowSId,nowSVue] = [0,null,null]
      this.childData.forEach((element,index)=>{
        if(_ComId == element.id){
          this.settingData.myData[index].oneIsSelect = true
          this.settingData.myData[index].resizeLShow = true
          this.settingData.myData[index].resizeRShow = true
          this.settingData.myData[index].ColumnLabelShow = true
        }else{
          this.settingData.myData[index].oneIsSelect = false
          this.settingData.myData[index].resizeLShow = false
          this.settingData.myData[index].resizeRShow = false
          this.settingData.myData[index].ColumnLabelShow = false
        }
      })
      this.$children.forEach((element,index)=>{
        if(_ComId == element.id){
          nowSVue = element
          this.$store.commit("changeSelectList",nowSVue)
        }
      })
      this.getVue(_ComId)
      // this.isRightAdd = false
      return nowS
    },
    selNextVue(){//右侧添加列后，应该选中新添加的列(10091bug)
      let nowId = this.findParent(zmEditor.$store.state.component.selectList[0])?this.findParent(zmEditor.$store.state.component.selectList[0]).id:''
      // console.log('this.findParent(zmEditor.$store.state.component.selectList[0])--------------------',this.findParent(zmEditor.$store.state.component.selectList[0]))
      let nowIn = 0
      let nextId
      this.childData.forEach((element,index)=>{
        if(nowId == element.id){
          nowIn = index + 1
        }
      })
      this.childData.forEach((element,index)=>{
        element.style.left = this.settingData.myData[index].left
        if(nowIn == index){
          nextId = element.id
        }
      })
      let w = 1/this.settingData.myData.length
      this.$children.forEach((element,index)=>{
        element.style.width = this.style.width*w
        if(nextId == element.id){
          this.$store.commit("changeSelectList",element)
        }
      })
      this.settingData.myData.forEach((element,index)=>{
        element.width = (w*100)+"%"
        if(nowIn == index){
          element.oneIsSelect = true
          element.resizeLShow = false
          element.resizeRShow = false
          element.ColumnLabelShow = true
        }else{
          element.oneIsSelect = false
          element.resizeLShow = false
          element.resizeRShow = false
          element.ColumnLabelShow = false
        }
      })
      zmEditor.$store.commit('switchBtnType', 'unitMenu');//显示设置按钮
      this.getVue(nextId)
      this.isRightAdd = false
    },
    getVue(_ComId){//计算设置按钮位置
      let _id = "#"+this.id
      let nowIndex
      this.settingData.myData.forEach((element,i)=>{
        if(_ComId == element.id){
            element.oneIsSelect = true
            nowIndex = i
        }else{
            element.oneIsSelect = false
        }
      })
      this.$nextTick(() => {
        // let num = this.$children.findIndex( item=> {
        //   return item.id == _ComId
        // })
        let nowV = null
        this.$children.forEach((element,index)=>{
          if(_ComId == element.id){
            nowV = element
          }
        })
        this.$store.commit("changeSelectList",nowV)//这句话不能删，否者左移后当前选中的实例会出错
      })

      setTimeout(()=>{
        let DOMRect = $(_id).find(".eachBanner").eq(nowIndex)[0].getBoundingClientRect()
        let btnL = DOMRect.x + 137
        // let top

        // if(DOMRect.top < 112){
        //   top = DOMRect.top + this.style.height + 20
        // }else{
        //   top = DOMRect.top - 60
        // }
        // if(this.settingData['fullScreen'].value){
        //   if(nowIndex == 0){
        //     btnL = Math.abs(zmEditor.$store.state.page.marginLeft) + 70
        //   }
        // }
        // console.log('getVue----------------------(zmEditor.$store.state.component.selectList[0].style.left)',zmEditor.$store.state.component.selectList[0].style.left)
        if(this.settingData.fullScreen.value&&this.isComputer){
          if((zmEditor.$store.state.page.nowWinWidth - DOMRect.x) < 400){
            btnL = DOMRect.x - 280
          }
        }

        if(DOMRect){//重新给按钮设置区域重新定位
          zmEditor.$store.commit('upPlace', {
            left: btnL?btnL:(zmEditor.$store.state.component.selectList[0].style.left+150),
            // left: zmEditor.$store.state.component.selectList[0].style.left + 138,
            top: 0
          })
        }
        // if(zmEditor.$store.state.component.selectList[0]){
        //   zmEditor.$store.commit('upPlace', {
        //     left: zmEditor.$store.state.component.selectList[0].style.left+150,
        //     top: 0
        //   })
        // }
        return
      },50)
    },
    getVue2(DOMRect,index){//根据选择的横条列设置设置按钮的位置
      let btnL = DOMRect.x + 137
      let top
      if(DOMRect.top < 112){
        top = DOMRect.top + this.style.height + 20
        this.topMin = false
      }else{
        top = DOMRect.top - 60
        this.topMin = true
      }
      if(this.isComputer){
        if(this.settingData.fullScreen.value){
          if(index == 0){
            if(this.isComputer){
              // console.log('000000000000000000000000000000000000000')
              btnL = 210
              if(this.childData.length == 1 || (zmEditor.$store.state.component.selectList[0]&&zmEditor.$store.state.component.selectList[0].otherType == 'combinationBanner')){
                btnL = Math.abs(zmEditor.$store.state.page.marginLeft) + 290
              }
            }else{
              btnL = Math.abs(zmEditor.$store.state.page.marginLeft) + 70
            }
          }else if(index == (this.childData.length - 1)){
            if((zmEditor.$store.state.page.nowWinWidth - DOMRect.x) < 377){
              btnL = DOMRect.x - 240
            }
          }
          
          if((zmEditor.$store.state.page.nowWinWidth - DOMRect.x) < 400 && index != (this.childData.length - 1)){
            btnL = DOMRect.x - 280
          }
        }else{
          if(this.childData.length == 1){
            btnL = Math.abs(zmEditor.$store.state.page.marginLeft) + 105
          }
        }
      }else{
        // btnL = Math.abs(zmEditor.$store.state.page.marginLeft) + 70
        btnL = Math.abs(zmEditor.$store.state.page.mobileMarginLeft) + 70
      }

      // if(DOMRect){//重新给按钮设置区域重新定位
      //   zmEditor.$store.commit('upPlace', {
      //     left: btnL,
      //     top: top
      //   })
      // }
      if(zmEditor.$store.state.component.selectList[0]){//重新给按钮设置区域重新定位
          zmEditor.$store.commit('upPlace', {
          left: btnL?btnL:(zmEditor.$store.state.component.selectList[0].style.left+150),
          top: 0
        })
      }
    },
    setLper(){//保证横条列中子组件距离容器左边距离的百分比不变
      //保证横条列中子组件距离容器左边距离的百分比不变=====================start
      setTimeout(()=>{
        this.$children.forEach((element,index)=>{
          if(element.childData.length > 0){
            element.setChildleftF()
          }
        })
        if(this.isComputer){
          if(this.childData.length == 1){
            this.$children.forEach((ele,index)=>{
              ele.disableToolH = false
              if(this.settingData.bannerPaddin.value>10){
                ele.specialTop = false
              }else{
                ele.specialTop = true
              }
            })
          }else{
            this.$children.forEach((ele,index)=>{
              ele.specialTop = false
            })
          }
        }
        return
      },200)
      //保证横条列中子组件距离容器左边距离的百分比不变======================end
    },
    lemitWidthF(){//为了解决当全屏变为非满屏时横条列的最小宽度为100px（拿宽度大的列的一部分去补宽度不足100的列，相应的各自占的百分比也发生改变）
      let realW = (this.style.width-(this.settingData.bannerPaddin.value*2+this.settingData.bannerLRMargin.lrValue*2)-(this.settingData.bannerLineSpace.value*(this.childData.length-1)))
      this.settingData.myData.forEach((element,i)=>{
        
        let lemitW = parseFloat(element.width)/100*realW
        let oldW = parseFloat(element.width)
        let subP = null

        if(lemitW <= 100){
          let isIn = true
          element.width = (100/realW)*100 + "%"
          subP = parseFloat(element.width) - oldW
          this.settingData.myData.forEach((ele,index)=>{
            if(parseFloat(ele.width) > 20 && isIn){
              ele.width = (parseFloat(ele.width)-subP) + "%"
              isIn = false
            }
          })
        }
      })
    },
    fullpage(val){//工具条控制是否全屏的设置项的回调函数逻辑
      if(!val){
        //caj------------------------全屏变为非全屏时，子组件与横条脱离关系========start
        // this.$children.forEach( item => {
        //   this.$store.commit('other_addRowList',{_this:item})
        // })
        //caj------------------------全屏变为非全屏时，子组件与横条脱离关系========end
      }
      let FullPageObj = {type:'fullPage',title:"满屏",icon:'icon-quanping1',callback:this.fullOrNotPage}
      let notFullPageObj = {type:'notFullPage',title:"取消满屏",icon:'icon-puman',callback:this.fullOrNotPage}
      if(val){
          // this.buttonList.splice(0,1,notFullPageObj)
          this.settingData['fullScreen'].value = true
          // this.style.left = -zmEditor.$store.state.page.marginLeft
          this.style.width = zmEditor.$store.state.page.nowWinWidth
          this.style.left = -this.getMarginLeft2()
          this.setLper()
      }else{
          // this.buttonList.splice(0,1,FullPageObj)
          this.settingData['fullScreen'].value = false
          this.style.left = 0
          this.style.width = zmEditor.$store.state.page.contentWidth
      }
      this.lemitWidthF()
      this.settingData.myData.forEach((element,i)=>{
        let newLeft=0
        for(let j=0;j<=i;j++){
          newLeft += parseFloat(this.settingData.myData[j-1]?this.settingData.myData[j-1].width:0)/100*this.style.width
        }
        element.left = newLeft
      })
      this.eachBannerLeft()
      this.selectObj.subTime = 600
      setTimeout(()=>{
        this.labelShow = true
        this.settingData.classShow = true
        this.settingData.classShow2 = false
        this.emptyPlace = false
        if(this.childData.length == 1){
          this.$store.commit("changeSelectList",this.$children[0])
          this.$children[0].btnList()
        }else{
          this.$store.commit("changeSelectList",this)
        }
        let DOMRect = $(this.$el)[0].getBoundingClientRect()
        DOMRect?this.getVue2(DOMRect,0):''
        zmEditor.$store.commit('saveOperationToHistory')
        return
      },300)
      // setTimeout(()=>{
      //   this.labelShow = true
      //   this.settingData.classShow = true
      //   this.settingData.classShow2 = false
      //   this.emptyPlace = false
      //   if(this.childData.length == 1){
      //     this.$store.commit("changeSelectList",this.$children[0])
      //     this.$children[0].btnList()
      //   }else{
      //     this.$store.commit("changeSelectList",this)
      //   }
      //   zmEditor.$store.commit('saveOperationToHistory')
      //   return
      // },300)
    },
    fullOrNotPage(){//全屏，取消全屏事件
      // this.$children.forEach( item => {
      //    this.$store.commit('other_fullScreen',{_this:item,isFullPage:this.settingData.fullScreen.value})
      // })
      //  this.$store.commit('other_fullScreen',{_this:this})
      if(!this.settingData.fullScreen.value){
          // this.settingData['fullScreen'].value = false
          this.style.width = zmEditor.$store.state.page.contentWidth
         //caj------------------------全屏变为非全屏时，子组件与横条脱离关系========start
        //  this.$children.forEach( item => {
        //    this.$store.commit('other_addRowList',{_this:item})
        //  })
        
         //caj------------------------全屏变为非全屏时，子组件与横条脱离关系========end
      }else{
          // this.settingData['fullScreen'].value = true
          this.style.width = zmEditor.$store.state.page.nowWinWidth
          this.style.left = -this.getMarginLeft2()
          this.setLper()
      }
      this.lemitWidthF()
      this.settingData.myData.forEach((element,i)=>{
        let newLeft=0
        for(let j=0;j<=i;j++){
          newLeft += parseFloat(this.settingData.myData[j-1]?this.settingData.myData[j-1].width:0)/100*this.style.width
        }
        element.left = newLeft
      })
      // this.eachBannerLeft()
      this.selectObj.subTime = 300
      setTimeout(()=>{
        this.labelShow = true
        this.settingData.classShow = true
        this.settingData.classShow2 = false
        this.emptyPlace = false
        if(this.childData.length == 1){
          this.$store.commit("changeSelectList",this.$children[0])
          this.$children[0].btnList()
        }else{
          this.$store.commit("changeSelectList",this)
        }
        let DOMRect = $(this.$el)[0].getBoundingClientRect()
        DOMRect?this.getVue2(DOMRect,0):''
        zmEditor.$store.commit('saveOperationToHistory')
        return
      },300)
    },
    bannerU(v){//收集页面上所有的组合横条
      // console.log('bannerU-----------------------bannerU')
      let component = zmEditor.$store.state.component
      this.allVue = zmEditor.$store.getters.allComponent;
      //查找当前页面上所有的组合横条====================================start
      let curSelectCom = zmEditor.$store.state.component.selectList[0];// 当前选中组件
      let parentRow = curSelectCom;
      let headRow,bodyRow,footRow;
      let headRowBanner = [],bodyRowBanner = [],footRowBanner = [];
      let allBannderCom = [];
      if(!parentRow) return
      findParentRow(parentRow)
      function findParentRow(parentRow){
          switch(parentRow.type){
            case 'headRow':
                headRow = parentRow
            break;
            case 'bodyRow':
                bodyRow = parentRow
            break;
            case 'footRow':
                footRow = parentRow
            break;
            default:
                findParentRow(parentRow.$parent)
            break;
          }
      }
      if(!headRow){
        //headRow不存在
        if(!bodyRow){
          //headROw和bodyRow都不存在,footRow存在
          headRow = footRow.$parent.$refs.headRow;
          bodyRow = footRow.$parent.$refs.bodyRow;
          // footRow = headRow.$parent.$refs.footRow;
        }else{
          // bodyRow存在
          headRow = bodyRow.$parent.$refs.headRow;
          footRow = bodyRow.$parent.$refs.footRow;
        }
      }else{
        //headRow存在
        bodyRow = headRow.$parent.$refs.bodyRow;
        footRow = headRow.$parent.$refs.footRow;
      }

      function findBanner(parentRow,bannerCom){
        let childCom = parentRow.$children;
        childCom.forEach((child) => {
          if(child.settingData.isCombinationBanner){
            bannerCom.push(child)
          }else{
            findBanner(child,bannerCom)
          }
        })
      }

      findBanner(headRow,headRowBanner)
      findBanner(bodyRow,bodyRowBanner)
      findBanner(footRow,footRowBanner)
      allBannderCom = [...headRowBanner,...bodyRowBanner,...footRowBanner];//所有的复合横条组件
      this.myAllBannderCom = allBannderCom
      allBannderCom.forEach((ele,i)=>{//遍历所有组件实例，找到组合横条组件实例进行处理
        if(v == 'noS'){
          if(ele.otherType == 'combinationBanner'){
            ele.settingData.classShow = false
            ele.settingData.classShow2 = true
            ele.emptyPlace = true
            ele.settingData.myData.forEach((element,i)=>{
                element.resizeLShow = false
                element.resizeRShow = false
                element.ColumnLabelShow = false
                element.oneIsSelect = false
            })
          }
        }else{
          if(ele.id == zmEditor.$store.state.component.selectList[0].id){
          }else{
            if(ele.otherType == 'combinationBanner' && ele.id != zmEditor.$store.state.component.selectList[0].id){
              ele.settingData.classShow = false
              ele.settingData.classShow2 = true
              ele.emptyPlace = true
              ele.settingData.myData.forEach((element,i)=>{
                  element.resizeLShow = false
                  element.resizeRShow = false
                  element.ColumnLabelShow = false
                  element.oneIsSelect = false
              })
            }
            if(ele.id == zmEditor.$store.state.component.selectList[0].$parent.id){
              ele.settingData.classShow = false
              ele.settingData.classShow2 = true
              ele.emptyPlace = false

              allBannderCom.forEach((element,i)=>{
                if(element.id != ele.id){
                  element.settingData.classShow = false
                  element.settingData.classShow2 = false
                  element.emptyPlace = true
                  element.settingData.myData.forEach((el,i)=>{
                      el.resizeLShow = false
                      el.resizeRShow = false
                      el.ColumnLabelShow = false
                      el.oneIsSelect = false
                  })
                }
              })
            }
          }
        }
      })
      //查找当前页面上所有的组合横条====================================end
    },
    bannerOneClick(index,eleD){//组合横条中每一列的单击事件
      // console.log('bannerOneClick-----------------')
      this.nowIndex = index
      this.nowBorder.height = this.style.height
      if(this.childData.length >= 5){
        $(".rightAdd").css({'color':'#BFBFBF','cursor':'default'})
      }else{
        $(".rightAdd").css({'cursor':'pointer'})
      }
      let DOMRect
      if(eleD){
        DOMRect = $(eleD)[0].getBoundingClientRect()
      }else{
        DOMRect = $(event.currentTarget)[0].getBoundingClientRect()
      }
      this.bannerU()
      this.nowLeft = 0
      this.settingData.myData.forEach((element,i)=>{
        if(i < index){
          this.nowLeft += parseFloat(element.width)/100*this.style.width
        }
      })
      this.getVue2(DOMRect,index)
      this.isbanner = true
      if(this.childData.length == 1){
        this.settingData.classShow = true
        this.settingData.classShow2 = false
        
      }else{
        this.settingData.classShow = false
        this.settingData.classShow2 = true
      }
      
      this.witchShow(index)
      if(zmEditor.$store.state.component.selectList[0] && zmEditor.$store.state.component.selectList[0].otherType != "bannerChild"){
        this.emptyPlace = false
        this.settingData.myData.forEach((element,i)=>{
          if(i == index){
            element.resizeLShow = false
            element.resizeRShow = false
            element.ColumnLabelShow = true
            element.oneIsSelect = true
          }else{
            element.resizeLShow = false
            element.resizeRShow = false
            element.ColumnLabelShow = false
            element.oneIsSelect = false
          }
        })
      }else if(zmEditor.$store.state.component.selectList[0] && zmEditor.$store.state.component.selectList[0].otherType == "bannerChild"){
          this.labelShow = false
          this.emptyPlace = false
          this.settingData.classShow = false
          this.settingData.classShow2 = true
          this.settingData.myData.forEach((element,i)=>{
          if(i == index){
            element.resizeLShow = true
            element.resizeRShow = true
            element.ColumnLabelShow = true
            element.oneIsSelect = true
          }else{
            element.resizeLShow = false
            element.resizeRShow = false
            element.ColumnLabelShow = false
            element.oneIsSelect = false
          }
        })
        if(this.settingData.bannerPaddin.value > 0 && this.isComputer && this.childData.length==1){
          this.settingData.classShow = false
        }else if(this.settingData.bannerPaddin.value <= 0 && this.isComputer && this.childData.length==1){
          this.settingData.classShow = true
        }
        if(this.childData.length==1){
          this.settingData.classShow = true
          this.settingData.classShow2 = false
        }
      }
      this.bannerPBF(index)
    },
    setOutL(){//在改变zmEditor.$store.state.page.contentWidth或zmEditor.$store.state.page.nowWinWidth的时候同时改变.zm-bg-bannerPB的left和width
      this.eachBannerLeft()
      this.settingData.myData.forEach((element,index)=>{
        if(element.oneIsSelect){
          this.bannerPBF(index,element.id)
        }
      })
    },
    bannerPBF(index,_ComId){//当点击横条列的时候提供一个与横条列大小一致边框zm-bg-bannerPB，为了解决父级边框覆盖横条列边框导致横条列上下边框被覆盖的问题
      // console.log('bannerPBF-----------------------------22',index)
      if(this.isComputer){
        this.nowBorder.clickIndex = index
        this.settingData.myData.forEach((element,i)=>{
          if(i == index){

            this.nowBorder.left = element.left
            this.nowBorder.width = parseFloat(element.width)/100*(this.style.width-(this.settingData.bannerPaddin.value*2+this.settingData.bannerLRMargin.lrValue*2)-(this.settingData.bannerLineSpace.value*(this.childData.length-1)))
          }
        })
      }else{
        this.nowBorder.width = this.mobileStyle.width
        let clickId = null
        this.settingData.myData.forEach((element,i)=>{
          if(i == index){
            clickId = element.id
          }
        })
        this.setTopArrV()
        let clickTop = 0
        let clickHeight = 0
        if(_ComId){
          clickId = _ComId
        }
        this.topArr2.forEach((element,i)=>{
          if(element.id == clickId){
            clickTop = element.top
            clickHeight = element.height
            this.nowBorder.clickIndex = i
          } 
        })

        this.nowBorder.lengthM = 0
        this.childData.forEach((element,index)=>{
          if(element.settingData.mobileComIsHide){
            this.nowBorder.lengthM++
          }
        })
        this.nowBorder.top = clickTop
        this.nowBorder.height = clickHeight
      }
    },
    witchShow(index){
      this.settingData.myData.forEach((element,i)=>{
          if(index == i){
              element.oneIsSelect = true
              if(i == 0){
                  element.resizeLShow = false
                  element.resizeRShow = true
                  element.ColumnLabelShow = true
                  if(this.settingData.myData.length == 1){
                    element.ColumnLabelShow = false
                  }
              }else if(i == (this.settingData.myData.length-1)){
                  element.resizeLShow = true
                  element.resizeRShow = false
                  element.ColumnLabelShow = true
              }else{
                  // if(i != (this.settingData.myData.length - 1) || i != 0){
                  element.resizeLShow = true
                  element.resizeRShow = true
                  element.ColumnLabelShow = true
                  // }
              }
          }else{
              element.oneIsSelect = false
              element.resizeLShow = false
              element.resizeRShow = false
              element.ColumnLabelShow = false
          }
      })
    },
    resizedown(str,index,v,nowV,lemitVue,evt){//PC左右拖动按钮拖动事件
      let event = window.event || evt
      this.selectObj.firstTime = new Date().getTime();
      this.noPer = true
      let vueL = new Map()
      let NextVueL = new Map()
      if(nowV.childData.length > 0){
        nowV.childData.forEach((element,index)=>{
          vueL.set(element.id,element.style.left)
        })
      }
      let preId
      let preVue
      let prelemitVue
      let nextId
      let nextVue
      let nextlemitVue
      if(str == 'left'){
        this.childData.forEach((element,i)=>{
          if((index-1) == i){
            preId = element.id
          }
        })
      
        this.$children.forEach((element,index)=>{
          if(preId == element.id){
            preVue = element
          }
        })
        
        // if(preVue.childData.length > 0){
        //   prelemitVue = preVue.childDataMaxLW()
        // }else{
        //   prelemitVue = 100
        // }
        prelemitVue = 100
      }else if(str == 'right'){
          this.childData.forEach((element,i)=>{
            if((index+1) == i){
              nextId = element.id
            }
          })
        
          this.$children.forEach((element,index)=>{
            if(nextId == element.id){
              nextVue = element
            }
          })

          if(nextVue.childData.length > 0){
            nextVue.childData.forEach((element,index)=>{
              NextVueL.set(element.id,element.style.left)
            })
          }
          // if(nextVue.childData.length > 0){
          //   nextlemitVue = nextVue.style.width - nextVue.childDataMinL()
          // }else{
          //   nextlemitVue = 100
          // }
          nextlemitVue = 100
        }

      this.btnMove = true
      this.nowSelectIndex = index
      let that = this
      this.dx = event.clientX;//当你第一次单击的时候，存储x轴的坐标。
      this.nowElPer = (parseFloat(this.settingData.myData[index].width)/100).toFixed(4)
      this.nextElPer = this.settingData.myData[index+1]?(parseFloat(this.settingData.myData[index+1].width)/100).toFixed(4):0
      this.preElPer = this.settingData.myData[index-1]?(parseFloat(this.settingData.myData[index-1].width)/100).toFixed(4):0

      let realWidth = this.style.width - this.settingData.bannerPaddin.value*2 - this.settingData.bannerLRMargin.lrValue*2 - this.settingData.bannerLineSpace.value*(this.childData.length-1)
      this.nowElWidth = parseFloat(this.nowElPer*realWidth)
      this.nextElWidth = parseFloat(this.nextElPer*realWidth)
      this.preElWidth = parseFloat(this.preElPer*realWidth)

      this.nowElLeft = parseFloat(this.settingData.myData[index].left)
      if(index < (this.settingData.myData.length-1)){
        this.nextElLeft = parseFloat(this.settingData.myData[index+1].left)
      }
      if(index > 0){
        this.preElLeft = parseFloat(this.settingData.myData[index-1].left)
      }

      this.nStyle.width = this.nowElWidth

      document.onmousemove = function (event) {
        that.btnMove = true
        that.parentMove = false
        zmEditor.$store.commit('switchBtnType', null);//隐藏设置按钮
        zmEditor.$store.state.otherStore.componentPosition.el = undefined//横条组件在调节列宽度时，不要触发hover事件czj
        if(str.trim() == 'right'){
          that.dw = event.clientX - that.dx
          // let oderValue = parseFloat(lemitVue?lemitVue:100)
          let oderValue = 100
          that.nowElWidth2 = that.dw + parseFloat(that.nowElWidth)
          that.nextElWidth2 = parseFloat(that.nextElWidth) - that.dw
          // if(that.nowElWidth2 <= 100 || that.nextElWidth2 <= 100 || that.nextElWidth2 <= nextlemitVue) return
          that.settingData.myData[index+1].left = that.nextElLeft + that.dw
          // if(lemitVue){
          //   nextVue.childData.forEach((element,index)=>{
          //     element.style.left = NextVueL.get(element.id) - that.dw
          //   })
          // }
          if (that.nowElWidth2 <= oderValue) {//当盒子缩小到一定范围内的时候(现在设置最小宽度为横条宽度的0.05倍(即5%))，让他保持一个固定值，不再继续改变
            that.nowElWidth2 = oderValue
            that.dw = that.nowElWidth - (oderValue)
            that.nextElWidth2 = (that.nowElWidth - oderValue) + that.nextElWidth
            // if(lemitVue){
            //   nextVue.childData.forEach((element,index)=>{
            //     element.style.left = NextVueL.get(element.id) + that.dw
            //   })
            // }
          }

          if (that.nextElWidth2 <= nextlemitVue) {
            that.nowElWidth2 = that.nowElWidth + (that.nextElWidth -nextlemitVue)
            that.nextElWidth2 = nextlemitVue
            that.dw = that.nextElWidth - nextlemitVue
            that.settingData.myData[index+1].left = that.nextElLeft + that.dw

            // if(lemitVue){
            //   nextVue.childData.forEach((element,index)=>{
            //     element.style.left = NextVueL.get(element.id) - that.dw
            //   })
            // }
          }
          that.nowElPer = that.nowElWidth2/parseFloat(realWidth)
          that.nextElPer = that.nextElWidth2/parseFloat(realWidth)
          that.widthChange(str,index,that.nowElPer,that.nextElPer)
          that.ColumnResizeShow(index,str)
        }else if(str.trim() == 'left'){
          that.dw = event.clientX - that.dx
          that.nowElWidth2 = parseFloat(that.nowElWidth) - that.dw
          that.preElWidth2 = parseFloat(that.preElWidth) + that.dw
          // if(that.nowElWidth2 <= 100 || that.preElWidth2 <= 100 || that.preElWidth2 <= prelemitVue) return
          that.settingData.myData[index].left = that.nowElLeft + that.dw

          // let oderValue = parseFloat(lemitVue?lemitVue:100)
          let oderValue = 100
          // if(lemitVue){
          //   nowV.childData.forEach((element,index)=>{
          //     element.style.left = vueL.get(element.id) - that.dw
          //   })
          // }
          if (that.nowElWidth2 <= oderValue) {//当盒子缩小到一定范围内的时候(现在设置最小宽度为横条宽度的0.05倍(即5%))，让他保持一个固定值，不再继续改变
              that.nowElWidth2 = oderValue
              that.preElWidth2 = (that.nowElWidth - (oderValue)) + that.preElWidth
              that.dw = that.nowElWidth - (oderValue)
              that.settingData.myData[index].left = that.nowElLeft + that.dw

              // if(lemitVue){
              //   nowV.childData.forEach((element,index)=>{
              //     element.style.left = vueL.get(element.id) - that.dw
              //   })
              // }
          }
          if (that.preElWidth2 <= prelemitVue) {
              that.nowElWidth2 = that.nowElWidth + (that.preElWidth -(prelemitVue))
              that.preElWidth2 = prelemitVue
              that.dw = that.preElWidth - (prelemitVue)
              that.settingData.myData[index].left = that.nowElLeft - that.dw

              // if(lemitVue){
              //   nowV.childData.forEach((element,index)=>{
              //     element.style.left = vueL.get(element.id) + that.dw
              //   })
              // }
          }
          that.nowElPer = that.nowElWidth2 /parseFloat(realWidth)
          that.preElPer = that.preElWidth2/parseFloat(realWidth)
          that.widthChange(str,index,that.nowElPer,that.preElPer)
          that.ColumnResizeShow(index,str)
        }
      }
      document.onmouseup = function (event) {
        that.selectObj.lastTime = new Date().getTime()
        that.selectObj.subTime = that.selectObj.lastTime - that.selectObj.firstTime
        that.hoverIndex = -1
        zmEditor.$store.state.otherStore.componentPosition.el = true//横条组件在调节列宽度时，不要触发hover事件czj
        that.parentMove = true
        zmEditor.$store.commit('switchBtnType', 'unitMenu');//显示设置按钮
        document.onmouseup = null
        document.onmousemove = null
        that.ColumnResizeShow(index)
        that.eachBannerLeft()
        that.btnMove = false
        that.notAddF()
        //拖动完毕鼠标松开的时候从新计算设置按钮的位置================start
        let DOMRect
        if(v){
          DOMRect = $(v)[0].getBoundingClientRect()
        }else{
          DOMRect = $(event.currentTarget)[0].getBoundingClientRect()
        }
        that.getVue2(DOMRect,index)
        //拖动完毕鼠标松开的时候从新计算设置按钮的位置=================end
        zmEditor.$store.commit('saveOperationToHistory')
      }
    },
    notAddF(v){//当横条列个数超过
      // setTimeout(()=>{
      this.$nextTick(()=>{
        if(this.childData.length >= 5){
          if(!$(".rightAdd").hasClass('notAdd')) $(".rightAdd").addClass('notAdd')
        }else{
          $(".rightAdd").removeClass('notAdd')
        }
        if(this.isComputer){
          if(this.childData.length == 1){
            this.$children.forEach((ele,index)=>{
              ele.disableToolH = false
              if(this.settingData.bannerPaddin.value>10){
                ele.specialTop = false
              }else{
                ele.specialTop = true
              }
              
            })
          }else{
            this.$children.forEach((ele,index)=>{
              ele.specialTop = false
            })
          }
        }
        v?zmEditor.$store.commit('switchBtnType', 'comMenu'):zmEditor.$store.commit('switchBtnType', 'unitMenu')//显示设置按钮
        // return
      })
    },
    noSelect(v){//当拖动圆点改变组件高度的时候取消所有横条列的选中状态以及隐藏列标签
      if(v == 0 || v){//当拖动的是横条列的拖动按钮时，根据选中横条列的索引当拖动完毕选中状态不变
        this.settingData.classShow = false
        this.settingData.classShow2 = true
        this.settingData.myData.forEach((element,i)=>{
          if(v == i){
            element.resizeLShow = true
            element.resizeRShow = true
            element.ColumnLabelShow = true
            element.oneIsSelect = true
          }else{
            element.resizeLShow = false
            element.resizeRShow = false
            element.ColumnLabelShow = false
            element.oneIsSelect = false
          }
        })
      }else{
        if(this.parentMove){
          this.settingData.classShow = true
          this.settingData.classShow2 = false
          this.childData.forEach((element,i)=>{
            this.settingData.myData[i].resizeLShow = false
            this.settingData.myData[i].resizeRShow = false
            this.settingData.myData[i].ColumnLabelShow = false
            this.settingData.myData[i].oneIsSelect = false
          })
        }
      }
    },
    widthChange(str,index,nowPer,otherPer){//拖动横条列左右按钮时计算每一列的宽度
      this.settingData.myData[index].width = nowPer*100 + '%'
      if(str.trim() == 'right'){
        if(this.settingData.myData.length >= 2){
          this.settingData.myData[index+1].width = otherPer*100 + '%'
        }
      }else if(str.trim() == 'left'){
        if(this.settingData.myData.length >= 2){
          this.settingData.myData[index-1].width = otherPer*100 + '%'
        }
      }
      this.noSelect(index)
      this.eachBannerLeft()
      this.bannerPBF(index)

      this.$children.forEach((ele,i)=>{
        this.isComputer&&ele.setChildleftF(ele.childData)
      })
    },
    ColumnResizeShow(index,str){//根据选中列的索引让左右拖动按钮显示
      if(str){
        if(str.trim() == 'right'){
          this.settingData.myData[index].ColumnResizeR = true
          this.settingData.myData[index].ColumnResizeL = false
        }else if(str.trim() == 'left'){
          this.settingData.myData[index].ColumnResizeR = false
          this.settingData.myData[index].ColumnResizeL = true
        }
      }else{
        this.settingData.myData[index].ColumnResizeR = false
        this.settingData.myData[index].ColumnResizeL = false
      }
    },
    resolveComponent(obj) {//循环加载组件vue给每一个横条列设置不同的id(主要是右侧添加列的时候为新的列分配新的id--这个方法是赵陈松提供的)
      const com = () =>import ("@/components" + obj.url)
      obj.component = com;
      const id = Math.random().toString(32).substr(2).padStart(12, "xyz");
      obj.id = id;
      if (obj.childData && obj.childData.length != 0 && Object.keys(obj.childData).length != 0) {
          obj.childData.forEach(element => {
              if (element instanceof Array) {
                  if (element.length === 0) return;
                  element.forEach(item => {
                      this.resolveComponent(item)
                  })
              } else {
                  this.resolveComponent(element)
              }
          })
      }
      return obj
    },
    setTopArrV(){//从新获取手机端横条列的top值并排序（由小到大）
      this.topArr2 = []
      this.childData.forEach((element,index)=>{
        let obj = {
          id:element.id,
          top:element.mobileStyle.top,
          height:element.mobileStyle.height,
          isSelectSet:false
        }
        if(element.settingData.mobileComIsHide){
          this.topArr2.push(obj)
        }
      })
      function sortKey(array,key){
          return array.sort(function(a,b){
          var x = a[key];
          var y = b[key];
          return ((x<y)?-1:(x>y)?1:0)
        })
      }
      this.topArr2 = sortKey(this.topArr2,'top')//以top值的大小进行排序
      
      return this.topArr2
    },
    setChildTopM(){
        this.setTopArrV()
        this.topArr2.forEach((ele,index)=>{
          ele.top = 0
          for(let j = 0;j<index;j++){
            ele.top += parseFloat(this.topArr2[j].height)+parseFloat(this.settingData.marginT.value)
          }
        })
        this.topArr2.forEach((ele,index)=>{
        this.childData.forEach((element,index)=>{
              if(ele.id == element.id){
                element.mobileStyle.top = ele.top
              }
          })
        })
        this.getAllShowComH()
    },
    setMobileTop(){//手机端只要是给横条列进行上移下移，调整列间距都要从新给每一个横条列从新计算top值
      let newTop=[]
      this.setTopArrV()
      this.topArr2.forEach((ele,index)=>{
        ele.top = 0
        for(let j = 0;j<index;j++){
          ele.top += parseFloat(this.topArr2[j].height)+parseFloat(this.settingData.marginT.value)
        }
      })
      //主要用于在打开设置面板的时候在对横条列进行上移下移的时候设置弹框横条列的选中状态===========start
      if(zmEditor.$store.state.component.selectList[0]){
        this.topArr2.forEach((element,i)=>{
          if(zmEditor.$store.state.component.selectList[0].id == element.id){
              element.isSelectSet = true
          }else{
              element.isSelectSet = false
          }
        })
      }
      //主要用于在打开设置面板的时候在对横条列进行上移下移的时候设置弹框横条列的选中状态=============end
      this.topArr2.forEach((ele,index)=>{
        this.childData.forEach((element,index)=>{
            if(ele.id == element.id){
              element.mobileStyle.top = ele.top
            }
        })
      })

      this.getAllShowComH()
      if(this.isComputer){
        if(this.settingData.classShow || (!this.labelShow && this.settingData.classShow2)){
        if(this.settingData.classShow){
          zmEditor.$store.commit('switchBtnType', 'unitMenu');//显示设置按钮
        }else{
          zmEditor.$store.commit('switchBtnType', null);//显示设置按钮
        }
        this.$store.commit("changeSelectList",this)
        this.btnParentS()
        }else{
          this.escClick()
        }
      }
      return this.topArr2
    },
    btnParentS(){//点击整个横条的时候显示设置按钮
      if(this.isComputer){
        this.pattern = [0,1,0,0,0,1,0,0]
      }else{
        this.pattern = [0,0,0,0,0,0,0,0]
      }
      this.specialTop = true
      this.specialBot = true
      let top
      if($(this.$el).offset().top < 112){
        this.topMin = false
        top = $(this.$el).offset().top + this.style.height + 20
      }else{
        this.topMin = true
        top = $(this.$el).offset().top - 59
      }
      zmEditor.$store.commit('upPlace', {
        left: Math.abs(zmEditor.$store.state.page.marginLeft) + 70,
        top: top
      })
    },
    getAllShowComH(){//从新计算父级组件的总高度
      //从新计算父级组件的总高度======================================start
      let sumT = 0
      let num = 0
      this.childData.forEach((ele,i)=>{
        if(ele.settingData.mobileComIsHide){
          sumT += ele.mobileStyle.height
          num++
        }
      })
      this.mobileStyle.height = sumT + parseFloat(this.settingData.marginT.value)*(num-1)
      //从新计算父级组件的总高度=======================================end
      return num
    },
    escClick(v){//编辑器中点击全局按钮esc事件执行当前实例事件
      this.pointMove = false
      this.labelShow = false
      this.settingData.classShow = false
      this.settingData.classShow2 = true
      this.emptyPlace = true
      this.settingData.myData.forEach((element,i)=>{
          element.resizeLShow = false
          element.resizeRShow = false
          element.ColumnLabelShow = false
          element.oneIsSelect = false
      })
      this.isbanner = false
      if(v){
      }else{
        this.bannerU('noS')
      }
    },
    changeTopAndGetH(){//手机端横条列top值发生改变时从新计算所有横条列的top值以及父级的高度
       !this.isComputer&&this.setMobileTop()
    },
    findBannerCom(){//查找页面上所有的组合横条
      let component = zmEditor.$store.state.component
      this.allVue = zmEditor.$store.getters.allComponent;
      //查找当前页面上所有的组合横条====================================start
      let curSelectCom = zmEditor.$store.state.component.selectList[0];// 当前选中组件
      if(!curSelectCom) return
      let parentRow = curSelectCom.$parent;
      let headRow,bodyRow,footRow;
      let headRowBanner = [],bodyRowBanner = [],footRowBanner = [];
      let allBannderCom = [];
      findParentRow(parentRow)
      function findParentRow(parentRow){
          switch(parentRow.type){
            case 'headRow':
                headRow = parentRow
            break;
            case 'bodyRow':
                bodyRow = parentRow
            break;
            case 'footRow':
                footRow = parentRow
            break;
            default:
                findParentRow(parentRow.$parent)
            break;
          }
      }
      if(!headRow){
        //headRow不存在
        if(!bodyRow){
          //headROw和bodyRow都不存在,footRow存在
          headRow = footRow.$parent.$refs.headRow;
          bodyRow = footRow.$parent.$refs.bodyRow;
          // footRow = headRow.$parent.$refs.footRow;
        }else{
          // bodyRow存在
          headRow = bodyRow.$parent.$refs.headRow;
          footRow = bodyRow.$parent.$refs.footRow;
        }
      }else{
        //headRow存在
        bodyRow = headRow.$parent.$refs.bodyRow;
        footRow = headRow.$parent.$refs.footRow;
      }

      function findBanner(parentRow,bannerCom){
        let childCom = parentRow.$children;
        childCom.forEach((child) => {
          if(child.settingData.isCombinationBanner){
            bannerCom.push(child)
          }else{
            findBanner(child,bannerCom)
          }
        })
      }

      findBanner(headRow,headRowBanner)
      findBanner(bodyRow,bodyRowBanner)
      findBanner(footRow,footRowBanner)
      allBannderCom = [...headRowBanner,...bodyRowBanner,...footRowBanner];//所有的复合横条组件
      return allBannderCom 
    },
    otherBannerNotS(){//从侧边栏拖出横条时加上选中框并让zmEditor.$store.state.component.selectList[0]的值为横条实例
      setTimeout(()=>{
        let ele = zmEditor.$store.state.component.selectList[0]
        if(!ele) return
        let myAllBannderCom = this.findBannerCom()
        myAllBannderCom.forEach((element,i)=>{//遍历所有组件实例，找到组合横条组件实例进行处理
          if(element.id == ele.id){
            element.labelShow = true
            element.settingData.classShow = true
            element.settingData.classShow2 = false
            element.emptyPlace = false
          }else{
            zmEditor.$store.commit('switchBtnType', null);//隐藏设置按钮
            element.labelShow = false
            element.settingData.classShow = false
            element.settingData.classShow2 = true
            element.emptyPlace = true
            element.settingData.myData.forEach((e,i)=>{
              e.resizeLShow = false
              e.resizeRShow = false
              e.ColumnLabelShow = false
              e.oneIsSelect = false
            })
          }
        })

        if(this.childData.length == 1){
          this.$store.commit("changeSelectList",this.$children[0])
          zmEditor.$store.commit('switchBtnType', 'unitMenu')
          this.$children[0].pattern = [0,1,0,0,0,1,0,0]
          if(zmEditor.$store.state.component.selectList[0].otherType == 'bannerChild'){//为了解决当横条组件移入页眉时选中框还是选中整个横条
            this.settingData.classShow = true
            this.settingData.classShow2 = false
            this.emptyPlace = false
          }
        }else{
          this.$store.commit("changeSelectList",this)
          this.$children[0].pattern = [0,0,0,0,0,0,0,0]
          if(zmEditor.$store.state.component.selectList[0].otherType == 'combinationBanner'){//为了解决当横条组件移入页眉时选中框还是选中整个横条
            this.settingData.classShow = true
            this.settingData.classShow2 = false
            this.emptyPlace = false
          }
        }
        return
      },100)
    },
    totleLineWF(){//zmEditor.$store.state.page.contentWidth = 整体边距缩进*2+列间距*(横条列数-1)+每列辅助线间的距离*横条列总数
      this.totleLineW = zmEditor.$store.state.page.contentWidth - this.settingData.bannerPaddin.value*2-this.settingData.bannerLineSpace.value*(this.childData.length-1)
      this.$children.forEach((ele,i)=>{
          this.settingData.myData.forEach((element,index)=>{
              if(ele.id == element.id){
                  //计算每个横条列左右辅助线在横条列中的left值
                  ele.nStyle.linePosition = (ele.style.width-(parseFloat(element.width)/100*this.totleLineW))/2
              }
          })
      })
    },
    EquipmenType(){
      let u = navigator.userAgent
      return {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
        iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
        qq: u.match(/\sQQ/i) == " qq" //是否QQ
      }
    },
    videoF(){
      let _this = this
      this.settingData.backgroundData.nowVideo = this.$refs.video;
      if(this.settingData.backgroundData.previewData.src){
        this.videoPlayer = videojs(this.$refs.video,{
          bigPlayButton:false,
          textTrackDisplay:false,
          posterImage:false,
          errorDisplay:false,
          autoplay : _this.settingData.backgroundData.isVideoPlay,
          loop:_this.settingData.backgroundData.isLoopPlay,
          // playbackRate:_this.settingData.backgroundData.playbackRate
          // width:_this.style.width,
          // height:_this.style.height
        },function(){
          this.src(_this.settingData.backgroundData.previewData.src)
          this.on('ended',function(){
              _this.settingData.backgroundData.isVideoPlay = false;
          })
          setTimeout(()=>{
            this.playbackRate(_this.settingData.backgroundData.playbackRate)
            return
          },100)
        })
      }
    }
  },
  created(){
   this.mobileStyle.width = 320
   this.mobileStyle.left = 0
   if(this.EquipmenType()&&this.EquipmenType().iPad){
    this.settingData.bannerLRMargin.lrValue = 0
   }else{
    if(!this.settingData.fullScreen.value){
        this.settingData.bannerLRMargin.lrValue = 0
    }else{
        this.settingData.bannerLRMargin.lrValue = this.settingData.bannerLRMargin.value
    }
   }

   this.childData.forEach((element,index)=>{
      this.settingData.myData[index].id = element.id
   })
   this.selectObj.subTime = 250
   this.isComputer?this.specialBot=true:this.specialBot=false
   this.escClick()
   this.childData.forEach((element,index)=>{
      if(element.settingData.backgroundData.previewData.type == 'color'){
        element.bigClass = 'bannerColor'
      }else if(element.settingData.backgroundData.previewData.type == 'img'){
        element.bigClass = 'bannerImg'
      }else if(element.settingData.backgroundData.previewData.type == 'video'){
        element.bigClass = 'bannerVideo'
      }
   })
   if(!this.isComputer){
   }else{
      this.childData.forEach((element,index)=>{//把容器组件里所有的子组件的top值都保存到数组vueT中
        element.style.width = parseFloat(this.settingData.myData[index].width)/100*(this.style.width-(this.settingData.bannerPaddin.value*2+this.settingData.bannerLRMargin.lrValue*2)-(this.settingData.bannerLineSpace.value*(this.childData.length-1)))
      })
   }
  },
  mounted(){
    if(this.$store.state.pane.isRenderSelect){
      this.$store.commit("changeSelectList",this)
    }else{
      this.id == this.$store.state.component.oldComID && this.$store.commit("changeSelectList",this)
      this.$store.state.component.componentNum++
    }
    if(this.isComputer){
      this.videoF()
      setTimeout(()=>{
        this.eachBannerLeft()
        this.childDataTH()
        this.getVue2(this.id,0)
        return
      },200)
    }else{
      this.settingData.myData.forEach((element,i)=>{
        element.hoverBgc = false
      })
      this.pattern = [0,0,0,0,0,0,0,0]
    }
    this.$nextTick(()=>{
      this.isComputer&&this.otherBannerNotS()
      // !this.isComputer&&this.setTopArrV()
      this.setChildTopM()
      this.childData.forEach((element,index)=>{
        this.settingData.myData[index].id = element.id
      })
      if(this.settingData.mobileComIsHide) this.$store.commit("raiseComUpdated",{"id":this.id});//（this.id是组件的id）
      this.curComIsRender = true;//ssm 渲染完成
    })
  },
}
</script>
<style scoped>
    .zm-bg-bannerPB{
      pointer-events: none;
    }
    .bannerPB::before{
      border-left-width: 0px !important;
      border-right-width: 0px !important;
    }
    .bannerPBStart::before{
      border-left-width: 3px !important;
      border-right-width: 0px !important;
    }
    .bannerPBEnd::before{
      border-left-width: 0px !important;
      border-right-width: 3px !important;
    }

    .bannerPBM::before{
      border-left-width: 3px !important;
      border-right-width: 3px !important;
      border-top-width: 0px !important;
      border-bottom-width: 0px !important;
    }
    .bannerPBStartM::before{
      border-left-width: 3px !important;
      border-right-width: 3px !important;
      border-top-width: 3px !important;
      border-bottom-width: 0px !important;
    }
    .bannerPBEndM::before{
      border-left-width: 3px !important;
      border-right-width: 3px !important;
      border-top-width: 0px !important;
      border-bottom-width: 3px !important;
    }
    .SelectBzIndex::after{
      z-index: 110 !important;
    }
    .mainBannerIndex::before{
      z-index: 110 !important;
    }
    .mainIsSelectBanner3,.mainIsSelectBanner4{
      /* box-sizing: content-box !important; */
    }
    .mainIsSelectBanner3::before,.mainIsSelectBanner4::before{
      content: "";
      display: block;
      position: absolute;
      left: 0px;
      top: 0px;
      width:100%;
      height:100%;
      box-sizing: border-box;
      z-index:1;
      pointer-events:none;
    }
    .notAdd{
      color:#BFBFBF !important;
      cursor:default !important
    }
    .bannerHoverLabel,.bannerHoverLabelM{
      position: absolute;
      left: 0px;
      /* top: -20px; */
      height:20PX;
      line-height: 20PX;
      font-size: 12px;
      text-align: center;
      color: #3089d5;
      padding: 0 5px;
      z-index:3;
    }
    .bannerHoverLabelM{
      top: -20px;
    }
    .hoverTopL{
      top: -20px;
    }
    .hoverBottomL{
      bottom: -20px;
    }
    .zm-banner-main{
        display:flex;
    }
    .mainIsSelectBanner,.mainIsSelectNotBanner{
      /* box-sizing: content-box !important; */
    }
    .mainIsSelectBanner3::before{
      box-sizing: border-box !important;
    }
    .mainIsSelectBanner::before,.mainIsSelectNotBanner::before{
        content: "";
        display: block;
        position: absolute;
        left: 0px;
        top: 0px;
        width:100%;
        height:100%;
        box-sizing: border-box !important;
        z-index:1;
        pointer-events:none;
    }
    .mainIsSelectBanner::before{
        border: 1px solid rgba(48,137,213,.2);
    }
    .mainIsSelectBanner:hover::before,.mainIsSelectNotBanner:hover::before{
      background-color:rgba(48,137,213,.15)
    }
     .zm-main-banner-vein{
        z-index:2;
        width: 100%;
        height: 100%;
        left:0px;
        top:0px;
        position:absolute;
        /* pointer-events:none; */
    }
    .eachBanner{
       /* display: inline-block; */
       /* position: relative; */
       position: absolute;
       left: 0;
       top:0;
       /* overflow:hidden; */
    }
    .zm-component-combination{
        width: 100%;
        height: 100%;
    }
    .zm-banner-resizeR,
    .zm-banner-resizeL {
        top: 50%;
        height: 22px;
        width: 22px;
        margin-top: -9px;
        background-color: #fff;
        position: absolute;
        cursor: w-resize;
        z-index: 2;
        transform: rotate(90deg);
        background: -webkit-gradient(linear, 0 0, 0 bottom, from(#fff), to(#e6e6e6));
        border-radius: 6px;
        border: 1px solid #e4e4e4;
        box-shadow: 0 0 5px rgba(218, 227, 233, 0.6);
        user-select: none;
    }
    .zm-banner-resizeR svg,
    .zm-banner-resizeL svg{
        width: 100%;
        height: 100%;
        stroke: #c9c9c9;
        fill: #c9c9c9;
    }
    .zm-banner-resizeR {
        right: -11px;
    }
    .zm-banner-resizeL {
        left: -11px;
    }
    .banner-Column-resizeL,
    .banner-Column-resizeR {
        top: 42%;
        position: absolute;
        width: auto;
        height: 20px;
        padding: 0 5px;
        background-color: #fff;
        color:#333333;
        border-radius: 2px;
        font-size: 12px;
        text-align: center;
        line-height: 20px;
        box-shadow: 5 5 5 #ffffff;
        z-index: 100;
        background: -webkit-linear-gradient(top, #FFFFFF , #E4E4E4); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(top, #FFFFFF, #E4E4E4); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(top, #FFFFFF, #E4E4E4); /* Firefox 3.6 - 15 */
        background: linear-gradient(to top, #FFFFFF , #E4E4E4); /* 标准的语法 */
        border:1px solid #D7D7D7;
    }
    .banner-Column-resizeL {
      left: 15px;
    }
    .banner-Column-resizeR {
      right: 15px;
    }
    .banner-Column-label {
      width: 130px;
      height: 28px;
      /* background-color: #3089d5; */
      position: absolute;
      /* left: 0; */
      /* top: -28px; */
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      color: #fff;
      text-align: center;
      line-height: 28px;
      font-size: 13px;
      z-index:1;
    }
    .banner-Column-labelH {
      width: 130px;
      height: 28px;
      background-color: #3089d5;
      position: absolute;
      left: 0;
      /* top: -28px; */
      /* border-top-left-radius: 5px; */
      /* border-top-right-radius: 5px; */
      color: #fff;
      text-align: center;
      line-height: 28px;
      font-size: 13px;
    }
    .mainLabel{
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      height:30px;
    }
    .ColumnLabel1{
      top: -28px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }
    .ColumnLabel2{
      bottom: -28px;
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    .oneIsSelect{
      /* border: 2px solid #2D81C9; */
      /* border: none !important; */
      box-sizing: border-box;
    }
    .oneIsSelect::after{
      content: "";
      display: block;
      position: absolute;
      left: 0px;
      top: 0px;
      width:100%;
      height:100%;
      border: 3px solid #2D81C9;
      box-sizing: border-box;
      z-index:1;
      pointer-events:none;/* 鼠标点击穿透Div */
    }
    .banner-container{
      position: absolute;
      width:100%;
      height:100%;
      left: 0px;
      top:0px;
      pointer-events:all;/* 鼠标点击穿透Div */
    }
    .mainLabel{
      width: 60px;
      height: 28px;
      /* background-color: #3089d5; */
      position: absolute;
      left: 27%;
      /* top: -28px; */
      /* border-top-left-radius: 5px; */
      /* border-top-right-radius: 5px; */
      color: #fff;
      text-align: center;
      line-height: 28px;
      font-size: 13px;
    }
    .mainLabel1{
      top: -28px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
      z-index:1;
    }
    .mainLabel2{
      bottom: -28px;
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
</style>
