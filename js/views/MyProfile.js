define(['NavView',getViewTemplatePath('MyProfile'),'UItreeMenu','UserCenterInfoModel','UISlide','UILoading','MyProfileStore','LoginOutModel','LanguageStore','SessionInfoModel'], function (View, viewhtml,UItreeMenu,UserCenterInfoModel,UISlide,UILoading,MyProfileStore,LoginOutModel,LanguageStore,SessionInfoModel) {
     var sessionInfo = SessionInfoModel.getInstance();
    var userCenterInfoModel = UserCenterInfoModel.getInstance();
    var lanStore = LanguageStore.getInstance();
    var loginOut = LoginOutModel.getInstance();
  return _.inherit(View,{
    propertys: function ($super) {
      $super();
    },

    onCreate: function () {
      this.$el.html(viewhtml);
        this.$("#self-service").append(_.template(this.$("#basic_info_tp0").html())({'lanStore':lanStore.getAttr('language')}));
        $("#treePWD")[0].innerHTML = lanStore.getAttr('language').passwordSettings;
        $("#treelogOut")[0].innerHTML = lanStore.getAttr('language').logOut;


      this.els = {
        basicInfo_tpl: this.$el.find("#basic_info_tpl")
      };

      if (!this.loading1) {
        this.loading1 = new UILoading({
          maskToHide: true
        });
      }

      //this.$('.ct-main-content').empty();
      var that = this;
      this.loading1.show();
//      $.ajax({
//        type: 'GET',
//        url: 'http://192.168.206.1:8090/profile.ashx',
//        dataType:'jsonp',
//        jsonp: "cdpJsonP",
//        jsonpCallback:"jsonpCallback",
//        success: function (data) {
//          alert(data);
//        },
//        error: function (xhr, type) {
//          alert('Ajax error!');
//        }
//      });


//          var myprofile_menudata = [];
//          _.each(data.menu_info,function(value, key, list){
//            myprofile_menudata.push(UserCenterInfoModel.viewMenuInfoModel(value.app_resource_code,value.describe_zh_cn,[]));
//          });
//          myprofile_menudata.push(UserCenterInfoModel.viewMenuInfoModel('11','设置',[
//            {
//            "id": "13",
//            "text": "密码保护",
//            "url": "pwdProtect"
//            },
//            {
//              "id": "15",
//              "text": "F&Q",
//              "url": "FAQ"
//            },
//            {
//              "id": "16",
//              "text": "联系我们",
//              "url": "contactUs"
//            },
//            {
//              "id": "17",
//              "text": "建议反馈",
//              "url": "Advice"
//            },
//            {
//              "id": "18",
//              "text": "关于CDP Cloud",
//              "url": "aboutCDPCloud.html"
//            },
//            {
//              "id": "19",
//              "text": "退出系统",
//              "url": "index"
//            }]));
//          this.tree_menu = new UItreeMenu({
//            datamodel: {
//              data: myprofile_menudata
//            },
//
//            wrapper: this.$(".ct-main-content"),
//
//            scrollWrapper: this.$('.ct-main_menu'),
//
//            scrollScroller: this.$(".ct-main-content"),
//
//            itemClick: function (e) {
//              var trigger = $(e.currentTarget);
//              if(trigger.attr('target')!=''){
//                $('body').toggleClass("overflow-h");
//                $('#main').toggleClass("overflow-h");
//                that.forward(trigger.attr('target'));
//              }
//            },
//
//            // Load page
//            itemleafClick: function (e){
//              var trigger = $(e.currentTarget);
//              if(trigger.attr('data-leaf-id') == '18'){
//                window.location.href = trigger.attr('target');
//              }else if(trigger.attr('data-leaf-id') == '19'){
//                        var loginOut = LoginOutModel.getInstance();
//                  loginOut.execute(
//                      function(data) {
//                          if(data.status == "0"){
//                              this.toast1.showToast(data.message);
//                              return false;
//                          }else{
//                              //$(".ct-main_a").toggleClass("ct-main");
//                              $('header').toggleClass("ct-h-position");
//                              $(".ct-main_menu").toggleClass("ct-main-m");
//                              $('body').toggleClass("overflow-h");
//                              that.forward(trigger.attr('target'));
//                          }
//                      },
//                      function(e){
//                          console.log(e);
//                          //todo with error information
//                      },
//                      this,
//                      function(e){},
//                      {}
//                  );
//              }else{
//                if(trigger.attr('target')!=''){
//                  $('body').toggleClass("overflow-h");
//                  $('#main').toggleClass("overflow-h");
//                  that.forward(trigger.attr('target'));
//                }
//              }
//            }
//          });
//          this.tree_menu.show();
//          this.$('.ct-main_menu').hide();
          if(that.$('.ct-main_menu').hasClass('ct-main-m')){
            $('body').removeClass("overflow-h");
            $('#main').removeClass("overflow-h");
          }
          that.loading1.hide();
    },
    events: {
        'touchstart .myDivCard.item,.flex-btn': function(e){
            $(e.currentTarget).addClass('cur');
        },
        'touchend .myDivCard.item,.flex-btn': function(e){
            $(e.currentTarget).removeClass('cur');
        },
        'touchcancel .myDivCard.item,.flex-btn': function(e){
            $(e.currentTarget).removeClass('cur');
        },
        'click #salaryInfo':'view_salary',
        'click #newsInfo':'view_news',
        'click #policyInfo':'view_policy',
        'click #insurance':'view_insurance',
//      'click .icon_menu': 'toggleLeftMenu',
      'click .icon_menu': 'toggleSettingsMenu',
      'click #work_todo':'work_todo',
        'click #toDoList':'toDoList',
      'click #work_hint':'work_hint',
      'click #work_notify':'work_notify',
      'click #wait_apply':'wait_apply',
      'click #on_apply':'on_apply',
      'click #self_service':'self_service',
      'click #has_apply':'has_apply',
      'click #myInfo':'myinfo',
      'click #myInfomatin':'myinfo',
        'click #leaveInfo':'leaveInfo',
      'click #fq':'fq',
      'click .list-item-nav':'jump_settingsPage',
        'click .settings-mask-black':'toggleSettingsMenu'
    },


      view_salary: function(){
          this.forward('ViewSalary');
      },

      view_news: function(){
          this.forward('News_List');
      },

      view_policy: function(){
          this.forward('PolicyList');
      },
      view_insurance: function(){
          this.forward('commercialInsurance');
      },

      toggleLeftMenu: function () {
          this.$(".ct-main_a").toggleClass("ct-main");
          this.$('header').toggleClass("ct-h-position");
//        this.$(".ct-main_menu").show();
          this.$(".ct-main_menu").toggleClass("ct-main-m");
          $('body').toggleClass("overflow-h");
          //$('#main').toggleClass("overflow-h");
      },
      toggleSettingsMenu:function(){
          this.$('.settings-nav').toggleClass("settings-nav-hide");
          this.$('.settings-nav').toggleClass("settings-nav-show");
          this.$('.mask-nav').toggleClass("settings-mask-black");

      },

      self_service: function(){
          this.forward('MyProfile');
      },

      myinfo: function(){
          this.forward('MyInfo');
      },

      fq: function(){
          this.forward('FAQ');
      },
      jump_settingsPage:function(e){

          var trigger = $(e.currentTarget);
          if(trigger.attr('data-id')== "language"){
              this.forward('Settings-language');
          }else if(trigger.attr('data-id') == "password"){
              this.forward('changePwd');
          }else if(trigger.attr('data-id') == "logout"){
              loginOut.execute(
                  function(data) {
                      if(data.status == "0"){
                          this.toast1.showToast(data.message);
                          return false;
                      }else{
                          this.$('.settings-nav').toggleClass("settings-nav-hide");
                          this.$('.settings-nav').toggleClass("settings-nav-show");
                          this.$('.mask-nav').toggleClass("settings-mask-black");
                         // this.forward('index');
                          window.location.href=window.location.href.substring(0,window.location.href.indexOf("#"));
                      }
                  },
                  function(e){
                      console.log(e);
                      //todo with error information
                  },
                  this,
                  function(e){},
                  {}
              );
          }else{

          }
      },

    work_todo: function(){
      this.forward('MyWork_List!work_todo');
    },
      toDoList:function(){
          this.forward('MyWork_todoList');
      },
      leaveInfo:function(){
          this.forward('MyWork_leaveList');
      },

    work_hint: function(){
      this.forward('MyWork_List!work_hint');
    },

    work_notify: function(){
      this.forward('MyWork_List!work_notify');
    },

    wait_apply: function(){
      this.forward('MyWork_List!wait_apply');
    },

    on_apply: function(){
      this.forward('MyWork_List!on_apply');
    },

    has_apply: function(){
      this.forward('MyWork_List!has_apply');
    },

    onPreShow: function () {
      this.turning();
        //sessionInfo.execute(
        //    function(data) {
        //        console.log(data);
        //    },
        //    function(e){
        //        console.log(e);
        //        //todo with error information
        //    },
        //    this,
        //    function(e){},
        //    {}
        //);
    },

    onShow: function () {
                    userCenterInfoModel.execute(
                        function(data) {
                            $("#basic_info_wrap").html(_.template(this.els.basicInfo_tpl.html())({'basic_infoData':data.data.menu_info}));
                            //window.localStorage.setItem("commercialInsurance", data.menu_info[4].content);

                            //如果菜单栏打开高度滚动关闭
                            if(!this.$('.ct-main_menu').hasClass('ct-main-m')){
                                $('body').addClass("overflow-h");
                                $('#main').addClass("overflow-h");
                            }
                            if(this.slider) this.slider._resize();
                            this.refreshHeight();
                        },
                        function(e){
                            console.log(e);
                            //todo with error information
                        },
                        this,
                        function(e){},
                        {}
                    );
        var myProfileStore = MyProfileStore.getInstance();
        var data =  JSON.parse(myProfileStore.getAttr('myProfileStore'));
        $("#basic_info_wrap").html(_.template(this.els.basicInfo_tpl.html())({'basic_infoData':data.menu_info}));
        //window.localStorage.setItem("commercialInsurance", data.menu_info[4].content);

      //如果菜单栏打开高度滚动关闭
      if(!this.$('.ct-main_menu').hasClass('ct-main-m')){
        $('body').addClass("overflow-h");
        $('#main').addClass("overflow-h");
      }
      if(this.slider) this.slider._resize();
      this.refreshHeight();

    },

    refreshHeight: function(){
      if (this.tree_menu&&this.tree_menu.scroll && this.tree_menu.scroll.refresh) this.tree_menu.scroll.refresh();
    },

    setAndShowTopAds: function(t) {
//      var e = this.$('.J_imageSlider img');
      this.$el.find(".J_imageSlider").html("");
//      for (var t = [], n = null, r = 0, i = e.length; r < Math.min(i, 10); r++) n = e[r],
//        t.push({
//        link: 'guide.html#controls',
//        title: r+'test222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222',
//        src: $(n).attr('src')
//      });
      var s = this;
      this.slider = new UISlide({
        images: t,
        container: s.$el.find(".J_imageSlider"),
        dir: "LEFT",
        index: 0,
        noNeedDefault: "false",
        autoPlay: 0,
        loop: !0,
        showNav: 1,
        onImageClick: $.proxy(function() {
            var e = this.slider.index;
            if (t[e]) {
              var n = t[e].link;
              window.location = n;
            }
          },
          this)
      });
      this.slider.play();
    },

    onHide: function () {
//      if(this.tree_menu) this.tree_menu.destroy(),this.tree_menu.scroll.destroy();//跳转其他界面是销毁菜单
    }
  });
});
