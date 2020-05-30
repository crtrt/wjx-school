<template>
  <div class="outdiv">
    <cli-title class="titleClass" ></cli-title>
    <cli-menu class="menuClass" :pageIndex="pageIndex" ></cli-menu>
    <div class="bodyClass"  v-if="isshow">
      <div style="margin-top: 60px">
      <el-card shadow="hover"  :body-style="{ padding: '0px' }">
        <div class="titleDiv">
          <p class="titleMsg">下载列表</p>
          <div style="margin-top: 5px">新增 <span style="color: #045695; font-size: 30px">{{wait}}</span> 项任务待下载</div>
        </div>
        <div style="display: table; width: 100%; padding-left: 10px; padding-top: 20px; padding-bottom:15px; padding-right: 10px;text-align: center">
          <div style="display: table-row">
            <div  class="tableTitle">
              序号
            </div>
            <div  class="tableTitle">
              文件名称
            </div>
            <div  class="tableTitle">
              时间
            </div>
            <div  class="tableTitle">

            </div>
          </div>
          <div :class="{'tablerow':true, 'grayLine': (index % 2 === 0)}"  style="display: table-row;" v-for="(item, index) in fileList" :key="item.id">
            <div class="tableCell">
              {{index + 1}}
            </div>
            <div  class="tableCell">
              {{item.file_name}}
            </div>
            <div  class="tableCell">
              {{item.create_time}}
            </div>
            <div class="tableCell">
              <el-button type="primary" size="mini" @click="downloadFile(item)">下载</el-button>
            </div>
          </div>
        </div>

      </el-card>
      </div>
    </div>
  </div>
</template>

<script>
    import cliMenu from '~/components/base/cliMenu.vue'
    import API from '../../api'
    import cliTitle from '~/components/base/cliTitle.vue'
    import Cookies from 'js-cookie'
    import PRO from '~/api/API_PRO';

    export default {
        name: "download_list",
        data() {
            return {
                pageIndex:"21",
                'token': Cookies.get('token'),
                fileList:[],
                isshow:false,
                total:0,
                wait:0,
            }},
        components: {
            'cliMenu': cliMenu,
            "cliTitle": cliTitle,
        },
        methods:{
            /**
             * 下载文件
             * */
            downloadFile(file){
                window.open(PRO.baseURL+'survey/answer/batch-download?token='+this.token+'&id=' +file.id)
            },
            /**
             * 下载任务列表
             * */
            getFileList(){
                let data={
                    token:this.token,
                }

                API.Batchdownloadlist(data).then(res=>{
                    if(res.code){
                        alert(res.message);
                        return;
                    }

                    this.fileList = res.lists;
                    this.total = res.counts.total;
                    this.wait = res.counts.new;

                })

            },

        },
        mounted:function () {
            this.isshow = true
            this.getFileList()
        }
    }
</script>

<style scoped>
  .outdiv{
    min-width: 1000px;
  }

  .titleClass{
    position: fixed;
    z-index: 1;
  }

  .menuClass{
    position: fixed;
    margin-top: 60px;
    width: 150px;
    z-index: 1;
  }

  .bodyClass{
    min-width: 850px;
    margin-left: 150px;
    padding: 20px;
  }
  .titleDiv{
    background-color: #DDF1FF;
    padding: 10px 20px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .titleMsg{
    font-family: 黑体;
    font-size: 20px;
  }

  .grayLine{
    background-color: #e4efff;
  }
  .tableTitle{
    display: table-cell;
    font-size: 15px;
    padding: 5px;
    font-family: 黑体;
    font-weight: bold;

  }
  .tableCell{
    display: table-cell;
    font-size: 15px;
    padding: 5px;
  }
  .display_flex{
    display: flex;
    flex-wrap: wrap;
    display: -webkit-flex; /* Safari */
    -webkit-flex-wrap: wrap; /* Safari 6.1+ */
  }

</style>
