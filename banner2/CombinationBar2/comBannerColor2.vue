<template>

    <!-- PC端 -->
    <div v-if="isComputer" @click.stop="childC(selIndex)" @dblclick.stop="dblclick" :id="id" class="zm-bannerChild-main" :style="{position: 'absolute', width:fwidth+'px',height: style.height+'px',left:'0px',top:'0px'}" @mousedown.stop.left="other($event),mousedown($event)" @contextmenu.stop.prevent="other($event),openMenu($event)" @mouseout="eachBannerOut(selIndex)" @mousemove="eachBannerMove(selIndex)">
        
      <!-- 图片 -->
      <div class="zm-component-banner zm-component-banner-one" data-type-banner="image" v-if="settingData.backgroundData.previewData.type=='img'">
            <div class="zm-bg-banner-PIC" :style="{backgroundImage:'url('+settingData.backgroundData.previewData.poster+')',backgroundColor:settingData.backgroundData.bottom.color}"></div>
            <div class="zm-bg-banner-vein" :style="{backgroundImage:texturePicture,backgroundColor:settingData.backgroundData.coverage.color}"></div>
      </div>
      <!-- 颜色 -->
      <div class="zm-component-banner zm-component-banner-one" data-type-banner="color" v-else-if="settingData.backgroundData.previewData.type=='color'">
            <div class="zm-bg-banner-BGC" :style="{backgroundColor:settingData.backgroundData.previewData?settingData.backgroundData.previewData.color : rgb}"></div>
      </div>
      <!-- 视频 -->
      <div class="zm-component-banner zm-component-banner-one" data-type-banner="video" v-show="settingData.backgroundData.previewData.type=='video'" :style="{width: style.width+'px',height: style.height+'px'}">
            
            <div class="zm-bg-banner-PIC" v-show="colorAb" :style="{backgroundImage:'url('+settingData.backgroundData.previewData.poster+')',backgroundColor:settingData.backgroundData.bottom.color}"></div>
            <div class="zm-bg-banner-Video" v-show="!colorAb" :style="{width: style.width+'px',height: style.height+'px'}">
                <!-- <video :src="settingData.backgroundData.previewData?settingData.backgroundData.previewData.src : src" :poster="settingData.backgroundData.previewData?settingData.backgroundData.previewData.poster : ''" autoplay="false" loop="true" ref="video"></video> -->
                <video muted :poster="settingData.backgroundData.previewData.poster" :loop="settingData.backgroundData.isLoopPlay" ref="video" :style="{width: style.width+'px',height: style.height+'px'}"></video>
            </div>
            <div class="zm-bg-banner-vein" :style="{backgroundImage:texturePicture,backgroundColor:settingData.backgroundData.coverage.color}"></div>
      </div>

      <div class="is-container banner-container">
        <component v-for="(item,index) in childData" :is="item.component" :key="item.id" :prop="item" :index="index" @updataMes="updataMes" @updateRenderStatus="updateRenderStatus"></component>
      </div>

      <div class="zm-banner-resizeL" v-show="!$parent.pointMove&&$parent.settingData.myData[selIndex].resizeLShow" v-if="selIndex!=0" @mousedown.stop="resizedown('left',selIndex,$event)"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 20 180.1 212.7" preserveAspectRatio="none"><g><polyline points="56.4,89.8 90.4,56.5 123.7,89.8"></polyline><polyline points="123.7,172.8 89.7,206.1 56.4,172.8"></polyline><path d="M31.1,113.4 149,113.4"></path><path d="M31.1,148.2 149,148.2"></path></g></svg></div>
      <div class="zm-banner-resizeR" v-show="!$parent.pointMove&&$parent.settingData.myData[selIndex].resizeRShow" v-if="selIndex!=(length-1)" @mousedown.stop="resizedown('right',selIndex,$event)"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 20 180.1 212.7" preserveAspectRatio="none"><g><polyline points="56.4,89.8 90.4,56.5 123.7,89.8"></polyline><polyline points="123.7,172.8 89.7,206.1 56.4,172.8"></polyline><path d="M31.1,113.4 149,113.4"></path><path d="M31.1,148.2 149,148.2"></path></g></svg></div>
      <div class="banner-Column-label" :style="{right:($parent.settingData.fullScreen.value&&selIndex==0)?'0px':'',left:($parent.settingData.fullScreen.value&&selIndex==0)?'':'0px',}" :class="{bannerLineBGC:$parent.settingData.myData[selIndex].ColumnLabelShow,ColumnLabel1:topMin,ColumnLabel2:!topMin}" v-show="!$parent.pointMove&&$parent.settingData.myData[selIndex].ColumnLabelShow&&$parent.settingData.myData.length!=1">第 {{selIndex + 1}} 列&nbsp;&nbsp;&nbsp;宽 : {{parseInt(style.width)}}px</div>
      <div class="banner-Column-resizeL" v-show='$parent.settingData.myData[selIndex].ColumnResizeL'>W : {{parseInt(style.width)}}</div>
      <div class="banner-Column-resizeR" v-show='$parent.settingData.myData[selIndex].ColumnResizeR' :style="{right:$parent.settingData.fullScreen.value&&selIndex == 0&&(style.width<=140?'-74px':'15px')}">W : {{parseInt(style.width)}}</div>
      
      <div class="bannerLineC bannerLineCL bannerLineBGC" :class="{bannerLineNoImage:borderImageNoL}" v-show='$parent.settingData.myData[index].oneIsSelect||($parent.childData.length==1&&$parent.settingData.classShow)' :style="{left:parseFloat(nStyle.lineLeft)<=0?0:parseFloat(nStyle.lineLeft)+'px',}"></div>
      <div class="bannerLineC bannerLineR bannerLineBGC" :class="{bannerLineNoImage:borderImageNoR}" v-show='$parent.settingData.myData[index].oneIsSelect||($parent.childData.length==1&&$parent.settingData.classShow)' :style="{right:parseFloat(nStyle.lineRight)<=0?0:parseFloat(nStyle.lineRight)+'px',}"></div>

    </div>
  
    <!-- 移动端 -->
    <div v-show="settingData.mobileComIsHide" @dblclick.stop.prevent="dbCclick" v-else-if="(!isComputer)" @click.stop="childC(selIndex)" :id="id" ref="bannerChild" class="zm-bannerChild-main" :style="{left:'0px',position: 'absolute', width: (mobileStyle.width<=320?320:mobileStyle.width)+'px',height: mobileStyle.height+'px'}" @mousedown.stop.left="other($event),mousedown($event)" @contextmenu.stop.prevent="other($event),openMenu($event)" @mouseout="eachBannerOut(index,id)" @mousemove="eachBannerMove(index,id)">
        
      <!-- 图片 -->
      <div class="zm-component-banner zm-component-banner-one" data-type-banner="image" v-if="settingData.backgroundData.previewData.type=='img'">
            <div class="zm-bg-banner-PIC" :style="{backgroundImage:'url('+settingData.backgroundData.previewData.poster+')',backgroundColor:settingData.backgroundData.bottom.color}"></div>
            <div class="zm-bg-banner-vein" :style="{backgroundImage:texturePicture,backgroundColor:settingData.backgroundData.coverage.color}"></div>
      </div>
      <!-- 颜色 -->
      <div class="zm-component-banner zm-component-banner-one" data-type-banner="color" v-else-if="settingData.backgroundData.previewData.type=='color'">
            <div class="zm-bg-banner-BGC" :style="{backgroundColor:settingData.backgroundData.previewData?settingData.backgroundData.previewData.color : rgb}"></div>
      </div>
      <!-- 视频 -->
      <div class="zm-component-banner zm-component-banner-one" data-type-banner="video" v-show="settingData.backgroundData.previewData.type=='video'" :style="{overflow:'hidden',width: (mobileStyle.width<=320?320:mobileStyle.width)+'px',height: mobileStyle.height+'px'}">
            <div class="zm-bg-banner-PIC"  :style="{backgroundImage:'url('+settingData.backgroundData.previewData.poster+')',backgroundColor:settingData.backgroundData.bottom.color}"></div>
            <div class="zm-bg-banner-Video" v-show="false" :style="{width: (mobileStyle.width<=320?320:mobileStyle.width)+'px',height: mobileStyle.height+'px'}">
                <video :loop="settingData.backgroundData.isLoopPlay" ref="video" :style="{width: (mobileStyle.width<=320?320:mobileStyle.width)+'px',height: mobileStyle.height+'px'}"></video>
            </div>
            <div class="zm-bg-banner-vein" :poster="settingData.backgroundData.previewData.poster" :style="{backgroundImage:texturePicture,backgroundColor:settingData.backgroundData.coverage.color}"></div>
      </div>

      <div class="is-container banner-container">
          <component v-for="(item,index) in childData" :is="item.component" :key="item.id" :prop="item" :index="index" @updataMes="updataMes" @updateRenderStatus="updateRenderStatus"></component>
      </div>
      <!-- <div class="banner-Column-label" :class="{bannerLineBGC:$parent.settingData.myData[selIndex].ColumnLabelShow,ColumnLabel1:topMin,ColumnLabel2:!topMin}" v-show="$parent.settingData.myData[selIndex].ColumnLabelShow"  :style="{zIndex:'2',top:'-22px',lineHeight:'22px',width:'64px',height:'22px'}">第{{topIndex?topIndex:selIndex + 1}}列</div> -->
      <div class="banner-Column-label" :class="{bannerLineBGC:$parent.settingData.myData[selIndex].ColumnLabelShow}" v-show="!$parent.pointMove&&$parent.settingData.myData[selIndex].ColumnLabelShow"  :style="{left:'3px',zIndex:'2',top:'-22px',lineHeight:'22px',width:'64px',height:'22px'}">第{{topIndex?topIndex:selIndex + 1}}列</div>
      <!-- <div class="banner-Column-labelH" :class="{bannerLineBGC2:$parent.settingData.myData[selIndex].hoverBgc,bannerLineBGC:$parent.settingData.myData[selIndex].ColumnLabelShow}" v-show="$parent.settingData.myData[selIndex].ColumnLabelShow"  :style="{zIndex:'1',top:'-22px',lineHeight:'22px',width:'64px',height:'22px'}">第{{topIndex?topIndex:selIndex + 1}}列</div> -->
      <div class="mainBannerVien" v-show="$parent.settingData.myData[selIndex].hoverBgc" :class="{bannerLineBGC2:$parent.settingData.myData[selIndex].hoverBgc}"></div>
    
    </div>
  </template>
  <script>
  import videojs from 'video.js';
  import configBannerSingel from "./configBannerSingel.js";
  export default {
    mixins:[configBannerSingel],
    props: {
      prop: {
        type:Object,
        required:true
      },
      index:{
        type:[String,Number],
        required:true
      },
      topMin:{
        type:Boolean,
        required:true
      },
      selIndex:{
        type:[String,Number],
        required:true
      },
      length:{
        type:[String,Number],
        required:true
      },
      fwidth:{
        type:[String,Number],
        required:true
      },
      fheight:{
        type:[String,Number],
        required:true
      },
      Myleft:{
        type:[String,Number],
        required:true
      },
      settingDataP:{
        type:Object,
        required:true
      },
    },
    data () {
      return {
        disableToolH:false,//true:禁止修改高度，false允许修改
        mDisableToolH:false,//true:禁止修改宽度，false允许修改
        disableToolX:true,//true:禁止修改组件left值，false允许修改
        disableToolY:true,//true:禁止修改组件top值，false允许修改
        mDisableToolX:true,//true:禁止修改移动端left值，false允许修改
        mDisableToolY:true,//true:禁止修改移动端top值，false允许修改
        showCtrlBox:false,//false:不显示编辑框,true:显示编辑框
        keepScale:true,
        comName:"横条列"+(this.selIndex+1),
        otherType:"bannerChild",
        NewOtherType:'newBanner',
        back: null,
        bannerFull:true,//全屏
        bannerNoFull:false,//非全屏
        nowWinWidth:0,//保存屏幕宽度（除去右侧滚动条的宽度）
        videoShow:true,
        colorShow:false,
        picShow:false,
        svgShow:true,
        url: "",
        src: '',
        rgb: '#E3663E',
        bannerTitle:"横条背景",
        nowIndex: 0,
        id:this.prop.id,
        type:"banner",
        typeC:"横条",
        mold:"commonContainer",
        settingData:this.prop.settingData,
        style: this.prop.style,
        pattern: [0,0,0,0,0,0,0,0],
        isShowRotateBtn: false,
        specialTop:false,//上部特殊按钮    true:显示    false: 不显示
        specialBot:true,//下部特殊按钮     true:显示    false: 不显示
        childData: this.prop.childData,
        // fullPageSet: true,//组件是否有全屏（宽度）功能（给工具条用的）
        buttonList:[
          {type:'editor',title:"编辑",icon:'icon-110',callback:this.cl2,paneInfo:"通过设置项设置列背景样式"},
          // {type:'bannerSet',title:'设置',icon:'icon-shezhi1',callback:this.cl2,paneInfo:" "},
          {type:'del',title:'删除',icon:'icon-delete'}
        ],
        mobileButtonList: [
          { type: "hide", title: "隐藏", icon: "icon-hide" },
          { type: "bannerSet", title: "设置", icon: "icon-shezhi1",paneInfo:"通过设置项设置列背景样式"},
          // { type: "hide", title: "下移", icon: "icon-hide" },
        ],//手机版设置项按钮
        mobileChildData: this.prop.mobileChildData, //手机版子组件信息
        mobileStyle: this.prop.mobileStyle, //手机版样式
        dy:0,
        dw:0,
        moveObj:{
          nowY:0,
          nowPY:0,
          nowL:0,
          subY:0,
        },
        isMove:false,
        maxT:0,
        // leftPerArr:[],
        // widthPerArr:[],
        backgroundBtn:false,
        isFirstS:false,
        colorAb:false,
        maxTH:null,
        minTp:null,
        minTp2:0,
        nowElTop:0,
        topIndex:null,//根据top值的大小进行索引排列
        showTopArr: new Map(),
        childDataLeft:new Map(),
        MaxLW:[],
        MinL:null,
        MaxL:null,
        nStyle:{
          width:0,
          height:0,
          height2:0,
          minH:0,
          left:0,
          top:0,
          top2:null,
          lemiTop2:null,
          dy:0,
          dw:0,
          dw2:0,
          minT:0,
          linePosition:0,//虚线位置
          lineMove:0,//虚线之间的空间居左，居中，居右
          lineLeft:0,//左虚线位置
          lineRight:0//右虚线位置
        },
        childrenTopArr: new Map(),
        // nowT:null,
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
        isStretch:false,//是否拖动拉伸按钮
        otherL:0,//全屏时页面在进行页面缩放的时候横条列内部的子组件的left值做相应的变化
        linePosition:0,
        borderImageNoL:false,
        borderImageNoR:false,
        moveType:false,//true:通过快捷键移动横条列中的子组件，false:通过鼠标移动横条列中的子组件
        childComRenderCompleteNum:0, //渲染完的子组件数量ssm
        curComIsRender:false, //当前组件是否渲染完成ssm
        isRenderCompleted:false, //当前组件包括子组件是否全部渲染完成ssm
        DirectionArr:[],
        minSub:0
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
            if(this.videoPlay){
              _this.settingData.backgroundData.isVideoPlay = true
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
        }
      },
      "settingData.backgroundData.previewData.type":{
        handler(){
          this.$parent.childData.forEach((element,index)=>{
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
      childData:{
          handler(){//无论容器内有多少个其它组件，只求其任意子组件中距离容器上部距离最小的值（即子组件的top值this.minT）
            if(this.isComputer){
              this.$parent.childDataTH()
              this.childDataMinL()
              //主要是在调节第零个圆点的时候重新记录第一层子组件与虚线的位差============================start
              if(zmEditor.$store.state.component.selectList[0] && zmEditor.$store.state.component.selectList[0].type != 'banner'){
                this.childData.forEach((element,index)=>{
                  if(zmEditor.$store.state.component.selectList[0].id == element.id){
                    this.childDataLeftF(this.childData)//主要是在调节第零个圆点的时候重新记录第一层子组件与虚线的位差
                  }
                })
                this.$parent.childMove = true
              }
              //主要是在调节第零个圆点的时候重新记录第一层子组件与虚线的位差=============================end
            }else{
              this.childDataTHMax()
            }
            this.$parent.childDataTH()
          },
          deep:true
      },
      'childData.length':{
        handler(v1,v2){
          this.$parent.selectObj.subTime = 100
          this.isComputer&&this.childC(this.selIndex)
          if(this.childDataLeft.length > 0){
          }else{
            this.isComputer&&this.childDataLeftF(this.childData)
          }
        }
      },
      'style.top':{
        handler(v){
          this.style.top = this.$parent.settingData.bannerPaddin.value
        }
      },
      'settingData.mobileComIsHide':{
        handler(val){
          this.$parent.settingData.myData[this.selIndex].mobileComIsHide = this.settingData.mobileComIsHide
          this.childDataTHMax()
          this.escClick()
          this.$parent.setMobileTop()
        }
      },
      'mobileStyle.left':{
        handler(){
          this.mobileStyle.left = 0
          this.$parent.mobileStyle.left = 0
        }
      },
      'mobileStyle.width':{
        handler(){
          this.mobileStyle.width = 320
        }
      },
      'mobileStyle.height':{
        handler(){
          if(!this.isComputer){
            this.bannerChildLimitHM()
            this.getAllShowComH()
            this.$parent.settingData.myData.forEach((element,index)=>{
              if(this.id == element.id){
                element.mHeight = this.mobileStyle.height
              }
            })
            this.$parent.bannerPBF(0,this.id)
          }
        }
      },
      'style.height':{
        handler(){
          if(this.isComputer){
            this.style.height = this.fheight
            this.bannerChildLimitHP()
          }
        }
      },
      fheight:{
        handler(){
          if(this.isComputer){
            this.style.height = this.fheight
          }
        }
      },
      'style.width':{
        handler(){
          if(this.isComputer){
            if(this.style.width < 100){
              this.style.width = 100
            }
          }
        }
      },
      fwidth:{
        handler(){
          if(this.isComputer){
           this.style.width = this.fwidth
           this.blurLineWF()
           this.$parent.eachBannerLeft()
           this.childData.forEach((element,index)=>{
              if(this.childDataLeft.get(element.id)){
                this.setChildleftF(this.childData,2)
              }
           })
          }
        },
        // immediate: true
      },
      Myleft:{
        handler(){
          this.style.left = this.Myleft
        }
      },
      colorAbsorption(val){//ml===========val:true(吸色中)   val:false(吸色完毕)
        this.$parent.colorAb = val
        this.colorAb = this.$parent.colorAb
      },
      clickDoc(val){//czj======点击空白处或点击横条以外的组件（不包含横条列里面的子组件）true为点击空白处
        if(val){
          this.backgroundBtn = false//点击空白的地方时把打开设置弹窗的属性变为false
        }
      },
      getContentWidth(val){
        this.blurLineWF()
        this.childData.forEach((element,index)=>{
          if(this.childDataLeft.get(element.id)){
            this.isComputer&&this.setChildleftF(this.childData)
          }
        })
      },
      getNowWinWidth:{
        handler:function(val){
            if(this.childData.length > 0){
            this.childData.forEach((element,index)=>{
              if((element.settingData.fullScreen && element.settingData.fullScreen.value) || (element.settingData.full && element.settingData.full.value)){
              }else{
                if(this.childDataLeft.get(element.id)){
                  this.isComputer&&this.setChildleftF(this.childData,2)
                }
              }
            })
          }
        },
        immediate:true,
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
        this.style.width = this.fwidth
        this.settingData.backgroundData.nowVideo = this.$refs.video
      },
    },
    computed:{
      forwardOrBack(){//监测是否执行了上一步下一步操作
        return zmEditor.$store.state.history.forwardOrBack
      },
      clickDoc(){//点击空白处或点击横条以外的组件（不包含横条列里面的子组件）true为点击空白处
        return zmEditor.$store.state.otherStore.clickDoc
      },
      colorAbsorption(){//ml===========val:true(吸色中)   val:false(吸色完毕)
        return zmEditor.$store.state.colorPicker.isColorStraw
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
      getNowWinWidth(){
        return zmEditor.$store.state.page.nowWinWidth
      },
      getContentWidth() {
        return zmEditor.$store.state.page.contentWidth
      },
      isFullPage(){//返回值为当前组件控制全屏按钮的属性值
        return this.$parent.isFullPage && this.$parent.childData.length == 1
      },
    },
    methods:{
      updateRenderStatus(){//ssm
        this.childComRenderCompleteNum ++;
      },
      dbCclick(){//为了在手机端双击横条列的时候不执行编辑器的双击事件，所以执行自己的事件
        // console.log('dbCclick-------------------')
      },
      AdsorbentF(){//移动横条列中的子组件时判断子组件边框是否刚好或非常接近辅助线时,产生吸附效果
        //移动横条列中的子组件时判断子组件边框是否刚好或非常接近辅助线时，辅助线由虚线变为实线=================================start
        // console.log('AdsorbentF----------------------------00')
        if(this.moveType) return
        let vueNS = zmEditor.$store.state.component.selectList[0]
        let lP = this.nStyle.linePosition//虚线在横条列中的位置

        let sub = 5//子组件左或由边框距离辅助线的最大距离，此时产生吸附效果

        //左辅助线----------------------start
        // if( (vueNS.style.left >= (lP - sub) && vueNS.style.left <= (lP + sub))){
        if( (vueNS.style.left >= (this.nStyle.lineLeft - sub) && vueNS.style.left <= (this.nStyle.lineLeft  + sub))){
          //子组件左边框距离左辅助线小于等于sub像素时产生吸附效果并让该组件left值等于lP
          this.borderImageNoL = true
          vueNS.style.left = this.nStyle.lineLeft 
        }else if((vueNS.style.left + vueNS.style.width) >= (this.nStyle.lineLeft  - sub) && (vueNS.style.left + vueNS.style.width) <= ( this.nStyle.lineLeft + sub)){
          //子组件右边框距离左辅助线小于等于sub像素时产生吸附效果并让该组件left值等于lP - vueNS.style.width
          vueNS.style.left = this.nStyle.lineLeft  - vueNS.style.width
          this.borderImageNoL = true
        }else{
          this.borderImageNoL = false
        }
        //左辅助线------------------------end

        //右辅助线----------------------start
        if(vueNS.style.left >= ((this.fwidth-this.nStyle.linePosition*2 + this.nStyle.lineLeft) - sub) && vueNS.style.left <= ((this.fwidth-this.nStyle.linePosition*2 + this.nStyle.lineLeft) + sub)){
          //子组件左边框距离右辅助线小于等于sub像素时产生吸附效果并让该组件left值等于this.fwidth-lP
          this.borderImageNoR = true
          vueNS.style.left = (this.fwidth-this.nStyle.linePosition*2 + this.nStyle.lineLeft)
        }else if((vueNS.style.left + vueNS.style.width) >= ((this.fwidth-this.nStyle.linePosition*2 + this.nStyle.lineLeft) - sub) && (vueNS.style.left + vueNS.style.width) <= ((this.fwidth-this.nStyle.linePosition*2 + this.nStyle.lineLeft) + sub)){
          //子组件右边框距离右辅助线小于等于sub像素时产生吸附效果并让该组件left值等于this.fwidth-lP - vueNS.style.width
          vueNS.style.left = (this.fwidth-this.nStyle.linePosition*2 + this.nStyle.lineLeft) - vueNS.style.width
          this.borderImageNoR = true
        }else{
          this.borderImageNoR = false
        }
        //右辅助线------------------------end

        //移动横条列中的子组件时判断子组件边框是否刚好或非常接近辅助线时，辅助线由虚线变为实线=================================end
      },
      blurLineWF(){//zmEditor.$store.state.page.contentWidth = 整体边距缩进*2+列间距*(横条列数-1)+每列辅助线间的距离*横条列总数
        // console.log('blurLineWF----------------------------')
        this.$parent.totleLineW = zmEditor.$store.state.page.contentWidth - this.$parent.settingData.bannerPaddin.value*2-this.$parent.settingData.bannerLineSpace.value*(this.$parent.childData.length-1)
        this.$parent.settingData.myData.forEach((element,index)=>{
          if(this.id == element.id){
            //计算每个横条列左右辅助线分别在横条列中的left值，right值
            this.nStyle.linePosition = (this.style.width-(parseFloat(element.width)/100*this.$parent.totleLineW))/2
          }
        })
        if(this.nStyle.linePosition <= 0){
          this.nStyle.linePosition = 0
        }

        if(this.settingData.leftPer == 'left'){
            this.nStyle.lineLeft = 0
            this.nStyle.lineRight = this.nStyle.linePosition*2
        }else if(this.settingData.leftPer == 'center'){
            this.nStyle.lineLeft = this.nStyle.linePosition
            this.nStyle.lineRight = this.nStyle.linePosition
        }else{
            this.nStyle.lineLeft = this.nStyle.linePosition*2
            this.nStyle.lineRight = 0
        }
        if(this.nStyle.lineLeft <= 0){
          this.nStyle.lineLeft = 0
        }
        if(this.nStyle.lineRight <= 0){
          this.nStyle.lineRight = 0
        }
      },
      setChildleftF(arr,v2){//当屏幕进行缩放时确保子组件距离容器左右虚线边距的相对位置不变
        // console.log('setChildleftF----------------------------44')
        this.blurLineWF()
        this.$parent.settingData.myData.forEach((element,index)=>{
          if(element.childLeft.length > 0 && element.id == this.id){
            this.childDataLeft = new Map()
            element.childLeft.forEach((ele,i)=>{
              this.childDataLeft.set(ele[0],ele[1])
            })
          }
        })

        if(this.childData.length == 0 || this.childDataLeft.length == 0) return
        let that = this
        this.childData.forEach((element,index)=>{
          if((element.settingData.fullScreen && element.settingData.fullScreen.value) || (element.settingData.full && element.settingData.full.value)){
          }else{
            if(that.childDataLeft.get(element.id)){
              if(that.childDataLeft.get(element.id).direction == 1){

                element.style.left = that.nStyle.lineLeft+that.childDataLeft.get(element.id).sub
                if(that.childDataLeft.get(element.id).subP){
                  element.style.left = that.nStyle.lineLeft+(that.fwidth-that.nStyle.linePosition*2)*that.childDataLeft.get(element.id).subP
                }
                // if(that.childDataLeft.get(element.id).widtPer){
                //   element.style.width = that.childDataLeft.get(element.id).widtPer*(that.fwidth-that.nStyle.linePosition*2)
                // }
              }else if(that.childDataLeft.get(element.id).direction == 2){

                element.style.left = (that.fwidth-that.nStyle.linePosition*2 + that.nStyle.lineLeft)+that.childDataLeft.get(element.id).sub
                if(that.childDataLeft.get(element.id).subP){
                  element.style.left = (that.fwidth-that.nStyle.linePosition*2 + that.nStyle.lineLeft) - ((that.fwidth-that.nStyle.linePosition*2)/2)*that.childDataLeft.get(element.id).subP - element.style.width
                }
                // if(that.childDataLeft.get(element.id).widtPer){
                //   element.style.width = that.childDataLeft.get(element.id).widtPer*(that.fwidth-that.nStyle.linePosition*2)
                // }
              }
            }
          }
        })
        if(v2 == 2){
          that.childData.forEach((element,index)=>{
            that.childDataLeft.get(element.id).oldL = element.style.left
          })
          that.$parent.settingData.myData.forEach((element,i)=>{
            if(element.id == that.id){
              element.childLeft = []
              element.childLeft = JSON.parse(JSON.stringify(that.childDataLeft))
            }
          })
        }
        setTimeout(()=>{
          this.$parent.eachBannerLeft()
          return
        },200)
      },
      childDataLeftF(arr){//记录子组件距离容器左右辅助线的距离
        // console.log('childDataLeftF----------------------------')
        this.blurLineWF()
        let that = this
        that.childDataLeft = new Map()
        loopN(arr)
        function loopN(arr){
          arr.forEach( item => {
            let obj = {}
            //子组件相对于两条虚线的旧规则=================================================start
            // if(item.style.left <= (that.nStyle.lineLeft+(that.fwidth-that.nStyle.linePosition*2)/2) ){
            //   obj = {
            //     oldW:item.style.width,
            //     oldL:item.style.left,
            //     linePosition:that.nStyle.lineLeft,
            //     sub:item.style.left-that.nStyle.lineLeft,
            //     subP:null,
            //     direction:1//左辅助线
            //   }
            //   if(obj.sub > 5){
            //     obj.subP = obj.sub/(that.fwidth-that.nStyle.linePosition*2)
            //   }
            // }else{
            //   obj = {
            //     oldW:item.style.width,
            //     oldL:item.style.left,
            //     linePosition:that.nStyle.lineRight,
            //     sub:item.style.left-(that.fwidth-that.nStyle.linePosition*2 + that.nStyle.lineLeft),
            //     subP:null,
            //     direction:2//右辅助线
            //   }
            //   if((that.fwidth-that.nStyle.linePosition*2 + that.nStyle.lineLeft) - (item.style.left+item.style.width) > 0 && Math.abs((item.style.left+item.style.width)-(that.fwidth-that.nStyle.linePosition*2 + that.nStyle.lineLeft)) > 5){
            //     obj.subP = Math.abs((item.style.left+item.style.width)-(that.fwidth-that.nStyle.linePosition*2 + that.nStyle.lineLeft))/((that.fwidth-that.nStyle.linePosition*2)/2)
            //   }
            //   // console.log('靠近右辅助线了------------------------------------33')
            // }
            //子组件相对于两条虚线的旧规则===================================================end


            //子组件相对于两条虚线的新规则=================================================start
            if(item.style.left>=that.nStyle.lineLeft && (item.style.left+item.style.width)<=(that.style.width-that.nStyle.lineRight)){
              // console.log('虚线之间')
              if((item.style.left-that.nStyle.lineLeft) <= ((that.style.width-that.nStyle.lineRight)-(item.style.left+item.style.width))){
                // console.log('子组件都在两条虚线内侧，并且左差距小于右差距')
                obj = {
                  oldW:item.style.width,
                  oldL:item.style.left,
                  linePosition:that.nStyle.lineLeft,
                  sub:item.style.left-that.nStyle.lineLeft,
                  subP:null,
                  widtPer:item.style.width/(that.fwidth-that.nStyle.linePosition*2),
                  direction:1//以辅助线为参照物
                }
                if(obj.sub > 5){
                  obj.subP = obj.sub/(that.fwidth-that.nStyle.linePosition*2)
                }
              }else if((item.style.left-that.nStyle.lineLeft) > ((that.style.width-that.nStyle.lineRight)-(item.style.left+item.style.width))){
                // console.log('子组件都在两条虚线内侧，并且左差距大于右差距')
                obj = {
                  oldW:item.style.width,
                  oldL:item.style.left,
                  linePosition:that.nStyle.lineRight,
                  sub:item.style.left-(that.fwidth-that.nStyle.linePosition*2 + that.nStyle.lineLeft),
                  subP:null,
                  widtPer:item.style.width/(that.fwidth-that.nStyle.linePosition*2),
                  direction:2//以辅助线为参照物
                }
                if((that.fwidth-that.nStyle.linePosition*2 + that.nStyle.lineLeft) - (item.style.left+item.style.width) > 0 && Math.abs((item.style.left+item.style.width)-(that.fwidth-that.nStyle.linePosition*2 + that.nStyle.lineLeft)) > 5){
                  obj.subP = Math.abs((item.style.left+item.style.width)-(that.fwidth-that.nStyle.linePosition*2 + that.nStyle.lineLeft))/((that.fwidth-that.nStyle.linePosition*2)/2)
                }
              }
            }else if(item.style.left<that.nStyle.lineLeft&&(item.style.left+item.style.width)<=(that.style.width-that.nStyle.lineRight)){
              // console.log('子组件在左虚线外测右虚线内侧')
              if((item.style.left+item.style.width)==(that.style.width-that.nStyle.lineRight)){
                  // console.log('子组件在刚好压右左虚线内测')
                  obj = {
                  oldW:item.style.width,
                  oldL:item.style.left,
                  linePosition:that.nStyle.lineRight,
                  sub:item.style.left-(that.fwidth-that.nStyle.linePosition*2 + that.nStyle.lineLeft),
                  subP:null,
                  widtPer:item.style.width/(that.fwidth-that.nStyle.linePosition*2),
                  direction:2//以右辅助线为参照物
                }
                if((that.fwidth-that.nStyle.linePosition*2 + that.nStyle.lineLeft) - (item.style.left+item.style.width) > 0 && Math.abs((item.style.left+item.style.width)-(that.fwidth-that.nStyle.linePosition*2 + that.nStyle.lineLeft)) > 5){
                  obj.subP = Math.abs((item.style.left+item.style.width)-(that.fwidth-that.nStyle.linePosition*2 + that.nStyle.lineLeft))/((that.fwidth-that.nStyle.linePosition*2)/2)
                }
              }else{
                obj = {
                  oldW:item.style.width,
                  oldL:item.style.left,
                  linePosition:that.nStyle.lineLeft,
                  sub:item.style.left-that.nStyle.lineLeft,
                  subP:null,
                  widtPer:item.style.width/(that.fwidth-that.nStyle.linePosition*2),
                  direction:1//以辅助线为参照物
                }
                if(obj.sub > 5){
                  obj.subP = obj.sub/(that.fwidth-that.nStyle.linePosition*2)
                }
              }
            }else if((item.style.left>=that.nStyle.lineLeft) && (item.style.left+item.style.width) > (that.style.width-that.nStyle.lineRight)){
              // console.log('子组件在左虚线内测右虚线外侧')
              if(item.style.left==that.nStyle.lineLeft){
                // console.log('子组件在刚好压在左虚线内测')
                obj = {
                  oldW:item.style.width,
                  oldL:item.style.left,
                  linePosition:that.nStyle.lineLeft,
                  sub:item.style.left-that.nStyle.lineLeft,
                  subP:null,
                  widtPer:item.style.width/(that.fwidth-that.nStyle.linePosition*2),
                  direction:1//以辅助线为参照物
                }
                if(obj.sub > 5){
                  obj.subP = obj.sub/(that.fwidth-that.nStyle.linePosition*2)
                }
              }else{
                obj = {
                  oldW:item.style.width,
                  oldL:item.style.left,
                  linePosition:that.nStyle.lineRight,
                  sub:item.style.left-(that.fwidth-that.nStyle.linePosition*2 + that.nStyle.lineLeft),
                  subP:null,
                  widtPer:item.style.width/(that.fwidth-that.nStyle.linePosition*2),
                  direction:2//以右辅助线为参照物
                }
                if((that.fwidth-that.nStyle.linePosition*2 + that.nStyle.lineLeft) - (item.style.left+item.style.width) > 0 && Math.abs((item.style.left+item.style.width)-(that.fwidth-that.nStyle.linePosition*2 + that.nStyle.lineLeft)) > 5){
                  obj.subP = Math.abs((item.style.left+item.style.width)-(that.fwidth-that.nStyle.linePosition*2 + that.nStyle.lineLeft))/((that.fwidth-that.nStyle.linePosition*2)/2)
                }
              }
            }else if((item.style.left<=that.nStyle.lineLeft)&&(item.style.left+item.style.width)>=(that.style.width-that.nStyle.lineRight)){
              //  console.log('子组件都在两条虚线外侧')
               obj = {
                  oldW:item.style.width,
                  oldL:item.style.left,
                  linePosition:that.nStyle.lineLeft,
                  sub:item.style.left-that.nStyle.lineLeft,
                  subP:null,
                  widtPer:item.style.width/(that.fwidth-that.nStyle.linePosition*2),
                  direction:1//以辅助线为参照物
                }
                if(obj.sub > 5){
                  obj.subP = obj.sub/(that.fwidth-that.nStyle.linePosition*2)
                }
            }
            //子组件相对于两条虚线的新规则===================================================end
            that.childDataLeft.set(item.id,obj)
            that.$parent.settingData.myData.forEach((element,index)=>{
              if(element.id == that.id){
                element.childLeft = []
                element.childLeft = JSON.parse(JSON.stringify(that.childDataLeft))
              }
            })
          })
        }
      },
      bannerChildLimitHM(){//手机端高度极限值限定
        this.mobileStyle.height=this.mobileStyle.height >= 15000?this.mobileStyle.height = 15000:this.mobileStyle.height
        this.mobileStyle.height=this.mobileStyle.height <= 5?this.mobileStyle.height = 5:this.mobileStyle.height
      },
      bannerChildLimitHP(){//pc端高度极限值限定
        this.style.height=this.style.height >= 15000?this.style.height = 15000:this.style.height
        this.style.height=this.style.height <= 5?this.style.height = 5:this.style.height
      },
      hoverBannerChild(){//hover横条列中的子组件时，横条列的浅色标签要显示（czj编辑器自动调用）
        this.$parent.hoverIndex = -1
        this.$parent.childVueDown = true
      },
      childCom_leave(){//hover横条列中的子组件时，横条列的浅色标签要消失（czj编辑器自动调用）
        this.$store.state.otherStore.childCom_leave = ' '//czj这个是编辑器要求加的
        this.$parent.childVueDown = false
      },
      eachBannerMove(index,id){//横条列鼠标移入事件(显示第几列标签)
        // console.log('eachBannerMove-----------------------')
        if(this.$parent.childVueDown) return
        if(this.$parent.emptyPlace && !this.$parent.settingData.classShow){
          this.$parent.hoverIndex = 0
        }else{
          this.$parent.hoverIndex = index
          if(this.isComputer){
            if(this.$parent.btnMove){
              this.$parent.hoverIndex = -1
            }
          }else{
            let topArrOld = this.$parent.topArr2//为了在hover横条列的时候记录此时手机端设置弹窗中列管理的选中状态
            this.$parent.setTopArrV()
            this.$parent.topArr2.forEach((ele,i)=>{
              if(topArrOld[i]){
                ele.isSelectSet = topArrOld[i].isSelectSet
              }
              if(id == ele.id){
                this.$parent.hoverIndexM = i
              }
            })
          }
        }
      },
      eachBannerOut(index,id){//横条列鼠标移出事件(取消显示第几列标签)
        if(this.$parent.childVueDown) return
        this.$parent.hoverIndex = -1
      },
      updataMes(obj) {//当容器里面的子组件内部数据改变时及时更新子组件数据
        this.childData[obj.index][obj.key] = obj.value;
      },
      oneBannerMC(v){//手机端只有一列时，点击列或者横条列中的子组件
        let count = 0
        let nowId = null
        this.$parent.childData.forEach((element,index)=>{
          if(element.settingData.mobileComIsHide){
            count++
            nowId = element.id
          }
        })
        if(count==1){
          this.$parent.settingData.classShow = true
          this.$parent.settingData.classShow2 = false
          this.$parent.emptyPlace = false
          this.$parent.settingData.myData.forEach((element,index)=>{
            if(element.id == nowId){
              element.resizeLShow = false
              element.resizeRShow = false
              element.ColumnLabelShow = false
              element.oneIsSelect = false
            }
          })
          if(v == 'noChage'){//手机端当点击横条列中的子组件时不需要改变zmEditor.$store.state.component.selectList[0]
          }else{//手机端当点击横条列并且此时只有一列zmEditor.$store.state.component.selectList[0]永远是父级
            this.$store.commit("changeSelectList",this.$parent)
          }
          this.$parent.mobileButtonList = [//手机版设置项按钮
            { type: "hide", title: "隐藏", icon: "icon-hide" },
          ]
          let DOMRect
          DOMRect = $(this.$parent.$el)[0].getBoundingClientRect()
          setTimeout(()=>{
            this.$parent.getVue2(DOMRect,0)
            return
          },100)
          // console.log('this.$parent.settingData.classShow--------------------右击333',this.$parent.settingData.classShow)
        }
      },
      rightClick(){//右击横条（不包过横条列中的子组件）回调
        // console.log('rightClick----------------------------000000')
        let count = 0
        this.$parent.childData.forEach((element,index)=>{
          if(element.settingData.mobileComIsHide){
            count++
          }
        })
        if(this.$parent.childData.length == 1 || count==1){//当横条只有一列的情况时
          if(this.isComputer){
            this.$parent.settingData.classShow = true
            this.$parent.settingData.classShow2 = false
            this.$store.commit("changeSelectList",this)
            this.$parent.emptyPlace = false
            //右击的时候从新计算设置按钮的位置======================start
            let DOMRect
            DOMRect = $(this.$el)[0].getBoundingClientRect()
            setTimeout(()=>{
              this.$parent.getVue2(DOMRect,this.selIndex)
              return
            },100)
            //右击的时候从新计算设置按钮的位置=======================end
          }else{
            this.oneBannerMC()
          }
        }else{
          let oneS = false
          this.$parent.settingData.myData.forEach((element,i)=>{
              if(element.oneIsSelect){
                oneS = true
              }
          })

          if(this.$parent.settingData.classShow || !oneS || (!this.$parent.labelShow && !this.$parent.settingData.classShow2)){
            // console.log('rightClick------------------------------55555横条整体')
            this.$parent.settingData.classShow = true
            this.$parent.settingData.classShow2 = false
            this.$store.commit("changeSelectList",this.$parent)
            this.$parent.emptyPlace = false
            //右击的时候从新计算设置按钮的位置======================start
            let DOMRect
            DOMRect = $(this.$parent.$el)[0].getBoundingClientRect()
            setTimeout(()=>{
              this.$parent.getVue2(DOMRect,0)
              return
            },100)
            //右击的时候从新计算设置按钮的位置=======================end
          }else{
            // console.log('rightClick------------------------------6666横条列')
            this.$parent.settingData.classShow = false
            this.$parent.settingData.classShow2 = true
            this.$store.commit("changeSelectList",this)
            this.$parent.emptyPlace = false
            //右击的时候从新计算设置按钮的位置======================start
            let DOMRect
            DOMRect = $(this.$el)[0].getBoundingClientRect()
            !this.isComputer?this.setIndexM(this.id):''
            setTimeout(()=>{
              this.$parent.getVue2(DOMRect,this.selIndex)
              return
            },100)
            //右击的时候从新计算设置按钮的位置=======================end
          }
        }
        this.rightClickS(zmEditor.$store.state.component.selectList[0])
      },
      rightClickS(com){//右击选中横条列
        this.$parent.bannerU()
        if(com.otherType != "bannerChild") return
        if(com.otherType == "bannerChild"){
          this.$parent.settingData.myData.forEach((element,i)=>{
            if(element.id == com.id){
              element.resizeLShow = true
              element.resizeRShow = true
              element.ColumnLabelShow = true
              element.oneIsSelect = true
              this.$parent.bannerPBF(i)
            }else{
              element.resizeLShow = false
              element.resizeRShow = false
              element.ColumnLabelShow = false
              element.oneIsSelect = false
            }
          })
        }
        this.$parent.notAddF(1)

        
      },
      setIndexM(id){//右击选中横条列或者横条列中的子组件时，让列标签的数字正确显示
        if(!this.isComputer){
          this.$parent.setTopArrV()
          this.$parent.topArr2.forEach((ele,i)=>{//列标签的数字大小是根据横条列top值的大小进行排序
            if(id == ele.id){
              this.$parent.hoverIndexM = i
              this.topIndex = i + 1
            }
          })
        }
      },
      childDataTHMax(){//获取当前列横条子组件距离容器上部距离最大的值（即哪一个子组件距离容器上部距离最大的值）
        let vueT = []
        if(this.childData.length > 0){
          this.childData.forEach((element,index)=>{
            // let totalH = parseFloat(element.mobileStyle.top)+parseFloat(element.mobileStyle.height)
            if(element.settingData.mobileComIsHide){//隐藏后的子组件不需要记录了
              let totalH = zmEditor.$store.getters.getComRotateInfo(element).bottom
              vueT.push(totalH)
            }
          })
          if(vueT.length == 0){
            vueT[0] = 5
          }
          this.maxTH = Math.max.apply(null,vueT)//获取当前列横条子组件距离容器上部距离最大的值（即哪一个子组件距离容器上部距离最大的值）
        }
        this.minSub = this.maxTH - this.style.height
        if(this.minSub<=0){
          this.minSub = 0
        }
        return this.maxTH
      },
      childDataTHMin(){//获取当前列横条子组件距离容器上部距离最小的值（即哪一个子组件距离容器上部距离最小的top值）
        let vueT = []
        if(this.childData.length > 0){
          this.childData.forEach((element,index)=>{
            // let totalH = parseFloat(element.mobileStyle.top)+parseFloat(element.mobileStyle.height)
            let top = zmEditor.$store.getters.getComRotateInfo(element).top
            vueT.push(top)
          })
          this.minTp = Math.min.apply(null,vueT)//获取当前列横条子组件距离容器上部距离最大的值（即哪一个子组件距离容器上部距离最大的值）
        }
        return this.minTp
      },
      childDataMaxLW(){//获取横条列中第一层子组件距离横条列右边最小的值并以该值为横条列最小宽度
        // console.log('childDataMaxLW---------------------------')
        let vueT = []
        if(this.childData.length > 0){
          this.childData.forEach((element,index)=>{
            let eachLeft
            eachLeft = zmEditor.$store.getters.getComRotateInfo(element).right
            // if(element.isRotate){
            //   eachLeft = parseFloat(element.style.left) + Math.abs(Math.cos(element.style.rotate)*parseFloat(element.style.width)) 
            // }else{
            //   eachLeft = parseFloat(element.style.left) + parseFloat(element.style.width)
            // }
            vueT.push(eachLeft)
          })
          // let lemitValue = this.$store.getters.getComRotateInfo(this)

          // if(Object.keys(lemitValue).length){
          //   this.MaxL = lemitValue.right
          // }
          this.MaxL = Math.max.apply(null,vueT)//获取当前列横条子组件距离容器上部距离最大的值（即哪一个子组件距离容器上部距离最大的值）
        }else{
          this.MaxL = null
        }
        return this.MaxL
      },
      childDataMinL(){//获取横条列中第一层子组件距离横条列左边最小的值并以该值为横条列最小宽度
        // console.log('childDataMaxLW---------------------------')
        let vueT = []
        if(this.childData.length > 0){
          this.childData.forEach((element,index)=>{
            let eachLeft
            // if(element.isRotate){
            //   eachLeft = parseFloat(element.style.left) + (parseFloat(element.style.width) - Math.abs(Math.cos(element.style.rotate)*parseFloat(element.style.width)))
            // }else{
            //   eachLeft = parseFloat(element.style.left)
            // }
            eachLeft = zmEditor.$store.getters.getComRotateInfo(element).left
            vueT.push(eachLeft)
          })
          // let lemitValue = this.$store.getters.getComRotateInfo(this)
          // if(Object.keys(lemitValue).length){
          //   this.MinL = lemitValue.left
          // }
          this.MinL = Math.min.apply(null,vueT)//获取当前列横条子组件距离容器上部距离最大的值（即哪一个子组件距离容器上部距离最大的值）
        }else{
          this.MinL = null
        }
        return this.MinL
      },
      toolbarH(v){//在工具条中修改组件的高度后执行的回调函数
        if(v.editMold == 'computer'){
          this.$parent.toolbarH({editMold:'computer',height:v.height,childCH:true})
        }else{
          let oldH = this.mobileStyle.height
          this.mobileStyle.height = v.height
          if(this.childData.length <= 0){
            if(this.settingData.backgroundData.previewData.type == 'color'){
              if(this.mobileStyle.height <= 5){
                this.mobileStyle.height = 5
              }
              this.$parent.settingData.myData[this.index].mHeight = 5
            }else{
              if(this.mobileStyle.height <= 5){
                this.mobileStyle.height = 5
              }
              this.$parent.settingData.myData[this.index].mHeight = 5
            }
          }else{
            if(this.maxTH && this.mobileStyle.height <= this.maxTH){
                this.mobileStyle.height = this.maxTH
            }
          }
          if(this.mobileStyle.height >= 15000){
              this.mobileStyle.height = 15000
          }
          if(this.mobileStyle.height <= 5){
              this.mobileStyle.height = 5
          }
          this.$parent.changeTopAndGetH()
          this.$parent.bannerPBF(0,this.id)
          // //不下推组件只下推bodyRow/headRow/footRow的高度的参数：
          let params = {
              nowCom:this.$parent,//当前选中组件
              isPush:false,//false-不下推组件，之下推页面分割线
          }
          this.$store.commit("createChangeHeightClass",params);
          zmEditor.$store.commit('saveOperationToHistory')
        }
      },
      toolbarY(v){//通过工具条改变组件的top值
        if(this.isComputer){
          if(this.$parent.childData.length == 1){
            // this.style.top = v.top
            this.$parent.style.top += v.top
            
          }
        }else{
          let count = 0
          let nowV = null
          this.$parent.childData.forEach(ele=>{
            if(ele.settingData.mobileComIsHide){
              nowV = ele
              count++
            }
          })
          if(count == 1){
            nowV.mobileStyle.top = 0
            this.$parent.mobileStyle.top = v.top
          }
        }
        zmEditor.$store.commit('saveOperationToHistory')
      },
      getAllShowComH(){//计算手机端所有未隐藏横条列的高度之和，即计算整个横条的高
        //从新计算父级组件的总高度======================================start
        let sumT = 0
        let num = 0
        this.$parent.childData.forEach((ele,i)=>{
          if(ele.settingData.mobileComIsHide){
            sumT += ele.mobileStyle.height
            num++
          }
        })
        this.$parent.mobileStyle.height = sumT + parseFloat(this.$parent.settingData.marginT.value)*(num-1)
        this.changH.curH = this.$parent.mobileStyle.height;
        //从新计算父级组件的总高度=======================================end
      },
      pointDown(obj){
        let event = window.event || evt
        let i = obj.index
        zmEditor.$store.commit('switchBtnType', null)
        this.$parent.pointMove = true
        this.nStyle.dy = event.clientY
        this.nStyle.height = this.style.height
        this.nStyle.height2 = this.style.height
        this.nStyle.top = this.$parent.style.top
        if(i == 5){
          // this.$parent.pointDown({index:5})
          this.$parent.noSelect(this.selIndex)
          this.childData.forEach(element=>{
            this.childrenTopArr.set(element.id,element.style.top)
          })
        }
        if(i == 1){
          if(this.childData.length >0){
            this.$parent.pointDown({index:1})
          }
          // this.nowT = null
          this.childDataTHMin()
          this.minTp2 = this.minTp
          this.nStyle.minT = this.minTp
          this.$parent.pointDrag = true
          this.nStyle.minH = this.nStyle.height - this.minTp2
          this.nStyle.top2 = this.$parent.style.top
        }
      },
      pointCallBack(obj){
        let event = window.event || evt
        let i = obj.index
        this.$parent.pointMove = true
        if(i == 5){
          if(this.isComputer){
            this.$parent.pointDrag = false
            this.childDataTHMax()
            this.childData.forEach(element=>{
              element.style.top = this.childrenTopArr.get(element.id)
            })
            if(this.childData.length>0){
              if(this.minSub>=0&&obj.height <= (this.maxTH-this.minSub)){
                obj.height = (this.maxTH-this.minSub)
              }
              this.style.height = obj.height
            }else{
              this.style.height = obj.height
            }
            this.$parent.style.height = this.style.height + this.$parent.settingData.bannerPaddin.value*2
            this.$parent.noSelect(this.selIndex)
            this.bannerChildLimitHM()
          }else{
            // if(this.mobileStyle.height <= 5){
            //   this.mobileStyle.height = 5
            //   this.changeTopAndGetH()
            //   return
            // }
            // if(this.mobileStyle.height >= 15000){
            //   this.mobileStyle.height = 15000
            //   this.changeTopAndGetH()
            //   return
            // }
            // this.getAllShowComH()
          }
          //不下推组件只下推bodyRow/headRow/footRow的高度的参数：
          let params = {
              nowCom:this,//当前选中组件
              isPush:false,//false-不下推组件，之下推页面分割线
          }
          this.$store.commit("createChangeHeightClass",params)
        }
        if(i == 1){
          this.$parent.pointDrag = true
          if(this.isComputer){
            this.childDataTHMin()
            let GetDirection = this.GetDirection(event.clientY)
            if(this.childData.length > 0){
              if(this.minTp >= 0){
                if(obj.height <= this.nStyle.minH){
                  obj.height = this.nStyle.minH
                  this.style.height = obj.height
                }
                if(GetDirection == 'up'){
                  this.style.height = obj.height
                  if(this.nStyle.lemiTop2){
                    this.$parent.style.top = this.nStyle.lemiTop2- (this.style.height - this.nStyle.height2)
                    this.nStyle.top2 = this.$parent.style.top
                    this.nStyle.lemiTop2 = null
                  }else{
                    this.$parent.style.top = this.nStyle.top2 - (this.style.height - this.nStyle.height2)
                  }
                }else{
                  if(obj.height <= this.nStyle.minH){
                    this.style.height = this.nStyle.minH
                  }else{
                    this.style.height = obj.height
                  }
                  this.$parent.style.top = this.nStyle.top2 + (this.nStyle.height2 - this.style.height)
                }
              }else{
                if(obj.height <= this.nStyle.minH){
                  obj.height = this.style.height
                }
                if(GetDirection == 'up'){
                  this.style.height = obj.height
                  this.$parent.style.top = this.nStyle.top - (this.style.height - this.nStyle.height)
                  this.style.top2 = this.$parent.style.top
                  this.nStyle.lemiTop2 = this.style.top2
                  this.nStyle.height2 = this.style.height
                  this.nStyle.minH = this.style.height
                }else{
                  this.style.height = this.nStyle.height2
                  obj.height = this.style.height
                }
              }
            }else{
              this.style.height = obj.height
              this.$parent.style.top = this.nStyle.top + (this.nStyle.height - this.style.height)
            }
            this.$parent.style.height = this.style.height + this.$parent.settingData.bannerPaddin.value*2
          }
          $("#zm-editor-component-btnList").css('display','none')
        }
      },
      pointUp(obj){
        this.$parent.pointMove = false
        let i = obj.index
        this.$parent.pointMove = false
        this.$parent.parentMove = true
        this.$parent.noSelect(this.selIndex)
        this.$parent.notAddF()
        if(i == 1){
          this.$parent.pointUp({index:i})
          $("#zm-editor-component-btnList").css('display','block')
        }

        zmEditor.$store.commit('switchBtnType', 'unitMenu')
      },
      GetDirection(y){
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
        // console.log('this.DirectionArr---',this.DirectionArr)
        return Direction
      },
      stretchDown(obj){//拉伸按钮按下回调
        let event = window.event || evt
        this.$parent.pointMove = true
        if(obj.index == 1) return
        this.nStyle.dy = event.clientY
        this.$parent.stretchDown(obj)
        this.$parent.noSelect(this.selIndex)
        this.childDataTHMax()
        if(this.isComputer){
          this.changH = {
              oriL:this.$parent.style.left,//组件改变前的left
              oriH:this.$parent.style.height,//组件改变前的height
              oriW:this.$parent.style.width,//组件改变前的width
              oriT:this.$parent.style.top,//组件改变前的top
              curH:this.$parent.style.height,//组件改变后的高度
              oriRotate:this.$parent.style.rotate,
              nowCom:this.$parent,//当前选中组件
              isPush:true//true-下推组件 反之下推页面分割线
          }
        }else{
          this.nStyle.height = this.mobileStyle.height?this.mobileStyle.height:$(this.$refs.bannerChild).outerHeight()
          this.nStyle.height2 = this.mobileStyle.height?this.mobileStyle.height:$(this.$refs.bannerChild).outerHeight()
          this.changH = {
              oriL:this.$parent.mobileStyle.left,//组件改变前的left
              oriH:this.$parent.mobileStyle.height,//组件改变前的height
              oriW:this.$parent.mobileStyle.width,//组件改变前的width
              oriT:this.$parent.mobileStyle.top,//组件改变前的top
              curH:this.$parent.mobileStyle.height,//组件改变后的高度
              oriRotate:this.$parent.mobileStyle.rotate,
              nowCom:this.$parent,//当前选中组件
              isPush:true//true-下推组件 反之下推页面分割线
          }
        }
        let lemitHeight = this.maxTH?this.maxTH:5
        return {minHeight:lemitHeight}
      },
      stretchCallBack(obj){//拉伸按钮拖动回调
        // console.log('stretchCallBack----------------------99999999',obj)
        let event = window.event || evt
        if(obj.index == 1) return
        this.isStretch = true
        if(this.isComputer){
          this.$parent.stretchCallBack(obj)
          this.$parent.noSelect(this.selIndex)
          this.bannerChildLimitHP()
          if(this.$parent.style.height < (5 + this.$parent.settingData.bannerPaddin.value*2)){
            this.$parent.style.height = 5 + this.$parent.settingData.bannerPaddin.value*2
          }else{
            this.$parent.style.height = this.style.height + this.$parent.settingData.bannerPaddin.value*2
          }

          this.changH.curH = this.$parent.style.height;
          if(this.changH.oriH > this.changH.curH){
            this.$store.commit("createChangeHeightClass",this.changH)
          }
        }else{
          this.childDataTHMax()
          this.nStyle.dw = (event.clientY - this.nStyle.dy)?(event.clientY - this.nStyle.dy):($(this.$refs.bannerChild).outerHeight() - this.nStyle.height)
          obj.height = this.nStyle.height2 + this.nStyle.dw
          if(obj.height <= 5){
            obj.height = 5
          }
          if(this.childData.length > 0){
            if(obj.height <= this.maxTH){
              if(obj.height >= this.nStyle.height){
                this.mobileStyle.height = obj.height
                this.nStyle.height = this.mobileStyle.height
              }else{
                if(this.nStyle.height >= this.maxTH){
                  this.nStyle.height = this.maxTH
                }
                this.mobileStyle.height = this.nStyle.height
              }
            }else{
              if(obj.height <= this.maxTH){
                obj.height = this.maxTH
              }
              this.mobileStyle.height = obj.height
              this.nStyle.height = this.mobileStyle.height
            }
          }else{
            this.mobileStyle.height = obj.height
          }
          this.changeTopAndGetH()
        }
        this.$parent.pointMove = true
      },
      stretchUp(){//拉伸按钮松开回调
        // console.log('stretchUp--------------------')
        this.isStretch = false
        this.$parent.pointMove = false
        this.$parent.parentMove = true
        this.$parent.noSelect(this.selIndex)
        this.$parent.notAddF()
      },
      changeTopAndGetH(v){//手机端在改变横条列的高度时而引起其它横条列top值改变，此时重新计算top数组排序并且计算整个横条高度
        !this.isComputer ? this.$parent.setTopArrV() : ''
        if(!v){
          this.$parent.setMobileTop()
        }
        if(!this.isComputer && this.isStretch){
          // this.getAllShowComH()
          this.changH.curH = this.$parent.mobileStyle.height;
          if(this.changH.oriH > this.changH.curH){
            this.$store.commit("createChangeHeightClass",this.changH)
          }
        }
        this.$parent.bannerPBF(0,this.id)
      },
      bannerDown(v){//鼠标在整个组件上按下的时候
        // console.log('bannerDown-------------------------------')
        this.$parent.pointMove = true
        this.$parent.childVueDown = true
        this.$parent.selectObj.firstTime = new Date().getTime();
        
        this.nowElTop = zmEditor.$store.state.component.selectList[0].mobileStyle.top
        this.$parent.selectObj.emptyPlace = this.$parent.emptyPlace
        this.$parent.selectObj.labelShow = this.$parent.labelShow
        this.$parent.selectObj.classShow = this.$parent.settingData.classShow
        this.$parent.selectObj.classShow2 = this.$parent.settingData.classShow2

        this.moveObj.nowY = v
        if(this.isComputer){
          this.moveObj.nowPY = this.$parent.style.top
        }else{
          this.moveObj.nowPY = this.$parent.mobileStyle.top
          this.$parent.pattern = [0,0,0,0,0,0,0,0]
        }
      },
      bannerMove(v){//整个组件移动的时候
        this.$parent.pointMove = true
        this.$parent.childVueDown = true
        this.$parent.hoverIndex = -1
        // this.$parent.settingData.classShow = false
        // this.$parent.settingData.classShow2 = false
        this.moveObj.subY = v - this.moveObj.nowY
        if(this.isComputer){
          this.$parent.style.top = this.moveObj.nowPY + this.moveObj.subY
          this.$parent.childData.forEach((element,index)=>{
            element.style.top = this.$parent.settingData.bannerPaddin.value
          })
        }else{
          if(zmEditor.$store.state.component.selectList[0].type=='banner'){
            zmEditor.$store.state.component.selectList[0].mobileStyle.top = this.nowElTop
          }
          this.$parent.mobileStyle.top = this.moveObj.nowPY + this.moveObj.subY
        }
      },
      bannerUp(v){//鼠标在整个组件上松开的时候
        // console.log('bannerUp-------------------------------')
        this.$parent.pointMove = false
        if(this.$parent.selectObj.emptyPlace && !this.$parent.selectObj.classShow){
          this.$parent.settingData.classShow = true
          this.$parent.settingData.classShow2 = false
        }
        if(!this.$parent.selectObj.emptyPlace && this.$parent.selectObj.classShow){
          this.$parent.settingData.classShow = true
          this.$parent.settingData.classShow2 = false
        }
        if(!this.$parent.selectObj.emptyPlace && this.$parent.selectObj.classShow2){
          this.$parent.settingData.classShow = false
          this.$parent.settingData.classShow2 = true
        }
        this.$parent.childVueDown = false
        this.$parent.btnMove = false
        this.$parent.selectObj.lastTime = new Date().getTime()
        this.$parent.selectObj.subTime = this.$parent.selectObj.lastTime - this.$parent.selectObj.firstTime
        if(this.$parent.selectObj.subTime > 200){
          if(this.$parent.childData.length == 1){
            this.$parent.labelShow = true
            this.$store.commit("changeSelectList",this)
            let DOMRect = $(this.$el)[0].getBoundingClientRect()
            this.$parent.getVue2(DOMRect,0)
          }else{
            if(this.$parent.settingData.classShow || this.$parent.selectObj.emptyPlace || this.$parent.selectObj.labelShow){
              this.$store.commit("changeSelectList",this.$parent)
              // this.$parent.emptyPlace = this.$parent.selectObj.emptyPlace
              this.$parent.emptyPlace = false
              this.$parent.labelShow = this.$parent.selectObj.labelShow
              this.$parent.settingData.classShow = true
              this.$parent.settingData.classShow2 = false
              this.$parent.settingData.myData.forEach((element,i)=>{
                element.resizeLShow = false 
                element.resizeRShow = false
                element.ColumnLabelShow = false
                element.oneIsSelect = false
              })
              let DOMRect = $(this.$parent.$el)[0].getBoundingClientRect()
              this.$parent.getVue2(DOMRect,0)
            }else{
                this.$parent.emptyPlace = false
                let DOMRect = $(this.$el)[0].getBoundingClientRect()
                this.$parent.getVue2(DOMRect,this.selIndex)
            }
          }
        }
        this.$parent.eachBannerLeft()
      },
      childInBannerMove(v){//第一层childData在横条列中移动时以及快捷键左右箭头移动子组件时执行横条列的回调函数（czj帮忙添加）
        if(v){
          this.moveType = true
        }else{
          this.moveType = false
          this.AdsorbentF()
        }
        this.isComputer&&this.childDataLeftF(this.childData)
      },
      bannerChildPC(){//第一层childData在工具栏中进行左右对齐时执行横条列的回调函数（ssm帮忙添加）
        this.isComputer&&this.childDataLeftF(this.childData)
      },
      bannerChildClick(v){//点击横条列中的子组件，子组件执行横条列的回调(编辑器自动调用，右击的话会传回第二个参数‘right’)
        // console.log('bannerChildClick-------------------------v')
        this.$parent.settingData.classShow = false
        this.$parent.settingData.classShow2 = true
        this.$parent.emptyPlace = false
        this.$parent.labelShow = false
        this.$parent.childVueDown = false
        this.$parent.settingData.myData.forEach((element,index)=>{
          if(v.id == element.id){
            element.resizeLShow = false
            element.resizeRShow = false
            element.ColumnLabelShow = true
            element.oneIsSelect = true
            this.$parent.bannerPBF(index)
          }else{
            element.resizeLShow = false
            element.resizeRShow = false
            element.ColumnLabelShow = false
            element.oneIsSelect = false
          }
        })
        if(!this.isComputer){
          this.$parent.setTopArrV()
          this.$parent.topArr2.forEach((ele,i)=>{
            if(v.id == ele.id){
              this.$parent.hoverIndexM = i
              this.topIndex = i + 1
            }
          })
          this.oneBannerMC('noChage')
        }
        let bannerCom = this.findBannerCom()
        if(!bannerCom) return
        bannerCom.forEach((element,index)=>{
          if(element.id != this.$parent.id){
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
      },
      bannerChildClickUp(){//点击横条列中的子组件,鼠标在子组件上松开时执行的回调，解决让辅助线由实线变回虚线(CZJ提供)
        this.borderImageNoL = false
        this.borderImageNoR = false
        this.$parent.childMove = false
      },
      forSelect(){//根据选中框确定横条列的索引
        let [nowS,nowSId,nowSVue] = [0,null,null]
        this.$parent.settingData.myData.forEach((element,index)=>{
          if(element.oneIsSelect){
            nowS = index
          }else{
            element.resizeLShow = false
            element.resizeRShow = false
            element.ColumnLabelShow = false
            element.oneIsSelect = false
          }
        })
        this.$parent.childData.forEach((element,index)=>{
          if(nowS == index){
            nowSId = element.id
          }
        })
        this.$parent.$children.forEach((element,index)=>{
          if(nowSId == element.id){
            nowSVue = element
            this.$store.commit("changeSelectList",element)
          }
        })
        return nowS
      },
      setBtnPosition(){//设置设置按钮的位置
        // console.log('setBtnPosition---------------')
        if(this.isComputer){
            let DOMRect
            if(zmEditor.$store.state.component.selectList[0].otherType == 'combinationBanner'){
              if(!this.$parent) return
              DOMRect = $(this.$parent.$el)[0].getBoundingClientRect()
              this.$parent.getVue2(DOMRect,0)
            }else if(zmEditor.$store.state.component.selectList[0].otherType == 'bannerChild'){
              let [nowId,nowV,selI] = [null,null,0]
              this.$parent.settingData.myData.forEach((element,index)=>{
                if(element.oneIsSelect){
                  nowId = element.id
                  selI = index
                }
              })
              this.$parent.$children.forEach((element,index)=>{
                if(nowId == element.id){
                  nowV = element
                }
              })
              if(!nowV) return
              DOMRect = $(nowV.$el)[0].getBoundingClientRect()
              this.$parent.getVue2(DOMRect,selI)
            }
          }
      },
      childC(v){//点击横条列
        /*因为click事件执行时间短，所以利用鼠标拖动的时间差(this.$parent.selectObj.subTime)作为标志，在拖拽事件中计算鼠标从onmousedown 到onmouseup 所用的时间差，与200ms作比较
        *小于200豪秒执行的是click事件，大于200毫秒执行的是onmousedown 到onmouseup事件（防止click与mousedown冲突）
        */
        this.backgroundBtn = false
        if(this.isComputer){
          if(this.$parent.childData.length == 1){
            this.$parent.labelShow = true
            this.$parent.settingData.classShow2 = false
            this.$parent.bannerOneClick(this.selIndex,this.$el)
            this.btnList()
            this.disableToolY = false
            this.pattern = [0,1,0,0,0,1,0,0]
          }else{
            this.disableToolY = true
            this.pattern = [0,0,0,0,0,0,0,0]
          }
        }else{
          let count = 0
          this.$parent.childData.forEach((element,index)=>{
            if(element.settingData.mobileComIsHide){
              count++
            }
          })
          if(count == 1){
            this.$parent.bannerU()
            this.$parent.settingData.classShow = true
            this.$parent.settingData.classShow2 = false
            this.$parent.labelShow = true
            this.$parent.emptyPlace = false
            this.$parent.specialBot = true
            this.$parent.mDisableToolH = false
            this.$parent.mobileButtonList = [//手机版设置项按钮
              { type: "hide", title: "隐藏", icon: "icon-hide" },
            ]
            if(zmEditor.$store.state.component.selectList[0].type != 'banner'){
            }else{
              this.$store.commit("changeSelectList",this.$parent)
            }
            let DOMRect = $(this.$el)[0].getBoundingClientRect()
            this.$parent.getVue2(DOMRect,0)
            return
          }else{
            this.$parent.mDisableToolH = true
            this.$parent.specialBot = false
            this.$parent.mobileButtonList = [//手机版设置项按钮
              { type: "hide", title: "隐藏", icon: "icon-hide" },
              { type: "set", title: "设置", icon: "icon-shezhi1" ,
                paneTitle:'横条设置',
                paneHeight:420,
                paneInfo:"设置手机端横条样式",
              },
            ]
          }
        }
        if(this.$parent.btnMove || this.$parent.isRightAdd || this.$parent.pointMove) return //如果是通过左右拖动按钮改变横条列的宽度或者是点击右侧添加列设置按钮则步执行下面的点击事件
        if(this.$parent.selectObj.subTime > 200 && (zmEditor.$store.state.component.selectList[0] && zmEditor.$store.state.component.selectList[0].type == 'banner')){
          // console.log('不执行点击事件----------------------',zmEditor.$store.state.component.selectList[0].otherType)
          this.otherClick()
          this.setBtnPosition()//设置设置按钮的位置
          let myAllBannderCom = this.findBannerCom()
          if(this.$parent.settingData.classShow) return
          let nowS = this.forSelect()
          this.btnList(nowS)
          this.$parent.noSelect(nowS)
          // console.log('不执行点击事件----------------------22222222222')
        }else{
          // console.log('执行点击事件----------------------')
          if(zmEditor.$store.state.component.selectList[0] && zmEditor.$store.state.component.selectList[0].type != 'banner'){
            this.$parent.emptyPlace = false
          }
          if(this.$parent.emptyPlace){
            this.$parent.labelShow = true
            this.$parent.bannerU()
            if(zmEditor.$store.state.component.selectList[0] && zmEditor.$store.state.component.selectList[0].type != 'banner'){
              this.$parent.settingData.classShow = false
              this.$parent.settingData.classShow2 = false
              this.$parent.emptyPlace = false
              this.$parent.settingData.myData.forEach((element,i)=>{
                if(i == v){
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
            }else{
              if((this.$parent.settingData.classShow && !this.$parent.emptyPlace) || (!this.$parent.settingData.classShow && this.$parent.emptyPlace)){
                // console.log('childC----------------------------------------***********')
                if(zmEditor.$store.state.component.selectList[0] && zmEditor.$store.state.component.selectList[0].type == 'banner'){
                  if(this.$parent.settingData.classShow || !this.$parent.settingData.classShow2){
                    // console.log('childC----------------------------------------***********11111111111')
                    this.$parent.labelShow = false
                    this.$parent.bannerOneClick(this.selIndex,this.$el)
                    this.btnList()
                  }else{
                    this.clickParent(this.selIndex)
                  }
                }else{
                  // console.log('childC----------------------------------------***********3333333')
                  this.$parent.labelShow = false
                  this.$parent.bannerOneClick(this.selIndex,this.$el)
                  this.btnList()
                }
              }else{
                // console.log('childC----------------------------------------**^^^^^^^^^^')
                this.clickParent()
              }
            }
          }else{
            // console.log('childC----------------------------------------5555555555')
            if(zmEditor.$store.state.component.selectList[0] && zmEditor.$store.state.component.selectList[0].type != 'banner'){
              // console.log('childC----------------------------------------66666666')

              this.$parent.labelShow = false
              this.$parent.settingData.classShow = false
              this.$parent.settingData.classShow2 = true
              this.$parent.emptyPlace = false
              this.$parent.settingData.myData.forEach((element,i)=>{
                if(i == v){
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
              //当点击横条列中的任意一个组件的时候根据当前点击的组件查找横条列实例--------start
              // let ele = zmEditor.$store.state.component.selectList[0]
              setTimeout(()=>{
                let ele = zmEditor.$store.state.component.selectList[0]
                let index
                let nowP = this.findParent(ele)
                this.$parent.childData.forEach((e,i)=>{
                  if(nowP.id == e.id){
                    index = i
                  }
                })
                this.$parent.settingData.myData.forEach((element,i)=>{
                  if(index == i){
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
                let myAllBannderCom = this.findBannerCom()
                myAllBannderCom.forEach((element,i)=>{//遍历所有组件实例，找到组合横条组件实例进行处理
                  if(!nowP) return
                  if(element.id == nowP.$parent.id){
                  }else{
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
                return
              },0)
              //当点击横条列中的任意一个组件的时候根据当前点击的组件查找横条列实例--------end
            }else{
              // console.log('childC----------------------------------------99999999999')
              this.$parent.labelShow = false
              this.$parent.bannerOneClick(this.selIndex,this.$el)
              this.btnList()
            }
          }
          if($(this.$parent.$el).offset().top < 112){
            this.$parent.topMin = false
          }else{
            this.$parent.topMin = true
          }
        }
      },
      otherClick(){
          // console.log('otherClick----------------------------')
          let ele = zmEditor.$store.state.component.selectList[0]
          let nowId = null
          if(ele.otherType == 'combinationBanner'){
            // this.$parent.emptyPlace = false
            nowId = ele.id
          }else{
            nowId = ele.$parent.id
          }
          let myAllBannderCom = this.findBannerCom()
          myAllBannderCom.forEach((element,i)=>{//遍历所有组件实例，找到组合横条组件实例进行处理
            if(!ele) return
            if(element.id == nowId){
            }else{
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
      },
      clickParent(){//选中的是最外层的父组件
        // console.log('clickParent----------------------------')
        if(this.$parent.settingData.classShow){
        }else{
          let topArr = []
          let nowVue = null
          this.$parent.childData.forEach((element,index)=>{
            if(element.settingData.mobileComIsHide){
              nowVue = element
              topArr.push(element.mobileStyle.top)
            }
          })
          if(topArr.length == 1){
            this.$parent.mDisableToolH = false
            nowVue.mobileStyle.height = this.mobileStyle.height
          }else{
            this.$parent.mDisableToolH = true
          }
          this.$parent.labelShow = true
          this.$parent.settingData.classShow = true
          this.$parent.settingData.classShow2 = false
          this.$parent.emptyPlace = false
          this.$parent.settingData.myData.forEach((element,i)=>{
            if(i == this.index){
                element.resizeLShow = false
                element.resizeRShow = false
                element.ColumnLabelShow = false
                element.oneIsSelect = false
            }
          })
          
          zmEditor.$store.commit('switchBtnType', null);//隐藏设置按钮
          setTimeout(()=>{
            zmEditor.$store.commit('switchBtnType', 'unitMenu');//显示设置按钮
            let btnL = 0
            if(this.isComputer){
              btnL = Math.abs(zmEditor.$store.state.page.marginLeft) + 290
            }else{
              btnL = Math.abs(zmEditor.$store.state.page.mobileMarginLeft) + 80
            }
            let top
            if($(this.$parent.$el).offset().top < 112){
              this.$parent.topMin = false
              top = $(this.$parent.$el).offset().top + this.$parent.style.height + 20
            }else{
              this.$parent.topMin = true
              top = $(this.$parent.$el).offset().top - 59
            }
            if(this.$parent.settingData['fullScreen'].value){
              zmEditor.$store.commit('upPlace', {
                left: btnL,
                top: top
              })
            }else{
              if(this.isComputer){
                zmEditor.$store.commit('upPlace', {
                  left: Math.abs(zmEditor.$store.state.page.marginLeft) + 150,
                  top: top
                })
              }else{
                zmEditor.$store.commit('upPlace', {
                  left: btnL,
                  top: top
                })
              }
            }
            this.$store.commit("changeSelectList",this.$parent)
            return
          },0)
          // this.$parent.mousedown()
        }
      },
      findParent(el){//当点击横条列中的任意一个组件的时候根据当前点击的组件查找横条列实例
        if(!el) return
        if (el.otherType && el.otherType == 'bannerChild') {
          return el
        } else
        if (['bodyRow','headRow','footRow'].indexOf(el.$parent.type) > -1) {
          return false
        } else {
          return this.findParent(el.$parent)
        }
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
      dblclick(){//双击弹出设置框
        this.bannerTitle = "横条设置"
        this.nowIndex = 1;
        // this.$store.commit('setComBackgroundData',this.settingData.backgroundData)
        // zmEditor.$store.commit('setBackgroundData', {key: 'comType', value: 'banner'});
        zmEditor.$store.commit('changePaneData', {key: 'paneType', value: true});
        zmEditor.$store.commit('changePaneData', {key: 'paneTitle', value: this.bannerTitle});
        zmEditor.$store.commit('changePaneData', {key: 'paneMode', value: "/editor/pane/backgroundPreview.vue"});
        zmEditor.$store.commit('changePaneData', {key: 'paneHelpInfo', value: "通过设置项设置列背景样式"});
        // zmEditor.$store.commit('setBackgroundData', {key: 'nowShowStyle', value: 'img'});
        this.settingData.backgroundData.tabIndex = this.nowIndex;
      },
      cl2(v){//pc端双击横条列弹出设置框
        this.backgroundBtn = !this.backgroundBtn
        if(v){
          this.bannerTitle = "横条设置"
          this.nowIndex = 1;
        }else{
            event.currentTarget.firstChild.innerHTML.trim() == "编辑" ? this.bannerTitle = "横条背景" : this.bannerTitle = "横条设置"
            event.currentTarget.firstChild.innerHTML.trim() == "编辑" ? this.nowIndex = 0 : this.nowIndex = 1;
        }
        zmEditor.$store.commit('changePaneData', {key: 'paneType', value: this.backgroundBtn});
        if(!this.backgroundBtn) return
        // this.$store.commit('setComBackgroundData',this.settingData.backgroundData)
        zmEditor.$store.commit('changePaneData', {key: 'paneTitle', value: this.bannerTitle});
        zmEditor.$store.commit('changePaneData', {key: 'paneIcon', value: ''});
        zmEditor.$store.commit('changePaneData', {key: 'paneMode', value: "/editor/pane/backgroundPreview.vue"});
        zmEditor.$store.commit('changePaneData', {key: 'paneHelpInfo', value: "通过设置项设置列背景样式"});
        this.settingData.backgroundData.tabIndex = this.nowIndex;
      },
      topChangeUp(v){//手机端上移
        let topArr = []
        let nowId = v.id?v.id:zmEditor.$store.state.component.selectList[0].id
        let nowTop = v.mobileStyle?v.mobileStyle.top:zmEditor.$store.state.component.selectList[0].mobileStyle.top
        let nowHeight = v.mobileStyle?v.mobileStyle.height:zmEditor.$store.state.component.selectList[0].mobileStyle.height
        let otherIndex = 0
        let otherTop = 0
        let otherId = 0
        let otherHeight = 0

        this.$parent.childData.forEach((element,index)=>{
          if(element.settingData.mobileComIsHide){
            topArr.push(element.mobileStyle.top)
          }
        })
        function sortNumber(a,b){
          return a - b
        }
        topArr.sort(sortNumber)
        topArr.forEach((element,index)=>{
          if(nowTop == element){
            otherIndex = index - 1
          }
        })
        topArr.forEach((element,index)=>{
          if(otherIndex == index){
            otherTop = element
          }
        })
        this.$parent.childData.forEach((element,index)=>{
          if(otherTop == element.mobileStyle.top){
            otherId = element.id 
            otherHeight = element.mobileStyle.height
          }
        })
        this.$parent.childData.forEach((element,index)=>{
          if(nowId ==  element.id){
            element.mobileStyle.top = otherTop 
          }
          if(otherId == element.id){
            element.mobileStyle.top = otherTop + nowHeight + parseFloat(this.$parent.settingData.marginT.value)
          }
        })
        this.$parent.changeTopAndGetH()
        this.btnList()
        this.$parent.bannerPBF(0,nowId)
      },
      topChangeDown(v){//手机端下移
        let topArr = []
        let nowId = v.id?v.id:zmEditor.$store.state.component.selectList[0].id
        let nowTop = v.mobileStyle?v.mobileStyle.top:zmEditor.$store.state.component.selectList[0].mobileStyle.top
        let nowHeight = v.mobileStyle?v.mobileStyle.height:zmEditor.$store.state.component.selectList[0].mobileStyle.height
        let otherIndex = 0
        let otherTop = 0
        let otherId = 0
        let otherHeight = 0
  
        this.$parent.childData.forEach((element,index)=>{
          if(element.settingData.mobileComIsHide){
            topArr.push(element.mobileStyle.top)
          }
        })
        function sortNumber(a,b){
          return a - b
        }
        topArr.sort(sortNumber)
        topArr.forEach((element,index)=>{
          if(nowTop == element){
            otherIndex = index + 1
          }
        })
        topArr.forEach((element,index)=>{
          if(otherIndex == index){
            otherTop = element
          }
        })
        this.$parent.childData.forEach((element,index)=>{
          if(otherTop == element.mobileStyle.top){
            otherId = element.id 
            otherHeight = element.mobileStyle.height
          }
        })
        this.$parent.childData.forEach((element,index)=>{
          if(nowId ==  element.id){
            element.mobileStyle.top = nowTop + otherHeight + parseFloat(this.$parent.settingData.marginT.value) 
          }
          if(otherId == element.id){
            element.mobileStyle.top = nowTop
          }
        })
        this.$parent.changeTopAndGetH()
        this.btnList()
        this.$parent.bannerPBF(0,nowId)
      },
      oneColumn(){//当整个横条只有一列时设置设置按钮满屏和非满屏效果
        if(this.isComputer){
          this.btnList(0)
        }
      },
      btnList(v){//根据点击列索引判断设置按钮的组合
        //根据选中的横条列分配不同组合的设置按钮
        let [obj1,obj2,obj3,obj4,obj5,obj6,obj7,obj8,obj9,obj10,obj11,obj12,obj13,obj14,obj15,obj16,obj17,obj18] = [
          {type:'editor',title:"列编辑",icon:'icon-110',callback:this.cl2,paneInfo:"通过设置项设置列背景样式"},
          {type:'bannerSet',title:'设置',icon:'icon-shezhi1',callback:this.cl2,paneInfo:"通过设置项设置列背景样式"},
          {type:'rightAdd',title:'右侧添加列',icon:'icon-icon rightAdd',callback:this.rightAdd},
          {type:'leftMove',title:'左移',icon:'icon-zuoyi',callback:this.leftMove},
          {type:'rightMove',title:'右移',icon:'icon-youyi',callback:this.rightMove},
          {type:'delBanner',title:'删除',icon:'icon-delete',callback:this.deleteBanner},
          {type:'deleteAllBanner',title:'删除',icon:'icon-delete',callback:this.deleteAllBanner},
          {type:"hide",title:"隐藏",icon:"icon-hide"},
          {type:"bannerSet",title:"设置",icon:"icon-shezhi1",paneInfo:"通过设置项设置列背景样式"},
          {type:"shangyi1",title:"上移一层",icon:"icon-xiangshangP",callback:this.topChangeUp},
          {type:"xiayi1",title:"下移一层",icon:"icon-xiangxiaP",callback:this.topChangeDown},
          {type:"shangyi1wuxiao",title:"上移一层",icon:"icon-xiangshangP notMove"},
          {type:"xiayi1wuxiao",title:"下移一层",icon:"icon-xiangxiaP notMove"},
          {type:'fullPage',title:"满屏",icon:'icon-quanping1',callback:this.$parent.fullOrNotPage},
          {type:'notFullPage',title:"取消满屏",icon:'icon-puman',callback:this.$parent.fullOrNotPage},
          { type: "set",title: "虚线布局", icon: "icon-xuxianbuju",paneTitle:'虚线布局',paneInfo:"设置列虚线内容对齐方式，列中两条虚线内的内容优先显示"},
          {type:'bannerSet',title:'底色编辑',icon:'icon-bgEditor',callback:this.$parent.cl2,paneInfo:"通过设置项设置列背景样式"},
          {type: "set",title: "样式设置", icon: "icon-shezhi1",paneTitle:'横条管理',paneInfo:"通过设置项编辑商品组件样式"},
        ]
        if(this.isComputer){
          this.selIndex = v?v:this.selIndex
          if(this.selIndex == 0){
            
            if(this.$parent.settingData['fullScreen'].value){
              this.buttonList = [obj1,obj16,obj3,obj5,obj6]
            }else{
              this.buttonList = [obj1,obj3,obj5,obj6]
            }
            if(this.length == 1){
              // if(this.$parent.settingData['fullScreen'].value){
              //   this.buttonList = [obj18,obj1,obj3,obj6]
              // }else{
              //   this.buttonList = [obj1,obj16,obj3,obj6]
              // }
              this.buttonList = [obj18,obj1,obj3,obj6]
              if(this.$parent.settingData.bannerPaddin.value>10){
                this.$parent.specialTop = false
              }else{  
                this.$parent.specialTop = true
              }
              
            }
          }else if(this.selIndex == (this.length-1)){
            if(this.$parent.settingData['fullScreen'].value){
              this.buttonList = [obj1,obj16,obj3,obj4,obj6]
            }else{
              this.buttonList = [obj1,obj3,obj4,obj6]
            }
            
            this.specialTop = false
          }else{
             if(this.$parent.settingData['fullScreen'].value){
               this.buttonList = [obj1,obj16,obj3,obj4,obj5,obj6]
             }else{
               this.buttonList = [obj1,obj3,obj4,obj5,obj6]
             }
            
            this.specialTop = false
          }
          this.$parent.eachBannerLeft()
          this.$parent.notAddF()
        }else{
          if(!zmEditor.$store.state.component.selectList[0]) return
          let nowId = zmEditor.$store.state.component.selectList[0].id
          let nowTop = zmEditor.$store.state.component.selectList[0].mobileStyle.top
          let topArr = []
          let otherIndex = 0
          this.$parent.childData.forEach((element,index)=>{
            if(element.settingData.mobileComIsHide){
              topArr.push(element.mobileStyle.top)
            }
          })
          function sortNumber(a,b){
            return a - b
          }
          topArr.sort(sortNumber)
          topArr.forEach((element,index)=>{
            if(nowTop == element){
              otherIndex = index
            }
          })
          this.topIndex = (otherIndex+1)
          if(otherIndex == 0){
            this.mobileButtonList = [obj12,obj11,obj8]
            if(topArr.length == 1){
              this.mobileButtonList = [obj12,obj13,obj8]
              this.specialTop = true
              this.$parent.specialBot = true
              this.mDisableToolH = false
            }
          }else if(otherIndex == (topArr.length-1)){
            this.mobileButtonList = [obj10,obj13,obj8]
            this.specialTop = false
            this.$parent.specialBot = false
          }else{
            this.mobileButtonList = [obj10,obj11,obj8]
            this.specialTop = false
            this.$parent.specialBot = false
          }
        }
      },
      resizedown(v1,v2,evt){//拖动左右拖动按钮
        let lemitVue = null
        if(v1 == 'left'){
          if(this.childData.length > 0){
            lemitVue = this.style.width - this.childDataMinL()
          }else{
            lemitVue = 100//横条列中无任何子组件时横条列的最小宽度
          }
        }else if(v1 == 'right'){
          if(this.childData.length > 0){
            lemitVue = this.childDataMaxLW()
          }else{
            lemitVue = 100//横条列中无任何子组件时横条列的最小宽度
          }
        }
        this.$parent.resizedown(v1,v2,this.$el,this,lemitVue,evt)
      },
      rightMove(){//横条列右移
        this.$emit("rightMove",this.selIndex,this.id)
      },
      leftMove(){//横条列左移
         this.$emit("leftMove",this.index,this.id)
      },
      rightAddRightC(){//鼠标右击选择右侧添加咧
        this.$emit("rightAdd",this.index,this.id,this)
      },
      rightEditor(){//鼠标右击选择编辑
        this.cl2()
      },
      rightAdd(){//右侧添加列
        this.$emit("rightAdd",this.index,this.id,this)
      },
      deleteBanner(){//删除横条列
        zmEditor.$store.commit('changePaneData', {key: 'paneType', value: false})//关闭设置弹窗
        this.$emit("deleteBanner",this.index,this.id,this)
      },
      comDeleteBanner(){//鼠标右击删除和快捷键Backspack,delete（删除列功能）
        zmEditor.$store.commit('changePaneData', {key: 'paneType', value: false})//关闭设置弹窗
        this.$emit("deleteBanner",this.index,this.id,this)
      },
      escClick(){//点击空白处或点击横条以外的组件（不包含横条列里面的子组件）true为点击空白处
        this.$parent.escClick()
      },
      setNullData(){//设置初始数据或者添加新字段
        if(this.settingData.leftPer == 'left'){
        }else if(this.settingData.leftPer == 'center'){
        }else if(this.settingData.leftPer == 'right'){
        }else{
          this.settingData.leftPer = 'center'
        }
        if(!this.settingDataP){
          this.settingDataP = this.$parent.settingData
        }
      },
      deleteChildCallBack(v){//在删除横条列中的任意子组件的时候，让当前zmEditor.$store.state.component.selectList[0]为当前横条列（wix同理）
        setTimeout(()=>{
          this.$store.commit("changeSelectList",v)
          this.$parent.labelShow = false
          this.$parent.emptyPlace = false
          this.$parent.settingData.classShow = false
          this.$parent.settingData.classShow2 = true
          this.$parent.settingData.myData.forEach((element,index)=>{
            if(v.id == element.id){
              let DOMRect = $(v.$el)[0].getBoundingClientRect()
              this.$parent.getVue2(DOMRect,index)
            }
          })
          return
        },300)
      },
      videoCF(){
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
      this.setNullData()
      this.btnList()
      this.style.width = this.fwidth
      this.mobileStyle.width = 320
      this.style.left = this.Myleft
      if(this.isComputer){
        this.$parent.settingData.myData.forEach((element,index)=>{
          if(!element.childLeft){
            element.childLeft = []
          }
        })
        this.$parent.settingData.myData.forEach((element,index)=>{
            if(element.childLeft.length > 0 && element.id == this.id){
              //为了解决复制粘贴横条时被复制出来的新横条内部子组件不随着虚线位置的移动而改变位置===========start
              if(element.childLeft.length == this.childData.length){
                let isBool = false
                this.childData.forEach((el,i)=>{
                    if(element.childLeft[i][0] != el.id){
                      isBool = true
                    }
                })
                if(isBool){
                  setTimeout(()=>{
                    this.childDataLeftF(this.childData)
                    return
                  },400)//这个时间一定要比右侧添加列方法中的时间要长
                }
              }
              //为了解决复制粘贴横条时被复制出来的新横条内部子组件不随着虚线位置的移动而改变位置=============end
            }else if(element.childLeft.length == 0 && element.id == this.id){
              // console.log('22222222222222222222222222222222222222222')
              this.childDataLeftF(this.childData)
            }
        })
        this.blurLineWF()
        if(this.childData.length > 0 && this.isComputer){
          this.setChildleftF(this.childData)
        }
      }
    },
    mounted(){
      if(this.$store.state.pane.isRenderSelect){
        this.$store.commit("changeSelectList",this)
      }else{
        this.id == this.$store.state.component.oldComID && this.$store.commit("changeSelectList",this)
        this.$store.state.component.componentNum++
      }
      this.$store.commit("addContainerToList",this)//容器组件需要添加这一行

      this.videoCF()
      this.$nextTick(()=>{
        this.$parent.setChildTopM()
        if(!this.isComputer){
          let sumT = 0
          if(this.settingData.backgroundData.previewData.type == 'color'){
            this.mobileStyle.height = this.$parent.settingData.myData[this.index]?this.$parent.settingData.myData[this.index].mHeight:50
          }else{
            this.mobileStyle.height = this.$parent.settingData.myData[this.index]?this.$parent.settingData.myData[this.index].mHeight:160
          }
          this.$parent.childData.forEach((element,index)=>{
            this.$parent.settingData.myData[index].mTop = element.mobileStyle.top
            this.$parent.settingData.myData[index].mHeight = element.mobileStyle.height
          })
          this.childDataTHMax()
        }else{
          this.blurLineWF()
          this.childDataMinL()
        }
        if(this.settingData.mobileComIsHide) this.$store.commit("raiseComUpdated",{"id":this.id});//（this.id是组件的id）
        this.curComIsRender = true;//ssm 渲染完成

      })
    },
    destroyed(){//容器组件，轮播组件和横条组件在destoryed生命周期函数里加一行代码
      this.$store.commit('delContainerFromList',this)
    }
   }
  </script>
  <style scoped>
    .oneBannerColumn{
      right: 0 !important;
    }
    .bannerLineC{
      position: absolute;
      pointer-events: none;
      top:0px;
      width: 1px;
      height: 100%;
      /* border-left: 1px dashed  red; */
      /* border-right: 1px dashed  red; */
      background-image: url(../../../../../static/img/lines.c3ba198.png);
    }
    .bannerLineNoImage{
      background-image: none;
      background-color: #FF0099!important;
    }
    .bannerLineBGC2{
        background-color:rgba(48,137,213,.2) !important;
    }
    .zm-bannerChild-main{
      /* z-index:1; */
    }
    /* .zm-bannerChild-main::before{
      content: "";
      overflow: hidden;
      position: absolute;
      left: 0px;
      top: 0px !important;
      width:100%;
      height:100%;
      z-index:1;
      pointer-events:none;
    }
    .zm-bannerChild-main:hover::before {
      background-color:rgba(224,235,243,.3);
    } */
    .outMain{
      width: 'auto';
      height: 'auto';
      position: absolute;
    }
    .zm-component-banner{
      width: 100%;
      height: 100%;
      position:relative;
    }
  
    .zm-bg-banner-PIC{
      width: 100%;
      height: 100%;
      background-size:cover; 
      background-position: center;
      background-repeat: no-repeat;
    }
  
    .zm-bg-banner-BGC{
      width: 100%;
      height: 100%;
    }
  
    .zm-bg-banner-Video{
      width: 100%;
      height: 100%;
      overflow:hidden
    }
    video{
      object-fit: cover;
      width:100%;
      height:100%;
    }
    .span-video{
      display: inline-block; 
      width: 30px; 
      height: 30px; 
      position: absolute; 
      left: 3px; 
      bottom: 2px; 
      color: rgb(255, 255, 255); 
      font-size: 28px;
      /* background-color:red */
    }
    .zm-bg-banner-vein{
      /* z-index:1; */
      width: 100%; 
      height: 100%;
      left:0px;
      top:0px;
      position:absolute;
    }
    .mainBannerVien{
      position: absolute;
      width:100%;
      height:100%;
      left: 0px;
      top:0px;
      pointer-events:none;
      z-index:1;
    }
    .banner-container{
      position: absolute;
      width:100%;
      height:100%;
      left: 0px;
      top:0px;
      pointer-events:all;/* 鼠标点击穿透Div */
      /* z-index:1; */
    }
  </style>
  