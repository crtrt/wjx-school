export default {
    /**
     * 测试
     * */
    baseURL: 'http://127.0.0.1:8083/',
    // qianduanURL: 'http://59.64.3.20:8088',
    uploadURL: 'http://127.0.0.1:8083/',

    /**
     * 线上
     * */
    // baseURL: 'http://59.64.3.141:8080/',
    // qianduanURL: 'http://dzxyky.bjtu.edu.cn',
    // uploadURL: 'http://59.64.3.141:8080/',


    method: 'post',

    /**
     * 基本信息
     */
    getUnitList: {url: 'common/setting/get-unit'}, //获得单位
    getPositionList: {url: 'common/setting/get-position'}, //获得职务列表
    getJobList: {url: 'common/setting/get-jobtitle'}, // 获取职称信息


    /**
     * 账户
     */
    loginApi: {url: 'user/account/login'}, // 用户登录
    register: {url: 'user/account/register'}, // 用户注册
    Findpw: {url: 'user/account/findpw'}, // 找回密码
    Changepw: {url: 'user/account/changepw'}, // 修改密码
    Getinfo: {url: 'user/information/get-info'}, // 获取用户信息
    Updateinfo: {url: 'user/information/update-info'}, // 更改用户信息
    misLogin: {url: 'user/account/login-return'}, //mis认证的登录


    /**
     * 人员管理
     */
    Request_schema: {url: 'user/information/list-by-condition'}, //获取人员列表
    groupList: {url:'user/group/list'},//获取群组列表
    peopleList: {url:'user/group/info'},//获取特定群组人员列表
    downloadMuBan: {url:'user/information/export-template'},//下载模板表
    addGroup:{url:'user/group/add'},//添加人员群组
    deleteGroup:{url:'user/group/delete'},//删除人员群组
    updataGroup:{url:'user/group/update-member'}, //更新组内状态
    searchGroup:{url:'user/group/search'},



    /**
     * 通知
     */
    readTemporary:{url:'notify/notify/read-temporary'},//读取暂存
    putCommon:{url:'notify/notify/put-common'},//发送普通
    putNotCommon:{url:'notify/notify/put-not-common'},//发送个性通知
    readNotify:{url:'notify/notify/read'},//读取通知
    AllNotify:{url:'notify/notify/list-all'},//所有通知
    getUnit:{url:'common/setting/get-unit'},//获取单位信息
    getPosition:{url:'common/setting/get-position'},//获取职务信息



    /**
     * 通知公告
     */
    notifyDelete: {url: 'notify/notify/delete'},
    notifylist: {url: 'notify/notify/list'},
    userNotifyList:{url:'notify/notify/list-by-condition'},
    ReadDetailList: {url: 'notify/notify/read-detail'},
    notifyUnreadByMessage: {url: 'notify/notify/unread-sms'}, // 未读通知短信提示
    notifyUnreadByEmail: {url: 'notify/notify/unread-email'}, // 未读通知邮件提示
    updateCommon: {url: 'notify/notify/update-common '},

    /**
     *征集
     */
    surveylist: {url: 'survey/survey-info/list'}, // 列表查询
    userSurveylist: {url:'survey/survey-info/list-by-condition'},//用户列表查询
    getAdminTemp: {url: 'survey/survey-info/read-temporary'},
    addZhengJi: {url: 'survey/survey-info/add'},
    getZhengJiDetail: {url: 'survey/survey-info/info'},
    submitZhengjiAnswer: {url: 'survey/answer/add'},
    getUserTempAnswer: {url: 'survey/answer/read-temporary'},
    FinishedList: {url: 'survey/answer/list-by-condition'},    // 名单
    UnfinishedList: {url: 'survey/survey-info/unsubmit-list'}, // 未提交名单
    checkAnswer: {url: 'survey/answer/review'},
    notifyUnFinishByMessage: {url: 'survey/survey-info/unsubmit-sms'},  // 未交征集短信提示
    notifyUnFinishByEmail: {url: 'survey/survey-info/unsubmit-email'},  // 未交征集邮件提示
    getUserZhengjiDetail: {url: 'survey/answer/user-info'},
    exportMessage: {url: 'survey/answer/export'}, // 征集结果信息导出
    downloadBatch: {url: 'survey/answer/download-batch'},  // 征集结果附件批量下载
    adminReadList: {url: 'survey/answer/list-answer-by-condition'}, // 管理员获得已读信息
    deleteZhengji: {url: 'survey/survey-info/delete'}, //删除征集
    downloadZhengji: {url: 'survey/answer/download-batch'}, //下载

    /**
     * 论文认领
     */
    getPaperDetail: {url: 'renling/renling/readinfos'},  //获取论文详情
    getTempPaper: {url: 'renling/admin/read-temporary'}, // 获取暂存论文
    userSubmitRenling: {url: 'renling/renling/submit'},  //用户提交认领
    userUpdateRenling: {url: 'renling/renling/update'},  //用户更改认领
    claimList: {url:'renling/renling/readlist'},  // 用户论文认领列表
    tmpOrPushPaper: {url: 'renling/admin/add'}, // 发布、暂存认领
    adminFinisRenling: {url: 'renling/renling/finish'}, //管理员结束认领
    adminRenlingList: {url:'renling/admin/list'},//管理员认领列表
    finishRenling: {url:'renling/admin/finish'},//结束认领
    saveEdit:{url:'renling/admin/update'},//管理员保存编辑
    personalPaperList:{url:'renling/renling/readmylist'},//用户查看个人论文页

    /**
     * 附件空间
     */
    listAttachment:{url:'renling/admin/list-attachment'}, //附件空间列表
    importAttachment:{url:'renling/admin/import-attachment'} , //上传附件
    deleteAttachment:{url:'renling/admin/delete-attachment'},  //删除

    /**
     * 科研绩效
     */
    keyanjixiaolist:{url:'jixiao/list-by-condition '},//获得列表
    keyanjixiaoDelete: {url: 'jixiao/delete'}, //delete

    // 下载
    Batchdownloadlist: {url: 'survey/answer/batch-download-tasks'}, // 批量下载任务列表
}
