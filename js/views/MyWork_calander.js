define(['View',getViewTemplatePath('MyWork_calander'),'UICalendar','LanguageStore'],function(View,viewhtml,UICalendar,LanguageStore){
  var lanStore = LanguageStore.getInstance();
  var scope = this;
  return _.inherit(View,{
    onCreate: function () {
      this.$el.html(viewhtml);
      $("#calander")[0].innerHTML = lanStore.getAttr('language').calander;
      $("#morning")[0].innerHTML = lanStore.getAttr('language').morning;
      $("#afternoon")[0].innerHTML = lanStore.getAttr('language').afternoon;
      $("#AMPM-Confirm")[0].innerHTML = lanStore.getAttr('language').confirm;
    },

    events: {
      'click .AMPM-box .AMPM':'AMPMChange',
      'click #AMPM-Confirm':'confirmDate'
    },
    AMPMChange:function(e){
      $(".AMPM-box .AMPM").removeClass('ct-ui_cld_day_NOW');
      $(e.target).addClass('ct-ui_cld_day_NOW');
      scope.calendar.selectedDate = $(e.target)
    },
    confirmDate:function(e){
      var flagLeave = location.href.substring(location.href.indexOf("&")+1,location.href.length);
      var datePara = [];
      $(".ct-ui_cld_day_NOW").each(function(){
        datePara.push($(this).attr("data-date"));
      });
      if(flagLeave=='S'){
        localStorage.leaveStartTime =datePara[0];
        localStorage.leaveStartHalfDay =datePara[1];
      }else{
        localStorage.leaveEndTime =datePara[0];
        localStorage.leaveEndHalfDay =datePara[1];
      }
      this.back();
    },

    onPreShow: function () {
      this.turning();
    },

    onShow: function () {
      if(lanStore.getAttr('language').languageFlag == "zh_cn" ){
        if (!this.calendar) {
          this.calendar = new UICalendar({
            datamodel: {
              displayMonthNum: 1
            },
            wrapper: this.$el.find('.calander'),
          });
        }
      }else{
        if (!this.calendar) {
          this.calendar = new UICalendar({
            datamodel: {
              weekDayArr: ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'],
              MonthClapFn: function (year, month) {
                month = month + 1;
                return year + ' ' + this.monthnameArr[month-1];
              },
              displayMonthNum: 1
            },
            wrapper: this.$el.find('.calander')
          });
        }
      }

      this.calendar.show();
      scope.calendar = this.calendar;
    },

    onHide: function () {
    }
  });
});
