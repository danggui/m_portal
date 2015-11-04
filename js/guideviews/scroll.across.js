define(['View', 'UIScroll', getGuideViewTemplatePath('scroll.across')], function (View, UIScroll, viewhtml) {

  return _.inherit(View, {
    onCreate: function () {
      console.log('onCreate');
      this.$el.html(viewhtml);
    },

    events: {
      'click .widget0': function (e) {

      },

      'click .back': function () {
        this.back('index');
      }
    },

    onPreShow: function () {
      console.log('onPreShow');
      this.turning();
    },

  onShow: function () {
    var s = new UIScroll({
      wrapper: $('#wrapper'),
      scroller: $('#scroller'),
      vScroll: false,
      hScrollbar: false,
      vScrollbar: false,
      snap:'li'
    });
  },
    onHide: function () {
    }

  });
});
