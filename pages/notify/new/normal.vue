<template>
    <div class="outdiv">
        <cli-title class="titleClass" ></cli-title>
        <cli-menu class="menuClass" :pageIndex="pageIndex" ></cli-menu>
        <div class="bodyDiv" v-if="ifshow">
            <position :positionName="position.name" :have-back="position.haveBack" @positionBack="clickBack"></position>
            <el-card shadow="hover" :body-style="{ padding: '0px' }" style="margin-top: 10px; margin-bottom: 70px">
                <notify_edit :edittype="edittype"  :infoid="notifyId" style="width: 100%"> </notify_edit>
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

    export default {
        name: "edit_notify",
        //编辑
        components: {Position,cliTitle, cliMenu, notify_edit},

        data(){
            return{
                pageIndex: "2",
                token: Cookies.get('token'),
                position: {
                    name: '通知 >> 新增通知',
                    haveBack: true,
                },
                ifshow:false,
                /**
                 *  3   问卷征集
                 *  2   修改通知
                 *  1   新建通知
                 */
                edittype:1,
                notifyId:''
            }
        },
        mounted:function () {
            // this.notifyId = this.$route.params.notifyId
            // if (Number.parseInt(Cookies.get("type")) === 1){
            this.ifshow = true
            // }
        },
        methods:{
            clickBack(){
                this.$router.push({path: `/notify`})
            },
        }


    }
</script>

<style scoped>
    @import "../../../assets/css/page/normalLayout.css";

</style>
