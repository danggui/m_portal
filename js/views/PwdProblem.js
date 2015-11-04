define(['View',getViewTemplatePath('PwdProblem'),'UIToast','UIRadioList','PwdQuestionModel','PwdChangeModel','UILoading','EnvStore','LanguageStore'], function (View, viewhtml,UIToast,UIRadioList,PwdQuestionModel,PwdChangeModel,UILoading,EnvStore,LanguageStore) {
    var lanStore = LanguageStore.getInstance();
    var WebUrlPath = {
        'WEB_URL_DEV':'http://101.230.3.6:8082',//开发环境D#  内网映射：'http://192.168.101.126:8082' 外网：'http://101.230.3.6:8082'
        'WEB_URL_T':'http://58.240.190.198:8142',//测试环境T#  内网映射：'http://192.168.9.230:8090' 外网：'http://58.240.190.198:8142'
        'WEB_URL_D':'http://120.27.43.83:8083',//Demo环境 M#
        'WEB_URL_W':'https://lite.cdpcloud.com',//生产机环境https://lite.cdpcloud.com
        'WEB_LUKE':'http://192.168.102.72:8080'//luke本机

    };
    return _.inherit(View,{
    onCreate: function () {
      this.$el.html(viewhtml);

        this.$("#searchPassword-box").append(_.template(this.$("#searchPassword").html())({'lanStore':lanStore.getAttr('language')}));

        if (!this.loading1) {
            this.loading1 = new UILoading({
                maskToHide: true
            });
        }

    },

    events: {
        'click #enterOK':'enterOK_fun',
        'click #selectQuestion':'selectQuestion_fun'
    },
      enterOK_fun: function(event){
          var company = $("#PwdCompany").val();
          var username = $("#PwdUser").val();
          var answer = $("#input_answer").val();
          event.stopPropagation();
          if (!this.toast1) {
              this.toast1 = new UIToast({
                  datamodel: {
                      content: 'content'
                  },
                  TIMERRES :  true
              });
          }
          if(company == ''){
              this.toast1.showToast(lanStore.getAttr('language').loginTipsCompany);
              return false;
          }else if(username==''){
              this.toast1.showToast(lanStore.getAttr('language').loginTipsName);
              return false;
          }else if(answer==''){
              this.toast1.showToast(lanStore.getAttr('language').SelectQuestion);
              return false;
          }else{
              this.loading1.show();
              event.stopPropagation();
              if (!this.toast1) {
                  this.toast1 = new UIToast({
                      datamodel: {
                          content: 'content'
                      },
                      TIMERRES :  true
                  });
              }
              var pwdChangeModel = PwdChangeModel.getInstance();
              pwdChangeModel.execute(
                  function(datamodel,data,textStatus,resObj) {
                      if(data.status == "0"){
                          this.toast1.showToast(data.message);
                          this.loading1.hide();
                          return false;
                      }else{
                          this.loading1.hide();
                          this.toast1.showToast(data.message);
                      }
                  },
                  function(e){
                      console.log(e);
                      //todo with error information
                  },
                  this,
                  function(e){},
                  {
                      'client_code':company,
                      'user_name':username,
                      'code':$('#input_answer').attr("data-id"),
                      'answer':$('#PwdAnswer').val()
                  }
              );

          }
      },
      selectQuestion_fun: function(event){
          var company = $("#PwdCompany").val();
          var username = $("#PwdUser").val();


          var evnStore = EnvStore.getInstance();
          var subFlag = company.substring(0,company.indexOf("#")+1).toLowerCase();
          if(subFlag == "d#")
              evnStore.setAttr('envUrl',WebUrlPath.WEB_URL_DEV);
          else if(subFlag == "t#")
              evnStore.setAttr('envUrl',WebUrlPath.WEB_URL_T);
          else if(subFlag == "m#")
              evnStore.setAttr('envUrl',WebUrlPath.WEB_URL_D);
          else if(subFlag == "l#")
              evnStore.setAttr('envUrl',WebUrlPath.WEB_LUKE);
          else
              evnStore.setAttr('envUrl',WebUrlPath.WEB_URL_W);


          if (!this.toast1) {
              this.toast1 = new UIToast({
                  datamodel: {
                      content: 'content'
                  },
                  TIMERRES :  true
              });
          }
          if(company == ''){
              this.toast1.showToast(lanStore.getAttr('language').loginTipsCompany);
              return false;
          }else if(username==''){
              this.toast1.showToast(lanStore.getAttr('language').loginTipsName);
              return false;
          }else{
              this.loading1.show();
              event.stopPropagation();
              var questionData = questionData ||[];
              var pwdQuestionModel = PwdQuestionModel.getInstance();

              pwdQuestionModel.execute(
                  function(datamodel,data,textStatus,resObj) {
                      if(data.status == "0"){
                          this.toast1.showToast(data.message);
                          this.loading1.hide();
                          return false;
                      }else{
                          _.each(data.data,function(value, key, list){
                              questionData.push(PwdQuestionModel.viewModel(value.name,value.code))}
                              );
                              if (!this.selectQuestion_radio) {
                                  var demodata1 =questionData //[{ 'id':'2014-6'}, { 'id':'2014-5'}, {'id':'2014-4' }, {'id':'2014-3' },{'id':'2014-2' }, {'id':'2014-1' }]

                                  scope = this;
                                  this.selectQuestion_radio = new UIRadioList({
                                      //数据模型
                                      datamodel: {
                                          title: '选择问题',
                                          data: demodata1
                                      },
                                      displayNum: 5,
                                      selectId: 0,
                                      index: 0,
                                      onClick: function(e, data) {
                                          scope.$('#input_answer')[0].innerHTML=data.name;
                                          scope.$('#input_answer').attr("data-id",data.code);
                                          this.hide();
                                      }
                                  });
                                  this.selectQuestion_radio.setIndex(0);
                              }
                              this.selectQuestion_radio.show();
                          this.loading1.hide();
                          }
                  },
                  function(e){
                      console.log(e);
                      //todo with error information
                  },
                  this,
                  function(e){},
                  {
                      'client_code':company.substring(company.indexOf("#")+1),
                      'user_name':username
                  }
              );
          }
      },
    onPreShow: function () {
      this.turning();
    },

    onShow: function () {

    },

    onHide: function () {
        if(this.selectQuestion_radio)
            this.selectQuestion_radio.hide();
    }
  });
});
