<template>
  <div id="scrollHid" style="align-items: center; background-color:rgb(244, 249, 255);padding-right: 0;height:1200px;max-height: 1500px;overflow-y:scroll;">

      <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="rgb(222, 242, 253)"
        text-color="rgb(64, 84, 119)"
        active-text-color="rgb(68, 117, 223)"
      >
        <el-menu-item class="menuItem" index="1"  @click=toCLiHomePage  style="padding: 0"  >

          <div v-bind:class="{ 'menuclick': (pageIndex === '1') }"  style="font-family: '黑体'; width:100%;font-size: 16px;"  ><i class="el-icon-menu"></i>首页</div>
        </el-menu-item>
        <el-menu-item class="menuItem" index="2"  @click=toCLiAuditorPage  style="padding: 0; " >
          <div v-bind:class="{ 'menuclick': (pageIndex === '2') }"  style="font-family: '黑体'; width:100%;font-size: 16px"  ><i class="el-icon-bell"></i>通知公告</div>
        </el-menu-item>
        <el-menu-item class="menuItem" index="3"  @click=toCliNoticePage style="padding: 0; ">
          <div v-bind:class="{ 'menuclick': (pageIndex === '3') }"  style="font-family: '黑体'; width:100%;font-size: 16px"  ><i class="el-icon-edit"></i>信息征集</div>
        </el-menu-item>

        <el-menu-item class="menuItem" index="4" @click="toPaperPageHome" style="padding: 0;">
          <div v-bind:class="{ 'menuclick' : (pageIndex === '4') }" style="font-family: '黑体'; width: 100%; font-size: 16px;">
            <i class="el-icon-printer"></i>论文认领</div>
        </el-menu-item>
      <el-menu-item class="menuItem"   index="11" style="padding: 0; " @click="toDatalistPage">
          <div v-bind:class="{ 'menuclick': (pageIndex === '11') }"  style="font-family: '黑体'; width:100%;font-size: 16px"  ><i class="el-icon-edit-outline"></i>数据清单</div>
        </el-menu-item>
        <el-menu-item v-if="type === '0'" class="menuItem"   index="5" style="padding: 0; " @click="toProcessManagementPage">
          <div v-bind:class="{ 'menuclick': (pageIndex === '5') }"  style="font-family: '黑体'; width:100%;font-size: 16px"  ><i class="el-icon-view"></i>用户管理</div>
        </el-menu-item>

        <el-menu-item v-if="type === '1'" class="menuItem" index="6" @click="toPaperPage" style="padding: 0;">
        <div v-bind:class="{ 'menuclick' : (pageIndex === '6') }" style="font-family: '黑体'; width: 100%; font-size: 16px;">
          <i class="el-icon-document"></i>我的论文
        </div>
        </el-menu-item>

        <el-menu-item class="menuItem"   index="7" style="padding: 0; " @click="toSettingPage">
          <div v-bind:class="{ 'menuclick': (pageIndex === '7') }"  style="font-family: '黑体'; width:100%;font-size: 16px"  ><i class="el-icon-setting"></i>个人设置</div>
        </el-menu-item>



        <el-menu-item v-if="type === '0'" class="menuItem"   index="21" style="padding: 0; " @click="toDownloadPage">
          <div v-bind:class="{ 'menuclick': (pageIndex === '21') }"  style="font-family: '黑体'; width:100%;font-size: 16px"  ><i class="el-icon-download"></i>下载任务</div>
        </el-menu-item>

        <el-menu-item class="menuItem"   index="8" style="padding: 0; " @click="logout">
          <div v-bind:class="{ 'menuclick': (pageIndex === '8') }"  style="font-family: '黑体'; width:100%;font-size: 16px"  ><i class="el-icon-d-arrow-left"></i>退出</div>
        </el-menu-item>

      </el-menu>

    <el-dialog
      title="温馨提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>页面正在开发，敬请期待</span>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import Pro from '../../api/API_PRO'
    export default {
        name: "cliMenu",
      props:{
        pageIndex: {
          type: String
        }
      },
      data () {
        return {
          activeIndex: "1",
          name:'',
          isadmin: false,
          centerDialogVisible:false,
          isShowdefMan:false,
          isShowJudge:false,
          id:'',

          /**
           *  '0': 管理员
           *  '1'：普通用户
           * */
          type: Cookies.get('type'),
        }
      },
      mounted:function () {
        this.activeIndex = this.pageIndex
/*        this.name=JSON.parse(Cookies.get("info")).name
        if (Cookies.get('type') === '0') {
          //普通用户
          this.isadmin = false
          this.id=0;
        }else if (Cookies.get('type') === '1') {
          //管理员
          this.isadmin = true
          this.id=1;
        }
        else if (Cookies.get('type') === '2') {
          //评委

          this.id=2;
        }*/
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        toonline(){
          if(this.id==2) {
            this.$router.push({path: `/review/start/online/judge/judgepage`})
          }
          else if(this.id==0) {
            this.$router.push({path: `/review/start/online/user/useron`})
          }
          else if(this.id==1) {
            this.$router.push({path: `/testPage`})
          }
          this.activeIndex = "111"
        },
        tooffline(){
          if(this.id==1) {
            this.$router.push({path: `/review/start/offline/admin/adminpage`})
          }
          else if(this.id==0) {
            this.$router.push({path: `/review/start/offline/user/useroff`})
          }
          this.activeIndex = "112"
        },
        toCLiHomePage(){
          if(this.type === '0') {
            this.$router.push({path: `/main/admin`})
          } else if (this.type === '1'){
            this.$router.push({path: `/main/user`})
          }
          this.activeIndex = "1"
        },
        toCLiAuditorPage(){
          this.$router.push({path: `/notify`})
          this.activeIndex = "3"
        },
        toCliProjectList(){
          this.$router.push({path: `/project/cliProjectListPage`})
          this.activeIndex = "3"
        },
        toCliNoticePage(){
          this.$router.push({path: `/message`})
          this.activeIndex = "2"
        },

        toPaperPage() {
           this.$router.push({ path: '/paper/personal_paper'});
           this.activeIndex = "4";
        },
        toPaperPageHome() {
          this.$router.push({ path: '/paper'});
          this.activeIndex = "4";
        },

        toProcessManagementPage(){
          if (this.isadmin === true) {
            this.$router.push({path: `/person`})
          } else {
            this.$router.push({path: '/person'})
          }
          this.activeIndex = "5"
        },
        toSpacePage(){
          this.$router.push({path: `/space`})
          this.activeIndex = "9"
        },
        toDownloadPage(){
          this.$router.push({path: `/download`})
          this.activeIndex = "21"
        },
        toJixiaoPage() {
          this.$router.push({path: `/jixiao`})
          this.activeIndex = "10"
        },
        toDatalistPage(){
          this.$router.push({path: `/datalist`})
          this.activeIndex = "11"
        },
        toSettingPage(){
          this.$router.push({path: '/person/user'})
        },
        toPercenterPage(){
          this.$router.push({path: '/personalCenter/cliPercenterPage'})
          this.activeIndex = "7"
        },
        logout(){
          // this.$router.push({path: `/`})
          const redirect_uri = Pro.qianduanURL;
          const url = `https://cas.bjtu.edu.cn/auth/logout?next=${redirect_uri}`
          window.location.replace(url);
        },
        showdialog(){
          this.centerDialogVisible = true
        },
        showDefMan(){
          if(this.isShowdefMan)
            this.isShowdefMan = false;
          else
            this.isShowdefMan = true;
        },
        showJudge(){
          if(this.isShowJudge)
            this.isShowJudge = false;
          else
            this.isShowJudge = true;
        }
      }
    }
</script>

<style scoped>
  .el-menu-vertical-demo{
    text-align:center;
    height: 2850px;
    width: 100%;
  }

  .menuclick {
    background-color: rgb(244, 249, 255);
  }

  .pic{
    width: 80px;
    height: 80px;

  }

  .menuItem{
    height: 40px;
    line-height: 40px;
  }

  .pic img{
    width: 100%;
    border-radius: 80%;
  }
  #scrollHid::-webkit-scrollbar{
    display: none;
  }
  #scrollHid>ul{
    height: 1500px;
  }

</style>
<style>
  .el-submenu .el-menu-item{
    min-width: 0;

    padding:0;
    padding-left: 0!important;
  }
  .el-menu-item-group__title{
    padding: 0;
    padding-left: 0!important;
  }
  .el-submenu__title{
    padding: 0;
    padding-left: 0!important;

  }
  .el-menu-item div{
    text-align: left;
    padding-left: 20px;
  }


</style>
