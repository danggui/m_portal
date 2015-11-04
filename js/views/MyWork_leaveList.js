define(['View',getViewTemplatePath('MyWork_leaveList'),'UIToast','LeaveListModel','UIScroll','LanguageStore','AnnualLeaveModel'],function(View,viewhtml,UIToast,LeaveListModel,UIScroll,LanguageStore,AnnualLeaveModel){
    var lanStore = LanguageStore.getInstance();
    var leaveListModel = LeaveListModel.getInstance();
    var annualLeaveModel = AnnualLeaveModel.getInstance();
    return _.inherit(View,{
        onCreate: function () {

            this.$el.html(viewhtml);
            $('#leavelist-title')[0].innerHTML = lanStore.getAttr('language').leaveList;

            this.els = {
                leaveList_tp0: this.$el.find("#leaveList_tp0"),
                leaveList_tpl: this.$el.find("#leaveList_tpl")
            };
        },

        events: {
            "click #leaveApplyButton": "leaveApply"
        },
        leaveApply:function(){
            this.forward('MyWork_leaveRequest');
    },
        leaveListData:function(){
            if (!this.toast1) {
                this.toast1 = new UIToast({
                    datamodel: {
                        content: 'content'
                    },
                    TIMERRES :  true
                });
            }
            var leaveListData = leaveListData ||[];

            leaveListModel.execute(function(data){

                if(data.status == "0"){
                    this.toast1.showToast(data.message);
                    return false;
                }else{
                    if(data.data.length==0){
                        var innerText = "<ul class='form-item-list form-group-nospacing newsList'>"+
                            "<li class='form-item-li form-item-li-nopadding' style='padding: 10px 0 0 10px;'><h1>"+lanStore.getAttr('language').noLeaveList
                        "</h1></li></ul>"

                        this.$("#leaveList")[0].innerHTML=innerText;
                    }else{
                        _.each(data.data,function(value, key, list){
                            leaveListData.push(LeaveListModel.viewModel(value.apply_id,value.vct_type,value.s_date,value.e_date,value.vct_days,value.ee_id,value.vct_status,value.a_date,value.vct_status_type,value.vct_type_val));
                        });

                        this.$("#leaveList").append(_.template(this.els.leaveList_tpl.html())({'leave_list_data':leaveListData}));

                        $('.applicationData')[0].innerHTML = lanStore.getAttr('language').ApplicationDate;
                        $('.days')[0].innerHTML = lanStore.getAttr('language').days;
                    }
                }

            },function(e){

            },this);

        },
        remainingAnnualQuota:function(){
            var myDate = new Date();
            var nowDate = myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate();


            if (!this.toast1) {
                this.toast1 = new UIToast({
                    datamodel: {
                        content: 'content'
                    },
                    TIMERRES :  true
                });
            }

            var annualLeaveData = annualLeaveData||[];
            annualLeaveModel.execute(function(data){
                    if(data.status == "0"){
                        //this.toast1.showToast(data.message);
                        this.$("#annualLeaveQuota").append('<P>'+data.message+'</P><button class="leaveApplyButton" id="leaveApplyButton">'+lanStore.getAttr('language').leaveApplyButton+'</button>');
                        return false;
                    }else{
                        annualLeaveData.push(AnnualLeaveModel.viewModel(data.data[0].vct_type,data.data[0].quota_start,data.data[0].quota_end,data.data[0].quota_days,data.data[0].remaining_days));
                        this.$("#annualLeaveQuota").append(_.template(this.els.leaveList_tp0.html())({'annual_Leave_data':annualLeaveData}));

                        $('#expirationDate')[0].innerHTML = lanStore.getAttr('language').expirationDate;
                        $('#daysLeft')[0].innerHTML = lanStore.getAttr('language').daysLeft;
                        $('#leaveApplyButton')[0].innerHTML = lanStore.getAttr('language').leaveApplyButton;
                        $('.myLeaveStatus')[0].innerHTML = lanStore.getAttr('language').MyLeaveStatus;
                    }

                },function(e){
                    console.log(e);
                    //todo with error information
                },
                this,
                function(e){},
                {'time': nowDate});
        },

        onPreShow: function (){
            this.turning();
        },

        onShow: function () {
            var scope = this;
            scope.$("#leaveList").empty();
            scope.leaveListData();
            scope.$("#annualLeaveQuota").empty();
            scope.remainingAnnualQuota();

        },


        onHide: function () {
//      document.removeEventListener("touchmove", function (e) { e.preventDefault(); });
        }
    });
});
