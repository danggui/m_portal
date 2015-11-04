define(['View',getViewTemplatePath('MyWork_todoList'),'UIToast','TodoListModel','UIScroll','LanguageStore','TodoListStore'],function(View,viewhtml,UIToast,TodoListModel,UIScroll,LanguageStore,TodoListStore){
    var lanStore = LanguageStore.getInstance();
    var todoListStore = TodoListStore.getInstance();
    return _.inherit(View,{
        onCreate: function () {

            this.$el.html(viewhtml);
            $('#todolist-title')[0].innerHTML = lanStore.getAttr('language').todoList;

            this.els = {
                todoList_tpl: this.$el.find("#todoList_tpl")
            };

        },

        events: {
            'touchstart .newsList': function(e){
                $(e.currentTarget).addClass('cur');
            },
            'touchend .newsList': function(e){
                $(e.currentTarget).removeClass('cur');
            },
            'touchcancel .newsList': function(e){
                $(e.currentTarget).removeClass('cur');
            },
            'click .newsList':function(e){
                if(e.currentTarget.attributes["todo-id"]){
                    this.forward('Todo_Detail&'+e.currentTarget.attributes["todo-id"].value)
                }
            }
        },
        todoListData:function(){
            if (!this.toast1) {
                this.toast1 = new UIToast({
                    datamodel: {
                        content: 'content'
                    },
                    TIMERRES :  true
                });
            }
            var todoListData = [];
            var todoListModel = TodoListModel.getInstance();
            todoListModel.execute(function(data){

                if(data.status == "0"){
                    this.toast1.showToast(data.message);
                    return false;
                }else{
                    if(data.data.length==0){
                        var innerText = "<ul class='form-item-list form-group-nospacing newsList'>"+
                            "<li class='form-item-li form-item-li-nopadding' style='padding: 10px 0 0 10px;'><h1>"+lanStore.getAttr('language').noTodoList
                                "</h1></li></ul>"

                        this.$("#scroller")[0].innerHTML=innerText;
                    }else{
                        todoListStore.setAttr('todoListStore',JSON.stringify(data.data));
                        _.each(data.data,function(value, key, list){
                            todoListData.push(TodoListModel.viewModel(value.id,value.type,value.a_date,value.s_date,value.e_date,value.days,value.applicant,value.reason));
                            todoListData[key].ApplicationDate = lanStore.getAttr('language').ApplicationDate;
                        });

                        this.$("#scroller").append(_.template(this.els.todoList_tpl.html())({'todo_list_data':todoListData}));

                    }
                }

            },function(e){

            },this);

        },
        onPreShow: function (){
            this.turning();
        },

        onShow: function () {
            var scope = this;
            scope.$("#scroller").empty()
            scope.todoListData();
        },


        onHide: function () {
//      document.removeEventListener("touchmove", function (e) { e.preventDefault(); });
        }
    });
});
