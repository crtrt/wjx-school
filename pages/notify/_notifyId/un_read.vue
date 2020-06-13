<template>
    <div class="outdiv">
        <cli-title class="titleClass" ></cli-title>
        <cli-menu class="menuClass" :pageIndex="pageIndex" ></cli-menu>
        <div class="bodyDiv" v-if="ifshow">
            <position :positionName="position.name" :have-back="position.haveBack" @positionBack="clickBack" style="font-size:22px"></position>
            <div shadow="hover" :body-style="{ padding: '0px' }" style="width: 100%">
                <el-tabs type="border-card" style="margin-top: 20px">
                    <el-tab-pane label="已读名单">
                        <div v-if="isShow" style=" width: 100%; padding-left: 10px; padding-top: 20px; padding-bottom:15px; padding-right: 10px">
                            <table align="center" border="0" class="listtable" cellspacing="0" cellpadding="0" style="width:100%;">
                                <tbody>
                                <tr align="center" style="background-color: #f0f1f2; font-size: 5px; font-family: '微软雅黑'">
                                    <th style="min-width: 50px">
                                        <input type="checkbox" :key="'checkallpro'" :id="'checkallpro'" @change="changeAllChecked" v-model="checkall" style="cursor:pointer">
                                    </th>
                                    <th style="min-width: 50px">序号</th>
                                    <th style="min-width: 90px">姓名</th>
                                    <th style="min-width: 90px">学院</th>
                                    <th style="min-width: 90px">联系方式</th>
                                    <th style="min-width: 90px">邮箱</th>
                                </tr>
                                <tr v-if="readlist.length > 0" v-for="(item,index) in readlist" :key="index + 'ro'" align="center" v-bind:class="{ 'gray-line': (index%2 === 1) }" >
                                    <td>
                                        <input type="checkbox" :key="index + 'pro'" :id="index+ 'pro'" :value="item.user_id" v-model="checkedids" style="cursor:pointer">
                                    </td>
                                    <td>{{index+1}}</td>
                                    <td>{{item.name}}</td>
                                    <td>{{item.unitInfo.name}}</td>
                                    <td>{{item.phone}}</td>
                                    <td>{{item.email}}</td>
<!--                                    <td>{{item.entry_time}}年</td>-->
<!--                                    <td>{{item.positionInfo.name}}</td>-->
<!--                                    <td>{{item.jobtitleInfo.name}}</td>-->
                                </tr>

                                </tbody>
                            </table>

                            <div v-if="!inMain" class="pagePosition">
                                <el-pagination
                                        @current-change=currentChange
                                        :current-page.sync=currentPage
                                        :page-size="pageSize"
                                        layout="prev, pager, next, jumper"
                                        :total=total
                                        style="margin-right: 40px">
                                </el-pagination>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="未读名单">
                        <div v-if="isShow" style=" width: 100%; padding-left: 10px; padding-top: 20px; padding-bottom:15px; padding-right: 10px">
                            <table align="center" border="0" class="listtable" cellspacing="0" cellpadding="0" style="width:100%;">
                                <tbody>
                                <tr align="center" style="background-color: #f0f1f2; font-size: 5px; font-family: '微软雅黑'">
                                    <th style="min-width: 50px">
                                        <input type="checkbox" :key="'checkallpro'" :id="'checkallpro'" @change="changeAllChecked" v-model="checkall" style="cursor:pointer">
                                    </th>
                                    <th style="min-width: 50px">序号</th>
                                    <th style="min-width: 90px">姓名</th>
                                    <th style="min-width: 90px">学院</th>
                                    <th style="min-width: 90px">联系方式</th>
                                    <th style="min-width: 90px">邮箱</th>
                                </tr>
                                <tr v-if="unlist.length > 0" v-for="(item,index) in unlist" :key="index + 'ro'" align="center" v-bind:class="{ 'gray-line': (index%2 === 1) }" >
                                    <td>
                                        <input type="checkbox" :key="index + 'pro'" :id="index+ 'pro'" :value="item.user_id" v-model="checkedids" style="cursor:pointer">
                                    </td>
                                    <td>{{index+1}}</td>
                                    <td>{{item.name}}</td>
                                    <td>{{item.unitInfo.name}}</td>
                                    <td>{{item.phone}}</td>
                                    <td>{{item.email}}</td>
<!--                                    <td>{{item.entry_time}}年</td>-->
<!--                                    <td>{{item.positionInfo.name}}</td>-->
<!--                                    <td>{{item.jobtitleInfo.name}}</td>-->
                                </tr>

                                </tbody>
                            </table>

                            <div v-if="!inMain" class="pagePosition">
                                <el-pagination
                                        @current-change=currentChange
                                        :current-page.sync=currentPage
                                        :page-size="pageSize"
                                        layout="prev, pager, next, jumper"
                                        :total=total
                                        style="margin-right: 40px">
                                </el-pagination>

                                <div style="display: flex; flex-direction: row-reverse">
<!--                                    <el-row style="text-align: right">-->
                                        <!-- <el-button type="primary"  @click="exportlist" size="mini">名单导出</el-button>-->
                                        <el-button class="bottomButton" type="primary" size="mini" @click="notifyByEmail" v-loading.fullscreen.lock="fullscreenLoading">邮件提醒</el-button>
<!--                                        <el-button class="bottomButton" type="primary" size="mini" @click="notifyByMessage">短信提醒</el-button>-->
                                        <notify_btn :is_message="0" :create_time="create_time" :name="name" class="bottomButton">生成消息提醒</notify_btn>
