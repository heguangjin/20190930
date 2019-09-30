export default {
  computed: {
    setData() {//pc端设置项
        return {
            type: "tabs",
            props: [
                {
                    title: '布局',
                    type: 'sets',
                    props: [
                        {
                            type: '/set/switch/switch.vue',
                            props: {
                                title: '全屏宽度',
                                attr:'fullScreen',
                                value:this.settingData.fullScreen,
                                callback:()=>{
                                    this.fullOrNotPage()
                                }
                            }
                        },
                        {
                            type: '/set/sliders.vue',
                            props: {
                                isShowSet: this.settingData.bannerBackups1, //默认隐藏该设置项;
                                title: '左右缩进(px)',
                                attr: 'bannerLRMargin',
                                param: 'number',
                                minVal: 0,
                                maxVal: 80,
                                value:this.settingData.bannerLRMargin.value,
                                // value:this.settingData.bannerPaddin.value,
                                decimalNum: 0,
                                callback:(v)=>{
                                    this.settingData.bannerLRMargin.value = parseFloat(v)
                                    if(!this.settingData.fullScreen.value){
                                        this.settingData.bannerLRMargin.lrValue = 0
                                    }else{
                                        this.settingData.bannerLRMargin.lrValue = this.settingData.bannerLRMargin.value
                                    }
                                    this.setLper()
                                    this.lemitWidthF()
                                }
                            }
                        },
                        {
                            type: '/set/sliders.vue',
                            props: {
                                isShowSet: this.settingData.bannerBackups2, //默认隐藏该设置项;
                                title: '整体边距缩进(px)',
                                attr: 'bannerPaddin',
                                param: 'number',
                                minVal: 0,
                                maxVal: 100,
                                value:this.settingData.bannerPaddin.value,
                                // value:this.settingData.bannerPaddin.value,
                                decimalNum: 0,
                                callback:(v)=>{
                                    this.settingData.bannerPaddin.value = parseFloat(v)
                                    this.hChangeSetPageH(this.settingData.bannerPaddin.value)
                                    this.setLper()
                                    this.totleLineWF()
                                    this.lemitWidthF()
                                }
                            }
                        },
                        {
                            type: '/set/sliders.vue',
                            props: {
                                isShowSet: this.settingData.bannerBackups2, //默认隐藏该设置项;
                                title: '列间距  (px)',
                                attr: 'bannerLineSpace',
                                param: 'number',
                                minVal: 0,
                                maxVal: 80,
                                throttle:true,
                                throttleTime:50,
                                value:this.settingData.bannerLineSpace.value,
                                // value:this.settingData.oldMyData.value,
                                decimalNum: 0,
                                callback:(v)=>{
                                    this.settingData.bannerLineSpace.value = parseFloat(v)
                                    this.totleLineWF()
                                    this.eachBannerLeft()
                                    this.setLper()
                                    this.lemitWidthF()
                                }
                            }
                        },
                    ]
                },
            ]
        }
    },
    mobileSetData() {//移动端设置项
        return {
            type: "tabs",
            props: [
                {
                    title: '间距',
                    type: 'sets',
                    props: [
                        {
                            type: "/set/sliders.vue",
                            props: {
                                title: "列间距  (px)",
                                attr: "marginT",
                                param: "size",
                                minVal: 0,
                                maxVal: 30,
                                value: this.settingData.marginT.value,
                                nowVue:this,
                                otherCom:true,//传true就不会改变value的值，但是还是会传参数回来这是需要自己手动修改
                                callback: (v)=>{
                                    this.settingData.marginT.value = parseFloat(v);
                                    let changH;
                                    if(!this.isComputer){
                                        changH = {
                                            oriL:this.mobileStyle.left,//组件改变前的left
                                            oriH:this.mobileStyle.height,//组件改变前的height
                                            oriW:this.mobileStyle.width,//组件改变前的width
                                            oriT:this.mobileStyle.top,//组件改变前的top
                                            curH:this.mobileStyle.height,//组件改变后的高度
                                            oriRotate:this.mobileStyle.rotate,
                                            nowCom:this,//当前选中组件
                                            isPush:true//true-下推组件 反之下推页面分割线
                                        }
                                    }
                                    this.setMobileTop()
                                    if(!this.isComputer){
                                        changH.curH = this.mobileStyle.height;
                                        this.$store.commit("createChangeHeightClass",changH)
                                    }
                                }
                            }
                        },
                    ]
                },
                {
                    title: '列管理',
                    type: 'sets',
                    props: [
                        {
                            type: '/set/bannerSet/myBanner.vue',
                            props: {
                                value:this,
                            }
                        },
                    ]
                }
            ]
        }
    },
    }
}