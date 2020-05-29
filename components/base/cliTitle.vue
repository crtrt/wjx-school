<template >
    <div id="out_div" style="display: table; box-shadow: 0 0 5px rgba(158,158,158,0.7); text-align: center">
<!--      <img src="../../assets/image/s1.png" height="80%" style="position: absolute; top: 7px; left: 9px"/>-->
      <p style=" font-weight: bold; font-family:'FZYaSongS-B-GB'; font-size: 28px; color: rgb(37, 144, 226);">校园问卷管理系统</p>
    </div>
</template>


<script>
  import API from '../../api'
  import Cookies from 'js-cookie'
  import PRO from '../../api/API_PRO.js'

    export default {
        name: "cliTitle",

      data () {
        return {
          state:'',

          /**
           * 0是普通用户
           * 1是管理员
           * 2是评委
           * **/
          roleType:Cookies.get('type'),
        }
      },

      methods: {
        querySearchAsync (queryString, cb) {
          let token = Cookies.get('token')
          let data = {
            token: token,
            keyword: queryString
          }
          API.searchProject(data).then(res => {
            this.restaurants = res.list
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
              //let results = queryString ? this.restaurants.filter(this.createStateFilter(queryString)) : this.restaurants
              let results = queryString ?this.createStateFilter(this.restaurants): this.restaurants
              console.log(results)
              cb(results)
            }, 3000 * Math.random())
          }).catch(msg => {
            let results = queryString ?this.createStateFilter(this.restaurants): this.restaurants
            cb(results)
          })
        },
        createStateFilter (restaurants) {
          let results = []
          restaurants.forEach(item=>{
            results.push({'content':((item.projectName) + '-' + (item.principalInfo.name  )+ '-' + (item.principalInfo.phone)), 'projectId':item.projectId})
          })
          return results
        },
        //查看详情
        gocliNoticeDetail(item) {
          if (Cookies.get('type') === '0') {
            //普通用户跳转到管理页面
            //this.$router.push({path: '/processManagement/_paperId/userProcess?projectId='+item.projectId})
            this.$router.push({path:'/refreshPage?url='+'/processManagement/_paperId/userProcess?projectId='+item.projectId})
          }else if (Cookies.get('type') === '1') {
            //管理员
            //this.$router.push({path: '/project/cliProDetailPage?projectId='+item.projectId})
            this.$router.push({path:'/refreshPage?url='+'/project/cliProDetailPage?projectId='+item.projectId})
          }
        }
        }
    }
</script>

<style scoped>
  #out_div{
    width: 100%;
    height: 70px;
    top:0;
    background-color: rgb(255,255,255);
    z-index: 9999;
      line-height: 70px;
  }
</style>
