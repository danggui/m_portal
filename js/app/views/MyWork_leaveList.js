define(["View",getViewTemplatePath("MyWork_leaveList"),"UIToast","LeaveListModel","UIScroll","LanguageStore","AnnualLeaveModel"],function(a,b,c,d,e,f,g){var h=f.getInstance(),i=d.getInstance(),j=g.getInstance();return _.inherit(a,{onCreate:function(){this.$el.html(b),$("#leavelist-title")[0].innerHTML=h.getAttr("language").leaveList,this.els={leaveList_tp0:this.$el.find("#leaveList_tp0"),leaveList_tpl:this.$el.find("#leaveList_tpl")}},events:{"click #leaveApplyButton":"leaveApply"},leaveApply:function(){this.forward("MyWork_leaveRequest")},leaveListData:function(){this.toast1||(this.toast1=new c({datamodel:{content:"content"},TIMERRES:!0}));var a=a||[];i.execute(function(b){if("0"==b.status)return this.toast1.showToast(b.message),!1;if(0==b.data.length){var c="<ul class='form-item-list form-group-nospacing newsList'><li class='form-item-li form-item-li-nopadding' style='padding: 10px 0 0 10px;'><h1>"+h.getAttr("language").noLeaveList;this.$("#leaveList")[0].innerHTML=c}else _.each(b.data,function(b){a.push(d.viewModel(b.apply_id,b.vct_type,b.s_date,b.e_date,b.vct_days,b.ee_id,b.vct_status,b.a_date,b.vct_status_type,b.vct_type_val))}),this.$("#leaveList").append(_.template(this.els.leaveList_tpl.html())({leave_list_data:a})),$(".applicationData")[0].innerHTML=h.getAttr("language").ApplicationDate,$(".days")[0].innerHTML=h.getAttr("language").days},function(){},this)},remainingAnnualQuota:function(){var a=new Date,b=a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate();this.toast1||(this.toast1=new c({datamodel:{content:"content"},TIMERRES:!0}));var d=d||[];j.execute(function(a){return"0"==a.status?(this.$("#annualLeaveQuota").append("<P>"+a.message+'</P><button class="leaveApplyButton" id="leaveApplyButton">'+h.getAttr("language").leaveApplyButton+"</button>"),!1):(d.push(g.viewModel(a.data[0].vct_type,a.data[0].quota_start,a.data[0].quota_end,a.data[0].quota_days,a.data[0].remaining_days)),this.$("#annualLeaveQuota").append(_.template(this.els.leaveList_tp0.html())({annual_Leave_data:d})),$("#expirationDate")[0].innerHTML=h.getAttr("language").expirationDate,$("#daysLeft")[0].innerHTML=h.getAttr("language").daysLeft,$("#leaveApplyButton")[0].innerHTML=h.getAttr("language").leaveApplyButton,$(".myLeaveStatus")[0].innerHTML=h.getAttr("language").MyLeaveStatus,void 0)},function(a){0},this,function(){},{time:b})},onPreShow:function(){this.turning()},onShow:function(){var a=this;a.$("#leaveList").empty(),a.leaveListData(),a.$("#annualLeaveQuota").empty(),a.remainingAnnualQuota()},onHide:function(){}})});