<template>
    <div class="outDiv">
        <cli-title class="titleClass"></cli-title>
        <cli-menu class="menuClass" :pageIndex="'3'"></cli-menu>

        <div class="bodyDiv">
            <position :positionName="position.name" :have-back="position.haveBack" @positionBack="clickBack"></position>

            <cli_sub_title :tabList="subTabs" :selectIndex="subTabIndex" style="margin-top: 20px" @selectTab="changeTab"></cli_sub_title>

            <div v-show="subTabIndex === 0">
                <el-tabs type="border-card" style="margin-top: 20px">
                    <el-tab-pane label="基本信息">
                        <notify_edit_disable :notitype="notifyType" ref="notifyCom"></notify_edit_disable>
                    </el-tab-pane>
                    <el-tab-pane label="问卷编辑">
                        <data-edit :isView="readMessage" ref="zhengjiCom"></data-edit>
                    </el-tab-pane>
                </el-tabs>
            </div>

            <div v-show="subTabIndex === 1">
                <el-tabs type="border-card" style="margin-top: 20px">
                    <el-tab-pane label="已完成" style="max-width: 100%; overflow-x: scroll">
<!--                        <un_read_list :showType="readListType"></un_read_list>-->
                        <read_list></read_list>
                    </el-tab-pane>
                    <el-tab-pane label="未完成">
                        <un_read_list :showType="!readListType"></un_read_list>
                    </el-tab-pane>
                </el-tabs>
            </div>


        </div>
    </div>
</template>

<script>
    import CliTitle from "../../../components/base/cliTitle";
    import CliMenu from "../../../components/base/cliMenu";
    import Position from "../../../components/base/position";
    import Cli_sub_title from "../../../components/base/cli_sub_title";
    import Notify_edit from "../../../components/notify/notify_edit";
    import DataEdit from "../../../components/message/message_edit";
    import Notify_edit_disable from "../../../components/notify/notify_edit_disable";
    import Cookies from 'js-cookie'
    import API from '../../../api'
    import Un_read_list from "../../../components/message/unread_list";
    import Read_list from "../../../components/message/read_list";
    export default {
        name: "admin_detail",
        components: {
            Un_read_list,
            Read_list,
            Notify_edit_disable, DataEdit, Notify_edit, Cli_sub_title, Position, CliMenu, CliTitle},
        data(){
            return {
                messageId:-1,
                position: {
                    name: '问卷 >> 问卷详情',
                    haveBack: true,
                },
                notifyType: 3,
                readMessage:true,

                readListType: true,

                subTabs: ['问卷信息', '问卷征集结果'],
                subTabIndex: 0,
                token: Cookies.get('token'),
            }
        },

        created() {
            this.messageId = this.$route.params.messageId;
            this.getDetail();
        },

        methods:{
            // 切换子标题
            changeTab(msg) {
                this.subTabIndex = msg.index;
            },
            // 点击返回按钮
            clickBack(){
                this.$router.push({path: '/message'})
            },

            getDetail(){
                let data={
                    token: this.token,
                    survey_id: this.messageId,
                };

                API.getZhengJiDetail(data).then(res=>{
                    if(res.code){
                        alert(res.message);
                        return;
                    }

                    // this.position.name += res.survey_info.name;
                    this.$refs.notifyCom.setData(res.survey_info);
                    this.$refs.zhengjiCom.setData(res.survey_info.surveyQuestion);

                }).catch(msg => {
                    alert('操作失败')
                })
            },
        }

    }
</script>

<style scoped>
    @import "../../../assets/css/page/normalLayout.css";
</style>
