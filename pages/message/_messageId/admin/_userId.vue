<template>
    <div class="outDiv">
        <cli-title class="titleClass"></cli-title>
        <cli-menu class="menuClass"></cli-menu>

        <div class="bodyDiv">
            <position :positionName="position.name" :have-back="position.haveBack" @positionBack="clickBack"></position>

            <cli_sub_title :tabList="subTabs" :selectIndex="subTabIndex" style="margin-top: 20px"></cli_sub_title>

            <el-card style="margin-top: 20px;">
                <Message_detail :isView="readMessage"></Message_detail>
            </el-card>

            <div v-if="!readMessage" style="display: flex; margin-top: 20px; flex-direction: row-reverse">
                <el-button size="mini" type="primary" style="margin-left: 20px">提交问卷</el-button>
                <el-button size="mini" type="primary">暂存问卷</el-button>
            </div>


        </div>
        <cli-footer style="position: absolute; bottom: 0;"></cli-footer>
    </div>
</template>

<script>
    import CliTitle from "../../../../components/base/cliTitle";
    import CliMenu from "../../../../components/base/cliMenu";
    import Position from "../../../../components/base/position";
    import Cli_sub_title from "../../../../components/base/cli_sub_title";
    import Message_detail from "../../../../components/message/message_detail";
    import Notify_edit_disable from "../../../../components/notify/notify_edit_disable";
    import CliFooter from "../../../../components/base/cliFooter";
    export default {
        name: "user_detail",
        components: {Notify_edit_disable, Message_detail, Cli_sub_title, Position, CliMenu, CliTitle,CliFooter},
        data(){
            return{
                messageId:-1,
                userId:-1,

                // 如果是true， 则表示已经填写完成，只是查看详情，防止填写
                readMessage: true,
                notifyId: -1,

                subTabs: ['问卷详情'],
                subTabIndex: 0,

                position: {
                    name: '问卷 >> xxx问卷 >> xxx',
                    haveBack: true,
                },
            }
        },
        created() {
            this.messageId = this.$route.params.messageId;
            this.userId = this.$route.params.userId;
            console.log(this.userId)
        },
        methods:{


            // 点击返回按钮
            clickBack(){
                this.$router.push({path: `/message/${this.messageId}/admin_detail`})
            }

        }

    }
</script>

<style scoped>
    @import "../../../../assets/css/page/normalLayout.css";
</style>
