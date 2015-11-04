define(['AbstractView', getViewTemplatePath('login'),'UIToast','LoginModel','MyProfileStore','EnvStore','UILoading','LanguageStore','VersionModel','UIArticle'], function (View, viewhtml,UIToast,LoginModel,MyProfileStore,EnvStore,UILoading,LanguageStore,VersionModel,UIArticle) {

    //判断访问终端
    var version = '1.0.0';
    var browser={
        versions:function(){
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                qq: u.match(/\sQQ/i) == " qq" //是否QQ
            };
        }(),
        language:(navigator.browserLanguage || navigator.language).toLowerCase()
    }
    localStorage.setItem("browser",JSON.stringify(browser.versions));
    var evnStore = EnvStore.getInstance();
    var versionModel = VersionModel.getInstance();
  var menuModel = LoginModel.getInstance();
  var myProfileStore = MyProfileStore.getInstance();
       myProfileStore.setAttr('sessionid','');
    var lanStore = LanguageStore.getInstance();
  var lang = "";
  var WebUrlPath = {
        'WEB_URL_DEV':'http://192.168.101.126:8082',//开发环境D#  内网映射：'http://192.168.101.126:8082' 外网：'http://101.230.3.6:8082'
        'WEB_URL_T':'http://58.240.190.198:8142',//测试环境T#  内网映射：'http://192.168.9.230:8090' 外网：'http://58.240.190.198:8142'
        'WEB_URL_D':'http://120.27.43.83:8083',//Demo环境 M#
        'WEB_URL_W':'https://lite.cdpcloud.com',//生产机环境https://lite.cdpcloud.com
      'WEB_LUKE':'http://192.168.102.72:8080'//luke本机

   };
    evnStore.setAttr('envUrl','http://101.230.3.6:8082');
  return _.inherit(View, {
    onCreate: function () {
        var scope = this;
        if(browser.versions.android){
            var device = 'android'
        }else{
            var device = 'ios'
        }
        versionModel.execute(
            function(datamodel,data,textStatus,resObj) {
                if (!this.toast1) {
                    this.toast1 = new UIToast({
                        datamodel: {
                            content: 'content'
                        },
                        TIMERRES :  true
                    });
                }
                if (!this.loading1) {
                    this.loading1 = new UILoading({
                        maskToHide: true
                    });
                }
                if(data.status == "0"){
                    this.toast1.showToast(data.message);
                    this.loading1.hide();
                    return false;
                }else{
                    if(version!=data.data.version){

                        //弹出强制升级
                        if (!this.groupSelectPolicy) {
                            this.groupSelectPolicy = new UIArticle({
                                datamodel: {
                                    title: lanStore.getAttr('language').updatePop,
                                    btns: [
                                        { name: lanStore.getAttr('language').cancel, className: 'pop-box-btns-cancel' },
                                        { name: lanStore.getAttr('language').confirm, className: 'pop-box-btns-ok' }
                                    ]
                                },
                                data: [],
                                indexArr:[],
                                changedArr: [],
                                //
                                onOkAction: function(item) {
                                    if(JSON.parse(localStorage.browser).ios){
                                        navigator.app.loadUrl(encodeURI("itms-services://?action=download-manifest&url=https://www.cdpcloud.com/download/dev/microCloud.plist"), { openExternal:true});
                                        this.hide();
                                    }else{
                                        navigator.app.loadUrl(encodeURI("http://58.240.190.198:8085/microCloud/APP/MicroCloud.apk"), { openExternal:true});
                                        this.hide();
                                    }
                                },
                                onCancelAction: function(item) {
                                    console.log('my cancelAction', item);
                                    this.hide();
                                }
                            });
                        }
                        this.groupSelectPolicy.scrollWrapper[0].innerHTML=lanStore.getAttr('language').UpgradeContent
                        this.groupSelectPolicy.show();
                        if(JSON.parse(localStorage.browser).ios){
                            $(".pop-box-btns-ok")[0].innerHTML = '<a href="itms-services://?action=download-manifest&amp;url=https://www.cdpcloud.com/download/dev/microCloud.plist" style="color: #099fde">'+lanStore.getAttr('language').confirm+'</a>'
                        }
                        if(data.data.must_upgrade){
                            $('.pop-box-btns-cancel').css("display","none");
                        }

                    }
                }
            },
            function(e){
                console.log(e);
                //todo with error information
            },
            this,
            function(e){},
            {'device':device}

        );

                this.$el.html(viewhtml);
        // en_us/zh_cn/zh_tw
        var type=navigator.appName
        if(location.search==""){
            if (type=="Netscape"){
                lang = navigator.language.toLowerCase().replace("-","_")
            }
            else{
                lang = navigator.userLanguage.toLowerCase().replace("-","_")
            }
        }else{
            lang = location.search.split('?')[1].toLowerCase().replace("-","_");
        }

        if(lang!="en_us"&&lang!="zh_cn"){
            lang = "en_us"
        }

        $.ajax({
          type: 'GET',
          url: './fakedata/'+lang+'.json',
          dataType:'json',
          success: function (data) {
              lanStore.setAttr('language',data.data);
              this.$("#login").append(_.template(this.$("#login-language").html())({'lanStore':lanStore.getAttr('language')}));
          },
          error: function (xhr, type) {
            console.log('Language Ajax error!');
          }
        });
        function eventBackButton(){

            if($("#view_1").css("display")=="block"){

                if (!this.toast1) {
                    this.toast1 = new UIToast({
                        datamodel: {
                            content: 'content'
                        },
                        TIMERRES :  true
                    });
                }
                this.toast1.showToast(lanStore.getAttr('language').quiteAppError);
                document.removeEventListener("backbutton", eventBackButton, false); // 注销返回键
                document.addEventListener("backbutton", exitApp, false);// 绑定退出事件
                //3秒后重新注册
                var intervalID = window.setInterval(
                    function() {
                        window.clearInterval(intervalID);
                        document.removeEventListener("backbutton",exitApp, false); // 注销返回键
                        document.addEventListener("backbutton", eventBackButton, false); // 返回键
                    },3000);
            }else if($("#view_6").css("display")=="block"){

            }else {
                navigator.app.backHistory();
            }
        }
        function onOffline(){
            if (!this.toast1) {
                this.toast1 = new UIToast({
                    datamodel: {
                        content: 'content'
                    },
                    TIMERRES :  true
                });
            }
            this.toast1.showToast(lanStore.getAttr('language').networkStates);
            //$("#main").append("<div style='display: flex;justify-content: center;padding: 10px;background: rgb(255, 62, 62);color: white;'><h2>"+lanStore.getAttr('language').networkState+"</h2></div>")
        }
        function onOnline(){
            if (!this.toast1) {
                this.toast1 = new UIToast({
                    datamodel: {
                        content: 'content'
                    },
                    TIMERRES :  true
                });
            }
            this.toast1.showToast(lanStore.getAttr('language').networkStates);
            //$("#main").append("<div style='display: flex;justify-content: center;padding: 10px;background: rgb(255, 62, 62);color: white;'><h2>"+lanStore.getAttr('language').networkState+"</h2></div>")
        }
        //退出app
        function exitApp() {
            navigator.app.exitApp();
        }

        document.addEventListener("deviceready",
            function(){
                    document.addEventListener("offline", onOffline, false);
                    document.addEventListener("online", onOnline, false);
                document.addEventListener("backbutton",eventBackButton,false); //返回键
            }, false);
    },

    events: {
      'focus input':function(e){
          //var _browser = JSON.parse(localStorage.browser);
          $(e.target.parentNode.nextElementSibling).css('display','block');
          //if(_browser.mobile&& _browser.ios){
          //}else{
          //    $("#login").css({
          //        "transform":"translateY(-150px)",
          //        "-webkit-transform":"translateY(-150px)",
          //        "transition": "transform .4s",
          //        "-webkit-transition":"-webkit-transform .4s"
          //    });
          //}
        },
        'blur input':function(e){
            $('.clear-text').css('display','none')
            //$(".login").css("transform","");
            //$(".login").css("-webkit-transform","");
        },
      'click #btn_enter': 'checkValidate',
      'click .clear-text': 'clearText',
      'click .language-settings-loging':'selectLanguage',
      'click .forgetpwd': function(){
        this.forward('PwdProblem');
      },
        'click #remember':'rememberF'
    },
      rememberF:function(){
          $('#remember').toggleClass("mui-active");
          $('#remember').children().toggleClass("mui-switch-active");
      },
    clearText:function(e){
        //$("#login").css({
        //    "transform":"translateY(-150px)",
        //    "-webkit-transform":"translateY(-150px)",
        //    "transition": "transform .4s",
        //    "-webkit-transition":"-webkit-transform .4s"
        //});
        $(e.target.previousElementSibling).find('input')[0].value="";
        $(e.target.previousElementSibling).find('input').focus();
      },
      selectLanguage:function(e){
          var lang =e.target.dataset.id;
          $('.language-settings-loging').removeClass('language-settings-selected');
          $(e.target).addClass('language-settings-selected');
          location.replace(window.location.origin+window.location.pathname+'?'+lang);

      },

    checkValidate: function(event){
      event.stopPropagation();
        //$("#login").css({
        //    "transform":"translateY(-150px)",
        //    "-webkit-transform":"translateY(-150px)",
        //    "transition": "transform .4s",
        //    "-webkit-transition":"-webkit-transform .4s"
        //});
      var company = $("#company").val().trim();
      var username = $("#username").val().trim();
      var pwd = $("#pwd").val().trim();
        try{
            var networkState = navigator.connection.type;
        }catch(e){

        }
      if (!this.toast1) {
        this.toast1 = new UIToast({
          datamodel: {
            content: 'content'
          },
          TIMERRES :  true
        });
      }
      event.preventDefault();
      if(company == ''){
        this.toast1.showToast(lanStore.getAttr('language').loginTipsCompany);
        return false;
      }else if(username==''){
        this.toast1.showToast(lanStore.getAttr('language').loginTipsName);
        return false;
      }else if(pwd==''){
        this.toast1.showToast(lanStore.getAttr('language').loginTipsPassword);
        return false;
      }else if(networkState == "none"){
          this.toast1.showToast(lanStore.getAttr('language').networkStates);
      }else{
          //company username password save cookie

          if ($("#remember")[0].getAttribute("class").split(" ")[1]&&$("#remember")[0].getAttribute("class").split(" ")[1]=="mui-active") {
              window.localStorage.setItem("remember", "true");
              window.localStorage.setItem("company", company);
              window.localStorage.setItem("userName", username);
              window.localStorage.setItem("passWord", pwd);
          }
          else {
              window.localStorage.setItem("remember", "");
              window.localStorage.setItem("company", "");
              window.localStorage.setItem("userName", "");
              window.localStorage.setItem("passWord", "");
          }

             var subFlag = company.substring(0,company.indexOf("#")+1).toLowerCase()
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


          if (!this.loading1) {
              this.loading1 = new UILoading({
                  maskToHide: true
              });
          }
          this.loading1.show();

        menuModel.execute(
          function(datamodel,data,textStatus,resObj) {
//            console.log(resObj.getAllResponseHeaders());
            if(data.status == "0"){
              this.toast1.showToast(data.message);
              this.loading1.hide();
              return false;
            }else{
              myProfileStore.setAttr('sessionid',data.data.session_id);
              myProfileStore.setAttr('myProfileStore',JSON.stringify(data.data));
                if(data.data.reset_pwd){
                    this.toast1 = new UIToast({
                        datamodel: {
                            content: 'content'
                        },
                        TIMERRES :  true
                    });
                    this.toast1.showToast(lanStore.getAttr('language').FirstLanding);
                    this.forward("changePwd");
                }else{
                    this.forward("MyProfile");
                }
              this.loading1.hide();
            }
          },
          function(e){
            console.log(e);
            //todo with error information
          },
          this,
          function(e){},
          {'client_code':company.substring(company.indexOf("#")+1),
          'user_name':username,
          'password':pwd,
          'language':lang}
        );
      }
    },
    jsonpCallback: function(data)
    {
      alert(data.message);
    },

    onPreShow: function () {
      this.turning();
    },

    onShow: function () {
        $("."+lang).addClass('language-settings-selected');
    },

    onHide: function () {

    }
  });
});
