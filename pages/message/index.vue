<template>
    <div class="outDiv">
        <cli-title class="titleClass"></cli-title>
        <cli-menu class="menuClass" :pageIndex="pageIndex"></cli-menu>

        <div class="bodyDiv">
            <position :positionName="position.name"></position>
            <list :pageIndex="pageIndex" :roleType="roleType"></list>
        </div>
        <cli-footer style="position: absolute; bottom: 0;"></cli-footer>
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
    import CliFooter from "../../components/base/cliFooter";
    import PaperEdit from "../../components/paper/paper_edit";
    export default {
        name: "add",
        components: {PaperEdit, Message_detail, DataEdit, Position, CliMenu, CliTitle,List,CliFooter},
        data(){
            return{
                pageIndex: "3",
                roleType: Cookies.get('type'),
                position: {
                    name: '信息征集',
                    haveBack: true,

                },
                viewType: false,
            };
        },

        methods:{
            // 点击返回按钮
            clickBack(){
                alert('返回')
            }
        }

    }
</script>

<style scoped>
    @import "../../assets/css/page/normalLayout.css";

</style>
