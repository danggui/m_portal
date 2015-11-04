define(['View',getViewTemplatePath('changeHeadPortrait'),'UIToast','UILoading','ChangePasswordModel','MyProfileStore','LanguageStore','EnvStore'], function (View, viewhtml,UIToast,UILoading,ChangePasswordModel,MyProfileStore,LanguageStore,EnvStore) {
    var envStore = EnvStore.getInstance();
    var myProfileStore = MyProfileStore.getInstance();
    var lanStore = LanguageStore.getInstance();
    var imgURL= "";
    return _.inherit(View,{
        onCreate: function () {
            this.$el.html(viewhtml);
            this.$("#headSettings-box").append(_.template(this.$("#headSettings").html())({'lanStore':lanStore.getAttr('language')}));

        },

        events: {
            'click #Photograph':'Photograph',
            'click #AccesstoPhone':'AccesstoPhone',
            'click #save_photo':'save_photo'
        },
        save_photo:function(){
            //上传图片
            var scope = this;
            var sessionID = myProfileStore.getAttr('sessionid');
            var serviceIP = envStore.getAttr('envUrl');
            if (!scope.loading1) {
                scope.loading1 = new UILoading({
                    maskToHide: true
                });
            }
            if (!scope.toast1) {
                scope.toast1 = new UIToast({
                    datamodel: {
                        content: 'content'
                    },
                    TIMERRES :  true
                });
            }
            if(imgURL==""){
                scope.toast1.showToast(lanStore.getAttr('language').noPhoto);
            }else{
                var serviceURL = encodeURI(serviceIP+'/micro/pa/saveEmployeePhoto;jsessionid='+ sessionID);
                var deferred  = when.defer(),
                options = new FileUploadOptions();
                options.fileKey = "photo",
                options.fileName = imgURL.substr(imgURL.lastIndexOf('/')+1);
                options.mimeType = "image/jpeg";

                var ft = new FileTransfer();
                // 上传回调
                scope.loading1.show();
                ft.upload( imgURL, serviceURL, function(data){
                    scope.loading1.hide();
                    scope.toast1.showToast(lanStore.getAttr('language').uploadWin);
                    scope.back();
                    $('#headPortrait').attr('src',JSON.parse(data.response).message);
                }, function(){
                    scope.loading1.hide();
                    scope.toast1.showToast(lanStore.getAttr('language').uploadFail);
                }, options);
                return deferred.promise
            }

        },
        Photograph:function(){
            var scope = this;
            navigator.camera.getPicture(
                scope.onPhotoUrlSuccess,
                scope.onUrlFail,
                {
                    quality: 100,
                    allowEdit: true,
                    destinationType: Camera.DestinationType.FILE_URI,
                    targetWidth:150,  //生成的图片大小 单位像素
                    targetHeight:150
                });
        },
        AccesstoPhone:function(){
            var scope = this;
            navigator.camera.getPicture(
                scope.onPhotoUrlSuccess,
                scope.onUrlFail,
                {
                    destinationType:Camera.DestinationType.FILE_URI ,//设置返回值的格式   DATA_URL:base64  FILE_URI:路径格式
                    sourceType:Camera.PictureSourceType.PHOTOLIBRARY,//PHOTOLIBRARY或SAVEDPHOTOALBUM 系统弹出照片选择对话框，用户可以从相集中选择照片
                    allowEdit:true,
                    targetWidth:150,
                    targetHeight:150,
                    mediaType:Camera.MediaType.PICTURE
                })
        },
        onPhotoUrlSuccess: function(data){
            data.lastIndexOf('?') > 0 ? imgURL=data.substring(0,data.lastIndexOf('?')) : imgURL=data;
            $('#headPortrait-edit').attr('src',data);
        },
        onUrlFail:function(error){
            console.log(error);
        },
        onPreShow: function () {
            this.turning();
        },

        onShow: function () {
            $("#headPortrait-edit").attr('src',localStorage.getItem("myInfoEditValue"));
        },

        onHide: function () {

        }
    });
});
