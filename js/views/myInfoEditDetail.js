define(['View',getViewTemplatePath('MyInfoEditDetail'),'UILoading','LanguageStore','UIRadioList','UIToast','MyInfoSaveModel'],function(View,viewhtml,UILoading,LanguageStore,UIRadioList,UIToast,MyInfoSaveModel){
    var lanStore = LanguageStore.getInstance();
    var myInfoSaveModel = MyInfoSaveModel.getInstance();
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

            $('#myinfo-save h2')[0].innerHTML = lanStore.getAttr('language').save;

            if (!this.loading1) {
                this.loading1 = new UILoading({
                    maskToHide: true
                });
            }
            this.loading1.show();
            this.loading1.hide();

        },

        initialize: function ($super, app, id) {
            $super(app, id);
        },

        events: {
            'click #myinfo-save': 'saveField'
        },

        saveField: function(){
            if($('textarea')[0].value.trim() == ""){
                this.toast1.showToast(lanStore.getAttr('language').saveEmpty);
            }else{
                if(localStorage.getItem("myInfoEditID")=="iden_number"){
                    this.saveIdenNumber();
                }else if(localStorage.getItem("myInfoEditID")=="current_address"){
                    this.saveAddress();
                }else if(localStorage.getItem("myInfoEditID")=="residence_address"){
                    this.saveResidence();
                }else if(localStorage.getItem("myInfoEditID")=="emergency_contact"){
                    this.saveEmergency();
                }else if(localStorage.getItem("myInfoEditID")=="emergency_mobile"){
                    this.saveEmergencyMobile();
                }else if(localStorage.getItem("myInfoEditID")=="mobile"){
                    this.saveMobile();
                }
            }
        },
        saveMobile:function(){

            var saveValue = $('textarea')[0].value.trim(),scope = this;
            myInfoSaveModel.execute(
                function(datamodel,data,textStatus,resObj){
                    if(data.status == "0"){
                        this.toast1.showToast(lanStore.getAttr('language').saveFailed);
                        return false;
                    }else{
                        scope.back();
                        $('#'+localStorage.getItem("myInfoEditID")+'_value').find('e').text(saveValue);
                        this.toast1.showToast(lanStore.getAttr('language').saveSuccess);
                        localStorage.setItem("myInfoEditValue",saveValue);
                    }
                },function(e){
                    console.log(e);
                    //todo with error information
                },this,function(e){},{
                    mobile:encodeURI(saveValue)
                }
            );
        },
        saveEmergencyMobile:function(){
            var saveValue = $('textarea')[0].value.trim(),scope = this;
            myInfoSaveModel.execute(
                function(datamodel,data,textStatus,resObj){
                    if(data.status == "0"){
                        this.toast1.showToast(lanStore.getAttr('language').saveFailed);
                        return false;
                    }else{
                        scope.back();
                        $('#'+localStorage.getItem("myInfoEditID")).children('.pull-right').text(saveValue);
                        this.toast1.showToast(lanStore.getAttr('language').saveSuccess);
                        localStorage.setItem("myInfoEditValue",saveValue);
                    }
                },function(e){
                    console.log(e);
                    //todo with error information
                },this,function(e){},{
                    emergency_mobile:encodeURI(saveValue)
                }
            );
        },
        saveEmergency:function(){

            var saveValue = $('textarea')[0].value.trim(),scope = this;
            myInfoSaveModel.execute(
                function(datamodel,data,textStatus,resObj){
                    if(data.status == "0"){
                        this.toast1.showToast(lanStore.getAttr('language').saveFailed);
                        return false;
                    }else{
                        scope.back();
                        $('#'+localStorage.getItem("myInfoEditID")).children('.pull-right').text(saveValue);
                        this.toast1.showToast(lanStore.getAttr('language').saveSuccess);
                        localStorage.setItem("myInfoEditValue",saveValue);
                    }
                },function(e){
                    console.log(e);
                    //todo with error information
                },this,function(e){},{
                    emergency_contact:encodeURI(saveValue)
                }
            );
        },
        saveResidence:function(){
            var saveValue = $('textarea')[0].value.trim(),scope = this;
            myInfoSaveModel.execute(
                function(datamodel,data,textStatus,resObj){
                    if(data.status == "0"){
                        this.toast1.showToast(lanStore.getAttr('language').saveFailed);
                        return false;
                    }else{
                        scope.back();
                        $('#'+localStorage.getItem("myInfoEditID")).children('.pull-right').text(saveValue);
                        this.toast1.showToast(lanStore.getAttr('language').saveSuccess);
                        localStorage.setItem("myInfoEditValue",saveValue);
                    }
                },function(e){
                    console.log(e);
                    //todo with error information
                },this,function(e){},{
                    residence_address:encodeURI(saveValue)
                }
            );
        },
        saveAddress:function(){
            var saveValue = $('textarea')[0].value.trim(),scope = this;
            myInfoSaveModel.execute(
                function(datamodel,data,textStatus,resObj){
                    if(data.status == "0"){
                        this.toast1.showToast(lanStore.getAttr('language').saveFailed);
                        return false;
                    }else{
                        scope.back();
                        $('#'+localStorage.getItem("myInfoEditID")).children('.pull-right').text(saveValue);
                        this.toast1.showToast(lanStore.getAttr('language').saveSuccess);
                        localStorage.setItem("myInfoEditValue",saveValue);
                    }
                },function(e){
                    console.log(e);
                    //todo with error information
                },this,function(e){},{
                    current_address:encodeURI(saveValue)
                }
            );
        },
        saveIdenNumber: function(){
                var saveValue = $('textarea')[0].value.trim(),scope = this;
                myInfoSaveModel.execute(
                    function(datamodel,data,textStatus,resObj){
                        if(data.status == "0"){
                            this.toast1.showToast(lanStore.getAttr('language').saveFailed);
                            return false;
                        }else{
                            scope.back();
                            $('#'+localStorage.getItem("myInfoEditID")).children('.pull-right').text(saveValue);
                            this.toast1.showToast(lanStore.getAttr('language').saveSuccess);
                            localStorage.setItem("myInfoEditValue",saveValue);
                        }
                    },function(e){
                        console.log(e);
                        //todo with error information
                    },this,function(e){},{
                        iden_number:encodeURI(saveValue)
                    }
                );

        },

        onPreShow: function (){

            this.turning();
        },

        onShow: function () {
            $('#myinfo-edit-detail-title')[0].innerHTML = localStorage.getItem("myInfoEditTitle");
            $('textarea')[0].value = ""
        },

        onHide: function () {
        }
    });
});
