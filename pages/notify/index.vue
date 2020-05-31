<template>
    <div class="outdiv">
        <cli-title class="titleClass" ></cli-title>
        <cli-menu class="menuClass" :pageIndex="pageIndex" ></cli-menu>
        <div class="bodyDiv" v-if="ifshow">
            <position :positionName="position.name" :have-back="position.haveBack" @positionBack="clickBack" style="font-size:22px"></position>
            <notifyTable :showType="showType" style="width: 100%"> </notifyTable>
        </div>

    </div>
</template>

<script>
    import cliTitle from '~/components/base/cliTitle.vue'
    import cliMenu from '~/components/base/cliMenu.vue'
    import notifyTable from '~/components/notify/notify_list_table.vue'
    import Cookies from 'js-cookie'
    import API from '../../api'
    import Position from "../../components/base/position";


    export default {
        name: "notify_list",
        //通知列表
        components: {Position, cliTitle, cliMenu, notifyTable},
        data(){
            return{
                pageIndex: "2",
                token: Cookies.get('token'),
                ifshow:false,
                /**
                 *
                 *  2   校级通知列表
                 *  1   普通通知列表
                 */
                showType:2,
                position: {
                    name: '通知公告栏',
                    haveBack: false,

                },
            }
        },
        mounted:function () {
            // if (Number.parseInt(Cookies.get("type")) === 1){
            //     this.showType = 2
            //
            // } else {
            //     this.showType = 1
            // }
            this.ifshow = true
        },
        methods:{
            clickBack(){
                this.$router.push({path: `/main/admin`})
            },
        }


    }
</script>

<style scoped>
    @import "../../assets/css/page/normalLayout.css";
</style>





