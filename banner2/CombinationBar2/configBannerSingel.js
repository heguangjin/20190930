export default {
    computed: {
      setData() {//pc端设置项
        let isHas = true
        if(this.$parent.isComputer&&this.$parent.childData.length == 1&&this.$parent.settingData.fullScreen.value){
            isHas = false
        }else{
            isHas = true
        }
        // console.log('that======================================that',that)
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
                                isShowSet:!(this.$parent.childData.length == 1),
                                title: '全屏宽度',
                                attr:'fullScreen',
                                value:this.$parent.settingData.fullScreen.value,
                                callback:(v)=>{
                                    this.$parent.settingData.fullScreen.value = v
                                    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
                                    this.$parent.fullOrNotPage()
                                }
                            }
                        },
                        {
                            type: '/set/sliders.vue',
                            props: {
                                // isShowSet: this.$parent.settingData.bannerBackups1, //默认隐藏该设置项;
                                isShowSet: (this.$parent.childData.length > 1)?(!this.$parent.settingData.bannerBackups1.value&&!(this.$parent.childData.length == 1)):this.$parent.settingData.bannerBackups1, //默认隐藏该设置项;
                                title: '左右缩进(px)',
                                // attr: 'bannerLRMargin',
                                param: 'number',
                                minVal: 0,
                                maxVal: 80,
                                value:this.$parent.settingData.bannerLRMargin,
                                decimalNum: 0,
                                callback:(v)=>{
                                    console.log('this.$parent.settingData.bannerBackups1.value',this.$parent.settingData.bannerBackups1.value)
                                    console.log('!(this.$parent.childData.length == 1)',!(this.$parent.childData.length == 1))
                                    this.$parent.settingData.bannerLRMargin.value = parseFloat(v)
                                    if(!this.$parent.settingData.fullScreen.value){
                                        this.$parent.settingData.bannerLRMargin.lrValue = 0
                                    }else{
                                        this.$parent.settingData.bannerLRMargin.lrValue = this.$parent.settingData.bannerLRMargin.value
                                    }
                                    this.$parent.setLper()
                                }
                            }
                        },
                        // {
                        //     type: '/set/sliders.vue',
                        //     props: {
                        //         isShowSet:true,
                        //         title: '整体缩进(px)',
                        //         // attr: 'bannerPaddin',
                        //         param: 'number',
                        //         minVal: 0,
                        //         maxVal: 100,
                        //         // value:that.settingData.bannerPaddin.value,
                        //         value:that.settingData.bannerPaddin,
                        //         decimalNum: 0,
                        //         callback:(v)=>{
                        //             that.settingData.bannerPaddin.value = parseFloat(v)
                        //             that.hChangeSetPageH(that.settingData.bannerPaddin.value)
                        //             that.setLper()
                        //         }
                        //     }
                        // },
                        // {
                        //     type: '/set/sliders.vue',
                        //     props: {
                        //         isShowSet:true,
                        //         title: '列间距 :(px)',
                        //         // attr: 'bannerLineSpace',
                        //         param: 'number',
                        //         minVal: 0,
                        //         maxVal: 80,
                        //         throttle:true,
                        //         throttleTime:50,
                        //         // value:that.settingData.bannerLineSpace.value,
                        //         value:that.settingData.bannerLineSpace,
                        //         decimalNum: 0,
                        //         //鼠标move时执行
                        //         callback:(v)=>{
                        //             that.settingData.bannerLineSpace.value = parseFloat(v)
                        //             that.eachBannerLeft()
                        //             that.setLper()
                        //         },
                        //     }
                        // },
                        // {
                        //     type: '/set/setTextLayout.vue',
                        //     props:{
                        //         title:'虚线布局',
                        //         style:{
                        //             textAlign:this.settingData.leftPer,
                        //             callBack:(a)=>{
                        //                 this.settingData.leftPer = a
                        //                 this.$parent.$children.forEach((element,index)=>{
                        //                     element.blurLineWF()
                        //                     element.setChildleftF(element.childData)
                        //                 })
                        //             }
                        //         }
                        //     }
                        // },
                        {
                            type: '/set/bannerSet/myBannerLayout.vue',
                            props: {
                                isHide:this.$parent.settingData.fullScreen,
                                title:'列虚线内容对齐方式 : ',
                                value:this.settingData.leftPer,
                                attr:'leftPer',
                                callBack:(a)=>{
                                    console.log('aaaaaaaaaaaa----------------',a)
                                    this.settingData.leftPer = a
                                    this.$parent.$children.forEach((element,index)=>{
                                        element.blurLineWF()
                                        element.setChildleftF(element.childData)
                                    })
                                }
                            }
                        },
                    ]
                },
            ]
        }
      },
    }
  }