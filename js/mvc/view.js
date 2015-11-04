define(['AbstractView'], function (AbstractView) {
  return _.inherit(AbstractView, {

    propertys: function ($super) {
      $super();

    },

    _initHead: function () {

      this.$('header').append($('<i  class="returnico i_bef"></i>'));
      //this.$('header').append($('<i class="icon_home i_bef"></i>'));
    },

    events: {
      'click .returnico': function () {
        this.back();
      }
//      ,
//      'click .icon_home': function () {
//        this.back('index');
//      }
    },

    initialize: function ($super, app, id) {
      $super(app, id);

      this._initHead();
    },

    onPreShow: function ($super) {
      $super();

    },

    show: function ($super) {
      $super();
    }


  });

});
