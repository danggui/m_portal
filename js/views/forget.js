/**
 * Created by Patrick.Fang on 2014/9/12.
 */
define(['View',getViewTemplatePath('forget')], function (View, viewhtml) {
  return _.inherit(View,{
    onCreate: function () {
      this.$el.html(viewhtml);
    },

    events: {
      'touchstart #confirm': 'OnConfirm',
      'touchstart #contact': 'contact'
    },
    OnConfirm: function(){

    },
    contact: function(){
      this.forward("contactUs");
    },
    onPreShow: function () {
      this.turning();
    },

    onShow: function () {

    },

    onHide: function () {

    }
  });
});
