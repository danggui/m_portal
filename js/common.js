/**
 * Created by Lance.Zhao on 2015/3/15.
 */
(function () {
  require.config({
    shim: {
      _: {
        exports: '_'
      }
    },
    waitSeconds: 6000,
    paths: {
      "text": jsapp.js_path+'thrd_lib/requirejs/require.text',
      //核心MVC
      'AbstractApp': jsapp.js_path+'mvc/abstract.app',
      'AbstractView': jsapp.js_path+'mvc/abstract.view',

      'ajax':jsapp.js_path+'mvc/ajax',
      //model
      'AbstractModel':jsapp.js_path+'mvc/abstract.model',
      'LoginModel':jsapp.js_path+'model/LoginModel',
      'LoginOutModel':jsapp.js_path+'model/LoginOutModel',
      'ChangePasswordModel':jsapp.js_path+'model/ChangePasswordModel',
      'UserCenterInfoModel':jsapp.js_path+'model/UserCenterInfoModel',//todo add
      'SalaryModel':jsapp.js_path+'model/SalaryModel',
      'SalaryCalendarModel':jsapp.js_path+'model/SalaryCalendarModel',
      'SalaryBasicInfoModel':jsapp.js_path+'model/SalaryBasicInfoModel',
      'UserCenterWorkListModel':jsapp.js_path+'model/UserCenterWorkListModel',
      'MyInfoModel':jsapp.js_path+'model/MyInfoModel',
      'MyInfoSaveModel':jsapp.js_path+'model/MyInfoSaveModel',
      'MyInfoEditModel':jsapp.js_path+'model/MyInfoEditModel',
      'MyInfoDListModel':jsapp.js_path+'model/MyInfoDListModel',
      'MyInfoDPositionModel':jsapp.js_path+'model/MyInfoDPositionModel',
      'MyInfoDInfoModel':jsapp.js_path+'model/MyInfoDInfoModel',
      'MyInfoDContractModel':jsapp.js_path+'model/MyInfoDContractModel',
      'MyInfoDContactModel':jsapp.js_path+'model/MyInfoDContactModel',
      'MyBalanceModel':jsapp.js_path+'model/MyBalanceModel',
      'MyBalanceDetailModel':jsapp.js_path+'model/MyBalanceDetailModel',
      'MyBalanceApplyModel':jsapp.js_path+'model/MyBalanceApplyModel',
      'MyApplyListModel':jsapp.js_path+'model/MyApplyListModel',
      'MyWorkListModel':jsapp.js_path+'model/MyWorkListModel',
      'PolicyModel':jsapp.js_path+'model/PolicyModel',
      'PolicyArticleModel':jsapp.js_path+'model/PolicyArticleModel',
      'MyOrganizeModel':jsapp.js_path+'model/MyOrganizeModel',
      'MyInfoDFamilyModel':jsapp.js_path+'model/MyInfoDFamilyModel',
      'NewsListModel':jsapp.js_path+'model/NewsListModel',
      'NewsDetailModel':jsapp.js_path+'model/NewsDetailModel',
      'PwdQuestionModel':jsapp.js_path+'model/PwdQuestionModel',
        'PwdChangeModel':jsapp.js_path+'model/PwdChangeModel',
      'SessionInfoModel':jsapp.js_path+'model/sessionInfoModel',
      'VersionModel':jsapp.js_path+'model/versionModel',
      'TodoListModel':jsapp.js_path+'model/TodoListModel',
      'ApprovalResultsModel':jsapp.js_path+'model/ApprovalResultsModel',
      'LeaveListModel':jsapp.js_path+'model/LeaveListModel',
      'AnnualLeaveModel':jsapp.js_path+'model/AnnualLeaveModel',
      'LeaveDaysModel':jsapp.js_path+'model/LeaveDaysModel',
      'DoLeaveApplyModel':jsapp.js_path+'model/DoLeaveApplyModel',
      'HRempListModel':jsapp.js_path+'model/HRempListModel',
      'HRempDetailModel':jsapp.js_path+'model/HRempDetailModel',
      //store
      'abstractStorage':jsapp.js_path+'mvc/abstractStorage',
      'storage':jsapp.js_path+'mvc/storage',
      'AbstractStore':jsapp.js_path+'mvc/abstractStore',
      'store':jsapp.js_path+'mvc/store',
      'EnvStore':jsapp.js_path+'store/EnvStore',
      'SalaryStore':jsapp.js_path+'store/SalaryStore',
      'MyInfoDetailListStore':jsapp.js_path+'store/MyInfoDetailListStore',
      'MyProfileStore':jsapp.js_path+'store/MyProfileStore',
       'LanguageStore':jsapp.js_path+'store/LanguageStore',
      'TodoListStore':jsapp.js_path+'store/todoListStore',

      //UI组件
      'UIView':jsapp.js_path+'ui/ui.abstract.view',
      'UIMask':jsapp.js_path+'ui/ui.mask',
      'UILayer':jsapp.js_path+'ui/ui.layer',
      'UIAlert':jsapp.js_path+'ui/ui.alert',
      'UIToast':jsapp.js_path+'ui/ui.toast',
      'UILoading':jsapp.js_path+'ui/ui.loading',
      'UIBubbleLayer':jsapp.js_path+'ui/ui.bubble.layer',
      'UIScroll':jsapp.js_path+'ui/ui.scroll',
      'UIScrollX':jsapp.js_path+'ui/ui.scroll.x',
      'UIScrollLayer':jsapp.js_path+'ui/ui.scroll.layer',
      'UISliderIscroll':jsapp.js_path+'ui/ui.slider.iscroll',
      'UISelect':jsapp.js_path+'ui/ui.select',
      'UIRadioList':jsapp.js_path+'ui/ui.radio.list',
      'UIGroupSelect':jsapp.js_path+'ui/ui.group.select',
      'UIGroupList':jsapp.js_path+'ui/ui.group.list',
      'UIGroupListEdit':jsapp.js_path+'ui/ui.group.list.edit',
      'UISwitch':jsapp.js_path+'ui/ui.switch',
      'UITab':jsapp.js_path+'ui/ui.tab',
      'UISlide':jsapp.js_path+'ui/ui.slide',
      'UICalendar':jsapp.js_path+'ui/ui.calendar',
      'UItreeMenu':jsapp.js_path+'ui/ui.treeMenu',//todo add
      'UIopenFile':jsapp.js_path+'ui/ui.openFile',
      'UIArticle':jsapp.js_path+'ui/ui.group.article',

      //表头导航栏
      'View':jsapp.js_path+'mvc/view',
      'NavView':jsapp.js_path+'mvc/nav_view'
    }
  });
})();
