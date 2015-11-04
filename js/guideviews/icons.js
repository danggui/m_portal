/**
 * Created by Patrick.Fang on 2014/9/29.
 */
define(['View', getGuideViewTemplatePath('icons')],function(View,viewhtml){
  return _.inherit(View,{
    onCreate: function () {
      this.$el.html(viewhtml);
    },

    events: {
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
