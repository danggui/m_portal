
/*
用于继承的类，会自动垂直居中

*/
define(['UILayer', getViewTemplatePath('ui/ui.toast')], function (UILayer, template) {


  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      this.template = template;
      this.datamodel = {
        content: 'toast'
      };
      this.hideSec = 2000;
      this.TIMERRES = null;
    },

    hideAction: function () {
      console.log('hide')
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        this.$el.addClass('ct-toast');
      });

      this.on('onShow', function () {
        //显示指定时间后需要关闭
        if (this.TIMERRES) clearTimeout(this.TIMERRES);
        this.TIMERRES = setTimeout($.proxy(function () {
          this.hide();
        }, this), this.hideSec);
      });

      this.on('onHide', function () {
        //显示指定时间后需要关闭
        if (this.TIMERRES) clearTimeout(this.TIMERRES);
        this.hideAction();
      });
    },

    showToast: function(title,fn){
      this.show();
      this.setDatamodel(title,fn);
    },

    setDatamodel: function (content, fn) {
      this.datamodel.content = content;
      if(fn!=undefined)
        this.hideAction = fn;
      this.refresh();
    }


  });


});
