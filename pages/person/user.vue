<template>
    <div class="outDiv">
        <cli-title class="titleClass"></cli-title>
        <cli-menu class="menuClass" :pageIndex="pageIndex"></cli-menu>

        <div class="bodyDiv">
            <position :positionName="position.name" :have-back="false" @positionBack="clickBack" style="font-size: 22px"></position>

            <div v-show="subTabIndex === 0">
                <el-tabs type="border-card" style="margin-top: 20px">
                    <el-tab-pane label="修改信息">
                        <div style="margin-top: 15px; margin-left: 50px; width: 100%;" class="display-row">
                            <div class="filelabel row-left" style="margin-top: 5px; width: 100px"><p>账号:</p></div>
                            <div class="titleinput row-right">
                                <el-input v-model="user_info.job_number" disabled></el-input>
                            </div>
                            <div style="color: red; margin-left: 10px; margin-top: 7px; font-size: 22px"><p>*</p></div>
                        </div>

                        <div style="margin-top: 15px; margin-left: 50px;" class="display-row">
                            <div class="filelabel row-left" style="margin-top: 5px; width: 100px"><p>姓名:</p></div>
                            <div class="titleinput row-right">
                                <el-input placeholder="姓名" v-model="user_info.name"></el-input>
                            </div>
                            <div style="color: red; margin-left: 10px; margin-top: 7px; font-size: 22px"><p>*</p></div>
                        </div>

                        <div style="margin-top: 15px; margin-left: 50px;" class="display-row">
                            <div class="filelabel row-left" style="margin-top: 5px; width: 100px"><p>邮箱:</p></div>
                            <div class="titleinput row-right">
                                <el-input placeholder="邮箱" v-model="user_info.email"></el-input>
                            </div>
                            <div style="color: red; margin-left: 10px; margin-top: 7px; font-size: 22px"><p>*</p></div>
                        </div>

                        <div style="margin-top: 15px; margin-left: 50px;" class="display-row">
                            <div class="filelabel row-left" style="margin-top: 5px; width: 100px"><p>联系电话:</p></div>
                            <div class="titleinput row-right">
                                <el-input placeholder="联系电话" v-model="user_info.phone"></el-input>
                            </div>
                        </div>

                        <div v-if="user_type === '2'" style="margin-top: 15px; margin-left: 50px;" class="display-row">
                            <div class="filelabel row-left" style="margin-top: 5px; width: 100px"><p>入职时间:</p></div>
                            <div class="titleinput row-right">
                                <el-input placeholder="入职时间" v-model="user_info.entry_time"></el-input>
                            </div>
                        </div>

                        <div v-if="user_type !== '2'" style="margin-top: 15px; margin-left: 50px;" class="display-row">
                            <div class="filelabel row-left" style="margin-top: 5px; width: 100px"><p>职务:</p></div>
                            <div class="titleinput row-right">
                                <el-select placeholder="职务" v-model="user_info.position_id" style="width: 275px">
                                    <el-option v-for="item in position_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </div>
                        </div>

                        <div v-if="user_type !== '2'" style="margin-top: 15px; margin-left: 50px;" class="display-row">
                            <div class="filelabel row-left" style="margin-top: 5px; width: 100px"><p>单位:</p></div>
                            <div class="titleinput row-right">
                                <el-select placeholder="单位" v-model="user_info.unit_id" style="width: 275px">
                                    <el-option v-for="item in unit_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </div>
                        </div>

                        <a style="margin-left: 50px" href="http://multi-file.tc4ldl.com/keyan/upload/setting/2019/11/041572851031/科研系统使用说明（用户）.pdf">用户手册</a>
                        <el-button size="mid" type="primary" style="margin-left: 100px; margin-top: 30px" @click="getUpdateInfo()">确认修改</el-button>

                    </el-tab-pane>
                    <el-tab-pane label="修改密码">
                        <div style="margin-top: 15px; margin-left: 50px; width: 100%;" class="display-row">
                            <div class="filelabel row-left" style="margin-top: 5px;width: 100px;"><p>原始密码:</p></div>
                            <div class="titleinput row-right">
                                <label>
                                    <el-input placeholder="原始密码" v-model="password"></el-input>
                                </label>
                            </div>
                            <div style="color: red; margin-left: 10px; margin-top: 7px; font-size: 22px"><p>*</p></div>
                        </div>

                        <div style="margin-top: 15px; margin-left: 50px;" class="display-row">
                            <div class="filelabel row-left" style="margin-top: 5px;width: 100px;"><p>新密码:</p></div>
                            <div class="titleinput row-right">
                                <label>
                                    <el-input placeholder="新密码" v-model="asset_pw"></el-input>
                                </label>
                            </div>
                        </div>

                        <div style="margin-top: 15px; margin-left: 50px;" class="display-row">
                            <div class="filelabel row-left" style="margin-top: 5px;width: 100px;"><p>重复新密码:</p></div>
                            <div class="titleinput row-right">
                                <label>
                                    <el-input placeholder="重复新密码" v-model="again_pw"></el-input>
                                </label>
                            </div>
                        </div>

                        <el-button size="mid" type="primary" style="margin-left: 200px; margin-top: 30px" @click="getNewPassword()">重置密码</el-button>

                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>


    </div>
