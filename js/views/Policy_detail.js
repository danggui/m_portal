/**
 * Created by Patrick.Fang on 2014/10/28.
 */
define(['View',getViewTemplatePath('Policy_Detail'),'UIScroll','LanguageStore','PolicyArticleModel'],function(View,viewhtml,UIScroll,LanguageStore,PolicyArticleModel){
    var lanStore = LanguageStore.getInstance()
    return _.inherit(View,{
        onCreate: function () {
//      var scope = this;
            this.$el.html(viewhtml);
            $('#policyDetail-title')[0].innerHTML = lanStore.getAttr('language').policydetail;
            $('#gotoTop span')[0].innerHTML = lanStore.getAttr('language').gotoTop;
        },

        events: {
            'click #gotoTop':'gotoTop'
        },

        gotoTop:function(){
            document.documentElement.scrollTop = document.body.scrollTop =0;
        },

        onPreShow: function (){
            var policyId = location.href.substring(location.href.indexOf("&")+1,location.href.length);
            var policyArticleModel = PolicyArticleModel.getInstance();
            policyArticleModel.execute(function(data){

                    $('#policyDetail-cont')[0].innerHTML = data.data.content;
                    if(data.data.attachment){
                        $('#attachments')[0].href =  data.data.attachment;
                        $('#attachments')[0].innerHTML =  data.data.title;

                        //phonegap 下载附件

                        window.appRootDirName = "download_attachments";
                        document.addEventListener("deviceready", onDeviceReady, false);
                        function onDeviceReady() {
                            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
                        }
                        function fail() {
                            console.log("failed to get filesystem");
                        }

                        function gotFS(fileSystem) {
                            console.log("filesystem got");
                            window.fileSystem = fileSystem;
                            fileSystem.root.getDirectory(window.appRootDirName, {
                                create : true,
                                exclusive : false
                            }, dirReady, fail);
                        }


                        function dirReady(entry) {
                            window.appRootDir = entry;
                            console.log("application dir is ready");
                        }

                        downloadFile = function(){

                            alert("start");
                            var fileTransfer = new FileTransfer();
                            var uri = encodeURI("http://12.130.30.22:8080/uploadImagetest.xls");
                            var filePath = window.appRootDir.fullPath + "/test.xls";

                            alert(window.appRootDir.fullPath);
                            fileTransfer.download(
                                uri,
                                filePath,
                                function(entry) {
                                    alert("success");
                                    alert(entry.fullPath);
                                    //此处调用打开文件方法
                                    OpenFile(entry.fullPath);
                                    //window.location.href = window.appRootDir.fullPath;
                                    console.log("download complete: " + entry.fullPath);
                                },
                                function(error) {
                                    alert("error");
                                    alert(JSON.stringify(error));
                                    console.log("download error source " + error.source);
                                    console.log("download error target " + error.target);
                                    console.log("upload error code" + error.code);
                                }
                            );
                        }
                        function OpenFile(path){
                            try {
                                alert('OpenFile');
                                var array = [];
                                array[0] = path;
                                alert(array[0]);
                                cordova.exec(function(message) {


                                }, null, 'OpenFilePlugin', 'haha', array);
                            } catch(e) {
                                alert(e.message);
                            }
                        }




                    }else{
                        $('#attachments').empty;
                    }
                },
                function(e){
                    console.log(e);
                    //todo with error information
                },
            this,
                function(e){},
            {'policy_id':policyId}
            );
            //this.$("#scroller").children().remove();
            this.turning();

        },

        onShow: function () {
        },

        onHide: function () {
        }
    });
});
