<template>
    <el-card shadow="hover" :body-style="{ padding: '0px' }">
        <div  style="display: table; width: 100%; padding-left: 10px; padding-top: 20px; padding-bottom:15px; padding-right: 10px">
            <div style="display: table-row">
                <div class="tableTitle" style="width: 5%; text-align: center;padding-left: 10px">
                    #
                </div>
                <div class="tableTitle" style="text-align: center;width: 30%">
                    名称
                </div>
                <div class="tableTitle" style="width: 20%; text-align: center" v-if="type==='0'">
                    完成度
                </div>
                <div class="tableTitle" style=" text-align: center">
                    发布时间
                </div>
                <div class="tableTitle" v-if="type==='0'&&!inMain">
                </div>
                <div class="tableTitle" v-if="type==='0'&&!inMain">
                </div>
                <div class="tableTitle">
                </div>
                <div class="tableTitle" v-if="type==='0'&&!inMain">
                </div>
            </div>
            <div :class="{'tablerow':true, 'grayLine': (index % 2 === 0)}" style="display: table-row;" v-if="item.title.split('/')[1] === accountinfo&&notifyList.length > 0" v-for="(item,index) in notifyList" :key="item.id">
                <div class="tableCell" style="text-align: center">
                    ·
                </div>
                <div class="tableCell" style="text-align: center;width: 30%">
                    {{item.title.split('/')[0]}}
                </div>
                <div class="tableCell" style="width: 20%; text-align: center" v-if="type==='0'">
                    <el-progress :text-inside="true" :stroke-width="26" :percentage="item.percentage" :color="percentageColor"></el-progress>
                </div>
                <div class="tableCell" style="text-align: center">
                    {{item.update_time}}
                </div>
                <div class="tableCell" style="width: 60px" v-if="type==='0'&&!inMain">
                    <el-button type="primary" size="mini" @click="editnotify(item)" v-show="item.type===1">编辑</el-button>
                </div>
                <div class="tableCell" style="width: 60px" v-if="type==='0'&&!inMain">
                    <el-button type="primary" size="mini" @click="deleteNotifyList(item)">删除</el-button>
                </div>
                <div class="tableCell" style="width: 60px" v-if="!inMain">
                    <el-button type="primary" size="mini" @click="readNotify(item)">详情</el-button>
                </div>
                <div class="tableCell" style="width: 60px;position:center;" v-if="type==='0'">
                    <el-button type="primary" size="mini" @click="toUnRead(item)">{{item.unread_num}}人未读</el-button>
                </div>
            </div>
        </div>
        <div v-if="!inMain" class="paginaClass">
            <el-pagination
                    @current-change=currentChange
                    :current-page.sync=currentPage
                    :page-size="size"
                    layout="prev, pager, next, jumper"
                    :total=total
                    style="margin-right: 40px">
            </el-pagination>

            <div style="padding-right: 15px" v-if="type==='0'">
                <el-button type="primary" size="mini" @click="toNewNormalNotify">新建通知</el-button>
            </div>
        </div>

    </el-card>
</template>

<script>
    import Cookies from 'js-cookie'
    import API from '../../api'

    export default {
        name: "notify_list_table",//通知列表组件

        props:{

            showType:{
                type:Number
            }
        },

        data(){
            return{
                accountinfo:0,
                inMain: false,
                total:0,
                currentPage:1,
                size:30,
                token: Cookies.get('token'),
                type:Cookies.get('type'),
                notifyList: {},
                percentageList: {},
                percentageColor:'#409eff',
            }
        },

        mounted:function(){
            this.getNotifyList();

            let ourinfo = Cookies.get('info')
            let sndinfo = ourinfo.split(',')[1]
            this.accountinfo = sndinfo.split(':')[1]

        },

        computed: {

        },

        methods:{
            currentChange(val){
                this.currentPage = val;
                this.getNotifyList();
            },
            /**
             * 获取通知列表
             * */
            getNotifyList(){
                // 判断是否在首页
                this.inMain = this.$route.path === '/main/admin';
                if (this.inMain) {
                    let data = {
                        token: this.token,
                        page: 1,
                        size: 5
                    };
                    API.notifylist(data).then(res => {
                        this.notifyList = res.list;
                        this.total = res.count;
                        this.calPercentage();
                        return res
                    }).catch(msg => {
                        alert('操作失败')
                    })
                } else {
                    let data ={
                        token: this.token,
                        page: this.currentPage,
                        size: this.size,
                    };

                    if(this.type == 0)
                    {
                    API.notifylist(data).then(res => {
                        this.notifyList = res.list;
                        this.total = res.count;
                        this.calPercentage();
                        return res
                    }).catch(msg => {
                        alert('操作失败')
                    })
                    }else{
                        console.log(data);
                        API.userNotifyList(data).then(res => {
                            this.notifyList = res.list;
                            this.total = res.count;
                            this.calPercentage();
                            return res
                        }).catch(msg => {
                            alert('操作失败')
                        })

                    }
                }
            },
            /**
             * 计算完成度
             * */
            calPercentage () {
                this.notifyList.forEach(item => {
                    let per = item.read_num/(item.read_num+item.unread_num)*100;
                    if (isNaN(per)) per = 0;
                    var standper;
                    if (Number.isInteger(per)) {
                        standper = per;
                    } else {
                        standper = per.toFixed(1);
                    }
                    item.percentage = standper;
                })
            },
            /**
             * 未读名单页面
             * */
            toUnRead(item){
                this.$router.push({path: `/notify/`+item.query_id+`/un_read`})
            },
            /**
             * 新增通知
             * */
            toNewNormalNotify(){
                this.$router.push({path: `/notify/new/normal`})
            },
            toNewSpecialNotify(){
                this.$router.push({path: `/notify/new/special`})
            },
            /**
             * 编辑
             * */
            editNotify(item){
                this.$router.push({path: `/notify/`+item.query_id+`/edit`})
            },
            editnotify(item){
            },
            /**
             * 阅读
             * */
            readNotify(item){
                this.$router.push({path: `/notify/`+item.query_id+`/detail`})
            },
            /**
             * 删除
             * */
            deleteNotifyList(item){
                this.$confirm('通知将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    let data={
                        query_id:item.query_id,
                        token:this.token,
                    }

                    API.notifyDelete(data).then(res=>{
                        if(res.code){
                            alert(res.message);
                            return;
                        }

                        alert('删除成功！');

                            this.currentChange(1)
                    }).catch(msg => {
                        if(res.code){
                            alert(res.message);
                            return;
                        }
                        alert(msg)
                    })

                }).catch(() => {
                    alert('已取消删除！');
                });
            },
        }


    }
</script>

<style scoped>
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
        display: table-cell;
        font-size: 15px;
        padding: 5px;
        color:gray;

    }
    .tableCell{
        display: table-cell;
        font-size: 15px;
        padding: 5px;
    }
    .grayLine{
        background-color: #e4efff;
    }

    .outDiv {
        min-width: 1000px;
    }

    .titleClass {
        position: fixed;
        min-width: 1000px;
    }

    .menuClass {
        position: fixed;
        top: 70px;
        width: 150px;
    }

    .bodyDiv {
        position: fixed;
        top: 70px;
        left: 150px;
        width: calc(100% - 150px);
        min-height: calc(100% - 70px);
        padding: 1.5rem 1.5rem 100px;
        background-color: #f4f7fc;
        height: 100%;
        overflow-y: auto;
    }

    .paginaClass{
        display: flex;
        float: right;
        align-items: center;
        justify-content: space-between;
        margin-left: 5%;
        padding-bottom: 15px;
        padding-top: 10px
    }
</style>
