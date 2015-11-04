define(['View',getViewTemplatePath('MyWork_leaveRequest'),'UIToast','LeaveListModel','UIScroll','LanguageStore','DoLeaveApplyModel','UIRadioList','LeaveDaysModel'],function(View,viewhtml,UIToast,LeaveListModel,UIScroll,LanguageStore,DoLeaveApplyModel,UIRadioList,LeaveDaysModel){
    var lanStore = LanguageStore.getInstance();
    var leaveListModel = LeaveListModel.getInstance();
    var doLeaveApplyModel = DoLeaveApplyModel.getInstance();
    var leaveDaysModel = LeaveDaysModel.getInstance();
    var leaveTypeCN = [
        {"leave_type":"1","leave_name":"年假"},
        {"leave_type":"2","leave_name":"事假"},
        {"leave_type":"3","leave_name":"病假"},
        {"leave_type":"6","leave_name":"婚假"},
        {"leave_type":"7","leave_name":"丧假"},
        {"leave_type":"8","leave_name":"产假"},
        {"leave_type":"10","leave_name":"陪产假"},
        {"leave_type":"11","leave_name":"计划生育假"}
    ];
    var leaveTypeEN = [
        {"leave_type":"1","leave_name":"Annual Leave"},
        {"leave_type":"2","leave_name":"Private Affair Leave"},
        {"leave_type":"3","leave_name":"Sick Leave"},
        {"leave_type":"6","leave_name":"Marriage Leave"},
        {"leave_type":"7","leave_name":"Funeral Leave"},
        {"leave_type":"8","leave_name":"Abortion Leave"},
        {"leave_type":"10","leave_name":"Paternity Leave"},
        {"leave_type":"11","leave_name":"Family Planning Leave"}
    ];

    return _.inherit(View,{
        onCreate: function () {

            this.$el.html(viewhtml);
            $("#leave_type")[0].innerHTML = lanStore.getAttr('language').leaveType;
            $("#leaveRequest-title")[0].innerHTML = lanStore.getAttr('language').leaveApplyButton;
            $(".leaveReason")[0].innerHTML = lanStore.getAttr('language').leaveReason;
            $(".leave-reason-prompt")[0].placeholder = lanStore.getAttr('language').leaveReasonPrompt;
            $(".leaveTime")[0].innerHTML = lanStore.getAttr('language').leaveTime;
            $(".leaveTimeStart")[0].innerHTML = lanStore.getAttr('language').leaveTimeStart;
            $(".leaveTimeEnd")[0].innerHTML = lanStore.getAttr('language').leaveTimeEnd;
            $(".leaveTimeDays")[0].innerHTML = lanStore.getAttr('language').leaveTimeDays;
            $(".leaveApplySubmit")[0].innerHTML = lanStore.getAttr('language').submit;

        },
        events: {
            "click #selectLeaveType": "selectLeaveType",
            "click #startTime": "start_Time",
            "click #endTime": "end_Time",
            "click #leaveApplySubmit":"leaveApplySubmit"
        },
        leaveApplySubmit:function(){
            if (!this.toast1) {
                this.toast1 = new UIToast({
                    datamodel: {
                        content: 'content'
                    },
                    TIMERRES :  true
                });}
            if($('#leave_type').attr('placeholder')=="0"){
                this.toast1.showToast(lanStore.getAttr('language').selectLeaveType);
            }else if( $("#input_startDate")[0].innerHTML=="0000-00-00" ){
                this.toast1.showToast(lanStore.getAttr('language').selectLeaveStart);
            }else  if($('#input_endDate')[0].innerHTML=="0000-00-00"){
                this.toast1.showToast(lanStore.getAttr('language').selectLeaveEnd);
            }else if($('#leave_reason')[0].value==""){
                this.toast1.showToast(lanStore.getAttr('language').selectLeaveReason);
            }else{
                var myDate = new Date(),
                 a_date = myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate(),
                 s_date = $("#input_startDate")[0].innerHTML.split(" ")[0],
                 s_time = $("#input_startDate")[0].innerHTML.split(" ")[1],
                 e_date = $('#input_endDate')[0].innerHTML.split(" ")[0],
                 e_time = $('#input_endDate')[0].innerHTML.split(" ")[1],
                 days = $("#input_leaveDays").attr("placeholder"),
                 reason = $('#leave_reason')[0].value;
                doLeaveApplyModel.execute(
                    function(datamodel,data,textStatus,resObj){
                        if(data.status == "0"){
                            this.toast1.showToast(data.message);
                            return false;
                        }else{
                            this.toast1.showToast(data.message);
                            this.back();
                        }
                    },function(e){
                        console.log(e);
                        //todo with error information
                    },this,function(e){}, {
                        'type':$('#leave_type').attr('placeholder'),
                        'a_date': a_date,
                        's_date': s_date,
                        's_time': s_time,
                        'e_date':e_date,
                        'e_time':e_time,
                        'days':days,
                        'reason':reason
                    });


            }
        },
        selectLeaveType:function(){
            var demodata1 =  [],scope = this;
            if (!this.selectType_radio) {
                if(lanStore.getAttr('language').languageFlag == "zh_cn"){
                    _.each(leaveTypeCN,function(value, key, list){
                        demodata1.push({'id':value.leave_type,'name':value.leave_name})
                    });
                }else{
                    _.each(leaveTypeEN,function(value, key, list){
                        demodata1.push({'id':value.leave_type,'name':value.leave_name})
                    });
                }

                this.selectType_radio = new UIRadioList({
                    //数据模型
                    datamodel: {
                        title: lanStore.getAttr('language').selectLeaveType,
                        data: demodata1
                    },
                    displayNum: 5,
                    selectId: 4,
                    index: 4,
                    onClick: function(e, data) {
                        scope.$('#leave_type').text(data.name);
                        $('#leave_type').attr('placeholder',data.id);
                        this.hide();
                        scope.leaveTimeDays();
                    }
                });
            }
            this.selectType_radio.show();
        },
        start_Time:function(){
            this.forward("MyWork_calander&S");
        },
        end_Time:function(){
            this.forward("MyWork_calander&E");
        },

        leaveTimeDays:function(){

            if(localStorage.leaveStartTime&&localStorage.leaveStartHalfDay&&localStorage.leaveEndTime&&localStorage.leaveEndHalfDay&&$('#leave_type').attr('placeholder')!="0"){
                leaveDaysModel.execute(
                    function(datamodel,data,textStatus,resObj){
                        if(data.status == "0"){
                            if (!this.toast1) {
                                this.toast1 = new UIToast({
                                    datamodel: {
                                        content: 'content'
                                    },
                                    TIMERRES :  true
                                });}
                            this.toast1.showToast(data.message);
                            return false;
                        }else{
                            $("#input_leaveDays").attr('placeholder',data.message)
                        }
                    },function(e){
                        console.log(e);
                        //todo with error information
                    },this,function(e){}, {
                        's_date':localStorage.leaveStartTime,
                        's_time':localStorage.leaveStartHalfDay,
                        'e_date':localStorage.leaveEndTime,
                        'e_time':localStorage.leaveEndHalfDay,
                        'type':$('#leave_type').attr('placeholder')
                    });

            }

        },

        onPreShow: function (){
            this.turning();
        },

        onShow: function () {
            if(localStorage.leaveStartTime){
                $("#input_startDate")[0].innerHTML = localStorage.leaveStartTime + " " + localStorage.leaveStartHalfDay
            }
            if(localStorage.leaveEndTime){
                $("#input_endDate")[0].innerHTML = localStorage.leaveEndTime + " " + localStorage.leaveEndHalfDay
            }

            this.leaveTimeDays();

        },


        onHide: function () {
//      document.removeEventListener("touchmove", function (e) { e.preventDefault(); });
        }
    });
});
