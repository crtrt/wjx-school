<template>
    <div class="outdiv">
    <cli-title class="titleClass" ></cli-title>
    <cli-menu class="menuClass" :pageIndex="pageIndex" ></cli-menu>
    <div class="bodyDiv">
        <position :positionName="position.name" :have-back="position.haveBack" style="font-size:22px"></position>
        <el-card shadow="hover" :body-style="{ padding: '20px' }" style="margin-top: 10px; margin-bottom: 70px">
            <div  style="display: table; width: 100%; padding-left: 20px; padding-top: 20px; padding-bottom:15px; padding-right: 10px">
                <div style="display: table-row">
                    <div class="tableTitle" style="width: 20px">
<!--                        <input type="checkbox" :key="'checkallpro'" :id="'checkallpro'" @change="changeAllChecked" v-model="checkall" style="cursor:pointer">-->
                    </div>
                    <div class="tableTitle" style="width: 40px">
                        序号
                    </div>
                    <div class="tableTitle" style="width:40%">
                        文件名
                    </div>
                    <div class="tableTitle">
                        上传时间
                    </div>
                    <div class="tableTitle" style="text-align: center; width: 150px">
                              操作
                    </div>
                </div>
                <div :class="{'tablerow':true, 'grayLine': (index % 2 === 0)}" style="display: table-row;" v-if="fileList.length > 0" v-for="(item,index) in fileList" :key="item.id">
                    <div class="tableCell">
<!--                        <input class="checkboxClass" type="checkbox" :key="index + 'pro'" :id="index+ 'pro'" :value="item.user_id" v-model="checkedids" style="cursor:pointer">-->
                    </div>
                    <div class="tableCell">
                        {{index + 1}}
                    </div>
                    <div class="tableCell">
                        {{item.url.filename}}
                    </div>
                    <div class="tableCell">
                        {{item.create_time}}
                    </div>
                    <div class="tableCell">
                        <el-button size="mini" type="primary" @click="downloadFile(item.url.url)">下载</el-button>
                        <el-button size="mini" type="primary" @click="deletItem(item.id)">删除</el-button>
                    </div>

                </div>

            </div>

            <el-pagination style="margin-left: 100px ;float: left"
                           @size-change="handleSizeChange"
                           @current-change="handlePageChange"
                           :current-page="pageList.page"
                           :page-sizes="[20, 30, 40, 50]"
                           :page-size="pageList.size"
                           layout="total,sizes, prev, pager, next, jumper"
                           :total="pageList.total">
            </el-pagination>

            <cli-upload v-on:notifyurl="urlget" v-bind:urltype="attachment" style="padding-right: 30px;margin-bottom:10px;float: right"></cli-upload>

        </el-card>

    </div>

    </div>
</template>

<script>
    import cliTitle from '~/components/base/cliTitle.vue'
    import cliMenu from '~/components/base/cliMenu.vue'
    import notify_edit from '~/components/notify/notify_edit.vue'
    import Position from "~/components/base/position";
    import Cookies from 'js-cookie'
    import CliUpload from "../../components/base/cliUpload";
    import API from "../../api";
    import PRO from "../../api/API_PRO";

    export default {
        name: "index",
        components: {CliUpload, Position,cliTitle, cliMenu, notify_edit},
        data() {
            return {
                token: Cookies.get('token'),
                checkedids:[],
                checkall:false,
                attachment:'attachment',
                pageIndex : "9",
                position: {
                    name: '附件存储空间',
                    haveBack: false,

                },
                fileList:[],
                pageList:{
                    page:1,
                    size:20,
                    total:0,
                    orderby:['id'],

                },

            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            //获取列表
            getData(){
                let data={
                    token: this.token,
                    page:this.pageList.page,
                    size: this.pageList.size
                }
                API.listAttachment(data).then(res=>{
                    if(res.code){
                        alert(res.message);
                        return;
                    }
                    else {
                        this.fileList = res.list
                        this.pageList.total = res.count
                    }
                }).catch(msg => {
                    if(res.code){
                        alert(res.message);
                        return;
                    }
                    alert(msg)
                })
            },
            changeAllChecked(){

            },
            handleSizeChange(val){
                this.pageList.size = val
                this.getData()
            },
            handlePageChange(val){
                this.pageList.page =val
                this.getData()

            },
            downloadFile(url){
                window.open(url+"?token="+this.token)
            },
            urlget(notifyurl) {
                console.log(notifyurl)
                let data={
                    token:this.token,
                    url:notifyurl.url
                }
                API.importAttachment(data).then(res=>{
                    if(res.code){
                        alert(res.message);
                        return;
                    }
                    this.getData()
                }).catch(msg => {
                    if(res.code){
                        alert(res.message);
                        return;
                    }
                    alert(msg)
                })
            },
            deletItem(attachment_id){

                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data={
                        token:this.token,
                        attachment_id:attachment_id
                    }
                    API.deleteAttachment(data).then(res=>{
                        if(res.code){
                            alert(res.message);
                            return;
                        }
                        this.getData()
                    }).catch(msg => {
                        if(res.code){
                            alert(res.message);
                            return;
                        }
                        alert(msg)
                    })
                    this.prototype.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            }

        }
    }
</script>

<style scoped>
    @import "../../assets/css/page/normalLayout.css";
    .tableTitle {
        display: table-cell;
        font-size: 18px;
        padding: 5px;
        color:gray;

    }

    .tableCell {
        display: table-cell;
        font-size: 15px;
        padding: 5px;
    }

    .grayLine{
        background-color: #e4efff;
    }


</style>
