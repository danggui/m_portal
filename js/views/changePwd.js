define(['View',getViewTemplatePath('changePwd'),'ChangePasswordModel','UIToast','LanguageStore'], function (View, viewhtml,ChangePasswordModel,UIToast,LanguageStore) {

    var changePasswordModel = ChangePasswordModel.getInstance();
    var lanStore = LanguageStore.getInstance();

  return _.inherit(View,{
    onCreate: function () {
      this.$el.html(viewhtml);
     this.$("#ChangePWD-box").append(_.template(this.$("#ChangePWD").html())({'lanStore':lanStore.getAttr('language')}));
    },

    events: {
        'click #btnOk': 'changePWD',
        'click #btnCancel': function () {
            this.back();
        }
    },
    changePWD: function(event){
        event.stopPropagation();
        var orgPwd = $("#orgPwd").val();
        var newPwd = $("#newPwd").val();
        var new2Pwd = $("#new2Pwd").val();
        if (!this.toast1) {
            this.toast1 = new UIToast({
                datamodel: {
                    content: 'content'
                },
                TIMERRES :  true
            });
        }
        event.preventDefault();
        var myReg = /^[a-zA-Z]\w{7,17}$/;
        if(orgPwd == ''){
            this.toast1.showToast(lanStore.getAttr('language').changePwdError01);
            return false;
        }else if(newPwd==''){
            this.toast1.showToast(lanStore.getAttr('language').changePwdError02);
            return false;
        }else if(new2Pwd==''){
            this.toast1.showToast(lanStore.getAttr('language').changePwdError03);
            return false;
        }else if(new2Pwd!=newPwd){
            this.toast1.showToast(lanStore.getAttr('language').changePwdError04);
        }else if(myReg.test(newPwd)==false){
            this.toast1.showToast(lanStore.getAttr('language').changePwdError06);
        }else {
            changePasswordModel.execute(
                function(datamodel,data,textStatus,resObj) {
                    if(data.status == "0"){
                        this.toast1.showToast(data.message);
                        return false;
                    }else{
                        this.toast1.showToast(lanStore.getAttr('language').changePwdError05);
                        this.back();
                    }
                },
                function(e){
                    console.log(e);
                    //todo with error information
                },
                this,
                function(e){},
                {'password':orgPwd,
                 'new_password':newPwd
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
        $("#orgPwd").val("");
        $("#newPwd").val("");
        $("#new2Pwd").val("");
    }
  });
});
