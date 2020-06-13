<template>
    <div class="outDiv">
        <cli-title class="titleClass"></cli-title>
        <cli-menu class="menuClass"></cli-menu>

        <div class="bodyDiv" style="">
            <position :positionName="position.name" :have-back="position.haveBack" @positionBack="clickBack"></position>

            <cli_sub_title :tabList="subTabs" :selectIndex="subTabIndex" style="margin-top: 20px" ></cli_sub_title>

            <el-card style="margin-top: 20px">
                <notify_edit_disable :notitype="notifyType" ref="notifyCom"></notify_edit_disable>
            </el-card>

            <el-card style="margin-top: 20px;">
<!--                <div style="display: flex; margin-top: 20px; margin-left: 20px;">-->
<!--                    <p class="beizhu" style="color: #920000;">备注:</p>-->
<!--                    <p class="beizhu">-->
<!--                        <span v-if="review_status === 0" style="color: #920000">(尚未通过审核)</span>-->
<!--                        <span v-if="review_status === 1" style="color: #2ccd8d">(通过审核)</span>-->
<!--                        {{beizhu}}-->
<!--                    </p>-->
<!--                </div>-->
                <Message_detail :isView="readMessage" ref="zhengjiCom"></Message_detail>
            </el-card>

            <div v-if="!readMessage" style="display: flex; margin-top: 20px; flex-direction: row-reverse; margin-bottom: 30px">
                <el-button size="mini" type="primary" style="margin-left: 20px" @click="submit(0)">提交问卷</el-button>
                <el-button size="mini" type="primary" @click="submit(1)">暂存问卷</el-button>
            </div>


        </div>
    </div>
</template>

