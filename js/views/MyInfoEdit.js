define(['View',getViewTemplatePath('MyInfoEdit'),'MyInfoEditModel','UILoading','LanguageStore','UIRadioList'],function(View,viewhtml,MyInfoEditModel,UILoading,LanguageStore,UIRadioList){
    var myInfoEditmodel = MyInfoEditModel.getInstance();
    var lanStore = LanguageStore.getInstance();
    var selectHeadCN = [
        {"id":"1","name":"拍照"},
        {"id":"2","name":"从手机获取"}
    ];
    var selectHeadEN = [
        {"id":"1","name":"Photograph"},
        {"id":"2","name":"Access to the phone"}
    ];
    return _.inherit(View,{
        onCreate: function () {
            this.$el.html(viewhtml);

            $('#myinfo-edit-title')[0].innerHTML = lanStore.getAttr('language').myInfoEdit;
            $('#myinfo-edit-sub-title')[0].innerHTML = lanStore.getAttr('language').myInfoSub;
            $('#myinfo-save h2')[0].innerHTML = lanStore.getAttr('language').save;

            if (!this.loading1) {
                this.loading1 = new UILoading({
                    maskToHide: true
                });
            }
            this.loading1.show();

            this.els = {
                photoInfo_tpl: this.$el.find("#photo_edit_tp0"),
                myInfoEdit_tpl: this.$el.find("#myinfo_edit_tpl")
            };

            myInfoEditmodel.execute(function(data){
                    var photoData = [],myInfoEditData = [];

                    _.each(data.data,function(value, key, list){
                        if(value.code=="photo"){
                            photoData.push(value);
                        }else{
                            myInfoEditData.push(value)
                        }
                    });
                    $("#myinfo_phone_wrap").html(_.template(this.els.photoInfo_tpl.html())({'photoData':photoData[0]}));
                    $("#myinfo_edit_wrap").html(_.template(this.els.myInfoEdit_tpl.html())({'data':myInfoEditData}));
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
            'click #headPortrait':'changeHeadPortrait'
        },

        changeHeadPortrait:function(){
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
