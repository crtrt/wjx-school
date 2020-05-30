<template>
    <div class="outDiv">
        <cli-title class="titleClass"></cli-title>
        <cli-menu class="menuClass" :pageIndex="pageIndex"></cli-menu>

        <div class="bodyDiv">
            <position :positionName="position1.name1"
                      :have-back="position1.haveBack"
                      :rightName="position1.name2"
                      @positionBack="click1"
                      style="font-size:22px"
            ></position>
            <notify_list_table :showType="showType" style="width: 100%; margin-top: 20px;margin-bottom: 30px"> </notify_list_table>

            <div>

                <div class="body2">
                    <position :positionName="position2.name1"
                              :have-back="position2.haveBack"
                              :rightName="position2.name2"
                              @positionBack="click2"
                              style="font-size:22px"
                    ></position>
                    <list :roleType="roleType" style="width: 100%; margin-top: 20px;margin-bottom: 30px"></list>
                </div>

           <!--     <div class="body2">
                    <position :positionName="position3.name1"
                              :have-back="position3.haveBack"
                              :rightName="position3.name2"
                              @positionBack="click3"></position>
                    <list></list>
                </div>-->
            </div>
        </div>


    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import List from "../../components/message/list";
    import CliTitle from "../../components/base/cliTitle";
    import CliMenu from "../../components/base/cliMenu";
    import Position from "../../components/base/position";
    import DataEdit from "../../components/message/message_edit";
    import Message_detail from "../../components/message/message_detail";
    import Notify_list_table from "../../components/notify/notify_list_table";
    export default {
        name: "admin",
        components: {Notify_list_table, Message_detail, DataEdit, Position, CliMenu, CliTitle,List},

        data(){
            return{
                pageIndex: "1",
                position1: {
                    name1: '通知',
                    name2: '更多',
                    haveBack: true,

                },
                position2: {
                    name1: '问卷收集',
                    name2: '更多',
                    haveBack: true,

                },


                viewType: false,
                showType:2,
                roleType: Cookies.get('type')
            };
        },

        methods:{
            // 点击返回按钮

            click1(){
                this.$router.push({path: `/notify`})
            },
            click2(){
                this.$router.push({path: `/message`})
            }
            // click3(){
            //     this.$router.push({path: `/project`})
            // }
        }

    }
</script>

<style scoped>
    @import "../../assets/css/page/normalLayout.css";
</style>