<script>
    import CliTitle from "../../../components/base/cliTitle";
    import CliMenu from "../../../components/base/cliMenu";
    import Position from "../../../components/base/position";
    import Cli_sub_title from "../../../components/base/cli_sub_title";
    import Message_detail from "../../../components/message/message_detail";
    import Notify_edit_disable from "../../../components/notify/notify_edit_disable";
    import Cookies from 'js-cookie'
    import API from '../../../api'
    export default {
        name: "user_detail",
        components: {Notify_edit_disable, Message_detail, Cli_sub_title, Position, CliMenu, CliTitle,},
        data(){
            return{
                messageId:-1,

                // 如果是true， 则表示已经填写完成，只是查看详情，防止填写
                readMessage: false,
                notifyId: -1,

                subTabs: ['问卷填写'],
                subTabIndex: 0,

                position: {
                    name: '问卷 >> 问卷详情',
                    haveBack: true,
                },
                notifyType: 3,
                token: Cookies.get('token'),
                beizhu:'无',
                review_status:2,
            }
        },
        created() {
            this.messageId = this.$route.params.messageId;
            this.getUserDetail();
        },
        methods:{


            // 点击返回按钮
            clickBack(){
                this.$router.push({path: '/message'})
            },

            getUserDetail(){
                let data={
                    token: this.token,
                    survey_id: this.messageId,
                };
                API.getUserZhengjiDetail(data).then(res=>{
                    if(res.code){
                        alert(res.message);
                        return;
                    }
                    // this.position.name += res.answer_info.name;
                    this.beizhu = res.answer_info.beizhu && res.answer_info.beizhu !== '' ? res.answer_info.beizhu : '无';
                    this.$refs.notifyCom.setData(res.answer_info);
                    res.answer_info.surveyQuestion.forEach(item => {
                        if(item.type === 1){
                            item.answer = {
                                question_id : item.id,
                                type : item.type,
                                content: item.answer_content === null ? "" : item.answer_content,
                            }
                        } else if(item.type === 2) {
                            item.answer = {
                                question_id : item.id,
                                type : item.type,
                                option_id: item.option_id === null ? 0 : item.option_id,
                            }
                        } else if(item.type === 3) {
                            item.answer = {
                                question_id : item.id,
                                type : item.type,
                                option_ids: item.option_ids,
                            }
                        }
                    })
                    this.$refs.zhengjiCom.setQuestion(res.answer_info.surveyQuestion, res.answer_info.answer_attachement);
                    this.review_status = res.answer_info.review_status;
                    // if(res.answer_info.is_submit === 1) {
                    //     this.readMessage = true;
                    // }

                }).catch(msg => {
                    alert('操作失败')
                })
            },

            getDetail(){
                let data={
                    token: this.token,
                    survey_id: this.messageId,
                }

                API.getZhengJiDetail(data).then(res=>{
                    if(res.code){
                        alert(res.message);
                        return;
                    }

                    this.$refs.notifyCom.setData(res.survey_info);
                    this.getTemData(res.survey_info.surveyQuestion)

                }).catch(msg => {
                    alert('操作失败')
                })
            },

            getTemData(qdata){

                let data = {
                    token: this.token,
                    survey_id: this.messageId
                }

                API.getUserTempAnswer(data).then(res => {

                    if(res.answer_info === null){
                        qdata.forEach(item => {
                            if(item.type === 1){
                                item.answer = {
                                    question_id : item.id,
                                    type : item.type,
                                    content: '',
                                }
                            } else if(item.type === 2) {
                                item.answer = {
                                    question_id : item.id,
                                    type : item.type,
                                    option_id: NaN,
                                }
                            } else if(item.type === 3) {
                                item.answer = {
                                    question_id : item.id,
                                    type : item.type,
                                    option_ids: [],
                                }
                            }
                        });

                        this.$refs.zhengjiCom.setQuestion(qdata, []);
                    } else {
                        res.answer_info.surveyQuestion.forEach(item => {
                            if(item.type === 1){
                                item.answer = {
                                    question_id : item.id,
                                    type : item.type,
                                    content: item.answer_content,
                                }
                            } else if(item.type === 2) {
                                item.answer = {
                                    question_id : item.id,
                                    type : item.type,
                                    option_id: item.survey_id,
                                }
                            } else if(item.type === 3) {
                                item.answer = {
                                    question_id : item.id,
                                    type : item.type,
                                    option_ids: item.option_ids,
                                }
                            }
                        })
                        this.$refs.zhengjiCom.setQuestion(res.answer_info.surveyQuestion, []);
                    }

                })

            },

            submit(isTemp){
                let zhengjiData = this.$refs.zhengjiCom.getAnswer();
                let answer = zhengjiData.dataList.map(d => d.answer);

                if(isTemp === 0){
                    let isFull = true;
                    answer.forEach((item, index) => {
                        if(item.type === 1){
                            if(item.content === ''){
                                alert(`第${index + 1}题未填写`)
                                isFull = false;
                            }
                        } else if(item.type === 2) {
                            if(!item.option_id){
                                alert(`第${index + 1}题未填写`)
                                isFull = false;
                            }
                        } else if(item.type === 3) {
                            if(item.option_ids.length === 0){
                                alert(`第${index + 1}题未填写`)
                                isFull = false;
                            }
                        }
                    })
                    if(!isFull){
                        return;
                    }
                }

                let data = {
                    token: this.token,
                    is_temporary: isTemp,
                    survey_id: this.messageId,
                    attachment_url: zhengjiData.attachment,
                    answer: answer,
                }

                API.submitZhengjiAnswer(data).then(res=>{
                    if(res.code){
                        alert(res.message);
                        return;
                    }

                    if(isTemp){
                        alert('暂存成功')
                    }else {
                        alert("提交成功")
                    }

                    if(isTemp === 0){
                        this.readMessage = true;
                    }
                    if(!isTemp){
                        this.readMessage = true;
                    }

                }).catch(msg => {
                    alert('操作失败')
                })

            },
        }

    }
</script>

<style scoped>
    @import "../../../assets/css/page/normalLayout.css";

    .beizhu {
        line-height: 30px;
        max-lines: 1;
        font-size: 16px;
        text-align: center;
    }
</style>
