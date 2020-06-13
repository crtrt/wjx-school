<template>
    <div class="outDiv">
        <cli-title class="titleClass"></cli-title>
        <cli-menu class="menuClass" :pageIndex="pageIndex"></cli-menu>

        <div class="bodyDiv">
            <position :positionName="position.name" :have-back="position.haveBack" @positionBack="clickBack"></position>

            <cli_sub_title :tabList="subTabs" :selectIndex="subTabIndex" style="margin-top: 20px"></cli_sub_title>

            <el-tabs type="border-card" style="margin-top: 20px" v-loading="loading">
                <el-tab-pane label="基本信息">
                    <notify_edit :edittype="notifyType" ref="notifyCom"></notify_edit>
                </el-tab-pane>
                <el-tab-pane label="问题编辑">
                    <data-edit ref="zhengjiCom"></data-edit>
                </el-tab-pane>
            </el-tabs>

            <div style="display: flex; margin-top: 20px; margin-bottom: 50px; flex-direction: row-reverse">
                <el-button size="mini" type="primary" style="margin-left: 20px" @click="submit(0)">发布问卷</el-button>
                <el-button size="mini" type="primary" @click="submit(1)">暂存问卷</el-button>
            </div>

        </div>

    </div>
</template>

<script>
    import CliTitle from "../../components/base/cliTitle";
    import CliMenu from "../../components/base/cliMenu";
    import Position from "../../components/base/position";
    import DataEdit from "../../components/message/message_edit";
    import Message_detail from "../../components/message/message_detail";
    import Notify_edit from "../../components/notify/notify_edit";
    import Cli_sub_title from "../../components/base/cli_sub_title";
    import Cookies from 'js-cookie'
    import API from '../../api'
    export default {
        name: "add",
        components: {Cli_sub_title, Notify_edit, Message_detail, DataEdit, Position, CliMenu, CliTitle},

        data(){
            return{
                accountinfo: 0,
                pageIndex: "3",
                position: {
                    name: '问卷 >> 新增问卷',
                    haveBack: true,

                },
                notifyType: 3,

                subTabs: ['问卷信息'],
                subTabIndex: 0,
                loading:false,

                token: Cookies.get('token'),
            };
        },

        mounted:function(){
            let ourinfo = Cookies.get('info')
            let sndinfo = ourinfo.split(',')[1]
            this.accountinfo = sndinfo.split(':')[1]
            this.getTemp();
        },

        methods:{
            // 点击返回按钮
            clickBack(){
                this.$router.push({path: `/message`})
            },

            getTemp(){
                let data = {
                    token: this.token
                };

                API.getAdminTemp(data).then(res=>{
                    if(res.code){
                        alert(res.message);
                        return;
                    }

                    if(res.survey_info !== null) {
                        this.$refs.notifyCom.setZhengjiData(res.survey_info);
                        this.$refs.zhengjiCom.setData(res.survey_info.surveyQuestion);
                    }

                }).catch(msg => {
                    alert('操作失败')
                })
            },

            // 暂存或发布
            submit(isZanCun){
                this.loading=true;
                let notifyData = this.$refs.notifyCom.getData();
                console.log(notifyData)
                let zhengjiData = this.$refs.zhengjiCom.getData();
                let data = {
                    token: this.token,
                    is_temporary: isZanCun,
                    start_timestamp: notifyData.timeRange[0],
                    stop_timestamp: notifyData.timeRange[1],
                    name: notifyData.title+'/'+this.accountinfo,
                    requirement: notifyData.content,
                    survey_range: notifyData.selectId,
                    attachment_url: notifyData.attachment,
                    survey_question: zhengjiData,
                }

                API.addZhengJi(data).then(res => {
                    if(res.code){
                        alert(res.message);
                        return;
                    }

                    this.loading=false;
                    alert('操作成功！');

                }).catch(msg => {
                    alert('操作失败')
                })
            },
        }

    }
</script>

<style scoped>
    @import "../../assets/css/page/normalLayout.css";

</style>