<!--                                    </el-row>-->
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>

    </div>
</template>

<script>
    import cliTitle from '~/components/base/cliTitle.vue'
    import cliMenu from '~/components/base/cliMenu.vue'
    import Cookies from 'js-cookie'
    import API from '../../../api'
    import Position from "../../../components/base/position";
    import notify_btn from "../../../components/notify/notify_btn";
    export default {
        name: "un_read_list",

        components: {Position, cliTitle, cliMenu,notify_btn},

        data(){
            return{
                /**
                 * 3是
                 * 2是
                 * 1是
                 * **/
                roleType:3,
                pageIndex:"2",
                token: Cookies.get('token'),
                inMain:false,
                total:0,
                pageSize:10,
                currentPage:1,
                showtime:'',
                unlist:[],
                readlist:[],
                jobList:[],
                id:-1,
                checkedids:[],
                checkall:'',
                fullscreenLoading:false,
                ifshow:false,
                notify_id:'',//通知id
                unit_id:'',
                position: {
                    name: '通知公告 >> 阅读名单',
                    haveBack: true,
                },
                isShow:false,
                create_time: '',
                name: '',
            }
        },
        mounted:function () {
            if (Number.parseInt(Cookies.get("type")) === 0){
                this.ifshow = true
                this.notify_id = this.$route.params.notifyId
                this.getReadList(this.notify_id);
                this.getTime()
            } else {
                this.ifshow = false
                alert('暂无此页面权限！')
            }

        },
        methods:{
            getTime(){

                let data={
                    token: this.token,
                    query_id: this.notify_id,
                }

                API.readNotify(data).then(res=>{
                    if(res.code){
                        alert(res.message);
                        return;
                    }

                    this.create_time = res.create_time;
                    this.name = res.title;

                }).catch(msg => {
                    alert('操作失败')
                })
            },

            currentChange(val){
                this.currentPage = val;
            },

            clickBack(){
                this.$router.push({path: `/notify`})
            },

            getReadList(id){
                this.inMain = this.$route.path === '/main/admin';
                let data = {
                    token: this.token,
                    query_id:id,

                }
                API.ReadDetailList(data).then(res => {
                    if(res.code === 300105){
                        alert('操作无权限！')
                        return res
                    }
                    this.unlist = res.userUnReadList;
                    this.readlist=res.userReadList;

                    this.isShow = true;
                    return res
                }).catch(msg => {
                    alert('操作失败')
                })
            },
            /**
             * 实现全选
             * */
            changeAllChecked() {
                console.log('change')
                if (this.checkall === true) {

                    this.checkedids = []
                    var i =0
                    this.unlist.forEach(item=>{
                        this.checkedids.push(item.user_id)
                        i++
                    })
                } else {
                    this.checkedids = []
                }
            },
            exportlist(){
               // window.open(PRO.baseURL+'notify/main/export-unread-list?id=' + this.id+'&token='+this.token)
            },
            /**
             * 短信提醒
             * */
            notifyByMessage(){
                this.fullscreenLoading = true;
                let data={
                    token:this.token,
                    query_id:this.notify_id,
                    user_ids:this.checkedids,
                }
                API.notifyUnreadByMessage(data).then(res=>{
                    this.fullscreenLoading = false;

                    if(res.code){
                        alert(res.message);
                        return;
                    }

                    alert('短信发送成功！');

                }).catch(msg => {
                    alert('操作失败')
                })
            },
            /**
             * 邮箱提醒
             * */
            notifyByEmail(){
                this.fullscreenLoading = true;
                let data={
                    token:this.token,
                    query_id:this.notify_id,
                    user_ids:this.checkedids,
                }
                API.notifyUnreadByEmail(data).then(res=>{
                    this.fullscreenLoading = false;

                    if(res.code){
                        alert(res.message);
                        return;
                    }

                    alert('邮件发送成功！');

                    return res;
                }).catch(msg => {
                    alert('操作失败')
                })
            }

        }


    }
</script>

<style scoped>

    @import "../../../assets/css/page/normalLayout.css";

    .bottomButton{
        margin-right: 10px;
        min-width: 80px;
    }

    .titleDiv{
        background-color: #DDF1FF;
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
        display: table-cell;
        font-size: 15px;
        padding: 10px;
        font-family: 黑体;
        font-weight: bold;

    }

    .listtable {
        border-color: grey;
        border-spacing: 0;
        font-family: 黑体;
    }

    .listtable tr th {
        border-bottom: 1px solid #ebeef5;
        font-weight: bold;
        color: #909399;
        font-weight: 500;
        font-size: 16px;
        padding: 16px 0;
    }
    .gray-line {
        background-color: #f0f1f2;
    }
    .listtable tr td {
        border-bottom: 1px solid #ebeef5;
        font-size: 16px;
        color: #606266;
        padding: 6px 0;
        -webkit-transition: background-color .4s ease;
        transition: background-color .4s ease;
    }
    /***高亮显示*/
    .listtable tr:hover {
        background-color: rgba(75, 163, 165, 0.11);
    }
    .listtable tr{
        cursor:pointer
    }

    .morecli p{
        color: #4ba3a5;
        cursor:pointer
    }
    .morecli:hover{
        color: rgba(75, 163, 165, 0.22);
    }
    .pagePosition{
        display: flex;
        float: right;
        align-items: center;
        justify-content: space-between;
        margin-left: 5%;
        padding-bottom: 15px;
        padding-top: 10px
    }
</style>
