define(['View',getViewTemplatePath('MyInfo'),'MyInfoModel','MyInfoDetailListStore','MyProfileStore','UILoading','UIToast','LanguageStore','UIRadioList','MyInfoSaveModel'],function(View,viewhtml,MyInfoModel,MyInfoDetailListStore,MyProfileStore,UILoading,UIToast,LanguageStore,UIRadioList,MyInfoSaveModel){
  var myInfomodel = MyInfoModel.getInstance();
   var lanStore = LanguageStore.getInstance();
  var myInfoSaveModel = MyInfoSaveModel.getInstance();
  var selectHeadCN = [
    {"id":"1","name":"拍照"},
    {"id":"2","name":"从手机获取"}
  ];
  var selectHeadEN = [
    {"id":"1","name":"Photograph"},
    {"id":"2","name":"Access to the phone"}
  ];
  var IdenTypeCN = [
    {"Iden_type":"p_1","Iden_name":"身份证"},
    {"Iden_type":"p_2","Iden_name":"护照"},
    {"Iden_type":"p_3","Iden_name":"就业许可证"},
    {"Iden_type":"p_4","Iden_name":"港澳通行证"},
    {"Iden_type":"p_5","Iden_name":"居留许可证"},
    {"Iden_type":"p_6","Iden_name":"台胞证"},
    {"Iden_type":"p_7","Iden_name":"港澳居民来往内地通行证"},
    {"Iden_type":"p_8","Iden_name":"残疾证"},
    {"Iden_type":"p_8","Iden_name":"军官证"},
    {"Iden_type":"p_8","Iden_name":"回乡证"}
  ];
  var IdenTypeEN = [
    {"Iden_type":"p_1","Iden_name":"Identity Card"},
    {"Iden_type":"p_2","Iden_name":"Passport"},
    {"Iden_type":"p_3","Iden_name":"Employment Permit"},
    {"Iden_type":"p_4","Iden_name":"EEP"},
    {"Iden_type":"p_5","Iden_name":"Residence Permit"},
    {"Iden_type":"p_6","Iden_name":"MTP"},
    {"Iden_type":"p_7","Iden_name":"Travel Permit For Residents of Hongkong & Macau to Mainland China"},
    {"Iden_type":"p_8","Iden_name":"Certificate of Disability"},
    {"Iden_type":"p_8","Iden_name":"Military Officer"},
    {"Iden_type":"p_8","Iden_name":"Reentry Permit"}
  ];
  var MaritalStatusCN = [
    {"MS_id":"p_1","MS_name":"单身"},
    {"MS_id":"p_2","MS_name":"已婚"},
    {"MS_id":"p_3","MS_name":"离异"},
    {"MS_id":"p_4","MS_name":"丧偶"},
    {"MS_id":"p_5","MS_name":"分居"}
  ];
  var MaritalStatusEN = [
    {"MS_id":"p_1","MS_name":"Single"},
    {"MS_id":"p_2","MS_name":"Married"},
    {"MS_id":"p_3","MS_name":"Divorce"},
    {"MS_id":"p_4","MS_name":"Widowed"},
    {"MS_id":"p_5","MS_name":"Separation"}
  ];
  return _.inherit(View,{
    onCreate: function () {
      this.$el.html(viewhtml);
      if (!this.toast1) {
        this.toast1 = new UIToast({
          datamodel: {
            content: 'content'
          },
          TIMERRES :  true
        });}

        $('#myinfo-title')[0].innerHTML = lanStore.getAttr('language').myInfo;
        $('#myinfo-sub-title')[0].innerHTML = lanStore.getAttr('language').myInfoSub;

        if (!this.loading1) {
            this.loading1 = new UILoading({
                maskToHide: true
            });
        }
        this.loading1.show();

      var myProfileStore = MyProfileStore.getInstance();
      var data =  JSON.parse(myProfileStore.getAttr('myProfileStore'));

      this.els = {
        photoInfo_tp1:this.$el.find("#photo_info_tpl"),
        basicInfo_tpl: this.$el.find("#mybasic_info_tpl"),
        OutLineInfo_tpl: this.$el.find("#outline_info_tpl")
      };

      myInfomodel.execute(function(data){
          //var myInfoDlStore = MyInfoDetailListStore.getInstance();
          //myInfoDlStore.setAttr('myinfo-detail-list',JSON.stringify(data.data.info_class));
            var photoData = [],basic_infoData = [];

            _.each(data.data.ee_card,function(value, key, list){
              if(value.code=="photo"){
                photoData.push({'title':value.title,'value':value.value,'code':value.code,'editable':value.editable})
              }else{
                basic_infoData.push({'title':value.title,'value':value.value,'code':value.code,'editable':value.editable})
              }
            });

          $("#photo_info_wrap").html(_.template(this.els.photoInfo_tp1.html())({'photo_infoData':photoData[0]}));
          $("#mybasic_info_wrap").html(_.template(this.els.basicInfo_tpl.html())({'basic_infoData':basic_infoData}));
          $("#outline_info_wrap").html(_.template(this.els.OutLineInfo_tpl.html())({'data':data.data.ee_info}));
      },
      function(e){

      },
      this,
      function(){},
      {}
      )
        this.loading1.hide();
    },

    initialize: function ($super, app, id) {
      $super(app, id);

      //this.$('header').append($('<i class="icon_menu i_bef i_right"></i>'));
    },

    events: {
      'click .icon_menu': function () {
        this.forward('MyInfo-detailList');
      },
      'click #headPortrait':'changeHeadPortrait',
      'click .myInfo-edit-detail':'myInfoEdit'
    },
    myInfoEdit:function(e){

      localStorage.setItem("myInfoEditTitle",e.currentTarget.getAttribute('data-title'))
      localStorage.setItem("myInfoEditID",e.currentTarget.getAttribute('data-id'))
      localStorage.setItem("myInfoEditValue",$('#'+e.currentTarget.getAttribute('data-id')+'_value').text().trim())


      if(e.currentTarget.getAttribute('data-id')=="iden_type"){
        this.selectIdenType();
      }else if(e.currentTarget.getAttribute('data-id')=="marriage_status"){
        this.selectMaritalStatus();
      }else{
        this.forward('myInfoEditDetail')
      }
    },
    selectMaritalStatus:function(){
      var MaritalStatusData =  [],scope = this;
      if (!this.selectMSType_radio) {
        if(lanStore.getAttr('language').languageFlag == "zh_cn"){
          _.each(MaritalStatusCN,function(value, key, list){
            MaritalStatusData.push({'id':value.MS_id,'name':value.MS_name})
          });
        }else{
          _.each(MaritalStatusEN,function(value, key, list){
            MaritalStatusData.push({'id':value.MS_id,'name':value.MS_name})
          });
        }

        this.selectMSType_radio = new UIRadioList({
          //数据模型
          datamodel: {
            title: lanStore.getAttr('language').selectDocuments,
            data: MaritalStatusData
          },
          displayNum: 5,
          selectId: 4,
          index: 4,
          onClick: function(e, data) {
            this.hide();
            if(data.name != localStorage.getItem('myInfoEditValue')){
              var data01 = data;
              scope.saveMS(data01);
            }
          }
        });
      }
      this.selectMSType_radio.show();
    },
    saveMS:function(data01){

      myInfoSaveModel.execute(
          function(datamodel,data,textStatus,resObj){
            if(data.status == "0"){
              //this.toast1.showToast(data.message);
              return false;
            }else{
              $('#'+localStorage.getItem("myInfoEditID")).children('.pull-right').text(data01.name);
              //this.toast1.showToast(data.message);
              localStorage.setItem("myInfoEditValue",data01.name);
            }
          },function(e){
            console.log(e);
            //todo with error information
          },this,function(e){},{
            marriage_status:data01.id
          }
      );
    },
    selectIdenType: function(){

      var IdenTypeData =  [],scope = this;
      if (!this.selectIdenType_radio) {
        if(lanStore.getAttr('language').languageFlag == "zh_cn"){
          _.each(IdenTypeCN,function(value, key, list){
            IdenTypeData.push({'id':value.Iden_type,'name':value.Iden_name})
          });
        }else{
          _.each(IdenTypeEN,function(value, key, list){
            IdenTypeData.push({'id':value.Iden_type,'name':value.Iden_name})
          });
        }

        this.selectIdenType_radio = new UIRadioList({
          //数据模型
          datamodel: {
            title: lanStore.getAttr('language').selectDocuments,
            data: IdenTypeData
          },
          displayNum: 5,
          selectId: 4,
          index: 4,
          onClick: function(e, data) {
            this.hide();
            if(data.name != localStorage.getItem('myInfoEditValue')){
              var data01 = data;
              scope.saveIdenInfo(data01);
            }
          }
        });
      }
      this.selectIdenType_radio.show();
    },
    saveIdenInfo:function(data01){
      myInfoSaveModel.execute(
          function(datamodel,data,textStatus,resObj){
            if(data.status == "0"){
              //this.toast1.showToast(data.message);
              return false;
            }else{
              $('#'+localStorage.getItem("myInfoEditID")).children('.pull-right').text(data01.name);
              //this.toast1.showToast(data.message);
              localStorage.setItem("myInfoEditValue",data01.name);
            }
          },function(e){
            console.log(e);
            //todo with error information
          },this,function(e){},{
            iden_type:data01.id
          }
         );

    },
    changeHeadPortrait:function(e){

      localStorage.setItem("myInfoEditTitle","phone")
      localStorage.setItem("myInfoEditID",e.currentTarget.getAttribute('id'))
      localStorage.setItem("myInfoEditValue",e.currentTarget.getAttribute("src"))

       this.forward('changeHeadPortrait')
    },

    onPreShow: function (){

      this.turning();
    },

    onShow: function () {

    },

    onHide: function () {
    }
  });
});
