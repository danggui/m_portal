define(['View',getViewTemplatePath('MyWork_todoList_detail'),'UIToast','UIScroll','LanguageStore','TodoListStore','ApprovalResultsModel'],function(View,viewhtml,UIToast,UIScroll,LanguageStore,TodoListStore,ApprovalResultsModel){
    var lanStore = LanguageStore.getInstance();
    var todoListStore = TodoListStore.getInstance();
    var approvalResultsModel = ApprovalResultsModel.getInstance();
    return _.inherit(View,{
        onCreate: function () {
            this.$el.html(viewhtml);
            $('#todoDetail-title')[0].innerHTML = lanStore.getAttr('language').todoDetail;
            this.els = {
                todoList_detail_tpl: this.$el.find("#todoList_detail_tpl")
            };
        },

        events: {
            'click .ApprovalResults':'ApprovalResults'
        },
        ApprovalResults:function(){
            var todoId = location.href.substring(location.href.indexOf("&")+1,location.href.length);
            if (!this.toast1) {
                this.toast1 = new UIToast({
                    datamodel: {
                        content: 'content'
                    },
                    TIMERRES :  true
                });
            }

            approvalResultsModel.execute(
                function(datamodel,data,textStatus,resObj) {
                    if(data.status == "0"){
                        this.toast1.showToast(data.message);
                        return false;
                    }else{
                        this.toast1.showToast(data.message);
                        this.back();
                    }
                },
                function(e){
                    console.log(e);
                    //todo with error information
                },
                this,
                function(e){},
                {
                    'id':todoId,
                    'result':event.target.value,
                    'memo':$("#approvalAdvice-prompt")[0].value
                }
            );

        },
        onPreShow: function (){
            this.turning();
        },

        onShow: function () {
            var todoId = location.href.substring(location.href.indexOf("&")+1,location.href.length);
            var data =  JSON.parse(todoListStore.getAttr('todoListStore'));
            var todoDetailData = todoDetailData||[];
            _.each(data,function(value, key, list){
                if(value.id == todoId){
                    todoDetailData.push(TodoListStore.viewModel(value.id,value.type,value.a_date,value.s_date,value.e_date,value.days,value.applicant,value.reason));
                }
            });
            this.$("#scroller").empty();
            this.$("#scroller").append(_.template(this.els.todoList_detail_tpl.html())({'todo_list_data':todoDetailData}));
            $('#todo-disagree')[0].innerHTML = lanStore.getAttr('language').disagree;
            $('#todo-agree')[0].innerHTML = lanStore.getAttr('language').agree;
            $('#todo-reason-title')[0].innerHTML = lanStore.getAttr('language').todoReasonTitle;
            $('#approvalAdvice')[0].innerHTML = lanStore.getAttr('language').approvalAdvice;
            $('#applicationData')[0].innerHTML = lanStore.getAttr('language').ApplicationDate;
            $('#approvalAdvice-prompt')[0].placeholder = lanStore.getAttr('language').approvalAdvicePrompt;
        },


        onHide: function () {
//      document.removeEventListener("touchmove", function (e) { e.preventDefault(); });
        }
    });
});
