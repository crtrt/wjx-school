<template>
    <div class="outdiv">
        <cli-title class="titleClass" ></cli-title>
        <cli-menu class="menuClass" :pageIndex="pageIndex" ></cli-menu>
        <div class="bodyDiv" v-if="ifshow">
            <position :positionName="position.name" :have-back="position.haveBack" @positionBack="clickBack" style="font-size:22px"></position>
            <el-card shadow="hover" :body-style="{ padding: '0px' }" style="margin-top: 30px; margin-bottom: 70px">
            <notify_edit_disable :notitype="notitype"  :infoid="notifyId" style="width: 100%"> </notify_edit_disable>
            </el-card>
        </div>

    </div>
</template>

<script>
    import cliTitle from '~/components/base/cliTitle.vue'
    import cliMenu from '~/components/base/cliMenu.vue'
    import notify_edit_disable from '~/components/notify/notify_edit_disable.vue'
    import Position from "~/components/base/position";
    import Cookies from 'js-cookie'

    import API from '../../../api'

    export default {
        name: "detail_notify",
        //详情
        components: {Position,cliTitle, cliMenu, notify_edit_disable},

        data(){
            return{
                pageIndex: "2",
                token: Cookies.get('token'),
                ifshow:false,
                /**
                 *  2   基本信息
                 *  1   通知
                 */
                notitype:1,
                notifyId:'',
                position: {
                    name: '通知 >> 通知详情',
                    haveBack: true,
                },
            }
        },

        mounted:function () {
            this.notifyId = this.$route.params.notifyId;
            console.log("diyige"+this.notifyId)
            this.ifshow = true;
        },

        methods: {
            clickBack () {
                this.$router.push({path: '/notify' })
            }
        }
    }
</script>

<style scoped>
    @import "../../../assets/css/page/normalLayout.css";

</style>
