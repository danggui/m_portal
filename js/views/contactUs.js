/**
 * Created by Patrick.Fang on 2014/9/16.
 */
define(['View',getViewTemplatePath('contact')], function (View, viewhtml) {
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
