/**
 * Created by Patrick.Fang on 2014/9/29.
 */
define(['View', getGuideViewTemplatePath('controls'),'UIScrollX'],function(View,viewhtml,UIScrollX){
  return _.inherit(View,{
    propertys: function ($super) {
      $super();
    },

    onCreate: function () {
      this.$el.html(viewhtml);
    },

    events: {
//      'click .check': 'checkEvent'
    },

//    checkEvent: function(e){
//      e.preventDefault();
//      var curel = $(e.currentTarget);
//      if(curel.find("input:disabled").length==0){
//        curel.find("input").prop("checked", !curel.find("input").attr("checked"));
//      }
//    },

    initElement: function () {
      $(".wscroller").each(function(i,obj){
        new UIScrollX({
          swrapper:$(obj),
          scroller:$(obj).find(".sscroller")
        });
      });
    },

    onPreShow: function () {
      this.turning();
    },

    onShow: function () {
      this.initElement();
    },

    onHide: function () {

    }
  });
});
