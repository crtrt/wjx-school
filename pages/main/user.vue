<template>
    <div class="outDiv">
        <cli-title class="titleClass"></cli-title>
        <cli-menu class="menuClass" :pageIndex="pageIndex"></cli-menu>

        <div class="bodyDiv">

            <position :positionName="positionSetting.name" :haveBack="positionSetting.type" style="padding-left: 5px; font-size:22px"></position>
            <el-card style="margin-top: 20px;margin-bottom: 30px">
                <table style="width: 100%; padding: 20px 10px 15px; " cellspacing="0">
                    <tr>
                        <td class="tableTitle" style="width: 50px; text-align: center;padding-left: 10px">
                            序号
                        </td>
                        <td class="tableTitle" style="text-align: center;">
                            名称
                        </td>
                        <td class="tableTitle" style=" text-align: center">
                            发布时间
                        </td>
                        <td class="tableTitle">
                        </td>
                    </tr>

                    <template v-for="(item, index) in dataList" >
                        <tr v-if="item.type === 1" :class="{'tablerow':true, 'grayLine': (index % 2 === 0)}" style="display: table-row;" :key="index">
                            <td class="tableCell" style="text-align: center; width: 3rem;">
                                {{index+1}}
                            </td>
                            <td class="tableCell" style="text-align: center">
                                {{item.title.split('/')[0]}}
                            </td>
                            <td class="tableCell" style="text-align: center">
                                {{item.create_time}}
                            </td>
                            <td class="tableCell" style="width: 4rem">
                                <el-button type="primary" size="mini" @click="readNotify(item)">详情</el-button>
                            </td>
                        </tr>
                        <tr v-if="item.type === 2" :class="{'tablerow':true, 'grayLine': (index % 2 === 0)}" style="display: table-row;" :key="index">
                            <td class="tableCell" style="text-align: center">
                                {{index+1}}
                            </td>
                            <td class="tableCell" style="text-align:center" >
                                {{item.title.split('/')[0]}}
                            </td>
                            <td class="tableCell" style="text-align: center">
                                {{item.create_time}}
                            </td>
                            <td class="tableCell" style="width: 60px" >
                                <el-button type="primary" size="mini" @click="readNotify(item)">详情</el-button>
                            </td>
                        </tr>
                        <tr v-if="item.type === 3" :class="{'tablerow':true, 'grayLine': (index % 2 === 0)}" style="display: table-row;" :key="index">
                            <td class="tableCell" style="text-align: center;width: 3rem;">
                                {{index+1}}
                            </td>
                            <td class="tableCell" style="text-align:center" >
                                {{item.title.split('/')[0]}}
                            </td>
                            <td class="tableCell" style="text-align: center">
                                {{item.create_time}}
                            </td>
                            <td class="tableCell" style="width: 60px" >
                                <el-button type="primary" size="mini" @click="readMessage(item)">详情</el-button>
                            </td>
                        </tr>
                        <tr v-if="item.type === 4" :class="{'tablerow':true, 'grayLine': (index % 2 === 0)}" style="display: table-row;" :key="index">
                            <td class="tableCell" style="text-align: center">
                                {{index+1}}
                            </td>
                            <td class="tableCell" style="text-align: center" >
                                {{item.title.split('/')[0]}}
                            </td>
                            <td class="tableCell" style="text-align: center">
                                {{item.create_time}}
                            </td>
                            <td class="tableCell" style="width: 60px" >
                                <el-button type="primary" size="mini" @click="readPaper(item)">详情</el-button>
                            </td>
                        </tr>
                    </template>
                </table>

            </el-card>

            <div style="display: flex; margin-top: 20px;">
                <alert_list class="alert_list" :showType="alertType.notify" :dataList="dataList1" style="flex-grow: 1"></alert_list>
                <alert_list class="alert_list" :showType="alertType.message" :dataList="dataList2" style="flex-grow: 1"></alert_list>

            </div>

        </div>

    </div>
</template>

<script>
    import Alert_list from "../../components/main/alert_list";
    import CliTitle from "../../components/base/cliTitle";
    import CliMenu from "../../components/base/cliMenu";
    import Position from "../../components/base/position";
    import API from "../../api"
    export default {
        name: "user",
        components: {Position, CliMenu, CliTitle, Alert_list},
        data(){
            return {
                alertType:{
                    notify: 0,
                    message: 1,
                    project: 2,
                },

                /**
                 *  1: 填空题
                 *  2: 单选题
                 *  3: 多选题
                 */
                dataList:[],
                dataList1:[],
                dataList2:[],
                dataList3:[],

                positionSetting:{
                    name:'通知提醒',
                    type:false,
                },
                pageIndex: "1",
            }
        },
        mounted:function(){
            this.getdatalist()
        },
        methods:{
            /**
             * 阅读
             * */
            readNotify(item){
                if(item)
                this.$router.push({path: `/notify/`+item.query_id+`/detail`})
            },
            readMessage(item){
                if(item)
                    this.$router.push({path: `/message/` + item.relate_id + `/user_detail`})
            },
            readPaper(item){
                if(item)
                    this.$router.push({path: `/paper/` + item.relate_id + `/user_detail`})
            },

            getdatalist(){
                let data={
                    token:this.token,
                    orderby: {},
                    page: 1,
                    size: 6,
                    condition: {'is_read':[0]},
                };
                API.userNotifyList(data).then(res=>{
                    if(res.code){
                        alert(res.message);
                        return;
                    }
                    this.dataList1=res.list

                }).catch(msg => {
                    if(res.code){
                        alert(res.message);
                        return;
                    }
                    alert(msg)
                });

                let data4 = {
                    token: this.token,
                    orderby: {},
                    page: 1,
                    size: 5,
                    condition: {'is_submit':[0]},
                };

                API.userSurveylist(data4).then(res=>{
                    if(res.code){
                        alert(res.message);
                        return;
                    }
                    res.list.forEach(item => {
                        item.range = item.start_time + ' - ' + item.stop_time
                    });

                    this.dataList2=res.list


                }).catch(msg => {
                    if(res.code){
                        alert(res.message);
                        return;
                    }
                    alert(msg)
                })
                let data2={
                    token:this.token
                }

                API.AllNotify(data2).then(res=>{
                    if(res.code){
                        alert(res.message);
                        return;
                    }
                    this.dataList=res.list

                    console.log(this.dataList)

                }).catch(msg => {
                    if(res.code){
                        alert(res.message);
                        return;
                    }
                    alert(msg)
                })


            },
        }
    }
</script>

<style scoped>
    @import "../../assets/css/page/normalLayout.css";

    .alert_list + .alert_list{
        margin-left: 20px;
    }

    .titleDiv{
        /*background-color: #DDF1FF;*/
        padding: 10px 20px;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .titleMsg{
        font-family: 黑体;
        font-size: 20px;
    }
    .showAll{
        font-size: 10px;
        color: #11A0FF;
    }

    .tableTitle{
        font-size: 15px;
        padding: 5px;
        color:gray;

    }
    .tableCell{
        font-size: 15px;
        padding: 5px;
        border: 0;
    }
    .grayLine{
        background-color: #e4efff;
    }
</style>