</template>

<script>
    import CliTitle from "../../components/base/cliTitle";
    import CliMenu from "../../components/base/cliMenu";
    import Position from "../../components/base/position";
    import Cli_sub_title from "../../components/base/cli_sub_title";
    import Notify_edit from "../../components/notify/notify_edit";
    import DataEdit from "../../components/message/message_edit";
    import Read_list from "../../components/message/unread_list";

    import API from "../../api"
    import Cookies from "js-cookie";

    export default {
        name: "admin_detail",
        components: { Read_list, DataEdit, Notify_edit, Cli_sub_title, Position, CliMenu, CliTitle},
        data(){
            return {
                position: {
                    name: '个人设置区',
                    haveBack: true,
                },

                pageIndex: "7",
                user_info: {},
                position_list: {},
                unit_list: {},
                password: '',
                asset_pw: '',
                again_pw: '',
                subTabIndex: 0,

                user_type: Cookies.get('type'),
            }
        },

        mounted() {
            this.getOriginalInfo();
            this.getPositionolist();
            this.getUnitlist();
            console.log(this.user_info.position_id);
            console.log(this.user_info.unit_id)
        },

        methods:{
            // 切换子标题
            changeTab(msg) {
                this.subTabIndex = msg.paperClaim;
            },
            // 点击返回按钮
            clickBack(){
                alert('返回')
            },

            getOriginalInfo(){
                let data ={
                    token: this.token,
                }
                API.Getinfo(data).then(res => {
                    if(res.code){
                        alert(res.message);
                        return;
                    }

                    this.user_info = res.user_info;
                    console.log(res);
                }).catch(msg => {
                    if(res.code){
                        alert(res.message);
                        return;
                    }
                    alert(msg)
                })
            },

            getUpdateInfo() {

                if (this.user_info.name === '') {
                    alert("请填写姓名");
                    return;
                } else if (this.user_info.email === '') {
                    alert('请填写邮箱');
                    return;
                }

                let data ={
                    token: this.token,
                    name: this.user_info.name,
                    unit_id: this.user_info.unit_id,
                    entry_time: this.user_info.entry_time,
                    job: this.user_info.job,
                    position_id: this.user_info.positionInfo.id,
                    phone: this.user_info.phone,
                    email: this.user_info.email,
                }

                API.Updateinfo(data).then(res =>{
                    if(res.code){
                        alert(res.message);
                        return;
                    }

                    alert('修改成功！');

                }).catch(msg => {
                    if(res.code){
                        alert(res.message);
                        return;
                    }
                    alert(msg)
                })
            },

            getNewPassword() {
                let data ={
                    token: this.token,
                    password: this.password,
                    asset_pw: this.asset_pw,
                    again_pw: this.again_pw,
                }

                API.Changepw(data).then(res =>{
                    if(res.code){
                        alert(res.message);
                        return;
                    }

                    alert('修改成功！');

                }).catch(msg => {
                    if(res.code){
                        alert(res.message);
                        return;
                    }
                    alert(msg)
                })
            },

            getPositionolist() {
                let data={
                    token: this.token,
                }

                API.getPositionList(data).then(res =>{
                    if(res.code){
                        alert(res.message);
                        return;
                    }

                    this.position_list=res.position_list;
                }).catch(msg => {
                    if(res.code){
                        alert(res.message);
                        return;
                    }
                    alert(msg)
                })
            },

            getUnitlist() {
                let data={
                    token:this.token,
                }

                API.getUnitList(data).then(res =>{
                    if(res.code){
                        alert(res.message);
                        return;
                    }

                    this.unit_list=res.unit_list;
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

    .display-row {
        display: -webkit-flex; /* Safari */
        -webkit-justify-content: flex-start; /* Safari 6.1+ */
        display: flex;
        justify-content: flex-start;
        width: 100%;
    }

    .row-left {
        width: 6%;
    }

    .row-right{
        width: 20%;
    }
</style>
