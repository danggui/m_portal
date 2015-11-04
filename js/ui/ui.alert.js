
/*
用于继承的类，会自动垂直居中

*/
define(['UILayer', getViewTemplatePath('ui/ui.alert')], function (UILayer, template) {

  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();

      //数据模型
      this.datamodel = {
        title: 'alert',
        content: 'content',
        btns: [
          { name: 'cancel', className: 'pop-box-btns-cancel' },
          { name: 'ok', className: 'pop-box-btns-ok' }
        ]
      };

      //html模板
      this.template = template;

      //事件机制
      this.events = {
        'click .pop-box-btns-ok': 'okAction',
        'click .pop-box-btns-cancel': 'cancelAction'
      };
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        this.$el.addClass('ct-ui-alert');
      });
      this.maskToHide = false;
    },

    okAction: function () {
      this.hide();
    },

    cancelAction: function () {
      this.hide();
    },

    setDatamodel: function (datamodel, okAction, cancelAction) {
      if (!datamodel) datamodel = {};
      _.extend(this.datamodel, datamodel);
      this.okAction = okAction;
      this.cancelAction = cancelAction;
      this.refresh();
    }

  });

});
