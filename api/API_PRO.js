export default {
    /**
     * 测试
     * */
    baseURL: 'http://127.0.0.1:8083/',
    uploadURL: 'http://127.0.0.1:8083/',


    method: 'post',

    /**
     * 基本信息
     */
    getUnitList: {url: 'common/setting/get-unit'},
    getPositionList: {url: 'common/setting/get-position'},
    getJobList: {url: 'common/setting/get-jobtitle'},


    /**
     * 账户
     */
    loginApi: {url: 'user/account/login'}, // 用户登录
    register: {url: 'user/account/register'}, // 用户注册
    Changepw: {url: 'user/account/changepw'}, // 修改密码
    Getinfo: {url: 'user/information/get-info'}, // 获取用户信息
    Updateinfo: {url: 'user/information/update-info'}, // 更改用户信息


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
    putCommon:{url:'notify/notify/put-common'},
    putNotCommon:{url:'notify/notify/put-not-common'},
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
    notifyUnFinishByEmail: {url: 'survey/survey-info/unsubmit-email'},  // 未交征集邮件提示
    getUserZhengjiDetail: {url: 'survey/answer/user-info'},
    exportMessage: {url: 'survey/answer/export'}, // 征集结果信息导出
    downloadBatch: {url: 'survey/answer/download-batch'},  // 征集结果附件批量下载
    adminReadList: {url: 'survey/answer/list-answer-by-condition'}, // 管理员获得已读信息
    deleteZhengji: {url: 'survey/survey-info/delete'}, //删除征集
    downloadZhengji: {url: 'survey/answer/download-batch'}, //下载

    // 下载
    Batchdownloadlist: {url: 'survey/answer/batch-download-tasks'}, // 批量下载任务列表
}
