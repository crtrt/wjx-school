<template>
    <div>
        <el-button size="mini" type="primary" style="margin-left: 20px" @click="generateNotify">生成消息提醒</el-button>
        <el-dialog title="消息提醒"
                   :visible.sync="dialogVisible"
                   :modal-append-to-body='false'
                   width="40%">
            <span>{{message}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" v-clipboard:copy="message" @click="dialogVisible = false">复 制</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import Cookie from "js-cookie";
    import VueClipboard from 'vue-clipboard2'
    import Vue from "vue"
    import API from "../../api/API_PRO";
    Vue.use(VueClipboard);

    export default {
        name: "notify_btn",
        components: {VueClipboard},
        props:{
            /**
             * is_message == 1 征集
             * is_message == 0 通知
             */
            is_message: {
                type: Number
            },

            create_time: {
                type: String
            },

            name: {
                type: String
            }
        },
        data(){
            return{
                token:Cookie.get('token'),
                message:'',
                dialogVisible:false,
            }
        },
        methods: {
            /**
             * 生成消息提醒
             * */
            generateNotify(){
                this.dialogVisible = true;
                if (this.is_message === 1){
                    this.message = "同学您好！请您及时登录校园问卷管理系统" +
                        // API.qianduanURL +
                        "，查阅老师于" +
                        this.create_time +
                        "发布的问卷《" +
                        this.name.split('/')[0] +
                        "》，并填写问卷，感谢您的支持！";
                }else if (this.is_message === 0){
                    this.message = "同学您好！请您及时登录校园问卷管理系统" +
                        // API.qianduanURL +
                        "，查阅老师于" +
                        this.create_time +
                        "发布的通知《" +
                        this.name.split('/')[0]  +
                        "》，并按通知要求开展相关工作，感谢您的支持！";
                }

            },

        },
    }
</script>

<style scoped>

</style>
