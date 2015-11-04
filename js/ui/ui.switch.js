define(['UIView', getViewTemplatePath('ui/ui.switch')], function (UIView, template) {

  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;

      this.datamodel = {
        checkedFlag: false,
        checkedClass: 'current'
      };

    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    changed: function (status) {
      console.log(status);
    },

    initElement: function () {
      this.el = this.$('.ct-ui-switch');
      this.switchBar = this.$('.ct-ui-switch-bg');
    },

    checked: function () {
      if (typeof this.checkAvailabe == 'function' && !this.checkAvailabe()) {
          return;
      }

      if (this.getStatus()) return;
      this.el.addClass('current');
      this.switchBar.addClass('current');
      this.datamodel.checkedFlag = true;
      this._triggerChanged();
    },

    unChecked: function () {
      if (typeof this.checkAvailabe == 'function' && !this.checkAvailabe()) {
        return;
      }

      if (!this.getStatus()) return;
      this.el.removeClass('current');
      this.switchBar.removeClass('current');
      this.datamodel.checkedFlag = false;
      this._triggerChanged();
    },

    _triggerChanged: function () {
      if (typeof this.changed == 'function') this.changed.call(this, this.getStatus());
    },

    //这里不以dom判断，以内置变量判断
    getStatus: function () {
      return this.datamodel.checkedFlag;
    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        this.$el.addClass('ct-ui-switch');
      });

      this.on('onShow', function () {
        _.flip(this.$el, 'left', $.proxy(function () {
          this.unChecked();
        }, this));

        _.flip(this.$el, 'right', $.proxy(function () {
          this.checked();
        }, this));

        this.$el.on('click', $.proxy(function () {
          if (this.getStatus()) {
            this.unChecked();
          } else {
            this.checked();
          }
        }, this));
      });

      this.on('onHide', function () {
        _.flipDestroy(this.$el);
      });
    }

  });


});
